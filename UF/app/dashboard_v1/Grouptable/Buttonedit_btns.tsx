'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
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
 

const Buttonedit_btns = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const token:string = getCookie('token');
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

  const {header_groupb1913, setheader_groupb1913}= useContext(TotalContext) as TotalContextProps;
  const {header_groupb1913Props, setheader_groupb1913Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfeProps, setasset_dashboard_group4bbfeProps}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92ca, setamr_queue_groupc92ca}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92caProps, setamr_queue_groupc92caProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32, setpending_file_groupffe32}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32Props, setpending_file_groupffe32Props}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93, setservice_pending_group7ba93}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93Props, setservice_pending_group7ba93Props}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4, setslas_at_risk_group23eb4}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4Props, setslas_at_risk_group23eb4Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54, setcourt_rejection_groupc9d54}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54Props, setcourt_rejection_groupc9d54Props}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5, setcollected_mtd_group7b7b5}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5Props, setcollected_mtd_group7b7b5Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bd, settable_group112bd}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bdProps, settable_group112bdProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5, setsubscreene9ab5}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5Props, setsubscreene9ab5Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props}= useContext(TotalContext) as TotalContextProps;
  const {group28176, setgroup28176}= useContext(TotalContext) as TotalContextProps;
  const {group28176Props, setgroup28176Props}= useContext(TotalContext) as TotalContextProps;
  const {table852e3, settable852e3}= useContext(TotalContext) as TotalContextProps;
  const {table852e3Props, settable852e3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_display_id8caab, setcase_display_id8caab}= useContext(TotalContext) as TotalContextProps;
  const {debtor_namedb464, setdebtor_namedb464}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name29781, setcreditor_name29781}= useContext(TotalContext) as TotalContextProps;
  const {full_nameda699, setfull_nameda699}= useContext(TotalContext) as TotalContextProps;
  const {total_balancea27e6, settotal_balancea27e6}= useContext(TotalContext) as TotalContextProps;
  const {court_name03aea, setcourt_name03aea}= useContext(TotalContext) as TotalContextProps;
  const {priority_namec8266, setpriority_namec8266}= useContext(TotalContext) as TotalContextProps;
  const {status_named2368, setstatus_named2368}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_datec9e9d, settrs_created_datec9e9d}= useContext(TotalContext) as TotalContextProps;
  const {view_btns77c69, setview_btns77c69}= useContext(TotalContext) as TotalContextProps;
  const {edit_btns48ea7, setedit_btns48ea7}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568, setpending_fillings_groupb1568}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568Props, setpending_fillings_groupb1568Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279, setpending_fillings_table11279}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279Props, setpending_fillings_table11279Props}= useContext(TotalContext) as TotalContextProps;
  const {update294f0, setupdate294f0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {submit0112f, setsubmit0112f}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {addcase_v1Props, setaddcase_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['header_group'] = header_groupb1913,
      codeStates['setheader_group'] = setheader_groupb1913,
      codeStates['header_groupb1913'] = header_groupb1913Props,
      codeStates['setheader_groupb1913'] = setheader_groupb1913Props,
      codeStates['asset_dashboard_group'] = asset_dashboard_group4bbfe,
      codeStates['setasset_dashboard_group'] = setasset_dashboard_group4bbfe,
      codeStates['asset_dashboard_group4bbfe'] = asset_dashboard_group4bbfeProps,
      codeStates['setasset_dashboard_group4bbfe'] = setasset_dashboard_group4bbfeProps,
      codeStates['amr_queue_group'] = amr_queue_groupc92ca,
      codeStates['setamr_queue_group'] = setamr_queue_groupc92ca,
      codeStates['amr_queue_groupc92ca'] = amr_queue_groupc92caProps,
      codeStates['setamr_queue_groupc92ca'] = setamr_queue_groupc92caProps,
      codeStates['pending_file_group'] = pending_file_groupffe32,
      codeStates['setpending_file_group'] = setpending_file_groupffe32,
      codeStates['pending_file_groupffe32'] = pending_file_groupffe32Props,
      codeStates['setpending_file_groupffe32'] = setpending_file_groupffe32Props,
      codeStates['service_pending_group'] = service_pending_group7ba93,
      codeStates['setservice_pending_group'] = setservice_pending_group7ba93,
      codeStates['service_pending_group7ba93'] = service_pending_group7ba93Props,
      codeStates['setservice_pending_group7ba93'] = setservice_pending_group7ba93Props,
      codeStates['slas_at_risk_group'] = slas_at_risk_group23eb4,
      codeStates['setslas_at_risk_group'] = setslas_at_risk_group23eb4,
      codeStates['slas_at_risk_group23eb4'] = slas_at_risk_group23eb4Props,
      codeStates['setslas_at_risk_group23eb4'] = setslas_at_risk_group23eb4Props,
      codeStates['court_rejection_group'] = court_rejection_groupc9d54,
      codeStates['setcourt_rejection_group'] = setcourt_rejection_groupc9d54,
      codeStates['court_rejection_groupc9d54'] = court_rejection_groupc9d54Props,
      codeStates['setcourt_rejection_groupc9d54'] = setcourt_rejection_groupc9d54Props,
      codeStates['collected_mtd_group'] = collected_mtd_group7b7b5,
      codeStates['setcollected_mtd_group'] = setcollected_mtd_group7b7b5,
      codeStates['collected_mtd_group7b7b5'] = collected_mtd_group7b7b5Props,
      codeStates['setcollected_mtd_group7b7b5'] = setcollected_mtd_group7b7b5Props,
      codeStates['table_group'] = table_group112bd,
      codeStates['settable_group'] = settable_group112bd,
      codeStates['table_group112bd'] = table_group112bdProps,
      codeStates['settable_group112bd'] = settable_group112bdProps,
      codeStates['subscreen'] = subscreene9ab5,
      codeStates['setsubscreen'] = setsubscreene9ab5,
      codeStates['subscreene9ab5'] = subscreene9ab5Props,
      codeStates['setsubscreene9ab5'] = setsubscreene9ab5Props,
      codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
      codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
      codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
      codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
      codeStates['group'] = group28176,
      codeStates['setgroup'] = setgroup28176,
      codeStates['group28176'] = group28176Props,
      codeStates['setgroup28176'] = setgroup28176Props,
      codeStates['table'] = table852e3,
      codeStates['settable'] = settable852e3,
      codeStates['table852e3'] = table852e3Props,
      codeStates['settable852e3'] = settable852e3Props,
      codeStates['case_display_id'] = case_display_id8caab,
      codeStates['setcase_display_id'] = setcase_display_id8caab,
      codeStates['debtor_name'] = debtor_namedb464,
      codeStates['setdebtor_name'] = setdebtor_namedb464,
      codeStates['creditor_name'] = creditor_name29781,
      codeStates['setcreditor_name'] = setcreditor_name29781,
      codeStates['full_name'] = full_nameda699,
      codeStates['setfull_name'] = setfull_nameda699,
      codeStates['total_balance'] = total_balancea27e6,
      codeStates['settotal_balance'] = settotal_balancea27e6,
      codeStates['court_name'] = court_name03aea,
      codeStates['setcourt_name'] = setcourt_name03aea,
      codeStates['priority_name'] = priority_namec8266,
      codeStates['setpriority_name'] = setpriority_namec8266,
      codeStates['status_name'] = status_named2368,
      codeStates['setstatus_name'] = setstatus_named2368,
      codeStates['trs_created_date'] = trs_created_datec9e9d,
      codeStates['settrs_created_date'] = settrs_created_datec9e9d,
      codeStates['view_btns'] = view_btns77c69,
      codeStates['setview_btns'] = setview_btns77c69,
      codeStates['edit_btns'] = edit_btns48ea7,
      codeStates['setedit_btns'] = setedit_btns48ea7,
      codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
      codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
      codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
      codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
      codeStates['pending_fillings_group'] = pending_fillings_groupb1568,
      codeStates['setpending_fillings_group'] = setpending_fillings_groupb1568,
      codeStates['pending_fillings_groupb1568'] = pending_fillings_groupb1568Props,
      codeStates['setpending_fillings_groupb1568'] = setpending_fillings_groupb1568Props,
      codeStates['pending_fillings_table'] = pending_fillings_table11279,
      codeStates['setpending_fillings_table'] = setpending_fillings_table11279,
      codeStates['pending_fillings_table11279'] = pending_fillings_table11279Props,
      codeStates['setpending_fillings_table11279'] = setpending_fillings_table11279Props,
      codeStates['update'] = update294f0,
      codeStates['setupdate'] = setupdate294f0,
      codeStates['dynamicactions'] = dynamicactions094c3,
      codeStates['setdynamicactions'] = setdynamicactions094c3,
      codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
      codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
      codeStates['submit'] = submit0112f,
      codeStates['setsubmit'] = setsubmit0112f,
      codeStates['add_case_group'] = add_case_groupeb161,
      codeStates['setadd_case_group'] = setadd_case_groupeb161,
      codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
      codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
      codeStates['header_group'] = header_group4878f,
      codeStates['setheader_group'] = setheader_group4878f,
      codeStates['header_group4878f'] = header_group4878fProps,
      codeStates['setheader_group4878f'] = setheader_group4878fProps,
      codeStates['case_information_group'] = case_information_group28f6f,
      codeStates['setcase_information_group'] = setcase_information_group28f6f,
      codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
      codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
      codeStates['venue_details_group'] = venue_details_group17ac6,
      codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
      codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
      codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
      codeStates['debtor_information_group'] = debtor_information_group78a70,
      codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
      codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
      codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
      codeStates['financial_details_group'] = financial_details_group52f47,
      codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
      codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
      codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
      codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
      codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
      codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
      codeStates['checklist_main_group'] = checklist_main_group0df6b,
      codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
      codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
      codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
      codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
      codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
      codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
      codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
      codeStates['addcase_v1'] = addcase_v1Props,
      codeStates['setaddcase_v1'] = setaddcase_v1Props,
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
        "6638e195416b4642bda98e40af0852e3",
        "f6ae18f0c5f04e8392d4eceab5248ea7"
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
      if (id === "edit_btns48ea7") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[edit_btns48ea7?.refresh])


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

    //enableElement
    setupdate294f0((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsubmit0112f((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,add_case_groupeb161Props?.controls);
    setadd_case_groupeb161(bindData6||{})
    setadd_case_groupeb161Props({...add_case_groupeb161Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,header_group4878fProps?.controls);
    setheader_group4878f(bindData8||{})
    setheader_group4878fProps({...header_group4878fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,case_information_group28f6fProps?.controls);
    setcase_information_group28f6f(bindData10||{})
    setcase_information_group28f6fProps({...case_information_group28f6fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,venue_details_group17ac6Props?.controls);
    setvenue_details_group17ac6(bindData12||{})
    setvenue_details_group17ac6Props({...venue_details_group17ac6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,debtor_information_group78a70Props?.controls);
    setdebtor_information_group78a70(bindData14||{})
    setdebtor_information_group78a70Props({...debtor_information_group78a70Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,financial_details_group52f47Props?.controls);
    setfinancial_details_group52f47(bindData16||{})
    setfinancial_details_group52f47Props({...financial_details_group52f47Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,required_dociument_main_group04e92Props?.controls);
    setrequired_dociument_main_group04e92(bindData18||{})
    setrequired_dociument_main_group04e92Props({...required_dociument_main_group04e92Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,checklist_main_group0df6bProps?.controls);
    setchecklist_main_group0df6b(bindData20||{})
    setchecklist_main_group0df6bProps({...checklist_main_group0df6bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,required_dociument_header_groupe39c8Props?.controls);
    setrequired_dociument_header_groupe39c8(bindData22||{})
    setrequired_dociument_header_groupe39c8Props({...required_dociument_header_groupe39c8Props,presetValues:{...(mainData||{})}})
    // showArtifact
    let filterProps24: any =  [];
    let filterData24 = await getFilterProps(filterProps24,mainData);
    setaddcase_v1Props([...filterData24 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1', 'addcase_v1'));
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

 if (edit_btns48ea7?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1','dashboard','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {edit_btns48ea7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdOutlineEdit"
          iconDisplay='Start with Icon'
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btns

