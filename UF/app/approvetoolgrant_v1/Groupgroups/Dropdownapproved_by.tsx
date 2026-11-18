

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
const Dropdownapproved_by = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_businessownercombo_v1Props, setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {texts951ea, settexts951ea}= useContext(TotalContext) as TotalContextProps;
  const {approved_by9359d, setapproved_by9359d}= useContext(TotalContext) as TotalContextProps;
  const {valid_from79806, setvalid_from79806}= useContext(TotalContext) as TotalContextProps;
  const {valid_to21a55, setvalid_to21a55}= useContext(TotalContext) as TotalContextProps;
  const {status2e5d0, setstatus2e5d0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [approved_byOptions, setapproved_byOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `business_owner_name`
    let mapperText: string =  `business_owner_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "958194d4e02f4eacb7adc2d8007ae790",
      "7d7a7de8df084870b7a1eac4bce9359d"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_businessownercombo_v1Props.dstKey){
      dstKey = dfd_businessownercombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_businessownercombo_v1Props && !dfd_businessownercombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setapproved_byOptions(temp);
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
  },[approved_by9359d?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgroupsae790((prev: any) => ({ ...prev,approved_by9359d: value }))
      setIsRequredData(false)
    }else{
      let temp:any = groupsae790;
      delete temp.approved_by_user_id;
      delete temp.APPROVED_BY_USER_ID;
      delete temp.approved_by9359d;
      setgroupsae790(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,approved_by_user_id:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(groupsae790.approved_by_user_id){
      if(Array.isArray(dfd_businessownercombo_v1Props)){
        if(dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)){
          setdropdownValue([dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)?.business_owner_name])
          tempValue=dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)?.business_owner_name
        }else{
          setdropdownValue([groupsae790.approved_by_user_id])
          tempValue=groupsae790.approved_by_user_id
        }
      }else{
        let dstKey:string = dfd_businessownercombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{business_owner_name:groupsae790.approved_by_user_id}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)?.business_owner_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === groupsae790.approved_by_user_id)?.business_owner_name
      }else{
        setdropdownValue([groupsae790.approved_by_user_id])
        tempValue=groupsae790.approved_by_user_id
      }   
      }
    }
    if(approved_by9359d?.trigger == true)
    {
      await handlechange(tempValue)
      setapproved_by9359d((pre:any)=>({...pre,trigger:false}))
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
  },[groupsae790.approved_by_user_id, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_businessownercombo_v1Props) && dfd_businessownercombo_v1Props?.length == 1){
    // setgroupsae790((pre:any)=>({...pre,approved_by_user_id:dfd_businessownercombo_v1Props[0]?.approved_by_user_id}))
    }
  },[dfd_businessownercombo_v1Props])

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
      setgroupsae790((prev: any) => ({ ...prev, approved_by_user_id: getMapperDetailsBindValues[value],APPROVED_BY_USER_ID: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgroupsae790((prev: any) => ({ ...prev, approved_by_user_id: '', approved_by9359d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,approved_by_user_id:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.business_owner_name==getMapperDetailsBindValues[value] && items?.business_owner_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      business_owner_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = group8f0c2,
        codeStates['setgroup'] = setgroup8f0c2,
        codeStates['group8f0c2'] = group8f0c2Props,
        codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
        codeStates['template_detail_group'] = template_detail_group410a7,
        codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
        codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
        codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
        codeStates['groups'] = groupsae790,
        codeStates['setgroups'] = setgroupsae790,
        codeStates['groupsae790'] = groupsae790Props,
        codeStates['setgroupsae790'] = setgroupsae790Props,
        codeStates['texts'] = texts951ea,
        codeStates['settexts'] = settexts951ea,
        codeStates['approved_by'] = approved_by9359d,
        codeStates['setapproved_by'] = setapproved_by9359d,
        codeStates['valid_from'] = valid_from79806,
        codeStates['setvalid_from'] = setvalid_from79806,
        codeStates['valid_to'] = valid_to21a55,
        codeStates['setvalid_to'] = setvalid_to21a55,
        codeStates['status'] = status2e5d0,
        codeStates['setstatus'] = setstatus2e5d0,
        codeStates['dynamicaction'] = dynamicaction9560b,
        codeStates['setdynamicaction'] = setdynamicaction9560b,
        codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
        codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const groupsae790Ref = useRef<any>(groupsae790);
  useEffect(() => { groupsae790Ref.current = groupsae790; }, [groupsae790]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "7d7a7de8df084870b7a1eac4bce9359d") {
        handleClick(groupsae790Ref?.current?.approved_by9359d?groupsae790Ref?.current?.approved_by9359d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "7d7a7de8df084870b7a1eac4bce9359d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroupsae790((pre:any)=>({...pre,approved_by_user_id:""}))
    else
      setInitialCount(1)
  },[approved_by9359d?.refresh])
  

  if (approved_by9359d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `11 / 25`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {approved_by9359d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Approved_by
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={approved_byOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={groupsae790?.approved_by9359d ? [groupsae790?.approved_by9359d] : (groupsae790?.approved_by_user_id ? dropdownValue : [])}
        validationState={validate?.approveToolGrant_v1?.approved_by_user_id ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownapproved_by;
