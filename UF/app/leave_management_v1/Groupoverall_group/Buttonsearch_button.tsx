'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
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
 

const Buttonsearch_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
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
    
 /////////////
   //another screen

  const {overall_group3fa8c, setoverall_group3fa8c}= useContext(TotalContext) as TotalContextProps;
  const {overall_group3fa8cProps, setoverall_group3fa8cProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_management4632d, setleave_management4632d}= useContext(TotalContext) as TotalContextProps;
  const {search_buttonc7fc6, setsearch_buttonc7fc6}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233, setleave_request_table25233}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233Props, setleave_request_table25233Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cdProps, setemp_table_group0a9cdProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32bProps, setleave_req_tablesbb32bProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0bProps, setapproval_pendinge1c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const overall_group3fa8cRef = useRef(overall_group3fa8c);
  useEffect(() => {
    overall_group3fa8cRef.current = overall_group3fa8c;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [overall_group3fa8c]);
  
  //group props in ref to access latest props value
  const overall_group3fa8cPropsRef = useRef(overall_group3fa8cProps);
  useEffect(() => {
    overall_group3fa8cPropsRef.current = overall_group3fa8cProps;
  }, [overall_group3fa8cProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_group'] = overall_group3fa8c,
        codeStates['setoverall_group'] = setoverall_group3fa8c,
        codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
        codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
        codeStates['leave_management'] = leave_management4632d,
        codeStates['setleave_management'] = setleave_management4632d,
        codeStates['search_button'] = search_buttonc7fc6,
        codeStates['setsearch_button'] = setsearch_buttonc7fc6,
        codeStates['tab_group'] = tab_groupfe908,
        codeStates['settab_group'] = settab_groupfe908,
        codeStates['leave_request_table'] = leave_request_table25233,
        codeStates['setleave_request_table'] = setleave_request_table25233,
        codeStates['leave_request_table25233'] = leave_request_table25233Props,
        codeStates['setleave_request_table25233'] = setleave_request_table25233Props,
        codeStates['emp_table_group'] = emp_table_group0a9cd,
        codeStates['setemp_table_group'] = setemp_table_group0a9cd,
        codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
        codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
        codeStates['leave_req_tables'] = leave_req_tablesbb32b,
        codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
        codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
        codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
        codeStates['approval_pending'] = approval_pendinge1c0b,
        codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
        codeStates['approval_pendinge1c0b'] = approval_pendinge1c0bProps,
        codeStates['setapproval_pendinge1c0b'] = setapproval_pendinge1c0bProps,
        codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
        codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
        codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
        codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
        codeStates['approval_pending_table'] = approval_pending_tablee294f,
        codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
        codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
        codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {leaverequest_v1, setleaverequest_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...overall_group3fa8cRef.current};
      let parentRowSpan = 145;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "516a7bcb00774d49883ad3c9d003fa8c",
        "eb93674631c74eae9cfa43504bec7fc6"
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
      if (id === "search_buttonc7fc6") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "eb93674631c74eae9cfa43504bec7fc6") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search_buttonc7fc6");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!search_buttonc7fc6?.trigger) return;
      if(search_buttonc7fc6?.trigger){
      setsearch_buttonc7fc6((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search_buttonc7fc6?.trigger])

  useEffect(()=>{
    if(search_buttonc7fc6?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search_buttonc7fc6?.refresh])
  

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
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setoverall_group3fa8c((prev: any) => ({ ...prev, search_button: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setoverall_group3fa8c((prev: any) => ({ ...prev, search_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setoverall_group3fa8c((prev: any) => ({ ...prev, search_button: false }));
    }
  }

 if (search_buttonc7fc6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-md !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {search_buttonc7fc6?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonsearch_button

