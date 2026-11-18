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
 

const Buttondel_cancel_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {del_groupbb7f0, setdel_groupbb7f0}= useContext(TotalContext) as TotalContextProps;
  const {del_groupbb7f0Props, setdel_groupbb7f0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8b, setdelete_heading_txt26f8b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1c0da3, setdel_divider_1c0da3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textfb333, setasset_name_textfb333}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4, settool_grant_id281e4}= useContext(TotalContext) as TotalContextProps;
  const {agent_name_text71756, setagent_name_text71756}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5c40e, setasset_name5c40e}= useContext(TotalContext) as TotalContextProps;
  const {too_operation_texte0dbf, settoo_operation_texte0dbf}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation03227, settool_operation03227}= useContext(TotalContext) as TotalContextProps;
  const {access_mode_text74d1f, setaccess_mode_text74d1f}= useContext(TotalContext) as TotalContextProps;
  const {access_mode763de, setaccess_mode763de}= useContext(TotalContext) as TotalContextProps;
  const {ststus_txt329f4, setststus_txt329f4}= useContext(TotalContext) as TotalContextProps;
  const {status659a7, setstatus659a7}= useContext(TotalContext) as TotalContextProps;
  const {textb6666, settextb6666}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_27f134, setdel_divider_27f134}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn3e3af, setdel_cancel_btn3e3af}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnbeefc, setdel_okl_btnbeefc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_groupbb7f0Ref = useRef(del_groupbb7f0);
  useEffect(() => {
    del_groupbb7f0Ref.current = del_groupbb7f0;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_groupbb7f0]);
  
  //group props in ref to access latest props value
  const del_groupbb7f0PropsRef = useRef(del_groupbb7f0Props);
  useEffect(() => {
    del_groupbb7f0PropsRef.current = del_groupbb7f0Props;
  }, [del_groupbb7f0Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_groupbb7f0,
        codeStates['setdel_group'] = setdel_groupbb7f0,
        codeStates['del_groupbb7f0'] = del_groupbb7f0Props,
        codeStates['setdel_groupbb7f0'] = setdel_groupbb7f0Props,
        codeStates['delete_heading_txt'] = delete_heading_txt26f8b,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt26f8b,
        codeStates['del_divider_1'] = del_divider_1c0da3,
        codeStates['setdel_divider_1'] = setdel_divider_1c0da3,
        codeStates['asset_name_text'] = asset_name_textfb333,
        codeStates['setasset_name_text'] = setasset_name_textfb333,
        codeStates['tool_grant_id'] = tool_grant_id281e4,
        codeStates['settool_grant_id'] = settool_grant_id281e4,
        codeStates['agent_name_text'] = agent_name_text71756,
        codeStates['setagent_name_text'] = setagent_name_text71756,
        codeStates['asset_name'] = asset_name5c40e,
        codeStates['setasset_name'] = setasset_name5c40e,
        codeStates['too_operation_text'] = too_operation_texte0dbf,
        codeStates['settoo_operation_text'] = settoo_operation_texte0dbf,
        codeStates['tool_operation'] = tool_operation03227,
        codeStates['settool_operation'] = settool_operation03227,
        codeStates['access_mode_text'] = access_mode_text74d1f,
        codeStates['setaccess_mode_text'] = setaccess_mode_text74d1f,
        codeStates['access_mode'] = access_mode763de,
        codeStates['setaccess_mode'] = setaccess_mode763de,
        codeStates['ststus_txt'] = ststus_txt329f4,
        codeStates['setststus_txt'] = setststus_txt329f4,
        codeStates['status'] = status659a7,
        codeStates['setstatus'] = setstatus659a7,
        codeStates['text'] = textb6666,
        codeStates['settext'] = settextb6666,
        codeStates['del_divider_2'] = del_divider_27f134,
        codeStates['setdel_divider_2'] = setdel_divider_27f134,
        codeStates['del_cancel_btn'] = del_cancel_btn3e3af,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn3e3af,
        codeStates['del_okl_btn'] = del_okl_btnbeefc,
        codeStates['setdel_okl_btn'] = setdel_okl_btnbeefc,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletetoolgrant_v1, setdeletetoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_groupbb7f0Ref.current,...data};
      let parentRowSpan = 58;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "05d5ea796b25cc795e0e6fd72c1bb7f0",
        "b325f090b02ccecb5b5d14add7f3e3af"
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
      if (id === "del_cancel_btn3e3af") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "b325f090b02ccecb5b5d14add7f3e3af") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn3e3af");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (del_cancel_btn3e3af?.trigger) 
    {
      handleClick()
      setdel_cancel_btn3e3af((prev:any) => ({...prev, trigger: false}));
    }
  },[del_cancel_btn3e3af?.trigger])

  useEffect(()=>{
    if(del_cancel_btn3e3af?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn3e3af?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, deleteToolGrant_v1: {} }));
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
        setdel_groupbb7f0((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletetoolgrant');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_groupbb7f0((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_groupbb7f0((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

  if (del_cancel_btn3e3af?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `49 / 55`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {del_cancel_btn3e3af?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdCancel"
          iconDisplay='Start with Icon'
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttondel_cancel_btn

