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
import Tabletemplate_stage  from './Tabletemplate_stage';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptemplate_stage = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const securityData:any={
  "AI Product Owner": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "template_stage_id",
      "cert_template_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "is_mandatory",
      "evidence_required",
      "sla_days",
      "is_active",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
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
  const {groupd2d37, setgroupd2d37}= useContext(TotalContext) as TotalContextProps;
  const {groupd2d37Props, setgroupd2d37Props}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933, settemplate_stage1d933}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933Props, settemplate_stage1d933Props}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idddf46, settemplate_stage_idddf46}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id6353c, setcert_template_id6353c}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence526fa, setstage_sequence526fa}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code40ed7, setstage_type_code40ed7}= useContext(TotalContext) as TotalContextProps;
  const {stage_namee4558, setstage_namee4558}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id8ceef, setapprover_role_id8ceef}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory27a2c, setis_mandatory27a2c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required40499, setevidence_required40499}= useContext(TotalContext) as TotalContextProps;
  const {sla_daysec694, setsla_daysec694}= useContext(TotalContext) as TotalContextProps;
  const {is_active13499, setis_active13499}= useContext(TotalContext) as TotalContextProps;
  const {view_btncb6d5, setview_btncb6d5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna9f72, setedit_btna9f72}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnb6708, setdelete_btnb6708}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificationtemplatestage_v1, setcertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1',
    [user],
    'GroupTemplateStage',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1061ea261fd04604ac6921956531d933");
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
    settemplate_stage1d933Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("template_stage_id")){
        settemplate_stage_idddf46((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_stage_idddf46?.isDisabled==null)
      {
        settemplate_stage_idddf46((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_id")){
        setcert_template_id6353c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_id6353c?.isDisabled==null)
      {
        setcert_template_id6353c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequence526fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequence526fa?.isDisabled==null)
      {
        setstage_sequence526fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_code40ed7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_code40ed7?.isDisabled==null)
      {
        setstage_type_code40ed7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_namee4558((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_namee4558?.isDisabled==null)
      {
        setstage_namee4558((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approver_role_id")){
        setapprover_role_id8ceef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approver_role_id8ceef?.isDisabled==null)
      {
        setapprover_role_id8ceef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_mandatory")){
        setis_mandatory27a2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_mandatory27a2c?.isDisabled==null)
      {
        setis_mandatory27a2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_required")){
        setevidence_required40499((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_required40499?.isDisabled==null)
      {
        setevidence_required40499((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_days")){
        setsla_daysec694((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sla_daysec694?.isDisabled==null)
      {
        setsla_daysec694((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active13499((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active13499?.isDisabled==null)
      {
        setis_active13499((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btncb6d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btncb6d5?.isDisabled==null)
      {
        setview_btncb6d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btna9f72((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btna9f72?.isDisabled==null)
      {
        setedit_btna9f72((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnb6708((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btnb6708?.isDisabled==null)
      {
        setdelete_btnb6708((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1061ea261fd04604ac6921956531d933");
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
        codeStates['group'] = groupd2d37,
        codeStates['setgroup'] = setgroupd2d37,
        codeStates['groupd2d37'] = groupd2d37Props,
        codeStates['setgroupd2d37'] = setgroupd2d37Props,
        codeStates['template_stage'] = template_stage1d933,
        codeStates['settemplate_stage'] = settemplate_stage1d933,
        codeStates['template_stage1d933'] = template_stage1d933Props,
        codeStates['settemplate_stage1d933'] = settemplate_stage1d933Props,
        codeStates['template_stage_id'] = template_stage_idddf46,
        codeStates['settemplate_stage_id'] = settemplate_stage_idddf46,
        codeStates['cert_template_id'] = cert_template_id6353c,
        codeStates['setcert_template_id'] = setcert_template_id6353c,
        codeStates['stage_sequence'] = stage_sequence526fa,
        codeStates['setstage_sequence'] = setstage_sequence526fa,
        codeStates['stage_type_code'] = stage_type_code40ed7,
        codeStates['setstage_type_code'] = setstage_type_code40ed7,
        codeStates['stage_name'] = stage_namee4558,
        codeStates['setstage_name'] = setstage_namee4558,
        codeStates['approver_role_id'] = approver_role_id8ceef,
        codeStates['setapprover_role_id'] = setapprover_role_id8ceef,
        codeStates['is_mandatory'] = is_mandatory27a2c,
        codeStates['setis_mandatory'] = setis_mandatory27a2c,
        codeStates['evidence_required'] = evidence_required40499,
        codeStates['setevidence_required'] = setevidence_required40499,
        codeStates['sla_days'] = sla_daysec694,
        codeStates['setsla_days'] = setsla_daysec694,
        codeStates['is_active'] = is_active13499,
        codeStates['setis_active'] = setis_active13499,
        codeStates['view_btn'] = view_btncb6d5,
        codeStates['setview_btn'] = setview_btncb6d5,
        codeStates['edit_btn'] = edit_btna9f72,
        codeStates['setedit_btn'] = setedit_btna9f72,
        codeStates['delete_btn'] = delete_btnb6708,
        codeStates['setdelete_btn'] = setdelete_btnb6708,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const template_stage1d933Ref = useRef<any>(null);
  const handleClearSearch = () => {
    template_stage1d933Ref.current?.setSearchParams();
    template_stage1d933Ref.current?.handleSearch({});
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
        !Array.isArray(template_stage1d933) &&
        Object.keys(template_stage1d933)?.length > 0
      ) {
        settemplate_stage1d933({})
      }
    } else prevRefreshRef.current = true
  }, [template_stage1d933Props?.refresh])


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
        gridColumn: '1 / 25',
        gridRow: '13 / 118',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertificationtemplatestage_v1((pre:any)=>({...pre,_selectedGroup_:"template_stage"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletemplate_stage headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={template_stage1d933Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptemplate_stage
