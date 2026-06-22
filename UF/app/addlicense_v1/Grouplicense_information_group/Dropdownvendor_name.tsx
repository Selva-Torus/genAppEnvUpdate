

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
const Dropdownvendor_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {add_license_groupdb5a7, setadd_license_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {add_license_groupdb5a7Props, setadd_license_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34, setlicense_information_groupfae34}= useContext(TotalContext) as TotalContextProps;
  const {license_information_groupfae34Props, setlicense_information_groupfae34Props}= useContext(TotalContext) as TotalContextProps;
  const {license_information90d62, setlicense_information90d62}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee8382, setasset_namee8382}= useContext(TotalContext) as TotalContextProps;
  const {product_namec9548, setproduct_namec9548}= useContext(TotalContext) as TotalContextProps;
  const {vendor_nameb519a, setvendor_nameb519a}= useContext(TotalContext) as TotalContextProps;
  const {license_typeae36b, setlicense_typeae36b}= useContext(TotalContext) as TotalContextProps;
  const {license_keyd5b6f, setlicense_keyd5b6f}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91, setlicense_configuration_groupb5d91}= useContext(TotalContext) as TotalContextProps;
  const {license_configuration_groupb5d91Props, setlicense_configuration_groupb5d91Props}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1, setvalidity_financial_details_grouped4a1}= useContext(TotalContext) as TotalContextProps;
  const {validity_financial_details_grouped4a1Props, setvalidity_financial_details_grouped4a1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98, setdynamicactions67d98}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98Props, setdynamicactions67d98Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [vendor_nameOptions, setvendor_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `vendor_name`
    let mapperText: string =  `vendor_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "064a0d259dc344468d8f075a560fae34",
      "9470b421a0e54b4baee0a5e205eb519a"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_vendornamecombo_v1Props.dstKey){
      dstKey = dfd_vendornamecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_vendornamecombo_v1Props && !dfd_vendornamecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setvendor_nameOptions(temp);
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
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
  },[vendor_nameb519a?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setlicense_information_groupfae34((prev: any) => ({ ...prev, vendor_name: getMapperDetailsBindValues[value],vendor_nameb519a: value,VENDOR_NAME: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = license_information_groupfae34;
      delete temp.vendor_name;
      delete temp.VENDOR_NAME;
      delete temp.vendor_nameb519a;
      setlicense_information_groupfae34(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addLicense_v1:{...pre?.addLicense_v1,vendor_name:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(license_information_groupfae34.vendor_name){
      if(Array.isArray(dfd_vendornamecombo_v1Props)){
        if(dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)){
          setdropdownValue([dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)?.vendor_name])
          tempValue=dfd_vendornamecombo_v1Props?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)?.vendor_name
        }else{
          setdropdownValue([license_information_groupfae34.vendor_name])
          tempValue=license_information_groupfae34.vendor_name
        }
      }else{
        let dstKey:string = dfd_vendornamecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{vendor_name:license_information_groupfae34.vendor_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)?.vendor_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.vendor_name === license_information_groupfae34.vendor_name)?.vendor_name
      }else{
        setdropdownValue([license_information_groupfae34.vendor_name])
        tempValue=license_information_groupfae34.vendor_name
      }   
      }
    }
    if(vendor_nameb519a?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setvendor_nameb519a((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[license_information_groupfae34.vendor_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_vendornamecombo_v1Props) && dfd_vendornamecombo_v1Props?.length == 1){
    // setlicense_information_groupfae34((pre:any)=>({...pre,vendor_name:dfd_vendornamecombo_v1Props[0]?.vendor_name}))
    }
  },[dfd_vendornamecombo_v1Props])

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
      setlicense_information_groupfae34((prev: any) => ({ ...prev, vendor_name: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setlicense_information_groupfae34((prev: any) => ({ ...prev, vendor_name: '', vendor_nameb519a: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addLicense_v1:{...pre?.addLicense_v1,vendor_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.vendor_name==getMapperDetailsBindValues[value] && items?.vendor_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      vendor_name:value,
      vendor_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['add_license_group'] = add_license_groupdb5a7,
        codeStates['setadd_license_group'] = setadd_license_groupdb5a7,
        codeStates['add_license_groupdb5a7'] = add_license_groupdb5a7Props,
        codeStates['setadd_license_groupdb5a7'] = setadd_license_groupdb5a7Props,
        codeStates['license_information_group'] = license_information_groupfae34,
        codeStates['setlicense_information_group'] = setlicense_information_groupfae34,
        codeStates['license_information_groupfae34'] = license_information_groupfae34Props,
        codeStates['setlicense_information_groupfae34'] = setlicense_information_groupfae34Props,
        codeStates['license_information'] = license_information90d62,
        codeStates['setlicense_information'] = setlicense_information90d62,
        codeStates['asset_name'] = asset_namee8382,
        codeStates['setasset_name'] = setasset_namee8382,
        codeStates['product_name'] = product_namec9548,
        codeStates['setproduct_name'] = setproduct_namec9548,
        codeStates['vendor_name'] = vendor_nameb519a,
        codeStates['setvendor_name'] = setvendor_nameb519a,
        codeStates['license_type'] = license_typeae36b,
        codeStates['setlicense_type'] = setlicense_typeae36b,
        codeStates['license_key'] = license_keyd5b6f,
        codeStates['setlicense_key'] = setlicense_keyd5b6f,
        codeStates['license_configuration_group'] = license_configuration_groupb5d91,
        codeStates['setlicense_configuration_group'] = setlicense_configuration_groupb5d91,
        codeStates['license_configuration_groupb5d91'] = license_configuration_groupb5d91Props,
        codeStates['setlicense_configuration_groupb5d91'] = setlicense_configuration_groupb5d91Props,
        codeStates['validity_financial_details_group'] = validity_financial_details_grouped4a1,
        codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_grouped4a1,
        codeStates['validity_financial_details_grouped4a1'] = validity_financial_details_grouped4a1Props,
        codeStates['setvalidity_financial_details_grouped4a1'] = setvalidity_financial_details_grouped4a1Props,
        codeStates['dynamicactions'] = dynamicactions67d98,
        codeStates['setdynamicactions'] = setdynamicactions67d98,
        codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
        codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
  const license_information_groupfae34Ref = useRef<any>(license_information_groupfae34);
  useEffect(() => { license_information_groupfae34Ref.current = license_information_groupfae34; }, [license_information_groupfae34]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "9470b421a0e54b4baee0a5e205eb519a") {
        handleClick(license_information_groupfae34Ref?.current?.vendor_nameb519a?license_information_groupfae34Ref?.current?.vendor_nameb519a:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "9470b421a0e54b4baee0a5e205eb519a");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setlicense_information_groupfae34((pre:any)=>({...pre,vendor_name:""}))
    else
      setInitialCount(1)
  },[vendor_nameb519a?.refresh])

  if (vendor_nameb519a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {vendor_nameb519a?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Vendor Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={vendor_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={license_information_groupfae34?.vendor_nameb519a ? [license_information_groupfae34?.vendor_nameb519a] : (license_information_groupfae34?.vendor_name ? dropdownValue : [])}
        validationState={validate?.addLicense_v1?.vendor_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownvendor_name;
