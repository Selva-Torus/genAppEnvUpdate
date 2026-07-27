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
const Groupheader_group = dynamic(() => import("./Groupheader_group/Groupheader_group"), { ssr: false });
const Grouphrm_dashboard_group = dynamic(() => import("./Grouphrm_dashboard_group/Grouphrm_dashboard_group"), { ssr: false });
const Grouptable_group = dynamic(() => import("./Grouptable_group/Grouptable_group"), { ssr: false });


export default function PageDashboardV1() {
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
  "header_group": {
    "header_text": {
      "show": false
    }
  },
  "hrm_dashboard_group": {},
  "total_employees_group": {
    "total_employees_text": {
      "show": false
    },
    "emp_icon": {
      "show": false
    },
    "total_employees": {
      "show": false
    },
    "total_emp_text": {
      "show": false
    }
  },
  "pending_access_req_group": {
    "pending_access_req_text": {
      "show": false
    },
    "access_icon": {
      "show": false
    },
    "pending_access_req": {
      "show": false
    },
    "access_des_text": {
      "show": false
    }
  },
  "leave_requests_group": {
    "leave_req_text": {
      "show": false
    },
    "leave_icon": {
      "show": false
    },
    "leave_requests": {
      "show": false
    },
    "leave_des_text": {
      "show": false
    }
  },
  "onboarding_group": {
    "onboarding_text": {
      "show": false
    },
    "leave_icon": {
      "show": false
    },
    "onboarding": {
      "show": false
    },
    "board_des_text": {
      "show": false
    }
  },
  "table_group": {
    "status": {
      "show": false
    }
  },
  "subscreen": {},
  "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1": {},
  "employee_table_group": {
    "button": {
      "show": false
    }
  },
  "emp_group": {
    "emp_head_text": {
      "show": false
    }
  },
  "total_employee_table": {
    "employee_id": {
      "show": false
    },
    "employee_code": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "employee_number": {
      "show": false
    },
    "work_email": {
      "show": false
    },
    "gender": {
      "show": false
    },
    "employment_type": {
      "show": false
    },
    "hire_date": {
      "show": false
    },
    "workmode": {
      "show": false
    },
    "employee_status": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1": {},
  "access_req_group": {
    "search_button": {
      "show": false
    }
  },
  "acc_group": {
    "acc_r_text": {
      "show": false
    }
  },
  "access_req_table": {
    "request_number": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "system_name": {
      "show": false
    },
    "request_type": {
      "show": false
    },
    "access_role": {
      "show": false
    },
    "request_priority": {
      "show": false
    },
    "risk_level": {
      "show": false
    },
    "employee_status": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "dashboard";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {hrmdashboard_v1, sethrmdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {hrmdashboard_v1Props, sethrmdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkhrm_dashboard_group,setCheckhrm_dashboard_group,]=useState<boolean>(false);
  const [checktotal_employees_group,setChecktotal_employees_group,]=useState<boolean>(false);
  const [checkpending_access_req_group,setCheckpending_access_req_group,]=useState<boolean>(false);
  const [checkleave_requests_group,setCheckleave_requests_group,]=useState<boolean>(false);
  const [checkonboarding_group,setCheckonboarding_group,]=useState<boolean>(false);
  const [checktable_group,setChecktable_group,]=useState<boolean>(false);
  const [checksubscreen,setChecksubscreen,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_hrm_totalemployees_v1,setCheckct006_af_uf_ufws_ecp_hrm_totalemployees_v1,]=useState<boolean>(false);
  const [checkemployee_table_group,setCheckemployee_table_group,]=useState<boolean>(false);
  const [checkemp_group,setCheckemp_group,]=useState<boolean>(false);
  const [checktotal_employee_table,setChecktotal_employee_table,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1,setCheckct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1,]=useState<boolean>(false);
  const [checkaccess_req_group,setCheckaccess_req_group,]=useState<boolean>(false);
  const [checkacc_group,setCheckacc_group,]=useState<boolean>(false);
  const [checkaccess_req_table,setCheckaccess_req_table,]=useState<boolean>(false);
  const {header_groupf778a, setheader_groupf778a} = useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb} = useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9, settotal_employees_group69aa9} = useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4} = useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5, setleave_requests_group4beb5} = useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580d, setonboarding_group2580d} = useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6f, settable_groupe0a6f} = useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010, setsubscreen1c010} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f} = useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008, setemployee_table_group55008} = useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40b, setemp_group5e40b} = useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe} = useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258, setaccess_req_groupb1258} = useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167, setacc_group3b167} = useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aac, setaccess_req_tablec5aac} = useContext(TotalContext) as TotalContextProps;
  const {dfd_hrmdashboard_v1Props, setdfd_hrmdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accessrequest_v1Props, setdfd_accessrequest_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      hrmdashboard_v1:false,
      employees_v1:false,
      accessrequest_v1:false,
    });
    async function hrmdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let hrmdashboard_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          hrmdashboard_v1Body["dpdKey"] = encryptionDpd;
          hrmdashboard_v1Body["method"] = encryptionMethod;
        }
        if(hrmdashboard_v1Props.length > 0){
          for(let i=0;i< hrmdashboard_v1Props.length;i++){
            if(hrmdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"){
              // delete hrmdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(hrmdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          hrmdashboard_v1Body['filterData'] = filterData;
        }
        const hrmdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",hrmdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=hrmdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(hrmdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_hrmdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_hrmdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (hrmdashboard_v1Data?.data?.dataset) {
           setdfd_hrmdashboard_v1Props(
              Array.isArray(hrmdashboard_v1Data?.data?.dataset?.data)
                 ? hrmdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_hrmdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.hrmdashboard_v1) {
      hrmdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.hrmdashboard_v1= true
  },[refetch?.hrmdashboard_v1])
    async function employees_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employees_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employees_v1Body["dpdKey"] = encryptionDpd;
          employees_v1Body["method"] = encryptionMethod;
        }
        if(hrmdashboard_v1Props.length > 0){
          for(let i=0;i< hrmdashboard_v1Props.length;i++){
            if(hrmdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"){
              // delete hrmdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(hrmdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employees_v1Body['filterData'] = filterData;
        }
        const employees_v1Data:any=await AxiosService.post("/te/eventEmitter",employees_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employees_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employees_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_employees_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employees_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employees_v1Data?.data?.dataset) {
           setdfd_employees_v1Props(
              Array.isArray(employees_v1Data?.data?.dataset?.data)
                 ? employees_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_employees_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employees_v1) {
      employees_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employees_v1= true
  },[refetch?.employees_v1])
    async function accessrequest_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let accessrequest_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          accessrequest_v1Body["dpdKey"] = encryptionDpd;
          accessrequest_v1Body["method"] = encryptionMethod;
        }
        if(hrmdashboard_v1Props.length > 0){
          for(let i=0;i< hrmdashboard_v1Props.length;i++){
            if(hrmdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"){
              // delete hrmdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(hrmdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          accessrequest_v1Body['filterData'] = filterData;
        }
        const accessrequest_v1Data:any=await AxiosService.post("/te/eventEmitter",accessrequest_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=accessrequest_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(accessrequest_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_accessrequest_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_accessrequest_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (accessrequest_v1Data?.data?.dataset) {
           setdfd_accessrequest_v1Props(
              Array.isArray(accessrequest_v1Data?.data?.dataset?.data)
                 ? accessrequest_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_accessrequest_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.accessrequest_v1) {
      accessrequest_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.accessrequest_v1= true
  },[refetch?.accessrequest_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    sethrmdashboard_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1',
      [user],
      'pageDashboardV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await hrmdashboard_v1DFD(pagination)
    await employees_v1DFD(pagination)
    await accessrequest_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'header_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckheader_group(true)
            }
            if(nodes?.groupName == 'hrm_dashboard_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckhrm_dashboard_group(true)
            }
            if(nodes?.groupName == 'total_employees_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_employees_group(true)
            }
            if(nodes?.groupName == 'pending_access_req_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_access_req_group(true)
            }
            if(nodes?.groupName == 'leave_requests_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_requests_group(true)
            }
            if(nodes?.groupName == 'onboarding_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckonboarding_group(true)
            }
            if(nodes?.groupName == 'table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable_group(true)
            }
            if(nodes?.groupName == 'subscreen' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksubscreen(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_HRM_totalEmployees_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_hrm_totalemployees_v1(true)
            }
            if(nodes?.groupName == 'employee_table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemployee_table_group(true)
            }
            if(nodes?.groupName == 'emp_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemp_group(true)
            }
            if(nodes?.groupName == 'total_employee_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_employee_table(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_ECP_HRM_pendingAccessRequest_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1(true)
            }
            if(nodes?.groupName == 'access_req_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaccess_req_group(true)
            }
            if(nodes?.groupName == 'acc_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckacc_group(true)
            }
            if(nodes?.groupName == 'access_req_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaccess_req_table(true)
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
          codeStates['header_group'] = header_groupf778a;
          codeStates['setheader_group'] = setheader_groupf778a;
          codeStates['hrm_dashboard_group'] = hrm_dashboard_group4d6cb;
          codeStates['sethrm_dashboard_group'] = sethrm_dashboard_group4d6cb;
          codeStates['total_employees_group'] = total_employees_group69aa9;
          codeStates['settotal_employees_group'] = settotal_employees_group69aa9;
          codeStates['pending_access_req_group'] = pending_access_req_groupb5bd4;
          codeStates['setpending_access_req_group'] = setpending_access_req_groupb5bd4;
          codeStates['leave_requests_group'] = leave_requests_group4beb5;
          codeStates['setleave_requests_group'] = setleave_requests_group4beb5;
          codeStates['onboarding_group'] = onboarding_group2580d;
          codeStates['setonboarding_group'] = setonboarding_group2580d;
          codeStates['table_group'] = table_groupe0a6f;
          codeStates['settable_group'] = settable_groupe0a6f;
          codeStates['subscreen'] = subscreen1c010;
          codeStates['setsubscreen'] = setsubscreen1c010;
          codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f;
          codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f;
          codeStates['employee_table_group'] = employee_table_group55008;
          codeStates['setemployee_table_group'] = setemployee_table_group55008;
          codeStates['emp_group'] = emp_group5e40b;
          codeStates['setemp_group'] = setemp_group5e40b;
          codeStates['total_employee_table'] = total_employee_tablee4e9d;
          codeStates['settotal_employee_table'] = settotal_employee_tablee4e9d;
          codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe;
          codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe;
          codeStates['access_req_group'] = access_req_groupb1258;
          codeStates['setaccess_req_group'] = setaccess_req_groupb1258;
          codeStates['acc_group'] = acc_group3b167;
          codeStates['setacc_group'] = setacc_group3b167;
          codeStates['access_req_table'] = access_req_tablec5aac;
          codeStates['setaccess_req_table'] = setaccess_req_tablec5aac;
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
    sethrmdashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(hrmdashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(hrmdashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        sethrmdashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkheader_group && initialLoad &&<Groupheader_group
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
        
        {checkhrm_dashboard_group && initialLoad &&<Grouphrm_dashboard_group
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
        
        {checktable_group && initialLoad &&<Grouptable_group
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
    