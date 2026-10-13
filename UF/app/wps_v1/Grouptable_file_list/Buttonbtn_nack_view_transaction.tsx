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
 

const Buttonbtn_nack_view_transaction = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  let actionLockData : any = {"lockMode":"Single","name":"","ttl":1000000}
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
  const {btn_nack_view_transaction0510e, setbtn_nack_view_transaction0510e}= useContext(TotalContext) as TotalContextProps;
  const {col_source_name72b56, setcol_source_name72b56}= useContext(TotalContext) as TotalContextProps;
  const {col_source_uuid1755c, setcol_source_uuid1755c}= useContext(TotalContext) as TotalContextProps;
  const {col_file_typeea095, setcol_file_typeea095}= useContext(TotalContext) as TotalContextProps;
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
  const {transactionlist_v1Props, settransactionlist_v1Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['btn_nack_view_transaction'] = btn_nack_view_transaction0510e,
      codeStates['setbtn_nack_view_transaction'] = setbtn_nack_view_transaction0510e,
      codeStates['col_source_name'] = col_source_name72b56,
      codeStates['setcol_source_name'] = setcol_source_name72b56,
      codeStates['col_source_uuid'] = col_source_uuid1755c,
      codeStates['setcol_source_uuid'] = setcol_source_uuid1755c,
      codeStates['col_file_type'] = col_file_typeea095,
      codeStates['setcol_file_type'] = setcol_file_typeea095,
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
      codeStates['transactionlist_v1'] = transactionlist_v1Props,
      codeStates['settransactionlist_v1'] = settransactionlist_v1Props,
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
        "d9be9c607a85ddaf1a8b6bbf3a744ec7",
        "8c3500d9b84926457fbd49df88b0510e"
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
      if (id === "btn_nack_view_transaction0510e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_nack_view_transaction0510e?.refresh])


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

    // showArtifact
    let filterProps2: any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureTransactionList:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "869fd4b725a14340a8b8c9276a003632",
        "object": {
          "properties.source_name": "20dca72b5ed69d9365d92b227ab72b56"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    settransactionlist_v1Props([...filterData2 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionList:AFVK:v1', 'transactionlist_v1'));
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

 if (btn_nack_view_transaction0510e?.isHidden) {
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
          disabled= {btn_nack_view_transaction0510e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Transactions")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_nack_view_transaction

