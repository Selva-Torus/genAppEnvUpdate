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

const TextInputrevoked_by = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1|21d269e30ee840848c3f8d33112a6ffd|properties.revoked_by"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequestApproval:AFVK:v1|46f10e735b86fb544c49256e2979c6ae|319523b9e7388a5587b438589c87a13e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1:",
  "schemaData": {
    "type": "null"
  },
  "dataType": "null"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'revoked_by',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group89009, setnew_access_group89009}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group89009Props, setnew_access_group89009Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698, setaccess_req__groupf6698}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698Props, setaccess_req__groupf6698Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fc, setbusiness_just__group5c7fc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fcProps, setbusiness_just__group5c7fcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09d, setvalid_groupec09d}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09dProps, setvalid_groupec09dProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185e, setapp_inf_group4185e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185eProps, setapp_inf_group4185eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509, setapprove_group6b509}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509Props, setapprove_group6b509Props}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52, setprovision_groupf5a52}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52Props, setprovision_groupf5a52Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1, setprov_group33ef1}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1Props, setprov_group33ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6ae, setrevocation_group9c6ae}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6aeProps, setrevocation_group9c6aeProps}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cb, setrev_group4b1cb}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cbProps, setrev_group4b1cbProps}= useContext(TotalContext) as TotalContextProps;
  const {revoked_by7a13e, setrevoked_by7a13e}= useContext(TotalContext) as TotalContextProps;
  const {revok_atb5109, setrevok_atb5109}= useContext(TotalContext) as TotalContextProps;
  const {revoked_reasonf5ff7, setrevoked_reasonf5ff7}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9, setaudit_group270d9}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9Props, setaudit_group270d9Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364, setdynamicactions51364}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364Props, setdynamicactions51364Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newAccessRequestApproval_v1:{...pre?.newAccessRequestApproval_v1,revoked_by:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrevocation_group9c6ae((prev: any) => ({ ...prev, revoked_by: +e.target.value }));
    }
    else{
    setrevocation_group9c6ae((prev: any) => ({ ...prev, revoked_by: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group89009,
        codeStates['setnew_access_group'] = setnew_access_group89009,
        codeStates['new_access_group89009'] = new_access_group89009Props,
        codeStates['setnew_access_group89009'] = setnew_access_group89009Props,
        codeStates['access_req__group'] = access_req__groupf6698,
        codeStates['setaccess_req__group'] = setaccess_req__groupf6698,
        codeStates['access_req__groupf6698'] = access_req__groupf6698Props,
        codeStates['setaccess_req__groupf6698'] = setaccess_req__groupf6698Props,
        codeStates['business_just__group'] = business_just__group5c7fc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group5c7fc,
        codeStates['business_just__group5c7fc'] = business_just__group5c7fcProps,
        codeStates['setbusiness_just__group5c7fc'] = setbusiness_just__group5c7fcProps,
        codeStates['valid_group'] = valid_groupec09d,
        codeStates['setvalid_group'] = setvalid_groupec09d,
        codeStates['valid_groupec09d'] = valid_groupec09dProps,
        codeStates['setvalid_groupec09d'] = setvalid_groupec09dProps,
        codeStates['app_inf_group'] = app_inf_group4185e,
        codeStates['setapp_inf_group'] = setapp_inf_group4185e,
        codeStates['app_inf_group4185e'] = app_inf_group4185eProps,
        codeStates['setapp_inf_group4185e'] = setapp_inf_group4185eProps,
        codeStates['approve_group'] = approve_group6b509,
        codeStates['setapprove_group'] = setapprove_group6b509,
        codeStates['approve_group6b509'] = approve_group6b509Props,
        codeStates['setapprove_group6b509'] = setapprove_group6b509Props,
        codeStates['provision_group'] = provision_groupf5a52,
        codeStates['setprovision_group'] = setprovision_groupf5a52,
        codeStates['provision_groupf5a52'] = provision_groupf5a52Props,
        codeStates['setprovision_groupf5a52'] = setprovision_groupf5a52Props,
        codeStates['prov_group'] = prov_group33ef1,
        codeStates['setprov_group'] = setprov_group33ef1,
        codeStates['prov_group33ef1'] = prov_group33ef1Props,
        codeStates['setprov_group33ef1'] = setprov_group33ef1Props,
        codeStates['revocation_group'] = revocation_group9c6ae,
        codeStates['setrevocation_group'] = setrevocation_group9c6ae,
        codeStates['revocation_group9c6ae'] = revocation_group9c6aeProps,
        codeStates['setrevocation_group9c6ae'] = setrevocation_group9c6aeProps,
        codeStates['rev_group'] = rev_group4b1cb,
        codeStates['setrev_group'] = setrev_group4b1cb,
        codeStates['rev_group4b1cb'] = rev_group4b1cbProps,
        codeStates['setrev_group4b1cb'] = setrev_group4b1cbProps,
        codeStates['revoked_by'] = revoked_by7a13e,
        codeStates['setrevoked_by'] = setrevoked_by7a13e,
        codeStates['revok_at'] = revok_atb5109,
        codeStates['setrevok_at'] = setrevok_atb5109,
        codeStates['revoked_reason'] = revoked_reasonf5ff7,
        codeStates['setrevoked_reason'] = setrevoked_reasonf5ff7,
        codeStates['audit_group'] = audit_group270d9,
        codeStates['setaudit_group'] = setaudit_group270d9,
        codeStates['audit_group270d9'] = audit_group270d9Props,
        codeStates['setaudit_group270d9'] = setaudit_group270d9Props,
        codeStates['dynamicactions'] = dynamicactions51364,
        codeStates['setdynamicactions'] = setdynamicactions51364,
        codeStates['dynamicactions51364'] = dynamicactions51364Props,
        codeStates['setdynamicactions51364'] = setdynamicactions51364Props,
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
        "46f10e735b86fb544c49256e2979c6ae",
        "319523b9e7388a5587b438589c87a13e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequestApproval:AFVK:v1",
      //     componentId: "46f10e735b86fb544c49256e2979c6ae",
      //     controlId: "319523b9e7388a5587b438589c87a13e",
      //     isTable: false,
      //     from:"TextInputrevoked_by",
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
        setDynamicStateandType({name:'revoked_by', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'revoked_by',type:'text'};
      //   type={
      //     name:'revoked_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revoked_by.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'revoked_by',type:'text'};
      //   type={
      //     name:'revoked_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revoked_by.type
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
  const revocation_group9c6aeRef = useRef<any>(revocation_group9c6ae);
  useEffect(() => { revocation_group9c6aeRef.current = revocation_group9c6ae; }, [revocation_group9c6ae]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "319523b9e7388a5587b438589c87a13e") {
        handleChange({target:{value:revocation_group9c6aeRef?.current?.revoked_by||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "319523b9e7388a5587b438589c87a13e") {
        handleBlur({target:{value:revocation_group9c6aeRef?.current?.revoked_by||""}});
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
  if(dfd_addaccessrequestmodify_v1Props?.setSearchFilters && dfd_addaccessrequestmodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addaccessrequestmodify_v1Props.data) && dfd_addaccessrequestmodify_v1Props.data.length > 0){
      setrevocation_group9c6ae((pre:any)=>({...pre,revoked_by:dfd_addaccessrequestmodify_v1Props.data[0]?.revoked_by}));
    }
  }
  },[dfd_addaccessrequestmodify_v1Props?.setSearchFilters])
  if (revoked_by7a13e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={revocation_group9c6ae?.revoked_by||""}
         disabled= {revoked_by7a13e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='--'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Revoked By"
      errorMessage={error}
        validationState={validate?.newAccessRequestApproval_v1?.revoked_by ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrevoked_by
