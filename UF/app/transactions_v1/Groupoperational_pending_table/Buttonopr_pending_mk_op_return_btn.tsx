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
import { getPublicEnv } from "@/app/components/public-env";
import PageOutboundmanualreturnprocesspage17 from '@/app/outboundmanualreturnprocess_v1/outboundmanualreturnprocess_v1page';
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
 

const Buttonopr_pending_mk_op_return_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  let actionLockData : any = {"ttl":"","name":"","lockMode":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen17, setShowProfileAsModalOpen17] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {tran_main_group1dc7f, settran_main_group1dc7f}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group1dc7fProps, settran_main_group1dc7fProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64, settran_tab_group08b64}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group08b64Props, settran_tab_group08b64Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963, setview_all_tab4a963}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab4a963Props, setview_all_tab4a963Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87, setview_all_tablec9e87}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tablec9e87Props, setview_all_tablec9e87Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_group67ce4, setview_all_journey_group67ce4}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_group67ce4Props, setview_all_journey_group67ce4Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01, setfailure_queue_tab69f01}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tab69f01Props, setfailure_queue_tab69f01Props}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476f, setfailure_queue_tablea476f}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_tablea476fProps, setfailure_queue_tablea476fProps}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_journey_group36aba, setfailure_queue_journey_group36aba}= useContext(TotalContext) as TotalContextProps;
  const {failure_queue_journey_group36abaProps, setfailure_queue_journey_group36abaProps}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582, setsuccess_queue_tabef582}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_tabef582Props, setsuccess_queue_tabef582Props}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aae, setsuccess_queue_table63aae}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_table63aaeProps, setsuccess_queue_table63aaeProps}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_journey_group755eb, setsuccess_queue_journey_group755eb}= useContext(TotalContext) as TotalContextProps;
  const {success_queue_journey_group755ebProps, setsuccess_queue_journey_group755ebProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611e, setreturn_queue_tab5611e}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_tab5611eProps, setreturn_queue_tab5611eProps}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_journey_group92c55, setreturn_queue_journey_group92c55}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_journey_group92c55Props, setreturn_queue_journey_group92c55Props}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0, setreturn_queue_table267f0}= useContext(TotalContext) as TotalContextProps;
  const {return_queue_table267f0Props, setreturn_queue_table267f0Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_tab67331, setoperational_pending_tab67331}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_tab67331Props, setoperational_pending_tab67331Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253, setoperational_pending_table0a253}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253Props, setoperational_pending_table0a253Props}= useContext(TotalContext) as TotalContextProps;
  const {value_date_operational_pending6ecd4, setvalue_date_operational_pending6ecd4}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_operational_pending2ab87, setdr_account_operational_pending2ab87}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_operational_pendinga8ff6, setdr_name_operational_pendinga8ff6}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency_operational_pending5146b, setdr_currency_operational_pending5146b}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount_operational_pending70e3f, setdr_amount_operational_pending70e3f}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_operational_pendingf9a9c, setcr_account_operational_pendingf9a9c}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_operational_pendingbce21, setcr_name_operational_pendingbce21}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_operational_pending282bc, setcr_currency_operational_pending282bc}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_operational_pending0df81, setcr_amount_operational_pending0df81}= useContext(TotalContext) as TotalContextProps;
  const {new_payment_chk_verify_btn3918d, setnew_payment_chk_verify_btn3918d}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_authorize_btne1fa7, setopr_pending_chk_authorize_btne1fa7}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_approve_btn33fe9, setopr_pending_chk_approve_btn33fe9}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_reject_btn18529, setopr_pending_chk_reject_btn18529}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_already_posted_btn4eb90, setopr_pending_mk_already_posted_btn4eb90}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_retry_btn4af05, setopr_pending_mk_retry_btn4af05}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_reject_btnb2c93, setopr_pending_mk_reject_btnb2c93}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_repost_btn4506c, setopr_pending_mk_repost_btn4506c}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_push_next_step_btn631df, setopr_pending_mk_push_next_step_btn631df}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_reverse_btndab56, setopr_pending_mk_reverse_btndab56}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_ip_return_btnb715b, setopr_pending_mk_ip_return_btnb715b}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_repair_btnc91a5, setopr_pending_mk_repair_btnc91a5}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_ip_verify_return_btnb8342, setopr_pending_chk_ip_verify_return_btnb8342}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_op_return_btn311fd, setopr_pending_mk_op_return_btn311fd}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_op_return_verify_btne3f5b, setopr_pending_chk_op_return_verify_btne3f5b}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_mk_force_pass_btnc0708, setopr_pending_mk_force_pass_btnc0708}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_op_mk_applysplrate_btn52343, setopr_pending_op_mk_applysplrate_btn52343}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_ip_mkr_applysplrate_btna62ff, setopr_pending_ip_mkr_applysplrate_btna62ff}= useContext(TotalContext) as TotalContextProps;
  const {uuid_operational_pendinga5f0a, setuuid_operational_pendinga5f0a}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_op_appl_spl_rate_verfiy592a5, setopr_pending_chk_op_appl_spl_rate_verfiy592a5}= useContext(TotalContext) as TotalContextProps;
  const {opr_pending_chk_ip_appl_spl_rate_verfiyca082, setopr_pending_chk_ip_appl_spl_rate_verfiyca082}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_journey_group63667, setoperational_pending_journey_group63667}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_journey_group63667Props, setoperational_pending_journey_group63667Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23f, settechnical_pending_tab0b23f}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23fProps, settechnical_pending_tab0b23fProps}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30, settechnical_pending_table84f30}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30Props, settechnical_pending_table84f30Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_journey_groupe4f03, settechnical_pending_journey_groupe4f03}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_journey_groupe4f03Props, settechnical_pending_journey_groupe4f03Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_tab223c7, setnotification_pending_tab223c7}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_tab223c7Props, setnotification_pending_tab223c7Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_table45836, setnotification_pending_table45836}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_table45836Props, setnotification_pending_table45836Props}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_journey_groupc9534, setnotification_pending_journey_groupc9534}= useContext(TotalContext) as TotalContextProps;
  const {notification_pending_journey_groupc9534Props, setnotification_pending_journey_groupc9534Props}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tabfb252, setenquiry_tabfb252}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tabfb252Props, setenquiry_tabfb252Props}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tableb3b4e, setenquiry_tableb3b4e}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_tableb3b4eProps, setenquiry_tableb3b4eProps}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_journey_group047c9, setenquiry_journey_group047c9}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_journey_group047c9Props, setenquiry_journey_group047c9Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_account8ccf1, setdr_account8ccf1}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency6b8f0, setdr_currency6b8f0}= useContext(TotalContext) as TotalContextProps;
  const {debit_exchange_rate710eb, setdebit_exchange_rate710eb}= useContext(TotalContext) as TotalContextProps;
  const {ret_amountb0252, setret_amountb0252}= useContext(TotalContext) as TotalContextProps;
  const {ret_currencye06ce, setret_currencye06ce}= useContext(TotalContext) as TotalContextProps;
  const {calculated_ret_amountdc5ca, setcalculated_ret_amountdc5ca}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate71ca9, setexchange_rate71ca9}= useContext(TotalContext) as TotalContextProps;
  const {outboundmanualreturnprocess_v1Props, setoutboundmanualreturnprocess_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['tran_main_group'] = tran_main_group1dc7f,
      codeStates['settran_main_group'] = settran_main_group1dc7f,
      codeStates['tran_main_group1dc7f'] = tran_main_group1dc7fProps,
      codeStates['settran_main_group1dc7f'] = settran_main_group1dc7fProps,
      codeStates['tran_tab_group'] = tran_tab_group08b64,
      codeStates['settran_tab_group'] = settran_tab_group08b64,
      codeStates['tran_tab_group08b64'] = tran_tab_group08b64Props,
      codeStates['settran_tab_group08b64'] = settran_tab_group08b64Props,
      codeStates['view_all_tab'] = view_all_tab4a963,
      codeStates['setview_all_tab'] = setview_all_tab4a963,
      codeStates['view_all_tab4a963'] = view_all_tab4a963Props,
      codeStates['setview_all_tab4a963'] = setview_all_tab4a963Props,
      codeStates['view_all_table'] = view_all_tablec9e87,
      codeStates['setview_all_table'] = setview_all_tablec9e87,
      codeStates['view_all_tablec9e87'] = view_all_tablec9e87Props,
      codeStates['setview_all_tablec9e87'] = setview_all_tablec9e87Props,
      codeStates['view_all_journey_group'] = view_all_journey_group67ce4,
      codeStates['setview_all_journey_group'] = setview_all_journey_group67ce4,
      codeStates['view_all_journey_group67ce4'] = view_all_journey_group67ce4Props,
      codeStates['setview_all_journey_group67ce4'] = setview_all_journey_group67ce4Props,
      codeStates['failure_queue_tab'] = failure_queue_tab69f01,
      codeStates['setfailure_queue_tab'] = setfailure_queue_tab69f01,
      codeStates['failure_queue_tab69f01'] = failure_queue_tab69f01Props,
      codeStates['setfailure_queue_tab69f01'] = setfailure_queue_tab69f01Props,
      codeStates['failure_queue_table'] = failure_queue_tablea476f,
      codeStates['setfailure_queue_table'] = setfailure_queue_tablea476f,
      codeStates['failure_queue_tablea476f'] = failure_queue_tablea476fProps,
      codeStates['setfailure_queue_tablea476f'] = setfailure_queue_tablea476fProps,
      codeStates['failure_queue_journey_group'] = failure_queue_journey_group36aba,
      codeStates['setfailure_queue_journey_group'] = setfailure_queue_journey_group36aba,
      codeStates['failure_queue_journey_group36aba'] = failure_queue_journey_group36abaProps,
      codeStates['setfailure_queue_journey_group36aba'] = setfailure_queue_journey_group36abaProps,
      codeStates['success_queue_tab'] = success_queue_tabef582,
      codeStates['setsuccess_queue_tab'] = setsuccess_queue_tabef582,
      codeStates['success_queue_tabef582'] = success_queue_tabef582Props,
      codeStates['setsuccess_queue_tabef582'] = setsuccess_queue_tabef582Props,
      codeStates['success_queue_table'] = success_queue_table63aae,
      codeStates['setsuccess_queue_table'] = setsuccess_queue_table63aae,
      codeStates['success_queue_table63aae'] = success_queue_table63aaeProps,
      codeStates['setsuccess_queue_table63aae'] = setsuccess_queue_table63aaeProps,
      codeStates['success_queue_journey_group'] = success_queue_journey_group755eb,
      codeStates['setsuccess_queue_journey_group'] = setsuccess_queue_journey_group755eb,
      codeStates['success_queue_journey_group755eb'] = success_queue_journey_group755ebProps,
      codeStates['setsuccess_queue_journey_group755eb'] = setsuccess_queue_journey_group755ebProps,
      codeStates['return_queue_tab'] = return_queue_tab5611e,
      codeStates['setreturn_queue_tab'] = setreturn_queue_tab5611e,
      codeStates['return_queue_tab5611e'] = return_queue_tab5611eProps,
      codeStates['setreturn_queue_tab5611e'] = setreturn_queue_tab5611eProps,
      codeStates['return_queue_journey_group'] = return_queue_journey_group92c55,
      codeStates['setreturn_queue_journey_group'] = setreturn_queue_journey_group92c55,
      codeStates['return_queue_journey_group92c55'] = return_queue_journey_group92c55Props,
      codeStates['setreturn_queue_journey_group92c55'] = setreturn_queue_journey_group92c55Props,
      codeStates['return_queue_table'] = return_queue_table267f0,
      codeStates['setreturn_queue_table'] = setreturn_queue_table267f0,
      codeStates['return_queue_table267f0'] = return_queue_table267f0Props,
      codeStates['setreturn_queue_table267f0'] = setreturn_queue_table267f0Props,
      codeStates['operational_pending_tab'] = operational_pending_tab67331,
      codeStates['setoperational_pending_tab'] = setoperational_pending_tab67331,
      codeStates['operational_pending_tab67331'] = operational_pending_tab67331Props,
      codeStates['setoperational_pending_tab67331'] = setoperational_pending_tab67331Props,
      codeStates['operational_pending_table'] = operational_pending_table0a253,
      codeStates['setoperational_pending_table'] = setoperational_pending_table0a253,
      codeStates['operational_pending_table0a253'] = operational_pending_table0a253Props,
      codeStates['setoperational_pending_table0a253'] = setoperational_pending_table0a253Props,
      codeStates['value_date_operational_pending'] = value_date_operational_pending6ecd4,
      codeStates['setvalue_date_operational_pending'] = setvalue_date_operational_pending6ecd4,
      codeStates['dr_account_operational_pending'] = dr_account_operational_pending2ab87,
      codeStates['setdr_account_operational_pending'] = setdr_account_operational_pending2ab87,
      codeStates['dr_name_operational_pending'] = dr_name_operational_pendinga8ff6,
      codeStates['setdr_name_operational_pending'] = setdr_name_operational_pendinga8ff6,
      codeStates['dr_currency_operational_pending'] = dr_currency_operational_pending5146b,
      codeStates['setdr_currency_operational_pending'] = setdr_currency_operational_pending5146b,
      codeStates['dr_amount_operational_pending'] = dr_amount_operational_pending70e3f,
      codeStates['setdr_amount_operational_pending'] = setdr_amount_operational_pending70e3f,
      codeStates['cr_account_operational_pending'] = cr_account_operational_pendingf9a9c,
      codeStates['setcr_account_operational_pending'] = setcr_account_operational_pendingf9a9c,
      codeStates['cr_name_operational_pending'] = cr_name_operational_pendingbce21,
      codeStates['setcr_name_operational_pending'] = setcr_name_operational_pendingbce21,
      codeStates['cr_currency_operational_pending'] = cr_currency_operational_pending282bc,
      codeStates['setcr_currency_operational_pending'] = setcr_currency_operational_pending282bc,
      codeStates['cr_amount_operational_pending'] = cr_amount_operational_pending0df81,
      codeStates['setcr_amount_operational_pending'] = setcr_amount_operational_pending0df81,
      codeStates['new_payment_chk_verify_btn'] = new_payment_chk_verify_btn3918d,
      codeStates['setnew_payment_chk_verify_btn'] = setnew_payment_chk_verify_btn3918d,
      codeStates['opr_pending_chk_authorize_btn'] = opr_pending_chk_authorize_btne1fa7,
      codeStates['setopr_pending_chk_authorize_btn'] = setopr_pending_chk_authorize_btne1fa7,
      codeStates['opr_pending_chk_approve_btn'] = opr_pending_chk_approve_btn33fe9,
      codeStates['setopr_pending_chk_approve_btn'] = setopr_pending_chk_approve_btn33fe9,
      codeStates['opr_pending_chk_reject_btn'] = opr_pending_chk_reject_btn18529,
      codeStates['setopr_pending_chk_reject_btn'] = setopr_pending_chk_reject_btn18529,
      codeStates['opr_pending_mk_already_posted_btn'] = opr_pending_mk_already_posted_btn4eb90,
      codeStates['setopr_pending_mk_already_posted_btn'] = setopr_pending_mk_already_posted_btn4eb90,
      codeStates['opr_pending_mk_retry_btn'] = opr_pending_mk_retry_btn4af05,
      codeStates['setopr_pending_mk_retry_btn'] = setopr_pending_mk_retry_btn4af05,
      codeStates['opr_pending_mk_reject_btn'] = opr_pending_mk_reject_btnb2c93,
      codeStates['setopr_pending_mk_reject_btn'] = setopr_pending_mk_reject_btnb2c93,
      codeStates['opr_pending_mk_repost_btn'] = opr_pending_mk_repost_btn4506c,
      codeStates['setopr_pending_mk_repost_btn'] = setopr_pending_mk_repost_btn4506c,
      codeStates['opr_pending_mk_push_next_step_btn'] = opr_pending_mk_push_next_step_btn631df,
      codeStates['setopr_pending_mk_push_next_step_btn'] = setopr_pending_mk_push_next_step_btn631df,
      codeStates['opr_pending_mk_reverse_btn'] = opr_pending_mk_reverse_btndab56,
      codeStates['setopr_pending_mk_reverse_btn'] = setopr_pending_mk_reverse_btndab56,
      codeStates['opr_pending_mk_ip_return_btn'] = opr_pending_mk_ip_return_btnb715b,
      codeStates['setopr_pending_mk_ip_return_btn'] = setopr_pending_mk_ip_return_btnb715b,
      codeStates['opr_pending_mk_repair_btn'] = opr_pending_mk_repair_btnc91a5,
      codeStates['setopr_pending_mk_repair_btn'] = setopr_pending_mk_repair_btnc91a5,
      codeStates['opr_pending_chk_ip_verify_return_btn'] = opr_pending_chk_ip_verify_return_btnb8342,
      codeStates['setopr_pending_chk_ip_verify_return_btn'] = setopr_pending_chk_ip_verify_return_btnb8342,
      codeStates['opr_pending_mk_op_return_btn'] = opr_pending_mk_op_return_btn311fd,
      codeStates['setopr_pending_mk_op_return_btn'] = setopr_pending_mk_op_return_btn311fd,
      codeStates['opr_pending_chk_op_return_verify_btn'] = opr_pending_chk_op_return_verify_btne3f5b,
      codeStates['setopr_pending_chk_op_return_verify_btn'] = setopr_pending_chk_op_return_verify_btne3f5b,
      codeStates['opr_pending_mk_force_pass_btn'] = opr_pending_mk_force_pass_btnc0708,
      codeStates['setopr_pending_mk_force_pass_btn'] = setopr_pending_mk_force_pass_btnc0708,
      codeStates['opr_pending_op_mk_applysplrate_btn'] = opr_pending_op_mk_applysplrate_btn52343,
      codeStates['setopr_pending_op_mk_applysplrate_btn'] = setopr_pending_op_mk_applysplrate_btn52343,
      codeStates['opr_pending_ip_mkr_applysplrate_btn'] = opr_pending_ip_mkr_applysplrate_btna62ff,
      codeStates['setopr_pending_ip_mkr_applysplrate_btn'] = setopr_pending_ip_mkr_applysplrate_btna62ff,
      codeStates['uuid_operational_pending'] = uuid_operational_pendinga5f0a,
      codeStates['setuuid_operational_pending'] = setuuid_operational_pendinga5f0a,
      codeStates['opr_pending_chk_op_appl_spl_rate_verfiy'] = opr_pending_chk_op_appl_spl_rate_verfiy592a5,
      codeStates['setopr_pending_chk_op_appl_spl_rate_verfiy'] = setopr_pending_chk_op_appl_spl_rate_verfiy592a5,
      codeStates['opr_pending_chk_ip_appl_spl_rate_verfiy'] = opr_pending_chk_ip_appl_spl_rate_verfiyca082,
      codeStates['setopr_pending_chk_ip_appl_spl_rate_verfiy'] = setopr_pending_chk_ip_appl_spl_rate_verfiyca082,
      codeStates['operational_pending_journey_group'] = operational_pending_journey_group63667,
      codeStates['setoperational_pending_journey_group'] = setoperational_pending_journey_group63667,
      codeStates['operational_pending_journey_group63667'] = operational_pending_journey_group63667Props,
      codeStates['setoperational_pending_journey_group63667'] = setoperational_pending_journey_group63667Props,
      codeStates['technical_pending_tab'] = technical_pending_tab0b23f,
      codeStates['settechnical_pending_tab'] = settechnical_pending_tab0b23f,
      codeStates['technical_pending_tab0b23f'] = technical_pending_tab0b23fProps,
      codeStates['settechnical_pending_tab0b23f'] = settechnical_pending_tab0b23fProps,
      codeStates['technical_pending_table'] = technical_pending_table84f30,
      codeStates['settechnical_pending_table'] = settechnical_pending_table84f30,
      codeStates['technical_pending_table84f30'] = technical_pending_table84f30Props,
      codeStates['settechnical_pending_table84f30'] = settechnical_pending_table84f30Props,
      codeStates['technical_pending_journey_group'] = technical_pending_journey_groupe4f03,
      codeStates['settechnical_pending_journey_group'] = settechnical_pending_journey_groupe4f03,
      codeStates['technical_pending_journey_groupe4f03'] = technical_pending_journey_groupe4f03Props,
      codeStates['settechnical_pending_journey_groupe4f03'] = settechnical_pending_journey_groupe4f03Props,
      codeStates['notification_pending_tab'] = notification_pending_tab223c7,
      codeStates['setnotification_pending_tab'] = setnotification_pending_tab223c7,
      codeStates['notification_pending_tab223c7'] = notification_pending_tab223c7Props,
      codeStates['setnotification_pending_tab223c7'] = setnotification_pending_tab223c7Props,
      codeStates['notification_pending_table'] = notification_pending_table45836,
      codeStates['setnotification_pending_table'] = setnotification_pending_table45836,
      codeStates['notification_pending_table45836'] = notification_pending_table45836Props,
      codeStates['setnotification_pending_table45836'] = setnotification_pending_table45836Props,
      codeStates['notification_pending_journey_group'] = notification_pending_journey_groupc9534,
      codeStates['setnotification_pending_journey_group'] = setnotification_pending_journey_groupc9534,
      codeStates['notification_pending_journey_groupc9534'] = notification_pending_journey_groupc9534Props,
      codeStates['setnotification_pending_journey_groupc9534'] = setnotification_pending_journey_groupc9534Props,
      codeStates['enquiry_tab'] = enquiry_tabfb252,
      codeStates['setenquiry_tab'] = setenquiry_tabfb252,
      codeStates['enquiry_tabfb252'] = enquiry_tabfb252Props,
      codeStates['setenquiry_tabfb252'] = setenquiry_tabfb252Props,
      codeStates['enquiry_table'] = enquiry_tableb3b4e,
      codeStates['setenquiry_table'] = setenquiry_tableb3b4e,
      codeStates['enquiry_tableb3b4e'] = enquiry_tableb3b4eProps,
      codeStates['setenquiry_tableb3b4e'] = setenquiry_tableb3b4eProps,
      codeStates['enquiry_journey_group'] = enquiry_journey_group047c9,
      codeStates['setenquiry_journey_group'] = setenquiry_journey_group047c9,
      codeStates['enquiry_journey_group047c9'] = enquiry_journey_group047c9Props,
      codeStates['setenquiry_journey_group047c9'] = setenquiry_journey_group047c9Props,
      codeStates['dr_account'] = dr_account8ccf1,
      codeStates['setdr_account'] = setdr_account8ccf1,
      codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
      codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
      codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
      codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
      codeStates['dr_currency'] = dr_currency6b8f0,
      codeStates['setdr_currency'] = setdr_currency6b8f0,
      codeStates['debit_exchange_rate'] = debit_exchange_rate710eb,
      codeStates['setdebit_exchange_rate'] = setdebit_exchange_rate710eb,
      codeStates['ret_amount'] = ret_amountb0252,
      codeStates['setret_amount'] = setret_amountb0252,
      codeStates['ret_currency'] = ret_currencye06ce,
      codeStates['setret_currency'] = setret_currencye06ce,
      codeStates['calculated_ret_amount'] = calculated_ret_amountdc5ca,
      codeStates['setcalculated_ret_amount'] = setcalculated_ret_amountdc5ca,
      codeStates['exchange_rate'] = exchange_rate71ca9,
      codeStates['setexchange_rate'] = setexchange_rate71ca9,
      codeStates['outboundmanualreturnprocess_v1'] = outboundmanualreturnprocess_v1Props,
      codeStates['setoutboundmanualreturnprocess_v1'] = setoutboundmanualreturnprocess_v1Props,
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
        "ec0fa3b3e01145269d4d5b2823e0a253",
        "389201b1c002401e9363e0d0902311fd"
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
      if (id === "opr_pending_mk_op_return_btn311fd") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen17(false)
  },[opr_pending_mk_op_return_btn311fd?.refresh])


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

  async function handleSave11fd_1_1_4(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.transactionProduct_v1 || {}).some(val => {
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
      //let mainData:any=structuredClone(operational_pending_table0a253);
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
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundReturnBindProcess:AFVK:v1|19392e06be214dc4bbdb4de485f6664f"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundReturnBindProcess:AFVK:v1|19392e06be214dc4bbdb4de485f6664f"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      //eventEmitter
      if(operational_pending_table0a253?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "389201b1c002401e9363e0d0902311fd",
  "type": "button",
  "name": "opr_pending_mk_op_return_btn",
  "label": "opr_pending_mk_op_return_btn",
  "sequence": 1,
  "children": [
    {
      "id": "389201b1c002401e9363e0d0902311fd.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "389201b1c002401e9363e0d0902311fd.1.1.4",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.4",
          "children": [
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.1",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|1a8517dba2b4b9da76bfb7b40928ccf1.1.1.4.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|dr_account",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|dr_account",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|dr_account",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.1.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.dr_account",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.2",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.2",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|c5eb7681da4e4e6c68055d239546b8f0.1.1.4.2.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|dr_currency",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|dr_currency",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|dr_currency",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.2.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.dr_currency",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.3",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.3",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|6673d1f0de7aa89038419bd0eaf710eb.1.1.4.3.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|debit_exchange_rate",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|debit_exchange_rate",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|debit_exchange_rate",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.3.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.debit_exchange_rate",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.4",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.4",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|f20848e5a7252240d03ec6433b0b0252.1.1.4.4.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|ret_amount",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|ret_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|ret_amount",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.4.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.ret_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.5",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.5",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|1dcd603bb02b78e9fd964c898f5e06ce.1.1.4.5.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|ret_currency",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|ret_currency",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|ret_currency",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.5.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.ret_currency",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.6",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.6",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.4.6.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|calculated_ret_amount",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.6.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.calculated_ret_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "389201b1c002401e9363e0d0902311fd.1.1.4.7",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.7",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|d63f7eb2b2c357905ea76d9eb8771ca9.1.1.4.7.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|exchange_rate",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|exchange_rate",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|exchange_rate",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.4.7.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0]?.ck_dtl_product_basic?.exchange_rate",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
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
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundReturnBindProcess:AFVK:v1|19392e06be214dc4bbdb4de485f6664f"
          ]
        },
        {
          "id": "389201b1c002401e9363e0d0902311fd.1.1.7",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "showArtifactAsModal",
          "label": "showArtifactAsModal",
          "sequence": "1.1.7",
          "children": [
            {
              "id": "d624aa25816b4d2caea7facf8b1d6d94.1.1.7.1",
              "type": "screen",
              "name": "outboundManualReturnProcess.v1",
              "label": "outboundManualReturnProcess.v1|Root",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1",
              "elementType": "",
              "groupType": "",
              "sequence": "1.1.7.1",
              "children": []
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "width",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "height",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needLabel",
                "_type": "conditionalBoolean",
                "value": false,
                "enabled": true,
                "subSelection": {
                  "_true": {
                    "content": {
                      "name": "Title",
                      "_type": "text",
                      "value": "",
                      "enabled": true
                    }
                  }
                }
              },
              {
                "name": "position",
                "_type": "select",
                "value": "center",
                "enabled": true,
                "selectionList": [
                  "center",
                  "top",
                  "bottom",
                  "left",
                  "right",
                  "top-left",
                  "top-right",
                  "bottom-left",
                  "bottom-right"
                ]
              },
              {
                "name": "showOverlay",
                "_type": "boolean",
                "value": true,
                "enabled": true
              },
              {
                "name": "Filter Conditions",
                "_type": "array",
                "items": [
                  {
                    "name": "DFD Key",
                    "_type": "asyncSelection",
                    "value": "",
                    "enabled": true,
                    "_payload": {
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1:",
                      "nodeType": "searchParams"
                    },
                    "subSelection": {
                      "name": "Select node Name",
                      "_type": "array",
                      "items": [
                        {
                          "name": "nodeName",
                          "_type": "apiSelection",
                          "value": "",
                          "enabled": true,
                          "_payload": {
                            "key": "",
                            "nodeType": "searchParams"
                          },
                          "subSelection": {
                            "name": "filter",
                            "_type": "array",
                            "items": [
                              {
                                "filterParam": {
                                  "name": "filterParam",
                                  "_type": "objectSelection",
                                  "value": {},
                                  "enabled": true,
                                  "selectionList": []
                                },
                                "filterValue": {
                                  "name": "filterValue",
                                  "_type": "comboBox",
                                  "value": "",
                                  "enabled": true,
                                  "selectionList": []
                                }
                              }
                            ],
                            "value": {},
                            "enabled": true,
                            "selectionList": []
                          },
                          "selectionList": []
                        }
                      ],
                      "enabled": true
                    },
                    "selectionList": []
                  }
                ],
                "value": "",
                "_empty": true,
                "selectionList": []
              }
            ]
          }
        },
        {
          "id": "389201b1c002401e9363e0d0902311fd.1.1.8",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "copyFormData",
          "label": "copyFormData",
          "sequence": "1.1.8",
          "children": [
            {
              "id": "caa7a90344fcb98d6f8d0fda126d7745.1.1.8.1",
              "type": "screen",
              "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup",
              "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup",
              "elementType": "group",
              "groupType": "group",
              "sequence": "1.1.8.1",
              "children": []
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "parentTable",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "primaryKey",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "path",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "setValue",
                "_type": "array",
                "items": [
                  {
                    "source": "",
                    "target": ""
                  }
                ],
                "value": "",
                "enabled": true
              }
            ]
          }
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1";
      sourceId+= "|"+"ec0fa3b3e01145269d4d5b2823e0a253";
      let pathIds = SourceIdFilter(eventProperty,"1.1.4");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1"+"|"+"ec0fa3b3e01145269d4d5b2823e0a253"+"|"+eventProperty.id;
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
        upId : operational_pending_table0a253?.upId? [operational_pending_table0a253?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "opr_pending_mk_op_return_btn"
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
          typeof operational_pending_table0a253[item] === 'object' && 
          Array.isArray(operational_pending_table0a253[item]) && 
          operational_pending_table0a253[item].length > 0 && 
          typeof operational_pending_table0a253[item][0] !== "string"
        ) {
          const hasUrlProperty = operational_pending_table0a253[item][0]?.url !== undefined;
          const hasFileProperty = operational_pending_table0a253[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(operational_pending_table0a253[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(operational_pending_table0a253).map((item: any) => {
        if (
          typeof operational_pending_table0a253[item] === 'object' && 
          Array.isArray(operational_pending_table0a253[item]) && 
          operational_pending_table0a253[item].length > 0 && 
          typeof operational_pending_table0a253[item][0] !== "string"
        ) {
          const hasUrlProperty = operational_pending_table0a253[item][0]?.url !== undefined;
          const hasFileProperty = operational_pending_table0a253[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(operational_pending_table0a253[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = operational_pending_table0a253[reworkKeys[i]].map((item:any) => item?.file)
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
            const basePath : string = getPublicEnv('NEXT_PUBLIC_DFS_PATH') || "dfs-uploads";
            const bucketFolderame : string = getPublicEnv('NEXT_PUBLIC_DFS_BUCKETNAME') || 'uploadfile';
            formData.append('bucketFolderame', bucketFolderame.toLowerCase());
            formData.append('folderPath', basePath);

            const res : any = await AxiosService.post(
              `${getPublicEnv('NEXT_PUBLIC_API_BASE_URL')}/UF/uploadimg`,
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
        if(typeof operational_pending_table0a253[item]=='object')
        {
          if( operational_pending_table0a253[item].length>0 &&Object.keys(operational_pending_table0a253[item][0]).includes('_isSelected_'))
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

      if ("childTables" in operational_pending_table0a253) {
        te_saveBody.childTables = operational_pending_table0a253.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || operational_pending_table0a253 || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"ec0fa3b3e01145269d4d5b2823e0a253",
              controlId:"389201b1c002401e9363e0d0902311fd"
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
            formData:{...formData, ...nullFilter(tran_main_group1dc7f), ...nullFilter(tran_tab_group08b64), ...nullFilter(view_all_tab4a963), ...nullFilter(view_all_journey_group67ce4), ...nullFilter(failure_queue_tab69f01), ...nullFilter(failure_queue_journey_group36aba), ...nullFilter(success_queue_tabef582), ...nullFilter(success_queue_journey_group755eb), ...nullFilter(return_queue_tab5611e), ...nullFilter(return_queue_journey_group92c55), ...nullFilter(operational_pending_tab67331), ...nullFilter(operational_pending_journey_group63667), ...nullFilter(technical_pending_tab0b23f), ...nullFilter(technical_pending_journey_groupe4f03), ...nullFilter(notification_pending_tab223c7), ...nullFilter(notification_pending_journey_groupc9534), ...nullFilter(enquiry_tabfb252), ...nullFilter(enquiry_journey_group047c9)},
            key:uf_getPFDetails.key,
            groupId:"ec0fa3b3e01145269d4d5b2823e0a253",
            controlId:"389201b1c002401e9363e0d0902311fd"
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
    if (operational_pending_table0a253Props.ssKey !== '' && operational_pending_table0a253Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = operational_pending_table0a253Props.ssKey;          
    }
    if(mainData?.upId){
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(operational_pending_table0a253?.upId){
      te_eventEmitterBody['upId']= [operational_pending_table0a253?.upId];
    }
    if(operational_pending_table0a253?.upid){
      te_eventEmitterBody['upId']= [operational_pending_table0a253?.upid];
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

    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, dr_account:te_eventEmitter?.data.data[0]?.dr_account }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, dr_currency:te_eventEmitter?.data.data[0]?.dr_currency }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, debit_exchange_rate:te_eventEmitter?.data.data[0]?.debit_exchange_rate }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, ret_amount:te_eventEmitter?.data.data[0]?.ret_amount }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, ret_currency:te_eventEmitter?.data.data[0]?.ret_currency }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, calculated_ret_amount:te_eventEmitter?.data.data[0]?.calculated_ret_amount }));
    // copyFormData
    // For a specific controller
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, exchange_rate:te_eventEmitter?.data.data[0]?.ck_dtl_product_basic?.exchange_rate }));
    // showArtifactAsModal
    let filterProps14:any =  [];
    let filterData14 = await getFilterProps(filterProps14,mainData);
    setoutboundmanualreturnprocess_v1Props([...filterData14 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen17(true);
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
    await handleSave11fd_1_1_4();
    // showArtifactAsModal
    let filterProps17:any =  [];
    let filterData17 = await getFilterProps(filterProps17,mainData);
    setoutboundmanualreturnprocess_v1Props([...filterData17 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen17(true);
    // copyFormData
    // For group
    setapplyspecialratesubgroupd7745((pre:any)=>({...pre,...mainData}));
    setapplyspecialratesubgroupd7745Props({...applyspecialratesubgroupd7745Props,presetValues:mainData,tableName:tableName});
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
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

 if (opr_pending_mk_op_return_btn311fd?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1','transactionproduct','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen17} 
        onClose={() => {
          setShowProfileAsModalOpen17(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "outboundmanualreturnprocess"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageOutboundmanualreturnprocesspage17  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {opr_pending_mk_op_return_btn311fd?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Return")}
        </Button>}
      </div>
    
  )
}

export default Buttonopr_pending_mk_op_return_btn

