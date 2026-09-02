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

const Groupvob_dashboard_screen = dynamic(() => import("./Groupvob_dashboard_screen/Groupvob_dashboard_screen"), { ssr: false });

export default function PageApiUsageV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Template 1": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "vob_dashboard_screen": {},
  "api_usage_group": {
    "api_usage_overview": {
      "show": false
    }
  },
  "req_group": {
    "total_requests": {
      "show": false
    },
    "tot_req_icon": {
      "show": false
    }
  },
  "active_group": {
    "active_apis": {
      "show": false
    },
    "active_icon": {
      "show": false
    }
  },
  "total_api_calls_group": {
    "most_used_apis": {
      "show": false
    },
    "most_used_api_icon": {
      "show": false
    }
  },
  "most_group": {
    "error_rate": {
      "show": false
    },
    "error_rate_icon": {
      "show": false
    }
  },
  "line_chart_group": {
    "api_call_hours": {
      "show": false
    },
    "api_call_hours_dropdown": {
      "show": false
    }
  },
  "api_call_over_frequency_subscreen": {},
  "ct003_af_uf_ufws_trs_tob_apicalloverhour_v1": {},
  "api_call_over_hour_group": {
    "api_call_over_hour_linechart": {
      "show": false
    }
  },
  "ct003_af_uf_ufws_trs_tob_apicallovermonth_v1": {},
  "api_call_over_month_group": {
    "api_call_over_month_linechart": {
      "show": false
    }
  },
  "ct003_af_uf_ufws_trs_tob_apicalloverweek_v1": {},
  "api_call_over_week_group": {
    "week_linechart": {
      "show": false
    }
  },
  "total_used_api_group": {
    "total_used_api_text": {
      "show": false
    },
    "get_accounts_text": {
      "show": false
    },
    "get_acc_progress": {
      "show": false
    },
    "get_account_id_text": {
      "show": false
    },
    "get_acc_id_progress": {
      "show": false
    },
    "get_balance_text": {
      "show": false
    },
    "get_balance_progress": {
      "show": false
    },
    "get_direct_debits_progress": {
      "show": false
    },
    "get_direct_debits_text": {
      "show": false
    },
    "products_text": {
      "show": false
    },
    "product_progress": {
      "show": false
    }
  },
  "list_of_register_tpp_group": {},
  "connected_application": {
    "app_name": {
      "show": false
    },
    "tppname": {
      "show": false
    },
    "type": {
      "show": false
    },
    "status_value": {
      "show": false
    }
  },
  "api_repo_table": {},
  "api_repository": {
    "apiname": {
      "show": false
    },
    "version": {
      "show": false
    },
    "status": {
      "show": false
    },
    "api_category": {
      "show": false
    },
    "release_date": {
      "show": false
    },
    "view_log": {
      "show": false
    }
  },
  "group123": {
    "consent_lifecycles": {
      "show": false
    }
  },
  "group454": {
    "icon5645": {
      "show": false
    },
    "text45645": {
      "show": false
    },
    "text23523": {
      "show": false
    }
  },
  "group": {
    "icon5675": {
      "show": false
    },
    "text4545": {
      "show": false
    },
    "text45645": {
      "show": false
    }
  },
  "group6576": {
    "icon234234": {
      "show": false
    },
    "textwrwer": {
      "show": false
    },
    "textwerwer": {
      "show": false
    }
  },
  "group79679": {
    "icon8698": {
      "show": false
    },
    "text34572547": {
      "show": false
    },
    "text": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "api usage";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {apiusagedashboard_v1, setapiusagedashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {apiusagedashboard_v1Props, setapiusagedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkvob_dashboard_screen,setCheckvob_dashboard_screen,]=useState<boolean>(false);
  const [checkapi_usage_group,setCheckapi_usage_group,]=useState<boolean>(false);
  const [checkreq_group,setCheckreq_group,]=useState<boolean>(false);
  const [checkactive_group,setCheckactive_group,]=useState<boolean>(false);
  const [checktotal_api_calls_group,setChecktotal_api_calls_group,]=useState<boolean>(false);
  const [checkmost_group,setCheckmost_group,]=useState<boolean>(false);
  const [checkline_chart_group,setCheckline_chart_group,]=useState<boolean>(false);
  const [checkapi_call_over_frequency_subscreen,setCheckapi_call_over_frequency_subscreen,]=useState<boolean>(false);
  const [checkct003_af_uf_ufws_trs_tob_apicalloverhour_v1,setCheckct003_af_uf_ufws_trs_tob_apicalloverhour_v1,]=useState<boolean>(false);
  const [checkapi_call_over_hour_group,setCheckapi_call_over_hour_group,]=useState<boolean>(false);
  const [checkct003_af_uf_ufws_trs_tob_apicallovermonth_v1,setCheckct003_af_uf_ufws_trs_tob_apicallovermonth_v1,]=useState<boolean>(false);
  const [checkapi_call_over_month_group,setCheckapi_call_over_month_group,]=useState<boolean>(false);
  const [checkct003_af_uf_ufws_trs_tob_apicalloverweek_v1,setCheckct003_af_uf_ufws_trs_tob_apicalloverweek_v1,]=useState<boolean>(false);
  const [checkapi_call_over_week_group,setCheckapi_call_over_week_group,]=useState<boolean>(false);
  const [checktotal_used_api_group,setChecktotal_used_api_group,]=useState<boolean>(false);
  const [checklist_of_register_tpp_group,setChecklist_of_register_tpp_group,]=useState<boolean>(false);
  const [checkconnected_application,setCheckconnected_application,]=useState<boolean>(false);
  const [checkapi_repo_table,setCheckapi_repo_table,]=useState<boolean>(false);
  const [checkapi_repository,setCheckapi_repository,]=useState<boolean>(false);
  const [checkgroup123,setCheckgroup123,]=useState<boolean>(false);
  const [checkgroup454,setCheckgroup454,]=useState<boolean>(false);
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const [checkgroup6576,setCheckgroup6576,]=useState<boolean>(false);
  const [checkgroup79679,setCheckgroup79679,]=useState<boolean>(false);
  const {vob_dashboard_screen9ce49, setvob_dashboard_screen9ce49} = useContext(TotalContext) as TotalContextProps;
  const {api_usage_group868b4, setapi_usage_group868b4} = useContext(TotalContext) as TotalContextProps;
  const {req_groupdf5e7, setreq_groupdf5e7} = useContext(TotalContext) as TotalContextProps;
  const {active_group31e18, setactive_group31e18} = useContext(TotalContext) as TotalContextProps;
  const {total_api_calls_groupd4dee, settotal_api_calls_groupd4dee} = useContext(TotalContext) as TotalContextProps;
  const {most_groupc5ce0, setmost_groupc5ce0} = useContext(TotalContext) as TotalContextProps;
  const {line_chart_groupadc5c, setline_chart_groupadc5c} = useContext(TotalContext) as TotalContextProps;
  const {api_call_over_frequency_subscreenb8acc, setapi_call_over_frequency_subscreenb8acc} = useContext(TotalContext) as TotalContextProps;
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026} = useContext(TotalContext) as TotalContextProps;
  const {api_call_over_hour_group2febf, setapi_call_over_hour_group2febf} = useContext(TotalContext) as TotalContextProps;
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528} = useContext(TotalContext) as TotalContextProps;
  const {api_call_over_month_groupccb80, setapi_call_over_month_groupccb80} = useContext(TotalContext) as TotalContextProps;
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6} = useContext(TotalContext) as TotalContextProps;
  const {api_call_over_week_group987fe, setapi_call_over_week_group987fe} = useContext(TotalContext) as TotalContextProps;
  const {total_used_api_groupcd37d, settotal_used_api_groupcd37d} = useContext(TotalContext) as TotalContextProps;
  const {list_of_register_tpp_groupbe9d5, setlist_of_register_tpp_groupbe9d5} = useContext(TotalContext) as TotalContextProps;
  const {connected_application19ab2, setconnected_application19ab2} = useContext(TotalContext) as TotalContextProps;
  const {api_repo_table162e4, setapi_repo_table162e4} = useContext(TotalContext) as TotalContextProps;
  const {api_repositoryb1ab8, setapi_repositoryb1ab8} = useContext(TotalContext) as TotalContextProps;
  const {group1233a04c, setgroup1233a04c} = useContext(TotalContext) as TotalContextProps;
  const {group4549ff98, setgroup4549ff98} = useContext(TotalContext) as TotalContextProps;
  const {group657d5, setgroup657d5} = useContext(TotalContext) as TotalContextProps;
  const {group6576622ab, setgroup6576622ab} = useContext(TotalContext) as TotalContextProps;
  const {group796798bff3, setgroup796798bff3} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_linechart_dfd_v1Props, setdfd_mongo_linechart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_consents_request_dfd_v1Props, setdfd_tob_consents_request_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_api_repository_dfd_v1Props, setdfd_mongo_api_repository_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongodb_maindashboard_dfd_v1Props, setdfd_mongodb_maindashboard_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_total_used_api_dfd_v1Props, setdfd_tob_total_used_api_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_totalcalls_dfd_v1Props, setdfd_mongo_totalcalls_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      mongo_linechart_dfd_v1:false,
      tob_consents_request_dfd_v1:false,
      mongo_api_repository_dfd_v1:false,
      mongodb_maindashboard_dfd_v1:false,
      tob_total_used_api_dfd_v1:false,
      mongo_totalcalls_dfd_v1:false,
    });
    async function mongo_linechart_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let mongo_linechart_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_LineChart_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          mongo_linechart_dfd_v1Body["dpdKey"] = encryptionDpd;
          mongo_linechart_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_LineChart_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          mongo_linechart_dfd_v1Body['filterData'] = filterData;
        }
        const mongo_linechart_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",mongo_linechart_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=mongo_linechart_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(mongo_linechart_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_mongo_linechart_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_mongo_linechart_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (mongo_linechart_dfd_v1Data?.data?.dataset) {
           setdfd_mongo_linechart_dfd_v1Props(
              Array.isArray(mongo_linechart_dfd_v1Data?.data?.dataset?.data)
                 ? mongo_linechart_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_mongo_linechart_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.mongo_linechart_dfd_v1) {
      mongo_linechart_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.mongo_linechart_dfd_v1= true
  },[refetch?.mongo_linechart_dfd_v1])
    async function tob_consents_request_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_consents_request_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_Consents_Request_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_consents_request_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_consents_request_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_Consents_Request_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_consents_request_dfd_v1Body['filterData'] = filterData;
        }
        const tob_consents_request_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_consents_request_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_consents_request_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_consents_request_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_consents_request_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_consents_request_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_consents_request_dfd_v1Data?.data?.dataset) {
           setdfd_tob_consents_request_dfd_v1Props(
              Array.isArray(tob_consents_request_dfd_v1Data?.data?.dataset?.data)
                 ? tob_consents_request_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_consents_request_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_consents_request_dfd_v1) {
      tob_consents_request_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_consents_request_dfd_v1= true
  },[refetch?.tob_consents_request_dfd_v1])
    async function mongo_api_repository_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let mongo_api_repository_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          mongo_api_repository_dfd_v1Body["dpdKey"] = encryptionDpd;
          mongo_api_repository_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          mongo_api_repository_dfd_v1Body['filterData'] = filterData;
        }
        const mongo_api_repository_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",mongo_api_repository_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=mongo_api_repository_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(mongo_api_repository_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_mongo_api_repository_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_mongo_api_repository_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (mongo_api_repository_dfd_v1Data?.data?.dataset) {
           setdfd_mongo_api_repository_dfd_v1Props(
              Array.isArray(mongo_api_repository_dfd_v1Data?.data?.dataset?.data)
                 ? mongo_api_repository_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_mongo_api_repository_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.mongo_api_repository_dfd_v1) {
      mongo_api_repository_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.mongo_api_repository_dfd_v1= true
  },[refetch?.mongo_api_repository_dfd_v1])
    async function mongodb_maindashboard_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let mongodb_maindashboard_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:MongoDB_MainDashboard_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          mongodb_maindashboard_dfd_v1Body["dpdKey"] = encryptionDpd;
          mongodb_maindashboard_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:MongoDB_MainDashboard_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          mongodb_maindashboard_dfd_v1Body['filterData'] = filterData;
        }
        const mongodb_maindashboard_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",mongodb_maindashboard_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=mongodb_maindashboard_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(mongodb_maindashboard_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_mongodb_maindashboard_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_mongodb_maindashboard_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (mongodb_maindashboard_dfd_v1Data?.data?.dataset) {
           setdfd_mongodb_maindashboard_dfd_v1Props(
              Array.isArray(mongodb_maindashboard_dfd_v1Data?.data?.dataset?.data)
                 ? mongodb_maindashboard_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_mongodb_maindashboard_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.mongodb_maindashboard_dfd_v1) {
      mongodb_maindashboard_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.mongodb_maindashboard_dfd_v1= true
  },[refetch?.mongodb_maindashboard_dfd_v1])
    async function tob_total_used_api_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_total_used_api_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_Total_Used_API_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_total_used_api_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_total_used_api_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_Total_Used_API_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_total_used_api_dfd_v1Body['filterData'] = filterData;
        }
        const tob_total_used_api_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_total_used_api_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_total_used_api_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_total_used_api_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_total_used_api_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_total_used_api_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_total_used_api_dfd_v1Data?.data?.dataset) {
           setdfd_tob_total_used_api_dfd_v1Props(
              Array.isArray(tob_total_used_api_dfd_v1Data?.data?.dataset?.data)
                 ? tob_total_used_api_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_total_used_api_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_total_used_api_dfd_v1) {
      tob_total_used_api_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_total_used_api_dfd_v1= true
  },[refetch?.tob_total_used_api_dfd_v1])
    async function mongo_totalcalls_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let mongo_totalcalls_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_TotalCalls_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          mongo_totalcalls_dfd_v1Body["dpdKey"] = encryptionDpd;
          mongo_totalcalls_dfd_v1Body["method"] = encryptionMethod;
        }
        if(apiusagedashboard_v1Props.length > 0){
          for(let i=0;i< apiusagedashboard_v1Props.length;i++){
            if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_TotalCalls_DFD:AFVK:v1"){
              // delete apiusagedashboard_v1Props[i].DFDkey;
              let temp=structuredClone(apiusagedashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          mongo_totalcalls_dfd_v1Body['filterData'] = filterData;
        }
        const mongo_totalcalls_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",mongo_totalcalls_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=mongo_totalcalls_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(mongo_totalcalls_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_mongo_totalcalls_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_mongo_totalcalls_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (mongo_totalcalls_dfd_v1Data?.data?.dataset) {
           setdfd_mongo_totalcalls_dfd_v1Props(
              Array.isArray(mongo_totalcalls_dfd_v1Data?.data?.dataset?.data)
                 ? mongo_totalcalls_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_mongo_totalcalls_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.mongo_totalcalls_dfd_v1) {
      mongo_totalcalls_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.mongo_totalcalls_dfd_v1= true
  },[refetch?.mongo_totalcalls_dfd_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setapiusagedashboard_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1',
        [user],
        'pageApiUsageV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1`)
      if (!res.ok) {
        logout()
        return
      }
      routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await mongo_linechart_dfd_v1DFD(pagination)
    await tob_consents_request_dfd_v1DFD(pagination)
    await mongo_api_repository_dfd_v1DFD(pagination)
    await mongodb_maindashboard_dfd_v1DFD(pagination)
    await tob_total_used_api_dfd_v1DFD(pagination)
    await mongo_totalcalls_dfd_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'vob_dashboard_screen' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvob_dashboard_screen(true)
            }
            if(nodes?.groupName == 'api_usage_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_usage_group(true)
            }
            if(nodes?.groupName == 'req_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckreq_group(true)
            }
            if(nodes?.groupName == 'active_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckactive_group(true)
            }
            if(nodes?.groupName == 'total_api_calls_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_api_calls_group(true)
            }
            if(nodes?.groupName == 'most_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmost_group(true)
            }
            if(nodes?.groupName == 'line_chart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckline_chart_group(true)
            }
            if(nodes?.groupName == 'api_call_over_frequency_subscreen' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_call_over_frequency_subscreen(true)
            }
            if(nodes?.groupName == 'CT003_AF_UF_UFWS_Trs_TOB_apiCallOverHour_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct003_af_uf_ufws_trs_tob_apicalloverhour_v1(true)
            }
            if(nodes?.groupName == 'api_call_over_hour_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_call_over_hour_group(true)
            }
            if(nodes?.groupName == 'CT003_AF_UF_UFWS_Trs_TOB_apiCallOverMonth_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct003_af_uf_ufws_trs_tob_apicallovermonth_v1(true)
            }
            if(nodes?.groupName == 'api_call_over_month_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_call_over_month_group(true)
            }
            if(nodes?.groupName == 'CT003_AF_UF_UFWS_Trs_TOB_apiCallOverWeek_v1' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckct003_af_uf_ufws_trs_tob_apicalloverweek_v1(true)
            }
            if(nodes?.groupName == 'api_call_over_week_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_call_over_week_group(true)
            }
            if(nodes?.groupName == 'total_used_api_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_used_api_group(true)
            }
            if(nodes?.groupName == 'list_of_register_tpp_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecklist_of_register_tpp_group(true)
            }
            if(nodes?.groupName == 'connected_application' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckconnected_application(true)
            }
            if(nodes?.groupName == 'api_repo_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_repo_table(true)
            }
            if(nodes?.groupName == 'api_repository' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckapi_repository(true)
            }
            if(nodes?.groupName == 'group123' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup123(true)
            }
            if(nodes?.groupName == 'group454' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup454(true)
            }
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup(true)
            }
            if(nodes?.groupName == 'group6576' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup6576(true)
            }
            if(nodes?.groupName == 'group79679' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup79679(true)
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
          codeStates['vob_dashboard_screen'] = vob_dashboard_screen9ce49;
          codeStates['setvob_dashboard_screen'] = setvob_dashboard_screen9ce49;
          codeStates['api_usage_group'] = api_usage_group868b4;
          codeStates['setapi_usage_group'] = setapi_usage_group868b4;
          codeStates['req_group'] = req_groupdf5e7;
          codeStates['setreq_group'] = setreq_groupdf5e7;
          codeStates['active_group'] = active_group31e18;
          codeStates['setactive_group'] = setactive_group31e18;
          codeStates['total_api_calls_group'] = total_api_calls_groupd4dee;
          codeStates['settotal_api_calls_group'] = settotal_api_calls_groupd4dee;
          codeStates['most_group'] = most_groupc5ce0;
          codeStates['setmost_group'] = setmost_groupc5ce0;
          codeStates['line_chart_group'] = line_chart_groupadc5c;
          codeStates['setline_chart_group'] = setline_chart_groupadc5c;
          codeStates['api_call_over_frequency_subscreen'] = api_call_over_frequency_subscreenb8acc;
          codeStates['setapi_call_over_frequency_subscreen'] = setapi_call_over_frequency_subscreenb8acc;
          codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026;
          codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026;
          codeStates['api_call_over_hour_group'] = api_call_over_hour_group2febf;
          codeStates['setapi_call_over_hour_group'] = setapi_call_over_hour_group2febf;
          codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528;
          codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528;
          codeStates['api_call_over_month_group'] = api_call_over_month_groupccb80;
          codeStates['setapi_call_over_month_group'] = setapi_call_over_month_groupccb80;
          codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6;
          codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6;
          codeStates['api_call_over_week_group'] = api_call_over_week_group987fe;
          codeStates['setapi_call_over_week_group'] = setapi_call_over_week_group987fe;
          codeStates['total_used_api_group'] = total_used_api_groupcd37d;
          codeStates['settotal_used_api_group'] = settotal_used_api_groupcd37d;
          codeStates['list_of_register_tpp_group'] = list_of_register_tpp_groupbe9d5;
          codeStates['setlist_of_register_tpp_group'] = setlist_of_register_tpp_groupbe9d5;
          codeStates['connected_application'] = connected_application19ab2;
          codeStates['setconnected_application'] = setconnected_application19ab2;
          codeStates['api_repo_table'] = api_repo_table162e4;
          codeStates['setapi_repo_table'] = setapi_repo_table162e4;
          codeStates['api_repository'] = api_repositoryb1ab8;
          codeStates['setapi_repository'] = setapi_repositoryb1ab8;
          codeStates['group123'] = group1233a04c;
          codeStates['setgroup123'] = setgroup1233a04c;
          codeStates['group454'] = group4549ff98;
          codeStates['setgroup454'] = setgroup4549ff98;
          codeStates['group'] = group657d5;
          codeStates['setgroup'] = setgroup657d5;
          codeStates['group6576'] = group6576622ab;
          codeStates['setgroup6576'] = setgroup6576622ab;
          codeStates['group79679'] = group796798bff3;
          codeStates['setgroup79679'] = setgroup796798bff3;
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
    setapiusagedashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(apiusagedashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(apiusagedashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setapiusagedashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkvob_dashboard_screen && initialLoad &&<Groupvob_dashboard_screen
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
    