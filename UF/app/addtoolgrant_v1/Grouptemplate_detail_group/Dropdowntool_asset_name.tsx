

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
  const {dfd_toolgrantagentname_v1Props, setdfd_toolgrantagentname_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupc4c71, setgroupc4c71}= useContext(TotalContext) as TotalContextProps;
  const {groupc4c71Props, setgroupc4c71Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2, settemplate_detail_groupe14a2}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2Props, settemplate_detail_groupe14a2Props}= useContext(TotalContext) as TotalContextProps;
  const {textfaa89, settextfaa89}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec9725, setasset_namec9725}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_namec6175, settool_asset_namec6175}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation3f831, settool_operation3f831}= useContext(TotalContext) as TotalContextProps;
  const {access_mode1a5e5, setaccess_mode1a5e5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43b, setdynamicactionce43b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43bProps, setdynamicactionce43bProps}= useContext(TotalContext) as TotalContextProps;
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
    let mapperText: string =  `ai_asset_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "76dd8f84384d52cc3851750c06de14a2",
      "24b4fd593012485aba9f09cad91c6175"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_toolgrantagentname_v1Props.dstKey){
      dstKey = dfd_toolgrantagentname_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_toolgrantagentname_v1Props && !dfd_toolgrantagentname_v1Props.hasLogicCenter && !dfdFlag) {
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
  },[tool_asset_namec6175?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      settemplate_detail_groupe14a2((prev: any) => ({ ...prev,tool_asset_namec6175: value }))
      setIsRequredData(false)
    }else{
      let temp:any = template_detail_groupe14a2;
      delete temp.tool_asset_name;
      delete temp.TOOL_ASSET_NAME;
      delete temp.tool_asset_namec6175;
      settemplate_detail_groupe14a2(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addToolGrant_v1:{...pre?.addToolGrant_v1,tool_asset_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(template_detail_groupe14a2.tool_asset_name){
      if(Array.isArray(dfd_toolgrantagentname_v1Props)){
        if(dfd_toolgrantagentname_v1Props?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)){
          setdropdownValue([dfd_toolgrantagentname_v1Props?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)?.asset_display_name])
          tempValue=dfd_toolgrantagentname_v1Props?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)?.asset_display_name
        }else{
          setdropdownValue([template_detail_groupe14a2.tool_asset_name])
          tempValue=template_detail_groupe14a2.tool_asset_name
        }
      }else{
        let dstKey:string = dfd_toolgrantagentname_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{ai_asset_id:template_detail_groupe14a2.tool_asset_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)?.asset_display_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.ai_asset_id === template_detail_groupe14a2.tool_asset_name)?.asset_display_name
      }else{
        setdropdownValue([template_detail_groupe14a2.tool_asset_name])
        tempValue=template_detail_groupe14a2.tool_asset_name
      }   
      }
    }
    if(tool_asset_namec6175?.trigger == true)
    {
      await handlechange(tempValue)
      settool_asset_namec6175((pre:any)=>({...pre,trigger:false}))
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
  },[template_detail_groupe14a2.tool_asset_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_toolgrantagentname_v1Props) && dfd_toolgrantagentname_v1Props?.length == 1){
    // settemplate_detail_groupe14a2((pre:any)=>({...pre,tool_asset_name:dfd_toolgrantagentname_v1Props[0]?.tool_asset_name}))
    }
  },[dfd_toolgrantagentname_v1Props])

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
      settemplate_detail_groupe14a2((prev: any) => ({ ...prev, tool_asset_name: getMapperDetailsBindValues[value],TOOL_ASSET_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       settemplate_detail_groupe14a2((prev: any) => ({ ...prev, tool_asset_name: '', tool_asset_namec6175: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addToolGrant_v1:{...pre?.addToolGrant_v1,tool_asset_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.ai_asset_id==getMapperDetailsBindValues[value] && items?.asset_display_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_display_name:value,
      ai_asset_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupc4c71,
        codeStates['setgroup'] = setgroupc4c71,
        codeStates['groupc4c71'] = groupc4c71Props,
        codeStates['setgroupc4c71'] = setgroupc4c71Props,
        codeStates['template_detail_group'] = template_detail_groupe14a2,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupe14a2,
        codeStates['template_detail_groupe14a2'] = template_detail_groupe14a2Props,
        codeStates['settemplate_detail_groupe14a2'] = settemplate_detail_groupe14a2Props,
        codeStates['text'] = textfaa89,
        codeStates['settext'] = settextfaa89,
        codeStates['asset_name'] = asset_namec9725,
        codeStates['setasset_name'] = setasset_namec9725,
        codeStates['tool_asset_name'] = tool_asset_namec6175,
        codeStates['settool_asset_name'] = settool_asset_namec6175,
        codeStates['tool_operation'] = tool_operation3f831,
        codeStates['settool_operation'] = settool_operation3f831,
        codeStates['access_mode'] = access_mode1a5e5,
        codeStates['setaccess_mode'] = setaccess_mode1a5e5,
        codeStates['dynamicaction'] = dynamicactionce43b,
        codeStates['setdynamicaction'] = setdynamicactionce43b,
        codeStates['dynamicactionce43b'] = dynamicactionce43bProps,
        codeStates['setdynamicactionce43b'] = setdynamicactionce43bProps,
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
  const template_detail_groupe14a2Ref = useRef<any>(template_detail_groupe14a2);
  useEffect(() => { template_detail_groupe14a2Ref.current = template_detail_groupe14a2; }, [template_detail_groupe14a2]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "24b4fd593012485aba9f09cad91c6175") {
        handleClick(template_detail_groupe14a2Ref?.current?.tool_asset_namec6175?template_detail_groupe14a2Ref?.current?.tool_asset_namec6175:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "24b4fd593012485aba9f09cad91c6175");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settemplate_detail_groupe14a2((pre:any)=>({...pre,tool_asset_name:""}))
    else
      setInitialCount(1)
  },[tool_asset_namec6175?.refresh])
  

  if (tool_asset_namec6175?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `7 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {tool_asset_namec6175?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Tool Asset
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
        value={template_detail_groupe14a2?.tool_asset_namec6175 ? [template_detail_groupe14a2?.tool_asset_namec6175] : (template_detail_groupe14a2?.tool_asset_name ? dropdownValue : [])}
        validationState={validate?.addToolGrant_v1?.tool_asset_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowntool_asset_name;
