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

const TextInputmessage_type_op = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'message_type_op',type:"text"})
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
  const {product_code_op8fcb1, setproduct_code_op8fcb1}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op_financ92df8, setproduct_code_op_financ92df8}= useContext(TotalContext) as TotalContextProps;
  const {message_type_opc2fc6, setmessage_type_opc2fc6}= useContext(TotalContext) as TotalContextProps;
  const {message_type_op_financcbd29, setmessage_type_op_financcbd29}= useContext(TotalContext) as TotalContextProps;
  const {date_op9a41b, setdate_op9a41b}= useContext(TotalContext) as TotalContextProps;
  const {date_op_fianc516b0, setdate_op_fianc516b0}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op4c851, setuuid_op4c851}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_financb7282, setuuid_op_financb7282}= useContext(TotalContext) as TotalContextProps;
  const {status_op98685, setstatus_op98685}= useContext(TotalContext) as TotalContextProps;
  const {status_op_financc8de7, setstatus_op_financc8de7}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason_op5ba8d, setreject_reason_op5ba8d}= useContext(TotalContext) as TotalContextProps;
  const {rej_reasn_op_financ13f05, setrej_reasn_op_financ13f05}= useContext(TotalContext) as TotalContextProps;
  const {submit_opcf1e2, setsubmit_opcf1e2}= useContext(TotalContext) as TotalContextProps;
  const {customwidget0c844, setcustomwidget0c844}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,message_type_op:undefined}}));
    if(dynamicStateandType.type=="number"){
    setop_financial_grp8a39a((prev: any) => ({ ...prev, message_type_op: +e.target.value }));
    }
    else{
    setop_financial_grp8a39a((prev: any) => ({ ...prev, message_type_op: e.target.value }));
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
        codeStates['product_code_op'] = product_code_op8fcb1,
        codeStates['setproduct_code_op'] = setproduct_code_op8fcb1,
        codeStates['product_code_op_financ'] = product_code_op_financ92df8,
        codeStates['setproduct_code_op_financ'] = setproduct_code_op_financ92df8,
        codeStates['message_type_op'] = message_type_opc2fc6,
        codeStates['setmessage_type_op'] = setmessage_type_opc2fc6,
        codeStates['message_type_op_financ'] = message_type_op_financcbd29,
        codeStates['setmessage_type_op_financ'] = setmessage_type_op_financcbd29,
        codeStates['date_op'] = date_op9a41b,
        codeStates['setdate_op'] = setdate_op9a41b,
        codeStates['date_op_fianc'] = date_op_fianc516b0,
        codeStates['setdate_op_fianc'] = setdate_op_fianc516b0,
        codeStates['uuid_op'] = uuid_op4c851,
        codeStates['setuuid_op'] = setuuid_op4c851,
        codeStates['uuid_op_financ'] = uuid_op_financb7282,
        codeStates['setuuid_op_financ'] = setuuid_op_financb7282,
        codeStates['status_op'] = status_op98685,
        codeStates['setstatus_op'] = setstatus_op98685,
        codeStates['status_op_financ'] = status_op_financc8de7,
        codeStates['setstatus_op_financ'] = setstatus_op_financc8de7,
        codeStates['reject_reason_op'] = reject_reason_op5ba8d,
        codeStates['setreject_reason_op'] = setreject_reason_op5ba8d,
        codeStates['rej_reasn_op_financ'] = rej_reasn_op_financ13f05,
        codeStates['setrej_reasn_op_financ'] = setrej_reasn_op_financ13f05,
        codeStates['submit_op'] = submit_opcf1e2,
        codeStates['setsubmit_op'] = setsubmit_opcf1e2,
        codeStates['customwidget'] = customwidget0c844,
        codeStates['setcustomwidget'] = setcustomwidget0c844,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
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
        "1687ee1f949f41fdbe50d7088248a39a",
        "b2306d23a6014996a51b7b4e8ddc2fc6"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1",
      //     componentId: "1687ee1f949f41fdbe50d7088248a39a",
      //     controlId: "b2306d23a6014996a51b7b4e8ddc2fc6",
      //     isTable: false,
      //     from:"TextInputmessage_type_op",
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
        setDynamicStateandType({name:'message_type_op', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'message_type_op',type:'text'};
      //   type={
      //     name:'message_type_op',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_type_op.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_type_op.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.message_type_op.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'message_type_op',type:'text'};
      //   type={
      //     name:'message_type_op',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_type_op.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_type_op.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.message_type_op.type
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
  const op_financial_grp8a39aRef = useRef<any>(op_financial_grp8a39a);
  useEffect(() => { op_financial_grp8a39aRef.current = op_financial_grp8a39a; }, [op_financial_grp8a39a]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b2306d23a6014996a51b7b4e8ddc2fc6") {
        handleChange({target:{value:op_financial_grp8a39aRef?.current?.message_type_op||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b2306d23a6014996a51b7b4e8ddc2fc6") {
        handleBlur({target:{value:op_financial_grp8a39aRef?.current?.message_type_op||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (message_type_opc2fc6?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `6 / 25`,gridRow: `11 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
        value={op_financial_grp8a39a?.message_type_op||""}
         disabled= {message_type_opc2fc6?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='PACS002'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.simulatorProcessUi_v1?.message_type_op ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputmessage_type_op
