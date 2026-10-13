
'use client'
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { useContext } from "react";
import * as XLSX from "@e965/xlsx";
import * as XLSXStyle from 'xlsx-js-style'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import setSearchfilterEventDetails from "@/context/setSearchfilterEventDetails.json"
export function normalToDynamicArrayCopyFormData(copiedData:any,type:any,state:any,setState:any=()=>{})
{

    if(type=='object')
    {
        setState({...state,...copiedData})
    }else{

    }
}

export function useHandleGroupArrayCopyFormData(){
    const AllStates:any = useContext(TotalContext) as TotalContextProps;
    return(copiedData:any,type:any,arraygroupName:any)=>{
    }
}


export function flattenKeepInner(obj:any, result:any = {}) {
  for (let key in obj) {
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = value; // keep the parent key
      flattenKeepInner(value, result); // also spread inner keys
    } else {
      result[key] = value;
    }
  }
  return result;
}


export function clearSetSarchFilterData(
  data: any = [],
  nodeDetails: any[] = []
) {
  let nodeRecords = data || []
  let allSearchFilterData: any = setSearchfilterEventDetails || {}
  let groupIdsToApply: any[] = nodeDetails || []

  // Walk each groupId we were asked to apply.
  groupIdsToApply.forEach(groupId => {
    // Skip any groupId that has no matching rule set.
    if (!(groupId in allSearchFilterData)) return

    // A groupId can have more than one rule set; apply every one of them.
    allSearchFilterData[groupId].forEach((rule: any) => {
      // "key" isn't a nodeId, drop it so only nodeId entries remain below.
      delete rule.key
      // Every remaining key in the rule is a nodeId this rule targets.
      const nodeIdsInRule = Object.keys(rule)

      // Walk each nodeId this rule targets.
      nodeIdsInRule.forEach(nodeId => {
        // Find the node record that matches this nodeId.
        const record = nodeRecords.find((r: any) => r.nodeId === nodeId)
        // Skip if we have no record for this nodeId.
        if (!record) return

        // The keys inside rule[nodeId] are the property names to delete.
        const propertiesToRemove = Object.keys(rule[nodeId])
        // Delete each of those properties from the matching record.
        propertiesToRemove.forEach(propertyKey => {
          delete record[propertyKey]
        })
      })
    })
  })

  return nodeRecords
}

function escapeCsvCell(value: any): string {
  if (value === null || value === undefined) return "";
  const str = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ---------------- CSV ----------------
export function exportJsonToCsv(jsonData: any[], fileName = "data.csv", headerText?: string) {
  if (!jsonData || !jsonData.length) return;

  const headers = Object.keys(jsonData[0]);
  const rows = jsonData.map(row =>
    headers.map(header => escapeCsvCell(row[header])).join(',')
  )

  const lines: string[] = []
  if (headerText) {
    // CSV can't store alignment, so place the title in the middle column
    const middleIndex = Math.floor((headers.length - 1) / 2)
    const titleRow = new Array(headers.length).fill('')
    titleRow[middleIndex] = escapeCsvCell(headerText)
    lines.push(titleRow.join(','), '') // title row + blank spacer row
  }
  lines.push(headers.join(','), ...rows)

  const csvContent = lines.join('\r\n')
console.log(lines[0])
  // Prefix with a BOM so Excel opens UTF-8 CSVs without mangling special characters
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;'
  })
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ---------------- XLSX ----------------
export function exportJsonToExcel(jsonData: any[],fileName = 'data.xlsx',headerText?: string) {
  if (!jsonData || !jsonData.length) return

  const headers = Object.keys(jsonData[0])
  const colCount = headers.length

  const rows = jsonData.map(row =>
    headers.map(header => {
      const value = row[header]
      if (value === null || value === undefined) return ''
      return typeof value === 'object' ? JSON.stringify(value) : value
    })
  )

  // Layout: [title], [blank], [column headers], ...data
  const titleRows = headerText ? [[headerText], []] : []
  const headerRowIndex = titleRows.length
  const aoa = [...titleRows, headers, ...rows]

  const worksheet = XLSXStyle.utils.aoa_to_sheet(aoa)

  const thinBorder = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  }

  const titleStyle = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: 'center', vertical: 'center' }
  }

  const columnHeaderStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { patternType: 'solid', fgColor: { rgb: '2980B9' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: thinBorder
  }

  const dataCellStyle = {
    alignment: { vertical: 'center' },
    border: thinBorder
  }

  // Title: merge across all columns, bold, centered
  if (headerText) {
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(colCount - 1, 0) } }
    ]
    worksheet['A1'].s = titleStyle
  }

  // Column header row + data rows
  const lastRowIndex = headerRowIndex + rows.length
  for (let r = headerRowIndex; r <= lastRowIndex; r++) {
    for (let c = 0; c < colCount; c++) {
      const cellRef = XLSXStyle.utils.encode_cell({ r, c })
      if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' }
      worksheet[cellRef].s = r === headerRowIndex ? columnHeaderStyle : dataCellStyle
    }
  }

  // Column widths based on content
  worksheet['!cols'] = headers.map((header, c) => {
    const maxLen = Math.max(
      String(header).length,
      ...rows.map(row => String(row[c] ?? '').length)
    )
    return { wch: Math.min(Math.max(maxLen + 2, 10), 50) }
  })

  // Row heights
  const rowHeights: { hpt: number }[] = []
  if (headerText) rowHeights[0] = { hpt: 24 }
  rowHeights[headerRowIndex] = { hpt: 20 }
  worksheet['!rows'] = rowHeights

  const workbook = XLSXStyle.utils.book_new()
  XLSXStyle.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSXStyle.writeFile(workbook, fileName);
}

