

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
const Dropdowncurrency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {purchase_details_textf2780, setpurchase_details_textf2780}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name4190d, setvendor_name4190d}= useContext(TotalContext) as TotalContextProps;
  const {purchase_costff91e, setpurchase_costff91e}= useContext(TotalContext) as TotalContextProps;
  const {currency823ac, setcurrency823ac}= useContext(TotalContext) as TotalContextProps;
  const {purchase_datec1162, setpurchase_datec1162}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiry1fdec, setwarranty_expiry1fdec}= useContext(TotalContext) as TotalContextProps;
  const {current_value8f6cd, setcurrent_value8f6cd}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_rate8d4a6, setdepreciation_rate8d4a6}= useContext(TotalContext) as TotalContextProps;
  const {salvage_valuef1995, setsalvage_valuef1995}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [currencyOptions, setcurrencyOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `currency_code`
    let mapperText: string =  `currency_no`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "ee1d91659fbf473bb30f690c00976407",
      "3ea5f6291e064541a18c78e56bd823ac"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_currencycombo_v1Props.dstKey){
      dstKey = dfd_currencycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_currencycombo_v1Props && !dfd_currencycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcurrencyOptions(temp);
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
  },[currency823ac?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setpyrchase_details_group76407((prev: any) => ({ ...prev, currency: getMapperDetailsBindValues[value],currency823ac: value,CURRENCY: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = pyrchase_details_group76407;
      delete temp.currency;
      delete temp.CURRENCY;
      delete temp.currency823ac;
      setpyrchase_details_group76407(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,currency:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(pyrchase_details_group76407.currency){
      if(Array.isArray(dfd_currencycombo_v1Props)){
        if(dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)){
          setdropdownValue([dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)?.currency_code])
          tempValue=dfd_currencycombo_v1Props?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)?.currency_code
        }else{
          setdropdownValue([pyrchase_details_group76407.currency])
          tempValue=pyrchase_details_group76407.currency
        }
      }else{
        let dstKey:string = dfd_currencycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{currency_no:pyrchase_details_group76407.currency}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)?.currency_code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.currency_no === pyrchase_details_group76407.currency)?.currency_code
      }else{
        setdropdownValue([pyrchase_details_group76407.currency])
        tempValue=pyrchase_details_group76407.currency
      }   
      }
    }
    if(currency823ac?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setcurrency823ac((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[pyrchase_details_group76407.currency, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_currencycombo_v1Props) && dfd_currencycombo_v1Props?.length == 1){
    // setpyrchase_details_group76407((pre:any)=>({...pre,currency:dfd_currencycombo_v1Props[0]?.currency}))
    }
  },[dfd_currencycombo_v1Props])

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
      setpyrchase_details_group76407((prev: any) => ({ ...prev, currency: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setpyrchase_details_group76407((prev: any) => ({ ...prev, currency: '', currency823ac: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,currency:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.currency_no==getMapperDetailsBindValues[value] && items?.currency_code==value)) || {}
    selected.current={
      ...selectedObj||{},
      currency_code:value,
      currency_no:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['purchase_details_text'] = purchase_details_textf2780,
        codeStates['setpurchase_details_text'] = setpurchase_details_textf2780,
        codeStates['vendor_name'] = vendor_name4190d,
        codeStates['setvendor_name'] = setvendor_name4190d,
        codeStates['purchase_cost'] = purchase_costff91e,
        codeStates['setpurchase_cost'] = setpurchase_costff91e,
        codeStates['currency'] = currency823ac,
        codeStates['setcurrency'] = setcurrency823ac,
        codeStates['purchase_date'] = purchase_datec1162,
        codeStates['setpurchase_date'] = setpurchase_datec1162,
        codeStates['warranty_expiry'] = warranty_expiry1fdec,
        codeStates['setwarranty_expiry'] = setwarranty_expiry1fdec,
        codeStates['current_value'] = current_value8f6cd,
        codeStates['setcurrent_value'] = setcurrent_value8f6cd,
        codeStates['depreciation_rate'] = depreciation_rate8d4a6,
        codeStates['setdepreciation_rate'] = setdepreciation_rate8d4a6,
        codeStates['salvage_value'] = salvage_valuef1995,
        codeStates['setsalvage_value'] = setsalvage_valuef1995,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
      if(pyrchase_details_group76407?.currency == "" || pyrchase_details_group76407?.currency == undefined){
      pyrchase_details_group76407.currency = "";
      const validate:any = v.safeParse(schema, pyrchase_details_group76407?.currency);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,currency:"invalid"}}));
        }
    }else if(pyrchase_details_group76407?.currency !== ""){
    const validate:any = v.safeParse(schema, pyrchase_details_group76407?.currency);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,currency:"invalid"}}));
    }
    }
  }
  const pyrchase_details_group76407Ref = useRef<any>(pyrchase_details_group76407);
  useEffect(() => { pyrchase_details_group76407Ref.current = pyrchase_details_group76407; }, [pyrchase_details_group76407]);
    useEffect(()=>{
        if(!pyrchase_details_group76407?.currency)
        { 
          setpyrchase_details_group76407Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "3ea5f6291e064541a18c78e56bd823ac") {
        handleClick(pyrchase_details_group76407Ref?.current?.currency823ac?pyrchase_details_group76407Ref?.current?.currency823ac:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "3ea5f6291e064541a18c78e56bd823ac");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setpyrchase_details_group76407((pre:any)=>({...pre,currency:""}))
    else
      setInitialCount(1)
  },[currency823ac?.refresh])

  if (currency823ac?.isHidden) {
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
        className="!rounded-md"    
        disabled= {currency823ac?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Currency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={currencyOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={pyrchase_details_group76407?.currency823ac ? [pyrchase_details_group76407?.currency823ac] : (pyrchase_details_group76407?.currency ? dropdownValue : [])}
        validationState={validate?.newAsset_v1?.currency ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncurrency;
