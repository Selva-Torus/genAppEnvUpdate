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

const TextInputasset_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1|afb5b154f0054e88ac5cf9a8e577864d|properties.asset_code"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1|3e9a28cb4315c6f8b593953d0835eaf0|e6327259a0e56bf478fbda1271344a02"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'asset_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group7b86a, setgroup7b86a}= useContext(TotalContext) as TotalContextProps;
  const {group7b86aProps, setgroup7b86aProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {asst_name_text99231, setasst_name_text99231}= useContext(TotalContext) as TotalContextProps;
  const {asset_code44a02, setasset_code44a02}= useContext(TotalContext) as TotalContextProps;
  const {asset_name44e38, setasset_name44e38}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,authorityGrant_v1:{...pre?.authorityGrant_v1,asset_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setassets_group5eaf0((prev: any) => ({ ...prev, asset_code: +e.target.value }));
    }
    else{
    setassets_group5eaf0((prev: any) => ({ ...prev, asset_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7b86a,
        codeStates['setgroup'] = setgroup7b86a,
        codeStates['group7b86a'] = group7b86aProps,
        codeStates['setgroup7b86a'] = setgroup7b86aProps,
        codeStates['assets_group'] = assets_group5eaf0,
        codeStates['setassets_group'] = setassets_group5eaf0,
        codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
        codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
        codeStates['asst_name_text'] = asst_name_text99231,
        codeStates['setasst_name_text'] = setasst_name_text99231,
        codeStates['asset_code'] = asset_code44a02,
        codeStates['setasset_code'] = setasset_code44a02,
        codeStates['asset_name'] = asset_name44e38,
        codeStates['setasset_name'] = setasset_name44e38,
        codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
        codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
        codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
        codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,
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
        "3e9a28cb4315c6f8b593953d0835eaf0",
        "e6327259a0e56bf478fbda1271344a02"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1",
      //     componentId: "3e9a28cb4315c6f8b593953d0835eaf0",
      //     controlId: "e6327259a0e56bf478fbda1271344a02",
      //     isTable: false,
      //     from:"TextInputasset_code",
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
        setDynamicStateandType({name:'asset_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'asset_code',type:'text'};
      //   type={
      //     name:'asset_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'asset_code',type:'text'};
      //   type={
      //     name:'asset_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_code.type
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
  const assets_group5eaf0Ref = useRef<any>(assets_group5eaf0);
  useEffect(() => { assets_group5eaf0Ref.current = assets_group5eaf0; }, [assets_group5eaf0]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e6327259a0e56bf478fbda1271344a02") {
        handleChange({target:{value:assets_group5eaf0Ref?.current?.asset_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e6327259a0e56bf478fbda1271344a02") {
        handleBlur({target:{value:assets_group5eaf0Ref?.current?.asset_code||""}});
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
  if(dfd_authoritygrant_v1Props?.setSearchFilters && dfd_authoritygrant_v1Props?.data)
  {
    if(Array.isArray(dfd_authoritygrant_v1Props.data) && dfd_authoritygrant_v1Props.data.length > 0){
      setassets_group5eaf0((pre:any)=>({...pre,asset_code:dfd_authoritygrant_v1Props.data[0]?.asset_code}));
    }
  }
  },[dfd_authoritygrant_v1Props?.setSearchFilters])
  if (asset_code44a02?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `10 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={assets_group5eaf0?.asset_code||""}
         disabled= {asset_code44a02?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Asset Code"
      errorMessage={error}
        validationState={validate?.authorityGrant_v1?.asset_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputasset_code
