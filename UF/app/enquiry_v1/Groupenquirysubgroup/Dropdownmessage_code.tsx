

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
const Dropdownmessage_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_enquirymessagetypecombo_v1Props, setdfd_enquirymessagetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {enquirymaingroup8a315, setenquirymaingroup8a315}= useContext(TotalContext) as TotalContextProps;
  const {enquirymaingroup8a315Props, setenquirymaingroup8a315Props}= useContext(TotalContext) as TotalContextProps;
  const {enquirysubgroup4c021, setenquirysubgroup4c021}= useContext(TotalContext) as TotalContextProps;
  const {enquirysubgroup4c021Props, setenquirysubgroup4c021Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_type7038c, setpayment_type7038c}= useContext(TotalContext) as TotalContextProps;
  const {message_code7cd22, setmessage_code7cd22}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13e5e, setdynamicactions13e5e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13e5eProps, setdynamicactions13e5eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [message_codeOptions, setmessage_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `message_type`
    let mapperText: string =  `message_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "176a7014b5994b33a3a24c3d7c74c021",
      "b81fde1fa0454dea8c783e549117cd22"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_enquirymessagetypecombo_v1Props.dstKey){
      dstKey = dfd_enquirymessagetypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_enquirymessagetypecombo_v1Props && !dfd_enquirymessagetypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setmessage_codeOptions(temp);
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
  },[message_code7cd22?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setenquirysubgroup4c021((prev: any) => ({ ...prev,message_code7cd22: value }))
      setIsRequredData(false)
    }else{
      let temp:any = enquirysubgroup4c021;
      delete temp.message_code;
      delete temp.MESSAGE_CODE;
      delete temp.message_code7cd22;
      setenquirysubgroup4c021(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,Enquiry_v1:{...pre?.Enquiry_v1,message_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(enquirysubgroup4c021.message_code){
      if(Array.isArray(dfd_enquirymessagetypecombo_v1Props)){
        if(dfd_enquirymessagetypecombo_v1Props?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)){
          setdropdownValue([dfd_enquirymessagetypecombo_v1Props?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)?.message_type])
          tempValue=dfd_enquirymessagetypecombo_v1Props?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)?.message_type
        }else{
          setdropdownValue([enquirysubgroup4c021.message_code])
          tempValue=enquirysubgroup4c021.message_code
        }
      }else{
        let dstKey:string = dfd_enquirymessagetypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{message_type:enquirysubgroup4c021.message_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)?.message_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.message_type === enquirysubgroup4c021.message_code)?.message_type
      }else{
        setdropdownValue([enquirysubgroup4c021.message_code])
        tempValue=enquirysubgroup4c021.message_code
      }   
      }
    }
    if(message_code7cd22?.trigger == true)
    {
      await handlechange(tempValue)
      setmessage_code7cd22((pre:any)=>({...pre,trigger:false}))
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
  },[enquirysubgroup4c021.message_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_enquirymessagetypecombo_v1Props) && dfd_enquirymessagetypecombo_v1Props?.length == 1){
    // setenquirysubgroup4c021((pre:any)=>({...pre,message_code:dfd_enquirymessagetypecombo_v1Props[0]?.message_code}))
    }
  },[dfd_enquirymessagetypecombo_v1Props])

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
      setenquirysubgroup4c021((prev: any) => ({ ...prev, message_code: getMapperDetailsBindValues[value],MESSAGE_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setenquirysubgroup4c021((prev: any) => ({ ...prev, message_code: '', message_code7cd22: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,Enquiry_v1:{...pre?.Enquiry_v1,message_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.message_type==getMapperDetailsBindValues[value] && items?.message_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      message_type:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['enquirymaingroup'] = enquirymaingroup8a315,
        codeStates['setenquirymaingroup'] = setenquirymaingroup8a315,
        codeStates['enquirymaingroup8a315'] = enquirymaingroup8a315Props,
        codeStates['setenquirymaingroup8a315'] = setenquirymaingroup8a315Props,
        codeStates['enquirysubgroup'] = enquirysubgroup4c021,
        codeStates['setenquirysubgroup'] = setenquirysubgroup4c021,
        codeStates['enquirysubgroup4c021'] = enquirysubgroup4c021Props,
        codeStates['setenquirysubgroup4c021'] = setenquirysubgroup4c021Props,
        codeStates['payment_type'] = payment_type7038c,
        codeStates['setpayment_type'] = setpayment_type7038c,
        codeStates['message_code'] = message_code7cd22,
        codeStates['setmessage_code'] = setmessage_code7cd22,
        codeStates['dynamicactions'] = dynamicactions13e5e,
        codeStates['setdynamicactions'] = setdynamicactions13e5e,
        codeStates['dynamicactions13e5e'] = dynamicactions13e5eProps,
        codeStates['setdynamicactions13e5e'] = setdynamicactions13e5eProps,
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
  const enquirysubgroup4c021Ref = useRef<any>(enquirysubgroup4c021);
  useEffect(() => { enquirysubgroup4c021Ref.current = enquirysubgroup4c021; }, [enquirysubgroup4c021]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "b81fde1fa0454dea8c783e549117cd22") {
        handleClick(enquirysubgroup4c021Ref?.current?.message_code7cd22?enquirysubgroup4c021Ref?.current?.message_code7cd22:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "b81fde1fa0454dea8c783e549117cd22");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setenquirysubgroup4c021((pre:any)=>({...pre,message_code:""}))
    else
      setInitialCount(1)
  },[message_code7cd22?.refresh])
  

  if (message_code7cd22?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 25`,
        gridRow: `26 / 42`,
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
            Message Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={message_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={enquirysubgroup4c021?.message_code7cd22 ? [enquirysubgroup4c021?.message_code7cd22] : (enquirysubgroup4c021?.message_code ? dropdownValue : [])}
        validationState={validate?.Enquiry_v1?.message_code ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownmessage_code;
