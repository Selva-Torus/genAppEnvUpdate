

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
const Dropdownstage_type_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_certificationstagetypecodecombo_v1Props, setdfd_certificationstagetypecodecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {text0cd7b, settext0cd7b}= useContext(TotalContext) as TotalContextProps;
  const {template_name79179, settemplate_name79179}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequencefde55, setstage_sequencefde55}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code9ccdc, setstage_type_code9ccdc}= useContext(TotalContext) as TotalContextProps;
  const {stage_name3c785, setstage_name3c785}= useContext(TotalContext) as TotalContextProps;
  const {sla_days5202a, setsla_days5202a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [stage_type_codeOptions, setstage_type_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `code`
    let mapperText: string =  `code_type_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "46a149b3f2104ac7ab84a4d24643cc06",
      "0a343e04cb0b4cbc9fe04f79a719ccdc"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_certificationstagetypecodecombo_v1Props.dstKey){
      dstKey = dfd_certificationstagetypecodecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_certificationstagetypecodecombo_v1Props && !dfd_certificationstagetypecodecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setstage_type_codeOptions(temp);
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
  },[stage_type_code9ccdc?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setstage_details_group3cc06((prev: any) => ({ ...prev,stage_type_code9ccdc: value }))
      setIsRequredData(false)
    }else{
      let temp:any = stage_details_group3cc06;
      delete temp.stage_type_code;
      delete temp.STAGE_TYPE_CODE;
      delete temp.stage_type_code9ccdc;
      setstage_details_group3cc06(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_type_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(stage_details_group3cc06.stage_type_code){
      if(Array.isArray(dfd_certificationstagetypecodecombo_v1Props)){
        if(dfd_certificationstagetypecodecombo_v1Props?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)){
          setdropdownValue([dfd_certificationstagetypecodecombo_v1Props?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)?.code])
          tempValue=dfd_certificationstagetypecodecombo_v1Props?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)?.code
        }else{
          setdropdownValue([stage_details_group3cc06.stage_type_code])
          tempValue=stage_details_group3cc06.stage_type_code
        }
      }else{
        let dstKey:string = dfd_certificationstagetypecodecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code_type_id:stage_details_group3cc06.stage_type_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code_type_id === stage_details_group3cc06.stage_type_code)?.code
      }else{
        setdropdownValue([stage_details_group3cc06.stage_type_code])
        tempValue=stage_details_group3cc06.stage_type_code
      }   
      }
    }
    if(stage_type_code9ccdc?.trigger == true)
    {
      await handlechange(tempValue)
      setstage_type_code9ccdc((pre:any)=>({...pre,trigger:false}))
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
  },[stage_details_group3cc06.stage_type_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_certificationstagetypecodecombo_v1Props) && dfd_certificationstagetypecodecombo_v1Props?.length == 1){
    // setstage_details_group3cc06((pre:any)=>({...pre,stage_type_code:dfd_certificationstagetypecodecombo_v1Props[0]?.stage_type_code}))
    }
  },[dfd_certificationstagetypecodecombo_v1Props])

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
      setstage_details_group3cc06((prev: any) => ({ ...prev, stage_type_code: getMapperDetailsBindValues[value],STAGE_TYPE_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setstage_details_group3cc06((prev: any) => ({ ...prev, stage_type_code: '', stage_type_code9ccdc: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_type_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code_type_id==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:value,
      code_type_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['text'] = text0cd7b,
        codeStates['settext'] = settext0cd7b,
        codeStates['template_name'] = template_name79179,
        codeStates['settemplate_name'] = settemplate_name79179,
        codeStates['stage_sequence'] = stage_sequencefde55,
        codeStates['setstage_sequence'] = setstage_sequencefde55,
        codeStates['stage_type_code'] = stage_type_code9ccdc,
        codeStates['setstage_type_code'] = setstage_type_code9ccdc,
        codeStates['stage_name'] = stage_name3c785,
        codeStates['setstage_name'] = setstage_name3c785,
        codeStates['sla_days'] = sla_days5202a,
        codeStates['setsla_days'] = setsla_days5202a,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
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
    if(stage_details_group3cc06?.stage_type_code == "" || stage_details_group3cc06?.stage_type_code == undefined){
      stage_details_group3cc06.stage_type_code = "";
      const validate:any = v.safeParse(schema, stage_details_group3cc06?.stage_type_code);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_type_code:"invalid"}}));
        }
    }else if(stage_details_group3cc06?.stage_type_code !== ""){
    const validate:any = v.safeParse(schema, stage_details_group3cc06?.stage_type_code);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_type_code:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,stage_type_code:undefined}}));
      }
    }
  }
  const stage_details_group3cc06Ref = useRef<any>(stage_details_group3cc06);
  useEffect(() => { stage_details_group3cc06Ref.current = stage_details_group3cc06; }, [stage_details_group3cc06]);
    useEffect(()=>{
        if(!stage_details_group3cc06?.stage_type_code)
        { 
          setstage_details_group3cc06Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "0a343e04cb0b4cbc9fe04f79a719ccdc") {
        handleClick(stage_details_group3cc06Ref?.current?.stage_type_code9ccdc?stage_details_group3cc06Ref?.current?.stage_type_code9ccdc:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "0a343e04cb0b4cbc9fe04f79a719ccdc");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setstage_details_group3cc06((pre:any)=>({...pre,stage_type_code:""}))
    else
      setInitialCount(1)
  },[stage_type_code9ccdc?.refresh])
  

  if (stage_type_code9ccdc?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `27 / 39`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {stage_type_code9ccdc?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Stage Type Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={stage_type_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={stage_details_group3cc06?.stage_type_code9ccdc ? [stage_details_group3cc06?.stage_type_code9ccdc] : (stage_details_group3cc06?.stage_type_code ? dropdownValue : [])}
        validationState={validate?.addCertificationStage_v1?.stage_type_code ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownstage_type_code;
