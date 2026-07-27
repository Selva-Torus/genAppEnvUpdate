

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
const Dropdownemployment_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employmenttypecombo_v1Props, setdfd_employmenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {posiiton_information_text98456, setposiiton_information_text98456}= useContext(TotalContext) as TotalContextProps;
  const {position_codea8a48, setposition_codea8a48}= useContext(TotalContext) as TotalContextProps;
  const {position_title6e1ab, setposition_title6e1ab}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf7b05, setdescriptionf7b05}= useContext(TotalContext) as TotalContextProps;
  const {grade_name11b6f, setgrade_name11b6f}= useContext(TotalContext) as TotalContextProps;
  const {employment_type77cb7, setemployment_type77cb7}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredd886e, setexperience_requiredd886e}= useContext(TotalContext) as TotalContextProps;
  const {job_familyebc1e, setjob_familyebc1e}= useContext(TotalContext) as TotalContextProps;
  const {job_level44b70, setjob_level44b70}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [employment_typeOptions, setemployment_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `employment_type`
    let mapperText: string =  `employment_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "c7b866caed721de00fbfdfc1f8967802",
      "9c5ccefc8c10ffa775b3b5c7f6c77cb7"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_employmenttypecombo_v1Props.dstKey){
      dstKey = dfd_employmenttypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_employmenttypecombo_v1Props && !dfd_employmenttypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setemployment_typeOptions(temp);
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
  },[employment_type77cb7?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setposition_information_group67802((prev: any) => ({ ...prev,employment_type77cb7: value }))
      setIsRequredData(false)
    }else{
      let temp:any = position_information_group67802;
      delete temp.employment_type;
      delete temp.EMPLOYMENT_TYPE;
      delete temp.employment_type77cb7;
      setposition_information_group67802(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,employment_type:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(position_information_group67802.employment_type){
      if(Array.isArray(dfd_employmenttypecombo_v1Props)){
        if(dfd_employmenttypecombo_v1Props?.find((item: any) => item.employment_type === position_information_group67802.employment_type)){
          setdropdownValue([dfd_employmenttypecombo_v1Props?.find((item: any) => item.employment_type === position_information_group67802.employment_type)?.employment_type])
          tempValue=dfd_employmenttypecombo_v1Props?.find((item: any) => item.employment_type === position_information_group67802.employment_type)?.employment_type
        }else{
          setdropdownValue([position_information_group67802.employment_type])
          tempValue=position_information_group67802.employment_type
        }
      }else{
        let dstKey:string = dfd_employmenttypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{employment_type:position_information_group67802.employment_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.employment_type === position_information_group67802.employment_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.employment_type === position_information_group67802.employment_type)?.employment_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.employment_type === position_information_group67802.employment_type)?.employment_type
      }else{
        setdropdownValue([position_information_group67802.employment_type])
        tempValue=position_information_group67802.employment_type
      }   
      }
    }
    if(employment_type77cb7?.trigger == true)
    {
      await handlechange(tempValue)
      setemployment_type77cb7((pre:any)=>({...pre,trigger:false}))
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
  },[position_information_group67802.employment_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_employmenttypecombo_v1Props) && dfd_employmenttypecombo_v1Props?.length == 1){
    // setposition_information_group67802((pre:any)=>({...pre,employment_type:dfd_employmenttypecombo_v1Props[0]?.employment_type}))
    }
  },[dfd_employmenttypecombo_v1Props])

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
      setposition_information_group67802((prev: any) => ({ ...prev, employment_type: getMapperDetailsBindValues[value],EMPLOYMENT_TYPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setposition_information_group67802((prev: any) => ({ ...prev, employment_type: '', employment_type77cb7: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,employment_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.employment_type==getMapperDetailsBindValues[value] && items?.employment_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      employment_type:value,
      employment_type:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['posiiton_information_text'] = posiiton_information_text98456,
        codeStates['setposiiton_information_text'] = setposiiton_information_text98456,
        codeStates['position_code'] = position_codea8a48,
        codeStates['setposition_code'] = setposition_codea8a48,
        codeStates['position_title'] = position_title6e1ab,
        codeStates['setposition_title'] = setposition_title6e1ab,
        codeStates['description'] = descriptionf7b05,
        codeStates['setdescription'] = setdescriptionf7b05,
        codeStates['grade_name'] = grade_name11b6f,
        codeStates['setgrade_name'] = setgrade_name11b6f,
        codeStates['employment_type'] = employment_type77cb7,
        codeStates['setemployment_type'] = setemployment_type77cb7,
        codeStates['experience_required'] = experience_requiredd886e,
        codeStates['setexperience_required'] = setexperience_requiredd886e,
        codeStates['job_family'] = job_familyebc1e,
        codeStates['setjob_family'] = setjob_familyebc1e,
        codeStates['job_level'] = job_level44b70,
        codeStates['setjob_level'] = setjob_level44b70,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
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
    if(position_information_group67802?.employment_type == "" || position_information_group67802?.employment_type == undefined){
      position_information_group67802.employment_type = "";
      const validate:any = v.safeParse(schema, position_information_group67802?.employment_type);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,employment_type:"invalid"}}));
        }
    }else if(position_information_group67802?.employment_type !== ""){
    const validate:any = v.safeParse(schema, position_information_group67802?.employment_type);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,employment_type:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewEmployeeJobPosition_v1:{...pre?.viewEmployeeJobPosition_v1,employment_type:undefined}}));
      }
    }
  }
  const position_information_group67802Ref = useRef<any>(position_information_group67802);
  useEffect(() => { position_information_group67802Ref.current = position_information_group67802; }, [position_information_group67802]);
    useEffect(()=>{
        if(!position_information_group67802?.employment_type)
        { 
          setposition_information_group67802Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "9c5ccefc8c10ffa775b3b5c7f6c77cb7") {
        handleClick(position_information_group67802Ref?.current?.employment_type77cb7?position_information_group67802Ref?.current?.employment_type77cb7:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9c5ccefc8c10ffa775b3b5c7f6c77cb7");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setposition_information_group67802((pre:any)=>({...pre,employment_type:""}))
    else
      setInitialCount(1)
  },[employment_type77cb7?.refresh])
  

  if (employment_type77cb7?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 7`,
        gridRow: `23 / 37`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {employment_type77cb7?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Employment Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={employment_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={position_information_group67802?.employment_type77cb7 ? [position_information_group67802?.employment_type77cb7] : (position_information_group67802?.employment_type ? dropdownValue : [])}
        validationState={validate?.viewEmployeeJobPosition_v1?.employment_type ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownemployment_type;
