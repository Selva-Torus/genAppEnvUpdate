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
 

const Buttonapply_special_rate_process_close = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {applyspecialratemaingroup5736c, setapplyspecialratemaingroup5736c}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup5736cProps, setapplyspecialratemaingroup5736cProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462, setapplyspecialratesubgroup36462}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462Props, setapplyspecialratesubgroup36462Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714, setapplyspecialratedynamicactionsd8714}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714Props, setapplyspecialratedynamicactionsd8714Props}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_process_close57120, setapply_special_rate_process_close57120}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_process_reject934bd, setapply_special_rate_process_reject934bd}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_process_approvecfefb, setapply_special_rate_process_approvecfefb}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_process_save4fcee, setapply_special_rate_process_save4fcee}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const applyspecialratedynamicactionsd8714Ref = useRef(applyspecialratedynamicactionsd8714);
  useEffect(() => {
    applyspecialratedynamicactionsd8714Ref.current = applyspecialratedynamicactionsd8714;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [applyspecialratedynamicactionsd8714]);
  
  //group props in ref to access latest props value
  const applyspecialratedynamicactionsd8714PropsRef = useRef(applyspecialratedynamicactionsd8714Props);
  useEffect(() => {
    applyspecialratedynamicactionsd8714PropsRef.current = applyspecialratedynamicactionsd8714Props;
  }, [applyspecialratedynamicactionsd8714Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup5736c,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup5736c,
        codeStates['applyspecialratemaingroup5736c'] = applyspecialratemaingroup5736cProps,
        codeStates['setapplyspecialratemaingroup5736c'] = setapplyspecialratemaingroup5736cProps,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup36462,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup36462,
        codeStates['applyspecialratesubgroup36462'] = applyspecialratesubgroup36462Props,
        codeStates['setapplyspecialratesubgroup36462'] = setapplyspecialratesubgroup36462Props,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsd8714,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsd8714,
        codeStates['applyspecialratedynamicactionsd8714'] = applyspecialratedynamicactionsd8714Props,
        codeStates['setapplyspecialratedynamicactionsd8714'] = setapplyspecialratedynamicactionsd8714Props,
        codeStates['apply_special_rate_process_close'] = apply_special_rate_process_close57120,
        codeStates['setapply_special_rate_process_close'] = setapply_special_rate_process_close57120,
        codeStates['apply_special_rate_process_reject'] = apply_special_rate_process_reject934bd,
        codeStates['setapply_special_rate_process_reject'] = setapply_special_rate_process_reject934bd,
        codeStates['apply_special_rate_process_approve'] = apply_special_rate_process_approvecfefb,
        codeStates['setapply_special_rate_process_approve'] = setapply_special_rate_process_approvecfefb,
        codeStates['apply_special_rate_process_save'] = apply_special_rate_process_save4fcee,
        codeStates['setapply_special_rate_process_save'] = setapply_special_rate_process_save4fcee,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {inboundapplyspecialrateprocess_v1, setinboundapplyspecialrateprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...applyspecialratedynamicactionsd8714Ref.current,...data};
      let parentRowSpan = 11;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "449d5ade22c0ee5e01775b4fa99d8714",
        "db317b7d005eea0db9e4bab55fe57120"
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
    }else if(applyspecialratedynamicactionsd8714Props?.isHaveRule==true){
      if("apply_special_rate_process_close" in applyspecialratedynamicactionsd8714Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(applyspecialratedynamicactionsd8714Props?.dynamicActionRule?.apply_special_rate_process_close,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false);
        setStyleSate({ pointerEvents: 'auto'});   
      }
    }
    else {
      if("apply_special_rate_process_close" in inboundapplyspecialrateprocess_v1?.applyspecialratedynamicactions && inboundapplyspecialrateprocess_v1?.applyspecialratedynamicactions["apply_special_rate_process_close"]?.itsHaveArtifact== true)
      {
        setShowFlag(inboundapplyspecialrateprocess_v1?.applyspecialratedynamicactions["apply_special_rate_process_close"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(inboundapplyspecialrateprocess_v1?.applyspecialratedynamicactions?.apply_special_rate_process_close?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "apply_special_rate_process_close57120") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "db317b7d005eea0db9e4bab55fe57120") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "apply_special_rate_process_close57120");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (apply_special_rate_process_close57120?.trigger) 
    {
      handleClick()
      setapply_special_rate_process_close57120((prev:any) => ({...prev, trigger: false}));
    }
  },[apply_special_rate_process_close57120?.trigger])

  useEffect(()=>{
    if(apply_special_rate_process_close57120?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[apply_special_rate_process_close57120?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, inboundApplySpecialRateProcess_v1: {} }));
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
        setapplyspecialratedynamicactionsd8714((prev: any) => ({ ...prev, apply_special_rate_process_close: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'inboundapplyspecialrateprocess');
    // clearHandler riseListen
    // for group
    Object.keys(applyspecialratesubgroup36462).map((keys:any)=>{         
      applyspecialratesubgroup36462[keys]="";
    })
    setapplyspecialratesubgroup36462({...applyspecialratesubgroup36462});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setapplyspecialratedynamicactionsd8714((prev: any) => ({ ...prev, apply_special_rate_process_close: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setapplyspecialratedynamicactionsd8714((prev: any) => ({ ...prev, apply_special_rate_process_close: false }));
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

  }, [inboundapplyspecialrateprocess_v1?.applyspecialratedynamicactions?.apply_special_rate_process_close,applyspecialratedynamicactionsd8714Props?.dynamicActionRule?.apply_special_rate_process_close,])

  if (apply_special_rate_process_close57120?.isHidden) {
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
          disabled= {apply_special_rate_process_close57120?.isDisabled ? true : false}
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

export default Buttonapply_special_rate_process_close

