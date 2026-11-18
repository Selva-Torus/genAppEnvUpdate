

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
const Dropdownscope = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchscopecombo_v1Props, setdfd_killswitchscopecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_groupe35bf, setoverall_groupe35bf}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe35bfProps, setoverall_groupe35bfProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58f, setaction_details_group2c58f}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58fProps, setaction_details_group2c58fProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66c, setaction_detail_group4f66c}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66cProps, setaction_detail_group4f66cProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_text0a7d2, setasset_identity_text0a7d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name78a73, setasset_name78a73}= useContext(TotalContext) as TotalContextProps;
  const {scopeaf270, setscopeaf270}= useContext(TotalContext) as TotalContextProps;
  const {trigger_type5c6b5, settrigger_type5c6b5}= useContext(TotalContext) as TotalContextProps;
  const {trigger_refd1e0b, settrigger_refd1e0b}= useContext(TotalContext) as TotalContextProps;
  const {reasonde403, setreasonde403}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40Props, setrisk_conf_groupd5f40Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9Props, setdynamicactions512d9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [scopeOptions, setscopeOptions] = useState<string[]>([]);
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
      "50d91bc4a7f9ef6a5bf79c1785f4f66c",
      "dfce98c5a1354d919b4f356a249af270"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_killswitchscopecombo_v1Props.dstKey){
      dstKey = dfd_killswitchscopecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_killswitchscopecombo_v1Props && !dfd_killswitchscopecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setscopeOptions(temp);
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
  },[scopeaf270?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaction_detail_group4f66c((prev: any) => ({ ...prev,scopeaf270: value }))
      setIsRequredData(false)
    }else{
      let temp:any = action_detail_group4f66c;
      delete temp.scope;
      delete temp.SCOPE;
      delete temp.scopeaf270;
      setaction_detail_group4f66c(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,scope:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(action_detail_group4f66c.scope){
      if(Array.isArray(dfd_killswitchscopecombo_v1Props)){
        if(dfd_killswitchscopecombo_v1Props?.find((item: any) => item.code === action_detail_group4f66c.scope)){
          setdropdownValue([dfd_killswitchscopecombo_v1Props?.find((item: any) => item.code === action_detail_group4f66c.scope)?.code])
          tempValue=dfd_killswitchscopecombo_v1Props?.find((item: any) => item.code === action_detail_group4f66c.scope)?.code
        }else{
          setdropdownValue([action_detail_group4f66c.scope])
          tempValue=action_detail_group4f66c.scope
        }
      }else{
        let dstKey:string = dfd_killswitchscopecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:action_detail_group4f66c.scope}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === action_detail_group4f66c.scope)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === action_detail_group4f66c.scope)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === action_detail_group4f66c.scope)?.code
      }else{
        setdropdownValue([action_detail_group4f66c.scope])
        tempValue=action_detail_group4f66c.scope
      }   
      }
    }
    if(scopeaf270?.trigger == true)
    {
      await handlechange(tempValue)
      setscopeaf270((pre:any)=>({...pre,trigger:false}))
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
  },[action_detail_group4f66c.scope, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_killswitchscopecombo_v1Props) && dfd_killswitchscopecombo_v1Props?.length == 1){
    // setaction_detail_group4f66c((pre:any)=>({...pre,scope:dfd_killswitchscopecombo_v1Props[0]?.scope}))
    }
  },[dfd_killswitchscopecombo_v1Props])

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
      setaction_detail_group4f66c((prev: any) => ({ ...prev, scope: getMapperDetailsBindValues[value],SCOPE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaction_detail_group4f66c((prev: any) => ({ ...prev, scope: '', scopeaf270: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,scope:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_groupe35bf,
        codeStates['setoverall_group'] = setoverall_groupe35bf,
        codeStates['overall_groupe35bf'] = overall_groupe35bfProps,
        codeStates['setoverall_groupe35bf'] = setoverall_groupe35bfProps,
        codeStates['action_details_group'] = action_details_group2c58f,
        codeStates['setaction_details_group'] = setaction_details_group2c58f,
        codeStates['action_details_group2c58f'] = action_details_group2c58fProps,
        codeStates['setaction_details_group2c58f'] = setaction_details_group2c58fProps,
        codeStates['action_detail_group'] = action_detail_group4f66c,
        codeStates['setaction_detail_group'] = setaction_detail_group4f66c,
        codeStates['action_detail_group4f66c'] = action_detail_group4f66cProps,
        codeStates['setaction_detail_group4f66c'] = setaction_detail_group4f66cProps,
        codeStates['asset_identity_text'] = asset_identity_text0a7d2,
        codeStates['setasset_identity_text'] = setasset_identity_text0a7d2,
        codeStates['asset_name'] = asset_name78a73,
        codeStates['setasset_name'] = setasset_name78a73,
        codeStates['scope'] = scopeaf270,
        codeStates['setscope'] = setscopeaf270,
        codeStates['trigger_type'] = trigger_type5c6b5,
        codeStates['settrigger_type'] = settrigger_type5c6b5,
        codeStates['trigger_ref'] = trigger_refd1e0b,
        codeStates['settrigger_ref'] = settrigger_refd1e0b,
        codeStates['reason'] = reasonde403,
        codeStates['setreason'] = setreasonde403,
        codeStates['risk_conf_group'] = risk_conf_groupd5f40,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
        codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
        codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
        codeStates['dynamicactions'] = dynamicactions512d9,
        codeStates['setdynamicactions'] = setdynamicactions512d9,
        codeStates['dynamicactions512d9'] = dynamicactions512d9Props,
        codeStates['setdynamicactions512d9'] = setdynamicactions512d9Props,
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
    if(action_detail_group4f66c?.scope == "" || action_detail_group4f66c?.scope == undefined){
      action_detail_group4f66c.scope = "";
      const validate:any = v.safeParse(schema, action_detail_group4f66c?.scope);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,scope:"invalid"}}));
        }
    }else if(action_detail_group4f66c?.scope !== ""){
    const validate:any = v.safeParse(schema, action_detail_group4f66c?.scope);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,scope:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,scope:undefined}}));
      }
    }
  }
  const action_detail_group4f66cRef = useRef<any>(action_detail_group4f66c);
  useEffect(() => { action_detail_group4f66cRef.current = action_detail_group4f66c; }, [action_detail_group4f66c]);
    useEffect(()=>{
        if(!action_detail_group4f66c?.scope)
        { 
          setaction_detail_group4f66cProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "dfce98c5a1354d919b4f356a249af270") {
        handleClick(action_detail_group4f66cRef?.current?.scopeaf270?action_detail_group4f66cRef?.current?.scopeaf270:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "dfce98c5a1354d919b4f356a249af270");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_group4f66c((pre:any)=>({...pre,scope:""}))
    else
      setInitialCount(1)
  },[scopeaf270?.refresh])
  

  if (scopeaf270?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {scopeaf270?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Scope
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={scopeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={action_detail_group4f66c?.scopeaf270 ? [action_detail_group4f66c?.scopeaf270] : (action_detail_group4f66c?.scope ? dropdownValue : [])}
        validationState={validate?.addKillSwitchAction_v1?.scope ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownscope;
