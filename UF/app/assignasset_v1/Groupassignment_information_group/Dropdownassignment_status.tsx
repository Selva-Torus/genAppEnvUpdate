

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
const Dropdownassignment_status = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assignmentstatuscombo_v1Props, setdfd_assignmentstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_text8af67, setassignment_information_text8af67}= useContext(TotalContext) as TotalContextProps;
  const {asset_name56fec, setasset_name56fec}= useContext(TotalContext) as TotalContextProps;
  const {assigned_tof8f17, setassigned_tof8f17}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byc4563, setassigned_byc4563}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at45db5, setassigned_at45db5}= useContext(TotalContext) as TotalContextProps;
  const {assignment_statusa6f80, setassignment_statusa6f80}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign27aff, setcondition_at_assign27aff}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date15cfe, setexpected_return_date15cfe}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Active',
    'Returned',
    'Lost Damaged',
    'Transferred',
  ];

  useEffect(() => {
  if(assignment_information_group5d144?.assignment_status=="" || assignment_information_group5d144?.assignment_status==undefined || assignment_information_group5d144?.assignment_status==null ){
    setSelectedItem("");
  }
  },[assignment_information_group5d144?.assignment_status])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "913d50f029c84864b01c8a333a75d144",
        "6c5b6cec7da44832a95ef70bdffa6f80"
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
  },[assignment_statusa6f80?.refresh])

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
      "value": "Returned",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Returned",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Lost Damaged",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Lost Damaged",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Transferred",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Transferred",
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
      setassignment_information_group5d144((prev: any) => ({ ...prev, assignment_status: staticTextValue, assignment_statusa6f80: value}))
         setIsRequredData(false)
    } else {
       setassignment_information_group5d144((prev: any) => ({ ...prev, assignment_status: '', assignment_statusa6f80: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assignment_status:undefined}}));
   
    // static
    selected.current={
      assignment_status:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_information_text'] = assignment_information_text8af67,
        codeStates['setassignment_information_text'] = setassignment_information_text8af67,
        codeStates['asset_name'] = asset_name56fec,
        codeStates['setasset_name'] = setasset_name56fec,
        codeStates['assigned_to'] = assigned_tof8f17,
        codeStates['setassigned_to'] = setassigned_tof8f17,
        codeStates['assigned_by'] = assigned_byc4563,
        codeStates['setassigned_by'] = setassigned_byc4563,
        codeStates['assigned_at'] = assigned_at45db5,
        codeStates['setassigned_at'] = setassigned_at45db5,
        codeStates['assignment_status'] = assignment_statusa6f80,
        codeStates['setassignment_status'] = setassignment_statusa6f80,
        codeStates['condition_at_assign'] = condition_at_assign27aff,
        codeStates['setcondition_at_assign'] = setcondition_at_assign27aff,
        codeStates['expected_return_date'] = expected_return_date15cfe,
        codeStates['setexpected_return_date'] = setexpected_return_date15cfe,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
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
      if(assignment_information_group5d144?.assignment_status == "" || assignment_information_group5d144?.assignment_status == undefined){
      assignment_information_group5d144.assignment_status = "";
      const validate:any = v.safeParse(schema, assignment_information_group5d144?.assignment_status);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assignment_status:"invalid"}}));
        }
    }else if(assignment_information_group5d144?.assignment_status !== ""){
    const validate:any = v.safeParse(schema, assignment_information_group5d144?.assignment_status);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assignment_status:"invalid"}}));
    }
    }
  }
  const assignment_information_group5d144Ref = useRef<any>(assignment_information_group5d144);
  useEffect(() => { assignment_information_group5d144Ref.current = assignment_information_group5d144; }, [assignment_information_group5d144]);
    useEffect(()=>{
        if(!assignment_information_group5d144?.assignment_status)
        { 
          setassignment_information_group5d144Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "6c5b6cec7da44832a95ef70bdffa6f80") {
        handleClick(assignment_information_group5d144Ref?.current?.assignment_statusa6f80?assignment_information_group5d144Ref?.current?.assignment_statusa6f80:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "6c5b6cec7da44832a95ef70bdffa6f80");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setassignment_information_group5d144((pre:any)=>({...pre,assignment_status:""}))
    else
      setInitialCount(1)
  },[assignment_statusa6f80?.refresh])

  if (assignment_statusa6f80?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `24 / 38`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className="!rounded-md"
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {assignment_statusa6f80?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Assignment Status
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            assignment_information_group5d144?.assignment_statusa6f80 ? [assignment_information_group5d144?.assignment_statusa6f80] :
                assignment_information_group5d144?.assignment_status ? assignment_information_group5d144?.assignment_status : []
            }
        onChange={handleClick} 
        validationState={validate?.assignAsset_v1?.assignment_status ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdownassignment_status;
