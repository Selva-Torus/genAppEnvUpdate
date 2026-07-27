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
import { getCookie } from '@/app/components/cookieMgment';
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

const TextInputleave_request_number = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'leave_request_number',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group9bde0, setnew_access_group9bde0}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group9bde0Props, setnew_access_group9bde0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7, setdynamicactionse55b7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7Props, setdynamicactionse55b7Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855, setaccess_req__group23855}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855Props, setaccess_req__group23855Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_details94d2a, setleave_req_details94d2a}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number9e857, setleave_request_number9e857}= useContext(TotalContext) as TotalContextProps;
  const {full_namef5482, setfull_namef5482}= useContext(TotalContext) as TotalContextProps;
  const {policy_nameca7f5, setpolicy_nameca7f5}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_category26b76, setleave_reason_category26b76}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkboxaac78, setemergency_leave_checkboxaac78}= useContext(TotalContext) as TotalContextProps;
  const {start_date22dc6, setstart_date22dc6}= useContext(TotalContext) as TotalContextProps;
  const {end_dateb0819, setend_dateb0819}= useContext(TotalContext) as TotalContextProps;
  const {days_requested84d0e, setdays_requested84d0e}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switchb71e0, sethalf_day_switchb71e0}= useContext(TotalContext) as TotalContextProps;
  const {haf_day_session36e8a, sethaf_day_session36e8a}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476, setemp_avail_group21476}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476Props, setemp_avail_group21476Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19a, setleave_balance_group2b19a}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19aProps, setleave_balance_group2b19aProps}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335, setapp_det_groupe1335}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335Props, setapp_det_groupe1335Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00a, setapprove_group1e00a}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00aProps, setapprove_group1e00aProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703, setaudit_groupa0703}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703Props, setaudit_groupa0703Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__group23855((prev: any) => ({ ...prev, leave_request_number: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setaccess_req__group23855((prev: any) => ({ ...prev, leave_request_number: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['leave_req_details'] = leave_req_details94d2a,
        codeStates['setleave_req_details'] = setleave_req_details94d2a,
        codeStates['leave_request_number'] = leave_request_number9e857,
        codeStates['setleave_request_number'] = setleave_request_number9e857,
        codeStates['full_name'] = full_namef5482,
        codeStates['setfull_name'] = setfull_namef5482,
        codeStates['policy_name'] = policy_nameca7f5,
        codeStates['setpolicy_name'] = setpolicy_nameca7f5,
        codeStates['leave_reason_category'] = leave_reason_category26b76,
        codeStates['setleave_reason_category'] = setleave_reason_category26b76,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkboxaac78,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkboxaac78,
        codeStates['start_date'] = start_date22dc6,
        codeStates['setstart_date'] = setstart_date22dc6,
        codeStates['end_date'] = end_dateb0819,
        codeStates['setend_date'] = setend_dateb0819,
        codeStates['days_requested'] = days_requested84d0e,
        codeStates['setdays_requested'] = setdays_requested84d0e,
        codeStates['half_day_switch'] = half_day_switchb71e0,
        codeStates['sethalf_day_switch'] = sethalf_day_switchb71e0,
        codeStates['haf_day_session'] = haf_day_session36e8a,
        codeStates['sethaf_day_session'] = sethaf_day_session36e8a,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,
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
      if(access_req__group23855?.leave_request_number == "" || access_req__group23855?.leave_request_number == undefined){
      access_req__group23855.leave_request_number = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__group23855?.leave_request_number);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:"invalid"}}));
        }
    }else if(access_req__group23855?.leave_request_number !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__group23855?.leave_request_number);
        }
        else{
          validate = v.safeParse(schema, access_req__group23855?.leave_request_number);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(access_req__group23855?.leave_request_number == "" || access_req__group23855?.leave_request_number == undefined){
      access_req__group23855.leave_request_number = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__group23855?.leave_request_number);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:"invalid"}}));
        }
    }else if(access_req__group23855?.leave_request_number !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__group23855?.leave_request_number);
        }
        else{
          validate = v.safeParse(schema, access_req__group23855?.leave_request_number);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_request_number:undefined}}));
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
        "8b4e755807abc210c828a73248623855",
        "f523cc647fdcb27dcb26d1db11c9e857"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1",
      //     componentId: "8b4e755807abc210c828a73248623855",
      //     controlId: "f523cc647fdcb27dcb26d1db11c9e857",
      //     isTable: false,
      //     from:"TextInputleave_request_number",
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
        setDynamicStateandType({name:'leave_request_number', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'leave_request_number',type:'text'};
      //   type={
      //     name:'leave_request_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_request_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_request_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_request_number.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'leave_request_number',type:'text'};
      //   type={
      //     name:'leave_request_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_request_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_request_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_request_number.type
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
  const access_req__group23855Ref = useRef<any>(access_req__group23855);
  useEffect(() => { access_req__group23855Ref.current = access_req__group23855; }, [access_req__group23855]);
  useEffect(()=>{
      handleMapperValue();
      if(!access_req__group23855?.leave_request_number)
      {
        setaccess_req__group23855Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f523cc647fdcb27dcb26d1db11c9e857") {
        handleChange({target:{value:access_req__group23855Ref?.current?.leave_request_number||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f523cc647fdcb27dcb26d1db11c9e857") {
        handleBlur({target:{value:access_req__group23855Ref?.current?.leave_request_number||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (leave_request_number9e857?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 6`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={access_req__group23855?.leave_request_number||""}
         disabled= {leave_request_number9e857?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='e.g. LR-2026-XXX'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Leave Request Number"
      errorMessage={error}
        validationState={validate?.applyLeave_v1?.leave_request_number ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputleave_request_number
