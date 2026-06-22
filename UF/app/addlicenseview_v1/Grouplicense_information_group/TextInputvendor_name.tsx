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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1|a1f54b62a6e841a3810307b90725a55a|properties.vendor_name"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicenseView:AFVK:v1|33d0de4ebc31e801cefbbc9fa134e03c|8ebb6fa36a994c9ca417c103d84f2df8"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1:",
  "schemaData": {
    "type": "null"
  },
  "dataType": "null"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_license_group1bee6, setadd_license_group1bee6}= useContext(TotalContext) as TotalContextProps;
  const {add_license_group1bee6Props, setadd_license_group1bee6Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03c, setlicense_information_group4e03c}= useContext(TotalContext) as TotalContextProps;
  const {license_information_group4e03cProps, setlicense_information_group4e03cProps}= useContext(TotalContext) as TotalContextProps;
  const {license_information6a10f, setlicense_information6a10f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name1ae9b, setasset_name1ae9b}= useContext(TotalContext) as TotalContextProps;
  const {product_name11c98, setproduct_name11c98}= useContext(TotalContext) as TotalContextProps;
  const {vendor_namef2df8, setvendor_namef2df8}= useContext(TotalContext) as TotalContextProps;
  const {license_typec8c15, setlicense_typec8c15}= useContext(TotalContext) as TotalContextProps;
  const {license_keyab6d1, setlicense_keyab6d1}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329d, setlicense_configuration_groupa329d}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addLicenseView_v1:{...pre?.addLicenseView_v1,vendor_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setlicense_information_group4e03c((prev: any) => ({ ...prev, vendor_name: +e.target.value }));
    }
    else{
    setlicense_information_group4e03c((prev: any) => ({ ...prev, vendor_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_license_group'] = add_license_group1bee6,
        codeStates['setadd_license_group'] = setadd_license_group1bee6,
        codeStates['add_license_group1bee6'] = add_license_group1bee6Props,
        codeStates['setadd_license_group1bee6'] = setadd_license_group1bee6Props,
        codeStates['license_information_group'] = license_information_group4e03c,
        codeStates['setlicense_information_group'] = setlicense_information_group4e03c,
        codeStates['license_information_group4e03c'] = license_information_group4e03cProps,
        codeStates['setlicense_information_group4e03c'] = setlicense_information_group4e03cProps,
        codeStates['license_information'] = license_information6a10f,
        codeStates['setlicense_information'] = setlicense_information6a10f,
        codeStates['asset_name'] = asset_name1ae9b,
        codeStates['setasset_name'] = setasset_name1ae9b,
        codeStates['product_name'] = product_name11c98,
        codeStates['setproduct_name'] = setproduct_name11c98,
        codeStates['vendor_name'] = vendor_namef2df8,
        codeStates['setvendor_name'] = setvendor_namef2df8,
        codeStates['license_type'] = license_typec8c15,
        codeStates['setlicense_type'] = setlicense_typec8c15,
        codeStates['license_key'] = license_keyab6d1,
        codeStates['setlicense_key'] = setlicense_keyab6d1,
        codeStates['license_configuration_group'] = license_configuration_groupa329d,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupa329d,
        codeStates['license_configuration_groupa329d'] = license_configuration_groupa329dProps,
        codeStates['setlicense_configuration_groupa329d'] = setlicense_configuration_groupa329dProps,
        codeStates['validity_financial_details_group'] = validity_financial_details_groupb8a9f,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_groupb8a9f,
        codeStates['validity_financial_details_groupb8a9f'] = validity_financial_details_groupb8a9fProps,
        codeStates['setvalidity_financial_details_groupb8a9f'] = setvalidity_financial_details_groupb8a9fProps,
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
        "33d0de4ebc31e801cefbbc9fa134e03c",
        "8ebb6fa36a994c9ca417c103d84f2df8"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicenseView:AFVK:v1",
      //     componentId: "33d0de4ebc31e801cefbbc9fa134e03c",
      //     controlId: "8ebb6fa36a994c9ca417c103d84f2df8",
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

  const license_information_group4e03cRef = useRef<any>(license_information_group4e03c);
  useEffect(() => { license_information_group4e03cRef.current = license_information_group4e03c; }, [license_information_group4e03c]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "8ebb6fa36a994c9ca417c103d84f2df8") {
        handleChange({target:{value:license_information_group4e03cRef?.current?.vendor_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "8ebb6fa36a994c9ca417c103d84f2df8") {
        handleBlur({target:{value:license_information_group4e03cRef?.current?.vendor_name||""}});
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
  if(dfd_assetsoftwarelicenses_v1Props?.setSearchFilters && dfd_assetsoftwarelicenses_v1Props?.data)
  {
    if(Array.isArray(dfd_assetsoftwarelicenses_v1Props.data) && dfd_assetsoftwarelicenses_v1Props.data.length > 0){
      setlicense_information_group4e03c((pre:any)=>({...pre,vendor_name:dfd_assetsoftwarelicenses_v1Props.data[0]?.vendor_name}));
    }
  }
  },[dfd_assetsoftwarelicenses_v1Props?.setSearchFilters])
  if (vendor_namef2df8?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={license_information_group4e03c?.vendor_name||""}
         disabled= {vendor_namef2df8?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Vendor Name"
      errorMessage={error}
        validationState={validate?.addLicenseView_v1?.vendor_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputvendor_name
