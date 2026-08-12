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

const Groupheader_group = dynamic(() => import("./Groupheader_group/Groupheader_group"), { ssr: false });
const Groupasset_dashboard_group = dynamic(() => import("./Groupasset_dashboard_group/Groupasset_dashboard_group"), { ssr: false });
const Groupoverall_key_performance_indicators = dynamic(() => import("./Groupoverall_key_performance_indicators/Groupoverall_key_performance_indicators"), { ssr: false });

export default function PageDashboardV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Branch Manager": {
    "blockedGroups": []
  },
  "Branch Officer": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "header_group": {
    "text": {
      "show": false
    }
  },
  "asset_dashboard_group": {},
  "amr_queue_group": {
    "amr_queue_text": {
      "show": false
    },
    "icon_total_assest": {
      "show": false
    },
    "amr_queue": {
      "show": false
    },
    "amr_queue_desc": {
      "show": false
    }
  },
  "pending_file_group": {
    "pending_file_text": {
      "show": false
    },
    "icon_maintenance_due": {
      "show": false
    },
    "pending_file": {
      "show": false
    },
    "pending_file_desc": {
      "show": false
    }
  },
  "service_pending_group": {
    "service_pending_text": {
      "show": false
    },
    "icon_warranty_expiring": {
      "show": false
    },
    "service_pending": {
      "show": false
    },
    "service_pending_desc": {
      "show": false
    }
  },
  "slas_at_risk_group": {
    "slas_at_risk_text": {
      "show": false
    },
    "icon_": {
      "show": false
    },
    "slas_at_risk": {
      "show": false
    },
    "slas_at_risk_desc": {
      "show": false
    }
  },
  "court_rejection_group": {
    "court_rejection_text": {
      "show": false
    },
    "icon": {
      "show": false
    },
    "court_rejection": {
      "show": false
    },
    "court_rejection_desc": {
      "show": false
    }
  },
  "collected_mtd_group": {
    "collected_mtd_text": {
      "show": false
    },
    "icon": {
      "show": false
    },
    "collected_mtd": {
      "show": false
    },
    "collected_mtd_desc": {
      "show": false
    }
  },
  "overall_key_performance_indicators": {},
  "key_performance_indicator_group": {
    "key_performance_indicators_text": {
      "show": false
    },
    "total_active_accounts_text": {
      "show": false
    },
    "total_active_accounts_text1": {
      "show": false
    },
    "divider1": {
      "show": false
    },
    "avg_days_to_judgment_text": {
      "show": false
    },
    "avg_days_to_judgment_text1": {
      "show": false
    },
    "divider2": {
      "show": false
    },
    "court_rejection_rate_text": {
      "show": false
    },
    "court_rejection_rate_text1": {
      "show": false
    },
    "divider3": {
      "show": false
    },
    "compliance_score_text": {
      "show": false
    },
    "compliance_score_text1": {
      "show": false
    },
    "divider4": {
      "show": false
    },
    "collection_rate_mtd_text": {
      "show": false
    },
    "collection_rate_mtd_text1": {
      "show": false
    }
  },
  "recent_activity_group": {
    "recent_activity_text": {
      "show": false
    },
    "amr_queued_text": {
      "show": false
    },
    "amr_queued_text_1": {
      "show": false
    },
    "divider1": {
      "show": false
    },
    "judgment_entered_text": {
      "show": false
    },
    "judgment_entered_text_1": {
      "show": false
    },
    "divider2": {
      "show": false
    },
    "service_completed_text": {
      "show": false
    },
    "service_completed_text_1": {
      "show": false
    },
    "divider3": {
      "show": false
    },
    "amr_passed_text": {
      "show": false
    },
    "amr_passed_text1": {
      "show": false
    },
    "divider4": {
      "show": false
    },
    "court_rejection_text": {
      "show": false
    },
    "court_rejection_text1": {
      "show": false
    },
    "divider5": {
      "show": false
    },
    "service_assigned_text": {
      "show": false
    },
    "service_assigned_text1": {
      "show": false
    },
    "divider6": {
      "show": false
    },
    "amr_rejected_text": {
      "show": false
    },
    "amr_rejected_text1": {
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
  const {newdashboard_v1, setnewdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {newdashboard_v1Props, setnewdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkasset_dashboard_group,setCheckasset_dashboard_group,]=useState<boolean>(false);
  const [checkamr_queue_group,setCheckamr_queue_group,]=useState<boolean>(false);
  const [checkpending_file_group,setCheckpending_file_group,]=useState<boolean>(false);
  const [checkservice_pending_group,setCheckservice_pending_group,]=useState<boolean>(false);
  const [checkslas_at_risk_group,setCheckslas_at_risk_group,]=useState<boolean>(false);
  const [checkcourt_rejection_group,setCheckcourt_rejection_group,]=useState<boolean>(false);
  const [checkcollected_mtd_group,setCheckcollected_mtd_group,]=useState<boolean>(false);
  const [checkoverall_key_performance_indicators,setCheckoverall_key_performance_indicators,]=useState<boolean>(false);
  const [checkkey_performance_indicator_group,setCheckkey_performance_indicator_group,]=useState<boolean>(false);
  const [checkrecent_activity_group,setCheckrecent_activity_group,]=useState<boolean>(false);
  const {header_groupd8ba9, setheader_groupd8ba9} = useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03, setasset_dashboard_group1aa03} = useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082, setamr_queue_group3c082} = useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128c, setpending_file_group2128c} = useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0ca, setservice_pending_group8c0ca} = useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0} = useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57a, setcourt_rejection_groupdf57a} = useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074, setcollected_mtd_group0f074} = useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711} = useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf} = useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6, setrecent_activity_group91db6} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrqueuedashboard_v1Props, setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_pendingfilingsdashboard_v1Props, setdfd_pendingfilingsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardsdashboard_v1Props, setdfd_cardsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      amrqueuedashboard_v1:false,
      pendingfilingsdashboard_v1:false,
      cardsdashboard_v1:false,
    });
    async function amrqueuedashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let amrqueuedashboard_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          amrqueuedashboard_v1Body["dpdKey"] = encryptionDpd;
          amrqueuedashboard_v1Body["method"] = encryptionMethod;
        }
        if(newdashboard_v1Props.length > 0){
          for(let i=0;i< newdashboard_v1Props.length;i++){
            if(newdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1"){
              // delete newdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(newdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          amrqueuedashboard_v1Body['filterData'] = filterData;
        }
        const amrqueuedashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",amrqueuedashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=amrqueuedashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(amrqueuedashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_amrqueuedashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_amrqueuedashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (amrqueuedashboard_v1Data?.data?.dataset) {
           setdfd_amrqueuedashboard_v1Props(
              Array.isArray(amrqueuedashboard_v1Data?.data?.dataset?.data)
                 ? amrqueuedashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_amrqueuedashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.amrqueuedashboard_v1) {
      amrqueuedashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.amrqueuedashboard_v1= true
  },[refetch?.amrqueuedashboard_v1])
    async function pendingfilingsdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let pendingfilingsdashboard_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          pendingfilingsdashboard_v1Body["dpdKey"] = encryptionDpd;
          pendingfilingsdashboard_v1Body["method"] = encryptionMethod;
        }
        if(newdashboard_v1Props.length > 0){
          for(let i=0;i< newdashboard_v1Props.length;i++){
            if(newdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1"){
              // delete newdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(newdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          pendingfilingsdashboard_v1Body['filterData'] = filterData;
        }
        const pendingfilingsdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",pendingfilingsdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=pendingfilingsdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(pendingfilingsdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_pendingfilingsdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_pendingfilingsdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (pendingfilingsdashboard_v1Data?.data?.dataset) {
           setdfd_pendingfilingsdashboard_v1Props(
              Array.isArray(pendingfilingsdashboard_v1Data?.data?.dataset?.data)
                 ? pendingfilingsdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_pendingfilingsdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.pendingfilingsdashboard_v1) {
      pendingfilingsdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.pendingfilingsdashboard_v1= true
  },[refetch?.pendingfilingsdashboard_v1])
    async function cardsdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let cardsdashboard_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          cardsdashboard_v1Body["dpdKey"] = encryptionDpd;
          cardsdashboard_v1Body["method"] = encryptionMethod;
        }
        if(newdashboard_v1Props.length > 0){
          for(let i=0;i< newdashboard_v1Props.length;i++){
            if(newdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1"){
              // delete newdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(newdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          cardsdashboard_v1Body['filterData'] = filterData;
        }
        const cardsdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",cardsdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=cardsdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(cardsdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_cardsdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_cardsdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (cardsdashboard_v1Data?.data?.dataset) {
           setdfd_cardsdashboard_v1Props(
              Array.isArray(cardsdashboard_v1Data?.data?.dataset?.data)
                 ? cardsdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_cardsdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.cardsdashboard_v1) {
      cardsdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.cardsdashboard_v1= true
  },[refetch?.cardsdashboard_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setnewdashboard_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1"
        }
      : { key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1" }

    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, introspect, myAccountRes]: [any, any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1',
        [user],
        'pageDashboardV1',
        token
      ),
      token
        ? AxiosService.get("/UF/introspect", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null),
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
      if (introspect?.__error) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/lap/lap/v1';
        } else if (introspect?.data?.authenticated === false) {
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/lap/lap/v1';
      }
      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await amrqueuedashboard_v1DFD(pagination)
    await pendingfilingsdashboard_v1DFD(pagination)
    await cardsdashboard_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'header_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckheader_group(true)
            }
            if(nodes?.groupName == 'asset_dashboard_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_dashboard_group(true)
            }
            if(nodes?.groupName == 'amr_queue_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckamr_queue_group(true)
            }
            if(nodes?.groupName == 'pending_file_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_file_group(true)
            }
            if(nodes?.groupName == 'service_pending_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckservice_pending_group(true)
            }
            if(nodes?.groupName == 'slas_at_risk_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckslas_at_risk_group(true)
            }
            if(nodes?.groupName == 'court_rejection_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcourt_rejection_group(true)
            }
            if(nodes?.groupName == 'collected_mtd_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcollected_mtd_group(true)
            }
            if(nodes?.groupName == 'overall_key_performance_indicators' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverall_key_performance_indicators(true)
            }
            if(nodes?.groupName == 'key_performance_indicator_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckkey_performance_indicator_group(true)
            }
            if(nodes?.groupName == 'recent_activity_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrecent_activity_group(true)
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
          codeStates['header_group'] = header_groupd8ba9;
          codeStates['setheader_group'] = setheader_groupd8ba9;
          codeStates['asset_dashboard_group'] = asset_dashboard_group1aa03;
          codeStates['setasset_dashboard_group'] = setasset_dashboard_group1aa03;
          codeStates['amr_queue_group'] = amr_queue_group3c082;
          codeStates['setamr_queue_group'] = setamr_queue_group3c082;
          codeStates['pending_file_group'] = pending_file_group2128c;
          codeStates['setpending_file_group'] = setpending_file_group2128c;
          codeStates['service_pending_group'] = service_pending_group8c0ca;
          codeStates['setservice_pending_group'] = setservice_pending_group8c0ca;
          codeStates['slas_at_risk_group'] = slas_at_risk_group1f8c0;
          codeStates['setslas_at_risk_group'] = setslas_at_risk_group1f8c0;
          codeStates['court_rejection_group'] = court_rejection_groupdf57a;
          codeStates['setcourt_rejection_group'] = setcourt_rejection_groupdf57a;
          codeStates['collected_mtd_group'] = collected_mtd_group0f074;
          codeStates['setcollected_mtd_group'] = setcollected_mtd_group0f074;
          codeStates['overall_key_performance_indicators'] = overall_key_performance_indicatorsc2711;
          codeStates['setoverall_key_performance_indicators'] = setoverall_key_performance_indicatorsc2711;
          codeStates['key_performance_indicator_group'] = key_performance_indicator_groupf9eaf;
          codeStates['setkey_performance_indicator_group'] = setkey_performance_indicator_groupf9eaf;
          codeStates['recent_activity_group'] = recent_activity_group91db6;
          codeStates['setrecent_activity_group'] = setrecent_activity_group91db6;
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
    setnewdashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(newdashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(newdashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setnewdashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkheader_group && initialLoad &&<Groupheader_group
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
        
        {checkasset_dashboard_group && initialLoad &&<Groupasset_dashboard_group
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
        
        {checkoverall_key_performance_indicators && initialLoad &&<Groupoverall_key_performance_indicators
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
    