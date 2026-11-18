

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
const Dropdowncontainment_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchcontainstatuscombo_v1Props, setdfd_killswitchcontainstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40Props, setrisk_conf_groupd5f40Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_text51ebb, setlifecycle_text51ebb}= useContext(TotalContext) as TotalContextProps;
  const {action_no0eb05, setaction_no0eb05}= useContext(TotalContext) as TotalContextProps;
  const {sla_secondsefd7a, setsla_secondsefd7a}= useContext(TotalContext) as TotalContextProps;
  const {containment_status64350, setcontainment_status64350}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9Props, setdynamicactions512d9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [containment_statusOptions, setcontainment_statusOptions] = useState<string[]>([]);
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
      "80422efadd4c83fee3640ece73ed5f40",
      "bb8a048b8bf047fb89b2b8c877464350"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_killswitchcontainstatuscombo_v1Props.dstKey){
      dstKey = dfd_killswitchcontainstatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_killswitchcontainstatuscombo_v1Props && !dfd_killswitchcontainstatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcontainment_statusOptions(temp);
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
  },[containment_status64350?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrisk_conf_groupd5f40((prev: any) => ({ ...prev,containment_status64350: value }))
      setIsRequredData(false)
    }else{
      let temp:any = risk_conf_groupd5f40;
      delete temp.containment_status;
      delete temp.CONTAINMENT_STATUS;
      delete temp.containment_status64350;
      setrisk_conf_groupd5f40(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,containment_status:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(risk_conf_groupd5f40.containment_status){
      if(Array.isArray(dfd_killswitchcontainstatuscombo_v1Props)){
        if(dfd_killswitchcontainstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)){
          setdropdownValue([dfd_killswitchcontainstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)?.code])
          tempValue=dfd_killswitchcontainstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)?.code
        }else{
          setdropdownValue([risk_conf_groupd5f40.containment_status])
          tempValue=risk_conf_groupd5f40.containment_status
        }
      }else{
        let dstKey:string = dfd_killswitchcontainstatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:risk_conf_groupd5f40.containment_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupd5f40.containment_status)?.code
      }else{
        setdropdownValue([risk_conf_groupd5f40.containment_status])
        tempValue=risk_conf_groupd5f40.containment_status
      }   
      }
    }
    if(containment_status64350?.trigger == true)
    {
      await handlechange(tempValue)
      setcontainment_status64350((pre:any)=>({...pre,trigger:false}))
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
  },[risk_conf_groupd5f40.containment_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_killswitchcontainstatuscombo_v1Props) && dfd_killswitchcontainstatuscombo_v1Props?.length == 1){
    // setrisk_conf_groupd5f40((pre:any)=>({...pre,containment_status:dfd_killswitchcontainstatuscombo_v1Props[0]?.containment_status}))
    }
  },[dfd_killswitchcontainstatuscombo_v1Props])

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
      setrisk_conf_groupd5f40((prev: any) => ({ ...prev, containment_status: getMapperDetailsBindValues[value],CONTAINMENT_STATUS: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrisk_conf_groupd5f40((prev: any) => ({ ...prev, containment_status: '', containment_status64350: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,containment_status:undefined}}));
   
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
        codeStates['risk_conf_group'] = risk_conf_groupd5f40,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
        codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
        codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
        codeStates['lifecycle_text'] = lifecycle_text51ebb,
        codeStates['setlifecycle_text'] = setlifecycle_text51ebb,
        codeStates['action_no'] = action_no0eb05,
        codeStates['setaction_no'] = setaction_no0eb05,
        codeStates['sla_seconds'] = sla_secondsefd7a,
        codeStates['setsla_seconds'] = setsla_secondsefd7a,
        codeStates['containment_status'] = containment_status64350,
        codeStates['setcontainment_status'] = setcontainment_status64350,
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
    if(risk_conf_groupd5f40?.containment_status == "" || risk_conf_groupd5f40?.containment_status == undefined){
      risk_conf_groupd5f40.containment_status = "";
      const validate:any = v.safeParse(schema, risk_conf_groupd5f40?.containment_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,containment_status:"invalid"}}));
        }
    }else if(risk_conf_groupd5f40?.containment_status !== ""){
    const validate:any = v.safeParse(schema, risk_conf_groupd5f40?.containment_status);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,containment_status:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addKillSwitchAction_v1:{...pre?.addKillSwitchAction_v1,containment_status:undefined}}));
      }
    }
  }
  const risk_conf_groupd5f40Ref = useRef<any>(risk_conf_groupd5f40);
  useEffect(() => { risk_conf_groupd5f40Ref.current = risk_conf_groupd5f40; }, [risk_conf_groupd5f40]);
    useEffect(()=>{
        if(!risk_conf_groupd5f40?.containment_status)
        { 
          setrisk_conf_groupd5f40Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "bb8a048b8bf047fb89b2b8c877464350") {
        handleClick(risk_conf_groupd5f40Ref?.current?.containment_status64350?risk_conf_groupd5f40Ref?.current?.containment_status64350:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "bb8a048b8bf047fb89b2b8c877464350");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrisk_conf_groupd5f40((pre:any)=>({...pre,containment_status:""}))
    else
      setInitialCount(1)
  },[containment_status64350?.refresh])
  

  if (containment_status64350?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {containment_status64350?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Containment Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={containment_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={risk_conf_groupd5f40?.containment_status64350 ? [risk_conf_groupd5f40?.containment_status64350] : (risk_conf_groupd5f40?.containment_status ? dropdownValue : [])}
        validationState={validate?.addKillSwitchAction_v1?.containment_status ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncontainment_status;
