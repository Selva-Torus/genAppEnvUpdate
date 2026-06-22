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

const TextInputactual_return_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.actual_return_date"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1|472c369f56f3afb6e920bdd86cc136e4|22d0fc8031c14f9fa8d40b59055c1f64"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'actual_return_date',type:"text"})
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
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_text97d83, setassignment_details_text97d83}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_datec1f64, setactual_return_datec1f64}= useContext(TotalContext) as TotalContextProps;
  const {returned_atecafb, setreturned_atecafb}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return1d3c7, setcondition_at_return1d3c7}= useContext(TotalContext) as TotalContextProps;
  const {approved_by2b89c, setapproved_by2b89c}= useContext(TotalContext) as TotalContextProps;
  const {approval_statusf07b0, setapproval_statusf07b0}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signed5ee58, setacknowledgement_signed5ee58}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notes59be1, setassignment_notes59be1}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,actual_return_date:undefined}}));
    if(dynamicStateandType.type=="number"){
    setassignment_details_group136e4((prev: any) => ({ ...prev, actual_return_date: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setassignment_details_group136e4((prev: any) => ({ ...prev, actual_return_date: e.target.value }));
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
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assignment_details_text'] = assignment_details_text97d83,
        codeStates['setassignment_details_text'] = setassignment_details_text97d83,
        codeStates['actual_return_date'] = actual_return_datec1f64,
        codeStates['setactual_return_date'] = setactual_return_datec1f64,
        codeStates['returned_at'] = returned_atecafb,
        codeStates['setreturned_at'] = setreturned_atecafb,
        codeStates['condition_at_return'] = condition_at_return1d3c7,
        codeStates['setcondition_at_return'] = setcondition_at_return1d3c7,
        codeStates['approved_by'] = approved_by2b89c,
        codeStates['setapproved_by'] = setapproved_by2b89c,
        codeStates['approval_status'] = approval_statusf07b0,
        codeStates['setapproval_status'] = setapproval_statusf07b0,
        codeStates['acknowledgement_signed'] = acknowledgement_signed5ee58,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signed5ee58,
        codeStates['assignment_notes'] = assignment_notes59be1,
        codeStates['setassignment_notes'] = setassignment_notes59be1,
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
      if(assignment_details_group136e4?.actual_return_date == "" || assignment_details_group136e4?.actual_return_date == undefined){
      assignment_details_group136e4.actual_return_date = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, assignment_details_group136e4?.actual_return_date);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,actual_return_date:"invalid"}}));
        }
    }else if(assignment_details_group136e4?.actual_return_date !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +assignment_details_group136e4?.actual_return_date);
        }
        else{
          validate = v.safeParse(schema, assignment_details_group136e4?.actual_return_date);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,actual_return_date:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,assignAssetView_v1:{...pre?.assignAssetView_v1,actual_return_date:undefined}}));
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
        "472c369f56f3afb6e920bdd86cc136e4",
        "22d0fc8031c14f9fa8d40b59055c1f64"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1",
      //     componentId: "472c369f56f3afb6e920bdd86cc136e4",
      //     controlId: "22d0fc8031c14f9fa8d40b59055c1f64",
      //     isTable: false,
      //     from:"TextInputactual_return_date",
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
        setDynamicStateandType({name:'actual_return_date', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'actual_return_date',type:'text'};
      //   type={
      //     name:'actual_return_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.actual_return_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.actual_return_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.actual_return_date.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'actual_return_date',type:'text'};
      //   type={
      //     name:'actual_return_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.actual_return_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.actual_return_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.actual_return_date.type
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

  const assignment_details_group136e4Ref = useRef<any>(assignment_details_group136e4);
  useEffect(() => { assignment_details_group136e4Ref.current = assignment_details_group136e4; }, [assignment_details_group136e4]);
  useEffect(()=>{
      handleMapperValue();
      if(!assignment_details_group136e4?.actual_return_date)
      {
        setassignment_details_group136e4Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "22d0fc8031c14f9fa8d40b59055c1f64") {
        handleChange({target:{value:assignment_details_group136e4Ref?.current?.actual_return_date||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "22d0fc8031c14f9fa8d40b59055c1f64") {
        handleBlur({target:{value:assignment_details_group136e4Ref?.current?.actual_return_date||""}});
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
      setassignment_details_group136e4((pre:any)=>({...pre,actual_return_date:dfd_assetassignments_v1Props.data[0]?.actual_return_date}));
    }
  }
  },[dfd_assetassignments_v1Props?.setSearchFilters])
  if (actual_return_datec1f64?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-md"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={assignment_details_group136e4?.actual_return_date||""}
         disabled= {actual_return_datec1f64?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Approved By"
      errorMessage={error}
        validationState={validate?.assignAssetView_v1?.actual_return_date ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputactual_return_date
