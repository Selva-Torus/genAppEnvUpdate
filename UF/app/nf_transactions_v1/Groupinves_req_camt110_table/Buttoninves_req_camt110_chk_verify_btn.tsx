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
 

const Buttoninves_req_camt110_chk_verify_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const {investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
      codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
      codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
      codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
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
        "c5a99c1228ff3624f097aece19697d7c"
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
      if (id === "inves_req_camt110_chk_verify_btn97d7c") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[inves_req_camt110_chk_verify_btn97d7c?.refresh])


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
    setnfinvestigationrequestcamt110_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    // copyFormData
    // For group
    setinvestigationrequestcamt110dynamicactionsbfdc2((pre:any)=>({...pre,...mainData}));
    setinvestigationrequestcamt110dynamicactionsbfdc2Props({...investigationrequestcamt110dynamicactionsbfdc2Props,presetValues:mainData,tableName:tableName});
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,investigationrequestcamt110subgroup276a5Props?.controls);
    setinvestigationrequestcamt110subgroup276a5(bindData6||{})
    setinvestigationrequestcamt110subgroup276a5Props({...investigationrequestcamt110subgroup276a5Props,presetValues:{...(mainData||{})},tableName:tableName})
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

 if (inves_req_camt110_chk_verify_btn97d7c?.isHidden) {
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
          disabled= {inves_req_camt110_chk_verify_btn97d7c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Verify")}
        </Button>}
      </div>
    
  )
}

export default Buttoninves_req_camt110_chk_verify_btn

