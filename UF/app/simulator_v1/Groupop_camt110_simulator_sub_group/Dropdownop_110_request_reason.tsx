

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
const Dropdownop_110_request_reason = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfreqreason_v1Props, setdfd_nfreqreason_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007}= useContext(TotalContext) as TotalContextProps;
  const {acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391f, setop_financial_tab_headerc391f}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391fProps, setop_financial_tab_headerc391fProps}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896, setip_financial_tab_header60896}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896Props, setip_financial_tab_header60896Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71Props, setop_nf_camt110_tab_header4fa71Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_productcodec2128, setop_110_productcodec2128}= useContext(TotalContext) as TotalContextProps;
  const {op_110_message_type8876c, setop_110_message_type8876c}= useContext(TotalContext) as TotalContextProps;
  const {op_110_date89cec, setop_110_date89cec}= useContext(TotalContext) as TotalContextProps;
  const {op_110_uuid82718, setop_110_uuid82718}= useContext(TotalContext) as TotalContextProps;
  const {op_110_request_type2c432, setop_110_request_type2c432}= useContext(TotalContext) as TotalContextProps;
  const {op_110_request_reason6d6fa, setop_110_request_reason6d6fa}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0Props, setop_nf_camt111_tab_header05ca0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62Props, setip_nf_camt055_tab_header06c62Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [op_110_request_reasonOptions, setop_110_request_reasonOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `description`
    let mapperText: string =  `req_reason_code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "464c56fd25ac4c81ba61b110d986f9ed",
      "80a7c3e25c8944ca8ec9884bbc36d6fa"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_nfreqreason_v1Props.dstKey){
      dstKey = dfd_nfreqreason_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_nfreqreason_v1Props && !dfd_nfreqreason_v1Props.hasLogicCenter && !dfdFlag) {
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
      setop_110_request_reasonOptions(temp);
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
  },[op_110_request_reason6d6fa?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setop_camt110_simulator_sub_group6f9ed((prev: any) => ({ ...prev,op_110_request_reason6d6fa: value }))
      setIsRequredData(false)
    }else{
      let temp:any = op_camt110_simulator_sub_group6f9ed;
      delete temp.op_110_request_reason;
      delete temp.OP_110_REQUEST_REASON;
      delete temp.op_110_request_reason6d6fa;
      setop_camt110_simulator_sub_group6f9ed(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_request_reason:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(op_camt110_simulator_sub_group6f9ed.op_110_request_reason){
      if(Array.isArray(dfd_nfreqreason_v1Props)){
        if(dfd_nfreqreason_v1Props?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)){
          setdropdownValue([dfd_nfreqreason_v1Props?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)?.description])
          tempValue=dfd_nfreqreason_v1Props?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)?.description
        }else{
          setdropdownValue([op_camt110_simulator_sub_group6f9ed.op_110_request_reason])
          tempValue=op_camt110_simulator_sub_group6f9ed.op_110_request_reason
        }
      }else{
        let dstKey:string = dfd_nfreqreason_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{req_reason_code:op_camt110_simulator_sub_group6f9ed.op_110_request_reason}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)?.description ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.req_reason_code === op_camt110_simulator_sub_group6f9ed.op_110_request_reason)?.description
      }else{
        setdropdownValue([op_camt110_simulator_sub_group6f9ed.op_110_request_reason])
        tempValue=op_camt110_simulator_sub_group6f9ed.op_110_request_reason
      }   
      }
    }
    if(op_110_request_reason6d6fa?.trigger == true)
    {
      await handlechange(tempValue)
      setop_110_request_reason6d6fa((pre:any)=>({...pre,trigger:false}))
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
  },[op_camt110_simulator_sub_group6f9ed.op_110_request_reason, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_nfreqreason_v1Props) && dfd_nfreqreason_v1Props?.length == 1){
    // setop_camt110_simulator_sub_group6f9ed((pre:any)=>({...pre,op_110_request_reason:dfd_nfreqreason_v1Props[0]?.op_110_request_reason}))
    }
  },[dfd_nfreqreason_v1Props])

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
      setop_camt110_simulator_sub_group6f9ed((prev: any) => ({ ...prev, op_110_request_reason: getMapperDetailsBindValues[value],OP_110_REQUEST_REASON: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setop_camt110_simulator_sub_group6f9ed((prev: any) => ({ ...prev, op_110_request_reason: '', op_110_request_reason6d6fa: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_request_reason:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.req_reason_code==getMapperDetailsBindValues[value] && items?.description==value)) || {}
    selected.current={
      ...selectedObj||{},
      description:value,
      req_reason_code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['acksimulatormaingroup'] = acksimulatormaingroup3a007,
        codeStates['setacksimulatormaingroup'] = setacksimulatormaingroup3a007,
        codeStates['acksimulatormaingroup3a007'] = acksimulatormaingroup3a007Props,
        codeStates['setacksimulatormaingroup3a007'] = setacksimulatormaingroup3a007Props,
        codeStates['ack_simulator_tab_group'] = ack_simulator_tab_group0778c,
        codeStates['setack_simulator_tab_group'] = setack_simulator_tab_group0778c,
        codeStates['ack_simulator_tab_group0778c'] = ack_simulator_tab_group0778cProps,
        codeStates['setack_simulator_tab_group0778c'] = setack_simulator_tab_group0778cProps,
        codeStates['op_financial_tab_header'] = op_financial_tab_headerc391f,
        codeStates['setop_financial_tab_header'] = setop_financial_tab_headerc391f,
        codeStates['op_financial_tab_headerc391f'] = op_financial_tab_headerc391fProps,
        codeStates['setop_financial_tab_headerc391f'] = setop_financial_tab_headerc391fProps,
        codeStates['op_simulator_sub_group'] = op_simulator_sub_group467ba,
        codeStates['setop_simulator_sub_group'] = setop_simulator_sub_group467ba,
        codeStates['op_simulator_sub_group467ba'] = op_simulator_sub_group467baProps,
        codeStates['setop_simulator_sub_group467ba'] = setop_simulator_sub_group467baProps,
        codeStates['customwidgetmaingroup'] = customwidgetmaingroupcf43a,
        codeStates['setcustomwidgetmaingroup'] = setcustomwidgetmaingroupcf43a,
        codeStates['customwidgetmaingroupcf43a'] = customwidgetmaingroupcf43aProps,
        codeStates['setcustomwidgetmaingroupcf43a'] = setcustomwidgetmaingroupcf43aProps,
        codeStates['dynamicactionmaingroup'] = dynamicactionmaingroupd3a78,
        codeStates['setdynamicactionmaingroup'] = setdynamicactionmaingroupd3a78,
        codeStates['dynamicactionmaingroupd3a78'] = dynamicactionmaingroupd3a78Props,
        codeStates['setdynamicactionmaingroupd3a78'] = setdynamicactionmaingroupd3a78Props,
        codeStates['dynamicactionsubgroup'] = dynamicactionsubgroupa58e6,
        codeStates['setdynamicactionsubgroup'] = setdynamicactionsubgroupa58e6,
        codeStates['dynamicactionsubgroupa58e6'] = dynamicactionsubgroupa58e6Props,
        codeStates['setdynamicactionsubgroupa58e6'] = setdynamicactionsubgroupa58e6Props,
        codeStates['ip_financial_tab_header'] = ip_financial_tab_header60896,
        codeStates['setip_financial_tab_header'] = setip_financial_tab_header60896,
        codeStates['ip_financial_tab_header60896'] = ip_financial_tab_header60896Props,
        codeStates['setip_financial_tab_header60896'] = setip_financial_tab_header60896Props,
        codeStates['ip_simulator_sub_group'] = ip_simulator_sub_groupa1dc8,
        codeStates['setip_simulator_sub_group'] = setip_simulator_sub_groupa1dc8,
        codeStates['ip_simulator_sub_groupa1dc8'] = ip_simulator_sub_groupa1dc8Props,
        codeStates['setip_simulator_sub_groupa1dc8'] = setip_simulator_sub_groupa1dc8Props,
        codeStates['ip_dynamicactionmaingroup'] = ip_dynamicactionmaingroup2f849,
        codeStates['setip_dynamicactionmaingroup'] = setip_dynamicactionmaingroup2f849,
        codeStates['ip_dynamicactionmaingroup2f849'] = ip_dynamicactionmaingroup2f849Props,
        codeStates['setip_dynamicactionmaingroup2f849'] = setip_dynamicactionmaingroup2f849Props,
        codeStates['ip_dynamicactionsubgroup'] = ip_dynamicactionsubgroup31c5b,
        codeStates['setip_dynamicactionsubgroup'] = setip_dynamicactionsubgroup31c5b,
        codeStates['ip_dynamicactionsubgroup31c5b'] = ip_dynamicactionsubgroup31c5bProps,
        codeStates['setip_dynamicactionsubgroup31c5b'] = setip_dynamicactionsubgroup31c5bProps,
        codeStates['op_nf_camt110_tab_header'] = op_nf_camt110_tab_header4fa71,
        codeStates['setop_nf_camt110_tab_header'] = setop_nf_camt110_tab_header4fa71,
        codeStates['op_nf_camt110_tab_header4fa71'] = op_nf_camt110_tab_header4fa71Props,
        codeStates['setop_nf_camt110_tab_header4fa71'] = setop_nf_camt110_tab_header4fa71Props,
        codeStates['op_camt110_simulator_sub_group'] = op_camt110_simulator_sub_group6f9ed,
        codeStates['setop_camt110_simulator_sub_group'] = setop_camt110_simulator_sub_group6f9ed,
        codeStates['op_camt110_simulator_sub_group6f9ed'] = op_camt110_simulator_sub_group6f9edProps,
        codeStates['setop_camt110_simulator_sub_group6f9ed'] = setop_camt110_simulator_sub_group6f9edProps,
        codeStates['op_110_productcode'] = op_110_productcodec2128,
        codeStates['setop_110_productcode'] = setop_110_productcodec2128,
        codeStates['op_110_message_type'] = op_110_message_type8876c,
        codeStates['setop_110_message_type'] = setop_110_message_type8876c,
        codeStates['op_110_date'] = op_110_date89cec,
        codeStates['setop_110_date'] = setop_110_date89cec,
        codeStates['op_110_uuid'] = op_110_uuid82718,
        codeStates['setop_110_uuid'] = setop_110_uuid82718,
        codeStates['op_110_request_type'] = op_110_request_type2c432,
        codeStates['setop_110_request_type'] = setop_110_request_type2c432,
        codeStates['op_110_request_reason'] = op_110_request_reason6d6fa,
        codeStates['setop_110_request_reason'] = setop_110_request_reason6d6fa,
        codeStates['op_110_dynamicactionmaingroup'] = op_110_dynamicactionmaingroup4acc0,
        codeStates['setop_110_dynamicactionmaingroup'] = setop_110_dynamicactionmaingroup4acc0,
        codeStates['op_110_dynamicactionmaingroup4acc0'] = op_110_dynamicactionmaingroup4acc0Props,
        codeStates['setop_110_dynamicactionmaingroup4acc0'] = setop_110_dynamicactionmaingroup4acc0Props,
        codeStates['op_110_dynamicactionsubgroup'] = op_110_dynamicactionsubgroup56a89,
        codeStates['setop_110_dynamicactionsubgroup'] = setop_110_dynamicactionsubgroup56a89,
        codeStates['op_110_dynamicactionsubgroup56a89'] = op_110_dynamicactionsubgroup56a89Props,
        codeStates['setop_110_dynamicactionsubgroup56a89'] = setop_110_dynamicactionsubgroup56a89Props,
        codeStates['op_nf_camt111_tab_header'] = op_nf_camt111_tab_header05ca0,
        codeStates['setop_nf_camt111_tab_header'] = setop_nf_camt111_tab_header05ca0,
        codeStates['op_nf_camt111_tab_header05ca0'] = op_nf_camt111_tab_header05ca0Props,
        codeStates['setop_nf_camt111_tab_header05ca0'] = setop_nf_camt111_tab_header05ca0Props,
        codeStates['op_camt111_simulator_sub_group'] = op_camt111_simulator_sub_group120d6,
        codeStates['setop_camt111_simulator_sub_group'] = setop_camt111_simulator_sub_group120d6,
        codeStates['op_camt111_simulator_sub_group120d6'] = op_camt111_simulator_sub_group120d6Props,
        codeStates['setop_camt111_simulator_sub_group120d6'] = setop_camt111_simulator_sub_group120d6Props,
        codeStates['op_111_dynamicactionmaingroup'] = op_111_dynamicactionmaingroupe4308,
        codeStates['setop_111_dynamicactionmaingroup'] = setop_111_dynamicactionmaingroupe4308,
        codeStates['op_111_dynamicactionmaingroupe4308'] = op_111_dynamicactionmaingroupe4308Props,
        codeStates['setop_111_dynamicactionmaingroupe4308'] = setop_111_dynamicactionmaingroupe4308Props,
        codeStates['op_111_dynamicactionsubgroup'] = op_111_dynamicactionsubgroup73de7,
        codeStates['setop_111_dynamicactionsubgroup'] = setop_111_dynamicactionsubgroup73de7,
        codeStates['op_111_dynamicactionsubgroup73de7'] = op_111_dynamicactionsubgroup73de7Props,
        codeStates['setop_111_dynamicactionsubgroup73de7'] = setop_111_dynamicactionsubgroup73de7Props,
        codeStates['ip_nf_camt055_tab_header'] = ip_nf_camt055_tab_header06c62,
        codeStates['setip_nf_camt055_tab_header'] = setip_nf_camt055_tab_header06c62,
        codeStates['ip_nf_camt055_tab_header06c62'] = ip_nf_camt055_tab_header06c62Props,
        codeStates['setip_nf_camt055_tab_header06c62'] = setip_nf_camt055_tab_header06c62Props,
        codeStates['ip_camt055_simulator_sub_group'] = ip_camt055_simulator_sub_group52216,
        codeStates['setip_camt055_simulator_sub_group'] = setip_camt055_simulator_sub_group52216,
        codeStates['ip_camt055_simulator_sub_group52216'] = ip_camt055_simulator_sub_group52216Props,
        codeStates['setip_camt055_simulator_sub_group52216'] = setip_camt055_simulator_sub_group52216Props,
        codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550,
        codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550,
        codeStates['ip_055_dynamicactionmaingroup84550'] = ip_055_dynamicactionmaingroup84550Props,
        codeStates['setip_055_dynamicactionmaingroup84550'] = setip_055_dynamicactionmaingroup84550Props,
        codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c,
        codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c,
        codeStates['ip_055_dynamicactionsubgroup2ae9c'] = ip_055_dynamicactionsubgroup2ae9cProps,
        codeStates['setip_055_dynamicactionsubgroup2ae9c'] = setip_055_dynamicactionsubgroup2ae9cProps,
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(op_camt110_simulator_sub_group6f9ed?.op_110_request_reason == "" || op_camt110_simulator_sub_group6f9ed?.op_110_request_reason == undefined){
      op_camt110_simulator_sub_group6f9ed.op_110_request_reason = "";
      const validate:any = v.safeParse(schema, op_camt110_simulator_sub_group6f9ed?.op_110_request_reason);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_request_reason:"invalid"}}));
        }
    }else if(op_camt110_simulator_sub_group6f9ed?.op_110_request_reason !== ""){
    const validate:any = v.safeParse(schema, op_camt110_simulator_sub_group6f9ed?.op_110_request_reason);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_request_reason:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,ackSimulator_v1:{...pre?.ackSimulator_v1,op_110_request_reason:undefined}}));
      }
    }
  }
  const op_camt110_simulator_sub_group6f9edRef = useRef<any>(op_camt110_simulator_sub_group6f9ed);
  useEffect(() => { op_camt110_simulator_sub_group6f9edRef.current = op_camt110_simulator_sub_group6f9ed; }, [op_camt110_simulator_sub_group6f9ed]);
    useEffect(()=>{
        if(!op_camt110_simulator_sub_group6f9ed?.op_110_request_reason)
        { 
          setop_camt110_simulator_sub_group6f9edProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "80a7c3e25c8944ca8ec9884bbc36d6fa") {
        handleClick(op_camt110_simulator_sub_group6f9edRef?.current?.op_110_request_reason6d6fa?op_camt110_simulator_sub_group6f9edRef?.current?.op_110_request_reason6d6fa:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "80a7c3e25c8944ca8ec9884bbc36d6fa");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setop_camt110_simulator_sub_group6f9ed((pre:any)=>({...pre,op_110_request_reason:""}))
    else
      setInitialCount(1)
  },[op_110_request_reason6d6fa?.refresh])
  

  if (op_110_request_reason6d6fa?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `44 / 51`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-lg"    
        disabled= {op_110_request_reason6d6fa?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Request Reason
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={op_110_request_reasonOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={op_camt110_simulator_sub_group6f9ed?.op_110_request_reason6d6fa ? [op_camt110_simulator_sub_group6f9ed?.op_110_request_reason6d6fa] : (op_camt110_simulator_sub_group6f9ed?.op_110_request_reason ? dropdownValue : [])}
        validationState={validate?.ackSimulator_v1?.op_110_request_reason ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownop_110_request_reason;
