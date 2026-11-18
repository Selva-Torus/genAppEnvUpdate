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

  const {del_group7f870, setdel_group7f870}= useContext(TotalContext) as TotalContextProps;
  const {del_group7f870Props, setdel_group7f870Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtf9471, setdelete_heading_txtf9471}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1321ef, setdel_divider_1321ef}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text5cf8a, setasset_name_text5cf8a}= useContext(TotalContext) as TotalContextProps;
  const {identity_ide840b, setidentity_ide840b}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text9ff1b, setasset_code_text9ff1b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name6163e, setasset_name6163e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text57627, setasset_type_code_text57627}= useContext(TotalContext) as TotalContextProps;
  const {principal_id3e7f4, setprincipal_id3e7f4}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text4fcd1, setrisk_tier_code_text4fcd1}= useContext(TotalContext) as TotalContextProps;
  const {principal_typefe01d, setprincipal_typefe01d}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc44b6, setlifecycle_status_code_textc44b6}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1bb9d, setidentity_provider1bb9d}= useContext(TotalContext) as TotalContextProps;
  const {text9d6d5, settext9d6d5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_23064f, setdel_divider_23064f}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn69608, setdel_cancel_btn69608}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn070a5, setdel_okl_btn070a5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group7f870Ref = useRef(del_group7f870);
  useEffect(() => {
    del_group7f870Ref.current = del_group7f870;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group7f870]);
  
  //group props in ref to access latest props value
  const del_group7f870PropsRef = useRef(del_group7f870Props);
  useEffect(() => {
    del_group7f870PropsRef.current = del_group7f870Props;
  }, [del_group7f870Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group7f870,
        codeStates['setdel_group'] = setdel_group7f870,
        codeStates['del_group7f870'] = del_group7f870Props,
        codeStates['setdel_group7f870'] = setdel_group7f870Props,
        codeStates['delete_heading_txt'] = delete_heading_txtf9471,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtf9471,
        codeStates['del_divider_1'] = del_divider_1321ef,
        codeStates['setdel_divider_1'] = setdel_divider_1321ef,
        codeStates['asset_name_text'] = asset_name_text5cf8a,
        codeStates['setasset_name_text'] = setasset_name_text5cf8a,
        codeStates['identity_id'] = identity_ide840b,
        codeStates['setidentity_id'] = setidentity_ide840b,
        codeStates['asset_code_text'] = asset_code_text9ff1b,
        codeStates['setasset_code_text'] = setasset_code_text9ff1b,
        codeStates['asset_name'] = asset_name6163e,
        codeStates['setasset_name'] = setasset_name6163e,
        codeStates['asset_type_code_text'] = asset_type_code_text57627,
        codeStates['setasset_type_code_text'] = setasset_type_code_text57627,
        codeStates['principal_id'] = principal_id3e7f4,
        codeStates['setprincipal_id'] = setprincipal_id3e7f4,
        codeStates['risk_tier_code_text'] = risk_tier_code_text4fcd1,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text4fcd1,
        codeStates['principal_type'] = principal_typefe01d,
        codeStates['setprincipal_type'] = setprincipal_typefe01d,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc44b6,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc44b6,
        codeStates['identity_provider'] = identity_provider1bb9d,
        codeStates['setidentity_provider'] = setidentity_provider1bb9d,
        codeStates['text'] = text9d6d5,
        codeStates['settext'] = settext9d6d5,
        codeStates['del_divider_2'] = del_divider_23064f,
        codeStates['setdel_divider_2'] = setdel_divider_23064f,
        codeStates['del_cancel_btn'] = del_cancel_btn69608,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn69608,
        codeStates['del_okl_btn'] = del_okl_btn070a5,
        codeStates['setdel_okl_btn'] = setdel_okl_btn070a5,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteserviceidentity_v1, setdeleteserviceidentity_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group7f870Ref.current,...data};
      let parentRowSpan = 60;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9c258863f668954d9aa4e3170c07f870",
        "b5c5001e0ecc09c45517de78f6569608"
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
      if (id === "del_cancel_btn69608") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "b5c5001e0ecc09c45517de78f6569608") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn69608");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (del_cancel_btn69608?.trigger) 
    {
      handleClick()
      setdel_cancel_btn69608((prev:any) => ({...prev, trigger: false}));
    }
  },[del_cancel_btn69608?.trigger])

  useEffect(()=>{
    if(del_cancel_btn69608?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn69608?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, deleteServiceIdentity_v1: {} }));
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
        setdel_group7f870((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteserviceidentity');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group7f870((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group7f870((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

  if (del_cancel_btn69608?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `50 / 56`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#F4F5FA] hover:!bg-[#E5E7EB] !text-[#374151] !border !border-[#D1D5DB] !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {del_cancel_btn69608?.isDisabled ? true : false}
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

