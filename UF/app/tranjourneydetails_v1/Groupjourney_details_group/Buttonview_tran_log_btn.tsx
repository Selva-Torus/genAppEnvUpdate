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
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
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
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
import { getPublicEnv } from "@/app/components/public-env";
import PageTrandataviewpage6 from '@/app/trandataview_v1/trandataview_v1page';
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
 

const Buttonview_tran_log_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  let code:string = "//  settran_data_group((pre)=>({\r\n//   ...pre,\r\n//   source_data:pre?.source_data\r\n//   }))";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const allState:any= useContext(TotalContext) as TotalContextProps;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
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
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {journey_details_groupd9a0e, setjourney_details_groupd9a0e}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_groupd9a0eProps, setjourney_details_groupd9a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_tope6917, setdivider_tope6917}= useContext(TotalContext) as TotalContextProps;
  const {transaction_date_time_label669d7, settransaction_date_time_label669d7}= useContext(TotalContext) as TotalContextProps;
  const {processed_by_label542e8, setprocessed_by_label542e8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date14856, settrs_created_date14856}= useContext(TotalContext) as TotalContextProps;
  const {processing_systemd2b69, setprocessing_systemd2b69}= useContext(TotalContext) as TotalContextProps;
  const {currency_labele21ba, setcurrency_labele21ba}= useContext(TotalContext) as TotalContextProps;
  const {amount_labelfd725, setamount_labelfd725}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency9c8a2, setdr_currency9c8a2}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount01416, setdr_amount01416}= useContext(TotalContext) as TotalContextProps;
  const {debit_account_label3b1b7, setdebit_account_label3b1b7}= useContext(TotalContext) as TotalContextProps;
  const {process_status_labelb6505, setprocess_status_labelb6505}= useContext(TotalContext) as TotalContextProps;
  const {dr_account36b40, setdr_account36b40}= useContext(TotalContext) as TotalContextProps;
  const {trs_process_statusa4262, settrs_process_statusa4262}= useContext(TotalContext) as TotalContextProps;
  const {credit_account_label65c7b, setcredit_account_label65c7b}= useContext(TotalContext) as TotalContextProps;
  const {status_labelf3713, setstatus_labelf3713}= useContext(TotalContext) as TotalContextProps;
  const {cr_account500d6, setcr_account500d6}= useContext(TotalContext) as TotalContextProps;
  const {trs_status88bc7, settrs_status88bc7}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom8bad5, setdivider_bottom8bad5}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btne6a88, setview_msg_data_btne6a88}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn9cd8c, setview_tran_log_btn9cd8c}= useContext(TotalContext) as TotalContextProps;
  const {req_data_group8d4d7, setreq_data_group8d4d7}= useContext(TotalContext) as TotalContextProps;
  const {req_data_group8d4d7Props, setreq_data_group8d4d7Props}= useContext(TotalContext) as TotalContextProps;
  const {res_data_group9d75a, setres_data_group9d75a}= useContext(TotalContext) as TotalContextProps;
  const {res_data_group9d75aProps, setres_data_group9d75aProps}= useContext(TotalContext) as TotalContextProps;
  const {trandataview_v1Props, settrandataview_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const journey_details_groupd9a0eRef = useRef(journey_details_groupd9a0e);
  useEffect(() => {
    journey_details_groupd9a0eRef.current = journey_details_groupd9a0e;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [journey_details_groupd9a0e]);
  
  //group props in ref to access latest props value
  const journey_details_groupd9a0ePropsRef = useRef(journey_details_groupd9a0eProps);
  useEffect(() => {
    journey_details_groupd9a0ePropsRef.current = journey_details_groupd9a0eProps;
  }, [journey_details_groupd9a0eProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['journey_details_group'] = journey_details_groupd9a0e,
        codeStates['setjourney_details_group'] = setjourney_details_groupd9a0e,
        codeStates['journey_details_groupd9a0e'] = journey_details_groupd9a0eProps,
        codeStates['setjourney_details_groupd9a0e'] = setjourney_details_groupd9a0eProps,
        codeStates['divider_top'] = divider_tope6917,
        codeStates['setdivider_top'] = setdivider_tope6917,
        codeStates['transaction_date_time_label'] = transaction_date_time_label669d7,
        codeStates['settransaction_date_time_label'] = settransaction_date_time_label669d7,
        codeStates['processed_by_label'] = processed_by_label542e8,
        codeStates['setprocessed_by_label'] = setprocessed_by_label542e8,
        codeStates['trs_created_date'] = trs_created_date14856,
        codeStates['settrs_created_date'] = settrs_created_date14856,
        codeStates['processing_system'] = processing_systemd2b69,
        codeStates['setprocessing_system'] = setprocessing_systemd2b69,
        codeStates['currency_label'] = currency_labele21ba,
        codeStates['setcurrency_label'] = setcurrency_labele21ba,
        codeStates['amount_label'] = amount_labelfd725,
        codeStates['setamount_label'] = setamount_labelfd725,
        codeStates['dr_currency'] = dr_currency9c8a2,
        codeStates['setdr_currency'] = setdr_currency9c8a2,
        codeStates['dr_amount'] = dr_amount01416,
        codeStates['setdr_amount'] = setdr_amount01416,
        codeStates['debit_account_label'] = debit_account_label3b1b7,
        codeStates['setdebit_account_label'] = setdebit_account_label3b1b7,
        codeStates['process_status_label'] = process_status_labelb6505,
        codeStates['setprocess_status_label'] = setprocess_status_labelb6505,
        codeStates['dr_account'] = dr_account36b40,
        codeStates['setdr_account'] = setdr_account36b40,
        codeStates['trs_process_status'] = trs_process_statusa4262,
        codeStates['settrs_process_status'] = settrs_process_statusa4262,
        codeStates['credit_account_label'] = credit_account_label65c7b,
        codeStates['setcredit_account_label'] = setcredit_account_label65c7b,
        codeStates['status_label'] = status_labelf3713,
        codeStates['setstatus_label'] = setstatus_labelf3713,
        codeStates['cr_account'] = cr_account500d6,
        codeStates['setcr_account'] = setcr_account500d6,
        codeStates['trs_status'] = trs_status88bc7,
        codeStates['settrs_status'] = settrs_status88bc7,
        codeStates['divider_bottom'] = divider_bottom8bad5,
        codeStates['setdivider_bottom'] = setdivider_bottom8bad5,
        codeStates['view_msg_data_btn'] = view_msg_data_btne6a88,
        codeStates['setview_msg_data_btn'] = setview_msg_data_btne6a88,
        codeStates['view_tran_log_btn'] = view_tran_log_btn9cd8c,
        codeStates['setview_tran_log_btn'] = setview_tran_log_btn9cd8c,
        codeStates['req_data_group'] = req_data_group8d4d7,
        codeStates['setreq_data_group'] = setreq_data_group8d4d7,
        codeStates['req_data_group8d4d7'] = req_data_group8d4d7Props,
        codeStates['setreq_data_group8d4d7'] = setreq_data_group8d4d7Props,
        codeStates['res_data_group'] = res_data_group9d75a,
        codeStates['setres_data_group'] = setres_data_group9d75a,
        codeStates['res_data_group9d75a'] = res_data_group9d75aProps,
        codeStates['setres_data_group9d75a'] = setres_data_group9d75aProps,
        codeStates['trandataview_v1'] = trandataview_v1Props,
        codeStates['settrandataview_v1'] = settrandataview_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {tranjourneydetails_v1, settranjourneydetails_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...journey_details_groupd9a0eRef.current,...data};
      let parentRowSpan = 94;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "21c6b985251b46b2a031d20162ad9a0e",
        "93e0542e5f2347658e84247e2e19cd8c"
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

    /////////
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "view_tran_log_btn9cd8c") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "93e0542e5f2347658e84247e2e19cd8c") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "view_tran_log_btn9cd8c");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (view_tran_log_btn9cd8c?.trigger) 
    {
      handleClick()
      setview_tran_log_btn9cd8c((prev:any) => ({...prev, trigger: false}));
    }
  },[view_tran_log_btn9cd8c?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
    if(view_tran_log_btn9cd8c?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[view_tran_log_btn9cd8c?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, tranJourneyDetails_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setjourney_details_groupd9a0e((prev: any) => ({ ...prev, view_tran_log_btn: true }));
        //onClick

    //bindTran
    // For group or table
    setreq_data_group8d4d7({...req_data_group8d4d7,...journey_details_groupd9a0e||{}})
    setreq_data_group8d4d7Props({...req_data_group8d4d7Props,presetValues:journey_details_groupd9a0e||{}})  
    //bindTran
    // For group or table
    setres_data_group9d75a({...res_data_group9d75a,...journey_details_groupd9a0e||{}})
    setres_data_group9d75aProps({...res_data_group9d75aProps,presetValues:journey_details_groupd9a0e||{}})  
    // showArtifactAsModal
    let filterProps6:any =  [];
      let filterData6 = await getFilterProps(filterProps6,{...journey_details_groupd9a0e});
    settrandataview_v1Props([...filterData6 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen6(true);

      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setjourney_details_groupd9a0e((prev: any) => ({ ...prev, view_tran_log_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setjourney_details_groupd9a0e((prev: any) => ({ ...prev, view_tran_log_btn: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
   let itsHaveSaveSessionData:any= false
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

  if (view_tran_log_btn9cd8c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `17 / 25`,gridRow: `83 / 93`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen6 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageTrandataviewpage6 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen6 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="TransactionLog"
        ready={assetDataReady}
        showOverlay = {false}
        position = {"left"}
        modalName = "trandataview"
        className='w-[60%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageTrandataviewpage6  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#2b70b3] !rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {view_tran_log_btn9cd8c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Tran Log")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_tran_log_btn

