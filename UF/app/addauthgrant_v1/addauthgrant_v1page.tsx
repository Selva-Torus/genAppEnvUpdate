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
import { getPublicEnv } from "@/app/components/public-env";

const Groupoverall_auth_grant_grp = dynamic(() => import("./Groupoverall_auth_grant_grp/Groupoverall_auth_grant_grp"), { ssr: false });

export default function PageAddauthgrantV1({ onReady }: { onReady?: () => void } = {}) {
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
  "overall_auth_grant_grp": {},
  "revocat_info_group": {
    "authority_grant__text": {
      "show": false
    },
    "authority_grant_id": {
      "show": false
    },
    "ai_asset_id": {
      "show": false
    }
  },
  "auth_grant_details_group": {
    "auth_grant_details_text": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "grant_code": {
      "show": false
    },
    "delegator_user_id": {
      "show": false
    },
    "action_type": {
      "show": false
    },
    "resource_scope": {
      "show": false
    }
  },
  "finacial_transaction__group": {
    "financial_transaction__text": {
      "show": false
    },
    "max_amount_per_txn": {
      "show": false
    },
    "currency": {
      "show": false
    },
    "daily_amount_limit": {
      "show": false
    },
    "max_txn_per_day": {
      "show": false
    },
    "hitl_threshold_amount": {
      "show": false
    }
  },
  "condition_validity_group": {
    "conditions_validity_txt": {
      "show": false
    },
    "conditions": {
      "show": false
    },
    "valid_from": {
      "show": false
    },
    "valid_to": {
      "show": false
    },
    "status": {
      "show": false
    }
  },
  "certification_group": {
    "revocat_info_text": {
      "show": false
    },
    "revocation_reason": {
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
  const screenName:string = "identity and authority setup";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {addauthgrant_v1, setaddauthgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const {addauthgrant_v1Props, setaddauthgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_auth_grant_grp,setCheckoverall_auth_grant_grp,]=useState<boolean>(false);
  const [checkrevocat_info_group,setCheckrevocat_info_group,]=useState<boolean>(false);
  const [checkauth_grant_details_group,setCheckauth_grant_details_group,]=useState<boolean>(false);
  const [checkfinacial_transaction__group,setCheckfinacial_transaction__group,]=useState<boolean>(false);
  const [checkcondition_validity_group,setCheckcondition_validity_group,]=useState<boolean>(false);
  const [checkcertification_group,setCheckcertification_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f} = useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f} = useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c} = useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c} = useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f} = useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9} = useContext(TotalContext) as TotalContextProps;
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      authoritygrant_v1:false,
      assetcodenameconcatcombo_v1:false,
    });
    async function authoritygrant_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let authoritygrant_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          authoritygrant_v1Body["dpdKey"] = encryptionDpd;
          authoritygrant_v1Body["method"] = encryptionMethod;
        }
        if(addauthgrant_v1Props.length > 0){
          for(let i=0;i< addauthgrant_v1Props.length;i++){
            if(addauthgrant_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1"){
              // delete addauthgrant_v1Props[i].DFDkey;
              let temp=structuredClone(addauthgrant_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          authoritygrant_v1Body['filterData'] = filterData;
        }
        const authoritygrant_v1Data:any=await AxiosService.post("/te/eventEmitter",authoritygrant_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=authoritygrant_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(authoritygrant_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_authoritygrant_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_authoritygrant_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (authoritygrant_v1Data?.data?.dataset) {
           setdfd_authoritygrant_v1Props(
              Array.isArray(authoritygrant_v1Data?.data?.dataset?.data)
                 ? authoritygrant_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_authoritygrant_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.authoritygrant_v1) {
      authoritygrant_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.authoritygrant_v1= true
  },[refetch?.authoritygrant_v1])
    async function assetcodenameconcatcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetcodenameconcatcombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetcodenameconcatcombo_v1Body["dpdKey"] = encryptionDpd;
          assetcodenameconcatcombo_v1Body["method"] = encryptionMethod;
        }
        if(addauthgrant_v1Props.length > 0){
          for(let i=0;i< addauthgrant_v1Props.length;i++){
            if(addauthgrant_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1"){
              // delete addauthgrant_v1Props[i].DFDkey;
              let temp=structuredClone(addauthgrant_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetcodenameconcatcombo_v1Body['filterData'] = filterData;
        }
        const assetcodenameconcatcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetcodenameconcatcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetcodenameconcatcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetcodenameconcatcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetcodenameconcatcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetcodenameconcatcombo_v1Data?.data?.dataset) {
           setdfd_assetcodenameconcatcombo_v1Props(
              Array.isArray(assetcodenameconcatcombo_v1Data?.data?.dataset?.data)
                 ? assetcodenameconcatcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_assetcodenameconcatcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetcodenameconcatcombo_v1) {
      assetcodenameconcatcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetcodenameconcatcombo_v1= true
  },[refetch?.assetcodenameconcatcombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddauthgrant_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1',
        [user],
        'pageAddauthgrantV1',
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
      const basePath = getPublicEnv('NEXT_PUBLIC_BASE_PATH');
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1`)
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
    await authoritygrant_v1DFD(pagination)
    await assetcodenameconcatcombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_auth_grant_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_auth_grant_grp(true)
            }
            if(nodes?.groupName == 'revocat_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrevocat_info_group(true)
            }
            if(nodes?.groupName == 'auth_grant_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckauth_grant_details_group(true)
            }
            if(nodes?.groupName == 'finacial_transaction__group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfinacial_transaction__group(true)
            }
            if(nodes?.groupName == 'condition_validity_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcondition_validity_group(true)
            }
            if(nodes?.groupName == 'certification_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcertification_group(true)
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
          codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f;
          codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f;
          codeStates['revocat_info_group'] = revocat_info_group2037f;
          codeStates['setrevocat_info_group'] = setrevocat_info_group2037f;
          codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c;
          codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c;
          codeStates['finacial_transaction__group'] = finacial_transaction__group6585c;
          codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c;
          codeStates['condition_validity_group'] = condition_validity_group3e45f;
          codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f;
          codeStates['certification_group'] = certification_group91bfd;
          codeStates['setcertification_group'] = setcertification_group91bfd;
          codeStates['dynamicactions'] = dynamicactions401a9;
          codeStates['setdynamicactions'] = setdynamicactions401a9;
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
    setaddauthgrant_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addauthgrant_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addauthgrant_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddauthgrant_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverall_auth_grant_grp && initialLoad &&<Groupoverall_auth_grant_grp
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
    