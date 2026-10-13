

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
const Dropdownreturn_reason_dropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestreason_v1Props, setdfd_requestreason_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {group64e07, setgroup64e07}= useContext(TotalContext) as TotalContextProps;
  const {group64e07Props, setgroup64e07Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_dropdown233e0, setreturn_reason_dropdown233e0}= useContext(TotalContext) as TotalContextProps;
  const {closef8f97, setclosef8f97}= useContext(TotalContext) as TotalContextProps;
  const {save89f56, setsave89f56}= useContext(TotalContext) as TotalContextProps;
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
    let mapperValue: string =  `description`
    let mapperText: string =  `code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "c78ef87aac6309380804873b49b64e07",
      "01135da5ef1903b5c113a76b39a233e0"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_requestreason_v1Props.dstKey){
      dstKey = dfd_requestreason_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_requestreason_v1Props && !dfd_requestreason_v1Props.hasLogicCenter && !dfdFlag) {
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
  },[return_reason_dropdown233e0?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgroup64e07((prev: any) => ({ ...prev,return_reason_dropdown233e0: value }))
      setIsRequredData(false)
    }else{
      let temp:any = group64e07;
      delete temp.return_reason_dropdown;
      delete temp.RETURN_REASON_DROPDOWN;
      delete temp.return_reason_dropdown233e0;
      setgroup64e07(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,requestInitiateReasonPopup_v1:{...pre?.requestInitiateReasonPopup_v1,return_reason_dropdown:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(group64e07.return_reason_dropdown){
      if(Array.isArray(dfd_requestreason_v1Props)){
        if(dfd_requestreason_v1Props?.find((item: any) => item.code === group64e07.return_reason_dropdown)){
          setdropdownValue([dfd_requestreason_v1Props?.find((item: any) => item.code === group64e07.return_reason_dropdown)?.description])
          tempValue=dfd_requestreason_v1Props?.find((item: any) => item.code === group64e07.return_reason_dropdown)?.description
        }else{
          setdropdownValue([group64e07.return_reason_dropdown])
          tempValue=group64e07.return_reason_dropdown
        }
      }else{
        let dstKey:string = dfd_requestreason_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:group64e07.return_reason_dropdown}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === group64e07.return_reason_dropdown)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === group64e07.return_reason_dropdown)?.description ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === group64e07.return_reason_dropdown)?.description
      }else{
        setdropdownValue([group64e07.return_reason_dropdown])
        tempValue=group64e07.return_reason_dropdown
      }   
      }
    }
    if(return_reason_dropdown233e0?.trigger == true)
    {
      await handlechange(tempValue)
      setreturn_reason_dropdown233e0((pre:any)=>({...pre,trigger:false}))
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
  },[group64e07.return_reason_dropdown, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_requestreason_v1Props) && dfd_requestreason_v1Props?.length == 1){
    // setgroup64e07((pre:any)=>({...pre,return_reason_dropdown:dfd_requestreason_v1Props[0]?.return_reason_dropdown}))
    }
  },[dfd_requestreason_v1Props])

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
      setgroup64e07((prev: any) => ({ ...prev, return_reason_dropdown: getMapperDetailsBindValues[value],RETURN_REASON_DROPDOWN: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgroup64e07((prev: any) => ({ ...prev, return_reason_dropdown: '', return_reason_dropdown233e0: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,requestInitiateReasonPopup_v1:{...pre?.requestInitiateReasonPopup_v1,return_reason_dropdown:undefined}}));
   
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
        codeStates['group'] = group64e07,
        codeStates['setgroup'] = setgroup64e07,
        codeStates['group64e07'] = group64e07Props,
        codeStates['setgroup64e07'] = setgroup64e07Props,
        codeStates['return_reason_dropdown'] = return_reason_dropdown233e0,
        codeStates['setreturn_reason_dropdown'] = setreturn_reason_dropdown233e0,
        codeStates['close'] = closef8f97,
        codeStates['setclose'] = setclosef8f97,
        codeStates['save'] = save89f56,
        codeStates['setsave'] = setsave89f56,
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
    if(group64e07?.return_reason_dropdown == "" || group64e07?.return_reason_dropdown == undefined){
      group64e07.return_reason_dropdown = "";
      const validate:any = v.safeParse(schema, group64e07?.return_reason_dropdown);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,requestInitiateReasonPopup_v1:{...pre?.requestInitiateReasonPopup_v1,return_reason_dropdown:"invalid"}}));
        }
    }else if(group64e07?.return_reason_dropdown !== ""){
    const validate:any = v.safeParse(schema, group64e07?.return_reason_dropdown);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,requestInitiateReasonPopup_v1:{...pre?.requestInitiateReasonPopup_v1,return_reason_dropdown:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,requestInitiateReasonPopup_v1:{...pre?.requestInitiateReasonPopup_v1,return_reason_dropdown:undefined}}));
      }
    }
  }
  const group64e07Ref = useRef<any>(group64e07);
  useEffect(() => { group64e07Ref.current = group64e07; }, [group64e07]);
    useEffect(()=>{
        if(!group64e07?.return_reason_dropdown)
        { 
          setgroup64e07Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "01135da5ef1903b5c113a76b39a233e0") {
        handleClick(group64e07Ref?.current?.return_reason_dropdown233e0?group64e07Ref?.current?.return_reason_dropdown233e0:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "01135da5ef1903b5c113a76b39a233e0");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroup64e07((pre:any)=>({...pre,return_reason_dropdown:""}))
    else
      setInitialCount(1)
  },[return_reason_dropdown233e0?.refresh])
  

  if (return_reason_dropdown233e0?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `2 / 24`,
        gridRow: `2 / 12`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {return_reason_dropdown233e0?.isDisabled ? true : false}
        contentAlign={"center"}
        static={true}
        staticProps={return_reason_dropdownOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={group64e07?.return_reason_dropdown233e0 ? [group64e07?.return_reason_dropdown233e0] : (group64e07?.return_reason_dropdown ? dropdownValue : [])}
        validationState={validate?.requestInitiateReasonPopup_v1?.return_reason_dropdown ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownreturn_reason_dropdown;
