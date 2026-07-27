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

  const {group_delete617ef, setgroup_delete617ef}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617efProps, setgroup_delete617efProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_top168f7, setdivider_top168f7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text2560c, setdelete_heading_text2560c}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt17233, setattachment_id_txt17233}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id987ae, setattachment_id987ae}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textffd12, setdoc_group_textffd12}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3263c, setdoc_group3263c}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text76c54, setdoc_name_text76c54}= useContext(TotalContext) as TotalContextProps;
  const {doc_name2d223, setdoc_name2d223}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte87c8, settrs_created_by_texte87c8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3ee0e, settrs_created_by3ee0e}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbbf51, setconfo_textbbf51}= useContext(TotalContext) as TotalContextProps;
  const {divider77bc6, setdivider77bc6}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id3cec0, setleave_req_id3cec0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc4f32, setcancel_buttonc4f32}= useContext(TotalContext) as TotalContextProps;
  const {ok_button0c2f2, setok_button0c2f2}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete617efRef = useRef(group_delete617ef);
  useEffect(() => {
    group_delete617efRef.current = group_delete617ef;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete617ef]);
  
  //group props in ref to access latest props value
  const group_delete617efPropsRef = useRef(group_delete617efProps);
  useEffect(() => {
    group_delete617efPropsRef.current = group_delete617efProps;
  }, [group_delete617efProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete617ef,
        codeStates['setgroup_delete'] = setgroup_delete617ef,
        codeStates['group_delete617ef'] = group_delete617efProps,
        codeStates['setgroup_delete617ef'] = setgroup_delete617efProps,
        codeStates['divider_top'] = divider_top168f7,
        codeStates['setdivider_top'] = setdivider_top168f7,
        codeStates['delete_heading_text'] = delete_heading_text2560c,
        codeStates['setdelete_heading_text'] = setdelete_heading_text2560c,
        codeStates['attachment_id_txt'] = attachment_id_txt17233,
        codeStates['setattachment_id_txt'] = setattachment_id_txt17233,
        codeStates['attachment_id'] = attachment_id987ae,
        codeStates['setattachment_id'] = setattachment_id987ae,
        codeStates['doc_group_text'] = doc_group_textffd12,
        codeStates['setdoc_group_text'] = setdoc_group_textffd12,
        codeStates['doc_group'] = doc_group3263c,
        codeStates['setdoc_group'] = setdoc_group3263c,
        codeStates['doc_name_text'] = doc_name_text76c54,
        codeStates['setdoc_name_text'] = setdoc_name_text76c54,
        codeStates['doc_name'] = doc_name2d223,
        codeStates['setdoc_name'] = setdoc_name2d223,
        codeStates['trs_created_by_text'] = trs_created_by_texte87c8,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte87c8,
        codeStates['trs_created_by'] = trs_created_by3ee0e,
        codeStates['settrs_created_by'] = settrs_created_by3ee0e,
        codeStates['confo_text'] = confo_textbbf51,
        codeStates['setconfo_text'] = setconfo_textbbf51,
        codeStates['divider'] = divider77bc6,
        codeStates['setdivider'] = setdivider77bc6,
        codeStates['leave_req_id'] = leave_req_id3cec0,
        codeStates['setleave_req_id'] = setleave_req_id3cec0,
        codeStates['cancel_button'] = cancel_buttonc4f32,
        codeStates['setcancel_button'] = setcancel_buttonc4f32,
        codeStates['ok_button'] = ok_button0c2f2,
        codeStates['setok_button'] = setok_button0c2f2,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {leavemanagedocdelete_v1, setleavemanagedocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete617efRef.current};
      let parentRowSpan = 55;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "3bf1bf0f4a4e01cabdd93ee0d51617ef",
        "72fbbc86d4a20714076d72854eac4f32"
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
      if (id === "cancel_buttonc4f32") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "72fbbc86d4a20714076d72854eac4f32") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonc4f32");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonc4f32?.trigger) return;
      if(cancel_buttonc4f32?.trigger){
      setcancel_buttonc4f32((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonc4f32?.trigger])

  useEffect(()=>{
    if(cancel_buttonc4f32?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonc4f32?.refresh])
  

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
        setgroup_delete617ef((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'leavemanagedocdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete617ef((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete617ef((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonc4f32?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `45 / 51`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-gray-900 !rounded-md !bg-[#f4f5fa]"
          onClick={handleClick}
          disabled= {cancel_buttonc4f32?.isDisabled ? true : false}
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

