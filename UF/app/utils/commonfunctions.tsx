
'use client'
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { useContext } from "react";
import * as XLSX from "@e965/xlsx";
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

export function exportJsonToCsv(jsonData: any[], fileName = "data.csv") {
  if (!jsonData || !jsonData.length) return;

  const headers = Object.keys(jsonData[0]);
  const rows = jsonData.map((row) => headers.map((header) => escapeCsvCell(row[header])).join(","));
  const csvContent = [headers.join(","), ...rows].join("\r\n");

  // Prefix with a BOM so Excel opens UTF-8 CSVs without mangling special characters
  const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportJsonToExcel(jsonData:any, fileName = "data.xlsx") {
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Append worksheet
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Download file
  XLSX.writeFile(workbook, fileName);
}

export function exportJsonToPdf(jsonData: any[], fileName = "data.pdf") {
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

  // Instead of forcing wide tables onto a fixed-size sheet (which either
  // crushes every column into an unreadable sliver, or - with a forced
  // column split - leaves later pages mostly blank), size the page itself
  // to the data: give every column enough width to stay legible on ONE
  // page, and only fall back to splitting columns across pages once that
  // page would get impractically wide.
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
    margin: { top: 10, left: marginMm, right: marginMm, bottom: 10 },
    theme: "grid",
    // Only kicks in for extremely wide tables where even a large page
    // can't fit every column - spills the extras onto additional page
    // groups, repeating the first column as an anchor.
    horizontalPageBreak: useHorizontalSplit,
    horizontalPageBreakRepeat: useHorizontalSplit ? 0 : undefined,
  });

  doc.save(fileName);
}



