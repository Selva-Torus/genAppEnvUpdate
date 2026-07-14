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
import { getCookie } from '@/app/components/cookieMgment';
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

const TextInputusername = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const actionDetails : any = {
  "action": {
    "lock": {
      "ttl": "",
      "name": "",
      "lockMode": ""
    },
    "events": {},
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "stateTransition": {
      "sourceQueue": "",
      "targetQueue": "",
      "sourceStatus": "",
      "targetStatus": ""
    }
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:userdfd:AFVK:v1|9afa492b0cb145cfaf8c74ce82116ae8|properties.name"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:checker:AFVK:v1|483ca5367a434fa98cc801f66507fd3f|d497d46e60c146e9ac8b757be6f0985a"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:userdfd:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_userdfd_v1Props, setdfd_userdfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group7fd3f, setgroup7fd3f}= useContext(TotalContext) as TotalContextProps;
  const {group7fd3fProps, setgroup7fd3fProps}= useContext(TotalContext) as TotalContextProps;
  const {username0985a, setusername0985a}= useContext(TotalContext) as TotalContextProps;
  const {approvec8dd3, setapprovec8dd3}= useContext(TotalContext) as TotalContextProps;
  const {tablecb5d6, settablecb5d6}= useContext(TotalContext) as TotalContextProps;
  const {tablecb5d6Props, settablecb5d6Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,checker_v1:{...pre?.checker_v1,name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup7fd3f((prev: any) => ({ ...prev, name: +e.target.value }));
    }
    else{
    setgroup7fd3f((prev: any) => ({ ...prev, name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7fd3f,
        codeStates['setgroup'] = setgroup7fd3f,
        codeStates['group7fd3f'] = group7fd3fProps,
        codeStates['setgroup7fd3f'] = setgroup7fd3fProps,
        codeStates['username'] = username0985a,
        codeStates['setusername'] = setusername0985a,
        codeStates['approve'] = approvec8dd3,
        codeStates['setapprove'] = setapprovec8dd3,
        codeStates['table'] = tablecb5d6,
        codeStates['settable'] = settablecb5d6,
        codeStates['tablecb5d6'] = tablecb5d6Props,
        codeStates['settablecb5d6'] = settablecb5d6Props,
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
        "483ca5367a434fa98cc801f66507fd3f",
        "d497d46e60c146e9ac8b757be6f0985a"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:checker:AFVK:v1",
      //     componentId: "483ca5367a434fa98cc801f66507fd3f",
      //     controlId: "d497d46e60c146e9ac8b757be6f0985a",
      //     isTable: false,
      //     from:"TextInputusername",
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
        setDynamicStateandType({name:'name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'name',type:'text'};
      //   type={
      //     name:'name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'name',type:'text'};
      //   type={
      //     name:'name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.name.type
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
  const group7fd3fRef = useRef<any>(group7fd3f);
  useEffect(() => { group7fd3fRef.current = group7fd3f; }, [group7fd3f]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d497d46e60c146e9ac8b757be6f0985a") {
        handleChange({target:{value:group7fd3fRef?.current?.name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d497d46e60c146e9ac8b757be6f0985a") {
        handleBlur({target:{value:group7fd3fRef?.current?.name||""}});
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
  if(dfd_userdfd_v1Props?.setSearchFilters && dfd_userdfd_v1Props?.data)
  {
    if(Array.isArray(dfd_userdfd_v1Props.data) && dfd_userdfd_v1Props.data.length > 0){
      setgroup7fd3f((pre:any)=>({...pre,name:dfd_userdfd_v1Props.data[0]?.name}));
    }
  }
  },[dfd_userdfd_v1Props?.setSearchFilters])
  if (username0985a?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `7 / 14`,gridRow: `17 / 38`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("username")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={group7fd3f?.name||""}
         disabled= {username0985a?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.checker_v1?.name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputusername
