
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
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreacomments = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "5a69b1d62572431ab2933ca7cf0571d2",
        "cb380e65e0664bb88c24afbee54e3b5b"
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
  },[commentse3b5b?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroup571d2((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[commentse3b5b?.refresh])

  const group571d2Ref = useRef<any>(group571d2);
  useEffect(() => { group571d2Ref.current = group571d2; }, [group571d2]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cb380e65e0664bb88c24afbee54e3b5b") {
        handleChange({target:{value:group571d2Ref?.current?.comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cb380e65e0664bb88c24afbee54e3b5b") {
        handleBlur({target:{value:group571d2Ref?.current?.comments||""}});
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
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,Request_form_v1:{...pre?.Request_form_v1,comments:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup571d2((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
    setgroup571d2((prev: any) => ({ ...prev, comments: e?.target?.value }));
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
  if (commentse3b5b?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `5 / 20`,gridRow: `117 / 134`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {commentse3b5b?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { group571d2?.comments != null && typeof group571d2?.comments =='object' ? Object.keys(group571d2?.comments)?.length ?  JSON.stringify(group571d2?.comments,null ,2):"" : group571d2?.comments||""}
      errorMessage={error}
      validationState={validate?.Request_form_v1?.comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacomments
