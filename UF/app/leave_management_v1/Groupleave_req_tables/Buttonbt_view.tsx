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
import PageIndividualleavemanagementpage2 from '@/app/individualleavemanagement_v1/individualleavemanagement_v1page';
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
 

const Buttonbt_view = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {employee_id78a7b, setemployee_id78a7b}= useContext(TotalContext) as TotalContextProps;
  const {employee_code5b249, setemployee_code5b249}= useContext(TotalContext) as TotalContextProps;
  const {emp_number23fed, setemp_number23fed}= useContext(TotalContext) as TotalContextProps;
  const {full_name26270, setfull_name26270}= useContext(TotalContext) as TotalContextProps;
  const {reporting_manager_id33de5, setreporting_manager_id33de5}= useContext(TotalContext) as TotalContextProps;
  const {available_leave0dc93, setavailable_leave0dc93}= useContext(TotalContext) as TotalContextProps;
  const {bt_viewf68a4, setbt_viewf68a4}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0bProps, setapproval_pendinge1c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  const {individualleavemanagement_v1Props, setindividualleavemanagement_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['employee_id'] = employee_id78a7b,
      codeStates['setemployee_id'] = setemployee_id78a7b,
      codeStates['employee_code'] = employee_code5b249,
      codeStates['setemployee_code'] = setemployee_code5b249,
      codeStates['emp_number'] = emp_number23fed,
      codeStates['setemp_number'] = setemp_number23fed,
      codeStates['full_name'] = full_name26270,
      codeStates['setfull_name'] = setfull_name26270,
      codeStates['reporting_manager_id'] = reporting_manager_id33de5,
      codeStates['setreporting_manager_id'] = setreporting_manager_id33de5,
      codeStates['available_leave'] = available_leave0dc93,
      codeStates['setavailable_leave'] = setavailable_leave0dc93,
      codeStates['bt_view'] = bt_viewf68a4,
      codeStates['setbt_view'] = setbt_viewf68a4,
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
      codeStates['individualleavemanagement_v1'] = individualleavemanagement_v1Props,
      codeStates['setindividualleavemanagement_v1'] = setindividualleavemanagement_v1Props,
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
      codeStates['leave_req_table'] = leave_req_table1dfa0,
      codeStates['setleave_req_table'] = setleave_req_table1dfa0,
      codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
      codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
      codeStates['chart_group'] = chart_groupdd9ff,
      codeStates['setchart_group'] = setchart_groupdd9ff,
      codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
      codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "064106bafb7f4c4dbd44fb6df4cbb32b",
        "2af8c6c11da34b909ccb9ba3ab9f68a4"
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
      if (id === "bt_viewf68a4") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_viewf68a4?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqCards:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c3aab98cbe4d4dbdaa0b57c7fdbfd36e",
        "object": {
          "properties.employee_id": "09a559083c284059b15d6b8f08f78a7b"
        }
      }
    ]
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "bd71f8a8d2724b508b8358d73ceae0e7",
        "object": {
          "properties.employee_id": "09a559083c284059b15d6b8f08f78a7b"
        }
      }
    ]
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leavePieChart:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "8af81a8c997940c0b6bb6f7407b625e4",
        "object": {
          "properties.employee_id": "09a559083c284059b15d6b8f08f78a7b"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setindividualleavemanagement_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,total_employees_group69415Props?.controls);
    settotal_employees_group69415(bindData4||{})
    settotal_employees_group69415Props({...total_employees_group69415Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,leave_requests_groupb9aafProps?.controls);
    setleave_requests_groupb9aaf(bindData6||{})
    setleave_requests_groupb9aafProps({...leave_requests_groupb9aafProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,onboarding_group4ab1eProps?.controls);
    setonboarding_group4ab1e(bindData8||{})
    setonboarding_group4ab1eProps({...onboarding_group4ab1eProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,leave_req_table1dfa0Props?.controls);
    setleave_req_table1dfa0(bindData10||{})
    setleave_req_table1dfa0Props({...leave_req_table1dfa0Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,chart_groupdd9ffProps?.controls);
    setchart_groupdd9ff(bindData12||{})
    setchart_groupdd9ffProps({...chart_groupdd9ffProps,presetValues:mainData||{}})  
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

 if (bt_viewf68a4?.isHidden) {
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
        title="Employee Leave Application"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "individualleavemanagement"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageIndividualleavemanagementpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 class=&#34;!bg-[#DBEAFE] hover:!bg-[#BFDBFE] !text-white !rounded-md px-3 py-1 text-sm font-medium min-w-[70px]&#34;"
          onClick={handleClick}
          view='action'
          disabled= {bt_viewf68a4?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_view

