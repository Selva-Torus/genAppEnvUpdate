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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.applies_use_case"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificateTemplate:AFVK:v1|9f4ba52dc6ca4093871518c8ad6ec16d|0a91227359684a6b8c2244b0a81e4c68"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {text792c7, settext792c7}= useContext(TotalContext) as TotalContextProps;
  const {template_name53616, settemplate_name53616}= useContext(TotalContext) as TotalContextProps;
  const {template_code83f6f, settemplate_code83f6f}= useContext(TotalContext) as TotalContextProps;
  const {template_versionc2087, settemplate_versionc2087}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code4010b, setapplies_tier_code4010b}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_casee4c68, setapplies_use_casee4c68}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typeb380f, setapplies_asset_typeb380f}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_use_case:undefined}}));
    if(dynamicStateandType.type=="number"){
    settemplate_detail_groupec16d((prev: any) => ({ ...prev, applies_use_case: +e.target.value }));
    }
    else{
    settemplate_detail_groupec16d((prev: any) => ({ ...prev, applies_use_case: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupb224b,
        codeStates['setgroup'] = setgroupb224b,
        codeStates['groupb224b'] = groupb224bProps,
        codeStates['setgroupb224b'] = setgroupb224bProps,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['text'] = text792c7,
        codeStates['settext'] = settext792c7,
        codeStates['template_name'] = template_name53616,
        codeStates['settemplate_name'] = settemplate_name53616,
        codeStates['template_code'] = template_code83f6f,
        codeStates['settemplate_code'] = settemplate_code83f6f,
        codeStates['template_version'] = template_versionc2087,
        codeStates['settemplate_version'] = settemplate_versionc2087,
        codeStates['applies_tier_code'] = applies_tier_code4010b,
        codeStates['setapplies_tier_code'] = setapplies_tier_code4010b,
        codeStates['applies_use_case'] = applies_use_casee4c68,
        codeStates['setapplies_use_case'] = setapplies_use_casee4c68,
        codeStates['applies_asset_type'] = applies_asset_typeb380f,
        codeStates['setapplies_asset_type'] = setapplies_asset_typeb380f,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
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
        "9f4ba52dc6ca4093871518c8ad6ec16d",
        "0a91227359684a6b8c2244b0a81e4c68"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificateTemplate:AFVK:v1",
      //     componentId: "9f4ba52dc6ca4093871518c8ad6ec16d",
      //     controlId: "0a91227359684a6b8c2244b0a81e4c68",
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
  const template_detail_groupec16dRef = useRef<any>(template_detail_groupec16d);
  useEffect(() => { template_detail_groupec16dRef.current = template_detail_groupec16d; }, [template_detail_groupec16d]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0a91227359684a6b8c2244b0a81e4c68") {
        handleChange({target:{value:template_detail_groupec16dRef?.current?.applies_use_case||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0a91227359684a6b8c2244b0a81e4c68") {
        handleBlur({target:{value:template_detail_groupec16dRef?.current?.applies_use_case||""}});
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
  if(dfd_certificatetemplate_v1Props?.setSearchFilters && dfd_certificatetemplate_v1Props?.data)
  {
    if(Array.isArray(dfd_certificatetemplate_v1Props.data) && dfd_certificatetemplate_v1Props.data.length > 0){
      settemplate_detail_groupec16d((pre:any)=>({...pre,applies_use_case:dfd_certificatetemplate_v1Props.data[0]?.applies_use_case}));
    }
  }
  },[dfd_certificatetemplate_v1Props?.setSearchFilters])
  if (applies_use_casee4c68?.isHidden) {
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
        value={template_detail_groupec16d?.applies_use_case||""}
         disabled= {applies_use_casee4c68?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Use Case'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Use Case"
      errorMessage={error}
        validationState={validate?.addCertificateTemplate_v1?.applies_use_case ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputapplies_use_case
