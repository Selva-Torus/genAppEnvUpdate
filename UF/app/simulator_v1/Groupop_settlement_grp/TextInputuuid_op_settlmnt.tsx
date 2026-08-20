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

const TextInputuuid_op_settlmnt = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'uuid_op_settlmnt',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_product_code63258, setop_setl_product_code63258}= useContext(TotalContext) as TotalContextProps;
  const {product_code_setl_op20fab, setproduct_code_setl_op20fab}= useContext(TotalContext) as TotalContextProps;
  const {msg_type_op_setlmnta011a, setmsg_type_op_setlmnta011a}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_message_type41552, setop_setl_message_type41552}= useContext(TotalContext) as TotalContextProps;
  const {op_setl_date62e49, setop_setl_date62e49}= useContext(TotalContext) as TotalContextProps;
  const {date_op_setlmntaf3c2, setdate_op_setlmntaf3c2}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_setlmntffbc8, setuuid_op_setlmntffbc8}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_settlmnt831e5, setuuid_op_settlmnt831e5}= useContext(TotalContext) as TotalContextProps;
  const {op_setlmnt_submit05756, setop_setlmnt_submit05756}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005Props, setip_financial66005Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:undefined}}));
    if(dynamicStateandType.type=="number"){
    setop_settlement_grpb706d((prev: any) => ({ ...prev, uuid_op_settlmnt: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setop_settlement_grpb706d((prev: any) => ({ ...prev, uuid_op_settlmnt: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial4735b'] = op_financial4735bProps,
        codeStates['setop_financial4735b'] = setop_financial4735bProps,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['op_setl_product_code'] = op_setl_product_code63258,
        codeStates['setop_setl_product_code'] = setop_setl_product_code63258,
        codeStates['product_code_setl_op'] = product_code_setl_op20fab,
        codeStates['setproduct_code_setl_op'] = setproduct_code_setl_op20fab,
        codeStates['msg_type_op_setlmnt'] = msg_type_op_setlmnta011a,
        codeStates['setmsg_type_op_setlmnt'] = setmsg_type_op_setlmnta011a,
        codeStates['op_setl_message_type'] = op_setl_message_type41552,
        codeStates['setop_setl_message_type'] = setop_setl_message_type41552,
        codeStates['op_setl_date'] = op_setl_date62e49,
        codeStates['setop_setl_date'] = setop_setl_date62e49,
        codeStates['date_op_setlmnt'] = date_op_setlmntaf3c2,
        codeStates['setdate_op_setlmnt'] = setdate_op_setlmntaf3c2,
        codeStates['uuid_op_setlmnt'] = uuid_op_setlmntffbc8,
        codeStates['setuuid_op_setlmnt'] = setuuid_op_setlmntffbc8,
        codeStates['uuid_op_settlmnt'] = uuid_op_settlmnt831e5,
        codeStates['setuuid_op_settlmnt'] = setuuid_op_settlmnt831e5,
        codeStates['op_setlmnt_submit'] = op_setlmnt_submit05756,
        codeStates['setop_setlmnt_submit'] = setop_setlmnt_submit05756,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_financial66005'] = ip_financial66005Props,
        codeStates['setip_financial66005'] = setip_financial66005Props,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
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
      if(op_settlement_grpb706d?.uuid_op_settlmnt == "" || op_settlement_grpb706d?.uuid_op_settlmnt == undefined){
      op_settlement_grpb706d.uuid_op_settlmnt = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, op_settlement_grpb706d?.uuid_op_settlmnt);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:"invalid"}}));
        }
    }else if(op_settlement_grpb706d?.uuid_op_settlmnt !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +op_settlement_grpb706d?.uuid_op_settlmnt);
        }
        else{
          validate = v.safeParse(schema, op_settlement_grpb706d?.uuid_op_settlmnt);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(op_settlement_grpb706d?.uuid_op_settlmnt == "" || op_settlement_grpb706d?.uuid_op_settlmnt == undefined){
      op_settlement_grpb706d.uuid_op_settlmnt = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, op_settlement_grpb706d?.uuid_op_settlmnt);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:"invalid"}}));
        }
    }else if(op_settlement_grpb706d?.uuid_op_settlmnt !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +op_settlement_grpb706d?.uuid_op_settlmnt);
        }
        else{
          validate = v.safeParse(schema, op_settlement_grpb706d?.uuid_op_settlmnt);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,uuid_op_settlmnt:undefined}}));
    }
    }
    if(!validate?.success){
      return
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "7ec4ecaee2d14b21944723cef4db706d",
        "cb5576067d924ac9b30bb3d5edf831e5"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1",
      //     componentId: "7ec4ecaee2d14b21944723cef4db706d",
      //     controlId: "cb5576067d924ac9b30bb3d5edf831e5",
      //     isTable: false,
      //     from:"TextInputuuid_op_settlmnt",
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
        setDynamicStateandType({name:'uuid_op_settlmnt', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'uuid_op_settlmnt',type:'text'};
      //   type={
      //     name:'uuid_op_settlmnt',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.uuid_op_settlmnt.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.uuid_op_settlmnt.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.uuid_op_settlmnt.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'uuid_op_settlmnt',type:'text'};
      //   type={
      //     name:'uuid_op_settlmnt',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.uuid_op_settlmnt.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.uuid_op_settlmnt.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.uuid_op_settlmnt.type
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
  const op_settlement_grpb706dRef = useRef<any>(op_settlement_grpb706d);
  useEffect(() => { op_settlement_grpb706dRef.current = op_settlement_grpb706d; }, [op_settlement_grpb706d]);
  useEffect(()=>{
      handleMapperValue();
      if(!op_settlement_grpb706d?.uuid_op_settlmnt)
      {
        setop_settlement_grpb706dProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cb5576067d924ac9b30bb3d5edf831e5") {
        handleChange({target:{value:op_settlement_grpb706dRef?.current?.uuid_op_settlmnt||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cb5576067d924ac9b30bb3d5edf831e5") {
        handleBlur({target:{value:op_settlement_grpb706dRef?.current?.uuid_op_settlmnt||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (uuid_op_settlmnt831e5?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `6 / 25`,gridRow: `30 / 38`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={op_settlement_grpb706d?.uuid_op_settlmnt||""}
         disabled= {uuid_op_settlmnt831e5?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.simulatorProcessUi_v1?.uuid_op_settlmnt ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputuuid_op_settlmnt
