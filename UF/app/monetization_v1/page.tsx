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

const Groupmonetization_group = dynamic(() => import("./Groupmonetization_group/Groupmonetization_group"), { ssr: false });

export default function PageMonetizationV1({ onReady }: { onReady?: () => void } = {}) {
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
  "monetization_group": {},
  "dash_group": {
    "dash_text": {
      "show": false
    }
  },
  "monthly_revenue_card_group": {
    "monthly_revenue_card": {
      "show": false
    },
    "monthly_icon": {
      "show": false
    }
  },
  "ytd_revenue_card_group": {
    "ytd_revenue_card": {
      "show": false
    },
    "ytd_icon": {
      "show": false
    }
  },
  "invoice_raised_card_group": {
    "invoice_raised_card": {
      "show": false
    },
    "invoice_icon": {
      "show": false
    }
  },
  "avg_revenue_tpp_card_group": {
    "avg_revenue_tpp_card": {
      "show": false
    },
    "tpp_icon": {
      "show": false
    }
  },
  "revenue_trend_group": {
    "trend_text": {
      "show": false
    },
    "group_barchart": {
      "show": false
    }
  },
  "piechart_group": {
    "api_text": {
      "show": false
    },
    "piechart": {
      "show": false
    }
  },
  "billing_status_table": {
    "tpp_column": {
      "show": false
    },
    "amount_column": {
      "show": false
    },
    "duedate_column": {
      "show": false
    },
    "status_column": {
      "show": false
    }
  },
  "overage_charges_group": {
    "overage_text": {
      "show": false
    },
    "single_barchart": {
      "show": false
    }
  },
  "tier_table": {
    "pricing_id_column": {
      "show": false
    },
    "monthly_fee_column": {
      "show": false
    },
    "overage_rate_column": {
      "show": false
    },
    "tpps_column": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "monetization";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {monetizationdashboard_v1, setmonetizationdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {monetizationdashboard_v1Props, setmonetizationdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkmonetization_group,setCheckmonetization_group,]=useState<boolean>(false);
  const [checkdash_group,setCheckdash_group,]=useState<boolean>(false);
  const [checkmonthly_revenue_card_group,setCheckmonthly_revenue_card_group,]=useState<boolean>(false);
  const [checkytd_revenue_card_group,setCheckytd_revenue_card_group,]=useState<boolean>(false);
  const [checkinvoice_raised_card_group,setCheckinvoice_raised_card_group,]=useState<boolean>(false);
  const [checkavg_revenue_tpp_card_group,setCheckavg_revenue_tpp_card_group,]=useState<boolean>(false);
  const [checkrevenue_trend_group,setCheckrevenue_trend_group,]=useState<boolean>(false);
  const [checkpiechart_group,setCheckpiechart_group,]=useState<boolean>(false);
  const [checkbilling_status_table,setCheckbilling_status_table,]=useState<boolean>(false);
  const [checkoverage_charges_group,setCheckoverage_charges_group,]=useState<boolean>(false);
  const [checktier_table,setChecktier_table,]=useState<boolean>(false);
  const {monetization_groupf0a3b, setmonetization_groupf0a3b} = useContext(TotalContext) as TotalContextProps;
  const {dash_groupc162b, setdash_groupc162b} = useContext(TotalContext) as TotalContextProps;
  const {monthly_revenue_card_group3bf72, setmonthly_revenue_card_group3bf72} = useContext(TotalContext) as TotalContextProps;
  const {ytd_revenue_card_groupbb98b, setytd_revenue_card_groupbb98b} = useContext(TotalContext) as TotalContextProps;
  const {invoice_raised_card_group23315, setinvoice_raised_card_group23315} = useContext(TotalContext) as TotalContextProps;
  const {avg_revenue_tpp_card_group56d8e, setavg_revenue_tpp_card_group56d8e} = useContext(TotalContext) as TotalContextProps;
  const {revenue_trend_groupa654b, setrevenue_trend_groupa654b} = useContext(TotalContext) as TotalContextProps;
  const {piechart_groupce72b, setpiechart_groupce72b} = useContext(TotalContext) as TotalContextProps;
  const {billing_status_tableef735, setbilling_status_tableef735} = useContext(TotalContext) as TotalContextProps;
  const {overage_charges_group44542, setoverage_charges_group44542} = useContext(TotalContext) as TotalContextProps;
  const {tier_table17c1c, settier_table17c1c} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_totalcards_dfd_v1Props, setdfd_tob_mzdsh_totalcards_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_group_barchart_dfd_v1Props, setdfd_tob_mzdsh_group_barchart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_piechart_dfd_v1Props, setdfd_tob_mzdsh_piechart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props, setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_pricingtiertable_dfd_v1Props, setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_invoice_table_dfd_v1Props, setdfd_tob_mzdsh_invoice_table_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      tob_mzdsh_totalcards_dfd_v1:false,
      tob_mzdsh_group_barchart_dfd_v1:false,
      tob_mzdsh_piechart_dfd_v1:false,
      tob_mzdsh_barchart_overagecharges_dfd_v1:false,
      tob_mzdsh_pricingtiertable_dfd_v1:false,
      tob_mzdsh_invoice_table_dfd_v1:false,
    });
    async function tob_mzdsh_totalcards_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_totalcards_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_TotalCards_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_totalcards_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_totalcards_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_TotalCards_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_totalcards_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_totalcards_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_totalcards_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_totalcards_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_totalcards_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_totalcards_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_totalcards_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_totalcards_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_totalcards_dfd_v1Props(
              Array.isArray(tob_mzdsh_totalcards_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_totalcards_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_totalcards_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_totalcards_dfd_v1) {
      tob_mzdsh_totalcards_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_totalcards_dfd_v1= true
  },[refetch?.tob_mzdsh_totalcards_dfd_v1])
    async function tob_mzdsh_group_barchart_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_group_barchart_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_Group_BarChart_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_group_barchart_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_group_barchart_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_Group_BarChart_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_group_barchart_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_group_barchart_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_group_barchart_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_group_barchart_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_group_barchart_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_group_barchart_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_group_barchart_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_group_barchart_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_group_barchart_dfd_v1Props(
              Array.isArray(tob_mzdsh_group_barchart_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_group_barchart_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_group_barchart_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_group_barchart_dfd_v1) {
      tob_mzdsh_group_barchart_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_group_barchart_dfd_v1= true
  },[refetch?.tob_mzdsh_group_barchart_dfd_v1])
    async function tob_mzdsh_piechart_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_piechart_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_PieChart_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_piechart_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_piechart_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_PieChart_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_piechart_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_piechart_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_piechart_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_piechart_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_piechart_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_piechart_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_piechart_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_piechart_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_piechart_dfd_v1Props(
              Array.isArray(tob_mzdsh_piechart_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_piechart_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_piechart_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_piechart_dfd_v1) {
      tob_mzdsh_piechart_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_piechart_dfd_v1= true
  },[refetch?.tob_mzdsh_piechart_dfd_v1])
    async function tob_mzdsh_barchart_overagecharges_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_barchart_overagecharges_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_BarChart_OverageCharges_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_barchart_overagecharges_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_barchart_overagecharges_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_BarChart_OverageCharges_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_barchart_overagecharges_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_barchart_overagecharges_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_barchart_overagecharges_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_barchart_overagecharges_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_barchart_overagecharges_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_barchart_overagecharges_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props(
              Array.isArray(tob_mzdsh_barchart_overagecharges_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_barchart_overagecharges_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_barchart_overagecharges_dfd_v1) {
      tob_mzdsh_barchart_overagecharges_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_barchart_overagecharges_dfd_v1= true
  },[refetch?.tob_mzdsh_barchart_overagecharges_dfd_v1])
    async function tob_mzdsh_pricingtiertable_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_pricingtiertable_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_PricingTierTable_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_pricingtiertable_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_pricingtiertable_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_PricingTierTable_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_pricingtiertable_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_pricingtiertable_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_pricingtiertable_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_pricingtiertable_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_pricingtiertable_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_pricingtiertable_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props(
              Array.isArray(tob_mzdsh_pricingtiertable_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_pricingtiertable_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_pricingtiertable_dfd_v1) {
      tob_mzdsh_pricingtiertable_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_pricingtiertable_dfd_v1= true
  },[refetch?.tob_mzdsh_pricingtiertable_dfd_v1])
    async function tob_mzdsh_invoice_table_dfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let tob_mzdsh_invoice_table_dfd_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_InVoice_Table_DFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          tob_mzdsh_invoice_table_dfd_v1Body["dpdKey"] = encryptionDpd;
          tob_mzdsh_invoice_table_dfd_v1Body["method"] = encryptionMethod;
        }
        if(monetizationdashboard_v1Props.length > 0){
          for(let i=0;i< monetizationdashboard_v1Props.length;i++){
            if(monetizationdashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:TOB_MZDSH_InVoice_Table_DFD:AFVK:v1"){
              // delete monetizationdashboard_v1Props[i].DFDkey;
              let temp=structuredClone(monetizationdashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          tob_mzdsh_invoice_table_dfd_v1Body['filterData'] = filterData;
        }
        const tob_mzdsh_invoice_table_dfd_v1Data:any=await AxiosService.post("/te/eventEmitter",tob_mzdsh_invoice_table_dfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=tob_mzdsh_invoice_table_dfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(tob_mzdsh_invoice_table_dfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_tob_mzdsh_invoice_table_dfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_tob_mzdsh_invoice_table_dfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (tob_mzdsh_invoice_table_dfd_v1Data?.data?.dataset) {
           setdfd_tob_mzdsh_invoice_table_dfd_v1Props(
              Array.isArray(tob_mzdsh_invoice_table_dfd_v1Data?.data?.dataset?.data)
                 ? tob_mzdsh_invoice_table_dfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_tob_mzdsh_invoice_table_dfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.tob_mzdsh_invoice_table_dfd_v1) {
      tob_mzdsh_invoice_table_dfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.tob_mzdsh_invoice_table_dfd_v1= true
  },[refetch?.tob_mzdsh_invoice_table_dfd_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setmonetizationdashboard_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:monetizationDashboard:AFVK:v1"
        }
      : { key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:monetizationDashboard:AFVK:v1" }
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
        'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:monetizationDashboard:AFVK:v1',
        [user],
        'pageMonetizationV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:monetizationDashboard:AFVK:v1`)
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
    await tob_mzdsh_totalcards_dfd_v1DFD(pagination)
    await tob_mzdsh_group_barchart_dfd_v1DFD(pagination)
    await tob_mzdsh_piechart_dfd_v1DFD(pagination)
    await tob_mzdsh_barchart_overagecharges_dfd_v1DFD(pagination)
    await tob_mzdsh_pricingtiertable_dfd_v1DFD(pagination)
    await tob_mzdsh_invoice_table_dfd_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'monetization_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmonetization_group(true)
            }
            if(nodes?.groupName == 'dash_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdash_group(true)
            }
            if(nodes?.groupName == 'monthly_revenue_card_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmonthly_revenue_card_group(true)
            }
            if(nodes?.groupName == 'ytd_revenue_card_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckytd_revenue_card_group(true)
            }
            if(nodes?.groupName == 'invoice_raised_card_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckinvoice_raised_card_group(true)
            }
            if(nodes?.groupName == 'avg_revenue_tpp_card_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckavg_revenue_tpp_card_group(true)
            }
            if(nodes?.groupName == 'revenue_trend_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrevenue_trend_group(true)
            }
            if(nodes?.groupName == 'piechart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpiechart_group(true)
            }
            if(nodes?.groupName == 'billing_status_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbilling_status_table(true)
            }
            if(nodes?.groupName == 'overage_charges_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverage_charges_group(true)
            }
            if(nodes?.groupName == 'tier_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktier_table(true)
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
          codeStates['monetization_group'] = monetization_groupf0a3b;
          codeStates['setmonetization_group'] = setmonetization_groupf0a3b;
          codeStates['dash_group'] = dash_groupc162b;
          codeStates['setdash_group'] = setdash_groupc162b;
          codeStates['monthly_revenue_card_group'] = monthly_revenue_card_group3bf72;
          codeStates['setmonthly_revenue_card_group'] = setmonthly_revenue_card_group3bf72;
          codeStates['ytd_revenue_card_group'] = ytd_revenue_card_groupbb98b;
          codeStates['setytd_revenue_card_group'] = setytd_revenue_card_groupbb98b;
          codeStates['invoice_raised_card_group'] = invoice_raised_card_group23315;
          codeStates['setinvoice_raised_card_group'] = setinvoice_raised_card_group23315;
          codeStates['avg_revenue_tpp_card_group'] = avg_revenue_tpp_card_group56d8e;
          codeStates['setavg_revenue_tpp_card_group'] = setavg_revenue_tpp_card_group56d8e;
          codeStates['revenue_trend_group'] = revenue_trend_groupa654b;
          codeStates['setrevenue_trend_group'] = setrevenue_trend_groupa654b;
          codeStates['piechart_group'] = piechart_groupce72b;
          codeStates['setpiechart_group'] = setpiechart_groupce72b;
          codeStates['billing_status_table'] = billing_status_tableef735;
          codeStates['setbilling_status_table'] = setbilling_status_tableef735;
          codeStates['overage_charges_group'] = overage_charges_group44542;
          codeStates['setoverage_charges_group'] = setoverage_charges_group44542;
          codeStates['tier_table'] = tier_table17c1c;
          codeStates['settier_table'] = settier_table17c1c;
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
    setmonetizationdashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(monetizationdashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(monetizationdashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setmonetizationdashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkmonetization_group && initialLoad &&<Groupmonetization_group
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
    