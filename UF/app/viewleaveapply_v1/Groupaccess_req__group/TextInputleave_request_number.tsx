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
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1|1adc3ad97f24278a74ffd028cc8578e5|6cb9847f58ff96a779927ec9bfcb0948"
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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_detailsf2bd7, setleave_req_detailsf2bd7}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_numberb0948, setleave_request_numberb0948}= useContext(TotalContext) as TotalContextProps;
  const {full_namedebbe, setfull_namedebbe}= useContext(TotalContext) as TotalContextProps;
  const {policy_name67103, setpolicy_name67103}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_categorya15ad, setleave_reason_categorya15ad}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox63f2e, setemergency_leave_checkbox63f2e}= useContext(TotalContext) as TotalContextProps;
  const {start_date8bb1a, setstart_date8bb1a}= useContext(TotalContext) as TotalContextProps;
  const {end_datea8b1a, setend_datea8b1a}= useContext(TotalContext) as TotalContextProps;
  const {days_requested4683c, setdays_requested4683c}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch96651, sethalf_day_switch96651}= useContext(TotalContext) as TotalContextProps;
  const {haf_day_session61b96, sethaf_day_session61b96}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_request_number:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__group578e5((prev: any) => ({ ...prev, leave_request_number: +e.target.value }));
    }
    else{
    setaccess_req__group578e5((prev: any) => ({ ...prev, leave_request_number: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['leave_req_details'] = leave_req_detailsf2bd7,
        codeStates['setleave_req_details'] = setleave_req_detailsf2bd7,
        codeStates['leave_request_number'] = leave_request_numberb0948,
        codeStates['setleave_request_number'] = setleave_request_numberb0948,
        codeStates['full_name'] = full_namedebbe,
        codeStates['setfull_name'] = setfull_namedebbe,
        codeStates['policy_name'] = policy_name67103,
        codeStates['setpolicy_name'] = setpolicy_name67103,
        codeStates['leave_reason_category'] = leave_reason_categorya15ad,
        codeStates['setleave_reason_category'] = setleave_reason_categorya15ad,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox63f2e,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox63f2e,
        codeStates['start_date'] = start_date8bb1a,
        codeStates['setstart_date'] = setstart_date8bb1a,
        codeStates['end_date'] = end_datea8b1a,
        codeStates['setend_date'] = setend_datea8b1a,
        codeStates['days_requested'] = days_requested4683c,
        codeStates['setdays_requested'] = setdays_requested4683c,
        codeStates['half_day_switch'] = half_day_switch96651,
        codeStates['sethalf_day_switch'] = sethalf_day_switch96651,
        codeStates['haf_day_session'] = haf_day_session61b96,
        codeStates['sethaf_day_session'] = sethaf_day_session61b96,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
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
        "1adc3ad97f24278a74ffd028cc8578e5",
        "6cb9847f58ff96a779927ec9bfcb0948"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1",
      //     componentId: "1adc3ad97f24278a74ffd028cc8578e5",
      //     controlId: "6cb9847f58ff96a779927ec9bfcb0948",
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
  const access_req__group578e5Ref = useRef<any>(access_req__group578e5);
  useEffect(() => { access_req__group578e5Ref.current = access_req__group578e5; }, [access_req__group578e5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6cb9847f58ff96a779927ec9bfcb0948") {
        handleChange({target:{value:access_req__group578e5Ref?.current?.leave_request_number||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6cb9847f58ff96a779927ec9bfcb0948") {
        handleBlur({target:{value:access_req__group578e5Ref?.current?.leave_request_number||""}});
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
      setaccess_req__group578e5((pre:any)=>({...pre,leave_request_number:dfd_applyleave_v1Props.data[0]?.leave_request_number}));
    }
  }
  },[dfd_applyleave_v1Props?.setSearchFilters])
  if (leave_request_numberb0948?.isHidden) {
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
        value={access_req__group578e5?.leave_request_number||""}
         disabled= {leave_request_numberb0948?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='e.g. LR-2026-XXX'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Leave Request Number"
      errorMessage={error}
        validationState={validate?.viewLeaveApply_v1?.leave_request_number ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputleave_request_number
