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

  const {del_group9ef8a, setdel_group9ef8a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9ef8aProps, setdel_group9ef8aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtdb5d3, setdelete_heading_txtdb5d3}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_156db0, setdel_divider_156db0}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text54f6e, setasset_name_text54f6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id410ac, setrisk_rule_id410ac}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text06814, setasset_code_text06814}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_codee559b, setrisk_rule_codee559b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text95c11, setasset_type_code_text95c11}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_code8dc1a, setresult_tier_code8dc1a}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textcc1ba, setrisk_tier_code_textcc1ba}= useContext(TotalContext) as TotalContextProps;
  const {effective_from26db3, seteffective_from26db3}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textacd8e, setlifecycle_status_code_textacd8e}= useContext(TotalContext) as TotalContextProps;
  const {is_active03bb0, setis_active03bb0}= useContext(TotalContext) as TotalContextProps;
  const {texted768, settexted768}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28b40e, setdel_divider_28b40e}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn18f5b, setdel_cancel_btn18f5b}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2baeb, setdel_okl_btn2baeb}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group9ef8aRef = useRef(del_group9ef8a);
  useEffect(() => {
    del_group9ef8aRef.current = del_group9ef8a;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group9ef8a]);
  
  //group props in ref to access latest props value
  const del_group9ef8aPropsRef = useRef(del_group9ef8aProps);
  useEffect(() => {
    del_group9ef8aPropsRef.current = del_group9ef8aProps;
  }, [del_group9ef8aProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group9ef8a,
        codeStates['setdel_group'] = setdel_group9ef8a,
        codeStates['del_group9ef8a'] = del_group9ef8aProps,
        codeStates['setdel_group9ef8a'] = setdel_group9ef8aProps,
        codeStates['delete_heading_txt'] = delete_heading_txtdb5d3,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtdb5d3,
        codeStates['del_divider_1'] = del_divider_156db0,
        codeStates['setdel_divider_1'] = setdel_divider_156db0,
        codeStates['asset_name_text'] = asset_name_text54f6e,
        codeStates['setasset_name_text'] = setasset_name_text54f6e,
        codeStates['risk_rule_id'] = risk_rule_id410ac,
        codeStates['setrisk_rule_id'] = setrisk_rule_id410ac,
        codeStates['asset_code_text'] = asset_code_text06814,
        codeStates['setasset_code_text'] = setasset_code_text06814,
        codeStates['risk_rule_code'] = risk_rule_codee559b,
        codeStates['setrisk_rule_code'] = setrisk_rule_codee559b,
        codeStates['asset_type_code_text'] = asset_type_code_text95c11,
        codeStates['setasset_type_code_text'] = setasset_type_code_text95c11,
        codeStates['result_tier_code'] = result_tier_code8dc1a,
        codeStates['setresult_tier_code'] = setresult_tier_code8dc1a,
        codeStates['risk_tier_code_text'] = risk_tier_code_textcc1ba,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textcc1ba,
        codeStates['effective_from'] = effective_from26db3,
        codeStates['seteffective_from'] = seteffective_from26db3,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textacd8e,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textacd8e,
        codeStates['is_active'] = is_active03bb0,
        codeStates['setis_active'] = setis_active03bb0,
        codeStates['text'] = texted768,
        codeStates['settext'] = settexted768,
        codeStates['del_divider_2'] = del_divider_28b40e,
        codeStates['setdel_divider_2'] = setdel_divider_28b40e,
        codeStates['del_cancel_btn'] = del_cancel_btn18f5b,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn18f5b,
        codeStates['del_okl_btn'] = del_okl_btn2baeb,
        codeStates['setdel_okl_btn'] = setdel_okl_btn2baeb,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteriskrule_v1, setdeleteriskrule_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group9ef8aRef.current,...data};
      let parentRowSpan = 61;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d283a8b55c7049e8842ffc1c3b89ef8a",
        "d2d74ffd8b0e1f375b039383ce918f5b"
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
      if (id === "del_cancel_btn18f5b") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "d2d74ffd8b0e1f375b039383ce918f5b") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn18f5b");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btn18f5b?.trigger) return;
      if(del_cancel_btn18f5b?.trigger){
      setdel_cancel_btn18f5b((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btn18f5b?.trigger])

  useEffect(()=>{
    if(del_cancel_btn18f5b?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn18f5b?.refresh])
  

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
        setdel_group9ef8a((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteriskrule');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group9ef8a((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group9ef8a((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btn18f5b?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `12 / 18`,gridRow: `51 / 57`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {del_cancel_btn18f5b?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttondel_cancel_btn

