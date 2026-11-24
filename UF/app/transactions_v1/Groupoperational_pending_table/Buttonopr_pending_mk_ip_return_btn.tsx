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
import PageInboundreturnprocesspage2 from '@/app/inboundreturnprocess_v1/inboundreturnprocess_v1page';
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
 

const Buttonopr_pending_mk_ip_return_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
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
  const {inboundreturnprocess_v1Props, setinboundreturnprocess_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981, setreturnreasonsubgroup63981}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981Props, setreturnreasonsubgroup63981Props}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7, setreturndynamicactions87eb7}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7Props, setreturndynamicactions87eb7Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reason38055, setreturn_reason38055}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code06fe7, setreturn_reason_code06fe7}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['inboundreturnprocess_v1'] = inboundreturnprocess_v1Props,
      codeStates['setinboundreturnprocess_v1'] = setinboundreturnprocess_v1Props,
      codeStates['returnreasonsubgroup'] = returnreasonsubgroup63981,
      codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroup63981,
      codeStates['returnreasonsubgroup63981'] = returnreasonsubgroup63981Props,
      codeStates['setreturnreasonsubgroup63981'] = setreturnreasonsubgroup63981Props,
      codeStates['returndynamicactions'] = returndynamicactions87eb7,
      codeStates['setreturndynamicactions'] = setreturndynamicactions87eb7,
      codeStates['returndynamicactions87eb7'] = returndynamicactions87eb7Props,
      codeStates['setreturndynamicactions87eb7'] = setreturndynamicactions87eb7Props,
      codeStates['return_reason'] = return_reason38055,
      codeStates['setreturn_reason'] = setreturn_reason38055,
      codeStates['return_reason_code'] = return_reason_code06fe7,
      codeStates['setreturn_reason_code'] = setreturn_reason_code06fe7,
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
        "21142dbc15dd4292834fcc8b760b715b"
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
      if (id === "opr_pending_mk_ip_return_btnb715b") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[opr_pending_mk_ip_return_btnb715b?.refresh])


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

  async function handleSave715b_1_1_4(){
     
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
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:inboundRetunrBindProcess:AFVK:v1|b35a50f413a94bc9a10e034d85e577f0"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:inboundRetunrBindProcess:AFVK:v1|b35a50f413a94bc9a10e034d85e577f0"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      //eventEmitter
      if(operational_pending_table0a253?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "21142dbc15dd4292834fcc8b760b715b",
  "type": "button",
  "name": "opr_pending_mk_ip_return_btn",
  "label": "opr_pending_mk_ip_return_btn",
  "sequence": 1,
  "children": [
    {
      "id": "21142dbc15dd4292834fcc8b760b715b.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "21142dbc15dd4292834fcc8b760b715b.1.1.1",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "showArtifactAsModal",
          "label": "showArtifactAsModal",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "38bd0ee6f8f3469a8467336f65e0c0f2.1.1.1.1",
              "type": "screen",
              "name": "inboundReturnProcess.v1",
              "label": "inboundReturnProcess.v1|Root",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1",
              "elementType": "",
              "groupType": "",
              "sequence": "1.1.1.1",
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
                "_type": "boolean",
                "value": false,
                "enabled": true
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
                    "value": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",
                    "enabled": true,
                    "_payload": {
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1:",
                      "nodeType": "searchParams"
                    },
                    "subSelection": {
                      "name": "Select node Name",
                      "_type": "array",
                      "items": [
                        {
                          "name": "nodeName",
                          "_type": "apiSelection",
                          "value": "c2a320f6a30140a487ed20c46f1763dd",
                          "enabled": true,
                          "_payload": {
                            "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1:",
                            "nodeType": "searchParams",
                            "storageType": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1"
                          },
                          "subSelection": {
                            "name": "filter",
                            "_type": "array",
                            "items": [
                              {
                                "filterParam": {
                                  "name": "filterParam",
                                  "_type": "objectSelection",
                                  "value": "properties.vgphstm_uuid",
                                  "enabled": true,
                                  "selectionList": {
                                    "type": "object",
                                    "$schema": "https://json-schema.org/draft/2020-12/schema",
                                    "required": [
                                      "vgphstm_id",
                                      "parent_vgphstm_uuid",
                                      "direction",
                                      "process_type",
                                      "tran_category",
                                      "message_code",
                                      "channel_name",
                                      "channel_reference",
                                      "tran_date",
                                      "tran_reference",
                                      "tran_seq_no",
                                      "value_date",
                                      "settlement_date",
                                      "dr_account",
                                      "dr_bank_code_type",
                                      "dr_bank_code",
                                      "dr_name",
                                      "dr_amount",
                                      "dr_currency",
                                      "cr_account",
                                      "cr_bank_code_type",
                                      "cr_bank_code",
                                      "cr_name",
                                      "cr_amount",
                                      "cr_currency",
                                      "remittance_info",
                                      "product_basic",
                                      "product_additional",
                                      "charge_type",
                                      "uuid",
                                      "vgphstm_uuid",
                                      "vgphsm_uuid",
                                      "vgphntm_uuid",
                                      "vgphsm_id",
                                      "prctm_id",
                                      "trs_created_date",
                                      "trs_created_by",
                                      "trs_modified_date",
                                      "trs_modified_by",
                                      "trs_process_id",
                                      "trs_access_profile",
                                      "trs_org_grp_code",
                                      "trs_org_code",
                                      "trs_role_grp_code",
                                      "trs_role_code",
                                      "trs_ps_grp_code",
                                      "trs_ps_code",
                                      "trs_sub_org_grp_code",
                                      "trs_sub_org_code",
                                      "trs_locked_by",
                                      "trs_locked_time",
                                      "trs_tenant_id",
                                      "trs_app_code",
                                      "trs_product_code",
                                      "trs_event_process_status",
                                      "trs_event_status",
                                      "trs_token_id",
                                      "trs_version",
                                      "trs_prev_process_code",
                                      "trs_prev_status",
                                      "trs_prev_process_status",
                                      "trs_process_code",
                                      "trs_status",
                                      "trs_process_status",
                                      "trs_next_process_code",
                                      "trs_next_status",
                                      "trs_next_process_status"
                                    ],
                                    "x-tables": [],
                                    "x-queries": 1,
                                    "properties": {
                                      "uuid": {
                                        "type": "string",
                                        "format": "uuid",
                                        "x-expression": "uuid"
                                      },
                                      "cr_name": {
                                        "type": "string",
                                        "x-expression": "cr_name"
                                      },
                                      "dr_name": {
                                        "type": "string",
                                        "x-expression": "dr_name"
                                      },
                                      "prctm_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "prctm_id"
                                      },
                                      "cr_amount": {
                                        "type": "number",
                                        "x-expression": "cr_amount"
                                      },
                                      "direction": {
                                        "type": "string",
                                        "x-expression": "direction"
                                      },
                                      "dr_amount": {
                                        "type": "number",
                                        "x-expression": "dr_amount"
                                      },
                                      "tran_date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "tran_date"
                                      },
                                      "vgphsm_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "vgphsm_id"
                                      },
                                      "cr_account": {
                                        "type": "string",
                                        "x-expression": "cr_account"
                                      },
                                      "dr_account": {
                                        "type": "string",
                                        "x-expression": "dr_account"
                                      },
                                      "trs_status": {
                                        "type": "string",
                                        "x-expression": "trs_status"
                                      },
                                      "value_date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "value_date"
                                      },
                                      "vgphstm_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "vgphstm_id"
                                      },
                                      "charge_type": {
                                        "type": "string",
                                        "x-expression": "charge_type"
                                      },
                                      "cr_currency": {
                                        "type": "string",
                                        "x-expression": "cr_currency"
                                      },
                                      "dr_currency": {
                                        "type": "string",
                                        "x-expression": "dr_currency"
                                      },
                                      "tran_seq_no": {
                                        "type": "string",
                                        "x-expression": "tran_seq_no"
                                      },
                                      "trs_ps_code": {
                                        "type": "string",
                                        "x-expression": "trs_ps_code"
                                      },
                                      "trs_version": {
                                        "type": "string",
                                        "x-expression": "trs_version"
                                      },
                                      "vgphsm_uuid": {
                                        "type": "string",
                                        "format": "uuid",
                                        "x-expression": "vgphsm_uuid"
                                      },
                                      "channel_name": {
                                        "type": "string",
                                        "x-expression": "channel_name"
                                      },
                                      "cr_bank_code": {
                                        "type": "string",
                                        "x-expression": "cr_bank_code"
                                      },
                                      "dr_bank_code": {
                                        "type": "string",
                                        "x-expression": "dr_bank_code"
                                      },
                                      "message_code": {
                                        "type": "string",
                                        "x-expression": "message_code"
                                      },
                                      "process_type": {
                                        "type": "string",
                                        "x-expression": "process_type"
                                      },
                                      "trs_app_code": {
                                        "type": "string",
                                        "x-expression": "trs_app_code"
                                      },
                                      "trs_org_code": {
                                        "type": "string",
                                        "x-expression": "trs_org_code"
                                      },
                                      "trs_token_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "trs_token_id"
                                      },
                                      "vgphntm_uuid": {
                                        "type": "string",
                                        "format": "uuid",
                                        "x-expression": "vgphntm_uuid"
                                      },
                                      "vgphstm_uuid": {
                                        "type": "string",
                                        "format": "uuid",
                                        "x-expression": "uuid"
                                      },
                                      "product_basic": {
                                        "type": "string",
                                        "x-expression": "product_basic"
                                      },
                                      "tran_category": {
                                        "type": "string",
                                        "x-expression": "tran_category"
                                      },
                                      "trs_locked_by": {
                                        "type": "string",
                                        "x-expression": "trs_locked_by"
                                      },
                                      "trs_role_code": {
                                        "type": "string",
                                        "x-expression": "trs_role_code"
                                      },
                                      "trs_tenant_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "trs_tenant_id"
                                      },
                                      "tran_reference": {
                                        "type": "string",
                                        "x-expression": "tran_reference"
                                      },
                                      "trs_created_by": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "trs_created_by"
                                      },
                                      "trs_process_id": {
                                        "type": "integer",
                                        "description": "Identifier",
                                        "x-expression": "trs_process_id"
                                      },
                                      "remittance_info": {
                                        "type": "string",
                                        "x-expression": "remittance_info"
                                      },
                                      "settlement_date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "settlement_date"
                                      },
                                      "trs_locked_time": {
                                        "type": "string",
                                        "x-expression": "trs_locked_time"
                                      },
                                      "trs_modified_by": {
                                        "type": "string",
                                        "x-expression": "trs_modified_by"
                                      },
                                      "trs_next_status": {
                                        "type": "string",
                                        "x-expression": "trs_next_status"
                                      },
                                      "trs_prev_status": {
                                        "type": "string",
                                        "x-expression": "trs_prev_status"
                                      },
                                      "trs_ps_grp_code": {
                                        "type": "string",
                                        "x-expression": "trs_ps_grp_code"
                                      },
                                      "trs_created_date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "trs_created_date"
                                      },
                                      "trs_event_status": {
                                        "type": "string",
                                        "x-expression": "trs_event_status"
                                      },
                                      "trs_org_grp_code": {
                                        "type": "string",
                                        "x-expression": "trs_org_grp_code"
                                      },
                                      "trs_process_code": {
                                        "type": "string",
                                        "x-expression": "trs_process_code"
                                      },
                                      "trs_product_code": {
                                        "type": "string",
                                        "x-expression": "trs_product_code"
                                      },
                                      "trs_sub_org_code": {
                                        "type": "string",
                                        "x-expression": "trs_sub_org_code"
                                      },
                                      "channel_reference": {
                                        "type": "string",
                                        "x-expression": "channel_reference"
                                      },
                                      "cr_bank_code_type": {
                                        "type": "string",
                                        "x-expression": "cr_bank_code_type"
                                      },
                                      "dr_bank_code_type": {
                                        "type": "string",
                                        "x-expression": "dr_bank_code_type"
                                      },
                                      "trs_modified_date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "x-expression": "trs_modified_date"
                                      },
                                      "trs_role_grp_code": {
                                        "type": "string",
                                        "x-expression": "trs_role_grp_code"
                                      },
                                      "product_additional": {
                                        "type": "string",
                                        "x-expression": "product_additional"
                                      },
                                      "trs_access_profile": {
                                        "type": "string",
                                        "x-expression": "trs_access_profile"
                                      },
                                      "trs_process_status": {
                                        "type": "string",
                                        "x-expression": "trs_process_status"
                                      },
                                      "parent_vgphstm_uuid": {
                                        "type": "string",
                                        "format": "uuid",
                                        "x-expression": "parent_vgphstm_uuid"
                                      },
                                      "trs_sub_org_grp_code": {
                                        "type": "string",
                                        "x-expression": "trs_sub_org_grp_code"
                                      },
                                      "trs_next_process_code": {
                                        "type": "string",
                                        "x-expression": "trs_next_process_code"
                                      },
                                      "trs_prev_process_code": {
                                        "type": "string",
                                        "x-expression": "trs_prev_process_code"
                                      },
                                      "trs_next_process_status": {
                                        "type": "string",
                                        "x-expression": "trs_next_process_status"
                                      },
                                      "trs_prev_process_status": {
                                        "type": "string",
                                        "x-expression": "trs_prev_process_status"
                                      },
                                      "trs_event_process_status": {
                                        "type": "string",
                                        "x-expression": "trs_event_process_status"
                                      }
                                    },
                                    "x-generated-at": "2026-05-30T11:01:09.862Z"
                                  }
                                },
                                "filterValue": {
                                  "name": "filterValue",
                                  "_type": "comboBox",
                                  "value": "4191088de55142acad34f099eff51add",
                                  "enabled": true,
                                  "selectionList": [
                                    {
                                      "key": "d11f4ad2b0a943bcafea5e9145a6ecd4",
                                      "label": "value_date_operational_pending"
                                    },
                                    {
                                      "key": "5bb2df944c4f4e0ab4ef93d2a792ab87",
                                      "label": "dr_account_operational_pending"
                                    },
                                    {
                                      "key": "49079c59a64a4c5da184e8f17e4a8ff6",
                                      "label": "dr_name_operational_pending"
                                    },
                                    {
                                      "key": "e166a02c14be46a2987d913a2b85146b",
                                      "label": "dr_currency_operational_pending"
                                    },
                                    {
                                      "key": "57cd4c3f3bd54284a2ebf0fffd670e3f",
                                      "label": "dr_amount_operational_pending"
                                    },
                                    {
                                      "key": "db1f68733de84db09de40abe932f9a9c",
                                      "label": "cr_account_operational_pending"
                                    },
                                    {
                                      "key": "a685b0ecc4554a53974559b5c1dbce21",
                                      "label": "cr_name_operational_pending"
                                    },
                                    {
                                      "key": "8c409521cfe3450ca9e3288c3ff282bc",
                                      "label": "cr_currency_operational_pending"
                                    },
                                    {
                                      "key": "ce40f5734b5a4fa5bd7cd210f5f0df81",
                                      "label": "cr_amount_operational_pending"
                                    },
                                    {
                                      "key": "e61311c795a24260a1ec1ba1dc43918d",
                                      "label": "new_payment_chk_verify_btn"
                                    },
                                    {
                                      "key": "c5bbdaad8bb34f218347ed94f33e1fa7",
                                      "label": "opr_pending_chk_authorize_btn"
                                    },
                                    {
                                      "key": "7c15d93a12e3448fa8142f1569033fe9",
                                      "label": "opr_pending_chk_approve_btn"
                                    },
                                    {
                                      "key": "6c5cf1eb3419414894eb363713818529",
                                      "label": "opr_pending_chk_reject_btn"
                                    },
                                    {
                                      "key": "a28a0c394f26406bbf0a024c0dd4eb90",
                                      "label": "opr_pending_mk_already_posted_btn"
                                    },
                                    {
                                      "key": "09e87ea2ad06488e85eddbb41f84af05",
                                      "label": "opr_pending_mk_retry_btn"
                                    },
                                    {
                                      "key": "ab6207daf11d4fadb0eb36ded4eb2c93",
                                      "label": "opr_pending_mk_reject_btn"
                                    },
                                    {
                                      "key": "0ea94d4457044dcd94b3684d9bb4506c",
                                      "label": "opr_pending_mk_Repost_btn"
                                    },
                                    {
                                      "key": "590b4426a6be42f5a5d03fa2cc6631df",
                                      "label": "opr_pending_mk_Push_next_step_btn"
                                    },
                                    {
                                      "key": "abf48bc4e9e547f781bcfe7151bdab56",
                                      "label": "opr_pending_mk_reverse_btn"
                                    },
                                    {
                                      "key": "21142dbc15dd4292834fcc8b760b715b",
                                      "label": "opr_pending_mk_ip_return_btn"
                                    },
                                    {
                                      "key": "59e2cdf5c90b40b1af97251974ac91a5",
                                      "label": "opr_pending_mk_repair_btn"
                                    },
                                    {
                                      "key": "09d0c6b221ce49a0a544e8bcf84b8342",
                                      "label": "opr_pending_chk_ip_verify_return_btn"
                                    },
                                    {
                                      "key": "389201b1c002401e9363e0d0902311fd",
                                      "label": "opr_pending_mk_op_return_btn"
                                    },
                                    {
                                      "key": "4e72b75cf6f54c2993f79b3d7d0e3f5b",
                                      "label": "opr_pending_chk_op_return_verify_btn"
                                    },
                                    {
                                      "key": "92f51995000a491992fa9d157c7c0708",
                                      "label": "opr_pending_mk_force_pass_btn"
                                    },
                                    {
                                      "key": "884810e7909148df98f0e25937252343",
                                      "label": "opr_pending_op_mk_applysplrate_btn"
                                    },
                                    {
                                      "key": "806f01dbb2c74ccbb68e2a857e9a62ff",
                                      "label": "opr_pending_ip_mkr_applysplrate_btn"
                                    },
                                    {
                                      "key": "0f2616c066fa467288954b1349fa5f0a",
                                      "label": "uuid_operational_pending"
                                    },
                                    {
                                      "key": "4191088de55142acad34f099eff51add",
                                      "label": "vgphstm_uuid"
                                    }
                                  ]
                                }
                              }
                            ],
                            "value": {},
                            "enabled": true,
                            "selectionList": []
                          },
                          "selectionList": [
                            {
                              "key": "c2a320f6a30140a487ed20c46f1763dd",
                              "label": "get_tran"
                            }
                          ]
                        }
                      ],
                      "enabled": true
                    },
                    "selectionList": [
                      "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:returnReason:AFVK:v1",
                      "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",
                      "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1"
                    ]
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
          "id": "21142dbc15dd4292834fcc8b760b715b.1.1.2",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "bindTran",
          "label": "bindTran",
          "sequence": "1.1.2",
          "children": [
            {
              "id": "f6337c10339c4bc78695377e90863981.1.1.2.1",
              "type": "screen",
              "name": "inboundReturnProcess.v1|returnreasonsubgroup",
              "label": "inboundReturnProcess.v1|returnreasonsubgroup",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1|returnreasonsubgroup",
              "elementType": "group",
              "groupType": "group",
              "sequence": "1.1.2.1",
              "children": []
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "path",
                "_type": "text",
                "value": "",
                "_label": "Path",
                "enabled": true
              },
              {
                "name": "isFullDataBinding",
                "_type": "boolean",
                "value": false,
                "enabled": true
              }
            ]
          }
        },
        {
          "id": "21142dbc15dd4292834fcc8b760b715b.1.1.3",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "copyFormData",
          "label": "copyFormData",
          "sequence": "1.1.3",
          "children": [
            {
              "id": "0ace85f9fa8b4485bcffdd51e2487eb7.1.1.3.1",
              "type": "screen",
              "name": "inboundReturnProcess.v1|returndynamicactions",
              "label": "inboundReturnProcess.v1|returndynamicactions",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1|returndynamicactions",
              "elementType": "group",
              "groupType": "dynamicactions",
              "sequence": "1.1.3.1",
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
        },
        {
          "id": "21142dbc15dd4292834fcc8b760b715b.1.1.4",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.4",
          "children": [
            {
              "id": "21142dbc15dd4292834fcc8b760b715b.1.1.4.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.1",
              "children": [
                {
                  "id": "f6337c10339c4bc78695377e90863981|f7868bc2c2814cb9a7efebb214338055.1.1.4.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "inboundReturnProcess.v1|returnreasonsubgroup|return_reason",
                  "label": "inboundReturnProcess.v1|returnreasonsubgroup|return_reason",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1|returnreasonsubgroup|return_reason",
                  "elementType": "dropdown",
                  "groupType": "dropdown",
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
                    "value": "data?.[0]?.product_additional?.return_reason",
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
              "id": "21142dbc15dd4292834fcc8b760b715b.1.1.4.2",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.4.2",
              "children": [
                {
                  "id": "f6337c10339c4bc78695377e90863981|1a3ddc3058084e9dac0b2b53b1d06fe7.1.1.4.2.1",
                  "value": "",
                  "type": "screen",
                  "name": "inboundReturnProcess.v1|returnreasonsubgroup|return_reason_code",
                  "label": "inboundReturnProcess.v1|returnreasonsubgroup|return_reason_code",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundReturnProcess:AFVK:v1|returnreasonsubgroup|return_reason_code",
                  "elementType": "dropdown",
                  "groupType": "dropdown",
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
                    "value": "data?.[0]?.product_additional?.return_reason_code",
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
                      "value": "success",
                      "enabled": true,
                      "selectionList": [
                        "none",
                        "info",
                        "success",
                        "warning",
                        "danger",
                        "utility"
                      ]
                    }
                  }
                }
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:inboundRetunrBindProcess:AFVK:v1|b35a50f413a94bc9a10e034d85e577f0"
          ]
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
        controlName: "opr_pending_mk_ip_return_btn"
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
              controlId:"21142dbc15dd4292834fcc8b760b715b"
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
            controlId:"21142dbc15dd4292834fcc8b760b715b"
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
    setreturnreasonsubgroup63981((prev: any) => ({ ...prev, return_reason:te_eventEmitter?.data.data?.[0]?.product_additional?.return_reason }));
    // copyFormData
    // For a specific controller
    setreturnreasonsubgroup63981((prev: any) => ({ ...prev, return_reason_code:te_eventEmitter?.data.data?.[0]?.product_additional?.return_reason_code }));
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

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c2a320f6a30140a487ed20c46f1763dd",
        "object": {
          "properties.vgphstm_uuid": "4191088de55142acad34f099eff51add"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setinboundreturnprocess_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,returnreasonsubgroup63981Props?.controls);
    setreturnreasonsubgroup63981(bindData4||{})
    setreturnreasonsubgroup63981Props({...returnreasonsubgroup63981Props,presetValues:{...(mainData||{})},tableName:tableName})
    // copyFormData
    // For group
    setreturndynamicactions87eb7((pre:any)=>({...pre,...mainData}));
    setreturndynamicactions87eb7Props({...returndynamicactions87eb7Props,presetValues:mainData,tableName:tableName});
    //eventEmitter
    await handleSave715b_1_1_4();
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

 if (opr_pending_mk_ip_return_btnb715b?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1','transactionproduct','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "inboundreturnprocess"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageInboundreturnprocesspage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {opr_pending_mk_ip_return_btnb715b?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Return")}
        </Button>}
      </div>
    
  )
}

export default Buttonopr_pending_mk_ip_return_btn

