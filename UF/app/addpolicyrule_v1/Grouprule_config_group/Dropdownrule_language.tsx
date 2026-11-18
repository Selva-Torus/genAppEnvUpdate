

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
const Dropdownrule_language = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyrulelanguagecombo_v1Props, setdfd_policyrulelanguagecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps;
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rulec9e0a, setinfo_rulec9e0a}= useContext(TotalContext) as TotalContextProps;
  const {rule_language1857d, setrule_language1857d}= useContext(TotalContext) as TotalContextProps;
  const {rule_body5e5de, setrule_body5e5de}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [rule_languageOptions, setrule_languageOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `code`
    let mapperText: string =  `code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "f81044d0dfc4f2d31240e065f008a62a",
      "546adc5a4aba443caade0d187a41857d"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_policyrulelanguagecombo_v1Props.dstKey){
      dstKey = dfd_policyrulelanguagecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_policyrulelanguagecombo_v1Props && !dfd_policyrulelanguagecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setrule_languageOptions(temp);
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
  },[rule_language1857d?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrule_config_group8a62a((prev: any) => ({ ...prev,rule_language1857d: value }))
      setIsRequredData(false)
    }else{
      let temp:any = rule_config_group8a62a;
      delete temp.rule_language;
      delete temp.RULE_LANGUAGE;
      delete temp.rule_language1857d;
      setrule_config_group8a62a(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_language:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(rule_config_group8a62a.rule_language){
      if(Array.isArray(dfd_policyrulelanguagecombo_v1Props)){
        if(dfd_policyrulelanguagecombo_v1Props?.find((item: any) => item.code === rule_config_group8a62a.rule_language)){
          setdropdownValue([dfd_policyrulelanguagecombo_v1Props?.find((item: any) => item.code === rule_config_group8a62a.rule_language)?.code])
          tempValue=dfd_policyrulelanguagecombo_v1Props?.find((item: any) => item.code === rule_config_group8a62a.rule_language)?.code
        }else{
          setdropdownValue([rule_config_group8a62a.rule_language])
          tempValue=rule_config_group8a62a.rule_language
        }
      }else{
        let dstKey:string = dfd_policyrulelanguagecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:rule_config_group8a62a.rule_language}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === rule_config_group8a62a.rule_language)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === rule_config_group8a62a.rule_language)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === rule_config_group8a62a.rule_language)?.code
      }else{
        setdropdownValue([rule_config_group8a62a.rule_language])
        tempValue=rule_config_group8a62a.rule_language
      }   
      }
    }
    if(rule_language1857d?.trigger == true)
    {
      await handlechange(tempValue)
      setrule_language1857d((pre:any)=>({...pre,trigger:false}))
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
  },[rule_config_group8a62a.rule_language, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_policyrulelanguagecombo_v1Props) && dfd_policyrulelanguagecombo_v1Props?.length == 1){
    // setrule_config_group8a62a((pre:any)=>({...pre,rule_language:dfd_policyrulelanguagecombo_v1Props[0]?.rule_language}))
    }
  },[dfd_policyrulelanguagecombo_v1Props])

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
      setrule_config_group8a62a((prev: any) => ({ ...prev, rule_language: getMapperDetailsBindValues[value],RULE_LANGUAGE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrule_config_group8a62a((prev: any) => ({ ...prev, rule_language: '', rule_language1857d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_language:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['info_rule'] = info_rulec9e0a,
        codeStates['setinfo_rule'] = setinfo_rulec9e0a,
        codeStates['rule_language'] = rule_language1857d,
        codeStates['setrule_language'] = setrule_language1857d,
        codeStates['rule_body'] = rule_body5e5de,
        codeStates['setrule_body'] = setrule_body5e5de,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
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
    if(rule_config_group8a62a?.rule_language == "" || rule_config_group8a62a?.rule_language == undefined){
      rule_config_group8a62a.rule_language = "";
      const validate:any = v.safeParse(schema, rule_config_group8a62a?.rule_language);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_language:"invalid"}}));
        }
    }else if(rule_config_group8a62a?.rule_language !== ""){
    const validate:any = v.safeParse(schema, rule_config_group8a62a?.rule_language);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_language:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,rule_language:undefined}}));
      }
    }
  }
  const rule_config_group8a62aRef = useRef<any>(rule_config_group8a62a);
  useEffect(() => { rule_config_group8a62aRef.current = rule_config_group8a62a; }, [rule_config_group8a62a]);
    useEffect(()=>{
        if(!rule_config_group8a62a?.rule_language)
        { 
          setrule_config_group8a62aProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "546adc5a4aba443caade0d187a41857d") {
        handleClick(rule_config_group8a62aRef?.current?.rule_language1857d?rule_config_group8a62aRef?.current?.rule_language1857d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "546adc5a4aba443caade0d187a41857d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrule_config_group8a62a((pre:any)=>({...pre,rule_language:""}))
    else
      setInitialCount(1)
  },[rule_language1857d?.refresh])
  

  if (rule_language1857d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {rule_language1857d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Rule Language
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={rule_languageOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={rule_config_group8a62a?.rule_language1857d ? [rule_config_group8a62a?.rule_language1857d] : (rule_config_group8a62a?.rule_language ? dropdownValue : [])}
        validationState={validate?.addPolicyRule_v1?.rule_language ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownrule_language;
