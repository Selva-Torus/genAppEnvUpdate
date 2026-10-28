

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
const Dropdownclaim_category = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {emailad8a5, setemailad8a5}= useContext(TotalContext) as TotalContextProps;
  const {from_datee96b6, setfrom_datee96b6}= useContext(TotalContext) as TotalContextProps;
  const {to_dateaf8c4, setto_dateaf8c4}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryb2e83, setclaim_categoryb2e83}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [claim_categoryOptions, setclaim_categoryOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `cdcategory`
    let mapperText: string =  `cdcategory`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "4d39522ee30443598090fe9ac0c429cb",
      "ee1b1a7777b34405af075e3c910b2e83"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_code_description_v1Props.dstKey){
      dstKey = dfd_code_description_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_code_description_v1Props && !dfd_code_description_v1Props.hasLogicCenter && !dfdFlag) {
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
      setclaim_categoryOptions(temp);
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
  },[claim_categoryb2e83?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setrequest_offsite_group429cb((prev: any) => ({ ...prev,claim_categoryb2e83: value }))
      setIsRequredData(false)
    }else{
      let temp:any = request_offsite_group429cb;
      delete temp.claim_category;
      delete temp.CLAIM_CATEGORY;
      delete temp.claim_categoryb2e83;
      setrequest_offsite_group429cb(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,Request_Screen_Offsite_v1:{...pre?.Request_Screen_Offsite_v1,claim_category:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(request_offsite_group429cb.claim_category){
      if(Array.isArray(dfd_code_description_v1Props)){
        if(dfd_code_description_v1Props?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)){
          setdropdownValue([dfd_code_description_v1Props?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)?.cdcategory])
          tempValue=dfd_code_description_v1Props?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)?.cdcategory
        }else{
          setdropdownValue([request_offsite_group429cb.claim_category])
          tempValue=request_offsite_group429cb.claim_category
        }
      }else{
        let dstKey:string = dfd_code_description_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{cdcategory:request_offsite_group429cb.claim_category}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)?.cdcategory ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.cdcategory === request_offsite_group429cb.claim_category)?.cdcategory
      }else{
        setdropdownValue([request_offsite_group429cb.claim_category])
        tempValue=request_offsite_group429cb.claim_category
      }   
      }
    }
    if(claim_categoryb2e83?.trigger == true)
    {
      await handlechange(tempValue)
      setclaim_categoryb2e83((pre:any)=>({...pre,trigger:false}))
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
  },[request_offsite_group429cb.claim_category, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_code_description_v1Props) && dfd_code_description_v1Props?.length == 1){
    // setrequest_offsite_group429cb((pre:any)=>({...pre,claim_category:dfd_code_description_v1Props[0]?.claim_category}))
    }
  },[dfd_code_description_v1Props])

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
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, claim_category: getMapperDetailsBindValues[value],CLAIM_CATEGORY: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setrequest_offsite_group429cb((prev: any) => ({ ...prev, claim_category: '', claim_categoryb2e83: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,Request_Screen_Offsite_v1:{...pre?.Request_Screen_Offsite_v1,claim_category:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.cdcategory==getMapperDetailsBindValues[value] && items?.cdcategory==value)) || {}
    selected.current={
      ...selectedObj||{},
      cdcategory:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
        codeStates['offsite_expense'] = offsite_expense39c39,
        codeStates['setoffsite_expense'] = setoffsite_expense39c39,
        codeStates['claim_expense_type'] = claim_expense_type51f6e,
        codeStates['setclaim_expense_type'] = setclaim_expense_type51f6e,
        codeStates['expense_name'] = expense_namebf755,
        codeStates['setexpense_name'] = setexpense_namebf755,
        codeStates['email'] = emailad8a5,
        codeStates['setemail'] = setemailad8a5,
        codeStates['from_date'] = from_datee96b6,
        codeStates['setfrom_date'] = setfrom_datee96b6,
        codeStates['to_date'] = to_dateaf8c4,
        codeStates['setto_date'] = setto_dateaf8c4,
        codeStates['claim_category'] = claim_categoryb2e83,
        codeStates['setclaim_category'] = setclaim_categoryb2e83,
        codeStates['category_total_amount'] = category_total_amounte603b,
        codeStates['setcategory_total_amount'] = setcategory_total_amounte603b,
        codeStates['attachment'] = attachmentc9c51,
        codeStates['setattachment'] = setattachmentc9c51,
        codeStates['receipt_image'] = receipt_imageafe30,
        codeStates['setreceipt_image'] = setreceipt_imageafe30,
        codeStates['enable'] = enableeff29,
        codeStates['setenable'] = setenableeff29,
        codeStates['comments'] = comments65b18,
        codeStates['setcomments'] = setcomments65b18,
        codeStates['is_comment_enabled'] = is_comment_enabled5ca5f,
        codeStates['setis_comment_enabled'] = setis_comment_enabled5ca5f,
        codeStates['clear'] = clear2b3e6,
        codeStates['setclear'] = setclear2b3e6,
        codeStates['add'] = add5cae4,
        codeStates['setadd'] = setadd5cae4,
        codeStates['claimsdetailtable'] = claimsdetailtablef8143,
        codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
        codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
        codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,
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
  const request_offsite_group429cbRef = useRef<any>(request_offsite_group429cb);
  useEffect(() => { request_offsite_group429cbRef.current = request_offsite_group429cb; }, [request_offsite_group429cb]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "ee1b1a7777b34405af075e3c910b2e83") {
        handleClick(request_offsite_group429cbRef?.current?.claim_categoryb2e83?request_offsite_group429cbRef?.current?.claim_categoryb2e83:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "ee1b1a7777b34405af075e3c910b2e83");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrequest_offsite_group429cb((pre:any)=>({...pre,claim_category:""}))
    else
      setInitialCount(1)
  },[claim_categoryb2e83?.refresh])
  

  if (claim_categoryb2e83?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `5 / 20`,
        gridRow: `89 / 109`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className=""    
        disabled= {claim_categoryb2e83?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={claim_categoryOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={request_offsite_group429cb?.claim_categoryb2e83 ? [request_offsite_group429cb?.claim_categoryb2e83] : (request_offsite_group429cb?.claim_category ? dropdownValue : [])}
        validationState={validate?.Request_Screen_Offsite_v1?.claim_category ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownclaim_category;
