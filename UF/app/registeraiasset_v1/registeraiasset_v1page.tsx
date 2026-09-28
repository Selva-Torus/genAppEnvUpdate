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

export default function PageRegisteraiassetV1({ onReady }: { onReady?: () => void } = {}) {
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
    "asset_info_text": {
      "show": false
    },
    "dividers": {
      "show": false
    },
    "purpose_text": {
      "show": false
    },
    "ai_asset_id": {
      "show": false
    }
  },
  "asset_identity_group": {
    "asset_identity_text": {
      "show": false
    },
    "asset_code": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "asset_type_code": {
      "show": false
    },
    "short_description": {
      "show": false
    }
  },
  "ownership_group": {
    "ownership_text": {
      "show": false
    },
    "business_unit_name": {
      "show": false
    },
    "business_owner_name": {
      "show": false
    },
    "business_owner_job_title": {
      "show": false
    },
    "technical_owner_name": {
      "show": false
    },
    "technical_owner_job_title": {
      "show": false
    }
  },
  "vending_group": {
    "vending_text": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "hosting_location": {
      "show": false
    },
    "external_reference": {
      "show": false
    },
    "is_third_party": {
      "show": false
    }
  },
  "certification_group": {
    "certification_text": {
      "show": false
    },
    "current_certification_id": {
      "show": false
    },
    "cert_expiry_date": {
      "show": false
    },
    "discovery_source_code": {
      "show": false
    },
    "integration_source_id": {
      "show": false
    }
  },
  "usecase_group": {
    "usecase_text": {
      "show": false
    },
    "business_purpose": {
      "show": false
    },
    "use_case_code": {
      "show": false
    }
  },
  "tier_group": {
    "tier_text": {
      "show": false
    },
    "risk_tier_code": {
      "show": false
    },
    "risk_tier_source": {
      "show": false
    },
    "criticality_code": {
      "show": false
    }
  },
  "lifecycle_group": {
    "lifecycle_text": {
      "show": false
    },
    "lifecycle_status_code": {
      "show": false
    },
    "config_text": {
      "show": false
    },
    "is_customer_facing": {
      "show": false
    },
    "is_automated_decision": {
      "show": false
    },
    "is_active": {
      "show": false
    }
  },
  "version_group": {
    "version_text": {
      "show": false
    },
    "first_discovered_on": {
      "show": false
    },
    "last_seen_on": {
      "show": false
    },
    "go_live_date": {
      "show": false
    },
    "retirement_date": {
      "show": false
    },
    "current_version_number": {
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
  const {registeraiasset_v1, setregisteraiasset_v1} = useContext(TotalContext) as TotalContextProps;
  const {registeraiasset_v1Props, setregisteraiasset_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_asset_registry,setCheckoverall_ai_asset_registry,]=useState<boolean>(false);
  const [checkregister_ai_asset_group,setCheckregister_ai_asset_group,]=useState<boolean>(false);
  const [checkasset_identity_group,setCheckasset_identity_group,]=useState<boolean>(false);
  const [checkownership_group,setCheckownership_group,]=useState<boolean>(false);
  const [checkvending_group,setCheckvending_group,]=useState<boolean>(false);
  const [checkcertification_group,setCheckcertification_group,]=useState<boolean>(false);
  const [checkusecase_group,setCheckusecase_group,]=useState<boolean>(false);
  const [checktier_group,setChecktier_group,]=useState<boolean>(false);
  const [checklifecycle_group,setChecklifecycle_group,]=useState<boolean>(false);
  const [checkversion_group,setCheckversion_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de} = useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc} = useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1} = useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5, setownership_groupf52d5} = useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ec, setvending_group8f2ec} = useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10eb, setcertification_groupa10eb} = useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9, setusecase_group233f9} = useContext(TotalContext) as TotalContextProps;
  const {tier_group6915b, settier_group6915b} = useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909, setlifecycle_groupb7909} = useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6f, setversion_group3fe6f} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846f, setdynamicactionsf846f} = useContext(TotalContext) as TotalContextProps;
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_businessunitcombo_v1Props, setdfd_businessunitcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_businessownercombo_v1Props, setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      airegistry_v1:false,
      businessunitcombo_v1:false,
      businessownercombo_v1:false,
    });
    async function airegistry_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let airegistry_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          airegistry_v1Body["dpdKey"] = encryptionDpd;
          airegistry_v1Body["method"] = encryptionMethod;
        }
        if(registeraiasset_v1Props.length > 0){
          for(let i=0;i< registeraiasset_v1Props.length;i++){
            if(registeraiasset_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1"){
              // delete registeraiasset_v1Props[i].DFDkey;
              let temp=structuredClone(registeraiasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          airegistry_v1Body['filterData'] = filterData;
        }
        const airegistry_v1Data:any=await AxiosService.post("/te/eventEmitter",airegistry_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=airegistry_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(airegistry_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_airegistry_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_airegistry_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (airegistry_v1Data?.data?.dataset) {
           setdfd_airegistry_v1Props(
              Array.isArray(airegistry_v1Data?.data?.dataset?.data)
                 ? airegistry_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_airegistry_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.airegistry_v1) {
      airegistry_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.airegistry_v1= true
  },[refetch?.airegistry_v1])
    async function businessunitcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let businessunitcombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessUnitCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          businessunitcombo_v1Body["dpdKey"] = encryptionDpd;
          businessunitcombo_v1Body["method"] = encryptionMethod;
        }
        if(registeraiasset_v1Props.length > 0){
          for(let i=0;i< registeraiasset_v1Props.length;i++){
            if(registeraiasset_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessUnitCombo:AFVK:v1"){
              // delete registeraiasset_v1Props[i].DFDkey;
              let temp=structuredClone(registeraiasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          businessunitcombo_v1Body['filterData'] = filterData;
        }
        const businessunitcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",businessunitcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=businessunitcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(businessunitcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_businessunitcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_businessunitcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (businessunitcombo_v1Data?.data?.dataset) {
           setdfd_businessunitcombo_v1Props(
              Array.isArray(businessunitcombo_v1Data?.data?.dataset?.data)
                 ? businessunitcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_businessunitcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.businessunitcombo_v1) {
      businessunitcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.businessunitcombo_v1= true
  },[refetch?.businessunitcombo_v1])
    async function businessownercombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let businessownercombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          businessownercombo_v1Body["dpdKey"] = encryptionDpd;
          businessownercombo_v1Body["method"] = encryptionMethod;
        }
        if(registeraiasset_v1Props.length > 0){
          for(let i=0;i< registeraiasset_v1Props.length;i++){
            if(registeraiasset_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:businessOwnerCombo:AFVK:v1"){
              // delete registeraiasset_v1Props[i].DFDkey;
              let temp=structuredClone(registeraiasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          businessownercombo_v1Body['filterData'] = filterData;
        }
        const businessownercombo_v1Data:any=await AxiosService.post("/te/eventEmitter",businessownercombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=businessownercombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(businessownercombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_businessownercombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_businessownercombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (businessownercombo_v1Data?.data?.dataset) {
           setdfd_businessownercombo_v1Props(
              Array.isArray(businessownercombo_v1Data?.data?.dataset?.data)
                 ? businessownercombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_businessownercombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.businessownercombo_v1) {
      businessownercombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.businessownercombo_v1= true
  },[refetch?.businessownercombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setregisteraiasset_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1',
        [user],
        'pageRegisteraiassetV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1`)
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
    await airegistry_v1DFD(pagination)
    await businessunitcombo_v1DFD(pagination)
    await businessownercombo_v1DFD(pagination)
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
            if(nodes?.groupName == 'asset_identity_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_identity_group(true)
            }
            if(nodes?.groupName == 'ownership_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckownership_group(true)
            }
            if(nodes?.groupName == 'vending_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvending_group(true)
            }
            if(nodes?.groupName == 'certification_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcertification_group(true)
            }
            if(nodes?.groupName == 'usecase_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckusecase_group(true)
            }
            if(nodes?.groupName == 'tier_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktier_group(true)
            }
            if(nodes?.groupName == 'lifecycle_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecklifecycle_group(true)
            }
            if(nodes?.groupName == 'version_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckversion_group(true)
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
          codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de;
          codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de;
          codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc;
          codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc;
          codeStates['asset_identity_group'] = asset_identity_group8d5e1;
          codeStates['setasset_identity_group'] = setasset_identity_group8d5e1;
          codeStates['ownership_group'] = ownership_groupf52d5;
          codeStates['setownership_group'] = setownership_groupf52d5;
          codeStates['vending_group'] = vending_group8f2ec;
          codeStates['setvending_group'] = setvending_group8f2ec;
          codeStates['certification_group'] = certification_groupa10eb;
          codeStates['setcertification_group'] = setcertification_groupa10eb;
          codeStates['usecase_group'] = usecase_group233f9;
          codeStates['setusecase_group'] = setusecase_group233f9;
          codeStates['tier_group'] = tier_group6915b;
          codeStates['settier_group'] = settier_group6915b;
          codeStates['lifecycle_group'] = lifecycle_groupb7909;
          codeStates['setlifecycle_group'] = setlifecycle_groupb7909;
          codeStates['version_group'] = version_group3fe6f;
          codeStates['setversion_group'] = setversion_group3fe6f;
          codeStates['dynamicactions'] = dynamicactionsf846f;
          codeStates['setdynamicactions'] = setdynamicactionsf846f;
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
    setregisteraiasset_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(registeraiasset_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(registeraiasset_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setregisteraiasset_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    