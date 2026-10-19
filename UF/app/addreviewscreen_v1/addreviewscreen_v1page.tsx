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

const Groupadd_group = dynamic(() => import("./Groupadd_group/Groupadd_group"), { ssr: false });

export default function PageAddreviewscreenV1({ onReady }: { onReady?: () => void } = {}) {
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
  "add_group": {
    "cert_stage_id": {
      "show": false
    }
  },
  "add_rule_condition_header": {
    "text": {
      "show": false
    },
    "ai_asset_id": {
      "show": false
    },
    "asset_code": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "stage_status_code": {
      "show": false
    }
  },
  "group": {
    "text": {
      "show": false
    },
    "cert_stage_id": {
      "show": false
    },
    "stage_sequence": {
      "show": false
    },
    "stage_type_code": {
      "show": false
    },
    "stage_name": {
      "show": false
    }
  },
  "schedule_group": {
    "text11": {
      "show": false
    },
    "due_on": {
      "show": false
    },
    "evidence_count": {
      "show": false
    },
    "trs_created_on": {
      "show": false
    }
  },
  "status_group": {
    "text": {
      "show": false
    },
    "stage_status_code": {
      "show": false
    },
    "is_active": {
      "show": false
    }
  },
  "add_rule_condition": {
    "decision_comment": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel_btn": {
      "show": false
    },
    "reject_btn": {
      "show": false
    },
    "approved_btn": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "certificate stage";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {addreviewscreen_v1, setaddreviewscreen_v1} = useContext(TotalContext) as TotalContextProps;
  const {addreviewscreen_v1Props, setaddreviewscreen_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkadd_group,setCheckadd_group,]=useState<boolean>(false);
  const [checkadd_rule_condition_header,setCheckadd_rule_condition_header,]=useState<boolean>(false);
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const [checkschedule_group,setCheckschedule_group,]=useState<boolean>(false);
  const [checkstatus_group,setCheckstatus_group,]=useState<boolean>(false);
  const [checkadd_rule_condition,setCheckadd_rule_condition,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {add_groupac52e, setadd_groupac52e} = useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6} = useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09} = useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee} = useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9} = useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ruleconditioncombo_v1Props, setdfd_ruleconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskoperatorcodecombo_v1Props, setdfd_riskoperatorcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      ruleconditioncombo_v1:false,
      riskrulecondition_v1:false,
      riskoperatorcodecombo_v1:false,
    });
    async function ruleconditioncombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let ruleconditioncombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:ruleConditionCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          ruleconditioncombo_v1Body["dpdKey"] = encryptionDpd;
          ruleconditioncombo_v1Body["method"] = encryptionMethod;
        }
        if(addreviewscreen_v1Props.length > 0){
          for(let i=0;i< addreviewscreen_v1Props.length;i++){
            if(addreviewscreen_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:ruleConditionCombo:AFVK:v1"){
              // delete addreviewscreen_v1Props[i].DFDkey;
              let temp=structuredClone(addreviewscreen_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          ruleconditioncombo_v1Body['filterData'] = filterData;
        }
        const ruleconditioncombo_v1Data:any=await AxiosService.post("/te/eventEmitter",ruleconditioncombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=ruleconditioncombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(ruleconditioncombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_ruleconditioncombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_ruleconditioncombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (ruleconditioncombo_v1Data?.data?.dataset) {
           setdfd_ruleconditioncombo_v1Props(
              Array.isArray(ruleconditioncombo_v1Data?.data?.dataset?.data)
                 ? ruleconditioncombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_ruleconditioncombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.ruleconditioncombo_v1) {
      ruleconditioncombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.ruleconditioncombo_v1= true
  },[refetch?.ruleconditioncombo_v1])
    async function riskrulecondition_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let riskrulecondition_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          riskrulecondition_v1Body["dpdKey"] = encryptionDpd;
          riskrulecondition_v1Body["method"] = encryptionMethod;
        }
        if(addreviewscreen_v1Props.length > 0){
          for(let i=0;i< addreviewscreen_v1Props.length;i++){
            if(addreviewscreen_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1"){
              // delete addreviewscreen_v1Props[i].DFDkey;
              let temp=structuredClone(addreviewscreen_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          riskrulecondition_v1Body['filterData'] = filterData;
        }
        const riskrulecondition_v1Data:any=await AxiosService.post("/te/eventEmitter",riskrulecondition_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=riskrulecondition_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(riskrulecondition_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_riskrulecondition_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_riskrulecondition_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (riskrulecondition_v1Data?.data?.dataset) {
           setdfd_riskrulecondition_v1Props(
              Array.isArray(riskrulecondition_v1Data?.data?.dataset?.data)
                 ? riskrulecondition_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_riskrulecondition_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.riskrulecondition_v1) {
      riskrulecondition_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.riskrulecondition_v1= true
  },[refetch?.riskrulecondition_v1])
    async function riskoperatorcodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let riskoperatorcodecombo_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskOperatorCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          riskoperatorcodecombo_v1Body["dpdKey"] = encryptionDpd;
          riskoperatorcodecombo_v1Body["method"] = encryptionMethod;
        }
        if(addreviewscreen_v1Props.length > 0){
          for(let i=0;i< addreviewscreen_v1Props.length;i++){
            if(addreviewscreen_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskOperatorCodeCombo:AFVK:v1"){
              // delete addreviewscreen_v1Props[i].DFDkey;
              let temp=structuredClone(addreviewscreen_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          riskoperatorcodecombo_v1Body['filterData'] = filterData;
        }
        const riskoperatorcodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",riskoperatorcodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=riskoperatorcodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(riskoperatorcodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_riskoperatorcodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_riskoperatorcodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (riskoperatorcodecombo_v1Data?.data?.dataset) {
           setdfd_riskoperatorcodecombo_v1Props(
              Array.isArray(riskoperatorcodecombo_v1Data?.data?.dataset?.data)
                 ? riskoperatorcodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_riskoperatorcodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.riskoperatorcodecombo_v1) {
      riskoperatorcodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.riskoperatorcodecombo_v1= true
  },[refetch?.riskoperatorcodecombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddreviewscreen_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1',
        [user],
        'pageAddreviewscreenV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1`)
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
    await ruleconditioncombo_v1DFD(pagination)
    await riskrulecondition_v1DFD(pagination)
    await riskoperatorcodecombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'add_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadd_group(true)
            }
            if(nodes?.groupName == 'add_rule_condition_header' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadd_rule_condition_header(true)
            }
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup(true)
            }
            if(nodes?.groupName == 'schedule_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckschedule_group(true)
            }
            if(nodes?.groupName == 'status_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckstatus_group(true)
            }
            if(nodes?.groupName == 'add_rule_condition' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadd_rule_condition(true)
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
          codeStates['add_group'] = add_groupac52e;
          codeStates['setadd_group'] = setadd_groupac52e;
          codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6;
          codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6;
          codeStates['group'] = group73b09;
          codeStates['setgroup'] = setgroup73b09;
          codeStates['schedule_group'] = schedule_groupc0bee;
          codeStates['setschedule_group'] = setschedule_groupc0bee;
          codeStates['status_group'] = status_groupc59b9;
          codeStates['setstatus_group'] = setstatus_groupc59b9;
          codeStates['add_rule_condition'] = add_rule_condition96c45;
          codeStates['setadd_rule_condition'] = setadd_rule_condition96c45;
          codeStates['dynamicactions'] = dynamicactions62ac1;
          codeStates['setdynamicactions'] = setdynamicactions62ac1;
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
    setaddreviewscreen_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addreviewscreen_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addreviewscreen_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddreviewscreen_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("#f1f2f7",
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
        {checkadd_group && initialLoad &&<Groupadd_group
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
    