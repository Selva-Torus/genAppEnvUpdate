

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
const Dropdowncurrency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text97eea, setcategory_configuration_text97eea}= useContext(TotalContext) as TotalContextProps;
  const {min_salary807a5, setmin_salary807a5}= useContext(TotalContext) as TotalContextProps;
  const {max_salarye78c6, setmax_salarye78c6}= useContext(TotalContext) as TotalContextProps;
  const {currencyb8f2e, setcurrencyb8f2e}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentageae1ae, setbonus_percentageae1ae}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible4c314, setpromotion_eligible4c314}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligible66e37, setovertime_eligible66e37}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [currencyOptions, setcurrencyOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `currency_code`
    let mapperText: string =  `currency_no`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "d1c13cefdc89a0d6a6ad217393049b64",
      "07a7378161c333cc89afa6f76e3b8f2e"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_currencycombo_v1Props.dstKey){
      dstKey = dfd_currencycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_currencycombo_v1Props && !dfd_currencycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcurrencyOptions(temp);
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
  },[currencyb8f2e?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setcompensation_benfits_group49b64((prev: any) => ({ ...prev,currencyb8f2e: value }))
      setIsRequredData(false)
    }else{
      let temp:any = compensation_benfits_group49b64;
      delete temp.currency;
      delete temp.CURRENCY;
      delete temp.currencyb8f2e;
      setcompensation_benfits_group49b64(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,currency:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(compensation_benfits_group49b64.currency){
      if(Array.isArray(dfd_currencycombo_v1Props)){
        if(dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)){
          setdropdownValue([dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)?.currency_code])
          tempValue=dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)?.currency_code
        }else{
          setdropdownValue([compensation_benfits_group49b64.currency])
          tempValue=compensation_benfits_group49b64.currency
        }
      }else{
        let dstKey:string = dfd_currencycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{currency_no:compensation_benfits_group49b64.currency}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)?.currency_code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.currency_no === compensation_benfits_group49b64.currency)?.currency_code
      }else{
        setdropdownValue([compensation_benfits_group49b64.currency])
        tempValue=compensation_benfits_group49b64.currency
      }   
      }
    }
    if(currencyb8f2e?.trigger == true)
    {
      await handlechange(tempValue)
      setcurrencyb8f2e((pre:any)=>({...pre,trigger:false}))
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
  },[compensation_benfits_group49b64.currency, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_currencycombo_v1Props) && dfd_currencycombo_v1Props?.length == 1){
    // setcompensation_benfits_group49b64((pre:any)=>({...pre,currency:dfd_currencycombo_v1Props[0]?.currency}))
    }
  },[dfd_currencycombo_v1Props])

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
      setcompensation_benfits_group49b64((prev: any) => ({ ...prev, currency: getMapperDetailsBindValues[value],CURRENCY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setcompensation_benfits_group49b64((prev: any) => ({ ...prev, currency: '', currencyb8f2e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,currency:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.currency_no==getMapperDetailsBindValues[value] && items?.currency_code==value)) || {}
    selected.current={
      ...selectedObj||{},
      currency_code:value,
      currency_no:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['category_configuration_text'] = category_configuration_text97eea,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text97eea,
        codeStates['min_salary'] = min_salary807a5,
        codeStates['setmin_salary'] = setmin_salary807a5,
        codeStates['max_salary'] = max_salarye78c6,
        codeStates['setmax_salary'] = setmax_salarye78c6,
        codeStates['currency'] = currencyb8f2e,
        codeStates['setcurrency'] = setcurrencyb8f2e,
        codeStates['bonus_percentage'] = bonus_percentageae1ae,
        codeStates['setbonus_percentage'] = setbonus_percentageae1ae,
        codeStates['promotion_eligible'] = promotion_eligible4c314,
        codeStates['setpromotion_eligible'] = setpromotion_eligible4c314,
        codeStates['overtime_eligible'] = overtime_eligible66e37,
        codeStates['setovertime_eligible'] = setovertime_eligible66e37,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
    if(compensation_benfits_group49b64?.currency == "" || compensation_benfits_group49b64?.currency == undefined){
      compensation_benfits_group49b64.currency = "";
      const validate:any = v.safeParse(schema, compensation_benfits_group49b64?.currency);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,currency:"invalid"}}));
        }
    }else if(compensation_benfits_group49b64?.currency !== ""){
    const validate:any = v.safeParse(schema, compensation_benfits_group49b64?.currency);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,currency:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addEmployeeJobGrade_v1:{...pre?.addEmployeeJobGrade_v1,currency:undefined}}));
      }
    }
  }
  const compensation_benfits_group49b64Ref = useRef<any>(compensation_benfits_group49b64);
  useEffect(() => { compensation_benfits_group49b64Ref.current = compensation_benfits_group49b64; }, [compensation_benfits_group49b64]);
    useEffect(()=>{
        if(!compensation_benfits_group49b64?.currency)
        { 
          setcompensation_benfits_group49b64Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "07a7378161c333cc89afa6f76e3b8f2e") {
        handleClick(compensation_benfits_group49b64Ref?.current?.currencyb8f2e?compensation_benfits_group49b64Ref?.current?.currencyb8f2e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "07a7378161c333cc89afa6f76e3b8f2e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcompensation_benfits_group49b64((pre:any)=>({...pre,currency:""}))
    else
      setInitialCount(1)
  },[currencyb8f2e?.refresh])
  

  if (currencyb8f2e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 19`,
        gridRow: `8 / 22`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {currencyb8f2e?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Currency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={currencyOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={compensation_benfits_group49b64?.currencyb8f2e ? [compensation_benfits_group49b64?.currencyb8f2e] : (compensation_benfits_group49b64?.currency ? dropdownValue : [])}
        validationState={validate?.addEmployeeJobGrade_v1?.currency ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncurrency;
