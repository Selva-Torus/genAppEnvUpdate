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

const TextInputclaim_category = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claims:AFVK:v1|d4d9550eca7f46129886b6c11168e6b5|properties.claim_category"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Approval_Screen_Daily:AFVK:v1|91dcb5fe99014c21add21a4d00669531|0cc243821fee47f695a7cb783a846dd0"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claims:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'claim_category',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense89868, setdaily_expense89868}= useContext(TotalContext) as TotalContextProps;
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps;
  const {email74f9a, setemail74f9a}= useContext(TotalContext) as TotalContextProps;
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps;
  const {expense_date08e2f, setexpense_date08e2f}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3cd01, setreceipt_image3cd01}= useContext(TotalContext) as TotalContextProps;
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps;
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps;
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps;
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps;
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,Approval_Screen_Daily_v1:{...pre?.Approval_Screen_Daily_v1,claim_category:undefined}}));
    if(dynamicStateandType.type=="number"){
    setdaily_approval_group69531((prev: any) => ({ ...prev, claim_category: +e.target.value }));
    }
    else{
    setdaily_approval_group69531((prev: any) => ({ ...prev, claim_category: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['daily_approval_group'] = daily_approval_group69531,
        codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
        codeStates['daily_approval_group69531'] = daily_approval_group69531Props,
        codeStates['setdaily_approval_group69531'] = setdaily_approval_group69531Props,
        codeStates['daily_expense'] = daily_expense89868,
        codeStates['setdaily_expense'] = setdaily_expense89868,
        codeStates['expense_name'] = expense_name88ccc,
        codeStates['setexpense_name'] = setexpense_name88ccc,
        codeStates['email'] = email74f9a,
        codeStates['setemail'] = setemail74f9a,
        codeStates['claim_category'] = claim_category46dd0,
        codeStates['setclaim_category'] = setclaim_category46dd0,
        codeStates['category_total_amount'] = category_total_amountcf2e2,
        codeStates['setcategory_total_amount'] = setcategory_total_amountcf2e2,
        codeStates['expense_date'] = expense_date08e2f,
        codeStates['setexpense_date'] = setexpense_date08e2f,
        codeStates['receipt_image'] = receipt_image3cd01,
        codeStates['setreceipt_image'] = setreceipt_image3cd01,
        codeStates['comments'] = comments9336d,
        codeStates['setcomments'] = setcomments9336d,
        codeStates['enable'] = enable666c8,
        codeStates['setenable'] = setenable666c8,
        codeStates['manager_comments'] = manager_commentsd309a,
        codeStates['setmanager_comments'] = setmanager_commentsd309a,
        codeStates['is_comment_enabled'] = is_comment_enablede20a4,
        codeStates['setis_comment_enabled'] = setis_comment_enablede20a4,
        codeStates['reject'] = reject28a4c,
        codeStates['setreject'] = setreject28a4c,
        codeStates['approve'] = approve28765,
        codeStates['setapprove'] = setapprove28765,
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
        "91dcb5fe99014c21add21a4d00669531",
        "0cc243821fee47f695a7cb783a846dd0"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Approval_Screen_Daily:AFVK:v1",
      //     componentId: "91dcb5fe99014c21add21a4d00669531",
      //     controlId: "0cc243821fee47f695a7cb783a846dd0",
      //     isTable: false,
      //     from:"TextInputclaim_category",
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
        setDynamicStateandType({name:'claim_category', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'claim_category',type:'text'};
      //   type={
      //     name:'claim_category',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.claim_category.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.claim_category.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.claim_category.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'claim_category',type:'text'};
      //   type={
      //     name:'claim_category',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.claim_category.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.claim_category.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.claim_category.type
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
  const daily_approval_group69531Ref = useRef<any>(daily_approval_group69531);
  useEffect(() => { daily_approval_group69531Ref.current = daily_approval_group69531; }, [daily_approval_group69531]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0cc243821fee47f695a7cb783a846dd0") {
        handleChange({target:{value:daily_approval_group69531Ref?.current?.claim_category||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0cc243821fee47f695a7cb783a846dd0") {
        handleBlur({target:{value:daily_approval_group69531Ref?.current?.claim_category||""}});
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
  if(dfd_claims_v1Props?.setSearchFilters && dfd_claims_v1Props?.data)
  {
    if(Array.isArray(dfd_claims_v1Props.data) && dfd_claims_v1Props.data.length > 0){
      setdaily_approval_group69531((pre:any)=>({...pre,claim_category:dfd_claims_v1Props.data[0]?.claim_category}));
    }
  }
  },[dfd_claims_v1Props?.setSearchFilters])
  if (claim_category46dd0?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `10 / 16`,gridRow: `71 / 91`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={daily_approval_group69531?.claim_category||""}
         disabled= {claim_category46dd0?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Category"
      errorMessage={error}
        validationState={validate?.Approval_Screen_Daily_v1?.claim_category ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputclaim_category
