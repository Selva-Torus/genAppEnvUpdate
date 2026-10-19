

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
const Dropdownapplies_tier_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risktiercodecombo_v1Props, setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {text792c7, settext792c7}= useContext(TotalContext) as TotalContextProps;
  const {template_code83f6f, settemplate_code83f6f}= useContext(TotalContext) as TotalContextProps;
  const {template_name53616, settemplate_name53616}= useContext(TotalContext) as TotalContextProps;
  const {template_versionc2087, settemplate_versionc2087}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code43474, setapplies_tier_code43474}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_caseeb4a2, setapplies_use_caseeb4a2}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typee00f2, setapplies_asset_typee00f2}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [applies_tier_codeOptions, setapplies_tier_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `code`
    let mapperText: string =  `code_value_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "9f4ba52dc6ca4093871518c8ad6ec16d",
      "e62c5d802a68435ab99c0fa851b43474"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_risktiercodecombo_v1Props.dstKey){
      dstKey = dfd_risktiercodecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_risktiercodecombo_v1Props && !dfd_risktiercodecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setapplies_tier_codeOptions(temp);
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
  },[applies_tier_code43474?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      settemplate_detail_groupec16d((prev: any) => ({ ...prev,applies_tier_code43474: value }))
      setIsRequredData(false)
    }else{
      let temp:any = template_detail_groupec16d;
      delete temp.applies_tier_code;
      delete temp.APPLIES_TIER_CODE;
      delete temp.applies_tier_code43474;
      settemplate_detail_groupec16d(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_tier_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(template_detail_groupec16d.applies_tier_code){
      if(Array.isArray(dfd_risktiercodecombo_v1Props)){
        if(dfd_risktiercodecombo_v1Props?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)){
          setdropdownValue([dfd_risktiercodecombo_v1Props?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)?.code])
          tempValue=dfd_risktiercodecombo_v1Props?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)?.code
        }else{
          setdropdownValue([template_detail_groupec16d.applies_tier_code])
          tempValue=template_detail_groupec16d.applies_tier_code
        }
      }else{
        let dstKey:string = dfd_risktiercodecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code_value_id:template_detail_groupec16d.applies_tier_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code_value_id === template_detail_groupec16d.applies_tier_code)?.code
      }else{
        setdropdownValue([template_detail_groupec16d.applies_tier_code])
        tempValue=template_detail_groupec16d.applies_tier_code
      }   
      }
    }
    if(applies_tier_code43474?.trigger == true)
    {
      await handlechange(tempValue)
      setapplies_tier_code43474((pre:any)=>({...pre,trigger:false}))
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
  },[template_detail_groupec16d.applies_tier_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_risktiercodecombo_v1Props) && dfd_risktiercodecombo_v1Props?.length == 1){
    // settemplate_detail_groupec16d((pre:any)=>({...pre,applies_tier_code:dfd_risktiercodecombo_v1Props[0]?.applies_tier_code}))
    }
  },[dfd_risktiercodecombo_v1Props])

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
      settemplate_detail_groupec16d((prev: any) => ({ ...prev, applies_tier_code: getMapperDetailsBindValues[value],APPLIES_TIER_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       settemplate_detail_groupec16d((prev: any) => ({ ...prev, applies_tier_code: '', applies_tier_code43474: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_tier_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code_value_id==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:value,
      code_value_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupb224b,
        codeStates['setgroup'] = setgroupb224b,
        codeStates['groupb224b'] = groupb224bProps,
        codeStates['setgroupb224b'] = setgroupb224bProps,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['text'] = text792c7,
        codeStates['settext'] = settext792c7,
        codeStates['template_code'] = template_code83f6f,
        codeStates['settemplate_code'] = settemplate_code83f6f,
        codeStates['template_name'] = template_name53616,
        codeStates['settemplate_name'] = settemplate_name53616,
        codeStates['template_version'] = template_versionc2087,
        codeStates['settemplate_version'] = settemplate_versionc2087,
        codeStates['applies_tier_code'] = applies_tier_code43474,
        codeStates['setapplies_tier_code'] = setapplies_tier_code43474,
        codeStates['applies_use_case'] = applies_use_caseeb4a2,
        codeStates['setapplies_use_case'] = setapplies_use_caseeb4a2,
        codeStates['applies_asset_type'] = applies_asset_typee00f2,
        codeStates['setapplies_asset_type'] = setapplies_asset_typee00f2,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
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
    if(template_detail_groupec16d?.applies_tier_code == "" || template_detail_groupec16d?.applies_tier_code == undefined){
      template_detail_groupec16d.applies_tier_code = "";
      const validate:any = v.safeParse(schema, template_detail_groupec16d?.applies_tier_code);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_tier_code:"invalid"}}));
        }
    }else if(template_detail_groupec16d?.applies_tier_code !== ""){
    const validate:any = v.safeParse(schema, template_detail_groupec16d?.applies_tier_code);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_tier_code:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,applies_tier_code:undefined}}));
      }
    }
  }
  const template_detail_groupec16dRef = useRef<any>(template_detail_groupec16d);
  useEffect(() => { template_detail_groupec16dRef.current = template_detail_groupec16d; }, [template_detail_groupec16d]);
    useEffect(()=>{
        if(!template_detail_groupec16d?.applies_tier_code)
        { 
          settemplate_detail_groupec16dProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "e62c5d802a68435ab99c0fa851b43474") {
        handleClick(template_detail_groupec16dRef?.current?.applies_tier_code43474?template_detail_groupec16dRef?.current?.applies_tier_code43474:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e62c5d802a68435ab99c0fa851b43474");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settemplate_detail_groupec16d((pre:any)=>({...pre,applies_tier_code:""}))
    else
      setInitialCount(1)
  },[applies_tier_code43474?.refresh])
  

  if (applies_tier_code43474?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `22 / 34`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {applies_tier_code43474?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Tier Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={applies_tier_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={template_detail_groupec16d?.applies_tier_code43474 ? [template_detail_groupec16d?.applies_tier_code43474] : (template_detail_groupec16d?.applies_tier_code ? dropdownValue : [])}
        validationState={validate?.addCertificateTemplate_v1?.applies_tier_code ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownapplies_tier_code;
