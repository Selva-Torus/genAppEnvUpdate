
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
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreaaddress = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'address',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {case_info_textd4267, setcase_info_textd4267}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name83b58, setdebtor_name83b58}= useContext(TotalContext) as TotalContextProps;
  const {case_display_idb53b9, setcase_display_idb53b9}= useContext(TotalContext) as TotalContextProps;
  const {ssn_masked24ce0, setssn_masked24ce0}= useContext(TotalContext) as TotalContextProps;
  const {dobea900, setdobea900}= useContext(TotalContext) as TotalContextProps;
  const {address4e81d, setaddress4e81d}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name62479, setcreditor_name62479}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_dated3231, setcharge_off_dated3231}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_date500eb, setlast_payment_date500eb}= useContext(TotalContext) as TotalContextProps;
  const {divider772d9, setdivider772d9}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_date69782, setsol_expiry_date69782}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "91b13e4c1ee41bd2cc4315ebf2ce3c1b",
        "5e483151e659411d8f3627f30834e81d"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'address',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='address')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'address',type:'text'}
        type={
          name:'address',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.address.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.address.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.address.type
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
  },[address4e81d?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcase_information_groupe3c1b((pre:any)=>({...pre,address:""}))
    }else 
      prevRefreshRef.current= true
  },[address4e81d?.refresh])

  const case_information_groupe3c1bRef = useRef<any>(case_information_groupe3c1b);
  useEffect(() => { case_information_groupe3c1bRef.current = case_information_groupe3c1b; }, [case_information_groupe3c1b]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "5e483151e659411d8f3627f30834e81d") {
        handleChange({target:{value:case_information_groupe3c1bRef?.current?.address||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5e483151e659411d8f3627f30834e81d") {
        handleBlur({target:{value:case_information_groupe3c1bRef?.current?.address||""}});
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
        codeStates['add_case_group'] = add_case_groupbe1de,
        codeStates['setadd_case_group'] = setadd_case_groupbe1de,
        codeStates['add_case_groupbe1de'] = add_case_groupbe1deProps,
        codeStates['setadd_case_groupbe1de'] = setadd_case_groupbe1deProps,
        codeStates['header_group'] = header_groupc587e,
        codeStates['setheader_group'] = setheader_groupc587e,
        codeStates['header_groupc587e'] = header_groupc587eProps,
        codeStates['setheader_groupc587e'] = setheader_groupc587eProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
        codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
        codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
        codeStates['doc_table'] = doc_table8bfa1,
        codeStates['setdoc_table'] = setdoc_table8bfa1,
        codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
        codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
        codeStates['case_information_group'] = case_information_groupe3c1b,
        codeStates['setcase_information_group'] = setcase_information_groupe3c1b,
        codeStates['case_information_groupe3c1b'] = case_information_groupe3c1bProps,
        codeStates['setcase_information_groupe3c1b'] = setcase_information_groupe3c1bProps,
        codeStates['case_info_text'] = case_info_textd4267,
        codeStates['setcase_info_text'] = setcase_info_textd4267,
        codeStates['debtor_name'] = debtor_name83b58,
        codeStates['setdebtor_name'] = setdebtor_name83b58,
        codeStates['case_display_id'] = case_display_idb53b9,
        codeStates['setcase_display_id'] = setcase_display_idb53b9,
        codeStates['ssn_masked'] = ssn_masked24ce0,
        codeStates['setssn_masked'] = setssn_masked24ce0,
        codeStates['dob'] = dobea900,
        codeStates['setdob'] = setdobea900,
        codeStates['address'] = address4e81d,
        codeStates['setaddress'] = setaddress4e81d,
        codeStates['creditor_name'] = creditor_name62479,
        codeStates['setcreditor_name'] = setcreditor_name62479,
        codeStates['charge_off_date'] = charge_off_dated3231,
        codeStates['setcharge_off_date'] = setcharge_off_dated3231,
        codeStates['last_payment_date'] = last_payment_date500eb,
        codeStates['setlast_payment_date'] = setlast_payment_date500eb,
        codeStates['divider'] = divider772d9,
        codeStates['setdivider'] = setdivider772d9,
        codeStates['card_group'] = card_group7fa83,
        codeStates['setcard_group'] = setcard_group7fa83,
        codeStates['card_group7fa83'] = card_group7fa83Props,
        codeStates['setcard_group7fa83'] = setcard_group7fa83Props,
        codeStates['principal_group'] = principal_groupde6dd,
        codeStates['setprincipal_group'] = setprincipal_groupde6dd,
        codeStates['principal_groupde6dd'] = principal_groupde6ddProps,
        codeStates['setprincipal_groupde6dd'] = setprincipal_groupde6ddProps,
        codeStates['intrest_group'] = intrest_group44b4d,
        codeStates['setintrest_group'] = setintrest_group44b4d,
        codeStates['intrest_group44b4d'] = intrest_group44b4dProps,
        codeStates['setintrest_group44b4d'] = setintrest_group44b4dProps,
        codeStates['fees_group'] = fees_groupee523,
        codeStates['setfees_group'] = setfees_groupee523,
        codeStates['fees_groupee523'] = fees_groupee523Props,
        codeStates['setfees_groupee523'] = setfees_groupee523Props,
        codeStates['total_group'] = total_groupd3e06,
        codeStates['settotal_group'] = settotal_groupd3e06,
        codeStates['total_groupd3e06'] = total_groupd3e06Props,
        codeStates['settotal_groupd3e06'] = settotal_groupd3e06Props,
        codeStates['sol_expiry_date'] = sol_expiry_date69782,
        codeStates['setsol_expiry_date'] = setsol_expiry_date69782,
        codeStates['venue_details_group'] = venue_details_group1d734,
        codeStates['setvenue_details_group'] = setvenue_details_group1d734,
        codeStates['venue_details_group1d734'] = venue_details_group1d734Props,
        codeStates['setvenue_details_group1d734'] = setvenue_details_group1d734Props,
        codeStates['checklist_main_group'] = checklist_main_group32240,
        codeStates['setchecklist_main_group'] = setchecklist_main_group32240,
        codeStates['checklist_main_group32240'] = checklist_main_group32240Props,
        codeStates['setchecklist_main_group32240'] = setchecklist_main_group32240Props,
        codeStates['checklist_table'] = checklist_tablee7dea,
        codeStates['setchecklist_table'] = setchecklist_tablee7dea,
        codeStates['checklist_tablee7dea'] = checklist_tablee7deaProps,
        codeStates['setchecklist_tablee7dea'] = setchecklist_tablee7deaProps,
        codeStates['special_rules_group'] = special_rules_groupf22ab,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupf22ab,
        codeStates['special_rules_groupf22ab'] = special_rules_groupf22abProps,
        codeStates['setspecial_rules_groupf22ab'] = setspecial_rules_groupf22abProps,
        codeStates['special_rules'] = special_rules96aec,
        codeStates['setspecial_rules'] = setspecial_rules96aec,
        codeStates['special_rules96aec'] = special_rules96aecProps,
        codeStates['setspecial_rules96aec'] = setspecial_rules96aecProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewAMRCase_v1:{...pre?.viewAMRCase_v1,address:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_groupe3c1b((prev: any) => ({ ...prev, address: +e?.target?.value }));
    }
    else{
    setcase_information_groupe3c1b((prev: any) => ({ ...prev, address: e?.target?.value }));
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
  if (address4e81d?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `39 / 51`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {address4e81d?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Address"
      pin = {'brick-brick'}
      value = { case_information_groupe3c1b?.address != null && typeof case_information_groupe3c1b?.address =='object' ? Object.keys(case_information_groupe3c1b?.address)?.length ?  JSON.stringify(case_information_groupe3c1b?.address,null ,2):"" : case_information_groupe3c1b?.address||""}
      errorMessage={error}
      validationState={validate?.viewAMRCase_v1?.address ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaaddress
