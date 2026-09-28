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

  const {del_group0a1e4, setdel_group0a1e4}= useContext(TotalContext) as TotalContextProps;
  const {del_group0a1e4Props, setdel_group0a1e4Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt257e2, setdelete_heading_txt257e2}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1d3380, setdel_divider_1d3380}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textd9565, setasset_name_textd9565}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_idd8a9c, setasset_version_idd8a9c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textbb47a, setasset_code_textbb47a}= useContext(TotalContext) as TotalContextProps;
  const {version_no1d837, setversion_no1d837}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text2a3a9, setasset_type_code_text2a3a9}= useContext(TotalContext) as TotalContextProps;
  const {change_type_code38ad2, setchange_type_code38ad2}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textf8ea3, setrisk_tier_code_textf8ea3}= useContext(TotalContext) as TotalContextProps;
  const {valid_from0005c, setvalid_from0005c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textdbc1a, setlifecycle_status_code_textdbc1a}= useContext(TotalContext) as TotalContextProps;
  const {valid_to432ce, setvalid_to432ce}= useContext(TotalContext) as TotalContextProps;
  const {textc1c26, settextc1c26}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2e3d3b, setdel_divider_2e3d3b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9abbc, setdel_cancel_btn9abbc}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn82920, setdel_okl_btn82920}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group0a1e4Ref = useRef(del_group0a1e4);
  useEffect(() => {
    del_group0a1e4Ref.current = del_group0a1e4;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group0a1e4]);
  
  //group props in ref to access latest props value
  const del_group0a1e4PropsRef = useRef(del_group0a1e4Props);
  useEffect(() => {
    del_group0a1e4PropsRef.current = del_group0a1e4Props;
  }, [del_group0a1e4Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group0a1e4,
        codeStates['setdel_group'] = setdel_group0a1e4,
        codeStates['del_group0a1e4'] = del_group0a1e4Props,
        codeStates['setdel_group0a1e4'] = setdel_group0a1e4Props,
        codeStates['delete_heading_txt'] = delete_heading_txt257e2,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt257e2,
        codeStates['del_divider_1'] = del_divider_1d3380,
        codeStates['setdel_divider_1'] = setdel_divider_1d3380,
        codeStates['asset_name_text'] = asset_name_textd9565,
        codeStates['setasset_name_text'] = setasset_name_textd9565,
        codeStates['asset_version_id'] = asset_version_idd8a9c,
        codeStates['setasset_version_id'] = setasset_version_idd8a9c,
        codeStates['asset_code_text'] = asset_code_textbb47a,
        codeStates['setasset_code_text'] = setasset_code_textbb47a,
        codeStates['version_no'] = version_no1d837,
        codeStates['setversion_no'] = setversion_no1d837,
        codeStates['asset_type_code_text'] = asset_type_code_text2a3a9,
        codeStates['setasset_type_code_text'] = setasset_type_code_text2a3a9,
        codeStates['change_type_code'] = change_type_code38ad2,
        codeStates['setchange_type_code'] = setchange_type_code38ad2,
        codeStates['risk_tier_code_text'] = risk_tier_code_textf8ea3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textf8ea3,
        codeStates['valid_from'] = valid_from0005c,
        codeStates['setvalid_from'] = setvalid_from0005c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textdbc1a,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textdbc1a,
        codeStates['valid_to'] = valid_to432ce,
        codeStates['setvalid_to'] = setvalid_to432ce,
        codeStates['text'] = textc1c26,
        codeStates['settext'] = settextc1c26,
        codeStates['del_divider_2'] = del_divider_2e3d3b,
        codeStates['setdel_divider_2'] = setdel_divider_2e3d3b,
        codeStates['del_cancel_btn'] = del_cancel_btn9abbc,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn9abbc,
        codeStates['del_okl_btn'] = del_okl_btn82920,
        codeStates['setdel_okl_btn'] = setdel_okl_btn82920,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteaiassetversion_v1, setdeleteaiassetversion_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group0a1e4Ref.current,...data};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "a0cdf54c603608ef58444d65c880a1e4",
        "34b75f64dfbe10892a7a2724be69abbc"
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
      if (id === "del_cancel_btn9abbc") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "34b75f64dfbe10892a7a2724be69abbc") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn9abbc");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btn9abbc?.trigger) return;
      if(del_cancel_btn9abbc?.trigger){
      setdel_cancel_btn9abbc((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btn9abbc?.trigger])

  useEffect(()=>{
    if(del_cancel_btn9abbc?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn9abbc?.refresh])
  

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
        setdel_group0a1e4((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteaiassetversion');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group0a1e4((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group0a1e4((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btn9abbc?.isHidden) {
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
          disabled= {del_cancel_btn9abbc?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttondel_cancel_btn

