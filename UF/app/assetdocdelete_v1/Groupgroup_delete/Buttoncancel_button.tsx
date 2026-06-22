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

  const {group_delete10eb3, setgroup_delete10eb3}= useContext(TotalContext) as TotalContextProps;
  const {group_delete10eb3Props, setgroup_delete10eb3Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc80ba, setdelete_heading_textc80ba}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt02e0f, setattachment_id_txt02e0f}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id4eeac, setattachment_id4eeac}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_texte3945, setdoc_group_texte3945}= useContext(TotalContext) as TotalContextProps;
  const {doc_group82055, setdoc_group82055}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text6a957, setdoc_name_text6a957}= useContext(TotalContext) as TotalContextProps;
  const {doc_name1f607, setdoc_name1f607}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text29a4f, settrs_created_by_text29a4f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byad133, settrs_created_byad133}= useContext(TotalContext) as TotalContextProps;
  const {confo_text29a5c, setconfo_text29a5c}= useContext(TotalContext) as TotalContextProps;
  const {asset_idbf0b0, setasset_idbf0b0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button753bf, setcancel_button753bf}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttone6d7f, setok_buttone6d7f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete10eb3Ref = useRef(group_delete10eb3);
  useEffect(() => {
    group_delete10eb3Ref.current = group_delete10eb3;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete10eb3]);
  
  //group props in ref to access latest props value
  const group_delete10eb3PropsRef = useRef(group_delete10eb3Props);
  useEffect(() => {
    group_delete10eb3PropsRef.current = group_delete10eb3Props;
  }, [group_delete10eb3Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete10eb3,
        codeStates['setgroup_delete'] = setgroup_delete10eb3,
        codeStates['group_delete10eb3'] = group_delete10eb3Props,
        codeStates['setgroup_delete10eb3'] = setgroup_delete10eb3Props,
        codeStates['delete_heading_text'] = delete_heading_textc80ba,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc80ba,
        codeStates['attachment_id_txt'] = attachment_id_txt02e0f,
        codeStates['setattachment_id_txt'] = setattachment_id_txt02e0f,
        codeStates['attachment_id'] = attachment_id4eeac,
        codeStates['setattachment_id'] = setattachment_id4eeac,
        codeStates['doc_group_text'] = doc_group_texte3945,
        codeStates['setdoc_group_text'] = setdoc_group_texte3945,
        codeStates['doc_group'] = doc_group82055,
        codeStates['setdoc_group'] = setdoc_group82055,
        codeStates['doc_name_text'] = doc_name_text6a957,
        codeStates['setdoc_name_text'] = setdoc_name_text6a957,
        codeStates['doc_name'] = doc_name1f607,
        codeStates['setdoc_name'] = setdoc_name1f607,
        codeStates['trs_created_by_text'] = trs_created_by_text29a4f,
        codeStates['settrs_created_by_text'] = settrs_created_by_text29a4f,
        codeStates['trs_created_by'] = trs_created_byad133,
        codeStates['settrs_created_by'] = settrs_created_byad133,
        codeStates['confo_text'] = confo_text29a5c,
        codeStates['setconfo_text'] = setconfo_text29a5c,
        codeStates['asset_id'] = asset_idbf0b0,
        codeStates['setasset_id'] = setasset_idbf0b0,
        codeStates['cancel_button'] = cancel_button753bf,
        codeStates['setcancel_button'] = setcancel_button753bf,
        codeStates['ok_button'] = ok_buttone6d7f,
        codeStates['setok_button'] = setok_buttone6d7f,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assetdocdelete_v1, setassetdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete10eb3Ref.current};
      let parentRowSpan = 47;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "64ffca7df7aa52a114926f0c91610eb3",
        "eb298f0ab1457d08ca64bd3478b753bf"
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
      if (id === "cancel_button753bf") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "eb298f0ab1457d08ca64bd3478b753bf") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button753bf");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button753bf?.trigger) return;
      if(cancel_button753bf?.trigger){
      setcancel_button753bf((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button753bf?.trigger])

  useEffect(()=>{
    if(cancel_button753bf?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button753bf?.refresh])

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
        setgroup_delete10eb3((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'assetdocdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete10eb3((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete10eb3((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button753bf?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `36 / 43`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button753bf?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

