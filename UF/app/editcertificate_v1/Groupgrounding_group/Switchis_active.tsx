
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
import UOmapperData from '@/context/dfdmapperContolnames.json';

const Switchis_active = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_textde33a, setgrounding_textde33a}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date2f0e9, settext_effective_date2f0e9}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_1e9a79, settext_effective_date_1e9a79}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_283f74, settext_effective_date_283f74}= useContext(TotalContext) as TotalContextProps;
  const {effective_date585df, seteffective_date585df}= useContext(TotalContext) as TotalContextProps;
  const {expiry_dated0967, setexpiry_dated0967}= useContext(TotalContext) as TotalContextProps;
  const {completed_on67679, setcompleted_on67679}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_textea047, setcert_temp_textea047}= useContext(TotalContext) as TotalContextProps;
  const {template_name5834f, settemplate_name5834f}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationa8241, setis_recertificationa8241}= useContext(TotalContext) as TotalContextProps;
  const {is_active72c74, setis_active72c74}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "c443411dc1584fcda4ad9d757eedf2f5",
      "d79d5fd02155131e20f0f103d9372c74"
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
      setgrounding_groupdf2f5((pre:any)=>({...pre,is_active:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_active72c74?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setgrounding_groupdf2f5((prev: any) => ({ ...prev, is_active: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_text'] = grounding_textde33a,
        codeStates['setgrounding_text'] = setgrounding_textde33a,
        codeStates['text_effective_date'] = text_effective_date2f0e9,
        codeStates['settext_effective_date'] = settext_effective_date2f0e9,
        codeStates['text_effective_date_1'] = text_effective_date_1e9a79,
        codeStates['settext_effective_date_1'] = settext_effective_date_1e9a79,
        codeStates['text_effective_date_2'] = text_effective_date_283f74,
        codeStates['settext_effective_date_2'] = settext_effective_date_283f74,
        codeStates['effective_date'] = effective_date585df,
        codeStates['seteffective_date'] = seteffective_date585df,
        codeStates['expiry_date'] = expiry_dated0967,
        codeStates['setexpiry_date'] = setexpiry_dated0967,
        codeStates['completed_on'] = completed_on67679,
        codeStates['setcompleted_on'] = setcompleted_on67679,
        codeStates['cert_temp_text'] = cert_temp_textea047,
        codeStates['setcert_temp_text'] = setcert_temp_textea047,
        codeStates['template_name'] = template_name5834f,
        codeStates['settemplate_name'] = settemplate_name5834f,
        codeStates['is_recertification'] = is_recertificationa8241,
        codeStates['setis_recertification'] = setis_recertificationa8241,
        codeStates['is_active'] = is_active72c74,
        codeStates['setis_active'] = setis_active72c74,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
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

  if (is_active72c74?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `17 / 25`,gridRow: `31 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_active72c74?.isDisabled ? true : false}
        content="Is Active"
        checked={grounding_groupdf2f5?.is_active || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_active



