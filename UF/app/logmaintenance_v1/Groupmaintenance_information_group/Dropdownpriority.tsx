

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
const Dropdownpriority = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_text37a24, setmaintenance_information_text37a24}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec21fd, setasset_namec21fd}= useContext(TotalContext) as TotalContextProps;
  const {maint_typea5ba4, setmaint_typea5ba4}= useContext(TotalContext) as TotalContextProps;
  const {priorityec586, setpriorityec586}= useContext(TotalContext) as TotalContextProps;
  const {scheduled_date83e9d, setscheduled_date83e9d}= useContext(TotalContext) as TotalContextProps;
  const {completed_dated052f, setcompleted_dated052f}= useContext(TotalContext) as TotalContextProps;
  const {next_maintenance_datee871a, setnext_maintenance_datee871a}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [priorityOptions, setpriorityOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `priority`
    let mapperText: string =  `priority`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "72ef8f904ecb42bd9310191c694ea3ac",
      "ee9217ee7fe1447794ec8583779ec586"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_prioritycombo_v1Props.dstKey){
      dstKey = dfd_prioritycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_prioritycombo_v1Props && !dfd_prioritycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setpriorityOptions(temp);
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
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
  },[priorityec586?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, priority: getMapperDetailsBindValues[value],priorityec586: value,PRIORITY: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = maintenance_information_groupea3ac;
      delete temp.priority;
      delete temp.PRIORITY;
      delete temp.priorityec586;
      setmaintenance_information_groupea3ac(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,priority:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(maintenance_information_groupea3ac.priority){
      if(Array.isArray(dfd_prioritycombo_v1Props)){
        if(dfd_prioritycombo_v1Props?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)){
          setdropdownValue([dfd_prioritycombo_v1Props?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)?.priority])
          tempValue=dfd_prioritycombo_v1Props?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)?.priority
        }else{
          setdropdownValue([maintenance_information_groupea3ac.priority])
          tempValue=maintenance_information_groupea3ac.priority
        }
      }else{
        let dstKey:string = dfd_prioritycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{priority:maintenance_information_groupea3ac.priority}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)?.priority ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.priority === maintenance_information_groupea3ac.priority)?.priority
      }else{
        setdropdownValue([maintenance_information_groupea3ac.priority])
        tempValue=maintenance_information_groupea3ac.priority
      }   
      }
    }
    if(priorityec586?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setpriorityec586((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[maintenance_information_groupea3ac.priority, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_prioritycombo_v1Props) && dfd_prioritycombo_v1Props?.length == 1){
    // setmaintenance_information_groupea3ac((pre:any)=>({...pre,priority:dfd_prioritycombo_v1Props[0]?.priority}))
    }
  },[dfd_prioritycombo_v1Props])

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
      setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, priority: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setmaintenance_information_groupea3ac((prev: any) => ({ ...prev, priority: '', priorityec586: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,priority:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.priority==getMapperDetailsBindValues[value] && items?.priority==value)) || {}
    selected.current={
      ...selectedObj||{},
      priority:value,
      priority:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['maintenance_information_text'] = maintenance_information_text37a24,
        codeStates['setmaintenance_information_text'] = setmaintenance_information_text37a24,
        codeStates['asset_name'] = asset_namec21fd,
        codeStates['setasset_name'] = setasset_namec21fd,
        codeStates['maint_type'] = maint_typea5ba4,
        codeStates['setmaint_type'] = setmaint_typea5ba4,
        codeStates['priority'] = priorityec586,
        codeStates['setpriority'] = setpriorityec586,
        codeStates['scheduled_date'] = scheduled_date83e9d,
        codeStates['setscheduled_date'] = setscheduled_date83e9d,
        codeStates['completed_date'] = completed_dated052f,
        codeStates['setcompleted_date'] = setcompleted_dated052f,
        codeStates['next_maintenance_date'] = next_maintenance_datee871a,
        codeStates['setnext_maintenance_date'] = setnext_maintenance_datee871a,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
      if(maintenance_information_groupea3ac?.priority == "" || maintenance_information_groupea3ac?.priority == undefined){
      maintenance_information_groupea3ac.priority = "";
      const validate:any = v.safeParse(schema, maintenance_information_groupea3ac?.priority);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,priority:"invalid"}}));
        }
    }else if(maintenance_information_groupea3ac?.priority !== ""){
    const validate:any = v.safeParse(schema, maintenance_information_groupea3ac?.priority);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,priority:"invalid"}}));
    }
    }
  }
  const maintenance_information_groupea3acRef = useRef<any>(maintenance_information_groupea3ac);
  useEffect(() => { maintenance_information_groupea3acRef.current = maintenance_information_groupea3ac; }, [maintenance_information_groupea3ac]);
    useEffect(()=>{
        if(!maintenance_information_groupea3ac?.priority)
        { 
          setmaintenance_information_groupea3acProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "ee9217ee7fe1447794ec8583779ec586") {
        handleClick(maintenance_information_groupea3acRef?.current?.priorityec586?maintenance_information_groupea3acRef?.current?.priorityec586:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "ee9217ee7fe1447794ec8583779ec586");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setmaintenance_information_groupea3ac((pre:any)=>({...pre,priority:""}))
    else
      setInitialCount(1)
  },[priorityec586?.refresh])

  if (priorityec586?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {priorityec586?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Priority
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={priorityOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={maintenance_information_groupea3ac?.priorityec586 ? [maintenance_information_groupea3ac?.priorityec586] : (maintenance_information_groupea3ac?.priority ? dropdownValue : [])}
        validationState={validate?.logMaintenance_v1?.priority ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownpriority;
