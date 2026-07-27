
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


const TextAreaapproval_comments = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'approval_comments',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {new_access_group1e8f3, setnew_access_group1e8f3}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group1e8f3Props, setnew_access_group1e8f3Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221, setaccess_req__group3a221}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221Props, setaccess_req__group3a221Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21c, setvalid_groupec21c}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21cProps, setvalid_groupec21cProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43d, setapp_inf_groupea43d}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43dProps, setapp_inf_groupea43dProps}= useContext(TotalContext) as TotalContextProps;
  const {app_infa651b, setapp_infa651b}= useContext(TotalContext) as TotalContextProps;
  const {approval_comments2f3a8, setapproval_comments2f3a8}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason1b936, setreject_reason1b936}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "8bab233f52ecff8f1b0b169bc96ea43d",
        "75bcebaf95ceb26347de5915cca2f3a8"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'approval_comments',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='approval_comments')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'approval_comments',type:'text'}
        type={
          name:'approval_comments',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.approval_comments.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.approval_comments.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.approval_comments.type
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
  },[approval_comments2f3a8?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setapp_inf_groupea43d((pre:any)=>({...pre,approval_comments:""}))
    }else 
      prevRefreshRef.current= true
  },[approval_comments2f3a8?.refresh])

  const app_inf_groupea43dRef = useRef<any>(app_inf_groupea43d);
  useEffect(() => { app_inf_groupea43dRef.current = app_inf_groupea43d; }, [app_inf_groupea43d]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "75bcebaf95ceb26347de5915cca2f3a8") {
        handleChange({target:{value:app_inf_groupea43dRef?.current?.approval_comments||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "75bcebaf95ceb26347de5915cca2f3a8") {
        handleBlur({target:{value:app_inf_groupea43dRef?.current?.approval_comments||""}});
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
        codeStates['new_access_group'] = new_access_group1e8f3,
        codeStates['setnew_access_group'] = setnew_access_group1e8f3,
        codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
        codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
        codeStates['access_req__group'] = access_req__group3a221,
        codeStates['setaccess_req__group'] = setaccess_req__group3a221,
        codeStates['access_req__group3a221'] = access_req__group3a221Props,
        codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['valid_group'] = valid_groupec21c,
        codeStates['setvalid_group'] = setvalid_groupec21c,
        codeStates['valid_groupec21c'] = valid_groupec21cProps,
        codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
        codeStates['app_inf_group'] = app_inf_groupea43d,
        codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
        codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
        codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
        codeStates['app_inf'] = app_infa651b,
        codeStates['setapp_inf'] = setapp_infa651b,
        codeStates['approval_comments'] = approval_comments2f3a8,
        codeStates['setapproval_comments'] = setapproval_comments2f3a8,
        codeStates['reject_reason'] = reject_reason1b936,
        codeStates['setreject_reason'] = setreject_reason1b936,
        codeStates['provision_group'] = provision_group4e2a2,
        codeStates['setprovision_group'] = setprovision_group4e2a2,
        codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
        codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
        codeStates['prov_group'] = prov_group3b4eb,
        codeStates['setprov_group'] = setprov_group3b4eb,
        codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
        codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
        codeStates['revocation_group'] = revocation_groupc3044,
        codeStates['setrevocation_group'] = setrevocation_groupc3044,
        codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
        codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
        codeStates['rev_group'] = rev_groupa6a87,
        codeStates['setrev_group'] = setrev_groupa6a87,
        codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
        codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
        codeStates['audit_group'] = audit_groupc16c3,
        codeStates['setaudit_group'] = setaudit_groupc16c3,
        codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
        codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
        codeStates['dynamicactions'] = dynamicactions820e8,
        codeStates['setdynamicactions'] = setdynamicactions820e8,
        codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
        codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,approval_comments:undefined}}));
    setapp_inf_groupea43d((prev: any) => ({ ...prev, approval_comments: e?.target?.value }));
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
  if (approval_comments2f3a8?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `7 / 36`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {approval_comments2f3a8?.isDisabled ? true : false}
      placeholder = {'Approved for the requested access..'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Approval Comments"
      pin = {'brick-brick'}
      value = { app_inf_groupea43d?.approval_comments != null && typeof app_inf_groupea43d?.approval_comments =='object' ? Object.keys(app_inf_groupea43d?.approval_comments)?.length ?  JSON.stringify(app_inf_groupea43d?.approval_comments,null ,2):"" : app_inf_groupea43d?.approval_comments||""}
      errorMessage={error}
      validationState={validate?.newAccessRequest_v1?.approval_comments ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaapproval_comments
