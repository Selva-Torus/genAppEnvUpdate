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

const TextInputsla_days = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'sla_days',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupcccf9, setgroupcccf9}= useContext(TotalContext) as TotalContextProps;
  const {groupcccf9Props, setgroupcccf9Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3, setstage_details_groupbaac3}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3Props, setstage_details_groupbaac3Props}= useContext(TotalContext) as TotalContextProps;
  const {text95246, settext95246}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name694fb, setcert_template_name694fb}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence7b860, setstage_sequence7b860}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codebdc33, setstage_type_codebdc33}= useContext(TotalContext) as TotalContextProps;
  const {stage_name23fb2, setstage_name23fb2}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id51601, setapprover_role_id51601}= useContext(TotalContext) as TotalContextProps;
  const {sla_daysbed2b, setsla_daysbed2b}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewCertificationTemplateStage_v1:{...pre?.viewCertificationTemplateStage_v1,sla_days:undefined}}));
    if(dynamicStateandType.type=="number"){
    setstage_details_groupbaac3((prev: any) => ({ ...prev, sla_days: +e.target.value }));
    }
    else{
    setstage_details_groupbaac3((prev: any) => ({ ...prev, sla_days: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupcccf9,
        codeStates['setgroup'] = setgroupcccf9,
        codeStates['groupcccf9'] = groupcccf9Props,
        codeStates['setgroupcccf9'] = setgroupcccf9Props,
        codeStates['stage_details_group'] = stage_details_groupbaac3,
        codeStates['setstage_details_group'] = setstage_details_groupbaac3,
        codeStates['stage_details_groupbaac3'] = stage_details_groupbaac3Props,
        codeStates['setstage_details_groupbaac3'] = setstage_details_groupbaac3Props,
        codeStates['text'] = text95246,
        codeStates['settext'] = settext95246,
        codeStates['cert_template_name'] = cert_template_name694fb,
        codeStates['setcert_template_name'] = setcert_template_name694fb,
        codeStates['stage_sequence'] = stage_sequence7b860,
        codeStates['setstage_sequence'] = setstage_sequence7b860,
        codeStates['stage_type_code'] = stage_type_codebdc33,
        codeStates['setstage_type_code'] = setstage_type_codebdc33,
        codeStates['stage_name'] = stage_name23fb2,
        codeStates['setstage_name'] = setstage_name23fb2,
        codeStates['approver_role_id'] = approver_role_id51601,
        codeStates['setapprover_role_id'] = setapprover_role_id51601,
        codeStates['sla_days'] = sla_daysbed2b,
        codeStates['setsla_days'] = setsla_daysbed2b,
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
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
        "a7acebf278aa4cd19be9ef2ad0ebaac3",
        "28e760342b6144beac98468ea33bed2b"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificationTemplateStage:AFVK:v1",
      //     componentId: "a7acebf278aa4cd19be9ef2ad0ebaac3",
      //     controlId: "28e760342b6144beac98468ea33bed2b",
      //     isTable: false,
      //     from:"TextInputsla_days",
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
        setDynamicStateandType({name:'sla_days', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'sla_days',type:'text'};
      //   type={
      //     name:'sla_days',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sla_days.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sla_days.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sla_days.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'sla_days',type:'text'};
      //   type={
      //     name:'sla_days',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sla_days.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sla_days.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sla_days.type
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
  const stage_details_groupbaac3Ref = useRef<any>(stage_details_groupbaac3);
  useEffect(() => { stage_details_groupbaac3Ref.current = stage_details_groupbaac3; }, [stage_details_groupbaac3]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "28e760342b6144beac98468ea33bed2b") {
        handleChange({target:{value:stage_details_groupbaac3Ref?.current?.sla_days||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "28e760342b6144beac98468ea33bed2b") {
        handleBlur({target:{value:stage_details_groupbaac3Ref?.current?.sla_days||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (sla_daysbed2b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `30 / 42`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={stage_details_groupbaac3?.sla_days||""}
         disabled= {sla_daysbed2b?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter SLA Days'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="SLA Days"
      errorMessage={error}
        validationState={validate?.viewCertificationTemplateStage_v1?.sla_days ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsla_days
