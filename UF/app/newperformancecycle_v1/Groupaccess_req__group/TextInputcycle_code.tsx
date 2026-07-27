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

const TextInputcycle_code = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceCycleModify:AFVK:v1|027910746c6343f7b637e85490c0c120|properties.cycle_code"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceCycle:AFVK:v1|071c2ad6b391e5265316b0c6f2dbdb89|bca9be02559640c32daa4de5b5ea33a6"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceCycleModify:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addperformancecyclemodify_v1Props, setdfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cycle_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf5851a, setbasic_inf5851a}= useContext(TotalContext) as TotalContextProps;
  const {cycle_codea33a6, setcycle_codea33a6}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namee6684, setcycle_namee6684}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type8f307, setcycle_type8f307}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__groupbdb89((prev: any) => ({ ...prev, cycle_code: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setaccess_req__groupbdb89((prev: any) => ({ ...prev, cycle_code: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['basic_inf'] = basic_inf5851a,
        codeStates['setbasic_inf'] = setbasic_inf5851a,
        codeStates['cycle_code'] = cycle_codea33a6,
        codeStates['setcycle_code'] = setcycle_codea33a6,
        codeStates['cycle_name'] = cycle_namee6684,
        codeStates['setcycle_name'] = setcycle_namee6684,
        codeStates['cycle_type'] = cycle_type8f307,
        codeStates['setcycle_type'] = setcycle_type8f307,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
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
      if(access_req__groupbdb89?.cycle_code == "" || access_req__groupbdb89?.cycle_code == undefined){
      access_req__groupbdb89.cycle_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__groupbdb89?.cycle_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:"invalid"}}));
        }
    }else if(access_req__groupbdb89?.cycle_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__groupbdb89?.cycle_code);
        }
        else{
          validate = v.safeParse(schema, access_req__groupbdb89?.cycle_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(access_req__groupbdb89?.cycle_code == "" || access_req__groupbdb89?.cycle_code == undefined){
      access_req__groupbdb89.cycle_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__groupbdb89?.cycle_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:"invalid"}}));
        }
    }else if(access_req__groupbdb89?.cycle_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__groupbdb89?.cycle_code);
        }
        else{
          validate = v.safeParse(schema, access_req__groupbdb89?.cycle_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_code:undefined}}));
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
        "071c2ad6b391e5265316b0c6f2dbdb89",
        "bca9be02559640c32daa4de5b5ea33a6"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceCycle:AFVK:v1",
      //     componentId: "071c2ad6b391e5265316b0c6f2dbdb89",
      //     controlId: "bca9be02559640c32daa4de5b5ea33a6",
      //     isTable: false,
      //     from:"TextInputcycle_code",
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
        setDynamicStateandType({name:'cycle_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cycle_code',type:'text'};
      //   type={
      //     name:'cycle_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cycle_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cycle_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cycle_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cycle_code',type:'text'};
      //   type={
      //     name:'cycle_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cycle_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cycle_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cycle_code.type
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
  const access_req__groupbdb89Ref = useRef<any>(access_req__groupbdb89);
  useEffect(() => { access_req__groupbdb89Ref.current = access_req__groupbdb89; }, [access_req__groupbdb89]);
  useEffect(()=>{
      handleMapperValue();
      if(!access_req__groupbdb89?.cycle_code)
      {
        setaccess_req__groupbdb89Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "bca9be02559640c32daa4de5b5ea33a6") {
        handleChange({target:{value:access_req__groupbdb89Ref?.current?.cycle_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "bca9be02559640c32daa4de5b5ea33a6") {
        handleBlur({target:{value:access_req__groupbdb89Ref?.current?.cycle_code||""}});
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
  if(dfd_addperformancecyclemodify_v1Props?.setSearchFilters && dfd_addperformancecyclemodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addperformancecyclemodify_v1Props.data) && dfd_addperformancecyclemodify_v1Props.data.length > 0){
      setaccess_req__groupbdb89((pre:any)=>({...pre,cycle_code:dfd_addperformancecyclemodify_v1Props.data[0]?.cycle_code}));
    }
  }
  },[dfd_addperformancecyclemodify_v1Props?.setSearchFilters])
  if (cycle_codea33a6?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={access_req__groupbdb89?.cycle_code||""}
         disabled= {cycle_codea33a6?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Cycle Code"
      errorMessage={error}
        validationState={validate?.newPerformanceCycle_v1?.cycle_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcycle_code
