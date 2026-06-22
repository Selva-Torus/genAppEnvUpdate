

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
const Dropdownasset_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assettypecombo_v1Props, setdfd_assettypecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {basic_infot_asset_text4d8c8, setbasic_infot_asset_text4d8c8}= useContext(TotalContext) as TotalContextProps;
  const {category_name3613b, setcategory_name3613b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type91879, setasset_type91879}= useContext(TotalContext) as TotalContextProps;
  const {asset_namea35ee, setasset_namea35ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_tagcb5cb, setasset_tagcb5cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeaa68d, setasset_codeaa68d}= useContext(TotalContext) as TotalContextProps;
  const {serial_numbera45cf, setserial_numbera45cf}= useContext(TotalContext) as TotalContextProps;
  const {model_number32271, setmodel_number32271}= useContext(TotalContext) as TotalContextProps;
  const {manufacturerb8d3f, setmanufacturerb8d3f}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [asset_typeOptions, setasset_typeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `asset_type`
    let mapperText: string =  `asset_type`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "660280a194cb44e488d6a1381cedeeeb",
      "81d5fc6fc21b40d280bdbb8e68f91879"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_assettypecombo_v1Props.dstKey){
      dstKey = dfd_assettypecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_assettypecombo_v1Props && !dfd_assettypecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setasset_typeOptions(temp);
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
  },[asset_type91879?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setasset_info_groupdeeeb((prev: any) => ({ ...prev, asset_type: getMapperDetailsBindValues[value],asset_type91879: value,ASSET_TYPE: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = asset_info_groupdeeeb;
      delete temp.asset_type;
      delete temp.ASSET_TYPE;
      delete temp.asset_type91879;
      setasset_info_groupdeeeb(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,asset_type:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(asset_info_groupdeeeb.asset_type){
      if(Array.isArray(dfd_assettypecombo_v1Props)){
        if(dfd_assettypecombo_v1Props?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)){
          setdropdownValue([dfd_assettypecombo_v1Props?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)?.asset_type])
          tempValue=dfd_assettypecombo_v1Props?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)?.asset_type
        }else{
          setdropdownValue([asset_info_groupdeeeb.asset_type])
          tempValue=asset_info_groupdeeeb.asset_type
        }
      }else{
        let dstKey:string = dfd_assettypecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{asset_type:asset_info_groupdeeeb.asset_type}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)?.asset_type ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.asset_type === asset_info_groupdeeeb.asset_type)?.asset_type
      }else{
        setdropdownValue([asset_info_groupdeeeb.asset_type])
        tempValue=asset_info_groupdeeeb.asset_type
      }   
      }
    }
    if(asset_type91879?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setasset_type91879((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[asset_info_groupdeeeb.asset_type, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_assettypecombo_v1Props) && dfd_assettypecombo_v1Props?.length == 1){
    // setasset_info_groupdeeeb((pre:any)=>({...pre,asset_type:dfd_assettypecombo_v1Props[0]?.asset_type}))
    }
  },[dfd_assettypecombo_v1Props])

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
      setasset_info_groupdeeeb((prev: any) => ({ ...prev, asset_type: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setasset_info_groupdeeeb((prev: any) => ({ ...prev, asset_type: '', asset_type91879: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,asset_type:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.asset_type==getMapperDetailsBindValues[value] && items?.asset_type==value)) || {}
    selected.current={
      ...selectedObj||{},
      asset_type:value,
      asset_type:getMapperDetailsBindValues[value]
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
        codeStates['basic_infot_asset_text'] = basic_infot_asset_text4d8c8,
        codeStates['setbasic_infot_asset_text'] = setbasic_infot_asset_text4d8c8,
        codeStates['category_name'] = category_name3613b,
        codeStates['setcategory_name'] = setcategory_name3613b,
        codeStates['asset_type'] = asset_type91879,
        codeStates['setasset_type'] = setasset_type91879,
        codeStates['asset_name'] = asset_namea35ee,
        codeStates['setasset_name'] = setasset_namea35ee,
        codeStates['asset_tag'] = asset_tagcb5cb,
        codeStates['setasset_tag'] = setasset_tagcb5cb,
        codeStates['asset_code'] = asset_codeaa68d,
        codeStates['setasset_code'] = setasset_codeaa68d,
        codeStates['serial_number'] = serial_numbera45cf,
        codeStates['setserial_number'] = setserial_numbera45cf,
        codeStates['model_number'] = model_number32271,
        codeStates['setmodel_number'] = setmodel_number32271,
        codeStates['manufacturer'] = manufacturerb8d3f,
        codeStates['setmanufacturer'] = setmanufacturerb8d3f,
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
      if(asset_info_groupdeeeb?.asset_type == "" || asset_info_groupdeeeb?.asset_type == undefined){
      asset_info_groupdeeeb.asset_type = "";
      const validate:any = v.safeParse(schema, asset_info_groupdeeeb?.asset_type);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,asset_type:"invalid"}}));
        }
    }else if(asset_info_groupdeeeb?.asset_type !== ""){
    const validate:any = v.safeParse(schema, asset_info_groupdeeeb?.asset_type);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,asset_type:"invalid"}}));
    }
    }
  }
  const asset_info_groupdeeebRef = useRef<any>(asset_info_groupdeeeb);
  useEffect(() => { asset_info_groupdeeebRef.current = asset_info_groupdeeeb; }, [asset_info_groupdeeeb]);
    useEffect(()=>{
        if(!asset_info_groupdeeeb?.asset_type)
        { 
          setasset_info_groupdeeebProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "81d5fc6fc21b40d280bdbb8e68f91879") {
        handleClick(asset_info_groupdeeebRef?.current?.asset_type91879?asset_info_groupdeeebRef?.current?.asset_type91879:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "81d5fc6fc21b40d280bdbb8e68f91879");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setasset_info_groupdeeeb((pre:any)=>({...pre,asset_type:""}))
    else
      setInitialCount(1)
  },[asset_type91879?.refresh])

  if (asset_type91879?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {asset_type91879?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Asset Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={asset_typeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={asset_info_groupdeeeb?.asset_type91879 ? [asset_info_groupdeeeb?.asset_type91879] : (asset_info_groupdeeeb?.asset_type ? dropdownValue : [])}
        validationState={validate?.newAsset_v1?.asset_type ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdownasset_type;
