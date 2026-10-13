'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Grouptab_all  from "../Grouptab_all/Grouptab_all";
import Groupaction_required_tab  from "../Groupaction_required_tab/Groupaction_required_tab";
import Groupsalary_return_refund_tab  from "../Groupsalary_return_refund_tab/Groupsalary_return_refund_tab";
import Groupexception_tab  from "../Groupexception_tab/Groupexception_tab";
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


const Grouptab_overall = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { setValidate, setValidateRefetch } = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
    const decodedTokenObj:any = decodeToken(token);

  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_wpsnackfailurefilelist_v1Props, setdfd_wpsnackfailurefilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsfilejourney_v1Props, setdfd_wpsfilejourney_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_postingexpectionfilelist_v1Props, setdfd_postingexpectionfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_postingexceptionprocesslist_v1Props, setdfd_postingexceptionprocesslist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardcompanystructurecombo_v1Props, setdfd_wpsdashboardcompanystructurecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmolnumbercombo_v1Props, setdfd_wpsdashboardmolnumbercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardsuccesstab_v1Props, setdfd_wpsdashboardsuccesstab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardfailuretab_v1Props, setdfd_wpsdashboardfailuretab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardsalarytypecombo_v1Props, setdfd_wpsdashboardsalarytypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardemployeesbarchart_v1Props, setdfd_wpsdashboardemployeesbarchart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardsalaryprocessbarchart_v1Props, setdfd_wpsdashboardsalaryprocessbarchart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmyqueueall_v1Props, setdfd_wpsdashboardmyqueueall_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmonthcombo_v1Props, setdfd_wpsdashboardmonthcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardyearcombo_v1Props, setdfd_wpsdashboardyearcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardsuccesstabnonwps_v1Props, setdfd_wpsdashboardsuccesstabnonwps_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardfailurenonwpstab_v1Props, setdfd_wpsdashboardfailurenonwpstab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmyqueueactionrequired_v1Props, setdfd_wpsdashboardmyqueueactionrequired_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props, setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_wpsdashboardmyqueueexceptions_v1Props, setdfd_wpsdashboardmyqueueexceptions_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_wps_nack_failure",
      "tabgroup_post_excep",
      "dashboard_tab_header",
      "dash_tab_grp",
      "corporate_group",
      "success_group",
      "failure_group",
      "my_queue_group",
      "tab_overall",
      "tab_all",
      "all_group",
      "all_table",
      "action_required_tab",
      "action_required_group",
      "action_required_table",
      "salary_return_refund_tab",
      "salary_return_refund_group",
      "salary_return_refund_table",
      "exception_tab",
      "exception_group",
      "exception_table",
      "total_emp_group",
      "salary_process_group",
      "pie_chart_group",
      "tab_header_wps_nack_failure",
      "grp_employee_verify",
      "table_file_list",
      "tab_header_wps_file_journey",
      "grp_overall_repair",
      "tbl_wps_file_journry",
      "tab_header_posting_exception",
      "grp_overall_wps",
      "tbl_process_list",
      "tbl_pos_file_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_wps_nack_failure",
      "tabgroup_post_excep",
      "dashboard_tab_header",
      "dash_tab_grp",
      "corporate_group",
      "success_group",
      "failure_group",
      "my_queue_group",
      "tab_overall",
      "tab_all",
      "all_group",
      "all_table",
      "action_required_tab",
      "action_required_group",
      "action_required_table",
      "salary_return_refund_tab",
      "salary_return_refund_group",
      "salary_return_refund_table",
      "exception_tab",
      "exception_group",
      "exception_table",
      "total_emp_group",
      "salary_process_group",
      "pie_chart_group",
      "tab_header_wps_nack_failure",
      "grp_employee_verify",
      "table_file_list",
      "tab_header_wps_file_journey",
      "grp_overall_repair",
      "tbl_wps_file_journry",
      "tab_header_posting_exception",
      "grp_overall_wps",
      "tbl_process_list",
      "tbl_pos_file_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_wps_nack_failure",
      "tabgroup_post_excep",
      "dashboard_tab_header",
      "dash_tab_grp",
      "corporate_group",
      "success_group",
      "failure_group",
      "my_queue_group",
      "tab_overall",
      "tab_all",
      "all_group",
      "all_table",
      "action_required_tab",
      "action_required_group",
      "action_required_table",
      "salary_return_refund_tab",
      "salary_return_refund_group",
      "salary_return_refund_table",
      "exception_tab",
      "exception_group",
      "exception_table",
      "total_emp_group",
      "salary_process_group",
      "pie_chart_group",
      "tab_header_wps_nack_failure",
      "grp_employee_verify",
      "table_file_list",
      "tab_header_wps_file_journey",
      "grp_overall_repair",
      "tbl_wps_file_journry",
      "tab_header_posting_exception",
      "grp_overall_wps",
      "tbl_process_list",
      "tbl_pos_file_list"
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
  const {grp_wps7d0b0, setgrp_wps7d0b0}= useContext(TotalContext) as TotalContextProps;
  const {grp_wps7d0b0Props, setgrp_wps7d0b0Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobedcde, setgrp_eobedcde}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobedcdeProps, setgrp_eobedcdeProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_wps_nack_failurecdb58, setgrp_wps_nack_failurecdb58}= useContext(TotalContext) as TotalContextProps;
  const {grp_wps_nack_failurecdb58Props, setgrp_wps_nack_failurecdb58Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_post_excep0d361, settabgroup_post_excep0d361}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_post_excep0d361Props, settabgroup_post_excep0d361Props}= useContext(TotalContext) as TotalContextProps;
  const {dashboard_tab_headercb15a, setdashboard_tab_headercb15a}= useContext(TotalContext) as TotalContextProps;
  const {dashboard_tab_headercb15aProps, setdashboard_tab_headercb15aProps}= useContext(TotalContext) as TotalContextProps;
  const {dash_tab_grp477aa, setdash_tab_grp477aa}= useContext(TotalContext) as TotalContextProps;
  const {dash_tab_grp477aaProps, setdash_tab_grp477aaProps}= useContext(TotalContext) as TotalContextProps;
  const {corporate_group92e02, setcorporate_group92e02}= useContext(TotalContext) as TotalContextProps;
  const {corporate_group92e02Props, setcorporate_group92e02Props}= useContext(TotalContext) as TotalContextProps;
  const {success_groupf3393, setsuccess_groupf3393}= useContext(TotalContext) as TotalContextProps;
  const {success_groupf3393Props, setsuccess_groupf3393Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_group60ccc, setfailure_group60ccc}= useContext(TotalContext) as TotalContextProps;
  const {failure_group60cccProps, setfailure_group60cccProps}= useContext(TotalContext) as TotalContextProps;
  const {my_queue_group17a74, setmy_queue_group17a74}= useContext(TotalContext) as TotalContextProps;
  const {my_queue_group17a74Props, setmy_queue_group17a74Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_overalla72da, settab_overalla72da}= useContext(TotalContext) as TotalContextProps;
  const {tab_overalla72daProps, settab_overalla72daProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_all14848, settab_all14848}= useContext(TotalContext) as TotalContextProps;
  const {all_groupdc06f, setall_groupdc06f}= useContext(TotalContext) as TotalContextProps;
  const {all_groupdc06fProps, setall_groupdc06fProps}= useContext(TotalContext) as TotalContextProps;
  const {all_table9a484, setall_table9a484}= useContext(TotalContext) as TotalContextProps;
  const {all_table9a484Props, setall_table9a484Props}= useContext(TotalContext) as TotalContextProps;
  const {action_required_tab3b174, setaction_required_tab3b174}= useContext(TotalContext) as TotalContextProps;
  const {action_required_groupc490c, setaction_required_groupc490c}= useContext(TotalContext) as TotalContextProps;
  const {action_required_groupc490cProps, setaction_required_groupc490cProps}= useContext(TotalContext) as TotalContextProps;
  const {action_required_table0359e, setaction_required_table0359e}= useContext(TotalContext) as TotalContextProps;
  const {action_required_table0359eProps, setaction_required_table0359eProps}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tabeaf18, setsalary_return_refund_tabeaf18}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_group9c3f2, setsalary_return_refund_group9c3f2}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_group9c3f2Props, setsalary_return_refund_group9c3f2Props}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tablee81e8, setsalary_return_refund_tablee81e8}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tablee81e8Props, setsalary_return_refund_tablee81e8Props}= useContext(TotalContext) as TotalContextProps;
  const {exception_tab1addc, setexception_tab1addc}= useContext(TotalContext) as TotalContextProps;
  const {exception_group8bd2f, setexception_group8bd2f}= useContext(TotalContext) as TotalContextProps;
  const {exception_group8bd2fProps, setexception_group8bd2fProps}= useContext(TotalContext) as TotalContextProps;
  const {exception_table77afe, setexception_table77afe}= useContext(TotalContext) as TotalContextProps;
  const {exception_table77afeProps, setexception_table77afeProps}= useContext(TotalContext) as TotalContextProps;
  const {total_emp_group824bb, settotal_emp_group824bb}= useContext(TotalContext) as TotalContextProps;
  const {total_emp_group824bbProps, settotal_emp_group824bbProps}= useContext(TotalContext) as TotalContextProps;
  const {salary_process_groupe9737, setsalary_process_groupe9737}= useContext(TotalContext) as TotalContextProps;
  const {salary_process_groupe9737Props, setsalary_process_groupe9737Props}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group31af3, setpie_chart_group31af3}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group31af3Props, setpie_chart_group31af3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_wps_nack_failuref61a4, settab_header_wps_nack_failuref61a4}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_wps_nack_failuref61a4Props, settab_header_wps_nack_failuref61a4Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_employee_verify730a2, setgrp_employee_verify730a2}= useContext(TotalContext) as TotalContextProps;
  const {grp_employee_verify730a2Props, setgrp_employee_verify730a2Props}= useContext(TotalContext) as TotalContextProps;
  const {table_file_list44ec7, settable_file_list44ec7}= useContext(TotalContext) as TotalContextProps;
  const {table_file_list44ec7Props, settable_file_list44ec7Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_wps_file_journey9bceb, settab_header_wps_file_journey9bceb}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_wps_file_journey9bcebProps, settab_header_wps_file_journey9bcebProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_repair8807c, setgrp_overall_repair8807c}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_repair8807cProps, setgrp_overall_repair8807cProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_wps_file_journryabf3b, settbl_wps_file_journryabf3b}= useContext(TotalContext) as TotalContextProps;
  const {tbl_wps_file_journryabf3bProps, settbl_wps_file_journryabf3bProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_posting_exceptionade8d, settab_header_posting_exceptionade8d}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_posting_exceptionade8dProps, settab_header_posting_exceptionade8dProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_wps9c663, setgrp_overall_wps9c663}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_wps9c663Props, setgrp_overall_wps9c663Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_process_list752ff, settbl_process_list752ff}= useContext(TotalContext) as TotalContextProps;
  const {tbl_process_list752ffProps, settbl_process_list752ffProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_file_lista1c83, settbl_pos_file_lista1c83}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_file_lista1c83Props, settbl_pos_file_lista1c83Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // Active tab id
  const activeTabId = tab_overalla72da?.tab_overall || "tab_all";
  const prevActiveTabRef = useRef(activeTabId);
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "1b4a7f5106c74de5b80c5c683eba72da"
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
      if(!tab_overalla72da?.tab_overall || tab_overalla72da?.tab_overall === ""){
      settab_overalla72da((pre:any)=>({...pre,tab_overall:tabOptions[i]?.id}));
      break;
      }
    }
  }   
  /////////////
        settab_all14848({...tab_all14848,isDisabled:orchestrationData?.data?.readableControls.includes("tab_all")});
        setaction_required_tab3b174({...action_required_tab3b174,isDisabled:orchestrationData?.data?.readableControls.includes("action_required_tab")});
        setsalary_return_refund_tabeaf18({...salary_return_refund_tabeaf18,isDisabled:orchestrationData?.data?.readableControls.includes("salary_return_refund_tab")});
        setexception_tab1addc({...exception_tab1addc,isDisabled:orchestrationData?.data?.readableControls.includes("exception_tab")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "tab_all",
        codeStates['grp_wps'] = grp_wps7d0b0,
        codeStates['setgrp_wps'] = setgrp_wps7d0b0,
        codeStates['grp_wps7d0b0'] = grp_wps7d0b0Props,
        codeStates['setgrp_wps7d0b0'] = setgrp_wps7d0b0Props,
        codeStates['grp_eob'] = grp_eobedcde,
        codeStates['setgrp_eob'] = setgrp_eobedcde,
        codeStates['grp_eobedcde'] = grp_eobedcdeProps,
        codeStates['setgrp_eobedcde'] = setgrp_eobedcdeProps,
        codeStates['grp_wps_nack_failure'] = grp_wps_nack_failurecdb58,
        codeStates['setgrp_wps_nack_failure'] = setgrp_wps_nack_failurecdb58,
        codeStates['grp_wps_nack_failurecdb58'] = grp_wps_nack_failurecdb58Props,
        codeStates['setgrp_wps_nack_failurecdb58'] = setgrp_wps_nack_failurecdb58Props,
        codeStates['tabgroup_post_excep'] = tabgroup_post_excep0d361,
        codeStates['settabgroup_post_excep'] = settabgroup_post_excep0d361,
        codeStates['tabgroup_post_excep0d361'] = tabgroup_post_excep0d361Props,
        codeStates['settabgroup_post_excep0d361'] = settabgroup_post_excep0d361Props,
        codeStates['dashboard_tab_header'] = dashboard_tab_headercb15a,
        codeStates['setdashboard_tab_header'] = setdashboard_tab_headercb15a,
        codeStates['dashboard_tab_headercb15a'] = dashboard_tab_headercb15aProps,
        codeStates['setdashboard_tab_headercb15a'] = setdashboard_tab_headercb15aProps,
        codeStates['dash_tab_grp'] = dash_tab_grp477aa,
        codeStates['setdash_tab_grp'] = setdash_tab_grp477aa,
        codeStates['dash_tab_grp477aa'] = dash_tab_grp477aaProps,
        codeStates['setdash_tab_grp477aa'] = setdash_tab_grp477aaProps,
        codeStates['corporate_group'] = corporate_group92e02,
        codeStates['setcorporate_group'] = setcorporate_group92e02,
        codeStates['corporate_group92e02'] = corporate_group92e02Props,
        codeStates['setcorporate_group92e02'] = setcorporate_group92e02Props,
        codeStates['success_group'] = success_groupf3393,
        codeStates['setsuccess_group'] = setsuccess_groupf3393,
        codeStates['success_groupf3393'] = success_groupf3393Props,
        codeStates['setsuccess_groupf3393'] = setsuccess_groupf3393Props,
        codeStates['failure_group'] = failure_group60ccc,
        codeStates['setfailure_group'] = setfailure_group60ccc,
        codeStates['failure_group60ccc'] = failure_group60cccProps,
        codeStates['setfailure_group60ccc'] = setfailure_group60cccProps,
        codeStates['my_queue_group'] = my_queue_group17a74,
        codeStates['setmy_queue_group'] = setmy_queue_group17a74,
        codeStates['my_queue_group17a74'] = my_queue_group17a74Props,
        codeStates['setmy_queue_group17a74'] = setmy_queue_group17a74Props,
        codeStates['tab_overall'] = tab_overalla72da,
        codeStates['settab_overall'] = settab_overalla72da,
        codeStates['tab_overalla72da'] = tab_overalla72daProps,
        codeStates['settab_overalla72da'] = settab_overalla72daProps,
        codeStates['tab_all'] = tab_all14848,
        codeStates['settab_all'] = settab_all14848,
        codeStates['all_group'] = all_groupdc06f,
        codeStates['setall_group'] = setall_groupdc06f,
        codeStates['all_groupdc06f'] = all_groupdc06fProps,
        codeStates['setall_groupdc06f'] = setall_groupdc06fProps,
        codeStates['all_table'] = all_table9a484,
        codeStates['setall_table'] = setall_table9a484,
        codeStates['all_table9a484'] = all_table9a484Props,
        codeStates['setall_table9a484'] = setall_table9a484Props,
        codeStates['action_required_tab'] = action_required_tab3b174,
        codeStates['setaction_required_tab'] = setaction_required_tab3b174,
        codeStates['action_required_group'] = action_required_groupc490c,
        codeStates['setaction_required_group'] = setaction_required_groupc490c,
        codeStates['action_required_groupc490c'] = action_required_groupc490cProps,
        codeStates['setaction_required_groupc490c'] = setaction_required_groupc490cProps,
        codeStates['action_required_table'] = action_required_table0359e,
        codeStates['setaction_required_table'] = setaction_required_table0359e,
        codeStates['action_required_table0359e'] = action_required_table0359eProps,
        codeStates['setaction_required_table0359e'] = setaction_required_table0359eProps,
        codeStates['salary_return_refund_tab'] = salary_return_refund_tabeaf18,
        codeStates['setsalary_return_refund_tab'] = setsalary_return_refund_tabeaf18,
        codeStates['salary_return_refund_group'] = salary_return_refund_group9c3f2,
        codeStates['setsalary_return_refund_group'] = setsalary_return_refund_group9c3f2,
        codeStates['salary_return_refund_group9c3f2'] = salary_return_refund_group9c3f2Props,
        codeStates['setsalary_return_refund_group9c3f2'] = setsalary_return_refund_group9c3f2Props,
        codeStates['salary_return_refund_table'] = salary_return_refund_tablee81e8,
        codeStates['setsalary_return_refund_table'] = setsalary_return_refund_tablee81e8,
        codeStates['salary_return_refund_tablee81e8'] = salary_return_refund_tablee81e8Props,
        codeStates['setsalary_return_refund_tablee81e8'] = setsalary_return_refund_tablee81e8Props,
        codeStates['exception_tab'] = exception_tab1addc,
        codeStates['setexception_tab'] = setexception_tab1addc,
        codeStates['exception_group'] = exception_group8bd2f,
        codeStates['setexception_group'] = setexception_group8bd2f,
        codeStates['exception_group8bd2f'] = exception_group8bd2fProps,
        codeStates['setexception_group8bd2f'] = setexception_group8bd2fProps,
        codeStates['exception_table'] = exception_table77afe,
        codeStates['setexception_table'] = setexception_table77afe,
        codeStates['exception_table77afe'] = exception_table77afeProps,
        codeStates['setexception_table77afe'] = setexception_table77afeProps,
        codeStates['total_emp_group'] = total_emp_group824bb,
        codeStates['settotal_emp_group'] = settotal_emp_group824bb,
        codeStates['total_emp_group824bb'] = total_emp_group824bbProps,
        codeStates['settotal_emp_group824bb'] = settotal_emp_group824bbProps,
        codeStates['salary_process_group'] = salary_process_groupe9737,
        codeStates['setsalary_process_group'] = setsalary_process_groupe9737,
        codeStates['salary_process_groupe9737'] = salary_process_groupe9737Props,
        codeStates['setsalary_process_groupe9737'] = setsalary_process_groupe9737Props,
        codeStates['pie_chart_group'] = pie_chart_group31af3,
        codeStates['setpie_chart_group'] = setpie_chart_group31af3,
        codeStates['pie_chart_group31af3'] = pie_chart_group31af3Props,
        codeStates['setpie_chart_group31af3'] = setpie_chart_group31af3Props,
        codeStates['tab_header_wps_nack_failure'] = tab_header_wps_nack_failuref61a4,
        codeStates['settab_header_wps_nack_failure'] = settab_header_wps_nack_failuref61a4,
        codeStates['tab_header_wps_nack_failuref61a4'] = tab_header_wps_nack_failuref61a4Props,
        codeStates['settab_header_wps_nack_failuref61a4'] = settab_header_wps_nack_failuref61a4Props,
        codeStates['grp_employee_verify'] = grp_employee_verify730a2,
        codeStates['setgrp_employee_verify'] = setgrp_employee_verify730a2,
        codeStates['grp_employee_verify730a2'] = grp_employee_verify730a2Props,
        codeStates['setgrp_employee_verify730a2'] = setgrp_employee_verify730a2Props,
        codeStates['table_file_list'] = table_file_list44ec7,
        codeStates['settable_file_list'] = settable_file_list44ec7,
        codeStates['table_file_list44ec7'] = table_file_list44ec7Props,
        codeStates['settable_file_list44ec7'] = settable_file_list44ec7Props,
        codeStates['tab_header_wps_file_journey'] = tab_header_wps_file_journey9bceb,
        codeStates['settab_header_wps_file_journey'] = settab_header_wps_file_journey9bceb,
        codeStates['tab_header_wps_file_journey9bceb'] = tab_header_wps_file_journey9bcebProps,
        codeStates['settab_header_wps_file_journey9bceb'] = settab_header_wps_file_journey9bcebProps,
        codeStates['grp_overall_repair'] = grp_overall_repair8807c,
        codeStates['setgrp_overall_repair'] = setgrp_overall_repair8807c,
        codeStates['grp_overall_repair8807c'] = grp_overall_repair8807cProps,
        codeStates['setgrp_overall_repair8807c'] = setgrp_overall_repair8807cProps,
        codeStates['tbl_wps_file_journry'] = tbl_wps_file_journryabf3b,
        codeStates['settbl_wps_file_journry'] = settbl_wps_file_journryabf3b,
        codeStates['tbl_wps_file_journryabf3b'] = tbl_wps_file_journryabf3bProps,
        codeStates['settbl_wps_file_journryabf3b'] = settbl_wps_file_journryabf3bProps,
        codeStates['tab_header_posting_exception'] = tab_header_posting_exceptionade8d,
        codeStates['settab_header_posting_exception'] = settab_header_posting_exceptionade8d,
        codeStates['tab_header_posting_exceptionade8d'] = tab_header_posting_exceptionade8dProps,
        codeStates['settab_header_posting_exceptionade8d'] = settab_header_posting_exceptionade8dProps,
        codeStates['grp_overall_wps'] = grp_overall_wps9c663,
        codeStates['setgrp_overall_wps'] = setgrp_overall_wps9c663,
        codeStates['grp_overall_wps9c663'] = grp_overall_wps9c663Props,
        codeStates['setgrp_overall_wps9c663'] = setgrp_overall_wps9c663Props,
        codeStates['tbl_process_list'] = tbl_process_list752ff,
        codeStates['settbl_process_list'] = settbl_process_list752ff,
        codeStates['tbl_process_list752ff'] = tbl_process_list752ffProps,
        codeStates['settbl_process_list752ff'] = settbl_process_list752ffProps,
        codeStates['tbl_pos_file_list'] = tbl_pos_file_lista1c83,
        codeStates['settbl_pos_file_list'] = settbl_pos_file_lista1c83,
        codeStates['tbl_pos_file_lista1c83'] = tbl_pos_file_lista1c83Props,
        codeStates['settbl_pos_file_lista1c83'] = settbl_pos_file_lista1c83Props,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        settab_overalla72da((pre:any)=>({...pre,tab_overall:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, wps_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['grp_wps'] = grp_wps7d0b0,
        codeStates['setgrp_wps'] = setgrp_wps7d0b0,
        codeStates['grp_wps7d0b0'] = grp_wps7d0b0Props,
        codeStates['setgrp_wps7d0b0'] = setgrp_wps7d0b0Props,
        codeStates['grp_eob'] = grp_eobedcde,
        codeStates['setgrp_eob'] = setgrp_eobedcde,
        codeStates['grp_eobedcde'] = grp_eobedcdeProps,
        codeStates['setgrp_eobedcde'] = setgrp_eobedcdeProps,
        codeStates['grp_wps_nack_failure'] = grp_wps_nack_failurecdb58,
        codeStates['setgrp_wps_nack_failure'] = setgrp_wps_nack_failurecdb58,
        codeStates['grp_wps_nack_failurecdb58'] = grp_wps_nack_failurecdb58Props,
        codeStates['setgrp_wps_nack_failurecdb58'] = setgrp_wps_nack_failurecdb58Props,
        codeStates['tabgroup_post_excep'] = tabgroup_post_excep0d361,
        codeStates['settabgroup_post_excep'] = settabgroup_post_excep0d361,
        codeStates['tabgroup_post_excep0d361'] = tabgroup_post_excep0d361Props,
        codeStates['settabgroup_post_excep0d361'] = settabgroup_post_excep0d361Props,
        codeStates['dashboard_tab_header'] = dashboard_tab_headercb15a,
        codeStates['setdashboard_tab_header'] = setdashboard_tab_headercb15a,
        codeStates['dashboard_tab_headercb15a'] = dashboard_tab_headercb15aProps,
        codeStates['setdashboard_tab_headercb15a'] = setdashboard_tab_headercb15aProps,
        codeStates['dash_tab_grp'] = dash_tab_grp477aa,
        codeStates['setdash_tab_grp'] = setdash_tab_grp477aa,
        codeStates['dash_tab_grp477aa'] = dash_tab_grp477aaProps,
        codeStates['setdash_tab_grp477aa'] = setdash_tab_grp477aaProps,
        codeStates['corporate_group'] = corporate_group92e02,
        codeStates['setcorporate_group'] = setcorporate_group92e02,
        codeStates['corporate_group92e02'] = corporate_group92e02Props,
        codeStates['setcorporate_group92e02'] = setcorporate_group92e02Props,
        codeStates['success_group'] = success_groupf3393,
        codeStates['setsuccess_group'] = setsuccess_groupf3393,
        codeStates['success_groupf3393'] = success_groupf3393Props,
        codeStates['setsuccess_groupf3393'] = setsuccess_groupf3393Props,
        codeStates['failure_group'] = failure_group60ccc,
        codeStates['setfailure_group'] = setfailure_group60ccc,
        codeStates['failure_group60ccc'] = failure_group60cccProps,
        codeStates['setfailure_group60ccc'] = setfailure_group60cccProps,
        codeStates['my_queue_group'] = my_queue_group17a74,
        codeStates['setmy_queue_group'] = setmy_queue_group17a74,
        codeStates['my_queue_group17a74'] = my_queue_group17a74Props,
        codeStates['setmy_queue_group17a74'] = setmy_queue_group17a74Props,
        codeStates['tab_overall'] = tab_overalla72da,
        codeStates['settab_overall'] = settab_overalla72da,
        codeStates['tab_overalla72da'] = tab_overalla72daProps,
        codeStates['settab_overalla72da'] = settab_overalla72daProps,
        codeStates['tab_all'] = tab_all14848,
        codeStates['settab_all'] = settab_all14848,
        codeStates['all_group'] = all_groupdc06f,
        codeStates['setall_group'] = setall_groupdc06f,
        codeStates['all_groupdc06f'] = all_groupdc06fProps,
        codeStates['setall_groupdc06f'] = setall_groupdc06fProps,
        codeStates['all_table'] = all_table9a484,
        codeStates['setall_table'] = setall_table9a484,
        codeStates['all_table9a484'] = all_table9a484Props,
        codeStates['setall_table9a484'] = setall_table9a484Props,
        codeStates['action_required_tab'] = action_required_tab3b174,
        codeStates['setaction_required_tab'] = setaction_required_tab3b174,
        codeStates['action_required_group'] = action_required_groupc490c,
        codeStates['setaction_required_group'] = setaction_required_groupc490c,
        codeStates['action_required_groupc490c'] = action_required_groupc490cProps,
        codeStates['setaction_required_groupc490c'] = setaction_required_groupc490cProps,
        codeStates['action_required_table'] = action_required_table0359e,
        codeStates['setaction_required_table'] = setaction_required_table0359e,
        codeStates['action_required_table0359e'] = action_required_table0359eProps,
        codeStates['setaction_required_table0359e'] = setaction_required_table0359eProps,
        codeStates['salary_return_refund_tab'] = salary_return_refund_tabeaf18,
        codeStates['setsalary_return_refund_tab'] = setsalary_return_refund_tabeaf18,
        codeStates['salary_return_refund_group'] = salary_return_refund_group9c3f2,
        codeStates['setsalary_return_refund_group'] = setsalary_return_refund_group9c3f2,
        codeStates['salary_return_refund_group9c3f2'] = salary_return_refund_group9c3f2Props,
        codeStates['setsalary_return_refund_group9c3f2'] = setsalary_return_refund_group9c3f2Props,
        codeStates['salary_return_refund_table'] = salary_return_refund_tablee81e8,
        codeStates['setsalary_return_refund_table'] = setsalary_return_refund_tablee81e8,
        codeStates['salary_return_refund_tablee81e8'] = salary_return_refund_tablee81e8Props,
        codeStates['setsalary_return_refund_tablee81e8'] = setsalary_return_refund_tablee81e8Props,
        codeStates['exception_tab'] = exception_tab1addc,
        codeStates['setexception_tab'] = setexception_tab1addc,
        codeStates['exception_group'] = exception_group8bd2f,
        codeStates['setexception_group'] = setexception_group8bd2f,
        codeStates['exception_group8bd2f'] = exception_group8bd2fProps,
        codeStates['setexception_group8bd2f'] = setexception_group8bd2fProps,
        codeStates['exception_table'] = exception_table77afe,
        codeStates['setexception_table'] = setexception_table77afe,
        codeStates['exception_table77afe'] = exception_table77afeProps,
        codeStates['setexception_table77afe'] = setexception_table77afeProps,
        codeStates['total_emp_group'] = total_emp_group824bb,
        codeStates['settotal_emp_group'] = settotal_emp_group824bb,
        codeStates['total_emp_group824bb'] = total_emp_group824bbProps,
        codeStates['settotal_emp_group824bb'] = settotal_emp_group824bbProps,
        codeStates['salary_process_group'] = salary_process_groupe9737,
        codeStates['setsalary_process_group'] = setsalary_process_groupe9737,
        codeStates['salary_process_groupe9737'] = salary_process_groupe9737Props,
        codeStates['setsalary_process_groupe9737'] = setsalary_process_groupe9737Props,
        codeStates['pie_chart_group'] = pie_chart_group31af3,
        codeStates['setpie_chart_group'] = setpie_chart_group31af3,
        codeStates['pie_chart_group31af3'] = pie_chart_group31af3Props,
        codeStates['setpie_chart_group31af3'] = setpie_chart_group31af3Props,
        codeStates['tab_header_wps_nack_failure'] = tab_header_wps_nack_failuref61a4,
        codeStates['settab_header_wps_nack_failure'] = settab_header_wps_nack_failuref61a4,
        codeStates['tab_header_wps_nack_failuref61a4'] = tab_header_wps_nack_failuref61a4Props,
        codeStates['settab_header_wps_nack_failuref61a4'] = settab_header_wps_nack_failuref61a4Props,
        codeStates['grp_employee_verify'] = grp_employee_verify730a2,
        codeStates['setgrp_employee_verify'] = setgrp_employee_verify730a2,
        codeStates['grp_employee_verify730a2'] = grp_employee_verify730a2Props,
        codeStates['setgrp_employee_verify730a2'] = setgrp_employee_verify730a2Props,
        codeStates['table_file_list'] = table_file_list44ec7,
        codeStates['settable_file_list'] = settable_file_list44ec7,
        codeStates['table_file_list44ec7'] = table_file_list44ec7Props,
        codeStates['settable_file_list44ec7'] = settable_file_list44ec7Props,
        codeStates['tab_header_wps_file_journey'] = tab_header_wps_file_journey9bceb,
        codeStates['settab_header_wps_file_journey'] = settab_header_wps_file_journey9bceb,
        codeStates['tab_header_wps_file_journey9bceb'] = tab_header_wps_file_journey9bcebProps,
        codeStates['settab_header_wps_file_journey9bceb'] = settab_header_wps_file_journey9bcebProps,
        codeStates['grp_overall_repair'] = grp_overall_repair8807c,
        codeStates['setgrp_overall_repair'] = setgrp_overall_repair8807c,
        codeStates['grp_overall_repair8807c'] = grp_overall_repair8807cProps,
        codeStates['setgrp_overall_repair8807c'] = setgrp_overall_repair8807cProps,
        codeStates['tbl_wps_file_journry'] = tbl_wps_file_journryabf3b,
        codeStates['settbl_wps_file_journry'] = settbl_wps_file_journryabf3b,
        codeStates['tbl_wps_file_journryabf3b'] = tbl_wps_file_journryabf3bProps,
        codeStates['settbl_wps_file_journryabf3b'] = settbl_wps_file_journryabf3bProps,
        codeStates['tab_header_posting_exception'] = tab_header_posting_exceptionade8d,
        codeStates['settab_header_posting_exception'] = settab_header_posting_exceptionade8d,
        codeStates['tab_header_posting_exceptionade8d'] = tab_header_posting_exceptionade8dProps,
        codeStates['settab_header_posting_exceptionade8d'] = settab_header_posting_exceptionade8dProps,
        codeStates['grp_overall_wps'] = grp_overall_wps9c663,
        codeStates['setgrp_overall_wps'] = setgrp_overall_wps9c663,
        codeStates['grp_overall_wps9c663'] = grp_overall_wps9c663Props,
        codeStates['setgrp_overall_wps9c663'] = setgrp_overall_wps9c663Props,
        codeStates['tbl_process_list'] = tbl_process_list752ff,
        codeStates['settbl_process_list'] = settbl_process_list752ff,
        codeStates['tbl_process_list752ff'] = tbl_process_list752ffProps,
        codeStates['settbl_process_list752ff'] = settbl_process_list752ffProps,
        codeStates['tbl_pos_file_list'] = tbl_pos_file_lista1c83,
        codeStates['settbl_pos_file_list'] = settbl_pos_file_lista1c83,
        codeStates['tbl_pos_file_lista1c83'] = tbl_pos_file_lista1c83Props,
        codeStates['settbl_pos_file_lista1c83'] = settbl_pos_file_lista1c83Props,
      codeExecution(code,codeStates);
    }
    settab_overalla72da((pre:any)=>({...pre,tab_overall:id}));

  }
  // Second layer: clear validation on tab change (also catches tab changes made from code)
  useEffect(() => {
    if (prevActiveTabRef.current === activeTabId) return; // first render → skip
    prevActiveTabRef.current = activeTabId;
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, wps_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
  }, [activeTabId]);
  const tab_overalla72daRef = useRef<any>(null);
  const handleClearSearch = () => {
    tab_overalla72daRef.current?.setSearchParams();
    tab_overalla72daRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tab_overalla72da) && Object.keys(tab_overalla72da)?.length>0)
      {
        settab_overalla72da({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tab_overalla72daProps?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "tab_all",
      "title": "All",
      "content": <Grouptab_all
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
      "id": "action_required_tab",
      "title": "Action Required",
      "content": <Groupaction_required_tab
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
      "id": "salary_return_refund_tab",
      "title": "Salary Return / Refund",
      "content": <Groupsalary_return_refund_tab
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
      "id": "exception_tab",
      "title": "Exceptions",
      "content": <Groupexception_tab
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
        gridRow: '7 / 69',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'',
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
      headerClassName=""
      items={tabOptions}
      security={allowedComponent}
      direction='horizontal'
      onChange={handleOnChange}
      defaultActiveId={tab_overalla72da?.tab_overall || "tab_all"}
      activeTab={tab_overalla72da?.tab_overall || "tab_all"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouptab_overall
