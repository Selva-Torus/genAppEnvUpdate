

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
const Dropdowncriticality_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry121deProps, setoverall_ai_asset_registry121deProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dcProps, setregister_ai_asset_groupf02dcProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1Props, setasset_identity_group8d5e1Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5, setownership_groupf52d5}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5Props, setownership_groupf52d5Props}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ec, setvending_group8f2ec}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ecProps, setvending_group8f2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10eb, setcertification_groupa10eb}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10ebProps, setcertification_groupa10ebProps}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9, setusecase_group233f9}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9Props, setusecase_group233f9Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915b, settier_group6915b}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915bProps, settier_group6915bProps}= useContext(TotalContext) as TotalContextProps;
  const {tier_text9193b, settier_text9193b}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code783c4, setrisk_tier_code783c4}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_source70b9c, setrisk_tier_source70b9c}= useContext(TotalContext) as TotalContextProps;
  const {criticality_code90a59, setcriticality_code90a59}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909, setlifecycle_groupb7909}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909Props, setlifecycle_groupb7909Props}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6f, setversion_group3fe6f}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6fProps, setversion_group3fe6fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846f, setdynamicactionsf846f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846fProps, setdynamicactionsf846fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'CRITICAL',
  ];

  useEffect(() => {
  if(tier_group6915b?.criticality_code=="" || tier_group6915b?.criticality_code==undefined || tier_group6915b?.criticality_code==null ){
    setSelectedItem("");
  }
  },[tier_group6915b?.criticality_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "f6556350f3734fecbdb03bc76a16915b",
        "2701d04f67204bd1a6e9249ab9b90a59"
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
  },[criticality_code90a59?.refresh])

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
      "value": "CRITICAL",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "CRITICAL",
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
      settier_group6915b((prev: any) => ({ ...prev, criticality_code: staticTextValue, criticality_code90a59: value}))
         setIsRequredData(false)
    } else {
       settier_group6915b((prev: any) => ({ ...prev, criticality_code: '', criticality_code90a59: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,registerAIAsset_v1:{...pre?.registerAIAsset_v1,criticality_code:undefined}}));
   
    // static
    selected.current={
      criticality_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de,
        codeStates['overall_ai_asset_registry121de'] = overall_ai_asset_registry121deProps,
        codeStates['setoverall_ai_asset_registry121de'] = setoverall_ai_asset_registry121deProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc,
        codeStates['register_ai_asset_groupf02dc'] = register_ai_asset_groupf02dcProps,
        codeStates['setregister_ai_asset_groupf02dc'] = setregister_ai_asset_groupf02dcProps,
        codeStates['asset_identity_group'] = asset_identity_group8d5e1,
        codeStates['setasset_identity_group'] = setasset_identity_group8d5e1,
        codeStates['asset_identity_group8d5e1'] = asset_identity_group8d5e1Props,
        codeStates['setasset_identity_group8d5e1'] = setasset_identity_group8d5e1Props,
        codeStates['ownership_group'] = ownership_groupf52d5,
        codeStates['setownership_group'] = setownership_groupf52d5,
        codeStates['ownership_groupf52d5'] = ownership_groupf52d5Props,
        codeStates['setownership_groupf52d5'] = setownership_groupf52d5Props,
        codeStates['vending_group'] = vending_group8f2ec,
        codeStates['setvending_group'] = setvending_group8f2ec,
        codeStates['vending_group8f2ec'] = vending_group8f2ecProps,
        codeStates['setvending_group8f2ec'] = setvending_group8f2ecProps,
        codeStates['certification_group'] = certification_groupa10eb,
        codeStates['setcertification_group'] = setcertification_groupa10eb,
        codeStates['certification_groupa10eb'] = certification_groupa10ebProps,
        codeStates['setcertification_groupa10eb'] = setcertification_groupa10ebProps,
        codeStates['usecase_group'] = usecase_group233f9,
        codeStates['setusecase_group'] = setusecase_group233f9,
        codeStates['usecase_group233f9'] = usecase_group233f9Props,
        codeStates['setusecase_group233f9'] = setusecase_group233f9Props,
        codeStates['tier_group'] = tier_group6915b,
        codeStates['settier_group'] = settier_group6915b,
        codeStates['tier_group6915b'] = tier_group6915bProps,
        codeStates['settier_group6915b'] = settier_group6915bProps,
        codeStates['tier_text'] = tier_text9193b,
        codeStates['settier_text'] = settier_text9193b,
        codeStates['risk_tier_code'] = risk_tier_code783c4,
        codeStates['setrisk_tier_code'] = setrisk_tier_code783c4,
        codeStates['risk_tier_source'] = risk_tier_source70b9c,
        codeStates['setrisk_tier_source'] = setrisk_tier_source70b9c,
        codeStates['criticality_code'] = criticality_code90a59,
        codeStates['setcriticality_code'] = setcriticality_code90a59,
        codeStates['lifecycle_group'] = lifecycle_groupb7909,
        codeStates['setlifecycle_group'] = setlifecycle_groupb7909,
        codeStates['lifecycle_groupb7909'] = lifecycle_groupb7909Props,
        codeStates['setlifecycle_groupb7909'] = setlifecycle_groupb7909Props,
        codeStates['version_group'] = version_group3fe6f,
        codeStates['setversion_group'] = setversion_group3fe6f,
        codeStates['version_group3fe6f'] = version_group3fe6fProps,
        codeStates['setversion_group3fe6f'] = setversion_group3fe6fProps,
        codeStates['dynamicactions'] = dynamicactionsf846f,
        codeStates['setdynamicactions'] = setdynamicactionsf846f,
        codeStates['dynamicactionsf846f'] = dynamicactionsf846fProps,
        codeStates['setdynamicactionsf846f'] = setdynamicactionsf846fProps,
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
  const tier_group6915bRef = useRef<any>(tier_group6915b);
  useEffect(() => { tier_group6915bRef.current = tier_group6915b; }, [tier_group6915b]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "2701d04f67204bd1a6e9249ab9b90a59") {
        handleClick(tier_group6915bRef?.current?.criticality_code90a59?tier_group6915bRef?.current?.criticality_code90a59:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "2701d04f67204bd1a6e9249ab9b90a59");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settier_group6915b((pre:any)=>({...pre,criticality_code:""}))
    else
      setInitialCount(1)
  },[criticality_code90a59?.refresh])
  

  if (criticality_code90a59?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `22 / 34`,
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
        disabled= {criticality_code90a59?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Business Criticality
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            tier_group6915b?.criticality_code90a59 ? [tier_group6915b?.criticality_code90a59] :
                tier_group6915b?.criticality_code ? tier_group6915b?.criticality_code : []
            }
        onChange={handleClick} 
        validationState={validate?.registerAIAsset_v1?.criticality_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowncriticality_code;
