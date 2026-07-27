

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
const Dropdownrisk_level = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps;
  const {acc_req_detailsda2b5, setacc_req_detailsda2b5}= useContext(TotalContext) as TotalContextProps;
  const {full_namec3cd8, setfull_namec3cd8}= useContext(TotalContext) as TotalContextProps;
  const {request_type763e5, setrequest_type763e5}= useContext(TotalContext) as TotalContextProps;
  const {system_namec0d6b, setsystem_namec0d6b}= useContext(TotalContext) as TotalContextProps;
  const {access_role5bf05, setaccess_role5bf05}= useContext(TotalContext) as TotalContextProps;
  const {access_level4f3fa, setaccess_level4f3fa}= useContext(TotalContext) as TotalContextProps;
  const {request_priority2dac4, setrequest_priority2dac4}= useContext(TotalContext) as TotalContextProps;
  const {risk_level7b919, setrisk_level7b919}= useContext(TotalContext) as TotalContextProps;
  const {request_numberc6f16, setrequest_numberc6f16}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [risk_levelOptions, setrisk_levelOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `risk_level`
    let mapperText: string =  `risk_level`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "009cd55942c4a593e51245660f2580cf",
      "ea42fa47b3822c0057b1a1ce74e7b919"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_risklevelcombo_v1Props.dstKey){
      dstKey = dfd_risklevelcombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_risklevelcombo_v1Props && !dfd_risklevelcombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setrisk_levelOptions(temp);
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
  },[risk_level7b919?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setaccess_req__group580cf((prev: any) => ({ ...prev,risk_level7b919: value }))
      setIsRequredData(false)
    }else{
      let temp:any = access_req__group580cf;
      delete temp.risk_level;
      delete temp.RISK_LEVEL;
      delete temp.risk_level7b919;
      setaccess_req__group580cf(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,risk_level:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(access_req__group580cf.risk_level){
      if(Array.isArray(dfd_risklevelcombo_v1Props)){
        if(dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)){
          setdropdownValue([dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)?.risk_level])
          tempValue=dfd_risklevelcombo_v1Props?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)?.risk_level
        }else{
          setdropdownValue([access_req__group580cf.risk_level])
          tempValue=access_req__group580cf.risk_level
        }
      }else{
        let dstKey:string = dfd_risklevelcombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{risk_level:access_req__group580cf.risk_level}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)?.risk_level ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.risk_level === access_req__group580cf.risk_level)?.risk_level
      }else{
        setdropdownValue([access_req__group580cf.risk_level])
        tempValue=access_req__group580cf.risk_level
      }   
      }
    }
    if(risk_level7b919?.trigger == true)
    {
      await handlechange(tempValue)
      setrisk_level7b919((pre:any)=>({...pre,trigger:false}))
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
  },[access_req__group580cf.risk_level, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_risklevelcombo_v1Props) && dfd_risklevelcombo_v1Props?.length == 1){
    // setaccess_req__group580cf((pre:any)=>({...pre,risk_level:dfd_risklevelcombo_v1Props[0]?.risk_level}))
    }
  },[dfd_risklevelcombo_v1Props])

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
      setaccess_req__group580cf((prev: any) => ({ ...prev, risk_level: getMapperDetailsBindValues[value],RISK_LEVEL: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setaccess_req__group580cf((prev: any) => ({ ...prev, risk_level: '', risk_level7b919: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,risk_level:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.risk_level==getMapperDetailsBindValues[value] && items?.risk_level==value)) || {}
    selected.current={
      ...selectedObj||{},
      risk_level:value,
      risk_level:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_group99475,
        codeStates['setnew_access_group'] = setnew_access_group99475,
        codeStates['new_access_group99475'] = new_access_group99475Props,
        codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
        codeStates['access_req__group'] = access_req__group580cf,
        codeStates['setaccess_req__group'] = setaccess_req__group580cf,
        codeStates['access_req__group580cf'] = access_req__group580cfProps,
        codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
        codeStates['acc_req_details'] = acc_req_detailsda2b5,
        codeStates['setacc_req_details'] = setacc_req_detailsda2b5,
        codeStates['full_name'] = full_namec3cd8,
        codeStates['setfull_name'] = setfull_namec3cd8,
        codeStates['request_type'] = request_type763e5,
        codeStates['setrequest_type'] = setrequest_type763e5,
        codeStates['system_name'] = system_namec0d6b,
        codeStates['setsystem_name'] = setsystem_namec0d6b,
        codeStates['access_role'] = access_role5bf05,
        codeStates['setaccess_role'] = setaccess_role5bf05,
        codeStates['access_level'] = access_level4f3fa,
        codeStates['setaccess_level'] = setaccess_level4f3fa,
        codeStates['request_priority'] = request_priority2dac4,
        codeStates['setrequest_priority'] = setrequest_priority2dac4,
        codeStates['risk_level'] = risk_level7b919,
        codeStates['setrisk_level'] = setrisk_level7b919,
        codeStates['request_number'] = request_numberc6f16,
        codeStates['setrequest_number'] = setrequest_numberc6f16,
        codeStates['business_just__group'] = business_just__group2c68d,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
        codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
        codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
        codeStates['valid_group'] = valid_group6c83b,
        codeStates['setvalid_group'] = setvalid_group6c83b,
        codeStates['valid_group6c83b'] = valid_group6c83bProps,
        codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
        codeStates['app_inf_group'] = app_inf_group5ad5c,
        codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
        codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
        codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
        codeStates['provision_group'] = provision_groupe166a,
        codeStates['setprovision_group'] = setprovision_groupe166a,
        codeStates['provision_groupe166a'] = provision_groupe166aProps,
        codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
        codeStates['prov_group'] = prov_groupce05f,
        codeStates['setprov_group'] = setprov_groupce05f,
        codeStates['prov_groupce05f'] = prov_groupce05fProps,
        codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
        codeStates['revocation_group'] = revocation_groupbee08,
        codeStates['setrevocation_group'] = setrevocation_groupbee08,
        codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
        codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
        codeStates['rev_group'] = rev_group1cf92,
        codeStates['setrev_group'] = setrev_group1cf92,
        codeStates['rev_group1cf92'] = rev_group1cf92Props,
        codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
        codeStates['audit_group'] = audit_groupdea6a,
        codeStates['setaudit_group'] = setaudit_groupdea6a,
        codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
        codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
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
    if(access_req__group580cf?.risk_level == "" || access_req__group580cf?.risk_level == undefined){
      access_req__group580cf.risk_level = "";
      const validate:any = v.safeParse(schema, access_req__group580cf?.risk_level);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,risk_level:"invalid"}}));
        }
    }else if(access_req__group580cf?.risk_level !== ""){
    const validate:any = v.safeParse(schema, access_req__group580cf?.risk_level);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,risk_level:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,risk_level:undefined}}));
      }
    }
  }
  const access_req__group580cfRef = useRef<any>(access_req__group580cf);
  useEffect(() => { access_req__group580cfRef.current = access_req__group580cf; }, [access_req__group580cf]);
    useEffect(()=>{
        if(!access_req__group580cf?.risk_level)
        { 
          setaccess_req__group580cfProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "ea42fa47b3822c0057b1a1ce74e7b919") {
        handleClick(access_req__group580cfRef?.current?.risk_level7b919?access_req__group580cfRef?.current?.risk_level7b919:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "ea42fa47b3822c0057b1a1ce74e7b919");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group580cf((pre:any)=>({...pre,risk_level:""}))
    else
      setInitialCount(1)
  },[risk_level7b919?.refresh])
  

  if (risk_level7b919?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 19`,
        gridRow: `20 / 32`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {risk_level7b919?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Risk Level
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={risk_levelOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={access_req__group580cf?.risk_level7b919 ? [access_req__group580cf?.risk_level7b919] : (access_req__group580cf?.risk_level ? dropdownValue : [])}
        validationState={validate?.viewAccessRequest_v1?.risk_level ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownrisk_level;
