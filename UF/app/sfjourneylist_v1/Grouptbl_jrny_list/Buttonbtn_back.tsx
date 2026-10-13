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
 

const Buttonbtn_back = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {grp_overall_jrny_listc7a13, setgrp_overall_jrny_listc7a13}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_jrny_listc7a13Props, setgrp_overall_jrny_listc7a13Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_jrny_list1e9df, settbl_jrny_list1e9df}= useContext(TotalContext) as TotalContextProps;
  const {tbl_jrny_list1e9dfProps, settbl_jrny_list1e9dfProps}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_filee0c17, setcol_sal_filee0c17}= useContext(TotalContext) as TotalContextProps;
  const {col_src_namee72b4, setcol_src_namee72b4}= useContext(TotalContext) as TotalContextProps;
  const {col_prcs_namee094a, setcol_prcs_namee094a}= useContext(TotalContext) as TotalContextProps;
  const {col_step900de, setcol_step900de}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_count32ab4, setcol_tran_count32ab4}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_transactionda729, setbtn_view_transactionda729}= useContext(TotalContext) as TotalContextProps;
  const {col_vgphe_idf0700, setcol_vgphe_idf0700}= useContext(TotalContext) as TotalContextProps;
  const {btn_back183b3, setbtn_back183b3}= useContext(TotalContext) as TotalContextProps;
  const {wps_v1Props, setwps_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const tbl_jrny_list1e9dfRef = useRef(tbl_jrny_list1e9df);
  useEffect(() => {
    tbl_jrny_list1e9dfRef.current = tbl_jrny_list1e9df;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [tbl_jrny_list1e9df]);
  
  //group props in ref to access latest props value
  const tbl_jrny_list1e9dfPropsRef = useRef(tbl_jrny_list1e9dfProps);
  useEffect(() => {
    tbl_jrny_list1e9dfPropsRef.current = tbl_jrny_list1e9dfProps;
  }, [tbl_jrny_list1e9dfProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['grp_overall_jrny_list'] = grp_overall_jrny_listc7a13,
        codeStates['setgrp_overall_jrny_list'] = setgrp_overall_jrny_listc7a13,
        codeStates['grp_overall_jrny_listc7a13'] = grp_overall_jrny_listc7a13Props,
        codeStates['setgrp_overall_jrny_listc7a13'] = setgrp_overall_jrny_listc7a13Props,
        codeStates['tbl_jrny_list'] = tbl_jrny_list1e9df,
        codeStates['settbl_jrny_list'] = settbl_jrny_list1e9df,
        codeStates['tbl_jrny_list1e9df'] = tbl_jrny_list1e9dfProps,
        codeStates['settbl_jrny_list1e9df'] = settbl_jrny_list1e9dfProps,
        codeStates['col_sal_file'] = col_sal_filee0c17,
        codeStates['setcol_sal_file'] = setcol_sal_filee0c17,
        codeStates['col_src_name'] = col_src_namee72b4,
        codeStates['setcol_src_name'] = setcol_src_namee72b4,
        codeStates['col_prcs_name'] = col_prcs_namee094a,
        codeStates['setcol_prcs_name'] = setcol_prcs_namee094a,
        codeStates['col_step'] = col_step900de,
        codeStates['setcol_step'] = setcol_step900de,
        codeStates['col_tran_count'] = col_tran_count32ab4,
        codeStates['setcol_tran_count'] = setcol_tran_count32ab4,
        codeStates['btn_view_transaction'] = btn_view_transactionda729,
        codeStates['setbtn_view_transaction'] = setbtn_view_transactionda729,
        codeStates['col_vgphe_id'] = col_vgphe_idf0700,
        codeStates['setcol_vgphe_id'] = setcol_vgphe_idf0700,
        codeStates['btn_back'] = btn_back183b3,
        codeStates['setbtn_back'] = setbtn_back183b3,
        codeStates['wps_v1'] = wps_v1Props,
        codeStates['setwps_v1'] = setwps_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {sfjourneylist_v1, setsfjourneylist_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...tbl_jrny_list1e9dfRef.current,...data};
      let parentRowSpan = 155;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "cb2adc75380f3572af66ef0d11a1e9df",
        "1d4a54ebb04948d8987646a141b183b3"
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
      if (id === "btn_back183b3") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "1d4a54ebb04948d8987646a141b183b3") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "btn_back183b3");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!btn_back183b3?.trigger) return;
      if(btn_back183b3?.trigger){
      setbtn_back183b3((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[btn_back183b3?.trigger])

  useEffect(()=>{
    if(btn_back183b3?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[btn_back183b3?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, SFJourneyList_v1: {} }));
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
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...grp_overall_jrny_listc7a13,...tbl_jrny_list1e9df});
    setwps_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1', 'wps_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
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
 if (btn_back183b3?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: ` / `,gridRow: ` / `, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-blue-600 !text-white !py-2 !rounded-md flex items-center gap-2"
          onClick={handleClick}
          view='action'
          disabled= {btn_back183b3?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Back")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_back

