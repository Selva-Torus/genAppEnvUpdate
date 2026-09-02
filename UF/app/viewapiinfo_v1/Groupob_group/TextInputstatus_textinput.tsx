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

const TextInputstatus_textinput = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1|fcdd4a9059f84161990c20c300139cd7|properties.status"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1|58264eecca5f4b09982e0f561e876678|ce13eb442c7444408854f48c5bf62886"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_mongo_api_repository_dfd_v1Props, setdfd_mongo_api_repository_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'status',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {api_info_text692fd, setapi_info_text692fd}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textaccc0, setapi_name_textaccc0}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textinput4e4bf, setapi_name_textinput4e4bf}= useContext(TotalContext) as TotalContextProps;
  const {version_text67538, setversion_text67538}= useContext(TotalContext) as TotalContextProps;
  const {version_textinput19065, setversion_textinput19065}= useContext(TotalContext) as TotalContextProps;
  const {status_text66555, setstatus_text66555}= useContext(TotalContext) as TotalContextProps;
  const {status_textinput62886, setstatus_textinput62886}= useContext(TotalContext) as TotalContextProps;
  const {categiry_text7520b, setcategiry_text7520b}= useContext(TotalContext) as TotalContextProps;
  const {category_textinpute77d9, setcategory_textinpute77d9}= useContext(TotalContext) as TotalContextProps;
  const {date_text44a5e, setdate_text44a5e}= useContext(TotalContext) as TotalContextProps;
  const {date_textinputb262e, setdate_textinputb262e}= useContext(TotalContext) as TotalContextProps;
  const {path_textaf97a, setpath_textaf97a}= useContext(TotalContext) as TotalContextProps;
  const {path_textinputec3d3, setpath_textinputec3d3}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewApiInfo_v1:{...pre?.viewApiInfo_v1,status:undefined}}));
    if(dynamicStateandType.type=="number"){
    setob_group76678((prev: any) => ({ ...prev, status: +e.target.value }));
    }
    else{
    setob_group76678((prev: any) => ({ ...prev, status: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
        codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
        codeStates['group'] = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['group1f4ba'] = group1f4baProps,
        codeStates['setgroup1f4ba'] = setgroup1f4baProps,
        codeStates['api_info_group'] = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
        codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
        codeStates['total_calls_group'] = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['total_calls_group76982'] = total_calls_group76982Props,
        codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
        codeStates['success_rate_group'] = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
        codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
        codeStates['error_rate_group'] = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
        codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
        codeStates['ob_group'] = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['ob_group76678'] = ob_group76678Props,
        codeStates['setob_group76678'] = setob_group76678Props,
        codeStates['api_info_text'] = api_info_text692fd,
        codeStates['setapi_info_text'] = setapi_info_text692fd,
        codeStates['api_name_text'] = api_name_textaccc0,
        codeStates['setapi_name_text'] = setapi_name_textaccc0,
        codeStates['api_name_textinput'] = api_name_textinput4e4bf,
        codeStates['setapi_name_textinput'] = setapi_name_textinput4e4bf,
        codeStates['version_text'] = version_text67538,
        codeStates['setversion_text'] = setversion_text67538,
        codeStates['version_textinput'] = version_textinput19065,
        codeStates['setversion_textinput'] = setversion_textinput19065,
        codeStates['status_text'] = status_text66555,
        codeStates['setstatus_text'] = setstatus_text66555,
        codeStates['status_textinput'] = status_textinput62886,
        codeStates['setstatus_textinput'] = setstatus_textinput62886,
        codeStates['categiry_text'] = categiry_text7520b,
        codeStates['setcategiry_text'] = setcategiry_text7520b,
        codeStates['category_textinput'] = category_textinpute77d9,
        codeStates['setcategory_textinput'] = setcategory_textinpute77d9,
        codeStates['date_text'] = date_text44a5e,
        codeStates['setdate_text'] = setdate_text44a5e,
        codeStates['date_textinput'] = date_textinputb262e,
        codeStates['setdate_textinput'] = setdate_textinputb262e,
        codeStates['path_text'] = path_textaf97a,
        codeStates['setpath_text'] = setpath_textaf97a,
        codeStates['path_textinput'] = path_textinputec3d3,
        codeStates['setpath_textinput'] = setpath_textinputec3d3,
        codeStates['api_process_log_group'] = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
        codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
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
        "58264eecca5f4b09982e0f561e876678",
        "ce13eb442c7444408854f48c5bf62886"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1",
      //     componentId: "58264eecca5f4b09982e0f561e876678",
      //     controlId: "ce13eb442c7444408854f48c5bf62886",
      //     isTable: false,
      //     from:"TextInputstatus_textinput",
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
        setDynamicStateandType({name:'status', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type
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
  const ob_group76678Ref = useRef<any>(ob_group76678);
  useEffect(() => { ob_group76678Ref.current = ob_group76678; }, [ob_group76678]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "ce13eb442c7444408854f48c5bf62886") {
        handleChange({target:{value:ob_group76678Ref?.current?.status||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "ce13eb442c7444408854f48c5bf62886") {
        handleBlur({target:{value:ob_group76678Ref?.current?.status||""}});
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
  if(dfd_mongo_api_repository_dfd_v1Props?.setSearchFilters && dfd_mongo_api_repository_dfd_v1Props?.data)
  {
    if(Array.isArray(dfd_mongo_api_repository_dfd_v1Props.data) && dfd_mongo_api_repository_dfd_v1Props.data.length > 0){
      setob_group76678((pre:any)=>({...pre,status:dfd_mongo_api_repository_dfd_v1Props.data[0]?.status}));
    }
  }
  },[dfd_mongo_api_repository_dfd_v1Props?.setSearchFilters])
  if (status_textinput62886?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 25`,gridRow: `36 / 45`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-xl"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={ob_group76678?.status||""}
         disabled= {status_textinput62886?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.viewApiInfo_v1?.status ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstatus_textinput
