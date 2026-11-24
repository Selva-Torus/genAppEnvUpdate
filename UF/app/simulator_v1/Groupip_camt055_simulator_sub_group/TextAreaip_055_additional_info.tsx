
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreaip_055_additional_info = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'ip_055_additional_info',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007}= useContext(TotalContext) as TotalContextProps;
  const {acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391f, setop_financial_tab_headerc391f}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391fProps, setop_financial_tab_headerc391fProps}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896, setip_financial_tab_header60896}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896Props, setip_financial_tab_header60896Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71Props, setop_nf_camt110_tab_header4fa71Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0Props, setop_nf_camt111_tab_header05ca0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62Props, setip_nf_camt055_tab_header06c62Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_productcode77a4c, setip_055_productcode77a4c}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_message_typed8915, setip_055_message_typed8915}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_date87912, setip_055_date87912}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_uuidf2ab4, setip_055_uuidf2ab4}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_reason_code579a1, setip_055_reason_code579a1}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_additional_info7ae0a, setip_055_additional_info7ae0a}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "3fe8b098ae7c4915b5b64c8d65652216",
        "0c7717f214de407db1a0b285cd57ae0a"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'ip_055_additional_info',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='ip_055_additional_info')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'ip_055_additional_info',type:'text'}
        type={
          name:'ip_055_additional_info',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.ip_055_additional_info.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.ip_055_additional_info.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.ip_055_additional_info.type
        }
        setDynamicStateandType(type)
       
      }
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[ip_055_additional_info7ae0a?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setip_camt055_simulator_sub_group52216((pre:any)=>({...pre,ip_055_additional_info:""}))
    }else 
      prevRefreshRef.current= true
  },[ip_055_additional_info7ae0a?.refresh])

  const ip_camt055_simulator_sub_group52216Ref = useRef<any>(ip_camt055_simulator_sub_group52216);
  useEffect(() => { ip_camt055_simulator_sub_group52216Ref.current = ip_camt055_simulator_sub_group52216; }, [ip_camt055_simulator_sub_group52216]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0c7717f214de407db1a0b285cd57ae0a") {
        handleChange({target:{value:ip_camt055_simulator_sub_group52216Ref?.current?.ip_055_additional_info||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0c7717f214de407db1a0b285cd57ae0a") {
        handleBlur({target:{value:ip_camt055_simulator_sub_group52216Ref?.current?.ip_055_additional_info||""}});
      }
    };
    eventBus.on("triggerTextAreaChange", handlerChange);
    eventBus.on("triggerTextAreaBlur", handlerBlur);
    return () => {
      eventBus.off("triggerTextAreaChange", handlerChange);
      eventBus.off("triggerTextAreaBlur", handlerBlur);
    };
  },[validateRefetch.value])


  const handleBlur=async(e:any)=>{
    let validate:any
    code = allCode;
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
        codeStates['ip_055_productcode'] = ip_055_productcode77a4c,
        codeStates['setip_055_productcode'] = setip_055_productcode77a4c,
        codeStates['ip_055_message_type'] = ip_055_message_typed8915,
        codeStates['setip_055_message_type'] = setip_055_message_typed8915,
        codeStates['ip_055_date'] = ip_055_date87912,
        codeStates['setip_055_date'] = setip_055_date87912,
        codeStates['ip_055_uuid'] = ip_055_uuidf2ab4,
        codeStates['setip_055_uuid'] = setip_055_uuidf2ab4,
        codeStates['ip_055_reason_code'] = ip_055_reason_code579a1,
        codeStates['setip_055_reason_code'] = setip_055_reason_code579a1,
        codeStates['ip_055_additional_info'] = ip_055_additional_info7ae0a,
        codeStates['setip_055_additional_info'] = setip_055_additional_info7ae0a,
        codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550,
        codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550,
        codeStates['ip_055_dynamicactionmaingroup84550'] = ip_055_dynamicactionmaingroup84550Props,
        codeStates['setip_055_dynamicactionmaingroup84550'] = setip_055_dynamicactionmaingroup84550Props,
        codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c,
        codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c,
        codeStates['ip_055_dynamicactionsubgroup2ae9c'] = ip_055_dynamicactionsubgroup2ae9cProps,
        codeStates['setip_055_dynamicactionsubgroup2ae9c'] = setip_055_dynamicactionsubgroup2ae9cProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,ip_055_additional_info:undefined}}));
    if(dynamicStateandType.type=="number"){
    setip_camt055_simulator_sub_group52216((prev: any) => ({ ...prev, ip_055_additional_info: +e?.target?.value }));
    }
    else{
    setip_camt055_simulator_sub_group52216((prev: any) => ({ ...prev, ip_055_additional_info: e?.target?.value }));
    }
    try{
    }catch (err: any) {
    ///setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
  }

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleFocus=async(e:any)=>{
    try{
    setIsProcessing(true);
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
  if (ip_055_additional_info7ae0a?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `44 / 51`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {ip_055_additional_info7ae0a?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Additional Info"
      pin = {'brick-brick'}
      value = { ip_camt055_simulator_sub_group52216?.ip_055_additional_info != null && typeof ip_camt055_simulator_sub_group52216?.ip_055_additional_info =='object' ? Object.keys(ip_camt055_simulator_sub_group52216?.ip_055_additional_info)?.length ?  JSON.stringify(ip_camt055_simulator_sub_group52216?.ip_055_additional_info,null ,2):"" : ip_camt055_simulator_sub_group52216?.ip_055_additional_info||""}
      errorMessage={error}
      validationState={validate?.ackSimulator_v1?.ip_055_additional_info ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaip_055_additional_info
