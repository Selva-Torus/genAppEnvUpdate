

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
const Dropdownpolicy_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policynamecombo_v1Props, setdfd_policynamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [policy_nameOptions, setpolicy_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `policy_name`
    let mapperText: string =  `policy_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "1adc3ad97f24278a74ffd028cc8578e5",
      "155fee1ab05791a4c1080a5905067103"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_policynamecombo_v1Props.dstKey){
      dstKey = dfd_policynamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_policynamecombo_v1Props && !dfd_policynamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setpolicy_nameOptions(temp);
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
  },[policy_name67103?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group578e5((prev: any) => ({ ...prev,policy_name67103: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group578e5;
      delete temp.policy_name;
      delete temp.POLICY_NAME;
      delete temp.policy_name67103;
      setaccess_req__group578e5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,policy_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group578e5.policy_name){
      if(Array.isArray(dfd_policynamecombo_v1Props)){
        if(dfd_policynamecombo_v1Props?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)){
          setdropdownValue([dfd_policynamecombo_v1Props?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)?.policy_name])
          tempValue=dfd_policynamecombo_v1Props?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)?.policy_name
        }else{
          setdropdownValue([access_req__group578e5.policy_name])
          tempValue=access_req__group578e5.policy_name
        }
      }else{
        let dstKey:string = dfd_policynamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{policy_name:access_req__group578e5.policy_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)?.policy_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.policy_name === access_req__group578e5.policy_name)?.policy_name
      }else{
        setdropdownValue([access_req__group578e5.policy_name])
        tempValue=access_req__group578e5.policy_name
      }   
      }
    }
    if(policy_name67103?.trigger == true)
    {
      await handlechange(tempValue)
      setpolicy_name67103((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__group578e5.policy_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_policynamecombo_v1Props) && dfd_policynamecombo_v1Props?.length == 1){
    // setaccess_req__group578e5((pre:any)=>({...pre,policy_name:dfd_policynamecombo_v1Props[0]?.policy_name}))
    }
  },[dfd_policynamecombo_v1Props])

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
      setaccess_req__group578e5((prev: any) => ({ ...prev, policy_name: getMapperDetailsBindValues[value],POLICY_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group578e5((prev: any) => ({ ...prev, policy_name: '', policy_name67103: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,policy_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.policy_name==getMapperDetailsBindValues[value] && items?.policy_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      policy_name:value,
      policy_name:getMapperDetailsBindValues[value]
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const access_req__group578e5Ref = useRef<any>(access_req__group578e5);
  useEffect(() => { access_req__group578e5Ref.current = access_req__group578e5; }, [access_req__group578e5]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "155fee1ab05791a4c1080a5905067103") {
        handleClick(access_req__group578e5Ref?.current?.policy_name67103?access_req__group578e5Ref?.current?.policy_name67103:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "155fee1ab05791a4c1080a5905067103");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group578e5((pre:any)=>({...pre,policy_name:""}))
    else
      setInitialCount(1)
  },[policy_name67103?.refresh])
  

  if (policy_name67103?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `11 / 16`,
        gridRow: `7 / 19`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {policy_name67103?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Leave Policy
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={policy_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__group578e5?.policy_name67103 ? [access_req__group578e5?.policy_name67103] : (access_req__group578e5?.policy_name ? dropdownValue : [])}
        validationState={validate?.viewLeaveApply_v1?.policy_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownpolicy_name;
