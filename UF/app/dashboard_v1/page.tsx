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

const Groupgdb_group = dynamic(() => import("./Groupgdb_group/Groupgdb_group"), { ssr: false });

export default function PageDashboardV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Business Team": {
    "blockedGroups": []
  },
  "IT Team": {
    "blockedGroups": []
  },
  "Operation Team": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "gdb_group": {},
  "tab_group": {},
  "tab_header": {},
  "tab_grp": {
    "product_combobox": {
      "show": false
    },
    "channel_combobox": {
      "show": false
    },
    "currency_combobox": {
      "show": false
    },
    "process_category_combobox": {
      "show": false
    },
    "offline_online_combobox": {
      "show": false
    },
    "key_matrics": {
      "show": false
    },
    "transaction_table_label": {
      "show": false
    }
  },
  "transaction_group": {
    "product_icon": {
      "show": false
    },
    "transactions_label": {
      "show": false
    },
    "transaction_count": {
      "show": false
    }
  },
  "total_value_group": {
    "total_value_icon": {
      "show": false
    },
    "total_value_label": {
      "show": false
    },
    "total_amount": {
      "show": false
    }
  },
  "online_offline_processing_group": {
    "online_offline_processing_icon": {
      "show": false
    },
    "online_offline_processing_label": {
      "show": false
    },
    "online_offline_process": {
      "show": false
    }
  },
  "bar_chart_group": {
    "transaction_volume_by_channel": {
      "show": false
    },
    "barchart": {
      "show": false
    }
  },
  "pie_chart_group": {
    "product_organation_label": {
      "show": false
    },
    "piechart": {
      "show": false
    }
  },
  "transaction_table": {
    "value_date": {
      "show": false
    },
    "dr_account": {
      "show": false
    },
    "dr_name": {
      "show": false
    },
    "dr_currency": {
      "show": false
    },
    "dr_amount": {
      "show": false
    },
    "cr_account": {
      "show": false
    },
    "cr_name": {
      "show": false
    },
    "cr_currency": {
      "show": false
    },
    "cr_amount": {
      "show": false
    },
    "uuid": {
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
  const {globaldashboard_v1, setglobaldashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {globaldashboard_v1Props, setglobaldashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkgdb_group,setCheckgdb_group,]=useState<boolean>(false);
  const [checktab_grp,setChecktab_grp,]=useState<boolean>(false);
  const [checktransaction_group,setChecktransaction_group,]=useState<boolean>(false);
  const [checktotal_value_group,setChecktotal_value_group,]=useState<boolean>(false);
  const [checkonline_offline_processing_group,setCheckonline_offline_processing_group,]=useState<boolean>(false);
  const [checkbar_chart_group,setCheckbar_chart_group,]=useState<boolean>(false);
  const [checkpie_chart_group,setCheckpie_chart_group,]=useState<boolean>(false);
  const [checktransaction_table,setChecktransaction_table,]=useState<boolean>(false);
  const {gdb_group5384d, setgdb_group5384d} = useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4, settab_grpe63f4} = useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2, settransaction_group6c6f2} = useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783, settotal_value_group9d783} = useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24} = useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3, setbar_chart_group737a3} = useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067, setpie_chart_group15067} = useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34, settransaction_tablef4f34} = useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41, settab_group65b41} = useContext(TotalContext) as TotalContextProps;
  const {dfd_productdashboard_v1Props, setdfd_productdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channeldashboard_v1Props, setdfd_channeldashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencydashboard_v1Props, setdfd_currencydashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_onlineofflinedashboard_v1Props, setdfd_onlineofflinedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_processcategorydashboard_v1Props, setdfd_processcategorydashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactioncountvphdashboard_v1Props, setdfd_transactioncountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channelcountvphdashboard_v1Props, setdfd_channelcountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channelchartdashboard_v1Props, setdfd_channelchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_productchartdashboard_v1Props, setdfd_productchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_onlineofflinecountvphdashboard_v1Props, setdfd_onlineofflinecountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      productdashboard_v1:false,
      channeldashboard_v1:false,
      currencydashboard_v1:false,
      transaction_v1:false,
      onlineofflinedashboard_v1:false,
      processcategorydashboard_v1:false,
      transactioncountvphdashboard_v1:false,
      channelcountvphdashboard_v1:false,
      channelchartdashboard_v1:false,
      productchartdashboard_v1:false,
      onlineofflinecountvphdashboard_v1:false,
    });
    async function productdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let productdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:productDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          productdashboard_v1Body["dpdKey"] = encryptionDpd;
          productdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:productDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          productdashboard_v1Body['filterData'] = filterData;
        }
        const productdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",productdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=productdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(productdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_productdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_productdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (productdashboard_v1Data?.data?.dataset) {
           setdfd_productdashboard_v1Props(
              Array.isArray(productdashboard_v1Data?.data?.dataset?.data)
                 ? productdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_productdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.productdashboard_v1) {
      productdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.productdashboard_v1= true
  },[refetch?.productdashboard_v1])
    async function channeldashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let channeldashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          channeldashboard_v1Body["dpdKey"] = encryptionDpd;
          channeldashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          channeldashboard_v1Body['filterData'] = filterData;
        }
        const channeldashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",channeldashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=channeldashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(channeldashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_channeldashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_channeldashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (channeldashboard_v1Data?.data?.dataset) {
           setdfd_channeldashboard_v1Props(
              Array.isArray(channeldashboard_v1Data?.data?.dataset?.data)
                 ? channeldashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_channeldashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.channeldashboard_v1) {
      channeldashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.channeldashboard_v1= true
  },[refetch?.channeldashboard_v1])
    async function currencydashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let currencydashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:currencyDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          currencydashboard_v1Body["dpdKey"] = encryptionDpd;
          currencydashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:currencyDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          currencydashboard_v1Body['filterData'] = filterData;
        }
        const currencydashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",currencydashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=currencydashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(currencydashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_currencydashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_currencydashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (currencydashboard_v1Data?.data?.dataset) {
           setdfd_currencydashboard_v1Props(
              Array.isArray(currencydashboard_v1Data?.data?.dataset?.data)
                 ? currencydashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_currencydashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.currencydashboard_v1) {
      currencydashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.currencydashboard_v1= true
  },[refetch?.currencydashboard_v1])
    async function transaction_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let transaction_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          transaction_v1Body["dpdKey"] = encryptionDpd;
          transaction_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          transaction_v1Body['filterData'] = filterData;
        }
        const transaction_v1Data:any=await AxiosService.post("/te/eventEmitter",transaction_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=transaction_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(transaction_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_transaction_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_transaction_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (transaction_v1Data?.data?.dataset) {
           setdfd_transaction_v1Props(
              Array.isArray(transaction_v1Data?.data?.dataset?.data)
                 ? transaction_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_transaction_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.transaction_v1) {
      transaction_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.transaction_v1= true
  },[refetch?.transaction_v1])
    async function onlineofflinedashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let onlineofflinedashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          onlineofflinedashboard_v1Body["dpdKey"] = encryptionDpd;
          onlineofflinedashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          onlineofflinedashboard_v1Body['filterData'] = filterData;
        }
        const onlineofflinedashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",onlineofflinedashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=onlineofflinedashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(onlineofflinedashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_onlineofflinedashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_onlineofflinedashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (onlineofflinedashboard_v1Data?.data?.dataset) {
           setdfd_onlineofflinedashboard_v1Props(
              Array.isArray(onlineofflinedashboard_v1Data?.data?.dataset?.data)
                 ? onlineofflinedashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_onlineofflinedashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.onlineofflinedashboard_v1) {
      onlineofflinedashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.onlineofflinedashboard_v1= true
  },[refetch?.onlineofflinedashboard_v1])
    async function processcategorydashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let processcategorydashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:processCategoryDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          processcategorydashboard_v1Body["dpdKey"] = encryptionDpd;
          processcategorydashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:processCategoryDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          processcategorydashboard_v1Body['filterData'] = filterData;
        }
        const processcategorydashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",processcategorydashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=processcategorydashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(processcategorydashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_processcategorydashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_processcategorydashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (processcategorydashboard_v1Data?.data?.dataset) {
           setdfd_processcategorydashboard_v1Props(
              Array.isArray(processcategorydashboard_v1Data?.data?.dataset?.data)
                 ? processcategorydashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_processcategorydashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.processcategorydashboard_v1) {
      processcategorydashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.processcategorydashboard_v1= true
  },[refetch?.processcategorydashboard_v1])
    async function transactioncountvphdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let transactioncountvphdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transactionCountVphDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          transactioncountvphdashboard_v1Body["dpdKey"] = encryptionDpd;
          transactioncountvphdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transactionCountVphDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          transactioncountvphdashboard_v1Body['filterData'] = filterData;
        }
        const transactioncountvphdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",transactioncountvphdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=transactioncountvphdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(transactioncountvphdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_transactioncountvphdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_transactioncountvphdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (transactioncountvphdashboard_v1Data?.data?.dataset) {
           setdfd_transactioncountvphdashboard_v1Props(
              Array.isArray(transactioncountvphdashboard_v1Data?.data?.dataset?.data)
                 ? transactioncountvphdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_transactioncountvphdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.transactioncountvphdashboard_v1) {
      transactioncountvphdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.transactioncountvphdashboard_v1= true
  },[refetch?.transactioncountvphdashboard_v1])
    async function channelcountvphdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let channelcountvphdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelCountVphDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          channelcountvphdashboard_v1Body["dpdKey"] = encryptionDpd;
          channelcountvphdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelCountVphDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          channelcountvphdashboard_v1Body['filterData'] = filterData;
        }
        const channelcountvphdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",channelcountvphdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=channelcountvphdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(channelcountvphdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_channelcountvphdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_channelcountvphdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (channelcountvphdashboard_v1Data?.data?.dataset) {
           setdfd_channelcountvphdashboard_v1Props(
              Array.isArray(channelcountvphdashboard_v1Data?.data?.dataset?.data)
                 ? channelcountvphdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_channelcountvphdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.channelcountvphdashboard_v1) {
      channelcountvphdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.channelcountvphdashboard_v1= true
  },[refetch?.channelcountvphdashboard_v1])
    async function channelchartdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let channelchartdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelChartDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          channelchartdashboard_v1Body["dpdKey"] = encryptionDpd;
          channelchartdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:channelChartDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          channelchartdashboard_v1Body['filterData'] = filterData;
        }
        const channelchartdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",channelchartdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=channelchartdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(channelchartdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_channelchartdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_channelchartdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (channelchartdashboard_v1Data?.data?.dataset) {
           setdfd_channelchartdashboard_v1Props(
              Array.isArray(channelchartdashboard_v1Data?.data?.dataset?.data)
                 ? channelchartdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_channelchartdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.channelchartdashboard_v1) {
      channelchartdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.channelchartdashboard_v1= true
  },[refetch?.channelchartdashboard_v1])
    async function productchartdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let productchartdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:productChartDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          productchartdashboard_v1Body["dpdKey"] = encryptionDpd;
          productchartdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:productChartDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          productchartdashboard_v1Body['filterData'] = filterData;
        }
        const productchartdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",productchartdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=productchartdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(productchartdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_productchartdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_productchartdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (productchartdashboard_v1Data?.data?.dataset) {
           setdfd_productchartdashboard_v1Props(
              Array.isArray(productchartdashboard_v1Data?.data?.dataset?.data)
                 ? productchartdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_productchartdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.productchartdashboard_v1) {
      productchartdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.productchartdashboard_v1= true
  },[refetch?.productchartdashboard_v1])
    async function onlineofflinecountvphdashboard_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let onlineofflinecountvphdashboard_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineCountVPHDashboard:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          onlineofflinecountvphdashboard_v1Body["dpdKey"] = encryptionDpd;
          onlineofflinecountvphdashboard_v1Body["method"] = encryptionMethod;
        }
        if(globaldashboard_v1Props.length > 0){
          for(let i=0;i< globaldashboard_v1Props.length;i++){
            if(globaldashboard_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:onlineOfflineCountVPHDashboard:AFVK:v1"){
              // delete globaldashboard_v1Props[i].DFDkey;
              let temp=structuredClone(globaldashboard_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          onlineofflinecountvphdashboard_v1Body['filterData'] = filterData;
        }
        const onlineofflinecountvphdashboard_v1Data:any=await AxiosService.post("/te/eventEmitter",onlineofflinecountvphdashboard_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=onlineofflinecountvphdashboard_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(onlineofflinecountvphdashboard_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_onlineofflinecountvphdashboard_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_onlineofflinecountvphdashboard_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (onlineofflinecountvphdashboard_v1Data?.data?.dataset) {
           setdfd_onlineofflinecountvphdashboard_v1Props(
              Array.isArray(onlineofflinecountvphdashboard_v1Data?.data?.dataset?.data)
                 ? onlineofflinecountvphdashboard_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_onlineofflinecountvphdashboard_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.onlineofflinecountvphdashboard_v1) {
      onlineofflinecountvphdashboard_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.onlineofflinecountvphdashboard_v1= true
  },[refetch?.onlineofflinecountvphdashboard_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setglobaldashboard_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:globalDashboard:AFVK:v1`)
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
    await productdashboard_v1DFD(pagination)
    await channeldashboard_v1DFD(pagination)
    await currencydashboard_v1DFD(pagination)
    await transaction_v1DFD(pagination)
    await onlineofflinedashboard_v1DFD(pagination)
    await processcategorydashboard_v1DFD(pagination)
    await transactioncountvphdashboard_v1DFD(pagination)
    await channelcountvphdashboard_v1DFD(pagination)
    await channelchartdashboard_v1DFD(pagination)
    await productchartdashboard_v1DFD(pagination)
    await onlineofflinecountvphdashboard_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'gdb_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgdb_group(true)
            }
            if(nodes?.groupName == 'tab_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktab_grp(true)
            }
            if(nodes?.groupName == 'transaction_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktransaction_group(true)
            }
            if(nodes?.groupName == 'total_value_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_value_group(true)
            }
            if(nodes?.groupName == 'online_offline_processing_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckonline_offline_processing_group(true)
            }
            if(nodes?.groupName == 'bar_chart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbar_chart_group(true)
            }
            if(nodes?.groupName == 'pie_chart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpie_chart_group(true)
            }
            if(nodes?.groupName == 'transaction_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktransaction_table(true)
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
          codeStates['gdb_group'] = gdb_group5384d;
          codeStates['setgdb_group'] = setgdb_group5384d;
          codeStates['tab_grp'] = tab_grpe63f4;
          codeStates['settab_grp'] = settab_grpe63f4;
          codeStates['transaction_group'] = transaction_group6c6f2;
          codeStates['settransaction_group'] = settransaction_group6c6f2;
          codeStates['total_value_group'] = total_value_group9d783;
          codeStates['settotal_value_group'] = settotal_value_group9d783;
          codeStates['online_offline_processing_group'] = online_offline_processing_group7ad24;
          codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24;
          codeStates['bar_chart_group'] = bar_chart_group737a3;
          codeStates['setbar_chart_group'] = setbar_chart_group737a3;
          codeStates['pie_chart_group'] = pie_chart_group15067;
          codeStates['setpie_chart_group'] = setpie_chart_group15067;
          codeStates['transaction_table'] = transaction_tablef4f34;
          codeStates['settransaction_table'] = settransaction_tablef4f34;
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
    setglobaldashboard_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(globaldashboard_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tab_group:tab_group65b41.tab_group,      }
      handleArtfactRule(globaldashboard_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tab_group65b41.tab_group,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setglobaldashboard_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkgdb_group && initialLoad &&<Groupgdb_group
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
    