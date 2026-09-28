

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
const Dropdowndirection = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_group4e905, setoverall_group4e905}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4e905Props, setoverall_group4e905Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8, setaction_details_group3e7e8}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8Props, setaction_details_group3e7e8Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24ba, setaction_detail_groupa24ba}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24baProps, setaction_detail_groupa24baProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_textba7f4, setasset_identity_textba7f4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name043c3, setasset_name043c3}= useContext(TotalContext) as TotalContextProps;
  const {direction8c78a, setdirection8c78a}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code239a4, setdependency_type_code239a4}= useContext(TotalContext) as TotalContextProps;
  const {dependency_name97a42, setdependency_name97a42}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5, setrisk_conf_groupfa4d5}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5Props, setrisk_conf_groupfa4d5Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9a, setdynamicactionsf9e9a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9aProps, setdynamicactionsf9e9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'MODEL',
  ];

  useEffect(() => {
  if(action_detail_groupa24ba?.direction=="" || action_detail_groupa24ba?.direction==undefined || action_detail_groupa24ba?.direction==null ){
    setSelectedItem("");
  }
  },[action_detail_groupa24ba?.direction])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "5dc9730b542bcd77c8b423af251a24ba",
        "c88ad2c96ff54f5ba169aa55e968c78a"
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
  },[direction8c78a?.refresh])

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
      setaction_detail_groupa24ba((prev: any) => ({ ...prev, direction: staticTextValue, direction8c78a: value}))
         setIsRequredData(false)
    } else {
       setaction_detail_groupa24ba((prev: any) => ({ ...prev, direction: '', direction8c78a: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addAiAssetDependency_v1:{...pre?.addAiAssetDependency_v1,direction:undefined}}));
   
    // static
    selected.current={
      direction:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group4e905,
        codeStates['setoverall_group'] = setoverall_group4e905,
        codeStates['overall_group4e905'] = overall_group4e905Props,
        codeStates['setoverall_group4e905'] = setoverall_group4e905Props,
        codeStates['action_details_group'] = action_details_group3e7e8,
        codeStates['setaction_details_group'] = setaction_details_group3e7e8,
        codeStates['action_details_group3e7e8'] = action_details_group3e7e8Props,
        codeStates['setaction_details_group3e7e8'] = setaction_details_group3e7e8Props,
        codeStates['action_detail_group'] = action_detail_groupa24ba,
        codeStates['setaction_detail_group'] = setaction_detail_groupa24ba,
        codeStates['action_detail_groupa24ba'] = action_detail_groupa24baProps,
        codeStates['setaction_detail_groupa24ba'] = setaction_detail_groupa24baProps,
        codeStates['asset_identity_text'] = asset_identity_textba7f4,
        codeStates['setasset_identity_text'] = setasset_identity_textba7f4,
        codeStates['asset_name'] = asset_name043c3,
        codeStates['setasset_name'] = setasset_name043c3,
        codeStates['direction'] = direction8c78a,
        codeStates['setdirection'] = setdirection8c78a,
        codeStates['dependency_type_code'] = dependency_type_code239a4,
        codeStates['setdependency_type_code'] = setdependency_type_code239a4,
        codeStates['dependency_name'] = dependency_name97a42,
        codeStates['setdependency_name'] = setdependency_name97a42,
        codeStates['risk_conf_group'] = risk_conf_groupfa4d5,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupfa4d5,
        codeStates['risk_conf_groupfa4d5'] = risk_conf_groupfa4d5Props,
        codeStates['setrisk_conf_groupfa4d5'] = setrisk_conf_groupfa4d5Props,
        codeStates['dynamicactions'] = dynamicactionsf9e9a,
        codeStates['setdynamicactions'] = setdynamicactionsf9e9a,
        codeStates['dynamicactionsf9e9a'] = dynamicactionsf9e9aProps,
        codeStates['setdynamicactionsf9e9a'] = setdynamicactionsf9e9aProps,
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
  const action_detail_groupa24baRef = useRef<any>(action_detail_groupa24ba);
  useEffect(() => { action_detail_groupa24baRef.current = action_detail_groupa24ba; }, [action_detail_groupa24ba]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "c88ad2c96ff54f5ba169aa55e968c78a") {
        handleClick(action_detail_groupa24baRef?.current?.direction8c78a?action_detail_groupa24baRef?.current?.direction8c78a:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "c88ad2c96ff54f5ba169aa55e968c78a");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_groupa24ba((pre:any)=>({...pre,direction:""}))
    else
      setInitialCount(1)
  },[direction8c78a?.refresh])
  

  if (direction8c78a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `9 / 21`,
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
        disabled= {direction8c78a?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Direction
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            action_detail_groupa24ba?.direction8c78a ? [action_detail_groupa24ba?.direction8c78a] :
                action_detail_groupa24ba?.direction ? action_detail_groupa24ba?.direction : []
            }
        onChange={handleClick} 
        validationState={validate?.addAiAssetDependency_v1?.direction ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowndirection;
