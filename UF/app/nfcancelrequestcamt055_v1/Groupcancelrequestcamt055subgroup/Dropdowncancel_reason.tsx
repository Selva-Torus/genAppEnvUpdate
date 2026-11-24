

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
const Dropdowncancel_reason = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfcancelreasoncombo_v1Props, setdfd_nfcancelreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date5d7c0, settran_date5d7c0}= useContext(TotalContext) as TotalContextProps;
  const {message_code5df7d, setmessage_code5df7d}= useContext(TotalContext) as TotalContextProps;
  const {cancel_reason1d34e, setcancel_reason1d34e}= useContext(TotalContext) as TotalContextProps;
  const {reason_description5420a, setreason_description5420a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [cancel_reasonOptions, setcancel_reasonOptions] = useState<string[]>([]);
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
      "489dfdfd3c6b26ca7c134bfeb3e5ac44",
      "27f56c47c5134781b0ffda70eca1d34e"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_nfcancelreasoncombo_v1Props.dstKey){
      dstKey = dfd_nfcancelreasoncombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_nfcancelreasoncombo_v1Props && !dfd_nfcancelreasoncombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcancel_reasonOptions(temp);
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
  },[cancel_reason1d34e?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev,cancel_reason1d34e: value }))
      setIsRequredData(false)
    }else{
      let temp:any = cancelrequestcamt055subgroup5ac44;
      delete temp.cancel_reason;
      delete temp.CANCEL_REASON;
      delete temp.cancel_reason1d34e;
      setcancelrequestcamt055subgroup5ac44(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,nfCancelRequestCamt055_v1:{...pre?.nfCancelRequestCamt055_v1,cancel_reason:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(cancelrequestcamt055subgroup5ac44.cancel_reason){
      if(Array.isArray(dfd_nfcancelreasoncombo_v1Props)){
        if(dfd_nfcancelreasoncombo_v1Props?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)){
          setdropdownValue([dfd_nfcancelreasoncombo_v1Props?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)?.description])
          tempValue=dfd_nfcancelreasoncombo_v1Props?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)?.description
        }else{
          setdropdownValue([cancelrequestcamt055subgroup5ac44.cancel_reason])
          tempValue=cancelrequestcamt055subgroup5ac44.cancel_reason
        }
      }else{
        let dstKey:string = dfd_nfcancelreasoncombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:cancelrequestcamt055subgroup5ac44.cancel_reason}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)?.description ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === cancelrequestcamt055subgroup5ac44.cancel_reason)?.description
      }else{
        setdropdownValue([cancelrequestcamt055subgroup5ac44.cancel_reason])
        tempValue=cancelrequestcamt055subgroup5ac44.cancel_reason
      }   
      }
    }
    if(cancel_reason1d34e?.trigger == true)
    {
      await handlechange(tempValue)
      setcancel_reason1d34e((pre:any)=>({...pre,trigger:false}))
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
  },[cancelrequestcamt055subgroup5ac44.cancel_reason, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_nfcancelreasoncombo_v1Props) && dfd_nfcancelreasoncombo_v1Props?.length == 1){
    // setcancelrequestcamt055subgroup5ac44((pre:any)=>({...pre,cancel_reason:dfd_nfcancelreasoncombo_v1Props[0]?.cancel_reason}))
    }
  },[dfd_nfcancelreasoncombo_v1Props])

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
      setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, cancel_reason: getMapperDetailsBindValues[value],CANCEL_REASON: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, cancel_reason: '', cancel_reason1d34e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,nfCancelRequestCamt055_v1:{...pre?.nfCancelRequestCamt055_v1,cancel_reason:undefined}}));
   
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
        codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
        codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
        codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
        codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
        codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
        codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
        codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
        codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
        codeStates['tran_date'] = tran_date5d7c0,
        codeStates['settran_date'] = settran_date5d7c0,
        codeStates['message_code'] = message_code5df7d,
        codeStates['setmessage_code'] = setmessage_code5df7d,
        codeStates['cancel_reason'] = cancel_reason1d34e,
        codeStates['setcancel_reason'] = setcancel_reason1d34e,
        codeStates['reason_description'] = reason_description5420a,
        codeStates['setreason_description'] = setreason_description5420a,
        codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
        codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
        codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
        codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
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
  const cancelrequestcamt055subgroup5ac44Ref = useRef<any>(cancelrequestcamt055subgroup5ac44);
  useEffect(() => { cancelrequestcamt055subgroup5ac44Ref.current = cancelrequestcamt055subgroup5ac44; }, [cancelrequestcamt055subgroup5ac44]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "27f56c47c5134781b0ffda70eca1d34e") {
        handleClick(cancelrequestcamt055subgroup5ac44Ref?.current?.cancel_reason1d34e?cancelrequestcamt055subgroup5ac44Ref?.current?.cancel_reason1d34e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "27f56c47c5134781b0ffda70eca1d34e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcancelrequestcamt055subgroup5ac44((pre:any)=>({...pre,cancel_reason:""}))
    else
      setInitialCount(1)
  },[cancel_reason1d34e?.refresh])
  

  if (cancel_reason1d34e?.isHidden) {
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
        disabled= {cancel_reason1d34e?.isDisabled ? true : false}
        contentAlign={"left"}
        headerPosition='top'
        headerText={
          <>
            Reason
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={cancel_reasonOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={cancelrequestcamt055subgroup5ac44?.cancel_reason1d34e ? [cancelrequestcamt055subgroup5ac44?.cancel_reason1d34e] : (cancelrequestcamt055subgroup5ac44?.cancel_reason ? dropdownValue : [])}
        validationState={validate?.nfCancelRequestCamt055_v1?.cancel_reason ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowncancel_reason;
