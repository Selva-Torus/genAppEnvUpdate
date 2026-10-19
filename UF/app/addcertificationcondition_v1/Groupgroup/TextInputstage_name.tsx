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

const TextInputstage_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'stage_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule9eda4, setinfo_rule9eda4}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef85b6, setstage_namef85b6}= useContext(TotalContext) as TotalContextProps;
  const {status_codeb8e30, setstatus_codeb8e30}= useContext(TotalContext) as TotalContextProps;
  const {condition_text4da2f, setcondition_text4da2f}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,stage_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup85ee1((prev: any) => ({ ...prev, stage_name: +e.target.value }));
    }
    else{
    setgroup85ee1((prev: any) => ({ ...prev, stage_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['info_rule'] = info_rule9eda4,
        codeStates['setinfo_rule'] = setinfo_rule9eda4,
        codeStates['stage_name'] = stage_namef85b6,
        codeStates['setstage_name'] = setstage_namef85b6,
        codeStates['status_code'] = status_codeb8e30,
        codeStates['setstatus_code'] = setstatus_codeb8e30,
        codeStates['condition_text'] = condition_text4da2f,
        codeStates['setcondition_text'] = setcondition_text4da2f,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
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
        "5cda5668c9e05cd0c1c49d447b385ee1",
        "8a7df50bed3445b192348ace8fcf85b6"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationCondition:AFVK:v1",
      //     componentId: "5cda5668c9e05cd0c1c49d447b385ee1",
      //     controlId: "8a7df50bed3445b192348ace8fcf85b6",
      //     isTable: false,
      //     from:"TextInputstage_name",
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
        setDynamicStateandType({name:'stage_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'stage_name',type:'text'};
      //   type={
      //     name:'stage_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.stage_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'stage_name',type:'text'};
      //   type={
      //     name:'stage_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.stage_name.type
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
  const group85ee1Ref = useRef<any>(group85ee1);
  useEffect(() => { group85ee1Ref.current = group85ee1; }, [group85ee1]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "8a7df50bed3445b192348ace8fcf85b6") {
        handleChange({target:{value:group85ee1Ref?.current?.stage_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "8a7df50bed3445b192348ace8fcf85b6") {
        handleBlur({target:{value:group85ee1Ref?.current?.stage_name||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (stage_namef85b6?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 14`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={group85ee1?.stage_name||""}
         disabled= {stage_namef85b6?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Stage Name"
      errorMessage={error}
        validationState={validate?.addCertificationCondition_v1?.stage_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstage_name
