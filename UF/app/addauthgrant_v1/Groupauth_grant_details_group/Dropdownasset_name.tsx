

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
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_textc2e1d, setauth_grant_details_textc2e1d}= useContext(TotalContext) as TotalContextProps;
  const {asset_name50a66, setasset_name50a66}= useContext(TotalContext) as TotalContextProps;
  const {grant_code15931, setgrant_code15931}= useContext(TotalContext) as TotalContextProps;
  const {delegator_user_id7e51a, setdelegator_user_id7e51a}= useContext(TotalContext) as TotalContextProps;
  const {action_type313d6, setaction_type313d6}= useContext(TotalContext) as TotalContextProps;
  const {resource_scope139d4, setresource_scope139d4}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
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
    let mapperValue: string =  `asset_display_name`
    let mapperText: string =  `asset_code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "7ab9188e5f3a6b4b600fa714fc4d026c",
      "5195ac20eeaf639a9a6759fa9b950a66"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_assetcodenameconcatcombo_v1Props.dstKey){
      dstKey = dfd_assetcodenameconcatcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_assetcodenameconcatcombo_v1Props && !dfd_assetcodenameconcatcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
  },[asset_name50a66?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setauth_grant_details_groupd026c((prev: any) => ({ ...prev,asset_name50a66: value }))
      setIsRequredData(false)
    }else{
      let temp:any = auth_grant_details_groupd026c;
      delete temp.asset_name;
      delete temp.ASSET_NAME;
      delete temp.asset_name50a66;
      setauth_grant_details_groupd026c(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,asset_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(auth_grant_details_groupd026c.asset_name){
      if(Array.isArray(dfd_assetcodenameconcatcombo_v1Props)){
        if(dfd_assetcodenameconcatcombo_v1Props?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)){
          setdropdownValue([dfd_assetcodenameconcatcombo_v1Props?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)?.asset_display_name])
          tempValue=dfd_assetcodenameconcatcombo_v1Props?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)?.asset_display_name
        }else{
          setdropdownValue([auth_grant_details_groupd026c.asset_name])
          tempValue=auth_grant_details_groupd026c.asset_name
        }
      }else{
        let dstKey:string = dfd_assetcodenameconcatcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{asset_code:auth_grant_details_groupd026c.asset_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)?.asset_display_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.asset_code === auth_grant_details_groupd026c.asset_name)?.asset_display_name
      }else{
        setdropdownValue([auth_grant_details_groupd026c.asset_name])
        tempValue=auth_grant_details_groupd026c.asset_name
      }   
      }
    }
    if(asset_name50a66?.trigger == true)
    {
      await handlechange(tempValue)
      setasset_name50a66((pre:any)=>({...pre,trigger:false}))
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
  },[auth_grant_details_groupd026c.asset_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_assetcodenameconcatcombo_v1Props) && dfd_assetcodenameconcatcombo_v1Props?.length == 1){
    // setauth_grant_details_groupd026c((pre:any)=>({...pre,asset_name:dfd_assetcodenameconcatcombo_v1Props[0]?.asset_name}))
    }
  },[dfd_assetcodenameconcatcombo_v1Props])

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
      setauth_grant_details_groupd026c((prev: any) => ({ ...prev, asset_name: getMapperDetailsBindValues[value],ASSET_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setauth_grant_details_groupd026c((prev: any) => ({ ...prev, asset_name: '', asset_name50a66: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,asset_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.asset_code==getMapperDetailsBindValues[value] && items?.asset_display_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_display_name:value,
      asset_code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
        codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
        codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
        codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
        codeStates['revocat_info_group'] = revocat_info_group2037f,
        codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
        codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
        codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
        codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
        codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
        codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
        codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
        codeStates['auth_grant_details_text'] = auth_grant_details_textc2e1d,
        codeStates['setauth_grant_details_text'] = setauth_grant_details_textc2e1d,
        codeStates['asset_name'] = asset_name50a66,
        codeStates['setasset_name'] = setasset_name50a66,
        codeStates['grant_code'] = grant_code15931,
        codeStates['setgrant_code'] = setgrant_code15931,
        codeStates['delegator_user_id'] = delegator_user_id7e51a,
        codeStates['setdelegator_user_id'] = setdelegator_user_id7e51a,
        codeStates['action_type'] = action_type313d6,
        codeStates['setaction_type'] = setaction_type313d6,
        codeStates['resource_scope'] = resource_scope139d4,
        codeStates['setresource_scope'] = setresource_scope139d4,
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['condition_validity_group'] = condition_validity_group3e45f,
        codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
        codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
        codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
        codeStates['certification_group'] = certification_group91bfd,
        codeStates['setcertification_group'] = setcertification_group91bfd,
        codeStates['certification_group91bfd'] = certification_group91bfdProps,
        codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
        codeStates['dynamicactions'] = dynamicactions401a9,
        codeStates['setdynamicactions'] = setdynamicactions401a9,
        codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
        codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
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
  const auth_grant_details_groupd026cRef = useRef<any>(auth_grant_details_groupd026c);
  useEffect(() => { auth_grant_details_groupd026cRef.current = auth_grant_details_groupd026c; }, [auth_grant_details_groupd026c]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "5195ac20eeaf639a9a6759fa9b950a66") {
        handleClick(auth_grant_details_groupd026cRef?.current?.asset_name50a66?auth_grant_details_groupd026cRef?.current?.asset_name50a66:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5195ac20eeaf639a9a6759fa9b950a66");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setauth_grant_details_groupd026c((pre:any)=>({...pre,asset_name:""}))
    else
      setInitialCount(1)
  },[asset_name50a66?.refresh])
  

  if (asset_name50a66?.isHidden) {
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
        disabled= {asset_name50a66?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Asset
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
        value={auth_grant_details_groupd026c?.asset_name50a66 ? [auth_grant_details_groupd026c?.asset_name50a66] : (auth_grant_details_groupd026c?.asset_name ? dropdownValue : [])}
        validationState={validate?.addAuthGrant_v1?.asset_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownasset_name;
