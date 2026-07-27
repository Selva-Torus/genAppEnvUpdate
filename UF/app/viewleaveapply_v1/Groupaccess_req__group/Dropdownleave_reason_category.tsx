

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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_detailsf2bd7, setleave_req_detailsf2bd7}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_numberb0948, setleave_request_numberb0948}= useContext(TotalContext) as TotalContextProps;
  const {full_namedebbe, setfull_namedebbe}= useContext(TotalContext) as TotalContextProps;
  const {policy_name67103, setpolicy_name67103}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_categorya15ad, setleave_reason_categorya15ad}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox63f2e, setemergency_leave_checkbox63f2e}= useContext(TotalContext) as TotalContextProps;
  const {start_date8bb1a, setstart_date8bb1a}= useContext(TotalContext) as TotalContextProps;
  const {end_datea8b1a, setend_datea8b1a}= useContext(TotalContext) as TotalContextProps;
  const {days_requested4683c, setdays_requested4683c}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch96651, sethalf_day_switch96651}= useContext(TotalContext) as TotalContextProps;
  const {haf_day_session61b96, sethaf_day_session61b96}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
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
      "1adc3ad97f24278a74ffd028cc8578e5",
      "096ea7a34aef997f2c282646ca0a15ad"
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
  },[leave_reason_categorya15ad?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group578e5((prev: any) => ({ ...prev,leave_reason_categorya15ad: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group578e5;
      delete temp.leave_reason_category;
      delete temp.LEAVE_REASON_CATEGORY;
      delete temp.leave_reason_categorya15ad;
      setaccess_req__group578e5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_reason_category:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group578e5.leave_reason_category){
      if(Array.isArray(dfd_leavereasoncategorycombo_v1Props)){
        if(dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)){
          setdropdownValue([dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)?.leave_reason_category])
          tempValue=dfd_leavereasoncategorycombo_v1Props?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)?.leave_reason_category
        }else{
          setdropdownValue([access_req__group578e5.leave_reason_category])
          tempValue=access_req__group578e5.leave_reason_category
        }
      }else{
        let dstKey:string = dfd_leavereasoncategorycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{leave_reason_category:access_req__group578e5.leave_reason_category}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)?.leave_reason_category ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.leave_reason_category === access_req__group578e5.leave_reason_category)?.leave_reason_category
      }else{
        setdropdownValue([access_req__group578e5.leave_reason_category])
        tempValue=access_req__group578e5.leave_reason_category
      }   
      }
    }
    if(leave_reason_categorya15ad?.trigger == true)
    {
      await handlechange(tempValue)
      setleave_reason_categorya15ad((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__group578e5.leave_reason_category, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_leavereasoncategorycombo_v1Props) && dfd_leavereasoncategorycombo_v1Props?.length == 1){
    // setaccess_req__group578e5((pre:any)=>({...pre,leave_reason_category:dfd_leavereasoncategorycombo_v1Props[0]?.leave_reason_category}))
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
      setaccess_req__group578e5((prev: any) => ({ ...prev, leave_reason_category: getMapperDetailsBindValues[value],LEAVE_REASON_CATEGORY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group578e5((prev: any) => ({ ...prev, leave_reason_category: '', leave_reason_categorya15ad: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_reason_category:undefined}}));
   
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
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['leave_req_details'] = leave_req_detailsf2bd7,
        codeStates['setleave_req_details'] = setleave_req_detailsf2bd7,
        codeStates['leave_request_number'] = leave_request_numberb0948,
        codeStates['setleave_request_number'] = setleave_request_numberb0948,
        codeStates['full_name'] = full_namedebbe,
        codeStates['setfull_name'] = setfull_namedebbe,
        codeStates['policy_name'] = policy_name67103,
        codeStates['setpolicy_name'] = setpolicy_name67103,
        codeStates['leave_reason_category'] = leave_reason_categorya15ad,
        codeStates['setleave_reason_category'] = setleave_reason_categorya15ad,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox63f2e,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox63f2e,
        codeStates['start_date'] = start_date8bb1a,
        codeStates['setstart_date'] = setstart_date8bb1a,
        codeStates['end_date'] = end_datea8b1a,
        codeStates['setend_date'] = setend_datea8b1a,
        codeStates['days_requested'] = days_requested4683c,
        codeStates['setdays_requested'] = setdays_requested4683c,
        codeStates['half_day_switch'] = half_day_switch96651,
        codeStates['sethalf_day_switch'] = sethalf_day_switch96651,
        codeStates['haf_day_session'] = haf_day_session61b96,
        codeStates['sethaf_day_session'] = sethaf_day_session61b96,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(access_req__group578e5?.leave_reason_category == "" || access_req__group578e5?.leave_reason_category == undefined){
      access_req__group578e5.leave_reason_category = "";
      const validate:any = v.safeParse(schema, access_req__group578e5?.leave_reason_category);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_reason_category:"invalid"}}));
        }
    }else if(access_req__group578e5?.leave_reason_category !== ""){
    const validate:any = v.safeParse(schema, access_req__group578e5?.leave_reason_category);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_reason_category:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,leave_reason_category:undefined}}));
      }
    }
  }
  const access_req__group578e5Ref = useRef<any>(access_req__group578e5);
  useEffect(() => { access_req__group578e5Ref.current = access_req__group578e5; }, [access_req__group578e5]);
    useEffect(()=>{
        if(!access_req__group578e5?.leave_reason_category)
        { 
          setaccess_req__group578e5Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "096ea7a34aef997f2c282646ca0a15ad") {
        handleClick(access_req__group578e5Ref?.current?.leave_reason_categorya15ad?access_req__group578e5Ref?.current?.leave_reason_categorya15ad:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "096ea7a34aef997f2c282646ca0a15ad");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group578e5((pre:any)=>({...pre,leave_reason_category:""}))
    else
      setInitialCount(1)
  },[leave_reason_categorya15ad?.refresh])
  

  if (leave_reason_categorya15ad?.isHidden) {
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
        disabled= {leave_reason_categorya15ad?.isDisabled ? true : false}
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
        value={access_req__group578e5?.leave_reason_categorya15ad ? [access_req__group578e5?.leave_reason_categorya15ad] : (access_req__group578e5?.leave_reason_category ? dropdownValue : [])}
        validationState={validate?.viewLeaveApply_v1?.leave_reason_category ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownleave_reason_category;
