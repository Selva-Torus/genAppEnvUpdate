

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Combobox } from '@/components/ComboBox';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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

export default function ComboBoxmol_combobox({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing,controlData}:any) { 
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  let dfData:any;
  let dfdFlag:boolean = false;
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { validate, setValidate } = useContext(TotalContext) as TotalContextProps
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
    //validation
  let schemaArray = [] ;
    //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {parent_company_text27062Props, setparent_company_text27062Props}= useContext(TotalContext) as TotalContextProps;
  const {branch_text2d7afProps, setbranch_text2d7afProps}= useContext(TotalContext) as TotalContextProps;
  const {company_text49f48Props, setcompany_text49f48Props}= useContext(TotalContext) as TotalContextProps;
  const {total_emp_barchartc0370Props, settotal_emp_barchartc0370Props}= useContext(TotalContext) as TotalContextProps;
  const {salary_barcharteedc3Props, setsalary_barcharteedc3Props}= useContext(TotalContext) as TotalContextProps;
  const {non_wps_value_text11cd8Props, setnon_wps_value_text11cd8Props}= useContext(TotalContext) as TotalContextProps;
  const {wps_value_text0da25Props, setwps_value_text0da25Props}= useContext(TotalContext) as TotalContextProps;
  const {wps_failure_value_text26223Props, setwps_failure_value_text26223Props}= useContext(TotalContext) as TotalContextProps;
  const {non_wps_failure_value_textb39feProps, setnon_wps_failure_value_textb39feProps}= useContext(TotalContext) as TotalContextProps;
  const {piechart155d5Props, setpiechart155d5Props}= useContext(TotalContext) as TotalContextProps;
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
  const {mol_number_textcda45, setmol_number_textcda45}= useContext(TotalContext) as TotalContextProps;
  const {mol_comboboxe2955, setmol_comboboxe2955}= useContext(TotalContext) as TotalContextProps;
  const {corporate_label34daf, setcorporate_label34daf}= useContext(TotalContext) as TotalContextProps;
  const {parent_company_header79ceb, setparent_company_header79ceb}= useContext(TotalContext) as TotalContextProps;
  const {parent_company_text27062, setparent_company_text27062}= useContext(TotalContext) as TotalContextProps;
  const {company_headerb144a, setcompany_headerb144a}= useContext(TotalContext) as TotalContextProps;
  const {company_text49f48, setcompany_text49f48}= useContext(TotalContext) as TotalContextProps;
  const {branch_header75c0b, setbranch_header75c0b}= useContext(TotalContext) as TotalContextProps;
  const {branch_text2d7af, setbranch_text2d7af}= useContext(TotalContext) as TotalContextProps;
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
  const {total_emp_barchartc0370, settotal_emp_barchartc0370}= useContext(TotalContext) as TotalContextProps;
  const {salary_barcharteedc3, setsalary_barcharteedc3}= useContext(TotalContext) as TotalContextProps;
  const {non_wps_value_text11cd8, setnon_wps_value_text11cd8}= useContext(TotalContext) as TotalContextProps;
  const {wps_value_text0da25, setwps_value_text0da25}= useContext(TotalContext) as TotalContextProps;
  const {wps_failure_value_text26223, setwps_failure_value_text26223}= useContext(TotalContext) as TotalContextProps;
  const {non_wps_failure_value_textb39fe, setnon_wps_failure_value_textb39fe}= useContext(TotalContext) as TotalContextProps;
  const {piechart155d5, setpiechart155d5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const PAGE_SIZE = 10;
  const [allCode, setAllCode] = React.useState<string>("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const paginationDataRef = useRef(paginationData);
  useEffect(() => { paginationDataRef.current = paginationData; }, [paginationData]);
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
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
        codeStates['mol_number_text'] = mol_number_textcda45,
        codeStates['setmol_number_text'] = setmol_number_textcda45,
        codeStates['mol_combobox'] = mol_comboboxe2955,
        codeStates['setmol_combobox'] = setmol_comboboxe2955,
        codeStates['corporate_label'] = corporate_label34daf,
        codeStates['setcorporate_label'] = setcorporate_label34daf,
        codeStates['parent_company_header'] = parent_company_header79ceb,
        codeStates['setparent_company_header'] = setparent_company_header79ceb,
        codeStates['parent_company_text'] = parent_company_text27062,
        codeStates['setparent_company_text'] = setparent_company_text27062,
        codeStates['company_header'] = company_headerb144a,
        codeStates['setcompany_header'] = setcompany_headerb144a,
        codeStates['company_text'] = company_text49f48,
        codeStates['setcompany_text'] = setcompany_text49f48,
        codeStates['branch_header'] = branch_header75c0b,
        codeStates['setbranch_header'] = setbranch_header75c0b,
        codeStates['branch_text'] = branch_text2d7af,
        codeStates['setbranch_text'] = setbranch_text2d7af,
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
        codeStates['total_emp_barchart'] = total_emp_barchartc0370,
        codeStates['settotal_emp_barchart'] = settotal_emp_barchartc0370,
        codeStates['salary_barchart'] = salary_barcharteedc3,
        codeStates['setsalary_barchart'] = setsalary_barcharteedc3,
        codeStates['non_wps_value_text'] = non_wps_value_text11cd8,
        codeStates['setnon_wps_value_text'] = setnon_wps_value_text11cd8,
        codeStates['wps_value_text'] = wps_value_text0da25,
        codeStates['setwps_value_text'] = setwps_value_text0da25,
        codeStates['wps_failure_value_text'] = wps_failure_value_text26223,
        codeStates['setwps_failure_value_text'] = setwps_failure_value_text26223,
        codeStates['non_wps_failure_value_text'] = non_wps_failure_value_textb39fe,
        codeStates['setnon_wps_failure_value_text'] = setnon_wps_failure_value_textb39fe,
        codeStates['piechart'] = piechart155d5,
        codeStates['setpiechart'] = setpiechart155d5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "7ea2cfe9c06049b3bd6927ddf9792e02",
        "a560414424fe4121b7a8629e157e2955"
      );
      if(orchestrationData?.data?.error == true){      
        return
      }
      if (orchestrationData?.data) {
        setAllCode(orchestrationData?.data?.code)
        const nextPaginationData = {
          ...paginationDataRef.current,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
        };
        paginationDataRef.current = nextPaginationData;
        setPaginationData(nextPaginationData); 
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    handleOrchestration()
  },[])
  async function handleConfirmonClick(){
  }
  const [eventFilterData,seteventFilterData]=useState({})
  const [dynamicDFDData,setDynamicDFDData]=useState<any>([])
  const prevRefreshRef = useRef(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const {dfd_wpsdashboardmolnumbercombo_v1Props, setdfd_wpsdashboardmolnumbercombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_wpsdashboardmolnumbercombo_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMolNumberCombo:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({molnumber:searchValue,...getFromDataFilter})
        paginationBody= {key:dstKey0,
            page: page,
            count: paginationDataRef.current.pageSize||count||PAGE_SIZE,
            searchFilter:tempSearchFilter
          }
      }else
      {
          paginationBody= {key:dstKey0,
            page: page,
            count: paginationDataRef.current.pageSize||count||PAGE_SIZE,
          }
      }

      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const records:any = api_paginationData?.data?.records || [];
      if(fromWhere=="onScroll"&&records?.length==0)
        return
      else if(fromWhere=="onScroll")
      {
        let temp:any = page > 1 ? [...dynamicDFDData,...records] : records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.mol_number + '|' + item.molnumber, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.mol_number + '|' + item.molnumber, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.mol_number + '|' + item.molnumber, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_wpsdashboardmolnumbercombo_v1Props );
    }
  }
