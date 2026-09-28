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

const Groupoverall_discovery_queue_group = dynamic(() => import("./Groupoverall_discovery_queue_group/Groupoverall_discovery_queue_group"), { ssr: false });

export default function PageDiscoveryQueueV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "AI Product Owner": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Executive": {
    "blockedGroups": []
  },
  "FinOps / Operation": {
    "blockedGroups": []
  },
  "Model RIsk / Compliance": {
    "blockedGroups": []
  },
  "Platform Administrator": {
    "blockedGroups": []
  },
  "Security (CISO Office)": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "overall_discovery_queue_group": {
    "refresh_button": {
      "show": false
    },
    "run_connectors_now_button": {
      "show": false
    }
  },
  "discovery_queue_text_group": {
    "discovery_queue_text": {
      "show": false
    },
    "discovery_queue_texts": {
      "show": false
    }
  },
  "awaiting_review_group": {
    "review_status_code": {
      "show": false
    }
  },
  "possible_duplicate_group": {
    "match_status_code": {
      "show": false
    }
  },
  "rejecte_on_ingest_group": {
    "rejected_on_ingest_card": {
      "show": false
    }
  },
  "pending_review_group": {
    "pending_review_text": {
      "show": false
    },
    "confirm_selected_button": {
      "show": false
    },
    "dismiss_selected_button": {
      "show": false
    }
  },
  "pending_review_table": {
    "proposed_name": {
      "show": false
    },
    "external_reference": {
      "show": false
    },
    "source_code": {
      "show": false
    },
    "proposed_type_code": {
      "show": false
    },
    "suggested_unit": {
      "show": false
    },
    "match_status_code": {
      "show": false
    },
    "confirm": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "discovery queue";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {discoveryqueue_v1, setdiscoveryqueue_v1} = useContext(TotalContext) as TotalContextProps;
  const {discoveryqueue_v1Props, setdiscoveryqueue_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_discovery_queue_group,setCheckoverall_discovery_queue_group,]=useState<boolean>(false);
  const [checkdiscovery_queue_text_group,setCheckdiscovery_queue_text_group,]=useState<boolean>(false);
  const [checkawaiting_review_group,setCheckawaiting_review_group,]=useState<boolean>(false);
  const [checkpossible_duplicate_group,setCheckpossible_duplicate_group,]=useState<boolean>(false);
  const [checkrejecte_on_ingest_group,setCheckrejecte_on_ingest_group,]=useState<boolean>(false);
  const [checkpending_review_group,setCheckpending_review_group,]=useState<boolean>(false);
  const [checkpending_review_table,setCheckpending_review_table,]=useState<boolean>(false);
  const {overall_discovery_queue_groupad3a5, setoverall_discovery_queue_groupad3a5} = useContext(TotalContext) as TotalContextProps;
  const {discovery_queue_text_group9da41, setdiscovery_queue_text_group9da41} = useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294c, setawaiting_review_groupb294c} = useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4, setpossible_duplicate_groupbf3b4} = useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267, setrejecte_on_ingest_group81267} = useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8e, setpending_review_groupe9d8e} = useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7d, setpending_review_table3db7d} = useContext(TotalContext) as TotalContextProps;
  const {dfd_discoveryqueue_v1Props, setdfd_discoveryqueue_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_discoveryqueuecards_v1Props, setdfd_discoveryqueuecards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      discoveryqueue_v1:false,
      discoveryqueuecards_v1:false,
    });
    async function discoveryqueue_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let discoveryqueue_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          discoveryqueue_v1Body["dpdKey"] = encryptionDpd;
          discoveryqueue_v1Body["method"] = encryptionMethod;
        }
        if(discoveryqueue_v1Props.length > 0){
          for(let i=0;i< discoveryqueue_v1Props.length;i++){
            if(discoveryqueue_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1"){
              // delete discoveryqueue_v1Props[i].DFDkey;
              let temp=structuredClone(discoveryqueue_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          discoveryqueue_v1Body['filterData'] = filterData;
        }
        const discoveryqueue_v1Data:any=await AxiosService.post("/te/eventEmitter",discoveryqueue_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=discoveryqueue_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(discoveryqueue_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_discoveryqueue_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_discoveryqueue_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (discoveryqueue_v1Data?.data?.dataset) {
           setdfd_discoveryqueue_v1Props(
              Array.isArray(discoveryqueue_v1Data?.data?.dataset?.data)
                 ? discoveryqueue_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_discoveryqueue_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.discoveryqueue_v1) {
      discoveryqueue_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.discoveryqueue_v1= true
  },[refetch?.discoveryqueue_v1])
    async function discoveryqueuecards_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let discoveryqueuecards_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueueCards:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          discoveryqueuecards_v1Body["dpdKey"] = encryptionDpd;
          discoveryqueuecards_v1Body["method"] = encryptionMethod;
        }
        if(discoveryqueue_v1Props.length > 0){
          for(let i=0;i< discoveryqueue_v1Props.length;i++){
            if(discoveryqueue_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:discoveryQueueCards:AFVK:v1"){
              // delete discoveryqueue_v1Props[i].DFDkey;
              let temp=structuredClone(discoveryqueue_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          discoveryqueuecards_v1Body['filterData'] = filterData;
        }
        const discoveryqueuecards_v1Data:any=await AxiosService.post("/te/eventEmitter",discoveryqueuecards_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=discoveryqueuecards_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(discoveryqueuecards_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_discoveryqueuecards_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_discoveryqueuecards_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (discoveryqueuecards_v1Data?.data?.dataset) {
           setdfd_discoveryqueuecards_v1Props(
              Array.isArray(discoveryqueuecards_v1Data?.data?.dataset?.data)
                 ? discoveryqueuecards_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_discoveryqueuecards_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.discoveryqueuecards_v1) {
      discoveryqueuecards_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.discoveryqueuecards_v1= true
  },[refetch?.discoveryqueuecards_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setdiscoveryqueue_v1({...result,_artfactPFRule_:rule})
  }

  
  const logout = () => {
    localStorage.clear();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const from = encodeURIComponent(`${basePath}/`);
    window.location.href = `${basePath}/next-api/auth/logout?from=${from}`;
  };

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1',
        [user],
        'pageDiscoveryQueueV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1`)
      if (!res.ok) {
        logout()
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await discoveryqueue_v1DFD(pagination)
    await discoveryqueuecards_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_discovery_queue_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_discovery_queue_group(true)
            }
            if(nodes?.groupName == 'discovery_queue_text_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdiscovery_queue_text_group(true)
            }
            if(nodes?.groupName == 'awaiting_review_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckawaiting_review_group(true)
            }
            if(nodes?.groupName == 'possible_duplicate_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpossible_duplicate_group(true)
            }
            if(nodes?.groupName == 'rejecte_on_ingest_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrejecte_on_ingest_group(true)
            }
            if(nodes?.groupName == 'pending_review_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_review_group(true)
            }
            if(nodes?.groupName == 'pending_review_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_review_table(true)
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
          codeStates['overall_discovery_queue_group'] = overall_discovery_queue_groupad3a5;
          codeStates['setoverall_discovery_queue_group'] = setoverall_discovery_queue_groupad3a5;
          codeStates['discovery_queue_text_group'] = discovery_queue_text_group9da41;
          codeStates['setdiscovery_queue_text_group'] = setdiscovery_queue_text_group9da41;
          codeStates['awaiting_review_group'] = awaiting_review_groupb294c;
          codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c;
          codeStates['possible_duplicate_group'] = possible_duplicate_groupbf3b4;
          codeStates['setpossible_duplicate_group'] = setpossible_duplicate_groupbf3b4;
          codeStates['rejecte_on_ingest_group'] = rejecte_on_ingest_group81267;
          codeStates['setrejecte_on_ingest_group'] = setrejecte_on_ingest_group81267;
          codeStates['pending_review_group'] = pending_review_groupe9d8e;
          codeStates['setpending_review_group'] = setpending_review_groupe9d8e;
          codeStates['pending_review_table'] = pending_review_table3db7d;
          codeStates['setpending_review_table'] = setpending_review_table3db7d;
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
    setdiscoveryqueue_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(discoveryqueue_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(discoveryqueue_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setdiscoveryqueue_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverall_discovery_queue_group && initialLoad &&<Groupoverall_discovery_queue_group
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
    