
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreacomments = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'comments',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
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
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "4d39522ee30443598090fe9ac0c429cb",
        "0fc6421d9c204116862cf08d69365b18"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'comments',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='comments')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'comments',type:'text'}
        type={
          name:'comments',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.comments.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.comments.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.comments.type
        }
        setDynamicStateandType(type)
       
      }
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[comments65b18?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrequest_offsite_group429cb((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[comments65b18?.refresh])

  const request_offsite_group429cbRef = useRef<any>(request_offsite_group429cb);
  useEffect(() => { request_offsite_group429cbRef.current = request_offsite_group429cb; }, [request_offsite_group429cb]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0fc6421d9c204116862cf08d69365b18") {
        handleChange({target:{value:request_offsite_group429cbRef?.current?.comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0fc6421d9c204116862cf08d69365b18") {
        handleBlur({target:{value:request_offsite_group429cbRef?.current?.comments||""}});
      }
    };
    eventBus.on("triggerTextAreaChange", handlerChange);
    eventBus.on("triggerTextAreaBlur", handlerBlur);
    return () => {
      eventBus.off("triggerTextAreaChange", handlerChange);
      eventBus.off("triggerTextAreaBlur", handlerBlur);
    };
  },[validateRefetch.value])


  const handleBlur=async(e:any)=>{
    let validate:any
    code = allCode;
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
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Request_Screen_Offsite_v1:{...pre?.Request_Screen_Offsite_v1,comments:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, comments: e?.target?.value }));
    }
    try{
    }catch (err: any) {
    ///setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
  }

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleFocus=async(e:any)=>{
    try{
    setIsProcessing(true);
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
  if (comments65b18?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `5 / 17`,gridRow: `165 / 186`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {comments65b18?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { request_offsite_group429cb?.comments != null && typeof request_offsite_group429cb?.comments =='object' ? Object.keys(request_offsite_group429cb?.comments)?.length ?  JSON.stringify(request_offsite_group429cb?.comments,null ,2):"" : request_offsite_group429cb?.comments||""}
      errorMessage={error}
      validationState={validate?.Request_Screen_Offsite_v1?.comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacomments
