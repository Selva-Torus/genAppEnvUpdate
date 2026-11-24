

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
const Dropdowninvestigation_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfinvestigationtypecombo_v1Props, setdfd_nfinvestigationtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {investigationrequestcamt110maingroup7a2f5, setinvestigationrequestcamt110maingroup7a2f5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110maingroup7a2f5Props, setinvestigationrequestcamt110maingroup7a2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date9acc4, settran_date9acc4}= useContext(TotalContext) as TotalContextProps;
  const {message_code581ad, setmessage_code581ad}= useContext(TotalContext) as TotalContextProps;
  const {investigation_type576c6, setinvestigation_type576c6}= useContext(TotalContext) as TotalContextProps;
  const {investigation_reason74007, setinvestigation_reason74007}= useContext(TotalContext) as TotalContextProps;
  const {reason_description6d274, setreason_description6d274}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2, setinvestigationrequestcamt110dynamicactionsbfdc2}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2Props, setinvestigationrequestcamt110dynamicactionsbfdc2Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [investigation_typeOptions, setinvestigation_typeOptions] = useState<string[]>([]);
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
      "2400165be479e7a3dcf96a66d20276a5",
      "810f4d1ed10d4037aa999cc2dd5576c6"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_nfinvestigationtypecombo_v1Props.dstKey){
      dstKey = dfd_nfinvestigationtypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_nfinvestigationtypecombo_v1Props && !dfd_nfinvestigationtypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setinvestigation_typeOptions(temp);
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
  },[investigation_type576c6?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setinvestigationrequestcamt110subgroup276a5((prev: any) => ({ ...prev,investigation_type576c6: value }))
      setIsRequredData(false)
    }else{
      let temp:any = investigationrequestcamt110subgroup276a5;
      delete temp.investigation_type;
      delete temp.INVESTIGATION_TYPE;
      delete temp.investigation_type576c6;
      setinvestigationrequestcamt110subgroup276a5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,nfInvestigationRequestCamt110_v1:{...pre?.nfInvestigationRequestCamt110_v1,investigation_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(investigationrequestcamt110subgroup276a5.investigation_type){
      if(Array.isArray(dfd_nfinvestigationtypecombo_v1Props)){
        if(dfd_nfinvestigationtypecombo_v1Props?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)){
          setdropdownValue([dfd_nfinvestigationtypecombo_v1Props?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)?.description])
          tempValue=dfd_nfinvestigationtypecombo_v1Props?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)?.description
        }else{
          setdropdownValue([investigationrequestcamt110subgroup276a5.investigation_type])
          tempValue=investigationrequestcamt110subgroup276a5.investigation_type
        }
      }else{
        let dstKey:string = dfd_nfinvestigationtypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:investigationrequestcamt110subgroup276a5.investigation_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)?.description ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === investigationrequestcamt110subgroup276a5.investigation_type)?.description
      }else{
        setdropdownValue([investigationrequestcamt110subgroup276a5.investigation_type])
        tempValue=investigationrequestcamt110subgroup276a5.investigation_type
      }   
      }
    }
    if(investigation_type576c6?.trigger == true)
    {
      await handlechange(tempValue)
      setinvestigation_type576c6((pre:any)=>({...pre,trigger:false}))
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
  },[investigationrequestcamt110subgroup276a5.investigation_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_nfinvestigationtypecombo_v1Props) && dfd_nfinvestigationtypecombo_v1Props?.length == 1){
    // setinvestigationrequestcamt110subgroup276a5((pre:any)=>({...pre,investigation_type:dfd_nfinvestigationtypecombo_v1Props[0]?.investigation_type}))
    }
  },[dfd_nfinvestigationtypecombo_v1Props])

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
      setinvestigationrequestcamt110subgroup276a5((prev: any) => ({ ...prev, investigation_type: getMapperDetailsBindValues[value],INVESTIGATION_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setinvestigationrequestcamt110subgroup276a5((prev: any) => ({ ...prev, investigation_type: '', investigation_type576c6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,nfInvestigationRequestCamt110_v1:{...pre?.nfInvestigationRequestCamt110_v1,investigation_type:undefined}}));
   
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
        codeStates['investigationrequestcamt110maingroup'] = investigationrequestcamt110maingroup7a2f5,
        codeStates['setinvestigationrequestcamt110maingroup'] = setinvestigationrequestcamt110maingroup7a2f5,
        codeStates['investigationrequestcamt110maingroup7a2f5'] = investigationrequestcamt110maingroup7a2f5Props,
        codeStates['setinvestigationrequestcamt110maingroup7a2f5'] = setinvestigationrequestcamt110maingroup7a2f5Props,
        codeStates['investigationrequestcamt110subgroup'] = investigationrequestcamt110subgroup276a5,
        codeStates['setinvestigationrequestcamt110subgroup'] = setinvestigationrequestcamt110subgroup276a5,
        codeStates['investigationrequestcamt110subgroup276a5'] = investigationrequestcamt110subgroup276a5Props,
        codeStates['setinvestigationrequestcamt110subgroup276a5'] = setinvestigationrequestcamt110subgroup276a5Props,
        codeStates['tran_date'] = tran_date9acc4,
        codeStates['settran_date'] = settran_date9acc4,
        codeStates['message_code'] = message_code581ad,
        codeStates['setmessage_code'] = setmessage_code581ad,
        codeStates['investigation_type'] = investigation_type576c6,
        codeStates['setinvestigation_type'] = setinvestigation_type576c6,
        codeStates['investigation_reason'] = investigation_reason74007,
        codeStates['setinvestigation_reason'] = setinvestigation_reason74007,
        codeStates['reason_description'] = reason_description6d274,
        codeStates['setreason_description'] = setreason_description6d274,
        codeStates['investigationrequestcamt110dynamicactions'] = investigationrequestcamt110dynamicactionsbfdc2,
        codeStates['setinvestigationrequestcamt110dynamicactions'] = setinvestigationrequestcamt110dynamicactionsbfdc2,
        codeStates['investigationrequestcamt110dynamicactionsbfdc2'] = investigationrequestcamt110dynamicactionsbfdc2Props,
        codeStates['setinvestigationrequestcamt110dynamicactionsbfdc2'] = setinvestigationrequestcamt110dynamicactionsbfdc2Props,
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
  const investigationrequestcamt110subgroup276a5Ref = useRef<any>(investigationrequestcamt110subgroup276a5);
  useEffect(() => { investigationrequestcamt110subgroup276a5Ref.current = investigationrequestcamt110subgroup276a5; }, [investigationrequestcamt110subgroup276a5]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "810f4d1ed10d4037aa999cc2dd5576c6") {
        handleClick(investigationrequestcamt110subgroup276a5Ref?.current?.investigation_type576c6?investigationrequestcamt110subgroup276a5Ref?.current?.investigation_type576c6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "810f4d1ed10d4037aa999cc2dd5576c6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setinvestigationrequestcamt110subgroup276a5((pre:any)=>({...pre,investigation_type:""}))
    else
      setInitialCount(1)
  },[investigation_type576c6?.refresh])
  

  if (investigation_type576c6?.isHidden) {
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
        disabled= {investigation_type576c6?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={investigation_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={investigationrequestcamt110subgroup276a5?.investigation_type576c6 ? [investigationrequestcamt110subgroup276a5?.investigation_type576c6] : (investigationrequestcamt110subgroup276a5?.investigation_type ? dropdownValue : [])}
        validationState={validate?.nfInvestigationRequestCamt110_v1?.investigation_type ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowninvestigation_type;
