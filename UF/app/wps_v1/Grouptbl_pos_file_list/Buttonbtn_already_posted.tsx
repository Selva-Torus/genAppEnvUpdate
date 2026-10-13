'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { unlocktbl_pos_file_listRecord as unlocktablea1c83Record } from '@/app/wps_v1/Grouptbl_pos_file_list/Tabletbl_pos_file_list';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonbtn_already_posted = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
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
  const {tab_all14848Props, settab_all14848Props}= useContext(TotalContext) as TotalContextProps;
  const {all_groupdc06f, setall_groupdc06f}= useContext(TotalContext) as TotalContextProps;
  const {all_groupdc06fProps, setall_groupdc06fProps}= useContext(TotalContext) as TotalContextProps;
  const {all_table9a484, setall_table9a484}= useContext(TotalContext) as TotalContextProps;
  const {all_table9a484Props, setall_table9a484Props}= useContext(TotalContext) as TotalContextProps;
  const {action_required_tab3b174, setaction_required_tab3b174}= useContext(TotalContext) as TotalContextProps;
  const {action_required_tab3b174Props, setaction_required_tab3b174Props}= useContext(TotalContext) as TotalContextProps;
  const {action_required_groupc490c, setaction_required_groupc490c}= useContext(TotalContext) as TotalContextProps;
  const {action_required_groupc490cProps, setaction_required_groupc490cProps}= useContext(TotalContext) as TotalContextProps;
  const {action_required_table0359e, setaction_required_table0359e}= useContext(TotalContext) as TotalContextProps;
  const {action_required_table0359eProps, setaction_required_table0359eProps}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tabeaf18, setsalary_return_refund_tabeaf18}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tabeaf18Props, setsalary_return_refund_tabeaf18Props}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_group9c3f2, setsalary_return_refund_group9c3f2}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_group9c3f2Props, setsalary_return_refund_group9c3f2Props}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tablee81e8, setsalary_return_refund_tablee81e8}= useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tablee81e8Props, setsalary_return_refund_tablee81e8Props}= useContext(TotalContext) as TotalContextProps;
  const {exception_tab1addc, setexception_tab1addc}= useContext(TotalContext) as TotalContextProps;
  const {exception_tab1addcProps, setexception_tab1addcProps}= useContext(TotalContext) as TotalContextProps;
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
  const {col_po_file_namee2783, setcol_po_file_namee2783}= useContext(TotalContext) as TotalContextProps;
  const {col_po_tran_count2921e, setcol_po_tran_count2921e}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_transactionb2844, setbtn_view_transactionb2844}= useContext(TotalContext) as TotalContextProps;
  const {col_po_empr_molc2f22, setcol_po_empr_molc2f22}= useContext(TotalContext) as TotalContextProps;
  const {col_po_fix_sal2aefb, setcol_po_fix_sal2aefb}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt70cb5, setcol_var_amnt70cb5}= useContext(TotalContext) as TotalContextProps;
  const {col_po_tot_amnt9842a, setcol_po_tot_amnt9842a}= useContext(TotalContext) as TotalContextProps;
  const {col_po_charges3c1af, setcol_po_charges3c1af}= useContext(TotalContext) as TotalContextProps;
  const {btn_retryb08fa, setbtn_retryb08fa}= useContext(TotalContext) as TotalContextProps;
  const {btn_already_posted0734c, setbtn_already_posted0734c}= useContext(TotalContext) as TotalContextProps;
  const {col_process_type35ae5, setcol_process_type35ae5}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
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
      codeStates['tab_all14848'] = tab_all14848Props,
      codeStates['settab_all14848'] = settab_all14848Props,
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
      codeStates['action_required_tab3b174'] = action_required_tab3b174Props,
      codeStates['setaction_required_tab3b174'] = setaction_required_tab3b174Props,
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
      codeStates['salary_return_refund_tabeaf18'] = salary_return_refund_tabeaf18Props,
      codeStates['setsalary_return_refund_tabeaf18'] = setsalary_return_refund_tabeaf18Props,
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
      codeStates['exception_tab1addc'] = exception_tab1addcProps,
      codeStates['setexception_tab1addc'] = setexception_tab1addcProps,
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
      codeStates['col_po_file_name'] = col_po_file_namee2783,
      codeStates['setcol_po_file_name'] = setcol_po_file_namee2783,
      codeStates['col_po_tran_count'] = col_po_tran_count2921e,
      codeStates['setcol_po_tran_count'] = setcol_po_tran_count2921e,
      codeStates['btn_view_transaction'] = btn_view_transactionb2844,
      codeStates['setbtn_view_transaction'] = setbtn_view_transactionb2844,
      codeStates['col_po_empr_mol'] = col_po_empr_molc2f22,
      codeStates['setcol_po_empr_mol'] = setcol_po_empr_molc2f22,
      codeStates['col_po_fix_sal'] = col_po_fix_sal2aefb,
      codeStates['setcol_po_fix_sal'] = setcol_po_fix_sal2aefb,
      codeStates['col_var_amnt'] = col_var_amnt70cb5,
      codeStates['setcol_var_amnt'] = setcol_var_amnt70cb5,
      codeStates['col_po_tot_amnt'] = col_po_tot_amnt9842a,
      codeStates['setcol_po_tot_amnt'] = setcol_po_tot_amnt9842a,
      codeStates['col_po_charges'] = col_po_charges3c1af,
      codeStates['setcol_po_charges'] = setcol_po_charges3c1af,
      codeStates['btn_retry'] = btn_retryb08fa,
      codeStates['setbtn_retry'] = setbtn_retryb08fa,
      codeStates['btn_already_posted'] = btn_already_posted0734c,
      codeStates['setbtn_already_posted'] = setbtn_already_posted0734c,
      codeStates['col_process_type'] = col_process_type35ae5,
      codeStates['setcol_process_type'] = setcol_process_type35ae5,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f5018d17e8e44404851a1279594a1c83",
        "3cac4bc254d64a0c93dd2a294770734c"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "btn_already_posted0734c") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_already_posted0734c?.refresh])


  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  async function handleSave734c_1_1_1(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.wps_v1 || {}).some(val => {
  if (typeof val === 'object' && val !== null) {
    return Object.values(val).includes('invalid');
  }
  return val === 'invalid';
});

    if (hasInvalidField) {
      toast('Please verify the data', 'danger');
      return;
    }
    try{
      let copyFormhandlerData :any = {};
      //let mainData:any=structuredClone(tbl_pos_file_lista1c83);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        ssKey: [],
        data: {},
        lock: {}
      }
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsFileProcessRetryAlreadyPosted:AFVK:v1|6210808539b7462d9737b7217e5ae792"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsFileProcessRetryAlreadyPosted:AFVK:v1|6210808539b7462d9737b7217e5ae792"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      //eventEmitter
      if(tbl_pos_file_lista1c83?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "3cac4bc254d64a0c93dd2a294770734c",
  "type": "button",
  "name": "btn_already_posted",
  "label": "btn_already_posted",
  "sequence": 1,
  "children": [
    {
      "id": "3cac4bc254d64a0c93dd2a294770734c.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "3cac4bc254d64a0c93dd2a294770734c.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "3cac4bc254d64a0c93dd2a294770734c.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "3cac4bc254d64a0c93dd2a294770734c.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "f5018d17e8e44404851a1279594a1c83.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "wps.v1|tbl_pos_file_list",
                      "label": "wps.v1|tbl_pos_file_list",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1|tbl_pos_file_list",
                      "elementType": "group",
                      "groupType": "table",
                      "sequence": "1.1.1.1.1.1",
                      "children": []
                    }
                  ]
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "message",
                    "_type": "text",
                    "value": "Data saved successfully",
                    "enabled": true
                  },
                  {
                    "name": "type",
                    "_type": "select",
                    "selectionList": [
                      "none",
                      "info",
                      "success",
                      "warning",
                      "danger",
                      "utility"
                    ],
                    "value": "success",
                    "enabled": true
                  },
                  {
                    "name": "autoClose",
                    "_label": "Auto close toast",
                    "_type": "boolean",
                    "value": false,
                    "enabled": true
                  },
                  {
                    "name": "variant",
                    "_type": "select",
                    "selectionList": [
                      "display-4",
                      "display-3",
                      "display-2",
                      "display-1",
                      "header-2",
                      "header-1",
                      "subheader-3",
                      "subheader-2",
                      "subheader-1",
                      "body-3",
                      "body-2",
                      "body-1",
                      "body-short",
                      "caption-2",
                      "caption-1",
                      "code-3",
                      "code-inline-3",
                      "code-2",
                      "code-inline-2",
                      "code-1",
                      "code-inline-1"
                    ],
                    "value": "subheader-3",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              },
              {
                "name": "needToast",
                "_type": "conditionalBoolean",
                "value": false,
                "enabled": true,
                "subSelection": {
                  "_true": {
                    "content": {
                      "name": "Path",
                      "_type": "text",
                      "value": "",
                      "enabled": true
                    },
                    "position": {
                      "name": "Type",
                      "_type": "select",
                      "selectionList": [
                        "none",
                        "info",
                        "success",
                        "warning",
                        "danger",
                        "utility"
                      ],
                      "value": "success",
                      "enabled": true
                    }
                  }
                }
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsFileProcessRetryAlreadyPosted:AFVK:v1|6210808539b7462d9737b7217e5ae792"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1";
      sourceId+= "|"+"f5018d17e8e44404851a1279594a1c83";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1"+"|"+"f5018d17e8e44404851a1279594a1c83"+"|"+eventProperty.id;
      pathIds.map((ele:any,id:number)=>{
        if(id!=pathIds.length-1)
        {
          sourceIdNewPath=sourceIdNewPath+"|"+ele
        }
      })
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'saveHandler'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              sourceId:sourceIdNewPath
            };
          }
        } else if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'eventEmitter'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          }
        }
      }
    
      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
          key:uf_getPFDetails.key,
          sourceId:sourceIdNewPath
        };
        if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd;
          uf_initiatePfBody["method"] = encryptionMethod;
        }
            uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              if(uf_initiatePf?.data?.error == true){
                toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                return
              }
      
      } else {
        throw 'Please check PF'
      }
      //eventEmitter
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : tbl_pos_file_lista1c83?.upId? [tbl_pos_file_lista1c83?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "btn_already_posted"
      }

    // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_event_process_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }

    let reworkedObject:any = nullFilter(lockedData?.data);
    let reworkKeys:any[]=[];
      if(typeof reworkedObject === 'object' && reworkedObject !== null) {
      Object.keys(reworkedObject).map((item: any) => {
        if (
          typeof tbl_pos_file_lista1c83[item] === 'object' && 
          Array.isArray(tbl_pos_file_lista1c83[item]) && 
          tbl_pos_file_lista1c83[item].length > 0 && 
          typeof tbl_pos_file_lista1c83[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_pos_file_lista1c83[item][0]?.url !== undefined;
          const hasFileProperty = tbl_pos_file_lista1c83[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_pos_file_lista1c83[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(tbl_pos_file_lista1c83).map((item: any) => {
        if (
          typeof tbl_pos_file_lista1c83[item] === 'object' && 
          Array.isArray(tbl_pos_file_lista1c83[item]) && 
          tbl_pos_file_lista1c83[item].length > 0 && 
          typeof tbl_pos_file_lista1c83[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_pos_file_lista1c83[item][0]?.url !== undefined;
          const hasFileProperty = tbl_pos_file_lista1c83[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_pos_file_lista1c83[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = tbl_pos_file_lista1c83[reworkKeys[i]].map((item:any) => item?.file)
          const formData = new FormData();
          fileBody.forEach((file:File) => {
            formData.append("file", file);
          });
          formData.append('context', reworkKeys[i]);
          formData.append("enableEncryption", fileBody[0]?.enableEncryption);
          formData.append("returnType", fileBody[0]?.returnType || 'string');
          if (encryptionFlagCont) {
            formData.append("dpdKey" ,encryptionDpd);
            formData.append("method" ,encryptionMethod);
          }
          if (fileBody[0]?.DbType == 'mongodb') {
          const res : any = await AxiosService.post("/UF/upload", formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              }
            });
            reworkedObject[reworkKeys[i]] = res.data.fileId;
          } else if (fileBody[0]?.DbType == 'dfs') {
            const basePath : string = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
            const bucketFolderame : string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
            formData.append('bucketFolderame', bucketFolderame.toLowerCase());
            formData.append('folderPath', basePath);

            const res : any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            reworkedObject[reworkKeys[i]] = res.data.imageUrl;
          }
        }
      }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof tbl_pos_file_lista1c83[item]=='object')
        {
          if( tbl_pos_file_lista1c83[item].length>0 &&Object.keys(tbl_pos_file_lista1c83[item][0]).includes('_isSelected_'))
          {
            reworkedObject[item]=reworkedObject[item].filter((data:any)=>data?._isSelected_== true)
            for(let i=0;i<reworkedObject[item].length;i++)
            {
              reworkedObject[item][i] = nullFilter(reworkedObject[item][i])
              delete reworkedObject[item][i]._isSelected_
            }

          }
           
        }
      })

      if ("childTables" in tbl_pos_file_lista1c83) {
        te_saveBody.childTables = tbl_pos_file_lista1c83.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || tbl_pos_file_lista1c83 || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"f5018d17e8e44404851a1279594a1c83",
              controlId:"3cac4bc254d64a0c93dd2a294770734c"
            };
            if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
            uf_ifo = await AxiosService.post(
            "/UF/ifo",
              uf_ifoBody,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
            
            if(uf_ifo?.data?.error == true){
              toast(uf_ifo?.data?.errorDetails?.message, 'danger');
              return
            }
            //eventEmitter
            ifoResponse?.push({...uf_ifo?.data,...te_eventEmitterBody?.data});
          }
          //eventEmitter
          te_eventEmitterBody.data= ifoResponse;
        } 
        else{
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:{...formData, ...nullFilter(grp_wps7d0b0), ...nullFilter(grp_eobedcde), ...nullFilter(grp_wps_nack_failurecdb58), ...nullFilter(tabgroup_post_excep0d361), ...nullFilter(dashboard_tab_headercb15a), ...nullFilter(dash_tab_grp477aa), ...nullFilter(corporate_group92e02), ...nullFilter(success_groupf3393), ...nullFilter(failure_group60ccc), ...nullFilter(my_queue_group17a74), ...nullFilter(tab_overalla72da), ...nullFilter(tab_all14848), ...nullFilter(all_groupdc06f), ...nullFilter(action_required_tab3b174), ...nullFilter(action_required_groupc490c), ...nullFilter(salary_return_refund_tabeaf18), ...nullFilter(salary_return_refund_group9c3f2), ...nullFilter(exception_tab1addc), ...nullFilter(exception_group8bd2f), ...nullFilter(total_emp_group824bb), ...nullFilter(salary_process_groupe9737), ...nullFilter(pie_chart_group31af3), ...nullFilter(tab_header_wps_nack_failuref61a4), ...nullFilter(grp_employee_verify730a2), ...nullFilter(tab_header_wps_file_journey9bceb), ...nullFilter(grp_overall_repair8807c), ...nullFilter(tab_header_posting_exceptionade8d), ...nullFilter(grp_overall_wps9c663)},
            key:uf_getPFDetails.key,
            groupId:"f5018d17e8e44404851a1279594a1c83",
            controlId:"3cac4bc254d64a0c93dd2a294770734c"
          };
          if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
          uf_ifo = await AxiosService.post(
          "/UF/ifo",
            uf_ifoBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          if(uf_ifo?.data?.error == true){
            toast(uf_ifo?.data?.errorDetails?.message, 'danger');
            return
          }
            //eventEmitter
            te_eventEmitterBody.data= [{...uf_ifo?.data,...te_eventEmitterBody?.data}];
        }
      }
    //eventEmitter
    if (tbl_pos_file_lista1c83Props.ssKey !== '' && tbl_pos_file_lista1c83Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = tbl_pos_file_lista1c83Props.ssKey;          
    }
    if(mainData?.upId){
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(tbl_pos_file_lista1c83?.upId){
      te_eventEmitterBody['upId']= [tbl_pos_file_lista1c83?.upId];
    }
    if(tbl_pos_file_lista1c83?.upid){
      te_eventEmitterBody['upId']= [tbl_pos_file_lista1c83?.upid];
    }
    te_eventEmitterBody["lock"] = actionLockData;
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    if(te_eventEmitter?.data?.error == true){
      toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
      throw te_eventEmitter?.data?.errorDetails?.message
    }
    lockedKeysLength = lockedData?.primaryKeys?.length;
    ///////////////////////

    //infoMsg
    toast('Data saved successfully', 'success',false,'subheader-3');
    // refreshElement
    //riseListen
    // for group
    if (Array.isArray(tbl_pos_file_lista1c83Props?.selectedIds) && tbl_pos_file_lista1c83Props.selectedIds.length) {
      await Promise.all(
        tbl_pos_file_lista1c83Props.selectedIds.map((id: number) =>
          unlocktablea1c83Record(id, token)
        )
      );
    }
    settbl_pos_file_lista1c83Props((pre:any)=>({
      ...pre,
      refresh:!pre?.refresh,
      skipUnlockOnRefresh:true,
      selectedIds:[]
    }));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    }catch(err:any){
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');


      return
    }
  }
  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //eventEmitter
    await handleSave734c_1_1_1();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

 if (btn_already_posted0734c?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1','wps','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_already_posted0734c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Already Posted")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_already_posted

