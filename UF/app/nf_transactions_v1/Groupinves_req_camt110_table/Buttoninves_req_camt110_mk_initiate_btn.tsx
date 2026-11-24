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
import PageNfinvestigationrequestcamt110page2 from '@/app/nfinvestigationrequestcamt110_v1/nfinvestigationrequestcamt110_v1page';
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
 

const Buttoninves_req_camt110_mk_initiate_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {tran_main_group9581a, settran_main_group9581a}= useContext(TotalContext) as TotalContextProps;
  const {tran_main_group9581aProps, settran_main_group9581aProps}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929, settran_tab_group2a929}= useContext(TotalContext) as TotalContextProps;
  const {tran_tab_group2a929Props, settran_tab_group2a929Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab9a177, setview_all_tab9a177}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tab9a177Props, setview_all_tab9a177Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a}= useContext(TotalContext) as TotalContextProps;
  const {view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps}= useContext(TotalContext) as TotalContextProps;
  const {cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_equest_camt055_tabf8dc6Props, setcancel_equest_camt055_tabf8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps;
  const {channel_name_inves_req_camt110026bb, setchannel_name_inves_req_camt110026bb}= useContext(TotalContext) as TotalContextProps;
  const {uuid_inves_req_camt110c3172, setuuid_inves_req_camt110c3172}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_inves_req_camt110a53ed, setdr_account_inves_req_camt110a53ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_name_inves_req_camt1101105a, setdr_name_inves_req_camt1101105a}= useContext(TotalContext) as TotalContextProps;
  const {cr_account_inves_req_camt110492e3, setcr_account_inves_req_camt110492e3}= useContext(TotalContext) as TotalContextProps;
  const {cr_name_inves_req_camt110dc531, setcr_name_inves_req_camt110dc531}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency_inves_req_camt110e2b2d, setcr_currency_inves_req_camt110e2b2d}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount_inves_req_camt11060ab5, setcr_amount_inves_req_camt11060ab5}= useContext(TotalContext) as TotalContextProps;
  const {message_code_inves_req_camt11064432, setmessage_code_inves_req_camt11064432}= useContext(TotalContext) as TotalContextProps;
  const {tran_date_inves_req_camt110772d7, settran_date_inves_req_camt110772d7}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_mk_initiate_btn3da3f, setinves_req_camt110_mk_initiate_btn3da3f}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_chk_verify_btn97d7c, setinves_req_camt110_chk_verify_btn97d7c}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props}= useContext(TotalContext) as TotalContextProps;
  const {investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177}= useContext(TotalContext) as TotalContextProps;
  const {investigation_response_camt111_tabf6177Props, setinvestigation_response_camt111_tabf6177Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props}= useContext(TotalContext) as TotalContextProps;
  const {nfinvestigationrequestcamt110_v1Props, setnfinvestigationrequestcamt110_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2, setinvestigationrequestcamt110dynamicactionsbfdc2}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2Props, setinvestigationrequestcamt110dynamicactionsbfdc2Props}= useContext(TotalContext) as TotalContextProps;
  const {investigation_type576c6, setinvestigation_type576c6}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props}= useContext(TotalContext) as TotalContextProps;
  const {investigation_reason74007, setinvestigation_reason74007}= useContext(TotalContext) as TotalContextProps;
  const {reason_description6d274, setreason_description6d274}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['tran_main_group'] = tran_main_group9581a,
      codeStates['settran_main_group'] = settran_main_group9581a,
      codeStates['tran_main_group9581a'] = tran_main_group9581aProps,
      codeStates['settran_main_group9581a'] = settran_main_group9581aProps,
      codeStates['tran_tab_group'] = tran_tab_group2a929,
      codeStates['settran_tab_group'] = settran_tab_group2a929,
      codeStates['tran_tab_group2a929'] = tran_tab_group2a929Props,
      codeStates['settran_tab_group2a929'] = settran_tab_group2a929Props,
      codeStates['view_all_tab'] = view_all_tab9a177,
      codeStates['setview_all_tab'] = setview_all_tab9a177,
      codeStates['view_all_tab9a177'] = view_all_tab9a177Props,
      codeStates['setview_all_tab9a177'] = setview_all_tab9a177Props,
      codeStates['view_all_table'] = view_all_tableccb40,
      codeStates['setview_all_table'] = setview_all_tableccb40,
      codeStates['view_all_tableccb40'] = view_all_tableccb40Props,
      codeStates['setview_all_tableccb40'] = setview_all_tableccb40Props,
      codeStates['view_all_journey_group'] = view_all_journey_groupca47a,
      codeStates['setview_all_journey_group'] = setview_all_journey_groupca47a,
      codeStates['view_all_journey_groupca47a'] = view_all_journey_groupca47aProps,
      codeStates['setview_all_journey_groupca47a'] = setview_all_journey_groupca47aProps,
      codeStates['cancel_equest_camt055_tab'] = cancel_equest_camt055_tabf8dc6,
      codeStates['setcancel_equest_camt055_tab'] = setcancel_equest_camt055_tabf8dc6,
      codeStates['cancel_equest_camt055_tabf8dc6'] = cancel_equest_camt055_tabf8dc6Props,
      codeStates['setcancel_equest_camt055_tabf8dc6'] = setcancel_equest_camt055_tabf8dc6Props,
      codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976,
      codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976,
      codeStates['cancel_request_camt055_table9e976'] = cancel_request_camt055_table9e976Props,
      codeStates['setcancel_request_camt055_table9e976'] = setcancel_request_camt055_table9e976Props,
      codeStates['cancel_request_camt055_journey_group'] = cancel_request_camt055_journey_groupd18a2,
      codeStates['setcancel_request_camt055_journey_group'] = setcancel_request_camt055_journey_groupd18a2,
      codeStates['cancel_request_camt055_journey_groupd18a2'] = cancel_request_camt055_journey_groupd18a2Props,
      codeStates['setcancel_request_camt055_journey_groupd18a2'] = setcancel_request_camt055_journey_groupd18a2Props,
      codeStates['inves_req_camt110_tab'] = inves_req_camt110_tab81869,
      codeStates['setinves_req_camt110_tab'] = setinves_req_camt110_tab81869,
      codeStates['inves_req_camt110_tab81869'] = inves_req_camt110_tab81869Props,
      codeStates['setinves_req_camt110_tab81869'] = setinves_req_camt110_tab81869Props,
      codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e,
      codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e,
      codeStates['inves_req_camt110_tablefa00e'] = inves_req_camt110_tablefa00eProps,
      codeStates['setinves_req_camt110_tablefa00e'] = setinves_req_camt110_tablefa00eProps,
      codeStates['channel_name_inves_req_camt110'] = channel_name_inves_req_camt110026bb,
      codeStates['setchannel_name_inves_req_camt110'] = setchannel_name_inves_req_camt110026bb,
      codeStates['uuid_inves_req_camt110'] = uuid_inves_req_camt110c3172,
      codeStates['setuuid_inves_req_camt110'] = setuuid_inves_req_camt110c3172,
      codeStates['dr_account_inves_req_camt110'] = dr_account_inves_req_camt110a53ed,
      codeStates['setdr_account_inves_req_camt110'] = setdr_account_inves_req_camt110a53ed,
      codeStates['dr_name_inves_req_camt110'] = dr_name_inves_req_camt1101105a,
      codeStates['setdr_name_inves_req_camt110'] = setdr_name_inves_req_camt1101105a,
      codeStates['cr_account_inves_req_camt110'] = cr_account_inves_req_camt110492e3,
      codeStates['setcr_account_inves_req_camt110'] = setcr_account_inves_req_camt110492e3,
      codeStates['cr_name_inves_req_camt110'] = cr_name_inves_req_camt110dc531,
      codeStates['setcr_name_inves_req_camt110'] = setcr_name_inves_req_camt110dc531,
      codeStates['cr_currency_inves_req_camt110'] = cr_currency_inves_req_camt110e2b2d,
      codeStates['setcr_currency_inves_req_camt110'] = setcr_currency_inves_req_camt110e2b2d,
      codeStates['cr_amount_inves_req_camt110'] = cr_amount_inves_req_camt11060ab5,
      codeStates['setcr_amount_inves_req_camt110'] = setcr_amount_inves_req_camt11060ab5,
      codeStates['message_code_inves_req_camt110'] = message_code_inves_req_camt11064432,
      codeStates['setmessage_code_inves_req_camt110'] = setmessage_code_inves_req_camt11064432,
      codeStates['tran_date_inves_req_camt110'] = tran_date_inves_req_camt110772d7,
      codeStates['settran_date_inves_req_camt110'] = settran_date_inves_req_camt110772d7,
      codeStates['inves_req_camt110_mk_initiate_btn'] = inves_req_camt110_mk_initiate_btn3da3f,
      codeStates['setinves_req_camt110_mk_initiate_btn'] = setinves_req_camt110_mk_initiate_btn3da3f,
      codeStates['inves_req_camt110_chk_verify_btn'] = inves_req_camt110_chk_verify_btn97d7c,
      codeStates['setinves_req_camt110_chk_verify_btn'] = setinves_req_camt110_chk_verify_btn97d7c,
      codeStates['inves_req_camt110_journey_group'] = inves_req_camt110_journey_groupca738,
      codeStates['setinves_req_camt110_journey_group'] = setinves_req_camt110_journey_groupca738,
      codeStates['inves_req_camt110_journey_groupca738'] = inves_req_camt110_journey_groupca738Props,
      codeStates['setinves_req_camt110_journey_groupca738'] = setinves_req_camt110_journey_groupca738Props,
      codeStates['investigation_response_camt111_tab'] = investigation_response_camt111_tabf6177,
      codeStates['setinvestigation_response_camt111_tab'] = setinvestigation_response_camt111_tabf6177,
      codeStates['investigation_response_camt111_tabf6177'] = investigation_response_camt111_tabf6177Props,
      codeStates['setinvestigation_response_camt111_tabf6177'] = setinvestigation_response_camt111_tabf6177Props,
      codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401,
      codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401,
      codeStates['inves_res_camt111_table0f401'] = inves_res_camt111_table0f401Props,
      codeStates['setinves_res_camt111_table0f401'] = setinves_res_camt111_table0f401Props,
      codeStates['inves_res_camt111_journey_group'] = inves_res_camt111_journey_group785d4,
      codeStates['setinves_res_camt111_journey_group'] = setinves_res_camt111_journey_group785d4,
      codeStates['inves_res_camt111_journey_group785d4'] = inves_res_camt111_journey_group785d4Props,
      codeStates['setinves_res_camt111_journey_group785d4'] = setinves_res_camt111_journey_group785d4Props,
      codeStates['nfinvestigationrequestcamt110_v1'] = nfinvestigationrequestcamt110_v1Props,
      codeStates['setnfinvestigationrequestcamt110_v1'] = setnfinvestigationrequestcamt110_v1Props,
      codeStates['investigationrequestcamt110dynamicactions'] = investigationrequestcamt110dynamicactionsbfdc2,
      codeStates['setinvestigationrequestcamt110dynamicactions'] = setinvestigationrequestcamt110dynamicactionsbfdc2,
      codeStates['investigationrequestcamt110dynamicactionsbfdc2'] = investigationrequestcamt110dynamicactionsbfdc2Props,
      codeStates['setinvestigationrequestcamt110dynamicactionsbfdc2'] = setinvestigationrequestcamt110dynamicactionsbfdc2Props,
      codeStates['investigation_type'] = investigation_type576c6,
      codeStates['setinvestigation_type'] = setinvestigation_type576c6,
      codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
      codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
      codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
      codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
      codeStates['investigation_reason'] = investigation_reason74007,
      codeStates['setinvestigation_reason'] = setinvestigation_reason74007,
      codeStates['reason_description'] = reason_description6d274,
      codeStates['setreason_description'] = setreason_description6d274,
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
        "ecefaaa12a714b72a69e2249cf2fa00e",
        "7c0e001f7e1822cb3e8173e119f3da3f"
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
      if (id === "inves_req_camt110_mk_initiate_btn3da3f") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[inves_req_camt110_mk_initiate_btn3da3f?.refresh])


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

  async function handleSaveda3f_1_1_3(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.nfTransactionProduct_v1 || {}).some(val => {
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
      //let mainData:any=structuredClone(inves_req_camt110_tablefa00e);
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
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:nfBindTranProcess:AFVK:v1|b1c1b38340eb42f39f5769f6d4151d4b"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:nfBindTranProcess:AFVK:v1|b1c1b38340eb42f39f5769f6d4151d4b"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      //eventEmitter
      if(inves_req_camt110_tablefa00e?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "7c0e001f7e1822cb3e8173e119f3da3f",
  "type": "button",
  "name": "inves_req_camt110_mk_initiate_btn",
  "label": "inves_req_camt110_mk_initiate_btn",
  "sequence": 1,
  "children": [
    {
      "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.1",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "showArtifactAsModal",
          "label": "showArtifactAsModal",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "05838f8991ef4d588aac292f3a2b6520.1.1.1.1",
              "type": "screen",
              "name": "nfInvestigationRequestCamt110.v1",
              "label": "nfInvestigationRequestCamt110.v1|Root",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1",
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
                ],
                "value": "center",
                "enabled": true
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
                "_empty": true,
                "items": [
                  {
                    "name": "DFD Key",
                    "_type": "asyncSelection",
                    "selectionList": [],
                    "value": "",
                    "enabled": true,
                    "_payload": {
                      "key": "",
                      "nodeType": "searchParams"
                    },
                    "subSelection": {
                      "name": "Select node Name",
                      "_type": "array",
                      "items": [
                        {
                          "name": "nodeName",
                          "_type": "apiSelection",
                          "_payload": {
                            "key": "",
                            "nodeType": "searchParams"
                          },
                          "selectionList": [],
                          "value": "",
                          "enabled": true,
                          "subSelection": {
                            "name": "filter",
                            "_type": "array",
                            "items": [
                              {
                                "filterParam": {
                                  "name": "filterParam",
                                  "_type": "objectSelection",
                                  "selectionList": [],
                                  "value": {},
                                  "enabled": true
                                },
                                "filterValue": {
                                  "name": "filterValue",
                                  "_type": "comboBox",
                                  "selectionList": [],
                                  "value": "",
                                  "enabled": true
                                }
                              }
                            ],
                            "selectionList": [],
                            "value": {},
                            "enabled": true
                          }
                        }
                      ],
                      "enabled": true
                    }
                  }
                ],
                "selectionList": [],
                "value": ""
              }
            ]
          }
        },
        {
          "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.2",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "copyFormData",
          "label": "copyFormData",
          "sequence": "1.1.2",
          "children": [
            {
              "id": "2df7c310dfd4aa84b5a533c02cdbfdc2.1.1.2.1",
              "type": "screen",
              "name": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110dynamicactions",
              "label": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110dynamicactions",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1|investigationrequestcamt110dynamicactions",
              "elementType": "group",
              "groupType": "dynamicactions",
              "sequence": "1.1.2.1",
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
          "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.3",
          "children": [
            {
              "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3.4",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "hasDataHandler",
              "label": "hasDataHandler",
              "sequence": "1.1.3.4",
              "children": [
                {
                  "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3.4.1",
                  "type": "responseNode",
                  "name": "success",
                  "label": "success",
                  "sequence": "1.1.3.4.1",
                  "children": [
                    {
                      "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3.4.1.1",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "copyFormData",
                      "label": "copyFormData",
                      "sequence": "1.1.3.4.1.1",
                      "children": [
                        {
                          "id": "2400165be479e7a3dcf96a66d20276a5|810f4d1ed10d4037aa999cc2dd5576c6.1.1.3.4.1.1.1",
                          "value": "",
                          "type": "screen",
                          "name": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_type",
                          "label": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_type",
                          "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1|investigationrequestcamt110subgroup|investigation_type",
                          "elementType": "dropdown",
                          "groupType": "dropdown",
                          "sequence": "1.1.3.4.1.1.1",
                          "children": []
                        },
                        {
                          "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3.4.1.1.2",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "copyFormData",
                          "label": "copyFormData",
                          "sequence": "1.1.3.4.1.1.2",
                          "children": [
                            {
                              "id": "2400165be479e7a3dcf96a66d20276a5|9053b0f54f5e0b38474bfdf4dfc74007.1.1.3.4.1.1.2.1",
                              "value": "",
                              "type": "screen",
                              "name": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_reason",
                              "label": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_reason",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1|investigationrequestcamt110subgroup|investigation_reason",
                              "elementType": "dropdown",
                              "groupType": "dropdown",
                              "sequence": "1.1.3.4.1.1.2.1",
                              "children": []
                            },
                            {
                              "id": "7c0e001f7e1822cb3e8173e119f3da3f.1.1.3.4.1.1.2.2",
                              "eventContext": "riseListen",
                              "value": "",
                              "type": "handlerNode",
                              "name": "copyFormData",
                              "label": "copyFormData",
                              "sequence": "1.1.3.4.1.1.2.2",
                              "children": [
                                {
                                  "id": "2400165be479e7a3dcf96a66d20276a5|d1aa13cb04ef9f49f5714c5f6d66d274.1.1.3.4.1.1.2.2.1",
                                  "value": "",
                                  "type": "screen",
                                  "name": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|reason_description",
                                  "label": "nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|reason_description",
                                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationRequestCamt110:AFVK:v1|investigationrequestcamt110subgroup|reason_description",
                                  "elementType": "textinput",
                                  "groupType": "textinput",
                                  "sequence": "1.1.3.4.1.1.2.2.1",
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
                                    "value": "data[0]?.product_basic?.reason_description",
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
                                "value": "data[0]?.product_basic?.investigation_reason",
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
                            "value": "data[0]?.product_basic?.investigation_type",
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
              ],
              "hlr": {
                "params": [
                  {
                    "name": "path",
                    "_label": "Path",
                    "_type": "text",
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
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:nfBindTranProcess:AFVK:v1|b1c1b38340eb42f39f5769f6d4151d4b"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1";
      sourceId+= "|"+"ecefaaa12a714b72a69e2249cf2fa00e";
      let pathIds = SourceIdFilter(eventProperty,"1.1.3");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1"+"|"+"ecefaaa12a714b72a69e2249cf2fa00e"+"|"+eventProperty.id;
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
        upId : inves_req_camt110_tablefa00e?.upId? [inves_req_camt110_tablefa00e?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "inves_req_camt110_mk_initiate_btn"
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
          typeof inves_req_camt110_tablefa00e[item] === 'object' && 
          Array.isArray(inves_req_camt110_tablefa00e[item]) && 
          inves_req_camt110_tablefa00e[item].length > 0 && 
          typeof inves_req_camt110_tablefa00e[item][0] !== "string"
        ) {
          const hasUrlProperty = inves_req_camt110_tablefa00e[item][0]?.url !== undefined;
          const hasFileProperty = inves_req_camt110_tablefa00e[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(inves_req_camt110_tablefa00e[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(inves_req_camt110_tablefa00e).map((item: any) => {
        if (
          typeof inves_req_camt110_tablefa00e[item] === 'object' && 
          Array.isArray(inves_req_camt110_tablefa00e[item]) && 
          inves_req_camt110_tablefa00e[item].length > 0 && 
          typeof inves_req_camt110_tablefa00e[item][0] !== "string"
        ) {
          const hasUrlProperty = inves_req_camt110_tablefa00e[item][0]?.url !== undefined;
          const hasFileProperty = inves_req_camt110_tablefa00e[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(inves_req_camt110_tablefa00e[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = inves_req_camt110_tablefa00e[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof inves_req_camt110_tablefa00e[item]=='object')
        {
          if( inves_req_camt110_tablefa00e[item].length>0 &&Object.keys(inves_req_camt110_tablefa00e[item][0]).includes('_isSelected_'))
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

      if ("childTables" in inves_req_camt110_tablefa00e) {
        te_saveBody.childTables = inves_req_camt110_tablefa00e.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || inves_req_camt110_tablefa00e || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"ecefaaa12a714b72a69e2249cf2fa00e",
              controlId:"7c0e001f7e1822cb3e8173e119f3da3f"
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
            formData:{...formData, ...nullFilter(tran_main_group9581a), ...nullFilter(tran_tab_group2a929), ...nullFilter(view_all_tab9a177), ...nullFilter(view_all_journey_groupca47a), ...nullFilter(cancel_equest_camt055_tabf8dc6), ...nullFilter(cancel_request_camt055_journey_groupd18a2), ...nullFilter(inves_req_camt110_tab81869), ...nullFilter(inves_req_camt110_journey_groupca738), ...nullFilter(investigation_response_camt111_tabf6177), ...nullFilter(inves_res_camt111_journey_group785d4)},
            key:uf_getPFDetails.key,
            groupId:"ecefaaa12a714b72a69e2249cf2fa00e",
            controlId:"7c0e001f7e1822cb3e8173e119f3da3f"
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
    if (inves_req_camt110_tablefa00eProps.ssKey !== '' && inves_req_camt110_tablefa00eProps.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = inves_req_camt110_tablefa00eProps.ssKey;          
    }
    if(mainData?.upId){
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(inves_req_camt110_tablefa00e?.upId){
      te_eventEmitterBody['upId']= [inves_req_camt110_tablefa00e?.upId];
    }
    if(inves_req_camt110_tablefa00e?.upid){
      te_eventEmitterBody['upId']= [inves_req_camt110_tablefa00e?.upid];
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

      // hasDataHandler
      if(commonSepareteDataFromTheObject("",te_eventEmitter?.data)){

  
      // copyFormData for controller
      //copyFormhandlerData variable store state and its value
      //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_type
      copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"]={...copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"],[UOmapperData['810f4d1ed10d4037aa999cc2dd5576c6']['source']]:commonSepareteDataFromTheObject("data[0]?.product_basic?.investigation_type",te_eventEmitter?.data)}
      // copyFormData for controller
      //copyFormhandlerData variable store state and its value
      //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|investigation_reason
      copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"]={...copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"],[UOmapperData['9053b0f54f5e0b38474bfdf4dfc74007']['source']]:commonSepareteDataFromTheObject("data[0]?.product_basic?.investigation_reason",te_eventEmitter?.data)}
      // copyFormData for controller
      //copyFormhandlerData variable store state and its value
      //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store nfInvestigationRequestCamt110.v1|investigationrequestcamt110subgroup|reason_description
      copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"]={...copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"],[UOmapperData['d1aa13cb04ef9f49f5714c5f6d66d274']['source']]:commonSepareteDataFromTheObject("data[0]?.product_basic?.reason_description",te_eventEmitter?.data)}
      }else
      {
      }
          if("setinvestigationrequestcamt110subgroup276a5" in copyFormhandlerData){
            setinvestigationrequestcamt110subgroup276a5((pre:any)=>({...pre,...copyFormhandlerData["setinvestigationrequestcamt110subgroup276a5"]}) )
          }

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
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setnfinvestigationrequestcamt110_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    // copyFormData
    // For group
    setinvestigationrequestcamt110dynamicactionsbfdc2((pre:any)=>({...pre,...mainData}));
    setinvestigationrequestcamt110dynamicactionsbfdc2Props({...investigationrequestcamt110dynamicactionsbfdc2Props,presetValues:mainData,tableName:tableName});
    //eventEmitter
    await handleSaveda3f_1_1_3();
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

 if (inves_req_camt110_mk_initiate_btn3da3f?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1','nftransactionproduct','needstopPropagate')=='not in assembler'?e.stopPropagation():null
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
        modalName = "nfinvestigationrequestcamt110"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageNfinvestigationrequestcamt110page2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {inves_req_camt110_mk_initiate_btn3da3f?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Initiate")}
        </Button>}
      </div>
    
  )
}

export default Buttoninves_req_camt110_mk_initiate_btn

