'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
const Groupnew_access_group = dynamic(() => import("./Groupnew_access_group/Groupnew_access_group"), { ssr: false });


export default function PageNewbackgroundcheckV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "CXO": {
    "blockedGroups": []
  },
  "HR Manager": {
    "blockedGroups": []
  },
  "Info Security Officer": {
    "blockedGroups": []
  },
  "Employee": {
    "blockedGroups": []
  },
  "IT Manager": {
    "blockedGroups": []
  },
  "Operation Staff": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Operation Manager": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "new_access_group": {
    "check_id": {
      "show": false
    }
  },
  "access_req__group": {
    "basic_inf": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "check_type": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "initiated_date": {
      "show": false
    },
    "completed_date": {
      "show": false
    },
    "result": {
      "show": false
    },
    "verification_status": {
      "show": false
    }
  },
  "addt__dts_group": {
    "add_inf": {
      "show": false
    },
    "notes": {
      "show": false
    },
    "add_dts": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel": {
      "show": false
    },
    "button_update": {
      "show": false
    },
    "save": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "background check";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {newbackgroundcheck_v1, setnewbackgroundcheck_v1} = useContext(TotalContext) as TotalContextProps;
  const {newbackgroundcheck_v1Props, setnewbackgroundcheck_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_access_group,setChecknew_access_group,]=useState<boolean>(false);
  const [checkaccess_req__group,setCheckaccess_req__group,]=useState<boolean>(false);
  const [checkaddt__dts_group,setCheckaddt__dts_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {new_access_group03ace, setnew_access_group03ace} = useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45d, setaccess_req__groupdd45d} = useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865, setaddt__dts_group0d865} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addbackgroundcheckmodify_v1Props, setdfd_addbackgroundcheckmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_checktypecombo_v1Props, setdfd_checktypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_bgcheckresultcombo_v1Props, setdfd_bgcheckresultcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_checkverificationstatuscombo_v1Props, setdfd_checkverificationstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      addbackgroundcheckmodify_v1:false,
      employeenamecombo_v1:false,
      checktypecombo_v1:false,
      bgcheckresultcombo_v1:false,
      checkverificationstatuscombo_v1:false,
    });
    async function addbackgroundcheckmodify_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let addbackgroundcheckmodify_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addBackgroundCheckModify:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          addbackgroundcheckmodify_v1Body["dpdKey"] = encryptionDpd;
          addbackgroundcheckmodify_v1Body["method"] = encryptionMethod;
        }
        if(newbackgroundcheck_v1Props.length > 0){
          for(let i=0;i< newbackgroundcheck_v1Props.length;i++){
            if(newbackgroundcheck_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addBackgroundCheckModify:AFVK:v1"){
              // delete newbackgroundcheck_v1Props[i].DFDkey;
              let temp=structuredClone(newbackgroundcheck_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          addbackgroundcheckmodify_v1Body['filterData'] = filterData;
        }
        const addbackgroundcheckmodify_v1Data:any=await AxiosService.post("/te/eventEmitter",addbackgroundcheckmodify_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=addbackgroundcheckmodify_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(addbackgroundcheckmodify_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_addbackgroundcheckmodify_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_addbackgroundcheckmodify_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (addbackgroundcheckmodify_v1Data?.data?.dataset) {
           setdfd_addbackgroundcheckmodify_v1Props(
              Array.isArray(addbackgroundcheckmodify_v1Data?.data?.dataset?.data)
                 ? addbackgroundcheckmodify_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_addbackgroundcheckmodify_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.addbackgroundcheckmodify_v1) {
      addbackgroundcheckmodify_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.addbackgroundcheckmodify_v1= true
  },[refetch?.addbackgroundcheckmodify_v1])
    async function employeenamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employeenamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employeenamecombo_v1Body["dpdKey"] = encryptionDpd;
          employeenamecombo_v1Body["method"] = encryptionMethod;
        }
        if(newbackgroundcheck_v1Props.length > 0){
          for(let i=0;i< newbackgroundcheck_v1Props.length;i++){
            if(newbackgroundcheck_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"){
              // delete newbackgroundcheck_v1Props[i].DFDkey;
              let temp=structuredClone(newbackgroundcheck_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employeenamecombo_v1Body['filterData'] = filterData;
        }
        const employeenamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",employeenamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employeenamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employeenamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_employeenamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employeenamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employeenamecombo_v1Data?.data?.dataset) {
           setdfd_employeenamecombo_v1Props(
              Array.isArray(employeenamecombo_v1Data?.data?.dataset?.data)
                 ? employeenamecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_employeenamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employeenamecombo_v1) {
      employeenamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employeenamecombo_v1= true
  },[refetch?.employeenamecombo_v1])
    async function checktypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let checktypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:checkTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          checktypecombo_v1Body["dpdKey"] = encryptionDpd;
          checktypecombo_v1Body["method"] = encryptionMethod;
        }
        if(newbackgroundcheck_v1Props.length > 0){
          for(let i=0;i< newbackgroundcheck_v1Props.length;i++){
            if(newbackgroundcheck_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:checkTypeCombo:AFVK:v1"){
              // delete newbackgroundcheck_v1Props[i].DFDkey;
              let temp=structuredClone(newbackgroundcheck_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          checktypecombo_v1Body['filterData'] = filterData;
        }
        const checktypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",checktypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=checktypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(checktypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_checktypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_checktypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (checktypecombo_v1Data?.data?.dataset) {
           setdfd_checktypecombo_v1Props(
              Array.isArray(checktypecombo_v1Data?.data?.dataset?.data)
                 ? checktypecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_checktypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.checktypecombo_v1) {
      checktypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.checktypecombo_v1= true
  },[refetch?.checktypecombo_v1])
    async function bgcheckresultcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let bgcheckresultcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:bgCheckResultCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          bgcheckresultcombo_v1Body["dpdKey"] = encryptionDpd;
          bgcheckresultcombo_v1Body["method"] = encryptionMethod;
        }
        if(newbackgroundcheck_v1Props.length > 0){
          for(let i=0;i< newbackgroundcheck_v1Props.length;i++){
            if(newbackgroundcheck_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:bgCheckResultCombo:AFVK:v1"){
              // delete newbackgroundcheck_v1Props[i].DFDkey;
              let temp=structuredClone(newbackgroundcheck_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          bgcheckresultcombo_v1Body['filterData'] = filterData;
        }
        const bgcheckresultcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",bgcheckresultcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=bgcheckresultcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(bgcheckresultcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_bgcheckresultcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_bgcheckresultcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (bgcheckresultcombo_v1Data?.data?.dataset) {
           setdfd_bgcheckresultcombo_v1Props(
              Array.isArray(bgcheckresultcombo_v1Data?.data?.dataset?.data)
                 ? bgcheckresultcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_bgcheckresultcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.bgcheckresultcombo_v1) {
      bgcheckresultcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.bgcheckresultcombo_v1= true
  },[refetch?.bgcheckresultcombo_v1])
    async function checkverificationstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let checkverificationstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:checkVerificationStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          checkverificationstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          checkverificationstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(newbackgroundcheck_v1Props.length > 0){
          for(let i=0;i< newbackgroundcheck_v1Props.length;i++){
            if(newbackgroundcheck_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:checkVerificationStatusCombo:AFVK:v1"){
              // delete newbackgroundcheck_v1Props[i].DFDkey;
              let temp=structuredClone(newbackgroundcheck_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          checkverificationstatuscombo_v1Body['filterData'] = filterData;
        }
        const checkverificationstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",checkverificationstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=checkverificationstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(checkverificationstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_checkverificationstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_checkverificationstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (checkverificationstatuscombo_v1Data?.data?.dataset) {
           setdfd_checkverificationstatuscombo_v1Props(
              Array.isArray(checkverificationstatuscombo_v1Data?.data?.dataset?.data)
                 ? checkverificationstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_checkverificationstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.checkverificationstatuscombo_v1) {
      checkverificationstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.checkverificationstatuscombo_v1= true
  },[refetch?.checkverificationstatuscombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setnewbackgroundcheck_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1',
      [user],
      'pageNewbackgroundcheckV1',
      token
    )
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
      }
      try {
        if(encryptionFlagPage){
          await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await addbackgroundcheckmodify_v1DFD(pagination)
    await employeenamecombo_v1DFD(pagination)
    await checktypecombo_v1DFD(pagination)
    await bgcheckresultcombo_v1DFD(pagination)
    await checkverificationstatuscombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'new_access_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecknew_access_group(true)
            }
            if(nodes?.groupName == 'access_req__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaccess_req__group(true)
            }
            if(nodes?.groupName == 'addt__dts_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaddt__dts_group(true)
            }
            if(nodes?.groupName == 'dynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactions(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['new_access_group'] = new_access_group03ace;
          codeStates['setnew_access_group'] = setnew_access_group03ace;
          codeStates['access_req__group'] = access_req__groupdd45d;
          codeStates['setaccess_req__group'] = setaccess_req__groupdd45d;
          codeStates['addt__dts_group'] = addt__dts_group0d865;
          codeStates['setaddt__dts_group'] = setaddt__dts_group0d865;
          codeStates['dynamicactions'] = dynamicactions2fc7f;
          codeStates['setdynamicactions'] = setdynamicactions2fc7f;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck();
    handleOnload();
    setnewbackgroundcheck_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(newbackgroundcheck_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(newbackgroundcheck_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setnewbackgroundcheck_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checknew_access_group && initialLoad &&<Groupnew_access_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    