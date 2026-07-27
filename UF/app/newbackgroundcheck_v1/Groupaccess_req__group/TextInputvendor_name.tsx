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

const TextInputvendor_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addBackgroundCheckModify:AFVK:v1|0360d19ce049ee6d026d06b6e2f7f1bb|properties.vendor_name"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1|aa63cc980d8a062328ccc4745cadd45d|d6c62c803ff6d54798d5fd2f3c9e351e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addBackgroundCheckModify:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addbackgroundcheckmodify_v1Props, setdfd_addbackgroundcheckmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'vendor_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group03ace, setnew_access_group03ace}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group03aceProps, setnew_access_group03aceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45d, setaccess_req__groupdd45d}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45dProps, setaccess_req__groupdd45dProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf3b506, setbasic_inf3b506}= useContext(TotalContext) as TotalContextProps;
  const {full_name8ae05, setfull_name8ae05}= useContext(TotalContext) as TotalContextProps;
  const {check_typef3ff8, setcheck_typef3ff8}= useContext(TotalContext) as TotalContextProps;
  const {vendor_namee351e, setvendor_namee351e}= useContext(TotalContext) as TotalContextProps;
  const {initiated_datececee, setinitiated_datececee}= useContext(TotalContext) as TotalContextProps;
  const {completed_date8c01c, setcompleted_date8c01c}= useContext(TotalContext) as TotalContextProps;
  const {result1c616, setresult1c616}= useContext(TotalContext) as TotalContextProps;
  const {verification_status6e272, setverification_status6e272}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865, setaddt__dts_group0d865}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865Props, setaddt__dts_group0d865Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,vendor_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__groupdd45d((prev: any) => ({ ...prev, vendor_name: +e.target.value }));
    }
    else{
    setaccess_req__groupdd45d((prev: any) => ({ ...prev, vendor_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group03ace,
        codeStates['setnew_access_group'] = setnew_access_group03ace,
        codeStates['new_access_group03ace'] = new_access_group03aceProps,
        codeStates['setnew_access_group03ace'] = setnew_access_group03aceProps,
        codeStates['access_req__group'] = access_req__groupdd45d,
        codeStates['setaccess_req__group'] = setaccess_req__groupdd45d,
        codeStates['access_req__groupdd45d'] = access_req__groupdd45dProps,
        codeStates['setaccess_req__groupdd45d'] = setaccess_req__groupdd45dProps,
        codeStates['basic_inf'] = basic_inf3b506,
        codeStates['setbasic_inf'] = setbasic_inf3b506,
        codeStates['full_name'] = full_name8ae05,
        codeStates['setfull_name'] = setfull_name8ae05,
        codeStates['check_type'] = check_typef3ff8,
        codeStates['setcheck_type'] = setcheck_typef3ff8,
        codeStates['vendor_name'] = vendor_namee351e,
        codeStates['setvendor_name'] = setvendor_namee351e,
        codeStates['initiated_date'] = initiated_datececee,
        codeStates['setinitiated_date'] = setinitiated_datececee,
        codeStates['completed_date'] = completed_date8c01c,
        codeStates['setcompleted_date'] = setcompleted_date8c01c,
        codeStates['result'] = result1c616,
        codeStates['setresult'] = setresult1c616,
        codeStates['verification_status'] = verification_status6e272,
        codeStates['setverification_status'] = setverification_status6e272,
        codeStates['addt__dts_group'] = addt__dts_group0d865,
        codeStates['setaddt__dts_group'] = setaddt__dts_group0d865,
        codeStates['addt__dts_group0d865'] = addt__dts_group0d865Props,
        codeStates['setaddt__dts_group0d865'] = setaddt__dts_group0d865Props,
        codeStates['dynamicactions'] = dynamicactions2fc7f,
        codeStates['setdynamicactions'] = setdynamicactions2fc7f,
        codeStates['dynamicactions2fc7f'] = dynamicactions2fc7fProps,
        codeStates['setdynamicactions2fc7f'] = setdynamicactions2fc7fProps,
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
        "aa63cc980d8a062328ccc4745cadd45d",
        "d6c62c803ff6d54798d5fd2f3c9e351e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newBackgroundCheck:AFVK:v1",
      //     componentId: "aa63cc980d8a062328ccc4745cadd45d",
      //     controlId: "d6c62c803ff6d54798d5fd2f3c9e351e",
      //     isTable: false,
      //     from:"TextInputvendor_name",
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
        setDynamicStateandType({name:'vendor_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'vendor_name',type:'text'};
      //   type={
      //     name:'vendor_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vendor_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vendor_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.vendor_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'vendor_name',type:'text'};
      //   type={
      //     name:'vendor_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vendor_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vendor_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.vendor_name.type
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
  const access_req__groupdd45dRef = useRef<any>(access_req__groupdd45d);
  useEffect(() => { access_req__groupdd45dRef.current = access_req__groupdd45d; }, [access_req__groupdd45d]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d6c62c803ff6d54798d5fd2f3c9e351e") {
        handleChange({target:{value:access_req__groupdd45dRef?.current?.vendor_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d6c62c803ff6d54798d5fd2f3c9e351e") {
        handleBlur({target:{value:access_req__groupdd45dRef?.current?.vendor_name||""}});
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
  if(dfd_addbackgroundcheckmodify_v1Props?.setSearchFilters && dfd_addbackgroundcheckmodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addbackgroundcheckmodify_v1Props.data) && dfd_addbackgroundcheckmodify_v1Props.data.length > 0){
      setaccess_req__groupdd45d((pre:any)=>({...pre,vendor_name:dfd_addbackgroundcheckmodify_v1Props.data[0]?.vendor_name}));
    }
  }
  },[dfd_addbackgroundcheckmodify_v1Props?.setSearchFilters])
  if (vendor_namee351e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 19`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={access_req__groupdd45d?.vendor_name||""}
         disabled= {vendor_namee351e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Vendor Name"
      errorMessage={error}
        validationState={validate?.newBackgroundCheck_v1?.vendor_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputvendor_name
