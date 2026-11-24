

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
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerop_110_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007}= useContext(TotalContext) as TotalContextProps  
  const {acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props}= useContext(TotalContext) as TotalContextProps  
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c}= useContext(TotalContext) as TotalContextProps  
  const {ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps}= useContext(TotalContext) as TotalContextProps  
  const {op_financial_tab_headerc391f, setop_financial_tab_headerc391f}= useContext(TotalContext) as TotalContextProps  
  const {op_financial_tab_headerc391fProps, setop_financial_tab_headerc391fProps}= useContext(TotalContext) as TotalContextProps  
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba}= useContext(TotalContext) as TotalContextProps  
  const {op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps}= useContext(TotalContext) as TotalContextProps  
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a}= useContext(TotalContext) as TotalContextProps  
  const {customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_financial_tab_header60896, setip_financial_tab_header60896}= useContext(TotalContext) as TotalContextProps  
  const {ip_financial_tab_header60896Props, setip_financial_tab_header60896Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8}= useContext(TotalContext) as TotalContextProps  
  const {ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849}= useContext(TotalContext) as TotalContextProps  
  const {ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b}= useContext(TotalContext) as TotalContextProps  
  const {ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps}= useContext(TotalContext) as TotalContextProps  
  const {op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71}= useContext(TotalContext) as TotalContextProps  
  const {op_nf_camt110_tab_header4fa71Props, setop_nf_camt110_tab_header4fa71Props}= useContext(TotalContext) as TotalContextProps  
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed}= useContext(TotalContext) as TotalContextProps  
  const {op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps}= useContext(TotalContext) as TotalContextProps  
  const {op_110_productcodec2128, setop_110_productcodec2128}= useContext(TotalContext) as TotalContextProps  
  const {op_110_message_type8876c, setop_110_message_type8876c}= useContext(TotalContext) as TotalContextProps  
  const {op_110_date89cec, setop_110_date89cec}= useContext(TotalContext) as TotalContextProps  
  const {op_110_uuid82718, setop_110_uuid82718}= useContext(TotalContext) as TotalContextProps  
  const {op_110_request_type2c432, setop_110_request_type2c432}= useContext(TotalContext) as TotalContextProps  
  const {op_110_request_reason6d6fa, setop_110_request_reason6d6fa}= useContext(TotalContext) as TotalContextProps  
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0}= useContext(TotalContext) as TotalContextProps  
  const {op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props}= useContext(TotalContext) as TotalContextProps  
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89}= useContext(TotalContext) as TotalContextProps  
  const {op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props}= useContext(TotalContext) as TotalContextProps  
  const {op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0}= useContext(TotalContext) as TotalContextProps  
  const {op_nf_camt111_tab_header05ca0Props, setop_nf_camt111_tab_header05ca0Props}= useContext(TotalContext) as TotalContextProps  
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6}= useContext(TotalContext) as TotalContextProps  
  const {op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props}= useContext(TotalContext) as TotalContextProps  
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308}= useContext(TotalContext) as TotalContextProps  
  const {op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props}= useContext(TotalContext) as TotalContextProps  
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7}= useContext(TotalContext) as TotalContextProps  
  const {op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62}= useContext(TotalContext) as TotalContextProps  
  const {ip_nf_camt055_tab_header06c62Props, setip_nf_camt055_tab_header06c62Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216}= useContext(TotalContext) as TotalContextProps  
  const {ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550}= useContext(TotalContext) as TotalContextProps  
  const {ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props}= useContext(TotalContext) as TotalContextProps  
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c}= useContext(TotalContext) as TotalContextProps  
  const {ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_date:undefined}}));
  if (!date) {
    setop_camt110_simulator_sub_group6f9ed((prev: any) => ({ ...prev, op_110_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setop_camt110_simulator_sub_group6f9ed((prev: any) => ({ ...prev, op_110_date: isoDate }))
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
        "464c56fd25ac4c81ba61b110d986f9ed",
        "d551f1404d2347e5a1f7472177c89cec"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['acksimulatormaingroup'] = acksimulatormaingroup3a007,
    codeStates['setacksimulatormaingroup'] = setacksimulatormaingroup3a007,
    codeStates['acksimulatormaingroup3a007'] = acksimulatormaingroup3a007Props,
    codeStates['setacksimulatormaingroup3a007'] = setacksimulatormaingroup3a007Props,
    codeStates['ack_simulator_tab_group'] = ack_simulator_tab_group0778c,
    codeStates['setack_simulator_tab_group'] = setack_simulator_tab_group0778c,
    codeStates['ack_simulator_tab_group0778c'] = ack_simulator_tab_group0778cProps,
    codeStates['setack_simulator_tab_group0778c'] = setack_simulator_tab_group0778cProps,
    codeStates['op_financial_tab_header'] = op_financial_tab_headerc391f,
    codeStates['setop_financial_tab_header'] = setop_financial_tab_headerc391f,
    codeStates['op_financial_tab_headerc391f'] = op_financial_tab_headerc391fProps,
    codeStates['setop_financial_tab_headerc391f'] = setop_financial_tab_headerc391fProps,
    codeStates['op_simulator_sub_group'] = op_simulator_sub_group467ba,
    codeStates['setop_simulator_sub_group'] = setop_simulator_sub_group467ba,
    codeStates['op_simulator_sub_group467ba'] = op_simulator_sub_group467baProps,
    codeStates['setop_simulator_sub_group467ba'] = setop_simulator_sub_group467baProps,
    codeStates['customwidgetmaingroup'] = customwidgetmaingroupcf43a,
    codeStates['setcustomwidgetmaingroup'] = setcustomwidgetmaingroupcf43a,
    codeStates['customwidgetmaingroupcf43a'] = customwidgetmaingroupcf43aProps,
    codeStates['setcustomwidgetmaingroupcf43a'] = setcustomwidgetmaingroupcf43aProps,
    codeStates['dynamicactionmaingroup'] = dynamicactionmaingroupd3a78,
    codeStates['setdynamicactionmaingroup'] = setdynamicactionmaingroupd3a78,
    codeStates['dynamicactionmaingroupd3a78'] = dynamicactionmaingroupd3a78Props,
    codeStates['setdynamicactionmaingroupd3a78'] = setdynamicactionmaingroupd3a78Props,
    codeStates['dynamicactionsubgroup'] = dynamicactionsubgroupa58e6,
    codeStates['setdynamicactionsubgroup'] = setdynamicactionsubgroupa58e6,
    codeStates['dynamicactionsubgroupa58e6'] = dynamicactionsubgroupa58e6Props,
    codeStates['setdynamicactionsubgroupa58e6'] = setdynamicactionsubgroupa58e6Props,
    codeStates['ip_financial_tab_header'] = ip_financial_tab_header60896,
    codeStates['setip_financial_tab_header'] = setip_financial_tab_header60896,
    codeStates['ip_financial_tab_header60896'] = ip_financial_tab_header60896Props,
    codeStates['setip_financial_tab_header60896'] = setip_financial_tab_header60896Props,
    codeStates['ip_simulator_sub_group'] = ip_simulator_sub_groupa1dc8,
    codeStates['setip_simulator_sub_group'] = setip_simulator_sub_groupa1dc8,
    codeStates['ip_simulator_sub_groupa1dc8'] = ip_simulator_sub_groupa1dc8Props,
    codeStates['setip_simulator_sub_groupa1dc8'] = setip_simulator_sub_groupa1dc8Props,
    codeStates['ip_dynamicactionmaingroup'] = ip_dynamicactionmaingroup2f849,
    codeStates['setip_dynamicactionmaingroup'] = setip_dynamicactionmaingroup2f849,
    codeStates['ip_dynamicactionmaingroup2f849'] = ip_dynamicactionmaingroup2f849Props,
    codeStates['setip_dynamicactionmaingroup2f849'] = setip_dynamicactionmaingroup2f849Props,
    codeStates['ip_dynamicactionsubgroup'] = ip_dynamicactionsubgroup31c5b,
    codeStates['setip_dynamicactionsubgroup'] = setip_dynamicactionsubgroup31c5b,
    codeStates['ip_dynamicactionsubgroup31c5b'] = ip_dynamicactionsubgroup31c5bProps,
    codeStates['setip_dynamicactionsubgroup31c5b'] = setip_dynamicactionsubgroup31c5bProps,
    codeStates['op_nf_camt110_tab_header'] = op_nf_camt110_tab_header4fa71,
    codeStates['setop_nf_camt110_tab_header'] = setop_nf_camt110_tab_header4fa71,
    codeStates['op_nf_camt110_tab_header4fa71'] = op_nf_camt110_tab_header4fa71Props,
    codeStates['setop_nf_camt110_tab_header4fa71'] = setop_nf_camt110_tab_header4fa71Props,
    codeStates['op_camt110_simulator_sub_group'] = op_camt110_simulator_sub_group6f9ed,
    codeStates['setop_camt110_simulator_sub_group'] = setop_camt110_simulator_sub_group6f9ed,
    codeStates['op_camt110_simulator_sub_group6f9ed'] = op_camt110_simulator_sub_group6f9edProps,
    codeStates['setop_camt110_simulator_sub_group6f9ed'] = setop_camt110_simulator_sub_group6f9edProps,
    codeStates['op_110_productcode'] = op_110_productcodec2128,
    codeStates['setop_110_productcode'] = setop_110_productcodec2128,
    codeStates['op_110_message_type'] = op_110_message_type8876c,
    codeStates['setop_110_message_type'] = setop_110_message_type8876c,
    codeStates['op_110_date'] = op_110_date89cec,
    codeStates['setop_110_date'] = setop_110_date89cec,
    codeStates['op_110_uuid'] = op_110_uuid82718,
    codeStates['setop_110_uuid'] = setop_110_uuid82718,
    codeStates['op_110_request_type'] = op_110_request_type2c432,
    codeStates['setop_110_request_type'] = setop_110_request_type2c432,
    codeStates['op_110_request_reason'] = op_110_request_reason6d6fa,
    codeStates['setop_110_request_reason'] = setop_110_request_reason6d6fa,
    codeStates['op_110_dynamicactionmaingroup'] = op_110_dynamicactionmaingroup4acc0,
    codeStates['setop_110_dynamicactionmaingroup'] = setop_110_dynamicactionmaingroup4acc0,
    codeStates['op_110_dynamicactionmaingroup4acc0'] = op_110_dynamicactionmaingroup4acc0Props,
    codeStates['setop_110_dynamicactionmaingroup4acc0'] = setop_110_dynamicactionmaingroup4acc0Props,
    codeStates['op_110_dynamicactionsubgroup'] = op_110_dynamicactionsubgroup56a89,
    codeStates['setop_110_dynamicactionsubgroup'] = setop_110_dynamicactionsubgroup56a89,
    codeStates['op_110_dynamicactionsubgroup56a89'] = op_110_dynamicactionsubgroup56a89Props,
    codeStates['setop_110_dynamicactionsubgroup56a89'] = setop_110_dynamicactionsubgroup56a89Props,
    codeStates['op_nf_camt111_tab_header'] = op_nf_camt111_tab_header05ca0,
    codeStates['setop_nf_camt111_tab_header'] = setop_nf_camt111_tab_header05ca0,
    codeStates['op_nf_camt111_tab_header05ca0'] = op_nf_camt111_tab_header05ca0Props,
    codeStates['setop_nf_camt111_tab_header05ca0'] = setop_nf_camt111_tab_header05ca0Props,
    codeStates['op_camt111_simulator_sub_group'] = op_camt111_simulator_sub_group120d6,
    codeStates['setop_camt111_simulator_sub_group'] = setop_camt111_simulator_sub_group120d6,
    codeStates['op_camt111_simulator_sub_group120d6'] = op_camt111_simulator_sub_group120d6Props,
    codeStates['setop_camt111_simulator_sub_group120d6'] = setop_camt111_simulator_sub_group120d6Props,
    codeStates['op_111_dynamicactionmaingroup'] = op_111_dynamicactionmaingroupe4308,
    codeStates['setop_111_dynamicactionmaingroup'] = setop_111_dynamicactionmaingroupe4308,
    codeStates['op_111_dynamicactionmaingroupe4308'] = op_111_dynamicactionmaingroupe4308Props,
    codeStates['setop_111_dynamicactionmaingroupe4308'] = setop_111_dynamicactionmaingroupe4308Props,
    codeStates['op_111_dynamicactionsubgroup'] = op_111_dynamicactionsubgroup73de7,
    codeStates['setop_111_dynamicactionsubgroup'] = setop_111_dynamicactionsubgroup73de7,
    codeStates['op_111_dynamicactionsubgroup73de7'] = op_111_dynamicactionsubgroup73de7Props,
    codeStates['setop_111_dynamicactionsubgroup73de7'] = setop_111_dynamicactionsubgroup73de7Props,
    codeStates['ip_nf_camt055_tab_header'] = ip_nf_camt055_tab_header06c62,
    codeStates['setip_nf_camt055_tab_header'] = setip_nf_camt055_tab_header06c62,
    codeStates['ip_nf_camt055_tab_header06c62'] = ip_nf_camt055_tab_header06c62Props,
    codeStates['setip_nf_camt055_tab_header06c62'] = setip_nf_camt055_tab_header06c62Props,
    codeStates['ip_camt055_simulator_sub_group'] = ip_camt055_simulator_sub_group52216,
    codeStates['setip_camt055_simulator_sub_group'] = setip_camt055_simulator_sub_group52216,
    codeStates['ip_camt055_simulator_sub_group52216'] = ip_camt055_simulator_sub_group52216Props,
    codeStates['setip_camt055_simulator_sub_group52216'] = setip_camt055_simulator_sub_group52216Props,
    codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550,
    codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550,
    codeStates['ip_055_dynamicactionmaingroup84550'] = ip_055_dynamicactionmaingroup84550Props,
    codeStates['setip_055_dynamicactionmaingroup84550'] = setip_055_dynamicactionmaingroup84550Props,
    codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c,
    codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c,
    codeStates['ip_055_dynamicactionsubgroup2ae9c'] = ip_055_dynamicactionsubgroup2ae9cProps,
    codeStates['setip_055_dynamicactionsubgroup2ae9c'] = setip_055_dynamicactionsubgroup2ae9cProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!op_camt110_simulator_sub_group6f9ed?.op_110_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setop_camt110_simulator_sub_group6f9ed((pre:any)=>({...pre,op_110_date:indiaToday.toISOString()}))
    }
  setop_camt110_simulator_sub_group6f9edProps((pre:any)=>({...pre,validation:true}))
 },[op_110_date89cec?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (op_110_date89cec?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `18 / 26`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("")}
      value={op_camt110_simulator_sub_group6f9ed?.op_110_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {op_110_date89cec?.isDisabled ? true : false}
      disabled={ true }
      contentAlign={"center"}
      headerPosition='top'
      headerText="Date"
      dateValidation=""
      validationState={validate?.ackSimulator_v1?.op_110_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerop_110_date
