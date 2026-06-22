

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
const Dropdowncategory_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycombo_v1Props, setdfd_assetcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [category_nameOptions, setcategory_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `category_name`
    let mapperText: string =  `category_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "660280a194cb44e488d6a1381cedeeeb",
      "51f342db21a34e5c9ac527f883b3613b"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_assetcategorycombo_v1Props.dstKey){
      dstKey = dfd_assetcategorycombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_assetcategorycombo_v1Props && !dfd_assetcategorycombo_v1Props.hasLogicCenter && !dfdFlag) {
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
      setcategory_nameOptions(temp);
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
  },[category_name3613b?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setasset_info_groupdeeeb((prev: any) => ({ ...prev, category_name: getMapperDetailsBindValues[value],category_name3613b: value,CATEGORY_NAME: getMapperDetails }))
      setIsRequredData(false)
    }else{
      let temp:any = asset_info_groupdeeeb;
      delete temp.category_name;
      delete temp.CATEGORY_NAME;
      delete temp.category_name3613b;
      setasset_info_groupdeeeb(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,category_name:undefined}}));
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(asset_info_groupdeeeb.category_name){
      if(Array.isArray(dfd_assetcategorycombo_v1Props)){
        if(dfd_assetcategorycombo_v1Props?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)){
          setdropdownValue([dfd_assetcategorycombo_v1Props?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)?.category_name])
          tempValue=dfd_assetcategorycombo_v1Props?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)?.category_name
        }else{
          setdropdownValue([asset_info_groupdeeeb.category_name])
          tempValue=asset_info_groupdeeeb.category_name
        }
      }else{
        let dstKey:string = dfd_assetcategorycombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{category_name:asset_info_groupdeeeb.category_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)?.category_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.category_name === asset_info_groupdeeeb.category_name)?.category_name
      }else{
        setdropdownValue([asset_info_groupdeeeb.category_name])
        tempValue=asset_info_groupdeeeb.category_name
      }   
      }
    }
    if(category_name3613b?.trigger!=null)
    {
      handleClick(tempValue)
    }
    else{
      setcategory_name3613b((pre:any)=>({...pre,trigger:null}))
    }
  }

  useEffect(() => {
    if (!isDropdownDataReady) return;
    if (isUserSelectionRef.current) {
      isUserSelectionRef.current = false;
      return;
    }
    fetchDropdownData();
  },[asset_info_groupdeeeb.category_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_assetcategorycombo_v1Props) && dfd_assetcategorycombo_v1Props?.length == 1){
    // setasset_info_groupdeeeb((pre:any)=>({...pre,category_name:dfd_assetcategorycombo_v1Props[0]?.category_name}))
    }
  },[dfd_assetcategorycombo_v1Props])

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
      setasset_info_groupdeeeb((prev: any) => ({ ...prev, category_name: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       setasset_info_groupdeeeb((prev: any) => ({ ...prev, category_name: '', category_name3613b: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,category_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.category_name==getMapperDetailsBindValues[value] && items?.category_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      category_name:value,
      category_name:getMapperDetailsBindValues[value]
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
      if(asset_info_groupdeeeb?.category_name == "" || asset_info_groupdeeeb?.category_name == undefined){
      asset_info_groupdeeeb.category_name = "";
      const validate:any = v.safeParse(schema, asset_info_groupdeeeb?.category_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,category_name:"invalid"}}));
        }
    }else if(asset_info_groupdeeeb?.category_name !== ""){
    const validate:any = v.safeParse(schema, asset_info_groupdeeeb?.category_name);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,category_name:"invalid"}}));
    }
    }
  }
  const asset_info_groupdeeebRef = useRef<any>(asset_info_groupdeeeb);
  useEffect(() => { asset_info_groupdeeebRef.current = asset_info_groupdeeeb; }, [asset_info_groupdeeeb]);
    useEffect(()=>{
        if(!asset_info_groupdeeeb?.category_name)
        { 
          setasset_info_groupdeeebProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "51f342db21a34e5c9ac527f883b3613b") {
        handleClick(asset_info_groupdeeebRef?.current?.category_name3613b?asset_info_groupdeeebRef?.current?.category_name3613b:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "51f342db21a34e5c9ac527f883b3613b");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setasset_info_groupdeeeb((pre:any)=>({...pre,category_name:""}))
    else
      setInitialCount(1)
  },[category_name3613b?.refresh])

  if (category_name3613b?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!rounded-md"    
        disabled= {category_name3613b?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Asset Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        static={true}
        staticProps={category_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={asset_info_groupdeeeb?.category_name3613b ? [asset_info_groupdeeeb?.category_name3613b] : (asset_info_groupdeeeb?.category_name ? dropdownValue : [])}
        validationState={validate?.newAsset_v1?.category_name ? "invalid" : undefined}
        errorMessage={error}
        />
    </div>
  );
};

export default Dropdowncategory_name;
