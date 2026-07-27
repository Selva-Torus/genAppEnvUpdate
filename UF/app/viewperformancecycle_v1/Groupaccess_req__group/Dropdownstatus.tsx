

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
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
const Dropdownstatus = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_infd821c, setbasic_infd821c}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code7e30e, setcycle_code7e30e}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name9f4c1, setcycle_name9f4c1}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type643b8, setcycle_type643b8}= useContext(TotalContext) as TotalContextProps;
  const {statusb0341, setstatusb0341}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Active',
    'Archived',
    'Completed',
    'Draft',
  ];

  useEffect(() => {
  if(access_req__group70ea9?.status=="" || access_req__group70ea9?.status==undefined || access_req__group70ea9?.status==null ){
    setSelectedItem("");
  }
  },[access_req__group70ea9?.status])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "e0ac73943166d4455f166c0a8a870ea9",
        "065350f9838c676dc621243cd9db0341"
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
  },[statusb0341?.refresh])

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
      "value": "Active",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Active",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Archived",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Archived",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Completed",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Completed",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Draft",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Draft",
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
      setaccess_req__group70ea9((prev: any) => ({ ...prev, status: staticTextValue, statusb0341: value}))
         setIsRequredData(false)
    } else {
       setaccess_req__group70ea9((prev: any) => ({ ...prev, status: '', statusb0341: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,status:undefined}}));
   
    // static
    selected.current={
      status:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_groupc1763,
        codeStates['setnew_access_group'] = setnew_access_groupc1763,
        codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
        codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
        codeStates['access_req__group'] = access_req__group70ea9,
        codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
        codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
        codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
        codeStates['basic_inf'] = basic_infd821c,
        codeStates['setbasic_inf'] = setbasic_infd821c,
        codeStates['cycle_code'] = cycle_code7e30e,
        codeStates['setcycle_code'] = setcycle_code7e30e,
        codeStates['cycle_name'] = cycle_name9f4c1,
        codeStates['setcycle_name'] = setcycle_name9f4c1,
        codeStates['cycle_type'] = cycle_type643b8,
        codeStates['setcycle_type'] = setcycle_type643b8,
        codeStates['status'] = statusb0341,
        codeStates['setstatus'] = setstatusb0341,
        codeStates['valid_group'] = valid_group35ad5,
        codeStates['setvalid_group'] = setvalid_group35ad5,
        codeStates['valid_group35ad5'] = valid_group35ad5Props,
        codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
        codeStates['business_just__group'] = business_just__group2db99,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
        codeStates['business_just__group2db99'] = business_just__group2db99Props,
        codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(access_req__group70ea9?.status == "" || access_req__group70ea9?.status == undefined){
      access_req__group70ea9.status = "";
      const validate:any = v.safeParse(schema, access_req__group70ea9?.status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,status:"invalid"}}));
        }
    }else if(access_req__group70ea9?.status !== ""){
    const validate:any = v.safeParse(schema, access_req__group70ea9?.status);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,status:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,status:undefined}}));
      }
    }
  }
  const access_req__group70ea9Ref = useRef<any>(access_req__group70ea9);
  useEffect(() => { access_req__group70ea9Ref.current = access_req__group70ea9; }, [access_req__group70ea9]);
    useEffect(()=>{
        if(!access_req__group70ea9?.status)
        { 
          setaccess_req__group70ea9Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "065350f9838c676dc621243cd9db0341") {
        handleClick(access_req__group70ea9Ref?.current?.statusb0341?access_req__group70ea9Ref?.current?.statusb0341:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "065350f9838c676dc621243cd9db0341");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__group70ea9((pre:any)=>({...pre,status:""}))
    else
      setInitialCount(1)
  },[statusb0341?.refresh])
  

  if (statusb0341?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `20 / 32`,
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
        disabled= {statusb0341?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            access_req__group70ea9?.statusb0341 ? [access_req__group70ea9?.statusb0341] :
                access_req__group70ea9?.status ? access_req__group70ea9?.status : []
            }
        onChange={handleClick} 
        validationState={validate?.viewPerformanceCycle_v1?.status ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdownstatus;
