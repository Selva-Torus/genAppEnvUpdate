

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
const Dropdownverification_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_checkverificationstatuscombo_v1Props, setdfd_checkverificationstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_group03ace, setnew_access_group03ace}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group03aceProps, setnew_access_group03aceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45d, setaccess_req__groupdd45d}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdd45dProps, setaccess_req__groupdd45dProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf3b506, setbasic_inf3b506}= useContext(TotalContext) as TotalContextProps;
  const {full_name8ae05, setfull_name8ae05}= useContext(TotalContext) as TotalContextProps;
  const {check_typef3ff8, setcheck_typef3ff8}= useContext(TotalContext) as TotalContextProps;
  const {vendor_namee351e, setvendor_namee351e}= useContext(TotalContext) as TotalContextProps;
  const {initiated_datececee, setinitiated_datececee}= useContext(TotalContext) as TotalContextProps;
  const {completed_date8c01c, setcompleted_date8c01c}= useContext(TotalContext) as TotalContextProps;
  const {result1c616, setresult1c616}= useContext(TotalContext) as TotalContextProps;
  const {verification_status6e272, setverification_status6e272}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865, setaddt__dts_group0d865}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group0d865Props, setaddt__dts_group0d865Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [verification_statusOptions, setverification_statusOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `bgv_verification_status`
    let mapperText: string =  `bgv_verification_status`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "aa63cc980d8a062328ccc4745cadd45d",
      "88616c58c6d14a6c93c3e8566146e272"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_checkverificationstatuscombo_v1Props.dstKey){
      dstKey = dfd_checkverificationstatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_checkverificationstatuscombo_v1Props && !dfd_checkverificationstatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setverification_statusOptions(temp);
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
  },[verification_status6e272?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__groupdd45d((prev: any) => ({ ...prev,verification_status6e272: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__groupdd45d;
      delete temp.verification_status;
      delete temp.VERIFICATION_STATUS;
      delete temp.verification_status6e272;
      setaccess_req__groupdd45d(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,verification_status:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__groupdd45d.verification_status){
      if(Array.isArray(dfd_checkverificationstatuscombo_v1Props)){
        if(dfd_checkverificationstatuscombo_v1Props?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)){
          setdropdownValue([dfd_checkverificationstatuscombo_v1Props?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)?.bgv_verification_status])
          tempValue=dfd_checkverificationstatuscombo_v1Props?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)?.bgv_verification_status
        }else{
          setdropdownValue([access_req__groupdd45d.verification_status])
          tempValue=access_req__groupdd45d.verification_status
        }
      }else{
        let dstKey:string = dfd_checkverificationstatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{bgv_verification_status:access_req__groupdd45d.verification_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)?.bgv_verification_status ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.bgv_verification_status === access_req__groupdd45d.verification_status)?.bgv_verification_status
      }else{
        setdropdownValue([access_req__groupdd45d.verification_status])
        tempValue=access_req__groupdd45d.verification_status
      }   
      }
    }
    if(verification_status6e272?.trigger == true)
    {
      await handlechange(tempValue)
      setverification_status6e272((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__groupdd45d.verification_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_checkverificationstatuscombo_v1Props) && dfd_checkverificationstatuscombo_v1Props?.length == 1){
    // setaccess_req__groupdd45d((pre:any)=>({...pre,verification_status:dfd_checkverificationstatuscombo_v1Props[0]?.verification_status}))
    }
  },[dfd_checkverificationstatuscombo_v1Props])

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
      setaccess_req__groupdd45d((prev: any) => ({ ...prev, verification_status: getMapperDetailsBindValues[value],VERIFICATION_STATUS: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__groupdd45d((prev: any) => ({ ...prev, verification_status: '', verification_status6e272: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,verification_status:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.bgv_verification_status==getMapperDetailsBindValues[value] && items?.bgv_verification_status==value)) || {}
    selected.current={
      ...selectedObj||{},
      bgv_verification_status:value,
      bgv_verification_status:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_group03ace,
        codeStates['setnew_access_group'] = setnew_access_group03ace,
        codeStates['new_access_group03ace'] = new_access_group03aceProps,
        codeStates['setnew_access_group03ace'] = setnew_access_group03aceProps,
        codeStates['access_req__group'] = access_req__groupdd45d,
        codeStates['setaccess_req__group'] = setaccess_req__groupdd45d,
        codeStates['access_req__groupdd45d'] = access_req__groupdd45dProps,
        codeStates['setaccess_req__groupdd45d'] = setaccess_req__groupdd45dProps,
        codeStates['basic_inf'] = basic_inf3b506,
        codeStates['setbasic_inf'] = setbasic_inf3b506,
        codeStates['full_name'] = full_name8ae05,
        codeStates['setfull_name'] = setfull_name8ae05,
        codeStates['check_type'] = check_typef3ff8,
        codeStates['setcheck_type'] = setcheck_typef3ff8,
        codeStates['vendor_name'] = vendor_namee351e,
        codeStates['setvendor_name'] = setvendor_namee351e,
        codeStates['initiated_date'] = initiated_datececee,
        codeStates['setinitiated_date'] = setinitiated_datececee,
        codeStates['completed_date'] = completed_date8c01c,
        codeStates['setcompleted_date'] = setcompleted_date8c01c,
        codeStates['result'] = result1c616,
        codeStates['setresult'] = setresult1c616,
        codeStates['verification_status'] = verification_status6e272,
        codeStates['setverification_status'] = setverification_status6e272,
        codeStates['addt__dts_group'] = addt__dts_group0d865,
        codeStates['setaddt__dts_group'] = setaddt__dts_group0d865,
        codeStates['addt__dts_group0d865'] = addt__dts_group0d865Props,
        codeStates['setaddt__dts_group0d865'] = setaddt__dts_group0d865Props,
        codeStates['dynamicactions'] = dynamicactions2fc7f,
        codeStates['setdynamicactions'] = setdynamicactions2fc7f,
        codeStates['dynamicactions2fc7f'] = dynamicactions2fc7fProps,
        codeStates['setdynamicactions2fc7f'] = setdynamicactions2fc7fProps,
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
    if(access_req__groupdd45d?.verification_status == "" || access_req__groupdd45d?.verification_status == undefined){
      access_req__groupdd45d.verification_status = "";
      const validate:any = v.safeParse(schema, access_req__groupdd45d?.verification_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,verification_status:"invalid"}}));
        }
    }else if(access_req__groupdd45d?.verification_status !== ""){
    const validate:any = v.safeParse(schema, access_req__groupdd45d?.verification_status);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,verification_status:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,newBackgroundCheck_v1:{...pre?.newBackgroundCheck_v1,verification_status:undefined}}));
      }
    }
  }
  const access_req__groupdd45dRef = useRef<any>(access_req__groupdd45d);
  useEffect(() => { access_req__groupdd45dRef.current = access_req__groupdd45d; }, [access_req__groupdd45d]);
    useEffect(()=>{
        if(!access_req__groupdd45d?.verification_status)
        { 
          setaccess_req__groupdd45dProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "88616c58c6d14a6c93c3e8566146e272") {
        handleClick(access_req__groupdd45dRef?.current?.verification_status6e272?access_req__groupdd45dRef?.current?.verification_status6e272:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "88616c58c6d14a6c93c3e8566146e272");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__groupdd45d((pre:any)=>({...pre,verification_status:""}))
    else
      setInitialCount(1)
  },[verification_status6e272?.refresh])
  

  if (verification_status6e272?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 19`,
        gridRow: `20 / 32`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {verification_status6e272?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Verification Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={verification_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__groupdd45d?.verification_status6e272 ? [access_req__groupdd45d?.verification_status6e272] : (access_req__groupdd45d?.verification_status ? dropdownValue : [])}
        validationState={validate?.newBackgroundCheck_v1?.verification_status ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownverification_status;
