'use client'




import React, { useState,useContext,useEffect, useRef } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const TextInputstatus = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allState:any = useContext(TotalContext) as TotalContextProps
  const actionDetails : any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'status',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {header_groupf778a, setheader_groupf778a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf778aProps, setheader_groupf778aProps}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cbProps, sethrm_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9, settotal_employees_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9Props, settotal_employees_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4Props, setpending_access_req_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5, setleave_requests_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5Props, setleave_requests_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580d, setonboarding_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580dProps, setonboarding_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6f, settable_groupe0a6f}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6fProps, settable_groupe0a6fProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010, setsubscreen1c010}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010Props, setsubscreen1c010Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008, setemployee_table_group55008}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008Props, setemployee_table_group55008Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40b, setemp_group5e40b}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40bProps, setemp_group5e40bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9dProps, settotal_employee_tablee4e9dProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258, setaccess_req_groupb1258}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258Props, setaccess_req_groupb1258Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167, setacc_group3b167}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167Props, setacc_group3b167Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aac, setaccess_req_tablec5aac}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aacProps, setaccess_req_tablec5aacProps}= useContext(TotalContext) as TotalContextProps;
  const {statuscae93, setstatuscae93}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
    function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }
  const handleChange = async(e: any) => {
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,hrmDashboard_v1:{...pre?.hrmDashboard_v1,status:undefined}}));
    if(dynamicStateandType.type=="number"){
    settable_groupe0a6f((prev: any) => ({ ...prev, status: +e.target.value }));
    }
    else{
    settable_groupe0a6f((prev: any) => ({ ...prev, status: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupf778a,
        codeStates['setheader_group'] = setheader_groupf778a,
        codeStates['header_groupf778a'] = header_groupf778aProps,
        codeStates['setheader_groupf778a'] = setheader_groupf778aProps,
        codeStates['hrm_dashboard_group'] = hrm_dashboard_group4d6cb,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_group4d6cb,
        codeStates['hrm_dashboard_group4d6cb'] = hrm_dashboard_group4d6cbProps,
        codeStates['sethrm_dashboard_group4d6cb'] = sethrm_dashboard_group4d6cbProps,
        codeStates['total_employees_group'] = total_employees_group69aa9,
        codeStates['settotal_employees_group'] = settotal_employees_group69aa9,
        codeStates['total_employees_group69aa9'] = total_employees_group69aa9Props,
        codeStates['settotal_employees_group69aa9'] = settotal_employees_group69aa9Props,
        codeStates['pending_access_req_group'] = pending_access_req_groupb5bd4,
        codeStates['setpending_access_req_group'] = setpending_access_req_groupb5bd4,
        codeStates['pending_access_req_groupb5bd4'] = pending_access_req_groupb5bd4Props,
        codeStates['setpending_access_req_groupb5bd4'] = setpending_access_req_groupb5bd4Props,
        codeStates['leave_requests_group'] = leave_requests_group4beb5,
        codeStates['setleave_requests_group'] = setleave_requests_group4beb5,
        codeStates['leave_requests_group4beb5'] = leave_requests_group4beb5Props,
        codeStates['setleave_requests_group4beb5'] = setleave_requests_group4beb5Props,
        codeStates['onboarding_group'] = onboarding_group2580d,
        codeStates['setonboarding_group'] = setonboarding_group2580d,
        codeStates['onboarding_group2580d'] = onboarding_group2580dProps,
        codeStates['setonboarding_group2580d'] = setonboarding_group2580dProps,
        codeStates['table_group'] = table_groupe0a6f,
        codeStates['settable_group'] = settable_groupe0a6f,
        codeStates['table_groupe0a6f'] = table_groupe0a6fProps,
        codeStates['settable_groupe0a6f'] = settable_groupe0a6fProps,
        codeStates['subscreen'] = subscreen1c010,
        codeStates['setsubscreen'] = setsubscreen1c010,
        codeStates['subscreen1c010'] = subscreen1c010Props,
        codeStates['setsubscreen1c010'] = setsubscreen1c010Props,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['employee_table_group'] = employee_table_group55008,
        codeStates['setemployee_table_group'] = setemployee_table_group55008,
        codeStates['employee_table_group55008'] = employee_table_group55008Props,
        codeStates['setemployee_table_group55008'] = setemployee_table_group55008Props,
        codeStates['emp_group'] = emp_group5e40b,
        codeStates['setemp_group'] = setemp_group5e40b,
        codeStates['emp_group5e40b'] = emp_group5e40bProps,
        codeStates['setemp_group5e40b'] = setemp_group5e40bProps,
        codeStates['total_employee_table'] = total_employee_tablee4e9d,
        codeStates['settotal_employee_table'] = settotal_employee_tablee4e9d,
        codeStates['total_employee_tablee4e9d'] = total_employee_tablee4e9dProps,
        codeStates['settotal_employee_tablee4e9d'] = settotal_employee_tablee4e9dProps,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['access_req_group'] = access_req_groupb1258,
        codeStates['setaccess_req_group'] = setaccess_req_groupb1258,
        codeStates['access_req_groupb1258'] = access_req_groupb1258Props,
        codeStates['setaccess_req_groupb1258'] = setaccess_req_groupb1258Props,
        codeStates['acc_group'] = acc_group3b167,
        codeStates['setacc_group'] = setacc_group3b167,
        codeStates['acc_group3b167'] = acc_group3b167Props,
        codeStates['setacc_group3b167'] = setacc_group3b167Props,
        codeStates['access_req_table'] = access_req_tablec5aac,
        codeStates['setaccess_req_table'] = setaccess_req_tablec5aac,
        codeStates['access_req_tablec5aac'] = access_req_tablec5aacProps,
        codeStates['setaccess_req_tablec5aac'] = setaccess_req_tablec5aacProps,
        codeStates['status'] = statuscae93,
        codeStates['setstatus'] = setstatuscae93,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "19c25e7435d84f47b274d4aef2fe0a6f",
        "dcd5254146604538b13d8c98c18cae93"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1",
      //     componentId: "19c25e7435d84f47b274d4aef2fe0a6f",
      //     controlId: "dcd5254146604538b13d8c98c18cae93",
      //     isTable: false,
      //     from:"TextInputstatus",
      //     accessProfile:accessProfile
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      // if(orchestrationData?.data?.error == true){
       
      //   return
      // }
      setAllCode(orchestrationData?.data?.code);
      if (orchestrationData?.data?.dataType ==='integer' || orchestrationData?.data?.dataType ==='number') {
        setDynamicStateandType({name:'status', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const table_groupe0a6fRef = useRef<any>(table_groupe0a6f);
  useEffect(() => { table_groupe0a6fRef.current = table_groupe0a6f; }, [table_groupe0a6f]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "dcd5254146604538b13d8c98c18cae93") {
        handleChange({target:{value:table_groupe0a6fRef?.current?.status||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "dcd5254146604538b13d8c98c18cae93") {
        handleBlur({target:{value:table_groupe0a6fRef?.current?.status||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (statuscae93?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `23 / 25`,gridRow: `111 / 112`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={table_groupe0a6f?.status||""}
         disabled= {statuscae93?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.hrmDashboard_v1?.status ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstatus
