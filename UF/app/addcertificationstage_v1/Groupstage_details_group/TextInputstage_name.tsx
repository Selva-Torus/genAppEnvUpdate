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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.stage_name"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationStage:AFVK:v1|46a149b3f2104ac7ab84a4d24643cc06|246c3b11f84441fe86ee4d96c24f712f"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {text0cd7b, settext0cd7b}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name79179, setcert_template_name79179}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequencefde55, setstage_sequencefde55}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codefe371, setstage_type_codefe371}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef712f, setstage_namef712f}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id278bd, setapprover_role_id278bd}= useContext(TotalContext) as TotalContextProps;
  const {sla_days5202a, setsla_days5202a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setstage_details_group3cc06((prev: any) => ({ ...prev, stage_name: +e.target.value }));
    }
    else{
    setstage_details_group3cc06((prev: any) => ({ ...prev, stage_name: e.target.value }));
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
        codeStates['text'] = text0cd7b,
        codeStates['settext'] = settext0cd7b,
        codeStates['cert_template_name'] = cert_template_name79179,
        codeStates['setcert_template_name'] = setcert_template_name79179,
        codeStates['stage_sequence'] = stage_sequencefde55,
        codeStates['setstage_sequence'] = setstage_sequencefde55,
        codeStates['stage_type_code'] = stage_type_codefe371,
        codeStates['setstage_type_code'] = setstage_type_codefe371,
        codeStates['stage_name'] = stage_namef712f,
        codeStates['setstage_name'] = setstage_namef712f,
        codeStates['approver_role_id'] = approver_role_id278bd,
        codeStates['setapprover_role_id'] = setapprover_role_id278bd,
        codeStates['sla_days'] = sla_days5202a,
        codeStates['setsla_days'] = setsla_days5202a,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
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
        "46a149b3f2104ac7ab84a4d24643cc06",
        "246c3b11f84441fe86ee4d96c24f712f"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationStage:AFVK:v1",
      //     componentId: "46a149b3f2104ac7ab84a4d24643cc06",
      //     controlId: "246c3b11f84441fe86ee4d96c24f712f",
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
  const stage_details_group3cc06Ref = useRef<any>(stage_details_group3cc06);
  useEffect(() => { stage_details_group3cc06Ref.current = stage_details_group3cc06; }, [stage_details_group3cc06]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "246c3b11f84441fe86ee4d96c24f712f") {
        handleChange({target:{value:stage_details_group3cc06Ref?.current?.stage_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "246c3b11f84441fe86ee4d96c24f712f") {
        handleBlur({target:{value:stage_details_group3cc06Ref?.current?.stage_name||""}});
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
      setstage_details_group3cc06((pre:any)=>({...pre,stage_name:dfd_certificationstage_v1Props.data[0]?.stage_name}));
    }
  }
  },[dfd_certificationstage_v1Props?.setSearchFilters])
  if (stage_namef712f?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `30 / 42`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={stage_details_group3cc06?.stage_name||""}
         disabled= {stage_namef712f?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Stage Name'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Stage Name"
      errorMessage={error}
        validationState={validate?.addCertificationStage_v1?.stage_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstage_name
