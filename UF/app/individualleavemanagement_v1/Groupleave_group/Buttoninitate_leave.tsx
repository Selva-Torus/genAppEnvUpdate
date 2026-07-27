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
import PageApplyleavepage2 from '@/app/applyleave_v1/applyleave_v1page';
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
 

const Buttoninitate_leave = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;
  const {req_textd9942, setreq_textd9942}= useContext(TotalContext) as TotalContextProps;
  const {initate_leavea7f9a, setinitate_leavea7f9a}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  const {applyleave_v1Props, setapplyleave_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const leave_group1d83dRef = useRef(leave_group1d83d);
  useEffect(() => {
    leave_group1d83dRef.current = leave_group1d83d;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [leave_group1d83d]);
  
  //group props in ref to access latest props value
  const leave_group1d83dPropsRef = useRef(leave_group1d83dProps);
  useEffect(() => {
    leave_group1d83dPropsRef.current = leave_group1d83dProps;
  }, [leave_group1d83dProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
        codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
        codeStates['total_employees_group'] = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['total_employees_group69415'] = total_employees_group69415Props,
        codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
        codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
        codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
        codeStates['onboarding_group'] = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
        codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
        codeStates['chart_group'] = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
        codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
        codeStates['leave_group'] = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_group1d83d'] = leave_group1d83dProps,
        codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
        codeStates['req_text'] = req_textd9942,
        codeStates['setreq_text'] = setreq_textd9942,
        codeStates['initate_leave'] = initate_leavea7f9a,
        codeStates['setinitate_leave'] = setinitate_leavea7f9a,
        codeStates['leave_req_table'] = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
        codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
        codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
        codeStates['applyleave_v1'] = applyleave_v1Props,
        codeStates['setapplyleave_v1'] = setapplyleave_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {individualleavemanagement_v1, setindividualleavemanagement_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...leave_group1d83dRef.current};
      let parentRowSpan = 103;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "b1e51b5d14b52b22d77404f2e971d83d",
        "6040c8d025174e99aa56fcc4342a7f9a"
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
      if (id === "initate_leavea7f9a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "6040c8d025174e99aa56fcc4342a7f9a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "initate_leavea7f9a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!initate_leavea7f9a?.trigger) return;
      if(initate_leavea7f9a?.trigger){
      setinitate_leavea7f9a((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[initate_leavea7f9a?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(initate_leavea7f9a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[initate_leavea7f9a?.refresh])
  

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
        setleave_group1d83d((prev: any) => ({ ...prev, initate_leave: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...hrm_dashboard_groupc9b72,...total_employees_group69415,...leave_requests_groupb9aaf,...onboarding_group4ab1e,...chart_groupdd9ff,...leave_group1d83d});
    setapplyleave_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setleave_group1d83d((prev: any) => ({ ...prev, initate_leave: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setleave_group1d83d((prev: any) => ({ ...prev, initate_leave: false }));
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

 if (initate_leavea7f9a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageApplyleavepage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="Apply Leave"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "applyleave"
        className='w-[70%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageApplyleavepage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {initate_leavea7f9a?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Apply Leave")}
        </Button>}
      </div>
    
  )
}

export default Buttoninitate_leave

