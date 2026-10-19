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

const TextInputasset_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'asset_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps;
  const {text6b74d, settext6b74d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code06f11, setasset_code06f11}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameb51b6, setasset_nameb51b6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code5e03f, setcert_code5e03f}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,asset_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setasset_group173fd((prev: any) => ({ ...prev, asset_name: +e.target.value }));
    }
    else{
    setasset_group173fd((prev: any) => ({ ...prev, asset_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['cert_stage_group'] = cert_stage_groupf8b90,
        codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
        codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
        codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
        codeStates['asset_group'] = asset_group173fd,
        codeStates['setasset_group'] = setasset_group173fd,
        codeStates['asset_group173fd'] = asset_group173fdProps,
        codeStates['setasset_group173fd'] = setasset_group173fdProps,
        codeStates['text'] = text6b74d,
        codeStates['settext'] = settext6b74d,
        codeStates['asset_code'] = asset_code06f11,
        codeStates['setasset_code'] = setasset_code06f11,
        codeStates['asset_name'] = asset_nameb51b6,
        codeStates['setasset_name'] = setasset_nameb51b6,
        codeStates['cert_code'] = cert_code5e03f,
        codeStates['setcert_code'] = setcert_code5e03f,
        codeStates['stage_group_1'] = stage_group_10fb7d,
        codeStates['setstage_group_1'] = setstage_group_10fb7d,
        codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
        codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
        codeStates['stage_group_2'] = stage_group_24dcf0,
        codeStates['setstage_group_2'] = setstage_group_24dcf0,
        codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
        codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
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
        "d4434c0281b84113a5cd7c7bff3173fd",
        "6e7604fdfd1e4104a0dcc9c7a80b51b6"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:editCertificationStages:AFVK:v1",
      //     componentId: "d4434c0281b84113a5cd7c7bff3173fd",
      //     controlId: "6e7604fdfd1e4104a0dcc9c7a80b51b6",
      //     isTable: false,
      //     from:"TextInputasset_name",
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
        setDynamicStateandType({name:'asset_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'asset_name',type:'text'};
      //   type={
      //     name:'asset_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.asset_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'asset_name',type:'text'};
      //   type={
      //     name:'asset_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.asset_name.type
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
  const asset_group173fdRef = useRef<any>(asset_group173fd);
  useEffect(() => { asset_group173fdRef.current = asset_group173fd; }, [asset_group173fd]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6e7604fdfd1e4104a0dcc9c7a80b51b6") {
        handleChange({target:{value:asset_group173fdRef?.current?.asset_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6e7604fdfd1e4104a0dcc9c7a80b51b6") {
        handleBlur({target:{value:asset_group173fdRef?.current?.asset_name||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (asset_nameb51b6?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={asset_group173fd?.asset_name||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Asset Name"
      errorMessage={error}
        validationState={validate?.editCertificationStages_v1?.asset_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputasset_name
