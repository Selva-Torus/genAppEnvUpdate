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
const Grouphrm_dashboard_group = dynamic(() => import("./Grouphrm_dashboard_group/Grouphrm_dashboard_group"), { ssr: false });
const Groupchart_group = dynamic(() => import("./Groupchart_group/Groupchart_group"), { ssr: false });
const Groupleave_group = dynamic(() => import("./Groupleave_group/Groupleave_group"), { ssr: false });


export default function PageIndividualleavemanagementV1() {
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
  "hrm_dashboard_group": {},
  "total_employees_group": {
    "divider": {
      "show": false
    },
    "leave_icon": {
      "show": false
    },
    "total_leave_bal_text": {
      "show": false
    },
    "total_leave_balance": {
      "show": false
    },
    "days_text": {
      "show": false
    }
  },
  "leave_requests_group": {
    "divider": {
      "show": false
    },
    "app_icon": {
      "show": false
    },
    "approved_text": {
      "show": false
    },
    "approved_this_month": {
      "show": false
    },
    "day_text": {
      "show": false
    }
  },
  "onboarding_group": {
    "divider": {
      "show": false
    },
    "rej_icon": {
      "show": false
    },
    "reject_text": {
      "show": false
    },
    "rejected_requests": {
      "show": false
    },
    "board_des_text": {
      "show": false
    }
  },
  "chart_group": {
    "chart_text": {
      "show": false
    },
    "piechart": {
      "show": false
    }
  },
  "leave_group": {
    "req_text": {
      "show": false
    },
    "initate_leave": {
      "show": false
    }
  },
  "leave_req_table": {
    "leave_req_id": {
      "show": false
    },
    "leave_request_number": {
      "show": false
    },
    "leave_type": {
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
    "trs_event_process_status": {
      "show": false
    },
    "view_bt": {
      "show": false
    },
    "attach_bt": {
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
  const {individualleavemanagement_v1, setindividualleavemanagement_v1} = useContext(TotalContext) as TotalContextProps;
  const {individualleavemanagement_v1Props, setindividualleavemanagement_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkhrm_dashboard_group,setCheckhrm_dashboard_group,]=useState<boolean>(false);
  const [checktotal_employees_group,setChecktotal_employees_group,]=useState<boolean>(false);
  const [checkleave_requests_group,setCheckleave_requests_group,]=useState<boolean>(false);
  const [checkonboarding_group,setCheckonboarding_group,]=useState<boolean>(false);
  const [checkchart_group,setCheckchart_group,]=useState<boolean>(false);
  const [checkleave_group,setCheckleave_group,]=useState<boolean>(false);
  const [checkleave_req_table,setCheckleave_req_table,]=useState<boolean>(false);
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72} = useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415} = useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf} = useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e} = useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff} = useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d} = useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0} = useContext(TotalContext) as TotalContextProps;
  const {dfd_individualleavereqtable_v1Props, setdfd_individualleavereqtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavepiechart_v1Props, setdfd_leavepiechart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_individualleavereqcards_v1Props, setdfd_individualleavereqcards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      individualleavereqtable_v1:false,
      leavepiechart_v1:false,
      individualleavereqcards_v1:false,
    });
    async function individualleavereqtable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let individualleavereqtable_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          individualleavereqtable_v1Body["dpdKey"] = encryptionDpd;
          individualleavereqtable_v1Body["method"] = encryptionMethod;
        }
        if(individualleavemanagement_v1Props.length > 0){
          for(let i=0;i< individualleavemanagement_v1Props.length;i++){
            if(individualleavemanagement_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqTable:AFVK:v1"){
              // delete individualleavemanagement_v1Props[i].DFDkey;
              let temp=structuredClone(individualleavemanagement_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          individualleavereqtable_v1Body['filterData'] = filterData;
        }
        const individualleavereqtable_v1Data:any=await AxiosService.post("/te/eventEmitter",individualleavereqtable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=individualleavereqtable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(individualleavereqtable_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_individualleavereqtable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_individualleavereqtable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (individualleavereqtable_v1Data?.data?.dataset) {
           setdfd_individualleavereqtable_v1Props(
              Array.isArray(individualleavereqtable_v1Data?.data?.dataset?.data)
                 ? individualleavereqtable_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_individualleavereqtable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.individualleavereqtable_v1) {
      individualleavereqtable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.individualleavereqtable_v1= true
  },[refetch?.individualleavereqtable_v1])
    async function leavepiechart_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let leavepiechart_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leavePieChart:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          leavepiechart_v1Body["dpdKey"] = encryptionDpd;
          leavepiechart_v1Body["method"] = encryptionMethod;
        }
        if(individualleavemanagement_v1Props.length > 0){
          for(let i=0;i< individualleavemanagement_v1Props.length;i++){
            if(individualleavemanagement_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leavePieChart:AFVK:v1"){
              // delete individualleavemanagement_v1Props[i].DFDkey;
              let temp=structuredClone(individualleavemanagement_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          leavepiechart_v1Body['filterData'] = filterData;
        }
        const leavepiechart_v1Data:any=await AxiosService.post("/te/eventEmitter",leavepiechart_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=leavepiechart_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(leavepiechart_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_leavepiechart_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_leavepiechart_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (leavepiechart_v1Data?.data?.dataset) {
           setdfd_leavepiechart_v1Props(
              Array.isArray(leavepiechart_v1Data?.data?.dataset?.data)
                 ? leavepiechart_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_leavepiechart_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.leavepiechart_v1) {
      leavepiechart_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.leavepiechart_v1= true
  },[refetch?.leavepiechart_v1])
    async function individualleavereqcards_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let individualleavereqcards_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqCards:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          individualleavereqcards_v1Body["dpdKey"] = encryptionDpd;
          individualleavereqcards_v1Body["method"] = encryptionMethod;
        }
        if(individualleavemanagement_v1Props.length > 0){
          for(let i=0;i< individualleavemanagement_v1Props.length;i++){
            if(individualleavemanagement_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqCards:AFVK:v1"){
              // delete individualleavemanagement_v1Props[i].DFDkey;
              let temp=structuredClone(individualleavemanagement_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          individualleavereqcards_v1Body['filterData'] = filterData;
        }
        const individualleavereqcards_v1Data:any=await AxiosService.post("/te/eventEmitter",individualleavereqcards_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=individualleavereqcards_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(individualleavereqcards_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_individualleavereqcards_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_individualleavereqcards_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (individualleavereqcards_v1Data?.data?.dataset) {
           setdfd_individualleavereqcards_v1Props(
              Array.isArray(individualleavereqcards_v1Data?.data?.dataset?.data)
                 ? individualleavereqcards_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_individualleavereqcards_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.individualleavereqcards_v1) {
      individualleavereqcards_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.individualleavereqcards_v1= true
  },[refetch?.individualleavereqcards_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setindividualleavemanagement_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1',
      [user],
      'pageIndividualleavemanagementV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1"  
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await individualleavereqtable_v1DFD(pagination)
    await leavepiechart_v1DFD(pagination)
    await individualleavereqcards_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'hrm_dashboard_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckhrm_dashboard_group(true)
            }
            if(nodes?.groupName == 'total_employees_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_employees_group(true)
            }
            if(nodes?.groupName == 'leave_requests_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_requests_group(true)
            }
            if(nodes?.groupName == 'onboarding_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckonboarding_group(true)
            }
            if(nodes?.groupName == 'chart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchart_group(true)
            }
            if(nodes?.groupName == 'leave_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_group(true)
            }
            if(nodes?.groupName == 'leave_req_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckleave_req_table(true)
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
          codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72;
          codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72;
          codeStates['total_employees_group'] = total_employees_group69415;
          codeStates['settotal_employees_group'] = settotal_employees_group69415;
          codeStates['leave_requests_group'] = leave_requests_groupb9aaf;
          codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf;
          codeStates['onboarding_group'] = onboarding_group4ab1e;
          codeStates['setonboarding_group'] = setonboarding_group4ab1e;
          codeStates['chart_group'] = chart_groupdd9ff;
          codeStates['setchart_group'] = setchart_groupdd9ff;
          codeStates['leave_group'] = leave_group1d83d;
          codeStates['setleave_group'] = setleave_group1d83d;
          codeStates['leave_req_table'] = leave_req_table1dfa0;
          codeStates['setleave_req_table'] = setleave_req_table1dfa0;
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
    setindividualleavemanagement_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(individualleavemanagement_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(individualleavemanagement_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setindividualleavemanagement_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        
        {checkchart_group && initialLoad &&<Groupchart_group
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
        
        {checkleave_group && initialLoad &&<Groupleave_group
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
    