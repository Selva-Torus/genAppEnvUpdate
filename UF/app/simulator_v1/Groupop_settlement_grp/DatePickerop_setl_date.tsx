

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerop_setl_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [isRequiredData,setIsRequiredData]=useState<boolean>(false)
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  //showComponentAsPopup || showArtifactAsModal
    
  /////////////
   //another screen
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps  
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps  
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps  
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps  
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps  
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps  
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps  
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps  
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps  
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps  
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps  
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps  
  const {op_setl_product_code63258, setop_setl_product_code63258}= useContext(TotalContext) as TotalContextProps  
  const {product_code_setl_op20fab, setproduct_code_setl_op20fab}= useContext(TotalContext) as TotalContextProps  
  const {msg_type_op_setlmnta011a, setmsg_type_op_setlmnta011a}= useContext(TotalContext) as TotalContextProps  
  const {op_setl_message_type41552, setop_setl_message_type41552}= useContext(TotalContext) as TotalContextProps  
  const {op_setl_date62e49, setop_setl_date62e49}= useContext(TotalContext) as TotalContextProps  
  const {date_op_setlmntaf3c2, setdate_op_setlmntaf3c2}= useContext(TotalContext) as TotalContextProps  
  const {uuid_op_setlmntffbc8, setuuid_op_setlmntffbc8}= useContext(TotalContext) as TotalContextProps  
  const {uuid_op_settlmnt831e5, setuuid_op_settlmnt831e5}= useContext(TotalContext) as TotalContextProps  
  const {op_setlmnt_submit05756, setop_setlmnt_submit05756}= useContext(TotalContext) as TotalContextProps  
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps  
  const {ip_financial66005Props, setip_financial66005Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps  
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps  
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps  
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps  
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps  
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps  
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps  
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps  
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps  
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,op_setl_date:undefined}}));
  if (!date) {
    setop_settlement_grpb706d((prev: any) => ({ ...prev, op_setl_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setop_settlement_grpb706d((prev: any) => ({ ...prev, op_setl_date: isoDate }))
  }catch (err: any) {
    //setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
}



const handleBlur=async () => {
    //validation
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "7ec4ecaee2d14b21944723cef4db706d",
        "30df951483ae460db91edcb9a0b62e49"
      );
    code=orchestrationData?.data?.code
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
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!op_settlement_grpb706d?.op_setl_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setop_settlement_grpb706d((pre:any)=>({...pre,op_setl_date:indiaToday.toISOString()}))
    }
  setop_settlement_grpb706dProps((pre:any)=>({...pre,validation:true}))
 },[op_setl_date62e49?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (op_setl_date62e49?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `6 / 25`,gridRow: `20 / 28`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("")}
      value={op_settlement_grpb706d?.op_setl_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled={ true }
      contentAlign={"center"}
      dateValidation=""
      validationState={validate?.simulatorProcessUi_v1?.op_setl_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerop_setl_date
