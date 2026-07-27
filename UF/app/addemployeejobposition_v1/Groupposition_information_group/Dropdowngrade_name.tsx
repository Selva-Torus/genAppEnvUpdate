

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
const Dropdowngrade_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradenamecombo_v1Props, setdfd_gradenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {posiiton_information_texta2b56, setposiiton_information_texta2b56}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4553, setposition_codea4553}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda529, setposition_titleda529}= useContext(TotalContext) as TotalContextProps;
  const {description9d446, setdescription9d446}= useContext(TotalContext) as TotalContextProps;
  const {grade_namee4856, setgrade_namee4856}= useContext(TotalContext) as TotalContextProps;
  const {employment_type9bb76, setemployment_type9bb76}= useContext(TotalContext) as TotalContextProps;
  const {experience_required6a911, setexperience_required6a911}= useContext(TotalContext) as TotalContextProps;
  const {job_family4c9f2, setjob_family4c9f2}= useContext(TotalContext) as TotalContextProps;
  const {job_level77c64, setjob_level77c64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [grade_nameOptions, setgrade_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `grade_code_name`
    let mapperText: string =  `grade_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "b2c06e29b62cff17bf1e2725d255335b",
      "03333bcd94f344dba3c4445255de4856"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_gradenamecombo_v1Props.dstKey){
      dstKey = dfd_gradenamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_gradenamecombo_v1Props && !dfd_gradenamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setgrade_nameOptions(temp);
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
  },[grade_namee4856?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setposition_information_group5335b((prev: any) => ({ ...prev,grade_namee4856: value }))
      setIsRequredData(false)
    }else{
      let temp:any = position_information_group5335b;
      delete temp.grade_code_name;
      delete temp.GRADE_CODE_NAME;
      delete temp.grade_namee4856;
      setposition_information_group5335b(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,grade_code_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(position_information_group5335b.grade_code_name){
      if(Array.isArray(dfd_gradenamecombo_v1Props)){
        if(dfd_gradenamecombo_v1Props?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)){
          setdropdownValue([dfd_gradenamecombo_v1Props?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)?.grade_code_name])
          tempValue=dfd_gradenamecombo_v1Props?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)?.grade_code_name
        }else{
          setdropdownValue([position_information_group5335b.grade_code_name])
          tempValue=position_information_group5335b.grade_code_name
        }
      }else{
        let dstKey:string = dfd_gradenamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{grade_name:position_information_group5335b.grade_code_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)?.grade_code_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.grade_name === position_information_group5335b.grade_code_name)?.grade_code_name
      }else{
        setdropdownValue([position_information_group5335b.grade_code_name])
        tempValue=position_information_group5335b.grade_code_name
      }   
      }
    }
    if(grade_namee4856?.trigger == true)
    {
      await handlechange(tempValue)
      setgrade_namee4856((pre:any)=>({...pre,trigger:false}))
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
  },[position_information_group5335b.grade_code_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_gradenamecombo_v1Props) && dfd_gradenamecombo_v1Props?.length == 1){
    // setposition_information_group5335b((pre:any)=>({...pre,grade_code_name:dfd_gradenamecombo_v1Props[0]?.grade_code_name}))
    }
  },[dfd_gradenamecombo_v1Props])

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
      setposition_information_group5335b((prev: any) => ({ ...prev, grade_code_name: getMapperDetailsBindValues[value],GRADE_CODE_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setposition_information_group5335b((prev: any) => ({ ...prev, grade_code_name: '', grade_namee4856: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,grade_code_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.grade_name==getMapperDetailsBindValues[value] && items?.grade_code_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      grade_code_name:value,
      grade_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_groupae38a,
        codeStates['setoverall_group'] = setoverall_groupae38a,
        codeStates['overall_groupae38a'] = overall_groupae38aProps,
        codeStates['setoverall_groupae38a'] = setoverall_groupae38aProps,
        codeStates['position_information_group'] = position_information_group5335b,
        codeStates['setposition_information_group'] = setposition_information_group5335b,
        codeStates['position_information_group5335b'] = position_information_group5335bProps,
        codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
        codeStates['posiiton_information_text'] = posiiton_information_texta2b56,
        codeStates['setposiiton_information_text'] = setposiiton_information_texta2b56,
        codeStates['position_code'] = position_codea4553,
        codeStates['setposition_code'] = setposition_codea4553,
        codeStates['position_title'] = position_titleda529,
        codeStates['setposition_title'] = setposition_titleda529,
        codeStates['description'] = description9d446,
        codeStates['setdescription'] = setdescription9d446,
        codeStates['grade_name'] = grade_namee4856,
        codeStates['setgrade_name'] = setgrade_namee4856,
        codeStates['employment_type'] = employment_type9bb76,
        codeStates['setemployment_type'] = setemployment_type9bb76,
        codeStates['experience_required'] = experience_required6a911,
        codeStates['setexperience_required'] = setexperience_required6a911,
        codeStates['job_family'] = job_family4c9f2,
        codeStates['setjob_family'] = setjob_family4c9f2,
        codeStates['job_level'] = job_level77c64,
        codeStates['setjob_level'] = setjob_level77c64,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
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
    if(position_information_group5335b?.grade_code_name == "" || position_information_group5335b?.grade_code_name == undefined){
      position_information_group5335b.grade_code_name = "";
      const validate:any = v.safeParse(schema, position_information_group5335b?.grade_code_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,grade_code_name:"invalid"}}));
        }
    }else if(position_information_group5335b?.grade_code_name !== ""){
    const validate:any = v.safeParse(schema, position_information_group5335b?.grade_code_name);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,grade_code_name:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addEmployeeJobPosition_v1:{...pre?.addEmployeeJobPosition_v1,grade_code_name:undefined}}));
      }
    }
  }
  const position_information_group5335bRef = useRef<any>(position_information_group5335b);
  useEffect(() => { position_information_group5335bRef.current = position_information_group5335b; }, [position_information_group5335b]);
    useEffect(()=>{
        if(!position_information_group5335b?.grade_code_name)
        { 
          setposition_information_group5335bProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "03333bcd94f344dba3c4445255de4856") {
        handleClick(position_information_group5335bRef?.current?.grade_namee4856?position_information_group5335bRef?.current?.grade_namee4856:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "03333bcd94f344dba3c4445255de4856");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setposition_information_group5335b((pre:any)=>({...pre,grade_code_name:""}))
    else
      setInitialCount(1)
  },[grade_namee4856?.refresh])
  

  if (grade_namee4856?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `19 / 25`,
        gridRow: `8 / 22`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {grade_namee4856?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Grade
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={grade_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={position_information_group5335b?.grade_namee4856 ? [position_information_group5335b?.grade_namee4856] : (position_information_group5335b?.grade_code_name ? dropdownValue : [])}
        validationState={validate?.addEmployeeJobPosition_v1?.grade_code_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowngrade_name;
