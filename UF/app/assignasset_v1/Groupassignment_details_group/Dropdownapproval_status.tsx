

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
const Dropdownapproval_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_approvalstatuscombo_v1Props, setdfd_approvalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_textb98b6, setassignment_details_textb98b6}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_date06574, setactual_return_date06574}= useContext(TotalContext) as TotalContextProps;
  const {returned_atb4ccc, setreturned_atb4ccc}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return40b7c, setcondition_at_return40b7c}= useContext(TotalContext) as TotalContextProps;
  const {approved_by8c220, setapproved_by8c220}= useContext(TotalContext) as TotalContextProps;
  const {approval_statuseb2b2, setapproval_statuseb2b2}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notese758f, setassignment_notese758f}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signedfdaee, setacknowledgement_signedfdaee}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [approval_statusOptions, setapproval_statusOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `asset_approval_status`
    let mapperText: string =  `asset_approval_status`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "71dc0557a5ad48bd8bc18a025737f60d",
      "611d031560d14ee3a8ece43e7a1eb2b2"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_approvalstatuscombo_v1Props.dstKey){
      dstKey = dfd_approvalstatuscombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_approvalstatuscombo_v1Props && !dfd_approvalstatuscombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setapproval_statusOptions(temp);
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
  },[approval_statuseb2b2?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setassignment_details_group7f60d((prev: any) => ({ ...prev, approval_status: getMapperDetailsBindValues[value],approval_statuseb2b2: value,APPROVAL_STATUS: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = assignment_details_group7f60d;
      delete temp.approval_status;
      delete temp.APPROVAL_STATUS;
      delete temp.approval_statuseb2b2;
      setassignment_details_group7f60d(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,approval_status:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(assignment_details_group7f60d.approval_status){
      if(Array.isArray(dfd_approvalstatuscombo_v1Props)){
        if(dfd_approvalstatuscombo_v1Props?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)){
          setdropdownValue([dfd_approvalstatuscombo_v1Props?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)?.asset_approval_status])
          tempValue=dfd_approvalstatuscombo_v1Props?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)?.asset_approval_status
        }else{
          setdropdownValue([assignment_details_group7f60d.approval_status])
          tempValue=assignment_details_group7f60d.approval_status
        }
      }else{
        let dstKey:string = dfd_approvalstatuscombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{asset_approval_status:assignment_details_group7f60d.approval_status}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)?.asset_approval_status ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.asset_approval_status === assignment_details_group7f60d.approval_status)?.asset_approval_status
      }else{
        setdropdownValue([assignment_details_group7f60d.approval_status])
        tempValue=assignment_details_group7f60d.approval_status
      }   
      }
    }
    if(approval_statuseb2b2?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setapproval_statuseb2b2((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[assignment_details_group7f60d.approval_status, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_approvalstatuscombo_v1Props) && dfd_approvalstatuscombo_v1Props?.length == 1){
    // setassignment_details_group7f60d((pre:any)=>({...pre,approval_status:dfd_approvalstatuscombo_v1Props[0]?.approval_status}))
    }
  },[dfd_approvalstatuscombo_v1Props])

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
      setassignment_details_group7f60d((prev: any) => ({ ...prev, approval_status: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setassignment_details_group7f60d((prev: any) => ({ ...prev, approval_status: '', approval_statuseb2b2: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,approval_status:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.asset_approval_status==getMapperDetailsBindValues[value] && items?.asset_approval_status==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_approval_status:value,
      asset_approval_status:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['assignment_details_text'] = assignment_details_textb98b6,
        codeStates['setassignment_details_text'] = setassignment_details_textb98b6,
        codeStates['actual_return_date'] = actual_return_date06574,
        codeStates['setactual_return_date'] = setactual_return_date06574,
        codeStates['returned_at'] = returned_atb4ccc,
        codeStates['setreturned_at'] = setreturned_atb4ccc,
        codeStates['condition_at_return'] = condition_at_return40b7c,
        codeStates['setcondition_at_return'] = setcondition_at_return40b7c,
        codeStates['approved_by'] = approved_by8c220,
        codeStates['setapproved_by'] = setapproved_by8c220,
        codeStates['approval_status'] = approval_statuseb2b2,
        codeStates['setapproval_status'] = setapproval_statuseb2b2,
        codeStates['assignment_notes'] = assignment_notese758f,
        codeStates['setassignment_notes'] = setassignment_notese758f,
        codeStates['acknowledgement_signed'] = acknowledgement_signedfdaee,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signedfdaee,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
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
      if(assignment_details_group7f60d?.approval_status == "" || assignment_details_group7f60d?.approval_status == undefined){
      assignment_details_group7f60d.approval_status = "";
      const validate:any = v.safeParse(schema, assignment_details_group7f60d?.approval_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,approval_status:"invalid"}}));
        }
    }else if(assignment_details_group7f60d?.approval_status !== ""){
    const validate:any = v.safeParse(schema, assignment_details_group7f60d?.approval_status);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,approval_status:"invalid"}}));
    }
    }
  }
  const assignment_details_group7f60dRef = useRef<any>(assignment_details_group7f60d);
  useEffect(() => { assignment_details_group7f60dRef.current = assignment_details_group7f60d; }, [assignment_details_group7f60d]);
    useEffect(()=>{
        if(!assignment_details_group7f60d?.approval_status)
        { 
          setassignment_details_group7f60dProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "611d031560d14ee3a8ece43e7a1eb2b2") {
        handleClick(assignment_details_group7f60dRef?.current?.approval_statuseb2b2?assignment_details_group7f60dRef?.current?.approval_statuseb2b2:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "611d031560d14ee3a8ece43e7a1eb2b2");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setassignment_details_group7f60d((pre:any)=>({...pre,approval_status:""}))
    else
      setInitialCount(1)
  },[approval_statuseb2b2?.refresh])

  if (approval_statuseb2b2?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `24 / 38`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {approval_statuseb2b2?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Approval Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={approval_statusOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={assignment_details_group7f60d?.approval_statuseb2b2 ? [assignment_details_group7f60d?.approval_statuseb2b2] : (assignment_details_group7f60d?.approval_status ? dropdownValue : [])}
        validationState={validate?.assignAsset_v1?.approval_status ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownapproval_status;
