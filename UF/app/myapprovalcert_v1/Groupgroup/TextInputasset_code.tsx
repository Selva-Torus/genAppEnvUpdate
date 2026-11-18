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
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
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
  const {overall_group6cd49, setoverall_group6cd49}= useContext(TotalContext) as TotalContextProps;
  const {overall_group6cd49Props, setoverall_group6cd49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48d, setai_asset_version_table_group1b48d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48dProps, setai_asset_version_table_group1b48dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3, setgroupa86a3}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3Props, setgroupa86a3Props}= useContext(TotalContext) as TotalContextProps;
  const {textff0b2, settextff0b2}= useContext(TotalContext) as TotalContextProps;
  const {asset_codefdd43, setasset_codefdd43}= useContext(TotalContext) as TotalContextProps;
  const {asset_namefcdb4, setasset_namefcdb4}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8, setcertificate_table48fb8}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8Props, setcertificate_table48fb8Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,myapprovalCert_v1:{...pre?.myapprovalCert_v1,asset_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupa86a3((prev: any) => ({ ...prev, asset_code: +e.target.value }));
    }
    else{
    setgroupa86a3((prev: any) => ({ ...prev, asset_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group6cd49,
        codeStates['setoverall_group'] = setoverall_group6cd49,
        codeStates['overall_group6cd49'] = overall_group6cd49Props,
        codeStates['setoverall_group6cd49'] = setoverall_group6cd49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1b48d,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1b48d,
        codeStates['ai_asset_version_table_group1b48d'] = ai_asset_version_table_group1b48dProps,
        codeStates['setai_asset_version_table_group1b48d'] = setai_asset_version_table_group1b48dProps,
        codeStates['group'] = groupa86a3,
        codeStates['setgroup'] = setgroupa86a3,
        codeStates['groupa86a3'] = groupa86a3Props,
        codeStates['setgroupa86a3'] = setgroupa86a3Props,
        codeStates['text'] = textff0b2,
        codeStates['settext'] = settextff0b2,
        codeStates['asset_code'] = asset_codefdd43,
        codeStates['setasset_code'] = setasset_codefdd43,
        codeStates['asset_name'] = asset_namefcdb4,
        codeStates['setasset_name'] = setasset_namefcdb4,
        codeStates['certificate_table'] = certificate_table48fb8,
        codeStates['setcertificate_table'] = setcertificate_table48fb8,
        codeStates['certificate_table48fb8'] = certificate_table48fb8Props,
        codeStates['setcertificate_table48fb8'] = setcertificate_table48fb8Props,
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
        "d579c1aba846ccbf0250286bc61a86a3",
        "e044fcc1d51f42d8a7b88f6ce56fdd43"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:myapprovalCert:AFVK:v1",
      //     componentId: "d579c1aba846ccbf0250286bc61a86a3",
      //     controlId: "e044fcc1d51f42d8a7b88f6ce56fdd43",
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
  const groupa86a3Ref = useRef<any>(groupa86a3);
  useEffect(() => { groupa86a3Ref.current = groupa86a3; }, [groupa86a3]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e044fcc1d51f42d8a7b88f6ce56fdd43") {
        handleChange({target:{value:groupa86a3Ref?.current?.asset_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e044fcc1d51f42d8a7b88f6ce56fdd43") {
        handleBlur({target:{value:groupa86a3Ref?.current?.asset_code||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (asset_codefdd43?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={groupa86a3?.asset_code||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Asset Code"
      errorMessage={error}
        validationState={validate?.myapprovalCert_v1?.asset_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputasset_code
