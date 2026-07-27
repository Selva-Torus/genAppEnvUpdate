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

  const {group_delete39e95, setgroup_delete39e95}= useContext(TotalContext) as TotalContextProps;
  const {group_delete39e95Props, setgroup_delete39e95Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_s2f4d7, setdivider_s2f4d7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text9fa17, setdelete_heading_text9fa17}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textfe1e3, setrequest_number_textfe1e3}= useContext(TotalContext) as TotalContextProps;
  const {request_numbera8283, setrequest_numbera8283}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text42c95, setfull_name_text42c95}= useContext(TotalContext) as TotalContextProps;
  const {full_name3103b, setfull_name3103b}= useContext(TotalContext) as TotalContextProps;
  const {system_name_text214d0, setsystem_name_text214d0}= useContext(TotalContext) as TotalContextProps;
  const {system_named477d, setsystem_named477d}= useContext(TotalContext) as TotalContextProps;
  const {access_role_text651e8, setaccess_role_text651e8}= useContext(TotalContext) as TotalContextProps;
  const {access_rolef3310, setaccess_rolef3310}= useContext(TotalContext) as TotalContextProps;
  const {confo_text6b398, setconfo_text6b398}= useContext(TotalContext) as TotalContextProps;
  const {divider2d5c2, setdivider2d5c2}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2b2a7, setaccess_req_id2b2a7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button00993, setcancel_button00993}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3840c, setok_button3840c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete39e95Ref = useRef(group_delete39e95);
  useEffect(() => {
    group_delete39e95Ref.current = group_delete39e95;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete39e95]);
  
  //group props in ref to access latest props value
  const group_delete39e95PropsRef = useRef(group_delete39e95Props);
  useEffect(() => {
    group_delete39e95PropsRef.current = group_delete39e95Props;
  }, [group_delete39e95Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete39e95,
        codeStates['setgroup_delete'] = setgroup_delete39e95,
        codeStates['group_delete39e95'] = group_delete39e95Props,
        codeStates['setgroup_delete39e95'] = setgroup_delete39e95Props,
        codeStates['divider_s'] = divider_s2f4d7,
        codeStates['setdivider_s'] = setdivider_s2f4d7,
        codeStates['delete_heading_text'] = delete_heading_text9fa17,
        codeStates['setdelete_heading_text'] = setdelete_heading_text9fa17,
        codeStates['request_number_text'] = request_number_textfe1e3,
        codeStates['setrequest_number_text'] = setrequest_number_textfe1e3,
        codeStates['request_number'] = request_numbera8283,
        codeStates['setrequest_number'] = setrequest_numbera8283,
        codeStates['full_name_text'] = full_name_text42c95,
        codeStates['setfull_name_text'] = setfull_name_text42c95,
        codeStates['full_name'] = full_name3103b,
        codeStates['setfull_name'] = setfull_name3103b,
        codeStates['system_name_text'] = system_name_text214d0,
        codeStates['setsystem_name_text'] = setsystem_name_text214d0,
        codeStates['system_name'] = system_named477d,
        codeStates['setsystem_name'] = setsystem_named477d,
        codeStates['access_role_text'] = access_role_text651e8,
        codeStates['setaccess_role_text'] = setaccess_role_text651e8,
        codeStates['access_role'] = access_rolef3310,
        codeStates['setaccess_role'] = setaccess_rolef3310,
        codeStates['confo_text'] = confo_text6b398,
        codeStates['setconfo_text'] = setconfo_text6b398,
        codeStates['divider'] = divider2d5c2,
        codeStates['setdivider'] = setdivider2d5c2,
        codeStates['access_req_id'] = access_req_id2b2a7,
        codeStates['setaccess_req_id'] = setaccess_req_id2b2a7,
        codeStates['cancel_button'] = cancel_button00993,
        codeStates['setcancel_button'] = setcancel_button00993,
        codeStates['ok_button'] = ok_button3840c,
        codeStates['setok_button'] = setok_button3840c,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {accessrequestdelete_v1, setaccessrequestdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete39e95Ref.current};
      let parentRowSpan = 59;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ca9cdea6f8a03f06fdff527167339e95",
        "d7bc0a552ba61afc9ebed91218900993"
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
      if (id === "cancel_button00993") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "d7bc0a552ba61afc9ebed91218900993") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button00993");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button00993?.trigger) return;
      if(cancel_button00993?.trigger){
      setcancel_button00993((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button00993?.trigger])

  useEffect(()=>{
    if(cancel_button00993?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button00993?.refresh])
  

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
        setgroup_delete39e95((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'accessrequestdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete39e95((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete39e95((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button00993?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `45 / 51`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button00993?.isDisabled ? true : false}
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

