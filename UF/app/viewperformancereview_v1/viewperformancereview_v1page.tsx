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


export default function PageViewperformancereviewV1() {
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
    "completed_at_datepicker": {
      "show": false
    },
    "review_id": {
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
    "cycle_name": {
      "show": false
    },
    "review_number": {
      "show": false
    },
    "review_type": {
      "show": false
    },
    "review_status": {
      "show": false
    }
  },
  "valid_group": {
    "ratings": {
      "show": false
    },
    "self_rating": {
      "show": false
    },
    "self_rating_progress": {
      "show": false
    },
    "manager_rating": {
      "show": false
    },
    "manager_rating_progress": {
      "show": false
    },
    "final_rating": {
      "show": false
    },
    "final_rating_progress": {
      "show": false
    }
  },
  "addt__group": {
    "comments": {
      "show": false
    },
    "improvements": {
      "show": false
    }
  },
  "addt__dts_group": {
    "add_inf": {
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
  const screenName:string = "performance review";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {viewperformancereview_v1, setviewperformancereview_v1} = useContext(TotalContext) as TotalContextProps;
  const {viewperformancereview_v1Props, setviewperformancereview_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_access_group,setChecknew_access_group,]=useState<boolean>(false);
  const [checkaccess_req__group,setCheckaccess_req__group,]=useState<boolean>(false);
  const [checkvalid_group,setCheckvalid_group,]=useState<boolean>(false);
  const [checkaddt__group,setCheckaddt__group,]=useState<boolean>(false);
  const [checkaddt__dts_group,setCheckaddt__dts_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {new_access_groupc5a99, setnew_access_groupc5a99} = useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0} = useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab} = useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f} = useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cyclenamecombo_v1Props, setdfd_cyclenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewtypecombo_v1Props, setdfd_reviewtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewstatuscombo_v1Props, setdfd_reviewstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      addperformancereviewmodify_v1:false,
      employeenamecombo_v1:false,
      cyclenamecombo_v1:false,
      reviewtypecombo_v1:false,
      reviewstatuscombo_v1:false,
    });
    async function addperformancereviewmodify_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let addperformancereviewmodify_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceReviewModify:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          addperformancereviewmodify_v1Body["dpdKey"] = encryptionDpd;
          addperformancereviewmodify_v1Body["method"] = encryptionMethod;
        }
        if(viewperformancereview_v1Props.length > 0){
          for(let i=0;i< viewperformancereview_v1Props.length;i++){
            if(viewperformancereview_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceReviewModify:AFVK:v1"){
              // delete viewperformancereview_v1Props[i].DFDkey;
              let temp=structuredClone(viewperformancereview_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          addperformancereviewmodify_v1Body['filterData'] = filterData;
        }
        const addperformancereviewmodify_v1Data:any=await AxiosService.post("/te/eventEmitter",addperformancereviewmodify_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=addperformancereviewmodify_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(addperformancereviewmodify_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_addperformancereviewmodify_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_addperformancereviewmodify_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (addperformancereviewmodify_v1Data?.data?.dataset) {
           setdfd_addperformancereviewmodify_v1Props(
              Array.isArray(addperformancereviewmodify_v1Data?.data?.dataset?.data)
                 ? addperformancereviewmodify_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_addperformancereviewmodify_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.addperformancereviewmodify_v1) {
      addperformancereviewmodify_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.addperformancereviewmodify_v1= true
  },[refetch?.addperformancereviewmodify_v1])
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
        if(viewperformancereview_v1Props.length > 0){
          for(let i=0;i< viewperformancereview_v1Props.length;i++){
            if(viewperformancereview_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"){
              // delete viewperformancereview_v1Props[i].DFDkey;
              let temp=structuredClone(viewperformancereview_v1Props[i])
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
    async function cyclenamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let cyclenamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:cycleNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          cyclenamecombo_v1Body["dpdKey"] = encryptionDpd;
          cyclenamecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewperformancereview_v1Props.length > 0){
          for(let i=0;i< viewperformancereview_v1Props.length;i++){
            if(viewperformancereview_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:cycleNameCombo:AFVK:v1"){
              // delete viewperformancereview_v1Props[i].DFDkey;
              let temp=structuredClone(viewperformancereview_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          cyclenamecombo_v1Body['filterData'] = filterData;
        }
        const cyclenamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",cyclenamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=cyclenamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(cyclenamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_cyclenamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_cyclenamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (cyclenamecombo_v1Data?.data?.dataset) {
           setdfd_cyclenamecombo_v1Props(
              Array.isArray(cyclenamecombo_v1Data?.data?.dataset?.data)
                 ? cyclenamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_cyclenamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.cyclenamecombo_v1) {
      cyclenamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.cyclenamecombo_v1= true
  },[refetch?.cyclenamecombo_v1])
    async function reviewtypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let reviewtypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:reviewTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          reviewtypecombo_v1Body["dpdKey"] = encryptionDpd;
          reviewtypecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewperformancereview_v1Props.length > 0){
          for(let i=0;i< viewperformancereview_v1Props.length;i++){
            if(viewperformancereview_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:reviewTypeCombo:AFVK:v1"){
              // delete viewperformancereview_v1Props[i].DFDkey;
              let temp=structuredClone(viewperformancereview_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          reviewtypecombo_v1Body['filterData'] = filterData;
        }
        const reviewtypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",reviewtypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=reviewtypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(reviewtypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_reviewtypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_reviewtypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (reviewtypecombo_v1Data?.data?.dataset) {
           setdfd_reviewtypecombo_v1Props(
              Array.isArray(reviewtypecombo_v1Data?.data?.dataset?.data)
                 ? reviewtypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_reviewtypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.reviewtypecombo_v1) {
      reviewtypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.reviewtypecombo_v1= true
  },[refetch?.reviewtypecombo_v1])
    async function reviewstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let reviewstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:reviewStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          reviewstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          reviewstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(viewperformancereview_v1Props.length > 0){
          for(let i=0;i< viewperformancereview_v1Props.length;i++){
            if(viewperformancereview_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:reviewStatusCombo:AFVK:v1"){
              // delete viewperformancereview_v1Props[i].DFDkey;
              let temp=structuredClone(viewperformancereview_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          reviewstatuscombo_v1Body['filterData'] = filterData;
        }
        const reviewstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",reviewstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=reviewstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(reviewstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_reviewstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_reviewstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (reviewstatuscombo_v1Data?.data?.dataset) {
           setdfd_reviewstatuscombo_v1Props(
              Array.isArray(reviewstatuscombo_v1Data?.data?.dataset?.data)
                 ? reviewstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_reviewstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.reviewstatuscombo_v1) {
      reviewstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.reviewstatuscombo_v1= true
  },[refetch?.reviewstatuscombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setviewperformancereview_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1',
      [user],
      'pageViewperformancereviewV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await addperformancereviewmodify_v1DFD(pagination)
    await employeenamecombo_v1DFD(pagination)
    await cyclenamecombo_v1DFD(pagination)
    await reviewtypecombo_v1DFD(pagination)
    await reviewstatuscombo_v1DFD(pagination)
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
            if(nodes?.groupName == 'valid_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvalid_group(true)
            }
            if(nodes?.groupName == 'addt__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaddt__group(true)
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
          codeStates['new_access_group'] = new_access_groupc5a99;
          codeStates['setnew_access_group'] = setnew_access_groupc5a99;
          codeStates['access_req__group'] = access_req__group002d0;
          codeStates['setaccess_req__group'] = setaccess_req__group002d0;
          codeStates['valid_group'] = valid_group3a8ab;
          codeStates['setvalid_group'] = setvalid_group3a8ab;
          codeStates['addt__group'] = addt__group6ba4f;
          codeStates['setaddt__group'] = setaddt__group6ba4f;
          codeStates['addt__dts_group'] = addt__dts_group613d2;
          codeStates['setaddt__dts_group'] = setaddt__dts_group613d2;
          codeStates['dynamicactions'] = dynamicactionsb315b;
          codeStates['setdynamicactions'] = setdynamicactionsb315b;
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
    setviewperformancereview_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(viewperformancereview_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(viewperformancereview_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setviewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    