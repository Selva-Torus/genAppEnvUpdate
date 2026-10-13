'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import { useGlobal } from '@/context/GlobalContext'
import { logout } from "@/app/components/utils";  

const Groupgrp_wps = dynamic(() => import("./Groupgrp_wps/Groupgrp_wps"), { ssr: false });

export default function PageWpsV1({ onReady }: { onReady?: () => void } = {}) {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "IT Team": {
    "blockedGroups": []
  },
  "Operational Manager": {
    "blockedGroups": []
  },
  "Operational Officer": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "grp_wps": {},
  "grp_eob": {},
  "grp_wps_nack_failure": {},
  "tabgroup_post_excep": {},
  "dashboard_tab_header": {},
  "dash_tab_grp": {
    "salary_type_text": {
      "show": false
    },
    "month_text": {
      "show": false
    },
    "year_text": {
      "show": false
    },
    "salary_type_combobox": {
      "show": false
    },
    "month_combobox": {
      "show": false
    },
    "year_combobox": {
      "show": false
    }
  },
  "corporate_group": {
    "mol_number_text": {
      "show": false
    },
    "mol_combobox": {
      "show": false
    },
    "corporate_label": {
      "show": false
    },
    "parent_company_header": {
      "show": false
    },
    "parent_company_text": {
      "show": false
    },
    "company_header": {
      "show": false
    },
    "company_text": {
      "show": false
    },
    "branch_header": {
      "show": false
    },
    "branch_text": {
      "show": false
    }
  },
  "success_group": {
    "success_header": {
      "show": false
    },
    "icon_success": {
      "show": false
    },
    "wps_text": {
      "show": false
    },
    "wps_value_text": {
      "show": false
    },
    "non_wps_text": {
      "show": false
    },
    "non_wps_value_text": {
      "show": false
    },
    "paid_succes_text": {
      "show": false
    }
  },
  "failure_group": {
    "failure_header": {
      "show": false
    },
    "icon_failure": {
      "show": false
    },
    "wps_failure_text": {
      "show": false
    },
    "wps_failure_value_text": {
      "show": false
    },
    "non_wps_failure_text": {
      "show": false
    },
    "non_wps_failure_value_text": {
      "show": false
    },
    "paid_failure_text": {
      "show": false
    }
  },
  "my_queue_group": {
    "my_queue_icon": {
      "show": false
    },
    "my_queue_label": {
      "show": false
    }
  },
  "tab_overall": {},
  "tab_all": {},
  "all_group": {},
  "all_table": {
    "process": {
      "show": false
    },
    "file_count": {
      "show": false
    },
    "record_count": {
      "show": false
    }
  },
  "action_required_tab": {},
  "action_required_group": {},
  "action_required_table": {
    "process": {
      "show": false
    },
    "file_count": {
      "show": false
    },
    "record_count": {
      "show": false
    }
  },
  "salary_return_refund_tab": {},
  "salary_return_refund_group": {},
  "salary_return_refund_table": {
    "process": {
      "show": false
    },
    "file_count": {
      "show": false
    },
    "record_count": {
      "show": false
    }
  },
  "exception_tab": {},
  "exception_group": {},
  "exception_table": {
    "process": {
      "show": false
    },
    "file_count": {
      "show": false
    },
    "record_count": {
      "show": false
    }
  },
  "total_emp_group": {
    "total_employees_label": {
      "show": false
    },
    "total_emp_barchart": {
      "show": false
    }
  },
  "salary_process_group": {
    "salary_processed_label": {
      "show": false
    },
    "salary_barchart": {
      "show": false
    }
  },
  "pie_chart_group": {
    "piechart": {
      "show": false
    }
  },
  "tab_header_wps_nack_failure": {},
  "grp_employee_verify": {},
  "table_file_list": {
    "btn_nack_view_transaction": {
      "show": false
    },
    "col_source_name": {
      "show": false
    },
    "col_source_uuid": {
      "show": false
    },
    "col_file_type": {
      "show": false
    }
  },
  "tab_header_wps_file_journey": {},
  "grp_overall_repair": {},
  "tbl_wps_file_journry": {
    "col_sal_file": {
      "show": false
    },
    "col_processing_month": {
      "show": false
    },
    "btn_journey_summary_list": {
      "show": false
    },
    "col_tot_sal": {
      "show": false
    }
  },
  "tab_header_posting_exception": {},
  "grp_overall_wps": {},
  "tbl_process_list": {
    "col_process": {
      "show": false
    }
  },
  "tbl_pos_file_list": {
    "col_po_file_name": {
      "show": false
    },
    "col_po_tran_count": {
      "show": false
    },
    "btn_view_transaction": {
      "show": false
    },
    "col_po_empr_mol": {
      "show": false
    },
    "col_po_fix_sal": {
      "show": false
    },
    "col_var_amnt": {
      "show": false
    },
    "col_po_tot_amnt": {
      "show": false
    },
    "col_po_charges": {
      "show": false
    },
    "btn_retry": {
      "show": false
    },
    "btn_already_posted": {
      "show": false
    },
    "col_process_type": {
      "show": false
    }
  }
}
  const { token } = useGlobal();
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "wps";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {wps_v1, setwps_v1} = useContext(TotalContext) as TotalContextProps;
  const {wps_v1Props, setwps_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkgrp_wps,setCheckgrp_wps,]=useState<boolean>(false);
  const [checkgrp_eob,setCheckgrp_eob,]=useState<boolean>(false);
  const [checkgrp_wps_nack_failure,setCheckgrp_wps_nack_failure,]=useState<boolean>(false);
  const [checkdash_tab_grp,setCheckdash_tab_grp,]=useState<boolean>(false);
  const [checkcorporate_group,setCheckcorporate_group,]=useState<boolean>(false);
  const [checksuccess_group,setChecksuccess_group,]=useState<boolean>(false);
  const [checkfailure_group,setCheckfailure_group,]=useState<boolean>(false);
  const [checkmy_queue_group,setCheckmy_queue_group,]=useState<boolean>(false);
  const [checkall_group,setCheckall_group,]=useState<boolean>(false);
  const [checkall_table,setCheckall_table,]=useState<boolean>(false);
  const [checkaction_required_group,setCheckaction_required_group,]=useState<boolean>(false);
  const [checkaction_required_table,setCheckaction_required_table,]=useState<boolean>(false);
  const [checksalary_return_refund_group,setChecksalary_return_refund_group,]=useState<boolean>(false);
  const [checksalary_return_refund_table,setChecksalary_return_refund_table,]=useState<boolean>(false);
  const [checkexception_group,setCheckexception_group,]=useState<boolean>(false);
  const [checkexception_table,setCheckexception_table,]=useState<boolean>(false);
  const [checktotal_emp_group,setChecktotal_emp_group,]=useState<boolean>(false);
  const [checksalary_process_group,setChecksalary_process_group,]=useState<boolean>(false);
  const [checkpie_chart_group,setCheckpie_chart_group,]=useState<boolean>(false);
  const [checkgrp_employee_verify,setCheckgrp_employee_verify,]=useState<boolean>(false);
  const [checktable_file_list,setChecktable_file_list,]=useState<boolean>(false);
  const [checkgrp_overall_repair,setCheckgrp_overall_repair,]=useState<boolean>(false);
  const [checktbl_wps_file_journry,setChecktbl_wps_file_journry,]=useState<boolean>(false);
  const [checkgrp_overall_wps,setCheckgrp_overall_wps,]=useState<boolean>(false);
  const [checktbl_process_list,setChecktbl_process_list,]=useState<boolean>(false);
  const [checktbl_pos_file_list,setChecktbl_pos_file_list,]=useState<boolean>(false);
  const {grp_wps7d0b0, setgrp_wps7d0b0} = useContext(TotalContext) as TotalContextProps;
  const {grp_eobedcde, setgrp_eobedcde} = useContext(TotalContext) as TotalContextProps;
  const {grp_wps_nack_failurecdb58, setgrp_wps_nack_failurecdb58} = useContext(TotalContext) as TotalContextProps;
  const {dash_tab_grp477aa, setdash_tab_grp477aa} = useContext(TotalContext) as TotalContextProps;
  const {corporate_group92e02, setcorporate_group92e02} = useContext(TotalContext) as TotalContextProps;
  const {success_groupf3393, setsuccess_groupf3393} = useContext(TotalContext) as TotalContextProps;
  const {failure_group60ccc, setfailure_group60ccc} = useContext(TotalContext) as TotalContextProps;
  const {my_queue_group17a74, setmy_queue_group17a74} = useContext(TotalContext) as TotalContextProps;
  const {all_groupdc06f, setall_groupdc06f} = useContext(TotalContext) as TotalContextProps;
  const {all_table9a484, setall_table9a484} = useContext(TotalContext) as TotalContextProps;
  const {action_required_groupc490c, setaction_required_groupc490c} = useContext(TotalContext) as TotalContextProps;
  const {action_required_table0359e, setaction_required_table0359e} = useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_group9c3f2, setsalary_return_refund_group9c3f2} = useContext(TotalContext) as TotalContextProps;
  const {salary_return_refund_tablee81e8, setsalary_return_refund_tablee81e8} = useContext(TotalContext) as TotalContextProps;
  const {exception_group8bd2f, setexception_group8bd2f} = useContext(TotalContext) as TotalContextProps;
  const {exception_table77afe, setexception_table77afe} = useContext(TotalContext) as TotalContextProps;
  const {total_emp_group824bb, settotal_emp_group824bb} = useContext(TotalContext) as TotalContextProps;
  const {salary_process_groupe9737, setsalary_process_groupe9737} = useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group31af3, setpie_chart_group31af3} = useContext(TotalContext) as TotalContextProps;
  const {grp_employee_verify730a2, setgrp_employee_verify730a2} = useContext(TotalContext) as TotalContextProps;
  const {table_file_list44ec7, settable_file_list44ec7} = useContext(TotalContext) as TotalContextProps;
  const {grp_overall_repair8807c, setgrp_overall_repair8807c} = useContext(TotalContext) as TotalContextProps;
  const {tbl_wps_file_journryabf3b, settbl_wps_file_journryabf3b} = useContext(TotalContext) as TotalContextProps;
  const {grp_overall_wps9c663, setgrp_overall_wps9c663} = useContext(TotalContext) as TotalContextProps;
  const {tbl_process_list752ff, settbl_process_list752ff} = useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_file_lista1c83, settbl_pos_file_lista1c83} = useContext(TotalContext) as TotalContextProps;
  const {tabgroup_post_excep0d361, settabgroup_post_excep0d361} = useContext(TotalContext) as TotalContextProps;
  const {tab_overalla72da, settab_overalla72da} = useContext(TotalContext) as TotalContextProps;
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
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      wpsnackfailurefilelist_v1:false,
      wpsfilejourney_v1:false,
      postingexpectionfilelist_v1:false,
      postingexceptionprocesslist_v1:false,
      wpsdashboardcompanystructurecombo_v1:false,
      wpsdashboardmolnumbercombo_v1:false,
      wpsdashboardsuccesstab_v1:false,
      wpsdashboardfailuretab_v1:false,
      wpsdashboardsalarytypecombo_v1:false,
      wpsdashboardemployeesbarchart_v1:false,
      wpsdashboardsalaryprocessbarchart_v1:false,
      wpsdashboardmyqueueall_v1:false,
      wpsdashboardmonthcombo_v1:false,
      wpsdashboardyearcombo_v1:false,
      wpsdashboardsuccesstabnonwps_v1:false,
      wpsdashboardfailurenonwpstab_v1:false,
      wpsdashboardmyqueueactionrequired_v1:false,
      wpsdashboardmyqueuesalaryreturnrefund_v1:false,
      wpsdashboardmyqueueexceptions_v1:false,
    });
    async function wpsnackfailurefilelist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsnackfailurefilelist_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsnackfailurefilelist_v1Body["dpdKey"] = encryptionDpd;
          wpsnackfailurefilelist_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsnackfailurefilelist_v1Body['filterData'] = filterData;
        }
        const wpsnackfailurefilelist_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsnackfailurefilelist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsnackfailurefilelist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsnackfailurefilelist_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsnackfailurefilelist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsnackfailurefilelist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsnackfailurefilelist_v1Data?.data?.dataset) {
           setdfd_wpsnackfailurefilelist_v1Props(
              Array.isArray(wpsnackfailurefilelist_v1Data?.data?.dataset?.data)
                 ? wpsnackfailurefilelist_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsnackfailurefilelist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsnackfailurefilelist_v1) {
      wpsnackfailurefilelist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsnackfailurefilelist_v1= true
  },[refetch?.wpsnackfailurefilelist_v1])
    async function wpsfilejourney_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsfilejourney_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsFileJourney:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsfilejourney_v1Body["dpdKey"] = encryptionDpd;
          wpsfilejourney_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsFileJourney:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsfilejourney_v1Body['filterData'] = filterData;
        }
        const wpsfilejourney_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsfilejourney_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsfilejourney_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsfilejourney_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsfilejourney_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsfilejourney_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsfilejourney_v1Data?.data?.dataset) {
           setdfd_wpsfilejourney_v1Props(
              Array.isArray(wpsfilejourney_v1Data?.data?.dataset?.data)
                 ? wpsfilejourney_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsfilejourney_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsfilejourney_v1) {
      wpsfilejourney_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsfilejourney_v1= true
  },[refetch?.wpsfilejourney_v1])
    async function postingexpectionfilelist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let postingexpectionfilelist_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          postingexpectionfilelist_v1Body["dpdKey"] = encryptionDpd;
          postingexpectionfilelist_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExpectionFileList:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          postingexpectionfilelist_v1Body['filterData'] = filterData;
        }
        const postingexpectionfilelist_v1Data:any=await AxiosService.post("/te/eventEmitter",postingexpectionfilelist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=postingexpectionfilelist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(postingexpectionfilelist_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_postingexpectionfilelist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_postingexpectionfilelist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (postingexpectionfilelist_v1Data?.data?.dataset) {
           setdfd_postingexpectionfilelist_v1Props(
              Array.isArray(postingexpectionfilelist_v1Data?.data?.dataset?.data)
                 ? postingexpectionfilelist_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_postingexpectionfilelist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.postingexpectionfilelist_v1) {
      postingexpectionfilelist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.postingexpectionfilelist_v1= true
  },[refetch?.postingexpectionfilelist_v1])
    async function postingexceptionprocesslist_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let postingexceptionprocesslist_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExceptionProcessList:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          postingexceptionprocesslist_v1Body["dpdKey"] = encryptionDpd;
          postingexceptionprocesslist_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:postingExceptionProcessList:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          postingexceptionprocesslist_v1Body['filterData'] = filterData;
        }
        const postingexceptionprocesslist_v1Data:any=await AxiosService.post("/te/eventEmitter",postingexceptionprocesslist_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=postingexceptionprocesslist_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(postingexceptionprocesslist_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_postingexceptionprocesslist_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_postingexceptionprocesslist_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (postingexceptionprocesslist_v1Data?.data?.dataset) {
           setdfd_postingexceptionprocesslist_v1Props(
              Array.isArray(postingexceptionprocesslist_v1Data?.data?.dataset?.data)
                 ? postingexceptionprocesslist_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_postingexceptionprocesslist_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.postingexceptionprocesslist_v1) {
      postingexceptionprocesslist_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.postingexceptionprocesslist_v1= true
  },[refetch?.postingexceptionprocesslist_v1])
    async function wpsdashboardcompanystructurecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardcompanystructurecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardcompanystructurecombo_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardcompanystructurecombo_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardCompanyStructureCombo:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardcompanystructurecombo_v1Body['filterData'] = filterData;
        }
        const wpsdashboardcompanystructurecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardcompanystructurecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardcompanystructurecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardcompanystructurecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardcompanystructurecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardcompanystructurecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardcompanystructurecombo_v1Data?.data?.dataset) {
           setdfd_wpsdashboardcompanystructurecombo_v1Props(
              Array.isArray(wpsdashboardcompanystructurecombo_v1Data?.data?.dataset?.data)
                 ? wpsdashboardcompanystructurecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardcompanystructurecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardcompanystructurecombo_v1) {
      wpsdashboardcompanystructurecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardcompanystructurecombo_v1= true
  },[refetch?.wpsdashboardcompanystructurecombo_v1])
    async function wpsdashboardmolnumbercombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmolnumbercombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMolNumberCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmolnumbercombo_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmolnumbercombo_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMolNumberCombo:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmolnumbercombo_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmolnumbercombo_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmolnumbercombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmolnumbercombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmolnumbercombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmolnumbercombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmolnumbercombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmolnumbercombo_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmolnumbercombo_v1Props(
              Array.isArray(wpsdashboardmolnumbercombo_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmolnumbercombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmolnumbercombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmolnumbercombo_v1) {
      wpsdashboardmolnumbercombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmolnumbercombo_v1= true
  },[refetch?.wpsdashboardmolnumbercombo_v1])
    async function wpsdashboardsuccesstab_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardsuccesstab_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTab:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardsuccesstab_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardsuccesstab_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTab:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardsuccesstab_v1Body['filterData'] = filterData;
        }
        const wpsdashboardsuccesstab_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardsuccesstab_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardsuccesstab_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardsuccesstab_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsuccesstab_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardsuccesstab_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardsuccesstab_v1Data?.data?.dataset) {
           setdfd_wpsdashboardsuccesstab_v1Props(
              Array.isArray(wpsdashboardsuccesstab_v1Data?.data?.dataset?.data)
                 ? wpsdashboardsuccesstab_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsuccesstab_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardsuccesstab_v1) {
      wpsdashboardsuccesstab_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardsuccesstab_v1= true
  },[refetch?.wpsdashboardsuccesstab_v1])
    async function wpsdashboardfailuretab_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardfailuretab_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureTab:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardfailuretab_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardfailuretab_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureTab:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardfailuretab_v1Body['filterData'] = filterData;
        }
        const wpsdashboardfailuretab_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardfailuretab_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardfailuretab_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardfailuretab_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardfailuretab_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardfailuretab_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardfailuretab_v1Data?.data?.dataset) {
           setdfd_wpsdashboardfailuretab_v1Props(
              Array.isArray(wpsdashboardfailuretab_v1Data?.data?.dataset?.data)
                 ? wpsdashboardfailuretab_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardfailuretab_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardfailuretab_v1) {
      wpsdashboardfailuretab_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardfailuretab_v1= true
  },[refetch?.wpsdashboardfailuretab_v1])
    async function wpsdashboardsalarytypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardsalarytypecombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardsalarytypecombo_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardsalarytypecombo_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryTypeCombo:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardsalarytypecombo_v1Body['filterData'] = filterData;
        }
        const wpsdashboardsalarytypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardsalarytypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardsalarytypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardsalarytypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsalarytypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardsalarytypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardsalarytypecombo_v1Data?.data?.dataset) {
           setdfd_wpsdashboardsalarytypecombo_v1Props(
              Array.isArray(wpsdashboardsalarytypecombo_v1Data?.data?.dataset?.data)
                 ? wpsdashboardsalarytypecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsalarytypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardsalarytypecombo_v1) {
      wpsdashboardsalarytypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardsalarytypecombo_v1= true
  },[refetch?.wpsdashboardsalarytypecombo_v1])
    async function wpsdashboardemployeesbarchart_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardemployeesbarchart_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardEmployeesBarchart:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardemployeesbarchart_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardemployeesbarchart_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardEmployeesBarchart:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardemployeesbarchart_v1Body['filterData'] = filterData;
        }
        const wpsdashboardemployeesbarchart_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardemployeesbarchart_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardemployeesbarchart_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardemployeesbarchart_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardemployeesbarchart_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardemployeesbarchart_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardemployeesbarchart_v1Data?.data?.dataset) {
           setdfd_wpsdashboardemployeesbarchart_v1Props(
              Array.isArray(wpsdashboardemployeesbarchart_v1Data?.data?.dataset?.data)
                 ? wpsdashboardemployeesbarchart_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardemployeesbarchart_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardemployeesbarchart_v1) {
      wpsdashboardemployeesbarchart_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardemployeesbarchart_v1= true
  },[refetch?.wpsdashboardemployeesbarchart_v1])
    async function wpsdashboardsalaryprocessbarchart_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardsalaryprocessbarchart_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryProcessBarchart:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardsalaryprocessbarchart_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardsalaryprocessbarchart_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSalaryProcessBarchart:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardsalaryprocessbarchart_v1Body['filterData'] = filterData;
        }
        const wpsdashboardsalaryprocessbarchart_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardsalaryprocessbarchart_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardsalaryprocessbarchart_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardsalaryprocessbarchart_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsalaryprocessbarchart_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardsalaryprocessbarchart_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardsalaryprocessbarchart_v1Data?.data?.dataset) {
           setdfd_wpsdashboardsalaryprocessbarchart_v1Props(
              Array.isArray(wpsdashboardsalaryprocessbarchart_v1Data?.data?.dataset?.data)
                 ? wpsdashboardsalaryprocessbarchart_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsalaryprocessbarchart_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardsalaryprocessbarchart_v1) {
      wpsdashboardsalaryprocessbarchart_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardsalaryprocessbarchart_v1= true
  },[refetch?.wpsdashboardsalaryprocessbarchart_v1])
    async function wpsdashboardmyqueueall_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmyqueueall_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmyqueueall_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmyqueueall_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueAll:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmyqueueall_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmyqueueall_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmyqueueall_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmyqueueall_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmyqueueall_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueall_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmyqueueall_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmyqueueall_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmyqueueall_v1Props(
              Array.isArray(wpsdashboardmyqueueall_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmyqueueall_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueall_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmyqueueall_v1) {
      wpsdashboardmyqueueall_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmyqueueall_v1= true
  },[refetch?.wpsdashboardmyqueueall_v1])
    async function wpsdashboardmonthcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmonthcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMonthCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmonthcombo_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmonthcombo_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMonthCombo:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmonthcombo_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmonthcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmonthcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmonthcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmonthcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmonthcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmonthcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmonthcombo_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmonthcombo_v1Props(
              Array.isArray(wpsdashboardmonthcombo_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmonthcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmonthcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmonthcombo_v1) {
      wpsdashboardmonthcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmonthcombo_v1= true
  },[refetch?.wpsdashboardmonthcombo_v1])
    async function wpsdashboardyearcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardyearcombo_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardYearCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardyearcombo_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardyearcombo_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardYearCombo:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardyearcombo_v1Body['filterData'] = filterData;
        }
        const wpsdashboardyearcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardyearcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardyearcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardyearcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardyearcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardyearcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardyearcombo_v1Data?.data?.dataset) {
           setdfd_wpsdashboardyearcombo_v1Props(
              Array.isArray(wpsdashboardyearcombo_v1Data?.data?.dataset?.data)
                 ? wpsdashboardyearcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardyearcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardyearcombo_v1) {
      wpsdashboardyearcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardyearcombo_v1= true
  },[refetch?.wpsdashboardyearcombo_v1])
    async function wpsdashboardsuccesstabnonwps_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardsuccesstabnonwps_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTabNonWps:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardsuccesstabnonwps_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardsuccesstabnonwps_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardSuccessTabNonWps:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardsuccesstabnonwps_v1Body['filterData'] = filterData;
        }
        const wpsdashboardsuccesstabnonwps_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardsuccesstabnonwps_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardsuccesstabnonwps_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardsuccesstabnonwps_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsuccesstabnonwps_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardsuccesstabnonwps_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardsuccesstabnonwps_v1Data?.data?.dataset) {
           setdfd_wpsdashboardsuccesstabnonwps_v1Props(
              Array.isArray(wpsdashboardsuccesstabnonwps_v1Data?.data?.dataset?.data)
                 ? wpsdashboardsuccesstabnonwps_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardsuccesstabnonwps_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardsuccesstabnonwps_v1) {
      wpsdashboardsuccesstabnonwps_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardsuccesstabnonwps_v1= true
  },[refetch?.wpsdashboardsuccesstabnonwps_v1])
    async function wpsdashboardfailurenonwpstab_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardfailurenonwpstab_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureNonWpsTab:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardfailurenonwpstab_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardfailurenonwpstab_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardFailureNonWpsTab:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardfailurenonwpstab_v1Body['filterData'] = filterData;
        }
        const wpsdashboardfailurenonwpstab_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardfailurenonwpstab_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardfailurenonwpstab_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardfailurenonwpstab_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardfailurenonwpstab_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardfailurenonwpstab_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardfailurenonwpstab_v1Data?.data?.dataset) {
           setdfd_wpsdashboardfailurenonwpstab_v1Props(
              Array.isArray(wpsdashboardfailurenonwpstab_v1Data?.data?.dataset?.data)
                 ? wpsdashboardfailurenonwpstab_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardfailurenonwpstab_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardfailurenonwpstab_v1) {
      wpsdashboardfailurenonwpstab_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardfailurenonwpstab_v1= true
  },[refetch?.wpsdashboardfailurenonwpstab_v1])
    async function wpsdashboardmyqueueactionrequired_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmyqueueactionrequired_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmyqueueactionrequired_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmyqueueactionrequired_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueActionRequired:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmyqueueactionrequired_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmyqueueactionrequired_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmyqueueactionrequired_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmyqueueactionrequired_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmyqueueactionrequired_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueactionrequired_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmyqueueactionrequired_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmyqueueactionrequired_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmyqueueactionrequired_v1Props(
              Array.isArray(wpsdashboardmyqueueactionrequired_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmyqueueactionrequired_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueactionrequired_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmyqueueactionrequired_v1) {
      wpsdashboardmyqueueactionrequired_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmyqueueactionrequired_v1= true
  },[refetch?.wpsdashboardmyqueueactionrequired_v1])
    async function wpsdashboardmyqueuesalaryreturnrefund_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmyqueuesalaryreturnrefund_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmyqueuesalaryreturnrefund_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmyqueuesalaryreturnrefund_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueSalaryReturnRefund:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmyqueuesalaryreturnrefund_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmyqueuesalaryreturnrefund_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmyqueuesalaryreturnrefund_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmyqueuesalaryreturnrefund_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmyqueuesalaryreturnrefund_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmyqueuesalaryreturnrefund_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props(
              Array.isArray(wpsdashboardmyqueuesalaryreturnrefund_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmyqueuesalaryreturnrefund_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmyqueuesalaryreturnrefund_v1) {
      wpsdashboardmyqueuesalaryreturnrefund_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmyqueuesalaryreturnrefund_v1= true
  },[refetch?.wpsdashboardmyqueuesalaryreturnrefund_v1])
    async function wpsdashboardmyqueueexceptions_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let wpsdashboardmyqueueexceptions_v1Body:te_refreshDto={
          key: "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          wpsdashboardmyqueueexceptions_v1Body["dpdKey"] = encryptionDpd;
          wpsdashboardmyqueueexceptions_v1Body["method"] = encryptionMethod;
        }
        if(wps_v1Props.length > 0){
          for(let i=0;i< wps_v1Props.length;i++){
            if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsDashboardMyqueueExceptions:AFVK:v1"){
              // delete wps_v1Props[i].DFDkey;
              let temp=structuredClone(wps_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          wpsdashboardmyqueueexceptions_v1Body['filterData'] = filterData;
        }
        const wpsdashboardmyqueueexceptions_v1Data:any=await AxiosService.post("/te/eventEmitter",wpsdashboardmyqueueexceptions_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=wpsdashboardmyqueueexceptions_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(wpsdashboardmyqueueexceptions_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueexceptions_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_wpsdashboardmyqueueexceptions_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (wpsdashboardmyqueueexceptions_v1Data?.data?.dataset) {
           setdfd_wpsdashboardmyqueueexceptions_v1Props(
              Array.isArray(wpsdashboardmyqueueexceptions_v1Data?.data?.dataset?.data)
                 ? wpsdashboardmyqueueexceptions_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_wpsdashboardmyqueueexceptions_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.wpsdashboardmyqueueexceptions_v1) {
      wpsdashboardmyqueueexceptions_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.wpsdashboardmyqueueexceptions_v1= true
  },[refetch?.wpsdashboardmyqueueexceptions_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setwps_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const introspectParams = encryptionFlagPage
      ? {
          dpdKey: encryptionDpd,
          method: encryptionMethod,
          key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1"
        }
      : { key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1" }
    const encryptionFlagPageData: EncryptionFlagPageData = {
      flag: encryptionFlagPage,
      dpd: encryptionDpd,
      method: encryptionMethod
    }
    // fetchBatchData, introspect and myAccount-for-client don't depend on one
    // another's results — only programmain_v1DFD (below) needs the pagination
    // value that comes out of fetchBatchData. Run all three concurrently
    // instead of one after another. Each call is caught locally so one
    // failure doesn't swallow the other two responses (Promise.all rejects
    // on the first rejection otherwise).
    const [data, myAccountRes]: [any, any] = await Promise.all([
      fetchBatchData(
        'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1',
        [user],
        'pageWpsV1',
        token,
        encryptionFlagPageData
      ),
      token
        ? AxiosService.get("/UF/myAccount-for-client", {
            headers: { Authorization: `Bearer ${token}` },
            params: introspectParams
          }).catch((err: any) => ({ __error: err }))
        : Promise.resolve(null)
    ])
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${basePath}/next-api/auth/introspect?key=CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1`)
      if (!res.ok) {
        logout(token)
        return
      }
      //routes.refresh()

      try {
        if (myAccountRes?.__error) throw myAccountRes.__error;
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await wpsnackfailurefilelist_v1DFD(pagination)
    await wpsfilejourney_v1DFD(pagination)
    await postingexpectionfilelist_v1DFD(pagination)
    await postingexceptionprocesslist_v1DFD(pagination)
    await wpsdashboardcompanystructurecombo_v1DFD(pagination)
    await wpsdashboardmolnumbercombo_v1DFD(pagination)
    await wpsdashboardsuccesstab_v1DFD(pagination)
    await wpsdashboardfailuretab_v1DFD(pagination)
    await wpsdashboardsalarytypecombo_v1DFD(pagination)
    await wpsdashboardemployeesbarchart_v1DFD(pagination)
    await wpsdashboardsalaryprocessbarchart_v1DFD(pagination)
    await wpsdashboardmyqueueall_v1DFD(pagination)
    await wpsdashboardmonthcombo_v1DFD(pagination)
    await wpsdashboardyearcombo_v1DFD(pagination)
    await wpsdashboardsuccesstabnonwps_v1DFD(pagination)
    await wpsdashboardfailurenonwpstab_v1DFD(pagination)
    await wpsdashboardmyqueueactionrequired_v1DFD(pagination)
    await wpsdashboardmyqueuesalaryreturnrefund_v1DFD(pagination)
    await wpsdashboardmyqueueexceptions_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'grp_wps' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_wps(true)
            }
            if(nodes?.groupName == 'grp_eob' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_eob(true)
            }
            if(nodes?.groupName == 'grp_wps_nack_failure' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_wps_nack_failure(true)
            }
            if(nodes?.groupName == 'dash_tab_grp' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdash_tab_grp(true)
            }
            if(nodes?.groupName == 'corporate_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcorporate_group(true)
            }
            if(nodes?.groupName == 'success_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksuccess_group(true)
            }
            if(nodes?.groupName == 'failure_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfailure_group(true)
            }
            if(nodes?.groupName == 'my_queue_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckmy_queue_group(true)
            }
            if(nodes?.groupName == 'all_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckall_group(true)
            }
            if(nodes?.groupName == 'all_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckall_table(true)
            }
            if(nodes?.groupName == 'action_required_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaction_required_group(true)
            }
            if(nodes?.groupName == 'action_required_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaction_required_table(true)
            }
            if(nodes?.groupName == 'salary_return_refund_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksalary_return_refund_group(true)
            }
            if(nodes?.groupName == 'salary_return_refund_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksalary_return_refund_table(true)
            }
            if(nodes?.groupName == 'exception_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexception_group(true)
            }
            if(nodes?.groupName == 'exception_table' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckexception_table(true)
            }
            if(nodes?.groupName == 'total_emp_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktotal_emp_group(true)
            }
            if(nodes?.groupName == 'salary_process_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecksalary_process_group(true)
            }
            if(nodes?.groupName == 'pie_chart_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpie_chart_group(true)
            }
            if(nodes?.groupName == 'grp_employee_verify' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_employee_verify(true)
            }
            if(nodes?.groupName == 'table_file_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktable_file_list(true)
            }
            if(nodes?.groupName == 'grp_overall_repair' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_overall_repair(true)
            }
            if(nodes?.groupName == 'tbl_wps_file_journry' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_wps_file_journry(true)
            }
            if(nodes?.groupName == 'grp_overall_wps' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckgrp_overall_wps(true)
            }
            if(nodes?.groupName == 'tbl_process_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_process_list(true)
            }
            if(nodes?.groupName == 'tbl_pos_file_list' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecktbl_pos_file_list(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['grp_wps'] = grp_wps7d0b0;
          codeStates['setgrp_wps'] = setgrp_wps7d0b0;
          codeStates['grp_eob'] = grp_eobedcde;
          codeStates['setgrp_eob'] = setgrp_eobedcde;
          codeStates['grp_wps_nack_failure'] = grp_wps_nack_failurecdb58;
          codeStates['setgrp_wps_nack_failure'] = setgrp_wps_nack_failurecdb58;
          codeStates['dash_tab_grp'] = dash_tab_grp477aa;
          codeStates['setdash_tab_grp'] = setdash_tab_grp477aa;
          codeStates['corporate_group'] = corporate_group92e02;
          codeStates['setcorporate_group'] = setcorporate_group92e02;
          codeStates['success_group'] = success_groupf3393;
          codeStates['setsuccess_group'] = setsuccess_groupf3393;
          codeStates['failure_group'] = failure_group60ccc;
          codeStates['setfailure_group'] = setfailure_group60ccc;
          codeStates['my_queue_group'] = my_queue_group17a74;
          codeStates['setmy_queue_group'] = setmy_queue_group17a74;
          codeStates['all_group'] = all_groupdc06f;
          codeStates['setall_group'] = setall_groupdc06f;
          codeStates['all_table'] = all_table9a484;
          codeStates['setall_table'] = setall_table9a484;
          codeStates['action_required_group'] = action_required_groupc490c;
          codeStates['setaction_required_group'] = setaction_required_groupc490c;
          codeStates['action_required_table'] = action_required_table0359e;
          codeStates['setaction_required_table'] = setaction_required_table0359e;
          codeStates['salary_return_refund_group'] = salary_return_refund_group9c3f2;
          codeStates['setsalary_return_refund_group'] = setsalary_return_refund_group9c3f2;
          codeStates['salary_return_refund_table'] = salary_return_refund_tablee81e8;
          codeStates['setsalary_return_refund_table'] = setsalary_return_refund_tablee81e8;
          codeStates['exception_group'] = exception_group8bd2f;
          codeStates['setexception_group'] = setexception_group8bd2f;
          codeStates['exception_table'] = exception_table77afe;
          codeStates['setexception_table'] = setexception_table77afe;
          codeStates['total_emp_group'] = total_emp_group824bb;
          codeStates['settotal_emp_group'] = settotal_emp_group824bb;
          codeStates['salary_process_group'] = salary_process_groupe9737;
          codeStates['setsalary_process_group'] = setsalary_process_groupe9737;
          codeStates['pie_chart_group'] = pie_chart_group31af3;
          codeStates['setpie_chart_group'] = setpie_chart_group31af3;
          codeStates['grp_employee_verify'] = grp_employee_verify730a2;
          codeStates['setgrp_employee_verify'] = setgrp_employee_verify730a2;
          codeStates['table_file_list'] = table_file_list44ec7;
          codeStates['settable_file_list'] = settable_file_list44ec7;
          codeStates['grp_overall_repair'] = grp_overall_repair8807c;
          codeStates['setgrp_overall_repair'] = setgrp_overall_repair8807c;
          codeStates['tbl_wps_file_journry'] = tbl_wps_file_journryabf3b;
          codeStates['settbl_wps_file_journry'] = settbl_wps_file_journryabf3b;
          codeStates['grp_overall_wps'] = grp_overall_wps9c663;
          codeStates['setgrp_overall_wps'] = setgrp_overall_wps9c663;
          codeStates['tbl_process_list'] = tbl_process_list752ff;
          codeStates['settbl_process_list'] = settbl_process_list752ff;
          codeStates['tbl_pos_file_list'] = tbl_pos_file_lista1c83;
          codeStates['settbl_pos_file_list'] = settbl_pos_file_lista1c83;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck().finally(() => onReady?.());
    handleOnload();
    setwps_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(wps_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
tabgroup_post_excep:tabgroup_post_excep0d361.tabgroup_post_excep,tab_overall:tab_overalla72da.tab_overall,      }
      handleArtfactRule(wps_v1?._artfactPFRule_,data,allRuleData)
    }
  },[tabgroup_post_excep0d361.tabgroup_post_excep,tab_overalla72da.tab_overall,])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setwps_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checkgrp_wps && initialLoad &&<Groupgrp_wps
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    