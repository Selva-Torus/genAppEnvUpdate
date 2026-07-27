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

const TextInputposition_title = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.position_title"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobPosition:AFVK:v1|b2c06e29b62cff17bf1e2725d255335b|b29e13935f3a92fd63fb8e6e367da529"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'position_title',type:"text"})
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
  const {posiiton_information_texta2b56, setposiiton_information_texta2b56}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4553, setposition_codea4553}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda529, setposition_titleda529}= useContext(TotalContext) as TotalContextProps;
  const {description9d446, setdescription9d446}= useContext(TotalContext) as TotalContextProps;
  const {grade_namee4856, setgrade_namee4856}= useContext(TotalContext) as TotalContextProps;
  const {employment_type9bb76, setemployment_type9bb76}= useContext(TotalContext) as TotalContextProps;
  const {experience_required6a911, setexperience_required6a911}= useContext(TotalContext) as TotalContextProps;
  const {job_family4c9f2, setjob_family4c9f2}= useContext(TotalContext) as TotalContextProps;
  const {job_level77c64, setjob_level77c64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:undefined}}));
    if(dynamicStateandType.type=="number"){
    setposition_information_group5335b((prev: any) => ({ ...prev, position_title: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setposition_information_group5335b((prev: any) => ({ ...prev, position_title: e.target.value }));
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
        codeStates['posiiton_information_text'] = posiiton_information_texta2b56,
        codeStates['setposiiton_information_text'] = setposiiton_information_texta2b56,
        codeStates['position_code'] = position_codea4553,
        codeStates['setposition_code'] = setposition_codea4553,
        codeStates['position_title'] = position_titleda529,
        codeStates['setposition_title'] = setposition_titleda529,
        codeStates['description'] = description9d446,
        codeStates['setdescription'] = setdescription9d446,
        codeStates['grade_name'] = grade_namee4856,
        codeStates['setgrade_name'] = setgrade_namee4856,
        codeStates['employment_type'] = employment_type9bb76,
        codeStates['setemployment_type'] = setemployment_type9bb76,
        codeStates['experience_required'] = experience_required6a911,
        codeStates['setexperience_required'] = setexperience_required6a911,
        codeStates['job_family'] = job_family4c9f2,
        codeStates['setjob_family'] = setjob_family4c9f2,
        codeStates['job_level'] = job_level77c64,
        codeStates['setjob_level'] = setjob_level77c64,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
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
      if(position_information_group5335b?.position_title == "" || position_information_group5335b?.position_title == undefined){
      position_information_group5335b.position_title = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, position_information_group5335b?.position_title);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:"invalid"}}));
        }
    }else if(position_information_group5335b?.position_title !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +position_information_group5335b?.position_title);
        }
        else{
          validate = v.safeParse(schema, position_information_group5335b?.position_title);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(position_information_group5335b?.position_title == "" || position_information_group5335b?.position_title == undefined){
      position_information_group5335b.position_title = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, position_information_group5335b?.position_title);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:"invalid"}}));
        }
    }else if(position_information_group5335b?.position_title !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +position_information_group5335b?.position_title);
        }
        else{
          validate = v.safeParse(schema, position_information_group5335b?.position_title);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,position_title:undefined}}));
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
        "b2c06e29b62cff17bf1e2725d255335b",
        "b29e13935f3a92fd63fb8e6e367da529"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobPosition:AFVK:v1",
      //     componentId: "b2c06e29b62cff17bf1e2725d255335b",
      //     controlId: "b29e13935f3a92fd63fb8e6e367da529",
      //     isTable: false,
      //     from:"TextInputposition_title",
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
        setDynamicStateandType({name:'position_title', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'position_title',type:'text'};
      //   type={
      //     name:'position_title',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_title.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_title.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.position_title.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'position_title',type:'text'};
      //   type={
      //     name:'position_title',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_title.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_title.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.position_title.type
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
  const position_information_group5335bRef = useRef<any>(position_information_group5335b);
  useEffect(() => { position_information_group5335bRef.current = position_information_group5335b; }, [position_information_group5335b]);
  useEffect(()=>{
      handleMapperValue();
      if(!position_information_group5335b?.position_title)
      {
        setposition_information_group5335bProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b29e13935f3a92fd63fb8e6e367da529") {
        handleChange({target:{value:position_information_group5335bRef?.current?.position_title||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b29e13935f3a92fd63fb8e6e367da529") {
        handleBlur({target:{value:position_information_group5335bRef?.current?.position_title||""}});
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
      setposition_information_group5335b((pre:any)=>({...pre,position_title:dfd_jobpositions_v1Props.data[0]?.position_title}));
    }
  }
  },[dfd_jobpositions_v1Props?.setSearchFilters])
  if (position_titleda529?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `7 / 13`,gridRow: `8 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={position_information_group5335b?.position_title||""}
         disabled= {position_titleda529?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Position Title"
      errorMessage={error}
        validationState={validate?.addEmployeeJobPosition_v1?.position_title ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputposition_title
