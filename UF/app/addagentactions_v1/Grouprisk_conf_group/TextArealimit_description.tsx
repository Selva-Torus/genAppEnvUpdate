
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


const TextArealimit_description = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'limit_description',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_group0af1a, setoverall_group0af1a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0af1aProps, setoverall_group0af1aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200fe, setaction_details_group200fe}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200feProps, setaction_details_group200feProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9, setaction_detail_groupd36e9}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9Props, setaction_detail_groupd36e9Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00db, setrisk_conf_groupd00db}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00dbProps, setrisk_conf_groupd00dbProps}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_textf8014, setlifecycle_textf8014}= useContext(TotalContext) as TotalContextProps;
  const {is_permittedfcf04, setis_permittedfcf04}= useContext(TotalContext) as TotalContextProps;
  const {is_high_riskde925, setis_high_riskde925}= useContext(TotalContext) as TotalContextProps;
  const {approval_required95630, setapproval_required95630}= useContext(TotalContext) as TotalContextProps;
  const {limit_descriptionc034d, setlimit_descriptionc034d}= useContext(TotalContext) as TotalContextProps;
  const {is_activecf5aa, setis_activecf5aa}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6f, setdynamicactions86b6f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6fProps, setdynamicactions86b6fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "8e2e0d0566354052794663d0857d00db",
        "acec124959ea4632952e4bb8eaac034d"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'limit_description',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='limit_description')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'limit_description',type:'text'}
        type={
          name:'limit_description',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.limit_description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.limit_description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.limit_description.type
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
  },[limit_descriptionc034d?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrisk_conf_groupd00db((pre:any)=>({...pre,limit_description:""}))
    }else 
      prevRefreshRef.current= true
  },[limit_descriptionc034d?.refresh])

  const risk_conf_groupd00dbRef = useRef<any>(risk_conf_groupd00db);
  useEffect(() => { risk_conf_groupd00dbRef.current = risk_conf_groupd00db; }, [risk_conf_groupd00db]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "acec124959ea4632952e4bb8eaac034d") {
        handleChange({target:{value:risk_conf_groupd00dbRef?.current?.limit_description||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "acec124959ea4632952e4bb8eaac034d") {
        handleBlur({target:{value:risk_conf_groupd00dbRef?.current?.limit_description||""}});
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
        codeStates['overall_group'] = overall_group0af1a,
        codeStates['setoverall_group'] = setoverall_group0af1a,
        codeStates['overall_group0af1a'] = overall_group0af1aProps,
        codeStates['setoverall_group0af1a'] = setoverall_group0af1aProps,
        codeStates['action_details_group'] = action_details_group200fe,
        codeStates['setaction_details_group'] = setaction_details_group200fe,
        codeStates['action_details_group200fe'] = action_details_group200feProps,
        codeStates['setaction_details_group200fe'] = setaction_details_group200feProps,
        codeStates['action_detail_group'] = action_detail_groupd36e9,
        codeStates['setaction_detail_group'] = setaction_detail_groupd36e9,
        codeStates['action_detail_groupd36e9'] = action_detail_groupd36e9Props,
        codeStates['setaction_detail_groupd36e9'] = setaction_detail_groupd36e9Props,
        codeStates['risk_conf_group'] = risk_conf_groupd00db,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd00db,
        codeStates['risk_conf_groupd00db'] = risk_conf_groupd00dbProps,
        codeStates['setrisk_conf_groupd00db'] = setrisk_conf_groupd00dbProps,
        codeStates['lifecycle_text'] = lifecycle_textf8014,
        codeStates['setlifecycle_text'] = setlifecycle_textf8014,
        codeStates['is_permitted'] = is_permittedfcf04,
        codeStates['setis_permitted'] = setis_permittedfcf04,
        codeStates['is_high_risk'] = is_high_riskde925,
        codeStates['setis_high_risk'] = setis_high_riskde925,
        codeStates['approval_required'] = approval_required95630,
        codeStates['setapproval_required'] = setapproval_required95630,
        codeStates['limit_description'] = limit_descriptionc034d,
        codeStates['setlimit_description'] = setlimit_descriptionc034d,
        codeStates['is_active'] = is_activecf5aa,
        codeStates['setis_active'] = setis_activecf5aa,
        codeStates['dynamicactions'] = dynamicactions86b6f,
        codeStates['setdynamicactions'] = setdynamicactions86b6f,
        codeStates['dynamicactions86b6f'] = dynamicactions86b6fProps,
        codeStates['setdynamicactions86b6f'] = setdynamicactions86b6fProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,addAgentActions_v1:{...pre?.addAgentActions_v1,limit_description:undefined}}));
    if(dynamicStateandType.type=="number"){
    setrisk_conf_groupd00db((prev: any) => ({ ...prev, limit_description: +e?.target?.value }));
    }
    else{
    setrisk_conf_groupd00db((prev: any) => ({ ...prev, limit_description: e?.target?.value }));
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
  if (limit_descriptionc034d?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 18`,gridRow: `17 / 36`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {limit_descriptionc034d?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { risk_conf_groupd00db?.limit_description != null && typeof risk_conf_groupd00db?.limit_description =='object' ? Object.keys(risk_conf_groupd00db?.limit_description)?.length ?  JSON.stringify(risk_conf_groupd00db?.limit_description,null ,2):"" : risk_conf_groupd00db?.limit_description||""}
      errorMessage={error}
      validationState={validate?.addAgentActions_v1?.limit_description ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextArealimit_description
