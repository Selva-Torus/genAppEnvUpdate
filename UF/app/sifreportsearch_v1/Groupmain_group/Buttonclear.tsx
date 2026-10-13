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
import { unlocktbl_sif_listRecord as unlocktable592fcRecord } from '@/app/sif_summary__report_v1/Grouptbl_sif_list/Tabletbl_sif_list';
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
 

const Buttonclear = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const allState:any= useContext(TotalContext) as TotalContextProps;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const buttonReadyRef = useRef<((id: string) => void) | null>(null);
  const triggerGuardRef = useRef(false);
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

  const {main_groupb2798, setmain_groupb2798}= useContext(TotalContext) as TotalContextProps;
  const {main_groupb2798Props, setmain_groupb2798Props}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerbb8b6, settop_dividerbb8b6}= useContext(TotalContext) as TotalContextProps;
  const {file_namefb5d0, setfile_namefb5d0}= useContext(TotalContext) as TotalContextProps;
  const {sf_file_name06efb, setsf_file_name06efb}= useContext(TotalContext) as TotalContextProps;
  const {estab_idbde42, setestab_idbde42}= useContext(TotalContext) as TotalContextProps;
  const {corp_name2b998, setcorp_name2b998}= useContext(TotalContext) as TotalContextProps;
  const {bottom_dividerdb520, setbottom_dividerdb520}= useContext(TotalContext) as TotalContextProps;
  const {searchb3ab8, setsearchb3ab8}= useContext(TotalContext) as TotalContextProps;
  const {clear56e07, setclear56e07}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fc, settbl_sif_list592fc}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fcProps, settbl_sif_list592fcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const main_groupb2798Ref = useRef(main_groupb2798);
  useEffect(() => {
    main_groupb2798Ref.current = main_groupb2798;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [main_groupb2798]);
  
  //group props in ref to access latest props value
  const main_groupb2798PropsRef = useRef(main_groupb2798Props);
  useEffect(() => {
    main_groupb2798PropsRef.current = main_groupb2798Props;
  }, [main_groupb2798Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['main_group'] = main_groupb2798,
        codeStates['setmain_group'] = setmain_groupb2798,
        codeStates['main_groupb2798'] = main_groupb2798Props,
        codeStates['setmain_groupb2798'] = setmain_groupb2798Props,
        codeStates['top_divider'] = top_dividerbb8b6,
        codeStates['settop_divider'] = settop_dividerbb8b6,
        codeStates['file_name'] = file_namefb5d0,
        codeStates['setfile_name'] = setfile_namefb5d0,
        codeStates['sf_file_name'] = sf_file_name06efb,
        codeStates['setsf_file_name'] = setsf_file_name06efb,
        codeStates['estab_id'] = estab_idbde42,
        codeStates['setestab_id'] = setestab_idbde42,
        codeStates['corp_name'] = corp_name2b998,
        codeStates['setcorp_name'] = setcorp_name2b998,
        codeStates['bottom_divider'] = bottom_dividerdb520,
        codeStates['setbottom_divider'] = setbottom_dividerdb520,
        codeStates['search'] = searchb3ab8,
        codeStates['setsearch'] = setsearchb3ab8,
        codeStates['clear'] = clear56e07,
        codeStates['setclear'] = setclear56e07,
        codeStates['tbl_sif_list'] = tbl_sif_list592fc,
        codeStates['settbl_sif_list'] = settbl_sif_list592fc,
        codeStates['tbl_sif_list592fc'] = tbl_sif_list592fcProps,
        codeStates['settbl_sif_list592fc'] = settbl_sif_list592fcProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {sifreportsearch_v1, setsifreportsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...main_groupb2798Ref.current,...data};
      let parentRowSpan = 50;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d745c026e7c644c1935832f70dab2798",
        "eb71e2bb4076f01a09ef4dd95bb56e07"
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
      if (id === "clear56e07") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "eb71e2bb4076f01a09ef4dd95bb56e07") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "clear56e07");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!clear56e07?.trigger) return;
      if(clear56e07?.trigger){
      setclear56e07((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[clear56e07?.trigger])

  useEffect(()=>{
    if(clear56e07?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[clear56e07?.refresh])
  
  useEffect(() => {
    return () => {
      if (buttonReadyRef.current) {
        eventBus.off("buttonReady", buttonReadyRef.current);
        buttonReadyRef.current = null;
      }
    };
  }, []);

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
      setValidate((pre: any) => ({ ...pre, sifReportSearch_v1: {} }));
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
        setmain_groupb2798((prev: any) => ({ ...prev, clear: true }));
        //onClick

    // clearHandler riseListen
    // for group
    Object.keys(main_groupb2798).map((keys:any)=>{         
      main_groupb2798[keys]="";
    })
    setmain_groupb2798({...main_groupb2798});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
    // triggerButtonClick
    if (buttonReadyRef.current) {
      eventBus.off("buttonReady", buttonReadyRef.current);
      buttonReadyRef.current = null;
    }
    triggerGuardRef.current = false;
    const handler = (id: string) => {
      if (id === "searchb3ab8" && !triggerGuardRef.current) {
        triggerGuardRef.current = true;
        eventBus.off("buttonReady", handler);
        buttonReadyRef.current = null;
        eventBus.emit("triggerButton", "searchb3ab8");
      }
    };
    buttonReadyRef.current = handler;
    eventBus.on("buttonReady", handler);
    eventBus.emit("triggerButton", "searchb3ab8");
    // refreshElement
    //riseListen
    // for group
    if (Array.isArray(tbl_sif_list592fcProps?.selectedIds) && tbl_sif_list592fcProps.selectedIds.length) {
      await Promise.all(
        tbl_sif_list592fcProps.selectedIds.map((id: number) =>
          unlocktable592fcRecord(id, token)
        )
      );
    }
    settbl_sif_list592fcProps((pre:any)=>({
      ...pre,
      refresh:!pre?.refresh,
      skipUnlockOnRefresh:true,
      selectedIds:[]
    }));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setmain_groupb2798((prev: any) => ({ ...prev, clear: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setmain_groupb2798((prev: any) => ({ ...prev, clear: false }));
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
 if (clear56e07?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `39 / 49`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {clear56e07?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdClear"
          iconDisplay='Start with Icon'
        >
          {keyset("Clear")}
        </Button>}
      </div>
    
  )
}

export default Buttonclear

