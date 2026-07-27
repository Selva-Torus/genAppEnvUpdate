
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


const TextArearevoked_reason = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'revoked_reason',type:"string"})
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
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps;
  const {revoked_by47ca5, setrevoked_by47ca5}= useContext(TotalContext) as TotalContextProps;
  const {revok_atc9732, setrevok_atc9732}= useContext(TotalContext) as TotalContextProps;
  const {revoked_reason43c9c, setrevoked_reason43c9c}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "79c8ea2f4c06beb1534cb019bebc3044",
        "c8f72453ff66e736c31fe0ecc5d43c9c"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'revoked_reason',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='revoked_reason')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'revoked_reason',type:'text'}
        type={
          name:'revoked_reason',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.revoked_reason.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.revoked_reason.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.revoked_reason.type
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
  },[revoked_reason43c9c?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrevocation_groupc3044((pre:any)=>({...pre,revoked_reason:""}))
    }else 
      prevRefreshRef.current= true
  },[revoked_reason43c9c?.refresh])

  const revocation_groupc3044Ref = useRef<any>(revocation_groupc3044);
  useEffect(() => { revocation_groupc3044Ref.current = revocation_groupc3044; }, [revocation_groupc3044]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "c8f72453ff66e736c31fe0ecc5d43c9c") {
        handleChange({target:{value:revocation_groupc3044Ref?.current?.revoked_reason||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "c8f72453ff66e736c31fe0ecc5d43c9c") {
        handleBlur({target:{value:revocation_groupc3044Ref?.current?.revoked_reason||""}});
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
        codeStates['revoked_by'] = revoked_by47ca5,
        codeStates['setrevoked_by'] = setrevoked_by47ca5,
        codeStates['revok_at'] = revok_atc9732,
        codeStates['setrevok_at'] = setrevok_atc9732,
        codeStates['revoked_reason'] = revoked_reason43c9c,
        codeStates['setrevoked_reason'] = setrevoked_reason43c9c,
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
    setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,revoked_reason:undefined}}));
    setrevocation_groupc3044((prev: any) => ({ ...prev, revoked_reason: e?.target?.value }));
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
  if (revoked_reason43c9c?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `21 / 36`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {revoked_reason43c9c?.isDisabled ? true : false}
      placeholder = {'Enter reason for revocation...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Revoked Reason"
      pin = {'brick-brick'}
      value = { revocation_groupc3044?.revoked_reason != null && typeof revocation_groupc3044?.revoked_reason =='object' ? Object.keys(revocation_groupc3044?.revoked_reason)?.length ?  JSON.stringify(revocation_groupc3044?.revoked_reason,null ,2):"" : revocation_groupc3044?.revoked_reason||""}
      errorMessage={error}
      validationState={validate?.newAccessRequest_v1?.revoked_reason ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextArearevoked_reason
