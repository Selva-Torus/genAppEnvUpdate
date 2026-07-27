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

  const {group_deletee7496, setgroup_deletee7496}= useContext(TotalContext) as TotalContextProps;
  const {group_deletee7496Props, setgroup_deletee7496Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topff733, setdivider_topff733}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text54f32, setdelete_heading_text54f32}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt06ae9, setattachment_id_txt06ae9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ideb2da, setattachment_ideb2da}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textac80d, setdoc_group_textac80d}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupd3c6e, setdoc_groupd3c6e}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text550d7, setdoc_name_text550d7}= useContext(TotalContext) as TotalContextProps;
  const {doc_name42663, setdoc_name42663}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte814b, settrs_created_by_texte814b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfc11e, settrs_created_byfc11e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text8976f, setconfo_text8976f}= useContext(TotalContext) as TotalContextProps;
  const {divider004b8, setdivider004b8}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idf71e7, setaccess_req_idf71e7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonbc6e4, setcancel_buttonbc6e4}= useContext(TotalContext) as TotalContextProps;
  const {ok_button53062, setok_button53062}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_deletee7496Ref = useRef(group_deletee7496);
  useEffect(() => {
    group_deletee7496Ref.current = group_deletee7496;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_deletee7496]);
  
  //group props in ref to access latest props value
  const group_deletee7496PropsRef = useRef(group_deletee7496Props);
  useEffect(() => {
    group_deletee7496PropsRef.current = group_deletee7496Props;
  }, [group_deletee7496Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_deletee7496,
        codeStates['setgroup_delete'] = setgroup_deletee7496,
        codeStates['group_deletee7496'] = group_deletee7496Props,
        codeStates['setgroup_deletee7496'] = setgroup_deletee7496Props,
        codeStates['divider_top'] = divider_topff733,
        codeStates['setdivider_top'] = setdivider_topff733,
        codeStates['delete_heading_text'] = delete_heading_text54f32,
        codeStates['setdelete_heading_text'] = setdelete_heading_text54f32,
        codeStates['attachment_id_txt'] = attachment_id_txt06ae9,
        codeStates['setattachment_id_txt'] = setattachment_id_txt06ae9,
        codeStates['attachment_id'] = attachment_ideb2da,
        codeStates['setattachment_id'] = setattachment_ideb2da,
        codeStates['doc_group_text'] = doc_group_textac80d,
        codeStates['setdoc_group_text'] = setdoc_group_textac80d,
        codeStates['doc_group'] = doc_groupd3c6e,
        codeStates['setdoc_group'] = setdoc_groupd3c6e,
        codeStates['doc_name_text'] = doc_name_text550d7,
        codeStates['setdoc_name_text'] = setdoc_name_text550d7,
        codeStates['doc_name'] = doc_name42663,
        codeStates['setdoc_name'] = setdoc_name42663,
        codeStates['trs_created_by_text'] = trs_created_by_texte814b,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte814b,
        codeStates['trs_created_by'] = trs_created_byfc11e,
        codeStates['settrs_created_by'] = settrs_created_byfc11e,
        codeStates['confo_text'] = confo_text8976f,
        codeStates['setconfo_text'] = setconfo_text8976f,
        codeStates['divider'] = divider004b8,
        codeStates['setdivider'] = setdivider004b8,
        codeStates['access_req_id'] = access_req_idf71e7,
        codeStates['setaccess_req_id'] = setaccess_req_idf71e7,
        codeStates['cancel_button'] = cancel_buttonbc6e4,
        codeStates['setcancel_button'] = setcancel_buttonbc6e4,
        codeStates['ok_button'] = ok_button53062,
        codeStates['setok_button'] = setok_button53062,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {accessreqdocdelete_v1, setaccessreqdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_deletee7496Ref.current};
      let parentRowSpan = 55;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "58ae175d327ff504b15b255a09de7496",
        "61d684f931abddef8f8e10ffc5ebc6e4"
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
      if (id === "cancel_buttonbc6e4") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "61d684f931abddef8f8e10ffc5ebc6e4") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonbc6e4");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonbc6e4?.trigger) return;
      if(cancel_buttonbc6e4?.trigger){
      setcancel_buttonbc6e4((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonbc6e4?.trigger])

  useEffect(()=>{
    if(cancel_buttonbc6e4?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonbc6e4?.refresh])
  

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
        setgroup_deletee7496((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'accessreqdocdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_deletee7496((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_deletee7496((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonbc6e4?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `45 / 51`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-lg"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_buttonbc6e4?.isDisabled ? true : false}
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

