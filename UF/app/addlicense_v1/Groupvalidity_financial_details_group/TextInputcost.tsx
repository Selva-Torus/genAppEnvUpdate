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

const TextInputcost = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1|a1f54b62a6e841a3810307b90725a55a|properties.cost"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicense:AFVK:v1|1eedc787c9574ce3abe0ab94a8ced4a1|fccdbc058ff74769a8eaf818d02f9899"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cost',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_license_groupdb5a7, setadd_license_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {add_license_groupdb5a7Props, setadd_license_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34, setlicense_information_groupfae34}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34Props, setlicense_information_groupfae34Props}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91, setlicense_configuration_groupb5d91}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91Props, setlicense_configuration_groupb5d91Props}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1, setvalidity_financial_details_grouped4a1}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1Props, setvalidity_financial_details_grouped4a1Props}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details82762, setvalidity_financial_details82762}= useContext(TotalContext) as TotalContextProps;
  const {purchase_datebfe70, setpurchase_datebfe70}= useContext(TotalContext) as TotalContextProps;
  const {expiry_date5c034, setexpiry_date5c034}= useContext(TotalContext) as TotalContextProps;
  const {support_expiry4ec2c, setsupport_expiry4ec2c}= useContext(TotalContext) as TotalContextProps;
  const {costf9899, setcostf9899}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98, setdynamicactions67d98}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98Props, setdynamicactions67d98Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,addLicense_v1:{...pre?.addLicense_v1,cost:undefined}}));
    if(dynamicStateandType.type=="number"){
    setvalidity_financial_details_grouped4a1((prev: any) => ({ ...prev, cost: +e.target.value }));
    }
    else{
    setvalidity_financial_details_grouped4a1((prev: any) => ({ ...prev, cost: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_license_group'] = add_license_groupdb5a7,
        codeStates['setadd_license_group'] = setadd_license_groupdb5a7,
        codeStates['add_license_groupdb5a7'] = add_license_groupdb5a7Props,
        codeStates['setadd_license_groupdb5a7'] = setadd_license_groupdb5a7Props,
        codeStates['license_information_group'] = license_information_groupfae34,
        codeStates['setlicense_information_group'] = setlicense_information_groupfae34,
        codeStates['license_information_groupfae34'] = license_information_groupfae34Props,
        codeStates['setlicense_information_groupfae34'] = setlicense_information_groupfae34Props,
        codeStates['license_configuration_group'] = license_configuration_groupb5d91,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupb5d91,
        codeStates['license_configuration_groupb5d91'] = license_configuration_groupb5d91Props,
        codeStates['setlicense_configuration_groupb5d91'] = setlicense_configuration_groupb5d91Props,
        codeStates['validity_financial_details_group'] = validity_financial_details_grouped4a1,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_grouped4a1,
        codeStates['validity_financial_details_grouped4a1'] = validity_financial_details_grouped4a1Props,
        codeStates['setvalidity_financial_details_grouped4a1'] = setvalidity_financial_details_grouped4a1Props,
        codeStates['validity_financial_details'] = validity_financial_details82762,
        codeStates['setvalidity_financial_details'] = setvalidity_financial_details82762,
        codeStates['purchase_date'] = purchase_datebfe70,
        codeStates['setpurchase_date'] = setpurchase_datebfe70,
        codeStates['expiry_date'] = expiry_date5c034,
        codeStates['setexpiry_date'] = setexpiry_date5c034,
        codeStates['support_expiry'] = support_expiry4ec2c,
        codeStates['setsupport_expiry'] = setsupport_expiry4ec2c,
        codeStates['cost'] = costf9899,
        codeStates['setcost'] = setcostf9899,
        codeStates['dynamicactions'] = dynamicactions67d98,
        codeStates['setdynamicactions'] = setdynamicactions67d98,
        codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
        codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,
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
        "1eedc787c9574ce3abe0ab94a8ced4a1",
        "fccdbc058ff74769a8eaf818d02f9899"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addLicense:AFVK:v1",
      //     componentId: "1eedc787c9574ce3abe0ab94a8ced4a1",
      //     controlId: "fccdbc058ff74769a8eaf818d02f9899",
      //     isTable: false,
      //     from:"TextInputcost",
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
        setDynamicStateandType({name:'cost', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cost',type:'text'};
      //   type={
      //     name:'cost',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cost.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cost.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cost.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cost',type:'text'};
      //   type={
      //     name:'cost',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cost.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cost.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cost.type
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

  const validity_financial_details_grouped4a1Ref = useRef<any>(validity_financial_details_grouped4a1);
  useEffect(() => { validity_financial_details_grouped4a1Ref.current = validity_financial_details_grouped4a1; }, [validity_financial_details_grouped4a1]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "fccdbc058ff74769a8eaf818d02f9899") {
        handleChange({target:{value:validity_financial_details_grouped4a1Ref?.current?.cost||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "fccdbc058ff74769a8eaf818d02f9899") {
        handleBlur({target:{value:validity_financial_details_grouped4a1Ref?.current?.cost||""}});
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
      setvalidity_financial_details_grouped4a1((pre:any)=>({...pre,cost:dfd_assetsoftwarelicenses_v1Props.data[0]?.cost}));
    }
  }
  },[dfd_assetsoftwarelicenses_v1Props?.setSearchFilters])
  if (costf9899?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `21 / 33`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={validity_financial_details_grouped4a1?.cost||""}
         disabled= {costf9899?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Cost"
      errorMessage={error}
        validationState={validate?.addLicense_v1?.cost ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcost
