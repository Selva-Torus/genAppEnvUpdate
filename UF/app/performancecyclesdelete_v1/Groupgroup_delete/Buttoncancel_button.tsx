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

  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textfe4b7, setdelete_heading_textfe4b7}= useContext(TotalContext) as TotalContextProps;
  const {divider_s18ff5, setdivider_s18ff5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code_textea00f, setcycle_code_textea00f}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code5f073, setcycle_code5f073}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name_text7ecc5, setcycle_name_text7ecc5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name6a018, setcycle_name6a018}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type_text57344, setcycle_type_text57344}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type89f52, setcycle_type89f52}= useContext(TotalContext) as TotalContextProps;
  const {confo_text4c8be, setconfo_text4c8be}= useContext(TotalContext) as TotalContextProps;
  const {divider477db, setdivider477db}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonb2f7a, setcancel_buttonb2f7a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button24d12, setok_button24d12}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id8c16d, setcycle_id8c16d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_deletebe86eRef = useRef(group_deletebe86e);
  useEffect(() => {
    group_deletebe86eRef.current = group_deletebe86e;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_deletebe86e]);
  
  //group props in ref to access latest props value
  const group_deletebe86ePropsRef = useRef(group_deletebe86eProps);
  useEffect(() => {
    group_deletebe86ePropsRef.current = group_deletebe86eProps;
  }, [group_deletebe86eProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_deletebe86e,
        codeStates['setgroup_delete'] = setgroup_deletebe86e,
        codeStates['group_deletebe86e'] = group_deletebe86eProps,
        codeStates['setgroup_deletebe86e'] = setgroup_deletebe86eProps,
        codeStates['delete_heading_text'] = delete_heading_textfe4b7,
        codeStates['setdelete_heading_text'] = setdelete_heading_textfe4b7,
        codeStates['divider_s'] = divider_s18ff5,
        codeStates['setdivider_s'] = setdivider_s18ff5,
        codeStates['cycle_code_text'] = cycle_code_textea00f,
        codeStates['setcycle_code_text'] = setcycle_code_textea00f,
        codeStates['cycle_code'] = cycle_code5f073,
        codeStates['setcycle_code'] = setcycle_code5f073,
        codeStates['cycle_name_text'] = cycle_name_text7ecc5,
        codeStates['setcycle_name_text'] = setcycle_name_text7ecc5,
        codeStates['cycle_name'] = cycle_name6a018,
        codeStates['setcycle_name'] = setcycle_name6a018,
        codeStates['cycle_type_text'] = cycle_type_text57344,
        codeStates['setcycle_type_text'] = setcycle_type_text57344,
        codeStates['cycle_type'] = cycle_type89f52,
        codeStates['setcycle_type'] = setcycle_type89f52,
        codeStates['confo_text'] = confo_text4c8be,
        codeStates['setconfo_text'] = setconfo_text4c8be,
        codeStates['divider'] = divider477db,
        codeStates['setdivider'] = setdivider477db,
        codeStates['cancel_button'] = cancel_buttonb2f7a,
        codeStates['setcancel_button'] = setcancel_buttonb2f7a,
        codeStates['ok_button'] = ok_button24d12,
        codeStates['setok_button'] = setok_button24d12,
        codeStates['cycle_id'] = cycle_id8c16d,
        codeStates['setcycle_id'] = setcycle_id8c16d,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {performancecyclesdelete_v1, setperformancecyclesdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_deletebe86eRef.current};
      let parentRowSpan = 51;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "42a94e2f764887a1ec7c9ac5dbbbe86e",
        "49d72f72e5768a048d107fab5c0b2f7a"
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
      if (id === "cancel_buttonb2f7a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "49d72f72e5768a048d107fab5c0b2f7a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonb2f7a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonb2f7a?.trigger) return;
      if(cancel_buttonb2f7a?.trigger){
      setcancel_buttonb2f7a((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonb2f7a?.trigger])

  useEffect(()=>{
    if(cancel_buttonb2f7a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonb2f7a?.refresh])
  

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
        setgroup_deletebe86e((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'performancecyclesdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_deletebe86e((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_deletebe86e((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonb2f7a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `38 / 44`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#F4F5FA] hover:!bg-[#E5E7EB] !text-[#374151] !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined'
          disabled= {cancel_buttonb2f7a?.isDisabled ? true : false}
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

