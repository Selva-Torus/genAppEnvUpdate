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

const TextInputmin_evidence_count = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'min_evidence_count',type:"text"})
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
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  const {text_26244c, settext_26244c}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count7cdda, setmin_evidence_count7cdda}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory46a07, setis_mandatory46a07}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required45165, setevidence_required45165}= useContext(TotalContext) as TotalContextProps;
  const {guidance_text68090, setguidance_text68090}= useContext(TotalContext) as TotalContextProps;
  const {is_active8fb50, setis_active8fb50}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewCertificationTemplateStage_v1:{...pre?.viewCertificationTemplateStage_v1,min_evidence_count:undefined}}));
    if(dynamicStateandType.type=="number"){
    setevidence_configuration_group80300((prev: any) => ({ ...prev, min_evidence_count: +e.target.value }));
    }
    else{
    setevidence_configuration_group80300((prev: any) => ({ ...prev, min_evidence_count: e.target.value }));
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
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
        codeStates['text_2'] = text_26244c,
        codeStates['settext_2'] = settext_26244c,
        codeStates['min_evidence_count'] = min_evidence_count7cdda,
        codeStates['setmin_evidence_count'] = setmin_evidence_count7cdda,
        codeStates['is_mandatory'] = is_mandatory46a07,
        codeStates['setis_mandatory'] = setis_mandatory46a07,
        codeStates['evidence_required'] = evidence_required45165,
        codeStates['setevidence_required'] = setevidence_required45165,
        codeStates['guidance_text'] = guidance_text68090,
        codeStates['setguidance_text'] = setguidance_text68090,
        codeStates['is_active'] = is_active8fb50,
        codeStates['setis_active'] = setis_active8fb50,
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
        "38bcbfd2b4a541f4ac31288528780300",
        "50bd8f897d09428c815d85dc4cb7cdda"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificationTemplateStage:AFVK:v1",
      //     componentId: "38bcbfd2b4a541f4ac31288528780300",
      //     controlId: "50bd8f897d09428c815d85dc4cb7cdda",
      //     isTable: false,
      //     from:"TextInputmin_evidence_count",
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
        setDynamicStateandType({name:'min_evidence_count', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'min_evidence_count',type:'text'};
      //   type={
      //     name:'min_evidence_count',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.min_evidence_count.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.min_evidence_count.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.min_evidence_count.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'min_evidence_count',type:'text'};
      //   type={
      //     name:'min_evidence_count',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.min_evidence_count.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.min_evidence_count.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.min_evidence_count.type
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
  const evidence_configuration_group80300Ref = useRef<any>(evidence_configuration_group80300);
  useEffect(() => { evidence_configuration_group80300Ref.current = evidence_configuration_group80300; }, [evidence_configuration_group80300]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "50bd8f897d09428c815d85dc4cb7cdda") {
        handleChange({target:{value:evidence_configuration_group80300Ref?.current?.min_evidence_count||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "50bd8f897d09428c815d85dc4cb7cdda") {
        handleBlur({target:{value:evidence_configuration_group80300Ref?.current?.min_evidence_count||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (min_evidence_count7cdda?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `10 / 25`,gridRow: `19 / 34`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={evidence_configuration_group80300?.min_evidence_count||""}
         disabled= {min_evidence_count7cdda?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Evidence Count'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Min Evidence Count"
      errorMessage={error}
        validationState={validate?.viewCertificationTemplateStage_v1?.min_evidence_count ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputmin_evidence_count
