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

const TextInputheadcount = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.headcount"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1|2a5944178febfa18e4be375d2920d8fe|36054c93daaad4391a5776a402f4c5a4"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'headcount',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text16f4a, setstaffing_compensation_text16f4a}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min31c0f, setsalary_range_min31c0f}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxb8794, setsalary_range_maxb8794}= useContext(TotalContext) as TotalContextProps;
  const {headcount4c5a4, setheadcount4c5a4}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount53c3b, setapproved_headcount53c3b}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount35c2c, setfilled_headcount35c2c}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status83fc0, setvacancy_status83fc0}= useContext(TotalContext) as TotalContextProps;
  const {remote_alloweda2944, setremote_alloweda2944}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredee204, settravel_requiredee204}= useContext(TotalContext) as TotalContextProps;
  const {is_open9bbae, setis_open9bbae}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.number('Please enter a value greater than zero.')",
  "v.nonNullable(v.number())"
] ;
    const schema : any  = v.pipe(    v.number('Please enter a value greater than zero.'),
    v.nonNullable(v.number()),
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
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev, headcount: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev, headcount: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['staffing_compensation_text'] = staffing_compensation_text16f4a,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text16f4a,
        codeStates['salary_range_min'] = salary_range_min31c0f,
        codeStates['setsalary_range_min'] = setsalary_range_min31c0f,
        codeStates['salary_range_max'] = salary_range_maxb8794,
        codeStates['setsalary_range_max'] = setsalary_range_maxb8794,
        codeStates['headcount'] = headcount4c5a4,
        codeStates['setheadcount'] = setheadcount4c5a4,
        codeStates['approved_headcount'] = approved_headcount53c3b,
        codeStates['setapproved_headcount'] = setapproved_headcount53c3b,
        codeStates['filled_headcount'] = filled_headcount35c2c,
        codeStates['setfilled_headcount'] = setfilled_headcount35c2c,
        codeStates['vacancy_status'] = vacancy_status83fc0,
        codeStates['setvacancy_status'] = setvacancy_status83fc0,
        codeStates['remote_allowed'] = remote_alloweda2944,
        codeStates['setremote_allowed'] = setremote_alloweda2944,
        codeStates['travel_required'] = travel_requiredee204,
        codeStates['settravel_required'] = settravel_requiredee204,
        codeStates['is_open'] = is_open9bbae,
        codeStates['setis_open'] = setis_open9bbae,
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
      if(compensation_benfits_group0d8fe?.headcount == "" || compensation_benfits_group0d8fe?.headcount == undefined){
      compensation_benfits_group0d8fe.headcount = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group0d8fe?.headcount);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:"invalid"}}));
        }
    }else if(compensation_benfits_group0d8fe?.headcount !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_group0d8fe?.headcount);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group0d8fe?.headcount);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(compensation_benfits_group0d8fe?.headcount == "" || compensation_benfits_group0d8fe?.headcount == undefined){
      compensation_benfits_group0d8fe.headcount = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group0d8fe?.headcount);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:"invalid"}}));
        }
    }else if(compensation_benfits_group0d8fe?.headcount !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_group0d8fe?.headcount);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group0d8fe?.headcount);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,headcount:undefined}}));
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
        "2a5944178febfa18e4be375d2920d8fe",
        "36054c93daaad4391a5776a402f4c5a4"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1",
      //     componentId: "2a5944178febfa18e4be375d2920d8fe",
      //     controlId: "36054c93daaad4391a5776a402f4c5a4",
      //     isTable: false,
      //     from:"TextInputheadcount",
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
        setDynamicStateandType({name:'headcount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'headcount',type:'text'};
      //   type={
      //     name:'headcount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.headcount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.headcount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.headcount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'headcount',type:'text'};
      //   type={
      //     name:'headcount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.headcount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.headcount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.headcount.type
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
  const compensation_benfits_group0d8feRef = useRef<any>(compensation_benfits_group0d8fe);
  useEffect(() => { compensation_benfits_group0d8feRef.current = compensation_benfits_group0d8fe; }, [compensation_benfits_group0d8fe]);
  useEffect(()=>{
      handleMapperValue();
      if(!compensation_benfits_group0d8fe?.headcount)
      {
        setcompensation_benfits_group0d8feProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "36054c93daaad4391a5776a402f4c5a4") {
        handleChange({target:{value:compensation_benfits_group0d8feRef?.current?.headcount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "36054c93daaad4391a5776a402f4c5a4") {
        handleBlur({target:{value:compensation_benfits_group0d8feRef?.current?.headcount||""}});
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
  if(dfd_jobpositions_v1Props?.setSearchFilters && dfd_jobpositions_v1Props?.data)
  {
    if(Array.isArray(dfd_jobpositions_v1Props.data) && dfd_jobpositions_v1Props.data.length > 0){
      setcompensation_benfits_group0d8fe((pre:any)=>({...pre,headcount:dfd_jobpositions_v1Props.data[0]?.headcount}));
    }
  }
  },[dfd_jobpositions_v1Props?.setSearchFilters])
  if (headcount4c5a4?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 19`,gridRow: `9 / 23`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={compensation_benfits_group0d8fe?.headcount||""}
         disabled= {headcount4c5a4?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Total Headcount"
      errorMessage={error}
        validationState={validate?.viewEmployeeJobPosition_v1?.headcount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputheadcount
