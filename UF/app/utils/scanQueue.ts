// Helpers for the CHEQUE scan queue.
//
// A cheque scan returns one url per image type for each scanned document, and
// every url belonging to the same document carries the same documentName. The
// queue is the flat list of every scanned-but-unsaved url; a "transaction" is
// one documentName's worth of them. The viewer shows a single transaction at a
// time, tracked by an index into the ordered list of documentNames.

export type ScanQueueItem = {
  _uuid?: string
  urlData?: string
  documentName?: string
  imagetypeid?: string
  [key: string]: any
}

/* The scanner's imagetypeid, as returned per image in the scan response. Every
 * image of one cheque shares a file extension, so this is the only thing that
 * tells the four apart and it is what the viewer's type filter groups by. */
export const CHEQUE_IMAGE_TYPES: Record<string, string> = {
  '1': 'TiffFront',
  '2': 'TiffBack',
  '3': 'JpegFront',
  '4': 'JpegBack',
  '11': 'UVFront'
}

/** 'TiffFront' for '1'; '' for an id the map does not cover. */
export function getImageTypeLabel(imagetypeid?: string | number): string {
  const key = imagetypeid === null || imagetypeid === undefined ? '' : String(imagetypeid)

  return CHEQUE_IMAGE_TYPES[key] || ''
}

const nameOf = (item: ScanQueueItem): string => item?.documentName ?? ''

/** The queue's documentNames, in scan order, one entry per transaction. */
export function getTransactionNames(queue: ScanQueueItem[] = []): string[] {
  const names: string[] = []

  ;(queue || []).forEach(item => {
    const name = nameOf(item)

    if (!names.includes(name)) {
      names.push(name)
    }
  })

  return names
}

/** How many transactions the queue holds. */
export function getTransactionCount(queue: ScanQueueItem[] = []): number {
  return getTransactionNames(queue).length
}

/** `index` forced into range; 0 for an empty queue. */
export function clampTransactionIndex(
  queue: ScanQueueItem[] = [],
  index: number = 0
): number {
  const count = getTransactionCount(queue)

  if (count === 0) {
    return 0
  }

  return Math.min(Math.max(0, index || 0), count - 1)
}

/** Every item of the transaction sitting at `index`. */
export function getTransactionAt(
  queue: ScanQueueItem[] = [],
  index: number = 0
): ScanQueueItem[] {
  const names = getTransactionNames(queue)

  if (names.length === 0) {
    return []
  }

  const name = names[clampTransactionIndex(queue, index)]

  return (queue || []).filter(item => nameOf(item) === name)
}

/** The queue with every item carrying `documentName` dropped. */
export function removeTransaction(
  queue: ScanQueueItem[] = [],
  documentName: string
): ScanQueueItem[] {
  return (queue || []).filter(item => nameOf(item) !== (documentName ?? ''))
}
