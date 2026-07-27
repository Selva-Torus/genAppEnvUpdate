

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
const Dropdownprovisioning_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_provisioningstatuscombo_v1Props, setdfd_provisioningstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {provisioning_statusa0dcf, setprovisioning_statusa0dcf}= useContext(TotalContext) as TotalContextProps;
  const {prov_at8b178, setprov_at8b178}= useContext(TotalContext) as TotalContextProps;
  const {provisioning_reference8d6a1, setprovisioning_reference8d6a1}= useContext(TotalContext) as TotalContextProps;
  const {ticket_reference4e55b, setticket_reference4e55b}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [provisioning_statusOptions, setprovisioning_statusOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `emp_provisioning_status`
    let mapperText: string =  `emp_provisioning_status`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "5f37cc88bca7ddd3a92f1469f1de166a",
      "e09358e0d192a541385bdd52cd5a0dcf"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_provisioningstatuscombo_v1Props.dstKey){
      dstKey = dfd_provisioningstatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_provisioningstatuscombo_v1Props && !dfd_provisioningstatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setprovisioning_statusOptions(temp);
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
  },[provisioning_statusa0dcf?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setprovision_groupe166a((prev: any) => ({ ...prev,provisioning_statusa0dcf: value }))
      setIsRequredData(false)
    }else{
      let temp:any = provision_groupe166a;
      delete temp.provisioning_status;
      delete temp.PROVISIONING_STATUS;
      delete temp.provisioning_statusa0dcf;
      setprovision_groupe166a(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,provisioning_status:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(provision_groupe166a.provisioning_status){
      if(Array.isArray(dfd_provisioningstatuscombo_v1Props)){
        if(dfd_provisioningstatuscombo_v1Props?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)){
          setdropdownValue([dfd_provisioningstatuscombo_v1Props?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)?.emp_provisioning_status])
          tempValue=dfd_provisioningstatuscombo_v1Props?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)?.emp_provisioning_status
        }else{
          setdropdownValue([provision_groupe166a.provisioning_status])
          tempValue=provision_groupe166a.provisioning_status
        }
      }else{
        let dstKey:string = dfd_provisioningstatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{emp_provisioning_status:provision_groupe166a.provisioning_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)?.emp_provisioning_status ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.emp_provisioning_status === provision_groupe166a.provisioning_status)?.emp_provisioning_status
      }else{
        setdropdownValue([provision_groupe166a.provisioning_status])
        tempValue=provision_groupe166a.provisioning_status
      }   
      }
    }
    if(provisioning_statusa0dcf?.trigger == true)
    {
      await handlechange(tempValue)
      setprovisioning_statusa0dcf((pre:any)=>({...pre,trigger:false}))
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
  },[provision_groupe166a.provisioning_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_provisioningstatuscombo_v1Props) && dfd_provisioningstatuscombo_v1Props?.length == 1){
    // setprovision_groupe166a((pre:any)=>({...pre,provisioning_status:dfd_provisioningstatuscombo_v1Props[0]?.provisioning_status}))
    }
  },[dfd_provisioningstatuscombo_v1Props])

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
      setprovision_groupe166a((prev: any) => ({ ...prev, provisioning_status: getMapperDetailsBindValues[value],PROVISIONING_STATUS: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setprovision_groupe166a((prev: any) => ({ ...prev, provisioning_status: '', provisioning_statusa0dcf: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,provisioning_status:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.emp_provisioning_status==getMapperDetailsBindValues[value] && items?.emp_provisioning_status==value)) || {}
    selected.current={
      ...selectedObj||{},
      emp_provisioning_status:value,
      emp_provisioning_status:getMapperDetailsBindValues[value]
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
        codeStates['provisioning_status'] = provisioning_statusa0dcf,
        codeStates['setprovisioning_status'] = setprovisioning_statusa0dcf,
        codeStates['prov_at'] = prov_at8b178,
        codeStates['setprov_at'] = setprov_at8b178,
        codeStates['provisioning_reference'] = provisioning_reference8d6a1,
        codeStates['setprovisioning_reference'] = setprovisioning_reference8d6a1,
        codeStates['ticket_reference'] = ticket_reference4e55b,
        codeStates['setticket_reference'] = setticket_reference4e55b,
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const provision_groupe166aRef = useRef<any>(provision_groupe166a);
  useEffect(() => { provision_groupe166aRef.current = provision_groupe166a; }, [provision_groupe166a]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "e09358e0d192a541385bdd52cd5a0dcf") {
        handleClick(provision_groupe166aRef?.current?.provisioning_statusa0dcf?provision_groupe166aRef?.current?.provisioning_statusa0dcf:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "e09358e0d192a541385bdd52cd5a0dcf");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setprovision_groupe166a((pre:any)=>({...pre,provisioning_status:""}))
    else
      setInitialCount(1)
  },[provisioning_statusa0dcf?.refresh])
  

  if (provisioning_statusa0dcf?.isHidden) {
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
        disabled= {provisioning_statusa0dcf?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Provisioning Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={provisioning_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={provision_groupe166a?.provisioning_statusa0dcf ? [provision_groupe166a?.provisioning_statusa0dcf] : (provision_groupe166a?.provisioning_status ? dropdownValue : [])}
        validationState={validate?.viewAccessRequest_v1?.provisioning_status ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownprovisioning_status;
