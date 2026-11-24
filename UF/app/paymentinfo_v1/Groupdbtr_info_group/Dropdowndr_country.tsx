

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
const Dropdowndr_country = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_text_label1015f, setdbtr_info_text_label1015f}= useContext(TotalContext) as TotalContextProps;
  const {dr_accounta8f91, setdr_accounta8f91}= useContext(TotalContext) as TotalContextProps;
  const {dr_namef1c15, setdr_namef1c15}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency45f51, setdr_currency45f51}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_balancea2246, setdr_account_balancea2246}= useContext(TotalContext) as TotalContextProps;
  const {dr_ibanbaa1f, setdr_ibanbaa1f}= useContext(TotalContext) as TotalContextProps;
  const {dr_street_name149b0, setdr_street_name149b0}= useContext(TotalContext) as TotalContextProps;
  const {dr_building_numberba75a, setdr_building_numberba75a}= useContext(TotalContext) as TotalContextProps;
  const {dr_pstl_code5ec76, setdr_pstl_code5ec76}= useContext(TotalContext) as TotalContextProps;
  const {dr_town_name19970, setdr_town_name19970}= useContext(TotalContext) as TotalContextProps;
  const {dr_countrydd685, setdr_countrydd685}= useContext(TotalContext) as TotalContextProps;
  const {dr_bank_codeffb62, setdr_bank_codeffb62}= useContext(TotalContext) as TotalContextProps;
  const {amount_input_typecd6ed, setamount_input_typecd6ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount178b9, setdr_amount178b9}= useContext(TotalContext) as TotalContextProps;
  const {settlement_amount32b14, setsettlement_amount32b14}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [dr_countryOptions, setdr_countryOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `countryname`
    let mapperText: string =  `country_code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "3ecea796df8c424d898e967635c4e8ea",
      "2b1a99644afc44d699009b66156dd685"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_countrycombo_v1Props.dstKey){
      dstKey = dfd_countrycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_countrycombo_v1Props && !dfd_countrycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setdr_countryOptions(temp);
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
  },[dr_countrydd685?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setdbtr_info_group4e8ea((prev: any) => ({ ...prev,dr_countrydd685: value }))
      setIsRequredData(false)
    }else{
      let temp:any = dbtr_info_group4e8ea;
      delete temp.dr_country;
      delete temp.DR_COUNTRY;
      delete temp.dr_countrydd685;
      setdbtr_info_group4e8ea(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_country:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(dbtr_info_group4e8ea.dr_country){
      if(Array.isArray(dfd_countrycombo_v1Props)){
        if(dfd_countrycombo_v1Props?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)){
          setdropdownValue([dfd_countrycombo_v1Props?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)?.countryname])
          tempValue=dfd_countrycombo_v1Props?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)?.countryname
        }else{
          setdropdownValue([dbtr_info_group4e8ea.dr_country])
          tempValue=dbtr_info_group4e8ea.dr_country
        }
      }else{
        let dstKey:string = dfd_countrycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{country_code:dbtr_info_group4e8ea.dr_country}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)?.countryname ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.country_code === dbtr_info_group4e8ea.dr_country)?.countryname
      }else{
        setdropdownValue([dbtr_info_group4e8ea.dr_country])
        tempValue=dbtr_info_group4e8ea.dr_country
      }   
      }
    }
    if(dr_countrydd685?.trigger == true)
    {
      await handlechange(tempValue)
      setdr_countrydd685((pre:any)=>({...pre,trigger:false}))
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
  },[dbtr_info_group4e8ea.dr_country, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_countrycombo_v1Props) && dfd_countrycombo_v1Props?.length == 1){
    // setdbtr_info_group4e8ea((pre:any)=>({...pre,dr_country:dfd_countrycombo_v1Props[0]?.dr_country}))
    }
  },[dfd_countrycombo_v1Props])

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
      setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_country: getMapperDetailsBindValues[value],DR_COUNTRY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_country: '', dr_countrydd685: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_country:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.country_code==getMapperDetailsBindValues[value] && items?.countryname==value)) || {}
    selected.current={
      ...selectedObj||{},
      countryname:value,
      country_code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['dbtr_info_text_label'] = dbtr_info_text_label1015f,
        codeStates['setdbtr_info_text_label'] = setdbtr_info_text_label1015f,
        codeStates['dr_account'] = dr_accounta8f91,
        codeStates['setdr_account'] = setdr_accounta8f91,
        codeStates['dr_name'] = dr_namef1c15,
        codeStates['setdr_name'] = setdr_namef1c15,
        codeStates['dr_currency'] = dr_currency45f51,
        codeStates['setdr_currency'] = setdr_currency45f51,
        codeStates['dr_account_balance'] = dr_account_balancea2246,
        codeStates['setdr_account_balance'] = setdr_account_balancea2246,
        codeStates['dr_iban'] = dr_ibanbaa1f,
        codeStates['setdr_iban'] = setdr_ibanbaa1f,
        codeStates['dr_street_name'] = dr_street_name149b0,
        codeStates['setdr_street_name'] = setdr_street_name149b0,
        codeStates['dr_building_number'] = dr_building_numberba75a,
        codeStates['setdr_building_number'] = setdr_building_numberba75a,
        codeStates['dr_pstl_code'] = dr_pstl_code5ec76,
        codeStates['setdr_pstl_code'] = setdr_pstl_code5ec76,
        codeStates['dr_town_name'] = dr_town_name19970,
        codeStates['setdr_town_name'] = setdr_town_name19970,
        codeStates['dr_country'] = dr_countrydd685,
        codeStates['setdr_country'] = setdr_countrydd685,
        codeStates['dr_bank_code'] = dr_bank_codeffb62,
        codeStates['setdr_bank_code'] = setdr_bank_codeffb62,
        codeStates['amount_input_type'] = amount_input_typecd6ed,
        codeStates['setamount_input_type'] = setamount_input_typecd6ed,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
        codeStates['settlement_amount'] = settlement_amount32b14,
        codeStates['setsettlement_amount'] = setsettlement_amount32b14,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
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
  const dbtr_info_group4e8eaRef = useRef<any>(dbtr_info_group4e8ea);
  useEffect(() => { dbtr_info_group4e8eaRef.current = dbtr_info_group4e8ea; }, [dbtr_info_group4e8ea]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "2b1a99644afc44d699009b66156dd685") {
        handleClick(dbtr_info_group4e8eaRef?.current?.dr_countrydd685?dbtr_info_group4e8eaRef?.current?.dr_countrydd685:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "2b1a99644afc44d699009b66156dd685");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setdbtr_info_group4e8ea((pre:any)=>({...pre,dr_country:""}))
    else
      setInitialCount(1)
  },[dr_countrydd685?.refresh])
  

  if (dr_countrydd685?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `53 / 67`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled={ true }
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Dr Country
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={dr_countryOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={dbtr_info_group4e8ea?.dr_countrydd685 ? [dbtr_info_group4e8ea?.dr_countrydd685] : (dbtr_info_group4e8ea?.dr_country ? dropdownValue : [])}
        validationState={validate?.paymentInfo_v1?.dr_country ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowndr_country;
