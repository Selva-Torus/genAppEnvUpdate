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

const TextInputpurchase_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|19752269565d4be2be63be1bd8cf4ff6|properties.purchase_date"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAssetView:AFVK:v1|50a619a1af5a843efc63dd18a4ac3900|6bd379a38402465da7afb256c239a646"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'purchase_date',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {purchase_details_text52695, setpurchase_details_text52695}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name1f183, setvendor_name1f183}= useContext(TotalContext) as TotalContextProps;
  const {purchase_cost899f9, setpurchase_cost899f9}= useContext(TotalContext) as TotalContextProps;
  const {currency0f0b1, setcurrency0f0b1}= useContext(TotalContext) as TotalContextProps;
  const {purchase_date9a646, setpurchase_date9a646}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expirye6615, setwarranty_expirye6615}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_ratea6497, setdepreciation_ratea6497}= useContext(TotalContext) as TotalContextProps;
  const {salvage_value9adb6, setsalvage_value9adb6}= useContext(TotalContext) as TotalContextProps;
  const {current_value8e31d, setcurrent_value8e31d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newAssetView_v1:{...pre?.newAssetView_v1,purchase_date:undefined}}));
    if(dynamicStateandType.type=="number"){
    setpyrchase_details_groupc3900((prev: any) => ({ ...prev, purchase_date: +e.target.value }));
    }
    else{
    setpyrchase_details_groupc3900((prev: any) => ({ ...prev, purchase_date: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['purchase_details_text'] = purchase_details_text52695,
        codeStates['setpurchase_details_text'] = setpurchase_details_text52695,
        codeStates['vendor_name'] = vendor_name1f183,
        codeStates['setvendor_name'] = setvendor_name1f183,
        codeStates['purchase_cost'] = purchase_cost899f9,
        codeStates['setpurchase_cost'] = setpurchase_cost899f9,
        codeStates['currency'] = currency0f0b1,
        codeStates['setcurrency'] = setcurrency0f0b1,
        codeStates['purchase_date'] = purchase_date9a646,
        codeStates['setpurchase_date'] = setpurchase_date9a646,
        codeStates['warranty_expiry'] = warranty_expirye6615,
        codeStates['setwarranty_expiry'] = setwarranty_expirye6615,
        codeStates['depreciation_rate'] = depreciation_ratea6497,
        codeStates['setdepreciation_rate'] = setdepreciation_ratea6497,
        codeStates['salvage_value'] = salvage_value9adb6,
        codeStates['setsalvage_value'] = setsalvage_value9adb6,
        codeStates['current_value'] = current_value8e31d,
        codeStates['setcurrent_value'] = setcurrent_value8e31d,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
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
        "50a619a1af5a843efc63dd18a4ac3900",
        "6bd379a38402465da7afb256c239a646"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAssetView:AFVK:v1",
      //     componentId: "50a619a1af5a843efc63dd18a4ac3900",
      //     controlId: "6bd379a38402465da7afb256c239a646",
      //     isTable: false,
      //     from:"TextInputpurchase_date",
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
        setDynamicStateandType({name:'purchase_date', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'purchase_date',type:'text'};
      //   type={
      //     name:'purchase_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purchase_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purchase_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purchase_date.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'purchase_date',type:'text'};
      //   type={
      //     name:'purchase_date',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purchase_date.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purchase_date.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purchase_date.type
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

  const pyrchase_details_groupc3900Ref = useRef<any>(pyrchase_details_groupc3900);
  useEffect(() => { pyrchase_details_groupc3900Ref.current = pyrchase_details_groupc3900; }, [pyrchase_details_groupc3900]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "6bd379a38402465da7afb256c239a646") {
        handleChange({target:{value:pyrchase_details_groupc3900Ref?.current?.purchase_date||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6bd379a38402465da7afb256c239a646") {
        handleBlur({target:{value:pyrchase_details_groupc3900Ref?.current?.purchase_date||""}});
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
  if(dfd_assets_v1Props?.setSearchFilters && dfd_assets_v1Props?.data)
  {
    if(Array.isArray(dfd_assets_v1Props.data) && dfd_assets_v1Props.data.length > 0){
      setpyrchase_details_groupc3900((pre:any)=>({...pre,purchase_date:dfd_assets_v1Props.data[0]?.purchase_date}));
    }
  }
  },[dfd_assets_v1Props?.setSearchFilters])
  if (purchase_date9a646?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `19 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-md"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={pyrchase_details_groupc3900?.purchase_date||""}
         disabled= {purchase_date9a646?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Purchase Date"
      errorMessage={error}
        validationState={validate?.newAssetView_v1?.purchase_date ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputpurchase_date
