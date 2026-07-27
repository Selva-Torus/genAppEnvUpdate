

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
const Dropdownreview_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewtypecombo_v1Props, setdfd_reviewtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf14612, setbasic_inf14612}= useContext(TotalContext) as TotalContextProps;
  const {full_name13305, setfull_name13305}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name855a5, setcycle_name855a5}= useContext(TotalContext) as TotalContextProps;
  const {review_number19333, setreview_number19333}= useContext(TotalContext) as TotalContextProps;
  const {review_type718e4, setreview_type718e4}= useContext(TotalContext) as TotalContextProps;
  const {review_status4ba57, setreview_status4ba57}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [review_typeOptions, setreview_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `perf_review_type`
    let mapperText: string =  `perf_review_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "7d9852de618fc302835e21622dfdb1de",
      "5d6dbd25bc8bd1bf59066115685718e4"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_reviewtypecombo_v1Props.dstKey){
      dstKey = dfd_reviewtypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_reviewtypecombo_v1Props && !dfd_reviewtypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setreview_typeOptions(temp);
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
  },[review_type718e4?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__groupdb1de((prev: any) => ({ ...prev,review_type718e4: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__groupdb1de;
      delete temp.review_type;
      delete temp.REVIEW_TYPE;
      delete temp.review_type718e4;
      setaccess_req__groupdb1de(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__groupdb1de.review_type){
      if(Array.isArray(dfd_reviewtypecombo_v1Props)){
        if(dfd_reviewtypecombo_v1Props?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)){
          setdropdownValue([dfd_reviewtypecombo_v1Props?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)?.perf_review_type])
          tempValue=dfd_reviewtypecombo_v1Props?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)?.perf_review_type
        }else{
          setdropdownValue([access_req__groupdb1de.review_type])
          tempValue=access_req__groupdb1de.review_type
        }
      }else{
        let dstKey:string = dfd_reviewtypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{perf_review_type:access_req__groupdb1de.review_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)?.perf_review_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.perf_review_type === access_req__groupdb1de.review_type)?.perf_review_type
      }else{
        setdropdownValue([access_req__groupdb1de.review_type])
        tempValue=access_req__groupdb1de.review_type
      }   
      }
    }
    if(review_type718e4?.trigger == true)
    {
      await handlechange(tempValue)
      setreview_type718e4((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__groupdb1de.review_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_reviewtypecombo_v1Props) && dfd_reviewtypecombo_v1Props?.length == 1){
    // setaccess_req__groupdb1de((pre:any)=>({...pre,review_type:dfd_reviewtypecombo_v1Props[0]?.review_type}))
    }
  },[dfd_reviewtypecombo_v1Props])

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
      setaccess_req__groupdb1de((prev: any) => ({ ...prev, review_type: getMapperDetailsBindValues[value],REVIEW_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__groupdb1de((prev: any) => ({ ...prev, review_type: '', review_type718e4: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.perf_review_type==getMapperDetailsBindValues[value] && items?.perf_review_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      perf_review_type:value,
      perf_review_type:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_groupfa034,
        codeStates['setnew_access_group'] = setnew_access_groupfa034,
        codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
        codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
        codeStates['access_req__group'] = access_req__groupdb1de,
        codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
        codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
        codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
        codeStates['basic_inf'] = basic_inf14612,
        codeStates['setbasic_inf'] = setbasic_inf14612,
        codeStates['full_name'] = full_name13305,
        codeStates['setfull_name'] = setfull_name13305,
        codeStates['cycle_name'] = cycle_name855a5,
        codeStates['setcycle_name'] = setcycle_name855a5,
        codeStates['review_number'] = review_number19333,
        codeStates['setreview_number'] = setreview_number19333,
        codeStates['review_type'] = review_type718e4,
        codeStates['setreview_type'] = setreview_type718e4,
        codeStates['review_status'] = review_status4ba57,
        codeStates['setreview_status'] = setreview_status4ba57,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
        codeStates['addt__group'] = addt__group82d26,
        codeStates['setaddt__group'] = setaddt__group82d26,
        codeStates['addt__group82d26'] = addt__group82d26Props,
        codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
        codeStates['addt__dts_group'] = addt__dts_group7fd81,
        codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
        codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
        codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
        codeStates['dynamicactions'] = dynamicactions31354,
        codeStates['setdynamicactions'] = setdynamicactions31354,
        codeStates['dynamicactions31354'] = dynamicactions31354Props,
        codeStates['setdynamicactions31354'] = setdynamicactions31354Props,
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
    if(access_req__groupdb1de?.review_type == "" || access_req__groupdb1de?.review_type == undefined){
      access_req__groupdb1de.review_type = "";
      const validate:any = v.safeParse(schema, access_req__groupdb1de?.review_type);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_type:"invalid"}}));
        }
    }else if(access_req__groupdb1de?.review_type !== ""){
    const validate:any = v.safeParse(schema, access_req__groupdb1de?.review_type);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_type:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_type:undefined}}));
      }
    }
  }
  const access_req__groupdb1deRef = useRef<any>(access_req__groupdb1de);
  useEffect(() => { access_req__groupdb1deRef.current = access_req__groupdb1de; }, [access_req__groupdb1de]);
    useEffect(()=>{
        if(!access_req__groupdb1de?.review_type)
        { 
          setaccess_req__groupdb1deProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "5d6dbd25bc8bd1bf59066115685718e4") {
        handleClick(access_req__groupdb1deRef?.current?.review_type718e4?access_req__groupdb1deRef?.current?.review_type718e4:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5d6dbd25bc8bd1bf59066115685718e4");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__groupdb1de((pre:any)=>({...pre,review_type:""}))
    else
      setInitialCount(1)
  },[review_type718e4?.refresh])
  

  if (review_type718e4?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `20 / 32`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {review_type718e4?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Review Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={review_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__groupdb1de?.review_type718e4 ? [access_req__groupdb1de?.review_type718e4] : (access_req__groupdb1de?.review_type ? dropdownValue : [])}
        validationState={validate?.newPerformanceReview_v1?.review_type ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownreview_type;
