

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
const Dropdownreturn_reason = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {returnreasonmaingroup60037, setreturnreasonmaingroup60037}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup60037Props, setreturnreasonmaingroup60037Props}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981, setreturnreasonsubgroup63981}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroup63981Props, setreturnreasonsubgroup63981Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reason38055, setreturn_reason38055}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code06fe7, setreturn_reason_code06fe7}= useContext(TotalContext) as TotalContextProps;
  const {return_currency5d707, setreturn_currency5d707}= useContext(TotalContext) as TotalContextProps;
  const {return_amount7f000, setreturn_amount7f000}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7, setreturndynamicactions87eb7}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactions87eb7Props, setreturndynamicactions87eb7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [return_reasonOptions, setreturn_reasonOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `return_reason`
    let mapperText: string =  `return_reason`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "f6337c10339c4bc78695377e90863981",
      "f7868bc2c2814cb9a7efebb214338055"
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
      setreturn_reasonOptions(temp);
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
  },[return_reason38055?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setreturnreasonsubgroup63981((prev: any) => ({ ...prev,return_reason38055: value }))
      setIsRequredData(false)
    }else{
      let temp:any = returnreasonsubgroup63981;
      delete temp.return_reason;
      delete temp.RETURN_REASON;
      delete temp.return_reason38055;
      setreturnreasonsubgroup63981(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,return_reason:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(returnreasonsubgroup63981.return_reason){
      if(Array.isArray(dfd_returnreason_v1Props)){
        if(dfd_returnreason_v1Props?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)){
          setdropdownValue([dfd_returnreason_v1Props?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)?.return_reason])
          tempValue=dfd_returnreason_v1Props?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)?.return_reason
        }else{
          setdropdownValue([returnreasonsubgroup63981.return_reason])
          tempValue=returnreasonsubgroup63981.return_reason
        }
      }else{
        let dstKey:string = dfd_returnreason_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{return_reason:returnreasonsubgroup63981.return_reason}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)?.return_reason ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.return_reason === returnreasonsubgroup63981.return_reason)?.return_reason
      }else{
        setdropdownValue([returnreasonsubgroup63981.return_reason])
        tempValue=returnreasonsubgroup63981.return_reason
      }   
      }
    }
    if(return_reason38055?.trigger == true)
    {
      await handlechange(tempValue)
      setreturn_reason38055((pre:any)=>({...pre,trigger:false}))
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
  },[returnreasonsubgroup63981.return_reason, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_returnreason_v1Props) && dfd_returnreason_v1Props?.length == 1){
    // setreturnreasonsubgroup63981((pre:any)=>({...pre,return_reason:dfd_returnreason_v1Props[0]?.return_reason}))
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
      setreturnreasonsubgroup63981((prev: any) => ({ ...prev, return_reason: getMapperDetailsBindValues[value],RETURN_REASON: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setreturnreasonsubgroup63981((prev: any) => ({ ...prev, return_reason: '', return_reason38055: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,return_reason:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.return_reason==getMapperDetailsBindValues[value] && items?.return_reason==value)) || {}
    selected.current={
      ...selectedObj||{},
      return_reason:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup60037,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup60037,
        codeStates['returnreasonmaingroup60037'] = returnreasonmaingroup60037Props,
        codeStates['setreturnreasonmaingroup60037'] = setreturnreasonmaingroup60037Props,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroup63981,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroup63981,
        codeStates['returnreasonsubgroup63981'] = returnreasonsubgroup63981Props,
        codeStates['setreturnreasonsubgroup63981'] = setreturnreasonsubgroup63981Props,
        codeStates['return_reason'] = return_reason38055,
        codeStates['setreturn_reason'] = setreturn_reason38055,
        codeStates['return_reason_code'] = return_reason_code06fe7,
        codeStates['setreturn_reason_code'] = setreturn_reason_code06fe7,
        codeStates['return_currency'] = return_currency5d707,
        codeStates['setreturn_currency'] = setreturn_currency5d707,
        codeStates['return_amount'] = return_amount7f000,
        codeStates['setreturn_amount'] = setreturn_amount7f000,
        codeStates['returndynamicactions'] = returndynamicactions87eb7,
        codeStates['setreturndynamicactions'] = setreturndynamicactions87eb7,
        codeStates['returndynamicactions87eb7'] = returndynamicactions87eb7Props,
        codeStates['setreturndynamicactions87eb7'] = setreturndynamicactions87eb7Props,
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
      // copyDropdownData
    setreturnreasonsubgroup63981((pre:any)=>({...pre,[UOmapperData['1a3ddc3058084e9dac0b2b53b1d06fe7']['source']]:selectedObj.return_reason_code}));
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
   
  async function handleConfirmonClick(){
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
    if(returnreasonsubgroup63981?.return_reason == "" || returnreasonsubgroup63981?.return_reason == undefined){
      returnreasonsubgroup63981.return_reason = "";
      const validate:any = v.safeParse(schema, returnreasonsubgroup63981?.return_reason);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,return_reason:"invalid"}}));
        }
    }else if(returnreasonsubgroup63981?.return_reason !== ""){
    const validate:any = v.safeParse(schema, returnreasonsubgroup63981?.return_reason);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,return_reason:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,inboundReturnProcess_v1:{...pre?.inboundReturnProcess_v1,return_reason:undefined}}));
      }
    }
  }
  const returnreasonsubgroup63981Ref = useRef<any>(returnreasonsubgroup63981);
  useEffect(() => { returnreasonsubgroup63981Ref.current = returnreasonsubgroup63981; }, [returnreasonsubgroup63981]);
    useEffect(()=>{
        if(!returnreasonsubgroup63981?.return_reason)
        { 
          setreturnreasonsubgroup63981Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "f7868bc2c2814cb9a7efebb214338055") {
        handleClick(returnreasonsubgroup63981Ref?.current?.return_reason38055?returnreasonsubgroup63981Ref?.current?.return_reason38055:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "f7868bc2c2814cb9a7efebb214338055");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setreturnreasonsubgroup63981((pre:any)=>({...pre,return_reason:""}))
    else
      setInitialCount(1)
  },[return_reason38055?.refresh])
  

  if (return_reason38055?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `1 / 15`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled= {return_reason38055?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Return Reason
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={return_reasonOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={returnreasonsubgroup63981?.return_reason38055 ? [returnreasonsubgroup63981?.return_reason38055] : (returnreasonsubgroup63981?.return_reason ? dropdownValue : [])}
        validationState={validate?.inboundReturnProcess_v1?.return_reason ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownreturn_reason;
