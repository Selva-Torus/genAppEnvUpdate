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

  const {grp_overall_tran_listc200a, setgrp_overall_tran_listc200a}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_listc200aProps, setgrp_overall_tran_listc200aProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634a, settbl_tran_list0634a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634aProps, settbl_tran_list0634aProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mol35ce2, setcol_emp_mol35ce2}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name53515, setcol_emp_name53515}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_acc_no519d3, setcol_cr_acc_no519d3}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt0743c, setcol_fixed_amnt0743c}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt25d0d, setcol_var_amnt25d0d}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_tran_amnt1acc3, setcol_tot_tran_amnt1acc3}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date5679d, setcol_created_date5679d}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_namebaf46, setcol_sf_file_namebaf46}= useContext(TotalContext) as TotalContextProps;
  const {col_rsn_codeaa610, setcol_rsn_codeaa610}= useContext(TotalContext) as TotalContextProps;
  const {btn_initiate6f8a7, setbtn_initiate6f8a7}= useContext(TotalContext) as TotalContextProps;
  const {col_uuid8350f, setcol_uuid8350f}= useContext(TotalContext) as TotalContextProps;
  const {btn_authorize7ae96, setbtn_authorize7ae96}= useContext(TotalContext) as TotalContextProps;
  const {btn_back41a76, setbtn_back41a76}= useContext(TotalContext) as TotalContextProps;
  const {returnsrefund_v1Props, setreturnsrefund_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const tbl_tran_list0634aRef = useRef(tbl_tran_list0634a);
  useEffect(() => {
    tbl_tran_list0634aRef.current = tbl_tran_list0634a;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [tbl_tran_list0634a]);
  
  //group props in ref to access latest props value
  const tbl_tran_list0634aPropsRef = useRef(tbl_tran_list0634aProps);
  useEffect(() => {
    tbl_tran_list0634aPropsRef.current = tbl_tran_list0634aProps;
  }, [tbl_tran_list0634aProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['grp_overall_tran_list'] = grp_overall_tran_listc200a,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_listc200a,
        codeStates['grp_overall_tran_listc200a'] = grp_overall_tran_listc200aProps,
        codeStates['setgrp_overall_tran_listc200a'] = setgrp_overall_tran_listc200aProps,
        codeStates['tbl_tran_list'] = tbl_tran_list0634a,
        codeStates['settbl_tran_list'] = settbl_tran_list0634a,
        codeStates['tbl_tran_list0634a'] = tbl_tran_list0634aProps,
        codeStates['settbl_tran_list0634a'] = settbl_tran_list0634aProps,
        codeStates['col_emp_mol'] = col_emp_mol35ce2,
        codeStates['setcol_emp_mol'] = setcol_emp_mol35ce2,
        codeStates['col_emp_name'] = col_emp_name53515,
        codeStates['setcol_emp_name'] = setcol_emp_name53515,
        codeStates['col_cr_acc_no'] = col_cr_acc_no519d3,
        codeStates['setcol_cr_acc_no'] = setcol_cr_acc_no519d3,
        codeStates['col_fixed_amnt'] = col_fixed_amnt0743c,
        codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt0743c,
        codeStates['col_var_amnt'] = col_var_amnt25d0d,
        codeStates['setcol_var_amnt'] = setcol_var_amnt25d0d,
        codeStates['col_tot_tran_amnt'] = col_tot_tran_amnt1acc3,
        codeStates['setcol_tot_tran_amnt'] = setcol_tot_tran_amnt1acc3,
        codeStates['col_created_date'] = col_created_date5679d,
        codeStates['setcol_created_date'] = setcol_created_date5679d,
        codeStates['col_sf_file_name'] = col_sf_file_namebaf46,
        codeStates['setcol_sf_file_name'] = setcol_sf_file_namebaf46,
        codeStates['col_rsn_code'] = col_rsn_codeaa610,
        codeStates['setcol_rsn_code'] = setcol_rsn_codeaa610,
        codeStates['btn_initiate'] = btn_initiate6f8a7,
        codeStates['setbtn_initiate'] = setbtn_initiate6f8a7,
        codeStates['col_uuid'] = col_uuid8350f,
        codeStates['setcol_uuid'] = setcol_uuid8350f,
        codeStates['btn_authorize'] = btn_authorize7ae96,
        codeStates['setbtn_authorize'] = setbtn_authorize7ae96,
        codeStates['btn_back'] = btn_back41a76,
        codeStates['setbtn_back'] = setbtn_back41a76,
        codeStates['returnsrefund_v1'] = returnsrefund_v1Props,
        codeStates['setreturnsrefund_v1'] = setreturnsrefund_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {requestrefundtransactionlist_v1, setrequestrefundtransactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...tbl_tran_list0634aRef.current,...data};
      let parentRowSpan = 145;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9b513c81279903e0563b418223c0634a",
        "731be9dcd55093569c78eaa18bf41a76"
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
      if (id === "btn_back41a76") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "731be9dcd55093569c78eaa18bf41a76") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "btn_back41a76");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!btn_back41a76?.trigger) return;
      if(btn_back41a76?.trigger){
      setbtn_back41a76((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[btn_back41a76?.trigger])

  useEffect(()=>{
    if(btn_back41a76?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[btn_back41a76?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, requestRefundTransactionList_v1: {} }));
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
      let filterData2 = await getFilterProps(filterProps2,{...grp_overall_tran_listc200a,...tbl_tran_list0634a});
    setreturnsrefund_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1', 'returnsrefund_v1'));
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
 if (btn_back41a76?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: ` / `,gridRow: ` / `, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-blue-600 !text-white !py-2  !px-3 !rounded-md flex items-center gap-2"
          onClick={handleClick}
          view='action'
          disabled= {btn_back41a76?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Back")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_back

