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

export default function PageReturnsAndRefundsV1({ onReady }: { onReady?: () => void } = {}) {
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
  "grp_wps": {
    "cw_tab_initiate_authorize": {
      "show": false
    }
  },
  "grp_eob": {},
  "grp_return_refund": {},
  "tabgroup_return_refund": {},
  "tab_header_return_frm_agent": {},
  "grp_retun_ref": {},
  "tbl_return_fie_list": {
    "col_src_name": {
      "show": false
    },
    "col_tran_count": {
      "show": false
    },
    "btn_rr_view_tran": {
      "show": false
    },
    "col_fixed_amnt": {
      "show": false
    },
    "col_var_amnt": {
      "show": false
    },
    "col_tot_file_amnt": {
      "show": false
    },
    "col_created_date": {
      "show": false
    },
    "col_sf_file_name": {
      "show": false
    }
  },
  "tab_header_req_for_refund": {},
  "grp_rr_retun_ref": {},
  "tbl_rr_req_for_refund": {
    "col_rr_src_name": {
      "show": false
    },
    "col_rr_tran_count": {
      "show": false
    },
    "btn_rrefu_view_tran": {
      "show": false
    },
    "col_rr_fixed_amnt": {
      "show": false
    },
    "col_rr_var_amnt": {
      "show": false
    },
    "col_rr_tot_file_amnt": {
      "show": false
    },
    "col_rr_created_date": {
      "show": false
    },
    "col_rr_sf_file_name": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "returns and refunds";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {returnsrefund_v1, setreturnsrefund_v1} = useContext(TotalContext) as TotalContextProps;
  const {returnsrefund_v1Props, setreturnsrefund_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkgrp_wps,setCheckgrp_wps,]=useState<boolean>(false);
  const [checkgrp_eob,setCheckgrp_eob,]=useState<boolean>(false);
  const [checkgrp_return_refund,setCheckgrp_return_refund,]=useState<boolean>(false);
  const [checkgrp_retun_ref,setCheckgrp_retun_ref,]=useState<boolean>(false);
  const [checktbl_return_fie_list,setChecktbl_return_fie_list,]=useState<boolean>(false);
  const [checkgrp_rr_retun_ref,setCheckgrp_rr_retun_ref,]=useState<boolean>(false);
  const [checktbl_rr_req_for_refund,setChecktbl_rr_req_for_refund,]=useState<boolean>(false);
  const {grp_wpsb96c6, setgrp_wpsb96c6} = useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127, setgrp_eobed127} = useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03, setgrp_return_refundc4a03} = useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6, setgrp_retun_ref3e6e6} = useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636, settbl_return_fie_list8f636} = useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d} = useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a} = useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7} = useContext(TotalContext) as TotalContextProps;
  const {dfd_returnfromagentfilelist_v1Props, setdfd_returnfromagentfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestforrefundfilelist_v1Props, setdfd_requestforrefundfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      returnfromagentfilelist_v1:false,
      requestforrefundfilelist_v1:false,
    });
    async function returnfromagentfilelist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let returnfromagentfilelist_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          returnfromagentfilelist_v1Body["dpdKey"] = encryptionDpd;
          returnfromagentfilelist_v1Body["method"] = encryptionMethod;
        }
        if(returnsrefund_v1Props.length > 0){
          for(let i=0;i< returnsrefund_v1Props.length;i++){
            if(returnsrefund_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:returnFromAgentFileList:AFVK:v1"){
              // delete returnsrefund_v1Props[i].DFDkey;
              let temp=structuredClone(returnsrefund_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          returnfromagentfilelist_v1Body['filterData'] = filterData;
        }
        const returnfromagentfilelist_v1Data:any=await AxiosService.post("/te/eventEmitter",returnfromagentfilelist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=returnfromagentfilelist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(returnfromagentfilelist_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_returnfromagentfilelist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_returnfromagentfilelist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (returnfromagentfilelist_v1Data?.data?.dataset) {
           setdfd_returnfromagentfilelist_v1Props(
              Array.isArray(returnfromagentfilelist_v1Data?.data?.dataset?.data)
                 ? returnfromagentfilelist_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_returnfromagentfilelist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.returnfromagentfilelist_v1) {
      returnfromagentfilelist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.returnfromagentfilelist_v1= true
  },[refetch?.returnfromagentfilelist_v1])
    async function requestforrefundfilelist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let requestforrefundfilelist_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          requestforrefundfilelist_v1Body["dpdKey"] = encryptionDpd;
          requestforrefundfilelist_v1Body["method"] = encryptionMethod;
        }
        if(returnsrefund_v1Props.length > 0){
          for(let i=0;i< returnsrefund_v1Props.length;i++){
            if(returnsrefund_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:requestForRefundFileList:AFVK:v1"){
              // delete returnsrefund_v1Props[i].DFDkey;
              let temp=structuredClone(returnsrefund_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          requestforrefundfilelist_v1Body['filterData'] = filterData;
        }
        const requestforrefundfilelist_v1Data:any=await AxiosService.post("/te/eventEmitter",requestforrefundfilelist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=requestforrefundfilelist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(requestforrefundfilelist_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_requestforrefundfilelist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_requestforrefundfilelist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (requestforrefundfilelist_v1Data?.data?.dataset) {
           setdfd_requestforrefundfilelist_v1Props(
              Array.isArray(requestforrefundfilelist_v1Data?.data?.dataset?.data)
                 ? requestforrefundfilelist_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_requestforrefundfilelist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.requestforrefundfilelist_v1) {
      requestforrefundfilelist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.requestforrefundfilelist_v1= true
  },[refetch?.requestforrefundfilelist_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setreturnsrefund_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1',
        [user],
        'pageReturnsAndRefundsV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1`)
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
    await returnfromagentfilelist_v1DFD(pagination)
    await requestforrefundfilelist_v1DFD(pagination)
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
            if(nodes?.groupName == 'grp_return_refund' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_return_refund(true)
            }
            if(nodes?.groupName == 'grp_retun_ref' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_retun_ref(true)
            }
            if(nodes?.groupName == 'tbl_return_fie_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_return_fie_list(true)
            }
            if(nodes?.groupName == 'grp_rr_retun_ref' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_rr_retun_ref(true)
            }
            if(nodes?.groupName == 'tbl_rr_req_for_refund' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_rr_req_for_refund(true)
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
          codeStates['grp_wps'] = grp_wpsb96c6;
          codeStates['setgrp_wps'] = setgrp_wpsb96c6;
          codeStates['grp_eob'] = grp_eobed127;
          codeStates['setgrp_eob'] = setgrp_eobed127;
          codeStates['grp_return_refund'] = grp_return_refundc4a03;
          codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03;
          codeStates['grp_retun_ref'] = grp_retun_ref3e6e6;
          codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6;
          codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636;
          codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636;
          codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d;
          codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d;
          codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a;
          codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a;
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
    setreturnsrefund_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(returnsrefund_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tabgroup_return_refund:tabgroup_return_refund4e9b7.tabgroup_return_refund,      }
      handleArtfactRule(returnsrefund_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tabgroup_return_refund4e9b7.tabgroup_return_refund,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setreturnsrefund_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    