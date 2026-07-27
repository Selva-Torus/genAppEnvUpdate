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

const TextInputgrade_description = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.grade_description"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobGrade:AFVK:v1|873dabfd41dff5447b4ce1edcd9162a8|15fffc3306ba868b08e617912ff50d4b"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'grade_description',type:"text"})
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
  const {category_information_text3c2c6, setcategory_information_text3c2c6}= useContext(TotalContext) as TotalContextProps;
  const {grade_namef4177, setgrade_namef4177}= useContext(TotalContext) as TotalContextProps;
  const {grade_description50d4b, setgrade_description50d4b}= useContext(TotalContext) as TotalContextProps;
  const {grade_levelae4d7, setgrade_levelae4d7}= useContext(TotalContext) as TotalContextProps;
  const {grade_codeedd22, setgrade_codeedd22}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044d, setcompensation_benfits_groupa044d}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044dProps, setcompensation_benfits_groupa044dProps}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79, sethr_policies_groupa0e79}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79Props, sethr_policies_groupa0e79Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
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
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,viewEmployeeJobGrade_v1:{...pre?.viewEmployeeJobGrade_v1,grade_description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrade_information_group162a8((prev: any) => ({ ...prev, grade_description: +e.target.value }));
    }
    else{
    setgrade_information_group162a8((prev: any) => ({ ...prev, grade_description: e.target.value }));
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
        codeStates['category_information_text'] = category_information_text3c2c6,
        codeStates['setcategory_information_text'] = setcategory_information_text3c2c6,
        codeStates['grade_name'] = grade_namef4177,
        codeStates['setgrade_name'] = setgrade_namef4177,
        codeStates['grade_description'] = grade_description50d4b,
        codeStates['setgrade_description'] = setgrade_description50d4b,
        codeStates['grade_level'] = grade_levelae4d7,
        codeStates['setgrade_level'] = setgrade_levelae4d7,
        codeStates['grade_code'] = grade_codeedd22,
        codeStates['setgrade_code'] = setgrade_codeedd22,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupa044d,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupa044d,
        codeStates['compensation_benfits_groupa044d'] = compensation_benfits_groupa044dProps,
        codeStates['setcompensation_benfits_groupa044d'] = setcompensation_benfits_groupa044dProps,
        codeStates['hr_policies_group'] = hr_policies_groupa0e79,
        codeStates['sethr_policies_group'] = sethr_policies_groupa0e79,
        codeStates['hr_policies_groupa0e79'] = hr_policies_groupa0e79Props,
        codeStates['sethr_policies_groupa0e79'] = sethr_policies_groupa0e79Props,
    codeExecution(code,codeStates);
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
  }
  const handleBlur=async (e?:any) => {
      let validate:any

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
        "873dabfd41dff5447b4ce1edcd9162a8",
        "15fffc3306ba868b08e617912ff50d4b"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobGrade:AFVK:v1",
      //     componentId: "873dabfd41dff5447b4ce1edcd9162a8",
      //     controlId: "15fffc3306ba868b08e617912ff50d4b",
      //     isTable: false,
      //     from:"TextInputgrade_description",
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
        setDynamicStateandType({name:'grade_description', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'grade_description',type:'text'};
      //   type={
      //     name:'grade_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_description.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'grade_description',type:'text'};
      //   type={
      //     name:'grade_description',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_description.type
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
  const grade_information_group162a8Ref = useRef<any>(grade_information_group162a8);
  useEffect(() => { grade_information_group162a8Ref.current = grade_information_group162a8; }, [grade_information_group162a8]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "15fffc3306ba868b08e617912ff50d4b") {
        handleChange({target:{value:grade_information_group162a8Ref?.current?.grade_description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "15fffc3306ba868b08e617912ff50d4b") {
        handleBlur({target:{value:grade_information_group162a8Ref?.current?.grade_description||""}});
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
      setgrade_information_group162a8((pre:any)=>({...pre,grade_description:dfd_jobgrade_v1Props.data[0]?.grade_description}));
    }
  }
  },[dfd_jobgrade_v1Props?.setSearchFilters])
  if (grade_description50d4b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 19`,gridRow: `7 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={grade_information_group162a8?.grade_description||""}
         disabled= {grade_description50d4b?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Grade Description"
      errorMessage={error}
        validationState={validate?.viewEmployeeJobGrade_v1?.grade_description ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputgrade_description
