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

const Groupoverall_ai_asset_registry = dynamic(() => import("./Groupoverall_ai_asset_registry/Groupoverall_ai_asset_registry"), { ssr: false });

export default function PageApplycertificationV1({ onReady }: { onReady?: () => void } = {}) {
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
    "ai_asset_id": {
      "show": false
    },
    "certification_id": {
      "show": false
    },
    "cancel_btn": {
      "show": false
    },
    "save_btn": {
      "show": false
    }
  },
  "model_info_group": {
    "model_information_text": {
      "show": false
    },
    "text": {
      "show": false
    },
    "text1": {
      "show": false
    },
    "text2": {
      "show": false
    },
    "asset_code": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "risk_tier_code": {
      "show": false
    }
  },
  "grounding_group": {
    "grounding_text": {
      "show": false
    },
    "cert_code_text": {
      "show": false
    },
    "cert_temp_text": {
      "show": false
    },
    "text_current_stage_seq": {
      "show": false
    },
    "cert_code": {
      "show": false
    },
    "template_name": {
      "show": false
    },
    "stage_type_code": {
      "show": false
    },
    "text_status": {
      "show": false
    },
    "cert_status_code": {
      "show": false
    },
    "is_recertification": {
      "show": false
    },
    "is_active": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "certification record";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {applycertification_v1, setapplycertification_v1} = useContext(TotalContext) as TotalContextProps;
  const {applycertification_v1Props, setapplycertification_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverall_ai_asset_registry,setCheckoverall_ai_asset_registry,]=useState<boolean>(false);
  const [checkregister_ai_asset_group,setCheckregister_ai_asset_group,]=useState<boolean>(false);
  const [checkmodel_info_group,setCheckmodel_info_group,]=useState<boolean>(false);
  const [checkgrounding_group,setCheckgrounding_group,]=useState<boolean>(false);
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226} = useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07} = useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9} = useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatetempname_v1Props, setdfd_applycertificatetempname_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertstatuscombo_v1Props, setdfd_applycertstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatestagecombo_v1Props, setdfd_applycertificatestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      applycertificatetempname_v1:false,
      applycertstatuscombo_v1:false,
      applycertificatestagecombo_v1:false,
    });
    async function applycertificatetempname_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let applycertificatetempname_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateTempName:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          applycertificatetempname_v1Body["dpdKey"] = encryptionDpd;
          applycertificatetempname_v1Body["method"] = encryptionMethod;
        }
        if(applycertification_v1Props.length > 0){
          for(let i=0;i< applycertification_v1Props.length;i++){
            if(applycertification_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateTempName:AFVK:v1"){
              // delete applycertification_v1Props[i].DFDkey;
              let temp=structuredClone(applycertification_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          applycertificatetempname_v1Body['filterData'] = filterData;
        }
        const applycertificatetempname_v1Data:any=await AxiosService.post("/te/eventEmitter",applycertificatetempname_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=applycertificatetempname_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(applycertificatetempname_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_applycertificatetempname_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_applycertificatetempname_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (applycertificatetempname_v1Data?.data?.dataset) {
           setdfd_applycertificatetempname_v1Props(
              Array.isArray(applycertificatetempname_v1Data?.data?.dataset?.data)
                 ? applycertificatetempname_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_applycertificatetempname_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.applycertificatetempname_v1) {
      applycertificatetempname_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.applycertificatetempname_v1= true
  },[refetch?.applycertificatetempname_v1])
    async function applycertstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let applycertstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          applycertstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          applycertstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(applycertification_v1Props.length > 0){
          for(let i=0;i< applycertification_v1Props.length;i++){
            if(applycertification_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertStatusCombo:AFVK:v1"){
              // delete applycertification_v1Props[i].DFDkey;
              let temp=structuredClone(applycertification_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          applycertstatuscombo_v1Body['filterData'] = filterData;
        }
        const applycertstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",applycertstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=applycertstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(applycertstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_applycertstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_applycertstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (applycertstatuscombo_v1Data?.data?.dataset) {
           setdfd_applycertstatuscombo_v1Props(
              Array.isArray(applycertstatuscombo_v1Data?.data?.dataset?.data)
                 ? applycertstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_applycertstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.applycertstatuscombo_v1) {
      applycertstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.applycertstatuscombo_v1= true
  },[refetch?.applycertstatuscombo_v1])
    async function applycertificatestagecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let applycertificatestagecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateStageCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          applycertificatestagecombo_v1Body["dpdKey"] = encryptionDpd;
          applycertificatestagecombo_v1Body["method"] = encryptionMethod;
        }
        if(applycertification_v1Props.length > 0){
          for(let i=0;i< applycertification_v1Props.length;i++){
            if(applycertification_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:applyCertificateStageCombo:AFVK:v1"){
              // delete applycertification_v1Props[i].DFDkey;
              let temp=structuredClone(applycertification_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          applycertificatestagecombo_v1Body['filterData'] = filterData;
        }
        const applycertificatestagecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",applycertificatestagecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=applycertificatestagecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(applycertificatestagecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_applycertificatestagecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_applycertificatestagecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (applycertificatestagecombo_v1Data?.data?.dataset) {
           setdfd_applycertificatestagecombo_v1Props(
              Array.isArray(applycertificatestagecombo_v1Data?.data?.dataset?.data)
                 ? applycertificatestagecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_applycertificatestagecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.applycertificatestagecombo_v1) {
      applycertificatestagecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.applycertificatestagecombo_v1= true
  },[refetch?.applycertificatestagecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setapplycertification_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1',
        [user],
        'pageApplycertificationV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1`)
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
    await applycertificatetempname_v1DFD(pagination)
    await applycertstatuscombo_v1DFD(pagination)
    await applycertificatestagecombo_v1DFD(pagination)
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
          codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226;
          codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226;
          codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07;
          codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07;
          codeStates['model_info_group'] = model_info_group425e9;
          codeStates['setmodel_info_group'] = setmodel_info_group425e9;
          codeStates['grounding_group'] = grounding_group64d9d;
          codeStates['setgrounding_group'] = setgrounding_group64d9d;
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
    setapplycertification_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(applycertification_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(applycertification_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setapplycertification_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    