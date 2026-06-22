

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
const Dropdownrisk_level = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_text9bbdf, setclassification_text9bbdf}= useContext(TotalContext) as TotalContextProps;
  const {classification8722b, setclassification8722b}= useContext(TotalContext) as TotalContextProps;
  const {data_classification45708, setdata_classification45708}= useContext(TotalContext) as TotalContextProps;
  const {ownership_type1a506, setownership_type1a506}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_stage1446e, setlifecycle_stage1446e}= useContext(TotalContext) as TotalContextProps;
  const {asset_condition414c5, setasset_condition414c5}= useContext(TotalContext) as TotalContextProps;
  const {risk_levelf1e8c, setrisk_levelf1e8c}= useContext(TotalContext) as TotalContextProps;
  const {is_critical0f006, setis_critical0f006}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [risk_levelOptions, setrisk_levelOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `risk_level`
    let mapperText: string =  `risk_level`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "43f361b4c0a74138ba1001e580d3c6b3",
      "d7d4c174efff4135a9bf22eb91ef1e8c"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_risklevelcombo_v1Props.dstKey){
      dstKey = dfd_risklevelcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_risklevelcombo_v1Props && !dfd_risklevelcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setrisk_levelOptions(temp);
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
  },[risk_levelf1e8c?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setclassification_group3c6b3((prev: any) => ({ ...prev, risk_level: getMapperDetailsBindValues[value],risk_levelf1e8c: value,RISK_LEVEL: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = classification_group3c6b3;
      delete temp.risk_level;
      delete temp.RISK_LEVEL;
      delete temp.risk_levelf1e8c;
      setclassification_group3c6b3(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,risk_level:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(classification_group3c6b3.risk_level){
      if(Array.isArray(dfd_risklevelcombo_v1Props)){
        if(dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)){
          setdropdownValue([dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)?.risk_level])
          tempValue=dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)?.risk_level
        }else{
          setdropdownValue([classification_group3c6b3.risk_level])
          tempValue=classification_group3c6b3.risk_level
        }
      }else{
        let dstKey:string = dfd_risklevelcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{risk_level:classification_group3c6b3.risk_level}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)?.risk_level ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.risk_level === classification_group3c6b3.risk_level)?.risk_level
      }else{
        setdropdownValue([classification_group3c6b3.risk_level])
        tempValue=classification_group3c6b3.risk_level
      }   
      }
    }
    if(risk_levelf1e8c?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setrisk_levelf1e8c((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[classification_group3c6b3.risk_level, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_risklevelcombo_v1Props) && dfd_risklevelcombo_v1Props?.length == 1){
    // setclassification_group3c6b3((pre:any)=>({...pre,risk_level:dfd_risklevelcombo_v1Props[0]?.risk_level}))
    }
  },[dfd_risklevelcombo_v1Props])

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
      setclassification_group3c6b3((prev: any) => ({ ...prev, risk_level: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setclassification_group3c6b3((prev: any) => ({ ...prev, risk_level: '', risk_levelf1e8c: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,risk_level:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.risk_level==getMapperDetailsBindValues[value] && items?.risk_level==value)) || {}
    selected.current={
      ...selectedObj||{},
      risk_level:value,
      risk_level:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['classification_text'] = classification_text9bbdf,
        codeStates['setclassification_text'] = setclassification_text9bbdf,
        codeStates['classification'] = classification8722b,
        codeStates['setclassification'] = setclassification8722b,
        codeStates['data_classification'] = data_classification45708,
        codeStates['setdata_classification'] = setdata_classification45708,
        codeStates['ownership_type'] = ownership_type1a506,
        codeStates['setownership_type'] = setownership_type1a506,
        codeStates['lifecycle_stage'] = lifecycle_stage1446e,
        codeStates['setlifecycle_stage'] = setlifecycle_stage1446e,
        codeStates['asset_condition'] = asset_condition414c5,
        codeStates['setasset_condition'] = setasset_condition414c5,
        codeStates['risk_level'] = risk_levelf1e8c,
        codeStates['setrisk_level'] = setrisk_levelf1e8c,
        codeStates['is_critical'] = is_critical0f006,
        codeStates['setis_critical'] = setis_critical0f006,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
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
      if(classification_group3c6b3?.risk_level == "" || classification_group3c6b3?.risk_level == undefined){
      classification_group3c6b3.risk_level = "";
      const validate:any = v.safeParse(schema, classification_group3c6b3?.risk_level);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,risk_level:"invalid"}}));
        }
    }else if(classification_group3c6b3?.risk_level !== ""){
    const validate:any = v.safeParse(schema, classification_group3c6b3?.risk_level);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,risk_level:"invalid"}}));
    }
    }
  }
  const classification_group3c6b3Ref = useRef<any>(classification_group3c6b3);
  useEffect(() => { classification_group3c6b3Ref.current = classification_group3c6b3; }, [classification_group3c6b3]);
    useEffect(()=>{
        if(!classification_group3c6b3?.risk_level)
        { 
          setclassification_group3c6b3Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "d7d4c174efff4135a9bf22eb91ef1e8c") {
        handleClick(classification_group3c6b3Ref?.current?.risk_levelf1e8c?classification_group3c6b3Ref?.current?.risk_levelf1e8c:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "d7d4c174efff4135a9bf22eb91ef1e8c");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setclassification_group3c6b3((pre:any)=>({...pre,risk_level:""}))
    else
      setInitialCount(1)
  },[risk_levelf1e8c?.refresh])

  if (risk_levelf1e8c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `21 / 33`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {risk_levelf1e8c?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Risk Level
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={risk_levelOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={classification_group3c6b3?.risk_levelf1e8c ? [classification_group3c6b3?.risk_levelf1e8c] : (classification_group3c6b3?.risk_level ? dropdownValue : [])}
        validationState={validate?.newAsset_v1?.risk_level ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownrisk_level;
