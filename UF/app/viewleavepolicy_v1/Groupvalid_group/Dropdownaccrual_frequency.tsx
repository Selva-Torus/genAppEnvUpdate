

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
const Dropdownaccrual_frequency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accrualfrequencycombo_v1Props, setdfd_accrualfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_entity44a9e, setleave_entity44a9e}= useContext(TotalContext) as TotalContextProps;
  const {days_per_year540db, setdays_per_year540db}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_days069b8, setcarry_forward_days069b8}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_expiry2db6d, setcarry_forward_expiry2db6d}= useContext(TotalContext) as TotalContextProps;
  const {accrual_frequency7324d, setaccrual_frequency7324d}= useContext(TotalContext) as TotalContextProps;
  const {max_consecutive_days47fe8, setmax_consecutive_days47fe8}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [accrual_frequencyOptions, setaccrual_frequencyOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `accrual_frequency`
    let mapperText: string =  `accrual_frequency`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "844ad10a3f3090d34b205744d9d60f4e",
      "9820493ad8b4f6ab6d7d64859457324d"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_accrualfrequencycombo_v1Props.dstKey){
      dstKey = dfd_accrualfrequencycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_accrualfrequencycombo_v1Props && !dfd_accrualfrequencycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setaccrual_frequencyOptions(temp);
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
  },[accrual_frequency7324d?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setvalid_group60f4e((prev: any) => ({ ...prev,accrual_frequency7324d: value }))
      setIsRequredData(false)
    }else{
      let temp:any = valid_group60f4e;
      delete temp.accrual_frequency;
      delete temp.ACCRUAL_FREQUENCY;
      delete temp.accrual_frequency7324d;
      setvalid_group60f4e(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewLeavePolicy_v1:{...pre?.viewLeavePolicy_v1,accrual_frequency:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(valid_group60f4e.accrual_frequency){
      if(Array.isArray(dfd_accrualfrequencycombo_v1Props)){
        if(dfd_accrualfrequencycombo_v1Props?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)){
          setdropdownValue([dfd_accrualfrequencycombo_v1Props?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)?.accrual_frequency])
          tempValue=dfd_accrualfrequencycombo_v1Props?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)?.accrual_frequency
        }else{
          setdropdownValue([valid_group60f4e.accrual_frequency])
          tempValue=valid_group60f4e.accrual_frequency
        }
      }else{
        let dstKey:string = dfd_accrualfrequencycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{accrual_frequency:valid_group60f4e.accrual_frequency}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)?.accrual_frequency ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.accrual_frequency === valid_group60f4e.accrual_frequency)?.accrual_frequency
      }else{
        setdropdownValue([valid_group60f4e.accrual_frequency])
        tempValue=valid_group60f4e.accrual_frequency
      }   
      }
    }
    if(accrual_frequency7324d?.trigger == true)
    {
      await handlechange(tempValue)
      setaccrual_frequency7324d((pre:any)=>({...pre,trigger:false}))
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
  },[valid_group60f4e.accrual_frequency, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_accrualfrequencycombo_v1Props) && dfd_accrualfrequencycombo_v1Props?.length == 1){
    // setvalid_group60f4e((pre:any)=>({...pre,accrual_frequency:dfd_accrualfrequencycombo_v1Props[0]?.accrual_frequency}))
    }
  },[dfd_accrualfrequencycombo_v1Props])

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
      setvalid_group60f4e((prev: any) => ({ ...prev, accrual_frequency: getMapperDetailsBindValues[value],ACCRUAL_FREQUENCY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setvalid_group60f4e((prev: any) => ({ ...prev, accrual_frequency: '', accrual_frequency7324d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewLeavePolicy_v1:{...pre?.viewLeavePolicy_v1,accrual_frequency:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.accrual_frequency==getMapperDetailsBindValues[value] && items?.accrual_frequency==value)) || {}
    selected.current={
      ...selectedObj||{},
      accrual_frequency:value,
      accrual_frequency:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_group193d2,
        codeStates['setnew_access_group'] = setnew_access_group193d2,
        codeStates['new_access_group193d2'] = new_access_group193d2Props,
        codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
        codeStates['access_req__group'] = access_req__groupc57b7,
        codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
        codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
        codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
        codeStates['app_inf_group'] = app_inf_group60e94,
        codeStates['setapp_inf_group'] = setapp_inf_group60e94,
        codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
        codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
        codeStates['approve_group'] = approve_group27e47,
        codeStates['setapprove_group'] = setapprove_group27e47,
        codeStates['approve_group27e47'] = approve_group27e47Props,
        codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
        codeStates['valid_group'] = valid_group60f4e,
        codeStates['setvalid_group'] = setvalid_group60f4e,
        codeStates['valid_group60f4e'] = valid_group60f4eProps,
        codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
        codeStates['leave_entity'] = leave_entity44a9e,
        codeStates['setleave_entity'] = setleave_entity44a9e,
        codeStates['days_per_year'] = days_per_year540db,
        codeStates['setdays_per_year'] = setdays_per_year540db,
        codeStates['carry_forward_days'] = carry_forward_days069b8,
        codeStates['setcarry_forward_days'] = setcarry_forward_days069b8,
        codeStates['carry_forward_expiry'] = carry_forward_expiry2db6d,
        codeStates['setcarry_forward_expiry'] = setcarry_forward_expiry2db6d,
        codeStates['accrual_frequency'] = accrual_frequency7324d,
        codeStates['setaccrual_frequency'] = setaccrual_frequency7324d,
        codeStates['max_consecutive_days'] = max_consecutive_days47fe8,
        codeStates['setmax_consecutive_days'] = setmax_consecutive_days47fe8,
        codeStates['business_just__group'] = business_just__group4dcdb,
        codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
        codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
        codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
        codeStates['provision_group'] = provision_group68072,
        codeStates['setprovision_group'] = setprovision_group68072,
        codeStates['provision_group68072'] = provision_group68072Props,
        codeStates['setprovision_group68072'] = setprovision_group68072Props,
        codeStates['leave_rule_group'] = leave_rule_group1e665,
        codeStates['setleave_rule_group'] = setleave_rule_group1e665,
        codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
        codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,
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
  const valid_group60f4eRef = useRef<any>(valid_group60f4e);
  useEffect(() => { valid_group60f4eRef.current = valid_group60f4e; }, [valid_group60f4e]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "9820493ad8b4f6ab6d7d64859457324d") {
        handleClick(valid_group60f4eRef?.current?.accrual_frequency7324d?valid_group60f4eRef?.current?.accrual_frequency7324d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9820493ad8b4f6ab6d7d64859457324d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setvalid_group60f4e((pre:any)=>({...pre,accrual_frequency:""}))
    else
      setInitialCount(1)
  },[accrual_frequency7324d?.refresh])
  

  if (accrual_frequency7324d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 7`,
        gridRow: `21 / 33`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {accrual_frequency7324d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Accrual Frequency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={accrual_frequencyOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={valid_group60f4e?.accrual_frequency7324d ? [valid_group60f4e?.accrual_frequency7324d] : (valid_group60f4e?.accrual_frequency ? dropdownValue : [])}
        validationState={validate?.viewLeavePolicy_v1?.accrual_frequency ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownaccrual_frequency;
