'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
const Groupheader_group = dynamic(() => import("./Groupheader_group/Groupheader_group"), { ssr: false });
const Groupasset_dashboard_group = dynamic(() => import("./Groupasset_dashboard_group/Groupasset_dashboard_group"), { ssr: false });
const Grouptable_group = dynamic(() => import("./Grouptable_group/Grouptable_group"), { ssr: false });

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
  "table_group": {
    "status": {
      "show": false
    }
  },
  "subscreen": {},
  "ct006_af_uf_ufws_lap_lap_amrqueuetable_v1": {},
  "group": {
    "search_btn": {
      "show": false
    },
    "add_btn": {
      "show": false
    },
    "text": {
      "show": false
    }
  },
  "table": {
    "case_display_id": {
      "show": false
    },
    "debtor_name": {
      "show": false
    },
    "creditor_name": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "total_balance": {
      "show": false
    },
    "court_name": {
      "show": false
    },
    "priority_name": {
      "show": false
    },
    "status_name": {
      "show": false
    },
    "trs_created_date": {
      "show": false
    },
    "view_btns": {
      "show": false
    },
    "edit_btns": {
      "show": false
    }
  },
  "ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1": {},
  "pending_fillings_group": {
    "search_btn": {
      "show": false
    },
    "add_btn": {
      "show": false
    },
    "text": {
      "show": false
    }
  },
  "pending_fillings_table": {
    "case_display_id": {
      "show": false
    },
    "debtor_name": {
      "show": false
    },
    "creditor_name": {
      "show": false
    },
    "full_name": {
      "show": false
    },
    "total_balance": {
      "show": false
    },
    "court_name": {
      "show": false
    },
    "priority_name": {
      "show": false
    },
    "status_name": {
      "show": false
    },
    "trs_created_date": {
      "show": false
    },
    "view_btn": {
      "show": false
    },
    "edit_btn": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
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
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkasset_dashboard_group,setCheckasset_dashboard_group,]=useState<boolean>(false);
  const [checkamr_queue_group,setCheckamr_queue_group,]=useState<boolean>(false);
  const [checkpending_file_group,setCheckpending_file_group,]=useState<boolean>(false);
  const [checkservice_pending_group,setCheckservice_pending_group,]=useState<boolean>(false);
  const [checkslas_at_risk_group,setCheckslas_at_risk_group,]=useState<boolean>(false);
  const [checkcourt_rejection_group,setCheckcourt_rejection_group,]=useState<boolean>(false);
  const [checkcollected_mtd_group,setCheckcollected_mtd_group,]=useState<boolean>(false);
  const [checktable_group,setChecktable_group,]=useState<boolean>(false);
  const [checksubscreen,setChecksubscreen,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_lap_lap_amrqueuetable_v1,setCheckct006_af_uf_ufws_lap_lap_amrqueuetable_v1,]=useState<boolean>(false);
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const [checktable,setChecktable,]=useState<boolean>(false);
  const [checkct006_af_uf_ufws_lap_lap_pendingfilingtable_v1,setCheckct006_af_uf_ufws_lap_lap_pendingfilingtable_v1,]=useState<boolean>(false);
  const [checkpending_fillings_group,setCheckpending_fillings_group,]=useState<boolean>(false);
  const [checkpending_fillings_table,setCheckpending_fillings_table,]=useState<boolean>(false);
  const {header_groupb1913, setheader_groupb1913} = useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe} = useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92ca, setamr_queue_groupc92ca} = useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32, setpending_file_groupffe32} = useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93, setservice_pending_group7ba93} = useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4, setslas_at_risk_group23eb4} = useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54, setcourt_rejection_groupc9d54} = useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5, setcollected_mtd_group7b7b5} = useContext(TotalContext) as TotalContextProps;
  const {table_group112bd, settable_group112bd} = useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5, setsubscreene9ab5} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797} = useContext(TotalContext) as TotalContextProps;
  const {group28176, setgroup28176} = useContext(TotalContext) as TotalContextProps;
  const {table852e3, settable852e3} = useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da} = useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568, setpending_fillings_groupb1568} = useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279, setpending_fillings_table11279} = useContext(TotalContext) as TotalContextProps;
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
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
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
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:pendingFilingsDashboard:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
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
        if(dashboard_v1Props.length > 0){
          for(let i=0;i< dashboard_v1Props.length;i++){
            if(dashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:cardsDashboard:AFVK:v1"){
              // delete dashboard_v1Props[i].DFDkey;
              let temp=structuredClone(dashboard_v1Props[i])
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
    setdashboard_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1"
        }
      : { key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1" }

    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, introspect, myAccountRes]: [any, any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1',
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
            if(nodes?.groupName == 'table_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable_group(true)
            }
            if(nodes?.groupName == 'subscreen' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksubscreen(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_LAP_LAP_amrQueueTable_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_lap_lap_amrqueuetable_v1(true)
            }
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup(true)
            }
            if(nodes?.groupName == 'table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable(true)
            }
            if(nodes?.groupName == 'CT006_AF_UF_UFWS_LAP_LAP_pendingFilingTable_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct006_af_uf_ufws_lap_lap_pendingfilingtable_v1(true)
            }
            if(nodes?.groupName == 'pending_fillings_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_fillings_group(true)
            }
            if(nodes?.groupName == 'pending_fillings_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpending_fillings_table(true)
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
          codeStates['header_group'] = header_groupb1913;
          codeStates['setheader_group'] = setheader_groupb1913;
          codeStates['asset_dashboard_group'] = asset_dashboard_group4bbfe;
          codeStates['setasset_dashboard_group'] = setasset_dashboard_group4bbfe;
          codeStates['amr_queue_group'] = amr_queue_groupc92ca;
          codeStates['setamr_queue_group'] = setamr_queue_groupc92ca;
          codeStates['pending_file_group'] = pending_file_groupffe32;
          codeStates['setpending_file_group'] = setpending_file_groupffe32;
          codeStates['service_pending_group'] = service_pending_group7ba93;
          codeStates['setservice_pending_group'] = setservice_pending_group7ba93;
          codeStates['slas_at_risk_group'] = slas_at_risk_group23eb4;
          codeStates['setslas_at_risk_group'] = setslas_at_risk_group23eb4;
          codeStates['court_rejection_group'] = court_rejection_groupc9d54;
          codeStates['setcourt_rejection_group'] = setcourt_rejection_groupc9d54;
          codeStates['collected_mtd_group'] = collected_mtd_group7b7b5;
          codeStates['setcollected_mtd_group'] = setcollected_mtd_group7b7b5;
          codeStates['table_group'] = table_group112bd;
          codeStates['settable_group'] = settable_group112bd;
          codeStates['subscreen'] = subscreene9ab5;
          codeStates['setsubscreen'] = setsubscreene9ab5;
          codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797;
          codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797;
          codeStates['group'] = group28176;
          codeStates['setgroup'] = setgroup28176;
          codeStates['table'] = table852e3;
          codeStates['settable'] = settable852e3;
          codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da;
          codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da;
          codeStates['pending_fillings_group'] = pending_fillings_groupb1568;
          codeStates['setpending_fillings_group'] = setpending_fillings_groupb1568;
          codeStates['pending_fillings_table'] = pending_fillings_table11279;
          codeStates['setpending_fillings_table'] = setpending_fillings_table11279;
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
        
        {checktable_group && initialLoad &&<Grouptable_group
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
    