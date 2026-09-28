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

const TextInputrecords_rejected = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'records_rejected',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {inegration_run_groupaf8be, setinegration_run_groupaf8be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupaf8beProps, setinegration_run_groupaf8beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48, setrun_information_group6fd48}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48Props, setrun_information_group6fd48Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220c, settimeandstatus_groupb220c}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220cProps, settimeandstatus_groupb220cProps}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184, setrecord_groupdb184}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184Props, setrecord_groupdb184Props}= useContext(TotalContext) as TotalContextProps;
  const {record_countsc20ce, setrecord_countsc20ce}= useContext(TotalContext) as TotalContextProps;
  const {records_read0acd1, setrecords_read0acd1}= useContext(TotalContext) as TotalContextProps;
  const {records_new90a45, setrecords_new90a45}= useContext(TotalContext) as TotalContextProps;
  const {records_updated4b24c, setrecords_updated4b24c}= useContext(TotalContext) as TotalContextProps;
  const {records_rejecteda52d0, setrecords_rejecteda52d0}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbc, seterror_group9bfbc}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbcProps, seterror_group9bfbcProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewIntegrationRun_v1:{...pre?.viewIntegrationRun_v1,records_rejected:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrecord_groupdb184((prev: any) => ({ ...prev, records_rejected: +e.target.value }));
    }
    else{
    setrecord_groupdb184((prev: any) => ({ ...prev, records_rejected: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['inegration_run_group'] = inegration_run_groupaf8be,
        codeStates['setinegration_run_group'] = setinegration_run_groupaf8be,
        codeStates['inegration_run_groupaf8be'] = inegration_run_groupaf8beProps,
        codeStates['setinegration_run_groupaf8be'] = setinegration_run_groupaf8beProps,
        codeStates['run_information_group'] = run_information_group6fd48,
        codeStates['setrun_information_group'] = setrun_information_group6fd48,
        codeStates['run_information_group6fd48'] = run_information_group6fd48Props,
        codeStates['setrun_information_group6fd48'] = setrun_information_group6fd48Props,
        codeStates['timeandstatus_group'] = timeandstatus_groupb220c,
        codeStates['settimeandstatus_group'] = settimeandstatus_groupb220c,
        codeStates['timeandstatus_groupb220c'] = timeandstatus_groupb220cProps,
        codeStates['settimeandstatus_groupb220c'] = settimeandstatus_groupb220cProps,
        codeStates['record_group'] = record_groupdb184,
        codeStates['setrecord_group'] = setrecord_groupdb184,
        codeStates['record_groupdb184'] = record_groupdb184Props,
        codeStates['setrecord_groupdb184'] = setrecord_groupdb184Props,
        codeStates['record_counts'] = record_countsc20ce,
        codeStates['setrecord_counts'] = setrecord_countsc20ce,
        codeStates['records_read'] = records_read0acd1,
        codeStates['setrecords_read'] = setrecords_read0acd1,
        codeStates['records_new'] = records_new90a45,
        codeStates['setrecords_new'] = setrecords_new90a45,
        codeStates['records_updated'] = records_updated4b24c,
        codeStates['setrecords_updated'] = setrecords_updated4b24c,
        codeStates['records_rejected'] = records_rejecteda52d0,
        codeStates['setrecords_rejected'] = setrecords_rejecteda52d0,
        codeStates['error_group'] = error_group9bfbc,
        codeStates['seterror_group'] = seterror_group9bfbc,
        codeStates['error_group9bfbc'] = error_group9bfbcProps,
        codeStates['seterror_group9bfbc'] = seterror_group9bfbcProps,
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
        "a326f6452f3c4169b4196c7573ddb184",
        "766408da12cb4a83bbb1b4d4f8ba52d0"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationRun:AFVK:v1",
      //     componentId: "a326f6452f3c4169b4196c7573ddb184",
      //     controlId: "766408da12cb4a83bbb1b4d4f8ba52d0",
      //     isTable: false,
      //     from:"TextInputrecords_rejected",
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
        setDynamicStateandType({name:'records_rejected', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'records_rejected',type:'text'};
      //   type={
      //     name:'records_rejected',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_rejected.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_rejected.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_rejected.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'records_rejected',type:'text'};
      //   type={
      //     name:'records_rejected',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_rejected.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_rejected.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_rejected.type
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
  const record_groupdb184Ref = useRef<any>(record_groupdb184);
  useEffect(() => { record_groupdb184Ref.current = record_groupdb184; }, [record_groupdb184]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "766408da12cb4a83bbb1b4d4f8ba52d0") {
        handleChange({target:{value:record_groupdb184Ref?.current?.records_rejected||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "766408da12cb4a83bbb1b4d4f8ba52d0") {
        handleBlur({target:{value:record_groupdb184Ref?.current?.records_rejected||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (records_rejecteda52d0?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `27 / 39`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={record_groupdb184?.records_rejected||""}
         disabled= {records_rejecteda52d0?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Records Rejected'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Records Rejected"
      errorMessage={error}
        validationState={validate?.viewIntegrationRun_v1?.records_rejected ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrecords_rejected
