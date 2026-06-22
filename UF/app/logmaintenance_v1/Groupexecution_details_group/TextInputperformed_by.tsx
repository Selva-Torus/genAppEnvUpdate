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

const TextInputperformed_by = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1|a3386808f53949eebff60bf867dcc7a3|properties.performed_by"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1|6f620f2c13924269ac67da12e7f591cd|1a75a4c2ae354034800ff77f1c7cb4dc"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'performed_by',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_text71309, setexecution_details_text71309}= useContext(TotalContext) as TotalContextProps;
  const {performed_bycb4dc, setperformed_bycb4dc}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name17b17, setvendor_name17b17}= useContext(TotalContext) as TotalContextProps;
  const {vendor_referencefa982, setvendor_referencefa982}= useContext(TotalContext) as TotalContextProps;
  const {downtime_hours721c7, setdowntime_hours721c7}= useContext(TotalContext) as TotalContextProps;
  const {cost35190, setcost35190}= useContext(TotalContext) as TotalContextProps;
  const {descriptioneaa55, setdescriptioneaa55}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_checklist024ed, setmaintenance_checklist024ed}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,performed_by:undefined}}));
    if(dynamicStateandType.type=="number"){
    setexecution_details_group591cd((prev: any) => ({ ...prev, performed_by: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setexecution_details_group591cd((prev: any) => ({ ...prev, performed_by: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['execution_details_text'] = execution_details_text71309,
        codeStates['setexecution_details_text'] = setexecution_details_text71309,
        codeStates['performed_by'] = performed_bycb4dc,
        codeStates['setperformed_by'] = setperformed_bycb4dc,
        codeStates['vendor_name'] = vendor_name17b17,
        codeStates['setvendor_name'] = setvendor_name17b17,
        codeStates['vendor_reference'] = vendor_referencefa982,
        codeStates['setvendor_reference'] = setvendor_referencefa982,
        codeStates['downtime_hours'] = downtime_hours721c7,
        codeStates['setdowntime_hours'] = setdowntime_hours721c7,
        codeStates['cost'] = cost35190,
        codeStates['setcost'] = setcost35190,
        codeStates['description'] = descriptioneaa55,
        codeStates['setdescription'] = setdescriptioneaa55,
        codeStates['maintenance_checklist'] = maintenance_checklist024ed,
        codeStates['setmaintenance_checklist'] = setmaintenance_checklist024ed,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
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
      if(execution_details_group591cd?.performed_by == "" || execution_details_group591cd?.performed_by == undefined){
      execution_details_group591cd.performed_by = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, execution_details_group591cd?.performed_by);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,performed_by:"invalid"}}));
        }
    }else if(execution_details_group591cd?.performed_by !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +execution_details_group591cd?.performed_by);
        }
        else{
          validate = v.safeParse(schema, execution_details_group591cd?.performed_by);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,performed_by:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,performed_by:undefined}}));
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
        "6f620f2c13924269ac67da12e7f591cd",
        "1a75a4c2ae354034800ff77f1c7cb4dc"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1",
      //     componentId: "6f620f2c13924269ac67da12e7f591cd",
      //     controlId: "1a75a4c2ae354034800ff77f1c7cb4dc",
      //     isTable: false,
      //     from:"TextInputperformed_by",
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
        setDynamicStateandType({name:'performed_by', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'performed_by',type:'text'};
      //   type={
      //     name:'performed_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.performed_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.performed_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.performed_by.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'performed_by',type:'text'};
      //   type={
      //     name:'performed_by',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.performed_by.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.performed_by.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.performed_by.type
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

  const execution_details_group591cdRef = useRef<any>(execution_details_group591cd);
  useEffect(() => { execution_details_group591cdRef.current = execution_details_group591cd; }, [execution_details_group591cd]);
  useEffect(()=>{
      handleMapperValue();
      if(!execution_details_group591cd?.performed_by)
      {
        setexecution_details_group591cdProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "1a75a4c2ae354034800ff77f1c7cb4dc") {
        handleChange({target:{value:execution_details_group591cdRef?.current?.performed_by||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "1a75a4c2ae354034800ff77f1c7cb4dc") {
        handleBlur({target:{value:execution_details_group591cdRef?.current?.performed_by||""}});
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
  if(dfd_assetmaintenance_v1Props?.setSearchFilters && dfd_assetmaintenance_v1Props?.data)
  {
    if(Array.isArray(dfd_assetmaintenance_v1Props.data) && dfd_assetmaintenance_v1Props.data.length > 0){
      setexecution_details_group591cd((pre:any)=>({...pre,performed_by:dfd_assetmaintenance_v1Props.data[0]?.performed_by}));
    }
  }
  },[dfd_assetmaintenance_v1Props?.setSearchFilters])
  if (performed_bycb4dc?.isHidden) {
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
        value={execution_details_group591cd?.performed_by||""}
         disabled= {performed_bycb4dc?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Performed By"
      errorMessage={error}
        validationState={validate?.logMaintenance_v1?.performed_by ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputperformed_by
