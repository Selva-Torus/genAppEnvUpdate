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

  const {grp_overall_employee_list350f4, setgrp_overall_employee_list350f4}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_employee_list350f4Props, setgrp_overall_employee_list350f4Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_backdb4f7, setbtn_backdb4f7}= useContext(TotalContext) as TotalContextProps;
  const {btn_export_as_excelf9ac3, setbtn_export_as_excelf9ac3}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67ed, settbl_emp_sal_listf67ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67edProps, settbl_emp_sal_listf67edProps}= useContext(TotalContext) as TotalContextProps;
  const {enquiry_v1Props, setenquiry_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const grp_overall_employee_list350f4Ref = useRef(grp_overall_employee_list350f4);
  useEffect(() => {
    grp_overall_employee_list350f4Ref.current = grp_overall_employee_list350f4;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [grp_overall_employee_list350f4]);
  
  //group props in ref to access latest props value
  const grp_overall_employee_list350f4PropsRef = useRef(grp_overall_employee_list350f4Props);
  useEffect(() => {
    grp_overall_employee_list350f4PropsRef.current = grp_overall_employee_list350f4Props;
  }, [grp_overall_employee_list350f4Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['grp_overall_employee_list'] = grp_overall_employee_list350f4,
        codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list350f4,
        codeStates['grp_overall_employee_list350f4'] = grp_overall_employee_list350f4Props,
        codeStates['setgrp_overall_employee_list350f4'] = setgrp_overall_employee_list350f4Props,
        codeStates['btn_back'] = btn_backdb4f7,
        codeStates['setbtn_back'] = setbtn_backdb4f7,
        codeStates['btn_export_as_excel'] = btn_export_as_excelf9ac3,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excelf9ac3,
        codeStates['tbl_emp_sal_list'] = tbl_emp_sal_listf67ed,
        codeStates['settbl_emp_sal_list'] = settbl_emp_sal_listf67ed,
        codeStates['tbl_emp_sal_listf67ed'] = tbl_emp_sal_listf67edProps,
        codeStates['settbl_emp_sal_listf67ed'] = settbl_emp_sal_listf67edProps,
        codeStates['enquiry_v1'] = enquiry_v1Props,
        codeStates['setenquiry_v1'] = setenquiry_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {enquiryempsalrpt_v1, setenquiryempsalrpt_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...grp_overall_employee_list350f4Ref.current,...data};
      let parentRowSpan = 143;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "c368a37b1be795efe6568259f77350f4",
        "ff378f52c8fb4cc2a6bf4e91d86db4f7"
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
      if (id === "btn_backdb4f7") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "ff378f52c8fb4cc2a6bf4e91d86db4f7") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "btn_backdb4f7");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!btn_backdb4f7?.trigger) return;
      if(btn_backdb4f7?.trigger){
      setbtn_backdb4f7((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[btn_backdb4f7?.trigger])

  useEffect(()=>{
    if(btn_backdb4f7?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[btn_backdb4f7?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, enquiryEmpSalRPT_v1: {} }));
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
        setgrp_overall_employee_list350f4((prev: any) => ({ ...prev, btn_back: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...grp_overall_employee_list350f4});
    setenquiry_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1', 'enquiry_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgrp_overall_employee_list350f4((prev: any) => ({ ...prev, btn_back: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgrp_overall_employee_list350f4((prev: any) => ({ ...prev, btn_back: false }));
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
 if (btn_backdb4f7?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 23`,gridRow: `2 / 12`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !text-blue-600 !py-2 !rounded-md flex items-center"
          onClick={handleClick}
          view='action'
          disabled= {btn_backdb4f7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Back")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_back

