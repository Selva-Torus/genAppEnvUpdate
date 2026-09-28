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

const TextInputexternal_reference = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1|35e5f44737ed447099a5a4ba41ed5584|properties.external_reference"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1|bbedb4bcb035482ca42d03effa08f2ec|1f131374128946aa9414ba97afc17a2c"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'external_reference',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry121deProps, setoverall_ai_asset_registry121deProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dcProps, setregister_ai_asset_groupf02dcProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1Props, setasset_identity_group8d5e1Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5, setownership_groupf52d5}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5Props, setownership_groupf52d5Props}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ec, setvending_group8f2ec}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ecProps, setvending_group8f2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {vending_textd389b, setvending_textd389b}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name42147, setvendor_name42147}= useContext(TotalContext) as TotalContextProps;
  const {hosting_location7dc0e, sethosting_location7dc0e}= useContext(TotalContext) as TotalContextProps;
  const {external_reference17a2c, setexternal_reference17a2c}= useContext(TotalContext) as TotalContextProps;
  const {is_third_partye6f0c, setis_third_partye6f0c}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10eb, setcertification_groupa10eb}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10ebProps, setcertification_groupa10ebProps}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9, setusecase_group233f9}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9Props, setusecase_group233f9Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915b, settier_group6915b}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915bProps, settier_group6915bProps}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909, setlifecycle_groupb7909}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909Props, setlifecycle_groupb7909Props}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6f, setversion_group3fe6f}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6fProps, setversion_group3fe6fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846f, setdynamicactionsf846f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846fProps, setdynamicactionsf846fProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,registerAIAsset_v1:{...pre?.registerAIAsset_v1,external_reference:undefined}}));
    if(dynamicStateandType.type=="number"){
    setvending_group8f2ec((prev: any) => ({ ...prev, external_reference: +e.target.value }));
    }
    else{
    setvending_group8f2ec((prev: any) => ({ ...prev, external_reference: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de,
        codeStates['overall_ai_asset_registry121de'] = overall_ai_asset_registry121deProps,
        codeStates['setoverall_ai_asset_registry121de'] = setoverall_ai_asset_registry121deProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc,
        codeStates['register_ai_asset_groupf02dc'] = register_ai_asset_groupf02dcProps,
        codeStates['setregister_ai_asset_groupf02dc'] = setregister_ai_asset_groupf02dcProps,
        codeStates['asset_identity_group'] = asset_identity_group8d5e1,
        codeStates['setasset_identity_group'] = setasset_identity_group8d5e1,
        codeStates['asset_identity_group8d5e1'] = asset_identity_group8d5e1Props,
        codeStates['setasset_identity_group8d5e1'] = setasset_identity_group8d5e1Props,
        codeStates['ownership_group'] = ownership_groupf52d5,
        codeStates['setownership_group'] = setownership_groupf52d5,
        codeStates['ownership_groupf52d5'] = ownership_groupf52d5Props,
        codeStates['setownership_groupf52d5'] = setownership_groupf52d5Props,
        codeStates['vending_group'] = vending_group8f2ec,
        codeStates['setvending_group'] = setvending_group8f2ec,
        codeStates['vending_group8f2ec'] = vending_group8f2ecProps,
        codeStates['setvending_group8f2ec'] = setvending_group8f2ecProps,
        codeStates['vending_text'] = vending_textd389b,
        codeStates['setvending_text'] = setvending_textd389b,
        codeStates['vendor_name'] = vendor_name42147,
        codeStates['setvendor_name'] = setvendor_name42147,
        codeStates['hosting_location'] = hosting_location7dc0e,
        codeStates['sethosting_location'] = sethosting_location7dc0e,
        codeStates['external_reference'] = external_reference17a2c,
        codeStates['setexternal_reference'] = setexternal_reference17a2c,
        codeStates['is_third_party'] = is_third_partye6f0c,
        codeStates['setis_third_party'] = setis_third_partye6f0c,
        codeStates['certification_group'] = certification_groupa10eb,
        codeStates['setcertification_group'] = setcertification_groupa10eb,
        codeStates['certification_groupa10eb'] = certification_groupa10ebProps,
        codeStates['setcertification_groupa10eb'] = setcertification_groupa10ebProps,
        codeStates['usecase_group'] = usecase_group233f9,
        codeStates['setusecase_group'] = setusecase_group233f9,
        codeStates['usecase_group233f9'] = usecase_group233f9Props,
        codeStates['setusecase_group233f9'] = setusecase_group233f9Props,
        codeStates['tier_group'] = tier_group6915b,
        codeStates['settier_group'] = settier_group6915b,
        codeStates['tier_group6915b'] = tier_group6915bProps,
        codeStates['settier_group6915b'] = settier_group6915bProps,
        codeStates['lifecycle_group'] = lifecycle_groupb7909,
        codeStates['setlifecycle_group'] = setlifecycle_groupb7909,
        codeStates['lifecycle_groupb7909'] = lifecycle_groupb7909Props,
        codeStates['setlifecycle_groupb7909'] = setlifecycle_groupb7909Props,
        codeStates['version_group'] = version_group3fe6f,
        codeStates['setversion_group'] = setversion_group3fe6f,
        codeStates['version_group3fe6f'] = version_group3fe6fProps,
        codeStates['setversion_group3fe6f'] = setversion_group3fe6fProps,
        codeStates['dynamicactions'] = dynamicactionsf846f,
        codeStates['setdynamicactions'] = setdynamicactionsf846f,
        codeStates['dynamicactionsf846f'] = dynamicactionsf846fProps,
        codeStates['setdynamicactionsf846f'] = setdynamicactionsf846fProps,
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
        "bbedb4bcb035482ca42d03effa08f2ec",
        "1f131374128946aa9414ba97afc17a2c"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:registerAIAsset:AFVK:v1",
      //     componentId: "bbedb4bcb035482ca42d03effa08f2ec",
      //     controlId: "1f131374128946aa9414ba97afc17a2c",
      //     isTable: false,
      //     from:"TextInputexternal_reference",
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
        setDynamicStateandType({name:'external_reference', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'external_reference',type:'text'};
      //   type={
      //     name:'external_reference',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.external_reference.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.external_reference.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.external_reference.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'external_reference',type:'text'};
      //   type={
      //     name:'external_reference',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.external_reference.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.external_reference.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.external_reference.type
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
  const vending_group8f2ecRef = useRef<any>(vending_group8f2ec);
  useEffect(() => { vending_group8f2ecRef.current = vending_group8f2ec; }, [vending_group8f2ec]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "1f131374128946aa9414ba97afc17a2c") {
        handleChange({target:{value:vending_group8f2ecRef?.current?.external_reference||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "1f131374128946aa9414ba97afc17a2c") {
        handleBlur({target:{value:vending_group8f2ecRef?.current?.external_reference||""}});
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
  if(dfd_airegistry_v1Props?.setSearchFilters && dfd_airegistry_v1Props?.data)
  {
    if(Array.isArray(dfd_airegistry_v1Props.data) && dfd_airegistry_v1Props.data.length > 0){
      setvending_group8f2ec((pre:any)=>({...pre,external_reference:dfd_airegistry_v1Props.data[0]?.external_reference}));
    }
  }
  },[dfd_airegistry_v1Props?.setSearchFilters])
  if (external_reference17a2c?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `22 / 34`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={vending_group8f2ec?.external_reference||""}
         disabled= {external_reference17a2c?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="External Reference"
      errorMessage={error}
        validationState={validate?.registerAIAsset_v1?.external_reference ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputexternal_reference
