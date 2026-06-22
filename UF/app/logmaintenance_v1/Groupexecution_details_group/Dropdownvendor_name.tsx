

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
const Dropdownvendor_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_text71309, setexecution_details_text71309}= useContext(TotalContext) as TotalContextProps;
  const {performed_bycb4dc, setperformed_bycb4dc}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name17b17, setvendor_name17b17}= useContext(TotalContext) as TotalContextProps;
  const {vendor_referencefa982, setvendor_referencefa982}= useContext(TotalContext) as TotalContextProps;
  const {downtime_hours721c7, setdowntime_hours721c7}= useContext(TotalContext) as TotalContextProps;
  const {cost35190, setcost35190}= useContext(TotalContext) as TotalContextProps;
  const {descriptioneaa55, setdescriptioneaa55}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_checklist024ed, setmaintenance_checklist024ed}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [vendor_nameOptions, setvendor_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `vendor_name`
    let mapperText: string =  `vendor_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "6f620f2c13924269ac67da12e7f591cd",
      "9730ad908e55436984922671ade17b17"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_vendornamecombo_v1Props.dstKey){
      dstKey = dfd_vendornamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_vendornamecombo_v1Props && !dfd_vendornamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setvendor_nameOptions(temp);
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
  },[vendor_name17b17?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setexecution_details_group591cd((prev: any) => ({ ...prev, vendor_name: getMapperDetailsBindValues[value],vendor_name17b17: value,VENDOR_NAME: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = execution_details_group591cd;
      delete temp.vendor_name;
      delete temp.VENDOR_NAME;
      delete temp.vendor_name17b17;
      setexecution_details_group591cd(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,vendor_name:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(execution_details_group591cd.vendor_name){
      if(Array.isArray(dfd_vendornamecombo_v1Props)){
        if(dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)){
          setdropdownValue([dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)?.vendor_name])
          tempValue=dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)?.vendor_name
        }else{
          setdropdownValue([execution_details_group591cd.vendor_name])
          tempValue=execution_details_group591cd.vendor_name
        }
      }else{
        let dstKey:string = dfd_vendornamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{vendor_name:execution_details_group591cd.vendor_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)?.vendor_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.vendor_name === execution_details_group591cd.vendor_name)?.vendor_name
      }else{
        setdropdownValue([execution_details_group591cd.vendor_name])
        tempValue=execution_details_group591cd.vendor_name
      }   
      }
    }
    if(vendor_name17b17?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setvendor_name17b17((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[execution_details_group591cd.vendor_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_vendornamecombo_v1Props) && dfd_vendornamecombo_v1Props?.length == 1){
    // setexecution_details_group591cd((pre:any)=>({...pre,vendor_name:dfd_vendornamecombo_v1Props[0]?.vendor_name}))
    }
  },[dfd_vendornamecombo_v1Props])

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
      setexecution_details_group591cd((prev: any) => ({ ...prev, vendor_name: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setexecution_details_group591cd((prev: any) => ({ ...prev, vendor_name: '', vendor_name17b17: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,vendor_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.vendor_name==getMapperDetailsBindValues[value] && items?.vendor_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      vendor_name:value,
      vendor_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['execution_details_text'] = execution_details_text71309,
        codeStates['setexecution_details_text'] = setexecution_details_text71309,
        codeStates['performed_by'] = performed_bycb4dc,
        codeStates['setperformed_by'] = setperformed_bycb4dc,
        codeStates['vendor_name'] = vendor_name17b17,
        codeStates['setvendor_name'] = setvendor_name17b17,
        codeStates['vendor_reference'] = vendor_referencefa982,
        codeStates['setvendor_reference'] = setvendor_referencefa982,
        codeStates['downtime_hours'] = downtime_hours721c7,
        codeStates['setdowntime_hours'] = setdowntime_hours721c7,
        codeStates['cost'] = cost35190,
        codeStates['setcost'] = setcost35190,
        codeStates['description'] = descriptioneaa55,
        codeStates['setdescription'] = setdescriptioneaa55,
        codeStates['maintenance_checklist'] = maintenance_checklist024ed,
        codeStates['setmaintenance_checklist'] = setmaintenance_checklist024ed,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
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
      if(execution_details_group591cd?.vendor_name == "" || execution_details_group591cd?.vendor_name == undefined){
      execution_details_group591cd.vendor_name = "";
      const validate:any = v.safeParse(schema, execution_details_group591cd?.vendor_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,vendor_name:"invalid"}}));
        }
    }else if(execution_details_group591cd?.vendor_name !== ""){
    const validate:any = v.safeParse(schema, execution_details_group591cd?.vendor_name);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,logMaintenance_v1:{...pre?.logMaintenance_v1,vendor_name:"invalid"}}));
    }
    }
  }
  const execution_details_group591cdRef = useRef<any>(execution_details_group591cd);
  useEffect(() => { execution_details_group591cdRef.current = execution_details_group591cd; }, [execution_details_group591cd]);
    useEffect(()=>{
        if(!execution_details_group591cd?.vendor_name)
        { 
          setexecution_details_group591cdProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "9730ad908e55436984922671ade17b17") {
        handleClick(execution_details_group591cdRef?.current?.vendor_name17b17?execution_details_group591cdRef?.current?.vendor_name17b17:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9730ad908e55436984922671ade17b17");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setexecution_details_group591cd((pre:any)=>({...pre,vendor_name:""}))
    else
      setInitialCount(1)
  },[vendor_name17b17?.refresh])

  if (vendor_name17b17?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {vendor_name17b17?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Vendor Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={vendor_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={execution_details_group591cd?.vendor_name17b17 ? [execution_details_group591cd?.vendor_name17b17] : (execution_details_group591cd?.vendor_name ? dropdownValue : [])}
        validationState={validate?.logMaintenance_v1?.vendor_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownvendor_name;
