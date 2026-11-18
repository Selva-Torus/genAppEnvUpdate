/**
 * Proves the generated DDL actually produces UNIQUE *constraints* in PostgreSQL.
 *
 *   npx ts-node src/scripts/verify-ddl.ts
 *   npx ts-node src/scripts/verify-ddl.ts --url="postgresql://user:pass@host:5432/db"
 *
 * Creates a throwaway schema, applies both the old (unique index) and new (unique
 * constraint) form, checks what each one registers in the catalog, and drops the
 * schema again. The target is `--url`, else VERIFY_DATABASE_URL, else DATABASE_URL
 * from .env. Touches nothing in the database outside its own schema.
 */

import { randomBytes } from 'crypto';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

import {
  collectUniqueIndexes,
  convertUniqueIndexesToConstraints,
} from '../utils/unique-constraint.util';

dotenv.config();

const SCHEMA = `ddl_check_${randomBytes(4).toString('hex')}`;

let passed = 0;
let failed = 0;

function check(label: string, ok: boolean, detail = ''): void {
  if (ok) {
    passed++;
    console.log(`  PASS  ${label}`);
  } else {
    failed++;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

/** Does `name` exist as an index in the throwaway schema? */
async function isIndex(db: Client, name: string): Promise<boolean> {
  const { rows } = await db.query(
    `SELECT 1 FROM pg_indexes WHERE schemaname = $1 AND indexname = $2`,
    [SCHEMA, name],
  );
  return rows.length > 0;
}

/** Does `name` exist in pg_constraint as a unique constraint? */
async function isConstraint(db: Client, name: string): Promise<boolean> {
  const { rows } = await db.query(
    `SELECT 1 FROM pg_constraint c
       JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE n.nspname = $1 AND c.conname = $2 AND c.contype = 'u'`,
    [SCHEMA, name],
  );
  return rows.length > 0;
}

async function expectFailure(db: Client, sql: string): Promise<string | null> {
  try {
    await db.query(sql);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

async function main(): Promise<void> {
  const fromArgv = process.argv
    .find((arg) => arg.startsWith('--url='))
    ?.slice('--url='.length);
  const url =
    fromArgv || process.env.VERIFY_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'No target database. Pass --url=..., or set VERIFY_DATABASE_URL or DATABASE_URL.',
    );
  }
  console.log(`target: ${url.replace(/(:\/\/[^:]*:)[^@]*@/, '$1***@')}`);

  const db = new Client({ connectionString: url });
  await db.connect();
  console.log(`using throwaway schema "${SCHEMA}"\n`);

  try {
    await db.query(`CREATE SCHEMA "${SCHEMA}"`);
    await db.query(
      `CREATE TABLE "${SCHEMA}"."t" (id int primary key, code text)`,
    );
    await db.query(
      `CREATE TABLE "${SCHEMA}"."u" (id int primary key, code text)`,
    );

    // 1. What Prisma emits today.
    const prismaForm = `CREATE UNIQUE INDEX "old_code" ON "${SCHEMA}"."t"("code");`;
    await db.query(prismaForm);
    check(
      'Prisma form (CREATE UNIQUE INDEX) does NOT register a constraint',
      !(await isConstraint(db, 'old_code')),
    );

    // 2. What the converter produces from the very same statement.
    const converted = convertUniqueIndexesToConstraints(
      `CREATE UNIQUE INDEX "new_code" ON "${SCHEMA}"."u"("code");`,
    );
    console.log(`\n  converted -> ${converted.trim()}\n`);
    check(
      'converter emits ALTER TABLE ... ADD CONSTRAINT ... UNIQUE',
      /ALTER TABLE .* ADD CONSTRAINT "new_code" UNIQUE \("code"\);/.test(
        converted,
      ),
      converted.trim(),
    );
    await db.query(converted);
    check(
      'converted form DOES register a unique constraint',
      await isConstraint(db, 'new_code'),
    );

    // 3. It still enforces uniqueness.
    await db.query(`INSERT INTO "${SCHEMA}"."u" VALUES (1, 'dup')`);
    const dupError = await expectFailure(
      db,
      `INSERT INTO "${SCHEMA}"."u" VALUES (2, 'dup')`,
    );
    check('constraint still enforces uniqueness', dupError !== null);

    // 4. The reason DROP INDEX had to be rewritten as well.
    const dropError = await expectFailure(
      db,
      `DROP INDEX "${SCHEMA}"."new_code"`,
    );
    check(
      'plain DROP INDEX fails against a constraint-backed index',
      dropError !== null,
      dropError ? '' : 'it unexpectedly succeeded',
    );
    if (dropError)
      console.log(`        postgres says: ${dropError.split('\n')[0]}`);

    // 5. The rewritten drop works.
    const convertedDrop = convertUniqueIndexesToConstraints(
      `DROP INDEX "${SCHEMA}"."new_code";`,
      collectUniqueIndexes(
        `CREATE UNIQUE INDEX "new_code" ON "${SCHEMA}"."u"("code");`,
      ),
    );
    console.log(`\n  converted -> ${convertedDrop.trim()}\n`);
    await db.query(convertedDrop);
    check(
      'converted DROP CONSTRAINT removes it',
      !(await isConstraint(db, 'new_code')),
    );

    // 6. A `_uidx` name stays a unique index, on the same table as a constraint.
    await db.query(
      `CREATE TABLE "${SCHEMA}"."m" (id int primary key, code text, name text)`,
    );
    const mixed = convertUniqueIndexesToConstraints(
      [
        `CREATE UNIQUE INDEX "m_code_key" ON "${SCHEMA}"."m"("code");`,
        `CREATE UNIQUE INDEX "m_name_uidx" ON "${SCHEMA}"."m"("name");`,
      ].join('\n'),
    );
    console.log(`\n  converted -> ${mixed.trim().replace(/\n/g, '\n               ')}\n`);
    await db.query(mixed);
    check(
      'unmarked unique on the model becomes a constraint',
      await isConstraint(db, 'm_code_key'),
    );
    check(
      '`_uidx` unique on the same model stays an index, not a constraint',
      (await isIndex(db, 'm_name_uidx')) &&
        !(await isConstraint(db, 'm_name_uidx')),
    );
    await db.query(`INSERT INTO "${SCHEMA}"."m" VALUES (1, 'a', 'x')`);
    check(
      '`_uidx` index still enforces uniqueness',
      (await expectFailure(
        db,
        `INSERT INTO "${SCHEMA}"."m" VALUES (2, 'b', 'x')`,
      )) !== null,
    );

    // 7. Switching kinds in an incremental diff applies cleanly.
    const known = collectUniqueIndexes(mixed);
    const switched = convertUniqueIndexesToConstraints(
      [
        `ALTER INDEX "${SCHEMA}"."m_code_key" RENAME TO "m_code_uidx";`,
        `ALTER INDEX "${SCHEMA}"."m_name_uidx" RENAME TO "m_name_key";`,
      ].join('\n'),
      known,
    );
    console.log(`\n  converted -> ${switched.trim().replace(/\n/g, '\n               ')}\n`);
    await db.query(switched);
    check(
      'constraint renamed to `_uidx` becomes a plain unique index',
      (await isIndex(db, 'm_code_uidx')) &&
        !(await isConstraint(db, 'm_code_key')),
    );
    check(
      '`_uidx` index renamed without the suffix becomes a constraint',
      await isConstraint(db, 'm_name_key'),
    );
  } finally {
    await db.query(`DROP SCHEMA IF EXISTS "${SCHEMA}" CASCADE`);
    await db.end();
    console.log(`\ndropped schema "${SCHEMA}"`);
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
