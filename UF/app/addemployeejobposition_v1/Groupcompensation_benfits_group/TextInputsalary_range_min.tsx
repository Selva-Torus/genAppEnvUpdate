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

const TextInputsalary_range_min = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.salary_range_min"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobPosition:AFVK:v1|f1469b256669687453aa33ae83eb46e6|7cd55bb316afc5d4e386a7fd0c16aa6e"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'salary_range_min',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text8d8fc, setstaffing_compensation_text8d8fc}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min6aa6e, setsalary_range_min6aa6e}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxebe1d, setsalary_range_maxebe1d}= useContext(TotalContext) as TotalContextProps;
  const {headcount5aefa, setheadcount5aefa}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount42f81, setapproved_headcount42f81}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount049fc, setfilled_headcount049fc}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status989f7, setvacancy_status989f7}= useContext(TotalContext) as TotalContextProps;
  const {remote_allowed76541, setremote_allowed76541}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredfe60a, settravel_requiredfe60a}= useContext(TotalContext) as TotalContextProps;
  const {is_open18094, setis_open18094}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompensation_benfits_groupb46e6((prev: any) => ({ ...prev, salary_range_min: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcompensation_benfits_groupb46e6((prev: any) => ({ ...prev, salary_range_min: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupae38a,
        codeStates['setoverall_group'] = setoverall_groupae38a,
        codeStates['overall_groupae38a'] = overall_groupae38aProps,
        codeStates['setoverall_groupae38a'] = setoverall_groupae38aProps,
        codeStates['position_information_group'] = position_information_group5335b,
        codeStates['setposition_information_group'] = setposition_information_group5335b,
        codeStates['position_information_group5335b'] = position_information_group5335bProps,
        codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['staffing_compensation_text'] = staffing_compensation_text8d8fc,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text8d8fc,
        codeStates['salary_range_min'] = salary_range_min6aa6e,
        codeStates['setsalary_range_min'] = setsalary_range_min6aa6e,
        codeStates['salary_range_max'] = salary_range_maxebe1d,
        codeStates['setsalary_range_max'] = setsalary_range_maxebe1d,
        codeStates['headcount'] = headcount5aefa,
        codeStates['setheadcount'] = setheadcount5aefa,
        codeStates['approved_headcount'] = approved_headcount42f81,
        codeStates['setapproved_headcount'] = setapproved_headcount42f81,
        codeStates['filled_headcount'] = filled_headcount049fc,
        codeStates['setfilled_headcount'] = setfilled_headcount049fc,
        codeStates['vacancy_status'] = vacancy_status989f7,
        codeStates['setvacancy_status'] = setvacancy_status989f7,
        codeStates['remote_allowed'] = remote_allowed76541,
        codeStates['setremote_allowed'] = setremote_allowed76541,
        codeStates['travel_required'] = travel_requiredfe60a,
        codeStates['settravel_required'] = settravel_requiredfe60a,
        codeStates['is_open'] = is_open18094,
        codeStates['setis_open'] = setis_open18094,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
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
      if(compensation_benfits_groupb46e6?.salary_range_min == "" || compensation_benfits_groupb46e6?.salary_range_min == undefined){
      compensation_benfits_groupb46e6.salary_range_min = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupb46e6?.salary_range_min);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:"invalid"}}));
        }
    }else if(compensation_benfits_groupb46e6?.salary_range_min !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_groupb46e6?.salary_range_min);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupb46e6?.salary_range_min);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(compensation_benfits_groupb46e6?.salary_range_min == "" || compensation_benfits_groupb46e6?.salary_range_min == undefined){
      compensation_benfits_groupb46e6.salary_range_min = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupb46e6?.salary_range_min);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:"invalid"}}));
        }
    }else if(compensation_benfits_groupb46e6?.salary_range_min !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_groupb46e6?.salary_range_min);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupb46e6?.salary_range_min);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,salary_range_min:undefined}}));
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
        "f1469b256669687453aa33ae83eb46e6",
        "7cd55bb316afc5d4e386a7fd0c16aa6e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobPosition:AFVK:v1",
      //     componentId: "f1469b256669687453aa33ae83eb46e6",
      //     controlId: "7cd55bb316afc5d4e386a7fd0c16aa6e",
      //     isTable: false,
      //     from:"TextInputsalary_range_min",
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
        setDynamicStateandType({name:'salary_range_min', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'salary_range_min',type:'text'};
      //   type={
      //     name:'salary_range_min',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.salary_range_min.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.salary_range_min.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.salary_range_min.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'salary_range_min',type:'text'};
      //   type={
      //     name:'salary_range_min',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.salary_range_min.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.salary_range_min.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.salary_range_min.type
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
  const compensation_benfits_groupb46e6Ref = useRef<any>(compensation_benfits_groupb46e6);
  useEffect(() => { compensation_benfits_groupb46e6Ref.current = compensation_benfits_groupb46e6; }, [compensation_benfits_groupb46e6]);
  useEffect(()=>{
      handleMapperValue();
      if(!compensation_benfits_groupb46e6?.salary_range_min)
      {
        setcompensation_benfits_groupb46e6Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "7cd55bb316afc5d4e386a7fd0c16aa6e") {
        handleChange({target:{value:compensation_benfits_groupb46e6Ref?.current?.salary_range_min||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "7cd55bb316afc5d4e386a7fd0c16aa6e") {
        handleBlur({target:{value:compensation_benfits_groupb46e6Ref?.current?.salary_range_min||""}});
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
      setcompensation_benfits_groupb46e6((pre:any)=>({...pre,salary_range_min:dfd_jobpositions_v1Props.data[0]?.salary_range_min}));
    }
  }
  },[dfd_jobpositions_v1Props?.setSearchFilters])
  if (salary_range_min6aa6e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 7`,gridRow: `9 / 23`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={compensation_benfits_groupb46e6?.salary_range_min||""}
         disabled= {salary_range_min6aa6e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Minimum Salary"
      errorMessage={error}
        validationState={validate?.addEmployeeJobPosition_v1?.salary_range_min ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputsalary_range_min
