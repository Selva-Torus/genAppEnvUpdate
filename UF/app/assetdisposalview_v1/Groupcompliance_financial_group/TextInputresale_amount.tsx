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

const TextInputresale_amount = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1|1d36f55182b042ad946873239ea59ff0|properties.resale_amount"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposalView:AFVK:v1|2f1878a0c47c273ea728efb4f07e5dd8|6610978c02d5eb47ff0b855d44d5336f"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'resale_amount',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {initiate_asset_disposal_group0196a, setinitiate_asset_disposal_group0196a}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_group0196aProps, setinitiate_asset_disposal_group0196aProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369, setdisposal_details_groupaa369}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369Props, setdisposal_details_groupaa369Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financialc9043, setcompliance_financialc9043}= useContext(TotalContext) as TotalContextProps;
  const {approval_referenceb0a46, setapproval_referenceb0a46}= useContext(TotalContext) as TotalContextProps;
  const {witness_name6fddf, setwitness_name6fddf}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_method8923d, setdata_wipe_method8923d}= useContext(TotalContext) as TotalContextProps;
  const {data_wipeda4257, setdata_wipeda4257}= useContext(TotalContext) as TotalContextProps;
  const {disposal_value13578, setdisposal_value13578}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost23f44, setdisposal_cost23f44}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount5336f, setresale_amount5336f}= useContext(TotalContext) as TotalContextProps;
  const {disposal_idee44c, setdisposal_idee44c}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assetDisposalView_v1:{...pre?.assetDisposalView_v1,resale_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcompliance_financial_groupe5dd8((prev: any) => ({ ...prev, resale_amount: +e.target.value }));
    }
    else{
    setcompliance_financial_groupe5dd8((prev: any) => ({ ...prev, resale_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_group0196a,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_group0196a,
        codeStates['initiate_asset_disposal_group0196a'] = initiate_asset_disposal_group0196aProps,
        codeStates['setinitiate_asset_disposal_group0196a'] = setinitiate_asset_disposal_group0196aProps,
        codeStates['disposal_details_group'] = disposal_details_groupaa369,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaa369,
        codeStates['disposal_details_groupaa369'] = disposal_details_groupaa369Props,
        codeStates['setdisposal_details_groupaa369'] = setdisposal_details_groupaa369Props,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
        codeStates['compliance_financial'] = compliance_financialc9043,
        codeStates['setcompliance_financial'] = setcompliance_financialc9043,
        codeStates['approval_reference'] = approval_referenceb0a46,
        codeStates['setapproval_reference'] = setapproval_referenceb0a46,
        codeStates['witness_name'] = witness_name6fddf,
        codeStates['setwitness_name'] = setwitness_name6fddf,
        codeStates['data_wipe_method'] = data_wipe_method8923d,
        codeStates['setdata_wipe_method'] = setdata_wipe_method8923d,
        codeStates['data_wiped'] = data_wipeda4257,
        codeStates['setdata_wiped'] = setdata_wipeda4257,
        codeStates['disposal_value'] = disposal_value13578,
        codeStates['setdisposal_value'] = setdisposal_value13578,
        codeStates['disposal_cost'] = disposal_cost23f44,
        codeStates['setdisposal_cost'] = setdisposal_cost23f44,
        codeStates['resale_amount'] = resale_amount5336f,
        codeStates['setresale_amount'] = setresale_amount5336f,
        codeStates['disposal_id'] = disposal_idee44c,
        codeStates['setdisposal_id'] = setdisposal_idee44c,
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
        "2f1878a0c47c273ea728efb4f07e5dd8",
        "6610978c02d5eb47ff0b855d44d5336f"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposalView:AFVK:v1",
      //     componentId: "2f1878a0c47c273ea728efb4f07e5dd8",
      //     controlId: "6610978c02d5eb47ff0b855d44d5336f",
      //     isTable: false,
      //     from:"TextInputresale_amount",
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
        setDynamicStateandType({name:'resale_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'resale_amount',type:'text'};
      //   type={
      //     name:'resale_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.resale_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.resale_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.resale_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'resale_amount',type:'text'};
      //   type={
      //     name:'resale_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.resale_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.resale_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.resale_amount.type
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

  const compliance_financial_groupe5dd8Ref = useRef<any>(compliance_financial_groupe5dd8);
  useEffect(() => { compliance_financial_groupe5dd8Ref.current = compliance_financial_groupe5dd8; }, [compliance_financial_groupe5dd8]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "6610978c02d5eb47ff0b855d44d5336f") {
        handleChange({target:{value:compliance_financial_groupe5dd8Ref?.current?.resale_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6610978c02d5eb47ff0b855d44d5336f") {
        handleBlur({target:{value:compliance_financial_groupe5dd8Ref?.current?.resale_amount||""}});
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
      setcompliance_financial_groupe5dd8((pre:any)=>({...pre,resale_amount:dfd_assetdisposal_v1Props.data[0]?.resale_amount}));
    }
  }
  },[dfd_assetdisposal_v1Props?.setSearchFilters])
  if (resale_amount5336f?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 19`,gridRow: `21 / 33`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={compliance_financial_groupe5dd8?.resale_amount||""}
         disabled= {resale_amount5336f?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="	Resale Amount"
      errorMessage={error}
        validationState={validate?.assetDisposalView_v1?.resale_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputresale_amount
