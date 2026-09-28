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

const TextInputrule_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'rule_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {info_group95877, setinfo_group95877}= useContext(TotalContext) as TotalContextProps;
  const {info_group95877Props, setinfo_group95877Props}= useContext(TotalContext) as TotalContextProps;
  const {group76151, setgroup76151}= useContext(TotalContext) as TotalContextProps;
  const {group76151Props, setgroup76151Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule989a5, setinfo_rule989a5}= useContext(TotalContext) as TotalContextProps;
  const {rule_code50f07, setrule_code50f07}= useContext(TotalContext) as TotalContextProps;
  const {rule_namefa062, setrule_namefa062}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_dropa260b, setresult_tier_dropa260b}= useContext(TotalContext) as TotalContextProps;
  const {match_mode2079e, setmatch_mode2079e}= useContext(TotalContext) as TotalContextProps;
  const {descriptionbacec, setdescriptionbacec}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4, setrule_config_groupb9eb4}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4Props, setrule_config_groupb9eb4Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewRiskRules_v1:{...pre?.viewRiskRules_v1,rule_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup76151((prev: any) => ({ ...prev, rule_code: +e.target.value }));
    }
    else{
    setgroup76151((prev: any) => ({ ...prev, rule_code: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group95877,
        codeStates['setinfo_group'] = setinfo_group95877,
        codeStates['info_group95877'] = info_group95877Props,
        codeStates['setinfo_group95877'] = setinfo_group95877Props,
        codeStates['group'] = group76151,
        codeStates['setgroup'] = setgroup76151,
        codeStates['group76151'] = group76151Props,
        codeStates['setgroup76151'] = setgroup76151Props,
        codeStates['info_rule'] = info_rule989a5,
        codeStates['setinfo_rule'] = setinfo_rule989a5,
        codeStates['rule_code'] = rule_code50f07,
        codeStates['setrule_code'] = setrule_code50f07,
        codeStates['rule_name'] = rule_namefa062,
        codeStates['setrule_name'] = setrule_namefa062,
        codeStates['result_tier_drop'] = result_tier_dropa260b,
        codeStates['setresult_tier_drop'] = setresult_tier_dropa260b,
        codeStates['match_mode'] = match_mode2079e,
        codeStates['setmatch_mode'] = setmatch_mode2079e,
        codeStates['description'] = descriptionbacec,
        codeStates['setdescription'] = setdescriptionbacec,
        codeStates['rule_config_group'] = rule_config_groupb9eb4,
        codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
        codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
        codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
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
        "25957f8c4d643e280d850a0270a76151",
        "44ede26b998f812c14d332ca03750f07"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewRiskRules:AFVK:v1",
      //     componentId: "25957f8c4d643e280d850a0270a76151",
      //     controlId: "44ede26b998f812c14d332ca03750f07",
      //     isTable: false,
      //     from:"TextInputrule_code",
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
        setDynamicStateandType({name:'rule_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'rule_code',type:'text'};
      //   type={
      //     name:'rule_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.rule_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.rule_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.rule_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'rule_code',type:'text'};
      //   type={
      //     name:'rule_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.rule_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.rule_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.rule_code.type
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
  const group76151Ref = useRef<any>(group76151);
  useEffect(() => { group76151Ref.current = group76151; }, [group76151]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "44ede26b998f812c14d332ca03750f07") {
        handleChange({target:{value:group76151Ref?.current?.rule_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "44ede26b998f812c14d332ca03750f07") {
        handleBlur({target:{value:group76151Ref?.current?.rule_code||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (rule_code50f07?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 12`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={group76151?.rule_code||""}
         disabled= {rule_code50f07?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Rule Code"
      errorMessage={error}
        validationState={validate?.viewRiskRules_v1?.rule_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrule_code
