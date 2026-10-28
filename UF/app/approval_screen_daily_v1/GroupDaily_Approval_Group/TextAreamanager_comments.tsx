
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


const TextAreamanager_comments = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'manager_comments',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
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
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "91dcb5fe99014c21add21a4d00669531",
        "a0b10e934dc447099f6b85449f5d309a"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'manager_comments',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='manager_comments')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'manager_comments',type:'text'}
        type={
          name:'manager_comments',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.manager_comments.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.manager_comments.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.manager_comments.type
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
  },[manager_commentsd309a?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setdaily_approval_group69531((pre:any)=>({...pre,manager_comments:""}))
    }else 
      prevRefreshRef.current= true
  },[manager_commentsd309a?.refresh])

  const daily_approval_group69531Ref = useRef<any>(daily_approval_group69531);
  useEffect(() => { daily_approval_group69531Ref.current = daily_approval_group69531; }, [daily_approval_group69531]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "a0b10e934dc447099f6b85449f5d309a") {
        handleChange({target:{value:daily_approval_group69531Ref?.current?.manager_comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a0b10e934dc447099f6b85449f5d309a") {
        handleBlur({target:{value:daily_approval_group69531Ref?.current?.manager_comments||""}});
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
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Approval_Screen_Daily_v1:{...pre?.Approval_Screen_Daily_v1,manager_comments:undefined}}));
    if(dynamicStateandType.type=="number"){
    setdaily_approval_group69531((prev: any) => ({ ...prev, manager_comments: +e?.target?.value }));
    }
    else{
    setdaily_approval_group69531((prev: any) => ({ ...prev, manager_comments: e?.target?.value }));
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
  if (manager_commentsd309a?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `3 / 19`,gridRow: `235 / 254`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {manager_commentsd309a?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Manager Response"
      pin = {'brick-brick'}
      value = { daily_approval_group69531?.manager_comments != null && typeof daily_approval_group69531?.manager_comments =='object' ? Object.keys(daily_approval_group69531?.manager_comments)?.length ?  JSON.stringify(daily_approval_group69531?.manager_comments,null ,2):"" : daily_approval_group69531?.manager_comments||""}
      errorMessage={error}
      validationState={validate?.Approval_Screen_Daily_v1?.manager_comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreamanager_comments
