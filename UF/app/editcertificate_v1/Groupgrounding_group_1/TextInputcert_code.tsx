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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80bed, setgrounding_text80bed}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_15adbc, setcert_code_text_15adbc}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text0fa1b, setcert_code_text0fa1b}= useContext(TotalContext) as TotalContextProps;
  const {text_statusa2d30, settext_statusa2d30}= useContext(TotalContext) as TotalContextProps;
  const {certification_idb4ceb, setcertification_idb4ceb}= useContext(TotalContext) as TotalContextProps;
  const {cert_code74900, setcert_code74900}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code2f5be, setcert_status_code2f5be}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_126c1f4, setcert_code_text_126c1f4}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_1_12e212, setcert_code_text_1_12e212}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0b26f, settrs_created_by0b26f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date297b9, settrs_created_date297b9}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,cert_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrounding_group_19abb8((prev: any) => ({ ...prev, cert_code: +e.target.value }));
    }
    else{
    setgrounding_group_19abb8((prev: any) => ({ ...prev, cert_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
        codeStates['grounding_text'] = grounding_text80bed,
        codeStates['setgrounding_text'] = setgrounding_text80bed,
        codeStates['cert_code_text_1'] = cert_code_text_15adbc,
        codeStates['setcert_code_text_1'] = setcert_code_text_15adbc,
        codeStates['cert_code_text'] = cert_code_text0fa1b,
        codeStates['setcert_code_text'] = setcert_code_text0fa1b,
        codeStates['text_status'] = text_statusa2d30,
        codeStates['settext_status'] = settext_statusa2d30,
        codeStates['certification_id'] = certification_idb4ceb,
        codeStates['setcertification_id'] = setcertification_idb4ceb,
        codeStates['cert_code'] = cert_code74900,
        codeStates['setcert_code'] = setcert_code74900,
        codeStates['cert_status_code'] = cert_status_code2f5be,
        codeStates['setcert_status_code'] = setcert_status_code2f5be,
        codeStates['cert_code_text_12'] = cert_code_text_126c1f4,
        codeStates['setcert_code_text_12'] = setcert_code_text_126c1f4,
        codeStates['cert_code_text_1_1'] = cert_code_text_1_12e212,
        codeStates['setcert_code_text_1_1'] = setcert_code_text_1_12e212,
        codeStates['trs_created_by'] = trs_created_by0b26f,
        codeStates['settrs_created_by'] = settrs_created_by0b26f,
        codeStates['trs_created_date'] = trs_created_date297b9,
        codeStates['settrs_created_date'] = settrs_created_date297b9,
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
        "714415292c394b20a86570cff659abb8",
        "d98dec46efdc4bbda60e869565874900"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:editCertificate:AFVK:v1",
      //     componentId: "714415292c394b20a86570cff659abb8",
      //     controlId: "d98dec46efdc4bbda60e869565874900",
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
  const grounding_group_19abb8Ref = useRef<any>(grounding_group_19abb8);
  useEffect(() => { grounding_group_19abb8Ref.current = grounding_group_19abb8; }, [grounding_group_19abb8]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d98dec46efdc4bbda60e869565874900") {
        handleChange({target:{value:grounding_group_19abb8Ref?.current?.cert_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d98dec46efdc4bbda60e869565874900") {
        handleBlur({target:{value:grounding_group_19abb8Ref?.current?.cert_code||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (cert_code74900?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `14 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!border-[1px]"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={grounding_group_19abb8?.cert_code||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.editCertificate_v1?.cert_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcert_code
