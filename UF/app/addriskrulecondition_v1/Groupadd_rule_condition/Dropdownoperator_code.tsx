

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
const Dropdownoperator_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskoperatorcodecombo_v1Props, setdfd_riskoperatorcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_group111bb, setadd_group111bb}= useContext(TotalContext) as TotalContextProps;
  const {add_group111bbProps, setadd_group111bbProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50, setadd_rule_conditiona9c50}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50Props, setadd_rule_conditiona9c50Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_name67700, setrule_name67700}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no29818, setsequence_no29818}= useContext(TotalContext) as TotalContextProps;
  const {operator_code042cd, setoperator_code042cd}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name05959, setattribute_name05959}= useContext(TotalContext) as TotalContextProps;
  const {compare_value0b503, setcompare_value0b503}= useContext(TotalContext) as TotalContextProps;
  const {is_activecad18, setis_activecad18}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461, setdynamicactions0c461}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461Props, setdynamicactions0c461Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [operator_codeOptions, setoperator_codeOptions] = useState<string[]>([]);
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
      "97dc0160feae252158b073e5b1da9c50",
      "f023ebcbab1f8423e1719032799042cd"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_riskoperatorcodecombo_v1Props.dstKey){
      dstKey = dfd_riskoperatorcodecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_riskoperatorcodecombo_v1Props && !dfd_riskoperatorcodecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setoperator_codeOptions(temp);
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
  },[operator_code042cd?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setadd_rule_conditiona9c50((prev: any) => ({ ...prev,operator_code042cd: value }))
      setIsRequredData(false)
    }else{
      let temp:any = add_rule_conditiona9c50;
      delete temp.operator_code;
      delete temp.OPERATOR_CODE;
      delete temp.operator_code042cd;
      setadd_rule_conditiona9c50(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addRiskRuleCondition_v1:{...pre?.addRiskRuleCondition_v1,operator_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(add_rule_conditiona9c50.operator_code){
      if(Array.isArray(dfd_riskoperatorcodecombo_v1Props)){
        if(dfd_riskoperatorcodecombo_v1Props?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)){
          setdropdownValue([dfd_riskoperatorcodecombo_v1Props?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)?.code])
          tempValue=dfd_riskoperatorcodecombo_v1Props?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)?.code
        }else{
          setdropdownValue([add_rule_conditiona9c50.operator_code])
          tempValue=add_rule_conditiona9c50.operator_code
        }
      }else{
        let dstKey:string = dfd_riskoperatorcodecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code_value_id:add_rule_conditiona9c50.operator_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code_value_id === add_rule_conditiona9c50.operator_code)?.code
      }else{
        setdropdownValue([add_rule_conditiona9c50.operator_code])
        tempValue=add_rule_conditiona9c50.operator_code
      }   
      }
    }
    if(operator_code042cd?.trigger == true)
    {
      await handlechange(tempValue)
      setoperator_code042cd((pre:any)=>({...pre,trigger:false}))
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
  },[add_rule_conditiona9c50.operator_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_riskoperatorcodecombo_v1Props) && dfd_riskoperatorcodecombo_v1Props?.length == 1){
    // setadd_rule_conditiona9c50((pre:any)=>({...pre,operator_code:dfd_riskoperatorcodecombo_v1Props[0]?.operator_code}))
    }
  },[dfd_riskoperatorcodecombo_v1Props])

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
      setadd_rule_conditiona9c50((prev: any) => ({ ...prev, operator_code: getMapperDetailsBindValues[value],OPERATOR_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setadd_rule_conditiona9c50((prev: any) => ({ ...prev, operator_code: '', operator_code042cd: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addRiskRuleCondition_v1:{...pre?.addRiskRuleCondition_v1,operator_code:undefined}}));
   
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
        codeStates['add_group'] = add_group111bb,
        codeStates['setadd_group'] = setadd_group111bb,
        codeStates['add_group111bb'] = add_group111bbProps,
        codeStates['setadd_group111bb'] = setadd_group111bbProps,
        codeStates['add_rule_condition'] = add_rule_conditiona9c50,
        codeStates['setadd_rule_condition'] = setadd_rule_conditiona9c50,
        codeStates['add_rule_conditiona9c50'] = add_rule_conditiona9c50Props,
        codeStates['setadd_rule_conditiona9c50'] = setadd_rule_conditiona9c50Props,
        codeStates['rule_name'] = rule_name67700,
        codeStates['setrule_name'] = setrule_name67700,
        codeStates['sequence_no'] = sequence_no29818,
        codeStates['setsequence_no'] = setsequence_no29818,
        codeStates['operator_code'] = operator_code042cd,
        codeStates['setoperator_code'] = setoperator_code042cd,
        codeStates['attribute_name'] = attribute_name05959,
        codeStates['setattribute_name'] = setattribute_name05959,
        codeStates['compare_value'] = compare_value0b503,
        codeStates['setcompare_value'] = setcompare_value0b503,
        codeStates['is_active'] = is_activecad18,
        codeStates['setis_active'] = setis_activecad18,
        codeStates['dynamicactions'] = dynamicactions0c461,
        codeStates['setdynamicactions'] = setdynamicactions0c461,
        codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
        codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const add_rule_conditiona9c50Ref = useRef<any>(add_rule_conditiona9c50);
  useEffect(() => { add_rule_conditiona9c50Ref.current = add_rule_conditiona9c50; }, [add_rule_conditiona9c50]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "f023ebcbab1f8423e1719032799042cd") {
        handleClick(add_rule_conditiona9c50Ref?.current?.operator_code042cd?add_rule_conditiona9c50Ref?.current?.operator_code042cd:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "f023ebcbab1f8423e1719032799042cd");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setadd_rule_conditiona9c50((pre:any)=>({...pre,operator_code:""}))
    else
      setInitialCount(1)
  },[operator_code042cd?.refresh])
  

  if (operator_code042cd?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `2 / 14`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {operator_code042cd?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Operator code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={operator_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={add_rule_conditiona9c50?.operator_code042cd ? [add_rule_conditiona9c50?.operator_code042cd] : (add_rule_conditiona9c50?.operator_code ? dropdownValue : [])}
        validationState={validate?.addRiskRuleCondition_v1?.operator_code ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownoperator_code;
