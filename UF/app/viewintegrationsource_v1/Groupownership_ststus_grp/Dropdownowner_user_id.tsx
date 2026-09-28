

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
const Dropdownowner_user_id = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {add_group37fbc, setadd_group37fbc}= useContext(TotalContext) as TotalContextProps;
  const {add_group37fbcProps, setadd_group37fbcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6, setsource_details_grp9bff6}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6Props, setsource_details_grp9bff6Props}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893, setconnect_group1b893}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893Props, setconnect_group1b893Props}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28, setscheduler_retry_grp8ca28}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28Props, setscheduler_retry_grp8ca28Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00a, setownership_ststus_grpbc00a}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00aProps, setownership_ststus_grpbc00aProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp_text9a786, setownership_ststus_grp_text9a786}= useContext(TotalContext) as TotalContextProps;
  const {owner_user_id7a26e, setowner_user_id7a26e}= useContext(TotalContext) as TotalContextProps;
  const {is_activee7e2f, setis_activee7e2f}= useContext(TotalContext) as TotalContextProps;
  const {is_enableda6dd4, setis_enableda6dd4}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967, setlast_run_grpc3967}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967Props, setlast_run_grpc3967Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    '1',
  ];

  useEffect(() => {
  if(ownership_ststus_grpbc00a?.owner_user_id=="" || ownership_ststus_grpbc00a?.owner_user_id==undefined || ownership_ststus_grpbc00a?.owner_user_id==null ){
    setSelectedItem("");
  }
  },[ownership_ststus_grpbc00a?.owner_user_id])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "1d690206545df750bdceeff2077bc00a",
        "acea0cbdec8e943d7013f35f9667a26e"
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
  },[owner_user_id7a26e?.refresh])

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
      setownership_ststus_grpbc00a((prev: any) => ({ ...prev, owner_user_id: staticTextValue, owner_user_id7a26e: value}))
         setIsRequredData(false)
    } else {
       setownership_ststus_grpbc00a((prev: any) => ({ ...prev, owner_user_id: '', owner_user_id7a26e: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewIntegrationSource_v1:{...pre?.viewIntegrationSource_v1,owner_user_id:undefined}}));
   
    // static
    selected.current={
      owner_user_id:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['add_group'] = add_group37fbc,
        codeStates['setadd_group'] = setadd_group37fbc,
        codeStates['add_group37fbc'] = add_group37fbcProps,
        codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
        codeStates['source_details_grp'] = source_details_grp9bff6,
        codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
        codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
        codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
        codeStates['connect_group'] = connect_group1b893,
        codeStates['setconnect_group'] = setconnect_group1b893,
        codeStates['connect_group1b893'] = connect_group1b893Props,
        codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
        codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
        codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
        codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
        codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
        codeStates['ownership_ststus_grp_text'] = ownership_ststus_grp_text9a786,
        codeStates['setownership_ststus_grp_text'] = setownership_ststus_grp_text9a786,
        codeStates['owner_user_id'] = owner_user_id7a26e,
        codeStates['setowner_user_id'] = setowner_user_id7a26e,
        codeStates['is_active'] = is_activee7e2f,
        codeStates['setis_active'] = setis_activee7e2f,
        codeStates['is_enabled'] = is_enableda6dd4,
        codeStates['setis_enabled'] = setis_enableda6dd4,
        codeStates['last_run_grp'] = last_run_grpc3967,
        codeStates['setlast_run_grp'] = setlast_run_grpc3967,
        codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
        codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,
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
  const ownership_ststus_grpbc00aRef = useRef<any>(ownership_ststus_grpbc00a);
  useEffect(() => { ownership_ststus_grpbc00aRef.current = ownership_ststus_grpbc00a; }, [ownership_ststus_grpbc00a]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "acea0cbdec8e943d7013f35f9667a26e") {
        handleClick(ownership_ststus_grpbc00aRef?.current?.owner_user_id7a26e?ownership_ststus_grpbc00aRef?.current?.owner_user_id7a26e:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "acea0cbdec8e943d7013f35f9667a26e");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setownership_ststus_grpbc00a((pre:any)=>({...pre,owner_user_id:""}))
    else
      setInitialCount(1)
  },[owner_user_id7a26e?.refresh])
  

  if (owner_user_id7a26e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 18`,
        gridRow: `7 / 21`,
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
        disabled= {owner_user_id7a26e?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Owner
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            ownership_ststus_grpbc00a?.owner_user_id7a26e ? [ownership_ststus_grpbc00a?.owner_user_id7a26e] :
                ownership_ststus_grpbc00a?.owner_user_id ? ownership_ststus_grpbc00a?.owner_user_id : []
            }
        onChange={handleClick} 
        validationState={validate?.viewIntegrationSource_v1?.owner_user_id ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownowner_user_id;
