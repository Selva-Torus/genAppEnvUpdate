
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
  const {add_case_group77747, setadd_case_group77747}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group77747Props, setadd_case_group77747Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8a, setheader_groupbae8a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8aProps, setheader_groupbae8aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8, setrequired_dociument_main_group999a8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8d, setdoc_table45b8d}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8dProps, setdoc_table45b8dProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3, setcase_information_group35ed3}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3Props, setcase_information_group35ed3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_info_text53524, setcase_info_text53524}= useContext(TotalContext) as TotalContextProps;
  const {debtor_namea603a, setdebtor_namea603a}= useContext(TotalContext) as TotalContextProps;
  const {case_display_id3ba0a, setcase_display_id3ba0a}= useContext(TotalContext) as TotalContextProps;
  const {ssn_masked36fce, setssn_masked36fce}= useContext(TotalContext) as TotalContextProps;
  const {dob19a93, setdob19a93}= useContext(TotalContext) as TotalContextProps;
  const {address0e39e, setaddress0e39e}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name04ffa, setcreditor_name04ffa}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_datef5bba, setcharge_off_datef5bba}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_date37076, setlast_payment_date37076}= useContext(TotalContext) as TotalContextProps;
  const {divider9cfd3, setdivider9cfd3}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78fa, setcard_groupe78fa}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78faProps, setcard_groupe78faProps}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9f, setprincipal_group9ae9f}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9fProps, setprincipal_group9ae9fProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75, setintrest_group8df75}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75Props, setintrest_group8df75Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23b, setfees_groupac23b}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23bProps, setfees_groupac23bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175, settotal_groupe6175}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175Props, settotal_groupe6175Props}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_date3775f, setsol_expiry_date3775f}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904e, setvenue_details_group6904e}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904eProps, setvenue_details_group6904eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ff, setchecklist_main_groupda0ff}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25b, setchecklist_table0e25b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25bProps, setchecklist_table0e25bProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585, setspecial_rules_groupc1585}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585Props, setspecial_rules_groupc1585Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30, setspecial_rules1fc30}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30Props, setspecial_rules1fc30Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34, setdynamicactions37e34}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34Props, setdynamicactions37e34Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "9b270458f4e722fe38d9cd7c50335ed3",
        "2330118ac0e1bd026e5cef0d5fa0e39e"
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
  },[address0e39e?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setcase_information_group35ed3((pre:any)=>({...pre,address:""}))
    }else 
      prevRefreshRef.current= true
  },[address0e39e?.refresh])

  const case_information_group35ed3Ref = useRef<any>(case_information_group35ed3);
  useEffect(() => { case_information_group35ed3Ref.current = case_information_group35ed3; }, [case_information_group35ed3]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "2330118ac0e1bd026e5cef0d5fa0e39e") {
        handleChange({target:{value:case_information_group35ed3Ref?.current?.address||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "2330118ac0e1bd026e5cef0d5fa0e39e") {
        handleBlur({target:{value:case_information_group35ed3Ref?.current?.address||""}});
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
        codeStates['add_case_group'] = add_case_group77747,
        codeStates['setadd_case_group'] = setadd_case_group77747,
        codeStates['add_case_group77747'] = add_case_group77747Props,
        codeStates['setadd_case_group77747'] = setadd_case_group77747Props,
        codeStates['header_group'] = header_groupbae8a,
        codeStates['setheader_group'] = setheader_groupbae8a,
        codeStates['header_groupbae8a'] = header_groupbae8aProps,
        codeStates['setheader_groupbae8a'] = setheader_groupbae8aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group999a8,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group999a8,
        codeStates['required_dociument_main_group999a8'] = required_dociument_main_group999a8Props,
        codeStates['setrequired_dociument_main_group999a8'] = setrequired_dociument_main_group999a8Props,
        codeStates['doc_table'] = doc_table45b8d,
        codeStates['setdoc_table'] = setdoc_table45b8d,
        codeStates['doc_table45b8d'] = doc_table45b8dProps,
        codeStates['setdoc_table45b8d'] = setdoc_table45b8dProps,
        codeStates['case_information_group'] = case_information_group35ed3,
        codeStates['setcase_information_group'] = setcase_information_group35ed3,
        codeStates['case_information_group35ed3'] = case_information_group35ed3Props,
        codeStates['setcase_information_group35ed3'] = setcase_information_group35ed3Props,
        codeStates['case_info_text'] = case_info_text53524,
        codeStates['setcase_info_text'] = setcase_info_text53524,
        codeStates['debtor_name'] = debtor_namea603a,
        codeStates['setdebtor_name'] = setdebtor_namea603a,
        codeStates['case_display_id'] = case_display_id3ba0a,
        codeStates['setcase_display_id'] = setcase_display_id3ba0a,
        codeStates['ssn_masked'] = ssn_masked36fce,
        codeStates['setssn_masked'] = setssn_masked36fce,
        codeStates['dob'] = dob19a93,
        codeStates['setdob'] = setdob19a93,
        codeStates['address'] = address0e39e,
        codeStates['setaddress'] = setaddress0e39e,
        codeStates['creditor_name'] = creditor_name04ffa,
        codeStates['setcreditor_name'] = setcreditor_name04ffa,
        codeStates['charge_off_date'] = charge_off_datef5bba,
        codeStates['setcharge_off_date'] = setcharge_off_datef5bba,
        codeStates['last_payment_date'] = last_payment_date37076,
        codeStates['setlast_payment_date'] = setlast_payment_date37076,
        codeStates['divider'] = divider9cfd3,
        codeStates['setdivider'] = setdivider9cfd3,
        codeStates['card_group'] = card_groupe78fa,
        codeStates['setcard_group'] = setcard_groupe78fa,
        codeStates['card_groupe78fa'] = card_groupe78faProps,
        codeStates['setcard_groupe78fa'] = setcard_groupe78faProps,
        codeStates['principal_group'] = principal_group9ae9f,
        codeStates['setprincipal_group'] = setprincipal_group9ae9f,
        codeStates['principal_group9ae9f'] = principal_group9ae9fProps,
        codeStates['setprincipal_group9ae9f'] = setprincipal_group9ae9fProps,
        codeStates['intrest_group'] = intrest_group8df75,
        codeStates['setintrest_group'] = setintrest_group8df75,
        codeStates['intrest_group8df75'] = intrest_group8df75Props,
        codeStates['setintrest_group8df75'] = setintrest_group8df75Props,
        codeStates['fees_group'] = fees_groupac23b,
        codeStates['setfees_group'] = setfees_groupac23b,
        codeStates['fees_groupac23b'] = fees_groupac23bProps,
        codeStates['setfees_groupac23b'] = setfees_groupac23bProps,
        codeStates['total_group'] = total_groupe6175,
        codeStates['settotal_group'] = settotal_groupe6175,
        codeStates['total_groupe6175'] = total_groupe6175Props,
        codeStates['settotal_groupe6175'] = settotal_groupe6175Props,
        codeStates['sol_expiry_date'] = sol_expiry_date3775f,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3775f,
        codeStates['venue_details_group'] = venue_details_group6904e,
        codeStates['setvenue_details_group'] = setvenue_details_group6904e,
        codeStates['venue_details_group6904e'] = venue_details_group6904eProps,
        codeStates['setvenue_details_group6904e'] = setvenue_details_group6904eProps,
        codeStates['checklist_main_group'] = checklist_main_groupda0ff,
        codeStates['setchecklist_main_group'] = setchecklist_main_groupda0ff,
        codeStates['checklist_main_groupda0ff'] = checklist_main_groupda0ffProps,
        codeStates['setchecklist_main_groupda0ff'] = setchecklist_main_groupda0ffProps,
        codeStates['checklist_table'] = checklist_table0e25b,
        codeStates['setchecklist_table'] = setchecklist_table0e25b,
        codeStates['checklist_table0e25b'] = checklist_table0e25bProps,
        codeStates['setchecklist_table0e25b'] = setchecklist_table0e25bProps,
        codeStates['special_rules_group'] = special_rules_groupc1585,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupc1585,
        codeStates['special_rules_groupc1585'] = special_rules_groupc1585Props,
        codeStates['setspecial_rules_groupc1585'] = setspecial_rules_groupc1585Props,
        codeStates['special_rules'] = special_rules1fc30,
        codeStates['setspecial_rules'] = setspecial_rules1fc30,
        codeStates['special_rules1fc30'] = special_rules1fc30Props,
        codeStates['setspecial_rules1fc30'] = setspecial_rules1fc30Props,
        codeStates['dynamicactions'] = dynamicactions37e34,
        codeStates['setdynamicactions'] = setdynamicactions37e34,
        codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
        codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,AMRCaseApproval_v1:{...pre?.AMRCaseApproval_v1,address:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcase_information_group35ed3((prev: any) => ({ ...prev, address: +e?.target?.value }));
    }
    else{
    setcase_information_group35ed3((prev: any) => ({ ...prev, address: e?.target?.value }));
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
  if (address0e39e?.isHidden) {
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
      disabled= {address0e39e?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Address"
      pin = {'brick-brick'}
      value = { case_information_group35ed3?.address != null && typeof case_information_group35ed3?.address =='object' ? Object.keys(case_information_group35ed3?.address)?.length ?  JSON.stringify(case_information_group35ed3?.address,null ,2):"" : case_information_group35ed3?.address||""}
      errorMessage={error}
      validationState={validate?.AMRCaseApproval_v1?.address ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaaddress
