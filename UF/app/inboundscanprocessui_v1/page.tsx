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

const Groupoverallgroup = dynamic(() => import("./Groupoverallgroup/Groupoverallgroup"), { ssr: false });

export default function PageInboundscanprocessuiV1({ onReady }: { onReady?: () => void } = {}) {
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
  "overallgroup": {},
  "controlgroup": {},
  "control_tab_group": {},
  "button_group": {
    "hold": {
      "show": false
    },
    "force_pass": {
      "show": false
    },
    "ip_approve": {
      "show": false
    },
    "return": {
      "show": false
    },
    "cancel": {
      "show": false
    }
  },
  "rtgs_info": {},
  "allcontrols": {},
  "commoninfo": {
    "common_info": {
      "show": false
    },
    "dr_account": {
      "show": false
    },
    "dr_name": {
      "show": false
    },
    "base_currency": {
      "show": false
    }
  },
  "basicinfo": {
    "basic_info": {
      "show": false
    },
    "cr_account": {
      "show": false
    },
    "cr_name": {
      "show": false
    },
    "cr_bank_code": {
      "show": false
    },
    "forex_currency": {
      "show": false
    },
    "forex_amount": {
      "show": false
    },
    "base_amount": {
      "show": false
    }
  },
  "additionalinfo": {
    "addtional_info": {
      "show": false
    },
    "signature_screen": {
      "show": false
    },
    "remittance_info": {
      "show": false
    },
    "customwidget": {
      "show": false
    },
    "vgphstm_uuid": {
      "show": false
    }
  },
  "listgroup": {},
  "list_tab_group": {},
  "validation_list": {},
  "valdnlisttable": {
    "vldCode": {
      "show": false
    },
    "vldReason": {
      "show": false
    }
  },
  "comment_list": {},
  "cmntlisttable": {
    "cmnts": {
      "show": false
    }
  },
  "rtgs_list": {},
  "rtgs_list_grp": {},
  "rtgs_list_tble_group": {},
  "rtgs_list_table": {
    "tran_id": {
      "show": false
    },
    "dr_acnt_no": {
      "show": false
    },
    "cr_acnt_no": {
      "show": false
    },
    "amnt": {
      "show": false
    },
    "cr_bank_code": {
      "show": false
    },
    "created_by": {
      "show": false
    },
    "created_date": {
      "show": false
    }
  },
  "group": {},
  "rtgs_list_tab_grp": {},
  "validtn_list": {},
  "rtgs_list_validtn_table": {
    "vld_code_rtgs_lst": {
      "show": false
    },
    "vld_reason_rtgs_list": {
      "show": false
    }
  },
  "cmnt_list": {},
  "rtgs_list_cmnts_list": {
    "cmnts_rtgs_list": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "transactions";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {inboundscanprocessui_v1, setinboundscanprocessui_v1} = useContext(TotalContext) as TotalContextProps;
  const {inboundscanprocessui_v1Props, setinboundscanprocessui_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkoverallgroup,setCheckoverallgroup,]=useState<boolean>(false);
  const [checkcontrolgroup,setCheckcontrolgroup,]=useState<boolean>(false);
  const [checkbutton_group,setCheckbutton_group,]=useState<boolean>(false);
  const [checkallcontrols,setCheckallcontrols,]=useState<boolean>(false);
  const [checkcommoninfo,setCheckcommoninfo,]=useState<boolean>(false);
  const [checkbasicinfo,setCheckbasicinfo,]=useState<boolean>(false);
  const [checkadditionalinfo,setCheckadditionalinfo,]=useState<boolean>(false);
  const [checklistgroup,setChecklistgroup,]=useState<boolean>(false);
  const [checkvaldnlisttable,setCheckvaldnlisttable,]=useState<boolean>(false);
  const [checkcmntlisttable,setCheckcmntlisttable,]=useState<boolean>(false);
  const [checkrtgs_list_grp,setCheckrtgs_list_grp,]=useState<boolean>(false);
  const [checkrtgs_list_tble_group,setCheckrtgs_list_tble_group,]=useState<boolean>(false);
  const [checkrtgs_list_table,setCheckrtgs_list_table,]=useState<boolean>(false);
  const [checkgroup,setCheckgroup,]=useState<boolean>(false);
  const [checkrtgs_list_validtn_table,setCheckrtgs_list_validtn_table,]=useState<boolean>(false);
  const [checkrtgs_list_cmnts_list,setCheckrtgs_list_cmnts_list,]=useState<boolean>(false);
  const {overallgroup1218f, setoverallgroup1218f} = useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48, setcontrolgroupfbb48} = useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855, setbutton_groupb9855} = useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72, setallcontrolsb8c72} = useContext(TotalContext) as TotalContextProps;
  const {commoninfod7eda, setcommoninfod7eda} = useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0a, setbasicinfoffb0a} = useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4baba, setadditionalinfo4baba} = useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7c, setlistgroup97a7c} = useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84, setvaldnlisttable4db84} = useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834, setcmntlisttable96834} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfc, setrtgs_list_grp82cfc} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5, setrtgs_list_tble_groupe1ac5} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7, setrtgs_list_tablead2c7} = useContext(TotalContext) as TotalContextProps;
  const {group1b1aa, setgroup1b1aa} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755, setrtgs_list_validtn_table10755} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130, setrtgs_list_cmnts_list85130} = useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ff, setcontrol_tab_group161ff} = useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782e, setlist_tab_group6782e} = useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579, setrtgs_list_tab_grp43579} = useContext(TotalContext) as TotalContextProps;
  const {dfd_scansaveprocessdfd_v1Props, setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crbankcodedropdowndfd_v1Props, setdfd_crbankcodedropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_forexcurrencydropdowndfd_v1Props, setdfd_forexcurrencydropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_documentlistdfd_v1Props, setdfd_documentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_errorlistdfd_v1Props, setdfd_errorlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactionlistdfd_v1Props, setdfd_transactionlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_commentlistdfd_v1Props, setdfd_commentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      scansaveprocessdfd_v1:false,
      crbankcodedropdowndfd_v1:false,
      forexcurrencydropdowndfd_v1:false,
      documentlistdfd_v1:false,
      errorlistdfd_v1:false,
      transactionlistdfd_v1:false,
      commentlistdfd_v1:false,
    });
    async function scansaveprocessdfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let scansaveprocessdfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          scansaveprocessdfd_v1Body["dpdKey"] = encryptionDpd;
          scansaveprocessdfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          scansaveprocessdfd_v1Body['filterData'] = filterData;
        }
        const scansaveprocessdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",scansaveprocessdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=scansaveprocessdfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(scansaveprocessdfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_scansaveprocessdfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_scansaveprocessdfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (scansaveprocessdfd_v1Data?.data?.dataset) {
           setdfd_scansaveprocessdfd_v1Props(
              Array.isArray(scansaveprocessdfd_v1Data?.data?.dataset?.data)
                 ? scansaveprocessdfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_scansaveprocessdfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.scansaveprocessdfd_v1) {
      scansaveprocessdfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.scansaveprocessdfd_v1= true
  },[refetch?.scansaveprocessdfd_v1])
    async function crbankcodedropdowndfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let crbankcodedropdowndfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          crbankcodedropdowndfd_v1Body["dpdKey"] = encryptionDpd;
          crbankcodedropdowndfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          crbankcodedropdowndfd_v1Body['filterData'] = filterData;
        }
        const crbankcodedropdowndfd_v1Data:any=await AxiosService.post("/te/eventEmitter",crbankcodedropdowndfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=crbankcodedropdowndfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(crbankcodedropdowndfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_crbankcodedropdowndfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_crbankcodedropdowndfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (crbankcodedropdowndfd_v1Data?.data?.dataset) {
           setdfd_crbankcodedropdowndfd_v1Props(
              Array.isArray(crbankcodedropdowndfd_v1Data?.data?.dataset?.data)
                 ? crbankcodedropdowndfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_crbankcodedropdowndfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.crbankcodedropdowndfd_v1) {
      crbankcodedropdowndfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.crbankcodedropdowndfd_v1= true
  },[refetch?.crbankcodedropdowndfd_v1])
    async function forexcurrencydropdowndfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let forexcurrencydropdowndfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:forexCurrencyDropDownDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          forexcurrencydropdowndfd_v1Body["dpdKey"] = encryptionDpd;
          forexcurrencydropdowndfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:forexCurrencyDropDownDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          forexcurrencydropdowndfd_v1Body['filterData'] = filterData;
        }
        const forexcurrencydropdowndfd_v1Data:any=await AxiosService.post("/te/eventEmitter",forexcurrencydropdowndfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=forexcurrencydropdowndfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(forexcurrencydropdowndfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_forexcurrencydropdowndfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_forexcurrencydropdowndfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (forexcurrencydropdowndfd_v1Data?.data?.dataset) {
           setdfd_forexcurrencydropdowndfd_v1Props(
              Array.isArray(forexcurrencydropdowndfd_v1Data?.data?.dataset?.data)
                 ? forexcurrencydropdowndfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_forexcurrencydropdowndfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.forexcurrencydropdowndfd_v1) {
      forexcurrencydropdowndfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.forexcurrencydropdowndfd_v1= true
  },[refetch?.forexcurrencydropdowndfd_v1])
    async function documentlistdfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let documentlistdfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:documentListDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          documentlistdfd_v1Body["dpdKey"] = encryptionDpd;
          documentlistdfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:documentListDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          documentlistdfd_v1Body['filterData'] = filterData;
        }
        const documentlistdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",documentlistdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=documentlistdfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(documentlistdfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_documentlistdfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_documentlistdfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (documentlistdfd_v1Data?.data?.dataset) {
           setdfd_documentlistdfd_v1Props(
              Array.isArray(documentlistdfd_v1Data?.data?.dataset?.data)
                 ? documentlistdfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_documentlistdfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.documentlistdfd_v1) {
      documentlistdfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.documentlistdfd_v1= true
  },[refetch?.documentlistdfd_v1])
    async function errorlistdfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let errorlistdfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          errorlistdfd_v1Body["dpdKey"] = encryptionDpd;
          errorlistdfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:errorListDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          errorlistdfd_v1Body['filterData'] = filterData;
        }
        const errorlistdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",errorlistdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=errorlistdfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(errorlistdfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_errorlistdfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_errorlistdfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (errorlistdfd_v1Data?.data?.dataset) {
           setdfd_errorlistdfd_v1Props(
              Array.isArray(errorlistdfd_v1Data?.data?.dataset?.data)
                 ? errorlistdfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_errorlistdfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.errorlistdfd_v1) {
      errorlistdfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.errorlistdfd_v1= true
  },[refetch?.errorlistdfd_v1])
    async function transactionlistdfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let transactionlistdfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          transactionlistdfd_v1Body["dpdKey"] = encryptionDpd;
          transactionlistdfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:transactionListDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          transactionlistdfd_v1Body['filterData'] = filterData;
        }
        const transactionlistdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",transactionlistdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=transactionlistdfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(transactionlistdfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_transactionlistdfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_transactionlistdfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (transactionlistdfd_v1Data?.data?.dataset) {
           setdfd_transactionlistdfd_v1Props(
              Array.isArray(transactionlistdfd_v1Data?.data?.dataset?.data)
                 ? transactionlistdfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_transactionlistdfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.transactionlistdfd_v1) {
      transactionlistdfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.transactionlistdfd_v1= true
  },[refetch?.transactionlistdfd_v1])
    async function commentlistdfd_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let commentlistdfd_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          commentlistdfd_v1Body["dpdKey"] = encryptionDpd;
          commentlistdfd_v1Body["method"] = encryptionMethod;
        }
        if(inboundscanprocessui_v1Props.length > 0){
          for(let i=0;i< inboundscanprocessui_v1Props.length;i++){
            if(inboundscanprocessui_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:commentListDfd:AFVK:v1"){
              // delete inboundscanprocessui_v1Props[i].DFDkey;
              let temp=structuredClone(inboundscanprocessui_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          commentlistdfd_v1Body['filterData'] = filterData;
        }
        const commentlistdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",commentlistdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=commentlistdfd_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(commentlistdfd_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_commentlistdfd_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_commentlistdfd_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (commentlistdfd_v1Data?.data?.dataset) {
           setdfd_commentlistdfd_v1Props(
              Array.isArray(commentlistdfd_v1Data?.data?.dataset?.data)
                 ? commentlistdfd_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_commentlistdfd_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.commentlistdfd_v1) {
      commentlistdfd_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.commentlistdfd_v1= true
  },[refetch?.commentlistdfd_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setinboundscanprocessui_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1',
        [user],
        'pageInboundscanprocessuiV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1`)
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
    await scansaveprocessdfd_v1DFD(pagination)
    await crbankcodedropdowndfd_v1DFD(pagination)
    await forexcurrencydropdowndfd_v1DFD(pagination)
    await documentlistdfd_v1DFD(pagination)
    await errorlistdfd_v1DFD(pagination)
    await transactionlistdfd_v1DFD(pagination)
    await commentlistdfd_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'overallgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckoverallgroup(true)
            }
            if(nodes?.groupName == 'controlgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcontrolgroup(true)
            }
            if(nodes?.groupName == 'button_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbutton_group(true)
            }
            if(nodes?.groupName == 'allControls' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckallcontrols(true)
            }
            if(nodes?.groupName == 'commonInfo' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcommoninfo(true)
            }
            if(nodes?.groupName == 'basicInfo' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbasicinfo(true)
            }
            if(nodes?.groupName == 'additionalInfo' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadditionalinfo(true)
            }
            if(nodes?.groupName == 'listgroup' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecklistgroup(true)
            }
            if(nodes?.groupName == 'valdnListTable' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvaldnlisttable(true)
            }
            if(nodes?.groupName == 'cmntListTable' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcmntlisttable(true)
            }
            if(nodes?.groupName == 'rtgs_list_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrtgs_list_grp(true)
            }
            if(nodes?.groupName == 'rtgs_list_tble_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrtgs_list_tble_group(true)
            }
            if(nodes?.groupName == 'rtgs_list_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrtgs_list_table(true)
            }
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgroup(true)
            }
            if(nodes?.groupName == 'rtgs_list_validtn_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrtgs_list_validtn_table(true)
            }
            if(nodes?.groupName == 'rtgs_list_cmnts_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrtgs_list_cmnts_list(true)
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
          codeStates['overallgroup'] = overallgroup1218f;
          codeStates['setoverallgroup'] = setoverallgroup1218f;
          codeStates['controlgroup'] = controlgroupfbb48;
          codeStates['setcontrolgroup'] = setcontrolgroupfbb48;
          codeStates['button_group'] = button_groupb9855;
          codeStates['setbutton_group'] = setbutton_groupb9855;
          codeStates['allcontrols'] = allcontrolsb8c72;
          codeStates['setallcontrols'] = setallcontrolsb8c72;
          codeStates['commoninfo'] = commoninfod7eda;
          codeStates['setcommoninfo'] = setcommoninfod7eda;
          codeStates['basicinfo'] = basicinfoffb0a;
          codeStates['setbasicinfo'] = setbasicinfoffb0a;
          codeStates['additionalinfo'] = additionalinfo4baba;
          codeStates['setadditionalinfo'] = setadditionalinfo4baba;
          codeStates['listgroup'] = listgroup97a7c;
          codeStates['setlistgroup'] = setlistgroup97a7c;
          codeStates['valdnlisttable'] = valdnlisttable4db84;
          codeStates['setvaldnlisttable'] = setvaldnlisttable4db84;
          codeStates['cmntlisttable'] = cmntlisttable96834;
          codeStates['setcmntlisttable'] = setcmntlisttable96834;
          codeStates['rtgs_list_grp'] = rtgs_list_grp82cfc;
          codeStates['setrtgs_list_grp'] = setrtgs_list_grp82cfc;
          codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupe1ac5;
          codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupe1ac5;
          codeStates['rtgs_list_table'] = rtgs_list_tablead2c7;
          codeStates['setrtgs_list_table'] = setrtgs_list_tablead2c7;
          codeStates['group'] = group1b1aa;
          codeStates['setgroup'] = setgroup1b1aa;
          codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table10755;
          codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table10755;
          codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list85130;
          codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list85130;
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
    routes.push("/transactions_v1");
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
    setinboundscanprocessui_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(inboundscanprocessui_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
control_tab_group:control_tab_group161ff.control_tab_group,list_tab_group:list_tab_group6782e.list_tab_group,rtgs_list_tab_grp:rtgs_list_tab_grp43579.rtgs_list_tab_grp,      }
      handleArtfactRule(inboundscanprocessui_v1?._artfactPFRule_,data,allRuleData)
    }
  },[control_tab_group161ff.control_tab_group,list_tab_group6782e.list_tab_group,rtgs_list_tab_grp43579.rtgs_list_tab_grp,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setinboundscanprocessui_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkoverallgroup && initialLoad &&<Groupoverallgroup
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
    