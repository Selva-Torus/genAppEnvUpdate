'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import Texttext  from "./Texttext";
import Dropdowncert_template_name  from "./Dropdowncert_template_name";
import TextInputstage_sequence  from "./TextInputstage_sequence";
import Dropdownstage_type_code  from "./Dropdownstage_type_code";
import TextInputstage_name  from "./TextInputstage_name";
import Dropdownapprover_role_id  from "./Dropdownapprover_role_id";
import TextInputsla_days  from "./TextInputsla_days";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstage_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcertificationtemplatestage_v1, setviewcertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificationTemplateStage:AFVK:v1',
    [user],
    'GroupStageDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a7acebf278aa4cd19be9ef2ad0ebaac3");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setstage_details_groupbaac3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext95246((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text95246?.isDisabled==null)
      {
        settext95246((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_name")){
        setcert_template_name694fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_name694fb?.isDisabled==null)
      {
        setcert_template_name694fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequence7b860((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequence7b860?.isDisabled==null)
      {
        setstage_sequence7b860((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_codebdc33((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_codebdc33?.isDisabled==null)
      {
        setstage_type_codebdc33((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name23fb2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name23fb2?.isDisabled==null)
      {
        setstage_name23fb2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approver_role_id")){
        setapprover_role_id51601((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approver_role_id51601?.isDisabled==null)
      {
        setapprover_role_id51601((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_days")){
        setsla_daysbed2b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sla_daysbed2b?.isDisabled==null)
      {
        setsla_daysbed2b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
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

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a7acebf278aa4cd19be9ef2ad0ebaac3");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stage_details_groupbaac3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    stage_details_groupbaac3Ref.current?.setSearchParams();
    stage_details_groupbaac3Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(stage_details_groupbaac3) &&
        Object.keys(stage_details_groupbaac3)?.length > 0
      ) {
        setstage_details_groupbaac3({})
      }
    } else prevRefreshRef.current = true
  }, [stage_details_groupbaac3Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '1 / 77',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewcertificationtemplatestage_v1((pre:any)=>({...pre,_selectedGroup_:"stage_details_group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* 95246 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_template_name") ?<Dropdowncert_template_name   /* 694fb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("stage_sequence") ?<TextInputstage_sequence   /* 7b860 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_type_code") ?<Dropdownstage_type_code   /* bdc33 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("stage_name") ?<TextInputstage_name   /* 23fb2 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approver_role_id") ?<Dropdownapprover_role_id   /* 51601 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("sla_days") ?<TextInputsla_days   /* bed2b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupstage_details_group
