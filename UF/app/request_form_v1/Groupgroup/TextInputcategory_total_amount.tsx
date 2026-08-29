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
import { useGlobal } from '@/context/GlobalContext'
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

const TextInputcategory_total_amount = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
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
  "events": {
    "NDS": [],
    "NDE": [],
    "NDP": {}
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1|1143fba1b035410d80b91c8996ee6d3a|responses.200.content.application/json.schema.items.properties.category_total_amount"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:Request_form:AFVK:v1|5a69b1d62572431ab2933ca7cf0571d2|5082ebc8ea1a4cab965304fa769395dd"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:claims_dfd:AFVK:v1:",
  "schemaData": {
    "type": "number",
    "example": "number"
  },
  "dataType": "number"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_claims_dfd_v1Props, setdfd_claims_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'category_total_amount',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group571d2, setgroup571d2}= useContext(TotalContext) as TotalContextProps;
  const {group571d2Props, setgroup571d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpense64a4c, setdailyexpense64a4c}= useContext(TotalContext) as TotalContextProps;
  const {expense_name136a1, setexpense_name136a1}= useContext(TotalContext) as TotalContextProps;
  const {expense_date7e93b, setexpense_date7e93b}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1c64, setclaim_categoryf1c64}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount395dd, setcategory_total_amount395dd}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageb2aec, setreceipt_imageb2aec}= useContext(TotalContext) as TotalContextProps;
  const {commentse3b5b, setcommentse3b5b}= useContext(TotalContext) as TotalContextProps;
  const {group_two6135c, setgroup_two6135c}= useContext(TotalContext) as TotalContextProps;
  const {group_two6135cProps, setgroup_two6135cProps}= useContext(TotalContext) as TotalContextProps;
  const {switch7e8ff, setswitch7e8ff}= useContext(TotalContext) as TotalContextProps;
  const {checkbox53e8f, setcheckbox53e8f}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,Request_form_v1:{...pre?.Request_form_v1,category_total_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup571d2((prev: any) => ({ ...prev, category_total_amount: +e.target.value }));
    }
    else{
    setgroup571d2((prev: any) => ({ ...prev, category_total_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group571d2,
        codeStates['setgroup'] = setgroup571d2,
        codeStates['group571d2'] = group571d2Props,
        codeStates['setgroup571d2'] = setgroup571d2Props,
        codeStates['dailyexpense'] = dailyexpense64a4c,
        codeStates['setdailyexpense'] = setdailyexpense64a4c,
        codeStates['expense_name'] = expense_name136a1,
        codeStates['setexpense_name'] = setexpense_name136a1,
        codeStates['expense_date'] = expense_date7e93b,
        codeStates['setexpense_date'] = setexpense_date7e93b,
        codeStates['claim_category'] = claim_categoryf1c64,
        codeStates['setclaim_category'] = setclaim_categoryf1c64,
        codeStates['category_total_amount'] = category_total_amount395dd,
        codeStates['setcategory_total_amount'] = setcategory_total_amount395dd,
        codeStates['receipt_image'] = receipt_imageb2aec,
        codeStates['setreceipt_image'] = setreceipt_imageb2aec,
        codeStates['comments'] = commentse3b5b,
        codeStates['setcomments'] = setcommentse3b5b,
        codeStates['group_two'] = group_two6135c,
        codeStates['setgroup_two'] = setgroup_two6135c,
        codeStates['group_two6135c'] = group_two6135cProps,
        codeStates['setgroup_two6135c'] = setgroup_two6135cProps,
        codeStates['switch'] = switch7e8ff,
        codeStates['setswitch'] = setswitch7e8ff,
        codeStates['checkbox'] = checkbox53e8f,
        codeStates['setcheckbox'] = setcheckbox53e8f,
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
        "5a69b1d62572431ab2933ca7cf0571d2",
        "5082ebc8ea1a4cab965304fa769395dd"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:Request_form:AFVK:v1",
      //     componentId: "5a69b1d62572431ab2933ca7cf0571d2",
      //     controlId: "5082ebc8ea1a4cab965304fa769395dd",
      //     isTable: false,
      //     from:"TextInputcategory_total_amount",
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
        setDynamicStateandType({name:'category_total_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'category_total_amount',type:'text'};
      //   type={
      //     name:'category_total_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.category_total_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.category_total_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.category_total_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'category_total_amount',type:'text'};
      //   type={
      //     name:'category_total_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.category_total_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.category_total_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.category_total_amount.type
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
  const group571d2Ref = useRef<any>(group571d2);
  useEffect(() => { group571d2Ref.current = group571d2; }, [group571d2]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "5082ebc8ea1a4cab965304fa769395dd") {
        handleChange({target:{value:group571d2Ref?.current?.category_total_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5082ebc8ea1a4cab965304fa769395dd") {
        handleBlur({target:{value:group571d2Ref?.current?.category_total_amount||""}});
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
  if(dfd_claims_dfd_v1Props?.setSearchFilters && dfd_claims_dfd_v1Props?.data)
  {
    if(Array.isArray(dfd_claims_dfd_v1Props.data) && dfd_claims_dfd_v1Props.data.length > 0){
      setgroup571d2((pre:any)=>({...pre,category_total_amount:dfd_claims_dfd_v1Props.data[0]?.category_total_amount}));
    }
  }
  },[dfd_claims_dfd_v1Props?.setSearchFilters])
  if (category_total_amount395dd?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `5 / 20`,gridRow: `75 / 92`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={true}
        type={dynamicStateandType.type}
        value={group571d2?.category_total_amount||""}
         disabled= {category_total_amount395dd?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Amount"
      errorMessage={error}
        validationState={validate?.Request_form_v1?.category_total_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcategory_total_amount
