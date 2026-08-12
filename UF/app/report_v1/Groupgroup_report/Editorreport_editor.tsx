
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

    body {
        background: #eef1f5;
        font-family: Inter, 'Segoe UI', Arial, Helvetica, sans-serif;
        padding: 40px 20px;
        color: var(--text);
        font-size: 13px;
    }

    .container {
        max-width: 980px;
        margin: auto;
        background: var(--white);
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10);
        overflow: hidden;
        border-top: 4px solid var(--blue);
    }

    /* HEADER */

    .header {
        background: linear-gradient(135deg, #1f4e79 0%, #163a5c 100%);
        padding: 26px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .header::before {
        content: '';
        position: absolute;
        width: 220px;
        height: 220px;
        background: rgba(255,255,255,0.05);
        border-radius: 50%;
        top: -100px;
        right: -50px;
    }

    .header::after {
        content: '';
        position: absolute;
        width: 160px;
        height: 160px;
        background: rgba(255,255,255,0.04);
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
        border: 3px solid #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
    }

    .company-name .main {
        font-size: 25px;
        font-weight: 800;
        color: #fff;
        letter-spacing: 1px;
    }

    .company-name .sub {
        color: rgba(255,255,255,0.85);
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 3px;
    }

    .header-right {
        text-align: right;
        color: rgba(255,255,255,0.92);
        z-index: 1;
        font-size: 11px;
        line-height: 1.7;
    }

    .confidential {
        border: 1px solid rgba(255,255,255,0.7);
        padding: 4px 10px;
        display: inline-block;
        border-radius: 6px;
        margin-bottom: 7px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #fff;
    }

    /* SUB HEADER */

    .sub-header {
        background: var(--blue-light);
        padding: 12px 40px;
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: var(--blue-dark);
        border-bottom: 2px solid var(--border);
        font-weight: 600;
    }

    /* TITLE */

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
        content: '';
        width: 70px;
        height: 4px;
        background: var(--blue);
        display: block;
        margin: 12px auto 0;
        border-radius: 6px;
    }

    /* META */

    .meta-bar {
        display: flex;
        margin: 18px 40px;
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
    }

    .meta-item {
        flex: 1;
        padding: 13px 16px;
        border-right: 1px solid var(--border);
        background: var(--off-white);
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
        letter-spacing: .5px;
    }

    .meta-value {
        font-size: 13px;
        font-weight: 700;
        color: var(--blue-dark);
    }

    /* CASE BANNER */

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
    }

    .case-label {
        font-size: 9px;
        color: var(--muted);
        text-transform: uppercase;
        margin-bottom: 4px;
        letter-spacing: .6px;
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
    }

    /* BADGES */

    .badge {
        padding: 5px 10px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 700;
        display: inline-block;
        white-space: nowrap;
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

    /* SECTION */

    .section {
        padding: 18px 40px 8px;
        page-break-inside: avoid;
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
    }

    .section-number {
        width: 21px;
        height: 21px;
        border-radius: 50%;
        background: var(--blue);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
    }

    /* INFO GRID */

    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        border: 1px solid var(--border);
    }

    .info-item {
        padding: 11px 14px;
        border-bottom: 1px solid var(--border);
        border-right: 1px solid var(--border);
    }

    .info-item:nth-child(even) {
        border-right: none;
    }

    .info-label {
        font-size: 9px;
        color: var(--muted);
        text-transform: uppercase;
        margin-bottom: 4px;
        letter-spacing: .4px;
    }

    .info-value {
        font-size: 12px;
        font-weight: 600;
        color: #111827;
    }

    /* FINANCIAL */

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
    }

    .financial-label {
        font-size: 9px;
        color: var(--muted);
        text-transform: uppercase;
    }

    .financial-value {
        font-size: 15px;
        font-weight: 700;
        margin-top: 5px;
        color: var(--blue-dark);
    }

    .financial-card.total {
        background: var(--blue-light);
        border-color: var(--border);
    }

    /* TABLE */

    table {
        width: 100%;
        border-collapse: collapse;
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
        color: #fff;
        text-transform: uppercase;
        font-size: 9px;
        letter-spacing: .7px;
        font-weight: 700;
        text-align: left;
    }

    tbody tr:nth-child(even) td {
        background: #f7f9fc;
    }

    .strong {
        font-weight: 700;
        color: var(--blue-dark);
    }

    /* CHECKLIST */

    .check {
        color: var(--green);
        font-weight: 700;
    }

    .pending {
        color: var(--yellow);
        font-weight: 700;
    }

    .failed {
        color: var(--red);
        font-weight: 700;
    }

    /* DECISION */

    .decision-box {
        border: 1px solid var(--border);
        padding: 16px;
        background: #fafbfc;
        border-radius: 6px;
    }

    .decision-row {
        display: grid;
        grid-template-columns: 150px 1fr;
        margin-bottom: 9px;
        line-height: 1.5;
    }

    .decision-row:last-child {
        margin-bottom: 0;
    }

    .decision-label {
        font-weight: 600;
        color: var(--muted);
    }

    /* CERTIFICATION */

    .certification {
        line-height: 1.7;
        font-size: 11px;
        color: #374151;
        background: #fafbfc;
        border: 1px solid var(--border);
        padding: 14px;
    }

    /* SIGNATURE */

    .signature-section {
        padding: 30px 40px 36px;
        display: flex;
        justify-content: flex-end;
        border-top: 1px dashed var(--border);
        margin-top: 20px;
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

    .signature-note {
        margin-top: 7px;
        font-size: 10px;
        color: var(--muted);
        font-style: italic;
    }

    /* FOOTER */

    .footer {
        background: linear-gradient(135deg, #163a5c 0%, #1f4e79 100%);
        color: rgba(255,255,255,0.92);
        text-align: center;
        padding: 16px;
        font-size: 10px;
    }

    .footer strong {
        color: #fff;
    }

    @media print {

        body {
            background: #fff;
            padding: 0;
        }

        .container {
            box-shadow: none;
            max-width: 100%;
        }

        .section {
            page-break-inside: avoid;
        }

        table {
            page-break-inside: auto;
        }

        tr {
            page-break-inside: avoid;
        }

        .financial-card {
            page-break-inside: avoid;
        }
    }

    /* PROFESSIONAL REFINEMENTS */
    html {
        background: #eef1f5;
    }

    .container {
        border-radius: 10px;
    }

    .meta-bar {
        background: #fff;
    }

    .meta-item {
        min-height: 68px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .case-banner {
        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    }

    .section {
        margin-bottom: 2px;
    }

    .section-title {
        letter-spacing: .4px;
    }

    .info-grid,
    table {
        border-radius: 6px;
        overflow: hidden;
    }

    .financial-card {
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }

    .financial-card.total {
        box-shadow: 0 2px 8px rgba(31, 78, 121, 0.08);
    }

    .decision-box,
    .certification {
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
    }

    @media (max-width: 760px) {
        body {
            padding: 15px 8px;
        }

        .header,
        .sub-header {
            padding-left: 20px;
            padding-right: 20px;
        }

        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
        }

        .header-right {
            text-align: left;
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

        .case-banner {
            margin-left: 20px;
            margin-right: 20px;
            gap: 12px;
        }

        .section {
            padding-left: 20px;
            padding-right: 20px;
        }

        .info-grid,
        .financial-grid {
            grid-template-columns: 1fr;
        }

        .info-item {
            border-right: none;
        }

        .financial-grid {
            gap: 8px;
        }

        table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }

        .signature-section {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    @media print {
        html {
            background: #fff;
        }

        .container {
            border-radius: 0;
        }

        .header,
        .footer {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
    }

</style>
</head>

<body>

<div class="container">
    <div class="header">
        <div class="company-logo">
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


        <table style="margin-top:10px;">

            <thead>

                <tr>
                    <th>Charge-Off Date</th>
                    <th>Last Payment Date</th>
                    <th>SOL Expiry Date</th>
                    <th>Quality Score</th>
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
                    Persona Role
                </div>

                <div class="info-value">
                    {{persona_role}}
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

        <table>

            <thead>

                <tr>
                    <th>Document Type</th>
                    <th>Status</th>
                    <th>Reference</th>
                </tr>

            </thead>

            <tbody>

                {{#each documents}}

                <tr>

                    <td>
                        {{doc_type_name}}
                    </td>

                    <td>

                        {{#if doc_status}}
                            {{doc_status}}
                        {{else}}
                            Pending
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


    <div class="section">

        <div class="section-title">

            <div class="section-number">
                6
            </div>

            AMR Verification Checklist

        </div>

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
                        Status
                    </th>


                </tr>

            </thead>

            <tbody>

                {{#each checklist}}

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
                        {{default_verification_type}}
                    </td>

                    <td>

                        {{#if is_complete}}

                            <span class="badge badge-green">
                                ✓ Complete
                            </span>

                        {{else}}

                            <span class="badge badge-yellow">
                                ⚠ Pending
                            </span>

                        {{/if}}

                    </td>

                </tr>

                {{/each}}

            </tbody>

        </table>

    </div>

    <div class="section">

        <div class="section-title">

            <div class="section-number">
                7
            </div>

            Venue-Specific Rules

        </div>

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

                {{#each venue_rules}}

                <tr>

                    <td>
                        {{rule_type}}
                    </td>

                    <td>
                        {{rule_text}}
                    </td>

                </tr>

                {{/each}}

            </tbody>

        </table>

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

                <div>
                    {{status_name}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Reviewed By
                </div>

                <div>
                    {{reviewed_attorney_name}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review Start
                </div>

                <div>
                    {{review_start_timestamp}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review End
                </div>

                <div>
                    {{review_end_timestamp}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Review Duration
                </div>

                <div>
                    {{review_duration_sec}} seconds
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Decision
                </div>

                <div>
                    {{decision}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Rejection Reason
                </div>

                <div>
                    {{rejection_reason}}
                </div>

            </div>


            <div class="decision-row">

                <div class="decision-label">
                    Rejection Comment
                </div>

                <div>
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

                {{#each activities}}

                <tr>

                    <td>
                        {{activity_timestamp}}
                    </td>

                    <td>
                        {{activity_type}}
                    </td>

                    <td>
                        {{activity_by}}
                    </td>

                    <td>
                        {{description}}
                    </td>

                </tr>

                {{/each}}

            </tbody>

        </table>

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
                    {{status_name}}
                </div>

            </div>

            <div class="info-item">

                <div class="info-label">
                    Priority
                </div>

                <div class="info-value">
                    {{priority_name}}
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

            <div style="margin-top:6px;font-size:11px;">
                {{attorney_title}}
            </div>

            <div style="margin-top:6px;font-size:11px;">
                Date: {{signature_timestamp}}
            </div>

            <div class="signature-note">
                — AMR Reviewing Attorney —
            </div>

        </div>

    </div>

    <div class="footer">

        <strong>LEGAL AUTOMATION PLATFORM</strong>
        • AMR Review Department •
        Case: {{case_display_id}}
        • This is a system-generated document.

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
      '',
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
