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

  const {del_group87d56, setdel_group87d56}= useContext(TotalContext) as TotalContextProps;
  const {del_group87d56Props, setdel_group87d56Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtb320e, setdelete_heading_txtb320e}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1e8bce, setdel_divider_1e8bce}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text4d46c, setasset_name_text4d46c}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_idc996d, setagent_action_idc996d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text5a75b, setasset_code_text5a75b}= useContext(TotalContext) as TotalContextProps;
  const {action_name4a670, setaction_name4a670}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd42be, setasset_type_code_textd42be}= useContext(TotalContext) as TotalContextProps;
  const {target_systemec4ff, settarget_systemec4ff}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text38bd3, setrisk_tier_code_text38bd3}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_api8bd7c, settool_or_api8bd7c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text05717, setlifecycle_status_code_text05717}= useContext(TotalContext) as TotalContextProps;
  const {is_active7f904, setis_active7f904}= useContext(TotalContext) as TotalContextProps;
  const {text7f98b, settext7f98b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_217aff, setdel_divider_217aff}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn5cca7, setdel_cancel_btn5cca7}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn87d21, setdel_okl_btn87d21}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group87d56Ref = useRef(del_group87d56);
  useEffect(() => {
    del_group87d56Ref.current = del_group87d56;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group87d56]);
  
  //group props in ref to access latest props value
  const del_group87d56PropsRef = useRef(del_group87d56Props);
  useEffect(() => {
    del_group87d56PropsRef.current = del_group87d56Props;
  }, [del_group87d56Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group87d56,
        codeStates['setdel_group'] = setdel_group87d56,
        codeStates['del_group87d56'] = del_group87d56Props,
        codeStates['setdel_group87d56'] = setdel_group87d56Props,
        codeStates['delete_heading_txt'] = delete_heading_txtb320e,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtb320e,
        codeStates['del_divider_1'] = del_divider_1e8bce,
        codeStates['setdel_divider_1'] = setdel_divider_1e8bce,
        codeStates['asset_name_text'] = asset_name_text4d46c,
        codeStates['setasset_name_text'] = setasset_name_text4d46c,
        codeStates['agent_action_id'] = agent_action_idc996d,
        codeStates['setagent_action_id'] = setagent_action_idc996d,
        codeStates['asset_code_text'] = asset_code_text5a75b,
        codeStates['setasset_code_text'] = setasset_code_text5a75b,
        codeStates['action_name'] = action_name4a670,
        codeStates['setaction_name'] = setaction_name4a670,
        codeStates['asset_type_code_text'] = asset_type_code_textd42be,
        codeStates['setasset_type_code_text'] = setasset_type_code_textd42be,
        codeStates['target_system'] = target_systemec4ff,
        codeStates['settarget_system'] = settarget_systemec4ff,
        codeStates['risk_tier_code_text'] = risk_tier_code_text38bd3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text38bd3,
        codeStates['tool_or_api'] = tool_or_api8bd7c,
        codeStates['settool_or_api'] = settool_or_api8bd7c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_text05717,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_text05717,
        codeStates['is_active'] = is_active7f904,
        codeStates['setis_active'] = setis_active7f904,
        codeStates['text'] = text7f98b,
        codeStates['settext'] = settext7f98b,
        codeStates['del_divider_2'] = del_divider_217aff,
        codeStates['setdel_divider_2'] = setdel_divider_217aff,
        codeStates['del_cancel_btn'] = del_cancel_btn5cca7,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn5cca7,
        codeStates['del_okl_btn'] = del_okl_btn87d21,
        codeStates['setdel_okl_btn'] = setdel_okl_btn87d21,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteaiagentaction_v1, setdeleteaiagentaction_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group87d56Ref.current,...data};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "b24fd80538717535e7f0c195dc987d56",
        "a6a6e3f6605425f758944b852f85cca7"
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
      if (id === "del_cancel_btn5cca7") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "a6a6e3f6605425f758944b852f85cca7") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn5cca7");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btn5cca7?.trigger) return;
      if(del_cancel_btn5cca7?.trigger){
      setdel_cancel_btn5cca7((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btn5cca7?.trigger])

  useEffect(()=>{
    if(del_cancel_btn5cca7?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn5cca7?.refresh])
  

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
        setdel_group87d56((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteaiagentaction');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group87d56((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group87d56((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btn5cca7?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `12 / 18`,gridRow: `51 / 57`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {del_cancel_btn5cca7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttondel_cancel_btn

