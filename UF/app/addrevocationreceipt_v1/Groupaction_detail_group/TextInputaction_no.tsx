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

const TextInputaction_no = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'action_no',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_textf637e, setasset_identity_textf637e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5ebdb, setasset_name5ebdb}= useContext(TotalContext) as TotalContextProps;
  const {action_noc3dfc, setaction_noc3dfc}= useContext(TotalContext) as TotalContextProps;
  const {enforcement_pointe970a, setenforcement_pointe970a}= useContext(TotalContext) as TotalContextProps;
  const {commandf580f, setcommandf580f}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,action_no:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaction_detail_group71892((prev: any) => ({ ...prev, action_no: +e.target.value }));
    }
    else{
    setaction_detail_group71892((prev: any) => ({ ...prev, action_no: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['asset_identity_text'] = asset_identity_textf637e,
        codeStates['setasset_identity_text'] = setasset_identity_textf637e,
        codeStates['asset_name'] = asset_name5ebdb,
        codeStates['setasset_name'] = setasset_name5ebdb,
        codeStates['action_no'] = action_noc3dfc,
        codeStates['setaction_no'] = setaction_noc3dfc,
        codeStates['enforcement_point'] = enforcement_pointe970a,
        codeStates['setenforcement_point'] = setenforcement_pointe970a,
        codeStates['command'] = commandf580f,
        codeStates['setcommand'] = setcommandf580f,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
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
        "0c1c5d72d927abe2e0adb9656e571892",
        "951a81927a824dddb76592de9e6c3dfc"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRevocationReceipt:AFVK:v1",
      //     componentId: "0c1c5d72d927abe2e0adb9656e571892",
      //     controlId: "951a81927a824dddb76592de9e6c3dfc",
      //     isTable: false,
      //     from:"TextInputaction_no",
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
        setDynamicStateandType({name:'action_no', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'action_no',type:'text'};
      //   type={
      //     name:'action_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.action_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.action_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.action_no.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'action_no',type:'text'};
      //   type={
      //     name:'action_no',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.action_no.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.action_no.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.action_no.type
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
  const action_detail_group71892Ref = useRef<any>(action_detail_group71892);
  useEffect(() => { action_detail_group71892Ref.current = action_detail_group71892; }, [action_detail_group71892]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "951a81927a824dddb76592de9e6c3dfc") {
        handleChange({target:{value:action_detail_group71892Ref?.current?.action_no||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "951a81927a824dddb76592de9e6c3dfc") {
        handleBlur({target:{value:action_detail_group71892Ref?.current?.action_no||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (action_noc3dfc?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `8 / 16`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={action_detail_group71892?.action_no||""}
        disabled={ true }
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Action No"
      errorMessage={error}
        validationState={validate?.addRevocationReceipt_v1?.action_no ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputaction_no