//setSearchFilters
async function handleSearch0(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"4b597b01ffee4f3ea40dff800f6a1350",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4b597b01ffee4f3ea40dff800f6a1350",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (parent_company_text27062Props?.filterProps?.length) {
    parent_company_text27062Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet0:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet0)
  setparent_company_text27062Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch1(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"4b597b01ffee4f3ea40dff800f6a1350",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4b597b01ffee4f3ea40dff800f6a1350",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (branch_text2d7afProps?.filterProps?.length) {
    branch_text2d7afProps.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet1:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet1)
  setbranch_text2d7afProps((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch2(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"4b597b01ffee4f3ea40dff800f6a1350",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4b597b01ffee4f3ea40dff800f6a1350",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (company_text49f48Props?.filterProps?.length) {
    company_text49f48Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet2:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet2)
  setcompany_text49f48Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch3(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardEmployeesBarchart:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"da31fade9ffb445e8b0c80995ac09416",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardEmployeesBarchart:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "da31fade9ffb445e8b0c80995ac09416",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (total_emp_barchartc0370Props?.filterProps?.length) {
    total_emp_barchartc0370Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet3:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet3)
  settotal_emp_barchartc0370Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch4(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryProcessBarchart:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"5b53ce088cd3435d9180d261ff8a882b",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryProcessBarchart:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "5b53ce088cd3435d9180d261ff8a882b",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (salary_barcharteedc3Props?.filterProps?.length) {
    salary_barcharteedc3Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet4:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet4)
  setsalary_barcharteedc3Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch5(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTabNonWps:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"0aad543f44aa4fdebcb91ad7b1e46fc6",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTabNonWps:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "0aad543f44aa4fdebcb91ad7b1e46fc6",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (non_wps_value_text11cd8Props?.filterProps?.length) {
    non_wps_value_text11cd8Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet5:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet5)
  setnon_wps_value_text11cd8Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch6(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTab:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"c11d73bc6a3e4d588e8d09839a3aba15",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTab:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c11d73bc6a3e4d588e8d09839a3aba15",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (wps_value_text0da25Props?.filterProps?.length) {
    wps_value_text0da25Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet6:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet6)
  setwps_value_text0da25Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch7(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureTab:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"19374ab3a1194db2b8dc8098753d5d65",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureTab:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "19374ab3a1194db2b8dc8098753d5d65",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (wps_failure_value_text26223Props?.filterProps?.length) {
    wps_failure_value_text26223Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet7:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet7)
  setwps_failure_value_text26223Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch8(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureNonWpsTab:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"fadd6dd833994a2583033945219ec042",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureNonWpsTab:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "fadd6dd833994a2583033945219ec042",
        "object": {
          "properties.mol_number": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (non_wps_failure_value_textb39feProps?.filterProps?.length) {
    non_wps_failure_value_textb39feProps.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet8:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet8)
  setnon_wps_failure_value_textb39feProps((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch9(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"e084a0ef7bbf443792cd1afb7e10163b",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "e084a0ef7bbf443792cd1afb7e10163b",
        "object": {
          "properties.employer_mol": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (all_table9a484Props?.filterProps?.length) {
    all_table9a484Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet9:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet9)
  setall_table9a484Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch10(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"b945f8198676411b8e654620afbdfedc",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b945f8198676411b8e654620afbdfedc",
        "object": {
          "properties.employer_mol": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (action_required_table0359eProps?.filterProps?.length) {
    action_required_table0359eProps.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet10:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet10)
  setaction_required_table0359eProps((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch11(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"e76b78f6bf6a44a3898fa8b106b97182",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "e76b78f6bf6a44a3898fa8b106b97182",
        "object": {
          "properties.employer_mol": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (salary_return_refund_tablee81e8Props?.filterProps?.length) {
    salary_return_refund_tablee81e8Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet11:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet11)
  setsalary_return_refund_tablee81e8Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch12(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"cd07dfc616be4458b9a1c147d3a8d15e",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "cd07dfc616be4458b9a1c147d3a8d15e",
        "object": {
          "properties.employer_mol": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (exception_table77afeProps?.filterProps?.length) {
    exception_table77afeProps.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet12:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet12)
  setexception_table77afeProps((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch13(value:any) {
  let mainData: any =  nullFilter({...structuredClone(corporate_group92e02), mol_combobox: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  corporate_group92e02Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"e084a0ef7bbf443792cd1afb7e10163b",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "e084a0ef7bbf443792cd1afb7e10163b",
        "object": {
          "properties.employer_mol": "a560414424fe4121b7a8629e157e2955"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = corporate_group92e02Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (piechart155d5Props?.filterProps?.length) {
    piechart155d5Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationDataRef.current?.pageSize,
    page:paginationDataRef.current?.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    const paginationKey = key?.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:');
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key => key.startsWith("properties."));
    const paginationBody = hasPropertiesKey
      ? { ...restBody, key: paginationKey, filterData: [paginationFilterData] }
      : { ...restBody, key: paginationKey, searchFilter: paginationFilterData };

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }else{
    if(te_refresh.data.dataset.data)
    filteredData = te_refresh.data.dataset.data
  }
  let neglet13:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet13)
  setpiechart155d5Props((prev: any) => {
  let mergedData: any;

  mergedData = [...filterData];
  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterControllers: {
      ...prev.filterControllers,
      mol_comboboxe2955: true
    }
  };
  });
  }
  ///////////////
  const [selectedData,setselectedData]=useState("")
  const selectedDataRef = useRef(selectedData);
  useEffect(() => { selectedDataRef.current = selectedData; }, [selectedData]);
  const handleOnUpdate=async(data:any)=>{

    setcorporate_group92e02((pre:any)=>({...pre,mol_combobox:data?.mol_number}))
    setselectedData(data?.molnumber)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.mol_number == data?.mol_number && items?.molnumber == data?.molnumber)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.mol_number;

    await  handleSearch0(filterValue);
    await  handleSearch1(filterValue);
    await  handleSearch2(filterValue);
    await  handleSearch3(filterValue);
    await  handleSearch4(filterValue);
    await  handleSearch5(filterValue);
    await  handleSearch6(filterValue);
    await  handleSearch7(filterValue);
    await  handleSearch8(filterValue);
    await  handleSearch9(filterValue);
    await  handleSearch10(filterValue);
    await  handleSearch11(filterValue);
    await  handleSearch12(filterValue);
    await  handleSearch13(filterValue);
    let copyFormhandlerData :any = {}
    if(Object.keys(selectedObj).length){
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
  const handleBlur = async (data:any="") => {
    //validation
    handleCustomCode()
  }

  const corporate_group92e02Ref = useRef<any>(corporate_group92e02);
  useEffect(() => { corporate_group92e02Ref.current = corporate_group92e02; }, [corporate_group92e02]);
    useEffect(()=>{
        handleBlur()
    const handler = (id:any) => {
      if (id === "a560414424fe4121b7a8629e157e2955") {
        handleOnUpdate({
          value:selectedData,
          text:corporate_group92e02Ref?.current?.mol_combobox||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(mol_comboboxe2955?.trigger===undefined || !mol_comboboxe2955?.trigger) return;
    handleOnUpdate({mol_combobox:corporate_group92e02Ref?.current?.mol_combobox||""});
  },[mol_comboboxe2955?.trigger])

  useEffect(()=>{
    if(corporate_group92e02?.mol_combobox === "")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.molnumber==(selectedData||corporate_group92e02?.mol_combobox)))?.molnumber || corporate_group92e02?.mol_combobox;
      setselectedData(formBindedData)
    }
  },[corporate_group92e02?.mol_combobox])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `2 / 24`,
      gridRow: `7 / 14`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className="!rounded-xl"
        search={search}
        setSearch={setSearch}
        disabled= {mol_comboboxe2955?.isDisabled ? true : false}
        contentAlign={"center"}
        validationState={validate?.wps_v1?.mol_combobox ? "invalid" : undefined}
        onBlur={handleBlur}
        isStatic={false}
        placeholder={ "Select"}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="mol_number"
        toDisplay="molnumber"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={getDropdownData}
        initialPage ={paginationData.page || 1}
        pageCount ={paginationData.pageSize || PAGE_SIZE}
      />
    
  </div>
  )
}
