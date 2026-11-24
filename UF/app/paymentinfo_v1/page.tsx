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

const Grouppayment_info_group = dynamic(() => import("./Grouppayment_info_group/Grouppayment_info_group"), { ssr: false });

export default function PagePaymentinfoV1({ onReady }: { onReady?: () => void } = {}) {
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
  "payment_info_group": {
    "payment_info_text_label": {
      "show": false
    },
    "customwidget": {
      "show": false
    }
  },
  "midynamicactions": {
    "repair_new_payment_mk_save_btn": {
      "show": false
    },
    "cancel": {
      "show": false
    },
    "new_payment_chk_reject_btn": {
      "show": false
    },
    "new_payment_chk_approve_btn": {
      "show": false
    },
    "save": {
      "show": false
    }
  },
  "general_info_group": {
    "general_info_text_label": {
      "show": false
    },
    "value_date": {
      "show": false
    },
    "service_level": {
      "show": false
    },
    "purpose": {
      "show": false
    }
  },
  "dbtr_info_group": {
    "dbtr_info_text_label": {
      "show": false
    },
    "dr_account": {
      "show": false
    },
    "dr_Name": {
      "show": false
    },
    "dr_currency": {
      "show": false
    },
    "dr_account_balance": {
      "show": false
    },
    "dr_iban": {
      "show": false
    },
    "dr_street_name": {
      "show": false
    },
    "dr_building_number": {
      "show": false
    },
    "dr_pstl_code": {
      "show": false
    },
    "dr_town_name": {
      "show": false
    },
    "dr_country": {
      "show": false
    },
    "dr_bank_code": {
      "show": false
    },
    "amount_input_type": {
      "show": false
    },
    "dr_amount": {
      "show": false
    },
    "settlement_amount": {
      "show": false
    }
  },
  "cr_info_group": {
    "creditor_info_label_text": {
      "show": false
    },
    "ben_checkbox": {
      "show": false
    },
    "cr_account": {
      "show": false
    },
    "cr_name": {
      "show": false
    },
    "cr_street_name": {
      "show": false
    },
    "cr_benif_action": {
      "show": false
    },
    "cr_building_name": {
      "show": false
    },
    "cr_floor": {
      "show": false
    },
    "cr_post_code": {
      "show": false
    },
    "cr_town_name": {
      "show": false
    },
    "cr_country": {
      "show": false
    },
    "cr_currency": {
      "show": false
    },
    "exchange_rate": {
      "show": false
    },
    "cr_amount": {
      "show": false
    },
    "cr_bank_code": {
      "show": false
    },
    "cr_clr_code": {
      "show": false
    }
  },
  "chrg_info_group": {
    "chrg_info_text_label": {
      "show": false
    },
    "charge_type": {
      "show": false
    },
    "charge_amount": {
      "show": false
    },
    "correspondent_charge": {
      "show": false
    },
    "bank_charge": {
      "show": false
    }
  },
  "add_info_group": {
    "add_info_text_label": {
      "show": false
    },
    "payment_method": {
      "show": false
    },
    "instruction_priority": {
      "show": false
    },
    "category_purpose": {
      "show": false
    },
    "remittance_info": {
      "show": false
    },
    "intermediary_institution": {
      "show": false
    },
    "sender_receiver_info": {
      "show": false
    },
    "correspondent_bank": {
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
  const {paymentinfo_v1, setpaymentinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const {paymentinfo_v1Props, setpaymentinfo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkpayment_info_group,setCheckpayment_info_group,]=useState<boolean>(false);
  const [checkmidynamicactions,setCheckmidynamicactions,]=useState<boolean>(false);
  const [checkgeneral_info_group,setCheckgeneral_info_group,]=useState<boolean>(false);
  const [checkdbtr_info_group,setCheckdbtr_info_group,]=useState<boolean>(false);
  const [checkcr_info_group,setCheckcr_info_group,]=useState<boolean>(false);
  const [checkchrg_info_group,setCheckchrg_info_group,]=useState<boolean>(false);
  const [checkadd_info_group,setCheckadd_info_group,]=useState<boolean>(false);
  const {payment_info_group1bac9, setpayment_info_group1bac9} = useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d} = useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6} = useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea} = useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8} = useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0} = useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6} = useContext(TotalContext) as TotalContextProps;
  const {dfd_purposecombo_v1Props, setdfd_purposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crbankcodecombo_v1Props, setdfd_crbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_drbankcodecombo_v1Props, setdfd_drbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_chargetypecombo_v1Props, setdfd_chargetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_paymentmethodcombo_v1Props, setdfd_paymentmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_initiationinstructionprioritycombo_v1Props, setdfd_initiationinstructionprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_categorypurposecombo_v1Props, setdfd_categorypurposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_correspondentbankcombo_v1Props, setdfd_correspondentbankcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_manualinitiationuimappingquery_v1Props, setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_servicelevelcombo_v1Props, setdfd_servicelevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      purposecombo_v1:false,
      currencycombo_v1:false,
      countrycombo_v1:false,
      crbankcodecombo_v1:false,
      drbankcodecombo_v1:false,
      chargetypecombo_v1:false,
      paymentmethodcombo_v1:false,
      initiationinstructionprioritycombo_v1:false,
      categorypurposecombo_v1:false,
      correspondentbankcombo_v1:false,
      manualinitiationuimappingquery_v1:false,
      servicelevelcombo_v1:false,
    });
    async function purposecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let purposecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:purposeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          purposecombo_v1Body["dpdKey"] = encryptionDpd;
          purposecombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:purposeCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          purposecombo_v1Body['filterData'] = filterData;
        }
        const purposecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",purposecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=purposecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(purposecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_purposecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_purposecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (purposecombo_v1Data?.data?.dataset) {
           setdfd_purposecombo_v1Props(
              Array.isArray(purposecombo_v1Data?.data?.dataset?.data)
                 ? purposecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_purposecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.purposecombo_v1) {
      purposecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.purposecombo_v1= true
  },[refetch?.purposecombo_v1])
    async function currencycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let currencycombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          currencycombo_v1Body["dpdKey"] = encryptionDpd;
          currencycombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:currencyCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          currencycombo_v1Body['filterData'] = filterData;
        }
        const currencycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",currencycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=currencycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(currencycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_currencycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_currencycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (currencycombo_v1Data?.data?.dataset) {
           setdfd_currencycombo_v1Props(
              Array.isArray(currencycombo_v1Data?.data?.dataset?.data)
                 ? currencycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_currencycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.currencycombo_v1) {
      currencycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.currencycombo_v1= true
  },[refetch?.currencycombo_v1])
    async function countrycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let countrycombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:countryCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          countrycombo_v1Body["dpdKey"] = encryptionDpd;
          countrycombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:countryCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          countrycombo_v1Body['filterData'] = filterData;
        }
        const countrycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",countrycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=countrycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(countrycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_countrycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_countrycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (countrycombo_v1Data?.data?.dataset) {
           setdfd_countrycombo_v1Props(
              Array.isArray(countrycombo_v1Data?.data?.dataset?.data)
                 ? countrycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_countrycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.countrycombo_v1) {
      countrycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.countrycombo_v1= true
  },[refetch?.countrycombo_v1])
    async function crbankcodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let crbankcodecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:crBankCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          crbankcodecombo_v1Body["dpdKey"] = encryptionDpd;
          crbankcodecombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:crBankCodeCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          crbankcodecombo_v1Body['filterData'] = filterData;
        }
        const crbankcodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",crbankcodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=crbankcodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(crbankcodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_crbankcodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_crbankcodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (crbankcodecombo_v1Data?.data?.dataset) {
           setdfd_crbankcodecombo_v1Props(
              Array.isArray(crbankcodecombo_v1Data?.data?.dataset?.data)
                 ? crbankcodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_crbankcodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.crbankcodecombo_v1) {
      crbankcodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.crbankcodecombo_v1= true
  },[refetch?.crbankcodecombo_v1])
    async function drbankcodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let drbankcodecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:drBankCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          drbankcodecombo_v1Body["dpdKey"] = encryptionDpd;
          drbankcodecombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:drBankCodeCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          drbankcodecombo_v1Body['filterData'] = filterData;
        }
        const drbankcodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",drbankcodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=drbankcodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(drbankcodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_drbankcodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_drbankcodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (drbankcodecombo_v1Data?.data?.dataset) {
           setdfd_drbankcodecombo_v1Props(
              Array.isArray(drbankcodecombo_v1Data?.data?.dataset?.data)
                 ? drbankcodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_drbankcodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.drbankcodecombo_v1) {
      drbankcodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.drbankcodecombo_v1= true
  },[refetch?.drbankcodecombo_v1])
    async function chargetypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let chargetypecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:chargeTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          chargetypecombo_v1Body["dpdKey"] = encryptionDpd;
          chargetypecombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:chargeTypeCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          chargetypecombo_v1Body['filterData'] = filterData;
        }
        const chargetypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",chargetypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=chargetypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(chargetypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_chargetypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_chargetypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (chargetypecombo_v1Data?.data?.dataset) {
           setdfd_chargetypecombo_v1Props(
              Array.isArray(chargetypecombo_v1Data?.data?.dataset?.data)
                 ? chargetypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_chargetypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.chargetypecombo_v1) {
      chargetypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.chargetypecombo_v1= true
  },[refetch?.chargetypecombo_v1])
    async function paymentmethodcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let paymentmethodcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:paymentMethodCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          paymentmethodcombo_v1Body["dpdKey"] = encryptionDpd;
          paymentmethodcombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:paymentMethodCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          paymentmethodcombo_v1Body['filterData'] = filterData;
        }
        const paymentmethodcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",paymentmethodcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=paymentmethodcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(paymentmethodcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_paymentmethodcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_paymentmethodcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (paymentmethodcombo_v1Data?.data?.dataset) {
           setdfd_paymentmethodcombo_v1Props(
              Array.isArray(paymentmethodcombo_v1Data?.data?.dataset?.data)
                 ? paymentmethodcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_paymentmethodcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.paymentmethodcombo_v1) {
      paymentmethodcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.paymentmethodcombo_v1= true
  },[refetch?.paymentmethodcombo_v1])
    async function initiationinstructionprioritycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let initiationinstructionprioritycombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:initiationInstructionPriorityCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          initiationinstructionprioritycombo_v1Body["dpdKey"] = encryptionDpd;
          initiationinstructionprioritycombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:initiationInstructionPriorityCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          initiationinstructionprioritycombo_v1Body['filterData'] = filterData;
        }
        const initiationinstructionprioritycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",initiationinstructionprioritycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=initiationinstructionprioritycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(initiationinstructionprioritycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_initiationinstructionprioritycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_initiationinstructionprioritycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (initiationinstructionprioritycombo_v1Data?.data?.dataset) {
           setdfd_initiationinstructionprioritycombo_v1Props(
              Array.isArray(initiationinstructionprioritycombo_v1Data?.data?.dataset?.data)
                 ? initiationinstructionprioritycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_initiationinstructionprioritycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.initiationinstructionprioritycombo_v1) {
      initiationinstructionprioritycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.initiationinstructionprioritycombo_v1= true
  },[refetch?.initiationinstructionprioritycombo_v1])
    async function categorypurposecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let categorypurposecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:categoryPurposeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          categorypurposecombo_v1Body["dpdKey"] = encryptionDpd;
          categorypurposecombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:categoryPurposeCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          categorypurposecombo_v1Body['filterData'] = filterData;
        }
        const categorypurposecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",categorypurposecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=categorypurposecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(categorypurposecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_categorypurposecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_categorypurposecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (categorypurposecombo_v1Data?.data?.dataset) {
           setdfd_categorypurposecombo_v1Props(
              Array.isArray(categorypurposecombo_v1Data?.data?.dataset?.data)
                 ? categorypurposecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_categorypurposecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.categorypurposecombo_v1) {
      categorypurposecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.categorypurposecombo_v1= true
  },[refetch?.categorypurposecombo_v1])
    async function correspondentbankcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let correspondentbankcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:correspondentBankCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          correspondentbankcombo_v1Body["dpdKey"] = encryptionDpd;
          correspondentbankcombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:correspondentBankCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          correspondentbankcombo_v1Body['filterData'] = filterData;
        }
        const correspondentbankcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",correspondentbankcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=correspondentbankcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(correspondentbankcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_correspondentbankcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_correspondentbankcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (correspondentbankcombo_v1Data?.data?.dataset) {
           setdfd_correspondentbankcombo_v1Props(
              Array.isArray(correspondentbankcombo_v1Data?.data?.dataset?.data)
                 ? correspondentbankcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_correspondentbankcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.correspondentbankcombo_v1) {
      correspondentbankcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.correspondentbankcombo_v1= true
  },[refetch?.correspondentbankcombo_v1])
    async function manualinitiationuimappingquery_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let manualinitiationuimappingquery_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          manualinitiationuimappingquery_v1Body["dpdKey"] = encryptionDpd;
          manualinitiationuimappingquery_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          manualinitiationuimappingquery_v1Body['filterData'] = filterData;
        }
        const manualinitiationuimappingquery_v1Data:any=await AxiosService.post("/te/eventEmitter",manualinitiationuimappingquery_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=manualinitiationuimappingquery_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(manualinitiationuimappingquery_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_manualinitiationuimappingquery_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_manualinitiationuimappingquery_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (manualinitiationuimappingquery_v1Data?.data?.dataset) {
           setdfd_manualinitiationuimappingquery_v1Props(
              Array.isArray(manualinitiationuimappingquery_v1Data?.data?.dataset?.data)
                 ? manualinitiationuimappingquery_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_manualinitiationuimappingquery_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.manualinitiationuimappingquery_v1) {
      manualinitiationuimappingquery_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.manualinitiationuimappingquery_v1= true
  },[refetch?.manualinitiationuimappingquery_v1])
    async function servicelevelcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let servicelevelcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:serviceLevelCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          servicelevelcombo_v1Body["dpdKey"] = encryptionDpd;
          servicelevelcombo_v1Body["method"] = encryptionMethod;
        }
        if(paymentinfo_v1Props.length > 0){
          for(let i=0;i< paymentinfo_v1Props.length;i++){
            if(paymentinfo_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:serviceLevelCombo:AFVK:v1"){
              // delete paymentinfo_v1Props[i].DFDkey;
              let temp=structuredClone(paymentinfo_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          servicelevelcombo_v1Body['filterData'] = filterData;
        }
        const servicelevelcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",servicelevelcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=servicelevelcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(servicelevelcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_servicelevelcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_servicelevelcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (servicelevelcombo_v1Data?.data?.dataset) {
           setdfd_servicelevelcombo_v1Props(
              Array.isArray(servicelevelcombo_v1Data?.data?.dataset?.data)
                 ? servicelevelcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_servicelevelcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.servicelevelcombo_v1) {
      servicelevelcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.servicelevelcombo_v1= true
  },[refetch?.servicelevelcombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setpaymentinfo_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1" }
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
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1',
        [user],
        'pagePaymentinfoV1',
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
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1`)
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
    await purposecombo_v1DFD(pagination)
    await currencycombo_v1DFD(pagination)
    await countrycombo_v1DFD(pagination)
    await crbankcodecombo_v1DFD(pagination)
    await drbankcodecombo_v1DFD(pagination)
    await chargetypecombo_v1DFD(pagination)
    await paymentmethodcombo_v1DFD(pagination)
    await initiationinstructionprioritycombo_v1DFD(pagination)
    await categorypurposecombo_v1DFD(pagination)
    await correspondentbankcombo_v1DFD(pagination)
    await manualinitiationuimappingquery_v1DFD(pagination)
    await servicelevelcombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'payment_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpayment_info_group(true)
            }
            if(nodes?.groupName == 'midynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmidynamicactions(true)
            }
            if(nodes?.groupName == 'general_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeneral_info_group(true)
            }
            if(nodes?.groupName == 'dbtr_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdbtr_info_group(true)
            }
            if(nodes?.groupName == 'cr_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcr_info_group(true)
            }
            if(nodes?.groupName == 'chrg_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchrg_info_group(true)
            }
            if(nodes?.groupName == 'add_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadd_info_group(true)
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
          codeStates['payment_info_group'] = payment_info_group1bac9;
          codeStates['setpayment_info_group'] = setpayment_info_group1bac9;
          codeStates['midynamicactions'] = midynamicactions3b39d;
          codeStates['setmidynamicactions'] = setmidynamicactions3b39d;
          codeStates['general_info_group'] = general_info_groupc83e6;
          codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6;
          codeStates['dbtr_info_group'] = dbtr_info_group4e8ea;
          codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea;
          codeStates['cr_info_group'] = cr_info_groupb01e8;
          codeStates['setcr_info_group'] = setcr_info_groupb01e8;
          codeStates['chrg_info_group'] = chrg_info_group76ab0;
          codeStates['setchrg_info_group'] = setchrg_info_group76ab0;
          codeStates['add_info_group'] = add_info_groupe8dc6;
          codeStates['setadd_info_group'] = setadd_info_groupe8dc6;
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
    setpaymentinfo_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(paymentinfo_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(paymentinfo_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setpaymentinfo_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkpayment_info_group && initialLoad &&<Grouppayment_info_group
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
    