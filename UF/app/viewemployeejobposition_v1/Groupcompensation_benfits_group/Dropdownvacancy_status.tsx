

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
const Dropdownvacancy_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vacancystatuscombo_v1Props, setdfd_vacancystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text16f4a, setstaffing_compensation_text16f4a}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min31c0f, setsalary_range_min31c0f}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxb8794, setsalary_range_maxb8794}= useContext(TotalContext) as TotalContextProps;
  const {headcount4c5a4, setheadcount4c5a4}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount53c3b, setapproved_headcount53c3b}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount35c2c, setfilled_headcount35c2c}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status83fc0, setvacancy_status83fc0}= useContext(TotalContext) as TotalContextProps;
  const {remote_alloweda2944, setremote_alloweda2944}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredee204, settravel_requiredee204}= useContext(TotalContext) as TotalContextProps;
  const {is_open9bbae, setis_open9bbae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [vacancy_statusOptions, setvacancy_statusOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `vacancy_status`
    let mapperText: string =  `vacancy_status`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "2a5944178febfa18e4be375d2920d8fe",
      "0f4c19ee61c6d416d7a769c16aa83fc0"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_vacancystatuscombo_v1Props.dstKey){
      dstKey = dfd_vacancystatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_vacancystatuscombo_v1Props && !dfd_vacancystatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setvacancy_statusOptions(temp);
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
  },[vacancy_status83fc0?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev,vacancy_status83fc0: value }))
      setIsRequredData(false)
    }else{
      let temp:any = compensation_benfits_group0d8fe;
      delete temp.vacancy_status;
      delete temp.VACANCY_STATUS;
      delete temp.vacancy_status83fc0;
      setcompensation_benfits_group0d8fe(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,vacancy_status:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(compensation_benfits_group0d8fe.vacancy_status){
      if(Array.isArray(dfd_vacancystatuscombo_v1Props)){
        if(dfd_vacancystatuscombo_v1Props?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)){
          setdropdownValue([dfd_vacancystatuscombo_v1Props?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)?.vacancy_status])
          tempValue=dfd_vacancystatuscombo_v1Props?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)?.vacancy_status
        }else{
          setdropdownValue([compensation_benfits_group0d8fe.vacancy_status])
          tempValue=compensation_benfits_group0d8fe.vacancy_status
        }
      }else{
        let dstKey:string = dfd_vacancystatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{vacancy_status:compensation_benfits_group0d8fe.vacancy_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)?.vacancy_status ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.vacancy_status === compensation_benfits_group0d8fe.vacancy_status)?.vacancy_status
      }else{
        setdropdownValue([compensation_benfits_group0d8fe.vacancy_status])
        tempValue=compensation_benfits_group0d8fe.vacancy_status
      }   
      }
    }
    if(vacancy_status83fc0?.trigger == true)
    {
      await handlechange(tempValue)
      setvacancy_status83fc0((pre:any)=>({...pre,trigger:false}))
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
  },[compensation_benfits_group0d8fe.vacancy_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_vacancystatuscombo_v1Props) && dfd_vacancystatuscombo_v1Props?.length == 1){
    // setcompensation_benfits_group0d8fe((pre:any)=>({...pre,vacancy_status:dfd_vacancystatuscombo_v1Props[0]?.vacancy_status}))
    }
  },[dfd_vacancystatuscombo_v1Props])

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
      setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev, vacancy_status: getMapperDetailsBindValues[value],VACANCY_STATUS: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setcompensation_benfits_group0d8fe((prev: any) => ({ ...prev, vacancy_status: '', vacancy_status83fc0: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,vacancy_status:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.vacancy_status==getMapperDetailsBindValues[value] && items?.vacancy_status==value)) || {}
    selected.current={
      ...selectedObj||{},
      vacancy_status:value,
      vacancy_status:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['staffing_compensation_text'] = staffing_compensation_text16f4a,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text16f4a,
        codeStates['salary_range_min'] = salary_range_min31c0f,
        codeStates['setsalary_range_min'] = setsalary_range_min31c0f,
        codeStates['salary_range_max'] = salary_range_maxb8794,
        codeStates['setsalary_range_max'] = setsalary_range_maxb8794,
        codeStates['headcount'] = headcount4c5a4,
        codeStates['setheadcount'] = setheadcount4c5a4,
        codeStates['approved_headcount'] = approved_headcount53c3b,
        codeStates['setapproved_headcount'] = setapproved_headcount53c3b,
        codeStates['filled_headcount'] = filled_headcount35c2c,
        codeStates['setfilled_headcount'] = setfilled_headcount35c2c,
        codeStates['vacancy_status'] = vacancy_status83fc0,
        codeStates['setvacancy_status'] = setvacancy_status83fc0,
        codeStates['remote_allowed'] = remote_alloweda2944,
        codeStates['setremote_allowed'] = setremote_alloweda2944,
        codeStates['travel_required'] = travel_requiredee204,
        codeStates['settravel_required'] = settravel_requiredee204,
        codeStates['is_open'] = is_open9bbae,
        codeStates['setis_open'] = setis_open9bbae,
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
    if(compensation_benfits_group0d8fe?.vacancy_status == "" || compensation_benfits_group0d8fe?.vacancy_status == undefined){
      compensation_benfits_group0d8fe.vacancy_status = "";
      const validate:any = v.safeParse(schema, compensation_benfits_group0d8fe?.vacancy_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,vacancy_status:"invalid"}}));
        }
    }else if(compensation_benfits_group0d8fe?.vacancy_status !== ""){
    const validate:any = v.safeParse(schema, compensation_benfits_group0d8fe?.vacancy_status);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,vacancy_status:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,vacancy_status:undefined}}));
      }
    }
  }
  const compensation_benfits_group0d8feRef = useRef<any>(compensation_benfits_group0d8fe);
  useEffect(() => { compensation_benfits_group0d8feRef.current = compensation_benfits_group0d8fe; }, [compensation_benfits_group0d8fe]);
    useEffect(()=>{
        if(!compensation_benfits_group0d8fe?.vacancy_status)
        { 
          setcompensation_benfits_group0d8feProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "0f4c19ee61c6d416d7a769c16aa83fc0") {
        handleClick(compensation_benfits_group0d8feRef?.current?.vacancy_status83fc0?compensation_benfits_group0d8feRef?.current?.vacancy_status83fc0:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "0f4c19ee61c6d416d7a769c16aa83fc0");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcompensation_benfits_group0d8fe((pre:any)=>({...pre,vacancy_status:""}))
    else
      setInitialCount(1)
  },[vacancy_status83fc0?.refresh])
  

  if (vacancy_status83fc0?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `7 / 13`,
        gridRow: `24 / 38`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {vacancy_status83fc0?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Vacancy Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={vacancy_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={compensation_benfits_group0d8fe?.vacancy_status83fc0 ? [compensation_benfits_group0d8fe?.vacancy_status83fc0] : (compensation_benfits_group0d8fe?.vacancy_status ? dropdownValue : [])}
        validationState={validate?.viewEmployeeJobPosition_v1?.vacancy_status ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownvacancy_status;
