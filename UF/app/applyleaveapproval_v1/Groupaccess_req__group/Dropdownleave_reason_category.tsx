

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
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
const Dropdownleave_reason_category = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavereasoncategorycombo_v1Props, setdfd_leavereasoncategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_details0272a, setleave_req_details0272a}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number77855, setleave_request_number77855}= useContext(TotalContext) as TotalContextProps;
  const {full_name9076a, setfull_name9076a}= useContext(TotalContext) as TotalContextProps;
  const {policy_nameab68b, setpolicy_nameab68b}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_category1f94d, setleave_reason_category1f94d}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox8efe9, setemergency_leave_checkbox8efe9}= useContext(TotalContext) as TotalContextProps;
  const {start_date34ff8, setstart_date34ff8}= useContext(TotalContext) as TotalContextProps;
  const {end_date35399, setend_date35399}= useContext(TotalContext) as TotalContextProps;
  const {days_requested70ed8, setdays_requested70ed8}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch3bf69, sethalf_day_switch3bf69}= useContext(TotalContext) as TotalContextProps;
  const {half_day_sessioneee3c, sethalf_day_sessioneee3c}= useContext(TotalContext) as TotalContextProps;
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
  const {dynamicactionsafd15, setdynamicactionsafd15}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15Props, setdynamicactionsafd15Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [leave_reason_categoryOptions, setleave_reason_categoryOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `leave_reason_category`
    let mapperText: string =  `leave_reason_category`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "e968590033094bbfaf1b81b7bf27ac49",
      "9a0ac9cc20a8f36e0440cbfe3141f94d"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_leavereasoncategorycombo_v1Props.dstKey){
      dstKey = dfd_leavereasoncategorycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_leavereasoncategorycombo_v1Props && !dfd_leavereasoncategorycombo_v1Props.hasLogicCenter && !dfdFlag) {
    const api_paginationData:any = await AxiosService.post(
      '/UF/pagination',
      {
        key:dstKey,
        page:page,
        count:PAGE_SIZE,
        searchFilter:searchFilterData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (api_paginationData?.data?.records.length === 0) {
      dfdFlag = true
    }
    if (Array.isArray(dfData)) {
      dfData = [...dfData, ...api_paginationData?.data?.records];
    } else {
      dfData = api_paginationData?.data?.records;
    }
    }else if(!value && !dfdFlag){
    const api_paginationData:any = await AxiosService.post(
      '/UF/pagination',
      {
        key:dstKey,
        page:page,
        count:PAGE_SIZE,
        searchFilter:searchFilterData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (api_paginationData?.data?.records.length === 0) {
      dfdFlag = true
    }
    if (Array.isArray(dfData)) {
      dfData = [...dfData, ...api_paginationData?.data?.records];
    } else {
      dfData = api_paginationData?.data?.records;
    }
  }

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperValue,mapperText, bindtranValue, code, getSourceFilterColumn,copySourceFilterColumn)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperValue, bindtranValue, code, getSourceFilterColumn,copySourceFilterColumn)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
    if(!value){
      let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
      temp = temp.filter((ele:any)=>ele);
      setleave_reason_categoryOptions(temp);
      if (dfData.length < PAGE_SIZE) setHasMore(false);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }

  const loadMore = async () => {
    if (!hasMore || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await getDropdownData(undefined, nextPage);
    setIsLoadingMore(false);
    loadingMoreRef.current = false;
  }


  useEffect(() => {
    const fetchGetDropdownData = async () => {
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    await getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
    };
  fetchGetDropdownData();
  },[leave_reason_category1f94d?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group7ac49((prev: any) => ({ ...prev,leave_reason_category1f94d: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group7ac49;
      delete temp.leave_reason_category;
      delete temp.LEAVE_REASON_CATEGORY;
      delete temp.leave_reason_category1f94d;
      setaccess_req__group7ac49(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,applyLeaveApproval_v1:{...pre?.applyLeaveApproval_v1,leave_reason_category:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group7ac49.leave_reason_category){
      if(Array.isArray(dfd_leavereasoncategorycombo_v1Props)){
        if(dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)){
          setdropdownValue([dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)?.leave_reason_category])
          tempValue=dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)?.leave_reason_category
        }else{
          setdropdownValue([access_req__group7ac49.leave_reason_category])
          tempValue=access_req__group7ac49.leave_reason_category
        }
      }else{
        let dstKey:string = dfd_leavereasoncategorycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{leave_reason_category:access_req__group7ac49.leave_reason_category}
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (api_paginationData?.data?.error == true) {
        toast(api_paginationData?.data?.errorDetails?.message, 'danger')
        return
      }
      if(api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)?.leave_reason_category ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group7ac49.leave_reason_category)?.leave_reason_category
      }else{
        setdropdownValue([access_req__group7ac49.leave_reason_category])
        tempValue=access_req__group7ac49.leave_reason_category
      }   
      }
    }
    if(leave_reason_category1f94d?.trigger == true)
    {
      await handlechange(tempValue)
      setleave_reason_category1f94d((pre:any)=>({...pre,trigger:false}))
      isUserSelectionRef.current = false;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isDropdownDataReady) return;
      if (isUserSelectionRef.current) {
        isUserSelectionRef.current = false;
        return;
      }
      await fetchDropdownData();
    };
    fetchData();
  },[access_req__group7ac49.leave_reason_category, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_leavereasoncategorycombo_v1Props) && dfd_leavereasoncategorycombo_v1Props?.length == 1){
    // setaccess_req__group7ac49((pre:any)=>({...pre,leave_reason_category:dfd_leavereasoncategorycombo_v1Props[0]?.leave_reason_category}))
    }
  },[dfd_leavereasoncategorycombo_v1Props])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setaccess_req__group7ac49((prev: any) => ({ ...prev, leave_reason_category: getMapperDetailsBindValues[value],LEAVE_REASON_CATEGORY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group7ac49((prev: any) => ({ ...prev, leave_reason_category: '', leave_reason_category1f94d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,applyLeaveApproval_v1:{...pre?.applyLeaveApproval_v1,leave_reason_category:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.leave_reason_category==getMapperDetailsBindValues[value] && items?.leave_reason_category==value)) || {}
    selected.current={
      ...selectedObj||{},
      leave_reason_category:value,
      leave_reason_category:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_groupc501f,
        codeStates['setnew_access_group'] = setnew_access_groupc501f,
        codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
        codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
        codeStates['access_req__group'] = access_req__group7ac49,
        codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
        codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
        codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
        codeStates['leave_req_details'] = leave_req_details0272a,
        codeStates['setleave_req_details'] = setleave_req_details0272a,
        codeStates['leave_request_number'] = leave_request_number77855,
        codeStates['setleave_request_number'] = setleave_request_number77855,
        codeStates['full_name'] = full_name9076a,
        codeStates['setfull_name'] = setfull_name9076a,
        codeStates['policy_name'] = policy_nameab68b,
        codeStates['setpolicy_name'] = setpolicy_nameab68b,
        codeStates['leave_reason_category'] = leave_reason_category1f94d,
        codeStates['setleave_reason_category'] = setleave_reason_category1f94d,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox8efe9,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox8efe9,
        codeStates['start_date'] = start_date34ff8,
        codeStates['setstart_date'] = setstart_date34ff8,
        codeStates['end_date'] = end_date35399,
        codeStates['setend_date'] = setend_date35399,
        codeStates['days_requested'] = days_requested70ed8,
        codeStates['setdays_requested'] = setdays_requested70ed8,
        codeStates['half_day_switch'] = half_day_switch3bf69,
        codeStates['sethalf_day_switch'] = sethalf_day_switch3bf69,
        codeStates['half_day_session'] = half_day_sessioneee3c,
        codeStates['sethalf_day_session'] = sethalf_day_sessioneee3c,
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
        codeStates['dynamicactions'] = dynamicactionsafd15,
        codeStates['setdynamicactions'] = setdynamicactionsafd15,
        codeStates['dynamicactionsafd15'] = dynamicactionsafd15Props,
        codeStates['setdynamicactionsafd15'] = setdynamicactionsafd15Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
  const access_req__group7ac49Ref = useRef<any>(access_req__group7ac49);
  useEffect(() => { access_req__group7ac49Ref.current = access_req__group7ac49; }, [access_req__group7ac49]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "9a0ac9cc20a8f36e0440cbfe3141f94d") {
        handleClick(access_req__group7ac49Ref?.current?.leave_reason_category1f94d?access_req__group7ac49Ref?.current?.leave_reason_category1f94d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9a0ac9cc20a8f36e0440cbfe3141f94d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group7ac49((pre:any)=>({...pre,leave_reason_category:""}))
    else
      setInitialCount(1)
  },[leave_reason_category1f94d?.refresh])
  

  if (leave_reason_category1f94d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `16 / 21`,
        gridRow: `7 / 19`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {leave_reason_category1f94d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Leave Reason Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={leave_reason_categoryOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__group7ac49?.leave_reason_category1f94d ? [access_req__group7ac49?.leave_reason_category1f94d] : (access_req__group7ac49?.leave_reason_category ? dropdownValue : [])}
        validationState={validate?.applyLeaveApproval_v1?.leave_reason_category ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownleave_reason_category;
