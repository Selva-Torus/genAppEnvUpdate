

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
const Dropdowntemplate_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatetempname_v1Props, setdfd_applycertificatetempname_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_textde33a, setgrounding_textde33a}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date2f0e9, settext_effective_date2f0e9}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_1e9a79, settext_effective_date_1e9a79}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_283f74, settext_effective_date_283f74}= useContext(TotalContext) as TotalContextProps;
  const {effective_date585df, seteffective_date585df}= useContext(TotalContext) as TotalContextProps;
  const {expiry_dated0967, setexpiry_dated0967}= useContext(TotalContext) as TotalContextProps;
  const {completed_on67679, setcompleted_on67679}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_textea047, setcert_temp_textea047}= useContext(TotalContext) as TotalContextProps;
  const {template_name5834f, settemplate_name5834f}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationa8241, setis_recertificationa8241}= useContext(TotalContext) as TotalContextProps;
  const {is_active72c74, setis_active72c74}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [template_nameOptions, settemplate_nameOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any;
  let getSourceFilterColumn:string = "";
  let copySourceFilterColumn:string = "";
  category = "";

  const getDropdownData = async(value?:any, page: number = 1, skipAutoSet: boolean = false)=>{
    let mapperValue: string =  `template_name`
    let mapperText: string =  `template_name`
    bindtranValue = value;
    let searchFilterData: Record<string, any> ={};
    //copySourceValue
    copySourceFilterColumn = "cert_template_id";
    let dstKey:string = "";
    const orchestrationData :any = getControlOrchestrationData(
      controlData,
      "c443411dc1584fcda4ad9d757eedf2f5",
      "257da3337901e21731b10cd53995834f"
    );
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
    if(dfd_applycertificatetempname_v1Props.dstKey){
      dstKey = dfd_applycertificatetempname_v1Props.dstKey
    }else{
      dstKey=orchestrationData?.data?.dfdKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    }
    if (!value && "hasLogicCenter" in dfd_applycertificatetempname_v1Props && !dfd_applycertificatetempname_v1Props.hasLogicCenter && !dfdFlag) {
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
      settemplate_nameOptions(temp);
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
  },[template_name5834f?.refresh])  

  const handlechange = async(value: any) => {
    isUserSelectionRef.current = true;
    if(value.length>0){
      await getDropdownData(value)
      setgrounding_groupdf2f5((prev: any) => ({ ...prev,template_name5834f: value }))
      setIsRequredData(false)
    }else{
      let temp:any = grounding_groupdf2f5;
      delete temp.template_name;
      delete temp.TEMPLATE_NAME;
      delete temp.template_name5834f;
      setgrounding_groupdf2f5(temp);
      getDropdownData(undefined, 1, true);
      setIsRequredData(true);
    }
     setError('')
    setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,template_name:undefined}}));
    await handleClick(value);
  };

    const fetchDropdownData = async()=>{
    let tempValue:any=""
    if(grounding_groupdf2f5.template_name){
      if(Array.isArray(dfd_applycertificatetempname_v1Props)){
        if(dfd_applycertificatetempname_v1Props?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)){
          setdropdownValue([dfd_applycertificatetempname_v1Props?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)?.template_name])
          tempValue=dfd_applycertificatetempname_v1Props?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)?.template_name
        }else{
          setdropdownValue([grounding_groupdf2f5.template_name])
          tempValue=grounding_groupdf2f5.template_name
        }
      }else{
        let dstKey:string = dfd_applycertificatetempname_v1Props.dstKey;
        const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        {
          key:dstKey,
          page:currentPage,
          count:PAGE_SIZE,
          searchFilter:{template_name:grounding_groupdf2f5.template_name}
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
      if(api_paginationData?.data?.records?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)){
        setdropdownValue([api_paginationData?.data?.records?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)?.template_name ])
        tempValue=api_paginationData?.data?.records?.find((item: any) => item.template_name === grounding_groupdf2f5.template_name)?.template_name
      }else{
        setdropdownValue([grounding_groupdf2f5.template_name])
        tempValue=grounding_groupdf2f5.template_name
      }   
      }
    }
    if(template_name5834f?.trigger == true)
    {
      await handlechange(tempValue)
      settemplate_name5834f((pre:any)=>({...pre,trigger:false}))
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
  },[grounding_groupdf2f5.template_name, isDropdownDataReady])

  useEffect(() => {
    if(Array.isArray(dfd_applycertificatetempname_v1Props) && dfd_applycertificatetempname_v1Props?.length == 1){
    // setgrounding_groupdf2f5((pre:any)=>({...pre,template_name:dfd_applycertificatetempname_v1Props[0]?.template_name}))
    }
  },[dfd_applycertificatetempname_v1Props])

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
      setgrounding_groupdf2f5((prev: any) => ({ ...prev, template_name: getMapperDetailsBindValues[value],TEMPLATE_NAME: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgrounding_groupdf2f5((prev: any) => ({ ...prev, template_name: '', template_name5834f: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,template_name:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.template_name==getMapperDetailsBindValues[value] && items?.template_name==value)) || {}
    selected.current={
      ...selectedObj||{},
      template_name:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_text'] = grounding_textde33a,
        codeStates['setgrounding_text'] = setgrounding_textde33a,
        codeStates['text_effective_date'] = text_effective_date2f0e9,
        codeStates['settext_effective_date'] = settext_effective_date2f0e9,
        codeStates['text_effective_date_1'] = text_effective_date_1e9a79,
        codeStates['settext_effective_date_1'] = settext_effective_date_1e9a79,
        codeStates['text_effective_date_2'] = text_effective_date_283f74,
        codeStates['settext_effective_date_2'] = settext_effective_date_283f74,
        codeStates['effective_date'] = effective_date585df,
        codeStates['seteffective_date'] = seteffective_date585df,
        codeStates['expiry_date'] = expiry_dated0967,
        codeStates['setexpiry_date'] = setexpiry_dated0967,
        codeStates['completed_on'] = completed_on67679,
        codeStates['setcompleted_on'] = setcompleted_on67679,
        codeStates['cert_temp_text'] = cert_temp_textea047,
        codeStates['setcert_temp_text'] = setcert_temp_textea047,
        codeStates['template_name'] = template_name5834f,
        codeStates['settemplate_name'] = settemplate_name5834f,
        codeStates['is_recertification'] = is_recertificationa8241,
        codeStates['setis_recertification'] = setis_recertificationa8241,
        codeStates['is_active'] = is_active72c74,
        codeStates['setis_active'] = setis_active72c74,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
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
  const grounding_groupdf2f5Ref = useRef<any>(grounding_groupdf2f5);
  useEffect(() => { grounding_groupdf2f5Ref.current = grounding_groupdf2f5; }, [grounding_groupdf2f5]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "257da3337901e21731b10cd53995834f") {
        handleClick(grounding_groupdf2f5Ref?.current?.template_name5834f?grounding_groupdf2f5Ref?.current?.template_name5834f:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "257da3337901e21731b10cd53995834f");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgrounding_groupdf2f5((pre:any)=>({...pre,template_name:""}))
    else
      setInitialCount(1)
  },[template_name5834f?.refresh])
  

  if (template_name5834f?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `28 / 34`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown   
        className="!border-[1px]"    
        disabled={ true }
        contentAlign={"center"}
        static={true}
        staticProps={template_nameOptions}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        placeholder={keyset("Select")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={grounding_groupdf2f5?.template_name5834f ? [grounding_groupdf2f5?.template_name5834f] : (grounding_groupdf2f5?.template_name ? dropdownValue : [])}
        validationState={validate?.editCertificate_v1?.template_name ? "invalid" : undefined}
        />
    </div>
  );
};

export default Dropdowntemplate_name;
