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
  const {overall_groupc4a49, setoverall_groupc4a49}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupc4a49Props, setoverall_groupc4a49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27, setai_asset_version_table_group1bd27}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27Props, setai_asset_version_table_group1bd27Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012, setgroupe4012}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012Props, setgroupe4012Props}= useContext(TotalContext) as TotalContextProps;
  const {textab450, settextab450}= useContext(TotalContext) as TotalContextProps;
  const {asset_coded6048, setasset_coded6048}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0b551, setasset_name0b551}= useContext(TotalContext) as TotalContextProps;
  const {cert_codecea1f, setcert_codecea1f}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99eb, setstages_tableb99eb}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99ebProps, setstages_tableb99ebProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,showallStagesMyApproval_v1:{...pre?.showallStagesMyApproval_v1,cert_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupe4012((prev: any) => ({ ...prev, cert_code: +e.target.value }));
    }
    else{
    setgroupe4012((prev: any) => ({ ...prev, cert_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['text'] = textab450,
        codeStates['settext'] = settextab450,
        codeStates['asset_code'] = asset_coded6048,
        codeStates['setasset_code'] = setasset_coded6048,
        codeStates['asset_name'] = asset_name0b551,
        codeStates['setasset_name'] = setasset_name0b551,
        codeStates['cert_code'] = cert_codecea1f,
        codeStates['setcert_code'] = setcert_codecea1f,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,
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
        "2d5640c7eecabc597165c9b26f7e4012",
        "eac6155f908ab5d81389a2c3ec9cea1f"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:showallStagesMyApproval:AFVK:v1",
      //     componentId: "2d5640c7eecabc597165c9b26f7e4012",
      //     controlId: "eac6155f908ab5d81389a2c3ec9cea1f",
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
  const groupe4012Ref = useRef<any>(groupe4012);
  useEffect(() => { groupe4012Ref.current = groupe4012; }, [groupe4012]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "eac6155f908ab5d81389a2c3ec9cea1f") {
        handleChange({target:{value:groupe4012Ref?.current?.cert_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "eac6155f908ab5d81389a2c3ec9cea1f") {
        handleBlur({target:{value:groupe4012Ref?.current?.cert_code||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (cert_codecea1f?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={groupe4012?.cert_code||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Cert Code"
      errorMessage={error}
        validationState={validate?.showallStagesMyApproval_v1?.cert_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcert_code
