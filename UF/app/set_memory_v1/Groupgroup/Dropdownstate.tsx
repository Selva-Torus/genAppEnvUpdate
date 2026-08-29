

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
const Dropdownstate = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_set_db_node_v1Props, setdfd_set_db_node_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupdf36a, setgroupdf36a}= useContext(TotalContext) as TotalContextProps;
  const {groupdf36aProps, setgroupdf36aProps}= useContext(TotalContext) as TotalContextProps;
  const {setmemoryvaluese2c19, setsetmemoryvaluese2c19}= useContext(TotalContext) as TotalContextProps;
  const {state62a91, setstate62a91}= useContext(TotalContext) as TotalContextProps;
  const {state_two24376, setstate_two24376}= useContext(TotalContext) as TotalContextProps;
  const {country625d4, setcountry625d4}= useContext(TotalContext) as TotalContextProps;
  const {textinput86330, settextinput86330}= useContext(TotalContext) as TotalContextProps;
  const {button3a885, setbutton3a885}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efd, settabled5efd}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efdProps, settabled5efdProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [stateOptions, setstateOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `state`
    let mapperText: string =  `state`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "60be8cd69d4042008332e39ed7bdf36a",
      "2e156b9646f74ae788355dcf1e662a91"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_set_db_node_v1Props.dstKey){
      dstKey = dfd_set_db_node_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_set_db_node_v1Props && !dfd_set_db_node_v1Props.hasLogicCenter && !dfdFlag) {
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
      setstateOptions(temp);
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
  },[state62a91?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgroupdf36a((prev: any) => ({ ...prev,state62a91: value }))
      setIsRequredData(false)
    }else{
      let temp:any = groupdf36a;
      delete temp.state;
      delete temp.STATE;
      delete temp.state62a91;
      setgroupdf36a(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,setMemoryValuesevent_v1:{...pre?.setMemoryValuesevent_v1,state:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(groupdf36a.state){
      if(Array.isArray(dfd_set_db_node_v1Props)){
        if(dfd_set_db_node_v1Props?.find((item: any) => item.state === groupdf36a.state)){
          setdropdownValue([dfd_set_db_node_v1Props?.find((item: any) => item.state === groupdf36a.state)?.state])
          tempValue=dfd_set_db_node_v1Props?.find((item: any) => item.state === groupdf36a.state)?.state
        }else{
          setdropdownValue([groupdf36a.state])
          tempValue=groupdf36a.state
        }
      }else{
        let dstKey:string = dfd_set_db_node_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{state:groupdf36a.state}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.state === groupdf36a.state)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.state === groupdf36a.state)?.state ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.state === groupdf36a.state)?.state
      }else{
        setdropdownValue([groupdf36a.state])
        tempValue=groupdf36a.state
      }   
      }
    }
    if(state62a91?.trigger == true)
    {
      await handlechange(tempValue)
      setstate62a91((pre:any)=>({...pre,trigger:false}))
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
  },[groupdf36a.state, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_set_db_node_v1Props) && dfd_set_db_node_v1Props?.length == 1){
    // setgroupdf36a((pre:any)=>({...pre,state:dfd_set_db_node_v1Props[0]?.state}))
    }
  },[dfd_set_db_node_v1Props])

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
      setgroupdf36a((prev: any) => ({ ...prev, state: getMapperDetailsBindValues[value],STATE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgroupdf36a((prev: any) => ({ ...prev, state: '', state62a91: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,setMemoryValuesevent_v1:{...pre?.setMemoryValuesevent_v1,state:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.state==getMapperDetailsBindValues[value] && items?.state==value)) || {}
    selected.current={
      ...selectedObj||{},
      state:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupdf36a,
        codeStates['setgroup'] = setgroupdf36a,
        codeStates['groupdf36a'] = groupdf36aProps,
        codeStates['setgroupdf36a'] = setgroupdf36aProps,
        codeStates['setmemoryvalues'] = setmemoryvaluese2c19,
        codeStates['setsetmemoryvalues'] = setsetmemoryvaluese2c19,
        codeStates['state'] = state62a91,
        codeStates['setstate'] = setstate62a91,
        codeStates['state_two'] = state_two24376,
        codeStates['setstate_two'] = setstate_two24376,
        codeStates['country'] = country625d4,
        codeStates['setcountry'] = setcountry625d4,
        codeStates['textinput'] = textinput86330,
        codeStates['settextinput'] = settextinput86330,
        codeStates['button'] = button3a885,
        codeStates['setbutton'] = setbutton3a885,
        codeStates['table'] = tabled5efd,
        codeStates['settable'] = settabled5efd,
        codeStates['tabled5efd'] = tabled5efdProps,
        codeStates['settabled5efd'] = settabled5efdProps,
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
  const groupdf36aRef = useRef<any>(groupdf36a);
  useEffect(() => { groupdf36aRef.current = groupdf36a; }, [groupdf36a]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "2e156b9646f74ae788355dcf1e662a91") {
        handleClick(groupdf36aRef?.current?.state62a91?groupdf36aRef?.current?.state62a91:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "2e156b9646f74ae788355dcf1e662a91");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroupdf36a((pre:any)=>({...pre,state:""}))
    else
      setInitialCount(1)
  },[state62a91?.refresh])
  

  if (state62a91?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `10 / 16`,
        gridRow: `28 / 47`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {state62a91?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            State
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={stateOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("state")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={groupdf36a?.state62a91 ? [groupdf36a?.state62a91] : (groupdf36a?.state ? dropdownValue : [])}
        validationState={validate?.setMemoryValuesevent_v1?.state ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownstate;
