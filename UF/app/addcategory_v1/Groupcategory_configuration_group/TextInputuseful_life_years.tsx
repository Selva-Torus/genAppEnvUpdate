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

const TextInputuseful_life_years = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.useful_life_years"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addCategory:AFVK:v1|23848463037e4b339a4fde469965d6af|fd6f943abd0842c99772da38570231a3"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'useful_life_years',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {category_groupe3ebd, setcategory_groupe3ebd}= useContext(TotalContext) as TotalContextProps;
  const {category_groupe3ebdProps, setcategory_groupe3ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68a, setcategory_information_groupfb68a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68aProps, setcategory_information_groupfb68aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6af, setcategory_configuration_group5d6af}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6afProps, setcategory_configuration_group5d6afProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text00171, setcategory_configuration_text00171}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_methodfa7cb, setdepreciation_methodfa7cb}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years231a3, setuseful_life_years231a3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884, setdynamicactions13884}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884Props, setdynamicactions13884Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,useful_life_years:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcategory_configuration_group5d6af((prev: any) => ({ ...prev, useful_life_years: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcategory_configuration_group5d6af((prev: any) => ({ ...prev, useful_life_years: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['category_group'] = category_groupe3ebd,
        codeStates['setcategory_group'] = setcategory_groupe3ebd,
        codeStates['category_groupe3ebd'] = category_groupe3ebdProps,
        codeStates['setcategory_groupe3ebd'] = setcategory_groupe3ebdProps,
        codeStates['category_information_group'] = category_information_groupfb68a,
        codeStates['setcategory_information_group'] = setcategory_information_groupfb68a,
        codeStates['category_information_groupfb68a'] = category_information_groupfb68aProps,
        codeStates['setcategory_information_groupfb68a'] = setcategory_information_groupfb68aProps,
        codeStates['category_configuration_group'] = category_configuration_group5d6af,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group5d6af,
        codeStates['category_configuration_group5d6af'] = category_configuration_group5d6afProps,
        codeStates['setcategory_configuration_group5d6af'] = setcategory_configuration_group5d6afProps,
        codeStates['category_configuration_text'] = category_configuration_text00171,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text00171,
        codeStates['depreciation_method'] = depreciation_methodfa7cb,
        codeStates['setdepreciation_method'] = setdepreciation_methodfa7cb,
        codeStates['useful_life_years'] = useful_life_years231a3,
        codeStates['setuseful_life_years'] = setuseful_life_years231a3,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,
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
      if(category_configuration_group5d6af?.useful_life_years == "" || category_configuration_group5d6af?.useful_life_years == undefined){
      category_configuration_group5d6af.useful_life_years = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, category_configuration_group5d6af?.useful_life_years);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,useful_life_years:"invalid"}}));
        }
    }else if(category_configuration_group5d6af?.useful_life_years !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +category_configuration_group5d6af?.useful_life_years);
        }
        else{
          validate = v.safeParse(schema, category_configuration_group5d6af?.useful_life_years);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,useful_life_years:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,useful_life_years:undefined}}));
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
        "23848463037e4b339a4fde469965d6af",
        "fd6f943abd0842c99772da38570231a3"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addCategory:AFVK:v1",
      //     componentId: "23848463037e4b339a4fde469965d6af",
      //     controlId: "fd6f943abd0842c99772da38570231a3",
      //     isTable: false,
      //     from:"TextInputuseful_life_years",
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
        setDynamicStateandType({name:'useful_life_years', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'useful_life_years',type:'text'};
      //   type={
      //     name:'useful_life_years',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.useful_life_years.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.useful_life_years.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.useful_life_years.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'useful_life_years',type:'text'};
      //   type={
      //     name:'useful_life_years',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.useful_life_years.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.useful_life_years.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.useful_life_years.type
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

  const category_configuration_group5d6afRef = useRef<any>(category_configuration_group5d6af);
  useEffect(() => { category_configuration_group5d6afRef.current = category_configuration_group5d6af; }, [category_configuration_group5d6af]);
  useEffect(()=>{
      handleMapperValue();
      if(!category_configuration_group5d6af?.useful_life_years)
      {
        setcategory_configuration_group5d6afProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "fd6f943abd0842c99772da38570231a3") {
        handleChange({target:{value:category_configuration_group5d6afRef?.current?.useful_life_years||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "fd6f943abd0842c99772da38570231a3") {
        handleBlur({target:{value:category_configuration_group5d6afRef?.current?.useful_life_years||""}});
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
  if(dfd_assetcategory_v1Props?.setSearchFilters && dfd_assetcategory_v1Props?.data)
  {
    if(Array.isArray(dfd_assetcategory_v1Props.data) && dfd_assetcategory_v1Props.data.length > 0){
      setcategory_configuration_group5d6af((pre:any)=>({...pre,useful_life_years:dfd_assetcategory_v1Props.data[0]?.useful_life_years}));
    }
  }
  },[dfd_assetcategory_v1Props?.setSearchFilters])
  if (useful_life_years231a3?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={category_configuration_group5d6af?.useful_life_years||""}
         disabled= {useful_life_years231a3?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Useful Life"
      errorMessage={error}
        validationState={validate?.addCategory_v1?.useful_life_years ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputuseful_life_years
