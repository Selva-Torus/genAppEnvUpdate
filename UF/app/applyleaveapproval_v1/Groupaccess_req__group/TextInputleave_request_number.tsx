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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1|39645aa0f2064fb48ea2e65e5e5e702a|properties.leave_request_number"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeaveApproval:AFVK:v1|e968590033094bbfaf1b81b7bf27ac49|acc1e6397622bc407762f8b175877855"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_applyleave_v1Props, setdfd_applyleave_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_details0272a, setleave_req_details0272a}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number77855, setleave_request_number77855}= useContext(TotalContext) as TotalContextProps;
  const {full_name9076a, setfull_name9076a}= useContext(TotalContext) as TotalContextProps;
  const {policy_nameab68b, setpolicy_nameab68b}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_category1f94d, setleave_reason_category1f94d}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox8efe9, setemergency_leave_checkbox8efe9}= useContext(TotalContext) as TotalContextProps;
  const {start_date34ff8, setstart_date34ff8}= useContext(TotalContext) as TotalContextProps;
  const {end_date35399, setend_date35399}= useContext(TotalContext) as TotalContextProps;
  const {days_requested70ed8, setdays_requested70ed8}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch3bf69, sethalf_day_switch3bf69}= useContext(TotalContext) as TotalContextProps;
  const {half_day_sessioneee3c, sethalf_day_sessioneee3c}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178, setemp_avail_group11178}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178Props, setemp_avail_group11178Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23, setleave_balance_group98e23}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23Props, setleave_balance_group98e23Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1b, setapp_det_groupe2c1b}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1bProps, setapp_det_groupe2c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086e, setapprove_group4086e}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086eProps, setapprove_group4086eProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fd, setaudit_group087fd}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fdProps, setaudit_group087fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15, setdynamicactionsafd15}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15Props, setdynamicactionsafd15Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,applyLeaveApproval_v1:{...pre?.applyLeaveApproval_v1,leave_request_number:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__group7ac49((prev: any) => ({ ...prev, leave_request_number: +e.target.value }));
    }
    else{
    setaccess_req__group7ac49((prev: any) => ({ ...prev, leave_request_number: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc501f,
        codeStates['setnew_access_group'] = setnew_access_groupc501f,
        codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
        codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
        codeStates['access_req__group'] = access_req__group7ac49,
        codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
        codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
        codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
        codeStates['leave_req_details'] = leave_req_details0272a,
        codeStates['setleave_req_details'] = setleave_req_details0272a,
        codeStates['leave_request_number'] = leave_request_number77855,
        codeStates['setleave_request_number'] = setleave_request_number77855,
        codeStates['full_name'] = full_name9076a,
        codeStates['setfull_name'] = setfull_name9076a,
        codeStates['policy_name'] = policy_nameab68b,
        codeStates['setpolicy_name'] = setpolicy_nameab68b,
        codeStates['leave_reason_category'] = leave_reason_category1f94d,
        codeStates['setleave_reason_category'] = setleave_reason_category1f94d,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox8efe9,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox8efe9,
        codeStates['start_date'] = start_date34ff8,
        codeStates['setstart_date'] = setstart_date34ff8,
        codeStates['end_date'] = end_date35399,
        codeStates['setend_date'] = setend_date35399,
        codeStates['days_requested'] = days_requested70ed8,
        codeStates['setdays_requested'] = setdays_requested70ed8,
        codeStates['half_day_switch'] = half_day_switch3bf69,
        codeStates['sethalf_day_switch'] = sethalf_day_switch3bf69,
        codeStates['half_day_session'] = half_day_sessioneee3c,
        codeStates['sethalf_day_session'] = sethalf_day_sessioneee3c,
        codeStates['emp_avail_group'] = emp_avail_group11178,
        codeStates['setemp_avail_group'] = setemp_avail_group11178,
        codeStates['emp_avail_group11178'] = emp_avail_group11178Props,
        codeStates['setemp_avail_group11178'] = setemp_avail_group11178Props,
        codeStates['leave_balance_group'] = leave_balance_group98e23,
        codeStates['setleave_balance_group'] = setleave_balance_group98e23,
        codeStates['leave_balance_group98e23'] = leave_balance_group98e23Props,
        codeStates['setleave_balance_group98e23'] = setleave_balance_group98e23Props,
        codeStates['app_det_group'] = app_det_groupe2c1b,
        codeStates['setapp_det_group'] = setapp_det_groupe2c1b,
        codeStates['app_det_groupe2c1b'] = app_det_groupe2c1bProps,
        codeStates['setapp_det_groupe2c1b'] = setapp_det_groupe2c1bProps,
        codeStates['approve_group'] = approve_group4086e,
        codeStates['setapprove_group'] = setapprove_group4086e,
        codeStates['approve_group4086e'] = approve_group4086eProps,
        codeStates['setapprove_group4086e'] = setapprove_group4086eProps,
        codeStates['audit_group'] = audit_group087fd,
        codeStates['setaudit_group'] = setaudit_group087fd,
        codeStates['audit_group087fd'] = audit_group087fdProps,
        codeStates['setaudit_group087fd'] = setaudit_group087fdProps,
        codeStates['dynamicactions'] = dynamicactionsafd15,
        codeStates['setdynamicactions'] = setdynamicactionsafd15,
        codeStates['dynamicactionsafd15'] = dynamicactionsafd15Props,
        codeStates['setdynamicactionsafd15'] = setdynamicactionsafd15Props,
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
        "e968590033094bbfaf1b81b7bf27ac49",
        "acc1e6397622bc407762f8b175877855"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeaveApproval:AFVK:v1",
      //     componentId: "e968590033094bbfaf1b81b7bf27ac49",
      //     controlId: "acc1e6397622bc407762f8b175877855",
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
  const access_req__group7ac49Ref = useRef<any>(access_req__group7ac49);
  useEffect(() => { access_req__group7ac49Ref.current = access_req__group7ac49; }, [access_req__group7ac49]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "acc1e6397622bc407762f8b175877855") {
        handleChange({target:{value:access_req__group7ac49Ref?.current?.leave_request_number||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "acc1e6397622bc407762f8b175877855") {
        handleBlur({target:{value:access_req__group7ac49Ref?.current?.leave_request_number||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_applyleave_v1Props?.setSearchFilters && dfd_applyleave_v1Props?.data)
  {
    if(Array.isArray(dfd_applyleave_v1Props.data) && dfd_applyleave_v1Props.data.length > 0){
      setaccess_req__group7ac49((pre:any)=>({...pre,leave_request_number:dfd_applyleave_v1Props.data[0]?.leave_request_number}));
    }
  }
  },[dfd_applyleave_v1Props?.setSearchFilters])
  if (leave_request_number77855?.isHidden) {
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
        value={access_req__group7ac49?.leave_request_number||""}
         disabled= {leave_request_number77855?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='e.g. LR-2026-XXX'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Leave Request Number"
      errorMessage={error}
        validationState={validate?.applyLeaveApproval_v1?.leave_request_number ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputleave_request_number
