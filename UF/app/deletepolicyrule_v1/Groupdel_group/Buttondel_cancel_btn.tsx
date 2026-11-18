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

  const {del_group56243, setdel_group56243}= useContext(TotalContext) as TotalContextProps;
  const {del_group56243Props, setdel_group56243Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txte8a82, setdelete_heading_txte8a82}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1bd3d8, setdel_divider_1bd3d8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text60051, setasset_name_text60051}= useContext(TotalContext) as TotalContextProps;
  const {policy_code3279a, setpolicy_code3279a}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta659e, setasset_code_texta659e}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3072c, setpolicy_name3072c}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text620ea, setasset_type_code_text620ea}= useContext(TotalContext) as TotalContextProps;
  const {policy_type7ebd5, setpolicy_type7ebd5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text79046, setrisk_tier_code_text79046}= useContext(TotalContext) as TotalContextProps;
  const {applies_to_tiers7f62c, setapplies_to_tiers7f62c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc74b9, setlifecycle_status_code_textc74b9}= useContext(TotalContext) as TotalContextProps;
  const {test_status61eae, settest_status61eae}= useContext(TotalContext) as TotalContextProps;
  const {text48ed4, settext48ed4}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_24cf58, setdel_divider_24cf58}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_id35702, setpolicy_rule_id35702}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn42f6a, setdel_cancel_btn42f6a}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn6aa11, setdel_okl_btn6aa11}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group56243Ref = useRef(del_group56243);
  useEffect(() => {
    del_group56243Ref.current = del_group56243;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group56243]);
  
  //group props in ref to access latest props value
  const del_group56243PropsRef = useRef(del_group56243Props);
  useEffect(() => {
    del_group56243PropsRef.current = del_group56243Props;
  }, [del_group56243Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group56243,
        codeStates['setdel_group'] = setdel_group56243,
        codeStates['del_group56243'] = del_group56243Props,
        codeStates['setdel_group56243'] = setdel_group56243Props,
        codeStates['delete_heading_txt'] = delete_heading_txte8a82,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txte8a82,
        codeStates['del_divider_1'] = del_divider_1bd3d8,
        codeStates['setdel_divider_1'] = setdel_divider_1bd3d8,
        codeStates['asset_name_text'] = asset_name_text60051,
        codeStates['setasset_name_text'] = setasset_name_text60051,
        codeStates['policy_code'] = policy_code3279a,
        codeStates['setpolicy_code'] = setpolicy_code3279a,
        codeStates['asset_code_text'] = asset_code_texta659e,
        codeStates['setasset_code_text'] = setasset_code_texta659e,
        codeStates['policy_name'] = policy_name3072c,
        codeStates['setpolicy_name'] = setpolicy_name3072c,
        codeStates['asset_type_code_text'] = asset_type_code_text620ea,
        codeStates['setasset_type_code_text'] = setasset_type_code_text620ea,
        codeStates['policy_type'] = policy_type7ebd5,
        codeStates['setpolicy_type'] = setpolicy_type7ebd5,
        codeStates['risk_tier_code_text'] = risk_tier_code_text79046,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text79046,
        codeStates['applies_to_tiers'] = applies_to_tiers7f62c,
        codeStates['setapplies_to_tiers'] = setapplies_to_tiers7f62c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc74b9,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc74b9,
        codeStates['test_status'] = test_status61eae,
        codeStates['settest_status'] = settest_status61eae,
        codeStates['text'] = text48ed4,
        codeStates['settext'] = settext48ed4,
        codeStates['del_divider_2'] = del_divider_24cf58,
        codeStates['setdel_divider_2'] = setdel_divider_24cf58,
        codeStates['policy_rule_id'] = policy_rule_id35702,
        codeStates['setpolicy_rule_id'] = setpolicy_rule_id35702,
        codeStates['del_cancel_btn'] = del_cancel_btn42f6a,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn42f6a,
        codeStates['del_okl_btn'] = del_okl_btn6aa11,
        codeStates['setdel_okl_btn'] = setdel_okl_btn6aa11,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletepolicyrule_v1, setdeletepolicyrule_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group56243Ref.current,...data};
      let parentRowSpan = 60;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "a8ff6ba79c83b3e6b0c730a8b0956243",
        "b1e3225eb043a1d26b292195bbf42f6a"
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
      if (id === "del_cancel_btn42f6a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "b1e3225eb043a1d26b292195bbf42f6a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn42f6a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (del_cancel_btn42f6a?.trigger) 
    {
      handleClick()
      setdel_cancel_btn42f6a((prev:any) => ({...prev, trigger: false}));
    }
  },[del_cancel_btn42f6a?.trigger])

  useEffect(()=>{
    if(del_cancel_btn42f6a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn42f6a?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, deletePolicyRule_v1: {} }));
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
        setdel_group56243((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletepolicyrule');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group56243((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group56243((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

  if (del_cancel_btn42f6a?.isHidden) {
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
          disabled= {del_cancel_btn42f6a?.isDisabled ? true : false}
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

