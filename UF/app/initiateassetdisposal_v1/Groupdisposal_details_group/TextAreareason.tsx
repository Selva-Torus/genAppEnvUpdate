
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


const TextAreareason = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'reason',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
 /////////////
   //another screen
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details0c71e, setdisposal_details0c71e}= useContext(TotalContext) as TotalContextProps;
  const {vendor_nameabdbb, setvendor_nameabdbb}= useContext(TotalContext) as TotalContextProps;
  const {asset_name819e8, setasset_name819e8}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methoddeb30, setdisposal_methoddeb30}= useContext(TotalContext) as TotalContextProps;
  const {disposal_date12263, setdisposal_date12263}= useContext(TotalContext) as TotalContextProps;
  const {reasonadb68, setreasonadb68}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "2693374bb2d64ed88d121dd7c5ee1b0c",
        "5aead1505a2e425aa776af218bfadb68"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'reason',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='reason')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'reason',type:'text'}
        type={
          name:'reason',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type
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
  },[reasonadb68?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setdisposal_details_groupe1b0c((pre:any)=>({...pre,reason:""}))
    }else 
      prevRefreshRef.current= true
  },[reasonadb68?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
        codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
        codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
        codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
        codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
        codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
        codeStates['disposal_details'] = disposal_details0c71e,
        codeStates['setdisposal_details'] = setdisposal_details0c71e,
        codeStates['vendor_name'] = vendor_nameabdbb,
        codeStates['setvendor_name'] = setvendor_nameabdbb,
        codeStates['asset_name'] = asset_name819e8,
        codeStates['setasset_name'] = setasset_name819e8,
        codeStates['disposal_method'] = disposal_methoddeb30,
        codeStates['setdisposal_method'] = setdisposal_methoddeb30,
        codeStates['disposal_date'] = disposal_date12263,
        codeStates['setdisposal_date'] = setdisposal_date12263,
        codeStates['reason'] = reasonadb68,
        codeStates['setreason'] = setreasonadb68,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    try{
    //setIsProcessing(true);
    setdisposal_details_groupe1b0c((prev: any) => ({ ...prev, reason: e?.target?.value }));
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
  if (reasonadb68?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `9 / 25`,gridRow: `21 / 33`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {reasonadb68?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Reason"
      pin = {'brick-brick'}
      value = { disposal_details_groupe1b0c?.reason != null && typeof disposal_details_groupe1b0c?.reason =='object' ? Object.keys(disposal_details_groupe1b0c?.reason)?.length ?  JSON.stringify(disposal_details_groupe1b0c?.reason,null ,2):"" : disposal_details_groupe1b0c?.reason||""}
    />
  </div>
  )
}

export default TextAreareason
