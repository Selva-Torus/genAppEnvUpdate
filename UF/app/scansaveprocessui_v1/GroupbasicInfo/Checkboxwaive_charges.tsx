

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Text } from '@/components/Text';
import { Checkbox } from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useGlobal } from '@/context/GlobalContext'


const Checkboxwaive_charges = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'waive_charges',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {overallgroup01c61, setoverallgroup01c61}= useContext(TotalContext) as TotalContextProps;  
  const {overallgroup01c61Props, setoverallgroup01c61Props}= useContext(TotalContext) as TotalContextProps;  
  const {controlgroupda197, setcontrolgroupda197}= useContext(TotalContext) as TotalContextProps;  
  const {controlgroupda197Props, setcontrolgroupda197Props}= useContext(TotalContext) as TotalContextProps;  
  const {control_tab_groupbc3e2, setcontrol_tab_groupbc3e2}= useContext(TotalContext) as TotalContextProps;  
  const {control_tab_groupbc3e2Props, setcontrol_tab_groupbc3e2Props}= useContext(TotalContext) as TotalContextProps;  
  const {button_group74f3e, setbutton_group74f3e}= useContext(TotalContext) as TotalContextProps;  
  const {button_group74f3eProps, setbutton_group74f3eProps}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_infofd0aa, setrtgs_infofd0aa}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_infofd0aaProps, setrtgs_infofd0aaProps}= useContext(TotalContext) as TotalContextProps;  
  const {allcontrols71c54, setallcontrols71c54}= useContext(TotalContext) as TotalContextProps;  
  const {allcontrols71c54Props, setallcontrols71c54Props}= useContext(TotalContext) as TotalContextProps;  
  const {commoninfof4607, setcommoninfof4607}= useContext(TotalContext) as TotalContextProps;  
  const {commoninfof4607Props, setcommoninfof4607Props}= useContext(TotalContext) as TotalContextProps;  
  const {basicinfo3d198, setbasicinfo3d198}= useContext(TotalContext) as TotalContextProps;  
  const {basicinfo3d198Props, setbasicinfo3d198Props}= useContext(TotalContext) as TotalContextProps;  
  const {basic_info216f3, setbasic_info216f3}= useContext(TotalContext) as TotalContextProps;  
  const {waive_charges929e5, setwaive_charges929e5}= useContext(TotalContext) as TotalContextProps;  
  const {cr_accounta818b, setcr_accounta818b}= useContext(TotalContext) as TotalContextProps;  
  const {cr_namea4b34, setcr_namea4b34}= useContext(TotalContext) as TotalContextProps;  
  const {cr_bank_code8a2bc, setcr_bank_code8a2bc}= useContext(TotalContext) as TotalContextProps;  
  const {cr_bank_name434eb, setcr_bank_name434eb}= useContext(TotalContext) as TotalContextProps;  
  const {cr_bank_bic3d26f, setcr_bank_bic3d26f}= useContext(TotalContext) as TotalContextProps;  
  const {forex_currency65e0b, setforex_currency65e0b}= useContext(TotalContext) as TotalContextProps;  
  const {exchange_rate88caf, setexchange_rate88caf}= useContext(TotalContext) as TotalContextProps;  
  const {rate_codee56ad, setrate_codee56ad}= useContext(TotalContext) as TotalContextProps;  
  const {forex_amounta58a5, setforex_amounta58a5}= useContext(TotalContext) as TotalContextProps;  
  const {base_amount3b226, setbase_amount3b226}= useContext(TotalContext) as TotalContextProps;  
  const {rate_ref_no82399, setrate_ref_no82399}= useContext(TotalContext) as TotalContextProps;  
  const {rate_cust_idad42a, setrate_cust_idad42a}= useContext(TotalContext) as TotalContextProps;  
  const {additionalinfod2894, setadditionalinfod2894}= useContext(TotalContext) as TotalContextProps;  
  const {additionalinfod2894Props, setadditionalinfod2894Props}= useContext(TotalContext) as TotalContextProps;  
  const {listgroupdcdbd, setlistgroupdcdbd}= useContext(TotalContext) as TotalContextProps;  
  const {listgroupdcdbdProps, setlistgroupdcdbdProps}= useContext(TotalContext) as TotalContextProps;  
  const {list_tab_groupd6905, setlist_tab_groupd6905}= useContext(TotalContext) as TotalContextProps;  
  const {list_tab_groupd6905Props, setlist_tab_groupd6905Props}= useContext(TotalContext) as TotalContextProps;  
  const {document_list38c6e, setdocument_list38c6e}= useContext(TotalContext) as TotalContextProps;  
  const {document_list38c6eProps, setdocument_list38c6eProps}= useContext(TotalContext) as TotalContextProps;  
  const {doclisttable56e97, setdoclisttable56e97}= useContext(TotalContext) as TotalContextProps;  
  const {doclisttable56e97Props, setdoclisttable56e97Props}= useContext(TotalContext) as TotalContextProps;  
  const {validation_listae827, setvalidation_listae827}= useContext(TotalContext) as TotalContextProps;  
  const {validation_listae827Props, setvalidation_listae827Props}= useContext(TotalContext) as TotalContextProps;  
  const {valdnlisttable17ec7, setvaldnlisttable17ec7}= useContext(TotalContext) as TotalContextProps;  
  const {valdnlisttable17ec7Props, setvaldnlisttable17ec7Props}= useContext(TotalContext) as TotalContextProps;  
  const {comment_list72944, setcomment_list72944}= useContext(TotalContext) as TotalContextProps;  
  const {comment_list72944Props, setcomment_list72944Props}= useContext(TotalContext) as TotalContextProps;  
  const {cmntlisttable02d0e, setcmntlisttable02d0e}= useContext(TotalContext) as TotalContextProps;  
  const {cmntlisttable02d0eProps, setcmntlisttable02d0eProps}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_lista0a19, setrtgs_lista0a19}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_lista0a19Props, setrtgs_lista0a19Props}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_grpcf7d8, setrtgs_list_grpcf7d8}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_grpcf7d8Props, setrtgs_list_grpcf7d8Props}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_tble_groupab24b, setrtgs_list_tble_groupab24b}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_tble_groupab24bProps, setrtgs_list_tble_groupab24bProps}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_table2926a, setrtgs_list_table2926a}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_table2926aProps, setrtgs_list_table2926aProps}= useContext(TotalContext) as TotalContextProps;  
  const {group05462, setgroup05462}= useContext(TotalContext) as TotalContextProps;  
  const {group05462Props, setgroup05462Props}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_tab_grp28533, setrtgs_list_tab_grp28533}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_tab_grp28533Props, setrtgs_list_tab_grp28533Props}= useContext(TotalContext) as TotalContextProps;  
  const {documnt_list3a31d, setdocumnt_list3a31d}= useContext(TotalContext) as TotalContextProps;  
  const {documnt_list3a31dProps, setdocumnt_list3a31dProps}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_lst_doc_list_table32147, setrtgs_lst_doc_list_table32147}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_lst_doc_list_table32147Props, setrtgs_lst_doc_list_table32147Props}= useContext(TotalContext) as TotalContextProps;  
  const {validtn_list10f93, setvalidtn_list10f93}= useContext(TotalContext) as TotalContextProps;  
  const {validtn_list10f93Props, setvalidtn_list10f93Props}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_validtn_table84666, setrtgs_list_validtn_table84666}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_validtn_table84666Props, setrtgs_list_validtn_table84666Props}= useContext(TotalContext) as TotalContextProps;  
  const {cmnt_liste161c, setcmnt_liste161c}= useContext(TotalContext) as TotalContextProps;  
  const {cmnt_liste161cProps, setcmnt_liste161cProps}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_cmnts_list2148d, setrtgs_list_cmnts_list2148d}= useContext(TotalContext) as TotalContextProps;  
  const {rtgs_list_cmnts_list2148dProps, setrtgs_list_cmnts_list2148dProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "409b134cde0449b5a031a7686df3d198",
        "9b9f3e4a5e07422194a9c278d5b929e5"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[waive_charges929e5?.refresh])

  useEffect(()=>{
    if (basicinfo3d198?.waive_charges === undefined) {
      setbasicinfo3d198((prev: any) => ({ ...prev, waive_charges: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setbasicinfo3d198((prev: any) => ({ ...prev, waive_charges: checked}));
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
  
  const handleBlur=async(e:any)=>{
    try{
    setIsProcessing(true);
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
            codeStates['overallgroup']  = overallgroup01c61;
            codeStates['setoverallgroup'] = setoverallgroup01c61;
            codeStates['controlgroup']  = controlgroupda197;
            codeStates['setcontrolgroup'] = setcontrolgroupda197;
            codeStates['button_group']  = button_group74f3e;
            codeStates['setbutton_group'] = setbutton_group74f3e;
            codeStates['allcontrols']  = allcontrols71c54;
            codeStates['setallcontrols'] = setallcontrols71c54;
            codeStates['commoninfo']  = commoninfof4607;
            codeStates['setcommoninfo'] = setcommoninfof4607;
            codeStates['basicinfo']  = basicinfo3d198;
            codeStates['setbasicinfo'] = setbasicinfo3d198;
            codeStates['additionalinfo']  = additionalinfod2894;
            codeStates['setadditionalinfo'] = setadditionalinfod2894;
            codeStates['listgroup']  = listgroupdcdbd;
            codeStates['setlistgroup'] = setlistgroupdcdbd;
            codeStates['doclisttable']  = doclisttable56e97;
            codeStates['setdoclisttable'] = setdoclisttable56e97;
            codeStates['valdnlisttable']  = valdnlisttable17ec7;
            codeStates['setvaldnlisttable'] = setvaldnlisttable17ec7;
            codeStates['cmntlisttable']  = cmntlisttable02d0e;
            codeStates['setcmntlisttable'] = setcmntlisttable02d0e;
            codeStates['rtgs_list_grp']  = rtgs_list_grpcf7d8;
            codeStates['setrtgs_list_grp'] = setrtgs_list_grpcf7d8;
            codeStates['rtgs_list_tble_group']  = rtgs_list_tble_groupab24b;
            codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupab24b;
            codeStates['rtgs_list_table']  = rtgs_list_table2926a;
            codeStates['setrtgs_list_table'] = setrtgs_list_table2926a;
            codeStates['group']  = group05462;
            codeStates['setgroup'] = setgroup05462;
            codeStates['rtgs_lst_doc_list_table']  = rtgs_lst_doc_list_table32147;
            codeStates['setrtgs_lst_doc_list_table'] = setrtgs_lst_doc_list_table32147;
            codeStates['rtgs_list_validtn_table']  = rtgs_list_validtn_table84666;
            codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table84666;
            codeStates['rtgs_list_cmnts_list']  = rtgs_list_cmnts_list2148d;
            codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list2148d;
    codeExecution(code,codeStates);
    }
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

  if (waive_charges929e5?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `21 / 25`,gridRow: `3 / 7`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={basicinfo3d198?.waive_charges||false}
      checked={basicinfo3d198?.waive_charges||false}
      disabled= {waive_charges929e5?.isDisabled ? true : false}
      content = {'Waive Charges'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxwaive_charges;
