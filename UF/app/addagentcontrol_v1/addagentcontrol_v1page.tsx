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

const Groupoverall_ai_asset_registry = dynamic(() => import("./Groupoverall_ai_asset_registry/Groupoverall_ai_asset_registry"), { ssr: false });

export default function PageAddagentcontrolV1({ onReady }: { onReady?: () => void } = {}) {
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
  "overall_ai_asset_registry": {},
  "register_ai_asset_group": {
    "agent_control_id": {
      "show": false
    }
  },
  "model_info_group": {
    "agent_identity_text": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "agent_identity_ref": {
      "show": false
    },
    "identity_provider": {
      "show": false
    },
    "authority_level_code": {
      "show": false
    }
  },
  "grounding_group": {
    "approval_text": {
      "show": false
    },
    "approval_threshold_amt": {
      "show": false
    },
    "approval_threshold_ccy": {
      "show": false
    },
    "max_actions_per_day": {
      "show": false
    },
    "requires_human_approval": {
      "show": false
    }
  },
  "validation_group": {
    "security_text": {
      "show": false
    },
    "kill_switch_state_code": {
      "show": false
    },
    "kill_switch_updated_by": {
      "show": false
    },
    "kill_switch_updated_on": {
      "show": false
    },
    "is_active": {
      "show": false
    },
    "segregation_notes": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel_bt": {
      "show": false
    },
    "update_bt": {
      "show": false
    },
    "save_bt": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "ai registry";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {addagentcontrol_v1, setaddagentcontrol_v1} = useContext(TotalContext) as TotalContextProps;
  const {addagentcontrol_v1Props, setaddagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_asset_registry,setCheckoverall_ai_asset_registry,]=useState<boolean>(false);
  const [checkregister_ai_asset_group,setCheckregister_ai_asset_group,]=useState<boolean>(false);
  const [checkmodel_info_group,setCheckmodel_info_group,]=useState<boolean>(false);
  const [checkgrounding_group,setCheckgrounding_group,]=useState<boolean>(false);
  const [checkvalidation_group,setCheckvalidation_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224} = useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f} = useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641} = useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f} = useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      assetnamecombo_v1:false,
      aiagentcontrol_v1:false,
    });
    async function assetnamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetnamecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetnamecombo_v1Body["dpdKey"] = encryptionDpd;
          assetnamecombo_v1Body["method"] = encryptionMethod;
        }
        if(addagentcontrol_v1Props.length > 0){
          for(let i=0;i< addagentcontrol_v1Props.length;i++){
            if(addagentcontrol_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetNameCombo:AFVK:v1"){
              // delete addagentcontrol_v1Props[i].DFDkey;
              let temp=structuredClone(addagentcontrol_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetnamecombo_v1Body['filterData'] = filterData;
        }
        const assetnamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetnamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetnamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetnamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetnamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetnamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetnamecombo_v1Data?.data?.dataset) {
           setdfd_assetnamecombo_v1Props(
              Array.isArray(assetnamecombo_v1Data?.data?.dataset?.data)
                 ? assetnamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetnamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetnamecombo_v1) {
      assetnamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetnamecombo_v1= true
  },[refetch?.assetnamecombo_v1])
    async function aiagentcontrol_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let aiagentcontrol_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          aiagentcontrol_v1Body["dpdKey"] = encryptionDpd;
          aiagentcontrol_v1Body["method"] = encryptionMethod;
        }
        if(addagentcontrol_v1Props.length > 0){
          for(let i=0;i< addagentcontrol_v1Props.length;i++){
            if(addagentcontrol_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1"){
              // delete addagentcontrol_v1Props[i].DFDkey;
              let temp=structuredClone(addagentcontrol_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          aiagentcontrol_v1Body['filterData'] = filterData;
        }
        const aiagentcontrol_v1Data:any=await AxiosService.post("/te/eventEmitter",aiagentcontrol_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=aiagentcontrol_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(aiagentcontrol_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_aiagentcontrol_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_aiagentcontrol_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (aiagentcontrol_v1Data?.data?.dataset) {
           setdfd_aiagentcontrol_v1Props(
              Array.isArray(aiagentcontrol_v1Data?.data?.dataset?.data)
                 ? aiagentcontrol_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_aiagentcontrol_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.aiagentcontrol_v1) {
      aiagentcontrol_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.aiagentcontrol_v1= true
  },[refetch?.aiagentcontrol_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddagentcontrol_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentControl:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentControl:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentControl:AFVK:v1',
        [user],
        'pageAddagentcontrolV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentControl:AFVK:v1`)
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
    await assetnamecombo_v1DFD(pagination)
    await aiagentcontrol_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_ai_asset_registry' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_ai_asset_registry(true)
            }
            if(nodes?.groupName == 'register_ai_asset_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckregister_ai_asset_group(true)
            }
            if(nodes?.groupName == 'model_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmodel_info_group(true)
            }
            if(nodes?.groupName == 'grounding_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrounding_group(true)
            }
            if(nodes?.groupName == 'validation_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvalidation_group(true)
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
          codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224;
          codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224;
          codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f;
          codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f;
          codeStates['model_info_group'] = model_info_group5b641;
          codeStates['setmodel_info_group'] = setmodel_info_group5b641;
          codeStates['grounding_group'] = grounding_groupb1b6f;
          codeStates['setgrounding_group'] = setgrounding_groupb1b6f;
          codeStates['validation_group'] = validation_group4d206;
          codeStates['setvalidation_group'] = setvalidation_group4d206;
          codeStates['dynamicactions'] = dynamicactions78fa5;
          codeStates['setdynamicactions'] = setdynamicactions78fa5;
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
    setaddagentcontrol_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addagentcontrol_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addagentcontrol_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddagentcontrol_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverall_ai_asset_registry && initialLoad &&<Groupoverall_ai_asset_registry
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
    