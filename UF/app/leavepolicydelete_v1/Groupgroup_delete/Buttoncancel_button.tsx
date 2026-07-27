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

  const {group_delete40e71, setgroup_delete40e71}= useContext(TotalContext) as TotalContextProps;
  const {group_delete40e71Props, setgroup_delete40e71Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb8510, setdivider_topb8510}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text43413, setdelete_heading_text43413}= useContext(TotalContext) as TotalContextProps;
  const {policy_code_textc4602, setpolicy_code_textc4602}= useContext(TotalContext) as TotalContextProps;
  const {policy_codeea843, setpolicy_codeea843}= useContext(TotalContext) as TotalContextProps;
  const {policy_nmf1837, setpolicy_nmf1837}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3b3f3, setpolicy_name3b3f3}= useContext(TotalContext) as TotalContextProps;
  const {leave_typ6b883, setleave_typ6b883}= useContext(TotalContext) as TotalContextProps;
  const {leave_type0879a, setleave_type0879a}= useContext(TotalContext) as TotalContextProps;
  const {confo_text43c73, setconfo_text43c73}= useContext(TotalContext) as TotalContextProps;
  const {divider8d9a8, setdivider8d9a8}= useContext(TotalContext) as TotalContextProps;
  const {policy_id80b01, setpolicy_id80b01}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc1acc, setcancel_buttonc1acc}= useContext(TotalContext) as TotalContextProps;
  const {ok_button4bf3f, setok_button4bf3f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete40e71Ref = useRef(group_delete40e71);
  useEffect(() => {
    group_delete40e71Ref.current = group_delete40e71;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete40e71]);
  
  //group props in ref to access latest props value
  const group_delete40e71PropsRef = useRef(group_delete40e71Props);
  useEffect(() => {
    group_delete40e71PropsRef.current = group_delete40e71Props;
  }, [group_delete40e71Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete40e71,
        codeStates['setgroup_delete'] = setgroup_delete40e71,
        codeStates['group_delete40e71'] = group_delete40e71Props,
        codeStates['setgroup_delete40e71'] = setgroup_delete40e71Props,
        codeStates['divider_top'] = divider_topb8510,
        codeStates['setdivider_top'] = setdivider_topb8510,
        codeStates['delete_heading_text'] = delete_heading_text43413,
        codeStates['setdelete_heading_text'] = setdelete_heading_text43413,
        codeStates['policy_code_text'] = policy_code_textc4602,
        codeStates['setpolicy_code_text'] = setpolicy_code_textc4602,
        codeStates['policy_code'] = policy_codeea843,
        codeStates['setpolicy_code'] = setpolicy_codeea843,
        codeStates['policy_nm'] = policy_nmf1837,
        codeStates['setpolicy_nm'] = setpolicy_nmf1837,
        codeStates['policy_name'] = policy_name3b3f3,
        codeStates['setpolicy_name'] = setpolicy_name3b3f3,
        codeStates['leave_typ'] = leave_typ6b883,
        codeStates['setleave_typ'] = setleave_typ6b883,
        codeStates['leave_type'] = leave_type0879a,
        codeStates['setleave_type'] = setleave_type0879a,
        codeStates['confo_text'] = confo_text43c73,
        codeStates['setconfo_text'] = setconfo_text43c73,
        codeStates['divider'] = divider8d9a8,
        codeStates['setdivider'] = setdivider8d9a8,
        codeStates['policy_id'] = policy_id80b01,
        codeStates['setpolicy_id'] = setpolicy_id80b01,
        codeStates['cancel_button'] = cancel_buttonc1acc,
        codeStates['setcancel_button'] = setcancel_buttonc1acc,
        codeStates['ok_button'] = ok_button4bf3f,
        codeStates['setok_button'] = setok_button4bf3f,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {leavepolicydelete_v1, setleavepolicydelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete40e71Ref.current};
      let parentRowSpan = 52;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "b2b3eea4cda0f957b654318d90d40e71",
        "2ea1c3750ba0bd88722bcac285fc1acc"
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
      if (id === "cancel_buttonc1acc") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "2ea1c3750ba0bd88722bcac285fc1acc") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonc1acc");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonc1acc?.trigger) return;
      if(cancel_buttonc1acc?.trigger){
      setcancel_buttonc1acc((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonc1acc?.trigger])

  useEffect(()=>{
    if(cancel_buttonc1acc?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonc1acc?.refresh])
  

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
        setgroup_delete40e71((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'leavepolicydelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete40e71((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete40e71((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonc1acc?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `41 / 47`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-gray-900 !rounded-md !bg-[#f4f5fa]"
          onClick={handleClick}
          disabled= {cancel_buttonc1acc?.isDisabled ? true : false}
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

