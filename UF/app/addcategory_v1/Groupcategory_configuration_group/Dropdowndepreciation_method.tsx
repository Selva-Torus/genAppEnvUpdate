

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
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
const Dropdowndepreciation_method = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_depreciationmethodcombo_v1Props, setdfd_depreciationmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {category_groupe3ebd, setcategory_groupe3ebd}= useContext(TotalContext) as TotalContextProps;
  const {category_groupe3ebdProps, setcategory_groupe3ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68a, setcategory_information_groupfb68a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68aProps, setcategory_information_groupfb68aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6af, setcategory_configuration_group5d6af}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6afProps, setcategory_configuration_group5d6afProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text00171, setcategory_configuration_text00171}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_methodfa7cb, setdepreciation_methodfa7cb}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years231a3, setuseful_life_years231a3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884, setdynamicactions13884}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884Props, setdynamicactions13884Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [depreciation_methodOptions, setdepreciation_methodOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `depreciation_method`
    let mapperText: string =  `depreciation_method`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "23848463037e4b339a4fde469965d6af",
      "5aec9fe74af84baf92fbf8ec27dfa7cb"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_depreciationmethodcombo_v1Props.dstKey){
      dstKey = dfd_depreciationmethodcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_depreciationmethodcombo_v1Props && !dfd_depreciationmethodcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setdepreciation_methodOptions(temp);
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
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
  },[depreciation_methodfa7cb?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setcategory_configuration_group5d6af((prev: any) => ({ ...prev, depreciation_method: getMapperDetailsBindValues[value],depreciation_methodfa7cb: value,DEPRECIATION_METHOD: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = category_configuration_group5d6af;
      delete temp.depreciation_method;
      delete temp.DEPRECIATION_METHOD;
      delete temp.depreciation_methodfa7cb;
      setcategory_configuration_group5d6af(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,depreciation_method:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(category_configuration_group5d6af.depreciation_method){
      if(Array.isArray(dfd_depreciationmethodcombo_v1Props)){
        if(dfd_depreciationmethodcombo_v1Props?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)){
          setdropdownValue([dfd_depreciationmethodcombo_v1Props?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)?.depreciation_method])
          tempValue=dfd_depreciationmethodcombo_v1Props?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)?.depreciation_method
        }else{
          setdropdownValue([category_configuration_group5d6af.depreciation_method])
          tempValue=category_configuration_group5d6af.depreciation_method
        }
      }else{
        let dstKey:string = dfd_depreciationmethodcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{depreciation_method:category_configuration_group5d6af.depreciation_method}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)?.depreciation_method ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.depreciation_method === category_configuration_group5d6af.depreciation_method)?.depreciation_method
      }else{
        setdropdownValue([category_configuration_group5d6af.depreciation_method])
        tempValue=category_configuration_group5d6af.depreciation_method
      }   
      }
    }
    if(depreciation_methodfa7cb?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setdepreciation_methodfa7cb((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[category_configuration_group5d6af.depreciation_method, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_depreciationmethodcombo_v1Props) && dfd_depreciationmethodcombo_v1Props?.length == 1){
    // setcategory_configuration_group5d6af((pre:any)=>({...pre,depreciation_method:dfd_depreciationmethodcombo_v1Props[0]?.depreciation_method}))
    }
  },[dfd_depreciationmethodcombo_v1Props])

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
      setcategory_configuration_group5d6af((prev: any) => ({ ...prev, depreciation_method: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setcategory_configuration_group5d6af((prev: any) => ({ ...prev, depreciation_method: '', depreciation_methodfa7cb: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,depreciation_method:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.depreciation_method==getMapperDetailsBindValues[value] && items?.depreciation_method==value)) || {}
    selected.current={
      ...selectedObj||{},
      depreciation_method:value,
      depreciation_method:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['category_group'] = category_groupe3ebd,
        codeStates['setcategory_group'] = setcategory_groupe3ebd,
        codeStates['category_groupe3ebd'] = category_groupe3ebdProps,
        codeStates['setcategory_groupe3ebd'] = setcategory_groupe3ebdProps,
        codeStates['category_information_group'] = category_information_groupfb68a,
        codeStates['setcategory_information_group'] = setcategory_information_groupfb68a,
        codeStates['category_information_groupfb68a'] = category_information_groupfb68aProps,
        codeStates['setcategory_information_groupfb68a'] = setcategory_information_groupfb68aProps,
        codeStates['category_configuration_group'] = category_configuration_group5d6af,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group5d6af,
        codeStates['category_configuration_group5d6af'] = category_configuration_group5d6afProps,
        codeStates['setcategory_configuration_group5d6af'] = setcategory_configuration_group5d6afProps,
        codeStates['category_configuration_text'] = category_configuration_text00171,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text00171,
        codeStates['depreciation_method'] = depreciation_methodfa7cb,
        codeStates['setdepreciation_method'] = setdepreciation_methodfa7cb,
        codeStates['useful_life_years'] = useful_life_years231a3,
        codeStates['setuseful_life_years'] = setuseful_life_years231a3,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
      if(category_configuration_group5d6af?.depreciation_method == "" || category_configuration_group5d6af?.depreciation_method == undefined){
      category_configuration_group5d6af.depreciation_method = "";
      const validate:any = v.safeParse(schema, category_configuration_group5d6af?.depreciation_method);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,depreciation_method:"invalid"}}));
        }
    }else if(category_configuration_group5d6af?.depreciation_method !== ""){
    const validate:any = v.safeParse(schema, category_configuration_group5d6af?.depreciation_method);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,addCategory_v1:{...pre?.addCategory_v1,depreciation_method:"invalid"}}));
    }
    }
  }
  const category_configuration_group5d6afRef = useRef<any>(category_configuration_group5d6af);
  useEffect(() => { category_configuration_group5d6afRef.current = category_configuration_group5d6af; }, [category_configuration_group5d6af]);
    useEffect(()=>{
        if(!category_configuration_group5d6af?.depreciation_method)
        { 
          setcategory_configuration_group5d6afProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "5aec9fe74af84baf92fbf8ec27dfa7cb") {
        handleClick(category_configuration_group5d6afRef?.current?.depreciation_methodfa7cb?category_configuration_group5d6afRef?.current?.depreciation_methodfa7cb:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5aec9fe74af84baf92fbf8ec27dfa7cb");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcategory_configuration_group5d6af((pre:any)=>({...pre,depreciation_method:""}))
    else
      setInitialCount(1)
  },[depreciation_methodfa7cb?.refresh])

  if (depreciation_methodfa7cb?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {depreciation_methodfa7cb?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Depreciation Method
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={depreciation_methodOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={category_configuration_group5d6af?.depreciation_methodfa7cb ? [category_configuration_group5d6af?.depreciation_methodfa7cb] : (category_configuration_group5d6af?.depreciation_method ? dropdownValue : [])}
        validationState={validate?.addCategory_v1?.depreciation_method ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowndepreciation_method;
