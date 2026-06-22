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

const TextInputdisposal_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1|1d36f55182b042ad946873239ea59ff0|properties.disposal_date"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposalView:AFVK:v1|b3ad56a3082a709039df9dc7d32aa369|620f6204b07342cc80898d861c6247ef"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'disposal_date',type:"text"})
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
  const {disposal_details1d5ee, setdisposal_details1d5ee}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name5f557, setvendor_name5f557}= useContext(TotalContext) as TotalContextProps;
  const {asset_name298df, setasset_name298df}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methoda093b, setdisposal_methoda093b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_date247ef, setdisposal_date247ef}= useContext(TotalContext) as TotalContextProps;
  const {reason8b938, setreason8b938}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assetDisposalView_v1:{...pre?.assetDisposalView_v1,disposal_date:undefined}}));
    if(dynamicStateandType.type=="number"){
    setdisposal_details_groupaa369((prev: any) => ({ ...prev, disposal_date: +e.target.value }));
    }
    else{
    setdisposal_details_groupaa369((prev: any) => ({ ...prev, disposal_date: e.target.value }));
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
        codeStates['disposal_details'] = disposal_details1d5ee,
        codeStates['setdisposal_details'] = setdisposal_details1d5ee,
        codeStates['vendor_name'] = vendor_name5f557,
        codeStates['setvendor_name'] = setvendor_name5f557,
        codeStates['asset_name'] = asset_name298df,
        codeStates['setasset_name'] = setasset_name298df,
        codeStates['disposal_method'] = disposal_methoda093b,
        codeStates['setdisposal_method'] = setdisposal_methoda093b,
        codeStates['disposal_date'] = disposal_date247ef,
        codeStates['setdisposal_date'] = setdisposal_date247ef,
        codeStates['reason'] = reason8b938,
        codeStates['setreason'] = setreason8b938,
        codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
        codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
        codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
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
        "b3ad56a3082a709039df9dc7d32aa369",
        "620f6204b07342cc80898d861c6247ef"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposalView:AFVK:v1",
      //     componentId: "b3ad56a3082a709039df9dc7d32aa369",
      //     controlId: "620f6204b07342cc80898d861c6247ef",
      //     isTable: false,
      //     from:"TextInputdisposal_date",
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
        setDynamicStateandType({name:'disposal_date', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'disposal_date',type:'text'};
      //   type={
      //     name:'disposal_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.disposal_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.disposal_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.disposal_date.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'disposal_date',type:'text'};
      //   type={
      //     name:'disposal_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.disposal_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.disposal_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.disposal_date.type
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

  const disposal_details_groupaa369Ref = useRef<any>(disposal_details_groupaa369);
  useEffect(() => { disposal_details_groupaa369Ref.current = disposal_details_groupaa369; }, [disposal_details_groupaa369]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "620f6204b07342cc80898d861c6247ef") {
        handleChange({target:{value:disposal_details_groupaa369Ref?.current?.disposal_date||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "620f6204b07342cc80898d861c6247ef") {
        handleBlur({target:{value:disposal_details_groupaa369Ref?.current?.disposal_date||""}});
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
      setdisposal_details_groupaa369((pre:any)=>({...pre,disposal_date:dfd_assetdisposal_v1Props.data[0]?.disposal_date}));
    }
  }
  },[dfd_assetdisposal_v1Props?.setSearchFilters])
  if (disposal_date247ef?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `19 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={disposal_details_groupaa369?.disposal_date||""}
         disabled= {disposal_date247ef?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Disposal Date"
      errorMessage={error}
        validationState={validate?.assetDisposalView_v1?.disposal_date ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputdisposal_date
