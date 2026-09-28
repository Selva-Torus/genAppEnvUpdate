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

const TextInputpriority_order = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'priority_order',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule00a91, setinfo_rule00a91}= useContext(TotalContext) as TotalContextProps;
  const {priority_orderebd55, setpriority_orderebd55}= useContext(TotalContext) as TotalContextProps;
  const {is_activefb18e, setis_activefb18e}= useContext(TotalContext) as TotalContextProps;
  const {effective_toc5034, seteffective_toc5034}= useContext(TotalContext) as TotalContextProps;
  const {effective_fromfc1bf, seteffective_fromfc1bf}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addRiskRule_v1:{...pre?.addRiskRule_v1,priority_order:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrule_config_groupa38fa((prev: any) => ({ ...prev, priority_order: +e.target.value }));
    }
    else{
    setrule_config_groupa38fa((prev: any) => ({ ...prev, priority_order: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group69a49,
        codeStates['setinfo_group'] = setinfo_group69a49,
        codeStates['info_group69a49'] = info_group69a49Props,
        codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
        codeStates['group'] = groupc3f8e,
        codeStates['setgroup'] = setgroupc3f8e,
        codeStates['groupc3f8e'] = groupc3f8eProps,
        codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
        codeStates['rule_config_group'] = rule_config_groupa38fa,
        codeStates['setrule_config_group'] = setrule_config_groupa38fa,
        codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
        codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
        codeStates['info_rule'] = info_rule00a91,
        codeStates['setinfo_rule'] = setinfo_rule00a91,
        codeStates['priority_order'] = priority_orderebd55,
        codeStates['setpriority_order'] = setpriority_orderebd55,
        codeStates['is_active'] = is_activefb18e,
        codeStates['setis_active'] = setis_activefb18e,
        codeStates['effective_to'] = effective_toc5034,
        codeStates['seteffective_to'] = seteffective_toc5034,
        codeStates['effective_from'] = effective_fromfc1bf,
        codeStates['seteffective_from'] = seteffective_fromfc1bf,
        codeStates['dynamicactions'] = dynamicactions618ef,
        codeStates['setdynamicactions'] = setdynamicactions618ef,
        codeStates['dynamicactions618ef'] = dynamicactions618efProps,
        codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
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
        "788963b195ce493bb5a84ef9698a38fa",
        "5aaed0744050469cba7f4b0e137ebd55"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRiskRule:AFVK:v1",
      //     componentId: "788963b195ce493bb5a84ef9698a38fa",
      //     controlId: "5aaed0744050469cba7f4b0e137ebd55",
      //     isTable: false,
      //     from:"TextInputpriority_order",
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
        setDynamicStateandType({name:'priority_order', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'priority_order',type:'text'};
      //   type={
      //     name:'priority_order',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.priority_order.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.priority_order.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.priority_order.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'priority_order',type:'text'};
      //   type={
      //     name:'priority_order',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.priority_order.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.priority_order.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.priority_order.type
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
  const rule_config_groupa38faRef = useRef<any>(rule_config_groupa38fa);
  useEffect(() => { rule_config_groupa38faRef.current = rule_config_groupa38fa; }, [rule_config_groupa38fa]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "5aaed0744050469cba7f4b0e137ebd55") {
        handleChange({target:{value:rule_config_groupa38faRef?.current?.priority_order||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5aaed0744050469cba7f4b0e137ebd55") {
        handleBlur({target:{value:rule_config_groupa38faRef?.current?.priority_order||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (priority_orderebd55?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 16`,gridRow: `9 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={rule_config_groupa38fa?.priority_order||""}
         disabled= {priority_orderebd55?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Priority Order"
      errorMessage={error}
        validationState={validate?.addRiskRule_v1?.priority_order ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputpriority_order
