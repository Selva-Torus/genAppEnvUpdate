

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdownrun_status_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {inegration_run_group5a7be, setinegration_run_group5a7be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_group5a7beProps, setinegration_run_group5a7beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {timing_status54aec, settiming_status54aec}= useContext(TotalContext) as TotalContextProps;
  const {started_ond88e8, setstarted_ond88e8}= useContext(TotalContext) as TotalContextProps;
  const {ended_on9cf0a, setended_on9cf0a}= useContext(TotalContext) as TotalContextProps;
  const {run_status_codef6fc6, setrun_status_codef6fc6}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'SUCCESS',
    'FAILED',
  ];

  useEffect(() => {
  if(timeandstatus_group9ec90?.run_status_code=="" || timeandstatus_group9ec90?.run_status_code==undefined || timeandstatus_group9ec90?.run_status_code==null ){
    setSelectedItem("");
  }
  },[timeandstatus_group9ec90?.run_status_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "acb1b9ef22344e2899907659f179ec90",
        "e4df19fade884ff6a40ee247e5bf6fc6"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
      if(orchestrationData?.data?.rule?.nodes?.length>0){
        setRuleCode(orchestrationData?.data?.rule)        
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[run_status_codef6fc6?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      let staticValueProps : any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "SUCCESS",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "SUCCESS",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "FAILED",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "FAILED",
      "enabled": true
    }
  }
];
      for (let i = 0; i < staticValueProps.length; i++) {
        if(staticValueProps[i]?.value?.name === "value"){ 
          if(staticValueProps[i]?.value?.value === value){
            staticTextValue = staticValueProps[i].text.value;
          }
        }
      }
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      settimeandstatus_group9ec90((prev: any) => ({ ...prev, run_status_code: staticTextValue, run_status_codef6fc6: value}))
         setIsRequredData(false)
    } else {
       settimeandstatus_group9ec90((prev: any) => ({ ...prev, run_status_code: '', run_status_codef6fc6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addIntegrationRun_v1:{...pre?.addIntegrationRun_v1,run_status_code:undefined}}));
   
    // static
    selected.current={
      run_status_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['inegration_run_group'] = inegration_run_group5a7be,
        codeStates['setinegration_run_group'] = setinegration_run_group5a7be,
        codeStates['inegration_run_group5a7be'] = inegration_run_group5a7beProps,
        codeStates['setinegration_run_group5a7be'] = setinegration_run_group5a7beProps,
        codeStates['run_information_group'] = run_information_group519a1,
        codeStates['setrun_information_group'] = setrun_information_group519a1,
        codeStates['run_information_group519a1'] = run_information_group519a1Props,
        codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
        codeStates['timing_status'] = timing_status54aec,
        codeStates['settiming_status'] = settiming_status54aec,
        codeStates['started_on'] = started_ond88e8,
        codeStates['setstarted_on'] = setstarted_ond88e8,
        codeStates['ended_on'] = ended_on9cf0a,
        codeStates['setended_on'] = setended_on9cf0a,
        codeStates['run_status_code'] = run_status_codef6fc6,
        codeStates['setrun_status_code'] = setrun_status_codef6fc6,
        codeStates['record_group'] = record_groupa6d32,
        codeStates['setrecord_group'] = setrecord_groupa6d32,
        codeStates['record_groupa6d32'] = record_groupa6d32Props,
        codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
        codeStates['error_group'] = error_group193e2,
        codeStates['seterror_group'] = seterror_group193e2,
        codeStates['error_group193e2'] = error_group193e2Props,
        codeStates['seterror_group193e2'] = seterror_group193e2Props,
        codeStates['dynamicactions'] = dynamicactions669ce,
        codeStates['setdynamicactions'] = setdynamicactions669ce,
        codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
        codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const timeandstatus_group9ec90Ref = useRef<any>(timeandstatus_group9ec90);
  useEffect(() => { timeandstatus_group9ec90Ref.current = timeandstatus_group9ec90; }, [timeandstatus_group9ec90]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "e4df19fade884ff6a40ee247e5bf6fc6") {
        handleClick(timeandstatus_group9ec90Ref?.current?.run_status_codef6fc6?timeandstatus_group9ec90Ref?.current?.run_status_codef6fc6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e4df19fade884ff6a40ee247e5bf6fc6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settimeandstatus_group9ec90((pre:any)=>({...pre,run_status_code:""}))
    else
      setInitialCount(1)
  },[run_status_codef6fc6?.refresh])
  

  if (run_status_codef6fc6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `35 / 47`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {run_status_codef6fc6?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Run Status Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            timeandstatus_group9ec90?.run_status_codef6fc6 ? [timeandstatus_group9ec90?.run_status_codef6fc6] :
                timeandstatus_group9ec90?.run_status_code ? timeandstatus_group9ec90?.run_status_code : []
            }
        onChange={handleClick} 
        validationState={validate?.addIntegrationRun_v1?.run_status_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownrun_status_code;
