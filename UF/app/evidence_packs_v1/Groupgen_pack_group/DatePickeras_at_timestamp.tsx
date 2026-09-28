

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickeras_at_timestamp = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [isRequiredData,setIsRequiredData]=useState<boolean>(false)
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  //showComponentAsPopup || showArtifactAsModal
    
  /////////////
   //another screen
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps  
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps  
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps  
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps  
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps  
  const {generate_btn339c9, setgenerate_btn339c9}= useContext(TotalContext) as TotalContextProps  
  const {asset_display_name70bbb, setasset_display_name70bbb}= useContext(TotalContext) as TotalContextProps  
  const {as_at_timestamp8327b, setas_at_timestamp8327b}= useContext(TotalContext) as TotalContextProps  
  const {sections_included9f322, setsections_included9f322}= useContext(TotalContext) as TotalContextProps  
  const {export_format_code07560, setexport_format_code07560}= useContext(TotalContext) as TotalContextProps  
  const {purpose_note26a17, setpurpose_note26a17}= useContext(TotalContext) as TotalContextProps  
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps  
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps  
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps  
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps  
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps  
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps  
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps  
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,auditEvidence_v1:{...pre?.auditEvidence_v1,as_at_timestamp:undefined}}));
  if (!date) {
    setgen_pack_groupbebe9((prev: any) => ({ ...prev, as_at_timestamp: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgen_pack_groupbebe9((prev: any) => ({ ...prev, as_at_timestamp: isoDate }))
  }catch (err: any) {
    //setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
}



const handleBlur=async () => {
    //validation
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "cbe1b3cc10294412827114df80dbebe9",
        "0bbd388a8e034a73b2a8d865f098327b"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
    codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
    codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
    codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
    codeStates['overall_tab_group'] = overall_tab_group97825,
    codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
    codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
    codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
    codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
    codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
    codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
    codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
    codeStates['gen_pack_group'] = gen_pack_groupbebe9,
    codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
    codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
    codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
    codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
    codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
    codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
    codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
    codeStates['generate_btn'] = generate_btn339c9,
    codeStates['setgenerate_btn'] = setgenerate_btn339c9,
    codeStates['asset_display_name'] = asset_display_name70bbb,
    codeStates['setasset_display_name'] = setasset_display_name70bbb,
    codeStates['as_at_timestamp'] = as_at_timestamp8327b,
    codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
    codeStates['sections_included'] = sections_included9f322,
    codeStates['setsections_included'] = setsections_included9f322,
    codeStates['export_format_code'] = export_format_code07560,
    codeStates['setexport_format_code'] = setexport_format_code07560,
    codeStates['purpose_note'] = purpose_note26a17,
    codeStates['setpurpose_note'] = setpurpose_note26a17,
    codeStates['export_pack_group'] = export_pack_group738c0,
    codeStates['setexport_pack_group'] = setexport_pack_group738c0,
    codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
    codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
    codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
    codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
    codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
    codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
    codeStates['export_pack_table'] = export_pack_table4a1c2,
    codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
    codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
    codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
    codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
    codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
    codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
    codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
    codeStates['bbb'] = bbb6cbd6,
    codeStates['setbbb'] = setbbb6cbd6,
    codeStates['bbb6cbd6'] = bbb6cbd6Props,
    codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgen_pack_groupbebe9Props((pre:any)=>({...pre,validation:true}))
 },[as_at_timestamp8327b?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (as_at_timestamp8327b?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `6 / 11`,gridRow: `13 / 27`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={gen_pack_groupbebe9?.as_at_timestamp}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {as_at_timestamp8327b?.isDisabled ? true : false}
      disabled= {as_at_timestamp8327b?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="As at"
      dateValidation=""
      validationState={validate?.auditEvidence_v1?.as_at_timestamp ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickeras_at_timestamp
