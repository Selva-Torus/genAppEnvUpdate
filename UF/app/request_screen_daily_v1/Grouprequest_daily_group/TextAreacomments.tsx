
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
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {emailaf076, setemailaf076}= useContext(TotalContext) as TotalContextProps;
  const {expense_date92269, setexpense_date92269}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1fb6, setclaim_categoryf1fb6}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {iscommentenabled7244d, setiscommentenabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "483e1dce061b49cebe0c9e46b0844e40",
        "f5e442240e47412d8af3ce6beb9f2394"
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
  },[commentsf2394?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrequest_daily_group44e40((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[commentsf2394?.refresh])

  const request_daily_group44e40Ref = useRef<any>(request_daily_group44e40);
  useEffect(() => { request_daily_group44e40Ref.current = request_daily_group44e40; }, [request_daily_group44e40]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f5e442240e47412d8af3ce6beb9f2394") {
        handleChange({target:{value:request_daily_group44e40Ref?.current?.comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f5e442240e47412d8af3ce6beb9f2394") {
        handleBlur({target:{value:request_daily_group44e40Ref?.current?.comments||""}});
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
        codeStates['request_daily_group'] = request_daily_group44e40,
        codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
        codeStates['request_daily_group44e40'] = request_daily_group44e40Props,
        codeStates['setrequest_daily_group44e40'] = setrequest_daily_group44e40Props,
        codeStates['daily_expense'] = daily_expensefb8cc,
        codeStates['setdaily_expense'] = setdaily_expensefb8cc,
        codeStates['claim_expense_type'] = claim_expense_type22d67,
        codeStates['setclaim_expense_type'] = setclaim_expense_type22d67,
        codeStates['expense_name'] = expense_name5f562,
        codeStates['setexpense_name'] = setexpense_name5f562,
        codeStates['email'] = emailaf076,
        codeStates['setemail'] = setemailaf076,
        codeStates['expense_date'] = expense_date92269,
        codeStates['setexpense_date'] = setexpense_date92269,
        codeStates['claim_category'] = claim_categoryf1fb6,
        codeStates['setclaim_category'] = setclaim_categoryf1fb6,
        codeStates['category_total_amount'] = category_total_amount9782f,
        codeStates['setcategory_total_amount'] = setcategory_total_amount9782f,
        codeStates['attachment'] = attachment04414,
        codeStates['setattachment'] = setattachment04414,
        codeStates['receipt_image'] = receipt_image6afe2,
        codeStates['setreceipt_image'] = setreceipt_image6afe2,
        codeStates['enabletext'] = enabletextb4878,
        codeStates['setenabletext'] = setenabletextb4878,
        codeStates['comments'] = commentsf2394,
        codeStates['setcomments'] = setcommentsf2394,
        codeStates['iscommentenabled'] = iscommentenabled7244d,
        codeStates['setiscommentenabled'] = setiscommentenabled7244d,
        codeStates['clear'] = clear14ae7,
        codeStates['setclear'] = setclear14ae7,
        codeStates['save'] = saved507e,
        codeStates['setsave'] = setsaved507e,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Request_Screen_Daily_v1:{...pre?.Request_Screen_Daily_v1,comments:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrequest_daily_group44e40((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
    setrequest_daily_group44e40((prev: any) => ({ ...prev, comments: e?.target?.value }));
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
  if (commentsf2394?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `5 / 17`,gridRow: `148 / 166`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {commentsf2394?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { request_daily_group44e40?.comments != null && typeof request_daily_group44e40?.comments =='object' ? Object.keys(request_daily_group44e40?.comments)?.length ?  JSON.stringify(request_daily_group44e40?.comments,null ,2):"" : request_daily_group44e40?.comments||""}
      errorMessage={error}
      validationState={validate?.Request_Screen_Daily_v1?.comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacomments
