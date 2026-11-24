

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
const Dropdowncr_currency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
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
  let customecode:string="if (selected.current?.currency_code == dbtr_info_group.dr_currency||selected.current?.currency_code==\"\" || selected.current?.currency_code==undefined)\r\n    {\r\n      setexchange_rate((prev) => ({\r\n        ...prev,\r\n        isDisabled: true,\r\n      }));\r\n    }else\r\n    {\r\n        setexchange_rate((prev) => ({\r\n        ...prev,\r\n        isDisabled: false,\r\n      }));\r\n    }";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 1000;
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
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {creditor_info_label_text02833, setcreditor_info_label_text02833}= useContext(TotalContext) as TotalContextProps;
  const {ben_checkbox780b4, setben_checkbox780b4}= useContext(TotalContext) as TotalContextProps;
  const {cr_account3b649, setcr_account3b649}= useContext(TotalContext) as TotalContextProps;
  const {cr_namee0835, setcr_namee0835}= useContext(TotalContext) as TotalContextProps;
  const {cr_street_name21bab, setcr_street_name21bab}= useContext(TotalContext) as TotalContextProps;
  const {cr_benif_action9998d, setcr_benif_action9998d}= useContext(TotalContext) as TotalContextProps;
  const {cr_building_namea6ac7, setcr_building_namea6ac7}= useContext(TotalContext) as TotalContextProps;
  const {cr_floor44bed, setcr_floor44bed}= useContext(TotalContext) as TotalContextProps;
  const {cr_post_codef645b, setcr_post_codef645b}= useContext(TotalContext) as TotalContextProps;
  const {cr_town_nameed852, setcr_town_nameed852}= useContext(TotalContext) as TotalContextProps;
  const {cr_country38218, setcr_country38218}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencyb2ebe, setcr_currencyb2ebe}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate86282, setexchange_rate86282}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code76d12, setcr_bank_code76d12}= useContext(TotalContext) as TotalContextProps;
  const {cr_clr_code4387d, setcr_clr_code4387d}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount178b9, setdr_amount178b9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [cr_currencyOptions, setcr_currencyOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `currency_desc`
    let mapperText: string =  `currency_code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    //copySourceValue
    copySourceFilterColumn = "currency_code";
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "18502770a2a84feb968a3817c35b01e8",
      "ac2b2cd3456e451ea9ec7bc05a7b2ebe"
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
      setcr_currencyOptions(temp);
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
  },[cr_currencyb2ebe?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setcr_info_groupb01e8((prev: any) => ({ ...prev,cr_currencyb2ebe: value }))
      setIsRequredData(false)
    }else{
      let temp:any = cr_info_groupb01e8;
      delete temp.cr_currency;
      delete temp.CR_CURRENCY;
      delete temp.cr_currencyb2ebe;
      setcr_info_groupb01e8(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_currency:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(cr_info_groupb01e8.cr_currency){
      if(Array.isArray(dfd_currencycombo_v1Props)){
        if(dfd_currencycombo_v1Props?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)){
          setdropdownValue([dfd_currencycombo_v1Props?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)?.currency_desc])
          tempValue=dfd_currencycombo_v1Props?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)?.currency_desc
        }else{
          setdropdownValue([cr_info_groupb01e8.cr_currency])
          tempValue=cr_info_groupb01e8.cr_currency
        }
      }else{
        let dstKey:string = dfd_currencycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{currency_code:cr_info_groupb01e8.cr_currency}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)?.currency_desc ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.currency_code === cr_info_groupb01e8.cr_currency)?.currency_desc
      }else{
        setdropdownValue([cr_info_groupb01e8.cr_currency])
        tempValue=cr_info_groupb01e8.cr_currency
      }   
      }
    }
    if(cr_currencyb2ebe?.trigger == true)
    {
      await handlechange(tempValue)
      setcr_currencyb2ebe((pre:any)=>({...pre,trigger:false}))
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
  },[cr_info_groupb01e8.cr_currency, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_currencycombo_v1Props) && dfd_currencycombo_v1Props?.length == 1){
    // setcr_info_groupb01e8((pre:any)=>({...pre,cr_currency:dfd_currencycombo_v1Props[0]?.cr_currency}))
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
      setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_currency: getMapperDetailsBindValues[value],CR_CURRENCY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_currency: '', cr_currencyb2ebe: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_currency:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.currency_code==getMapperDetailsBindValues[value] && items?.currency_desc==value)) || {}
    selected.current={
      ...selectedObj||{},
      currency_desc:value,
      currency_code:getMapperDetailsBindValues[value]
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
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['creditor_info_label_text'] = creditor_info_label_text02833,
        codeStates['setcreditor_info_label_text'] = setcreditor_info_label_text02833,
        codeStates['ben_checkbox'] = ben_checkbox780b4,
        codeStates['setben_checkbox'] = setben_checkbox780b4,
        codeStates['cr_account'] = cr_account3b649,
        codeStates['setcr_account'] = setcr_account3b649,
        codeStates['cr_name'] = cr_namee0835,
        codeStates['setcr_name'] = setcr_namee0835,
        codeStates['cr_street_name'] = cr_street_name21bab,
        codeStates['setcr_street_name'] = setcr_street_name21bab,
        codeStates['cr_benif_action'] = cr_benif_action9998d,
        codeStates['setcr_benif_action'] = setcr_benif_action9998d,
        codeStates['cr_building_name'] = cr_building_namea6ac7,
        codeStates['setcr_building_name'] = setcr_building_namea6ac7,
        codeStates['cr_floor'] = cr_floor44bed,
        codeStates['setcr_floor'] = setcr_floor44bed,
        codeStates['cr_post_code'] = cr_post_codef645b,
        codeStates['setcr_post_code'] = setcr_post_codef645b,
        codeStates['cr_town_name'] = cr_town_nameed852,
        codeStates['setcr_town_name'] = setcr_town_nameed852,
        codeStates['cr_country'] = cr_country38218,
        codeStates['setcr_country'] = setcr_country38218,
        codeStates['cr_currency'] = cr_currencyb2ebe,
        codeStates['setcr_currency'] = setcr_currencyb2ebe,
        codeStates['exchange_rate'] = exchange_rate86282,
        codeStates['setexchange_rate'] = setexchange_rate86282,
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['cr_bank_code'] = cr_bank_code76d12,
        codeStates['setcr_bank_code'] = setcr_bank_code76d12,
        codeStates['cr_clr_code'] = cr_clr_code4387d,
        codeStates['setcr_clr_code'] = setcr_clr_code4387d,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
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

      // eventEmitter     
        let uf_getPFDetails:any={
          key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationSplFXRateApi:AFVK:v1|1ef993ff93ea4acc89385ddcd6d9db04"
        };
        let eventProperty :any = {
  "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe",
  "type": "dropdown",
  "name": "cr_currency",
  "label": "cr_currency",
  "sequence": 1,
  "children": [
    {
      "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "18502770a2a84feb968a3817c35b01e8|602a6db9240142ba8caa5f8403b86282.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|cr_info_group|exchange_rate",
                  "label": "paymentInfo.v1|cr_info_group|exchange_rate",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|cr_info_group|exchange_rate",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.1.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].exchange_rate",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1.1.2",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.2",
              "children": [
                {
                  "id": "18502770a2a84feb968a3817c35b01e8|47b2e2782fcf455fb3205769f4dbd2bf.1.1.1.2.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|cr_info_group|cr_amount",
                  "label": "paymentInfo.v1|cr_info_group|cr_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|cr_info_group|cr_amount",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.2.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].cr_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            },
            {
              "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1.1.3",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.3",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|51f934e7ff9a4d25896f126c2c4178b9.1.1.1.3.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_amount",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_amount",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.3.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].dr_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationSplFXRateApi:AFVK:v1|1ef993ff93ea4acc89385ddcd6d9db04"
          ]
        },
        {
          "id": "ac2b2cd3456e451ea9ec7bc05a7b2ebe.1.1.2",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "copySourceValue",
          "label": "copySourceValue",
          "sequence": "1.1.2",
          "children": [],
          "hlr": {
            "params": [
              {
                "name": "columnName",
                "_label": "Column Name",
                "_type": "text",
                "value": "currency_code",
                "enabled": true
              }
            ]
          }
        }
      ]
    }
  ]
};
        const eventDetails : any = await eventFunction(eventProperty);
        const eventDetailsArray = eventDetails[0];
        let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1";
        sourceId+= "|"+"18502770a2a84feb968a3817c35b01e8";
        const pathIds = SourceIdFilter(eventProperty,"1.1.1");
        let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1"+"|"+"18502770a2a84feb968a3817c35b01e8"+"|"+eventProperty.id;
        pathIds.map((ele:any,id:number)=>{
          if(id!=pathIds.length-1)
          {
            sourceIdNewPath=sourceIdNewPath+"|"+ele
          }
        })
        for (let k = 0; k < eventDetailsArray.length; k++) {
          if (
            eventDetailsArray[k].type === 'handlerNode' &&
            eventDetailsArray[k].name === 'eventEmitter'
          ) {
            if (
              eventDetailsArray[k].targetKey &&
              eventDetailsArray[k].targetKey.length > 0
            ) {
              uf_getPFDetails= {
              key:eventDetailsArray[k].targetKey[0],
                status: eventDetailsArray[k]?.status,
                sourceId:sourceIdNewPath
              };
            } else if (!eventDetailsArray[k].targetKey) {
              uf_getPFDetails= {
                status: eventDetailsArray[k]?.status,
                sourceId:sourceIdNewPath
              };
            }
          }
        }
      
      if (!uf_getPFDetails.key) {
        throw new Error('Please check PF configuration')
      }

      // Initiate PF
      const uf_initiatePfBody:uf_initiatePfDto={
        key:uf_getPFDetails.key,
        sourceId:sourceIdNewPath
      };

      if (encryptionFlagCont) {
        uf_initiatePfBody["dpdKey"] = encryptionDpd;
        uf_initiatePfBody["method"] = encryptionMethod;
      };

      const uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(uf_initiatePf?.data?.error == true){
        toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
        return
      }

        
      // Call IFO
      const uf_ifoBody:uf_ifoDto={
        formData:{...nullFilter(payment_info_group1bac9),...nullFilter(midynamicactions3b39d),...nullFilter(general_info_groupc83e6),...nullFilter(dbtr_info_group4e8ea),...nullFilter(chrg_info_group76ab0),...nullFilter(add_info_groupe8dc6),...cr_info_groupb01e8,cr_currency: getMapperDetailsBindValues[value] },
        key:uf_getPFDetails.key,
        groupId:"18502770a2a84feb968a3817c35b01e8",
        controlId:"ac2b2cd3456e451ea9ec7bc05a7b2ebe"
      };

      if (encryptionFlagCont) {
        uf_ifoBody["dpdKey"] = encryptionDpd;
        uf_ifoBody["method"] = encryptionMethod;
      } 

      const uf_ifo = await AxiosService.post('/UF/ifo', uf_ifoBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (uf_ifo?.data?.error == true) {
        toast(uf_ifo?.data?.errorDetails?.message, 'danger')
        return
      }

      //eventEmitter
      const { key, nodeId, nodeType, nodeName } = uf_initiatePf.data.nodeProperty || {};
      const  te_eventEmitterBody: te_eventEmitterDto = {
          key: key,
          nodeId: nodeId,
          nodeType: nodeType,
          nodeName: nodeName,
          data:[{...uf_ifo?.data }],
          event : uf_initiatePf.data.eventProperty?.source?.status,
          sourceId : uf_initiatePf.data.eventProperty?.sourceId,
          controlName: "cr_currency",
          upId : cr_info_groupb01e8?.upId? [cr_info_groupb01e8?.upId ] : lockedData.processIds,

      };
      
      if (cr_info_groupb01e8Props.ssKey !== '' && cr_info_groupb01e8Props.ssKey !== undefined) {
        te_eventEmitterBody["ssKey"] = cr_info_groupb01e8Props.ssKey;
      }
      
      if (encryptionFlagCont) {
        te_eventEmitterBody["dpdKey"] = encryptionDpd;
        te_eventEmitterBody["method"] = encryptionMethod;
      }
      
      te_eventEmitter = await AxiosService.post(
        '/te/eventEmitter',
        te_eventEmitterBody,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (te_eventEmitter?.data?.error == true) {
        toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
        throw te_eventEmitter?.data?.errorDetails?.message
      }
      // copyFormData
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|cr_info_group|exchange_rate
              copyFormhandlerData["setcr_info_groupb01e8"]={...copyFormhandlerData["setcr_info_groupb01e8"],[UOmapperData['602a6db9240142ba8caa5f8403b86282']['source']]:commonSepareteDataFromTheObject("data[0].exchange_rate",te_eventEmitter?.data)}
      // copyFormData
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|cr_info_group|cr_amount
              copyFormhandlerData["setcr_info_groupb01e8"]={...copyFormhandlerData["setcr_info_groupb01e8"],[UOmapperData['47b2e2782fcf455fb3205769f4dbd2bf']['source']]:commonSepareteDataFromTheObject("data[0].cr_amount",te_eventEmitter?.data)}
      // copyFormData
                  // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_amount
              copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['51f934e7ff9a4d25896f126c2c4178b9']['source']]:commonSepareteDataFromTheObject("data[0].dr_amount",te_eventEmitter?.data)}
      if("setcr_info_groupb01e8" in copyFormhandlerData){
        setcr_info_groupb01e8((pre:any)=>({...pre,...copyFormhandlerData["setcr_info_groupb01e8"]}) )
      }
      if("setdbtr_info_group4e8ea" in copyFormhandlerData){
        setdbtr_info_group4e8ea((pre:any)=>({...pre,...copyFormhandlerData["setdbtr_info_group4e8ea"]}) )
      }
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
   
  async function handleConfirmonClick(){
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
    if(cr_info_groupb01e8?.cr_currency == "" || cr_info_groupb01e8?.cr_currency == undefined){
      cr_info_groupb01e8.cr_currency = "";
      const validate:any = v.safeParse(schema, cr_info_groupb01e8?.cr_currency);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_currency:"invalid"}}));
        }
    }else if(cr_info_groupb01e8?.cr_currency !== ""){
    const validate:any = v.safeParse(schema, cr_info_groupb01e8?.cr_currency);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_currency:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_currency:undefined}}));
      }
    }
  }
  const cr_info_groupb01e8Ref = useRef<any>(cr_info_groupb01e8);
  useEffect(() => { cr_info_groupb01e8Ref.current = cr_info_groupb01e8; }, [cr_info_groupb01e8]);
    useEffect(()=>{
        if(!cr_info_groupb01e8?.cr_currency)
        { 
          setcr_info_groupb01e8Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "ac2b2cd3456e451ea9ec7bc05a7b2ebe") {
        handleClick(cr_info_groupb01e8Ref?.current?.cr_currencyb2ebe?cr_info_groupb01e8Ref?.current?.cr_currencyb2ebe:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "ac2b2cd3456e451ea9ec7bc05a7b2ebe");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcr_info_groupb01e8((pre:any)=>({...pre,cr_currency:""}))
    else
      setInitialCount(1)
  },[cr_currencyb2ebe?.refresh])
  

  if (cr_currencyb2ebe?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `38 / 52`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled= {cr_currencyb2ebe?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Cr Currency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={cr_currencyOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={cr_info_groupb01e8?.cr_currencyb2ebe ? [cr_info_groupb01e8?.cr_currencyb2ebe] : (cr_info_groupb01e8?.cr_currency ? dropdownValue : [])}
        validationState={validate?.paymentInfo_v1?.cr_currency ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncr_currency;
