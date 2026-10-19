

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
const Dropdownassigned_login_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {code_value_groupa2e67, setcode_value_groupa2e67}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67Props, setcode_value_groupa2e67Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0, setasset_group181c0}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0Props, setasset_group181c0Props}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code8866c, setassessed_tier_code8866c}= useContext(TotalContext) as TotalContextProps;
  const {justificationc41ce, setjustificationc41ce}= useContext(TotalContext) as TotalContextProps;
  const {desc_texta0702, setdesc_texta0702}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name8a256, setassigned_login_name8a256}= useContext(TotalContext) as TotalContextProps;
  const {descs_text2e8fe, setdescs_text2e8fe}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [assigned_login_nameOptions, setassigned_login_nameOptions] = useState<string[]>([]);
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
      "ea9bd4cdc3847f7ace4026cc310181c0",
      "c4ae8c9cf91840aa858c8c620b98a256"
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
      setassigned_login_nameOptions(temp);
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
  },[assigned_login_name8a256?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setasset_group181c0((prev: any) => ({ ...prev,assigned_login_name8a256: value }))
      setIsRequredData(false)
    }else{
      let temp:any = asset_group181c0;
      delete temp.assigned_login_name;
      delete temp.ASSIGNED_LOGIN_NAME;
      delete temp.assigned_login_name8a256;
      setasset_group181c0(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,changeTier_v1:{...pre?.changeTier_v1,assigned_login_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(asset_group181c0.assigned_login_name){
      if(Array.isArray(dfd_businessownercombo_v1Props)){
        if(dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)){
          setdropdownValue([dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)?.business_owner_name])
          tempValue=dfd_businessownercombo_v1Props?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)?.business_owner_name
        }else{
          setdropdownValue([asset_group181c0.assigned_login_name])
          tempValue=asset_group181c0.assigned_login_name
        }
      }else{
        let dstKey:string = dfd_businessownercombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{business_owner_name:asset_group181c0.assigned_login_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)?.business_owner_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.business_owner_name === asset_group181c0.assigned_login_name)?.business_owner_name
      }else{
        setdropdownValue([asset_group181c0.assigned_login_name])
        tempValue=asset_group181c0.assigned_login_name
      }   
      }
    }
    if(assigned_login_name8a256?.trigger == true)
    {
      await handlechange(tempValue)
      setassigned_login_name8a256((pre:any)=>({...pre,trigger:false}))
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
  },[asset_group181c0.assigned_login_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_businessownercombo_v1Props) && dfd_businessownercombo_v1Props?.length == 1){
    // setasset_group181c0((pre:any)=>({...pre,assigned_login_name:dfd_businessownercombo_v1Props[0]?.assigned_login_name}))
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
      setasset_group181c0((prev: any) => ({ ...prev, assigned_login_name: getMapperDetailsBindValues[value],ASSIGNED_LOGIN_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setasset_group181c0((prev: any) => ({ ...prev, assigned_login_name: '', assigned_login_name8a256: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,changeTier_v1:{...pre?.changeTier_v1,assigned_login_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.business_owner_name==getMapperDetailsBindValues[value] && items?.business_owner_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      business_owner_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['code_value_group'] = code_value_groupa2e67,
        codeStates['setcode_value_group'] = setcode_value_groupa2e67,
        codeStates['code_value_groupa2e67'] = code_value_groupa2e67Props,
        codeStates['setcode_value_groupa2e67'] = setcode_value_groupa2e67Props,
        codeStates['asset_group'] = asset_group181c0,
        codeStates['setasset_group'] = setasset_group181c0,
        codeStates['asset_group181c0'] = asset_group181c0Props,
        codeStates['setasset_group181c0'] = setasset_group181c0Props,
        codeStates['assessed_tier_code'] = assessed_tier_code8866c,
        codeStates['setassessed_tier_code'] = setassessed_tier_code8866c,
        codeStates['justification'] = justificationc41ce,
        codeStates['setjustification'] = setjustificationc41ce,
        codeStates['desc_text'] = desc_texta0702,
        codeStates['setdesc_text'] = setdesc_texta0702,
        codeStates['assigned_login_name'] = assigned_login_name8a256,
        codeStates['setassigned_login_name'] = setassigned_login_name8a256,
        codeStates['descs_text'] = descs_text2e8fe,
        codeStates['setdescs_text'] = setdescs_text2e8fe,
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
  const asset_group181c0Ref = useRef<any>(asset_group181c0);
  useEffect(() => { asset_group181c0Ref.current = asset_group181c0; }, [asset_group181c0]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "c4ae8c9cf91840aa858c8c620b98a256") {
        handleClick(asset_group181c0Ref?.current?.assigned_login_name8a256?asset_group181c0Ref?.current?.assigned_login_name8a256:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "c4ae8c9cf91840aa858c8c620b98a256");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setasset_group181c0((pre:any)=>({...pre,assigned_login_name:""}))
    else
      setInitialCount(1)
  },[assigned_login_name8a256?.refresh])
  

  if (assigned_login_name8a256?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `53 / 65`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {assigned_login_name8a256?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Second approver
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={assigned_login_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select the Second Approver")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={asset_group181c0?.assigned_login_name8a256 ? [asset_group181c0?.assigned_login_name8a256] : (asset_group181c0?.assigned_login_name ? dropdownValue : [])}
        validationState={validate?.changeTier_v1?.assigned_login_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownassigned_login_name;
