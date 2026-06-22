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

const TextInputapproval_reference = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1|1d36f55182b042ad946873239ea59ff0|properties.approval_reference"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1|16048a3a05ac4926a046632180f1f9bc|bfd3da3efc96487da98d166ac185e1aa"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'approval_reference',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial664f8, setcompliance_financial664f8}= useContext(TotalContext) as TotalContextProps;
  const {approval_reference5e1aa, setapproval_reference5e1aa}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameac8f7, setwitness_nameac8f7}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodfe1e6, setdata_wipe_methodfe1e6}= useContext(TotalContext) as TotalContextProps;
  const {data_wipedad12b, setdata_wipedad12b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_valued21f4, setdisposal_valued21f4}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost031f6, setdisposal_cost031f6}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount2eb0e, setresale_amount2eb0e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,initiateAssetDisposal_v1:{...pre?.initiateAssetDisposal_v1,approval_reference:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompliance_financial_group1f9bc((prev: any) => ({ ...prev, approval_reference: +e.target.value }));
    }
    else{
    setcompliance_financial_group1f9bc((prev: any) => ({ ...prev, approval_reference: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
        codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
        codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
        codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
        codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
        codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['compliance_financial'] = compliance_financial664f8,
        codeStates['setcompliance_financial'] = setcompliance_financial664f8,
        codeStates['approval_reference'] = approval_reference5e1aa,
        codeStates['setapproval_reference'] = setapproval_reference5e1aa,
        codeStates['witness_name'] = witness_nameac8f7,
        codeStates['setwitness_name'] = setwitness_nameac8f7,
        codeStates['data_wipe_method'] = data_wipe_methodfe1e6,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodfe1e6,
        codeStates['data_wiped'] = data_wipedad12b,
        codeStates['setdata_wiped'] = setdata_wipedad12b,
        codeStates['disposal_value'] = disposal_valued21f4,
        codeStates['setdisposal_value'] = setdisposal_valued21f4,
        codeStates['disposal_cost'] = disposal_cost031f6,
        codeStates['setdisposal_cost'] = setdisposal_cost031f6,
        codeStates['resale_amount'] = resale_amount2eb0e,
        codeStates['setresale_amount'] = setresale_amount2eb0e,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
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
        "16048a3a05ac4926a046632180f1f9bc",
        "bfd3da3efc96487da98d166ac185e1aa"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:initiateAssetDisposal:AFVK:v1",
      //     componentId: "16048a3a05ac4926a046632180f1f9bc",
      //     controlId: "bfd3da3efc96487da98d166ac185e1aa",
      //     isTable: false,
      //     from:"TextInputapproval_reference",
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
        setDynamicStateandType({name:'approval_reference', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'approval_reference',type:'text'};
      //   type={
      //     name:'approval_reference',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.approval_reference.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.approval_reference.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.approval_reference.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'approval_reference',type:'text'};
      //   type={
      //     name:'approval_reference',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.approval_reference.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.approval_reference.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.approval_reference.type
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

  const compliance_financial_group1f9bcRef = useRef<any>(compliance_financial_group1f9bc);
  useEffect(() => { compliance_financial_group1f9bcRef.current = compliance_financial_group1f9bc; }, [compliance_financial_group1f9bc]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "bfd3da3efc96487da98d166ac185e1aa") {
        handleChange({target:{value:compliance_financial_group1f9bcRef?.current?.approval_reference||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "bfd3da3efc96487da98d166ac185e1aa") {
        handleBlur({target:{value:compliance_financial_group1f9bcRef?.current?.approval_reference||""}});
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
  if(dfd_assetdisposal_v1Props?.setSearchFilters && dfd_assetdisposal_v1Props?.data)
  {
    if(Array.isArray(dfd_assetdisposal_v1Props.data) && dfd_assetdisposal_v1Props.data.length > 0){
      setcompliance_financial_group1f9bc((pre:any)=>({...pre,approval_reference:dfd_assetdisposal_v1Props.data[0]?.approval_reference}));
    }
  }
  },[dfd_assetdisposal_v1Props?.setSearchFilters])
  if (approval_reference5e1aa?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 7`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={compliance_financial_group1f9bc?.approval_reference||""}
         disabled= {approval_reference5e1aa?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Approval Reference"
      errorMessage={error}
        validationState={validate?.initiateAssetDisposal_v1?.approval_reference ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputapproval_reference
