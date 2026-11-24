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
import PageTechinboundreturnprocesspage2 from '@/app/techinboundreturnprocess_v1/techinboundreturnprocess_v1page';
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
 

const Buttontech_pending_mk_ip_return_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const {operational_pending_journey_group63667, setoperational_pending_journey_group63667}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_journey_group63667Props, setoperational_pending_journey_group63667Props}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23f, settechnical_pending_tab0b23f}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_tab0b23fProps, settechnical_pending_tab0b23fProps}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30, settechnical_pending_table84f30}= useContext(TotalContext) as TotalContextProps;
  const {technical_pending_table84f30Props, settechnical_pending_table84f30Props}= useContext(TotalContext) as TotalContextProps;
  const {value_date_technical_pending11fe0, setvalue_date_technical_pending11fe0}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_technical_pendinge182f, setdr_account_technical_pendinge182f}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_technical_pendingbc6bb, setdr_name_technical_pendingbc6bb}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency_technical_pendingbc856, setdr_currency_technical_pendingbc856}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount_technical_pending5e6cc, setdr_amount_technical_pending5e6cc}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_technical_pending3c4aa, setcr_account_technical_pending3c4aa}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_technical_pending1bc34, setcr_name_technical_pending1bc34}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_technical_pending78349, setcr_currency_technical_pending78349}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_technical_pending738a2, setcr_amount_technical_pending738a2}= useContext(TotalContext) as TotalContextProps;
  const {uuid_technical_pendingb820e, setuuid_technical_pendingb820e}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_mk_reject_btn432a8, settech_pending_mk_reject_btn432a8}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_mk_retry_btn5f5cf, settech_pending_mk_retry_btn5f5cf}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_chk_approve_btnc932b, settech_pending_chk_approve_btnc932b}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_chk_reject_btn2ef0c, settech_pending_chk_reject_btn2ef0c}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_mk_ip_return_btn3d651, settech_pending_mk_ip_return_btn3d651}= useContext(TotalContext) as TotalContextProps;
  const {tech_pending_chk_ip_verify_return_btn54b4c, settech_pending_chk_ip_verify_return_btn54b4c}= useContext(TotalContext) as TotalContextProps;
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
  const {techinboundreturnprocess_v1Props, settechinboundreturnprocess_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672, setreturndynamicactionsc7672}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672Props, setreturndynamicactionsc7672Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['value_date_technical_pending'] = value_date_technical_pending11fe0,
      codeStates['setvalue_date_technical_pending'] = setvalue_date_technical_pending11fe0,
      codeStates['dr_account_technical_pending'] = dr_account_technical_pendinge182f,
      codeStates['setdr_account_technical_pending'] = setdr_account_technical_pendinge182f,
      codeStates['dr_name_technical_pending'] = dr_name_technical_pendingbc6bb,
      codeStates['setdr_name_technical_pending'] = setdr_name_technical_pendingbc6bb,
      codeStates['dr_currency_technical_pending'] = dr_currency_technical_pendingbc856,
      codeStates['setdr_currency_technical_pending'] = setdr_currency_technical_pendingbc856,
      codeStates['dr_amount_technical_pending'] = dr_amount_technical_pending5e6cc,
      codeStates['setdr_amount_technical_pending'] = setdr_amount_technical_pending5e6cc,
      codeStates['cr_account_technical_pending'] = cr_account_technical_pending3c4aa,
      codeStates['setcr_account_technical_pending'] = setcr_account_technical_pending3c4aa,
      codeStates['cr_name_technical_pending'] = cr_name_technical_pending1bc34,
      codeStates['setcr_name_technical_pending'] = setcr_name_technical_pending1bc34,
      codeStates['cr_currency_technical_pending'] = cr_currency_technical_pending78349,
      codeStates['setcr_currency_technical_pending'] = setcr_currency_technical_pending78349,
      codeStates['cr_amount_technical_pending'] = cr_amount_technical_pending738a2,
      codeStates['setcr_amount_technical_pending'] = setcr_amount_technical_pending738a2,
      codeStates['uuid_technical_pending'] = uuid_technical_pendingb820e,
      codeStates['setuuid_technical_pending'] = setuuid_technical_pendingb820e,
      codeStates['tech_pending_mk_reject_btn'] = tech_pending_mk_reject_btn432a8,
      codeStates['settech_pending_mk_reject_btn'] = settech_pending_mk_reject_btn432a8,
      codeStates['tech_pending_mk_retry_btn'] = tech_pending_mk_retry_btn5f5cf,
      codeStates['settech_pending_mk_retry_btn'] = settech_pending_mk_retry_btn5f5cf,
      codeStates['tech_pending_chk_approve_btn'] = tech_pending_chk_approve_btnc932b,
      codeStates['settech_pending_chk_approve_btn'] = settech_pending_chk_approve_btnc932b,
      codeStates['tech_pending_chk_reject_btn'] = tech_pending_chk_reject_btn2ef0c,
      codeStates['settech_pending_chk_reject_btn'] = settech_pending_chk_reject_btn2ef0c,
      codeStates['tech_pending_mk_ip_return_btn'] = tech_pending_mk_ip_return_btn3d651,
      codeStates['settech_pending_mk_ip_return_btn'] = settech_pending_mk_ip_return_btn3d651,
      codeStates['tech_pending_chk_ip_verify_return_btn'] = tech_pending_chk_ip_verify_return_btn54b4c,
      codeStates['settech_pending_chk_ip_verify_return_btn'] = settech_pending_chk_ip_verify_return_btn54b4c,
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
      codeStates['techinboundreturnprocess_v1'] = techinboundreturnprocess_v1Props,
      codeStates['settechinboundreturnprocess_v1'] = settechinboundreturnprocess_v1Props,
      codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
      codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
      codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
      codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
      codeStates['returndynamicactions'] = returndynamicactionsc7672,
      codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
      codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
      codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
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
        "aa1e672fa7b94d048045b51e2f984f30",
        "2b43b900740b49e3bc8b45d54b33d651"
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
      if (id === "tech_pending_mk_ip_return_btn3d651") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[tech_pending_mk_ip_return_btn3d651?.refresh])


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

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    settechinboundreturnprocess_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,returnreasonsubgroupf68e5Props?.controls);
    setreturnreasonsubgroupf68e5(bindData4||{})
    setreturnreasonsubgroupf68e5Props({...returnreasonsubgroupf68e5Props,presetValues:{...(mainData||{})},tableName:tableName})
    // copyFormData
    // For group
    setreturndynamicactionsc7672((pre:any)=>({...pre,...mainData}));
    setreturndynamicactionsc7672Props({...returndynamicactionsc7672Props,presetValues:mainData,tableName:tableName});
    // copyFormData
    // For group
    setreturnreasonsubgroupf68e5((pre:any)=>({...pre,...mainData}));
    setreturnreasonsubgroupf68e5Props({...returnreasonsubgroupf68e5Props,presetValues:mainData,tableName:tableName});
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

 if (tech_pending_mk_ip_return_btn3d651?.isHidden) {
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
        modalName = "techinboundreturnprocess"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageTechinboundreturnprocesspage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {tech_pending_mk_ip_return_btn3d651?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Return")}
        </Button>}
      </div>
    
  )
}

export default Buttontech_pending_mk_ip_return_btn

