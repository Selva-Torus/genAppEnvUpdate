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
 

const Buttoncancelrequestcamt055_close = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_closed99be, setcancelrequestcamt055_closed99be}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_reject88d84, setcancelrequestcamt055_reject88d84}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_approve510fd, setcancelrequestcamt055_approve510fd}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_save46cc8, setcancelrequestcamt055_save46cc8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const cancelrequestcamt055dynamicactions2a75aRef = useRef(cancelrequestcamt055dynamicactions2a75a);
  useEffect(() => {
    cancelrequestcamt055dynamicactions2a75aRef.current = cancelrequestcamt055dynamicactions2a75a;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [cancelrequestcamt055dynamicactions2a75a]);
  
  //group props in ref to access latest props value
  const cancelrequestcamt055dynamicactions2a75aPropsRef = useRef(cancelrequestcamt055dynamicactions2a75aProps);
  useEffect(() => {
    cancelrequestcamt055dynamicactions2a75aPropsRef.current = cancelrequestcamt055dynamicactions2a75aProps;
  }, [cancelrequestcamt055dynamicactions2a75aProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
        codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
        codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
        codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
        codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
        codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
        codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
        codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
        codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
        codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
        codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
        codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
        codeStates['cancelrequestcamt055_close'] = cancelrequestcamt055_closed99be,
        codeStates['setcancelrequestcamt055_close'] = setcancelrequestcamt055_closed99be,
        codeStates['cancelrequestcamt055_reject'] = cancelrequestcamt055_reject88d84,
        codeStates['setcancelrequestcamt055_reject'] = setcancelrequestcamt055_reject88d84,
        codeStates['cancelrequestcamt055_approve'] = cancelrequestcamt055_approve510fd,
        codeStates['setcancelrequestcamt055_approve'] = setcancelrequestcamt055_approve510fd,
        codeStates['cancelrequestcamt055_save'] = cancelrequestcamt055_save46cc8,
        codeStates['setcancelrequestcamt055_save'] = setcancelrequestcamt055_save46cc8,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {nfcancelrequestcamt055_v1, setnfcancelrequestcamt055_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...cancelrequestcamt055dynamicactions2a75aRef.current,...data};
      let parentRowSpan = 12;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "e2cbb36ff43276b1ef06d4232832a75a",
        "8a3cdf6f85f47599436b5f5de24d99be"
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
    }else if(cancelrequestcamt055dynamicactions2a75aProps?.isHaveRule==true){
      if("cancelrequestcamt055_close" in cancelrequestcamt055dynamicactions2a75aProps?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(cancelrequestcamt055dynamicactions2a75aProps?.dynamicActionRule?.cancelrequestcamt055_close,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false);
        setStyleSate({ pointerEvents: 'auto'});   
      }
    }
    else {
      if("cancelrequestcamt055_close" in nfcancelrequestcamt055_v1?.cancelrequestcamt055dynamicactions && nfcancelrequestcamt055_v1?.cancelrequestcamt055dynamicactions["cancelrequestcamt055_close"]?.itsHaveArtifact== true)
      {
        setShowFlag(nfcancelrequestcamt055_v1?.cancelrequestcamt055dynamicactions["cancelrequestcamt055_close"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(nfcancelrequestcamt055_v1?.cancelrequestcamt055dynamicactions?.cancelrequestcamt055_close?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "cancelrequestcamt055_closed99be") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "8a3cdf6f85f47599436b5f5de24d99be") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancelrequestcamt055_closed99be");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (cancelrequestcamt055_closed99be?.trigger) 
    {
      handleClick()
      setcancelrequestcamt055_closed99be((prev:any) => ({...prev, trigger: false}));
    }
  },[cancelrequestcamt055_closed99be?.trigger])

  useEffect(()=>{
    if(cancelrequestcamt055_closed99be?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancelrequestcamt055_closed99be?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, nfCancelRequestCamt055_v1: {} }));
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
        setcancelrequestcamt055dynamicactions2a75a((prev: any) => ({ ...prev, cancelrequestcamt055_close: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'nfcancelrequestcamt055');
    // clearHandler riseListen
    // for group
    Object.keys(cancelrequestcamt055subgroup5ac44).map((keys:any)=>{         
      cancelrequestcamt055subgroup5ac44[keys]="";
    })
    setcancelrequestcamt055subgroup5ac44({...cancelrequestcamt055subgroup5ac44});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setcancelrequestcamt055dynamicactions2a75a((prev: any) => ({ ...prev, cancelrequestcamt055_close: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setcancelrequestcamt055dynamicactions2a75a((prev: any) => ({ ...prev, cancelrequestcamt055_close: false }));
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

  }, [nfcancelrequestcamt055_v1?.cancelrequestcamt055dynamicactions?.cancelrequestcamt055_close,cancelrequestcamt055dynamicactions2a75aProps?.dynamicActionRule?.cancelrequestcamt055_close,])

  if (cancelrequestcamt055_closed99be?.isHidden) {
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
          disabled= {cancelrequestcamt055_closed99be?.isDisabled ? true : false}
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

export default Buttoncancelrequestcamt055_close

