

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
const Dropdownreturn_reason_dropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_returnreasondfd_v1Props, setdfd_returnreasondfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupdd3f6, setgroupdd3f6}= useContext(TotalContext) as TotalContextProps;
  const {groupdd3f6Props, setgroupdd3f6Props}= useContext(TotalContext) as TotalContextProps;
  const {text574c6, settext574c6}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_dropdown6f51c, setreturn_reason_dropdown6f51c}= useContext(TotalContext) as TotalContextProps;
  const {closea52fd, setclosea52fd}= useContext(TotalContext) as TotalContextProps;
  const {savebe5ab, setsavebe5ab}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [return_reason_dropdownOptions, setreturn_reason_dropdownOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `reason`
    let mapperText: string =  `reason`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "da18ab071c7c4d43957d8fd1f9ddd3f6",
      "9ac6b4981efc4618825c61ea1d96f51c"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_returnreasondfd_v1Props.dstKey){
      dstKey = dfd_returnreasondfd_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_returnreasondfd_v1Props && !dfd_returnreasondfd_v1Props.hasLogicCenter && !dfdFlag) {
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
      setreturn_reason_dropdownOptions(temp);
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
  },[return_reason_dropdown6f51c?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgroupdd3f6((prev: any) => ({ ...prev,return_reason_dropdown6f51c: value }))
      setIsRequredData(false)
    }else{
      let temp:any = groupdd3f6;
      delete temp.return_reason_dropdown;
      delete temp.RETURN_REASON_DROPDOWN;
      delete temp.return_reason_dropdown6f51c;
      setgroupdd3f6(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,returnReasonPopUpUi_v1:{...pre?.returnReasonPopUpUi_v1,return_reason_dropdown:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(groupdd3f6.return_reason_dropdown){
      if(Array.isArray(dfd_returnreasondfd_v1Props)){
        if(dfd_returnreasondfd_v1Props?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)){
          setdropdownValue([dfd_returnreasondfd_v1Props?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)?.reason])
          tempValue=dfd_returnreasondfd_v1Props?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)?.reason
        }else{
          setdropdownValue([groupdd3f6.return_reason_dropdown])
          tempValue=groupdd3f6.return_reason_dropdown
        }
      }else{
        let dstKey:string = dfd_returnreasondfd_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{reason:groupdd3f6.return_reason_dropdown}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)?.reason ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.reason === groupdd3f6.return_reason_dropdown)?.reason
      }else{
        setdropdownValue([groupdd3f6.return_reason_dropdown])
        tempValue=groupdd3f6.return_reason_dropdown
      }   
      }
    }
    if(return_reason_dropdown6f51c?.trigger == true)
    {
      await handlechange(tempValue)
      setreturn_reason_dropdown6f51c((pre:any)=>({...pre,trigger:false}))
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
  },[groupdd3f6.return_reason_dropdown, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_returnreasondfd_v1Props) && dfd_returnreasondfd_v1Props?.length == 1){
    // setgroupdd3f6((pre:any)=>({...pre,return_reason_dropdown:dfd_returnreasondfd_v1Props[0]?.return_reason_dropdown}))
    }
  },[dfd_returnreasondfd_v1Props])

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
      setgroupdd3f6((prev: any) => ({ ...prev, return_reason_dropdown: getMapperDetailsBindValues[value],RETURN_REASON_DROPDOWN: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgroupdd3f6((prev: any) => ({ ...prev, return_reason_dropdown: '', return_reason_dropdown6f51c: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,returnReasonPopUpUi_v1:{...pre?.returnReasonPopUpUi_v1,return_reason_dropdown:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.reason==getMapperDetailsBindValues[value] && items?.reason==value)) || {}
    selected.current={
      ...selectedObj||{},
      reason:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupdd3f6,
        codeStates['setgroup'] = setgroupdd3f6,
        codeStates['groupdd3f6'] = groupdd3f6Props,
        codeStates['setgroupdd3f6'] = setgroupdd3f6Props,
        codeStates['text'] = text574c6,
        codeStates['settext'] = settext574c6,
        codeStates['return_reason_dropdown'] = return_reason_dropdown6f51c,
        codeStates['setreturn_reason_dropdown'] = setreturn_reason_dropdown6f51c,
        codeStates['close'] = closea52fd,
        codeStates['setclose'] = setclosea52fd,
        codeStates['save'] = savebe5ab,
        codeStates['setsave'] = setsavebe5ab,
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
    if(groupdd3f6?.return_reason_dropdown == "" || groupdd3f6?.return_reason_dropdown == undefined){
      groupdd3f6.return_reason_dropdown = "";
      const validate:any = v.safeParse(schema, groupdd3f6?.return_reason_dropdown);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,returnReasonPopUpUi_v1:{...pre?.returnReasonPopUpUi_v1,return_reason_dropdown:"invalid"}}));
        }
    }else if(groupdd3f6?.return_reason_dropdown !== ""){
    const validate:any = v.safeParse(schema, groupdd3f6?.return_reason_dropdown);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,returnReasonPopUpUi_v1:{...pre?.returnReasonPopUpUi_v1,return_reason_dropdown:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,returnReasonPopUpUi_v1:{...pre?.returnReasonPopUpUi_v1,return_reason_dropdown:undefined}}));
      }
    }
  }
  const groupdd3f6Ref = useRef<any>(groupdd3f6);
  useEffect(() => { groupdd3f6Ref.current = groupdd3f6; }, [groupdd3f6]);
    useEffect(()=>{
        if(!groupdd3f6?.return_reason_dropdown)
        { 
          setgroupdd3f6Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "9ac6b4981efc4618825c61ea1d96f51c") {
        handleClick(groupdd3f6Ref?.current?.return_reason_dropdown6f51c?groupdd3f6Ref?.current?.return_reason_dropdown6f51c:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9ac6b4981efc4618825c61ea1d96f51c");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroupdd3f6((pre:any)=>({...pre,return_reason_dropdown:""}))
    else
      setInitialCount(1)
  },[return_reason_dropdown6f51c?.refresh])
  

  if (return_reason_dropdown6f51c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `2 / 24`,
        gridRow: `9 / 19`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {return_reason_dropdown6f51c?.isDisabled ? true : false}
        contentAlign={"center"}
        static={true}
        staticProps={return_reason_dropdownOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={groupdd3f6?.return_reason_dropdown6f51c ? [groupdd3f6?.return_reason_dropdown6f51c] : (groupdd3f6?.return_reason_dropdown ? dropdownValue : [])}
        validationState={validate?.returnReasonPopUpUi_v1?.return_reason_dropdown ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownreturn_reason_dropdown;
