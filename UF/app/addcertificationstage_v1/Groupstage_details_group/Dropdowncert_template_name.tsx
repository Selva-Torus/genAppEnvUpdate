

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
const Dropdowncert_template_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {text0cd7b, settext0cd7b}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name79179, setcert_template_name79179}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequencefde55, setstage_sequencefde55}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codefe371, setstage_type_codefe371}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef712f, setstage_namef712f}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id278bd, setapprover_role_id278bd}= useContext(TotalContext) as TotalContextProps;
  const {sla_days5202a, setsla_days5202a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'CERT_TEMP_001',
    'CERT_TEMP_020',
  ];

  useEffect(() => {
  if(stage_details_group3cc06?.cert_template_name=="" || stage_details_group3cc06?.cert_template_name==undefined || stage_details_group3cc06?.cert_template_name==null ){
    setSelectedItem("");
  }
  },[stage_details_group3cc06?.cert_template_name])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "46a149b3f2104ac7ab84a4d24643cc06",
        "713988747b89421393ef2f01fb979179"
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
  },[cert_template_name79179?.refresh])

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
      "value": "CERT_TEMP_001",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "CERT_TEMP_001",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "CERT_TEMP_020",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "CERT_TEMP_020",
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
      setstage_details_group3cc06((prev: any) => ({ ...prev, cert_template_name: staticTextValue, cert_template_name79179: value}))
         setIsRequredData(false)
    } else {
       setstage_details_group3cc06((prev: any) => ({ ...prev, cert_template_name: '', cert_template_name79179: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addCertificationStage_v1:{...pre?.addCertificationStage_v1,cert_template_name:undefined}}));
   
    // static
    selected.current={
      cert_template_name:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['text'] = text0cd7b,
        codeStates['settext'] = settext0cd7b,
        codeStates['cert_template_name'] = cert_template_name79179,
        codeStates['setcert_template_name'] = setcert_template_name79179,
        codeStates['stage_sequence'] = stage_sequencefde55,
        codeStates['setstage_sequence'] = setstage_sequencefde55,
        codeStates['stage_type_code'] = stage_type_codefe371,
        codeStates['setstage_type_code'] = setstage_type_codefe371,
        codeStates['stage_name'] = stage_namef712f,
        codeStates['setstage_name'] = setstage_namef712f,
        codeStates['approver_role_id'] = approver_role_id278bd,
        codeStates['setapprover_role_id'] = setapprover_role_id278bd,
        codeStates['sla_days'] = sla_days5202a,
        codeStates['setsla_days'] = setsla_days5202a,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
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
  const stage_details_group3cc06Ref = useRef<any>(stage_details_group3cc06);
  useEffect(() => { stage_details_group3cc06Ref.current = stage_details_group3cc06; }, [stage_details_group3cc06]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "713988747b89421393ef2f01fb979179") {
        handleClick(stage_details_group3cc06Ref?.current?.cert_template_name79179?stage_details_group3cc06Ref?.current?.cert_template_name79179:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "713988747b89421393ef2f01fb979179");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setstage_details_group3cc06((pre:any)=>({...pre,cert_template_name:""}))
    else
      setInitialCount(1)
  },[cert_template_name79179?.refresh])
  

  if (cert_template_name79179?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 9`,
        gridRow: `15 / 27`,
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
        disabled= {cert_template_name79179?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Certification Template
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            stage_details_group3cc06?.cert_template_name79179 ? [stage_details_group3cc06?.cert_template_name79179] :
                stage_details_group3cc06?.cert_template_name ? stage_details_group3cc06?.cert_template_name : []
            }
        onChange={handleClick} 
        validationState={validate?.addCertificationStage_v1?.cert_template_name ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowncert_template_name;
