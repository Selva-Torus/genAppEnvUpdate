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
 

const Buttoncancel_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {group_delete3ee3b, setgroup_delete3ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3bProps, setgroup_delete3ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topc704d, setdivider_topc704d}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textdfa35, setdelete_heading_textdfa35}= useContext(TotalContext) as TotalContextProps;
  const {reviewnumb10f3, setreviewnumb10f3}= useContext(TotalContext) as TotalContextProps;
  const {review_number5cbc0, setreview_number5cbc0}= useContext(TotalContext) as TotalContextProps;
  const {employee_name564a0, setemployee_name564a0}= useContext(TotalContext) as TotalContextProps;
  const {full_name68092, setfull_name68092}= useContext(TotalContext) as TotalContextProps;
  const {cyclename50ebb, setcyclename50ebb}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namecf2b5, setcycle_namecf2b5}= useContext(TotalContext) as TotalContextProps;
  const {statusbb202, setstatusbb202}= useContext(TotalContext) as TotalContextProps;
  const {review_status9db4f, setreview_status9db4f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textd6ad8, setconfo_textd6ad8}= useContext(TotalContext) as TotalContextProps;
  const {divider652b0, setdivider652b0}= useContext(TotalContext) as TotalContextProps;
  const {review_id5d984, setreview_id5d984}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button5aa68, setcancel_button5aa68}= useContext(TotalContext) as TotalContextProps;
  const {ok_button9b4bd, setok_button9b4bd}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete3ee3bRef = useRef(group_delete3ee3b);
  useEffect(() => {
    group_delete3ee3bRef.current = group_delete3ee3b;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete3ee3b]);
  
  //group props in ref to access latest props value
  const group_delete3ee3bPropsRef = useRef(group_delete3ee3bProps);
  useEffect(() => {
    group_delete3ee3bPropsRef.current = group_delete3ee3bProps;
  }, [group_delete3ee3bProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete3ee3b,
        codeStates['setgroup_delete'] = setgroup_delete3ee3b,
        codeStates['group_delete3ee3b'] = group_delete3ee3bProps,
        codeStates['setgroup_delete3ee3b'] = setgroup_delete3ee3bProps,
        codeStates['divider_top'] = divider_topc704d,
        codeStates['setdivider_top'] = setdivider_topc704d,
        codeStates['delete_heading_text'] = delete_heading_textdfa35,
        codeStates['setdelete_heading_text'] = setdelete_heading_textdfa35,
        codeStates['reviewnum'] = reviewnumb10f3,
        codeStates['setreviewnum'] = setreviewnumb10f3,
        codeStates['review_number'] = review_number5cbc0,
        codeStates['setreview_number'] = setreview_number5cbc0,
        codeStates['employee_name'] = employee_name564a0,
        codeStates['setemployee_name'] = setemployee_name564a0,
        codeStates['full_name'] = full_name68092,
        codeStates['setfull_name'] = setfull_name68092,
        codeStates['cyclename'] = cyclename50ebb,
        codeStates['setcyclename'] = setcyclename50ebb,
        codeStates['cycle_name'] = cycle_namecf2b5,
        codeStates['setcycle_name'] = setcycle_namecf2b5,
        codeStates['status'] = statusbb202,
        codeStates['setstatus'] = setstatusbb202,
        codeStates['review_status'] = review_status9db4f,
        codeStates['setreview_status'] = setreview_status9db4f,
        codeStates['confo_text'] = confo_textd6ad8,
        codeStates['setconfo_text'] = setconfo_textd6ad8,
        codeStates['divider'] = divider652b0,
        codeStates['setdivider'] = setdivider652b0,
        codeStates['review_id'] = review_id5d984,
        codeStates['setreview_id'] = setreview_id5d984,
        codeStates['cancel_button'] = cancel_button5aa68,
        codeStates['setcancel_button'] = setcancel_button5aa68,
        codeStates['ok_button'] = ok_button9b4bd,
        codeStates['setok_button'] = setok_button9b4bd,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {performancereviewdelete_v1, setperformancereviewdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete3ee3bRef.current};
      let parentRowSpan = 56;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "96494fb4b5c9ae186734b6f9b033ee3b",
        "239a08ec9b30ab1e565059eeafb5aa68"
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
      if (id === "cancel_button5aa68") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "239a08ec9b30ab1e565059eeafb5aa68") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button5aa68");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button5aa68?.trigger) return;
      if(cancel_button5aa68?.trigger){
      setcancel_button5aa68((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button5aa68?.trigger])

  useEffect(()=>{
    if(cancel_button5aa68?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button5aa68?.refresh])
  

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
        setgroup_delete3ee3b((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'performancereviewdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete3ee3b((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete3ee3b((prev: any) => ({ ...prev, cancel_button: false }));
    }
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

 if (cancel_button5aa68?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `46 / 52`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-gray-900 !rounded-md !bg-[#f4f5fa]"
          onClick={handleClick}
          disabled= {cancel_button5aa68?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineCancel"
          iconDisplay='Start with Icon'
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

