

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
const Dropdownsource_category_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_sourcecategorycombo_v1Props, setdfd_sourcecategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_group9cddc, setadd_group9cddc}= useContext(TotalContext) as TotalContextProps;
  const {add_group9cddcProps, setadd_group9cddcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfd, setsource_details_grp23dfd}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfdProps, setsource_details_grp23dfdProps}= useContext(TotalContext) as TotalContextProps;
  const {source_detail_textaaaf2, setsource_detail_textaaaf2}= useContext(TotalContext) as TotalContextProps;
  const {source_code94d5a, setsource_code94d5a}= useContext(TotalContext) as TotalContextProps;
  const {source_nameec826, setsource_nameec826}= useContext(TotalContext) as TotalContextProps;
  const {source_category_codefd590, setsource_category_codefd590}= useContext(TotalContext) as TotalContextProps;
  const {connector_type_code9620d, setconnector_type_code9620d}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616a, setconnect_group3616a}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616aProps, setconnect_group3616aProps}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aeb, setscheduler_retry_grp90aeb}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aebProps, setscheduler_retry_grp90aebProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249, setownership_ststus_grp32249}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249Props, setownership_ststus_grp32249Props}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98, setlast_run_grpa6d98}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98Props, setlast_run_grpa6d98Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6, setdynamicactions2cac6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6Props, setdynamicactions2cac6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [source_category_codeOptions, setsource_category_codeOptions] = useState<string[]>([]);
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
      "1db44e8af89f4ac7aec2c096fa723dfd",
      "e2903b281a214d7d89b121225e3fd590"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_sourcecategorycombo_v1Props.dstKey){
      dstKey = dfd_sourcecategorycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_sourcecategorycombo_v1Props && !dfd_sourcecategorycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setsource_category_codeOptions(temp);
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
  },[source_category_codefd590?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setsource_details_grp23dfd((prev: any) => ({ ...prev,source_category_codefd590: value }))
      setIsRequredData(false)
    }else{
      let temp:any = source_details_grp23dfd;
      delete temp.source_category_code;
      delete temp.SOURCE_CATEGORY_CODE;
      delete temp.source_category_codefd590;
      setsource_details_grp23dfd(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addIntegrationSource_v1:{...pre?.addIntegrationSource_v1,source_category_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(source_details_grp23dfd.source_category_code){
      if(Array.isArray(dfd_sourcecategorycombo_v1Props)){
        if(dfd_sourcecategorycombo_v1Props?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)){
          setdropdownValue([dfd_sourcecategorycombo_v1Props?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)?.code])
          tempValue=dfd_sourcecategorycombo_v1Props?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)?.code
        }else{
          setdropdownValue([source_details_grp23dfd.source_category_code])
          tempValue=source_details_grp23dfd.source_category_code
        }
      }else{
        let dstKey:string = dfd_sourcecategorycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{display_name:source_details_grp23dfd.source_category_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.display_name === source_details_grp23dfd.source_category_code)?.code
      }else{
        setdropdownValue([source_details_grp23dfd.source_category_code])
        tempValue=source_details_grp23dfd.source_category_code
      }   
      }
    }
    if(source_category_codefd590?.trigger == true)
    {
      await handlechange(tempValue)
      setsource_category_codefd590((pre:any)=>({...pre,trigger:false}))
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
  },[source_details_grp23dfd.source_category_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_sourcecategorycombo_v1Props) && dfd_sourcecategorycombo_v1Props?.length == 1){
    // setsource_details_grp23dfd((pre:any)=>({...pre,source_category_code:dfd_sourcecategorycombo_v1Props[0]?.source_category_code}))
    }
  },[dfd_sourcecategorycombo_v1Props])

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
      setsource_details_grp23dfd((prev: any) => ({ ...prev, source_category_code: getMapperDetailsBindValues[value],SOURCE_CATEGORY_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setsource_details_grp23dfd((prev: any) => ({ ...prev, source_category_code: '', source_category_codefd590: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addIntegrationSource_v1:{...pre?.addIntegrationSource_v1,source_category_code:undefined}}));
   
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
        codeStates['add_group'] = add_group9cddc,
        codeStates['setadd_group'] = setadd_group9cddc,
        codeStates['add_group9cddc'] = add_group9cddcProps,
        codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
        codeStates['source_details_grp'] = source_details_grp23dfd,
        codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
        codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
        codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
        codeStates['source_detail_text'] = source_detail_textaaaf2,
        codeStates['setsource_detail_text'] = setsource_detail_textaaaf2,
        codeStates['source_code'] = source_code94d5a,
        codeStates['setsource_code'] = setsource_code94d5a,
        codeStates['source_name'] = source_nameec826,
        codeStates['setsource_name'] = setsource_nameec826,
        codeStates['source_category_code'] = source_category_codefd590,
        codeStates['setsource_category_code'] = setsource_category_codefd590,
        codeStates['connector_type_code'] = connector_type_code9620d,
        codeStates['setconnector_type_code'] = setconnector_type_code9620d,
        codeStates['connect_group'] = connect_group3616a,
        codeStates['setconnect_group'] = setconnect_group3616a,
        codeStates['connect_group3616a'] = connect_group3616aProps,
        codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
        codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
        codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
        codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
        codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
        codeStates['last_run_grp'] = last_run_grpa6d98,
        codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
        codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
        codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
        codeStates['dynamicactions'] = dynamicactions2cac6,
        codeStates['setdynamicactions'] = setdynamicactions2cac6,
        codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
        codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,
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
  const source_details_grp23dfdRef = useRef<any>(source_details_grp23dfd);
  useEffect(() => { source_details_grp23dfdRef.current = source_details_grp23dfd; }, [source_details_grp23dfd]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "e2903b281a214d7d89b121225e3fd590") {
        handleClick(source_details_grp23dfdRef?.current?.source_category_codefd590?source_details_grp23dfdRef?.current?.source_category_codefd590:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e2903b281a214d7d89b121225e3fd590");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setsource_details_grp23dfd((pre:any)=>({...pre,source_category_code:""}))
    else
      setInitialCount(1)
  },[source_category_codefd590?.refresh])
  

  if (source_category_codefd590?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `21 / 33`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {source_category_codefd590?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={source_category_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={source_details_grp23dfd?.source_category_codefd590 ? [source_details_grp23dfd?.source_category_codefd590] : (source_details_grp23dfd?.source_category_code ? dropdownValue : [])}
        validationState={validate?.addIntegrationSource_v1?.source_category_code ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownsource_category_code;
