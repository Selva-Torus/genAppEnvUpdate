

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
const Dropdownasset_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {disposal_details0c71e, setdisposal_details0c71e}= useContext(TotalContext) as TotalContextProps;
  const {vendor_nameabdbb, setvendor_nameabdbb}= useContext(TotalContext) as TotalContextProps;
  const {asset_name819e8, setasset_name819e8}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methoddeb30, setdisposal_methoddeb30}= useContext(TotalContext) as TotalContextProps;
  const {disposal_date12263, setdisposal_date12263}= useContext(TotalContext) as TotalContextProps;
  const {reasonadb68, setreasonadb68}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps;
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
  if(disposal_details_groupe1b0c?.asset_name=="" || disposal_details_groupe1b0c?.asset_name==undefined || disposal_details_groupe1b0c?.asset_name==null ){
    setSelectedItem("");
  }
  },[disposal_details_groupe1b0c?.asset_name])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "2693374bb2d64ed88d121dd7c5ee1b0c",
        "4f3e4c76fceb462fae7aa1ad570819e8"
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
  },[asset_name819e8?.refresh])

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
      setdisposal_details_groupe1b0c((prev: any) => ({ ...prev, asset_name: staticTextValue, asset_name819e8: value}))
         setIsRequredData(false)
    } else {
       setdisposal_details_groupe1b0c((prev: any) => ({ ...prev, asset_name: '', asset_name819e8: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,initiateAssetDisposal_v1:{...pre?.initiateAssetDisposal_v1,asset_name:undefined}}));
   
    // static
    selected.current={
      asset_name:value
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
        codeStates['disposal_details'] = disposal_details0c71e,
        codeStates['setdisposal_details'] = setdisposal_details0c71e,
        codeStates['vendor_name'] = vendor_nameabdbb,
        codeStates['setvendor_name'] = setvendor_nameabdbb,
        codeStates['asset_name'] = asset_name819e8,
        codeStates['setasset_name'] = setasset_name819e8,
        codeStates['disposal_method'] = disposal_methoddeb30,
        codeStates['setdisposal_method'] = setdisposal_methoddeb30,
        codeStates['disposal_date'] = disposal_date12263,
        codeStates['setdisposal_date'] = setdisposal_date12263,
        codeStates['reason'] = reasonadb68,
        codeStates['setreason'] = setreasonadb68,
        codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
        codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
        codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
        codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
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
  const disposal_details_groupe1b0cRef = useRef<any>(disposal_details_groupe1b0c);
  useEffect(() => { disposal_details_groupe1b0cRef.current = disposal_details_groupe1b0c; }, [disposal_details_groupe1b0c]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "4f3e4c76fceb462fae7aa1ad570819e8") {
        handleClick(disposal_details_groupe1b0cRef?.current?.asset_name819e8?disposal_details_groupe1b0cRef?.current?.asset_name819e8:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "4f3e4c76fceb462fae7aa1ad570819e8");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setdisposal_details_groupe1b0c((pre:any)=>({...pre,asset_name:""}))
    else
      setInitialCount(1)
  },[asset_name819e8?.refresh])

  if (asset_name819e8?.isHidden) {
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
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {asset_name819e8?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Asset Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            disposal_details_groupe1b0c?.asset_name819e8 ? [disposal_details_groupe1b0c?.asset_name819e8] :
                disposal_details_groupe1b0c?.asset_name ? disposal_details_groupe1b0c?.asset_name : []
            }
        onChange={handleClick} 
        validationState={validate?.initiateAssetDisposal_v1?.asset_name ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownasset_name;
