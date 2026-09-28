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
import { Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
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
 

const Buttonrun_connectors_now_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
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
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_discovery_queue_groupad3a5, setoverall_discovery_queue_groupad3a5}= useContext(TotalContext) as TotalContextProps;
  const {overall_discovery_queue_groupad3a5Props, setoverall_discovery_queue_groupad3a5Props}= useContext(TotalContext) as TotalContextProps;
  const {discovery_queue_text_group9da41, setdiscovery_queue_text_group9da41}= useContext(TotalContext) as TotalContextProps;
  const {discovery_queue_text_group9da41Props, setdiscovery_queue_text_group9da41Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button8e89d, setrefresh_button8e89d}= useContext(TotalContext) as TotalContextProps;
  const {run_connectors_now_buttonea7af, setrun_connectors_now_buttonea7af}= useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294c, setawaiting_review_groupb294c}= useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294cProps, setawaiting_review_groupb294cProps}= useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4, setpossible_duplicate_groupbf3b4}= useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4Props, setpossible_duplicate_groupbf3b4Props}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267, setrejecte_on_ingest_group81267}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267Props, setrejecte_on_ingest_group81267Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8e, setpending_review_groupe9d8e}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8eProps, setpending_review_groupe9d8eProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7d, setpending_review_table3db7d}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7dProps, setpending_review_table3db7dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const overall_discovery_queue_groupad3a5Ref = useRef(overall_discovery_queue_groupad3a5);
  useEffect(() => {
    overall_discovery_queue_groupad3a5Ref.current = overall_discovery_queue_groupad3a5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [overall_discovery_queue_groupad3a5]);
  
  //group props in ref to access latest props value
  const overall_discovery_queue_groupad3a5PropsRef = useRef(overall_discovery_queue_groupad3a5Props);
  useEffect(() => {
    overall_discovery_queue_groupad3a5PropsRef.current = overall_discovery_queue_groupad3a5Props;
  }, [overall_discovery_queue_groupad3a5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_discovery_queue_group'] = overall_discovery_queue_groupad3a5,
        codeStates['setoverall_discovery_queue_group'] = setoverall_discovery_queue_groupad3a5,
        codeStates['overall_discovery_queue_groupad3a5'] = overall_discovery_queue_groupad3a5Props,
        codeStates['setoverall_discovery_queue_groupad3a5'] = setoverall_discovery_queue_groupad3a5Props,
        codeStates['discovery_queue_text_group'] = discovery_queue_text_group9da41,
        codeStates['setdiscovery_queue_text_group'] = setdiscovery_queue_text_group9da41,
        codeStates['discovery_queue_text_group9da41'] = discovery_queue_text_group9da41Props,
        codeStates['setdiscovery_queue_text_group9da41'] = setdiscovery_queue_text_group9da41Props,
        codeStates['refresh_button'] = refresh_button8e89d,
        codeStates['setrefresh_button'] = setrefresh_button8e89d,
        codeStates['run_connectors_now_button'] = run_connectors_now_buttonea7af,
        codeStates['setrun_connectors_now_button'] = setrun_connectors_now_buttonea7af,
        codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
        codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
        codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
        codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
        codeStates['possible_duplicate_group'] = possible_duplicate_groupbf3b4,
        codeStates['setpossible_duplicate_group'] = setpossible_duplicate_groupbf3b4,
        codeStates['possible_duplicate_groupbf3b4'] = possible_duplicate_groupbf3b4Props,
        codeStates['setpossible_duplicate_groupbf3b4'] = setpossible_duplicate_groupbf3b4Props,
        codeStates['rejecte_on_ingest_group'] = rejecte_on_ingest_group81267,
        codeStates['setrejecte_on_ingest_group'] = setrejecte_on_ingest_group81267,
        codeStates['rejecte_on_ingest_group81267'] = rejecte_on_ingest_group81267Props,
        codeStates['setrejecte_on_ingest_group81267'] = setrejecte_on_ingest_group81267Props,
        codeStates['pending_review_group'] = pending_review_groupe9d8e,
        codeStates['setpending_review_group'] = setpending_review_groupe9d8e,
        codeStates['pending_review_groupe9d8e'] = pending_review_groupe9d8eProps,
        codeStates['setpending_review_groupe9d8e'] = setpending_review_groupe9d8eProps,
        codeStates['pending_review_table'] = pending_review_table3db7d,
        codeStates['setpending_review_table'] = setpending_review_table3db7d,
        codeStates['pending_review_table3db7d'] = pending_review_table3db7dProps,
        codeStates['setpending_review_table3db7d'] = setpending_review_table3db7dProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {discoveryqueue_v1, setdiscoveryqueue_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...overall_discovery_queue_groupad3a5Ref.current,...data};
      let parentRowSpan = 153;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "92d660bf5bb34fe6860f3a2f109ad3a5",
        "e7f99dfc145c445daadc5c597ecea7af"
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
      if (id === "run_connectors_now_buttonea7af") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e7f99dfc145c445daadc5c597ecea7af") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "run_connectors_now_buttonea7af");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!run_connectors_now_buttonea7af?.trigger) return;
      if(run_connectors_now_buttonea7af?.trigger){
      setrun_connectors_now_buttonea7af((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[run_connectors_now_buttonea7af?.trigger])

  useEffect(()=>{
    if(run_connectors_now_buttonea7af?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[run_connectors_now_buttonea7af?.refresh])
  

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

  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setoverall_discovery_queue_groupad3a5((prev: any) => ({ ...prev, run_connectors_now_button: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setoverall_discovery_queue_groupad3a5((prev: any) => ({ ...prev, run_connectors_now_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setoverall_discovery_queue_groupad3a5((prev: any) => ({ ...prev, run_connectors_now_button: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }

 if (run_connectors_now_buttonea7af?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#0736C4] hover:!bg-[#0A45E0] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {run_connectors_now_buttonea7af?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Run Connectors Now")}
        </Button>}
      </div>
    
  )
}

export default Buttonrun_connectors_now_button

