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

const TextInputemail = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claims:AFVK:v1|d4d9550eca7f46129886b6c11168e6b5|properties.email"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Offsite:AFVK:v1|4d39522ee30443598090fe9ac0c429cb|6130f68ce58d440cbf36af71d74ad8a5"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'email',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {emailad8a5, setemailad8a5}= useContext(TotalContext) as TotalContextProps;
  const {from_datee96b6, setfrom_datee96b6}= useContext(TotalContext) as TotalContextProps;
  const {to_dateaf8c4, setto_dateaf8c4}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryb2e83, setclaim_categoryb2e83}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,Request_Screen_Offsite_v1:{...pre?.Request_Screen_Offsite_v1,email:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, email: +e.target.value }));
    }
    else{
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, email: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
        codeStates['offsite_expense'] = offsite_expense39c39,
        codeStates['setoffsite_expense'] = setoffsite_expense39c39,
        codeStates['claim_expense_type'] = claim_expense_type51f6e,
        codeStates['setclaim_expense_type'] = setclaim_expense_type51f6e,
        codeStates['expense_name'] = expense_namebf755,
        codeStates['setexpense_name'] = setexpense_namebf755,
        codeStates['email'] = emailad8a5,
        codeStates['setemail'] = setemailad8a5,
        codeStates['from_date'] = from_datee96b6,
        codeStates['setfrom_date'] = setfrom_datee96b6,
        codeStates['to_date'] = to_dateaf8c4,
        codeStates['setto_date'] = setto_dateaf8c4,
        codeStates['claim_category'] = claim_categoryb2e83,
        codeStates['setclaim_category'] = setclaim_categoryb2e83,
        codeStates['category_total_amount'] = category_total_amounte603b,
        codeStates['setcategory_total_amount'] = setcategory_total_amounte603b,
        codeStates['attachment'] = attachmentc9c51,
        codeStates['setattachment'] = setattachmentc9c51,
        codeStates['receipt_image'] = receipt_imageafe30,
        codeStates['setreceipt_image'] = setreceipt_imageafe30,
        codeStates['enable'] = enableeff29,
        codeStates['setenable'] = setenableeff29,
        codeStates['comments'] = comments65b18,
        codeStates['setcomments'] = setcomments65b18,
        codeStates['is_comment_enabled'] = is_comment_enabled5ca5f,
        codeStates['setis_comment_enabled'] = setis_comment_enabled5ca5f,
        codeStates['clear'] = clear2b3e6,
        codeStates['setclear'] = setclear2b3e6,
        codeStates['add'] = add5cae4,
        codeStates['setadd'] = setadd5cae4,
        codeStates['claimsdetailtable'] = claimsdetailtablef8143,
        codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
        codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
        codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,
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
        "4d39522ee30443598090fe9ac0c429cb",
        "6130f68ce58d440cbf36af71d74ad8a5"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Offsite:AFVK:v1",
      //     componentId: "4d39522ee30443598090fe9ac0c429cb",
      //     controlId: "6130f68ce58d440cbf36af71d74ad8a5",
      //     isTable: false,
      //     from:"TextInputemail",
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
        setDynamicStateandType({name:'email', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'email',type:'text'};
      //   type={
      //     name:'email',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.email.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.email.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.email.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'email',type:'text'};
      //   type={
      //     name:'email',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.email.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.email.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.email.type
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
  const request_offsite_group429cbRef = useRef<any>(request_offsite_group429cb);
  useEffect(() => { request_offsite_group429cbRef.current = request_offsite_group429cb; }, [request_offsite_group429cb]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6130f68ce58d440cbf36af71d74ad8a5") {
        handleChange({target:{value:request_offsite_group429cbRef?.current?.email||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6130f68ce58d440cbf36af71d74ad8a5") {
        handleBlur({target:{value:request_offsite_group429cbRef?.current?.email||""}});
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
      setrequest_offsite_group429cb((pre:any)=>({...pre,email:dfd_claims_v1Props.data[0]?.email}));
    }
  }
  },[dfd_claims_v1Props?.setSearchFilters])
  if (emailad8a5?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `5 / 20`,gridRow: `45 / 63`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("Email ID")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={request_offsite_group429cb?.email||""}
         disabled= {emailad8a5?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Email ID"
      errorMessage={error}
        validationState={validate?.Request_Screen_Offsite_v1?.email ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputemail
