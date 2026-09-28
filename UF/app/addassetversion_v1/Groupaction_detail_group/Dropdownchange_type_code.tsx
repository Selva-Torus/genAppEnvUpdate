

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
const Dropdownchange_type_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_group1505e, setoverall_group1505e}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1505eProps, setoverall_group1505eProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6, setaction_details_group51bc6}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6Props, setaction_details_group51bc6Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126, setaction_detail_group32126}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126Props, setaction_detail_group32126Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_textabb79, setasset_identity_textabb79}= useContext(TotalContext) as TotalContextProps;
  const {asset_name3bf18, setasset_name3bf18}= useContext(TotalContext) as TotalContextProps;
  const {version_no81c54, setversion_no81c54}= useContext(TotalContext) as TotalContextProps;
  const {change_type_codea327e, setchange_type_codea327e}= useContext(TotalContext) as TotalContextProps;
  const {change_reason01747, setchange_reason01747}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7c, setrisk_conf_group60f7c}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7cProps, setrisk_conf_group60f7cProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385, setdynamicactionsae385}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385Props, setdynamicactionsae385Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'MODEL',
  ];

  useEffect(() => {
  if(action_detail_group32126?.change_type_code=="" || action_detail_group32126?.change_type_code==undefined || action_detail_group32126?.change_type_code==null ){
    setSelectedItem("");
  }
  },[action_detail_group32126?.change_type_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "92ce0d28ebafa504e5fcd05661032126",
        "5a9eb806c4a3a166e464aabecc6a327e"
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
  },[change_type_codea327e?.refresh])

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
      setaction_detail_group32126((prev: any) => ({ ...prev, change_type_code: staticTextValue, change_type_codea327e: value}))
         setIsRequredData(false)
    } else {
       setaction_detail_group32126((prev: any) => ({ ...prev, change_type_code: '', change_type_codea327e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAssetVersion_v1:{...pre?.addAssetVersion_v1,change_type_code:undefined}}));
   
    // static
    selected.current={
      change_type_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group1505e,
        codeStates['setoverall_group'] = setoverall_group1505e,
        codeStates['overall_group1505e'] = overall_group1505eProps,
        codeStates['setoverall_group1505e'] = setoverall_group1505eProps,
        codeStates['action_details_group'] = action_details_group51bc6,
        codeStates['setaction_details_group'] = setaction_details_group51bc6,
        codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
        codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
        codeStates['action_detail_group'] = action_detail_group32126,
        codeStates['setaction_detail_group'] = setaction_detail_group32126,
        codeStates['action_detail_group32126'] = action_detail_group32126Props,
        codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
        codeStates['asset_identity_text'] = asset_identity_textabb79,
        codeStates['setasset_identity_text'] = setasset_identity_textabb79,
        codeStates['asset_name'] = asset_name3bf18,
        codeStates['setasset_name'] = setasset_name3bf18,
        codeStates['version_no'] = version_no81c54,
        codeStates['setversion_no'] = setversion_no81c54,
        codeStates['change_type_code'] = change_type_codea327e,
        codeStates['setchange_type_code'] = setchange_type_codea327e,
        codeStates['change_reason'] = change_reason01747,
        codeStates['setchange_reason'] = setchange_reason01747,
        codeStates['risk_conf_group'] = risk_conf_group60f7c,
        codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
        codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
        codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
        codeStates['dynamicactions'] = dynamicactionsae385,
        codeStates['setdynamicactions'] = setdynamicactionsae385,
        codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
        codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,
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
  const action_detail_group32126Ref = useRef<any>(action_detail_group32126);
  useEffect(() => { action_detail_group32126Ref.current = action_detail_group32126; }, [action_detail_group32126]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "5a9eb806c4a3a166e464aabecc6a327e") {
        handleClick(action_detail_group32126Ref?.current?.change_type_codea327e?action_detail_group32126Ref?.current?.change_type_codea327e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "5a9eb806c4a3a166e464aabecc6a327e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_group32126((pre:any)=>({...pre,change_type_code:""}))
    else
      setInitialCount(1)
  },[change_type_codea327e?.refresh])
  

  if (change_type_codea327e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 13`,
        gridRow: `24 / 36`,
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
        disabled= {change_type_codea327e?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Change Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            action_detail_group32126?.change_type_codea327e ? [action_detail_group32126?.change_type_codea327e] :
                action_detail_group32126?.change_type_code ? action_detail_group32126?.change_type_code : []
            }
        onChange={handleClick} 
        validationState={validate?.addAssetVersion_v1?.change_type_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownchange_type_code;
