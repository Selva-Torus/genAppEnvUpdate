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

const TextInputassigned_to = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assigned_to"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1|913d50f029c84864b01c8a333a75d144|3dba821cf760436dbffab551af3f8f17"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'assigned_to',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_text8af67, setassignment_information_text8af67}= useContext(TotalContext) as TotalContextProps;
  const {asset_name56fec, setasset_name56fec}= useContext(TotalContext) as TotalContextProps;
  const {assigned_tof8f17, setassigned_tof8f17}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byc4563, setassigned_byc4563}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at45db5, setassigned_at45db5}= useContext(TotalContext) as TotalContextProps;
  const {assignment_statusa6f80, setassignment_statusa6f80}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign27aff, setcondition_at_assign27aff}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date15cfe, setexpected_return_date15cfe}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_to:undefined}}));
    if(dynamicStateandType.type=="number"){
    setassignment_information_group5d144((prev: any) => ({ ...prev, assigned_to: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setassignment_information_group5d144((prev: any) => ({ ...prev, assigned_to: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_information_text'] = assignment_information_text8af67,
        codeStates['setassignment_information_text'] = setassignment_information_text8af67,
        codeStates['asset_name'] = asset_name56fec,
        codeStates['setasset_name'] = setasset_name56fec,
        codeStates['assigned_to'] = assigned_tof8f17,
        codeStates['setassigned_to'] = setassigned_tof8f17,
        codeStates['assigned_by'] = assigned_byc4563,
        codeStates['setassigned_by'] = setassigned_byc4563,
        codeStates['assigned_at'] = assigned_at45db5,
        codeStates['setassigned_at'] = setassigned_at45db5,
        codeStates['assignment_status'] = assignment_statusa6f80,
        codeStates['setassignment_status'] = setassignment_statusa6f80,
        codeStates['condition_at_assign'] = condition_at_assign27aff,
        codeStates['setcondition_at_assign'] = setcondition_at_assign27aff,
        codeStates['expected_return_date'] = expected_return_date15cfe,
        codeStates['setexpected_return_date'] = setexpected_return_date15cfe,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
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
  const handleBlur=async (e?:any) => {
      let validate:any
      if(assignment_information_group5d144?.assigned_to == "" || assignment_information_group5d144?.assigned_to == undefined){
      assignment_information_group5d144.assigned_to = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, assignment_information_group5d144?.assigned_to);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_to:"invalid"}}));
        }
    }else if(assignment_information_group5d144?.assigned_to !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +assignment_information_group5d144?.assigned_to);
        }
        else{
          validate = v.safeParse(schema, assignment_information_group5d144?.assigned_to);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_to:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_to:undefined}}));
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
        "913d50f029c84864b01c8a333a75d144",
        "3dba821cf760436dbffab551af3f8f17"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1",
      //     componentId: "913d50f029c84864b01c8a333a75d144",
      //     controlId: "3dba821cf760436dbffab551af3f8f17",
      //     isTable: false,
      //     from:"TextInputassigned_to",
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
        setDynamicStateandType({name:'assigned_to', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'assigned_to',type:'text'};
      //   type={
      //     name:'assigned_to',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_to.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_to.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_to.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'assigned_to',type:'text'};
      //   type={
      //     name:'assigned_to',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_to.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_to.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_to.type
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

  const assignment_information_group5d144Ref = useRef<any>(assignment_information_group5d144);
  useEffect(() => { assignment_information_group5d144Ref.current = assignment_information_group5d144; }, [assignment_information_group5d144]);
  useEffect(()=>{
      handleMapperValue();
      if(!assignment_information_group5d144?.assigned_to)
      {
        setassignment_information_group5d144Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "3dba821cf760436dbffab551af3f8f17") {
        handleChange({target:{value:assignment_information_group5d144Ref?.current?.assigned_to||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "3dba821cf760436dbffab551af3f8f17") {
        handleBlur({target:{value:assignment_information_group5d144Ref?.current?.assigned_to||""}});
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
  if(dfd_assetassignments_v1Props?.setSearchFilters && dfd_assetassignments_v1Props?.data)
  {
    if(Array.isArray(dfd_assetassignments_v1Props.data) && dfd_assetassignments_v1Props.data.length > 0){
      setassignment_information_group5d144((pre:any)=>({...pre,assigned_to:dfd_assetassignments_v1Props.data[0]?.assigned_to}));
    }
  }
  },[dfd_assetassignments_v1Props?.setSearchFilters])
  if (assigned_tof8f17?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `9 / 23`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-md"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={assignment_information_group5d144?.assigned_to||""}
         disabled= {assigned_tof8f17?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Assigned To"
      errorMessage={error}
        validationState={validate?.assignAsset_v1?.assigned_to ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputassigned_to
