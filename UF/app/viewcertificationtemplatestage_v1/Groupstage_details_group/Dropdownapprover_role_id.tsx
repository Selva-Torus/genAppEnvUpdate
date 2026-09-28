

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
const Dropdownapprover_role_id = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {groupcccf9, setgroupcccf9}= useContext(TotalContext) as TotalContextProps;
  const {groupcccf9Props, setgroupcccf9Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3, setstage_details_groupbaac3}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3Props, setstage_details_groupbaac3Props}= useContext(TotalContext) as TotalContextProps;
  const {text95246, settext95246}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name694fb, setcert_template_name694fb}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence7b860, setstage_sequence7b860}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codebdc33, setstage_type_codebdc33}= useContext(TotalContext) as TotalContextProps;
  const {stage_name23fb2, setstage_name23fb2}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id51601, setapprover_role_id51601}= useContext(TotalContext) as TotalContextProps;
  const {sla_daysbed2b, setsla_daysbed2b}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Certification Reviewer',
    'Certification Reject',
  ];

  useEffect(() => {
  if(stage_details_groupbaac3?.approver_role_id=="" || stage_details_groupbaac3?.approver_role_id==undefined || stage_details_groupbaac3?.approver_role_id==null ){
    setSelectedItem("");
  }
  },[stage_details_groupbaac3?.approver_role_id])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "a7acebf278aa4cd19be9ef2ad0ebaac3",
        "ee7877d69c5a45c1bb2a109ad4951601"
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
  },[approver_role_id51601?.refresh])

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
      "value": "Certification Reviewer",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Certification Reviewer",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Certification Reject",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Certification Reject",
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
      setstage_details_groupbaac3((prev: any) => ({ ...prev, approver_role_id: staticTextValue, approver_role_id51601: value}))
         setIsRequredData(false)
    } else {
       setstage_details_groupbaac3((prev: any) => ({ ...prev, approver_role_id: '', approver_role_id51601: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewCertificationTemplateStage_v1:{...pre?.viewCertificationTemplateStage_v1,approver_role_id:undefined}}));
   
    // static
    selected.current={
      approver_role_id:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = groupcccf9,
        codeStates['setgroup'] = setgroupcccf9,
        codeStates['groupcccf9'] = groupcccf9Props,
        codeStates['setgroupcccf9'] = setgroupcccf9Props,
        codeStates['stage_details_group'] = stage_details_groupbaac3,
        codeStates['setstage_details_group'] = setstage_details_groupbaac3,
        codeStates['stage_details_groupbaac3'] = stage_details_groupbaac3Props,
        codeStates['setstage_details_groupbaac3'] = setstage_details_groupbaac3Props,
        codeStates['text'] = text95246,
        codeStates['settext'] = settext95246,
        codeStates['cert_template_name'] = cert_template_name694fb,
        codeStates['setcert_template_name'] = setcert_template_name694fb,
        codeStates['stage_sequence'] = stage_sequence7b860,
        codeStates['setstage_sequence'] = setstage_sequence7b860,
        codeStates['stage_type_code'] = stage_type_codebdc33,
        codeStates['setstage_type_code'] = setstage_type_codebdc33,
        codeStates['stage_name'] = stage_name23fb2,
        codeStates['setstage_name'] = setstage_name23fb2,
        codeStates['approver_role_id'] = approver_role_id51601,
        codeStates['setapprover_role_id'] = setapprover_role_id51601,
        codeStates['sla_days'] = sla_daysbed2b,
        codeStates['setsla_days'] = setsla_daysbed2b,
        codeStates['evidence_configuration_group'] = evidence_configuration_group80300,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group80300,
        codeStates['evidence_configuration_group80300'] = evidence_configuration_group80300Props,
        codeStates['setevidence_configuration_group80300'] = setevidence_configuration_group80300Props,
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
  const stage_details_groupbaac3Ref = useRef<any>(stage_details_groupbaac3);
  useEffect(() => { stage_details_groupbaac3Ref.current = stage_details_groupbaac3; }, [stage_details_groupbaac3]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "ee7877d69c5a45c1bb2a109ad4951601") {
        handleClick(stage_details_groupbaac3Ref?.current?.approver_role_id51601?stage_details_groupbaac3Ref?.current?.approver_role_id51601:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "ee7877d69c5a45c1bb2a109ad4951601");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setstage_details_groupbaac3((pre:any)=>({...pre,approver_role_id:""}))
    else
      setInitialCount(1)
  },[approver_role_id51601?.refresh])
  

  if (approver_role_id51601?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `30 / 42`,
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
        disabled= {approver_role_id51601?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Approver Role
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            stage_details_groupbaac3?.approver_role_id51601 ? [stage_details_groupbaac3?.approver_role_id51601] :
                stage_details_groupbaac3?.approver_role_id ? stage_details_groupbaac3?.approver_role_id : []
            }
        onChange={handleClick} 
        validationState={validate?.viewCertificationTemplateStage_v1?.approver_role_id ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownapprover_role_id;
