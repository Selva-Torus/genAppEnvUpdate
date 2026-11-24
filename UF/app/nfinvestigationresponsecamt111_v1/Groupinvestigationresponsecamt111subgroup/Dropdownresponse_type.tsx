

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
const Dropdownresponse_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfresponsetypecombo_v1Props, setdfd_nfresponsetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {investigationresponsecamt111maingroup058ec, setinvestigationresponsecamt111maingroup058ec}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111maingroup058ecProps, setinvestigationresponsecamt111maingroup058ecProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5, setinvestigationresponsecamt111subgroupafab5}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5Props, setinvestigationresponsecamt111subgroupafab5Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date51032, settran_date51032}= useContext(TotalContext) as TotalContextProps;
  const {message_code3e093, setmessage_code3e093}= useContext(TotalContext) as TotalContextProps;
  const {response_type65b90, setresponse_type65b90}= useContext(TotalContext) as TotalContextProps;
  const {response_reason7039a, setresponse_reason7039a}= useContext(TotalContext) as TotalContextProps;
  const {reason_descriptiond33de, setreason_descriptiond33de}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeed, setinvestigationresponsecamt111dynamicactionsceeed}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeedProps, setinvestigationresponsecamt111dynamicactionsceeedProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [response_typeOptions, setresponse_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `description`
    let mapperText: string =  `code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "dcf99be43c68bc746c27e738db2afab5",
      "5f98d2a107f1f7cca007adb68b465b90"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_nfresponsetypecombo_v1Props.dstKey){
      dstKey = dfd_nfresponsetypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_nfresponsetypecombo_v1Props && !dfd_nfresponsetypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setresponse_typeOptions(temp);
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
  },[response_type65b90?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev,response_type65b90: value }))
      setIsRequredData(false)
    }else{
      let temp:any = investigationresponsecamt111subgroupafab5;
      delete temp.response_type;
      delete temp.RESPONSE_TYPE;
      delete temp.response_type65b90;
      setinvestigationresponsecamt111subgroupafab5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,nfInvestigationResponseCamt111_v1:{...pre?.nfInvestigationResponseCamt111_v1,response_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(investigationresponsecamt111subgroupafab5.response_type){
      if(Array.isArray(dfd_nfresponsetypecombo_v1Props)){
        if(dfd_nfresponsetypecombo_v1Props?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)){
          setdropdownValue([dfd_nfresponsetypecombo_v1Props?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)?.description])
          tempValue=dfd_nfresponsetypecombo_v1Props?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)?.description
        }else{
          setdropdownValue([investigationresponsecamt111subgroupafab5.response_type])
          tempValue=investigationresponsecamt111subgroupafab5.response_type
        }
      }else{
        let dstKey:string = dfd_nfresponsetypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:investigationresponsecamt111subgroupafab5.response_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)?.description ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === investigationresponsecamt111subgroupafab5.response_type)?.description
      }else{
        setdropdownValue([investigationresponsecamt111subgroupafab5.response_type])
        tempValue=investigationresponsecamt111subgroupafab5.response_type
      }   
      }
    }
    if(response_type65b90?.trigger == true)
    {
      await handlechange(tempValue)
      setresponse_type65b90((pre:any)=>({...pre,trigger:false}))
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
  },[investigationresponsecamt111subgroupafab5.response_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_nfresponsetypecombo_v1Props) && dfd_nfresponsetypecombo_v1Props?.length == 1){
    // setinvestigationresponsecamt111subgroupafab5((pre:any)=>({...pre,response_type:dfd_nfresponsetypecombo_v1Props[0]?.response_type}))
    }
  },[dfd_nfresponsetypecombo_v1Props])

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
      setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, response_type: getMapperDetailsBindValues[value],RESPONSE_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, response_type: '', response_type65b90: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,nfInvestigationResponseCamt111_v1:{...pre?.nfInvestigationResponseCamt111_v1,response_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code==getMapperDetailsBindValues[value] && items?.description==value)) || {}
    selected.current={
      ...selectedObj||{},
      description:value,
      code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['investigationresponsecamt111maingroup'] = investigationresponsecamt111maingroup058ec,
        codeStates['setinvestigationresponsecamt111maingroup'] = setinvestigationresponsecamt111maingroup058ec,
        codeStates['investigationresponsecamt111maingroup058ec'] = investigationresponsecamt111maingroup058ecProps,
        codeStates['setinvestigationresponsecamt111maingroup058ec'] = setinvestigationresponsecamt111maingroup058ecProps,
        codeStates['investigationresponsecamt111subgroup'] = investigationresponsecamt111subgroupafab5,
        codeStates['setinvestigationresponsecamt111subgroup'] = setinvestigationresponsecamt111subgroupafab5,
        codeStates['investigationresponsecamt111subgroupafab5'] = investigationresponsecamt111subgroupafab5Props,
        codeStates['setinvestigationresponsecamt111subgroupafab5'] = setinvestigationresponsecamt111subgroupafab5Props,
        codeStates['tran_date'] = tran_date51032,
        codeStates['settran_date'] = settran_date51032,
        codeStates['message_code'] = message_code3e093,
        codeStates['setmessage_code'] = setmessage_code3e093,
        codeStates['response_type'] = response_type65b90,
        codeStates['setresponse_type'] = setresponse_type65b90,
        codeStates['response_reason'] = response_reason7039a,
        codeStates['setresponse_reason'] = setresponse_reason7039a,
        codeStates['reason_description'] = reason_descriptiond33de,
        codeStates['setreason_description'] = setreason_descriptiond33de,
        codeStates['investigationresponsecamt111dynamicactions'] = investigationresponsecamt111dynamicactionsceeed,
        codeStates['setinvestigationresponsecamt111dynamicactions'] = setinvestigationresponsecamt111dynamicactionsceeed,
        codeStates['investigationresponsecamt111dynamicactionsceeed'] = investigationresponsecamt111dynamicactionsceeedProps,
        codeStates['setinvestigationresponsecamt111dynamicactionsceeed'] = setinvestigationresponsecamt111dynamicactionsceeedProps,
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
  const investigationresponsecamt111subgroupafab5Ref = useRef<any>(investigationresponsecamt111subgroupafab5);
  useEffect(() => { investigationresponsecamt111subgroupafab5Ref.current = investigationresponsecamt111subgroupafab5; }, [investigationresponsecamt111subgroupafab5]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "5f98d2a107f1f7cca007adb68b465b90") {
        handleClick(investigationresponsecamt111subgroupafab5Ref?.current?.response_type65b90?investigationresponsecamt111subgroupafab5Ref?.current?.response_type65b90:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5f98d2a107f1f7cca007adb68b465b90");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setinvestigationresponsecamt111subgroupafab5((pre:any)=>({...pre,response_type:""}))
    else
      setInitialCount(1)
  },[response_type65b90?.refresh])
  

  if (response_type65b90?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `40 / 54`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled= {response_type65b90?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={response_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={investigationresponsecamt111subgroupafab5?.response_type65b90 ? [investigationresponsecamt111subgroupafab5?.response_type65b90] : (investigationresponsecamt111subgroupafab5?.response_type ? dropdownValue : [])}
        validationState={validate?.nfInvestigationResponseCamt111_v1?.response_type ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownresponse_type;
