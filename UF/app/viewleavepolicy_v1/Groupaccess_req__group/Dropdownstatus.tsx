

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
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_infa3474, setbasic_infa3474}= useContext(TotalContext) as TotalContextProps;
  const {policy_code4f041, setpolicy_code4f041}= useContext(TotalContext) as TotalContextProps;
  const {policy_name62419, setpolicy_name62419}= useContext(TotalContext) as TotalContextProps;
  const {leave_typeb4f0b, setleave_typeb4f0b}= useContext(TotalContext) as TotalContextProps;
  const {statusbefa6, setstatusbefa6}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Active',
    'Archieved',
    'Draft',
    'InActive',
  ];

  useEffect(() => {
  if(access_req__groupc57b7?.status=="" || access_req__groupc57b7?.status==undefined || access_req__groupc57b7?.status==null ){
    setSelectedItem("");
  }
  },[access_req__groupc57b7?.status])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "c2ec4bac028db14075caf13cd28c57b7",
        "aff7c64d21e084b40483825f26fbefa6"
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
  },[statusbefa6?.refresh])

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
      "value": "Archieved",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Archieved",
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
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "InActive",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "InActive",
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
      setaccess_req__groupc57b7((prev: any) => ({ ...prev, status: staticTextValue, statusbefa6: value}))
         setIsRequredData(false)
    } else {
       setaccess_req__groupc57b7((prev: any) => ({ ...prev, status: '', statusbefa6: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewLeavePolicy_v1:{...pre?.viewLeavePolicy_v1,status:undefined}}));
   
    // static
    selected.current={
      status:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['new_access_group'] = new_access_group193d2,
        codeStates['setnew_access_group'] = setnew_access_group193d2,
        codeStates['new_access_group193d2'] = new_access_group193d2Props,
        codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
        codeStates['access_req__group'] = access_req__groupc57b7,
        codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
        codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
        codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
        codeStates['basic_inf'] = basic_infa3474,
        codeStates['setbasic_inf'] = setbasic_infa3474,
        codeStates['policy_code'] = policy_code4f041,
        codeStates['setpolicy_code'] = setpolicy_code4f041,
        codeStates['policy_name'] = policy_name62419,
        codeStates['setpolicy_name'] = setpolicy_name62419,
        codeStates['leave_type'] = leave_typeb4f0b,
        codeStates['setleave_type'] = setleave_typeb4f0b,
        codeStates['status'] = statusbefa6,
        codeStates['setstatus'] = setstatusbefa6,
        codeStates['app_inf_group'] = app_inf_group60e94,
        codeStates['setapp_inf_group'] = setapp_inf_group60e94,
        codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
        codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
        codeStates['approve_group'] = approve_group27e47,
        codeStates['setapprove_group'] = setapprove_group27e47,
        codeStates['approve_group27e47'] = approve_group27e47Props,
        codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
        codeStates['valid_group'] = valid_group60f4e,
        codeStates['setvalid_group'] = setvalid_group60f4e,
        codeStates['valid_group60f4e'] = valid_group60f4eProps,
        codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
        codeStates['business_just__group'] = business_just__group4dcdb,
        codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
        codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
        codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
        codeStates['provision_group'] = provision_group68072,
        codeStates['setprovision_group'] = setprovision_group68072,
        codeStates['provision_group68072'] = provision_group68072Props,
        codeStates['setprovision_group68072'] = setprovision_group68072Props,
        codeStates['leave_rule_group'] = leave_rule_group1e665,
        codeStates['setleave_rule_group'] = setleave_rule_group1e665,
        codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
        codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,
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
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const access_req__groupc57b7Ref = useRef<any>(access_req__groupc57b7);
  useEffect(() => { access_req__groupc57b7Ref.current = access_req__groupc57b7; }, [access_req__groupc57b7]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "aff7c64d21e084b40483825f26fbefa6") {
        handleClick(access_req__groupc57b7Ref?.current?.statusbefa6?access_req__groupc57b7Ref?.current?.statusbefa6:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "aff7c64d21e084b40483825f26fbefa6");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaccess_req__groupc57b7((pre:any)=>({...pre,status:""}))
    else
      setInitialCount(1)
  },[statusbefa6?.refresh])
  

  if (statusbefa6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 25`,
        gridRow: `21 / 33`,
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
        disabled= {statusbefa6?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            access_req__groupc57b7?.statusbefa6 ? [access_req__groupc57b7?.statusbefa6] :
                access_req__groupc57b7?.status ? access_req__groupc57b7?.status : []
            }
        onChange={handleClick} 
        validationState={validate?.viewLeavePolicy_v1?.status ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownstatus;
