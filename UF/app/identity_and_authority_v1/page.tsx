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

const Groupoverall_ai_asset_registry = dynamic(() => import("./Groupoverall_ai_asset_registry/Groupoverall_ai_asset_registry"), { ssr: false });

export default function PageIdentityAndAuthorityV1({ onReady }: { onReady?: () => void } = {}) {
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
  "overall_ai_asset_registry": {
    "main_header": {
      "show": false
    },
    "sub_header": {
      "show": false
    },
    "sub_header_3": {
      "show": false
    }
  },
  "dynamic_group_authority_group": {},
  "dynamic_group_authority": {
    "grant_code": {
      "show": false
    },
    "status": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "action_type": {
      "show": false
    },
    "static1": {
      "show": false
    },
    "max_amount_per_txn": {
      "show": false
    },
    "static2": {
      "show": false
    },
    "daily_amount_limit": {
      "show": false
    },
    "static3": {
      "show": false
    },
    "hitl_threshold_amount": {
      "show": false
    },
    "static4": {
      "show": false
    },
    "max_txn_per_day": {
      "show": false
    },
    "static5": {
      "show": false
    },
    "delegator_user_id": {
      "show": false
    }
  },
  "tool_group": {
    "credential_ref_text": {
      "show": false
    }
  },
  "tool_grant": {
    "agent_asset_id": {
      "show": false
    },
    "tool_asset_id": {
      "show": false
    },
    "tool_operation": {
      "show": false
    },
    "access_mode": {
      "show": false
    },
    "tatus": {
      "show": false
    },
    "approved_by_user_id": {
      "show": false
    },
    "valid_from": {
      "show": false
    },
    "valid_to": {
      "show": false
    }
  },
  "ai_registry_group": {
    "credential_ref_text": {
      "show": false
    }
  },
  "ai_registry_table": {
    "principal_id": {
      "show": false
    },
    "principal_type": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "identity_provider": {
      "show": false
    },
    "vault_path": {
      "show": false
    },
    "status": {
      "show": false
    },
    "next_access_review_at": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "identity and authority";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {identityandauthority_v1, setidentityandauthority_v1} = useContext(TotalContext) as TotalContextProps;
  const {identityandauthority_v1Props, setidentityandauthority_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_asset_registry,setCheckoverall_ai_asset_registry,]=useState<boolean>(false);
  const [checkdynamic_group_authority_group,setCheckdynamic_group_authority_group,]=useState<boolean>(false);
  const [checkdynamic_group_authority,setCheckdynamic_group_authority,]=useState<boolean>(false);
  const [checktool_group,setChecktool_group,]=useState<boolean>(false);
  const [checktool_grant,setChecktool_grant,]=useState<boolean>(false);
  const [checkai_registry_group,setCheckai_registry_group,]=useState<boolean>(false);
  const [checkai_registry_table,setCheckai_registry_table,]=useState<boolean>(false);
  const {overall_ai_asset_registry9dc87, setoverall_ai_asset_registry9dc87} = useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority_group9ddb8, setdynamic_group_authority_group9ddb8} = useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority6cb35, setdynamic_group_authority6cb35} = useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2, settool_group1f1a2} = useContext(TotalContext) as TotalContextProps;
  const {tool_grant80694, settool_grant80694} = useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5e5a6, setai_registry_group5e5a6} = useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table560c1, setai_registry_table560c1} = useContext(TotalContext) as TotalContextProps;
  const {dfd_authoritygranddynamicgroup_v1Props, setdfd_authoritygranddynamicgroup_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_credentialreflist_v1Props, setdfd_credentialreflist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrandauthority_v1Props, setdfd_toolgrandauthority_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      authoritygranddynamicgroup_v1:false,
      credentialreflist_v1:false,
      toolgrandauthority_v1:false,
    });
    async function authoritygranddynamicgroup_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let authoritygranddynamicgroup_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrandDynamicGroup:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          authoritygranddynamicgroup_v1Body["dpdKey"] = encryptionDpd;
          authoritygranddynamicgroup_v1Body["method"] = encryptionMethod;
        }
        if(identityandauthority_v1Props.length > 0){
          for(let i=0;i< identityandauthority_v1Props.length;i++){
            if(identityandauthority_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrandDynamicGroup:AFVK:v1"){
              // delete identityandauthority_v1Props[i].DFDkey;
              let temp=structuredClone(identityandauthority_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          authoritygranddynamicgroup_v1Body['filterData'] = filterData;
        }
        const authoritygranddynamicgroup_v1Data:any=await AxiosService.post("/te/eventEmitter",authoritygranddynamicgroup_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=authoritygranddynamicgroup_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(authoritygranddynamicgroup_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_authoritygranddynamicgroup_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_authoritygranddynamicgroup_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (authoritygranddynamicgroup_v1Data?.data?.dataset) {
           setdfd_authoritygranddynamicgroup_v1Props(
              Array.isArray(authoritygranddynamicgroup_v1Data?.data?.dataset?.data)
                 ? authoritygranddynamicgroup_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_authoritygranddynamicgroup_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.authoritygranddynamicgroup_v1) {
      authoritygranddynamicgroup_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.authoritygranddynamicgroup_v1= true
  },[refetch?.authoritygranddynamicgroup_v1])
    async function credentialreflist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let credentialreflist_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          credentialreflist_v1Body["dpdKey"] = encryptionDpd;
          credentialreflist_v1Body["method"] = encryptionMethod;
        }
        if(identityandauthority_v1Props.length > 0){
          for(let i=0;i< identityandauthority_v1Props.length;i++){
            if(identityandauthority_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1"){
              // delete identityandauthority_v1Props[i].DFDkey;
              let temp=structuredClone(identityandauthority_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          credentialreflist_v1Body['filterData'] = filterData;
        }
        const credentialreflist_v1Data:any=await AxiosService.post("/te/eventEmitter",credentialreflist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=credentialreflist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(credentialreflist_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_credentialreflist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_credentialreflist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (credentialreflist_v1Data?.data?.dataset) {
           setdfd_credentialreflist_v1Props(
              Array.isArray(credentialreflist_v1Data?.data?.dataset?.data)
                 ? credentialreflist_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_credentialreflist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.credentialreflist_v1) {
      credentialreflist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.credentialreflist_v1= true
  },[refetch?.credentialreflist_v1])
    async function toolgrandauthority_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let toolgrandauthority_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrandAuthority:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          toolgrandauthority_v1Body["dpdKey"] = encryptionDpd;
          toolgrandauthority_v1Body["method"] = encryptionMethod;
        }
        if(identityandauthority_v1Props.length > 0){
          for(let i=0;i< identityandauthority_v1Props.length;i++){
            if(identityandauthority_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrandAuthority:AFVK:v1"){
              // delete identityandauthority_v1Props[i].DFDkey;
              let temp=structuredClone(identityandauthority_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          toolgrandauthority_v1Body['filterData'] = filterData;
        }
        const toolgrandauthority_v1Data:any=await AxiosService.post("/te/eventEmitter",toolgrandauthority_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=toolgrandauthority_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(toolgrandauthority_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_toolgrandauthority_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_toolgrandauthority_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (toolgrandauthority_v1Data?.data?.dataset) {
           setdfd_toolgrandauthority_v1Props(
              Array.isArray(toolgrandauthority_v1Data?.data?.dataset?.data)
                 ? toolgrandauthority_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_toolgrandauthority_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.toolgrandauthority_v1) {
      toolgrandauthority_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.toolgrandauthority_v1= true
  },[refetch?.toolgrandauthority_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setidentityandauthority_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identityAndAuthority:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identityAndAuthority:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identityAndAuthority:AFVK:v1',
        [user],
        'pageIdentityAndAuthorityV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identityAndAuthority:AFVK:v1`)
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
    await authoritygranddynamicgroup_v1DFD(pagination)
    await credentialreflist_v1DFD(pagination)
    await toolgrandauthority_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_ai_asset_registry' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_ai_asset_registry(true)
            }
            if(nodes?.groupName == 'dynamic_group_authority_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamic_group_authority_group(true)
            }
            if(nodes?.groupName == 'dynamic_group_authority' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamic_group_authority(true)
            }
            if(nodes?.groupName == 'tool_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktool_group(true)
            }
            if(nodes?.groupName == 'tool_grant' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktool_grant(true)
            }
            if(nodes?.groupName == 'ai_registry_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckai_registry_group(true)
            }
            if(nodes?.groupName == 'ai_registry_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckai_registry_table(true)
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
          codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry9dc87;
          codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry9dc87;
          codeStates['dynamic_group_authority_group'] = dynamic_group_authority_group9ddb8;
          codeStates['setdynamic_group_authority_group'] = setdynamic_group_authority_group9ddb8;
          codeStates['dynamic_group_authority'] = dynamic_group_authority6cb35;
          codeStates['setdynamic_group_authority'] = setdynamic_group_authority6cb35;
          codeStates['tool_group'] = tool_group1f1a2;
          codeStates['settool_group'] = settool_group1f1a2;
          codeStates['tool_grant'] = tool_grant80694;
          codeStates['settool_grant'] = settool_grant80694;
          codeStates['ai_registry_group'] = ai_registry_group5e5a6;
          codeStates['setai_registry_group'] = setai_registry_group5e5a6;
          codeStates['ai_registry_table'] = ai_registry_table560c1;
          codeStates['setai_registry_table'] = setai_registry_table560c1;
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
    setidentityandauthority_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(identityandauthority_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(identityandauthority_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setidentityandauthority_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    