'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Groupdocumnt_list  from "../Groupdocumnt_list/Groupdocumnt_list";
import Groupvalidtn_list  from "../Groupvalidtn_list/Groupvalidtn_list";
import Groupcmnt_list  from "../Groupcmnt_list/Groupcmnt_list";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprtgs_list_tab_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
    const decodedTokenObj:any = decodeToken(token);

  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_scansaveprocessdfd_v1Props, setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crbankcodedropdowndfd_v1Props, setdfd_crbankcodedropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_forexcurrencydropdowndfd_v1Props, setdfd_forexcurrencydropdowndfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_documentlistdfd_v1Props, setdfd_documentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_errorlistdfd_v1Props, setdfd_errorlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactionlistdfd_v1Props, setdfd_transactionlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_commentlistdfd_v1Props, setdfd_commentlistdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const securityData:any={
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overallgroup",
      "controlgroup",
      "control_tab_group",
      "button_group",
      "rtgs_info",
      "allcontrols",
      "additionalinfo",
      "listgroup",
      "list_tab_group",
      "document_list",
      "validation_list",
      "comment_list",
      "rtgs_list",
      "rtgs_list_grp",
      "rtgs_list_tble_group",
      "rtgs_list_table",
      "group",
      "rtgs_list_tab_grp",
      "documnt_list",
      "rtgs_lst_doc_list_table",
      "validtn_list",
      "rtgs_list_validtn_table",
      "cmnt_list",
      "rtgs_list_cmnts_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overallgroup",
      "controlgroup",
      "control_tab_group",
      "button_group",
      "rtgs_info",
      "allcontrols",
      "commoninfo",
      "basicinfo",
      "additionalinfo",
      "listgroup",
      "list_tab_group",
      "document_list",
      "doclisttable",
      "validation_list",
      "valdnlisttable",
      "comment_list",
      "cmntlisttable",
      "rtgs_list",
      "rtgs_list_grp",
      "rtgs_list_tble_group",
      "rtgs_list_table",
      "group",
      "rtgs_list_tab_grp",
      "documnt_list",
      "rtgs_lst_doc_list_table",
      "validtn_list",
      "rtgs_list_validtn_table",
      "cmnt_list",
      "rtgs_list_cmnts_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
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
  const {rtgs_lst_doc_list_table32147, setrtgs_lst_doc_list_table32147}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lst_doc_list_table32147Props, setrtgs_lst_doc_list_table32147Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list10f93, setvalidtn_list10f93}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666, setrtgs_list_validtn_table84666}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666Props, setrtgs_list_validtn_table84666Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_liste161c, setcmnt_liste161c}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148d, setrtgs_list_cmnts_list2148d}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148dProps, setrtgs_list_cmnts_list2148dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "b1db1fb863474742a37eaa3e71028533"
      );
  code = orchestrationData?.data?.code;
  setAllCode(orchestrationData?.data?.code||"");
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  for(let i=0;i<tabOptions?.length;i++){
    if(allowedGroups?.find((group)=>(group==tabOptions[i]?.id)))
    {
      setrtgs_list_tab_grp28533((pre:any)=>({...pre,rtgs_list_tab_grp:tabOptions[i]?.id}));
      break;
    }
  }   
  /////////////
        setdocumnt_list3a31d({...documnt_list3a31d,isDisabled:orchestrationData?.data?.readableControls.includes("documnt_list")});
        setvalidtn_list10f93({...validtn_list10f93,isDisabled:orchestrationData?.data?.readableControls.includes("validtn_list")});
        setcmnt_liste161c({...cmnt_liste161c,isDisabled:orchestrationData?.data?.readableControls.includes("cmnt_list")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "documnt_list",
        codeStates['overallgroup'] = overallgroup01c61,
        codeStates['setoverallgroup'] = setoverallgroup01c61,
        codeStates['overallgroup01c61'] = overallgroup01c61Props,
        codeStates['setoverallgroup01c61'] = setoverallgroup01c61Props,
        codeStates['controlgroup'] = controlgroupda197,
        codeStates['setcontrolgroup'] = setcontrolgroupda197,
        codeStates['controlgroupda197'] = controlgroupda197Props,
        codeStates['setcontrolgroupda197'] = setcontrolgroupda197Props,
        codeStates['control_tab_group'] = control_tab_groupbc3e2,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_groupbc3e2,
        codeStates['control_tab_groupbc3e2'] = control_tab_groupbc3e2Props,
        codeStates['setcontrol_tab_groupbc3e2'] = setcontrol_tab_groupbc3e2Props,
        codeStates['button_group'] = button_group74f3e,
        codeStates['setbutton_group'] = setbutton_group74f3e,
        codeStates['button_group74f3e'] = button_group74f3eProps,
        codeStates['setbutton_group74f3e'] = setbutton_group74f3eProps,
        codeStates['rtgs_info'] = rtgs_infofd0aa,
        codeStates['setrtgs_info'] = setrtgs_infofd0aa,
        codeStates['rtgs_infofd0aa'] = rtgs_infofd0aaProps,
        codeStates['setrtgs_infofd0aa'] = setrtgs_infofd0aaProps,
        codeStates['allcontrols'] = allcontrols71c54,
        codeStates['setallcontrols'] = setallcontrols71c54,
        codeStates['allcontrols71c54'] = allcontrols71c54Props,
        codeStates['setallcontrols71c54'] = setallcontrols71c54Props,
        codeStates['commoninfo'] = commoninfof4607,
        codeStates['setcommoninfo'] = setcommoninfof4607,
        codeStates['commoninfof4607'] = commoninfof4607Props,
        codeStates['setcommoninfof4607'] = setcommoninfof4607Props,
        codeStates['basicinfo'] = basicinfo3d198,
        codeStates['setbasicinfo'] = setbasicinfo3d198,
        codeStates['basicinfo3d198'] = basicinfo3d198Props,
        codeStates['setbasicinfo3d198'] = setbasicinfo3d198Props,
        codeStates['additionalinfo'] = additionalinfod2894,
        codeStates['setadditionalinfo'] = setadditionalinfod2894,
        codeStates['additionalinfod2894'] = additionalinfod2894Props,
        codeStates['setadditionalinfod2894'] = setadditionalinfod2894Props,
        codeStates['listgroup'] = listgroupdcdbd,
        codeStates['setlistgroup'] = setlistgroupdcdbd,
        codeStates['listgroupdcdbd'] = listgroupdcdbdProps,
        codeStates['setlistgroupdcdbd'] = setlistgroupdcdbdProps,
        codeStates['list_tab_group'] = list_tab_groupd6905,
        codeStates['setlist_tab_group'] = setlist_tab_groupd6905,
        codeStates['list_tab_groupd6905'] = list_tab_groupd6905Props,
        codeStates['setlist_tab_groupd6905'] = setlist_tab_groupd6905Props,
        codeStates['document_list'] = document_list38c6e,
        codeStates['setdocument_list'] = setdocument_list38c6e,
        codeStates['document_list38c6e'] = document_list38c6eProps,
        codeStates['setdocument_list38c6e'] = setdocument_list38c6eProps,
        codeStates['doclisttable'] = doclisttable56e97,
        codeStates['setdoclisttable'] = setdoclisttable56e97,
        codeStates['doclisttable56e97'] = doclisttable56e97Props,
        codeStates['setdoclisttable56e97'] = setdoclisttable56e97Props,
        codeStates['validation_list'] = validation_listae827,
        codeStates['setvalidation_list'] = setvalidation_listae827,
        codeStates['validation_listae827'] = validation_listae827Props,
        codeStates['setvalidation_listae827'] = setvalidation_listae827Props,
        codeStates['valdnlisttable'] = valdnlisttable17ec7,
        codeStates['setvaldnlisttable'] = setvaldnlisttable17ec7,
        codeStates['valdnlisttable17ec7'] = valdnlisttable17ec7Props,
        codeStates['setvaldnlisttable17ec7'] = setvaldnlisttable17ec7Props,
        codeStates['comment_list'] = comment_list72944,
        codeStates['setcomment_list'] = setcomment_list72944,
        codeStates['comment_list72944'] = comment_list72944Props,
        codeStates['setcomment_list72944'] = setcomment_list72944Props,
        codeStates['cmntlisttable'] = cmntlisttable02d0e,
        codeStates['setcmntlisttable'] = setcmntlisttable02d0e,
        codeStates['cmntlisttable02d0e'] = cmntlisttable02d0eProps,
        codeStates['setcmntlisttable02d0e'] = setcmntlisttable02d0eProps,
        codeStates['rtgs_list'] = rtgs_lista0a19,
        codeStates['setrtgs_list'] = setrtgs_lista0a19,
        codeStates['rtgs_lista0a19'] = rtgs_lista0a19Props,
        codeStates['setrtgs_lista0a19'] = setrtgs_lista0a19Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grpcf7d8,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grpcf7d8,
        codeStates['rtgs_list_grpcf7d8'] = rtgs_list_grpcf7d8Props,
        codeStates['setrtgs_list_grpcf7d8'] = setrtgs_list_grpcf7d8Props,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupab24b,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupab24b,
        codeStates['rtgs_list_tble_groupab24b'] = rtgs_list_tble_groupab24bProps,
        codeStates['setrtgs_list_tble_groupab24b'] = setrtgs_list_tble_groupab24bProps,
        codeStates['rtgs_list_table'] = rtgs_list_table2926a,
        codeStates['setrtgs_list_table'] = setrtgs_list_table2926a,
        codeStates['rtgs_list_table2926a'] = rtgs_list_table2926aProps,
        codeStates['setrtgs_list_table2926a'] = setrtgs_list_table2926aProps,
        codeStates['group'] = group05462,
        codeStates['setgroup'] = setgroup05462,
        codeStates['group05462'] = group05462Props,
        codeStates['setgroup05462'] = setgroup05462Props,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp28533,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp28533,
        codeStates['rtgs_list_tab_grp28533'] = rtgs_list_tab_grp28533Props,
        codeStates['setrtgs_list_tab_grp28533'] = setrtgs_list_tab_grp28533Props,
        codeStates['documnt_list'] = documnt_list3a31d,
        codeStates['setdocumnt_list'] = setdocumnt_list3a31d,
        codeStates['rtgs_lst_doc_list_table'] = rtgs_lst_doc_list_table32147,
        codeStates['setrtgs_lst_doc_list_table'] = setrtgs_lst_doc_list_table32147,
        codeStates['rtgs_lst_doc_list_table32147'] = rtgs_lst_doc_list_table32147Props,
        codeStates['setrtgs_lst_doc_list_table32147'] = setrtgs_lst_doc_list_table32147Props,
        codeStates['validtn_list'] = validtn_list10f93,
        codeStates['setvalidtn_list'] = setvalidtn_list10f93,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table84666,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table84666,
        codeStates['rtgs_list_validtn_table84666'] = rtgs_list_validtn_table84666Props,
        codeStates['setrtgs_list_validtn_table84666'] = setrtgs_list_validtn_table84666Props,
        codeStates['cmnt_list'] = cmnt_liste161c,
        codeStates['setcmnt_list'] = setcmnt_liste161c,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list2148d,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list2148d,
        codeStates['rtgs_list_cmnts_list2148d'] = rtgs_list_cmnts_list2148dProps,
        codeStates['setrtgs_list_cmnts_list2148d'] = setrtgs_list_cmnts_list2148dProps,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        setrtgs_list_tab_grp28533((pre:any)=>({...pre,rtgs_list_tab_grp:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['overallgroup'] = overallgroup01c61,
        codeStates['setoverallgroup'] = setoverallgroup01c61,
        codeStates['overallgroup01c61'] = overallgroup01c61Props,
        codeStates['setoverallgroup01c61'] = setoverallgroup01c61Props,
        codeStates['controlgroup'] = controlgroupda197,
        codeStates['setcontrolgroup'] = setcontrolgroupda197,
        codeStates['controlgroupda197'] = controlgroupda197Props,
        codeStates['setcontrolgroupda197'] = setcontrolgroupda197Props,
        codeStates['control_tab_group'] = control_tab_groupbc3e2,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_groupbc3e2,
        codeStates['control_tab_groupbc3e2'] = control_tab_groupbc3e2Props,
        codeStates['setcontrol_tab_groupbc3e2'] = setcontrol_tab_groupbc3e2Props,
        codeStates['button_group'] = button_group74f3e,
        codeStates['setbutton_group'] = setbutton_group74f3e,
        codeStates['button_group74f3e'] = button_group74f3eProps,
        codeStates['setbutton_group74f3e'] = setbutton_group74f3eProps,
        codeStates['rtgs_info'] = rtgs_infofd0aa,
        codeStates['setrtgs_info'] = setrtgs_infofd0aa,
        codeStates['rtgs_infofd0aa'] = rtgs_infofd0aaProps,
        codeStates['setrtgs_infofd0aa'] = setrtgs_infofd0aaProps,
        codeStates['allcontrols'] = allcontrols71c54,
        codeStates['setallcontrols'] = setallcontrols71c54,
        codeStates['allcontrols71c54'] = allcontrols71c54Props,
        codeStates['setallcontrols71c54'] = setallcontrols71c54Props,
        codeStates['commoninfo'] = commoninfof4607,
        codeStates['setcommoninfo'] = setcommoninfof4607,
        codeStates['commoninfof4607'] = commoninfof4607Props,
        codeStates['setcommoninfof4607'] = setcommoninfof4607Props,
        codeStates['basicinfo'] = basicinfo3d198,
        codeStates['setbasicinfo'] = setbasicinfo3d198,
        codeStates['basicinfo3d198'] = basicinfo3d198Props,
        codeStates['setbasicinfo3d198'] = setbasicinfo3d198Props,
        codeStates['additionalinfo'] = additionalinfod2894,
        codeStates['setadditionalinfo'] = setadditionalinfod2894,
        codeStates['additionalinfod2894'] = additionalinfod2894Props,
        codeStates['setadditionalinfod2894'] = setadditionalinfod2894Props,
        codeStates['listgroup'] = listgroupdcdbd,
        codeStates['setlistgroup'] = setlistgroupdcdbd,
        codeStates['listgroupdcdbd'] = listgroupdcdbdProps,
        codeStates['setlistgroupdcdbd'] = setlistgroupdcdbdProps,
        codeStates['list_tab_group'] = list_tab_groupd6905,
        codeStates['setlist_tab_group'] = setlist_tab_groupd6905,
        codeStates['list_tab_groupd6905'] = list_tab_groupd6905Props,
        codeStates['setlist_tab_groupd6905'] = setlist_tab_groupd6905Props,
        codeStates['document_list'] = document_list38c6e,
        codeStates['setdocument_list'] = setdocument_list38c6e,
        codeStates['document_list38c6e'] = document_list38c6eProps,
        codeStates['setdocument_list38c6e'] = setdocument_list38c6eProps,
        codeStates['doclisttable'] = doclisttable56e97,
        codeStates['setdoclisttable'] = setdoclisttable56e97,
        codeStates['doclisttable56e97'] = doclisttable56e97Props,
        codeStates['setdoclisttable56e97'] = setdoclisttable56e97Props,
        codeStates['validation_list'] = validation_listae827,
        codeStates['setvalidation_list'] = setvalidation_listae827,
        codeStates['validation_listae827'] = validation_listae827Props,
        codeStates['setvalidation_listae827'] = setvalidation_listae827Props,
        codeStates['valdnlisttable'] = valdnlisttable17ec7,
        codeStates['setvaldnlisttable'] = setvaldnlisttable17ec7,
        codeStates['valdnlisttable17ec7'] = valdnlisttable17ec7Props,
        codeStates['setvaldnlisttable17ec7'] = setvaldnlisttable17ec7Props,
        codeStates['comment_list'] = comment_list72944,
        codeStates['setcomment_list'] = setcomment_list72944,
        codeStates['comment_list72944'] = comment_list72944Props,
        codeStates['setcomment_list72944'] = setcomment_list72944Props,
        codeStates['cmntlisttable'] = cmntlisttable02d0e,
        codeStates['setcmntlisttable'] = setcmntlisttable02d0e,
        codeStates['cmntlisttable02d0e'] = cmntlisttable02d0eProps,
        codeStates['setcmntlisttable02d0e'] = setcmntlisttable02d0eProps,
        codeStates['rtgs_list'] = rtgs_lista0a19,
        codeStates['setrtgs_list'] = setrtgs_lista0a19,
        codeStates['rtgs_lista0a19'] = rtgs_lista0a19Props,
        codeStates['setrtgs_lista0a19'] = setrtgs_lista0a19Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grpcf7d8,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grpcf7d8,
        codeStates['rtgs_list_grpcf7d8'] = rtgs_list_grpcf7d8Props,
        codeStates['setrtgs_list_grpcf7d8'] = setrtgs_list_grpcf7d8Props,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupab24b,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupab24b,
        codeStates['rtgs_list_tble_groupab24b'] = rtgs_list_tble_groupab24bProps,
        codeStates['setrtgs_list_tble_groupab24b'] = setrtgs_list_tble_groupab24bProps,
        codeStates['rtgs_list_table'] = rtgs_list_table2926a,
        codeStates['setrtgs_list_table'] = setrtgs_list_table2926a,
        codeStates['rtgs_list_table2926a'] = rtgs_list_table2926aProps,
        codeStates['setrtgs_list_table2926a'] = setrtgs_list_table2926aProps,
        codeStates['group'] = group05462,
        codeStates['setgroup'] = setgroup05462,
        codeStates['group05462'] = group05462Props,
        codeStates['setgroup05462'] = setgroup05462Props,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp28533,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp28533,
        codeStates['rtgs_list_tab_grp28533'] = rtgs_list_tab_grp28533Props,
        codeStates['setrtgs_list_tab_grp28533'] = setrtgs_list_tab_grp28533Props,
        codeStates['documnt_list'] = documnt_list3a31d,
        codeStates['setdocumnt_list'] = setdocumnt_list3a31d,
        codeStates['rtgs_lst_doc_list_table'] = rtgs_lst_doc_list_table32147,
        codeStates['setrtgs_lst_doc_list_table'] = setrtgs_lst_doc_list_table32147,
        codeStates['rtgs_lst_doc_list_table32147'] = rtgs_lst_doc_list_table32147Props,
        codeStates['setrtgs_lst_doc_list_table32147'] = setrtgs_lst_doc_list_table32147Props,
        codeStates['validtn_list'] = validtn_list10f93,
        codeStates['setvalidtn_list'] = setvalidtn_list10f93,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table84666,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table84666,
        codeStates['rtgs_list_validtn_table84666'] = rtgs_list_validtn_table84666Props,
        codeStates['setrtgs_list_validtn_table84666'] = setrtgs_list_validtn_table84666Props,
        codeStates['cmnt_list'] = cmnt_liste161c,
        codeStates['setcmnt_list'] = setcmnt_liste161c,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list2148d,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list2148d,
        codeStates['rtgs_list_cmnts_list2148d'] = rtgs_list_cmnts_list2148dProps,
        codeStates['setrtgs_list_cmnts_list2148d'] = setrtgs_list_cmnts_list2148dProps,
      codeExecution(code,codeStates);
    }
    setrtgs_list_tab_grp28533((pre:any)=>({...pre,rtgs_list_tab_grp:id}));

  }
  const rtgs_list_tab_grp28533Ref = useRef<any>(null);
  const handleClearSearch = () => {
    rtgs_list_tab_grp28533Ref.current?.setSearchParams();
    rtgs_list_tab_grp28533Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(rtgs_list_tab_grp28533) && Object.keys(rtgs_list_tab_grp28533)?.length>0)
      {
        setrtgs_list_tab_grp28533({})
      }
    }else 
      prevRefreshRef.current= true
  }, [rtgs_list_tab_grp28533Props?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "documnt_list",
      "title": "Document List",
      "content": <Groupdocumnt_list
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "validtn_list",
      "title": "Validation List",
      "content": <Groupvalidtn_list
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "cmnt_list",
      "title": "Comment List",
      "content": <Groupcmnt_list
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
  ]
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 56',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'#f4f5fa',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md`}
    >
    <Tabs
      headerClassName="!rounded-lg ml-2"
      items={tabOptions}
      security={allowedComponent}
      direction='horizontal'
      onChange={handleOnChange}
      defaultActiveId={rtgs_list_tab_grp28533?.rtgs_list_tab_grp || "documnt_list"}
      activeTab={rtgs_list_tab_grp28533?.rtgs_list_tab_grp || "documnt_list"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouprtgs_list_tab_grp
