
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
  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {case_info_textee1f0, setcase_info_textee1f0}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name12f82, setdebtor_name12f82}= useContext(TotalContext) as TotalContextProps;
  const {case_display_idda9aa, setcase_display_idda9aa}= useContext(TotalContext) as TotalContextProps;
  const {ssn_masked6441e, setssn_masked6441e}= useContext(TotalContext) as TotalContextProps;
  const {dobb26e1, setdobb26e1}= useContext(TotalContext) as TotalContextProps;
  const {address6196d, setaddress6196d}= useContext(TotalContext) as TotalContextProps;
  const {creditor_nameb337f, setcreditor_nameb337f}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_date4e80f, setcharge_off_date4e80f}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_datef6b2b, setlast_payment_datef6b2b}= useContext(TotalContext) as TotalContextProps;
  const {divider09dfa, setdivider09dfa}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_date3d70d, setsol_expiry_date3d70d}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47bec, setspecial_rules_group47bec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47becProps, setspecial_rules_group47becProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582, setspecial_rules3c582}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582Props, setspecial_rules3c582Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "29949970b12d2ab7344e422611d40df6",
        "71796fe791589c3c8f0a647c1486196d"
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
  },[address6196d?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcase_information_group40df6((pre:any)=>({...pre,address:""}))
    }else 
      prevRefreshRef.current= true
  },[address6196d?.refresh])

  const case_information_group40df6Ref = useRef<any>(case_information_group40df6);
  useEffect(() => { case_information_group40df6Ref.current = case_information_group40df6; }, [case_information_group40df6]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "71796fe791589c3c8f0a647c1486196d") {
        handleChange({target:{value:case_information_group40df6Ref?.current?.address||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "71796fe791589c3c8f0a647c1486196d") {
        handleBlur({target:{value:case_information_group40df6Ref?.current?.address||""}});
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
        codeStates['add_case_group'] = add_case_group4945a,
        codeStates['setadd_case_group'] = setadd_case_group4945a,
        codeStates['add_case_group4945a'] = add_case_group4945aProps,
        codeStates['setadd_case_group4945a'] = setadd_case_group4945aProps,
        codeStates['header_group'] = header_groupf55cb,
        codeStates['setheader_group'] = setheader_groupf55cb,
        codeStates['header_groupf55cb'] = header_groupf55cbProps,
        codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_groupdfaaf,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_groupdfaaf,
        codeStates['required_dociument_main_groupdfaaf'] = required_dociument_main_groupdfaafProps,
        codeStates['setrequired_dociument_main_groupdfaaf'] = setrequired_dociument_main_groupdfaafProps,
        codeStates['doc_table'] = doc_table8af83,
        codeStates['setdoc_table'] = setdoc_table8af83,
        codeStates['doc_table8af83'] = doc_table8af83Props,
        codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
        codeStates['case_information_group'] = case_information_group40df6,
        codeStates['setcase_information_group'] = setcase_information_group40df6,
        codeStates['case_information_group40df6'] = case_information_group40df6Props,
        codeStates['setcase_information_group40df6'] = setcase_information_group40df6Props,
        codeStates['case_info_text'] = case_info_textee1f0,
        codeStates['setcase_info_text'] = setcase_info_textee1f0,
        codeStates['debtor_name'] = debtor_name12f82,
        codeStates['setdebtor_name'] = setdebtor_name12f82,
        codeStates['case_display_id'] = case_display_idda9aa,
        codeStates['setcase_display_id'] = setcase_display_idda9aa,
        codeStates['ssn_masked'] = ssn_masked6441e,
        codeStates['setssn_masked'] = setssn_masked6441e,
        codeStates['dob'] = dobb26e1,
        codeStates['setdob'] = setdobb26e1,
        codeStates['address'] = address6196d,
        codeStates['setaddress'] = setaddress6196d,
        codeStates['creditor_name'] = creditor_nameb337f,
        codeStates['setcreditor_name'] = setcreditor_nameb337f,
        codeStates['charge_off_date'] = charge_off_date4e80f,
        codeStates['setcharge_off_date'] = setcharge_off_date4e80f,
        codeStates['last_payment_date'] = last_payment_datef6b2b,
        codeStates['setlast_payment_date'] = setlast_payment_datef6b2b,
        codeStates['divider'] = divider09dfa,
        codeStates['setdivider'] = setdivider09dfa,
        codeStates['card_group'] = card_group00ce3,
        codeStates['setcard_group'] = setcard_group00ce3,
        codeStates['card_group00ce3'] = card_group00ce3Props,
        codeStates['setcard_group00ce3'] = setcard_group00ce3Props,
        codeStates['principal_group'] = principal_group510ca,
        codeStates['setprincipal_group'] = setprincipal_group510ca,
        codeStates['principal_group510ca'] = principal_group510caProps,
        codeStates['setprincipal_group510ca'] = setprincipal_group510caProps,
        codeStates['intrest_group'] = intrest_group1ba85,
        codeStates['setintrest_group'] = setintrest_group1ba85,
        codeStates['intrest_group1ba85'] = intrest_group1ba85Props,
        codeStates['setintrest_group1ba85'] = setintrest_group1ba85Props,
        codeStates['fees_group'] = fees_groupbee4a,
        codeStates['setfees_group'] = setfees_groupbee4a,
        codeStates['fees_groupbee4a'] = fees_groupbee4aProps,
        codeStates['setfees_groupbee4a'] = setfees_groupbee4aProps,
        codeStates['total_group'] = total_group197f6,
        codeStates['settotal_group'] = settotal_group197f6,
        codeStates['total_group197f6'] = total_group197f6Props,
        codeStates['settotal_group197f6'] = settotal_group197f6Props,
        codeStates['sol_expiry_date'] = sol_expiry_date3d70d,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3d70d,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
        codeStates['checklist_main_group'] = checklist_main_group2d71b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2d71b,
        codeStates['checklist_main_group2d71b'] = checklist_main_group2d71bProps,
        codeStates['setchecklist_main_group2d71b'] = setchecklist_main_group2d71bProps,
        codeStates['checklist_table'] = checklist_tablec0934,
        codeStates['setchecklist_table'] = setchecklist_tablec0934,
        codeStates['checklist_tablec0934'] = checklist_tablec0934Props,
        codeStates['setchecklist_tablec0934'] = setchecklist_tablec0934Props,
        codeStates['special_rules_group'] = special_rules_group47bec,
        codeStates['setspecial_rules_group'] = setspecial_rules_group47bec,
        codeStates['special_rules_group47bec'] = special_rules_group47becProps,
        codeStates['setspecial_rules_group47bec'] = setspecial_rules_group47becProps,
        codeStates['special_rules'] = special_rules3c582,
        codeStates['setspecial_rules'] = setspecial_rules3c582,
        codeStates['special_rules3c582'] = special_rules3c582Props,
        codeStates['setspecial_rules3c582'] = setspecial_rules3c582Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewAMRPgGraph_v1:{...pre?.viewAMRPgGraph_v1,address:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_group40df6((prev: any) => ({ ...prev, address: +e?.target?.value }));
    }
    else{
    setcase_information_group40df6((prev: any) => ({ ...prev, address: e?.target?.value }));
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
  if (address6196d?.isHidden) {
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
      disabled= {address6196d?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Address"
      pin = {'brick-brick'}
      value = { case_information_group40df6?.address != null && typeof case_information_group40df6?.address =='object' ? Object.keys(case_information_group40df6?.address)?.length ?  JSON.stringify(case_information_group40df6?.address,null ,2):"" : case_information_group40df6?.address||""}
      errorMessage={error}
      validationState={validate?.viewAMRPgGraph_v1?.address ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaaddress
