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

const Groupoverall_group = dynamic(() => import("./Groupoverall_group/Groupoverall_group"), { ssr: false });

export default function PageDashboardV1({ onReady }: { onReady?: () => void } = {}) {
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
  "overall_group": {
    "dashboard_header": {
      "show": false
    }
  },
  "register_ai_group": {
    "register_ai_text": {
      "show": false
    },
    "register_ai_value": {
      "show": false
    }
  },
  "tier_critical_group": {
    "tier_critical_text": {
      "show": false
    },
    "tier_critical_value": {
      "show": false
    }
  },
  "cert_expired_group": {
    "cert_expired_text": {
      "show": false
    },
    "cert_expired_value": {
      "show": false
    }
  },
  "named_owner_group": {
    "named_owner_text": {
      "show": false
    },
    "named_owner_value": {
      "show": false
    }
  },
  "cert_date_group": {
    "cert_date_text": {
      "show": false
    },
    "cert_date_value": {
      "show": false
    }
  },
  "governer_gap_group": {
    "table_text": {
      "show": false
    }
  },
  "table": {
    "asset_coln": {
      "show": false
    },
    "tier_coln": {
      "show": false
    },
    "business_coln": {
      "show": false
    },
    "date": {
      "show": false
    },
    "status": {
      "show": false
    }
  },
  "pirchart_group": {
    "piechart_header": {
      "show": false
    },
    "piechart": {
      "show": false
    }
  },
  "assets_by_business_unit_group": {
    "assets_by_business_unit_text": {
      "show": false
    },
    "consumer_lending_text": {
      "show": false
    },
    "consumer_lending_progress": {
      "show": false
    },
    "group_functions_text": {
      "show": false
    },
    "group_functions_progress": {
      "show": false
    },
    "operations_text": {
      "show": false
    },
    "operations_progress": {
      "show": false
    },
    "financial_crime_text": {
      "show": false
    },
    "financial_crime_progress": {
      "show": false
    },
    "cards_payments_text": {
      "show": false
    },
    "cards_payments_progress": {
      "show": false
    },
    "technology_text": {
      "show": false
    },
    "technology_progress": {
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
  const [checkoverall_group,setCheckoverall_group,]=useState<boolean>(false);
  const [checkregister_ai_group,setCheckregister_ai_group,]=useState<boolean>(false);
  const [checktier_critical_group,setChecktier_critical_group,]=useState<boolean>(false);
  const [checkcert_expired_group,setCheckcert_expired_group,]=useState<boolean>(false);
  const [checknamed_owner_group,setChecknamed_owner_group,]=useState<boolean>(false);
  const [checkcert_date_group,setCheckcert_date_group,]=useState<boolean>(false);
  const [checkgoverner_gap_group,setCheckgoverner_gap_group,]=useState<boolean>(false);
  const [checktable,setChecktable,]=useState<boolean>(false);
  const [checkpirchart_group,setCheckpirchart_group,]=useState<boolean>(false);
  const [checkassets_by_business_unit_group,setCheckassets_by_business_unit_group,]=useState<boolean>(false);
  const {overall_group0ca82, setoverall_group0ca82} = useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810, setregister_ai_group08810} = useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4, settier_critical_group484c4} = useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48db, setcert_expired_groupf48db} = useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361e, setnamed_owner_group4361e} = useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35, setcert_date_group9ac35} = useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585, setgoverner_gap_group09585} = useContext(TotalContext) as TotalContextProps;
  const {table0a722, settable0a722} = useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70d, setpirchart_group8d70d} = useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dashboardtable_v1Props, setdfd_dashboardtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardmetricsdashboard_v1Props, setdfd_cardmetricsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_piechartdashboard_v1Props, setdfd_piechartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      dashboardtable_v1:false,
      cardmetricsdashboard_v1:false,
      piechartdashboard_v1:false,
    });
    async function dashboardtable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let dashboardtable_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          dashboardtable_v1Body["dpdKey"] = encryptionDpd;
          dashboardtable_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:dashboardTable:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          dashboardtable_v1Body['filterData'] = filterData;
        }
        const dashboardtable_v1Data:any=await AxiosService.post("/te/eventEmitter",dashboardtable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=dashboardtable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(dashboardtable_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_dashboardtable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_dashboardtable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (dashboardtable_v1Data?.data?.dataset) {
           setdfd_dashboardtable_v1Props(
              Array.isArray(dashboardtable_v1Data?.data?.dataset?.data)
                 ? dashboardtable_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_dashboardtable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.dashboardtable_v1) {
      dashboardtable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.dashboardtable_v1= true
  },[refetch?.dashboardtable_v1])
    async function cardmetricsdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let cardmetricsdashboard_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          cardmetricsdashboard_v1Body["dpdKey"] = encryptionDpd;
          cardmetricsdashboard_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:cardMetricsDashboard:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          cardmetricsdashboard_v1Body['filterData'] = filterData;
        }
        const cardmetricsdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",cardmetricsdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=cardmetricsdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(cardmetricsdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_cardmetricsdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_cardmetricsdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (cardmetricsdashboard_v1Data?.data?.dataset) {
           setdfd_cardmetricsdashboard_v1Props(
              Array.isArray(cardmetricsdashboard_v1Data?.data?.dataset?.data)
                 ? cardmetricsdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_cardmetricsdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.cardmetricsdashboard_v1) {
      cardmetricsdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.cardmetricsdashboard_v1= true
  },[refetch?.cardmetricsdashboard_v1])
    async function piechartdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let piechartdashboard_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:piechartDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          piechartdashboard_v1Body["dpdKey"] = encryptionDpd;
          piechartdashboard_v1Body["method"] = encryptionMethod;
        }
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:piechartDashboard:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          piechartdashboard_v1Body['filterData'] = filterData;
        }
        const piechartdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",piechartdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=piechartdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(piechartdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_piechartdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_piechartdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (piechartdashboard_v1Data?.data?.dataset) {
           setdfd_piechartdashboard_v1Props(
              Array.isArray(piechartdashboard_v1Data?.data?.dataset?.data)
                 ? piechartdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_piechartdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.piechartdashboard_v1) {
      piechartdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.piechartdashboard_v1= true
  },[refetch?.piechartdashboard_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setdashboard_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1`)
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
    await dashboardtable_v1DFD(pagination)
    await cardmetricsdashboard_v1DFD(pagination)
    await piechartdashboard_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overall_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_group(true)
            }
            if(nodes?.groupName == 'register_ai_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckregister_ai_group(true)
            }
            if(nodes?.groupName == 'tier_critical_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktier_critical_group(true)
            }
            if(nodes?.groupName == 'cert_expired_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcert_expired_group(true)
            }
            if(nodes?.groupName == 'named_owner_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecknamed_owner_group(true)
            }
            if(nodes?.groupName == 'cert_date_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcert_date_group(true)
            }
            if(nodes?.groupName == 'governer_gap_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgoverner_gap_group(true)
            }
            if(nodes?.groupName == 'table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable(true)
            }
            if(nodes?.groupName == 'pirchart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpirchart_group(true)
            }
            if(nodes?.groupName == 'assets_by_business_unit_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckassets_by_business_unit_group(true)
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
          codeStates['overall_group'] = overall_group0ca82;
          codeStates['setoverall_group'] = setoverall_group0ca82;
          codeStates['register_ai_group'] = register_ai_group08810;
          codeStates['setregister_ai_group'] = setregister_ai_group08810;
          codeStates['tier_critical_group'] = tier_critical_group484c4;
          codeStates['settier_critical_group'] = settier_critical_group484c4;
          codeStates['cert_expired_group'] = cert_expired_groupf48db;
          codeStates['setcert_expired_group'] = setcert_expired_groupf48db;
          codeStates['named_owner_group'] = named_owner_group4361e;
          codeStates['setnamed_owner_group'] = setnamed_owner_group4361e;
          codeStates['cert_date_group'] = cert_date_group9ac35;
          codeStates['setcert_date_group'] = setcert_date_group9ac35;
          codeStates['governer_gap_group'] = governer_gap_group09585;
          codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585;
          codeStates['table'] = table0a722;
          codeStates['settable'] = settable0a722;
          codeStates['pirchart_group'] = pirchart_group8d70d;
          codeStates['setpirchart_group'] = setpirchart_group8d70d;
          codeStates['assets_by_business_unit_group'] = assets_by_business_unit_group374c2;
          codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2;
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
      }
      handleArtfactRule(dashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

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
        {checkoverall_group && initialLoad &&<Groupoverall_group
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
    