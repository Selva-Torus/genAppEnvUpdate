

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
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
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
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
const Dropdownstatus_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statuscodecombo_v1Props, setdfd_statuscodecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule9eda4, setinfo_rule9eda4}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef85b6, setstage_namef85b6}= useContext(TotalContext) as TotalContextProps;
  const {status_codeb8e30, setstatus_codeb8e30}= useContext(TotalContext) as TotalContextProps;
  const {condition_text4da2f, setcondition_text4da2f}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [status_codeOptions, setstatus_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `code`
    let mapperText: string =  `display_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "5cda5668c9e05cd0c1c49d447b385ee1",
      "e0357ba92eb1a5edaa904fdfe86b8e30"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_statuscodecombo_v1Props.dstKey){
      dstKey = dfd_statuscodecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_statuscodecombo_v1Props && !dfd_statuscodecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setstatus_codeOptions(temp);
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
  },[status_codeb8e30?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgroup85ee1((prev: any) => ({ ...prev,status_codeb8e30: value }))
      setIsRequredData(false)
    }else{
      let temp:any = group85ee1;
      delete temp.status_code;
      delete temp.STATUS_CODE;
      delete temp.status_codeb8e30;
      setgroup85ee1(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,status_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(group85ee1.status_code){
      if(Array.isArray(dfd_statuscodecombo_v1Props)){
        if(dfd_statuscodecombo_v1Props?.find((item: any) => item.display_name === group85ee1.status_code)){
          setdropdownValue([dfd_statuscodecombo_v1Props?.find((item: any) => item.display_name === group85ee1.status_code)?.code])
          tempValue=dfd_statuscodecombo_v1Props?.find((item: any) => item.display_name === group85ee1.status_code)?.code
        }else{
          setdropdownValue([group85ee1.status_code])
          tempValue=group85ee1.status_code
        }
      }else{
        let dstKey:string = dfd_statuscodecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{display_name:group85ee1.status_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.display_name === group85ee1.status_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.display_name === group85ee1.status_code)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.display_name === group85ee1.status_code)?.code
      }else{
        setdropdownValue([group85ee1.status_code])
        tempValue=group85ee1.status_code
      }   
      }
    }
    if(status_codeb8e30?.trigger == true)
    {
      await handlechange(tempValue)
      setstatus_codeb8e30((pre:any)=>({...pre,trigger:false}))
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
  },[group85ee1.status_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_statuscodecombo_v1Props) && dfd_statuscodecombo_v1Props?.length == 1){
    // setgroup85ee1((pre:any)=>({...pre,status_code:dfd_statuscodecombo_v1Props[0]?.status_code}))
    }
  },[dfd_statuscodecombo_v1Props])

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
      setgroup85ee1((prev: any) => ({ ...prev, status_code: getMapperDetailsBindValues[value],STATUS_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgroup85ee1((prev: any) => ({ ...prev, status_code: '', status_codeb8e30: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,status_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.display_name==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:value,
      display_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['info_rule'] = info_rule9eda4,
        codeStates['setinfo_rule'] = setinfo_rule9eda4,
        codeStates['stage_name'] = stage_namef85b6,
        codeStates['setstage_name'] = setstage_namef85b6,
        codeStates['status_code'] = status_codeb8e30,
        codeStates['setstatus_code'] = setstatus_codeb8e30,
        codeStates['condition_text'] = condition_text4da2f,
        codeStates['setcondition_text'] = setcondition_text4da2f,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
    }
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
    if(group85ee1?.status_code == "" || group85ee1?.status_code == undefined){
      group85ee1.status_code = "";
      const validate:any = v.safeParse(schema, group85ee1?.status_code);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,status_code:"invalid"}}));
        }
    }else if(group85ee1?.status_code !== ""){
    const validate:any = v.safeParse(schema, group85ee1?.status_code);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,status_code:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,status_code:undefined}}));
      }
    }
  }
  const group85ee1Ref = useRef<any>(group85ee1);
  useEffect(() => { group85ee1Ref.current = group85ee1; }, [group85ee1]);
    useEffect(()=>{
        if(!group85ee1?.status_code)
        { 
          setgroup85ee1Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "e0357ba92eb1a5edaa904fdfe86b8e30") {
        handleClick(group85ee1Ref?.current?.status_codeb8e30?group85ee1Ref?.current?.status_codeb8e30:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e0357ba92eb1a5edaa904fdfe86b8e30");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroup85ee1((pre:any)=>({...pre,status_code:""}))
    else
      setInitialCount(1)
  },[status_codeb8e30?.refresh])
  

  if (status_codeb8e30?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `14 / 25`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {status_codeb8e30?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={status_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={group85ee1?.status_codeb8e30 ? [group85ee1?.status_codeb8e30] : (group85ee1?.status_code ? dropdownValue : [])}
        validationState={validate?.addCertificationCondition_v1?.status_code ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownstatus_code;
