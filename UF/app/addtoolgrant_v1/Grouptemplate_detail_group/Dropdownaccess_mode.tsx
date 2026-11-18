

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
  const {groupc4c71, setgroupc4c71}= useContext(TotalContext) as TotalContextProps;
  const {groupc4c71Props, setgroupc4c71Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2, settemplate_detail_groupe14a2}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2Props, settemplate_detail_groupe14a2Props}= useContext(TotalContext) as TotalContextProps;
  const {textfaa89, settextfaa89}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec9725, setasset_namec9725}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_namec6175, settool_asset_namec6175}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation3f831, settool_operation3f831}= useContext(TotalContext) as TotalContextProps;
  const {access_mode1a5e5, setaccess_mode1a5e5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43b, setdynamicactionce43b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43bProps, setdynamicactionce43bProps}= useContext(TotalContext) as TotalContextProps;
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
      "value": "read",
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
      "value": "write",
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
      "value": "execute",
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
  if(template_detail_groupe14a2?.access_mode=="" || template_detail_groupe14a2?.access_mode==undefined || template_detail_groupe14a2?.access_mode==null ){
    setSelectedItem("");
  }
  },[template_detail_groupe14a2?.access_mode])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "76dd8f84384d52cc3851750c06de14a2",
        "01c603ae8e8758893773fcee2cf1a5e5"
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
  },[access_mode1a5e5?.refresh])

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
      settemplate_detail_groupe14a2((prev: any) => ({ ...prev, access_mode: staticTextValue, access_mode1a5e5: value}))
         setIsRequredData(false)
    } else {
       settemplate_detail_groupe14a2((prev: any) => ({ ...prev, access_mode: '', access_mode1a5e5: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addToolGrant_v1:{...pre?.addToolGrant_v1,access_mode:undefined}}));
   
    // static
    selected.current={
      access_mode:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupc4c71,
        codeStates['setgroup'] = setgroupc4c71,
        codeStates['groupc4c71'] = groupc4c71Props,
        codeStates['setgroupc4c71'] = setgroupc4c71Props,
        codeStates['template_detail_group'] = template_detail_groupe14a2,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupe14a2,
        codeStates['template_detail_groupe14a2'] = template_detail_groupe14a2Props,
        codeStates['settemplate_detail_groupe14a2'] = settemplate_detail_groupe14a2Props,
        codeStates['text'] = textfaa89,
        codeStates['settext'] = settextfaa89,
        codeStates['asset_name'] = asset_namec9725,
        codeStates['setasset_name'] = setasset_namec9725,
        codeStates['tool_asset_name'] = tool_asset_namec6175,
        codeStates['settool_asset_name'] = settool_asset_namec6175,
        codeStates['tool_operation'] = tool_operation3f831,
        codeStates['settool_operation'] = settool_operation3f831,
        codeStates['access_mode'] = access_mode1a5e5,
        codeStates['setaccess_mode'] = setaccess_mode1a5e5,
        codeStates['dynamicaction'] = dynamicactionce43b,
        codeStates['setdynamicaction'] = setdynamicactionce43b,
        codeStates['dynamicactionce43b'] = dynamicactionce43bProps,
        codeStates['setdynamicactionce43b'] = setdynamicactionce43bProps,
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
  const template_detail_groupe14a2Ref = useRef<any>(template_detail_groupe14a2);
  useEffect(() => { template_detail_groupe14a2Ref.current = template_detail_groupe14a2; }, [template_detail_groupe14a2]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "01c603ae8e8758893773fcee2cf1a5e5") {
        handleClick(template_detail_groupe14a2Ref?.current?.access_mode1a5e5?template_detail_groupe14a2Ref?.current?.access_mode1a5e5:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "01c603ae8e8758893773fcee2cf1a5e5");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     settemplate_detail_groupe14a2((pre:any)=>({...pre,access_mode:""}))
    else
      setInitialCount(1)
  },[access_mode1a5e5?.refresh])
  

  if (access_mode1a5e5?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `23 / 37`,
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
        disabled= {access_mode1a5e5?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Access Mode
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            template_detail_groupe14a2?.access_mode1a5e5 ? [template_detail_groupe14a2?.access_mode1a5e5] :
                template_detail_groupe14a2?.access_mode ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(template_detail_groupe14a2?.access_mode))?.value?.value ?? template_detail_groupe14a2?.access_mode) : []
            }
        onChange={handleClick} 
        validationState={validate?.addToolGrant_v1?.access_mode ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownaccess_mode;
