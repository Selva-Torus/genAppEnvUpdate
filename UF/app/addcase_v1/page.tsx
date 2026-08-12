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

const Groupadd_case_group = dynamic(() => import("./Groupadd_case_group/Groupadd_case_group"), { ssr: false });

export default function PageAddcaseV1({ onReady }: { onReady?: () => void } = {}) {
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
    "customwidget": {
      "show": false
    },
    "account_id": {
      "show": false
    },
    "remarks_textarea": {
      "show": false
    }
  },
  "header_group": {
    "craete_header_text": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel_button": {
      "show": false
    },
    "update": {
      "show": false
    },
    "submit": {
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
    "priority_name": {
      "show": false
    },
    "status_name": {
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
    "venue_special_rules_dividerssss": {
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
    "speciasls_ruless": {
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
    },
    "description_text": {
      "show": false
    }
  },
  "required_dociument_header_group": {},
  "doc_type_table": {
    "doc_type_id": {
      "show": false
    },
    "doc_type_name": {
      "show": false
    },
    "uploader": {
      "show": false
    },
    "doc_reference_url": {
      "show": false
    }
  },
  "checklist_main_group": {
    "valid_checklist_text": {
      "show": false
    }
  },
  "checklist_group": {},
  "checklist_table": {
    "checklist_item_id": {
      "show": false
    },
    "item_name": {
      "show": false
    },
    "is_complete": {
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
  const {addcase_v1, setaddcase_v1} = useContext(TotalContext) as TotalContextProps;
  const {addcase_v1Props, setaddcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkadd_case_group,setCheckadd_case_group,]=useState<boolean>(false);
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
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
  const [checkrequired_dociument_header_group,setCheckrequired_dociument_header_group,]=useState<boolean>(false);
  const [checkdoc_type_table,setCheckdoc_type_table,]=useState<boolean>(false);
  const [checkchecklist_main_group,setCheckchecklist_main_group,]=useState<boolean>(false);
  const [checkchecklist_group,setCheckchecklist_group,]=useState<boolean>(false);
  const [checkchecklist_table,setCheckchecklist_table,]=useState<boolean>(false);
  const {add_case_groupeb161, setadd_case_groupeb161} = useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3} = useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f} = useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d} = useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18, setgeorgia_group0fa18} = useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd, setgeorgias_group945fd} = useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f, setgeorgias_groups6f85f} = useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87, setgeorgiass_groups86a87} = useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a} = useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70} = useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47} = useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6} = useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92} = useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8} = useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa} = useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b} = useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d} = useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctypenamecombo_v1Props, setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_attorneyscombo_v1Props, setdfd_attorneyscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statuscombo_v1Props, setdfd_statuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      attorneyscombo_v1:false,
      prioritycombo_v1:false,
      statuscombo_v1:false,
      amrchecklistcombo_v1:false,
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
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
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
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
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
    async function attorneyscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let attorneyscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:attorneysCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          attorneyscombo_v1Body["dpdKey"] = encryptionDpd;
          attorneyscombo_v1Body["method"] = encryptionMethod;
        }
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:attorneysCombo:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          attorneyscombo_v1Body['filterData'] = filterData;
        }
        const attorneyscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",attorneyscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=attorneyscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(attorneyscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_attorneyscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_attorneyscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (attorneyscombo_v1Data?.data?.dataset) {
           setdfd_attorneyscombo_v1Props(
              Array.isArray(attorneyscombo_v1Data?.data?.dataset?.data)
                 ? attorneyscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_attorneyscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.attorneyscombo_v1) {
      attorneyscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.attorneyscombo_v1= true
  },[refetch?.attorneyscombo_v1])
    async function prioritycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let prioritycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:priorityCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          prioritycombo_v1Body["dpdKey"] = encryptionDpd;
          prioritycombo_v1Body["method"] = encryptionMethod;
        }
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:priorityCombo:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          prioritycombo_v1Body['filterData'] = filterData;
        }
        const prioritycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",prioritycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=prioritycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(prioritycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_prioritycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_prioritycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (prioritycombo_v1Data?.data?.dataset) {
           setdfd_prioritycombo_v1Props(
              Array.isArray(prioritycombo_v1Data?.data?.dataset?.data)
                 ? prioritycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_prioritycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.prioritycombo_v1) {
      prioritycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.prioritycombo_v1= true
  },[refetch?.prioritycombo_v1])
    async function statuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let statuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:statusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          statuscombo_v1Body["dpdKey"] = encryptionDpd;
          statuscombo_v1Body["method"] = encryptionMethod;
        }
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:statusCombo:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          statuscombo_v1Body['filterData'] = filterData;
        }
        const statuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",statuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=statuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(statuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_statuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_statuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (statuscombo_v1Data?.data?.dataset) {
           setdfd_statuscombo_v1Props(
              Array.isArray(statuscombo_v1Data?.data?.dataset?.data)
                 ? statuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_statuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.statuscombo_v1) {
      statuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.statuscombo_v1= true
  },[refetch?.statuscombo_v1])
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
        if(addcase_v1Props.length > 0){
          for(let i=0;i< addcase_v1Props.length;i++){
            if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1"){
              // delete addcase_v1Props[i].DFDkey;
              let temp=structuredClone(addcase_v1Props[i])
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
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setaddcase_v1({...result,_artfactPFRule_:rule})
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
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1"
        }
      : { key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1" }

    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1',
        [user],
        'pageAddcaseV1',
        token
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
     const res = await fetch(`${basePath}/next-api/auth/introspect?key=Logs screen`)
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
    await addcase_v1DFD(pagination)
    await doctypenamecombo_v1DFD(pagination)
    await attorneyscombo_v1DFD(pagination)
    await prioritycombo_v1DFD(pagination)
    await statuscombo_v1DFD(pagination)
    await amrchecklistcombo_v1DFD(pagination)
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
            if(nodes?.groupName == 'dynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactions(true)
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
            if(nodes?.groupName == 'required_dociument_header_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrequired_dociument_header_group(true)
            }
            if(nodes?.groupName == 'doc_type_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdoc_type_table(true)
            }
            if(nodes?.groupName == 'checklist_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_main_group(true)
            }
            if(nodes?.groupName == 'checklist_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_group(true)
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
          codeStates['add_case_group'] = add_case_groupeb161;
          codeStates['setadd_case_group'] = setadd_case_groupeb161;
          codeStates['header_group'] = header_group4878f;
          codeStates['setheader_group'] = setheader_group4878f;
          codeStates['dynamicactions'] = dynamicactions094c3;
          codeStates['setdynamicactions'] = setdynamicactions094c3;
          codeStates['case_information_group'] = case_information_group28f6f;
          codeStates['setcase_information_group'] = setcase_information_group28f6f;
          codeStates['venue_group'] = venue_group6a36d;
          codeStates['setvenue_group'] = setvenue_group6a36d;
          codeStates['georgia_group'] = georgia_group0fa18;
          codeStates['setgeorgia_group'] = setgeorgia_group0fa18;
          codeStates['georgias_group'] = georgias_group945fd;
          codeStates['setgeorgias_group'] = setgeorgias_group945fd;
          codeStates['georgias_groups'] = georgias_groups6f85f;
          codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f;
          codeStates['georgiass_groups'] = georgiass_groups86a87;
          codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87;
          codeStates['georgsiass_groups'] = georgsiass_groupsb044a;
          codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a;
          codeStates['debtor_information_group'] = debtor_information_group78a70;
          codeStates['setdebtor_information_group'] = setdebtor_information_group78a70;
          codeStates['financial_details_group'] = financial_details_group52f47;
          codeStates['setfinancial_details_group'] = setfinancial_details_group52f47;
          codeStates['venue_details_group'] = venue_details_group17ac6;
          codeStates['setvenue_details_group'] = setvenue_details_group17ac6;
          codeStates['required_dociument_main_group'] = required_dociument_main_group04e92;
          codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92;
          codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8;
          codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8;
          codeStates['doc_type_table'] = doc_type_tablebe9fa;
          codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa;
          codeStates['checklist_main_group'] = checklist_main_group0df6b;
          codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b;
          codeStates['checklist_group'] = checklist_group32b3d;
          codeStates['setchecklist_group'] = setchecklist_group32b3d;
          codeStates['checklist_table'] = checklist_table198e1;
          codeStates['setchecklist_table'] = setchecklist_table198e1;
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
    routes.push("/amrqueuetable_v1");
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
    setaddcase_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(addcase_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(addcase_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setaddcase_v1((pre:any)=>({...pre,_selectedGroup_:""}))
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
    