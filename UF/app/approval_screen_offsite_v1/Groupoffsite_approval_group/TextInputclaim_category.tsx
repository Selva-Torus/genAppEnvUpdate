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
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Approval_Screen_Offsite:AFVK:v1|279c2b7585c947c9abdc712d6a18d6cc|8fd8a11bdb4e401394b4a952db3ac401"
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
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {email070ac, setemail070ac}= useContext(TotalContext) as TotalContextProps;
  const {from_dateb920f, setfrom_dateb920f}= useContext(TotalContext) as TotalContextProps;
  const {to_date5ca82, setto_date5ca82}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3a832, setreceipt_image3a832}= useContext(TotalContext) as TotalContextProps;
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,Approval_Screen_Offsite_v1:{...pre?.Approval_Screen_Offsite_v1,claim_category:undefined}}));
    if(dynamicStateandType.type=="number"){
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, claim_category: +e.target.value }));
    }
    else{
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, claim_category: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['offsite_approval_group'] = offsite_approval_group8d6cc,
        codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
        codeStates['offsite_approval_group8d6cc'] = offsite_approval_group8d6ccProps,
        codeStates['setoffsite_approval_group8d6cc'] = setoffsite_approval_group8d6ccProps,
        codeStates['offsite_expense'] = offsite_expense4be82,
        codeStates['setoffsite_expense'] = setoffsite_expense4be82,
        codeStates['expense_name'] = expense_name084c7,
        codeStates['setexpense_name'] = setexpense_name084c7,
        codeStates['email'] = email070ac,
        codeStates['setemail'] = setemail070ac,
        codeStates['from_date'] = from_dateb920f,
        codeStates['setfrom_date'] = setfrom_dateb920f,
        codeStates['to_date'] = to_date5ca82,
        codeStates['setto_date'] = setto_date5ca82,
        codeStates['claim_category'] = claim_categoryac401,
        codeStates['setclaim_category'] = setclaim_categoryac401,
        codeStates['category_total_amount'] = category_total_amountdd7c0,
        codeStates['setcategory_total_amount'] = setcategory_total_amountdd7c0,
        codeStates['receipt_image'] = receipt_image3a832,
        codeStates['setreceipt_image'] = setreceipt_image3a832,
        codeStates['comments'] = commentse0ef7,
        codeStates['setcomments'] = setcommentse0ef7,
        codeStates['manager_comments'] = manager_comments4bec2,
        codeStates['setmanager_comments'] = setmanager_comments4bec2,
        codeStates['enable'] = enabled5c19,
        codeStates['setenable'] = setenabled5c19,
        codeStates['is_comment_enabled'] = is_comment_enabledf9731,
        codeStates['setis_comment_enabled'] = setis_comment_enabledf9731,
        codeStates['claim_detail_table'] = claim_detail_table1835f,
        codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
        codeStates['claim_detail_table1835f'] = claim_detail_table1835fProps,
        codeStates['setclaim_detail_table1835f'] = setclaim_detail_table1835fProps,
        codeStates['reject'] = reject74228,
        codeStates['setreject'] = setreject74228,
        codeStates['approve'] = approve098ea,
        codeStates['setapprove'] = setapprove098ea,
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
        "279c2b7585c947c9abdc712d6a18d6cc",
        "8fd8a11bdb4e401394b4a952db3ac401"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Approval_Screen_Offsite:AFVK:v1",
      //     componentId: "279c2b7585c947c9abdc712d6a18d6cc",
      //     controlId: "8fd8a11bdb4e401394b4a952db3ac401",
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
  const offsite_approval_group8d6ccRef = useRef<any>(offsite_approval_group8d6cc);
  useEffect(() => { offsite_approval_group8d6ccRef.current = offsite_approval_group8d6cc; }, [offsite_approval_group8d6cc]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "8fd8a11bdb4e401394b4a952db3ac401") {
        handleChange({target:{value:offsite_approval_group8d6ccRef?.current?.claim_category||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "8fd8a11bdb4e401394b4a952db3ac401") {
        handleBlur({target:{value:offsite_approval_group8d6ccRef?.current?.claim_category||""}});
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
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,claim_category:dfd_claims_v1Props.data[0]?.claim_category}));
    }
  }
  },[dfd_claims_v1Props?.setSearchFilters])
  if (claim_categoryac401?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `2 / 11`,gridRow: `90 / 107`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={offsite_approval_group8d6cc?.claim_category||""}
         disabled= {claim_categoryac401?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Category"
      errorMessage={error}
        validationState={validate?.Approval_Screen_Offsite_v1?.claim_category ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputclaim_category
