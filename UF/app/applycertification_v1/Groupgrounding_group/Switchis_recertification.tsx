
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

const Switchis_recertification = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901, setgrounding_text80901}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text4e90a, setcert_code_text4e90a}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_text88aa1, setcert_temp_text88aa1}= useContext(TotalContext) as TotalContextProps;
  const {text_current_stage_seqf99a6, settext_current_stage_seqf99a6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code601b0, setcert_code601b0}= useContext(TotalContext) as TotalContextProps;
  const {template_namee23cf, settemplate_namee23cf}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code3cbb6, setstage_type_code3cbb6}= useContext(TotalContext) as TotalContextProps;
  const {text_status5e33f, settext_status5e33f}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code047b5, setcert_status_code047b5}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationbdc1e, setis_recertificationbdc1e}= useContext(TotalContext) as TotalContextProps;
  const {is_actived0a4e, setis_actived0a4e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "c69fba169af09340a1ee1388b0464d9d",
      "55e96a75bcaccf4d7933bf0c36bbdc1e"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
      await delay(1000)
      handleChange(grounding_group64d9d?.is_recertification||false,orchestrationData?.data?.rule?.nodes)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      setgrounding_group64d9d((pre:any)=>({...pre,is_recertification:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_recertificationbdc1e?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setgrounding_group64d9d((prev: any) => ({ ...prev, is_recertification: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
        codeStates['grounding_text'] = grounding_text80901,
        codeStates['setgrounding_text'] = setgrounding_text80901,
        codeStates['cert_code_text'] = cert_code_text4e90a,
        codeStates['setcert_code_text'] = setcert_code_text4e90a,
        codeStates['cert_temp_text'] = cert_temp_text88aa1,
        codeStates['setcert_temp_text'] = setcert_temp_text88aa1,
        codeStates['text_current_stage_seq'] = text_current_stage_seqf99a6,
        codeStates['settext_current_stage_seq'] = settext_current_stage_seqf99a6,
        codeStates['cert_code'] = cert_code601b0,
        codeStates['setcert_code'] = setcert_code601b0,
        codeStates['template_name'] = template_namee23cf,
        codeStates['settemplate_name'] = settemplate_namee23cf,
        codeStates['stage_type_code'] = stage_type_code3cbb6,
        codeStates['setstage_type_code'] = setstage_type_code3cbb6,
        codeStates['text_status'] = text_status5e33f,
        codeStates['settext_status'] = settext_status5e33f,
        codeStates['cert_status_code'] = cert_status_code047b5,
        codeStates['setcert_status_code'] = setcert_status_code047b5,
        codeStates['is_recertification'] = is_recertificationbdc1e,
        codeStates['setis_recertification'] = setis_recertificationbdc1e,
        codeStates['is_active'] = is_actived0a4e,
        codeStates['setis_active'] = setis_actived0a4e,
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

  if (is_recertificationbdc1e?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `10 / 14`,gridRow: `28 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_recertificationbdc1e?.isDisabled ? true : false}
        content="Is Recertification"
        checked={grounding_group64d9d?.is_recertification || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_recertification



