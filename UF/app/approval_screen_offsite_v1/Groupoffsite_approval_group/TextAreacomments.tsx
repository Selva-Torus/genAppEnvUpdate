
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
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "279c2b7585c947c9abdc712d6a18d6cc",
        "83eb2934fd88438da3607f98661e0ef7"
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
  },[commentse0ef7?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[commentse0ef7?.refresh])

  const offsite_approval_group8d6ccRef = useRef<any>(offsite_approval_group8d6cc);
  useEffect(() => { offsite_approval_group8d6ccRef.current = offsite_approval_group8d6cc; }, [offsite_approval_group8d6cc]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "83eb2934fd88438da3607f98661e0ef7") {
        handleChange({target:{value:offsite_approval_group8d6ccRef?.current?.comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "83eb2934fd88438da3607f98661e0ef7") {
        handleBlur({target:{value:offsite_approval_group8d6ccRef?.current?.comments||""}});
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
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Approval_Screen_Offsite_v1:{...pre?.Approval_Screen_Offsite_v1,comments:undefined}}));
    if(dynamicStateandType.type=="number"){
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, comments: e?.target?.value }));
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
  if (commentse0ef7?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `2 / 22`,gridRow: `210 / 228`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {commentse0ef7?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { offsite_approval_group8d6cc?.comments != null && typeof offsite_approval_group8d6cc?.comments =='object' ? Object.keys(offsite_approval_group8d6cc?.comments)?.length ?  JSON.stringify(offsite_approval_group8d6cc?.comments,null ,2):"" : offsite_approval_group8d6cc?.comments||""}
      errorMessage={error}
      validationState={validate?.Approval_Screen_Offsite_v1?.comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacomments
