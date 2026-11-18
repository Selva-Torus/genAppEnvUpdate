

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
const Dropdownaccess_mode = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {textd1555, settextd1555}= useContext(TotalContext) as TotalContextProps;
  const {agent_asset_name96120, setagent_asset_name96120}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_name67bb6, settool_asset_name67bb6}= useContext(TotalContext) as TotalContextProps;
  const {tool_operationb1b59, settool_operationb1b59}= useContext(TotalContext) as TotalContextProps;
  const {access_modea4f1d, setaccess_modea4f1d}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Read',
    'Write',
    'Execute',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "READ",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Read",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "WRITE",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Write",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "EXECUTE",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Execute",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(template_detail_group410a7?.access_mode=="" || template_detail_group410a7?.access_mode==undefined || template_detail_group410a7?.access_mode==null ){
    setSelectedItem("");
  }
  },[template_detail_group410a7?.access_mode])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "bef9f414fc1a357c1798ddffdd1410a7",
        "5b94b07f92d11cbb0889ccd2761a4f1d"
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
  },[access_modea4f1d?.refresh])

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
      settemplate_detail_group410a7((prev: any) => ({ ...prev, access_mode: staticTextValue, access_modea4f1d: value}))
         setIsRequredData(false)
    } else {
       settemplate_detail_group410a7((prev: any) => ({ ...prev, access_mode: '', access_modea4f1d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,access_mode:undefined}}));
   
    // static
    selected.current={
      access_mode:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = group8f0c2,
        codeStates['setgroup'] = setgroup8f0c2,
        codeStates['group8f0c2'] = group8f0c2Props,
        codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
        codeStates['template_detail_group'] = template_detail_group410a7,
        codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
        codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
        codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
        codeStates['text'] = textd1555,
        codeStates['settext'] = settextd1555,
        codeStates['agent_asset_name'] = agent_asset_name96120,
        codeStates['setagent_asset_name'] = setagent_asset_name96120,
        codeStates['tool_asset_name'] = tool_asset_name67bb6,
        codeStates['settool_asset_name'] = settool_asset_name67bb6,
        codeStates['tool_operation'] = tool_operationb1b59,
        codeStates['settool_operation'] = settool_operationb1b59,
        codeStates['access_mode'] = access_modea4f1d,
        codeStates['setaccess_mode'] = setaccess_modea4f1d,
        codeStates['groups'] = groupsae790,
        codeStates['setgroups'] = setgroupsae790,
        codeStates['groupsae790'] = groupsae790Props,
        codeStates['setgroupsae790'] = setgroupsae790Props,
        codeStates['dynamicaction'] = dynamicaction9560b,
        codeStates['setdynamicaction'] = setdynamicaction9560b,
        codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
        codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,
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
  const template_detail_group410a7Ref = useRef<any>(template_detail_group410a7);
  useEffect(() => { template_detail_group410a7Ref.current = template_detail_group410a7; }, [template_detail_group410a7]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "5b94b07f92d11cbb0889ccd2761a4f1d") {
        handleClick(template_detail_group410a7Ref?.current?.access_modea4f1d?template_detail_group410a7Ref?.current?.access_modea4f1d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5b94b07f92d11cbb0889ccd2761a4f1d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settemplate_detail_group410a7((pre:any)=>({...pre,access_mode:""}))
    else
      setInitialCount(1)
  },[access_modea4f1d?.refresh])
  

  if (access_modea4f1d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `25 / 39`,
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
        disabled= {access_modea4f1d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Access Mode
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            template_detail_group410a7?.access_modea4f1d ? [template_detail_group410a7?.access_modea4f1d] :
                template_detail_group410a7?.access_mode ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(template_detail_group410a7?.access_mode))?.value?.value ?? template_detail_group410a7?.access_mode) : []
            }
        onChange={handleClick} 
        validationState={validate?.approveToolGrant_v1?.access_mode ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownaccess_mode;
