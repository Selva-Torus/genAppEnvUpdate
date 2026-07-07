
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
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { DocumentViewer } from "react-documents";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

  
export default function Editoreditor({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData, isFormOpen,controlData}: any){
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const token: string = getCookie('token');
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
      "70325bef786f406da368861e40b6c7b4",
      "35a4ccdabb2b4245b3f8d4f6a312d754"
    );
    if(orchestrationData?.data?.mapper?.length > 0){
      setorchestrationDataMapper(orchestrationData?.data?.mapper);
      let filteredata:any=[];
      if (dfd_country_code_dfd_v1Props.length >0) {
      dfd_country_code_dfd_v1Props?.map((items:any)=>{
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
      if (dfd_country_code_dfd_v1Props.length >0) {
        dfd_country_code_dfd_v1Props?.map((items:any)=>{
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
  <title>Lottery Draw Report</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    /* Global Styles */
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      margin: 0;
      padding: 0;
      color: #333;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-x: hidden;
      animation: fadeIn 1s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Report Container */
    .report-container {
      background: #fff;
      border-radius: 25px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      width: 90%;
      max-width: 850px;
      padding: 60px 50px;
      border-top: 10px solid #ff6b6b;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .report-container:hover {
      transform: translateY(-5px);
    }

    /* Logo */
    .logo-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 35px;
      animation: slideIn 1s ease-out 0.5s both;
    }

    @keyframes slideIn {
      from { transform: translateX(-100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .logo-section img {
      height: 90px;
      width: auto;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .logo-section img:hover {
      transform: scale(1.05);
    }

    /* Header */
    .report-header {
      text-align: center;
      border-bottom: 4px solid #ff6b6b;
      padding-bottom: 20px;
      margin-bottom: 35px;
      animation: slideIn 1s ease-out 0.7s both;
    }

    .report-header h1 {
      margin: 0;
      color: #ff6b6b;
      font-size: 36px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }

    /* Sections */
    .report-section {
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      animation: fadeInUp 1s ease-out both;
      animation-delay: calc(var(--i) * 0.1s);
    }

    .report-section:nth-child(1) { --i: 1; }
    .report-section:nth-child(2) { --i: 2; }
    .report-section:nth-child(3) { --i: 3; }
    .report-section:nth-child(4) { --i: 4; }
    .report-section:nth-child(5) { --i: 5; }
    .report-section:nth-child(6) { --i: 6; }
    .report-section:nth-child(7) { --i: 7; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .report-section label {
      font-weight: 600;
      color: #555;
      font-size: 18px;
      flex: 1;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 18px 25px;
      border-radius: 15px;
      border-left: 6px solid #ff6b6b;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      position: relative;
    }

    .report-section label:hover {
      background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
      transform: translateX(5px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.1);
    }

    .report-section label::before {
      content: "\f058";
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      color: #ff6b6b;
      margin-right: 10px;
      font-size: 20px;
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 50px;
      color: #888;
      font-size: 16px;
      border-top: 2px solid #eee;
      padding-top: 20px;
      font-style: italic;
      animation: fadeIn 1s ease-out 1s both;
    }

    /* Decorative circles */
    .report-container::before,
    .report-container::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      z-index: -1;
      opacity: 0.08;
    }

    .report-container::before {
      width: 200px;
      height: 200px;
      background: #ff6b6b;
      top: -80px;
      left: -80px;
      animation: float 6s ease-in-out infinite;
    }

    .report-container::after {
      width: 250px;
      height: 250px;
      background: #ff6b6b;
      bottom: -80px;
      right: -80px;
      animation: float 6s ease-in-out infinite 3s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .report-container {
        padding: 30px 20px;
        width: 95%;
      }
      .report-header h1 {
        font-size: 28px;
      }
      .report-section label {
        font-size: 16px;
        padding: 15px 18px;
      }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <!-- Logo Section -->
    <div class="logo-section">
      <img src="https://cdns3dfsdev.toruslowcode.com/torus/9.1/TT407/resources/images/Mongo/logo-removebg-preview.png" width="200px" alt="Company Logo">
    </div>

    <!-- Report Header -->
    <div class="report-header">
      <h1>DETAILS</h1>
    </div>

    <!-- Report Body -->
    <div class="report-section">
      <label>Country : {{country}}</label>
    </div>
    <div class="report-section">
      <label>Country Code : {{country_code}}</label>
    </div>
    <div class="report-section">
      <label>State : {{state}}</label>
    </div>
    <div class="report-section">
      <label>Prize Type : {{prize_type}}</label>
    </div>
    <div class="report-section">
      <label>Status Code : {{state_code}}</label>
    </div>
    <!-- Footer -->
    <div class="footer">
      © 2025 Report System | Generated on 2025-10-27
    </div>
  </div>
</body>
</html>
`,
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
  }, [dfd_country_code_dfd_v1Props]);
  return (
    <div 
      //style={{gridColumn: `1 / 25`,gridRow: `3 / 198`, gap:``, height: `100%`, overflow: 'auto'}}
      className='w-full h-full'
      >
     
      {pdfUrl && dfd_country_code_dfd_v1Props.length >0 ? (
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
        total={dfd_country_code_dfd_v1Props.length}
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
