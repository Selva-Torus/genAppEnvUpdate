'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { useGlobal } from '@/context/GlobalContext'
import { logout } from "@/app/components/utils";  

const Groupgrp_wps = dynamic(() => import("./Groupgrp_wps/Groupgrp_wps"), { ssr: false });

export default function PageDashboardV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "IT Team": {
    "blockedGroups": []
  },
  "Operational Manager": {
    "blockedGroups": []
  },
  "Operational Officer": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "grp_wps": {},
  "grp_eob": {},
  "grp_enquiry": {},
  "tabgroup_dashboard": {},
  "tab_header_view_all_fail": {},
  "grp_retun_ref": {},
  "tbl_vw_all_fail": {
    "col_com_code": {
      "show": false
    },
    "col_emir_id": {
      "show": false
    },
    "btn_retry": {
      "show": false
    },
    "col_reg_no": {
      "show": false
    },
    "col_prcs_name": {
      "show": false
    },
    "col_sts": {
      "show": false
    },
    "col_sif_name": {
      "show": false
    },
    "col_sal_month": {
      "show": false
    },
    "col_created_date": {
      "show": false
    },
    "btn_view_req_res": {
      "show": false
    }
  },
  "tab_headerview_all_success": {},
  "grp_reqforref": {},
  "tbl_view_all_success": {
    "col_com_code": {
      "show": false
    },
    "col_emi_id": {
      "show": false
    },
    "col_reg_no": {
      "show": false
    },
    "col_prcs_name": {
      "show": false
    },
    "col_sts": {
      "show": false
    },
    "col_created_date": {
      "show": false
    },
    "btn_succ_req_res": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
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
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {dashboard_v1Props, setdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkgrp_wps,setCheckgrp_wps,]=useState<boolean>(false);
  const [checkgrp_eob,setCheckgrp_eob,]=useState<boolean>(false);
  const [checkgrp_enquiry,setCheckgrp_enquiry,]=useState<boolean>(false);
  const [checkgrp_retun_ref,setCheckgrp_retun_ref,]=useState<boolean>(false);
  const [checktbl_vw_all_fail,setChecktbl_vw_all_fail,]=useState<boolean>(false);
  const [checkgrp_reqforref,setCheckgrp_reqforref,]=useState<boolean>(false);
  const [checktbl_view_all_success,setChecktbl_view_all_success,]=useState<boolean>(false);
  const {grp_wpsc6e49, setgrp_wpsc6e49} = useContext(TotalContext) as TotalContextProps;
  const {grp_eob07ed4, setgrp_eob07ed4} = useContext(TotalContext) as TotalContextProps;
  const {grp_enquiry759a6, setgrp_enquiry759a6} = useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8f, setgrp_retun_ref84e8f} = useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05, settbl_vw_all_failf2e05} = useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3, setgrp_reqforref8b4e3} = useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924, settbl_view_all_successbc924} = useContext(TotalContext) as TotalContextProps;
  const {tabgroup_dashboard0d387, settabgroup_dashboard0d387} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dashboardviewallsuccess_v1Props, setdfd_dashboardviewallsuccess_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dashboardviewallfailure_v1Props, setdfd_dashboardviewallfailure_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      dashboardviewallsuccess_v1:false,
      dashboardviewallfailure_v1:false,
    });
    async function dashboardviewallsuccess_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let dashboardviewallsuccess_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          dashboardviewallsuccess_v1Body["dpdKey"] = encryptionDpd;
          dashboardviewallsuccess_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllSuccess:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          dashboardviewallsuccess_v1Body['filterData'] = filterData;
        }
        const dashboardviewallsuccess_v1Data:any=await AxiosService.post("/te/eventEmitter",dashboardviewallsuccess_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=dashboardviewallsuccess_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(dashboardviewallsuccess_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_dashboardviewallsuccess_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_dashboardviewallsuccess_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (dashboardviewallsuccess_v1Data?.data?.dataset) {
           setdfd_dashboardviewallsuccess_v1Props(
              Array.isArray(dashboardviewallsuccess_v1Data?.data?.dataset?.data)
                 ? dashboardviewallsuccess_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_dashboardviewallsuccess_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.dashboardviewallsuccess_v1) {
      dashboardviewallsuccess_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.dashboardviewallsuccess_v1= true
  },[refetch?.dashboardviewallsuccess_v1])
    async function dashboardviewallfailure_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let dashboardviewallfailure_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          dashboardviewallfailure_v1Body["dpdKey"] = encryptionDpd;
          dashboardviewallfailure_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:dashboardViewAllFailure:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          dashboardviewallfailure_v1Body['filterData'] = filterData;
        }
        const dashboardviewallfailure_v1Data:any=await AxiosService.post("/te/eventEmitter",dashboardviewallfailure_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=dashboardviewallfailure_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(dashboardviewallfailure_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_dashboardviewallfailure_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_dashboardviewallfailure_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (dashboardviewallfailure_v1Data?.data?.dataset) {
           setdfd_dashboardviewallfailure_v1Props(
              Array.isArray(dashboardviewallfailure_v1Data?.data?.dataset?.data)
                 ? dashboardviewallfailure_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_dashboardviewallfailure_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.dashboardviewallfailure_v1) {
      dashboardviewallfailure_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.dashboardviewallfailure_v1= true
  },[refetch?.dashboardviewallfailure_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setdashboard_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1" }
    const encryptionFlagPageData: EncryptionFlagPageData = {
      flag: encryptionFlagPage,
      dpd: encryptionDpd,
      method: encryptionMethod
    }
    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1',
        [user],
        'pageDashboardV1',
        token,
        encryptionFlagPageData
      ),
      token
        ? AxiosService.get("/UF/myAccount-for-client", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null)
    ])
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
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1`)
      if (!res.ok) {
        logout(token)
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await dashboardviewallsuccess_v1DFD(pagination)
    await dashboardviewallfailure_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'grp_wps' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_wps(true)
            }
            if(nodes?.groupName == 'grp_eob' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_eob(true)
            }
            if(nodes?.groupName == 'grp_enquiry' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_enquiry(true)
            }
            if(nodes?.groupName == 'grp_retun_ref' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_retun_ref(true)
            }
            if(nodes?.groupName == 'tbl_vw_all_fail' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_vw_all_fail(true)
            }
            if(nodes?.groupName == 'grp_reqforref' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_reqforref(true)
            }
            if(nodes?.groupName == 'tbl_view_all_success' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_view_all_success(true)
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
          codeStates['grp_wps'] = grp_wpsc6e49;
          codeStates['setgrp_wps'] = setgrp_wpsc6e49;
          codeStates['grp_eob'] = grp_eob07ed4;
          codeStates['setgrp_eob'] = setgrp_eob07ed4;
          codeStates['grp_enquiry'] = grp_enquiry759a6;
          codeStates['setgrp_enquiry'] = setgrp_enquiry759a6;
          codeStates['grp_retun_ref'] = grp_retun_ref84e8f;
          codeStates['setgrp_retun_ref'] = setgrp_retun_ref84e8f;
          codeStates['tbl_vw_all_fail'] = tbl_vw_all_failf2e05;
          codeStates['settbl_vw_all_fail'] = settbl_vw_all_failf2e05;
          codeStates['grp_reqforref'] = grp_reqforref8b4e3;
          codeStates['setgrp_reqforref'] = setgrp_reqforref8b4e3;
          codeStates['tbl_view_all_success'] = tbl_view_all_successbc924;
          codeStates['settbl_view_all_success'] = settbl_view_all_successbc924;
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
    securityCheck().finally(() => onReady?.());
    handleOnload();
    setdashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(dashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tabgroup_dashboard:tabgroup_dashboard0d387.tabgroup_dashboard,      }
      handleArtfactRule(dashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tabgroup_dashboard0d387.tabgroup_dashboard,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkgrp_wps && initialLoad &&<Groupgrp_wps
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
    