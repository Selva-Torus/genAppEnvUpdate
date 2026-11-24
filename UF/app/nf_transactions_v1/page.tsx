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

const Grouptran_main_group = dynamic(() => import("./Grouptran_main_group/Grouptran_main_group"), { ssr: false });

export default function PageNfTransactionsV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Operational Manager": {
    "blockedGroups": []
  },
  "Operational Officer": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "tran_main_group": {},
  "tran_tab_group": {
    "outbound_or_inbound": {
      "show": false
    },
    "search": {
      "show": false
    },
    "refresh": {
      "show": false
    }
  },
  "view_all_tab": {},
  "view_all_table": {
    "channel_name_view_all": {
      "show": false
    },
    "uuid_view_all": {
      "show": false
    },
    "dr_account_view_all": {
      "show": false
    },
    "dr_name_view_all": {
      "show": false
    },
    "cr_account_view_all": {
      "show": false
    },
    "cr_name_view_all": {
      "show": false
    },
    "cr_currency_view_all": {
      "show": false
    },
    "cr_amount_view_all": {
      "show": false
    },
    "message_code_view_all": {
      "show": false
    },
    "tran_date_view_all": {
      "show": false
    }
  },
  "view_all_journey_group": {
    "view_all_journey": {
      "show": false
    }
  },
  "cancel_equest_camt055_tab": {},
  "cancel_request_camt055_table": {
    "channel_name_can_req_camt055": {
      "show": false
    },
    "uuid_can_req_camt055": {
      "show": false
    },
    "dr_account_can_req_camt055": {
      "show": false
    },
    "dr_name_can_req_camt055": {
      "show": false
    },
    "cr_account_can_req_camt055": {
      "show": false
    },
    "cr_name_can_req_camt055": {
      "show": false
    },
    "cr_currency_can_req_camt055": {
      "show": false
    },
    "cr_amount_can_req_camt055": {
      "show": false
    },
    "cancel_request_camt055_mk_initiate_btn": {
      "show": false
    },
    "cancel_request_camt055_chk_verify_btn": {
      "show": false
    },
    "message_code_can_req_camt055": {
      "show": false
    },
    "tran_date_can_req_camt055": {
      "show": false
    }
  },
  "cancel_request_camt055_journey_group": {
    "cancel_request_camt055_journey": {
      "show": false
    }
  },
  "inves_req_camt110_tab": {},
  "inves_req_camt110_table": {
    "channel_name_inves_req_camt110": {
      "show": false
    },
    "uuid_inves_req_camt110": {
      "show": false
    },
    "dr_account_inves_req_camt110": {
      "show": false
    },
    "dr_name_inves_req_camt110": {
      "show": false
    },
    "cr_account_inves_req_camt110": {
      "show": false
    },
    "cr_name_inves_req_camt110": {
      "show": false
    },
    "cr_currency_inves_req_camt110": {
      "show": false
    },
    "cr_amount_inves_req_camt110": {
      "show": false
    },
    "message_code_inves_req_camt110": {
      "show": false
    },
    "tran_date_inves_req_camt110": {
      "show": false
    },
    "inves_req_camt110_mk_initiate_btn": {
      "show": false
    },
    "inves_req_camt110_chk_verify_btn": {
      "show": false
    }
  },
  "inves_req_camt110_journey_group": {
    "inves_req_camt110_journey": {
      "show": false
    }
  },
  "investigation_response_camt111_tab": {},
  "inves_res_camt111_table": {
    "channel_name_inves_res_camt111": {
      "show": false
    },
    "uuid_inves_res_camt111": {
      "show": false
    },
    "dr_account_inves_res_camt111": {
      "show": false
    },
    "dr_name_inves_res_camt111": {
      "show": false
    },
    "cr_account_inves_res_camt111": {
      "show": false
    },
    "cr_name_inves_res_camt111": {
      "show": false
    },
    "cr_currency_inves_res_camt111": {
      "show": false
    },
    "cr_amount_inves_res_camt111": {
      "show": false
    },
    "message_code_inves_res_camt111": {
      "show": false
    },
    "tran_date_inves_res_camt111": {
      "show": false
    },
    "inves_res_camt111_mk_initiate_btn": {
      "show": false
    },
    "inves_res_camt111_chk_verify_btn": {
      "show": false
    }
  },
  "inves_res_camt111_journey_group": {
    "inves_res_camt111_journey": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "nf transactions";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {nftransactionproduct_v1, setnftransactionproduct_v1} = useContext(TotalContext) as TotalContextProps;
  const {nftransactionproduct_v1Props, setnftransactionproduct_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checktran_main_group,setChecktran_main_group,]=useState<boolean>(false);
  const [checkview_all_table,setCheckview_all_table,]=useState<boolean>(false);
  const [checkview_all_journey_group,setCheckview_all_journey_group,]=useState<boolean>(false);
  const [checkcancel_request_camt055_table,setCheckcancel_request_camt055_table,]=useState<boolean>(false);
  const [checkcancel_request_camt055_journey_group,setCheckcancel_request_camt055_journey_group,]=useState<boolean>(false);
  const [checkinves_req_camt110_table,setCheckinves_req_camt110_table,]=useState<boolean>(false);
  const [checkinves_req_camt110_journey_group,setCheckinves_req_camt110_journey_group,]=useState<boolean>(false);
  const [checkinves_res_camt111_table,setCheckinves_res_camt111_table,]=useState<boolean>(false);
  const [checkinves_res_camt111_journey_group,setCheckinves_res_camt111_journey_group,]=useState<boolean>(false);
  const {tran_main_group9581a, settran_main_group9581a} = useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40, setview_all_tableccb40} = useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a} = useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976} = useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2} = useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e} = useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738} = useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401} = useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4} = useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929, settran_tab_group2a929} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nftransaction_v1Props, setdfd_nftransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_journey_v1Props, setdfd_journey_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfviewalltransaction_v1Props, setdfd_nfviewalltransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      nftransaction_v1:false,
      journey_v1:false,
      nfviewalltransaction_v1:false,
    });
    async function nftransaction_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nftransaction_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nftransaction_v1Body["dpdKey"] = encryptionDpd;
          nftransaction_v1Body["method"] = encryptionMethod;
        }
        if(nftransactionproduct_v1Props.length > 0){
          for(let i=0;i< nftransactionproduct_v1Props.length;i++){
            if(nftransactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1"){
              // delete nftransactionproduct_v1Props[i].DFDkey;
              let temp=structuredClone(nftransactionproduct_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nftransaction_v1Body['filterData'] = filterData;
        }
        const nftransaction_v1Data:any=await AxiosService.post("/te/eventEmitter",nftransaction_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nftransaction_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nftransaction_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nftransaction_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nftransaction_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nftransaction_v1Data?.data?.dataset) {
           setdfd_nftransaction_v1Props(
              Array.isArray(nftransaction_v1Data?.data?.dataset?.data)
                 ? nftransaction_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nftransaction_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nftransaction_v1) {
      nftransaction_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nftransaction_v1= true
  },[refetch?.nftransaction_v1])
    async function journey_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let journey_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          journey_v1Body["dpdKey"] = encryptionDpd;
          journey_v1Body["method"] = encryptionMethod;
        }
        if(nftransactionproduct_v1Props.length > 0){
          for(let i=0;i< nftransactionproduct_v1Props.length;i++){
            if(nftransactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:journey:AFVK:v1"){
              // delete nftransactionproduct_v1Props[i].DFDkey;
              let temp=structuredClone(nftransactionproduct_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          journey_v1Body['filterData'] = filterData;
        }
        const journey_v1Data:any=await AxiosService.post("/te/eventEmitter",journey_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=journey_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(journey_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_journey_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_journey_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (journey_v1Data?.data?.dataset) {
           setdfd_journey_v1Props(
              Array.isArray(journey_v1Data?.data?.dataset?.data)
                 ? journey_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_journey_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.journey_v1) {
      journey_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.journey_v1= true
  },[refetch?.journey_v1])
    async function nfviewalltransaction_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let nfviewalltransaction_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          nfviewalltransaction_v1Body["dpdKey"] = encryptionDpd;
          nfviewalltransaction_v1Body["method"] = encryptionMethod;
        }
        if(nftransactionproduct_v1Props.length > 0){
          for(let i=0;i< nftransactionproduct_v1Props.length;i++){
            if(nftransactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1"){
              // delete nftransactionproduct_v1Props[i].DFDkey;
              let temp=structuredClone(nftransactionproduct_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          nfviewalltransaction_v1Body['filterData'] = filterData;
        }
        const nfviewalltransaction_v1Data:any=await AxiosService.post("/te/eventEmitter",nfviewalltransaction_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=nfviewalltransaction_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(nfviewalltransaction_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_nfviewalltransaction_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_nfviewalltransaction_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (nfviewalltransaction_v1Data?.data?.dataset) {
           setdfd_nfviewalltransaction_v1Props(
              Array.isArray(nfviewalltransaction_v1Data?.data?.dataset?.data)
                 ? nfviewalltransaction_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_nfviewalltransaction_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.nfviewalltransaction_v1) {
      nfviewalltransaction_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.nfviewalltransaction_v1= true
  },[refetch?.nfviewalltransaction_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setnftransactionproduct_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1',
        [user],
        'pageNfTransactionsV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1`)
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
    await nftransaction_v1DFD(pagination)
    await journey_v1DFD(pagination)
    await nfviewalltransaction_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'tran_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktran_main_group(true)
            }
            if(nodes?.groupName == 'view_all_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckview_all_table(true)
            }
            if(nodes?.groupName == 'view_all_journey_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckview_all_journey_group(true)
            }
            if(nodes?.groupName == 'cancel_request_camt055_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcancel_request_camt055_table(true)
            }
            if(nodes?.groupName == 'cancel_request_camt055_journey_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcancel_request_camt055_journey_group(true)
            }
            if(nodes?.groupName == 'inves_req_camt110_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinves_req_camt110_table(true)
            }
            if(nodes?.groupName == 'inves_req_camt110_journey_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinves_req_camt110_journey_group(true)
            }
            if(nodes?.groupName == 'inves_res_camt111_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinves_res_camt111_table(true)
            }
            if(nodes?.groupName == 'inves_res_camt111_journey_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinves_res_camt111_journey_group(true)
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
          codeStates['tran_main_group'] = tran_main_group9581a;
          codeStates['settran_main_group'] = settran_main_group9581a;
          codeStates['view_all_table'] = view_all_tableccb40;
          codeStates['setview_all_table'] = setview_all_tableccb40;
          codeStates['view_all_journey_group'] = view_all_journey_groupca47a;
          codeStates['setview_all_journey_group'] = setview_all_journey_groupca47a;
          codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976;
          codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976;
          codeStates['cancel_request_camt055_journey_group'] = cancel_request_camt055_journey_groupd18a2;
          codeStates['setcancel_request_camt055_journey_group'] = setcancel_request_camt055_journey_groupd18a2;
          codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e;
          codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e;
          codeStates['inves_req_camt110_journey_group'] = inves_req_camt110_journey_groupca738;
          codeStates['setinves_req_camt110_journey_group'] = setinves_req_camt110_journey_groupca738;
          codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401;
          codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401;
          codeStates['inves_res_camt111_journey_group'] = inves_res_camt111_journey_group785d4;
          codeStates['setinves_res_camt111_journey_group'] = setinves_res_camt111_journey_group785d4;
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
    setnftransactionproduct_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(nftransactionproduct_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tran_tab_group:tran_tab_group2a929.tran_tab_group,      }
      handleArtfactRule(nftransactionproduct_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tran_tab_group2a929.tran_tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setnftransactionproduct_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checktran_main_group && initialLoad &&<Grouptran_main_group
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
    