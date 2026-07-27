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


export default function PageViewleaveapplyV1() {
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
    "leave_req_id": {
      "show": false
    }
  },
  "access_req__group": {
    "leave_req_details": {
      "show": false
    },
    "leave_request_number": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "policy_name": {
      "show": false
    },
    "leave_reason_category": {
      "show": false
    },
    "emergency_leave_checkbox": {
      "show": false
    },
    "start_date": {
      "show": false
    },
    "end_date": {
      "show": false
    },
    "days_requested": {
      "show": false
    },
    "half_day_switch": {
      "show": false
    },
    "haf_day_session": {
      "show": false
    }
  },
  "emp_avail_group": {
    "employee_availability": {
      "show": false
    },
    "contact_during_leave": {
      "show": false
    },
    "handover_notes": {
      "show": false
    }
  },
  "leave_balance_group": {
    "employee_availability": {
      "show": false
    },
    "leave_balance_before": {
      "show": false
    },
    "leave_balance_after": {
      "show": false
    }
  },
  "app_det_group": {
    "approval_comments": {
      "show": false
    },
    "reject_reason": {
      "show": false
    },
    "cancellation_reason": {
      "show": false
    }
  },
  "approve_group": {
    "app_det": {
      "show": false
    }
  },
  "audit_group": {
    "add_info": {
      "show": false
    },
    "add_inf_textarea": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "leave management";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {viewleaveapply_v1, setviewleaveapply_v1} = useContext(TotalContext) as TotalContextProps;
  const {viewleaveapply_v1Props, setviewleaveapply_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_access_group,setChecknew_access_group,]=useState<boolean>(false);
  const [checkaccess_req__group,setCheckaccess_req__group,]=useState<boolean>(false);
  const [checkemp_avail_group,setCheckemp_avail_group,]=useState<boolean>(false);
  const [checkleave_balance_group,setCheckleave_balance_group,]=useState<boolean>(false);
  const [checkapp_det_group,setCheckapp_det_group,]=useState<boolean>(false);
  const [checkapprove_group,setCheckapprove_group,]=useState<boolean>(false);
  const [checkaudit_group,setCheckaudit_group,]=useState<boolean>(false);
  const {new_access_group8a441, setnew_access_group8a441} = useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5} = useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f} = useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0} = useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e} = useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845} = useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policynamecombo_v1Props, setdfd_policynamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavereasoncategorycombo_v1Props, setdfd_leavereasoncategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applyleave_v1Props, setdfd_applyleave_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      employeenamecombo_v1:false,
      policynamecombo_v1:false,
      leavereasoncategorycombo_v1:false,
      applyleave_v1:false,
    });
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
        if(viewleaveapply_v1Props.length > 0){
          for(let i=0;i< viewleaveapply_v1Props.length;i++){
            if(viewleaveapply_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1"){
              // delete viewleaveapply_v1Props[i].DFDkey;
              let temp=structuredClone(viewleaveapply_v1Props[i])
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
    async function policynamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let policynamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:policyNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          policynamecombo_v1Body["dpdKey"] = encryptionDpd;
          policynamecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewleaveapply_v1Props.length > 0){
          for(let i=0;i< viewleaveapply_v1Props.length;i++){
            if(viewleaveapply_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:policyNameCombo:AFVK:v1"){
              // delete viewleaveapply_v1Props[i].DFDkey;
              let temp=structuredClone(viewleaveapply_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          policynamecombo_v1Body['filterData'] = filterData;
        }
        const policynamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",policynamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=policynamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(policynamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_policynamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_policynamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (policynamecombo_v1Data?.data?.dataset) {
           setdfd_policynamecombo_v1Props(
              Array.isArray(policynamecombo_v1Data?.data?.dataset?.data)
                 ? policynamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_policynamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.policynamecombo_v1) {
      policynamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.policynamecombo_v1= true
  },[refetch?.policynamecombo_v1])
    async function leavereasoncategorycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let leavereasoncategorycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveReasonCategoryCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          leavereasoncategorycombo_v1Body["dpdKey"] = encryptionDpd;
          leavereasoncategorycombo_v1Body["method"] = encryptionMethod;
        }
        if(viewleaveapply_v1Props.length > 0){
          for(let i=0;i< viewleaveapply_v1Props.length;i++){
            if(viewleaveapply_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveReasonCategoryCombo:AFVK:v1"){
              // delete viewleaveapply_v1Props[i].DFDkey;
              let temp=structuredClone(viewleaveapply_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          leavereasoncategorycombo_v1Body['filterData'] = filterData;
        }
        const leavereasoncategorycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",leavereasoncategorycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=leavereasoncategorycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(leavereasoncategorycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_leavereasoncategorycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_leavereasoncategorycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (leavereasoncategorycombo_v1Data?.data?.dataset) {
           setdfd_leavereasoncategorycombo_v1Props(
              Array.isArray(leavereasoncategorycombo_v1Data?.data?.dataset?.data)
                 ? leavereasoncategorycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_leavereasoncategorycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.leavereasoncategorycombo_v1) {
      leavereasoncategorycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.leavereasoncategorycombo_v1= true
  },[refetch?.leavereasoncategorycombo_v1])
    async function applyleave_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let applyleave_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          applyleave_v1Body["dpdKey"] = encryptionDpd;
          applyleave_v1Body["method"] = encryptionMethod;
        }
        if(viewleaveapply_v1Props.length > 0){
          for(let i=0;i< viewleaveapply_v1Props.length;i++){
            if(viewleaveapply_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1"){
              // delete viewleaveapply_v1Props[i].DFDkey;
              let temp=structuredClone(viewleaveapply_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          applyleave_v1Body['filterData'] = filterData;
        }
        const applyleave_v1Data:any=await AxiosService.post("/te/eventEmitter",applyleave_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=applyleave_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(applyleave_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_applyleave_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_applyleave_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (applyleave_v1Data?.data?.dataset) {
           setdfd_applyleave_v1Props(
              Array.isArray(applyleave_v1Data?.data?.dataset?.data)
                 ? applyleave_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_applyleave_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.applyleave_v1) {
      applyleave_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.applyleave_v1= true
  },[refetch?.applyleave_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setviewleaveapply_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1',
      [user],
      'pageViewleaveapplyV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await employeenamecombo_v1DFD(pagination)
    await policynamecombo_v1DFD(pagination)
    await leavereasoncategorycombo_v1DFD(pagination)
    await applyleave_v1DFD(pagination)
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
            if(nodes?.groupName == 'emp_avail_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemp_avail_group(true)
            }
            if(nodes?.groupName == 'leave_balance_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_balance_group(true)
            }
            if(nodes?.groupName == 'app_det_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapp_det_group(true)
            }
            if(nodes?.groupName == 'approve_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapprove_group(true)
            }
            if(nodes?.groupName == 'audit_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaudit_group(true)
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
          codeStates['new_access_group'] = new_access_group8a441;
          codeStates['setnew_access_group'] = setnew_access_group8a441;
          codeStates['access_req__group'] = access_req__group578e5;
          codeStates['setaccess_req__group'] = setaccess_req__group578e5;
          codeStates['emp_avail_group'] = emp_avail_groupeb48f;
          codeStates['setemp_avail_group'] = setemp_avail_groupeb48f;
          codeStates['leave_balance_group'] = leave_balance_group98af0;
          codeStates['setleave_balance_group'] = setleave_balance_group98af0;
          codeStates['app_det_group'] = app_det_group5b97e;
          codeStates['setapp_det_group'] = setapp_det_group5b97e;
          codeStates['approve_group'] = approve_group4d845;
          codeStates['setapprove_group'] = setapprove_group4d845;
          codeStates['audit_group'] = audit_group2b7ff;
          codeStates['setaudit_group'] = setaudit_group2b7ff;
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
    setviewleaveapply_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(viewleaveapply_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(viewleaveapply_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setviewleaveapply_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    