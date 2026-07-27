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

const TextInputleave_balance_after = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'leave_balance_after',type:"text"})
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
  const {emp_avail_group21476, setemp_avail_group21476}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476Props, setemp_avail_group21476Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19a, setleave_balance_group2b19a}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19aProps, setleave_balance_group2b19aProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_availabilityde935, setemployee_availabilityde935}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_befored2d96, setleave_balance_befored2d96}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_afterbf909, setleave_balance_afterbf909}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335, setapp_det_groupe1335}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335Props, setapp_det_groupe1335Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00a, setapprove_group1e00a}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00aProps, setapprove_group1e00aProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703, setaudit_groupa0703}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703Props, setaudit_groupa0703Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,leave_balance_after:undefined}}));
    if(dynamicStateandType.type=="number"){
    setleave_balance_group2b19a((prev: any) => ({ ...prev, leave_balance_after: +e.target.value }));
    }
    else{
    setleave_balance_group2b19a((prev: any) => ({ ...prev, leave_balance_after: e.target.value }));
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
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['employee_availability'] = employee_availabilityde935,
        codeStates['setemployee_availability'] = setemployee_availabilityde935,
        codeStates['leave_balance_before'] = leave_balance_befored2d96,
        codeStates['setleave_balance_before'] = setleave_balance_befored2d96,
        codeStates['leave_balance_after'] = leave_balance_afterbf909,
        codeStates['setleave_balance_after'] = setleave_balance_afterbf909,
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
        "5867c648db9944308c0cb0eea652b19a",
        "d642e0c2ed34495d9664d2dbdd8bf909"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1",
      //     componentId: "5867c648db9944308c0cb0eea652b19a",
      //     controlId: "d642e0c2ed34495d9664d2dbdd8bf909",
      //     isTable: false,
      //     from:"TextInputleave_balance_after",
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
        setDynamicStateandType({name:'leave_balance_after', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'leave_balance_after',type:'text'};
      //   type={
      //     name:'leave_balance_after',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_balance_after.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_balance_after.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.leave_balance_after.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'leave_balance_after',type:'text'};
      //   type={
      //     name:'leave_balance_after',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_balance_after.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_balance_after.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.leave_balance_after.type
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
  const leave_balance_group2b19aRef = useRef<any>(leave_balance_group2b19a);
  useEffect(() => { leave_balance_group2b19aRef.current = leave_balance_group2b19a; }, [leave_balance_group2b19a]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d642e0c2ed34495d9664d2dbdd8bf909") {
        handleChange({target:{value:leave_balance_group2b19aRef?.current?.leave_balance_after||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d642e0c2ed34495d9664d2dbdd8bf909") {
        handleBlur({target:{value:leave_balance_group2b19aRef?.current?.leave_balance_after||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (leave_balance_afterbf909?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `12 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={leave_balance_group2b19a?.leave_balance_after||""}
         disabled= {leave_balance_afterbf909?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='--'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Leave Balance After"
      errorMessage={error}
        validationState={validate?.applyLeave_v1?.leave_balance_after ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputleave_balance_after
