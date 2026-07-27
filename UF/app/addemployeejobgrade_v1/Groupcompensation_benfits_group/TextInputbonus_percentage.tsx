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

const TextInputbonus_percentage = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.bonus_percentage"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobGrade:AFVK:v1|d1c13cefdc89a0d6a6ad217393049b64|a340e43190bf49ad9325c8722adae1ae"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'bonus_percentage',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text97eea, setcategory_configuration_text97eea}= useContext(TotalContext) as TotalContextProps;
  const {min_salary807a5, setmin_salary807a5}= useContext(TotalContext) as TotalContextProps;
  const {max_salarye78c6, setmax_salarye78c6}= useContext(TotalContext) as TotalContextProps;
  const {currencyb8f2e, setcurrencyb8f2e}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentageae1ae, setbonus_percentageae1ae}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible4c314, setpromotion_eligible4c314}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligible66e37, setovertime_eligible66e37}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompensation_benfits_group49b64((prev: any) => ({ ...prev, bonus_percentage: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcompensation_benfits_group49b64((prev: any) => ({ ...prev, bonus_percentage: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['category_configuration_text'] = category_configuration_text97eea,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text97eea,
        codeStates['min_salary'] = min_salary807a5,
        codeStates['setmin_salary'] = setmin_salary807a5,
        codeStates['max_salary'] = max_salarye78c6,
        codeStates['setmax_salary'] = setmax_salarye78c6,
        codeStates['currency'] = currencyb8f2e,
        codeStates['setcurrency'] = setcurrencyb8f2e,
        codeStates['bonus_percentage'] = bonus_percentageae1ae,
        codeStates['setbonus_percentage'] = setbonus_percentageae1ae,
        codeStates['promotion_eligible'] = promotion_eligible4c314,
        codeStates['setpromotion_eligible'] = setpromotion_eligible4c314,
        codeStates['overtime_eligible'] = overtime_eligible66e37,
        codeStates['setovertime_eligible'] = setovertime_eligible66e37,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
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
      if(compensation_benfits_group49b64?.bonus_percentage == "" || compensation_benfits_group49b64?.bonus_percentage == undefined){
      compensation_benfits_group49b64.bonus_percentage = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group49b64?.bonus_percentage);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
        }
    }else if(compensation_benfits_group49b64?.bonus_percentage !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_group49b64?.bonus_percentage);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group49b64?.bonus_percentage);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(compensation_benfits_group49b64?.bonus_percentage == "" || compensation_benfits_group49b64?.bonus_percentage == undefined){
      compensation_benfits_group49b64.bonus_percentage = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group49b64?.bonus_percentage);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
        }
    }else if(compensation_benfits_group49b64?.bonus_percentage !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_group49b64?.bonus_percentage);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_group49b64?.bonus_percentage);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,bonus_percentage:undefined}}));
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
        "d1c13cefdc89a0d6a6ad217393049b64",
        "a340e43190bf49ad9325c8722adae1ae"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobGrade:AFVK:v1",
      //     componentId: "d1c13cefdc89a0d6a6ad217393049b64",
      //     controlId: "a340e43190bf49ad9325c8722adae1ae",
      //     isTable: false,
      //     from:"TextInputbonus_percentage",
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
        setDynamicStateandType({name:'bonus_percentage', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'bonus_percentage',type:'text'};
      //   type={
      //     name:'bonus_percentage',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bonus_percentage.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bonus_percentage.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bonus_percentage.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'bonus_percentage',type:'text'};
      //   type={
      //     name:'bonus_percentage',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bonus_percentage.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bonus_percentage.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bonus_percentage.type
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
  const compensation_benfits_group49b64Ref = useRef<any>(compensation_benfits_group49b64);
  useEffect(() => { compensation_benfits_group49b64Ref.current = compensation_benfits_group49b64; }, [compensation_benfits_group49b64]);
  useEffect(()=>{
      handleMapperValue();
      if(!compensation_benfits_group49b64?.bonus_percentage)
      {
        setcompensation_benfits_group49b64Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "a340e43190bf49ad9325c8722adae1ae") {
        handleChange({target:{value:compensation_benfits_group49b64Ref?.current?.bonus_percentage||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a340e43190bf49ad9325c8722adae1ae") {
        handleBlur({target:{value:compensation_benfits_group49b64Ref?.current?.bonus_percentage||""}});
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
  if(dfd_jobgrade_v1Props?.setSearchFilters && dfd_jobgrade_v1Props?.data)
  {
    if(Array.isArray(dfd_jobgrade_v1Props.data) && dfd_jobgrade_v1Props.data.length > 0){
      setcompensation_benfits_group49b64((pre:any)=>({...pre,bonus_percentage:dfd_jobgrade_v1Props.data[0]?.bonus_percentage}));
    }
  }
  },[dfd_jobgrade_v1Props?.setSearchFilters])
  if (bonus_percentageae1ae?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `19 / 25`,gridRow: `8 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={compensation_benfits_group49b64?.bonus_percentage||""}
         disabled= {bonus_percentageae1ae?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Bonus Percentage"
      errorMessage={error}
        validationState={validate?.addEmployeeJobGrade_v1?.bonus_percentage ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputbonus_percentage
