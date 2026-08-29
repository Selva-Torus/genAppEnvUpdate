
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'description',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps;
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps;
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps;
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps;
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "05177fac499640d4bf45a199a95494e0",
        "28dc2bc8f2c4493bb1f6423f7207171e"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'description',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='description')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'description',type:'text'}
        type={
          name:'description',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type
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
  },[comments7171e?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgrouparray494e0_5((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[comments7171e?.refresh])

  const grouparray494e0_5Ref = useRef<any>(grouparray494e0_5);
  useEffect(() => { grouparray494e0_5Ref.current = grouparray494e0_5; }, [grouparray494e0_5]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "28dc2bc8f2c4493bb1f6423f7207171e") {
        handleChange({target:{value:grouparray494e0_5Ref?.current?.description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "28dc2bc8f2c4493bb1f6423f7207171e") {
        handleBlur({target:{value:grouparray494e0_5Ref?.current?.description||""}});
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
        codeStates['grouparray49'] = grouparray494e0_0,
        codeStates['setgrouparray49'] = setgrouparray494e0_0,
        codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
        codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
        codeStates['grouparray49'] = grouparray494e0_1,
        codeStates['setgrouparray49'] = setgrouparray494e0_1,
        codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
        codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
        codeStates['grouparray49'] = grouparray494e0_2,
        codeStates['setgrouparray49'] = setgrouparray494e0_2,
        codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
        codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
        codeStates['grouparray49'] = grouparray494e0_3,
        codeStates['setgrouparray49'] = setgrouparray494e0_3,
        codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
        codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
        codeStates['grouparray49'] = grouparray494e0_4,
        codeStates['setgrouparray49'] = setgrouparray494e0_4,
        codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
        codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
        codeStates['grouparray49'] = grouparray494e0_5,
        codeStates['setgrouparray49'] = setgrouparray494e0_5,
        codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
        codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
        codeStates['group'] = group84b9c,
        codeStates['setgroup'] = setgroup84b9c,
        codeStates['group84b9c'] = group84b9cProps,
        codeStates['setgroup84b9c'] = setgroup84b9cProps,
        codeStates['grouparray'] = grouparray494e0,
        codeStates['setgrouparray'] = setgrouparray494e0,
        codeStates['grouparray494e0'] = grouparray494e0Props,
        codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
        codeStates['daily_expense'] = daily_expense3c178,
        codeStates['setdaily_expense'] = setdaily_expense3c178,
        codeStates['expense_name'] = expense_namec83ee,
        codeStates['setexpense_name'] = setexpense_namec83ee,
        codeStates['email'] = email0c3ca,
        codeStates['setemail'] = setemail0c3ca,
        codeStates['expense_date'] = expense_datee6e16,
        codeStates['setexpense_date'] = setexpense_datee6e16,
        codeStates['claim_category'] = claim_categoryf03f1,
        codeStates['setclaim_category'] = setclaim_categoryf03f1,
        codeStates['category_total_amount'] = category_total_amount49375,
        codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
        codeStates['receipt_image'] = receipt_image4f1bf,
        codeStates['setreceipt_image'] = setreceipt_image4f1bf,
        codeStates['comments'] = comments7171e,
        codeStates['setcomments'] = setcomments7171e,
        codeStates['grouparray_0'] = grouparray494e0_0,
        codeStates['setgrouparray_0'] = setgrouparray494e0_0,
        codeStates['grouparray_1'] = grouparray494e0_1,
        codeStates['setgrouparray_1'] = setgrouparray494e0_1,
        codeStates['grouparray_2'] = grouparray494e0_2,
        codeStates['setgrouparray_2'] = setgrouparray494e0_2,
        codeStates['grouparray_3'] = grouparray494e0_3,
        codeStates['setgrouparray_3'] = setgrouparray494e0_3,
        codeStates['grouparray_4'] = grouparray494e0_4,
        codeStates['setgrouparray_4'] = setgrouparray494e0_4,
        codeStates['grouparray_5'] = grouparray494e0_5,
        codeStates['setgrouparray_5'] = setgrouparray494e0_5,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,GroupArray_v1:{...pre?.GroupArray_v1,description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrouparray494e0_5((prev: any) => ({ ...prev, description: +e?.target?.value }));
    }
    else{
    setgrouparray494e0_5((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (comments7171e?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `10 / 17`,gridRow: `139 / 159`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {comments7171e?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { grouparray494e0_5?.description != null && typeof grouparray494e0_5?.description =='object' ? Object.keys(grouparray494e0_5?.description)?.length ?  JSON.stringify(grouparray494e0_5?.description,null ,2):"" : grouparray494e0_5?.description||""}
      errorMessage={error}
      validationState={validate?.GroupArray_v1?.description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreacomments
