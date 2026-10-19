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
 

const Buttoncancel_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {group33388, setgroup33388}= useContext(TotalContext) as TotalContextProps;
  const {group33388Props, setgroup33388Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_textaea5a, setdel_heading_textaea5a}= useContext(TotalContext) as TotalContextProps;
  const {divider_1e1b27, setdivider_1e1b27}= useContext(TotalContext) as TotalContextProps;
  const {stage_name_txt46880, setstage_name_txt46880}= useContext(TotalContext) as TotalContextProps;
  const {stage_name53e8f, setstage_name53e8f}= useContext(TotalContext) as TotalContextProps;
  const {del_condition_txt5e2fe, setdel_condition_txt5e2fe}= useContext(TotalContext) as TotalContextProps;
  const {condition_txt9eed1, setcondition_txt9eed1}= useContext(TotalContext) as TotalContextProps;
  const {del_status_code_txt7812f, setdel_status_code_txt7812f}= useContext(TotalContext) as TotalContextProps;
  const {status_code3655c, setstatus_code3655c}= useContext(TotalContext) as TotalContextProps;
  const {del_due_date4d800, setdel_due_date4d800}= useContext(TotalContext) as TotalContextProps;
  const {due_dated27ee, setdue_dated27ee}= useContext(TotalContext) as TotalContextProps;
  const {textd0517, settextd0517}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d32a6, setdivider_2d32a6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnf4b06, setcancel_btnf4b06}= useContext(TotalContext) as TotalContextProps;
  const {del_btn5ea29, setdel_btn5ea29}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_idb65fc, setcert_condition_idb65fc}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idd8967, setcert_stage_idd8967}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group33388Ref = useRef(group33388);
  useEffect(() => {
    group33388Ref.current = group33388;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group33388]);
  
  //group props in ref to access latest props value
  const group33388PropsRef = useRef(group33388Props);
  useEffect(() => {
    group33388PropsRef.current = group33388Props;
  }, [group33388Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = group33388,
        codeStates['setgroup'] = setgroup33388,
        codeStates['group33388'] = group33388Props,
        codeStates['setgroup33388'] = setgroup33388Props,
        codeStates['del_heading_text'] = del_heading_textaea5a,
        codeStates['setdel_heading_text'] = setdel_heading_textaea5a,
        codeStates['divider_1'] = divider_1e1b27,
        codeStates['setdivider_1'] = setdivider_1e1b27,
        codeStates['stage_name_txt'] = stage_name_txt46880,
        codeStates['setstage_name_txt'] = setstage_name_txt46880,
        codeStates['stage_name'] = stage_name53e8f,
        codeStates['setstage_name'] = setstage_name53e8f,
        codeStates['del_condition_txt'] = del_condition_txt5e2fe,
        codeStates['setdel_condition_txt'] = setdel_condition_txt5e2fe,
        codeStates['condition_txt'] = condition_txt9eed1,
        codeStates['setcondition_txt'] = setcondition_txt9eed1,
        codeStates['del_status_code_txt'] = del_status_code_txt7812f,
        codeStates['setdel_status_code_txt'] = setdel_status_code_txt7812f,
        codeStates['status_code'] = status_code3655c,
        codeStates['setstatus_code'] = setstatus_code3655c,
        codeStates['del_due_date'] = del_due_date4d800,
        codeStates['setdel_due_date'] = setdel_due_date4d800,
        codeStates['due_date'] = due_dated27ee,
        codeStates['setdue_date'] = setdue_dated27ee,
        codeStates['text'] = textd0517,
        codeStates['settext'] = settextd0517,
        codeStates['divider_2'] = divider_2d32a6,
        codeStates['setdivider_2'] = setdivider_2d32a6,
        codeStates['cancel_btn'] = cancel_btnf4b06,
        codeStates['setcancel_btn'] = setcancel_btnf4b06,
        codeStates['del_btn'] = del_btn5ea29,
        codeStates['setdel_btn'] = setdel_btn5ea29,
        codeStates['cert_condition_id'] = cert_condition_idb65fc,
        codeStates['setcert_condition_id'] = setcert_condition_idb65fc,
        codeStates['cert_stage_id'] = cert_stage_idd8967,
        codeStates['setcert_stage_id'] = setcert_stage_idd8967,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletecertificationcondition_v1, setdeletecertificationcondition_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group33388Ref.current,...data};
      let parentRowSpan = 61;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "dbbd91b2d162abdca2f335c881f33388",
        "1b97e9fbb4bd810e72b9e2cf880f4b06"
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
      if (id === "cancel_btnf4b06") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "1b97e9fbb4bd810e72b9e2cf880f4b06") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_btnf4b06");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_btnf4b06?.trigger) return;
      if(cancel_btnf4b06?.trigger){
      setcancel_btnf4b06((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_btnf4b06?.trigger])

  useEffect(()=>{
    if(cancel_btnf4b06?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_btnf4b06?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, deleteCertificationCondition_v1: {} }));
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
        setgroup33388((prev: any) => ({ ...prev, cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletecertificationcondition');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup33388((prev: any) => ({ ...prev, cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroup33388((prev: any) => ({ ...prev, cancel_btn: false }));
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
 if (cancel_btnf4b06?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `51 / 57`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#E5E7EB] hover:!bg-[#D1D5DB] !text-[#374151] !rounded-lg !font-bold  "
          onClick={handleClick}
          view='action'
          disabled= {cancel_btnf4b06?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_btn

