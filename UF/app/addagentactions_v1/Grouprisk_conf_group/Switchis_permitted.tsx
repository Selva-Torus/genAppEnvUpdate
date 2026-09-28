
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { useGlobal } from '@/context/GlobalContext'
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

const Switchis_permitted = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
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
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "8e2e0d0566354052794663d0857d00db",
      "b96b9798178f47a1ba2f1a2f2b6fcf04"
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
    if(prevRefreshRef.current)
      setrisk_conf_groupd00db((pre:any)=>({...pre,is_permitted:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_permittedfcf04?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setrisk_conf_groupd00db((prev: any) => ({ ...prev, is_permitted: checked }));
    let code:string= allCode;
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

  if (is_permittedfcf04?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `1 / 8`,gridRow: `9 / 14`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_permittedfcf04?.isDisabled ? true : false}
        content="Is Permitted"
        checked={risk_conf_groupd00db?.is_permitted || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_permitted



