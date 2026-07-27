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

  const {group_deletea1de0, setgroup_deletea1de0}= useContext(TotalContext) as TotalContextProps;
  const {group_deletea1de0Props, setgroup_deletea1de0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text14d64, setdelete_heading_text14d64}= useContext(TotalContext) as TotalContextProps;
  const {grade_code_textff14c, setgrade_code_textff14c}= useContext(TotalContext) as TotalContextProps;
  const {grade_code812e5, setgrade_code812e5}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_textea710, setgrade_name_textea710}= useContext(TotalContext) as TotalContextProps;
  const {grade_nameaa0a4, setgrade_nameaa0a4}= useContext(TotalContext) as TotalContextProps;
  const {grade_level_text85021, setgrade_level_text85021}= useContext(TotalContext) as TotalContextProps;
  const {grade_level40e36, setgrade_level40e36}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_text80689, setsalary_range_text80689}= useContext(TotalContext) as TotalContextProps;
  const {salary_range4d41c, setsalary_range4d41c}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle_text2841d, setappraisal_cycle_text2841d}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle961f2, setappraisal_cycle961f2}= useContext(TotalContext) as TotalContextProps;
  const {confo_texta7470, setconfo_texta7470}= useContext(TotalContext) as TotalContextProps;
  const {grade_id65c54, setgrade_id65c54}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0a3db, setcancel_button0a3db}= useContext(TotalContext) as TotalContextProps;
  const {ok_button504a2, setok_button504a2}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_deletea1de0Ref = useRef(group_deletea1de0);
  useEffect(() => {
    group_deletea1de0Ref.current = group_deletea1de0;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_deletea1de0]);
  
  //group props in ref to access latest props value
  const group_deletea1de0PropsRef = useRef(group_deletea1de0Props);
  useEffect(() => {
    group_deletea1de0PropsRef.current = group_deletea1de0Props;
  }, [group_deletea1de0Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_deletea1de0,
        codeStates['setgroup_delete'] = setgroup_deletea1de0,
        codeStates['group_deletea1de0'] = group_deletea1de0Props,
        codeStates['setgroup_deletea1de0'] = setgroup_deletea1de0Props,
        codeStates['delete_heading_text'] = delete_heading_text14d64,
        codeStates['setdelete_heading_text'] = setdelete_heading_text14d64,
        codeStates['grade_code_text'] = grade_code_textff14c,
        codeStates['setgrade_code_text'] = setgrade_code_textff14c,
        codeStates['grade_code'] = grade_code812e5,
        codeStates['setgrade_code'] = setgrade_code812e5,
        codeStates['grade_name_text'] = grade_name_textea710,
        codeStates['setgrade_name_text'] = setgrade_name_textea710,
        codeStates['grade_name'] = grade_nameaa0a4,
        codeStates['setgrade_name'] = setgrade_nameaa0a4,
        codeStates['grade_level_text'] = grade_level_text85021,
        codeStates['setgrade_level_text'] = setgrade_level_text85021,
        codeStates['grade_level'] = grade_level40e36,
        codeStates['setgrade_level'] = setgrade_level40e36,
        codeStates['salary_range_text'] = salary_range_text80689,
        codeStates['setsalary_range_text'] = setsalary_range_text80689,
        codeStates['salary_range'] = salary_range4d41c,
        codeStates['setsalary_range'] = setsalary_range4d41c,
        codeStates['appraisal_cycle_text'] = appraisal_cycle_text2841d,
        codeStates['setappraisal_cycle_text'] = setappraisal_cycle_text2841d,
        codeStates['appraisal_cycle'] = appraisal_cycle961f2,
        codeStates['setappraisal_cycle'] = setappraisal_cycle961f2,
        codeStates['confo_text'] = confo_texta7470,
        codeStates['setconfo_text'] = setconfo_texta7470,
        codeStates['grade_id'] = grade_id65c54,
        codeStates['setgrade_id'] = setgrade_id65c54,
        codeStates['cancel_button'] = cancel_button0a3db,
        codeStates['setcancel_button'] = setcancel_button0a3db,
        codeStates['ok_button'] = ok_button504a2,
        codeStates['setok_button'] = setok_button504a2,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employeejobgradedelete_v1, setemployeejobgradedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_deletea1de0Ref.current};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "25d78f163c6cf2b29df63021f43a1de0",
        "44a93280437e1760147c779c86f0a3db"
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
      if (id === "cancel_button0a3db") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "44a93280437e1760147c779c86f0a3db") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button0a3db");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button0a3db?.trigger) return;
      if(cancel_button0a3db?.trigger){
      setcancel_button0a3db((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button0a3db?.trigger])

  useEffect(()=>{
    if(cancel_button0a3db?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button0a3db?.refresh])
  

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
        setgroup_deletea1de0((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'employeejobgradedelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_deletea1de0((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_deletea1de0((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button0a3db?.isHidden) {
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
          disabled= {cancel_button0a3db?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

