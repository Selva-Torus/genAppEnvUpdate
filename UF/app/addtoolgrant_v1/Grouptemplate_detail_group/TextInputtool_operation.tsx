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

const TextInputtool_operation = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.tool_operation"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addToolGrant:AFVK:v1|76dd8f84384d52cc3851750c06de14a2|fee3f214247945779d2267546643f831"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'tool_operation',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupc4c71, setgroupc4c71}= useContext(TotalContext) as TotalContextProps;
  const {groupc4c71Props, setgroupc4c71Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2, settemplate_detail_groupe14a2}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2Props, settemplate_detail_groupe14a2Props}= useContext(TotalContext) as TotalContextProps;
  const {textfaa89, settextfaa89}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec9725, setasset_namec9725}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_namec6175, settool_asset_namec6175}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation3f831, settool_operation3f831}= useContext(TotalContext) as TotalContextProps;
  const {access_mode1a5e5, setaccess_mode1a5e5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43b, setdynamicactionce43b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43bProps, setdynamicactionce43bProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addToolGrant_v1:{...pre?.addToolGrant_v1,tool_operation:undefined}}));
    if(dynamicStateandType.type=="number"){
    settemplate_detail_groupe14a2((prev: any) => ({ ...prev, tool_operation: +e.target.value }));
    }
    else{
    settemplate_detail_groupe14a2((prev: any) => ({ ...prev, tool_operation: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupc4c71,
        codeStates['setgroup'] = setgroupc4c71,
        codeStates['groupc4c71'] = groupc4c71Props,
        codeStates['setgroupc4c71'] = setgroupc4c71Props,
        codeStates['template_detail_group'] = template_detail_groupe14a2,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupe14a2,
        codeStates['template_detail_groupe14a2'] = template_detail_groupe14a2Props,
        codeStates['settemplate_detail_groupe14a2'] = settemplate_detail_groupe14a2Props,
        codeStates['text'] = textfaa89,
        codeStates['settext'] = settextfaa89,
        codeStates['asset_name'] = asset_namec9725,
        codeStates['setasset_name'] = setasset_namec9725,
        codeStates['tool_asset_name'] = tool_asset_namec6175,
        codeStates['settool_asset_name'] = settool_asset_namec6175,
        codeStates['tool_operation'] = tool_operation3f831,
        codeStates['settool_operation'] = settool_operation3f831,
        codeStates['access_mode'] = access_mode1a5e5,
        codeStates['setaccess_mode'] = setaccess_mode1a5e5,
        codeStates['dynamicaction'] = dynamicactionce43b,
        codeStates['setdynamicaction'] = setdynamicactionce43b,
        codeStates['dynamicactionce43b'] = dynamicactionce43bProps,
        codeStates['setdynamicactionce43b'] = setdynamicactionce43bProps,
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
        "76dd8f84384d52cc3851750c06de14a2",
        "fee3f214247945779d2267546643f831"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addToolGrant:AFVK:v1",
      //     componentId: "76dd8f84384d52cc3851750c06de14a2",
      //     controlId: "fee3f214247945779d2267546643f831",
      //     isTable: false,
      //     from:"TextInputtool_operation",
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
        setDynamicStateandType({name:'tool_operation', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'tool_operation',type:'text'};
      //   type={
      //     name:'tool_operation',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.tool_operation.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.tool_operation.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.tool_operation.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'tool_operation',type:'text'};
      //   type={
      //     name:'tool_operation',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.tool_operation.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.tool_operation.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.tool_operation.type
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
  const template_detail_groupe14a2Ref = useRef<any>(template_detail_groupe14a2);
  useEffect(() => { template_detail_groupe14a2Ref.current = template_detail_groupe14a2; }, [template_detail_groupe14a2]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "fee3f214247945779d2267546643f831") {
        handleChange({target:{value:template_detail_groupe14a2Ref?.current?.tool_operation||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "fee3f214247945779d2267546643f831") {
        handleBlur({target:{value:template_detail_groupe14a2Ref?.current?.tool_operation||""}});
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
  if(dfd_toolgrant_v1Props?.setSearchFilters && dfd_toolgrant_v1Props?.data)
  {
    if(Array.isArray(dfd_toolgrant_v1Props.data) && dfd_toolgrant_v1Props.data.length > 0){
      settemplate_detail_groupe14a2((pre:any)=>({...pre,tool_operation:dfd_toolgrant_v1Props.data[0]?.tool_operation}));
    }
  }
  },[dfd_toolgrant_v1Props?.setSearchFilters])
  if (tool_operation3f831?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `23 / 37`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={template_detail_groupe14a2?.tool_operation||""}
         disabled= {tool_operation3f831?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Tool Operation '      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Tool Operation"
      errorMessage={error}
        validationState={validate?.addToolGrant_v1?.tool_operation ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtool_operation
