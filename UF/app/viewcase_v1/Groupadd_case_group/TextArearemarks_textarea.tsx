
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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


const TextArearemarks_textarea = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'remarks_textarea',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_idcb444, setvenue_idcb444}= useContext(TotalContext) as TotalContextProps;
  const {creditor_idb1867, setcreditor_idb1867}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps;
  const {remarks_textarea15a62, setremarks_textarea15a62}= useContext(TotalContext) as TotalContextProps;
  const {account_id4ecc7, setaccount_id4ecc7}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "f9a0177882553386d93285e61911f6e4",
        "d4e6a9b304fb13d71a12c5c882b15a62"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'remarks_textarea',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='remarks_textarea')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'remarks_textarea',type:'text'}
        type={
          name:'remarks_textarea',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.remarks_textarea.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.remarks_textarea.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.remarks_textarea.type
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
  },[remarks_textarea15a62?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setadd_case_group1f6e4((pre:any)=>({...pre,remarks_textarea:""}))
    }else 
      prevRefreshRef.current= true
  },[remarks_textarea15a62?.refresh])

  const add_case_group1f6e4Ref = useRef<any>(add_case_group1f6e4);
  useEffect(() => { add_case_group1f6e4Ref.current = add_case_group1f6e4; }, [add_case_group1f6e4]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d4e6a9b304fb13d71a12c5c882b15a62") {
        handleChange({target:{value:add_case_group1f6e4Ref?.current?.remarks_textarea||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d4e6a9b304fb13d71a12c5c882b15a62") {
        handleBlur({target:{value:add_case_group1f6e4Ref?.current?.remarks_textarea||""}});
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
        codeStates['add_case_group'] = add_case_group1f6e4,
        codeStates['setadd_case_group'] = setadd_case_group1f6e4,
        codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
        codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
        codeStates['header_group'] = header_group3749a,
        codeStates['setheader_group'] = setheader_group3749a,
        codeStates['header_group3749a'] = header_group3749aProps,
        codeStates['setheader_group3749a'] = setheader_group3749aProps,
        codeStates['venue_id'] = venue_idcb444,
        codeStates['setvenue_id'] = setvenue_idcb444,
        codeStates['creditor_id'] = creditor_idb1867,
        codeStates['setcreditor_id'] = setcreditor_idb1867,
        codeStates['case_information_group'] = case_information_groupcec29,
        codeStates['setcase_information_group'] = setcase_information_groupcec29,
        codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
        codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
        codeStates['venue_group'] = venue_groupa72d9,
        codeStates['setvenue_group'] = setvenue_groupa72d9,
        codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
        codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
        codeStates['georgia_group'] = georgia_groupa636c,
        codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
        codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
        codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
        codeStates['georgias_group'] = georgias_groupbac01,
        codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
        codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
        codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
        codeStates['georgias_groups'] = georgias_groupsbf356,
        codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
        codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
        codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
        codeStates['georgiass_groups'] = georgiass_groups9e4dd,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
        codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
        codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
        codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
        codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
        codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
        codeStates['debtor_information_group'] = debtor_information_groupdfa55,
        codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
        codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
        codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
        codeStates['financial_details_group'] = financial_details_grouped0d9,
        codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
        codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
        codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
        codeStates['venue_details_group'] = venue_details_group6a27a,
        codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
        codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
        codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
        codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
        codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
        codeStates['doc_table'] = doc_tablee79c7,
        codeStates['setdoc_table'] = setdoc_tablee79c7,
        codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
        codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
        codeStates['checklist_main_group'] = checklist_main_group5b62e,
        codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
        codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
        codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
        codeStates['checklist_table'] = checklist_table45abc,
        codeStates['setchecklist_table'] = setchecklist_table45abc,
        codeStates['checklist_table45abc'] = checklist_table45abcProps,
        codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,
        codeStates['remarks_textarea'] = remarks_textarea15a62,
        codeStates['setremarks_textarea'] = setremarks_textarea15a62,
        codeStates['account_id'] = account_id4ecc7,
        codeStates['setaccount_id'] = setaccount_id4ecc7,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewCase_v1:{...pre?.viewCase_v1,remarks_textarea:undefined}}));
    if(dynamicStateandType.type=="number"){
    setadd_case_group1f6e4((prev: any) => ({ ...prev, remarks_textarea: +e?.target?.value }));
    }
    else{
    setadd_case_group1f6e4((prev: any) => ({ ...prev, remarks_textarea: e?.target?.value }));
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
  if (remarks_textarea15a62?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `423 / 440`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {remarks_textarea15a62?.isDisabled ? true : false}
      placeholder = {'Enter any additional remarks or notes'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Remarks"
      pin = {'brick-brick'}
      value = { add_case_group1f6e4?.remarks_textarea != null && typeof add_case_group1f6e4?.remarks_textarea =='object' ? Object.keys(add_case_group1f6e4?.remarks_textarea)?.length ?  JSON.stringify(add_case_group1f6e4?.remarks_textarea,null ,2):"" : add_case_group1f6e4?.remarks_textarea||""}
      errorMessage={error}
      validationState={validate?.viewCase_v1?.remarks_textarea ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextArearemarks_textarea
