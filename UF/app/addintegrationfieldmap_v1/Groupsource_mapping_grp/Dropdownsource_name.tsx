

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
const Dropdownsource_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_fieldmapcombo_v1Props, setdfd_fieldmapcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_field_map_grp9e14b, setadd_field_map_grp9e14b}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp9e14bProps, setadd_field_map_grp9e14bProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45, setsource_mapping_grp4af45}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45Props, setsource_mapping_grp4af45Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mappingdbdb2, setsource_mappingdbdb2}= useContext(TotalContext) as TotalContextProps;
  const {source_name4a9d8, setsource_name4a9d8}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path2b239, setsource_field_path2b239}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0e, settransformation_grp78a0e}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0eProps, settransformation_grp78a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55, setfield_rules_grp65d55}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55Props, setfield_rules_grp65d55Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [source_nameOptions, setsource_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `source_name`
    let mapperText: string =  `integration_source_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "bd6ca0e0415a4b3ebf1931107754af45",
      "76d5d2ea30e1404da2341bcc8a64a9d8"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_fieldmapcombo_v1Props.dstKey){
      dstKey = dfd_fieldmapcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_fieldmapcombo_v1Props && !dfd_fieldmapcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setsource_nameOptions(temp);
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
  },[source_name4a9d8?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setsource_mapping_grp4af45((prev: any) => ({ ...prev,source_name4a9d8: value }))
      setIsRequredData(false)
    }else{
      let temp:any = source_mapping_grp4af45;
      delete temp.source_name;
      delete temp.SOURCE_NAME;
      delete temp.source_name4a9d8;
      setsource_mapping_grp4af45(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addIntegrationFieldMap_v1:{...pre?.addIntegrationFieldMap_v1,source_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(source_mapping_grp4af45.source_name){
      if(Array.isArray(dfd_fieldmapcombo_v1Props)){
        if(dfd_fieldmapcombo_v1Props?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)){
          setdropdownValue([dfd_fieldmapcombo_v1Props?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)?.source_name])
          tempValue=dfd_fieldmapcombo_v1Props?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)?.source_name
        }else{
          setdropdownValue([source_mapping_grp4af45.source_name])
          tempValue=source_mapping_grp4af45.source_name
        }
      }else{
        let dstKey:string = dfd_fieldmapcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{integration_source_id:source_mapping_grp4af45.source_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)?.source_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.integration_source_id === source_mapping_grp4af45.source_name)?.source_name
      }else{
        setdropdownValue([source_mapping_grp4af45.source_name])
        tempValue=source_mapping_grp4af45.source_name
      }   
      }
    }
    if(source_name4a9d8?.trigger == true)
    {
      await handlechange(tempValue)
      setsource_name4a9d8((pre:any)=>({...pre,trigger:false}))
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
  },[source_mapping_grp4af45.source_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_fieldmapcombo_v1Props) && dfd_fieldmapcombo_v1Props?.length == 1){
    // setsource_mapping_grp4af45((pre:any)=>({...pre,source_name:dfd_fieldmapcombo_v1Props[0]?.source_name}))
    }
  },[dfd_fieldmapcombo_v1Props])

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
      setsource_mapping_grp4af45((prev: any) => ({ ...prev, source_name: getMapperDetailsBindValues[value],SOURCE_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setsource_mapping_grp4af45((prev: any) => ({ ...prev, source_name: '', source_name4a9d8: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addIntegrationFieldMap_v1:{...pre?.addIntegrationFieldMap_v1,source_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.integration_source_id==getMapperDetailsBindValues[value] && items?.source_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      source_name:value,
      integration_source_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['add_field_map_grp'] = add_field_map_grp9e14b,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp9e14b,
        codeStates['add_field_map_grp9e14b'] = add_field_map_grp9e14bProps,
        codeStates['setadd_field_map_grp9e14b'] = setadd_field_map_grp9e14bProps,
        codeStates['source_mapping_grp'] = source_mapping_grp4af45,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp4af45,
        codeStates['source_mapping_grp4af45'] = source_mapping_grp4af45Props,
        codeStates['setsource_mapping_grp4af45'] = setsource_mapping_grp4af45Props,
        codeStates['source_mapping'] = source_mappingdbdb2,
        codeStates['setsource_mapping'] = setsource_mappingdbdb2,
        codeStates['source_name'] = source_name4a9d8,
        codeStates['setsource_name'] = setsource_name4a9d8,
        codeStates['source_field_path'] = source_field_path2b239,
        codeStates['setsource_field_path'] = setsource_field_path2b239,
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['transformation_grp'] = transformation_grp78a0e,
        codeStates['settransformation_grp'] = settransformation_grp78a0e,
        codeStates['transformation_grp78a0e'] = transformation_grp78a0eProps,
        codeStates['settransformation_grp78a0e'] = settransformation_grp78a0eProps,
        codeStates['field_rules_grp'] = field_rules_grp65d55,
        codeStates['setfield_rules_grp'] = setfield_rules_grp65d55,
        codeStates['field_rules_grp65d55'] = field_rules_grp65d55Props,
        codeStates['setfield_rules_grp65d55'] = setfield_rules_grp65d55Props,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,
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
  const source_mapping_grp4af45Ref = useRef<any>(source_mapping_grp4af45);
  useEffect(() => { source_mapping_grp4af45Ref.current = source_mapping_grp4af45; }, [source_mapping_grp4af45]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "76d5d2ea30e1404da2341bcc8a64a9d8") {
        handleClick(source_mapping_grp4af45Ref?.current?.source_name4a9d8?source_mapping_grp4af45Ref?.current?.source_name4a9d8:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "76d5d2ea30e1404da2341bcc8a64a9d8");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setsource_mapping_grp4af45((pre:any)=>({...pre,source_name:""}))
    else
      setInitialCount(1)
  },[source_name4a9d8?.refresh])
  

  if (source_name4a9d8?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `12 / 24`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {source_name4a9d8?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Integration Source
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={source_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={source_mapping_grp4af45?.source_name4a9d8 ? [source_mapping_grp4af45?.source_name4a9d8] : (source_mapping_grp4af45?.source_name ? dropdownValue : [])}
        validationState={validate?.addIntegrationFieldMap_v1?.source_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownsource_name;
