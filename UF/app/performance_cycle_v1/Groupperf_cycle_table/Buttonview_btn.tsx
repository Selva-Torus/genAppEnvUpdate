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
import PageViewperformancecyclepage10 from '@/app/viewperformancecycle_v1/viewperformancecycle_v1page';
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
 

const Buttonview_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen10, setShowProfileAsModalOpen10] = React.useState<boolean>(false);
    
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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  const {viewperformancecycle_v1Props, setviewperformancecycle_v1Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['new_access_group'] = new_access_groupc1763,
      codeStates['setnew_access_group'] = setnew_access_groupc1763,
      codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
      codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
      codeStates['access_req__group'] = access_req__group70ea9,
      codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
      codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
      codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
      codeStates['valid_group'] = valid_group35ad5,
      codeStates['setvalid_group'] = setvalid_group35ad5,
      codeStates['valid_group35ad5'] = valid_group35ad5Props,
      codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
      codeStates['business_just__group'] = business_just__group2db99,
      codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
      codeStates['business_just__group2db99'] = business_just__group2db99Props,
      codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
      codeStates['viewperformancecycle_v1'] = viewperformancecycle_v1Props,
      codeStates['setviewperformancecycle_v1'] = setviewperformancecycle_v1Props,
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
        "3acd86959ef8bc36fd0885758d8e0416"
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
      if (id === "view_btne0416") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen10(false)
  },[view_btne0416?.refresh])


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
    let bindData2 = filterByKeys(mainData,new_access_groupc1763Props?.controls);
    setnew_access_groupc1763(bindData2||{})
    setnew_access_groupc1763Props({...new_access_groupc1763Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,access_req__group70ea9Props?.controls);
    setaccess_req__group70ea9(bindData4||{})
    setaccess_req__group70ea9Props({...access_req__group70ea9Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,valid_group35ad5Props?.controls);
    setvalid_group35ad5(bindData6||{})
    setvalid_group35ad5Props({...valid_group35ad5Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,business_just__group2db99Props?.controls);
    setbusiness_just__group2db99(bindData8||{})
    setbusiness_just__group2db99Props({...business_just__group2db99Props,presetValues:mainData||{}})  
    // showArtifactAsModal
    let filterProps10:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceCycleModify:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "027910746c6343f7b637e85490c0c120",
        "object": {
          "properties.cycle_id": "e00aa570e520ff66f3d314afc33f3db9"
        }
      }
    ]
  }
];
    let filterData10 = await getFilterProps(filterProps10,mainData);
    setviewperformancecycle_v1Props([...filterData10 ]);
    setShowProfileAsModalOpen10(true);
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

 if (view_btne0416?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCycles:AFVK:v1','performancecycles','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen10} 
        onClose={() => setShowProfileAsModalOpen10(false)}
        title="VIew Performance Cycle"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "viewperformancecycle"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewperformancecyclepage10/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view_btne0416?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn

