
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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


const TextAreaadd_inf_textarea = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'add_inf_textarea',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_information858dc, setadditional_information858dc}= useContext(TotalContext) as TotalContextProps;
  const {add_inf_textarea3dd1e, setadd_inf_textarea3dd1e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "34d877ccaf2e420faa7ffe9e3c9284f6",
        "aacf17d1eb004268a12c818d62a3dd1e"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'add_inf_textarea',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='add_inf_textarea')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'add_inf_textarea',type:'text'}
        type={
          name:'add_inf_textarea',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.add_inf_textarea.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.add_inf_textarea.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.add_inf_textarea.type
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
  },[add_inf_textarea3dd1e?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setaddt__group284f6((pre:any)=>({...pre,add_inf_textarea:""}))
    }else 
      prevRefreshRef.current= true
  },[add_inf_textarea3dd1e?.refresh])

  const addt__group284f6Ref = useRef<any>(addt__group284f6);
  useEffect(() => { addt__group284f6Ref.current = addt__group284f6; }, [addt__group284f6]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "aacf17d1eb004268a12c818d62a3dd1e") {
        handleChange({target:{value:addt__group284f6Ref?.current?.add_inf_textarea||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "aacf17d1eb004268a12c818d62a3dd1e") {
        handleBlur({target:{value:addt__group284f6Ref?.current?.add_inf_textarea||""}});
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
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['additional_information'] = additional_information858dc,
        codeStates['setadditional_information'] = setadditional_information858dc,
        codeStates['add_inf_textarea'] = add_inf_textarea3dd1e,
        codeStates['setadd_inf_textarea'] = setadd_inf_textarea3dd1e,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,add_inf_textarea:undefined}}));
    setaddt__group284f6((prev: any) => ({ ...prev, add_inf_textarea: e?.target?.value }));
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
  if (add_inf_textarea3dd1e?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `8 / 29`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {add_inf_textarea3dd1e?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Additional Details"
      pin = {'brick-brick'}
      value = { addt__group284f6?.add_inf_textarea != null && typeof addt__group284f6?.add_inf_textarea =='object' ? Object.keys(addt__group284f6?.add_inf_textarea)?.length ?  JSON.stringify(addt__group284f6?.add_inf_textarea,null ,2):"" : addt__group284f6?.add_inf_textarea||""}
      errorMessage={error}
      validationState={validate?.newPerformanceCycle_v1?.add_inf_textarea ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaadd_inf_textarea
