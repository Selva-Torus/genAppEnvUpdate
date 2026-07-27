'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageApplyleaveapprovalpage2 from '@/app/applyleaveapproval_v1/applyleaveapproval_v1page';
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
 

const Buttonview_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_group3fa8c, setoverall_group3fa8c}= useContext(TotalContext) as TotalContextProps;
  const {overall_group3fa8cProps, setoverall_group3fa8cProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908Props, settab_groupfe908Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233, setleave_request_table25233}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233Props, setleave_request_table25233Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cdProps, setemp_table_group0a9cdProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32bProps, setleave_req_tablesbb32bProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0bProps, setapproval_pendinge1c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id8fe41, setleave_req_id8fe41}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_numbera0793, setleave_request_numbera0793}= useContext(TotalContext) as TotalContextProps;
  const {full_name831de, setfull_name831de}= useContext(TotalContext) as TotalContextProps;
  const {start_dated19f6, setstart_dated19f6}= useContext(TotalContext) as TotalContextProps;
  const {end_datefce01, setend_datefce01}= useContext(TotalContext) as TotalContextProps;
  const {days_requestedaba8e, setdays_requestedaba8e}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_status66324, settrs_event_process_status66324}= useContext(TotalContext) as TotalContextProps;
  const {view_bt2dca3, setview_bt2dca3}= useContext(TotalContext) as TotalContextProps;
  const {applyleaveapproval_v1Props, setapplyleaveapproval_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178, setemp_avail_group11178}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178Props, setemp_avail_group11178Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23, setleave_balance_group98e23}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23Props, setleave_balance_group98e23Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1b, setapp_det_groupe2c1b}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1bProps, setapp_det_groupe2c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086e, setapprove_group4086e}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086eProps, setapprove_group4086eProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fd, setaudit_group087fd}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fdProps, setaudit_group087fdProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group3fa8c,
      codeStates['setoverall_group'] = setoverall_group3fa8c,
      codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
      codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
      codeStates['tab_group'] = tab_groupfe908,
      codeStates['settab_group'] = settab_groupfe908,
      codeStates['tab_groupfe908'] = tab_groupfe908Props,
      codeStates['settab_groupfe908'] = settab_groupfe908Props,
      codeStates['leave_request_table'] = leave_request_table25233,
      codeStates['setleave_request_table'] = setleave_request_table25233,
      codeStates['leave_request_table25233'] = leave_request_table25233Props,
      codeStates['setleave_request_table25233'] = setleave_request_table25233Props,
      codeStates['emp_table_group'] = emp_table_group0a9cd,
      codeStates['setemp_table_group'] = setemp_table_group0a9cd,
      codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
      codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
      codeStates['leave_req_tables'] = leave_req_tablesbb32b,
      codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
      codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
      codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
      codeStates['approval_pending'] = approval_pendinge1c0b,
      codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
      codeStates['approval_pendinge1c0b'] = approval_pendinge1c0bProps,
      codeStates['setapproval_pendinge1c0b'] = setapproval_pendinge1c0bProps,
      codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
      codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
      codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
      codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
      codeStates['approval_pending_table'] = approval_pending_tablee294f,
      codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
      codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
      codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,
      codeStates['leave_req_id'] = leave_req_id8fe41,
      codeStates['setleave_req_id'] = setleave_req_id8fe41,
      codeStates['leave_request_number'] = leave_request_numbera0793,
      codeStates['setleave_request_number'] = setleave_request_numbera0793,
      codeStates['full_name'] = full_name831de,
      codeStates['setfull_name'] = setfull_name831de,
      codeStates['start_date'] = start_dated19f6,
      codeStates['setstart_date'] = setstart_dated19f6,
      codeStates['end_date'] = end_datefce01,
      codeStates['setend_date'] = setend_datefce01,
      codeStates['days_requested'] = days_requestedaba8e,
      codeStates['setdays_requested'] = setdays_requestedaba8e,
      codeStates['trs_event_process_status'] = trs_event_process_status66324,
      codeStates['settrs_event_process_status'] = settrs_event_process_status66324,
      codeStates['view_bt'] = view_bt2dca3,
      codeStates['setview_bt'] = setview_bt2dca3,
      codeStates['applyleaveapproval_v1'] = applyleaveapproval_v1Props,
      codeStates['setapplyleaveapproval_v1'] = setapplyleaveapproval_v1Props,
      codeStates['new_access_group'] = new_access_groupc501f,
      codeStates['setnew_access_group'] = setnew_access_groupc501f,
      codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
      codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
      codeStates['access_req__group'] = access_req__group7ac49,
      codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
      codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
      codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
      codeStates['emp_avail_group'] = emp_avail_group11178,
      codeStates['setemp_avail_group'] = setemp_avail_group11178,
      codeStates['emp_avail_group11178'] = emp_avail_group11178Props,
      codeStates['setemp_avail_group11178'] = setemp_avail_group11178Props,
      codeStates['leave_balance_group'] = leave_balance_group98e23,
      codeStates['setleave_balance_group'] = setleave_balance_group98e23,
      codeStates['leave_balance_group98e23'] = leave_balance_group98e23Props,
      codeStates['setleave_balance_group98e23'] = setleave_balance_group98e23Props,
      codeStates['app_det_group'] = app_det_groupe2c1b,
      codeStates['setapp_det_group'] = setapp_det_groupe2c1b,
      codeStates['app_det_groupe2c1b'] = app_det_groupe2c1bProps,
      codeStates['setapp_det_groupe2c1b'] = setapp_det_groupe2c1bProps,
      codeStates['approve_group'] = approve_group4086e,
      codeStates['setapprove_group'] = setapprove_group4086e,
      codeStates['approve_group4086e'] = approve_group4086eProps,
      codeStates['setapprove_group4086e'] = setapprove_group4086eProps,
      codeStates['audit_group'] = audit_group087fd,
      codeStates['setaudit_group'] = setaudit_group087fd,
      codeStates['audit_group087fd'] = audit_group087fdProps,
      codeStates['setaudit_group087fd'] = setaudit_group087fdProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1fcbb0e3650b4dc5bcd0cb678fce294f",
        "37cfaee5083544af89de9aa24fd2dca3"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view_bt2dca3") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_bt2dca3?.refresh])


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

  const handleClick=async()=>{
    try{  
      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "39645aa0f2064fb48ea2e65e5e5e702a",
        "object": {
          "properties.leave_req_id": "47012384a2bf44b0b64018b898b8fe41"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setapplyleaveapproval_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_access_groupc501fProps?.controls);
    setnew_access_groupc501f(bindData4||{})
    setnew_access_groupc501fProps({...new_access_groupc501fProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,access_req__group7ac49Props?.controls);
    setaccess_req__group7ac49(bindData6||{})
    setaccess_req__group7ac49Props({...access_req__group7ac49Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,emp_avail_group11178Props?.controls);
    setemp_avail_group11178(bindData8||{})
    setemp_avail_group11178Props({...emp_avail_group11178Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,leave_balance_group98e23Props?.controls);
    setleave_balance_group98e23(bindData10||{})
    setleave_balance_group98e23Props({...leave_balance_group98e23Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,app_det_groupe2c1bProps?.controls);
    setapp_det_groupe2c1b(bindData12||{})
    setapp_det_groupe2c1bProps({...app_det_groupe2c1bProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,approve_group4086eProps?.controls);
    setapprove_group4086e(bindData14||{})
    setapprove_group4086eProps({...approve_group4086eProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,audit_group087fdProps?.controls);
    setaudit_group087fd(bindData16||{})
    setaudit_group087fdProps({...audit_group087fdProps,presetValues:mainData||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
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

 if (view_bt2dca3?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1','leaverequest','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Leave Request Approval"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "applyleaveapproval"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageApplyleaveapprovalpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 class=&#34;!bg-[#DBEAFE] hover:!bg-[#BFDBFE] !text-white !rounded-md px-3 py-1 text-sm font-medium min-w-[70px]&#34;"
          onClick={handleClick}
          view='action'
          disabled= {view_bt2dca3?.isDisabled ? true : false}
          pin='round-round'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_bt

