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

  const {group_deletebeb3a, setgroup_deletebeb3a}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebeb3aProps, setgroup_deletebeb3aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text04bf4, setdelete_heading_text04bf4}= useContext(TotalContext) as TotalContextProps;
  const {position_code_text4b960, setposition_code_text4b960}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4c8a, setposition_codea4c8a}= useContext(TotalContext) as TotalContextProps;
  const {position_title_textd9ad1, setposition_title_textd9ad1}= useContext(TotalContext) as TotalContextProps;
  const {position_titleee3e1, setposition_titleee3e1}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_text9d72d, setgrade_name_text9d72d}= useContext(TotalContext) as TotalContextProps;
  const {grade_name2249c, setgrade_name2249c}= useContext(TotalContext) as TotalContextProps;
  const {job_level_text55a41, setjob_level_text55a41}= useContext(TotalContext) as TotalContextProps;
  const {job_level29550, setjob_level29550}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status_text733a2, setvacancy_status_text733a2}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status0fe05, setvacancy_status0fe05}= useContext(TotalContext) as TotalContextProps;
  const {confo_text9a251, setconfo_text9a251}= useContext(TotalContext) as TotalContextProps;
  const {position_idebcb1, setposition_idebcb1}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonedd0a, setcancel_buttonedd0a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button1f631, setok_button1f631}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_deletebeb3aRef = useRef(group_deletebeb3a);
  useEffect(() => {
    group_deletebeb3aRef.current = group_deletebeb3a;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_deletebeb3a]);
  
  //group props in ref to access latest props value
  const group_deletebeb3aPropsRef = useRef(group_deletebeb3aProps);
  useEffect(() => {
    group_deletebeb3aPropsRef.current = group_deletebeb3aProps;
  }, [group_deletebeb3aProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_deletebeb3a,
        codeStates['setgroup_delete'] = setgroup_deletebeb3a,
        codeStates['group_deletebeb3a'] = group_deletebeb3aProps,
        codeStates['setgroup_deletebeb3a'] = setgroup_deletebeb3aProps,
        codeStates['delete_heading_text'] = delete_heading_text04bf4,
        codeStates['setdelete_heading_text'] = setdelete_heading_text04bf4,
        codeStates['position_code_text'] = position_code_text4b960,
        codeStates['setposition_code_text'] = setposition_code_text4b960,
        codeStates['position_code'] = position_codea4c8a,
        codeStates['setposition_code'] = setposition_codea4c8a,
        codeStates['position_title_text'] = position_title_textd9ad1,
        codeStates['setposition_title_text'] = setposition_title_textd9ad1,
        codeStates['position_title'] = position_titleee3e1,
        codeStates['setposition_title'] = setposition_titleee3e1,
        codeStates['grade_name_text'] = grade_name_text9d72d,
        codeStates['setgrade_name_text'] = setgrade_name_text9d72d,
        codeStates['grade_name'] = grade_name2249c,
        codeStates['setgrade_name'] = setgrade_name2249c,
        codeStates['job_level_text'] = job_level_text55a41,
        codeStates['setjob_level_text'] = setjob_level_text55a41,
        codeStates['job_level'] = job_level29550,
        codeStates['setjob_level'] = setjob_level29550,
        codeStates['vacancy_status_text'] = vacancy_status_text733a2,
        codeStates['setvacancy_status_text'] = setvacancy_status_text733a2,
        codeStates['vacancy_status'] = vacancy_status0fe05,
        codeStates['setvacancy_status'] = setvacancy_status0fe05,
        codeStates['confo_text'] = confo_text9a251,
        codeStates['setconfo_text'] = setconfo_text9a251,
        codeStates['position_id'] = position_idebcb1,
        codeStates['setposition_id'] = setposition_idebcb1,
        codeStates['cancel_button'] = cancel_buttonedd0a,
        codeStates['setcancel_button'] = setcancel_buttonedd0a,
        codeStates['ok_button'] = ok_button1f631,
        codeStates['setok_button'] = setok_button1f631,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employeejobpositiondelete_v1, setemployeejobpositiondelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_deletebeb3aRef.current};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "5822fa74197f0eac3aa5917ea0cbeb3a",
        "27a0b6dccaa43e9ff5097364fb9edd0a"
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
      if (id === "cancel_buttonedd0a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "27a0b6dccaa43e9ff5097364fb9edd0a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonedd0a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonedd0a?.trigger) return;
      if(cancel_buttonedd0a?.trigger){
      setcancel_buttonedd0a((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonedd0a?.trigger])

  useEffect(()=>{
    if(cancel_buttonedd0a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonedd0a?.refresh])
  

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
        setgroup_deletebeb3a((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'employeejobpositiondelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_deletebeb3a((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_deletebeb3a((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonedd0a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `51 / 58`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_buttonedd0a?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

