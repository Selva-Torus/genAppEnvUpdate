

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
const Dropdowntool_asset_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrantassetcombo_v1Props, setdfd_toolgrantassetcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {textd1555, settextd1555}= useContext(TotalContext) as TotalContextProps;
  const {agent_asset_name96120, setagent_asset_name96120}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_name67bb6, settool_asset_name67bb6}= useContext(TotalContext) as TotalContextProps;
  const {tool_operationb1b59, settool_operationb1b59}= useContext(TotalContext) as TotalContextProps;
  const {access_modea4f1d, setaccess_modea4f1d}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [tool_asset_nameOptions, settool_asset_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `asset_display_name`
    let mapperText: string =  `asset`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "bef9f414fc1a357c1798ddffdd1410a7",
      "cba7882647750ce991162abd3c267bb6"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_toolgrantassetcombo_v1Props.dstKey){
      dstKey = dfd_toolgrantassetcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_toolgrantassetcombo_v1Props && !dfd_toolgrantassetcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      settool_asset_nameOptions(temp);
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
  },[tool_asset_name67bb6?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      settemplate_detail_group410a7((prev: any) => ({ ...prev,tool_asset_name67bb6: value }))
      setIsRequredData(false)
    }else{
      let temp:any = template_detail_group410a7;
      delete temp.tool_asset_name;
      delete temp.TOOL_ASSET_NAME;
      delete temp.tool_asset_name67bb6;
      settemplate_detail_group410a7(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,tool_asset_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(template_detail_group410a7.tool_asset_name){
      if(Array.isArray(dfd_toolgrantassetcombo_v1Props)){
        if(dfd_toolgrantassetcombo_v1Props?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)){
          setdropdownValue([dfd_toolgrantassetcombo_v1Props?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)?.asset_display_name])
          tempValue=dfd_toolgrantassetcombo_v1Props?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)?.asset_display_name
        }else{
          setdropdownValue([template_detail_group410a7.tool_asset_name])
          tempValue=template_detail_group410a7.tool_asset_name
        }
      }else{
        let dstKey:string = dfd_toolgrantassetcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{asset:template_detail_group410a7.tool_asset_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)?.asset_display_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.asset === template_detail_group410a7.tool_asset_name)?.asset_display_name
      }else{
        setdropdownValue([template_detail_group410a7.tool_asset_name])
        tempValue=template_detail_group410a7.tool_asset_name
      }   
      }
    }
    if(tool_asset_name67bb6?.trigger == true)
    {
      await handlechange(tempValue)
      settool_asset_name67bb6((pre:any)=>({...pre,trigger:false}))
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
  },[template_detail_group410a7.tool_asset_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_toolgrantassetcombo_v1Props) && dfd_toolgrantassetcombo_v1Props?.length == 1){
    // settemplate_detail_group410a7((pre:any)=>({...pre,tool_asset_name:dfd_toolgrantassetcombo_v1Props[0]?.tool_asset_name}))
    }
  },[dfd_toolgrantassetcombo_v1Props])

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
      settemplate_detail_group410a7((prev: any) => ({ ...prev, tool_asset_name: getMapperDetailsBindValues[value],TOOL_ASSET_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       settemplate_detail_group410a7((prev: any) => ({ ...prev, tool_asset_name: '', tool_asset_name67bb6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,tool_asset_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.asset==getMapperDetailsBindValues[value] && items?.asset_display_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_display_name:value,
      asset:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = group8f0c2,
        codeStates['setgroup'] = setgroup8f0c2,
        codeStates['group8f0c2'] = group8f0c2Props,
        codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
        codeStates['template_detail_group'] = template_detail_group410a7,
        codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
        codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
        codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
        codeStates['text'] = textd1555,
        codeStates['settext'] = settextd1555,
        codeStates['agent_asset_name'] = agent_asset_name96120,
        codeStates['setagent_asset_name'] = setagent_asset_name96120,
        codeStates['tool_asset_name'] = tool_asset_name67bb6,
        codeStates['settool_asset_name'] = settool_asset_name67bb6,
        codeStates['tool_operation'] = tool_operationb1b59,
        codeStates['settool_operation'] = settool_operationb1b59,
        codeStates['access_mode'] = access_modea4f1d,
        codeStates['setaccess_mode'] = setaccess_modea4f1d,
        codeStates['groups'] = groupsae790,
        codeStates['setgroups'] = setgroupsae790,
        codeStates['groupsae790'] = groupsae790Props,
        codeStates['setgroupsae790'] = setgroupsae790Props,
        codeStates['dynamicaction'] = dynamicaction9560b,
        codeStates['setdynamicaction'] = setdynamicaction9560b,
        codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
        codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,
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
  const template_detail_group410a7Ref = useRef<any>(template_detail_group410a7);
  useEffect(() => { template_detail_group410a7Ref.current = template_detail_group410a7; }, [template_detail_group410a7]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "cba7882647750ce991162abd3c267bb6") {
        handleClick(template_detail_group410a7Ref?.current?.tool_asset_name67bb6?template_detail_group410a7Ref?.current?.tool_asset_name67bb6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "cba7882647750ce991162abd3c267bb6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settemplate_detail_group410a7((pre:any)=>({...pre,tool_asset_name:""}))
    else
      setInitialCount(1)
  },[tool_asset_name67bb6?.refresh])
  

  if (tool_asset_name67bb6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `9 / 23`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {tool_asset_name67bb6?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Tool
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={tool_asset_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={template_detail_group410a7?.tool_asset_name67bb6 ? [template_detail_group410a7?.tool_asset_name67bb6] : (template_detail_group410a7?.tool_asset_name ? dropdownValue : [])}
        validationState={validate?.approveToolGrant_v1?.tool_asset_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowntool_asset_name;
