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

const TextInputstage_sequence = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'stage_sequence',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps;
  const {textfa52c, settextfa52c}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_id68938, setcert_stage_id68938}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence24d54, setstage_sequence24d54}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codeec1d6, setstage_type_codeec1d6}= useContext(TotalContext) as TotalContextProps;
  const {stage_namea95b4, setstage_namea95b4}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name7df9b, setassigned_login_name7df9b}= useContext(TotalContext) as TotalContextProps;
  const {decided_onf3d30, setdecided_onf3d30}= useContext(TotalContext) as TotalContextProps;
  const {opened_on9697d, setopened_on9697d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:undefined}}));
    if(dynamicStateandType.type=="number"){
    setstage_group_10fb7d((prev: any) => ({ ...prev, stage_sequence: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setstage_group_10fb7d((prev: any) => ({ ...prev, stage_sequence: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['cert_stage_group'] = cert_stage_groupf8b90,
        codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
        codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
        codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
        codeStates['asset_group'] = asset_group173fd,
        codeStates['setasset_group'] = setasset_group173fd,
        codeStates['asset_group173fd'] = asset_group173fdProps,
        codeStates['setasset_group173fd'] = setasset_group173fdProps,
        codeStates['stage_group_1'] = stage_group_10fb7d,
        codeStates['setstage_group_1'] = setstage_group_10fb7d,
        codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
        codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
        codeStates['text'] = textfa52c,
        codeStates['settext'] = settextfa52c,
        codeStates['cert_stage_id'] = cert_stage_id68938,
        codeStates['setcert_stage_id'] = setcert_stage_id68938,
        codeStates['stage_sequence'] = stage_sequence24d54,
        codeStates['setstage_sequence'] = setstage_sequence24d54,
        codeStates['stage_type_code'] = stage_type_codeec1d6,
        codeStates['setstage_type_code'] = setstage_type_codeec1d6,
        codeStates['stage_name'] = stage_namea95b4,
        codeStates['setstage_name'] = setstage_namea95b4,
        codeStates['assigned_login_name'] = assigned_login_name7df9b,
        codeStates['setassigned_login_name'] = setassigned_login_name7df9b,
        codeStates['decided_on'] = decided_onf3d30,
        codeStates['setdecided_on'] = setdecided_onf3d30,
        codeStates['opened_on'] = opened_on9697d,
        codeStates['setopened_on'] = setopened_on9697d,
        codeStates['stage_group_2'] = stage_group_24dcf0,
        codeStates['setstage_group_2'] = setstage_group_24dcf0,
        codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
        codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
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
      if(stage_group_10fb7d?.stage_sequence == "" || stage_group_10fb7d?.stage_sequence == undefined){
      stage_group_10fb7d.stage_sequence = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, stage_group_10fb7d?.stage_sequence);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:"invalid"}}));
        }
    }else if(stage_group_10fb7d?.stage_sequence !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +stage_group_10fb7d?.stage_sequence);
        }
        else{
          validate = v.safeParse(schema, stage_group_10fb7d?.stage_sequence);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(stage_group_10fb7d?.stage_sequence == "" || stage_group_10fb7d?.stage_sequence == undefined){
      stage_group_10fb7d.stage_sequence = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, stage_group_10fb7d?.stage_sequence);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:"invalid"}}));
        }
    }else if(stage_group_10fb7d?.stage_sequence !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +stage_group_10fb7d?.stage_sequence);
        }
        else{
          validate = v.safeParse(schema, stage_group_10fb7d?.stage_sequence);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,stage_sequence:undefined}}));
    }
    }
    if(!validate?.success){
      return
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "4f61f0334d1749399beb480b66f0fb7d",
        "b5b71d88bb094127bea9599a0d024d54"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:editCertificationStages:AFVK:v1",
      //     componentId: "4f61f0334d1749399beb480b66f0fb7d",
      //     controlId: "b5b71d88bb094127bea9599a0d024d54",
      //     isTable: false,
      //     from:"TextInputstage_sequence",
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
        setDynamicStateandType({name:'stage_sequence', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'stage_sequence',type:'text'};
      //   type={
      //     name:'stage_sequence',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_sequence.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_sequence.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_sequence.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'stage_sequence',type:'text'};
      //   type={
      //     name:'stage_sequence',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_sequence.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_sequence.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_sequence.type
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
  const stage_group_10fb7dRef = useRef<any>(stage_group_10fb7d);
  useEffect(() => { stage_group_10fb7dRef.current = stage_group_10fb7d; }, [stage_group_10fb7d]);
  useEffect(()=>{
      handleMapperValue();
      if(!stage_group_10fb7d?.stage_sequence)
      {
        setstage_group_10fb7dProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b5b71d88bb094127bea9599a0d024d54") {
        handleChange({target:{value:stage_group_10fb7dRef?.current?.stage_sequence||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b5b71d88bb094127bea9599a0d024d54") {
        handleBlur({target:{value:stage_group_10fb7dRef?.current?.stage_sequence||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (stage_sequence24d54?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={stage_group_10fb7d?.stage_sequence||""}
         disabled= {stage_sequence24d54?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Stage Sequence"
      errorMessage={error}
        validationState={validate?.editCertificationStages_v1?.stage_sequence ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstage_sequence
