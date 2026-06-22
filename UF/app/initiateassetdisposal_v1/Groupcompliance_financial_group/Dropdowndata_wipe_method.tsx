

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
const Dropdowndata_wipe_method = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
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
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial664f8, setcompliance_financial664f8}= useContext(TotalContext) as TotalContextProps;
  const {approval_reference5e1aa, setapproval_reference5e1aa}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameac8f7, setwitness_nameac8f7}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodfe1e6, setdata_wipe_methodfe1e6}= useContext(TotalContext) as TotalContextProps;
  const {data_wipedad12b, setdata_wipedad12b}= useContext(TotalContext) as TotalContextProps;
  const {disposal_valued21f4, setdisposal_valued21f4}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost031f6, setdisposal_cost031f6}= useContext(TotalContext) as TotalContextProps;
  const {resale_amount2eb0e, setresale_amount2eb0e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'y',
  ];

  useEffect(() => {
  if(compliance_financial_group1f9bc?.data_wipe_method=="" || compliance_financial_group1f9bc?.data_wipe_method==undefined || compliance_financial_group1f9bc?.data_wipe_method==null ){
    setSelectedItem("");
  }
  },[compliance_financial_group1f9bc?.data_wipe_method])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "16048a3a05ac4926a046632180f1f9bc",
        "949e5a8b836f4d4581f086b8332fe1e6"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
      if(orchestrationData?.data?.rule?.nodes?.length>0){
        setRuleCode(orchestrationData?.data?.rule)        
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[data_wipe_methodfe1e6?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      let staticValueProps : any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "y",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "y",
      "enabled": true
    }
  }
];
      for (let i = 0; i < staticValueProps.length; i++) {
        if(staticValueProps[i]?.value?.name === "value"){ 
          if(staticValueProps[i]?.value?.value === value){
            staticTextValue = staticValueProps[i].text.value;
          }
        }
      }
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setcompliance_financial_group1f9bc((prev: any) => ({ ...prev, data_wipe_method: staticTextValue, data_wipe_methodfe1e6: value}))
         setIsRequredData(false)
    } else {
       setcompliance_financial_group1f9bc((prev: any) => ({ ...prev, data_wipe_method: '', data_wipe_methodfe1e6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,initiateAssetDisposal_v1:{...pre?.initiateAssetDisposal_v1,data_wipe_method:undefined}}));
   
    // static
    selected.current={
      data_wipe_method:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
        codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
        codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
        codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
        codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
        codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
        codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
        codeStates['compliance_financial'] = compliance_financial664f8,
        codeStates['setcompliance_financial'] = setcompliance_financial664f8,
        codeStates['approval_reference'] = approval_reference5e1aa,
        codeStates['setapproval_reference'] = setapproval_reference5e1aa,
        codeStates['witness_name'] = witness_nameac8f7,
        codeStates['setwitness_name'] = setwitness_nameac8f7,
        codeStates['data_wipe_method'] = data_wipe_methodfe1e6,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodfe1e6,
        codeStates['data_wiped'] = data_wipedad12b,
        codeStates['setdata_wiped'] = setdata_wipedad12b,
        codeStates['disposal_value'] = disposal_valued21f4,
        codeStates['setdisposal_value'] = setdisposal_valued21f4,
        codeStates['disposal_cost'] = disposal_cost031f6,
        codeStates['setdisposal_cost'] = setdisposal_cost031f6,
        codeStates['resale_amount'] = resale_amount2eb0e,
        codeStates['setresale_amount'] = setresale_amount2eb0e,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const compliance_financial_group1f9bcRef = useRef<any>(compliance_financial_group1f9bc);
  useEffect(() => { compliance_financial_group1f9bcRef.current = compliance_financial_group1f9bc; }, [compliance_financial_group1f9bc]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "949e5a8b836f4d4581f086b8332fe1e6") {
        handleClick(compliance_financial_group1f9bcRef?.current?.data_wipe_methodfe1e6?compliance_financial_group1f9bcRef?.current?.data_wipe_methodfe1e6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "949e5a8b836f4d4581f086b8332fe1e6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setcompliance_financial_group1f9bc((pre:any)=>({...pre,data_wipe_method:""}))
    else
      setInitialCount(1)
  },[data_wipe_methodfe1e6?.refresh])

  if (data_wipe_methodfe1e6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 19`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {data_wipe_methodfe1e6?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Data Wipe Method
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            compliance_financial_group1f9bc?.data_wipe_methodfe1e6 ? [compliance_financial_group1f9bc?.data_wipe_methodfe1e6] :
                compliance_financial_group1f9bc?.data_wipe_method ? compliance_financial_group1f9bc?.data_wipe_method : []
            }
        onChange={handleClick} 
        validationState={validate?.initiateAssetDisposal_v1?.data_wipe_method ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowndata_wipe_method;
