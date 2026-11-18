

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
const Dropdowncurrency = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
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
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {financial_transaction__text80fed, setfinancial_transaction__text80fed}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txndf14b, setmax_amount_per_txndf14b}= useContext(TotalContext) as TotalContextProps;
  const {currency7f91e, setcurrency7f91e}= useContext(TotalContext) as TotalContextProps;
  const {daily_amount_limit2e0d0, setdaily_amount_limit2e0d0}= useContext(TotalContext) as TotalContextProps;
  const {max_txn_per_daya7f5c, setmax_txn_per_daya7f5c}= useContext(TotalContext) as TotalContextProps;
  const {hitl_threshold_amountc7af3, sethitl_threshold_amountc7af3}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'USD',
    'INR',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "USD",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "USD",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "INR",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "INR",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(finacial_transaction__group6585c?.currency=="" || finacial_transaction__group6585c?.currency==undefined || finacial_transaction__group6585c?.currency==null ){
    setSelectedItem("");
  }
  },[finacial_transaction__group6585c?.currency])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "00962534e6d0a589bc83577cad56585c",
        "3d4cd8eefb40519049bdb18af367f91e"
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
  },[currency7f91e?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
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
      setfinacial_transaction__group6585c((prev: any) => ({ ...prev, currency: staticTextValue, currency7f91e: value}))
         setIsRequredData(false)
    } else {
       setfinacial_transaction__group6585c((prev: any) => ({ ...prev, currency: '', currency7f91e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,currency:undefined}}));
   
    // static
    selected.current={
      currency:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
        codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
        codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
        codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
        codeStates['revocat_info_group'] = revocat_info_group2037f,
        codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
        codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
        codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
        codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
        codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
        codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
        codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['financial_transaction__text'] = financial_transaction__text80fed,
        codeStates['setfinancial_transaction__text'] = setfinancial_transaction__text80fed,
        codeStates['max_amount_per_txn'] = max_amount_per_txndf14b,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txndf14b,
        codeStates['currency'] = currency7f91e,
        codeStates['setcurrency'] = setcurrency7f91e,
        codeStates['daily_amount_limit'] = daily_amount_limit2e0d0,
        codeStates['setdaily_amount_limit'] = setdaily_amount_limit2e0d0,
        codeStates['max_txn_per_day'] = max_txn_per_daya7f5c,
        codeStates['setmax_txn_per_day'] = setmax_txn_per_daya7f5c,
        codeStates['hitl_threshold_amount'] = hitl_threshold_amountc7af3,
        codeStates['sethitl_threshold_amount'] = sethitl_threshold_amountc7af3,
        codeStates['condition_validity_group'] = condition_validity_group3e45f,
        codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
        codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
        codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
        codeStates['certification_group'] = certification_group91bfd,
        codeStates['setcertification_group'] = setcertification_group91bfd,
        codeStates['certification_group91bfd'] = certification_group91bfdProps,
        codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
        codeStates['dynamicactions'] = dynamicactions401a9,
        codeStates['setdynamicactions'] = setdynamicactions401a9,
        codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
        codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
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
  const finacial_transaction__group6585cRef = useRef<any>(finacial_transaction__group6585c);
  useEffect(() => { finacial_transaction__group6585cRef.current = finacial_transaction__group6585c; }, [finacial_transaction__group6585c]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "3d4cd8eefb40519049bdb18af367f91e") {
        handleClick(finacial_transaction__group6585cRef?.current?.currency7f91e?finacial_transaction__group6585cRef?.current?.currency7f91e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "3d4cd8eefb40519049bdb18af367f91e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setfinacial_transaction__group6585c((pre:any)=>({...pre,currency:""}))
    else
      setInitialCount(1)
  },[currency7f91e?.refresh])
  

  if (currency7f91e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `8 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {currency7f91e?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Currency
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            finacial_transaction__group6585c?.currency7f91e ? [finacial_transaction__group6585c?.currency7f91e] :
                finacial_transaction__group6585c?.currency ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(finacial_transaction__group6585c?.currency))?.value?.value ?? finacial_transaction__group6585c?.currency) : []
            }
        onChange={handleClick} 
        validationState={validate?.addAuthGrant_v1?.currency ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowncurrency;
