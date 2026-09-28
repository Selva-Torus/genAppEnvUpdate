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

const TextInputsequence_no = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'sequence_no',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_group111bb, setadd_group111bb}= useContext(TotalContext) as TotalContextProps;
  const {add_group111bbProps, setadd_group111bbProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50, setadd_rule_conditiona9c50}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50Props, setadd_rule_conditiona9c50Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id67700, setrisk_rule_id67700}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no29818, setsequence_no29818}= useContext(TotalContext) as TotalContextProps;
  const {operator_code042cd, setoperator_code042cd}= useContext(TotalContext) as TotalContextProps;
  const {compare_value0b503, setcompare_value0b503}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name05959, setattribute_name05959}= useContext(TotalContext) as TotalContextProps;
  const {is_activecad18, setis_activecad18}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461, setdynamicactions0c461}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461Props, setdynamicactions0c461Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addRiskRuleCondition_v1:{...pre?.addRiskRuleCondition_v1,sequence_no:undefined}}));
    if(dynamicStateandType.type=="number"){
    setadd_rule_conditiona9c50((prev: any) => ({ ...prev, sequence_no: +e.target.value }));
    }
    else{
    setadd_rule_conditiona9c50((prev: any) => ({ ...prev, sequence_no: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group111bb,
        codeStates['setadd_group'] = setadd_group111bb,
        codeStates['add_group111bb'] = add_group111bbProps,
        codeStates['setadd_group111bb'] = setadd_group111bbProps,
        codeStates['add_rule_condition'] = add_rule_conditiona9c50,
        codeStates['setadd_rule_condition'] = setadd_rule_conditiona9c50,
        codeStates['add_rule_conditiona9c50'] = add_rule_conditiona9c50Props,
        codeStates['setadd_rule_conditiona9c50'] = setadd_rule_conditiona9c50Props,
        codeStates['risk_rule_id'] = risk_rule_id67700,
        codeStates['setrisk_rule_id'] = setrisk_rule_id67700,
        codeStates['sequence_no'] = sequence_no29818,
        codeStates['setsequence_no'] = setsequence_no29818,
        codeStates['operator_code'] = operator_code042cd,
        codeStates['setoperator_code'] = setoperator_code042cd,
        codeStates['compare_value'] = compare_value0b503,
        codeStates['setcompare_value'] = setcompare_value0b503,
        codeStates['attribute_name'] = attribute_name05959,
        codeStates['setattribute_name'] = setattribute_name05959,
        codeStates['is_active'] = is_activecad18,
        codeStates['setis_active'] = setis_activecad18,
        codeStates['dynamicactions'] = dynamicactions0c461,
        codeStates['setdynamicactions'] = setdynamicactions0c461,
        codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
        codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,
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
        "97dc0160feae252158b073e5b1da9c50",
        "d9998fec19fe4940278c6d6083e29818"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRiskRuleCondition:AFVK:v1",
      //     componentId: "97dc0160feae252158b073e5b1da9c50",
      //     controlId: "d9998fec19fe4940278c6d6083e29818",
      //     isTable: false,
      //     from:"TextInputsequence_no",
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
        setDynamicStateandType({name:'sequence_no', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'sequence_no',type:'text'};
      //   type={
      //     name:'sequence_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sequence_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sequence_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sequence_no.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'sequence_no',type:'text'};
      //   type={
      //     name:'sequence_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sequence_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sequence_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sequence_no.type
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
  const add_rule_conditiona9c50Ref = useRef<any>(add_rule_conditiona9c50);
  useEffect(() => { add_rule_conditiona9c50Ref.current = add_rule_conditiona9c50; }, [add_rule_conditiona9c50]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d9998fec19fe4940278c6d6083e29818") {
        handleChange({target:{value:add_rule_conditiona9c50Ref?.current?.sequence_no||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d9998fec19fe4940278c6d6083e29818") {
        handleBlur({target:{value:add_rule_conditiona9c50Ref?.current?.sequence_no||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (sequence_no29818?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `2 / 14`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={add_rule_conditiona9c50?.sequence_no||""}
         disabled= {sequence_no29818?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Sequence No"
      errorMessage={error}
        validationState={validate?.addRiskRuleCondition_v1?.sequence_no ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsequence_no
