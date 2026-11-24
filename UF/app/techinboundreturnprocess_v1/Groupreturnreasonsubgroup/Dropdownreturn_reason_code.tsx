

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
const Dropdownreturn_reason_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_returnreason_v1Props, setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {returnreasonmaingroup382bc, setreturnreasonmaingroup382bc}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup382bcProps, setreturnreasonmaingroup382bcProps}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reasonac630, setreturn_reasonac630}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code6797b, setreturn_reason_code6797b}= useContext(TotalContext) as TotalContextProps;
  const {return_currency378ac, setreturn_currency378ac}= useContext(TotalContext) as TotalContextProps;
  const {return_amount9646b, setreturn_amount9646b}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672, setreturndynamicactionsc7672}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672Props, setreturndynamicactionsc7672Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [return_reason_codeOptions, setreturn_reason_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `return_reason_code`
    let mapperText: string =  `return_reason_code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "114d37ab371e8f0381693391cc1f68e5",
      "e5be7f7e92af3ea3442640f3e626797b"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_returnreason_v1Props.dstKey){
      dstKey = dfd_returnreason_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_returnreason_v1Props && !dfd_returnreason_v1Props.hasLogicCenter && !dfdFlag) {
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
      setreturn_reason_codeOptions(temp);
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
  },[return_reason_code6797b?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setreturnreasonsubgroupf68e5((prev: any) => ({ ...prev,return_reason_code6797b: value }))
      setIsRequredData(false)
    }else{
      let temp:any = returnreasonsubgroupf68e5;
      delete temp.return_reason_code;
      delete temp.RETURN_REASON_CODE;
      delete temp.return_reason_code6797b;
      setreturnreasonsubgroupf68e5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,techInboundReturnProcess_v1:{...pre?.techInboundReturnProcess_v1,return_reason_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(returnreasonsubgroupf68e5.return_reason_code){
      if(Array.isArray(dfd_returnreason_v1Props)){
        if(dfd_returnreason_v1Props?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)){
          setdropdownValue([dfd_returnreason_v1Props?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)?.return_reason_code])
          tempValue=dfd_returnreason_v1Props?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)?.return_reason_code
        }else{
          setdropdownValue([returnreasonsubgroupf68e5.return_reason_code])
          tempValue=returnreasonsubgroupf68e5.return_reason_code
        }
      }else{
        let dstKey:string = dfd_returnreason_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{return_reason_code:returnreasonsubgroupf68e5.return_reason_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)?.return_reason_code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.return_reason_code === returnreasonsubgroupf68e5.return_reason_code)?.return_reason_code
      }else{
        setdropdownValue([returnreasonsubgroupf68e5.return_reason_code])
        tempValue=returnreasonsubgroupf68e5.return_reason_code
      }   
      }
    }
    if(return_reason_code6797b?.trigger == true)
    {
      await handlechange(tempValue)
      setreturn_reason_code6797b((pre:any)=>({...pre,trigger:false}))
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
  },[returnreasonsubgroupf68e5.return_reason_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_returnreason_v1Props) && dfd_returnreason_v1Props?.length == 1){
    // setreturnreasonsubgroupf68e5((pre:any)=>({...pre,return_reason_code:dfd_returnreason_v1Props[0]?.return_reason_code}))
    }
  },[dfd_returnreason_v1Props])

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
      setreturnreasonsubgroupf68e5((prev: any) => ({ ...prev, return_reason_code: getMapperDetailsBindValues[value],RETURN_REASON_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setreturnreasonsubgroupf68e5((prev: any) => ({ ...prev, return_reason_code: '', return_reason_code6797b: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,techInboundReturnProcess_v1:{...pre?.techInboundReturnProcess_v1,return_reason_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.return_reason_code==getMapperDetailsBindValues[value] && items?.return_reason_code==value)) || {}
    selected.current={
      ...selectedObj||{},
      return_reason_code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['return_reason'] = return_reasonac630,
        codeStates['setreturn_reason'] = setreturn_reasonac630,
        codeStates['return_reason_code'] = return_reason_code6797b,
        codeStates['setreturn_reason_code'] = setreturn_reason_code6797b,
        codeStates['return_currency'] = return_currency378ac,
        codeStates['setreturn_currency'] = setreturn_currency378ac,
        codeStates['return_amount'] = return_amount9646b,
        codeStates['setreturn_amount'] = setreturn_amount9646b,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
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
  const returnreasonsubgroupf68e5Ref = useRef<any>(returnreasonsubgroupf68e5);
  useEffect(() => { returnreasonsubgroupf68e5Ref.current = returnreasonsubgroupf68e5; }, [returnreasonsubgroupf68e5]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "e5be7f7e92af3ea3442640f3e626797b") {
        handleClick(returnreasonsubgroupf68e5Ref?.current?.return_reason_code6797b?returnreasonsubgroupf68e5Ref?.current?.return_reason_code6797b:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e5be7f7e92af3ea3442640f3e626797b");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setreturnreasonsubgroupf68e5((pre:any)=>({...pre,return_reason_code:""}))
    else
      setInitialCount(1)
  },[return_reason_code6797b?.refresh])
  

  if (return_reason_code6797b?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `19 / 33`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled={ true }
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Return Reason Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={return_reason_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={returnreasonsubgroupf68e5?.return_reason_code6797b ? [returnreasonsubgroupf68e5?.return_reason_code6797b] : (returnreasonsubgroupf68e5?.return_reason_code ? dropdownValue : [])}
        validationState={validate?.techInboundReturnProcess_v1?.return_reason_code ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownreturn_reason_code;
