

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
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
const Dropdownfull_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_group1e8f3, setnew_access_group1e8f3}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group1e8f3Props, setnew_access_group1e8f3Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221, setaccess_req__group3a221}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221Props, setaccess_req__group3a221Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_req_details64e3c, setacc_req_details64e3c}= useContext(TotalContext) as TotalContextProps;
  const {full_nameb4280, setfull_nameb4280}= useContext(TotalContext) as TotalContextProps;
  const {request_typeade40, setrequest_typeade40}= useContext(TotalContext) as TotalContextProps;
  const {system_name55638, setsystem_name55638}= useContext(TotalContext) as TotalContextProps;
  const {access_role53ace, setaccess_role53ace}= useContext(TotalContext) as TotalContextProps;
  const {access_level5eb9a, setaccess_level5eb9a}= useContext(TotalContext) as TotalContextProps;
  const {request_priority55c8e, setrequest_priority55c8e}= useContext(TotalContext) as TotalContextProps;
  const {risk_levelcb9f7, setrisk_levelcb9f7}= useContext(TotalContext) as TotalContextProps;
  const {request_number6fd42, setrequest_number6fd42}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21c, setvalid_groupec21c}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21cProps, setvalid_groupec21cProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43d, setapp_inf_groupea43d}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43dProps, setapp_inf_groupea43dProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [full_nameOptions, setfull_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `full_name`
    let mapperText: string =  `full_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "728f2a80659a170f2ab5070e9423a221",
      "f7c8ac58ba95fbcf8bf5057aa9fb4280"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_employeenamecombo_v1Props.dstKey){
      dstKey = dfd_employeenamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_employeenamecombo_v1Props && !dfd_employeenamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setfull_nameOptions(temp);
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
  },[full_nameb4280?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group3a221((prev: any) => ({ ...prev,full_nameb4280: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group3a221;
      delete temp.employee_name;
      delete temp.EMPLOYEE_NAME;
      delete temp.full_nameb4280;
      setaccess_req__group3a221(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,employee_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group3a221.employee_name){
      if(Array.isArray(dfd_employeenamecombo_v1Props)){
        if(dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group3a221.employee_name)){
          setdropdownValue([dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group3a221.employee_name)?.full_name])
          tempValue=dfd_employeenamecombo_v1Props?.find((item: any) => item.full_name === access_req__group3a221.employee_name)?.full_name
        }else{
          setdropdownValue([access_req__group3a221.employee_name])
          tempValue=access_req__group3a221.employee_name
        }
      }else{
        let dstKey:string = dfd_employeenamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{full_name:access_req__group3a221.employee_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group3a221.employee_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group3a221.employee_name)?.full_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.full_name === access_req__group3a221.employee_name)?.full_name
      }else{
        setdropdownValue([access_req__group3a221.employee_name])
        tempValue=access_req__group3a221.employee_name
      }   
      }
    }
    if(full_nameb4280?.trigger == true)
    {
      await handlechange(tempValue)
      setfull_nameb4280((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__group3a221.employee_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_employeenamecombo_v1Props) && dfd_employeenamecombo_v1Props?.length == 1){
    // setaccess_req__group3a221((pre:any)=>({...pre,employee_name:dfd_employeenamecombo_v1Props[0]?.employee_name}))
    }
  },[dfd_employeenamecombo_v1Props])

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
      setaccess_req__group3a221((prev: any) => ({ ...prev, employee_name: getMapperDetailsBindValues[value],EMPLOYEE_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group3a221((prev: any) => ({ ...prev, employee_name: '', full_nameb4280: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,employee_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.full_name==getMapperDetailsBindValues[value] && items?.full_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      full_name:value,
      full_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_group1e8f3,
        codeStates['setnew_access_group'] = setnew_access_group1e8f3,
        codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
        codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
        codeStates['access_req__group'] = access_req__group3a221,
        codeStates['setaccess_req__group'] = setaccess_req__group3a221,
        codeStates['access_req__group3a221'] = access_req__group3a221Props,
        codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
        codeStates['acc_req_details'] = acc_req_details64e3c,
        codeStates['setacc_req_details'] = setacc_req_details64e3c,
        codeStates['full_name'] = full_nameb4280,
        codeStates['setfull_name'] = setfull_nameb4280,
        codeStates['request_type'] = request_typeade40,
        codeStates['setrequest_type'] = setrequest_typeade40,
        codeStates['system_name'] = system_name55638,
        codeStates['setsystem_name'] = setsystem_name55638,
        codeStates['access_role'] = access_role53ace,
        codeStates['setaccess_role'] = setaccess_role53ace,
        codeStates['access_level'] = access_level5eb9a,
        codeStates['setaccess_level'] = setaccess_level5eb9a,
        codeStates['request_priority'] = request_priority55c8e,
        codeStates['setrequest_priority'] = setrequest_priority55c8e,
        codeStates['risk_level'] = risk_levelcb9f7,
        codeStates['setrisk_level'] = setrisk_levelcb9f7,
        codeStates['request_number'] = request_number6fd42,
        codeStates['setrequest_number'] = setrequest_number6fd42,
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['valid_group'] = valid_groupec21c,
        codeStates['setvalid_group'] = setvalid_groupec21c,
        codeStates['valid_groupec21c'] = valid_groupec21cProps,
        codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
        codeStates['app_inf_group'] = app_inf_groupea43d,
        codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
        codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
        codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
        codeStates['provision_group'] = provision_group4e2a2,
        codeStates['setprovision_group'] = setprovision_group4e2a2,
        codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
        codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
        codeStates['prov_group'] = prov_group3b4eb,
        codeStates['setprov_group'] = setprov_group3b4eb,
        codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
        codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
        codeStates['revocation_group'] = revocation_groupc3044,
        codeStates['setrevocation_group'] = setrevocation_groupc3044,
        codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
        codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
        codeStates['rev_group'] = rev_groupa6a87,
        codeStates['setrev_group'] = setrev_groupa6a87,
        codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
        codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
        codeStates['audit_group'] = audit_groupc16c3,
        codeStates['setaudit_group'] = setaudit_groupc16c3,
        codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
        codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
        codeStates['dynamicactions'] = dynamicactions820e8,
        codeStates['setdynamicactions'] = setdynamicactions820e8,
        codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
        codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
    if(access_req__group3a221?.employee_name == "" || access_req__group3a221?.employee_name == undefined){
      access_req__group3a221.employee_name = "";
      const validate:any = v.safeParse(schema, access_req__group3a221?.employee_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,employee_name:"invalid"}}));
        }
    }else if(access_req__group3a221?.employee_name !== ""){
    const validate:any = v.safeParse(schema, access_req__group3a221?.employee_name);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,employee_name:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,employee_name:undefined}}));
      }
    }
  }
  const access_req__group3a221Ref = useRef<any>(access_req__group3a221);
  useEffect(() => { access_req__group3a221Ref.current = access_req__group3a221; }, [access_req__group3a221]);
    useEffect(()=>{
        if(!access_req__group3a221?.employee_name)
        { 
          setaccess_req__group3a221Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "f7c8ac58ba95fbcf8bf5057aa9fb4280") {
        handleClick(access_req__group3a221Ref?.current?.full_nameb4280?access_req__group3a221Ref?.current?.full_nameb4280:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "f7c8ac58ba95fbcf8bf5057aa9fb4280");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group3a221((pre:any)=>({...pre,employee_name:""}))
    else
      setInitialCount(1)
  },[full_nameb4280?.refresh])
  

  if (full_nameb4280?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 7`,
        gridRow: `7 / 19`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {full_nameb4280?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Employee 
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={full_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__group3a221?.full_nameb4280 ? [access_req__group3a221?.full_nameb4280] : (access_req__group3a221?.employee_name ? dropdownValue : [])}
        validationState={validate?.newAccessRequest_v1?.employee_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownfull_name;
