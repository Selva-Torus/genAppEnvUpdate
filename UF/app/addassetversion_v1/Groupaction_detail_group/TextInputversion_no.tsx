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

const TextInputversion_no = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'version_no',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_group1505e, setoverall_group1505e}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1505eProps, setoverall_group1505eProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6, setaction_details_group51bc6}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6Props, setaction_details_group51bc6Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126, setaction_detail_group32126}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126Props, setaction_detail_group32126Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_textabb79, setasset_identity_textabb79}= useContext(TotalContext) as TotalContextProps;
  const {asset_name3bf18, setasset_name3bf18}= useContext(TotalContext) as TotalContextProps;
  const {version_no81c54, setversion_no81c54}= useContext(TotalContext) as TotalContextProps;
  const {change_type_codea327e, setchange_type_codea327e}= useContext(TotalContext) as TotalContextProps;
  const {change_reason01747, setchange_reason01747}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7c, setrisk_conf_group60f7c}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7cProps, setrisk_conf_group60f7cProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385, setdynamicactionsae385}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385Props, setdynamicactionsae385Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addAssetVersion_v1:{...pre?.addAssetVersion_v1,version_no:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaction_detail_group32126((prev: any) => ({ ...prev, version_no: +e.target.value }));
    }
    else{
    setaction_detail_group32126((prev: any) => ({ ...prev, version_no: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group1505e,
        codeStates['setoverall_group'] = setoverall_group1505e,
        codeStates['overall_group1505e'] = overall_group1505eProps,
        codeStates['setoverall_group1505e'] = setoverall_group1505eProps,
        codeStates['action_details_group'] = action_details_group51bc6,
        codeStates['setaction_details_group'] = setaction_details_group51bc6,
        codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
        codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
        codeStates['action_detail_group'] = action_detail_group32126,
        codeStates['setaction_detail_group'] = setaction_detail_group32126,
        codeStates['action_detail_group32126'] = action_detail_group32126Props,
        codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
        codeStates['asset_identity_text'] = asset_identity_textabb79,
        codeStates['setasset_identity_text'] = setasset_identity_textabb79,
        codeStates['asset_name'] = asset_name3bf18,
        codeStates['setasset_name'] = setasset_name3bf18,
        codeStates['version_no'] = version_no81c54,
        codeStates['setversion_no'] = setversion_no81c54,
        codeStates['change_type_code'] = change_type_codea327e,
        codeStates['setchange_type_code'] = setchange_type_codea327e,
        codeStates['change_reason'] = change_reason01747,
        codeStates['setchange_reason'] = setchange_reason01747,
        codeStates['risk_conf_group'] = risk_conf_group60f7c,
        codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
        codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
        codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
        codeStates['dynamicactions'] = dynamicactionsae385,
        codeStates['setdynamicactions'] = setdynamicactionsae385,
        codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
        codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,
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
        "92ce0d28ebafa504e5fcd05661032126",
        "484b93b0121e163c847f9775b7981c54"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAssetVersion:AFVK:v1",
      //     componentId: "92ce0d28ebafa504e5fcd05661032126",
      //     controlId: "484b93b0121e163c847f9775b7981c54",
      //     isTable: false,
      //     from:"TextInputversion_no",
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
        setDynamicStateandType({name:'version_no', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'version_no',type:'text'};
      //   type={
      //     name:'version_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.version_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.version_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.version_no.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'version_no',type:'text'};
      //   type={
      //     name:'version_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.version_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.version_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.version_no.type
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
  const action_detail_group32126Ref = useRef<any>(action_detail_group32126);
  useEffect(() => { action_detail_group32126Ref.current = action_detail_group32126; }, [action_detail_group32126]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "484b93b0121e163c847f9775b7981c54") {
        handleChange({target:{value:action_detail_group32126Ref?.current?.version_no||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "484b93b0121e163c847f9775b7981c54") {
        handleBlur({target:{value:action_detail_group32126Ref?.current?.version_no||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (version_no81c54?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={action_detail_group32126?.version_no||""}
         disabled= {version_no81c54?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Version No"
      errorMessage={error}
        validationState={validate?.addAssetVersion_v1?.version_no ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputversion_no
