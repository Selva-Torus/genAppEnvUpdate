

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
const Dropdownasset_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule8c9ca, setinfo_rule8c9ca}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7bcd2, setasset_name7bcd2}= useContext(TotalContext) as TotalContextProps;
  const {principal_typee2125, setprincipal_typee2125}= useContext(TotalContext) as TotalContextProps;
  const {principal_id014c3, setprincipal_id014c3}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider06648, setidentity_provider06648}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [asset_nameOptions, setasset_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `asset_name`
    let mapperText: string =  `asset_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "2625f75e8e7d98ce085e0d93bb67e53e",
      "acf219436dee43a4633faa0458e7bcd2"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_assetnamecombo_v1Props.dstKey){
      dstKey = dfd_assetnamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_assetnamecombo_v1Props && !dfd_assetnamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setasset_nameOptions(temp);
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
  },[asset_name7bcd2?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrule_config_groupa7e53e((prev: any) => ({ ...prev,asset_name7bcd2: value }))
      setIsRequredData(false)
    }else{
      let temp:any = rule_config_groupa7e53e;
      delete temp.asset_name;
      delete temp.ASSET_NAME;
      delete temp.asset_name7bcd2;
      setrule_config_groupa7e53e(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,asset_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(rule_config_groupa7e53e.asset_name){
      if(Array.isArray(dfd_assetnamecombo_v1Props)){
        if(dfd_assetnamecombo_v1Props?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)){
          setdropdownValue([dfd_assetnamecombo_v1Props?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)?.asset_name])
          tempValue=dfd_assetnamecombo_v1Props?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)?.asset_name
        }else{
          setdropdownValue([rule_config_groupa7e53e.asset_name])
          tempValue=rule_config_groupa7e53e.asset_name
        }
      }else{
        let dstKey:string = dfd_assetnamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{asset_name:rule_config_groupa7e53e.asset_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)?.asset_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.asset_name === rule_config_groupa7e53e.asset_name)?.asset_name
      }else{
        setdropdownValue([rule_config_groupa7e53e.asset_name])
        tempValue=rule_config_groupa7e53e.asset_name
      }   
      }
    }
    if(asset_name7bcd2?.trigger == true)
    {
      await handlechange(tempValue)
      setasset_name7bcd2((pre:any)=>({...pre,trigger:false}))
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
  },[rule_config_groupa7e53e.asset_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_assetnamecombo_v1Props) && dfd_assetnamecombo_v1Props?.length == 1){
    // setrule_config_groupa7e53e((pre:any)=>({...pre,asset_name:dfd_assetnamecombo_v1Props[0]?.asset_name}))
    }
  },[dfd_assetnamecombo_v1Props])

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
      setrule_config_groupa7e53e((prev: any) => ({ ...prev, asset_name: getMapperDetailsBindValues[value],ASSET_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrule_config_groupa7e53e((prev: any) => ({ ...prev, asset_name: '', asset_name7bcd2: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,asset_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.asset_name==getMapperDetailsBindValues[value] && items?.asset_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['info_group'] = info_group9d912,
        codeStates['setinfo_group'] = setinfo_group9d912,
        codeStates['info_group9d912'] = info_group9d912Props,
        codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
        codeStates['group'] = groupe6728,
        codeStates['setgroup'] = setgroupe6728,
        codeStates['groupe6728'] = groupe6728Props,
        codeStates['setgroupe6728'] = setgroupe6728Props,
        codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
        codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
        codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
        codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
        codeStates['info_rule'] = info_rule8c9ca,
        codeStates['setinfo_rule'] = setinfo_rule8c9ca,
        codeStates['asset_name'] = asset_name7bcd2,
        codeStates['setasset_name'] = setasset_name7bcd2,
        codeStates['principal_type'] = principal_typee2125,
        codeStates['setprincipal_type'] = setprincipal_typee2125,
        codeStates['principal_id'] = principal_id014c3,
        codeStates['setprincipal_id'] = setprincipal_id014c3,
        codeStates['identity_provider'] = identity_provider06648,
        codeStates['setidentity_provider'] = setidentity_provider06648,
        codeStates['rule_config_group'] = rule_config_group98282,
        codeStates['setrule_config_group'] = setrule_config_group98282,
        codeStates['rule_config_group98282'] = rule_config_group98282Props,
        codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
        codeStates['dynamicactions'] = dynamicactions5796b,
        codeStates['setdynamicactions'] = setdynamicactions5796b,
        codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
        codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,
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
    if(rule_config_groupa7e53e?.asset_name == "" || rule_config_groupa7e53e?.asset_name == undefined){
      rule_config_groupa7e53e.asset_name = "";
      const validate:any = v.safeParse(schema, rule_config_groupa7e53e?.asset_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,asset_name:"invalid"}}));
        }
    }else if(rule_config_groupa7e53e?.asset_name !== ""){
    const validate:any = v.safeParse(schema, rule_config_groupa7e53e?.asset_name);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,asset_name:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,asset_name:undefined}}));
      }
    }
  }
  const rule_config_groupa7e53eRef = useRef<any>(rule_config_groupa7e53e);
  useEffect(() => { rule_config_groupa7e53eRef.current = rule_config_groupa7e53e; }, [rule_config_groupa7e53e]);
    useEffect(()=>{
        if(!rule_config_groupa7e53e?.asset_name)
        { 
          setrule_config_groupa7e53eProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "acf219436dee43a4633faa0458e7bcd2") {
        handleClick(rule_config_groupa7e53eRef?.current?.asset_name7bcd2?rule_config_groupa7e53eRef?.current?.asset_name7bcd2:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "acf219436dee43a4633faa0458e7bcd2");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrule_config_groupa7e53e((pre:any)=>({...pre,asset_name:""}))
    else
      setInitialCount(1)
  },[asset_name7bcd2?.refresh])
  

  if (asset_name7bcd2?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {asset_name7bcd2?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Agent Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={asset_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={rule_config_groupa7e53e?.asset_name7bcd2 ? [rule_config_groupa7e53e?.asset_name7bcd2] : (rule_config_groupa7e53e?.asset_name ? dropdownValue : [])}
        validationState={validate?.addServiceIdentity_v1?.asset_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownasset_name;
