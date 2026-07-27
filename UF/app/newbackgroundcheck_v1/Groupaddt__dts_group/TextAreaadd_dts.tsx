
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


const TextAreaadd_dts = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'additional_details',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {new_access_group03ace, setnew_access_group03ace}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group03aceProps, setnew_access_group03aceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45d, setaccess_req__groupdd45d}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45dProps, setaccess_req__groupdd45dProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865, setaddt__dts_group0d865}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865Props, setaddt__dts_group0d865Props}= useContext(TotalContext) as TotalContextProps;
  const {add_inf7c94d, setadd_inf7c94d}= useContext(TotalContext) as TotalContextProps;
  const {notes14713, setnotes14713}= useContext(TotalContext) as TotalContextProps;
  const {add_dts8a152, setadd_dts8a152}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "1821c4e38fd97308ea72ccd29820d865",
        "bfc55319fb51d9255946d7b92de8a152"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'additional_details',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='additional_details')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'additional_details',type:'text'}
        type={
          name:'additional_details',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type
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
  },[add_dts8a152?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setaddt__dts_group0d865((pre:any)=>({...pre,additional_details:""}))
    }else 
      prevRefreshRef.current= true
  },[add_dts8a152?.refresh])

  const addt__dts_group0d865Ref = useRef<any>(addt__dts_group0d865);
  useEffect(() => { addt__dts_group0d865Ref.current = addt__dts_group0d865; }, [addt__dts_group0d865]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "bfc55319fb51d9255946d7b92de8a152") {
        handleChange({target:{value:addt__dts_group0d865Ref?.current?.additional_details||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "bfc55319fb51d9255946d7b92de8a152") {
        handleBlur({target:{value:addt__dts_group0d865Ref?.current?.additional_details||""}});
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
        codeStates['new_access_group'] = new_access_group03ace,
        codeStates['setnew_access_group'] = setnew_access_group03ace,
        codeStates['new_access_group03ace'] = new_access_group03aceProps,
        codeStates['setnew_access_group03ace'] = setnew_access_group03aceProps,
        codeStates['access_req__group'] = access_req__groupdd45d,
        codeStates['setaccess_req__group'] = setaccess_req__groupdd45d,
        codeStates['access_req__groupdd45d'] = access_req__groupdd45dProps,
        codeStates['setaccess_req__groupdd45d'] = setaccess_req__groupdd45dProps,
        codeStates['addt__dts_group'] = addt__dts_group0d865,
        codeStates['setaddt__dts_group'] = setaddt__dts_group0d865,
        codeStates['addt__dts_group0d865'] = addt__dts_group0d865Props,
        codeStates['setaddt__dts_group0d865'] = setaddt__dts_group0d865Props,
        codeStates['add_inf'] = add_inf7c94d,
        codeStates['setadd_inf'] = setadd_inf7c94d,
        codeStates['notes'] = notes14713,
        codeStates['setnotes'] = setnotes14713,
        codeStates['add_dts'] = add_dts8a152,
        codeStates['setadd_dts'] = setadd_dts8a152,
        codeStates['dynamicactions'] = dynamicactions2fc7f,
        codeStates['setdynamicactions'] = setdynamicactions2fc7f,
        codeStates['dynamicactions2fc7f'] = dynamicactions2fc7fProps,
        codeStates['setdynamicactions2fc7f'] = setdynamicactions2fc7fProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,additional_details:undefined}}));
    setaddt__dts_group0d865((prev: any) => ({ ...prev, additional_details: e?.target?.value }));
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
  if (add_dts8a152?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `7 / 24`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {add_dts8a152?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Additional Details"
      pin = {'brick-brick'}
      value = { addt__dts_group0d865?.additional_details != null && typeof addt__dts_group0d865?.additional_details =='object' ? Object.keys(addt__dts_group0d865?.additional_details)?.length ?  JSON.stringify(addt__dts_group0d865?.additional_details,null ,2):"" : addt__dts_group0d865?.additional_details||""}
      errorMessage={error}
      validationState={validate?.newBackgroundCheck_v1?.additional_details ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaadd_dts
