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
import PagePerformancecyclesdeletepage2 from '@/app/performancecyclesdelete_v1/performancecyclesdelete_v1page';
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
 

const Buttondelete_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_employees_group496b5, settotal_employees_group496b5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group496b5Props, settotal_employees_group496b5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group0afb1, setemp_group0afb1}= useContext(TotalContext) as TotalContextProps;
  const {emp_group0afb1Props, setemp_group0afb1Props}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28, setperf_cycle_table26d28}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28Props, setperf_cycle_table26d28Props}= useContext(TotalContext) as TotalContextProps;
  const {cycle_idf3db9, setcycle_idf3db9}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code8b707, setcycle_code8b707}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name00a29, setcycle_name00a29}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type56178, setcycle_type56178}= useContext(TotalContext) as TotalContextProps;
  const {start_dateb7114, setstart_dateb7114}= useContext(TotalContext) as TotalContextProps;
  const {end_date058c0, setend_date058c0}= useContext(TotalContext) as TotalContextProps;
  const {view_btne0416, setview_btne0416}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnfd098, setedit_btnfd098}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn6b3e2, setdelete_btn6b3e2}= useContext(TotalContext) as TotalContextProps;
  const {review_frequency1892f, setreview_frequency1892f}= useContext(TotalContext) as TotalContextProps;
  const {performancecyclesdelete_v1Props, setperformancecyclesdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group496b5,
      codeStates['settotal_employees_group'] = settotal_employees_group496b5,
      codeStates['total_employees_group496b5'] = total_employees_group496b5Props,
      codeStates['settotal_employees_group496b5'] = settotal_employees_group496b5Props,
      codeStates['emp_group'] = emp_group0afb1,
      codeStates['setemp_group'] = setemp_group0afb1,
      codeStates['emp_group0afb1'] = emp_group0afb1Props,
      codeStates['setemp_group0afb1'] = setemp_group0afb1Props,
      codeStates['perf_cycle_table'] = perf_cycle_table26d28,
      codeStates['setperf_cycle_table'] = setperf_cycle_table26d28,
      codeStates['perf_cycle_table26d28'] = perf_cycle_table26d28Props,
      codeStates['setperf_cycle_table26d28'] = setperf_cycle_table26d28Props,
      codeStates['cycle_id'] = cycle_idf3db9,
      codeStates['setcycle_id'] = setcycle_idf3db9,
      codeStates['cycle_code'] = cycle_code8b707,
      codeStates['setcycle_code'] = setcycle_code8b707,
      codeStates['cycle_name'] = cycle_name00a29,
      codeStates['setcycle_name'] = setcycle_name00a29,
      codeStates['cycle_type'] = cycle_type56178,
      codeStates['setcycle_type'] = setcycle_type56178,
      codeStates['start_date'] = start_dateb7114,
      codeStates['setstart_date'] = setstart_dateb7114,
      codeStates['end_date'] = end_date058c0,
      codeStates['setend_date'] = setend_date058c0,
      codeStates['view_btn'] = view_btne0416,
      codeStates['setview_btn'] = setview_btne0416,
      codeStates['edit_btn'] = edit_btnfd098,
      codeStates['setedit_btn'] = setedit_btnfd098,
      codeStates['delete_btn'] = delete_btn6b3e2,
      codeStates['setdelete_btn'] = setdelete_btn6b3e2,
      codeStates['review_frequency'] = review_frequency1892f,
      codeStates['setreview_frequency'] = setreview_frequency1892f,
      codeStates['performancecyclesdelete_v1'] = performancecyclesdelete_v1Props,
      codeStates['setperformancecyclesdelete_v1'] = setperformancecyclesdelete_v1Props,
      codeStates['group_delete'] = group_deletebe86e,
      codeStates['setgroup_delete'] = setgroup_deletebe86e,
      codeStates['group_deletebe86e'] = group_deletebe86eProps,
      codeStates['setgroup_deletebe86e'] = setgroup_deletebe86eProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "fdda58d52835de518c271281ed326d28",
        "eb472be76815e313083133a57816b3e2"
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
      if (id === "delete_btn6b3e2") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[delete_btn6b3e2?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceCycle:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "71a31e785ee9740d72f4062144061875",
        "object": {
          "properties.cycle_id": "e00aa570e520ff66f3d314afc33f3db9"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setperformancecyclesdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_deletebe86eProps?.controls);
    setgroup_deletebe86e(bindData4||{})
    setgroup_deletebe86eProps({...group_deletebe86eProps,presetValues:mainData||{}})  
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

 if (delete_btn6b3e2?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCycles:AFVK:v1','performancecycles','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Delete Performance Cycle"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "performancecyclesdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PagePerformancecyclesdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btn6b3e2?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdDeleteOutline"
          iconDisplay='Start with Icon'
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

