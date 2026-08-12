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

export default function PageViewamrcasepggraphV1({ onReady }: { onReady?: () => void } = {}) {
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
    "account_id": {
      "show": false
    }
  },
  "header_group": {
    "back_bt": {
      "show": false
    },
    "craete_header_text": {
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
    "view_button": {
      "show": false
    }
  },
  "case_information_group": {
    "case_info_text": {
      "show": false
    },
    "debtor_name": {
      "show": false
    },
    "case_display_id": {
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
    },
    "creditor_name": {
      "show": false
    },
    "charge_off_date": {
      "show": false
    },
    "last_payment_date": {
      "show": false
    },
    "divider": {
      "show": false
    },
    "sol_expiry_date": {
      "show": false
    }
  },
  "card_group": {},
  "principal_group": {
    "principal_text": {
      "show": false
    },
    "principal": {
      "show": false
    }
  },
  "intrest_group": {
    "intrest_text": {
      "show": false
    },
    "interest": {
      "show": false
    }
  },
  "fees_group": {
    "fees_text": {
      "show": false
    },
    "fees": {
      "show": false
    }
  },
  "total_group": {
    "total_balance_text": {
      "show": false
    },
    "total_balance": {
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
    "dividers": {
      "show": false
    },
    "county": {
      "show": false
    },
    "dividerss": {
      "show": false
    },
    "court": {
      "show": false
    },
    "dividersss": {
      "show": false
    },
    "judge": {
      "show": false
    },
    "dividerssss": {
      "show": false
    },
    "filing_fee": {
      "show": false
    },
    "dividersssss": {
      "show": false
    },
    "service_method": {
      "show": false
    },
    "dividerssssss": {
      "show": false
    },
    "efile_system": {
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
  },
  "special_rules_group": {
    "special_rules_text": {
      "show": false
    }
  },
  "special_rules": {
    "dynamic_icon": {
      "show": false
    },
    "text": {
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
  const {viewamrcasepggraph_v1, setviewamrcasepggraph_v1} = useContext(TotalContext) as TotalContextProps;
  const {viewamrcasepggraph_v1Props, setviewamrcasepggraph_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkadd_case_group,setCheckadd_case_group,]=useState<boolean>(false);
  const [checkheader_group,setCheckheader_group,]=useState<boolean>(false);
  const [checkrequired_dociument_main_group,setCheckrequired_dociument_main_group,]=useState<boolean>(false);
  const [checkdoc_table,setCheckdoc_table,]=useState<boolean>(false);
  const [checkcase_information_group,setCheckcase_information_group,]=useState<boolean>(false);
  const [checkcard_group,setCheckcard_group,]=useState<boolean>(false);
  const [checkprincipal_group,setCheckprincipal_group,]=useState<boolean>(false);
  const [checkintrest_group,setCheckintrest_group,]=useState<boolean>(false);
  const [checkfees_group,setCheckfees_group,]=useState<boolean>(false);
  const [checktotal_group,setChecktotal_group,]=useState<boolean>(false);
  const [checkvenue_details_group,setCheckvenue_details_group,]=useState<boolean>(false);
  const [checkchecklist_main_group,setCheckchecklist_main_group,]=useState<boolean>(false);
  const [checkchecklist_table,setCheckchecklist_table,]=useState<boolean>(false);
  const [checkspecial_rules_group,setCheckspecial_rules_group,]=useState<boolean>(false);
  const [checkspecial_rules,setCheckspecial_rules,]=useState<boolean>(false);
  const {add_case_grouped126, setadd_case_grouped126} = useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8} = useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1} = useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7} = useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c} = useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709} = useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235} = useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b} = useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6} = useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3} = useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614} = useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466} = useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0} = useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f} = useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctypenamecombo_v1Props, setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctable_v1Props, setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrcheckliststatus_v1Props, setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_specialrulessurerealdb_v1Props, setdfd_specialrulessurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      specialrulessurerealdb_v1:false,
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
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
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
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
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
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistCombo:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
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
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
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
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
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
    async function specialrulessurerealdb_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let specialrulessurerealdb_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:specialRulesSurerealDB:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          specialrulessurerealdb_v1Body["dpdKey"] = encryptionDpd;
          specialrulessurerealdb_v1Body["method"] = encryptionMethod;
        }
        if(viewamrcasepggraph_v1Props.length > 0){
          for(let i=0;i< viewamrcasepggraph_v1Props.length;i++){
            if(viewamrcasepggraph_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:specialRulesSurerealDB:AFVK:v1"){
              // delete viewamrcasepggraph_v1Props[i].DFDkey;
              let temp=structuredClone(viewamrcasepggraph_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          specialrulessurerealdb_v1Body['filterData'] = filterData;
        }
        const specialrulessurerealdb_v1Data:any=await AxiosService.post("/te/eventEmitter",specialrulessurerealdb_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=specialrulessurerealdb_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(specialrulessurerealdb_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_specialrulessurerealdb_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_specialrulessurerealdb_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (specialrulessurerealdb_v1Data?.data?.dataset) {
           setdfd_specialrulessurerealdb_v1Props(
              Array.isArray(specialrulessurerealdb_v1Data?.data?.dataset?.data)
                 ? specialrulessurerealdb_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_specialrulessurerealdb_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.specialrulessurerealdb_v1) {
      specialrulessurerealdb_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.specialrulessurerealdb_v1= true
  },[refetch?.specialrulessurerealdb_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setviewamrcasepggraph_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1"
        }
      : { key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1" }

    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, introspect, myAccountRes]: [any, any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1',
        [user],
        'pageViewamrcasepggraphV1',
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
    await specialrulessurerealdb_v1DFD(pagination)
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
            if(nodes?.groupName == 'required_dociument_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckrequired_dociument_main_group(true)
            }
            if(nodes?.groupName == 'doc_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdoc_table(true)
            }
            if(nodes?.groupName == 'case_information_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcase_information_group(true)
            }
            if(nodes?.groupName == 'card_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcard_group(true)
            }
            if(nodes?.groupName == 'principal_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckprincipal_group(true)
            }
            if(nodes?.groupName == 'intrest_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckintrest_group(true)
            }
            if(nodes?.groupName == 'fees_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfees_group(true)
            }
            if(nodes?.groupName == 'total_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_group(true)
            }
            if(nodes?.groupName == 'venue_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckvenue_details_group(true)
            }
            if(nodes?.groupName == 'checklist_main_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_main_group(true)
            }
            if(nodes?.groupName == 'checklist_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckchecklist_table(true)
            }
            if(nodes?.groupName == 'special_rules_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckspecial_rules_group(true)
            }
            if(nodes?.groupName == 'special_rules' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckspecial_rules(true)
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
          codeStates['add_case_group'] = add_case_grouped126;
          codeStates['setadd_case_group'] = setadd_case_grouped126;
          codeStates['header_group'] = header_groupbd8a8;
          codeStates['setheader_group'] = setheader_groupbd8a8;
          codeStates['required_dociument_main_group'] = required_dociument_main_group255d1;
          codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1;
          codeStates['doc_table'] = doc_table9c4f7;
          codeStates['setdoc_table'] = setdoc_table9c4f7;
          codeStates['case_information_group'] = case_information_group48f3c;
          codeStates['setcase_information_group'] = setcase_information_group48f3c;
          codeStates['card_group'] = card_group4c709;
          codeStates['setcard_group'] = setcard_group4c709;
          codeStates['principal_group'] = principal_group42235;
          codeStates['setprincipal_group'] = setprincipal_group42235;
          codeStates['intrest_group'] = intrest_group65c3b;
          codeStates['setintrest_group'] = setintrest_group65c3b;
          codeStates['fees_group'] = fees_group8c4a6;
          codeStates['setfees_group'] = setfees_group8c4a6;
          codeStates['total_group'] = total_groupc52d3;
          codeStates['settotal_group'] = settotal_groupc52d3;
          codeStates['venue_details_group'] = venue_details_group51614;
          codeStates['setvenue_details_group'] = setvenue_details_group51614;
          codeStates['checklist_main_group'] = checklist_main_group2b466;
          codeStates['setchecklist_main_group'] = setchecklist_main_group2b466;
          codeStates['checklist_table'] = checklist_tablecafb0;
          codeStates['setchecklist_table'] = setchecklist_tablecafb0;
          codeStates['special_rules_group'] = special_rules_group7ce9f;
          codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f;
          codeStates['special_rules'] = special_rules7f109;
          codeStates['setspecial_rules'] = setspecial_rules7f109;
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
    setviewamrcasepggraph_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(viewamrcasepggraph_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(viewamrcasepggraph_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setviewamrcasepggraph_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("!text-blue-700",
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
    