'use client'






import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
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
import PageTrandataviewpage2 from '@/app/trandataview_v1/trandataview_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps;
  const {details_labelaa81c, setdetails_labelaa81c}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb49bf, setdivider_topb49bf}= useContext(TotalContext) as TotalContextProps;
  const {l_file_name7a6bd, setl_file_name7a6bd}= useContext(TotalContext) as TotalContextProps;
  const {l_emp_mol8c2e1, setl_emp_mol8c2e1}= useContext(TotalContext) as TotalContextProps;
  const {file_nameebc26, setfile_nameebc26}= useContext(TotalContext) as TotalContextProps;
  const {empl_mold6666, setempl_mold6666}= useContext(TotalContext) as TotalContextProps;
  const {l_fixed_amont9c6be, setl_fixed_amont9c6be}= useContext(TotalContext) as TotalContextProps;
  const {l_variable_amount98c92, setl_variable_amount98c92}= useContext(TotalContext) as TotalContextProps;
  const {fixed_amot7ca4c, setfixed_amot7ca4c}= useContext(TotalContext) as TotalContextProps;
  const {var_amontdd609, setvar_amontdd609}= useContext(TotalContext) as TotalContextProps;
  const {l_charge_amount53cd9, setl_charge_amount53cd9}= useContext(TotalContext) as TotalContextProps;
  const {l_agent_routing_code9af99, setl_agent_routing_code9af99}= useContext(TotalContext) as TotalContextProps;
  const {charge_amnt64cb4, setcharge_amnt64cb4}= useContext(TotalContext) as TotalContextProps;
  const {agent_routng_codee5a1e, setagent_routng_codee5a1e}= useContext(TotalContext) as TotalContextProps;
  const {l_processing_system553cb, setl_processing_system553cb}= useContext(TotalContext) as TotalContextProps;
  const {l_tran_categoryaa4a1, setl_tran_categoryaa4a1}= useContext(TotalContext) as TotalContextProps;
  const {process_system9b66e, setprocess_system9b66e}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647, settran_catey46647}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom02761, setdivider_bottom02761}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btn2563b, setview_msg_data_btn2563b}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn00416, setview_tran_log_btn00416}= useContext(TotalContext) as TotalContextProps;
  const {customwidget84bb0, setcustomwidget84bb0}= useContext(TotalContext) as TotalContextProps;
  const {trandataview_v1Props, settrandataview_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {req_data_group8d4d7, setreq_data_group8d4d7}= useContext(TotalContext) as TotalContextProps;
  const {req_data_group8d4d7Props, setreq_data_group8d4d7Props}= useContext(TotalContext) as TotalContextProps;
  const {res_data_group9d75a, setres_data_group9d75a}= useContext(TotalContext) as TotalContextProps;
  const {res_data_group9d75aProps, setres_data_group9d75aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const journey_details_group764b7Ref = useRef(journey_details_group764b7);
  useEffect(() => {
    journey_details_group764b7Ref.current = journey_details_group764b7;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [journey_details_group764b7]);
  
  //group props in ref to access latest props value
  const journey_details_group764b7PropsRef = useRef(journey_details_group764b7Props);
  useEffect(() => {
    journey_details_group764b7PropsRef.current = journey_details_group764b7Props;
  }, [journey_details_group764b7Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['journey_details_group'] = journey_details_group764b7,
        codeStates['setjourney_details_group'] = setjourney_details_group764b7,
        codeStates['journey_details_group764b7'] = journey_details_group764b7Props,
        codeStates['setjourney_details_group764b7'] = setjourney_details_group764b7Props,
        codeStates['details_label'] = details_labelaa81c,
        codeStates['setdetails_label'] = setdetails_labelaa81c,
        codeStates['divider_top'] = divider_topb49bf,
        codeStates['setdivider_top'] = setdivider_topb49bf,
        codeStates['l_file_name'] = l_file_name7a6bd,
        codeStates['setl_file_name'] = setl_file_name7a6bd,
        codeStates['l_emp_mol'] = l_emp_mol8c2e1,
        codeStates['setl_emp_mol'] = setl_emp_mol8c2e1,
        codeStates['file_name'] = file_nameebc26,
        codeStates['setfile_name'] = setfile_nameebc26,
        codeStates['empl_mol'] = empl_mold6666,
        codeStates['setempl_mol'] = setempl_mold6666,
        codeStates['l_fixed_amont'] = l_fixed_amont9c6be,
        codeStates['setl_fixed_amont'] = setl_fixed_amont9c6be,
        codeStates['l_variable_amount'] = l_variable_amount98c92,
        codeStates['setl_variable_amount'] = setl_variable_amount98c92,
        codeStates['fixed_amot'] = fixed_amot7ca4c,
        codeStates['setfixed_amot'] = setfixed_amot7ca4c,
        codeStates['var_amont'] = var_amontdd609,
        codeStates['setvar_amont'] = setvar_amontdd609,
        codeStates['l_charge_amount'] = l_charge_amount53cd9,
        codeStates['setl_charge_amount'] = setl_charge_amount53cd9,
        codeStates['l_agent_routing_code'] = l_agent_routing_code9af99,
        codeStates['setl_agent_routing_code'] = setl_agent_routing_code9af99,
        codeStates['charge_amnt'] = charge_amnt64cb4,
        codeStates['setcharge_amnt'] = setcharge_amnt64cb4,
        codeStates['agent_routng_code'] = agent_routng_codee5a1e,
        codeStates['setagent_routng_code'] = setagent_routng_codee5a1e,
        codeStates['l_processing_system'] = l_processing_system553cb,
        codeStates['setl_processing_system'] = setl_processing_system553cb,
        codeStates['l_tran_category'] = l_tran_categoryaa4a1,
        codeStates['setl_tran_category'] = setl_tran_categoryaa4a1,
        codeStates['process_system'] = process_system9b66e,
        codeStates['setprocess_system'] = setprocess_system9b66e,
        codeStates['tran_catey'] = tran_catey46647,
        codeStates['settran_catey'] = settran_catey46647,
        codeStates['divider_bottom'] = divider_bottom02761,
        codeStates['setdivider_bottom'] = setdivider_bottom02761,
        codeStates['view_msg_data_btn'] = view_msg_data_btn2563b,
        codeStates['setview_msg_data_btn'] = setview_msg_data_btn2563b,
        codeStates['view_tran_log_btn'] = view_tran_log_btn00416,
        codeStates['setview_tran_log_btn'] = setview_tran_log_btn00416,
        codeStates['customwidget'] = customwidget84bb0,
        codeStates['setcustomwidget'] = setcustomwidget84bb0,
        codeStates['trandataview_v1'] = trandataview_v1Props,
        codeStates['settrandataview_v1'] = settrandataview_v1Props,
        codeStates['req_data_group'] = req_data_group8d4d7,
        codeStates['setreq_data_group'] = setreq_data_group8d4d7,
        codeStates['req_data_group8d4d7'] = req_data_group8d4d7Props,
        codeStates['setreq_data_group8d4d7'] = setreq_data_group8d4d7Props,
        codeStates['res_data_group'] = res_data_group9d75a,
        codeStates['setres_data_group'] = setres_data_group9d75a,
        codeStates['res_data_group9d75a'] = res_data_group9d75aProps,
        codeStates['setres_data_group9d75a'] = setres_data_group9d75aProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {wpstranjourneydetails_v1, setwpstranjourneydetails_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...journey_details_group764b7Ref.current,...data};
      let parentRowSpan = 103;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "06b44ec51b742cb61bddff7ad1d764b7",
        "0b3164691605bc84edefe9fab2e00416"
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
      if (id === "view_tran_log_btn00416") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "0b3164691605bc84edefe9fab2e00416") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "view_tran_log_btn00416");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!view_tran_log_btn00416?.trigger) return;
      if(view_tran_log_btn00416?.trigger){
      setview_tran_log_btn00416((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[view_tran_log_btn00416?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(view_tran_log_btn00416?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[view_tran_log_btn00416?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, wpsTranJourneyDetails_v1: {} }));
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
        setjourney_details_group764b7((prev: any) => ({ ...prev, view_tran_log_btn: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...journey_details_group764b7});
    settrandataview_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    setreq_data_group8d4d7({...req_data_group8d4d7,...journey_details_group764b7||{}})
    setreq_data_group8d4d7Props({...req_data_group8d4d7Props,presetValues:journey_details_group764b7||{}})  
    //bindTran
    // For group or table
    setres_data_group9d75a({...res_data_group9d75a,...journey_details_group764b7||{}})
    setres_data_group9d75aProps({...res_data_group9d75aProps,presetValues:journey_details_group764b7||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setjourney_details_group764b7((prev: any) => ({ ...prev, view_tran_log_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setjourney_details_group764b7((prev: any) => ({ ...prev, view_tran_log_btn: false }));
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
 if (view_tran_log_btn00416?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `14 / 24`,gridRow: `88 / 98`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageTrandataviewpage2 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {false}
        position = {"left"}
        modalName = "trandataview"
        className='w-[60%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageTrandataviewpage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#2b70b3] !rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {view_tran_log_btn00416?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Tran Log")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_tran_log_btn

