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
 

const Buttonapply_special_rate_close = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_close57a71, setapply_special_rate_close57a71}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_rejectba9fa, setapply_special_rate_rejectba9fa}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_approve58219, setapply_special_rate_approve58219}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_savebdf41, setapply_special_rate_savebdf41}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const applyspecialratedynamicactionsc09ccRef = useRef(applyspecialratedynamicactionsc09cc);
  useEffect(() => {
    applyspecialratedynamicactionsc09ccRef.current = applyspecialratedynamicactionsc09cc;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [applyspecialratedynamicactionsc09cc]);
  
  //group props in ref to access latest props value
  const applyspecialratedynamicactionsc09ccPropsRef = useRef(applyspecialratedynamicactionsc09ccProps);
  useEffect(() => {
    applyspecialratedynamicactionsc09ccPropsRef.current = applyspecialratedynamicactionsc09ccProps;
  }, [applyspecialratedynamicactionsc09ccProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
        codeStates['apply_special_rate_close'] = apply_special_rate_close57a71,
        codeStates['setapply_special_rate_close'] = setapply_special_rate_close57a71,
        codeStates['apply_special_rate_reject'] = apply_special_rate_rejectba9fa,
        codeStates['setapply_special_rate_reject'] = setapply_special_rate_rejectba9fa,
        codeStates['apply_special_rate_approve'] = apply_special_rate_approve58219,
        codeStates['setapply_special_rate_approve'] = setapply_special_rate_approve58219,
        codeStates['apply_special_rate_save'] = apply_special_rate_savebdf41,
        codeStates['setapply_special_rate_save'] = setapply_special_rate_savebdf41,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {outboundapplyspecialrate_v1, setoutboundapplyspecialrate_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...applyspecialratedynamicactionsc09ccRef.current,...data};
      let parentRowSpan = 9;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "5fe2a031e53676ca081cc62c8f2c09cc",
        "b417aa16161baa59fab4c7fd34057a71"
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
    if(orchestrationData?.data?.rule?.nodes?.length > 0){
      setRulseData(orchestrationData?.data?.rule.nodes)
      let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,session:decodedTokenObj,...data,...memoryVariables});
      // schemaFlag =schemaFlag.output;
      let order:number = Number(schemaFlag.order);

      // Update grid position based on order number
      
      if (order && typeof order === 'number') {
        const position : any = getGridPositionFromOrder(order,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      } else if( "start" in schemaFlag && "end" in schemaFlag)
      {
        const position : any = getGridPositionFromOrder(schemaFlag,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      }
      else{
        setStyleSate({ pointerEvents: 'auto'})
      } 

      if (schemaFlag.output !== "true") {
        setShowFlag(false);
      }else{
        setShowFlag(true)
      }
    }else if(applyspecialratedynamicactionsc09ccProps?.isHaveRule==true){
      if("apply_special_rate_close" in applyspecialratedynamicactionsc09ccProps?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(applyspecialratedynamicactionsc09ccProps?.dynamicActionRule?.apply_special_rate_close,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false);
        setStyleSate({ pointerEvents: 'auto'});   
      }
    }
    else {
      if("apply_special_rate_close" in outboundapplyspecialrate_v1?.applyspecialratedynamicactions && outboundapplyspecialrate_v1?.applyspecialratedynamicactions["apply_special_rate_close"]?.itsHaveArtifact== true)
      {
        setShowFlag(outboundapplyspecialrate_v1?.applyspecialratedynamicactions["apply_special_rate_close"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(outboundapplyspecialrate_v1?.applyspecialratedynamicactions?.apply_special_rate_close?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }else{
        setShowFlag(false);
        setStyleSate({ pointerEvents: 'auto'});
      }
    }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "apply_special_rate_close57a71") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "b417aa16161baa59fab4c7fd34057a71") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "apply_special_rate_close57a71");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (apply_special_rate_close57a71?.trigger) 
    {
      handleClick()
      setapply_special_rate_close57a71((prev:any) => ({...prev, trigger: false}));
    }
  },[apply_special_rate_close57a71?.trigger])

  useEffect(()=>{
    if(apply_special_rate_close57a71?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[apply_special_rate_close57a71?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, outboundApplySpecialRate_v1: {} }));
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
        setapplyspecialratedynamicactionsc09cc((prev: any) => ({ ...prev, apply_special_rate_close: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'outboundapplyspecialrate');
    // clearHandler riseListen
    // for group
    Object.keys(applyspecialratesubgroup2d2fd).map((keys:any)=>{         
      applyspecialratesubgroup2d2fd[keys]="";
    })
    setapplyspecialratesubgroup2d2fd({...applyspecialratesubgroup2d2fd});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setapplyspecialratedynamicactionsc09cc((prev: any) => ({ ...prev, apply_special_rate_close: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setapplyspecialratedynamicactionsc09cc((prev: any) => ({ ...prev, apply_special_rate_close: false }));
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

    useEffect(() => {
    let forGetFormDataPointedData = {
      };
      handleMapper(forGetFormDataPointedData);

  }, [outboundapplyspecialrate_v1?.applyspecialratedynamicactions?.apply_special_rate_close,applyspecialratedynamicactionsc09ccProps?.dynamicActionRule?.apply_special_rate_close,])

  if (apply_special_rate_close57a71?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-xl"
          onClick={handleClick}
          view='outlined-action'
          disabled= {apply_special_rate_close57a71?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdClose"
          iconDisplay='Start with Icon'
        >
          {keyset("Close")}
        </Button>}
      </div>
    
  )
}

export default Buttonapply_special_rate_close

