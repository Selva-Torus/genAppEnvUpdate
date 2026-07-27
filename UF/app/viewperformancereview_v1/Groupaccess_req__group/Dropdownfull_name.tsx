

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
const Dropdownfull_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf380e7, setbasic_inf380e7}= useContext(TotalContext) as TotalContextProps;
  const {full_name8acb5, setfull_name8acb5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name47492, setcycle_name47492}= useContext(TotalContext) as TotalContextProps;
  const {review_number53b06, setreview_number53b06}= useContext(TotalContext) as TotalContextProps;
  const {review_typed590c, setreview_typed590c}= useContext(TotalContext) as TotalContextProps;
  const {review_status2c6ef, setreview_status2c6ef}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [full_nameOptions, setfull_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `full_name`
    let mapperText: string =  `full_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "03cc0779353abc8649fdd1a265a002d0",
      "215412b1b36e453180a4b12188f8acb5"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_employeenamecombo_v1Props.dstKey){
      dstKey = dfd_employeenamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_employeenamecombo_v1Props && !dfd_employeenamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setfull_nameOptions(temp);
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
  },[full_name8acb5?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group002d0((prev: any) => ({ ...prev,full_name8acb5: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group002d0;
      delete temp.full_name;
      delete temp.FULL_NAME;
      delete temp.full_name8acb5;
      setaccess_req__group002d0(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,full_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group002d0.full_name){
      if(Array.isArray(dfd_employeenamecombo_v1Props)){
        if(dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group002d0.full_name)){
          setdropdownValue([dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group002d0.full_name)?.full_name])
          tempValue=dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group002d0.full_name)?.full_name
        }else{
          setdropdownValue([access_req__group002d0.full_name])
          tempValue=access_req__group002d0.full_name
        }
      }else{
        let dstKey:string = dfd_employeenamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{full_name:access_req__group002d0.full_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group002d0.full_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group002d0.full_name)?.full_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group002d0.full_name)?.full_name
      }else{
        setdropdownValue([access_req__group002d0.full_name])
        tempValue=access_req__group002d0.full_name
      }   
      }
    }
    if(full_name8acb5?.trigger == true)
    {
      await handlechange(tempValue)
      setfull_name8acb5((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__group002d0.full_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_employeenamecombo_v1Props) && dfd_employeenamecombo_v1Props?.length == 1){
    // setaccess_req__group002d0((pre:any)=>({...pre,full_name:dfd_employeenamecombo_v1Props[0]?.full_name}))
    }
  },[dfd_employeenamecombo_v1Props])

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
      setaccess_req__group002d0((prev: any) => ({ ...prev, full_name: getMapperDetailsBindValues[value],FULL_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group002d0((prev: any) => ({ ...prev, full_name: '', full_name8acb5: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,full_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.full_name==getMapperDetailsBindValues[value] && items?.full_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      full_name:value,
      full_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['basic_inf'] = basic_inf380e7,
        codeStates['setbasic_inf'] = setbasic_inf380e7,
        codeStates['full_name'] = full_name8acb5,
        codeStates['setfull_name'] = setfull_name8acb5,
        codeStates['cycle_name'] = cycle_name47492,
        codeStates['setcycle_name'] = setcycle_name47492,
        codeStates['review_number'] = review_number53b06,
        codeStates['setreview_number'] = setreview_number53b06,
        codeStates['review_type'] = review_typed590c,
        codeStates['setreview_type'] = setreview_typed590c,
        codeStates['review_status'] = review_status2c6ef,
        codeStates['setreview_status'] = setreview_status2c6ef,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
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
    if(access_req__group002d0?.full_name == "" || access_req__group002d0?.full_name == undefined){
      access_req__group002d0.full_name = "";
      const validate:any = v.safeParse(schema, access_req__group002d0?.full_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,full_name:"invalid"}}));
        }
    }else if(access_req__group002d0?.full_name !== ""){
    const validate:any = v.safeParse(schema, access_req__group002d0?.full_name);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,full_name:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,full_name:undefined}}));
      }
    }
  }
  const access_req__group002d0Ref = useRef<any>(access_req__group002d0);
  useEffect(() => { access_req__group002d0Ref.current = access_req__group002d0; }, [access_req__group002d0]);
    useEffect(()=>{
        if(!access_req__group002d0?.full_name)
        { 
          setaccess_req__group002d0Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "215412b1b36e453180a4b12188f8acb5") {
        handleClick(access_req__group002d0Ref?.current?.full_name8acb5?access_req__group002d0Ref?.current?.full_name8acb5:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "215412b1b36e453180a4b12188f8acb5");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group002d0((pre:any)=>({...pre,full_name:""}))
    else
      setInitialCount(1)
  },[full_name8acb5?.refresh])
  

  if (full_name8acb5?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `7 / 19`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {full_name8acb5?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Employees
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={full_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__group002d0?.full_name8acb5 ? [access_req__group002d0?.full_name8acb5] : (access_req__group002d0?.full_name ? dropdownValue : [])}
        validationState={validate?.viewPerformanceReview_v1?.full_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownfull_name;
