

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
const Dropdownrule_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ruleconditioncombo_v1Props, setdfd_ruleconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_group713a3, setadd_group713a3}= useContext(TotalContext) as TotalContextProps;
  const {add_group713a3Props, setadd_group713a3Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6e, setrisk_rule_cond_grp9fa6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6eProps, setrisk_rule_cond_grp9fa6eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_nameb202a, setrule_nameb202a}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no20c50, setsequence_no20c50}= useContext(TotalContext) as TotalContextProps;
  const {operator_code06297, setoperator_code06297}= useContext(TotalContext) as TotalContextProps;
  const {compare_valueaa22d, setcompare_valueaa22d}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name1565b, setattribute_name1565b}= useContext(TotalContext) as TotalContextProps;
  const {is_activea3076, setis_activea3076}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [rule_nameOptions, setrule_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `rule_name`
    let mapperText: string =  `risk_rule_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "5ea00bc4b4c97dc044026d95c0f9fa6e",
      "a519e705ce7097d0c0e76859d74b202a"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_ruleconditioncombo_v1Props.dstKey){
      dstKey = dfd_ruleconditioncombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_ruleconditioncombo_v1Props && !dfd_ruleconditioncombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setrule_nameOptions(temp);
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
  },[rule_nameb202a?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev,rule_nameb202a: value }))
      setIsRequredData(false)
    }else{
      let temp:any = risk_rule_cond_grp9fa6e;
      delete temp.rule_name;
      delete temp.RULE_NAME;
      delete temp.rule_nameb202a;
      setrisk_rule_cond_grp9fa6e(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewRiskRuleCondition_v1:{...pre?.viewRiskRuleCondition_v1,rule_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(risk_rule_cond_grp9fa6e.rule_name){
      if(Array.isArray(dfd_ruleconditioncombo_v1Props)){
        if(dfd_ruleconditioncombo_v1Props?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)){
          setdropdownValue([dfd_ruleconditioncombo_v1Props?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)?.rule_name])
          tempValue=dfd_ruleconditioncombo_v1Props?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)?.rule_name
        }else{
          setdropdownValue([risk_rule_cond_grp9fa6e.rule_name])
          tempValue=risk_rule_cond_grp9fa6e.rule_name
        }
      }else{
        let dstKey:string = dfd_ruleconditioncombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{risk_rule_id:risk_rule_cond_grp9fa6e.rule_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)?.rule_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.risk_rule_id === risk_rule_cond_grp9fa6e.rule_name)?.rule_name
      }else{
        setdropdownValue([risk_rule_cond_grp9fa6e.rule_name])
        tempValue=risk_rule_cond_grp9fa6e.rule_name
      }   
      }
    }
    if(rule_nameb202a?.trigger == true)
    {
      await handlechange(tempValue)
      setrule_nameb202a((pre:any)=>({...pre,trigger:false}))
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
  },[risk_rule_cond_grp9fa6e.rule_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_ruleconditioncombo_v1Props) && dfd_ruleconditioncombo_v1Props?.length == 1){
    // setrisk_rule_cond_grp9fa6e((pre:any)=>({...pre,rule_name:dfd_ruleconditioncombo_v1Props[0]?.rule_name}))
    }
  },[dfd_ruleconditioncombo_v1Props])

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
      setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev, rule_name: getMapperDetailsBindValues[value],RULE_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev, rule_name: '', rule_nameb202a: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewRiskRuleCondition_v1:{...pre?.viewRiskRuleCondition_v1,rule_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.risk_rule_id==getMapperDetailsBindValues[value] && items?.rule_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      rule_name:value,
      risk_rule_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['add_group'] = add_group713a3,
        codeStates['setadd_group'] = setadd_group713a3,
        codeStates['add_group713a3'] = add_group713a3Props,
        codeStates['setadd_group713a3'] = setadd_group713a3Props,
        codeStates['risk_rule_cond_grp'] = risk_rule_cond_grp9fa6e,
        codeStates['setrisk_rule_cond_grp'] = setrisk_rule_cond_grp9fa6e,
        codeStates['risk_rule_cond_grp9fa6e'] = risk_rule_cond_grp9fa6eProps,
        codeStates['setrisk_rule_cond_grp9fa6e'] = setrisk_rule_cond_grp9fa6eProps,
        codeStates['rule_name'] = rule_nameb202a,
        codeStates['setrule_name'] = setrule_nameb202a,
        codeStates['sequence_no'] = sequence_no20c50,
        codeStates['setsequence_no'] = setsequence_no20c50,
        codeStates['operator_code'] = operator_code06297,
        codeStates['setoperator_code'] = setoperator_code06297,
        codeStates['compare_value'] = compare_valueaa22d,
        codeStates['setcompare_value'] = setcompare_valueaa22d,
        codeStates['attribute_name'] = attribute_name1565b,
        codeStates['setattribute_name'] = setattribute_name1565b,
        codeStates['is_active'] = is_activea3076,
        codeStates['setis_active'] = setis_activea3076,
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
  const risk_rule_cond_grp9fa6eRef = useRef<any>(risk_rule_cond_grp9fa6e);
  useEffect(() => { risk_rule_cond_grp9fa6eRef.current = risk_rule_cond_grp9fa6e; }, [risk_rule_cond_grp9fa6e]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "a519e705ce7097d0c0e76859d74b202a") {
        handleClick(risk_rule_cond_grp9fa6eRef?.current?.rule_nameb202a?risk_rule_cond_grp9fa6eRef?.current?.rule_nameb202a:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "a519e705ce7097d0c0e76859d74b202a");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrisk_rule_cond_grp9fa6e((pre:any)=>({...pre,rule_name:""}))
    else
      setInitialCount(1)
  },[rule_nameb202a?.refresh])
  

  if (rule_nameb202a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `2 / 14`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {rule_nameb202a?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Rule Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={rule_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={risk_rule_cond_grp9fa6e?.rule_nameb202a ? [risk_rule_cond_grp9fa6e?.rule_nameb202a] : (risk_rule_cond_grp9fa6e?.rule_name ? dropdownValue : [])}
        validationState={validate?.viewRiskRuleCondition_v1?.rule_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownrule_name;
