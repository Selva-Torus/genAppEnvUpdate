
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


const TextAreaaudit_inf_textarea = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'audit_metadata',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_info7b666, setaudit_info7b666}= useContext(TotalContext) as TotalContextProps;
  const {audit_inf_textareacaa14, setaudit_inf_textareacaa14}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "e79e6e98bbba059044203d52dd3dea6a",
        "b71b7aa30ad35ed9f0bcd9ed8abcaa14"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'audit_metadata',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='audit_metadata')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'audit_metadata',type:'text'}
        type={
          name:'audit_metadata',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.audit_metadata.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.audit_metadata.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.audit_metadata.type
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
  },[audit_inf_textareacaa14?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setaudit_groupdea6a((pre:any)=>({...pre,audit_metadata:""}))
    }else 
      prevRefreshRef.current= true
  },[audit_inf_textareacaa14?.refresh])

  const audit_groupdea6aRef = useRef<any>(audit_groupdea6a);
  useEffect(() => { audit_groupdea6aRef.current = audit_groupdea6a; }, [audit_groupdea6a]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b71b7aa30ad35ed9f0bcd9ed8abcaa14") {
        handleChange({target:{value:audit_groupdea6aRef?.current?.audit_metadata||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b71b7aa30ad35ed9f0bcd9ed8abcaa14") {
        handleBlur({target:{value:audit_groupdea6aRef?.current?.audit_metadata||""}});
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
        codeStates['new_access_group'] = new_access_group99475,
        codeStates['setnew_access_group'] = setnew_access_group99475,
        codeStates['new_access_group99475'] = new_access_group99475Props,
        codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
        codeStates['access_req__group'] = access_req__group580cf,
        codeStates['setaccess_req__group'] = setaccess_req__group580cf,
        codeStates['access_req__group580cf'] = access_req__group580cfProps,
        codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
        codeStates['business_just__group'] = business_just__group2c68d,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
        codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
        codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
        codeStates['valid_group'] = valid_group6c83b,
        codeStates['setvalid_group'] = setvalid_group6c83b,
        codeStates['valid_group6c83b'] = valid_group6c83bProps,
        codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
        codeStates['app_inf_group'] = app_inf_group5ad5c,
        codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
        codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
        codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
        codeStates['provision_group'] = provision_groupe166a,
        codeStates['setprovision_group'] = setprovision_groupe166a,
        codeStates['provision_groupe166a'] = provision_groupe166aProps,
        codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
        codeStates['prov_group'] = prov_groupce05f,
        codeStates['setprov_group'] = setprov_groupce05f,
        codeStates['prov_groupce05f'] = prov_groupce05fProps,
        codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
        codeStates['revocation_group'] = revocation_groupbee08,
        codeStates['setrevocation_group'] = setrevocation_groupbee08,
        codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
        codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
        codeStates['rev_group'] = rev_group1cf92,
        codeStates['setrev_group'] = setrev_group1cf92,
        codeStates['rev_group1cf92'] = rev_group1cf92Props,
        codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
        codeStates['audit_group'] = audit_groupdea6a,
        codeStates['setaudit_group'] = setaudit_groupdea6a,
        codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
        codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
        codeStates['audit_info'] = audit_info7b666,
        codeStates['setaudit_info'] = setaudit_info7b666,
        codeStates['audit_inf_textarea'] = audit_inf_textareacaa14,
        codeStates['setaudit_inf_textarea'] = setaudit_inf_textareacaa14,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,audit_metadata:undefined}}));
    setaudit_groupdea6a((prev: any) => ({ ...prev, audit_metadata: e?.target?.value }));
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
  if (audit_inf_textareacaa14?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `7 / 36`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {audit_inf_textareacaa14?.isDisabled ? true : false}
      placeholder = {'--'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Audit Metadata"
      pin = {'brick-brick'}
      value = { audit_groupdea6a?.audit_metadata != null && typeof audit_groupdea6a?.audit_metadata =='object' ? Object.keys(audit_groupdea6a?.audit_metadata)?.length ?  JSON.stringify(audit_groupdea6a?.audit_metadata,null ,2):"" : audit_groupdea6a?.audit_metadata||""}
      errorMessage={error}
      validationState={validate?.viewAccessRequest_v1?.audit_metadata ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreaaudit_inf_textarea
