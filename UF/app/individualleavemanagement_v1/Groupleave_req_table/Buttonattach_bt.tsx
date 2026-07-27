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
import PageLeavemanagementdocumentpage8 from '@/app/leavemanagementdocument_v1/leavemanagementdocument_v1page';
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
 

const Buttonattach_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen8, setShowProfileAsModalOpen8] = React.useState<boolean>(false);
    
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
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id6149c, setleave_req_id6149c}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number962d5, setleave_request_number962d5}= useContext(TotalContext) as TotalContextProps;
  const {leave_type274e3, setleave_type274e3}= useContext(TotalContext) as TotalContextProps;
  const {start_date502ce, setstart_date502ce}= useContext(TotalContext) as TotalContextProps;
  const {end_date285f8, setend_date285f8}= useContext(TotalContext) as TotalContextProps;
  const {days_requesteda438c, setdays_requesteda438c}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_statusdd679, settrs_event_process_statusdd679}= useContext(TotalContext) as TotalContextProps;
  const {view_btb1a53, setview_btb1a53}= useContext(TotalContext) as TotalContextProps;
  const {attach_btcee90, setattach_btcee90}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  const {leavemanagementdocument_v1Props, setleavemanagementdocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


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
      codeStates['leave_req_table'] = leave_req_table1dfa0,
      codeStates['setleave_req_table'] = setleave_req_table1dfa0,
      codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
      codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
      codeStates['leave_req_id'] = leave_req_id6149c,
      codeStates['setleave_req_id'] = setleave_req_id6149c,
      codeStates['leave_request_number'] = leave_request_number962d5,
      codeStates['setleave_request_number'] = setleave_request_number962d5,
      codeStates['leave_type'] = leave_type274e3,
      codeStates['setleave_type'] = setleave_type274e3,
      codeStates['start_date'] = start_date502ce,
      codeStates['setstart_date'] = setstart_date502ce,
      codeStates['end_date'] = end_date285f8,
      codeStates['setend_date'] = setend_date285f8,
      codeStates['days_requested'] = days_requesteda438c,
      codeStates['setdays_requested'] = setdays_requesteda438c,
      codeStates['trs_event_process_status'] = trs_event_process_statusdd679,
      codeStates['settrs_event_process_status'] = settrs_event_process_statusdd679,
      codeStates['view_bt'] = view_btb1a53,
      codeStates['setview_bt'] = setview_btb1a53,
      codeStates['attach_bt'] = attach_btcee90,
      codeStates['setattach_bt'] = setattach_btcee90,
      codeStates['doc_attached_group'] = doc_attached_groupe2bd6,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupe2bd6,
      codeStates['doc_attached_groupe2bd6'] = doc_attached_groupe2bd6Props,
      codeStates['setdoc_attached_groupe2bd6'] = setdoc_attached_groupe2bd6Props,
      codeStates['table_group'] = table_groupf34e5,
      codeStates['settable_group'] = settable_groupf34e5,
      codeStates['table_groupf34e5'] = table_groupf34e5Props,
      codeStates['settable_groupf34e5'] = settable_groupf34e5Props,
      codeStates['request_doc_table'] = request_doc_tabled1189,
      codeStates['setrequest_doc_table'] = setrequest_doc_tabled1189,
      codeStates['request_doc_tabled1189'] = request_doc_tabled1189Props,
      codeStates['setrequest_doc_tabled1189'] = setrequest_doc_tabled1189Props,
      codeStates['leavemanagementdocument_v1'] = leavemanagementdocument_v1Props,
      codeStates['setleavemanagementdocument_v1'] = setleavemanagementdocument_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6ae8b086b23d14630c1c13c329c1dfa0",
        "14af4b4c9f8b47aaa61dcfe9551cee90"
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
      if (id === "attach_btcee90") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[attach_btcee90?.refresh])


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

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,doc_attached_groupe2bd6Props?.controls);
    setdoc_attached_groupe2bd6(bindData2||{})
    setdoc_attached_groupe2bd6Props({...doc_attached_groupe2bd6Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,table_groupf34e5Props?.controls);
    settable_groupf34e5(bindData4||{})
    settable_groupf34e5Props({...table_groupf34e5Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,request_doc_tabled1189Props?.controls);
    setrequest_doc_tabled1189(bindData6||{})
    setrequest_doc_tabled1189Props({...request_doc_tabled1189Props,presetValues:mainData||{}})  
    // showArtifactAsModal
    let filterProps8:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveManageDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "d374c56e50cccd04389e9f3f640996f2",
        "object": {
          "properties.leave_req_id": "568b8681eaa04e649ec8a28346f6149c"
        }
      }
    ]
  }
];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    setleavemanagementdocument_v1Props([...filterData8 ]);
    setShowProfileAsModalOpen8(true);
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

 if (attach_btcee90?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1','individualleavemanagement','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => setShowProfileAsModalOpen8(false)}
        title="Attachments"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "leavemanagementdocument"
        className='w-[70%] h-[] bg-gray-50 overflow-auto'
      >
        <PageLeavemanagementdocumentpage8/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {attach_btcee90?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Attachments")}
        </Button>}
      </div>
    
  )
}

export default Buttonattach_bt

