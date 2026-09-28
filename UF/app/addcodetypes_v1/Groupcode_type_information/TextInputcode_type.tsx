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

const TextInputcode_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.code_type"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeTypes:AFVK:v1|e5281ffccb964106b9ffd0a5235d59aa|81cd5a9026c24cc18383686d4f6b31bb"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'code_type',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupa1a96, setgroupa1a96}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96Props, setgroupa1a96Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aa, setcode_type_informationd59aa}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aaProps, setcode_type_informationd59aaProps}= useContext(TotalContext) as TotalContextProps;
  const {code_typeb31bb, setcode_typeb31bb}= useContext(TotalContext) as TotalContextProps;
  const {descriptione6525, setdescriptione6525}= useContext(TotalContext) as TotalContextProps;
  const {is_system869d1, setis_system869d1}= useContext(TotalContext) as TotalContextProps;
  const {is_active28565, setis_active28565}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144, setdynamicactions48144}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144Props, setdynamicactions48144Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCodeTypes_v1:{...pre?.addCodeTypes_v1,code_type:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcode_type_informationd59aa((prev: any) => ({ ...prev, code_type: +e.target.value }));
    }
    else{
    setcode_type_informationd59aa((prev: any) => ({ ...prev, code_type: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupa1a96,
        codeStates['setgroup'] = setgroupa1a96,
        codeStates['groupa1a96'] = groupa1a96Props,
        codeStates['setgroupa1a96'] = setgroupa1a96Props,
        codeStates['code_type_information'] = code_type_informationd59aa,
        codeStates['setcode_type_information'] = setcode_type_informationd59aa,
        codeStates['code_type_informationd59aa'] = code_type_informationd59aaProps,
        codeStates['setcode_type_informationd59aa'] = setcode_type_informationd59aaProps,
        codeStates['code_type'] = code_typeb31bb,
        codeStates['setcode_type'] = setcode_typeb31bb,
        codeStates['description'] = descriptione6525,
        codeStates['setdescription'] = setdescriptione6525,
        codeStates['is_system'] = is_system869d1,
        codeStates['setis_system'] = setis_system869d1,
        codeStates['is_active'] = is_active28565,
        codeStates['setis_active'] = setis_active28565,
        codeStates['dynamicactions'] = dynamicactions48144,
        codeStates['setdynamicactions'] = setdynamicactions48144,
        codeStates['dynamicactions48144'] = dynamicactions48144Props,
        codeStates['setdynamicactions48144'] = setdynamicactions48144Props,
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
        "e5281ffccb964106b9ffd0a5235d59aa",
        "81cd5a9026c24cc18383686d4f6b31bb"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeTypes:AFVK:v1",
      //     componentId: "e5281ffccb964106b9ffd0a5235d59aa",
      //     controlId: "81cd5a9026c24cc18383686d4f6b31bb",
      //     isTable: false,
      //     from:"TextInputcode_type",
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
        setDynamicStateandType({name:'code_type', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'code_type',type:'text'};
      //   type={
      //     name:'code_type',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.code_type.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.code_type.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.code_type.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'code_type',type:'text'};
      //   type={
      //     name:'code_type',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.code_type.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.code_type.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.code_type.type
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
  const code_type_informationd59aaRef = useRef<any>(code_type_informationd59aa);
  useEffect(() => { code_type_informationd59aaRef.current = code_type_informationd59aa; }, [code_type_informationd59aa]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "81cd5a9026c24cc18383686d4f6b31bb") {
        handleChange({target:{value:code_type_informationd59aaRef?.current?.code_type||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "81cd5a9026c24cc18383686d4f6b31bb") {
        handleBlur({target:{value:code_type_informationd59aaRef?.current?.code_type||""}});
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
  if(dfd_codetype_v1Props?.setSearchFilters && dfd_codetype_v1Props?.data)
  {
    if(Array.isArray(dfd_codetype_v1Props.data) && dfd_codetype_v1Props.data.length > 0){
      setcode_type_informationd59aa((pre:any)=>({...pre,code_type:dfd_codetype_v1Props.data[0]?.code_type}));
    }
  }
  },[dfd_codetype_v1Props?.setSearchFilters])
  if (code_typeb31bb?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 7`,gridRow: `1 / 13`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={code_type_informationd59aa?.code_type||""}
         disabled= {code_typeb31bb?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Code Type'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Code Type"
      errorMessage={error}
        validationState={validate?.addCodeTypes_v1?.code_type ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcode_type
