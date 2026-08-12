
'use client'
import axios from 'axios';
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/Pagination';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { DocumentViewer } from "react-documents";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

  
export default function Editorreport_editor({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData, isFormOpen,controlData}: any){
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { token } = useGlobal();
  const {dfd_reportcase_v1Props, setdfd_reportcase_v1Props} = useContext(TotalContext) as TotalContextProps; 
   function filtetKeyname(str = '', filterString = '') {
    return str?.replace(filterString, '')
  }
  const [paginationData, setPaginationData] = React.useState({
    page: 1,
    pageSize: 1,
    total: 0
  });
  const [orchestrationDataMapper, setorchestrationDataMapper] = React.useState([]);

  function getValueByPath(obj: any, path: string) {
    return path
      .split('.')
      .reduce(
        (acc: { [x: string]: any }, key: string | number) => acc?.[key],
        obj
      )
  }
  function setValueByPath(obj: any, path: string, value: any) {
    const keys = path.split('.')
    let current = obj
    keys.forEach((key: string | number, index: number) => {
      if (index === keys.length - 1) {
        current[key] = value
      } else {
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {}
        }
        current = current[key]
      }
    })
  }
  async function getMapperDetails(){
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
      "6ddb7773ee7a432d85663c490498ef47",
      "354dad335082429daf49a3947071140e"
    );
    if(orchestrationData?.data?.mapper?.length > 0){
      setorchestrationDataMapper(orchestrationData?.data?.mapper);
      let filteredata:any=[];
      if (dfd_reportcase_v1Props.length >0) {
      dfd_reportcase_v1Props?.map((items:any)=>{
        let temp:any={}
        orchestrationData?.data?.mapper?.map((mapItem:any)=>{
          let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
          sourceKey = filtetKeyname(sourceKey, 'items.properties.')
          sourceKey = filtetKeyname(sourceKey, 'properties.')
          let targetKey = mapItem?.targetKey?.split('|').at(-1)
          targetKey = filtetKeyname(targetKey, 'items.properties.')
          targetKey = filtetKeyname(targetKey, 'properties.')
          sourceKey=sourceKey.replaceAll("properties.","")
          targetKey=targetKey.replaceAll("properties.","")
          const value = getValueByPath(items, sourceKey)
          setValueByPath(temp, targetKey, value)
        })
        filteredata.push(temp)
      })
      if(filteredata?.length>0){
        fetchReport(filteredata[0])
      }
    }
    }
  }


  const handleUpdate = (data: { page: number; pageSize: number }) => {
    const { page, pageSize } = data;
    setPaginationData(prevState => ({ ...prevState, page, pageSize }));
    if(orchestrationDataMapper?.length > 0){
      let filteredata:any=[];
      if (dfd_reportcase_v1Props.length >0) {
        dfd_reportcase_v1Props?.map((items:any)=>{
          let temp:any={}
          orchestrationDataMapper?.map((mapItem:any)=>{
            let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
            sourceKey = filtetKeyname(sourceKey, 'items.properties.')
            sourceKey = filtetKeyname(sourceKey, 'properties.')
            let targetKey = mapItem?.targetKey?.split('|').at(-1)
            targetKey = filtetKeyname(targetKey, 'items.properties.')
            targetKey = filtetKeyname(targetKey, 'properties.')
            sourceKey=sourceKey.replaceAll("properties.","")
            targetKey=targetKey.replaceAll("properties.","")
            const value = getValueByPath(items, sourceKey)
            setValueByPath(temp, targetKey, value)
          })
          filteredata.push(temp)
        })
      }

      fetchReport(filteredata[page - 1])
    }
  }

  const fetchReport = async (templadteData:any) => {
    let postData: any = {
        template: {
          content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>AMR Case Report</title>

<style>
    :root {
        --blue: #1f4e79;
        --blue-dark: #163a5c;
        --blue-light: #f4f7fb;
        --blue-mid: #e6edf5;
        --white: #ffffff;
        --off-white: #fafafa;
        --border: #d5dde7;
        --text: #243142;
        --muted: #667085;

        --green: #15803d;
        --green-light: #dcfce7;

        --yellow: #b45309;
        --yellow-light: #fef3c7;

        --red: #b91c1c;
        --red-light: #fee2e2;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        background: #eef1f5;
    }

    body {
        background: #eef1f5;
        font-family: Inter, "Segoe UI", Arial, Helvetica, sans-serif;
        padding: 40px 20px;
        color: var(--text);
        font-size: 13px;
        line-height: 1.45;
    }

    .container {
        max-width: 980px;
        margin: auto;
        background: var(--white);
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10);
        overflow: hidden;
        border-top: 4px solid var(--blue);
        border-radius: 10px;
    }

    /* =========================
       HEADER
    ========================= */

    .header {
        background: linear-gradient(
            135deg,
            #1f4e79 0%,
            #163a5c 100%
        );

        padding: 28px 40px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        position: relative;
        overflow: hidden;
    }

    .header::before {
        content: "";
        position: absolute;

        width: 220px;
        height: 220px;

        background: rgba(255, 255, 255, 0.05);

        border-radius: 50%;

        top: -100px;
        right: -50px;
    }

    .header::after {
        content: "";
        position: absolute;

        width: 160px;
        height: 160px;

        background: rgba(255, 255, 255, 0.04);

        border-radius: 50%;

        bottom: -70px;
        right: 80px;
    }

    .company-logo {
        display: flex;
        align-items: center;
        gap: 14px;
        z-index: 1;
    }

    .company-icon {
        width: 56px;
        height: 56px;

        border: 3px solid #ffffff;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #ffffff;
        font-size: 18px;
        font-weight: 800;
    }

    .company-name .main {
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 1px;
    }

    .company-name .sub {
        color: rgba(255, 255, 255, 0.85);
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 4px;
    }

    .header-right {
        text-align: right;
        color: rgba(255, 255, 255, 0.92);
        z-index: 1;
        font-size: 11px;
        line-height: 1.7;
    }

    .confidential {
        border: 1px solid rgba(255, 255, 255, 0.7);

        padding: 4px 10px;

        display: inline-block;

        border-radius: 6px;

        margin-bottom: 7px;

        font-size: 10px;
        font-weight: 700;

        letter-spacing: 2px;

        color: #ffffff;
    }

    /* =========================
       SUB HEADER
    ========================= */

    .sub-header {
        background: var(--blue-light);

        padding: 12px 40px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 11px;

        color: var(--blue-dark);

        border-bottom: 2px solid var(--border);

        font-weight: 600;
    }

    /* =========================
       TITLE
    ========================= */

    .title {
        text-align: center;

        padding: 30px 20px 14px;

        font-size: 24px;

        font-weight: 800;

        letter-spacing: 2px;

        text-transform: uppercase;

        color: var(--blue-dark);
    }

    .title::after {
        content: "";

        width: 70px;
        height: 4px;

        background: var(--blue);

        display: block;

        margin: 12px auto 0;

        border-radius: 6px;
    }

    /* =========================
       META BAR
    ========================= */

    .meta-bar {
        display: flex;

        margin: 18px 40px;

        border: 1px solid var(--border);

        border-radius: 10px;

        overflow: hidden;

        background: #ffffff;
    }

    .meta-item {
        flex: 1;

        min-height: 68px;

        padding: 13px 16px;

        border-right: 1px solid var(--border);

        background: var(--off-white);

        display: flex;

        flex-direction: column;

        justify-content: center;
    }

    .meta-item:last-child {
        border-right: none;
    }

    .meta-label {
        font-size: 9px;

        color: var(--muted);

        text-transform: uppercase;

        margin-bottom: 5px;

        font-weight: 600;

        letter-spacing: 0.5px;
    }

    .meta-value {
        font-size: 13px;

        font-weight: 700;

        color: var(--blue-dark);

        word-break: break-word;
    }

    /* =========================
       CASE BANNER
    ========================= */

    .case-banner {
        margin: 18px 40px;

        border: 1px solid var(--border);

        border-left: 5px solid var(--blue);

        background: var(--blue-light);

        padding: 14px 18px;

        display: flex;

        justify-content: space-between;

        align-items: center;

        border-radius: 6px;

        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    }

    .case-label {
        font-size: 9px;

        color: var(--muted);

        text-transform: uppercase;

        margin-bottom: 4px;

        letter-spacing: 0.6px;
    }

    .case-number {
        font-size: 18px;

        font-weight: 800;

        color: var(--blue-dark);
    }

    .status-area {
        display: flex;

        gap: 7px;

        align-items: center;

        flex-wrap: wrap;

        justify-content: flex-end;
    }

    /* =========================
       BADGES
    ========================= */

    .badge {
        padding: 5px 10px;

        border-radius: 12px;

        font-size: 10px;

        font-weight: 700;

        display: inline-block;

        white-space: nowrap;

        text-transform: capitalize;
    }

    .badge-green {
        background: var(--green-light);

        color: #166534;
    }

    .badge-yellow {
        background: var(--yellow-light);

        color: #92400e;
    }

    .badge-red {
        background: var(--red-light);

        color: #991b1b;
    }

    .badge-blue {
        background: #dbeafe;

        color: #1e40af;
    }

    .badge-gray {
        background: #e5e7eb;

        color: #374151;
    }

    /* =========================
       SECTION
    ========================= */

    .section {
        padding: 18px 40px 8px;

        page-break-inside: avoid;

        margin-bottom: 2px;
    }

    .section-title {
        background: var(--blue-light);

        border-left: 4px solid var(--blue);

        padding: 10px 14px;

        margin-bottom: 12px;

        color: var(--blue-dark);

        font-size: 12px;

        font-weight: 700;

        text-transform: uppercase;

        border-radius: 0 4px 4px 0;

        display: flex;

        align-items: center;

        gap: 9px;

        letter-spacing: 0.4px;
    }

    .section-number {
        width: 21px;

        height: 21px;

        min-width: 21px;

        border-radius: 50%;

        background: var(--blue);

        color: #ffffff;

        display: flex;

        align-items: center;

        justify-content: center;

        font-size: 10px;

        font-weight: 700;
    }

    /* =========================
       INFO GRID
    ========================= */

    .info-grid {
        display: grid;

        grid-template-columns: repeat(2, 1fr);

        border: 1px solid var(--border);

        border-radius: 6px;

        overflow: hidden;
    }

    .info-item {
        padding: 11px 14px;

        border-bottom: 1px solid var(--border);

        border-right: 1px solid var(--border);

        min-height: 58px;
    }

    .info-item:nth-child(even) {
        border-right: none;
    }

    .info-label {
        font-size: 9px;

        color: var(--muted);

        text-transform: uppercase;

        margin-bottom: 4px;

        letter-spacing: 0.4px;

        font-weight: 600;
    }

    .info-value {
        font-size: 12px;

        font-weight: 600;

        color: #111827;

        word-break: break-word;
    }

    /* =========================
       FINANCIAL
    ========================= */

    .financial-grid {
        display: grid;

        grid-template-columns: repeat(4, 1fr);

        gap: 9px;
    }

    .financial-card {
        border: 1px solid var(--border);

        padding: 14px;

        background: #fafbfc;

        border-radius: 6px;

        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }

    .financial-label {
        font-size: 9px;

        color: var(--muted);

        text-transform: uppercase;

        font-weight: 600;
    }

    .financial-value {
        font-size: 15px;

        font-weight: 700;

        margin-top: 5px;

        color: var(--blue-dark);

        word-break: break-word;
    }

    .financial-card.total {
        background: var(--blue-light);

        border-color: var(--border);

        box-shadow: 0 2px 8px rgba(31, 78, 121, 0.08);
    }

    /* =========================
       TABLE
    ========================= */

    .table-wrapper {
        width: 100%;

        overflow-x: auto;

        border-radius: 6px;
    }

    table {
        width: 100%;

        border-collapse: collapse;

        border-radius: 6px;

        overflow: hidden;
    }

    td,
    th {
        border: 1px solid var(--border);

        padding: 10px 11px;

        font-size: 11px;

        vertical-align: top;
    }

    th {
        background: var(--blue);

        color: #ffffff;

        text-transform: uppercase;

        font-size: 9px;

        letter-spacing: 0.7px;

        font-weight: 700;

        text-align: left;
    }

    tbody tr:nth-child(even) td {
        background: #f7f9fc;
    }

    tbody tr:hover td {
        background: #eef4fa;
    }

    .strong {
        font-weight: 700;

        color: var(--blue-dark);
    }

    /* =========================
       DECISION
    ========================= */

    .decision-box {
        border: 1px solid var(--border);

        padding: 16px;

        background: #fafbfc;

        border-radius: 6px;

        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
    }

    .decision-row {
        display: grid;

        grid-template-columns: 160px 1fr;

        margin-bottom: 10px;

        line-height: 1.5;

        padding-bottom: 9px;

        border-bottom: 1px solid #e8edf3;
    }

    .decision-row:last-child {
        margin-bottom: 0;

        padding-bottom: 0;

        border-bottom: none;
    }

    .decision-label {
        font-weight: 600;

        color: var(--muted);

        font-size: 11px;
    }

    .decision-value {
        font-size: 12px;

        color: #111827;

        font-weight: 600;

        word-break: break-word;
    }

    /* =========================
       CERTIFICATION
    ========================= */

    .certification {
        line-height: 1.7;

        font-size: 11px;

        color: #374151;

        background: #fafbfc;

        border: 1px solid var(--border);

        padding: 14px;

        border-radius: 6px;

        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
    }

    /* =========================
       SIGNATURE
    ========================= */

    .signature-section {
        padding: 30px 40px 36px;

        display: flex;

        justify-content: flex-end;

        border-top: 1px dashed var(--border);

        margin-top: 55px;
    }

    .signature-box {
        width: 280px;

        text-align: center;
    }

    .signature-area {
        height: 60px;

        border: 2px dashed var(--border);

        background: var(--blue-light);

        border-radius: 6px;

        margin-bottom: 9px;

        display: flex;

        align-items: center;

        justify-content: center;

        color: var(--muted);

        font-size: 12px;
    }

    .signature-line {
        border-top: 2px solid var(--blue);

        margin-bottom: 8px;
    }

    .signature-name {
        font-weight: 700;

        color: var(--blue-dark);

        font-size: 13px;
    }

    .signature-title {
        margin-top: 6px;

        font-size: 11px;

        color: #374151;
    }

    .signature-date {
        margin-top: 6px;

        font-size: 11px;

        color: #374151;
    }

    .signature-note {
        margin-top: 7px;

        font-size: 10px;

        color: var(--muted);

        font-style: italic;
    }

    /* =========================
       FOOTER
    ========================= */

    .footer {
        background: linear-gradient(
            135deg,
            #163a5c 0%,
            #1f4e79 100%
        );

        color: rgba(255, 255, 255, 0.92);

        text-align: center;

        padding: 16px;

        font-size: 10px;

        line-height: 1.6;
    }

    .footer strong {
        color: #ffffff;
    }

    /* =========================
       EMPTY VALUE
    ========================= */

    .empty-value {
        color: #98a2b3;

        font-style: italic;

        font-weight: 400;
    }

    /* =========================
       PRINT
    ========================= */

    @media print {

        html {
            background: #ffffff;
        }

        body {
            background: #ffffff;

            padding: 0;
        }

        .container {
            box-shadow: none;

            max-width: 100%;

            border-radius: 0;
        }

        .header,
        .footer,
        .section-title,
        .financial-card.total,
        .badge {
            -webkit-print-color-adjust: exact;

            print-color-adjust: exact;
        }

        .section {
            page-break-inside: avoid;
        }

        table {
            page-break-inside: auto;
        }

        tr {
            page-break-inside: avoid;

            page-break-after: auto;
        }

        .financial-card {
            page-break-inside: avoid;
        }

        .decision-box,
        .certification {
            page-break-inside: avoid;
        }

        .table-wrapper {
            overflow: visible;
        }

        a {
            color: inherit;

            text-decoration: none;
        }
    }

    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 760px) {

        body {
            padding: 15px 8px;
        }

        .header {
            padding: 22px 20px;

            flex-direction: column;

            align-items: flex-start;

            gap: 18px;
        }

        .header-right {
            text-align: left;
        }

        .sub-header {
            padding-left: 20px;

            padding-right: 20px;

            flex-direction: column;

            align-items: flex-start;

            gap: 5px;
        }

        .company-name .main {
            font-size: 20px;
        }

        .company-name .sub {
            font-size: 9px;

            letter-spacing: 1.5px;
        }

        .title {
            font-size: 20px;

            padding-top: 24px;
        }

        .meta-bar {
            margin-left: 20px;

            margin-right: 20px;

            flex-wrap: wrap;
        }

        .meta-item {
            flex: 1 1 50%;

            border-bottom: 1px solid var(--border);
        }

        .meta-item:nth-child(2) {
            border-right: none;
        }

        .case-banner {
            margin-left: 20px;

            margin-right: 20px;

            gap: 12px;

            flex-direction: column;

            align-items: flex-start;
        }

        .status-area {
            justify-content: flex-start;
        }

        .section {
            padding-left: 20px;

            padding-right: 20px;
        }

        .info-grid {
            grid-template-columns: 1fr;
        }

        .info-item {
            border-right: none;
        }

        .financial-grid {
            grid-template-columns: 1fr 1fr;

            gap: 8px;
        }

        .decision-row {
            grid-template-columns: 1fr;

            gap: 4px;
        }

        .table-wrapper {
            overflow-x: auto;
        }

        table {
            min-width: 650px;
        }

        .signature-section {
            padding-left: 20px;

            padding-right: 20px;

            justify-content: center;
        }
    }

    @media (max-width: 480px) {

        .financial-grid {
            grid-template-columns: 1fr;
        }

        .meta-item {
            flex: 1 1 100%;

            border-right: none;
        }

        .company-icon {
            width: 48px;

            height: 48px;
        }
    }
</style>
</head>

<body>

<div class="container">


    <div class="header">

        <div class="company-logo">

            <div class="company-icon">
                AMR
            </div>

            <div class="company-name">

                <div class="main">
                    LEGAL AUTOMATION PLATFORM
                </div>

                <div class="sub">
                    Automated Matter Review
                </div>

            </div>

        </div>

        <div class="header-right">

            <div class="confidential">
                CONFIDENTIAL
            </div>

            <div>
                AMR Review Department
            </div>

            <div style="margin-top:5px;">
                Generated on {{trs_created_date}}
            </div>

        </div>

    </div>


    <div class="sub-header">

        <span>
            AMR Review Department | Legal Recovery Services
        </span>

        <span>
            Case: {{case_display_id}}
        </span>

    </div>

    <div class="title">
        AMR Case Report
    </div>

    <div class="meta-bar">

        <div class="meta-item">

            <div class="meta-label">
                Case Number
            </div>

            <div class="meta-value">
                {{case_display_id}}
            </div>

        </div>

        <div class="meta-item">

            <div class="meta-label">
                Status
            </div>

            <div class="meta-value">
                {{status_name}}
            </div>

        </div>

        <div class="meta-item">

            <div class="meta-label">
                Priority
            </div>

            <div class="meta-value">
                {{priority_name}}
            </div>

        </div>

        <div class="meta-item">

            <div class="meta-label">
                Queue Position
            </div>

            <div class="meta-value">
                {{queue_position}}
            </div>

        </div>

    </div>


    <div class="case-banner">

        <div>

            <div class="case-label">
                Case Display ID
            </div>

            <div class="case-number">
                {{case_display_id}}
            </div>

        </div>

        <div class="status-area">

            <span class="badge badge-blue">
                {{status_name}}
            </span>

            <span class="badge badge-yellow">
                {{priority_name}}
            </span>

        </div>

    </div>
    <div class="section">

        <div class="section-title">

            <div class="section-number">
                1
            </div>

            Account & Debtor Details

        </div>

        <div class="info-grid">

            <div class="info-item">

                <div class="info-label">
                    Case Display ID
                </div>

                <div class="info-value">
                    {{case_display_id}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Account ID
                </div>

                <div class="info-value">
                    {{account_id}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Debtor Name
                </div>

                <div class="info-value">
                    {{debtor_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    SSN
                </div>

                <div class="info-value">
                    {{ssn_masked}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Date of Birth
                </div>

                <div class="info-value">
                    {{dob}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Address
                </div>

                <div class="info-value">
                    {{address}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Creditor
                </div>

                <div class="info-value">
                    {{creditor_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Quality Score
                </div>

                <div class="info-value">
                    {{quality_score}} / 100
                </div>

            </div>

        </div>

    </div>


    <div class="section">

        <div class="section-title">

            <div class="section-number">
                2
            </div>

            Financial Details

        </div>

        <div class="financial-grid">

            <div class="financial-card">

                <div class="financial-label">
                    Principal
                </div>

                <div class="financial-value">
                    {{principal}}
                </div>

            </div>

            <div class="financial-card">

                <div class="financial-label">
                    Interest
                </div>

                <div class="financial-value">
                    {{interest}}
                </div>

            </div>

            <div class="financial-card">

                <div class="financial-label">
                    Fees
                </div>

                <div class="financial-value">
                    {{fees}}
                </div>

            </div>

            <div class="financial-card total">

                <div class="financial-label">
                    Total Balance
                </div>

                <div class="financial-value">
                    {{total_balance}}
                </div>

            </div>

        </div>


        <div class="table-wrapper">

            <table style="margin-top:10px;">

                <thead>

                    <tr>

                        <th>
                            Charge-Off Date
                        </th>

                        <th>
                            Last Payment Date
                        </th>

                        <th>
                            SOL Expiry Date
                        </th>

                        <th>
                            Quality Score
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>
                            {{charge_off_date}}
                        </td>

                        <td>
                            {{last_payment_date}}
                        </td>

                        <td>
                            {{sol_expiry_date}}
                        </td>

                        <td>
                            {{quality_score}} / 100
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                3
            </div>

            Venue & Filing Details

        </div>

        <div class="info-grid">

            <div class="info-item">

                <div class="info-label">
                    State
                </div>

                <div class="info-value">
                    {{state}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    County
                </div>

                <div class="info-value">
                    {{county}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Court
                </div>

                <div class="info-value">
                    {{court_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Judge
                </div>

                <div class="info-value">
                    {{judge_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Filing Fee
                </div>

                <div class="info-value">
                    {{filing_fee}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Service Method
                </div>

                <div class="info-value">
                    {{service_method}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    E-Filing Required
                </div>

                <div class="info-value">
                    {{efiling_required}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    E-Filing System
                </div>

                <div class="info-value">
                    {{efiling_system}}
                </div>

            </div>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                4
            </div>

            Assigned Attorney

        </div>

        <div class="info-grid">

            <div class="info-item">

                <div class="info-label">
                    Attorney
                </div>

                <div class="info-value">
                    {{attorney_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Title
                </div>

                <div class="info-value">
                    {{attorney_title}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Email
                </div>

                <div class="info-value">
                    {{attorney_email}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Attorney Role
                </div>

                <div class="info-value">
                    {{attorney_role}}
                </div>

            </div>

        </div>

    </div>


    <div class="section">

        <div class="section-title">

            <div class="section-number">
                5
            </div>

            Document Verification

        </div>

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Document Type
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Document Reference
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {{#each doc_type_table}}

                    <tr>

                        <td>
                            {{doc_type_name}}
                        </td>

                        <td>

                            {{#if doc_status}}

                                <span class="badge badge-green">
                                    {{doc_status}}
                                </span>

                            {{else}}

                                <span class="badge badge-yellow">
                                    Pending
                                </span>

                            {{/if}}

                        </td>

                        <td>
                            {{doc_reference_url}}
                        </td>

                    </tr>

                    {{/each}}

                </tbody>

            </table>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                6
            </div>

            AMR Verification Checklist

        </div>

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th width="6%">
                            #
                        </th>

                        <th>
                            Checklist Item
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Verification
                        </th>

                        <th>
                            Verified By
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {{#each checklist_table}}

                    <tr>

                        <td>
                            {{checklist_item_id}}
                        </td>

                        <td>
                            {{item_name}}
                        </td>

                        <td>
                            {{category_label}}
                        </td>

                        <td>
                            {{verification_type}}
                        </td>

                        <td>
                            {{verified_by}}
                        </td>

                        <td>

                            {{#if is_complete}}

                                <span class="badge badge-green">
                                    ✓ Complete
                                </span>

                            {{else}}

                                <span class="badge badge-yellow">
                                    Pending
                                </span>

                            {{/if}}

                        </td>

                    </tr>

                    {{/each}}

                </tbody>

            </table>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                7
            </div>

            Venue-Specific Rules

        </div>

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Rule Type
                        </th>

                        <th>
                            Rule / Requirement
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {{#each venue_special_rules}}

                    <tr>

                        <td>

                            {{#if rule_type}}

                                <span class="badge badge-yellow">
                                    {{rule_type}}
                                </span>

                            {{else}}

                                <span class="badge badge-gray">
                                    General
                                </span>

                            {{/if}}

                        </td>

                        <td>
                            {{rule_text}}
                        </td>

                    </tr>

                    {{/each}}

                </tbody>

            </table>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                8
            </div>

            AMR Review & Decision

        </div>

        <div class="decision-box">

            <div class="decision-row">

                <div class="decision-label">
                    Review Status
                </div>

                <div class="decision-value">

                    <span class="badge badge-green">
                        {{review_status}}
                    </span>

                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Reviewed By
                </div>

                <div class="decision-value">
                    {{reviewed_by_name}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Reviewer Title
                </div>

                <div class="decision-value">
                    {{reviewed_by_title}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Reviewer Email
                </div>

                <div class="decision-value">
                    {{reviewed_by_email}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review Start
                </div>

                <div class="decision-value">
                    {{review_start}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review End
                </div>

                <div class="decision-value">
                    {{review_end}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review Duration
                </div>

                <div class="decision-value">
                    {{review_duration}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Decision
                </div>

                <div class="decision-value">

                    <span class="badge badge-green">
                        {{decision}}
                    </span>

                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Rejection Reason
                </div>

                <div class="decision-value">
                    {{rejection_reason_id}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Rejection Comment
                </div>

                <div class="decision-value">
                    {{rejection_comment}}
                </div>

            </div>

        </div>

    </div>


    <div class="section">

        <div class="section-title">

            <div class="section-number">
                9
            </div>

            Case Activity History

        </div>

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Date / Time
                        </th>

                        <th>
                            Activity
                        </th>

                        <th>
                            Performed By
                        </th>

                        <th>
                            Description
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {{#each activity_history}}

                    <tr>

                        <td>
                            {{activity_timestamp}}
                        </td>

                        <td>
                            <span class="strong">
                                {{activity_type}}
                            </span>
                        </td>

                        <td>
                            {{../reviewed_by_name}}
                        </td>

                        <td>
                            {{description}}
                        </td>

                    </tr>

                    {{/each}}

                </tbody>

            </table>

        </div>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                10
            </div>

            Queue & SLA Details

        </div>

        <div class="info-grid">

            <div class="info-item">

                <div class="info-label">
                    Queue Position
                </div>

                <div class="info-value">
                    {{queue_position}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    SLA Wait Start
                </div>

                <div class="info-value">
                    {{sla_wait_start_time}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Current Status
                </div>

                <div class="info-value">
                    {{current_status}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Priority
                </div>

                <div class="info-value">
                    {{priority}}
                </div>

            </div>

        </div>

    </div>


    <div class="section">

        <div class="section-title">

            <div class="section-number">
                11
            </div>

            Certification

        </div>

        <div class="certification">

            I certify that the information contained in this AMR Case Report
            reflects the case information, document verification results,
            checklist status, review details, and decision information
            available in the system at the time of report generation.

        </div>

    </div>

    <div class="signature-section">

        <div class="signature-box">

            <div class="signature-area">
                Attorney Signature
            </div>

            <div class="signature-line"></div>

            <div class="signature-name">
                {{attorney_name}}
            </div>

            <div class="signature-title">
                {{attorney_title}}
            </div>

            <div class="signature-date">
                Date: {{signature_timestamp}}
            </div>

            <div class="signature-note">
                — AMR Reviewing Attorney —
            </div>

        </div>

    </div>


    <div class="footer">

        <strong>LEGAL AUTOMATION PLATFORM</strong>

        &nbsp;•&nbsp;

        AMR Review Department

        &nbsp;•&nbsp;

        Case: {{case_display_id}}

        &nbsp;•&nbsp;

        This is a system-generated document.

    </div>

</div>

</body>
</html>`,
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
      data:templadteData,
    };
    let reportData: any = await axios.post(
      'https://jsreport9x.toruslowcode.com/api/report',
      postData,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const blob = new Blob([reportData.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

  }

  useEffect(() => {
    getMapperDetails()
  }, [dfd_reportcase_v1Props]);
  return (
    <div 
      //style={{gridColumn: `1 / 25`,gridRow: `1 / 103`, gap:``, height: `100%`, overflow: 'auto'}}
      className='w-full h-full'
      >
     
      {pdfUrl && dfd_reportcase_v1Props.length >0 ? (
       <div className={`flex flex-col w-full h-full gap-3`}>
       <DocumentViewer
          url={pdfUrl}
          viewer='pdf'
          className='h-full w-full'
        />
        <Pagination
        className='flex w-full items-center justify-center'
        page={paginationData.page}
        pageSize={1}
        pageSizeOptions={[1]}
        total={dfd_reportcase_v1Props.length}
        onUpdate={handleUpdate}
        //showInput={true}
        //size='s'
      />
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  )
}
