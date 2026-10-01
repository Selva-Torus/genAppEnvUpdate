'use client'

import React from 'react';
import Popup from '@/components/Popup';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { exportJsonToCsv, exportJsonToExcel, exportJsonToPdf } from './commonfunctions';

type ExportFormat = 'CSV' | 'XLSX' | 'PDF';

const EXPORT_FORMATS: ExportFormat[] = ['PDF', 'CSV', 'XLSX'];

const FORMAT_LABELS: Record<ExportFormat, string> = {
  PDF: 'Export as PDF',
  CSV: 'Export as CSV',
  XLSX: 'Export as XLS',
};

const ExportOptionsModal = ({
  open,
  onClose,
  data,
  anchorRef,
  fileName = 'exportedData',
  downloadFormats = EXPORT_FORMATS,
}: {
  open: boolean;
  onClose: () => void;
  data: any[];
  anchorRef: React.RefObject<HTMLElement>;
  fileName?: string;
  downloadFormats?: ExportFormat[];
}) => {
  const handleExport = (format: ExportFormat) => {
    if (!data?.length) return;
    if (format === 'CSV') exportJsonToCsv(data, `${fileName}.csv`);
    if (format === 'XLSX') exportJsonToExcel(data, `${fileName}.xlsx`);
    if (format === 'PDF') exportJsonToPdf(data, `${fileName}.pdf`);
    onClose();
  };

  return (
    <Popup
      anchorRef={anchorRef}
      open={open}
      onClose={onClose}
      placement="bottom-end"
      size="s"
      hasArrow={false}
    >
      <div className="-mx-4 flex flex-col" style={{ width: 'calc(100% + 2rem)' }}>
        {downloadFormats.map((format, index) => (
          <React.Fragment key={format}>
            {index > 0 && (
              <div
                style={{ width: '100%', height: 1, backgroundColor: 'var(--border-color, #E5E7EB)' }}
              />
            )}
            <button
              type="button"
              onClick={() => handleExport(format)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-[var(--hover-color)]"
              style={{ width: '100%' }}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center text-gray-900 dark:text-gray-100">
                <Icon data="IoDownloadOutline" size={16} fillContainer={false} />
              </span>
              <Text contentAlign="left" className="font-medium leading-none">{FORMAT_LABELS[format]}</Text>
            </button>
          </React.Fragment>
        ))}
      </div>
    </Popup>
  );
};

export default ExportOptionsModal;
