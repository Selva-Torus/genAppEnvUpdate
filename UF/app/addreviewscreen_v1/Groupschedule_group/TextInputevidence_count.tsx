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
import { useGlobal } from '@/context/GlobalContext'
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

const TextInputevidence_count = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'evidence_count',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {text113556f, settext113556f}= useContext(TotalContext) as TotalContextProps;
  const {due_on4bc44, setdue_on4bc44}= useContext(TotalContext) as TotalContextProps;
  const {evidence_count4538e, setevidence_count4538e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_oncdec5, settrs_created_oncdec5}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addReviewScreen_v1:{...pre?.addReviewScreen_v1,evidence_count:undefined}}));
    if(dynamicStateandType.type=="number"){
    setschedule_groupc0bee((prev: any) => ({ ...prev, evidence_count: +e.target.value }));
    }
    else{
    setschedule_groupc0bee((prev: any) => ({ ...prev, evidence_count: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['text11'] = text113556f,
        codeStates['settext11'] = settext113556f,
        codeStates['due_on'] = due_on4bc44,
        codeStates['setdue_on'] = setdue_on4bc44,
        codeStates['evidence_count'] = evidence_count4538e,
        codeStates['setevidence_count'] = setevidence_count4538e,
        codeStates['trs_created_on'] = trs_created_oncdec5,
        codeStates['settrs_created_on'] = settrs_created_oncdec5,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,
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
        "4d49821bf244436a96aaeedbce5c0bee",
        "7b3adbafdae643b8b8755ec866b4538e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1",
      //     componentId: "4d49821bf244436a96aaeedbce5c0bee",
      //     controlId: "7b3adbafdae643b8b8755ec866b4538e",
      //     isTable: false,
      //     from:"TextInputevidence_count",
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
        setDynamicStateandType({name:'evidence_count', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'evidence_count',type:'text'};
      //   type={
      //     name:'evidence_count',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.evidence_count.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.evidence_count.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.evidence_count.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'evidence_count',type:'text'};
      //   type={
      //     name:'evidence_count',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.evidence_count.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.evidence_count.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.evidence_count.type
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
  const schedule_groupc0beeRef = useRef<any>(schedule_groupc0bee);
  useEffect(() => { schedule_groupc0beeRef.current = schedule_groupc0bee; }, [schedule_groupc0bee]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "7b3adbafdae643b8b8755ec866b4538e") {
        handleChange({target:{value:schedule_groupc0beeRef?.current?.evidence_count||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "7b3adbafdae643b8b8755ec866b4538e") {
        handleBlur({target:{value:schedule_groupc0beeRef?.current?.evidence_count||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (evidence_count4538e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={schedule_groupc0bee?.evidence_count||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Evidence Count"
      errorMessage={error}
        validationState={validate?.addReviewScreen_v1?.evidence_count ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputevidence_count
