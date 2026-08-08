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

const TextInputqueue_position = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1|0b84a99163eb8dd425338976559dd501|properties.queue_position"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1|765fc890b6a2413b897557a765428f6f|4b192990c368495f8bd9d1a9415049be"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'queue_position',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {case_info_text1f2c8, setcase_info_text1f2c8}= useContext(TotalContext) as TotalContextProps;
  const {creditor_namef8de4, setcreditor_namef8de4}= useContext(TotalContext) as TotalContextProps;
  const {attorney_name073fd, setattorney_name073fd}= useContext(TotalContext) as TotalContextProps;
  const {priority_namebcbd5, setpriority_namebcbd5}= useContext(TotalContext) as TotalContextProps;
  const {status_namecbe6f, setstatus_namecbe6f}= useContext(TotalContext) as TotalContextProps;
  const {queue_position049be, setqueue_position049be}= useContext(TotalContext) as TotalContextProps;
  const {quality_score2c29e, setquality_score2c29e}= useContext(TotalContext) as TotalContextProps;
  const {sla_wait_start_time2fb95, setsla_wait_start_time2fb95}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCase_v1:{...pre?.addCase_v1,queue_position:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_group28f6f((prev: any) => ({ ...prev, queue_position: +e.target.value }));
    }
    else{
    setcase_information_group28f6f((prev: any) => ({ ...prev, queue_position: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_groupeb161,
        codeStates['setadd_case_group'] = setadd_case_groupeb161,
        codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
        codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
        codeStates['header_group'] = header_group4878f,
        codeStates['setheader_group'] = setheader_group4878f,
        codeStates['header_group4878f'] = header_group4878fProps,
        codeStates['setheader_group4878f'] = setheader_group4878fProps,
        codeStates['dynamicactions'] = dynamicactions094c3,
        codeStates['setdynamicactions'] = setdynamicactions094c3,
        codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
        codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
        codeStates['case_information_group'] = case_information_group28f6f,
        codeStates['setcase_information_group'] = setcase_information_group28f6f,
        codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
        codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
        codeStates['case_info_text'] = case_info_text1f2c8,
        codeStates['setcase_info_text'] = setcase_info_text1f2c8,
        codeStates['creditor_name'] = creditor_namef8de4,
        codeStates['setcreditor_name'] = setcreditor_namef8de4,
        codeStates['attorney_name'] = attorney_name073fd,
        codeStates['setattorney_name'] = setattorney_name073fd,
        codeStates['priority_name'] = priority_namebcbd5,
        codeStates['setpriority_name'] = setpriority_namebcbd5,
        codeStates['status_name'] = status_namecbe6f,
        codeStates['setstatus_name'] = setstatus_namecbe6f,
        codeStates['queue_position'] = queue_position049be,
        codeStates['setqueue_position'] = setqueue_position049be,
        codeStates['quality_score'] = quality_score2c29e,
        codeStates['setquality_score'] = setquality_score2c29e,
        codeStates['sla_wait_start_time'] = sla_wait_start_time2fb95,
        codeStates['setsla_wait_start_time'] = setsla_wait_start_time2fb95,
        codeStates['venue_group'] = venue_group6a36d,
        codeStates['setvenue_group'] = setvenue_group6a36d,
        codeStates['venue_group6a36d'] = venue_group6a36dProps,
        codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
        codeStates['georgia_group'] = georgia_group0fa18,
        codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
        codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
        codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
        codeStates['georgias_group'] = georgias_group945fd,
        codeStates['setgeorgias_group'] = setgeorgias_group945fd,
        codeStates['georgias_group945fd'] = georgias_group945fdProps,
        codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
        codeStates['georgias_groups'] = georgias_groups6f85f,
        codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
        codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
        codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
        codeStates['georgiass_groups'] = georgiass_groups86a87,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
        codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
        codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
        codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
        codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
        codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
        codeStates['debtor_information_group'] = debtor_information_group78a70,
        codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
        codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
        codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
        codeStates['financial_details_group'] = financial_details_group52f47,
        codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
        codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
        codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
        codeStates['venue_details_group'] = venue_details_group17ac6,
        codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
        codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
        codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
        codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
        codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
        codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
        codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
        codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
        codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
        codeStates['doc_type_table'] = doc_type_tablebe9fa,
        codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
        codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
        codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
        codeStates['checklist_main_group'] = checklist_main_group0df6b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
        codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
        codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
        codeStates['checklist_group'] = checklist_group32b3d,
        codeStates['setchecklist_group'] = setchecklist_group32b3d,
        codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
        codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
        codeStates['checklist_table'] = checklist_table198e1,
        codeStates['setchecklist_table'] = setchecklist_table198e1,
        codeStates['checklist_table198e1'] = checklist_table198e1Props,
        codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,
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
        "765fc890b6a2413b897557a765428f6f",
        "4b192990c368495f8bd9d1a9415049be"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",
      //     componentId: "765fc890b6a2413b897557a765428f6f",
      //     controlId: "4b192990c368495f8bd9d1a9415049be",
      //     isTable: false,
      //     from:"TextInputqueue_position",
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
        setDynamicStateandType({name:'queue_position', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'queue_position',type:'text'};
      //   type={
      //     name:'queue_position',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.queue_position.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.queue_position.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.queue_position.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'queue_position',type:'text'};
      //   type={
      //     name:'queue_position',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.queue_position.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.queue_position.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.queue_position.type
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
  const case_information_group28f6fRef = useRef<any>(case_information_group28f6f);
  useEffect(() => { case_information_group28f6fRef.current = case_information_group28f6f; }, [case_information_group28f6f]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "4b192990c368495f8bd9d1a9415049be") {
        handleChange({target:{value:case_information_group28f6fRef?.current?.queue_position||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "4b192990c368495f8bd9d1a9415049be") {
        handleBlur({target:{value:case_information_group28f6fRef?.current?.queue_position||""}});
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
      setcase_information_group28f6f((pre:any)=>({...pre,queue_position:dfd_addcase_v1Props.data[0]?.queue_position}));
    }
  }
  },[dfd_addcase_v1Props?.setSearchFilters])
  if (queue_position049be?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `39 / 51`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={case_information_group28f6f?.queue_position||""}
         disabled= {queue_position049be?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter The Position'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Queue Position"
      errorMessage={error}
        validationState={validate?.addCase_v1?.queue_position ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputqueue_position
