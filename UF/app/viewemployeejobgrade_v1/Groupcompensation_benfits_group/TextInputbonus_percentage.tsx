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
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobGrade:AFVK:v1|ff5ef8668484fc5fdc076b33084a044d|0b74c7f3307aad710154dc22df5c00a0"
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
  const {overall_group926e0, setoverall_group926e0}= useContext(TotalContext) as TotalContextProps;
  const {overall_group926e0Props, setoverall_group926e0Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8, setgrade_information_group162a8}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8Props, setgrade_information_group162a8Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044d, setcompensation_benfits_groupa044d}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044dProps, setcompensation_benfits_groupa044dProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text0f4bd, setcategory_configuration_text0f4bd}= useContext(TotalContext) as TotalContextProps;
  const {min_salary22457, setmin_salary22457}= useContext(TotalContext) as TotalContextProps;
  const {max_salary4199f, setmax_salary4199f}= useContext(TotalContext) as TotalContextProps;
  const {currencyd61f7, setcurrencyd61f7}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentagec00a0, setbonus_percentagec00a0}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible28dff, setpromotion_eligible28dff}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligiblee49e9, setovertime_eligiblee49e9}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79, sethr_policies_groupa0e79}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79Props, sethr_policies_groupa0e79Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompensation_benfits_groupa044d((prev: any) => ({ ...prev, bonus_percentage: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcompensation_benfits_groupa044d((prev: any) => ({ ...prev, bonus_percentage: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group926e0,
        codeStates['setoverall_group'] = setoverall_group926e0,
        codeStates['overall_group926e0'] = overall_group926e0Props,
        codeStates['setoverall_group926e0'] = setoverall_group926e0Props,
        codeStates['grade_information_group'] = grade_information_group162a8,
        codeStates['setgrade_information_group'] = setgrade_information_group162a8,
        codeStates['grade_information_group162a8'] = grade_information_group162a8Props,
        codeStates['setgrade_information_group162a8'] = setgrade_information_group162a8Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupa044d,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupa044d,
        codeStates['compensation_benfits_groupa044d'] = compensation_benfits_groupa044dProps,
        codeStates['setcompensation_benfits_groupa044d'] = setcompensation_benfits_groupa044dProps,
        codeStates['category_configuration_text'] = category_configuration_text0f4bd,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text0f4bd,
        codeStates['min_salary'] = min_salary22457,
        codeStates['setmin_salary'] = setmin_salary22457,
        codeStates['max_salary'] = max_salary4199f,
        codeStates['setmax_salary'] = setmax_salary4199f,
        codeStates['currency'] = currencyd61f7,
        codeStates['setcurrency'] = setcurrencyd61f7,
        codeStates['bonus_percentage'] = bonus_percentagec00a0,
        codeStates['setbonus_percentage'] = setbonus_percentagec00a0,
        codeStates['promotion_eligible'] = promotion_eligible28dff,
        codeStates['setpromotion_eligible'] = setpromotion_eligible28dff,
        codeStates['overtime_eligible'] = overtime_eligiblee49e9,
        codeStates['setovertime_eligible'] = setovertime_eligiblee49e9,
        codeStates['hr_policies_group'] = hr_policies_groupa0e79,
        codeStates['sethr_policies_group'] = sethr_policies_groupa0e79,
        codeStates['hr_policies_groupa0e79'] = hr_policies_groupa0e79Props,
        codeStates['sethr_policies_groupa0e79'] = sethr_policies_groupa0e79Props,
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
      if(compensation_benfits_groupa044d?.bonus_percentage == "" || compensation_benfits_groupa044d?.bonus_percentage == undefined){
      compensation_benfits_groupa044d.bonus_percentage = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupa044d?.bonus_percentage);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
        }
    }else if(compensation_benfits_groupa044d?.bonus_percentage !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_groupa044d?.bonus_percentage);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupa044d?.bonus_percentage);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(compensation_benfits_groupa044d?.bonus_percentage == "" || compensation_benfits_groupa044d?.bonus_percentage == undefined){
      compensation_benfits_groupa044d.bonus_percentage = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupa044d?.bonus_percentage);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
        }
    }else if(compensation_benfits_groupa044d?.bonus_percentage !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +compensation_benfits_groupa044d?.bonus_percentage);
        }
        else{
          validate = v.safeParse(schema, compensation_benfits_groupa044d?.bonus_percentage);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,bonus_percentage:undefined}}));
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
        "ff5ef8668484fc5fdc076b33084a044d",
        "0b74c7f3307aad710154dc22df5c00a0"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobGrade:AFVK:v1",
      //     componentId: "ff5ef8668484fc5fdc076b33084a044d",
      //     controlId: "0b74c7f3307aad710154dc22df5c00a0",
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
  const compensation_benfits_groupa044dRef = useRef<any>(compensation_benfits_groupa044d);
  useEffect(() => { compensation_benfits_groupa044dRef.current = compensation_benfits_groupa044d; }, [compensation_benfits_groupa044d]);
  useEffect(()=>{
      handleMapperValue();
      if(!compensation_benfits_groupa044d?.bonus_percentage)
      {
        setcompensation_benfits_groupa044dProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0b74c7f3307aad710154dc22df5c00a0") {
        handleChange({target:{value:compensation_benfits_groupa044dRef?.current?.bonus_percentage||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0b74c7f3307aad710154dc22df5c00a0") {
        handleBlur({target:{value:compensation_benfits_groupa044dRef?.current?.bonus_percentage||""}});
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
      setcompensation_benfits_groupa044d((pre:any)=>({...pre,bonus_percentage:dfd_jobgrade_v1Props.data[0]?.bonus_percentage}));
    }
  }
  },[dfd_jobgrade_v1Props?.setSearchFilters])
  if (bonus_percentagec00a0?.isHidden) {
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
        value={compensation_benfits_groupa044d?.bonus_percentage||""}
         disabled= {bonus_percentagec00a0?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Bonus Percentage"
      errorMessage={error}
        validationState={validate?.viewEmployeeJobGrade_v1?.bonus_percentage ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputbonus_percentage
