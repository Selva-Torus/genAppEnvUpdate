

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
const Dropdownkill_switch_state_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {security_text91cf6, setsecurity_text91cf6}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_state_code3ed20, setkill_switch_state_code3ed20}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_by7a179, setkill_switch_updated_by7a179}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_updated_on0aadf, setkill_switch_updated_on0aadf}= useContext(TotalContext) as TotalContextProps;
  const {is_activee26e9, setis_activee26e9}= useContext(TotalContext) as TotalContextProps;
  const {segregation_notesd7da7, setsegregation_notesd7da7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'ENABLED',
  ];

  useEffect(() => {
  if(validation_group4d206?.kill_switch_state_code=="" || validation_group4d206?.kill_switch_state_code==undefined || validation_group4d206?.kill_switch_state_code==null ){
    setSelectedItem("");
  }
  },[validation_group4d206?.kill_switch_state_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "1c0817c1402d547509cb443bace4d206",
        "48e2f66b504c4bab8014c2bd16f3ed20"
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
  },[kill_switch_state_code3ed20?.refresh])

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
      "value": "ENABLED",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "ENABLED",
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
      setvalidation_group4d206((prev: any) => ({ ...prev, kill_switch_state_code: staticTextValue, kill_switch_state_code3ed20: value}))
         setIsRequredData(false)
    } else {
       setvalidation_group4d206((prev: any) => ({ ...prev, kill_switch_state_code: '', kill_switch_state_code3ed20: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAgentControl_v1:{...pre?.addAgentControl_v1,kill_switch_state_code:undefined}}));
   
    // static
    selected.current={
      kill_switch_state_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['security_text'] = security_text91cf6,
        codeStates['setsecurity_text'] = setsecurity_text91cf6,
        codeStates['kill_switch_state_code'] = kill_switch_state_code3ed20,
        codeStates['setkill_switch_state_code'] = setkill_switch_state_code3ed20,
        codeStates['kill_switch_updated_by'] = kill_switch_updated_by7a179,
        codeStates['setkill_switch_updated_by'] = setkill_switch_updated_by7a179,
        codeStates['kill_switch_updated_on'] = kill_switch_updated_on0aadf,
        codeStates['setkill_switch_updated_on'] = setkill_switch_updated_on0aadf,
        codeStates['is_active'] = is_activee26e9,
        codeStates['setis_active'] = setis_activee26e9,
        codeStates['segregation_notes'] = segregation_notesd7da7,
        codeStates['setsegregation_notes'] = setsegregation_notesd7da7,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
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
  const validation_group4d206Ref = useRef<any>(validation_group4d206);
  useEffect(() => { validation_group4d206Ref.current = validation_group4d206; }, [validation_group4d206]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "48e2f66b504c4bab8014c2bd16f3ed20") {
        handleClick(validation_group4d206Ref?.current?.kill_switch_state_code3ed20?validation_group4d206Ref?.current?.kill_switch_state_code3ed20:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "48e2f66b504c4bab8014c2bd16f3ed20");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setvalidation_group4d206((pre:any)=>({...pre,kill_switch_state_code:""}))
    else
      setInitialCount(1)
  },[kill_switch_state_code3ed20?.refresh])
  

  if (kill_switch_state_code3ed20?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 7`,
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
        disabled= {kill_switch_state_code3ed20?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Kill Switch State
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            validation_group4d206?.kill_switch_state_code3ed20 ? [validation_group4d206?.kill_switch_state_code3ed20] :
                validation_group4d206?.kill_switch_state_code ? validation_group4d206?.kill_switch_state_code : []
            }
        onChange={handleClick} 
        validationState={validate?.addAgentControl_v1?.kill_switch_state_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownkill_switch_state_code;