// ---------------- PDF ----------------
export function exportJsonToPdf(jsonData: any[], fileName = 'data.pdf', headerText?: string) {
  if (!jsonData || !jsonData.length) return;

  const headers = Object.keys(jsonData[0]);
  const rows = jsonData.map((row) =>
    headers.map((header) => {
      const value = row[header];
      if (value === null || value === undefined) return "";
      return typeof value === "object" ? JSON.stringify(value) : String(value);
    })
  );

  const columnCount = headers.length;
  const isWide = columnCount > 6;

  const marginMm = 10;
  const minColWidthMm = 24;
  const maxSinglePageWidthMm = 2000;
  const pageHeightMm = 297;

  const neededWidthMm = marginMm * 2 + columnCount * minColWidthMm;
  const useHorizontalSplit = isWide && neededWidthMm > maxSinglePageWidthMm;
  const pageWidthMm = isWide
    ? Math.min(Math.max(neededWidthMm, pageHeightMm), maxSinglePageWidthMm)
    : 210;

  const doc = new jsPDF({
    orientation: isWide ? "landscape" : "portrait",
    unit: "mm",
    format: isWide ? [pageWidthMm, pageHeightMm] : "a4",
  });

  const fontSize = columnCount > 25 ? 7 : 8;

  // Reserve space above the table for the title when one is provided
  const titleFontSize = 14
  const titleY = 14
  const titleSpaceMm = headerText ? 12 : 0

  autoTable(doc, {
    head: [headers],
    body: rows,
    styles: {
      fontSize,
      cellWidth: "wrap",
      overflow: "linebreak",
      minCellWidth: minColWidthMm - 4,
    },
    headStyles: { fillColor: [41, 128, 185], fontSize },
    margin: { top: 10 + titleSpaceMm, left: marginMm, right: marginMm, bottom: 10 },
    theme: "grid",
    horizontalPageBreak: useHorizontalSplit,
    horizontalPageBreakRepeat: useHorizontalSplit ? 0 : undefined,
    // Draw the centered title at the top of every page
    didDrawPage: () => {
      if (!headerText) return
      const pageWidth = doc.internal.pageSize.getWidth()
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(titleFontSize)
      doc.setTextColor(0, 0, 0)
      doc.text(headerText, pageWidth / 2, titleY, { align: 'center' })
      doc.setFont('helvetica', 'normal')
    }
  })

  doc.save(fileName);
}



