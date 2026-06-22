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

  const {group_delete3f77f, setgroup_delete3f77f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3f77fProps, setgroup_delete3f77fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text64ac6, setdelete_heading_text64ac6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text99dc6, setasset_name_text99dc6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name9f8b1, setasset_name9f8b1}= useContext(TotalContext) as TotalContextProps;
  const {maint_type_textf805a, setmaint_type_textf805a}= useContext(TotalContext) as TotalContextProps;
  const {maint_typefc524, setmaint_typefc524}= useContext(TotalContext) as TotalContextProps;
  const {priority_text5afe4, setpriority_text5afe4}= useContext(TotalContext) as TotalContextProps;
  const {priority1b975, setpriority1b975}= useContext(TotalContext) as TotalContextProps;
  const {schedule_date_textc8d71, setschedule_date_textc8d71}= useContext(TotalContext) as TotalContextProps;
  const {schedule_dateef711, setschedule_dateef711}= useContext(TotalContext) as TotalContextProps;
  const {performed_by_textb5193, setperformed_by_textb5193}= useContext(TotalContext) as TotalContextProps;
  const {performed_byc179b, setperformed_byc179b}= useContext(TotalContext) as TotalContextProps;
  const {confo_text7649e, setconfo_text7649e}= useContext(TotalContext) as TotalContextProps;
  const {maint_id927de, setmaint_id927de}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button36974, setcancel_button36974}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttond1793, setok_buttond1793}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete3f77fRef = useRef(group_delete3f77f);
  useEffect(() => {
    group_delete3f77fRef.current = group_delete3f77f;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete3f77f]);
  
  //group props in ref to access latest props value
  const group_delete3f77fPropsRef = useRef(group_delete3f77fProps);
  useEffect(() => {
    group_delete3f77fPropsRef.current = group_delete3f77fProps;
  }, [group_delete3f77fProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete3f77f,
        codeStates['setgroup_delete'] = setgroup_delete3f77f,
        codeStates['group_delete3f77f'] = group_delete3f77fProps,
        codeStates['setgroup_delete3f77f'] = setgroup_delete3f77fProps,
        codeStates['delete_heading_text'] = delete_heading_text64ac6,
        codeStates['setdelete_heading_text'] = setdelete_heading_text64ac6,
        codeStates['asset_name_text'] = asset_name_text99dc6,
        codeStates['setasset_name_text'] = setasset_name_text99dc6,
        codeStates['asset_name'] = asset_name9f8b1,
        codeStates['setasset_name'] = setasset_name9f8b1,
        codeStates['maint_type_text'] = maint_type_textf805a,
        codeStates['setmaint_type_text'] = setmaint_type_textf805a,
        codeStates['maint_type'] = maint_typefc524,
        codeStates['setmaint_type'] = setmaint_typefc524,
        codeStates['priority_text'] = priority_text5afe4,
        codeStates['setpriority_text'] = setpriority_text5afe4,
        codeStates['priority'] = priority1b975,
        codeStates['setpriority'] = setpriority1b975,
        codeStates['schedule_date_text'] = schedule_date_textc8d71,
        codeStates['setschedule_date_text'] = setschedule_date_textc8d71,
        codeStates['schedule_date'] = schedule_dateef711,
        codeStates['setschedule_date'] = setschedule_dateef711,
        codeStates['performed_by_text'] = performed_by_textb5193,
        codeStates['setperformed_by_text'] = setperformed_by_textb5193,
        codeStates['performed_by'] = performed_byc179b,
        codeStates['setperformed_by'] = setperformed_byc179b,
        codeStates['confo_text'] = confo_text7649e,
        codeStates['setconfo_text'] = setconfo_text7649e,
        codeStates['maint_id'] = maint_id927de,
        codeStates['setmaint_id'] = setmaint_id927de,
        codeStates['cancel_button'] = cancel_button36974,
        codeStates['setcancel_button'] = setcancel_button36974,
        codeStates['ok_button'] = ok_buttond1793,
        codeStates['setok_button'] = setok_buttond1793,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {maintenancedelete_v1, setmaintenancedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete3f77fRef.current};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f5e5ab6658f380cb72c7f8b9a483f77f",
        "cdc203ae0300e2bf238d7fd4e7536974"
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
      if (id === "cancel_button36974") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "cdc203ae0300e2bf238d7fd4e7536974") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button36974");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button36974?.trigger) return;
      if(cancel_button36974?.trigger){
      setcancel_button36974((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button36974?.trigger])

  useEffect(()=>{
    if(cancel_button36974?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button36974?.refresh])

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
        setgroup_delete3f77f((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'maintenancedelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete3f77f((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete3f77f((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button36974?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `51 / 58`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button36974?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

