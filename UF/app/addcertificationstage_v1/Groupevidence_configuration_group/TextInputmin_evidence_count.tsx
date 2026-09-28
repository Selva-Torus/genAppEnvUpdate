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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.min_evidence_count"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationStage:AFVK:v1|040cc34ed88145e18757f311ecb8a0a2|ca1c86782893482fa0b0c1206fc3252a"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'min_evidence_count',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {text_2d05b1, settext_2d05b1}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count3252a, setmin_evidence_count3252a}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory05efb, setis_mandatory05efb}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required78dc8, setevidence_required78dc8}= useContext(TotalContext) as TotalContextProps;
  const {guidance_texte8af0, setguidance_texte8af0}= useContext(TotalContext) as TotalContextProps;
  const {is_active49c13, setis_active49c13}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,min_evidence_count:undefined}}));
    if(dynamicStateandType.type=="number"){
    setevidence_configuration_group8a0a2((prev: any) => ({ ...prev, min_evidence_count: +e.target.value }));
    }
    else{
    setevidence_configuration_group8a0a2((prev: any) => ({ ...prev, min_evidence_count: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['text_2'] = text_2d05b1,
        codeStates['settext_2'] = settext_2d05b1,
        codeStates['min_evidence_count'] = min_evidence_count3252a,
        codeStates['setmin_evidence_count'] = setmin_evidence_count3252a,
        codeStates['is_mandatory'] = is_mandatory05efb,
        codeStates['setis_mandatory'] = setis_mandatory05efb,
        codeStates['evidence_required'] = evidence_required78dc8,
        codeStates['setevidence_required'] = setevidence_required78dc8,
        codeStates['guidance_text'] = guidance_texte8af0,
        codeStates['setguidance_text'] = setguidance_texte8af0,
        codeStates['is_active'] = is_active49c13,
        codeStates['setis_active'] = setis_active49c13,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
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
        "040cc34ed88145e18757f311ecb8a0a2",
        "ca1c86782893482fa0b0c1206fc3252a"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationStage:AFVK:v1",
      //     componentId: "040cc34ed88145e18757f311ecb8a0a2",
      //     controlId: "ca1c86782893482fa0b0c1206fc3252a",
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
  const evidence_configuration_group8a0a2Ref = useRef<any>(evidence_configuration_group8a0a2);
  useEffect(() => { evidence_configuration_group8a0a2Ref.current = evidence_configuration_group8a0a2; }, [evidence_configuration_group8a0a2]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "ca1c86782893482fa0b0c1206fc3252a") {
        handleChange({target:{value:evidence_configuration_group8a0a2Ref?.current?.min_evidence_count||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "ca1c86782893482fa0b0c1206fc3252a") {
        handleBlur({target:{value:evidence_configuration_group8a0a2Ref?.current?.min_evidence_count||""}});
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
  if(dfd_certificationstage_v1Props?.setSearchFilters && dfd_certificationstage_v1Props?.data)
  {
    if(Array.isArray(dfd_certificationstage_v1Props.data) && dfd_certificationstage_v1Props.data.length > 0){
      setevidence_configuration_group8a0a2((pre:any)=>({...pre,min_evidence_count:dfd_certificationstage_v1Props.data[0]?.min_evidence_count}));
    }
  }
  },[dfd_certificationstage_v1Props?.setSearchFilters])
  if (min_evidence_count3252a?.isHidden) {
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
        value={evidence_configuration_group8a0a2?.min_evidence_count||""}
         disabled= {min_evidence_count3252a?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Evidence Count'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Min Evidence Count"
      errorMessage={error}
        validationState={validate?.addCertificationStage_v1?.min_evidence_count ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputmin_evidence_count
