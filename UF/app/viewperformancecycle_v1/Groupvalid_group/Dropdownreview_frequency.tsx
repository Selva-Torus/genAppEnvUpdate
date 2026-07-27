

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
const Dropdownreview_frequency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewfrequencycombo_v1Props, setdfd_reviewfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {review_period848bb, setreview_period848bb}= useContext(TotalContext) as TotalContextProps;
  const {start_dated9832, setstart_dated9832}= useContext(TotalContext) as TotalContextProps;
  const {end_date18250, setend_date18250}= useContext(TotalContext) as TotalContextProps;
  const {review_frequency1d4fa, setreview_frequency1d4fa}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [review_frequencyOptions, setreview_frequencyOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `perf_review_frequency`
    let mapperText: string =  `perf_review_frequency`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "41276bf255eaf4639feec6d920c35ad5",
      "134aa0eadec05d31015882fb8f71d4fa"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_reviewfrequencycombo_v1Props.dstKey){
      dstKey = dfd_reviewfrequencycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_reviewfrequencycombo_v1Props && !dfd_reviewfrequencycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setreview_frequencyOptions(temp);
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
  },[review_frequency1d4fa?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setvalid_group35ad5((prev: any) => ({ ...prev,review_frequency1d4fa: value }))
      setIsRequredData(false)
    }else{
      let temp:any = valid_group35ad5;
      delete temp.review_frequency;
      delete temp.REVIEW_FREQUENCY;
      delete temp.review_frequency1d4fa;
      setvalid_group35ad5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,review_frequency:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(valid_group35ad5.review_frequency){
      if(Array.isArray(dfd_reviewfrequencycombo_v1Props)){
        if(dfd_reviewfrequencycombo_v1Props?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)){
          setdropdownValue([dfd_reviewfrequencycombo_v1Props?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)?.perf_review_frequency])
          tempValue=dfd_reviewfrequencycombo_v1Props?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)?.perf_review_frequency
        }else{
          setdropdownValue([valid_group35ad5.review_frequency])
          tempValue=valid_group35ad5.review_frequency
        }
      }else{
        let dstKey:string = dfd_reviewfrequencycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{perf_review_frequency:valid_group35ad5.review_frequency}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)?.perf_review_frequency ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.perf_review_frequency === valid_group35ad5.review_frequency)?.perf_review_frequency
      }else{
        setdropdownValue([valid_group35ad5.review_frequency])
        tempValue=valid_group35ad5.review_frequency
      }   
      }
    }
    if(review_frequency1d4fa?.trigger == true)
    {
      await handlechange(tempValue)
      setreview_frequency1d4fa((pre:any)=>({...pre,trigger:false}))
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
  },[valid_group35ad5.review_frequency, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_reviewfrequencycombo_v1Props) && dfd_reviewfrequencycombo_v1Props?.length == 1){
    // setvalid_group35ad5((pre:any)=>({...pre,review_frequency:dfd_reviewfrequencycombo_v1Props[0]?.review_frequency}))
    }
  },[dfd_reviewfrequencycombo_v1Props])

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
      setvalid_group35ad5((prev: any) => ({ ...prev, review_frequency: getMapperDetailsBindValues[value],REVIEW_FREQUENCY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setvalid_group35ad5((prev: any) => ({ ...prev, review_frequency: '', review_frequency1d4fa: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,review_frequency:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.perf_review_frequency==getMapperDetailsBindValues[value] && items?.perf_review_frequency==value)) || {}
    selected.current={
      ...selectedObj||{},
      perf_review_frequency:value,
      perf_review_frequency:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
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
        codeStates['review_period'] = review_period848bb,
        codeStates['setreview_period'] = setreview_period848bb,
        codeStates['start_date'] = start_dated9832,
        codeStates['setstart_date'] = setstart_dated9832,
        codeStates['end_date'] = end_date18250,
        codeStates['setend_date'] = setend_date18250,
        codeStates['review_frequency'] = review_frequency1d4fa,
        codeStates['setreview_frequency'] = setreview_frequency1d4fa,
        codeStates['business_just__group'] = business_just__group2db99,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
        codeStates['business_just__group2db99'] = business_just__group2db99Props,
        codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
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
    if(valid_group35ad5?.review_frequency == "" || valid_group35ad5?.review_frequency == undefined){
      valid_group35ad5.review_frequency = "";
      const validate:any = v.safeParse(schema, valid_group35ad5?.review_frequency);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,review_frequency:"invalid"}}));
        }
    }else if(valid_group35ad5?.review_frequency !== ""){
    const validate:any = v.safeParse(schema, valid_group35ad5?.review_frequency);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,review_frequency:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,review_frequency:undefined}}));
      }
    }
  }
  const valid_group35ad5Ref = useRef<any>(valid_group35ad5);
  useEffect(() => { valid_group35ad5Ref.current = valid_group35ad5; }, [valid_group35ad5]);
    useEffect(()=>{
        if(!valid_group35ad5?.review_frequency)
        { 
          setvalid_group35ad5Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "134aa0eadec05d31015882fb8f71d4fa") {
        handleClick(valid_group35ad5Ref?.current?.review_frequency1d4fa?valid_group35ad5Ref?.current?.review_frequency1d4fa:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "134aa0eadec05d31015882fb8f71d4fa");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setvalid_group35ad5((pre:any)=>({...pre,review_frequency:""}))
    else
      setInitialCount(1)
  },[review_frequency1d4fa?.refresh])
  

  if (review_frequency1d4fa?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `20 / 32`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {review_frequency1d4fa?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Review Frequency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={review_frequencyOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={valid_group35ad5?.review_frequency1d4fa ? [valid_group35ad5?.review_frequency1d4fa] : (valid_group35ad5?.review_frequency ? dropdownValue : [])}
        validationState={validate?.viewPerformanceCycle_v1?.review_frequency ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownreview_frequency;
