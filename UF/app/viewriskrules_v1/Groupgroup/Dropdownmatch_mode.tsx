

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
const Dropdownmatch_mode = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {info_group95877, setinfo_group95877}= useContext(TotalContext) as TotalContextProps;
  const {info_group95877Props, setinfo_group95877Props}= useContext(TotalContext) as TotalContextProps;
  const {group76151, setgroup76151}= useContext(TotalContext) as TotalContextProps;
  const {group76151Props, setgroup76151Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule989a5, setinfo_rule989a5}= useContext(TotalContext) as TotalContextProps;
  const {rule_code50f07, setrule_code50f07}= useContext(TotalContext) as TotalContextProps;
  const {rule_namefa062, setrule_namefa062}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_dropa260b, setresult_tier_dropa260b}= useContext(TotalContext) as TotalContextProps;
  const {match_mode2079e, setmatch_mode2079e}= useContext(TotalContext) as TotalContextProps;
  const {descriptionbacec, setdescriptionbacec}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4, setrule_config_groupb9eb4}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4Props, setrule_config_groupb9eb4Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'All',
    'Any',
  ];

  useEffect(() => {
  if(group76151?.match_mode=="" || group76151?.match_mode==undefined || group76151?.match_mode==null ){
    setSelectedItem("");
  }
  },[group76151?.match_mode])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "25957f8c4d643e280d850a0270a76151",
        "d4f9ca540dadfc495661f1215192079e"
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
  },[match_mode2079e?.refresh])

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
      "value": "All",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "All",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Any",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Any",
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
      setgroup76151((prev: any) => ({ ...prev, match_mode: staticTextValue, match_mode2079e: value}))
         setIsRequredData(false)
    } else {
       setgroup76151((prev: any) => ({ ...prev, match_mode: '', match_mode2079e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewRiskRules_v1:{...pre?.viewRiskRules_v1,match_mode:undefined}}));
   
    // static
    selected.current={
      match_mode:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['info_group'] = info_group95877,
        codeStates['setinfo_group'] = setinfo_group95877,
        codeStates['info_group95877'] = info_group95877Props,
        codeStates['setinfo_group95877'] = setinfo_group95877Props,
        codeStates['group'] = group76151,
        codeStates['setgroup'] = setgroup76151,
        codeStates['group76151'] = group76151Props,
        codeStates['setgroup76151'] = setgroup76151Props,
        codeStates['info_rule'] = info_rule989a5,
        codeStates['setinfo_rule'] = setinfo_rule989a5,
        codeStates['rule_code'] = rule_code50f07,
        codeStates['setrule_code'] = setrule_code50f07,
        codeStates['rule_name'] = rule_namefa062,
        codeStates['setrule_name'] = setrule_namefa062,
        codeStates['result_tier_drop'] = result_tier_dropa260b,
        codeStates['setresult_tier_drop'] = setresult_tier_dropa260b,
        codeStates['match_mode'] = match_mode2079e,
        codeStates['setmatch_mode'] = setmatch_mode2079e,
        codeStates['description'] = descriptionbacec,
        codeStates['setdescription'] = setdescriptionbacec,
        codeStates['rule_config_group'] = rule_config_groupb9eb4,
        codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
        codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
        codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
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
  const group76151Ref = useRef<any>(group76151);
  useEffect(() => { group76151Ref.current = group76151; }, [group76151]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "d4f9ca540dadfc495661f1215192079e") {
        handleClick(group76151Ref?.current?.match_mode2079e?group76151Ref?.current?.match_mode2079e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "d4f9ca540dadfc495661f1215192079e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroup76151((pre:any)=>({...pre,match_mode:""}))
    else
      setInitialCount(1)
  },[match_mode2079e?.refresh])
  

  if (match_mode2079e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `12 / 25`,
        gridRow: `23 / 35`,
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
        disabled= {match_mode2079e?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Match Mode
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            group76151?.match_mode2079e ? [group76151?.match_mode2079e] :
                group76151?.match_mode ? group76151?.match_mode : []
            }
        onChange={handleClick} 
        validationState={validate?.viewRiskRules_v1?.match_mode ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownmatch_mode;
