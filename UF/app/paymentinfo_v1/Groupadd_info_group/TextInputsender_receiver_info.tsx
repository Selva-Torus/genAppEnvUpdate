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

const TextInputsender_receiver_info = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1|397522371992474f978940d3a1927219|properties.product_additional.properties.sender_receiver_info"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|7acc0e94b47140b8b61b1d88b85e8dc6|4dccb3c36654460499d2e0c3e8130c67"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_manualinitiationuimappingquery_v1Props, setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'sender_receiver_info',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_text_label19bc1, setadd_info_text_label19bc1}= useContext(TotalContext) as TotalContextProps;
  const {payment_method031c1, setpayment_method031c1}= useContext(TotalContext) as TotalContextProps;
  const {instruction_priorityafb4d, setinstruction_priorityafb4d}= useContext(TotalContext) as TotalContextProps;
  const {category_purposead521, setcategory_purposead521}= useContext(TotalContext) as TotalContextProps;
  const {remittance_info6fbdf, setremittance_info6fbdf}= useContext(TotalContext) as TotalContextProps;
  const {intermediary_institution45fe6, setintermediary_institution45fe6}= useContext(TotalContext) as TotalContextProps;
  const {sender_receiver_info30c67, setsender_receiver_info30c67}= useContext(TotalContext) as TotalContextProps;
  const {correspondent_bank2a7ae, setcorrespondent_bank2a7ae}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,sender_receiver_info:undefined}}));
    if(dynamicStateandType.type=="number"){
    setadd_info_groupe8dc6((prev: any) => ({ ...prev, sender_receiver_info: +e.target.value }));
    }
    else{
    setadd_info_groupe8dc6((prev: any) => ({ ...prev, sender_receiver_info: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['add_info_text_label'] = add_info_text_label19bc1,
        codeStates['setadd_info_text_label'] = setadd_info_text_label19bc1,
        codeStates['payment_method'] = payment_method031c1,
        codeStates['setpayment_method'] = setpayment_method031c1,
        codeStates['instruction_priority'] = instruction_priorityafb4d,
        codeStates['setinstruction_priority'] = setinstruction_priorityafb4d,
        codeStates['category_purpose'] = category_purposead521,
        codeStates['setcategory_purpose'] = setcategory_purposead521,
        codeStates['remittance_info'] = remittance_info6fbdf,
        codeStates['setremittance_info'] = setremittance_info6fbdf,
        codeStates['intermediary_institution'] = intermediary_institution45fe6,
        codeStates['setintermediary_institution'] = setintermediary_institution45fe6,
        codeStates['sender_receiver_info'] = sender_receiver_info30c67,
        codeStates['setsender_receiver_info'] = setsender_receiver_info30c67,
        codeStates['correspondent_bank'] = correspondent_bank2a7ae,
        codeStates['setcorrespondent_bank'] = setcorrespondent_bank2a7ae,
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
        "7acc0e94b47140b8b61b1d88b85e8dc6",
        "4dccb3c36654460499d2e0c3e8130c67"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1",
      //     componentId: "7acc0e94b47140b8b61b1d88b85e8dc6",
      //     controlId: "4dccb3c36654460499d2e0c3e8130c67",
      //     isTable: false,
      //     from:"TextInputsender_receiver_info",
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
        setDynamicStateandType({name:'sender_receiver_info', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'sender_receiver_info',type:'text'};
      //   type={
      //     name:'sender_receiver_info',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sender_receiver_info.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sender_receiver_info.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.sender_receiver_info.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'sender_receiver_info',type:'text'};
      //   type={
      //     name:'sender_receiver_info',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sender_receiver_info.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sender_receiver_info.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.sender_receiver_info.type
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
  const add_info_groupe8dc6Ref = useRef<any>(add_info_groupe8dc6);
  useEffect(() => { add_info_groupe8dc6Ref.current = add_info_groupe8dc6; }, [add_info_groupe8dc6]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "4dccb3c36654460499d2e0c3e8130c67") {
        handleChange({target:{value:add_info_groupe8dc6Ref?.current?.sender_receiver_info||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "4dccb3c36654460499d2e0c3e8130c67") {
        handleBlur({target:{value:add_info_groupe8dc6Ref?.current?.sender_receiver_info||""}});
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
  if(dfd_manualinitiationuimappingquery_v1Props?.setSearchFilters && dfd_manualinitiationuimappingquery_v1Props?.data)
  {
    if(Array.isArray(dfd_manualinitiationuimappingquery_v1Props.data) && dfd_manualinitiationuimappingquery_v1Props.data.length > 0){
      setadd_info_groupe8dc6((pre:any)=>({...pre,sender_receiver_info:dfd_manualinitiationuimappingquery_v1Props.data[0]?.sender_receiver_info}));
    }
  }
  },[dfd_manualinitiationuimappingquery_v1Props?.setSearchFilters])
  if (sender_receiver_info30c67?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `23 / 37`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={add_info_groupe8dc6?.sender_receiver_info||""}
         disabled= {sender_receiver_info30c67?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Sender Receiver Info"
      errorMessage={error}
        validationState={validate?.paymentInfo_v1?.sender_receiver_info ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsender_receiver_info
