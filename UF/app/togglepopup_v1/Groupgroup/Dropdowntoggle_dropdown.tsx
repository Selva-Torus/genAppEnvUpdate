

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
const Dropdowntoggle_dropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_returnreason_v1Props, setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {groupfa4d0, setgroupfa4d0}= useContext(TotalContext) as TotalContextProps;
  const {groupfa4d0Props, setgroupfa4d0Props}= useContext(TotalContext) as TotalContextProps;
  const {toggle_dropdownfb4d3, settoggle_dropdownfb4d3}= useContext(TotalContext) as TotalContextProps;
  const {btn_cancel9df0b, setbtn_cancel9df0b}= useContext(TotalContext) as TotalContextProps;
  const {btn_confirm34d75, setbtn_confirm34d75}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Active',
    'InActive',
  ];
  let staticValueProps: any[] = [
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

  useEffect(() => {
  if(groupfa4d0?.toggle_dropdown=="" || groupfa4d0?.toggle_dropdown==undefined || groupfa4d0?.toggle_dropdown==null ){
    setSelectedItem("");
  }
  },[groupfa4d0?.toggle_dropdown])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "179d496a9b73ba6f08cc812ad9bfa4d0",
        "16b25d9ddc133eb7c2d14205a73fb4d3"
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
  },[toggle_dropdownfb4d3?.refresh])

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
      setgroupfa4d0((prev: any) => ({ ...prev, toggle_dropdown: staticTextValue, toggle_dropdownfb4d3: value}))
         setIsRequredData(false)
    } else {
       setgroupfa4d0((prev: any) => ({ ...prev, toggle_dropdown: '', toggle_dropdownfb4d3: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,togglePopup_v1:{...pre?.togglePopup_v1,toggle_dropdown:undefined}}));
   
    // static
    selected.current={
      toggle_dropdown:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupfa4d0,
        codeStates['setgroup'] = setgroupfa4d0,
        codeStates['groupfa4d0'] = groupfa4d0Props,
        codeStates['setgroupfa4d0'] = setgroupfa4d0Props,
        codeStates['toggle_dropdown'] = toggle_dropdownfb4d3,
        codeStates['settoggle_dropdown'] = settoggle_dropdownfb4d3,
        codeStates['btn_cancel'] = btn_cancel9df0b,
        codeStates['setbtn_cancel'] = setbtn_cancel9df0b,
        codeStates['btn_confirm'] = btn_confirm34d75,
        codeStates['setbtn_confirm'] = setbtn_confirm34d75,
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(groupfa4d0?.toggle_dropdown == "" || groupfa4d0?.toggle_dropdown == undefined){
      groupfa4d0.toggle_dropdown = "";
      const validate:any = v.safeParse(schema, groupfa4d0?.toggle_dropdown);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,togglePopup_v1:{...pre?.togglePopup_v1,toggle_dropdown:"invalid"}}));
        }
    }else if(groupfa4d0?.toggle_dropdown !== ""){
    const validate:any = v.safeParse(schema, groupfa4d0?.toggle_dropdown);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,togglePopup_v1:{...pre?.togglePopup_v1,toggle_dropdown:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,togglePopup_v1:{...pre?.togglePopup_v1,toggle_dropdown:undefined}}));
      }
    }
  }
  const groupfa4d0Ref = useRef<any>(groupfa4d0);
  useEffect(() => { groupfa4d0Ref.current = groupfa4d0; }, [groupfa4d0]);
    useEffect(()=>{
        if(!groupfa4d0?.toggle_dropdown)
        { 
          setgroupfa4d0Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "16b25d9ddc133eb7c2d14205a73fb4d3") {
        handleClick(groupfa4d0Ref?.current?.toggle_dropdownfb4d3?groupfa4d0Ref?.current?.toggle_dropdownfb4d3:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "16b25d9ddc133eb7c2d14205a73fb4d3");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgroupfa4d0((pre:any)=>({...pre,toggle_dropdown:""}))
    else
      setInitialCount(1)
  },[toggle_dropdownfb4d3?.refresh])
  

  if (toggle_dropdownfb4d3?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `2 / 24`,
        gridRow: `3 / 13`,
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
        disabled= {toggle_dropdownfb4d3?.isDisabled ? true : false}
        contentAlign={"center"}
        value={
            groupfa4d0?.toggle_dropdownfb4d3 ? [groupfa4d0?.toggle_dropdownfb4d3] :
                groupfa4d0?.toggle_dropdown ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(groupfa4d0?.toggle_dropdown))?.value?.value ?? groupfa4d0?.toggle_dropdown) : []
            }
        onChange={handleClick} 
        validationState={validate?.togglePopup_v1?.toggle_dropdown ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdowntoggle_dropdown;
