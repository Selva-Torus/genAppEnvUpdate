
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
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {case_info_text1e3db, setcase_info_text1e3db}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name2af58, setdebtor_name2af58}= useContext(TotalContext) as TotalContextProps;
  const {case_display_idd1272, setcase_display_idd1272}= useContext(TotalContext) as TotalContextProps;
  const {ssn_maskedc4424, setssn_maskedc4424}= useContext(TotalContext) as TotalContextProps;
  const {dob29785, setdob29785}= useContext(TotalContext) as TotalContextProps;
  const {address70906, setaddress70906}= useContext(TotalContext) as TotalContextProps;
  const {creditor_namea9b98, setcreditor_namea9b98}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_date763d0, setcharge_off_date763d0}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_date43bdb, setlast_payment_date43bdb}= useContext(TotalContext) as TotalContextProps;
  const {dividere3c67, setdividere3c67}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_date4dfe3, setsol_expiry_date4dfe3}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "2723b3f0ae705c0f66d6e06787248f3c",
        "0feba0da079f0a631fd748e3d8170906"
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
  },[address70906?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcase_information_group48f3c((pre:any)=>({...pre,address:""}))
    }else 
      prevRefreshRef.current= true
  },[address70906?.refresh])

  const case_information_group48f3cRef = useRef<any>(case_information_group48f3c);
  useEffect(() => { case_information_group48f3cRef.current = case_information_group48f3c; }, [case_information_group48f3c]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0feba0da079f0a631fd748e3d8170906") {
        handleChange({target:{value:case_information_group48f3cRef?.current?.address||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0feba0da079f0a631fd748e3d8170906") {
        handleBlur({target:{value:case_information_group48f3cRef?.current?.address||""}});
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
        codeStates['add_case_group'] = add_case_grouped126,
        codeStates['setadd_case_group'] = setadd_case_grouped126,
        codeStates['add_case_grouped126'] = add_case_grouped126Props,
        codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
        codeStates['header_group'] = header_groupbd8a8,
        codeStates['setheader_group'] = setheader_groupbd8a8,
        codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
        codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
        codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
        codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
        codeStates['doc_table'] = doc_table9c4f7,
        codeStates['setdoc_table'] = setdoc_table9c4f7,
        codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
        codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
        codeStates['case_information_group'] = case_information_group48f3c,
        codeStates['setcase_information_group'] = setcase_information_group48f3c,
        codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
        codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
        codeStates['case_info_text'] = case_info_text1e3db,
        codeStates['setcase_info_text'] = setcase_info_text1e3db,
        codeStates['debtor_name'] = debtor_name2af58,
        codeStates['setdebtor_name'] = setdebtor_name2af58,
        codeStates['case_display_id'] = case_display_idd1272,
        codeStates['setcase_display_id'] = setcase_display_idd1272,
        codeStates['ssn_masked'] = ssn_maskedc4424,
        codeStates['setssn_masked'] = setssn_maskedc4424,
        codeStates['dob'] = dob29785,
        codeStates['setdob'] = setdob29785,
        codeStates['address'] = address70906,
        codeStates['setaddress'] = setaddress70906,
        codeStates['creditor_name'] = creditor_namea9b98,
        codeStates['setcreditor_name'] = setcreditor_namea9b98,
        codeStates['charge_off_date'] = charge_off_date763d0,
        codeStates['setcharge_off_date'] = setcharge_off_date763d0,
        codeStates['last_payment_date'] = last_payment_date43bdb,
        codeStates['setlast_payment_date'] = setlast_payment_date43bdb,
        codeStates['divider'] = dividere3c67,
        codeStates['setdivider'] = setdividere3c67,
        codeStates['card_group'] = card_group4c709,
        codeStates['setcard_group'] = setcard_group4c709,
        codeStates['card_group4c709'] = card_group4c709Props,
        codeStates['setcard_group4c709'] = setcard_group4c709Props,
        codeStates['principal_group'] = principal_group42235,
        codeStates['setprincipal_group'] = setprincipal_group42235,
        codeStates['principal_group42235'] = principal_group42235Props,
        codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
        codeStates['intrest_group'] = intrest_group65c3b,
        codeStates['setintrest_group'] = setintrest_group65c3b,
        codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
        codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
        codeStates['fees_group'] = fees_group8c4a6,
        codeStates['setfees_group'] = setfees_group8c4a6,
        codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
        codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
        codeStates['total_group'] = total_groupc52d3,
        codeStates['settotal_group'] = settotal_groupc52d3,
        codeStates['total_groupc52d3'] = total_groupc52d3Props,
        codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
        codeStates['sol_expiry_date'] = sol_expiry_date4dfe3,
        codeStates['setsol_expiry_date'] = setsol_expiry_date4dfe3,
        codeStates['venue_details_group'] = venue_details_group51614,
        codeStates['setvenue_details_group'] = setvenue_details_group51614,
        codeStates['venue_details_group51614'] = venue_details_group51614Props,
        codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['checklist_table'] = checklist_tablecafb0,
        codeStates['setchecklist_table'] = setchecklist_tablecafb0,
        codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
        codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
        codeStates['special_rules_group'] = special_rules_group7ce9f,
        codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
        codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
        codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
        codeStates['special_rules'] = special_rules7f109,
        codeStates['setspecial_rules'] = setspecial_rules7f109,
        codeStates['special_rules7f109'] = special_rules7f109Props,
        codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewAMRCasePgGraph_v1:{...pre?.viewAMRCasePgGraph_v1,address:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_group48f3c((prev: any) => ({ ...prev, address: +e?.target?.value }));
    }
    else{
    setcase_information_group48f3c((prev: any) => ({ ...prev, address: e?.target?.value }));
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
  if (address70906?.isHidden) {
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
      disabled= {address70906?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Address"
      pin = {'brick-brick'}
      value = { case_information_group48f3c?.address != null && typeof case_information_group48f3c?.address =='object' ? Object.keys(case_information_group48f3c?.address)?.length ?  JSON.stringify(case_information_group48f3c?.address,null ,2):"" : case_information_group48f3c?.address||""}
      errorMessage={error}
      validationState={validate?.viewAMRCasePgGraph_v1?.address ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaaddress
