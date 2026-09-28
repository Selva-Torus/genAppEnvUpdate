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

const TextInputnumeric_weight = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|93802f18715f4e1c90c6ec03ed2d0b7d|properties.numeric_weight"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeValues:AFVK:v1|572cc79d3dff4027aa0f45c8fda55872|a54b22252c1c476b823e825aabf9b07a"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'numeric_weight',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {code_value_group4d389, setcode_value_group4d389}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group4d389Props, setcode_value_group4d389Props}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1, setcode_groupb5dc1}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1Props, setcode_groupb5dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872, setcode_value_config_group55872}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872Props, setcode_value_config_group55872Props}= useContext(TotalContext) as TotalContextProps;
  const {code_config_txt79ae5, setcode_config_txt79ae5}= useContext(TotalContext) as TotalContextProps;
  const {colour_hint75054, setcolour_hint75054}= useContext(TotalContext) as TotalContextProps;
  const {numeric_weight9b07a, setnumeric_weight9b07a}= useContext(TotalContext) as TotalContextProps;
  const {is_active033da, setis_active033da}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535b, setdynamicactions1535b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535bProps, setdynamicactions1535bProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCodeValues_v1:{...pre?.addCodeValues_v1,numeric_weight:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcode_value_config_group55872((prev: any) => ({ ...prev, numeric_weight: +e.target.value }));
    }
    else{
    setcode_value_config_group55872((prev: any) => ({ ...prev, numeric_weight: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['code_config_txt'] = code_config_txt79ae5,
        codeStates['setcode_config_txt'] = setcode_config_txt79ae5,
        codeStates['colour_hint'] = colour_hint75054,
        codeStates['setcolour_hint'] = setcolour_hint75054,
        codeStates['numeric_weight'] = numeric_weight9b07a,
        codeStates['setnumeric_weight'] = setnumeric_weight9b07a,
        codeStates['is_active'] = is_active033da,
        codeStates['setis_active'] = setis_active033da,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,
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
        "572cc79d3dff4027aa0f45c8fda55872",
        "a54b22252c1c476b823e825aabf9b07a"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeValues:AFVK:v1",
      //     componentId: "572cc79d3dff4027aa0f45c8fda55872",
      //     controlId: "a54b22252c1c476b823e825aabf9b07a",
      //     isTable: false,
      //     from:"TextInputnumeric_weight",
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
        setDynamicStateandType({name:'numeric_weight', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'numeric_weight',type:'text'};
      //   type={
      //     name:'numeric_weight',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.numeric_weight.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.numeric_weight.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.numeric_weight.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'numeric_weight',type:'text'};
      //   type={
      //     name:'numeric_weight',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.numeric_weight.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.numeric_weight.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.numeric_weight.type
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
  const code_value_config_group55872Ref = useRef<any>(code_value_config_group55872);
  useEffect(() => { code_value_config_group55872Ref.current = code_value_config_group55872; }, [code_value_config_group55872]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "a54b22252c1c476b823e825aabf9b07a") {
        handleChange({target:{value:code_value_config_group55872Ref?.current?.numeric_weight||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a54b22252c1c476b823e825aabf9b07a") {
        handleBlur({target:{value:code_value_config_group55872Ref?.current?.numeric_weight||""}});
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
  if(dfd_codevalue_v1Props?.setSearchFilters && dfd_codevalue_v1Props?.data)
  {
    if(Array.isArray(dfd_codevalue_v1Props.data) && dfd_codevalue_v1Props.data.length > 0){
      setcode_value_config_group55872((pre:any)=>({...pre,numeric_weight:dfd_codevalue_v1Props.data[0]?.numeric_weight}));
    }
  }
  },[dfd_codevalue_v1Props?.setSearchFilters])
  if (numeric_weight9b07a?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `29 / 41`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={code_value_config_group55872?.numeric_weight||""}
         disabled= {numeric_weight9b07a?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Numeric Weight"
      errorMessage={error}
        validationState={validate?.addCodeValues_v1?.numeric_weight ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputnumeric_weight
