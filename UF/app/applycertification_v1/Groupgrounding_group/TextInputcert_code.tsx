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

const TextInputcert_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cert_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901, setgrounding_text80901}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text4e90a, setcert_code_text4e90a}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_text88aa1, setcert_temp_text88aa1}= useContext(TotalContext) as TotalContextProps;
  const {text_current_stage_seqf99a6, settext_current_stage_seqf99a6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code601b0, setcert_code601b0}= useContext(TotalContext) as TotalContextProps;
  const {template_namee23cf, settemplate_namee23cf}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code3cbb6, setstage_type_code3cbb6}= useContext(TotalContext) as TotalContextProps;
  const {text_status5e33f, settext_status5e33f}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code047b5, setcert_status_code047b5}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationbdc1e, setis_recertificationbdc1e}= useContext(TotalContext) as TotalContextProps;
  const {is_actived0a4e, setis_actived0a4e}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,applyCertification_v1:{...pre?.applyCertification_v1,cert_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrounding_group64d9d((prev: any) => ({ ...prev, cert_code: +e.target.value }));
    }
    else{
    setgrounding_group64d9d((prev: any) => ({ ...prev, cert_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
        codeStates['grounding_text'] = grounding_text80901,
        codeStates['setgrounding_text'] = setgrounding_text80901,
        codeStates['cert_code_text'] = cert_code_text4e90a,
        codeStates['setcert_code_text'] = setcert_code_text4e90a,
        codeStates['cert_temp_text'] = cert_temp_text88aa1,
        codeStates['setcert_temp_text'] = setcert_temp_text88aa1,
        codeStates['text_current_stage_seq'] = text_current_stage_seqf99a6,
        codeStates['settext_current_stage_seq'] = settext_current_stage_seqf99a6,
        codeStates['cert_code'] = cert_code601b0,
        codeStates['setcert_code'] = setcert_code601b0,
        codeStates['template_name'] = template_namee23cf,
        codeStates['settemplate_name'] = settemplate_namee23cf,
        codeStates['stage_type_code'] = stage_type_code3cbb6,
        codeStates['setstage_type_code'] = setstage_type_code3cbb6,
        codeStates['text_status'] = text_status5e33f,
        codeStates['settext_status'] = settext_status5e33f,
        codeStates['cert_status_code'] = cert_status_code047b5,
        codeStates['setcert_status_code'] = setcert_status_code047b5,
        codeStates['is_recertification'] = is_recertificationbdc1e,
        codeStates['setis_recertification'] = setis_recertificationbdc1e,
        codeStates['is_active'] = is_actived0a4e,
        codeStates['setis_active'] = setis_actived0a4e,
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
        "c69fba169af09340a1ee1388b0464d9d",
        "542dbcee85c648148aeefd7d7a8601b0"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1",
      //     componentId: "c69fba169af09340a1ee1388b0464d9d",
      //     controlId: "542dbcee85c648148aeefd7d7a8601b0",
      //     isTable: false,
      //     from:"TextInputcert_code",
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
        setDynamicStateandType({name:'cert_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cert_code',type:'text'};
      //   type={
      //     name:'cert_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cert_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cert_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cert_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cert_code',type:'text'};
      //   type={
      //     name:'cert_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cert_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cert_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cert_code.type
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
  const grounding_group64d9dRef = useRef<any>(grounding_group64d9d);
  useEffect(() => { grounding_group64d9dRef.current = grounding_group64d9d; }, [grounding_group64d9d]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "542dbcee85c648148aeefd7d7a8601b0") {
        handleChange({target:{value:grounding_group64d9dRef?.current?.cert_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "542dbcee85c648148aeefd7d7a8601b0") {
        handleBlur({target:{value:grounding_group64d9dRef?.current?.cert_code||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (cert_code601b0?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `14 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!border-[1px]"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={grounding_group64d9d?.cert_code||""}
         disabled= {cert_code601b0?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.applyCertification_v1?.cert_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcert_code
