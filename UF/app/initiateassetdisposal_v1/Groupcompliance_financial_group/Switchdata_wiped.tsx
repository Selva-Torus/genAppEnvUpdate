
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Switchdata_wiped = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode] = useState<string>("");
  const [ruleCode,setRuleCode] = useState<any>("");
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
 /////////////
   //another screen
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial664f8, setcompliance_financial664f8}= useContext(TotalContext) as TotalContextProps;
  const {approval_reference5e1aa, setapproval_reference5e1aa}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameac8f7, setwitness_nameac8f7}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodfe1e6, setdata_wipe_methodfe1e6}= useContext(TotalContext) as TotalContextProps;
  const {data_wipedad12b, setdata_wipedad12b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_valued21f4, setdisposal_valued21f4}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost031f6, setdisposal_cost031f6}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount2eb0e, setresale_amount2eb0e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "16048a3a05ac4926a046632180f1f9bc",
      "1f5febcaebbe48b6979f6353220ad12b"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    setcompliance_financial_group1f9bc((pre:any)=>({...pre,data_wiped:null}))
    handleMapperValue()
  },[data_wipedad12b?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_assetdisposal_v1Props) && dfd_assetdisposal_v1Props?.length == 1){
      setcompliance_financial_group1f9bc((pre:any)=>({...pre,data_wiped:dfd_assetdisposal_v1Props[0]?.data_wiped}))
    }
  },[dfd_assetdisposal_v1Props])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setcompliance_financial_group1f9bc((prev: any) => ({ ...prev, data_wiped: checked }));
    let code:string= allCode;
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
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['compliance_financial'] = compliance_financial664f8,
        codeStates['setcompliance_financial'] = setcompliance_financial664f8,
        codeStates['approval_reference'] = approval_reference5e1aa,
        codeStates['setapproval_reference'] = setapproval_reference5e1aa,
        codeStates['witness_name'] = witness_nameac8f7,
        codeStates['setwitness_name'] = setwitness_nameac8f7,
        codeStates['data_wipe_method'] = data_wipe_methodfe1e6,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodfe1e6,
        codeStates['data_wiped'] = data_wipedad12b,
        codeStates['setdata_wiped'] = setdata_wipedad12b,
        codeStates['disposal_value'] = disposal_valued21f4,
        codeStates['setdisposal_value'] = setdisposal_valued21f4,
        codeStates['disposal_cost'] = disposal_cost031f6,
        codeStates['setdisposal_cost'] = setdisposal_cost031f6,
        codeStates['resale_amount'] = resale_amount2eb0e,
        codeStates['setresale_amount'] = setresale_amount2eb0e,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
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

  if (data_wipedad12b?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `19 / 21`,gridRow: `8 / 16`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        headerText="Data Wiped"
        headerPosition="top"
        disabled= {data_wipedad12b?.isDisabled ? true : false}
        content="content"
        checkedContent="Yes"                                                                                                                                             
        uncheckedContent="No"
        checked={compliance_financial_group1f9bc?.data_wiped || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchdata_wiped



