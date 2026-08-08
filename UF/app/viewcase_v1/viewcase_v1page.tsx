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
const Groupadd_case_group = dynamic(() => import("./Groupadd_case_group/Groupadd_case_group"), { ssr: false });

export default function PageViewcaseV1({ onReady }: { onReady?: () => void } = {}) {
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
  "add_case_group": {
    "venue_id": {
      "show": false
    },
    "creditor_id": {
      "show": false
    },
    "remarks_textarea": {
      "show": false
    },
    "account_id": {
      "show": false
    }
  },
  "header_group": {
    "craete_header_text": {
      "show": false
    }
  },
  "case_information_group": {
    "case_info_text": {
      "show": false
    },
    "creditor_name": {
      "show": false
    },
    "attorney_name": {
      "show": false
    },
    "status_name": {
      "show": false
    },
    "priority_name": {
      "show": false
    },
    "queue_position": {
      "show": false
    },
    "quality_score": {
      "show": false
    },
    "sla_wait_start_time": {
      "show": false
    }
  },
  "venue_group": {
    "rules_icon": {
      "show": false
    },
    "venue_special_rules_text": {
      "show": false
    },
    "special_rules": {
      "show": false
    },
    "venue_special_rules_divider": {
      "show": false
    },
    "venue_special_rules_dividers": {
      "show": false
    },
    "venue_special_rules_dividerss": {
      "show": false
    },
    "venue_special_rules_dividersss": {
      "show": false
    },
    "venues_special_rules_dividerssss": {
      "show": false
    }
  },
  "georgia_group": {
    "warning_icon": {
      "show": false
    },
    "georgia_sol_text": {
      "show": false
    },
    "special_rules": {
      "show": false
    }
  },
  "georgias_group": {
    "warnings_icon": {
      "show": false
    },
    "georgias_sol_text": {
      "show": false
    },
    "specials_rules": {
      "show": false
    }
  },
  "georgias_groups": {
    "warningss_icons": {
      "show": false
    },
    "georgias_sosl_texts": {
      "show": false
    },
    "specials_ruless": {
      "show": false
    }
  },
  "georgiass_groups": {
    "warningsss_icons": {
      "show": false
    },
    "georgiass_sosl_texts": {
      "show": false
    },
    "specials_ruless": {
      "show": false
    }
  },
  "georgsiass_groups": {
    "warningssss_icons": {
      "show": false
    },
    "georsgiass_sosl_texts": {
      "show": false
    },
    "spesciasls_ruless": {
      "show": false
    }
  },
  "debtor_information_group": {
    "debt_info_text": {
      "show": false
    },
    "debtor_name": {
      "show": false
    },
    "ssn_masked": {
      "show": false
    },
    "dob": {
      "show": false
    },
    "address": {
      "show": false
    }
  },
  "financial_details_group": {
    "financial_dtls_text": {
      "show": false
    },
    "charge_off_date": {
      "show": false
    },
    "last_payment_date": {
      "show": false
    },
    "total_balance": {
      "show": false
    },
    "principal": {
      "show": false
    },
    "interest": {
      "show": false
    },
    "fees": {
      "show": false
    }
  },
  "venue_details_group": {
    "ven_name_text": {
      "show": false
    },
    "state": {
      "show": false
    },
    "country": {
      "show": false
    },
    "court_name": {
      "show": false
    },
    "judge_name": {
      "show": false
    },
    "sol_expiry_date": {
      "show": false
    },
    "filing_fee": {
      "show": false
    },
    "service_method": {
      "show": false
    },
    "efiling_system": {
      "show": false
    },
    "efiling_required": {
      "show": false
    }
  },
  "required_dociument_main_group": {
    "reeq_doc_text": {
      "show": false
    }
  },
  "doc_table": {
    "attachment_id": {
      "show": false
    },
    "doc_name": {
      "show": false
    },
    "trs_created_by": {
      "show": false
    },
    "trs_created_date": {
      "show": false
    }
  },
  "checklist_main_group": {
    "valid_checklist_text": {
      "show": false
    }
  },
  "checklist_table": {
    "checklist_item_id": {
      "show": false
    },
    "item_name": {
      "show": false
    },
    "is_completed": {
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
  const {viewcase_v1, setviewcase_v1} = useContext(TotalContext) as TotalContextProps;
  const {viewcase_v1Props, setviewcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkadd_case_group,setCheckadd_case_group,]=useState<boolean>(false);
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkcase_information_group,setCheckcase_information_group,]=useState<boolean>(false);
  const [checkvenue_group,setCheckvenue_group,]=useState<boolean>(false);
  const [checkgeorgia_group,setCheckgeorgia_group,]=useState<boolean>(false);
  const [checkgeorgias_group,setCheckgeorgias_group,]=useState<boolean>(false);
  const [checkgeorgias_groups,setCheckgeorgias_groups,]=useState<boolean>(false);
  const [checkgeorgiass_groups,setCheckgeorgiass_groups,]=useState<boolean>(false);
  const [checkgeorgsiass_groups,setCheckgeorgsiass_groups,]=useState<boolean>(false);
  const [checkdebtor_information_group,setCheckdebtor_information_group,]=useState<boolean>(false);
  const [checkfinancial_details_group,setCheckfinancial_details_group,]=useState<boolean>(false);
  const [checkvenue_details_group,setCheckvenue_details_group,]=useState<boolean>(false);
  const [checkrequired_dociument_main_group,setCheckrequired_dociument_main_group,]=useState<boolean>(false);
  const [checkdoc_table,setCheckdoc_table,]=useState<boolean>(false);
  const [checkchecklist_main_group,setCheckchecklist_main_group,]=useState<boolean>(false);
  const [checkchecklist_table,setCheckchecklist_table,]=useState<boolean>(false);
  const {add_case_group1f6e4, setadd_case_group1f6e4} = useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a} = useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29} = useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9} = useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c} = useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01} = useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356} = useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd} = useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a} = useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55} = useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9} = useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a} = useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b} = useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7} = useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e} = useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctypenamecombo_v1Props, setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctable_v1Props, setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrcheckliststatus_v1Props, setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      addcase_v1:false,
      doctypenamecombo_v1:false,
      amrchecklistcombo_v1:false,
      doctable_v1:false,
      amrcheckliststatus_v1:false,
    });
    async function addcase_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let addcase_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          addcase_v1Body["dpdKey"] = encryptionDpd;
          addcase_v1Body["method"] = encryptionMethod;
        }
        if(viewcase_v1Props.length > 0){
          for(let i=0;i< viewcase_v1Props.length;i++){
            if(viewcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1"){
              // delete viewcase_v1Props[i].DFDkey;
              let temp=structuredClone(viewcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          addcase_v1Body['filterData'] = filterData;
        }
        const addcase_v1Data:any=await AxiosService.post("/te/eventEmitter",addcase_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=addcase_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(addcase_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_addcase_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_addcase_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (addcase_v1Data?.data?.dataset) {
           setdfd_addcase_v1Props(
              Array.isArray(addcase_v1Data?.data?.dataset?.data)
                 ? addcase_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_addcase_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.addcase_v1) {
      addcase_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.addcase_v1= true
  },[refetch?.addcase_v1])
    async function doctypenamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let doctypenamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          doctypenamecombo_v1Body["dpdKey"] = encryptionDpd;
          doctypenamecombo_v1Body["method"] = encryptionMethod;
        }
        if(viewcase_v1Props.length > 0){
          for(let i=0;i< viewcase_v1Props.length;i++){
            if(viewcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"){
              // delete viewcase_v1Props[i].DFDkey;
              let temp=structuredClone(viewcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          doctypenamecombo_v1Body['filterData'] = filterData;
        }
        const doctypenamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",doctypenamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=doctypenamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(doctypenamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_doctypenamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_doctypenamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (doctypenamecombo_v1Data?.data?.dataset) {
           setdfd_doctypenamecombo_v1Props(
              Array.isArray(doctypenamecombo_v1Data?.data?.dataset?.data)
                 ? doctypenamecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_doctypenamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.doctypenamecombo_v1) {
      doctypenamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.doctypenamecombo_v1= true
  },[refetch?.doctypenamecombo_v1])
    async function amrchecklistcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let amrchecklistcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          amrchecklistcombo_v1Body["dpdKey"] = encryptionDpd;
          amrchecklistcombo_v1Body["method"] = encryptionMethod;
        }
        if(viewcase_v1Props.length > 0){
          for(let i=0;i< viewcase_v1Props.length;i++){
            if(viewcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1"){
              // delete viewcase_v1Props[i].DFDkey;
              let temp=structuredClone(viewcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          amrchecklistcombo_v1Body['filterData'] = filterData;
        }
        const amrchecklistcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",amrchecklistcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=amrchecklistcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(amrchecklistcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_amrchecklistcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_amrchecklistcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (amrchecklistcombo_v1Data?.data?.dataset) {
           setdfd_amrchecklistcombo_v1Props(
              Array.isArray(amrchecklistcombo_v1Data?.data?.dataset?.data)
                 ? amrchecklistcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_amrchecklistcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.amrchecklistcombo_v1) {
      amrchecklistcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.amrchecklistcombo_v1= true
  },[refetch?.amrchecklistcombo_v1])
    async function doctable_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let doctable_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          doctable_v1Body["dpdKey"] = encryptionDpd;
          doctable_v1Body["method"] = encryptionMethod;
        }
        if(viewcase_v1Props.length > 0){
          for(let i=0;i< viewcase_v1Props.length;i++){
            if(viewcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1"){
              // delete viewcase_v1Props[i].DFDkey;
              let temp=structuredClone(viewcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          doctable_v1Body['filterData'] = filterData;
        }
        const doctable_v1Data:any=await AxiosService.post("/te/eventEmitter",doctable_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=doctable_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(doctable_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_doctable_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_doctable_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (doctable_v1Data?.data?.dataset) {
           setdfd_doctable_v1Props(
              Array.isArray(doctable_v1Data?.data?.dataset?.data)
                 ? doctable_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_doctable_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.doctable_v1) {
      doctable_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.doctable_v1= true
  },[refetch?.doctable_v1])
    async function amrcheckliststatus_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let amrcheckliststatus_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          amrcheckliststatus_v1Body["dpdKey"] = encryptionDpd;
          amrcheckliststatus_v1Body["method"] = encryptionMethod;
        }
        if(viewcase_v1Props.length > 0){
          for(let i=0;i< viewcase_v1Props.length;i++){
            if(viewcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1"){
              // delete viewcase_v1Props[i].DFDkey;
              let temp=structuredClone(viewcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          amrcheckliststatus_v1Body['filterData'] = filterData;
        }
        const amrcheckliststatus_v1Data:any=await AxiosService.post("/te/eventEmitter",amrcheckliststatus_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=amrcheckliststatus_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(amrcheckliststatus_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_amrcheckliststatus_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_amrcheckliststatus_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (amrcheckliststatus_v1Data?.data?.dataset) {
           setdfd_amrcheckliststatus_v1Props(
              Array.isArray(amrcheckliststatus_v1Data?.data?.dataset?.data)
                 ? amrcheckliststatus_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_amrcheckliststatus_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.amrcheckliststatus_v1) {
      amrcheckliststatus_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.amrcheckliststatus_v1= true
  },[refetch?.amrcheckliststatus_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setviewcase_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1"
        }
      : { key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1" }

    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, introspect, myAccountRes]: [any, any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1',
        [user],
        'pageViewcaseV1',
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
    await addcase_v1DFD(pagination)
    await doctypenamecombo_v1DFD(pagination)
    await amrchecklistcombo_v1DFD(pagination)
    await doctable_v1DFD(pagination)
    await amrcheckliststatus_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'add_case_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadd_case_group(true)
            }
            if(nodes?.groupName == 'header_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckheader_group(true)
            }
            if(nodes?.groupName == 'case_information_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcase_information_group(true)
            }
            if(nodes?.groupName == 'venue_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvenue_group(true)
            }
            if(nodes?.groupName == 'georgia_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeorgia_group(true)
            }
            if(nodes?.groupName == 'georgias_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeorgias_group(true)
            }
            if(nodes?.groupName == 'georgias_groups' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeorgias_groups(true)
            }
            if(nodes?.groupName == 'georgiass_groups' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeorgiass_groups(true)
            }
            if(nodes?.groupName == 'georgsiass_groups' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgeorgsiass_groups(true)
            }
            if(nodes?.groupName == 'debtor_information_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdebtor_information_group(true)
            }
            if(nodes?.groupName == 'financial_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfinancial_details_group(true)
            }
            if(nodes?.groupName == 'venue_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvenue_details_group(true)
            }
            if(nodes?.groupName == 'required_dociument_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrequired_dociument_main_group(true)
            }
            if(nodes?.groupName == 'doc_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdoc_table(true)
            }
            if(nodes?.groupName == 'checklist_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_main_group(true)
            }
            if(nodes?.groupName == 'checklist_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_table(true)
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
          codeStates['add_case_group'] = add_case_group1f6e4;
          codeStates['setadd_case_group'] = setadd_case_group1f6e4;
          codeStates['header_group'] = header_group3749a;
          codeStates['setheader_group'] = setheader_group3749a;
          codeStates['case_information_group'] = case_information_groupcec29;
          codeStates['setcase_information_group'] = setcase_information_groupcec29;
          codeStates['venue_group'] = venue_groupa72d9;
          codeStates['setvenue_group'] = setvenue_groupa72d9;
          codeStates['georgia_group'] = georgia_groupa636c;
          codeStates['setgeorgia_group'] = setgeorgia_groupa636c;
          codeStates['georgias_group'] = georgias_groupbac01;
          codeStates['setgeorgias_group'] = setgeorgias_groupbac01;
          codeStates['georgias_groups'] = georgias_groupsbf356;
          codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356;
          codeStates['georgiass_groups'] = georgiass_groups9e4dd;
          codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd;
          codeStates['georgsiass_groups'] = georgsiass_groups6bf7a;
          codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a;
          codeStates['debtor_information_group'] = debtor_information_groupdfa55;
          codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55;
          codeStates['financial_details_group'] = financial_details_grouped0d9;
          codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9;
          codeStates['venue_details_group'] = venue_details_group6a27a;
          codeStates['setvenue_details_group'] = setvenue_details_group6a27a;
          codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b;
          codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b;
          codeStates['doc_table'] = doc_tablee79c7;
          codeStates['setdoc_table'] = setdoc_tablee79c7;
          codeStates['checklist_main_group'] = checklist_main_group5b62e;
          codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e;
          codeStates['checklist_table'] = checklist_table45abc;
          codeStates['setchecklist_table'] = setchecklist_table45abc;
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
    setviewcase_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(viewcase_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(viewcase_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setviewcase_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
        {checkadd_case_group && initialLoad &&<Groupadd_case_group
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
    