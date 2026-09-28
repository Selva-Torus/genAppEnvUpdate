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

const TextInputrecords_read = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.records_read"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationRun:AFVK:v1|219a2bc7e54645f9982b392b83ca6d32|cf8e7710634a4607b7e7668b7080c225"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'records_read',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {inegration_run_group5a7be, setinegration_run_group5a7be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_group5a7beProps, setinegration_run_group5a7beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {record_counts8e642, setrecord_counts8e642}= useContext(TotalContext) as TotalContextProps;
  const {records_read0c225, setrecords_read0c225}= useContext(TotalContext) as TotalContextProps;
  const {records_new7cbd3, setrecords_new7cbd3}= useContext(TotalContext) as TotalContextProps;
  const {records_updatedc20b9, setrecords_updatedc20b9}= useContext(TotalContext) as TotalContextProps;
  const {records_rejected068f2, setrecords_rejected068f2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addIntegrationRun_v1:{...pre?.addIntegrationRun_v1,records_read:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrecord_groupa6d32((prev: any) => ({ ...prev, records_read: +e.target.value }));
    }
    else{
    setrecord_groupa6d32((prev: any) => ({ ...prev, records_read: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['inegration_run_group'] = inegration_run_group5a7be,
        codeStates['setinegration_run_group'] = setinegration_run_group5a7be,
        codeStates['inegration_run_group5a7be'] = inegration_run_group5a7beProps,
        codeStates['setinegration_run_group5a7be'] = setinegration_run_group5a7beProps,
        codeStates['run_information_group'] = run_information_group519a1,
        codeStates['setrun_information_group'] = setrun_information_group519a1,
        codeStates['run_information_group519a1'] = run_information_group519a1Props,
        codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
        codeStates['record_group'] = record_groupa6d32,
        codeStates['setrecord_group'] = setrecord_groupa6d32,
        codeStates['record_groupa6d32'] = record_groupa6d32Props,
        codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
        codeStates['record_counts'] = record_counts8e642,
        codeStates['setrecord_counts'] = setrecord_counts8e642,
        codeStates['records_read'] = records_read0c225,
        codeStates['setrecords_read'] = setrecords_read0c225,
        codeStates['records_new'] = records_new7cbd3,
        codeStates['setrecords_new'] = setrecords_new7cbd3,
        codeStates['records_updated'] = records_updatedc20b9,
        codeStates['setrecords_updated'] = setrecords_updatedc20b9,
        codeStates['records_rejected'] = records_rejected068f2,
        codeStates['setrecords_rejected'] = setrecords_rejected068f2,
        codeStates['error_group'] = error_group193e2,
        codeStates['seterror_group'] = seterror_group193e2,
        codeStates['error_group193e2'] = error_group193e2Props,
        codeStates['seterror_group193e2'] = seterror_group193e2Props,
        codeStates['dynamicactions'] = dynamicactions669ce,
        codeStates['setdynamicactions'] = setdynamicactions669ce,
        codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
        codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
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
        "219a2bc7e54645f9982b392b83ca6d32",
        "cf8e7710634a4607b7e7668b7080c225"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationRun:AFVK:v1",
      //     componentId: "219a2bc7e54645f9982b392b83ca6d32",
      //     controlId: "cf8e7710634a4607b7e7668b7080c225",
      //     isTable: false,
      //     from:"TextInputrecords_read",
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
        setDynamicStateandType({name:'records_read', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'records_read',type:'text'};
      //   type={
      //     name:'records_read',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_read.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_read.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.records_read.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'records_read',type:'text'};
      //   type={
      //     name:'records_read',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_read.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_read.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.records_read.type
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
  const record_groupa6d32Ref = useRef<any>(record_groupa6d32);
  useEffect(() => { record_groupa6d32Ref.current = record_groupa6d32; }, [record_groupa6d32]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cf8e7710634a4607b7e7668b7080c225") {
        handleChange({target:{value:record_groupa6d32Ref?.current?.records_read||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cf8e7710634a4607b7e7668b7080c225") {
        handleBlur({target:{value:record_groupa6d32Ref?.current?.records_read||""}});
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
  if(dfd_integrationrun_v1Props?.setSearchFilters && dfd_integrationrun_v1Props?.data)
  {
    if(Array.isArray(dfd_integrationrun_v1Props.data) && dfd_integrationrun_v1Props.data.length > 0){
      setrecord_groupa6d32((pre:any)=>({...pre,records_read:dfd_integrationrun_v1Props.data[0]?.records_read}));
    }
  }
  },[dfd_integrationrun_v1Props?.setSearchFilters])
  if (records_read0c225?.isHidden) {
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
        value={record_groupa6d32?.records_read||""}
         disabled= {records_read0c225?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Records Read'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Records Read"
      errorMessage={error}
        validationState={validate?.addIntegrationRun_v1?.records_read ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrecords_read
