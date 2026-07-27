

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
const Dropdowncycle_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cycletypecombo_v1Props, setdfd_cycletypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf5851a, setbasic_inf5851a}= useContext(TotalContext) as TotalContextProps;
  const {cycle_codea33a6, setcycle_codea33a6}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namee6684, setcycle_namee6684}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type8f307, setcycle_type8f307}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [cycle_typeOptions, setcycle_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `perf_cycle_type`
    let mapperText: string =  `perf_cycle_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "071c2ad6b391e5265316b0c6f2dbdb89",
      "e28b4bc76b7306ca9b933e9818e8f307"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_cycletypecombo_v1Props.dstKey){
      dstKey = dfd_cycletypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_cycletypecombo_v1Props && !dfd_cycletypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcycle_typeOptions(temp);
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
  },[cycle_type8f307?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__groupbdb89((prev: any) => ({ ...prev,cycle_type8f307: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__groupbdb89;
      delete temp.cycle_type;
      delete temp.CYCLE_TYPE;
      delete temp.cycle_type8f307;
      setaccess_req__groupbdb89(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__groupbdb89.cycle_type){
      if(Array.isArray(dfd_cycletypecombo_v1Props)){
        if(dfd_cycletypecombo_v1Props?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)){
          setdropdownValue([dfd_cycletypecombo_v1Props?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)?.perf_cycle_type])
          tempValue=dfd_cycletypecombo_v1Props?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)?.perf_cycle_type
        }else{
          setdropdownValue([access_req__groupbdb89.cycle_type])
          tempValue=access_req__groupbdb89.cycle_type
        }
      }else{
        let dstKey:string = dfd_cycletypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{perf_cycle_type:access_req__groupbdb89.cycle_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)?.perf_cycle_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.perf_cycle_type === access_req__groupbdb89.cycle_type)?.perf_cycle_type
      }else{
        setdropdownValue([access_req__groupbdb89.cycle_type])
        tempValue=access_req__groupbdb89.cycle_type
      }   
      }
    }
    if(cycle_type8f307?.trigger == true)
    {
      await handlechange(tempValue)
      setcycle_type8f307((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__groupbdb89.cycle_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_cycletypecombo_v1Props) && dfd_cycletypecombo_v1Props?.length == 1){
    // setaccess_req__groupbdb89((pre:any)=>({...pre,cycle_type:dfd_cycletypecombo_v1Props[0]?.cycle_type}))
    }
  },[dfd_cycletypecombo_v1Props])

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
      setaccess_req__groupbdb89((prev: any) => ({ ...prev, cycle_type: getMapperDetailsBindValues[value],CYCLE_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__groupbdb89((prev: any) => ({ ...prev, cycle_type: '', cycle_type8f307: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.perf_cycle_type==getMapperDetailsBindValues[value] && items?.perf_cycle_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      perf_cycle_type:value,
      perf_cycle_type:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['basic_inf'] = basic_inf5851a,
        codeStates['setbasic_inf'] = setbasic_inf5851a,
        codeStates['cycle_code'] = cycle_codea33a6,
        codeStates['setcycle_code'] = setcycle_codea33a6,
        codeStates['cycle_name'] = cycle_namee6684,
        codeStates['setcycle_name'] = setcycle_namee6684,
        codeStates['cycle_type'] = cycle_type8f307,
        codeStates['setcycle_type'] = setcycle_type8f307,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
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
    if(access_req__groupbdb89?.cycle_type == "" || access_req__groupbdb89?.cycle_type == undefined){
      access_req__groupbdb89.cycle_type = "";
      const validate:any = v.safeParse(schema, access_req__groupbdb89?.cycle_type);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_type:"invalid"}}));
        }
    }else if(access_req__groupbdb89?.cycle_type !== ""){
    const validate:any = v.safeParse(schema, access_req__groupbdb89?.cycle_type);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_type:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,cycle_type:undefined}}));
      }
    }
  }
  const access_req__groupbdb89Ref = useRef<any>(access_req__groupbdb89);
  useEffect(() => { access_req__groupbdb89Ref.current = access_req__groupbdb89; }, [access_req__groupbdb89]);
    useEffect(()=>{
        if(!access_req__groupbdb89?.cycle_type)
        { 
          setaccess_req__groupbdb89Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "e28b4bc76b7306ca9b933e9818e8f307") {
        handleClick(access_req__groupbdb89Ref?.current?.cycle_type8f307?access_req__groupbdb89Ref?.current?.cycle_type8f307:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e28b4bc76b7306ca9b933e9818e8f307");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__groupbdb89((pre:any)=>({...pre,cycle_type:""}))
    else
      setInitialCount(1)
  },[cycle_type8f307?.refresh])
  

  if (cycle_type8f307?.isHidden) {
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
        disabled= {cycle_type8f307?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Cycle Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={cycle_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__groupbdb89?.cycle_type8f307 ? [access_req__groupbdb89?.cycle_type8f307] : (access_req__groupbdb89?.cycle_type ? dropdownValue : [])}
        validationState={validate?.newPerformanceCycle_v1?.cycle_type ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncycle_type;
