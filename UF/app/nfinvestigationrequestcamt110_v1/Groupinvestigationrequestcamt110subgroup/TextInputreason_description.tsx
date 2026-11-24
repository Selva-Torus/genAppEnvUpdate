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

const TextInputreason_description = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1|f8a3cc18e5be43e493b48b711eda2b2d|properties.product_basic.properties.reason_description"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1|2400165be479e7a3dcf96a66d20276a5|d1aa13cb04ef9f49f5714c5f6d66d274"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTranMainTransaction:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'reason_description',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {investigationrequestcamt110maingroup7a2f5, setinvestigationrequestcamt110maingroup7a2f5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110maingroup7a2f5Props, setinvestigationrequestcamt110maingroup7a2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date9acc4, settran_date9acc4}= useContext(TotalContext) as TotalContextProps;
  const {message_code581ad, setmessage_code581ad}= useContext(TotalContext) as TotalContextProps;
  const {investigation_type576c6, setinvestigation_type576c6}= useContext(TotalContext) as TotalContextProps;
  const {investigation_reason74007, setinvestigation_reason74007}= useContext(TotalContext) as TotalContextProps;
  const {reason_description6d274, setreason_description6d274}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2, setinvestigationrequestcamt110dynamicactionsbfdc2}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2Props, setinvestigationrequestcamt110dynamicactionsbfdc2Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,nfInvestigationRequestCamt110_v1:{...pre?.nfInvestigationRequestCamt110_v1,reason_description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setinvestigationrequestcamt110subgroup276a5((prev: any) => ({ ...prev, reason_description: +e.target.value }));
    }
    else{
    setinvestigationrequestcamt110subgroup276a5((prev: any) => ({ ...prev, reason_description: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['investigationrequestcamt110maingroup'] = investigationrequestcamt110maingroup7a2f5,
        codeStates['setinvestigationrequestcamt110maingroup'] = setinvestigationrequestcamt110maingroup7a2f5,
        codeStates['investigationrequestcamt110maingroup7a2f5'] = investigationrequestcamt110maingroup7a2f5Props,
        codeStates['setinvestigationrequestcamt110maingroup7a2f5'] = setinvestigationrequestcamt110maingroup7a2f5Props,
        codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
        codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
        codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
        codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
        codeStates['tran_date'] = tran_date9acc4,
        codeStates['settran_date'] = settran_date9acc4,
        codeStates['message_code'] = message_code581ad,
        codeStates['setmessage_code'] = setmessage_code581ad,
        codeStates['investigation_type'] = investigation_type576c6,
        codeStates['setinvestigation_type'] = setinvestigation_type576c6,
        codeStates['investigation_reason'] = investigation_reason74007,
        codeStates['setinvestigation_reason'] = setinvestigation_reason74007,
        codeStates['reason_description'] = reason_description6d274,
        codeStates['setreason_description'] = setreason_description6d274,
        codeStates['investigationrequestcamt110dynamicactions'] = investigationrequestcamt110dynamicactionsbfdc2,
        codeStates['setinvestigationrequestcamt110dynamicactions'] = setinvestigationrequestcamt110dynamicactionsbfdc2,
        codeStates['investigationrequestcamt110dynamicactionsbfdc2'] = investigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['setinvestigationrequestcamt110dynamicactionsbfdc2'] = setinvestigationrequestcamt110dynamicactionsbfdc2Props,
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
        "2400165be479e7a3dcf96a66d20276a5",
        "d1aa13cb04ef9f49f5714c5f6d66d274"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1",
      //     componentId: "2400165be479e7a3dcf96a66d20276a5",
      //     controlId: "d1aa13cb04ef9f49f5714c5f6d66d274",
      //     isTable: false,
      //     from:"TextInputreason_description",
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
        setDynamicStateandType({name:'reason_description', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'reason_description',type:'text'};
      //   type={
      //     name:'reason_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.reason_description.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'reason_description',type:'text'};
      //   type={
      //     name:'reason_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.reason_description.type
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
  const investigationrequestcamt110subgroup276a5Ref = useRef<any>(investigationrequestcamt110subgroup276a5);
  useEffect(() => { investigationrequestcamt110subgroup276a5Ref.current = investigationrequestcamt110subgroup276a5; }, [investigationrequestcamt110subgroup276a5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d1aa13cb04ef9f49f5714c5f6d66d274") {
        handleChange({target:{value:investigationrequestcamt110subgroup276a5Ref?.current?.reason_description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d1aa13cb04ef9f49f5714c5f6d66d274") {
        handleBlur({target:{value:investigationrequestcamt110subgroup276a5Ref?.current?.reason_description||""}});
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
  if(dfd_nftranmaintransaction_v1Props?.setSearchFilters && dfd_nftranmaintransaction_v1Props?.data)
  {
    if(Array.isArray(dfd_nftranmaintransaction_v1Props.data) && dfd_nftranmaintransaction_v1Props.data.length > 0){
      setinvestigationrequestcamt110subgroup276a5((pre:any)=>({...pre,reason_description:dfd_nftranmaintransaction_v1Props.data[0]?.reason_description}));
    }
  }
  },[dfd_nftranmaintransaction_v1Props?.setSearchFilters])
  if (reason_description6d274?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `80 / 94`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={investigationrequestcamt110subgroup276a5?.reason_description||""}
         disabled= {reason_description6d274?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Additional Info"
      errorMessage={error}
        validationState={validate?.nfInvestigationRequestCamt110_v1?.reason_description ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputreason_description
