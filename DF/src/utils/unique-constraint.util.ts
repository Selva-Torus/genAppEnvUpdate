// utils/unique-constraint.util.ts
//
// Prisma renders every `@unique` / `@@unique` as `CREATE UNIQUE INDEX`, because its
// internal SQL model only knows unique *indexes* — it has no notion of a table-level
// UNIQUE constraint. No schema attribute, generator option or `prisma migrate diff`
// flag changes that, so the DDL is rewritten here after Prisma has produced it.
//
// A model can still ask for a real unique index: give it a database name ending in
// `_uidx` (`@unique(map: "email_uidx")`, `@@unique([a, b], map: "a_b_uidx")`) and it is
// left as `CREATE UNIQUE INDEX`. Every other unique becomes a UNIQUE constraint. The
// name is the marker because it is the only part of the schema Prisma carries through
// to every statement, including the DROP / RENAME of an incremental diff.
//
// Rewriting the `CREATE` on its own is not enough: once an index is backed by a
// constraint, PostgreSQL refuses `DROP INDEX` ("cannot drop index ... because
// constraint ... requires it"), so the matching `DROP INDEX` / `ALTER INDEX ... RENAME`
// statements a later incremental diff emits have to be rewritten too. That needs to
// know which index names were constraints, which is what `UniqueIndexMap` carries.

/** Database-name suffix that keeps a Prisma unique as a UNIQUE INDEX. */
export const UNIQUE_INDEX_SUFFIX = '_uidx';

/** Quoted SQL identifier, allowing the doubled `""` escape Prisma uses. */
const QUOTED = String.raw`"(?:[^"]|"")*"`;
/** Table reference, optionally schema qualified. */
const QUALIFIED = String.raw`(?:${QUOTED}\.)?${QUOTED}`;
/** A plain column list — only bare quoted identifiers, see `isConvertible` below. */
const COLUMNS = String.raw`${QUOTED}(?:, ${QUOTED})*`;

// A UNIQUE constraint cannot express everything a unique index can: PostgreSQL rejects
// per-column sort order, operator classes, expressions, `WHERE` and non-btree methods
// on constraints. Anchoring the column list to bare identifiers and the statement to a
// closing `);` leaves every such index untouched instead of producing invalid DDL.
const CREATE_UNIQUE_INDEX_RE = new RegExp(
  String.raw`^(\s*)CREATE UNIQUE INDEX (${QUOTED}) ON (${QUALIFIED})\((${COLUMNS})\);(\s*)$`,
);
const DROP_INDEX_RE = new RegExp(
  String.raw`^(\s*)DROP INDEX (?:(${QUOTED})\.)?(${QUOTED});(\s*)$`,
);
const RENAME_INDEX_RE = new RegExp(
  String.raw`^(\s*)ALTER INDEX (?:(${QUOTED})\.)?(${QUOTED}) RENAME TO (${QUOTED});(\s*)$`,
);
const ADD_UNIQUE_CONSTRAINT_RE = new RegExp(
  String.raw`^\s*ALTER TABLE (${QUALIFIED}) ADD CONSTRAINT (${QUOTED}) UNIQUE \((${COLUMNS})\);\s*$`,
);
const SPLIT_QUALIFIED_RE = new RegExp(
  String.raw`^(?:(${QUOTED})\.)?${QUOTED}$`,
);

export type UniqueKind = 'constraint' | 'index';

export interface UniqueIndexInfo {
  /** Table reference, as Prisma wrote it. */
  tableRef: string;
  /** Column list, as Prisma wrote it — needed to recreate it as the other kind. */
  columns: string;
  kind: UniqueKind;
}

/** Index name (schema qualified, quoted) -> where it lives and what it is. */
export type UniqueIndexMap = Map<string, UniqueIndexInfo>;

/** Is the quoted identifier `name` marked to stay a UNIQUE INDEX? */
export function isUniqueIndexName(name: string): boolean {
  return name.slice(1, -1).endsWith(UNIQUE_INDEX_SUFFIX);
}

function kindOf(name: string): UniqueKind {
  return isUniqueIndexName(name) ? 'index' : 'constraint';
}

function indexKey(schema: string | undefined, name: string): string {
  return `${schema ?? ''}.${name}`;
}

function schemaOf(tableRef: string): string | undefined {
  return SPLIT_QUALIFIED_RE.exec(tableRef)?.[1];
}

/**
 * Plain unique indexes in `sql`, mapped to their table, columns and the kind they are
 * (or are about to become). Reads both the Prisma form and the already-rewritten form
 * so it can be run over a converted script as well as a raw one.
 */
export function collectUniqueIndexes(sql: string): UniqueIndexMap {
  const map: UniqueIndexMap = new Map();
  if (!sql) return map;

  for (const line of sql.split('\n')) {
    const created = CREATE_UNIQUE_INDEX_RE.exec(line);
    if (created) {
      const [, , name, tableRef, columns] = created;
      map.set(indexKey(schemaOf(tableRef), name), {
        tableRef,
        columns,
        kind: kindOf(name),
      });
      continue;
    }
    const added = ADD_UNIQUE_CONSTRAINT_RE.exec(line);
    if (added) {
      const [, tableRef, name, columns] = added;
      map.set(indexKey(schemaOf(tableRef), name), {
        tableRef,
        columns,
        kind: 'constraint',
      });
    }
  }
  return map;
}

/** Prisma tags each statement with a `-- CreateIndex` style comment; keep it accurate. */
function retagComment(
  lines: string[],
  at: number,
  from: string,
  to: string,
): void {
  for (let i = at - 1; i >= 0; i--) {
    if (lines[i].trim() === '') continue;
    if (lines[i].trim() === `-- ${from}`) {
      lines[i] = lines[i].replace(`-- ${from}`, `-- ${to}`);
    }
    return;
  }
}

/**
 * Rewrite the unique-index DDL Prisma emits into UNIQUE constraint DDL, except for
 * uniques named `*_uidx`, which stay unique indexes.
 *
 * Indexes that cannot legally become constraints are left exactly as they are, as are
 * non-unique indexes. The transform is idempotent, so running it over an already
 * converted script is a no-op.
 *
 * @param sql            output of `prisma migrate diff --script`
 * @param knownUniqueIndexes unique indexes that already exist in the "from" schema,
 *                       from `collectUniqueIndexes` of that schema's baseline. Required
 *                       to rewrite `DROP` / `RENAME` in an incremental script; omit it
 *                       for a `--from-empty` baseline, which only creates.
 */
export function convertUniqueIndexesToConstraints(
  sql: string,
  knownUniqueIndexes?: UniqueIndexMap,
): string {
  if (!sql) return sql;

  // The "from" schema is authoritative for drops and renames, so it overlays anything
  // discovered in this script.
  const known = collectUniqueIndexes(sql);
  for (const [key, info] of knownUniqueIndexes ?? []) known.set(key, info);

  const lines = sql.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const created = CREATE_UNIQUE_INDEX_RE.exec(lines[i]);
    if (created) {
      const [, indent, name, tableRef, columns, trail] = created;
      if (isUniqueIndexName(name)) continue;
      lines[i] =
        `${indent}ALTER TABLE ${tableRef} ADD CONSTRAINT ${name} UNIQUE (${columns});${trail}`;
      retagComment(lines, i, 'CreateIndex', 'CreateUniqueConstraint');
      continue;
    }

    const dropped = DROP_INDEX_RE.exec(lines[i]);
    if (dropped) {
      const [, indent, schema, name, trail] = dropped;
      const info = known.get(indexKey(schema, name));
      if (info?.kind === 'constraint') {
        lines[i] =
          `${indent}ALTER TABLE ${info.tableRef} DROP CONSTRAINT ${name};${trail}`;
        retagComment(lines, i, 'DropIndex', 'DropUniqueConstraint');
      }
      continue;
    }

    const renamed = RENAME_INDEX_RE.exec(lines[i]);
    if (renamed) {
      const [, indent, schema, oldName, newName, trail] = renamed;
      const info = known.get(indexKey(schema, oldName));
      if (!info) continue;
      const to = kindOf(newName);

      if (info.kind === 'constraint' && to === 'constraint') {
        lines[i] =
          `${indent}ALTER TABLE ${info.tableRef} RENAME CONSTRAINT ${oldName} TO ${newName};${trail}`;
        retagComment(lines, i, 'RenameIndex', 'RenameUniqueConstraint');
      } else if (info.kind === 'constraint' && to === 'index') {
        // A constraint's index cannot be detached from it, so drop and recreate.
        lines[i] =
          `${indent}ALTER TABLE ${info.tableRef} DROP CONSTRAINT ${oldName};${trail}\n` +
          `${indent}CREATE UNIQUE INDEX ${newName} ON ${info.tableRef}(${info.columns});${trail}`;
        retagComment(lines, i, 'RenameIndex', 'ConvertUniqueConstraintToIndex');
      } else if (info.kind === 'index' && to === 'constraint') {
        // PostgreSQL adopts the existing index and renames it to the constraint name.
        lines[i] =
          `${indent}ALTER TABLE ${info.tableRef} ADD CONSTRAINT ${newName} UNIQUE USING INDEX ${oldName};${trail}`;
        retagComment(lines, i, 'RenameIndex', 'ConvertUniqueIndexToConstraint');
      }
      // index -> index: Prisma's ALTER INDEX ... RENAME is already right.
    }
  }

  return lines.join('\n');
}
