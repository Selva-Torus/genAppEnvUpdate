

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
const Dropdownack_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_revocationackstatuscombo_v1Props, setdfd_revocationackstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_textbd096, setlifecycle_textbd096}= useContext(TotalContext) as TotalContextProps;
  const {datepickerf70e5, setdatepickerf70e5}= useContext(TotalContext) as TotalContextProps;
  const {ack_status0e020, setack_status0e020}= useContext(TotalContext) as TotalContextProps;
  const {detailefde3, setdetailefde3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [ack_statusOptions, setack_statusOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `code`
    let mapperText: string =  `code`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "48fde300650b0ffaf9ee4f1bb1ce5642",
      "8ca412fcc52e4bf0bed9606a7630e020"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_revocationackstatuscombo_v1Props.dstKey){
      dstKey = dfd_revocationackstatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_revocationackstatuscombo_v1Props && !dfd_revocationackstatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setack_statusOptions(temp);
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
  },[ack_status0e020?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrisk_conf_groupe5642((prev: any) => ({ ...prev,ack_status0e020: value }))
      setIsRequredData(false)
    }else{
      let temp:any = risk_conf_groupe5642;
      delete temp.ack_status;
      delete temp.ACK_STATUS;
      delete temp.ack_status0e020;
      setrisk_conf_groupe5642(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,ack_status:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(risk_conf_groupe5642.ack_status){
      if(Array.isArray(dfd_revocationackstatuscombo_v1Props)){
        if(dfd_revocationackstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)){
          setdropdownValue([dfd_revocationackstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)?.code])
          tempValue=dfd_revocationackstatuscombo_v1Props?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)?.code
        }else{
          setdropdownValue([risk_conf_groupe5642.ack_status])
          tempValue=risk_conf_groupe5642.ack_status
        }
      }else{
        let dstKey:string = dfd_revocationackstatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{code:risk_conf_groupe5642.ack_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)?.code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.code === risk_conf_groupe5642.ack_status)?.code
      }else{
        setdropdownValue([risk_conf_groupe5642.ack_status])
        tempValue=risk_conf_groupe5642.ack_status
      }   
      }
    }
    if(ack_status0e020?.trigger == true)
    {
      await handlechange(tempValue)
      setack_status0e020((pre:any)=>({...pre,trigger:false}))
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
  },[risk_conf_groupe5642.ack_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_revocationackstatuscombo_v1Props) && dfd_revocationackstatuscombo_v1Props?.length == 1){
    // setrisk_conf_groupe5642((pre:any)=>({...pre,ack_status:dfd_revocationackstatuscombo_v1Props[0]?.ack_status}))
    }
  },[dfd_revocationackstatuscombo_v1Props])

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
      setrisk_conf_groupe5642((prev: any) => ({ ...prev, ack_status: getMapperDetailsBindValues[value],ACK_STATUS: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrisk_conf_groupe5642((prev: any) => ({ ...prev, ack_status: '', ack_status0e020: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,ack_status:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['lifecycle_text'] = lifecycle_textbd096,
        codeStates['setlifecycle_text'] = setlifecycle_textbd096,
        codeStates['datepicker'] = datepickerf70e5,
        codeStates['setdatepicker'] = setdatepickerf70e5,
        codeStates['ack_status'] = ack_status0e020,
        codeStates['setack_status'] = setack_status0e020,
        codeStates['detail'] = detailefde3,
        codeStates['setdetail'] = setdetailefde3,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
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
    if(risk_conf_groupe5642?.ack_status == "" || risk_conf_groupe5642?.ack_status == undefined){
      risk_conf_groupe5642.ack_status = "";
      const validate:any = v.safeParse(schema, risk_conf_groupe5642?.ack_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,ack_status:"invalid"}}));
        }
    }else if(risk_conf_groupe5642?.ack_status !== ""){
    const validate:any = v.safeParse(schema, risk_conf_groupe5642?.ack_status);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,ack_status:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,ack_status:undefined}}));
      }
    }
  }
  const risk_conf_groupe5642Ref = useRef<any>(risk_conf_groupe5642);
  useEffect(() => { risk_conf_groupe5642Ref.current = risk_conf_groupe5642; }, [risk_conf_groupe5642]);
    useEffect(()=>{
        if(!risk_conf_groupe5642?.ack_status)
        { 
          setrisk_conf_groupe5642Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "8ca412fcc52e4bf0bed9606a7630e020") {
        handleClick(risk_conf_groupe5642Ref?.current?.ack_status0e020?risk_conf_groupe5642Ref?.current?.ack_status0e020:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "8ca412fcc52e4bf0bed9606a7630e020");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrisk_conf_groupe5642((pre:any)=>({...pre,ack_status:""}))
    else
      setInitialCount(1)
  },[ack_status0e020?.refresh])
  

  if (ack_status0e020?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {ack_status0e020?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Acknowledgement Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={ack_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={risk_conf_groupe5642?.ack_status0e020 ? [risk_conf_groupe5642?.ack_status0e020] : (risk_conf_groupe5642?.ack_status ? dropdownValue : [])}
        validationState={validate?.addRevocationReceipt_v1?.ack_status ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownack_status;
