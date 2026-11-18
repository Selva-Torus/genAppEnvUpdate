/**
 * Generates the TAM DDL scripts from the Prisma schema.
 *
 * Replaces calling `prisma migrate diff --script` directly: Prisma always renders
 * `@unique` / `@@unique` as `CREATE UNIQUE INDEX` and offers no option to render a
 * UNIQUE constraint instead, so its output is post-processed here. See
 * `src/utils/unique-constraint.util.ts` for what is rewritten and why. Uniques named
 * `*_uidx` are kept as unique indexes, so one model can have both kinds.
 *
 *   npm run ddl:generate                 # baseline only
 *   npm run ddl:generate -- --incremental # also regenerate the incremental script
 *
 * The incremental script is opt-in because the ERD flow owns that file and writes its
 * own "No DDL changes available" sentinel into it; regenerating it from a stale
 * `schema.previous.prisma` would overwrite that.
 */

import { execFileSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import {
  collectUniqueIndexes,
  convertUniqueIndexesToConstraints,
  UniqueIndexMap,
} from '../utils/unique-constraint.util';

//const PRISMA_DIR = join('src', 'erd', 'prisma');
const PRISMA_DIR = process.env.PRISMA_DIR ?? join('src', 'erd', 'prisma');
const SCHEMA = join(PRISMA_DIR, 'schema.prisma');
const PREVIOUS_SCHEMA = join(PRISMA_DIR, 'schema.previous.prisma');
const MIGRATIONS_DIR = join(PRISMA_DIR, 'migrations');
const BASELINE = join(MIGRATIONS_DIR, 'ddl_changes_baseline.sql');
const INCREMENTAL = join(MIGRATIONS_DIR, 'ddl_changes_incremental.sql');

/** Sentinel `getLatestMigrationSql` looks for; kept so an empty diff stays recognisable. */
const EMPTY_MIGRATION = '-- This is an empty migration.';

// Run the CLI's entry point on this Node binary rather than going through `npx`: Node
// refuses to spawn the `npx.cmd` shim without `shell: true`, and a shell would
// concatenate the arguments unescaped.
const PRISMA_CLI = require.resolve('prisma/build/index.js');

function migrateDiff(from: string[], to: string[]): string {
  // `migrate diff` is read-only; a non-zero exit throws.
  return execFileSync(
    process.execPath,
    [PRISMA_CLI, 'migrate', 'diff', ...from, ...to, '--script'],
    { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
  );
}

function write(path: string, sql: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, sql, 'utf-8');
  console.log(`wrote ${path}`);
}

function main(): void {
  // Baseline: empty -> current. Creates only, so no "from" state is needed.
  const rawBaseline = migrateDiff(
    ['--from-empty'],
    ['--to-schema-datamodel', SCHEMA],
  );
  const baseline = convertUniqueIndexesToConstraints(rawBaseline);
  write(BASELINE, baseline);

  if (!process.argv.includes('--incremental')) return;

  // Incremental: previous -> current. Its DROP / RENAME statements name an index but
  // not its table, so resolve them against the previous schema's own baseline.
  let previousUniques: UniqueIndexMap = new Map();
  try {
    previousUniques = collectUniqueIndexes(
      migrateDiff(['--from-empty'], ['--to-schema-datamodel', PREVIOUS_SCHEMA]),
    );
  } catch (error) {
    console.warn(
      `could not read ${PREVIOUS_SCHEMA}, leaving DROP/RENAME INDEX untouched:`,
      error instanceof Error ? error.message : error,
    );
  }

  const rawIncremental = migrateDiff(
    ['--from-schema-datamodel', PREVIOUS_SCHEMA],
    ['--to-schema-datamodel', SCHEMA],
  );
  const incremental = rawIncremental.includes(EMPTY_MIGRATION)
    ? rawIncremental
    : convertUniqueIndexesToConstraints(rawIncremental, previousUniques);
  write(INCREMENTAL, incremental);
}

main();
