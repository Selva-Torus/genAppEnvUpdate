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

  const {group_delete04302, setgroup_delete04302}= useContext(TotalContext) as TotalContextProps;
  const {group_delete04302Props, setgroup_delete04302Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text813d1, setdelete_heading_text813d1}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta2aee, setattachment_id_txta2aee}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id23a23, setattachment_id23a23}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text1a134, setdoc_group_text1a134}= useContext(TotalContext) as TotalContextProps;
  const {doc_group89f93, setdoc_group89f93}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_texted263, setdoc_name_texted263}= useContext(TotalContext) as TotalContextProps;
  const {doc_name36a98, setdoc_name36a98}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6c3e, settrs_created_by_textb6c3e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1d9cc, settrs_created_by1d9cc}= useContext(TotalContext) as TotalContextProps;
  const {confo_text86039, setconfo_text86039}= useContext(TotalContext) as TotalContextProps;
  const {check_ide9e25, setcheck_ide9e25}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3bd3f, setcancel_button3bd3f}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonba1e7, setok_buttonba1e7}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete04302Ref = useRef(group_delete04302);
  useEffect(() => {
    group_delete04302Ref.current = group_delete04302;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete04302]);
  
  //group props in ref to access latest props value
  const group_delete04302PropsRef = useRef(group_delete04302Props);
  useEffect(() => {
    group_delete04302PropsRef.current = group_delete04302Props;
  }, [group_delete04302Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete04302,
        codeStates['setgroup_delete'] = setgroup_delete04302,
        codeStates['group_delete04302'] = group_delete04302Props,
        codeStates['setgroup_delete04302'] = setgroup_delete04302Props,
        codeStates['delete_heading_text'] = delete_heading_text813d1,
        codeStates['setdelete_heading_text'] = setdelete_heading_text813d1,
        codeStates['attachment_id_txt'] = attachment_id_txta2aee,
        codeStates['setattachment_id_txt'] = setattachment_id_txta2aee,
        codeStates['attachment_id'] = attachment_id23a23,
        codeStates['setattachment_id'] = setattachment_id23a23,
        codeStates['doc_group_text'] = doc_group_text1a134,
        codeStates['setdoc_group_text'] = setdoc_group_text1a134,
        codeStates['doc_group'] = doc_group89f93,
        codeStates['setdoc_group'] = setdoc_group89f93,
        codeStates['doc_name_text'] = doc_name_texted263,
        codeStates['setdoc_name_text'] = setdoc_name_texted263,
        codeStates['doc_name'] = doc_name36a98,
        codeStates['setdoc_name'] = setdoc_name36a98,
        codeStates['trs_created_by_text'] = trs_created_by_textb6c3e,
        codeStates['settrs_created_by_text'] = settrs_created_by_textb6c3e,
        codeStates['trs_created_by'] = trs_created_by1d9cc,
        codeStates['settrs_created_by'] = settrs_created_by1d9cc,
        codeStates['confo_text'] = confo_text86039,
        codeStates['setconfo_text'] = setconfo_text86039,
        codeStates['check_id'] = check_ide9e25,
        codeStates['setcheck_id'] = setcheck_ide9e25,
        codeStates['cancel_button'] = cancel_button3bd3f,
        codeStates['setcancel_button'] = setcancel_button3bd3f,
        codeStates['ok_button'] = ok_buttonba1e7,
        codeStates['setok_button'] = setok_buttonba1e7,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {backgroundcheckdocdelete_v1, setbackgroundcheckdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete04302Ref.current};
      let parentRowSpan = 47;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1c41ce322e1e7891f96d939d82f04302",
        "feb3c1da78f6d04b15e67a3c9003bd3f"
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
      if (id === "cancel_button3bd3f") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "feb3c1da78f6d04b15e67a3c9003bd3f") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button3bd3f");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button3bd3f?.trigger) return;
      if(cancel_button3bd3f?.trigger){
      setcancel_button3bd3f((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button3bd3f?.trigger])

  useEffect(()=>{
    if(cancel_button3bd3f?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button3bd3f?.refresh])
  

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
        setgroup_delete04302((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'backgroundcheckdocdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete04302((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete04302((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button3bd3f?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `36 / 43`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-white !font-bold !bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button3bd3f?.isDisabled ? true : false}
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

