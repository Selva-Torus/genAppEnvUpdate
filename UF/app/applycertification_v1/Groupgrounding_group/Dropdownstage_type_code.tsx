

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
const Dropdownstage_type_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatestagecombo_v1Props, setdfd_applycertificatestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901, setgrounding_text80901}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text4e90a, setcert_code_text4e90a}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_text88aa1, setcert_temp_text88aa1}= useContext(TotalContext) as TotalContextProps;
  const {text_current_stage_seqf99a6, settext_current_stage_seqf99a6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code601b0, setcert_code601b0}= useContext(TotalContext) as TotalContextProps;
  const {template_namee23cf, settemplate_namee23cf}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code3cbb6, setstage_type_code3cbb6}= useContext(TotalContext) as TotalContextProps;
  const {text_status5e33f, settext_status5e33f}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code047b5, setcert_status_code047b5}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationbdc1e, setis_recertificationbdc1e}= useContext(TotalContext) as TotalContextProps;
  const {is_actived0a4e, setis_actived0a4e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [stage_type_codeOptions, setstage_type_codeOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `stage_type_code`
    let mapperText: string =  `cert_template_id`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    //getSourceValue
    code = grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"].toUpperCase()];
    getSourceFilterColumn = "cert_template_id";
    searchFilterData[getSourceFilterColumn] = code;
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "c69fba169af09340a1ee1388b0464d9d",
      "cccd876587814e019c95f32f44a3cbb6"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_applycertificatestagecombo_v1Props.dstKey){
      dstKey = dfd_applycertificatestagecombo_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_applycertificatestagecombo_v1Props && !dfd_applycertificatestagecombo_v1Props.hasLogicCenter && !dfdFlag) {
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
    //getFormData
    if(!grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]] && Array.isArray(grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]])){
      setstage_type_codeOptions([]);
      let temp : any = grounding_group64d9d;
      delete temp.stage_type_code
      setgrounding_group64d9d(temp)
    }
    if(!value && grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]]){
      let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
      temp = temp.filter((ele:any)=>ele)
      setstage_type_codeOptions(temp);
      if (dfData.length < PAGE_SIZE) setHasMore(false);
    }
    if(!value && !grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]]){
      let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
      temp = temp.filter((ele:any)=>ele)
      setstage_type_codeOptions([]);
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
      //getFormData
      if(Array.isArray(grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]])){
        grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]] = undefined;
      }
      if (!grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"]]) {
        let temp: any = grounding_group64d9d
        delete temp.stage_type_code
        setgrounding_group64d9d(temp)
      }
    setCurrentPage(currentPage);
    setHasMore(true);
    setIsDropdownDataReady(false);
    await getDropdownData(undefined, currentPage).then(() => {
      setIsDropdownDataReady(true);
    });
    };
  fetchGetDropdownData();
  },[stage_type_code3cbb6?.refresh,grounding_group64d9d[UOmapperData["641392fa77e44023a539fd75560e23cf"]["source"].toUpperCase()]])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgrounding_group64d9d((prev: any) => ({ ...prev,stage_type_code3cbb6: value }))
      setIsRequredData(false)
    }else{
      let temp:any = grounding_group64d9d;
      delete temp.stage_type_code;
      delete temp.STAGE_TYPE_CODE;
      delete temp.stage_type_code3cbb6;
      setgrounding_group64d9d(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,applyCertification_v1:{...pre?.applyCertification_v1,stage_type_code:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(grounding_group64d9d.stage_type_code){
      if(Array.isArray(dfd_applycertificatestagecombo_v1Props)){
        if(dfd_applycertificatestagecombo_v1Props?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)){
          setdropdownValue([dfd_applycertificatestagecombo_v1Props?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)?.stage_type_code])
          tempValue=dfd_applycertificatestagecombo_v1Props?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)?.stage_type_code
        }else{
          setdropdownValue([grounding_group64d9d.stage_type_code])
          tempValue=grounding_group64d9d.stage_type_code
        }
      }else{
        let dstKey:string = dfd_applycertificatestagecombo_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{cert_template_id:grounding_group64d9d.stage_type_code}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)?.stage_type_code ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.cert_template_id === grounding_group64d9d.stage_type_code)?.stage_type_code
      }else{
        setdropdownValue([grounding_group64d9d.stage_type_code])
        tempValue=grounding_group64d9d.stage_type_code
      }   
      }
    }
    if(stage_type_code3cbb6?.trigger == true)
    {
      await handlechange(tempValue)
      setstage_type_code3cbb6((pre:any)=>({...pre,trigger:false}))
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
  },[grounding_group64d9d.stage_type_code, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_applycertificatestagecombo_v1Props) && dfd_applycertificatestagecombo_v1Props?.length == 1){
    // setgrounding_group64d9d((pre:any)=>({...pre,stage_type_code:dfd_applycertificatestagecombo_v1Props[0]?.stage_type_code}))
    }
  },[dfd_applycertificatestagecombo_v1Props])

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
      setgrounding_group64d9d((prev: any) => ({ ...prev, stage_type_code: getMapperDetailsBindValues[value],STAGE_TYPE_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgrounding_group64d9d((prev: any) => ({ ...prev, stage_type_code: '', stage_type_code3cbb6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,applyCertification_v1:{...pre?.applyCertification_v1,stage_type_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.cert_template_id==getMapperDetailsBindValues[value] && items?.stage_type_code==value)) || {}
    selected.current={
      ...selectedObj||{},
      stage_type_code:value,
      cert_template_id:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
        codeStates['grounding_text'] = grounding_text80901,
        codeStates['setgrounding_text'] = setgrounding_text80901,
        codeStates['cert_code_text'] = cert_code_text4e90a,
        codeStates['setcert_code_text'] = setcert_code_text4e90a,
        codeStates['cert_temp_text'] = cert_temp_text88aa1,
        codeStates['setcert_temp_text'] = setcert_temp_text88aa1,
        codeStates['text_current_stage_seq'] = text_current_stage_seqf99a6,
        codeStates['settext_current_stage_seq'] = settext_current_stage_seqf99a6,
        codeStates['cert_code'] = cert_code601b0,
        codeStates['setcert_code'] = setcert_code601b0,
        codeStates['template_name'] = template_namee23cf,
        codeStates['settemplate_name'] = settemplate_namee23cf,
        codeStates['stage_type_code'] = stage_type_code3cbb6,
        codeStates['setstage_type_code'] = setstage_type_code3cbb6,
        codeStates['text_status'] = text_status5e33f,
        codeStates['settext_status'] = settext_status5e33f,
        codeStates['cert_status_code'] = cert_status_code047b5,
        codeStates['setcert_status_code'] = setcert_status_code047b5,
        codeStates['is_recertification'] = is_recertificationbdc1e,
        codeStates['setis_recertification'] = setis_recertificationbdc1e,
        codeStates['is_active'] = is_actived0a4e,
        codeStates['setis_active'] = setis_actived0a4e,
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
   
  async function handleConfirmonClick(){
  } 
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const grounding_group64d9dRef = useRef<any>(grounding_group64d9d);
  useEffect(() => { grounding_group64d9dRef.current = grounding_group64d9d; }, [grounding_group64d9d]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "cccd876587814e019c95f32f44a3cbb6") {
        handleClick(grounding_group64d9dRef?.current?.stage_type_code3cbb6?grounding_group64d9dRef?.current?.stage_type_code3cbb6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "cccd876587814e019c95f32f44a3cbb6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgrounding_group64d9d((pre:any)=>({...pre,stage_type_code:""}))
    else
      setInitialCount(1)
  },[stage_type_code3cbb6?.refresh])
  

  if (stage_type_code3cbb6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `14 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!border-[1px]"    
        disabled= {stage_type_code3cbb6?.isDisabled ? true : false}
        contentAlign={"center"}
        static={true}
        staticProps={stage_type_codeOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={grounding_group64d9d?.stage_type_code3cbb6 ? [grounding_group64d9d?.stage_type_code3cbb6] : (grounding_group64d9d?.stage_type_code ? dropdownValue : [])}
        validationState={validate?.applyCertification_v1?.stage_type_code ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdownstage_type_code;
