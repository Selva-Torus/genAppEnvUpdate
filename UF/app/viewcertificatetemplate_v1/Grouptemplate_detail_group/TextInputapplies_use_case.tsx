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

const TextInputapplies_use_case = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'applies_use_case',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupac196, setgroupac196}= useContext(TotalContext) as TotalContextProps;
  const {groupac196Props, setgroupac196Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9, settemplate_detail_group268e9}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9Props, settemplate_detail_group268e9Props}= useContext(TotalContext) as TotalContextProps;
  const {text7594c, settext7594c}= useContext(TotalContext) as TotalContextProps;
  const {template_namef77f0, settemplate_namef77f0}= useContext(TotalContext) as TotalContextProps;
  const {template_code3b498, settemplate_code3b498}= useContext(TotalContext) as TotalContextProps;
  const {template_versionfa78b, settemplate_versionfa78b}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code36691, setapplies_tier_code36691}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_cased6dc4, setapplies_use_cased6dc4}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typeae9f5, setapplies_asset_typeae9f5}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159, setadditional_info_group4d159}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159Props, setadditional_info_group4d159Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewCertificateTemplate_v1:{...pre?.viewCertificateTemplate_v1,applies_use_case:undefined}}));
    if(dynamicStateandType.type=="number"){
    settemplate_detail_group268e9((prev: any) => ({ ...prev, applies_use_case: +e.target.value }));
    }
    else{
    settemplate_detail_group268e9((prev: any) => ({ ...prev, applies_use_case: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['text'] = text7594c,
        codeStates['settext'] = settext7594c,
        codeStates['template_name'] = template_namef77f0,
        codeStates['settemplate_name'] = settemplate_namef77f0,
        codeStates['template_code'] = template_code3b498,
        codeStates['settemplate_code'] = settemplate_code3b498,
        codeStates['template_version'] = template_versionfa78b,
        codeStates['settemplate_version'] = settemplate_versionfa78b,
        codeStates['applies_tier_code'] = applies_tier_code36691,
        codeStates['setapplies_tier_code'] = setapplies_tier_code36691,
        codeStates['applies_use_case'] = applies_use_cased6dc4,
        codeStates['setapplies_use_case'] = setapplies_use_cased6dc4,
        codeStates['applies_asset_type'] = applies_asset_typeae9f5,
        codeStates['setapplies_asset_type'] = setapplies_asset_typeae9f5,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
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
        "ea9449c4f84b46d5b6c32eb076e268e9",
        "26ce16e4975840f39a6c91f4105d6dc4"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificateTemplate:AFVK:v1",
      //     componentId: "ea9449c4f84b46d5b6c32eb076e268e9",
      //     controlId: "26ce16e4975840f39a6c91f4105d6dc4",
      //     isTable: false,
      //     from:"TextInputapplies_use_case",
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
        setDynamicStateandType({name:'applies_use_case', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'applies_use_case',type:'text'};
      //   type={
      //     name:'applies_use_case',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.applies_use_case.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.applies_use_case.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.applies_use_case.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'applies_use_case',type:'text'};
      //   type={
      //     name:'applies_use_case',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.applies_use_case.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.applies_use_case.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.applies_use_case.type
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
  const template_detail_group268e9Ref = useRef<any>(template_detail_group268e9);
  useEffect(() => { template_detail_group268e9Ref.current = template_detail_group268e9; }, [template_detail_group268e9]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "26ce16e4975840f39a6c91f4105d6dc4") {
        handleChange({target:{value:template_detail_group268e9Ref?.current?.applies_use_case||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "26ce16e4975840f39a6c91f4105d6dc4") {
        handleBlur({target:{value:template_detail_group268e9Ref?.current?.applies_use_case||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (applies_use_cased6dc4?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `28 / 40`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={template_detail_group268e9?.applies_use_case||""}
         disabled= {applies_use_cased6dc4?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Use Case'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Use Case"
      errorMessage={error}
        validationState={validate?.viewCertificateTemplate_v1?.applies_use_case ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputapplies_use_case
