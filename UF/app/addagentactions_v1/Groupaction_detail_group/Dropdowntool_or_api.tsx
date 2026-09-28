

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
const Dropdowntool_or_api = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_group0af1a, setoverall_group0af1a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0af1aProps, setoverall_group0af1aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200fe, setaction_details_group200fe}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200feProps, setaction_details_group200feProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9, setaction_detail_groupd36e9}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9Props, setaction_detail_groupd36e9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_text469b1, setasset_identity_text469b1}= useContext(TotalContext) as TotalContextProps;
  const {action_namedc528, setaction_namedc528}= useContext(TotalContext) as TotalContextProps;
  const {target_system3b5b5, settarget_system3b5b5}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_apiff99d, settool_or_apiff99d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref93ae9, setagent_identity_ref93ae9}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00db, setrisk_conf_groupd00db}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00dbProps, setrisk_conf_groupd00dbProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6f, setdynamicactions86b6f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6fProps, setdynamicactions86b6fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'MODEL',
  ];

  useEffect(() => {
  if(action_detail_groupd36e9?.tool_or_api=="" || action_detail_groupd36e9?.tool_or_api==undefined || action_detail_groupd36e9?.tool_or_api==null ){
    setSelectedItem("");
  }
  },[action_detail_groupd36e9?.tool_or_api])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "b9b086cb671149684decfee6e5ad36e9",
        "8cf8ba633d28447480f8e6fe1cbff99d"
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
  },[tool_or_apiff99d?.refresh])

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
      "value": "MODEL",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "MODEL",
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
      setaction_detail_groupd36e9((prev: any) => ({ ...prev, tool_or_api: staticTextValue, tool_or_apiff99d: value}))
         setIsRequredData(false)
    } else {
       setaction_detail_groupd36e9((prev: any) => ({ ...prev, tool_or_api: '', tool_or_apiff99d: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAgentActions_v1:{...pre?.addAgentActions_v1,tool_or_api:undefined}}));
   
    // static
    selected.current={
      tool_or_api:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group0af1a,
        codeStates['setoverall_group'] = setoverall_group0af1a,
        codeStates['overall_group0af1a'] = overall_group0af1aProps,
        codeStates['setoverall_group0af1a'] = setoverall_group0af1aProps,
        codeStates['action_details_group'] = action_details_group200fe,
        codeStates['setaction_details_group'] = setaction_details_group200fe,
        codeStates['action_details_group200fe'] = action_details_group200feProps,
        codeStates['setaction_details_group200fe'] = setaction_details_group200feProps,
        codeStates['action_detail_group'] = action_detail_groupd36e9,
        codeStates['setaction_detail_group'] = setaction_detail_groupd36e9,
        codeStates['action_detail_groupd36e9'] = action_detail_groupd36e9Props,
        codeStates['setaction_detail_groupd36e9'] = setaction_detail_groupd36e9Props,
        codeStates['asset_identity_text'] = asset_identity_text469b1,
        codeStates['setasset_identity_text'] = setasset_identity_text469b1,
        codeStates['action_name'] = action_namedc528,
        codeStates['setaction_name'] = setaction_namedc528,
        codeStates['target_system'] = target_system3b5b5,
        codeStates['settarget_system'] = settarget_system3b5b5,
        codeStates['tool_or_api'] = tool_or_apiff99d,
        codeStates['settool_or_api'] = settool_or_apiff99d,
        codeStates['agent_identity_ref'] = agent_identity_ref93ae9,
        codeStates['setagent_identity_ref'] = setagent_identity_ref93ae9,
        codeStates['risk_conf_group'] = risk_conf_groupd00db,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd00db,
        codeStates['risk_conf_groupd00db'] = risk_conf_groupd00dbProps,
        codeStates['setrisk_conf_groupd00db'] = setrisk_conf_groupd00dbProps,
        codeStates['dynamicactions'] = dynamicactions86b6f,
        codeStates['setdynamicactions'] = setdynamicactions86b6f,
        codeStates['dynamicactions86b6f'] = dynamicactions86b6fProps,
        codeStates['setdynamicactions86b6f'] = setdynamicactions86b6fProps,
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
  const action_detail_groupd36e9Ref = useRef<any>(action_detail_groupd36e9);
  useEffect(() => { action_detail_groupd36e9Ref.current = action_detail_groupd36e9; }, [action_detail_groupd36e9]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "8cf8ba633d28447480f8e6fe1cbff99d") {
        handleClick(action_detail_groupd36e9Ref?.current?.tool_or_apiff99d?action_detail_groupd36e9Ref?.current?.tool_or_apiff99d:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "8cf8ba633d28447480f8e6fe1cbff99d");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_groupd36e9((pre:any)=>({...pre,tool_or_api:""}))
    else
      setInitialCount(1)
  },[tool_or_apiff99d?.refresh])
  

  if (tool_or_apiff99d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
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
        disabled= {tool_or_apiff99d?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Tool or API
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            action_detail_groupd36e9?.tool_or_apiff99d ? [action_detail_groupd36e9?.tool_or_apiff99d] :
                action_detail_groupd36e9?.tool_or_api ? action_detail_groupd36e9?.tool_or_api : []
            }
        onChange={handleClick} 
        validationState={validate?.addAgentActions_v1?.tool_or_api ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowntool_or_api;
