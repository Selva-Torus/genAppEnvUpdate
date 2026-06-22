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

const TextInputassigned_by = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assigned_by"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1|8b8be57613e6374a30114f7b757c96e9|e37b45f1f5c2dc09de8ad4df6d0aa464"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'assigned_by',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_textbebbc, setassignment_information_textbebbc}= useContext(TotalContext) as TotalContextProps;
  const {asset_name39101, setasset_name39101}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toad6a1, setassigned_toad6a1}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byaa464, setassigned_byaa464}= useContext(TotalContext) as TotalContextProps;
  const {assigned_atca20b, setassigned_atca20b}= useContext(TotalContext) as TotalContextProps;
  const {assignment_status1057b, setassignment_status1057b}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assignf6852, setcondition_at_assignf6852}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_datedf53d, setexpected_return_datedf53d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,assigned_by:undefined}}));
    if(dynamicStateandType.type=="number"){
    setassignment_information_groupc96e9((prev: any) => ({ ...prev, assigned_by: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setassignment_information_groupc96e9((prev: any) => ({ ...prev, assigned_by: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_information_text'] = assignment_information_textbebbc,
        codeStates['setassignment_information_text'] = setassignment_information_textbebbc,
        codeStates['asset_name'] = asset_name39101,
        codeStates['setasset_name'] = setasset_name39101,
        codeStates['assigned_to'] = assigned_toad6a1,
        codeStates['setassigned_to'] = setassigned_toad6a1,
        codeStates['assigned_by'] = assigned_byaa464,
        codeStates['setassigned_by'] = setassigned_byaa464,
        codeStates['assigned_at'] = assigned_atca20b,
        codeStates['setassigned_at'] = setassigned_atca20b,
        codeStates['assignment_status'] = assignment_status1057b,
        codeStates['setassignment_status'] = setassignment_status1057b,
        codeStates['condition_at_assign'] = condition_at_assignf6852,
        codeStates['setcondition_at_assign'] = setcondition_at_assignf6852,
        codeStates['expected_return_date'] = expected_return_datedf53d,
        codeStates['setexpected_return_date'] = setexpected_return_datedf53d,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
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
      if(assignment_information_groupc96e9?.assigned_by == "" || assignment_information_groupc96e9?.assigned_by == undefined){
      assignment_information_groupc96e9.assigned_by = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, assignment_information_groupc96e9?.assigned_by);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,assigned_by:"invalid"}}));
        }
    }else if(assignment_information_groupc96e9?.assigned_by !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +assignment_information_groupc96e9?.assigned_by);
        }
        else{
          validate = v.safeParse(schema, assignment_information_groupc96e9?.assigned_by);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,assigned_by:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,assigned_by:undefined}}));
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
        "8b8be57613e6374a30114f7b757c96e9",
        "e37b45f1f5c2dc09de8ad4df6d0aa464"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1",
      //     componentId: "8b8be57613e6374a30114f7b757c96e9",
      //     controlId: "e37b45f1f5c2dc09de8ad4df6d0aa464",
      //     isTable: false,
      //     from:"TextInputassigned_by",
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
        setDynamicStateandType({name:'assigned_by', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'assigned_by',type:'text'};
      //   type={
      //     name:'assigned_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.assigned_by.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'assigned_by',type:'text'};
      //   type={
      //     name:'assigned_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.assigned_by.type
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

  const assignment_information_groupc96e9Ref = useRef<any>(assignment_information_groupc96e9);
  useEffect(() => { assignment_information_groupc96e9Ref.current = assignment_information_groupc96e9; }, [assignment_information_groupc96e9]);
  useEffect(()=>{
      handleMapperValue();
      if(!assignment_information_groupc96e9?.assigned_by)
      {
        setassignment_information_groupc96e9Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "e37b45f1f5c2dc09de8ad4df6d0aa464") {
        handleChange({target:{value:assignment_information_groupc96e9Ref?.current?.assigned_by||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e37b45f1f5c2dc09de8ad4df6d0aa464") {
        handleBlur({target:{value:assignment_information_groupc96e9Ref?.current?.assigned_by||""}});
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
      setassignment_information_groupc96e9((pre:any)=>({...pre,assigned_by:dfd_assetassignments_v1Props.data[0]?.assigned_by}));
    }
  }
  },[dfd_assetassignments_v1Props?.setSearchFilters])
  if (assigned_byaa464?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-md"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={assignment_information_groupc96e9?.assigned_by||""}
         disabled= {assigned_byaa464?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Assigned By"
      errorMessage={error}
        validationState={validate?.assignAssetView_v1?.assigned_by ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputassigned_by
