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

const TextInputposition_code = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.position_code"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1|c7b866caed721de00fbfdfc1f8967802|be602c6a501fd252076e17941bba8a48"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'position_code',type:"text"})
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
  const {posiiton_information_text98456, setposiiton_information_text98456}= useContext(TotalContext) as TotalContextProps;
  const {position_codea8a48, setposition_codea8a48}= useContext(TotalContext) as TotalContextProps;
  const {position_title6e1ab, setposition_title6e1ab}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf7b05, setdescriptionf7b05}= useContext(TotalContext) as TotalContextProps;
  const {grade_name11b6f, setgrade_name11b6f}= useContext(TotalContext) as TotalContextProps;
  const {employment_type77cb7, setemployment_type77cb7}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredd886e, setexperience_requiredd886e}= useContext(TotalContext) as TotalContextProps;
  const {job_familyebc1e, setjob_familyebc1e}= useContext(TotalContext) as TotalContextProps;
  const {job_level44b70, setjob_level44b70}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setposition_information_group67802((prev: any) => ({ ...prev, position_code: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setposition_information_group67802((prev: any) => ({ ...prev, position_code: e.target.value }));
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
        codeStates['posiiton_information_text'] = posiiton_information_text98456,
        codeStates['setposiiton_information_text'] = setposiiton_information_text98456,
        codeStates['position_code'] = position_codea8a48,
        codeStates['setposition_code'] = setposition_codea8a48,
        codeStates['position_title'] = position_title6e1ab,
        codeStates['setposition_title'] = setposition_title6e1ab,
        codeStates['description'] = descriptionf7b05,
        codeStates['setdescription'] = setdescriptionf7b05,
        codeStates['grade_name'] = grade_name11b6f,
        codeStates['setgrade_name'] = setgrade_name11b6f,
        codeStates['employment_type'] = employment_type77cb7,
        codeStates['setemployment_type'] = setemployment_type77cb7,
        codeStates['experience_required'] = experience_requiredd886e,
        codeStates['setexperience_required'] = setexperience_requiredd886e,
        codeStates['job_family'] = job_familyebc1e,
        codeStates['setjob_family'] = setjob_familyebc1e,
        codeStates['job_level'] = job_level44b70,
        codeStates['setjob_level'] = setjob_level44b70,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
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
      if(position_information_group67802?.position_code == "" || position_information_group67802?.position_code == undefined){
      position_information_group67802.position_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, position_information_group67802?.position_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:"invalid"}}));
        }
    }else if(position_information_group67802?.position_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +position_information_group67802?.position_code);
        }
        else{
          validate = v.safeParse(schema, position_information_group67802?.position_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(position_information_group67802?.position_code == "" || position_information_group67802?.position_code == undefined){
      position_information_group67802.position_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, position_information_group67802?.position_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:"invalid"}}));
        }
    }else if(position_information_group67802?.position_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +position_information_group67802?.position_code);
        }
        else{
          validate = v.safeParse(schema, position_information_group67802?.position_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,position_code:undefined}}));
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
        "c7b866caed721de00fbfdfc1f8967802",
        "be602c6a501fd252076e17941bba8a48"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1",
      //     componentId: "c7b866caed721de00fbfdfc1f8967802",
      //     controlId: "be602c6a501fd252076e17941bba8a48",
      //     isTable: false,
      //     from:"TextInputposition_code",
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
        setDynamicStateandType({name:'position_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'position_code',type:'text'};
      //   type={
      //     name:'position_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'position_code',type:'text'};
      //   type={
      //     name:'position_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_code.type
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
  const position_information_group67802Ref = useRef<any>(position_information_group67802);
  useEffect(() => { position_information_group67802Ref.current = position_information_group67802; }, [position_information_group67802]);
  useEffect(()=>{
      handleMapperValue();
      if(!position_information_group67802?.position_code)
      {
        setposition_information_group67802Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "be602c6a501fd252076e17941bba8a48") {
        handleChange({target:{value:position_information_group67802Ref?.current?.position_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "be602c6a501fd252076e17941bba8a48") {
        handleBlur({target:{value:position_information_group67802Ref?.current?.position_code||""}});
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
      setposition_information_group67802((pre:any)=>({...pre,position_code:dfd_jobpositions_v1Props.data[0]?.position_code}));
    }
  }
  },[dfd_jobpositions_v1Props?.setSearchFilters])
  if (position_codea8a48?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 7`,gridRow: `8 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={position_information_group67802?.position_code||""}
         disabled= {position_codea8a48?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Position Code"
      errorMessage={error}
        validationState={validate?.viewEmployeeJobPosition_v1?.position_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputposition_code
