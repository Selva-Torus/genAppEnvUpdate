

'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext';
import { Tooltip } from '@/components/Tooltip';
import {BarChart} from '@/components/BarChart';
import { Text } from "@/components/Text";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Card } from '@/components/Card';
import i18n from '@/app/components/i18n';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { getFilterProps } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';

type ContentAlign = "left" | "center" | "right";

interface BarChartsbarChartCompProps {
  lockedData:any;
  setLockedData:any;
  encryptionFlagCompData: any;
  setIsProcessing: any;
  controlData: any;
}

export default function BarChartssalary_barchart({ 
  lockedData,
  setLockedData,
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: BarChartsbarChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any[]>([]);
  const {dfd_wpsdashboardsalaryprocessbarchart_v1Props, setdfd_wpsdashboardsalaryprocessbarchart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const toast : Function = useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const {salary_processed_label39115, setsalary_processed_label39115}= useContext(TotalContext) as TotalContextProps;  
  const {salary_barcharteedc3, setsalary_barcharteedc3}= useContext(TotalContext) as TotalContextProps;  
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
  const {salary_barcharteedc3Props, setsalary_barcharteedc3Props} = useContext(TotalContext) as TotalContextProps;
  //////////////




  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "d2fe76651b3a4bee99ad74adbd5e9737",
      "5c171603c6384217860b38252a2eedc3"
    );
    let code:string= orchestrationData?.data?.code;
      if (code != '') {
        let codeStates: Record<string, any> = {}
          codeStates['grp_wps']  = grp_wps7d0b0,
          codeStates['setgrp_wps'] = setgrp_wps7d0b0,
          codeStates['grp_eob']  = grp_eobedcde,
          codeStates['setgrp_eob'] = setgrp_eobedcde,
          codeStates['grp_wps_nack_failure']  = grp_wps_nack_failurecdb58,
          codeStates['setgrp_wps_nack_failure'] = setgrp_wps_nack_failurecdb58,
          codeStates['dash_tab_grp']  = dash_tab_grp477aa,
          codeStates['setdash_tab_grp'] = setdash_tab_grp477aa,
          codeStates['corporate_group']  = corporate_group92e02,
          codeStates['setcorporate_group'] = setcorporate_group92e02,
          codeStates['success_group']  = success_groupf3393,
          codeStates['setsuccess_group'] = setsuccess_groupf3393,
          codeStates['failure_group']  = failure_group60ccc,
          codeStates['setfailure_group'] = setfailure_group60ccc,
          codeStates['my_queue_group']  = my_queue_group17a74,
          codeStates['setmy_queue_group'] = setmy_queue_group17a74,
          codeStates['all_group']  = all_groupdc06f,
          codeStates['setall_group'] = setall_groupdc06f,
          codeStates['all_table']  = all_table9a484,
          codeStates['setall_table'] = setall_table9a484,
          codeStates['action_required_group']  = action_required_groupc490c,
          codeStates['setaction_required_group'] = setaction_required_groupc490c,
          codeStates['action_required_table']  = action_required_table0359e,
          codeStates['setaction_required_table'] = setaction_required_table0359e,
          codeStates['salary_return_refund_group']  = salary_return_refund_group9c3f2,
          codeStates['setsalary_return_refund_group'] = setsalary_return_refund_group9c3f2,
          codeStates['salary_return_refund_table']  = salary_return_refund_tablee81e8,
          codeStates['setsalary_return_refund_table'] = setsalary_return_refund_tablee81e8,
          codeStates['exception_group']  = exception_group8bd2f,
          codeStates['setexception_group'] = setexception_group8bd2f,
          codeStates['exception_table']  = exception_table77afe,
          codeStates['setexception_table'] = setexception_table77afe,
          codeStates['total_emp_group']  = total_emp_group824bb,
          codeStates['settotal_emp_group'] = settotal_emp_group824bb,
          codeStates['salary_process_group']  = salary_process_groupe9737,
          codeStates['setsalary_process_group'] = setsalary_process_groupe9737,
          codeStates['pie_chart_group']  = pie_chart_group31af3,
          codeStates['setpie_chart_group'] = setpie_chart_group31af3,
          codeStates['grp_employee_verify']  = grp_employee_verify730a2,
          codeStates['setgrp_employee_verify'] = setgrp_employee_verify730a2,
          codeStates['table_file_list']  = table_file_list44ec7,
          codeStates['settable_file_list'] = settable_file_list44ec7,
          codeStates['grp_overall_repair']  = grp_overall_repair8807c,
          codeStates['setgrp_overall_repair'] = setgrp_overall_repair8807c,
          codeStates['tbl_wps_file_journry']  = tbl_wps_file_journryabf3b,
          codeStates['settbl_wps_file_journry'] = settbl_wps_file_journryabf3b,
          codeStates['grp_overall_wps']  = grp_overall_wps9c663,
          codeStates['setgrp_overall_wps'] = setgrp_overall_wps9c663,
          codeStates['tbl_process_list']  = tbl_process_list752ff,
          codeStates['settbl_process_list'] = settbl_process_list752ff,
          codeStates['tbl_pos_file_list']  = tbl_pos_file_lista1c83,
          codeStates['settbl_pos_file_list'] = settbl_pos_file_lista1c83,
        codeExecution(code,codeStates);
      }
      if ("hasLogicCenter" in dfd_wpsdashboardsalaryprocessbarchart_v1Props && !dfd_wpsdashboardsalaryprocessbarchart_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_wpsdashboardsalaryprocessbarchart_v1Props.dstKey,
            page: +orchestrationData?.data?.action?.pagination?.page,
            count: +orchestrationData?.data?.action?.pagination?.count,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setsalary_process_groupe9737((pre: any) => ({
          ...pre,
          total_salary: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.total_salary
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setsalary_process_groupe9737((pre: any) => ({
          ...pre,
          total_salary: salary_barcharteedc3Props?.filteredData?.length > 0
            ? salary_barcharteedc3Props?.filteredData[0]?.total_salary
            : "0"
        }))
        setData(salary_barcharteedc3Props?.filteredData);
      }else if(Array.isArray(dfd_wpsdashboardsalaryprocessbarchart_v1Props) && dfd_wpsdashboardsalaryprocessbarchart_v1Props && !salary_process_groupe9737.total_salary){
          setData(dfd_wpsdashboardsalaryprocessbarchart_v1Props);
          setsalary_process_groupe9737((pre:any)=>({...pre,total_salary:dfd_wpsdashboardsalaryprocessbarchart_v1Props[0]?.total_salary}));
        }
      }
      if(Array.isArray(dfd_wpsdashboardsalaryprocessbarchart_v1Props)){
        return
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleClick=async(value?:any)=>{
    try{
    setIsProcessing(true);
    if(value){
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
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


  const handleBarClick = async (barData: any, index: number, event: React.MouseEvent) => {
    const clickedName = barData?.payload?.name;
    await handleClick(clickedName);
  };

  useEffect(() => {
    handleMapperDetails();
   },[salary_barcharteedc3?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_wpsdashboardsalaryprocessbarchart_v1Props) && dfd_wpsdashboardsalaryprocessbarchart_v1Props?.length > 0){
      setData(dfd_wpsdashboardsalaryprocessbarchart_v1Props);
      setsalary_process_groupe9737((pre:any)=>({...pre,total_salary:dfd_wpsdashboardsalaryprocessbarchart_v1Props[0]?.total_salary}));
    }
  },[dfd_wpsdashboardsalaryprocessbarchart_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!salary_barcharteedc3Props?.filterProps) return;
    handleMapperDetails(salary_barcharteedc3Props?.filterProps,salary_barcharteedc3Props?.filterFlag);
  },[salary_barcharteedc3Props?.filterProps])

 
  if (salary_barcharteedc3?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `10 / 54`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        className = ""
        numberKey= {'total_salary'}
        fillContainer={true}
        colors = {["#51688a","#f395b2"]}
        contentAlign="left"
        onClick={handleBarClick}
      />
    </div>
  );
}
