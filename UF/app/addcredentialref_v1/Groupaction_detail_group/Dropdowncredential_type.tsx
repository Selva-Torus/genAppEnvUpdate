

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
const Dropdowncredential_type = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_text33aac, setasset_identity_text33aac}= useContext(TotalContext) as TotalContextProps;
  const {ref_named954f, setref_named954f}= useContext(TotalContext) as TotalContextProps;
  const {vault_path9e7b6, setvault_path9e7b6}= useContext(TotalContext) as TotalContextProps;
  const {credential_typea9a6a, setcredential_typea9a6a}= useContext(TotalContext) as TotalContextProps;
  const {status7b256, setstatus7b256}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    '1',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "1",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "1",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(action_detail_group383de?.credential_type=="" || action_detail_group383de?.credential_type==undefined || action_detail_group383de?.credential_type==null ){
    setSelectedItem("");
  }
  },[action_detail_group383de?.credential_type])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "a95baa59e6c98d0cf1ca8ba6d79383de",
        "516c70d7d8f649969570bd7d2a0a9a6a"
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
  },[credential_typea9a6a?.refresh])

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
      setaction_detail_group383de((prev: any) => ({ ...prev, credential_type: staticTextValue, credential_typea9a6a: value}))
         setIsRequredData(false)
    } else {
       setaction_detail_group383de((prev: any) => ({ ...prev, credential_type: '', credential_typea9a6a: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,credential_type:undefined}}));
   
    // static
    selected.current={
      credential_type:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group28e6a,
        codeStates['setoverall_group'] = setoverall_group28e6a,
        codeStates['overall_group28e6a'] = overall_group28e6aProps,
        codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
        codeStates['action_details_group'] = action_details_group24206,
        codeStates['setaction_details_group'] = setaction_details_group24206,
        codeStates['action_details_group24206'] = action_details_group24206Props,
        codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
        codeStates['action_detail_group'] = action_detail_group383de,
        codeStates['setaction_detail_group'] = setaction_detail_group383de,
        codeStates['action_detail_group383de'] = action_detail_group383deProps,
        codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
        codeStates['asset_identity_text'] = asset_identity_text33aac,
        codeStates['setasset_identity_text'] = setasset_identity_text33aac,
        codeStates['ref_name'] = ref_named954f,
        codeStates['setref_name'] = setref_named954f,
        codeStates['vault_path'] = vault_path9e7b6,
        codeStates['setvault_path'] = setvault_path9e7b6,
        codeStates['credential_type'] = credential_typea9a6a,
        codeStates['setcredential_type'] = setcredential_typea9a6a,
        codeStates['status'] = status7b256,
        codeStates['setstatus'] = setstatus7b256,
        codeStates['risk_conf_group'] = risk_conf_group5fe07,
        codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
        codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
        codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
        codeStates['dynamicactions'] = dynamicactions9ea03,
        codeStates['setdynamicactions'] = setdynamicactions9ea03,
        codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
        codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,
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
  const action_detail_group383deRef = useRef<any>(action_detail_group383de);
  useEffect(() => { action_detail_group383deRef.current = action_detail_group383de; }, [action_detail_group383de]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "516c70d7d8f649969570bd7d2a0a9a6a") {
        handleClick(action_detail_group383deRef?.current?.credential_typea9a6a?action_detail_group383deRef?.current?.credential_typea9a6a:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "516c70d7d8f649969570bd7d2a0a9a6a");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_group383de((pre:any)=>({...pre,credential_type:""}))
    else
      setInitialCount(1)
  },[credential_typea9a6a?.refresh])
  

  if (credential_typea9a6a?.isHidden) {
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
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {credential_typea9a6a?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Credential Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            action_detail_group383de?.credential_typea9a6a ? [action_detail_group383de?.credential_typea9a6a] :
                action_detail_group383de?.credential_type ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(action_detail_group383de?.credential_type))?.value?.value ?? action_detail_group383de?.credential_type) : []
            }
        onChange={handleClick} 
        validationState={validate?.addCredentialRef_v1?.credential_type ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowncredential_type;
