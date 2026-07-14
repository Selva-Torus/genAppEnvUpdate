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

const TextInputtextinput2 = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
      "ttl": "",
      "name": "",
      "lockMode": ""
    },
    "events": {},
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "stateTransition": {
      "sourceQueue": "",
      "targetQueue": "",
      "sourceStatus": "",
      "targetStatus": ""
    }
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'textinput2',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group7f2ed, setgroup7f2ed}= useContext(TotalContext) as TotalContextProps;
  const {group7f2edProps, setgroup7f2edProps}= useContext(TotalContext) as TotalContextProps;
  const {textinputd0435, settextinputd0435}= useContext(TotalContext) as TotalContextProps;
  const {textinput5daae3, settextinput5daae3}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimec481e, setdateandtimec481e}= useContext(TotalContext) as TotalContextProps;
  const {datepicker019ca, setdatepicker019ca}= useContext(TotalContext) as TotalContextProps;
  const {textinput165d1d, settextinput165d1d}= useContext(TotalContext) as TotalContextProps;
  const {textinput204f11, settextinput204f11}= useContext(TotalContext) as TotalContextProps;
  const {textinput38ac83, settextinput38ac83}= useContext(TotalContext) as TotalContextProps;
  const {textinput455cca, settextinput455cca}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [
  "v.string()",
  "v.regex(/^[A-Za-z\\s]+$/, 'Only letters and spaces are allowed.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.regex(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed.'),
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
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup7f2ed((prev: any) => ({ ...prev, textinput2: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setgroup7f2ed((prev: any) => ({ ...prev, textinput2: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7f2ed,
        codeStates['setgroup'] = setgroup7f2ed,
        codeStates['group7f2ed'] = group7f2edProps,
        codeStates['setgroup7f2ed'] = setgroup7f2edProps,
        codeStates['textinput'] = textinputd0435,
        codeStates['settextinput'] = settextinputd0435,
        codeStates['textinput5'] = textinput5daae3,
        codeStates['settextinput5'] = settextinput5daae3,
        codeStates['dateandtime'] = dateandtimec481e,
        codeStates['setdateandtime'] = setdateandtimec481e,
        codeStates['datepicker'] = datepicker019ca,
        codeStates['setdatepicker'] = setdatepicker019ca,
        codeStates['textinput1'] = textinput165d1d,
        codeStates['settextinput1'] = settextinput165d1d,
        codeStates['textinput2'] = textinput204f11,
        codeStates['settextinput2'] = settextinput204f11,
        codeStates['textinput3'] = textinput38ac83,
        codeStates['settextinput3'] = settextinput38ac83,
        codeStates['textinput4'] = textinput455cca,
        codeStates['settextinput4'] = settextinput455cca,
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
      if(group7f2ed?.textinput2 == "" || group7f2ed?.textinput2 == undefined){
          setError('');
          setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:undefined}}));
    }else if(group7f2ed?.textinput2 !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +group7f2ed?.textinput2);
        }
        else{
          validate = v.safeParse(schema, group7f2ed?.textinput2);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(group7f2ed?.textinput2 == "" || group7f2ed?.textinput2 == undefined){
          setError('');
          setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:undefined}}));
    }else if(group7f2ed?.textinput2 !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +group7f2ed?.textinput2);
        }
        else{
          validate = v.safeParse(schema, group7f2ed?.textinput2);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput2:undefined}}));
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
        "aaa21094dc8b49d0be2621f7ea87f2ed",
        "b52994ba91c242a29beb0a0ef5604f11"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:ffff:AFVK:v1",
      //     componentId: "aaa21094dc8b49d0be2621f7ea87f2ed",
      //     controlId: "b52994ba91c242a29beb0a0ef5604f11",
      //     isTable: false,
      //     from:"TextInputtextinput2",
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
        setDynamicStateandType({name:'textinput2', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'textinput2',type:'text'};
      //   type={
      //     name:'textinput2',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput2.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput2.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput2.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'textinput2',type:'text'};
      //   type={
      //     name:'textinput2',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput2.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput2.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput2.type
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
  const group7f2edRef = useRef<any>(group7f2ed);
  useEffect(() => { group7f2edRef.current = group7f2ed; }, [group7f2ed]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b52994ba91c242a29beb0a0ef5604f11") {
        handleChange({target:{value:group7f2edRef?.current?.textinput2||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b52994ba91c242a29beb0a0ef5604f11") {
        handleBlur({target:{value:group7f2edRef?.current?.textinput2||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (textinput204f11?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 5`,gridRow: `47 / 64`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={group7f2ed?.textinput2||""}
         disabled= {textinput204f11?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.ffff_v1?.textinput2 ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput2
