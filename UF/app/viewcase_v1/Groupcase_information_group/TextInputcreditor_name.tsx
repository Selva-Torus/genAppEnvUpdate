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

const TextInputcreditor_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1|0b84a99163eb8dd425338976559dd501|properties.creditor_name"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1|19e9edfb1e7ccf7985bc9825117cec29|2f9cc118b46f24198329a710709257be"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'creditor_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps;
  const {case_info_textdf3f1, setcase_info_textdf3f1}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name257be, setcreditor_name257be}= useContext(TotalContext) as TotalContextProps;
  const {attorney_name87be1, setattorney_name87be1}= useContext(TotalContext) as TotalContextProps;
  const {status_namea5f92, setstatus_namea5f92}= useContext(TotalContext) as TotalContextProps;
  const {priority_name449dd, setpriority_name449dd}= useContext(TotalContext) as TotalContextProps;
  const {queue_positionceb8d, setqueue_positionceb8d}= useContext(TotalContext) as TotalContextProps;
  const {quality_scoredfaa9, setquality_scoredfaa9}= useContext(TotalContext) as TotalContextProps;
  const {sla_wait_start_time20502, setsla_wait_start_time20502}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewCase_v1:{...pre?.viewCase_v1,creditor_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_groupcec29((prev: any) => ({ ...prev, creditor_name: +e.target.value }));
    }
    else{
    setcase_information_groupcec29((prev: any) => ({ ...prev, creditor_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_group1f6e4,
        codeStates['setadd_case_group'] = setadd_case_group1f6e4,
        codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
        codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
        codeStates['header_group'] = header_group3749a,
        codeStates['setheader_group'] = setheader_group3749a,
        codeStates['header_group3749a'] = header_group3749aProps,
        codeStates['setheader_group3749a'] = setheader_group3749aProps,
        codeStates['case_information_group'] = case_information_groupcec29,
        codeStates['setcase_information_group'] = setcase_information_groupcec29,
        codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
        codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
        codeStates['case_info_text'] = case_info_textdf3f1,
        codeStates['setcase_info_text'] = setcase_info_textdf3f1,
        codeStates['creditor_name'] = creditor_name257be,
        codeStates['setcreditor_name'] = setcreditor_name257be,
        codeStates['attorney_name'] = attorney_name87be1,
        codeStates['setattorney_name'] = setattorney_name87be1,
        codeStates['status_name'] = status_namea5f92,
        codeStates['setstatus_name'] = setstatus_namea5f92,
        codeStates['priority_name'] = priority_name449dd,
        codeStates['setpriority_name'] = setpriority_name449dd,
        codeStates['queue_position'] = queue_positionceb8d,
        codeStates['setqueue_position'] = setqueue_positionceb8d,
        codeStates['quality_score'] = quality_scoredfaa9,
        codeStates['setquality_score'] = setquality_scoredfaa9,
        codeStates['sla_wait_start_time'] = sla_wait_start_time20502,
        codeStates['setsla_wait_start_time'] = setsla_wait_start_time20502,
        codeStates['venue_group'] = venue_groupa72d9,
        codeStates['setvenue_group'] = setvenue_groupa72d9,
        codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
        codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
        codeStates['georgia_group'] = georgia_groupa636c,
        codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
        codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
        codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
        codeStates['georgias_group'] = georgias_groupbac01,
        codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
        codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
        codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
        codeStates['georgias_groups'] = georgias_groupsbf356,
        codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
        codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
        codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
        codeStates['georgiass_groups'] = georgiass_groups9e4dd,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
        codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
        codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
        codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
        codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
        codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
        codeStates['debtor_information_group'] = debtor_information_groupdfa55,
        codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
        codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
        codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
        codeStates['financial_details_group'] = financial_details_grouped0d9,
        codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
        codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
        codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
        codeStates['venue_details_group'] = venue_details_group6a27a,
        codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
        codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
        codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
        codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
        codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
        codeStates['doc_table'] = doc_tablee79c7,
        codeStates['setdoc_table'] = setdoc_tablee79c7,
        codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
        codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
        codeStates['checklist_main_group'] = checklist_main_group5b62e,
        codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
        codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
        codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
        codeStates['checklist_table'] = checklist_table45abc,
        codeStates['setchecklist_table'] = setchecklist_table45abc,
        codeStates['checklist_table45abc'] = checklist_table45abcProps,
        codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,
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
        "19e9edfb1e7ccf7985bc9825117cec29",
        "2f9cc118b46f24198329a710709257be"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1",
      //     componentId: "19e9edfb1e7ccf7985bc9825117cec29",
      //     controlId: "2f9cc118b46f24198329a710709257be",
      //     isTable: false,
      //     from:"TextInputcreditor_name",
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
        setDynamicStateandType({name:'creditor_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'creditor_name',type:'text'};
      //   type={
      //     name:'creditor_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.creditor_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.creditor_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.creditor_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'creditor_name',type:'text'};
      //   type={
      //     name:'creditor_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.creditor_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.creditor_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.creditor_name.type
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
  const case_information_groupcec29Ref = useRef<any>(case_information_groupcec29);
  useEffect(() => { case_information_groupcec29Ref.current = case_information_groupcec29; }, [case_information_groupcec29]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "2f9cc118b46f24198329a710709257be") {
        handleChange({target:{value:case_information_groupcec29Ref?.current?.creditor_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "2f9cc118b46f24198329a710709257be") {
        handleBlur({target:{value:case_information_groupcec29Ref?.current?.creditor_name||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_addcase_v1Props?.setSearchFilters && dfd_addcase_v1Props?.data)
  {
    if(Array.isArray(dfd_addcase_v1Props.data) && dfd_addcase_v1Props.data.length > 0){
      setcase_information_groupcec29((pre:any)=>({...pre,creditor_name:dfd_addcase_v1Props.data[0]?.creditor_name}));
    }
  }
  },[dfd_addcase_v1Props?.setSearchFilters])
  if (creditor_name257be?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `11 / 23`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={case_information_groupcec29?.creditor_name||""}
         disabled= {creditor_name257be?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Creditor Name'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Creditor"
      errorMessage={error}
        validationState={validate?.viewCase_v1?.creditor_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcreditor_name
