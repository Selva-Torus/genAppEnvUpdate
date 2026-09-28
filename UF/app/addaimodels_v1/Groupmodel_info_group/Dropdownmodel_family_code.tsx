

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
const Dropdownmodel_family_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {model_information_text02b2b, setmodel_information_text02b2b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5b38b, setasset_name5b38b}= useContext(TotalContext) as TotalContextProps;
  const {model_named4b34, setmodel_named4b34}= useContext(TotalContext) as TotalContextProps;
  const {model_versionf4cbd, setmodel_versionf4cbd}= useContext(TotalContext) as TotalContextProps;
  const {model_family_code0e9ff, setmodel_family_code0e9ff}= useContext(TotalContext) as TotalContextProps;
  const {model_provider47378, setmodel_provider47378}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Underwriting Decision Model',
  ];

  useEffect(() => {
  if(model_info_group905fc?.model_family_code=="" || model_info_group905fc?.model_family_code==undefined || model_info_group905fc?.model_family_code==null ){
    setSelectedItem("");
  }
  },[model_info_group905fc?.model_family_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "2fb657d8ae4a1d243197168ed83905fc",
        "af52fa9697588dc4b47d70f8e770e9ff"
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
  },[model_family_code0e9ff?.refresh])

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
      "value": "Underwriting Decision Model",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Underwriting Decision Model",
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
      setmodel_info_group905fc((prev: any) => ({ ...prev, model_family_code: staticTextValue, model_family_code0e9ff: value}))
         setIsRequredData(false)
    } else {
       setmodel_info_group905fc((prev: any) => ({ ...prev, model_family_code: '', model_family_code0e9ff: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAIModels_v1:{...pre?.addAIModels_v1,model_family_code:undefined}}));
   
    // static
    selected.current={
      model_family_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['model_information_text'] = model_information_text02b2b,
        codeStates['setmodel_information_text'] = setmodel_information_text02b2b,
        codeStates['asset_name'] = asset_name5b38b,
        codeStates['setasset_name'] = setasset_name5b38b,
        codeStates['model_name'] = model_named4b34,
        codeStates['setmodel_name'] = setmodel_named4b34,
        codeStates['model_version'] = model_versionf4cbd,
        codeStates['setmodel_version'] = setmodel_versionf4cbd,
        codeStates['model_family_code'] = model_family_code0e9ff,
        codeStates['setmodel_family_code'] = setmodel_family_code0e9ff,
        codeStates['model_provider'] = model_provider47378,
        codeStates['setmodel_provider'] = setmodel_provider47378,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
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
  const model_info_group905fcRef = useRef<any>(model_info_group905fc);
  useEffect(() => { model_info_group905fcRef.current = model_info_group905fc; }, [model_info_group905fc]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "af52fa9697588dc4b47d70f8e770e9ff") {
        handleClick(model_info_group905fcRef?.current?.model_family_code0e9ff?model_info_group905fcRef?.current?.model_family_code0e9ff:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "af52fa9697588dc4b47d70f8e770e9ff");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setmodel_info_group905fc((pre:any)=>({...pre,model_family_code:""}))
    else
      setInitialCount(1)
  },[model_family_code0e9ff?.refresh])
  

  if (model_family_code0e9ff?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 19`,
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
        disabled= {model_family_code0e9ff?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Model Family
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            model_info_group905fc?.model_family_code0e9ff ? [model_info_group905fc?.model_family_code0e9ff] :
                model_info_group905fc?.model_family_code ? model_info_group905fc?.model_family_code : []
            }
        onChange={handleClick} 
        validationState={validate?.addAIModels_v1?.model_family_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownmodel_family_code;
