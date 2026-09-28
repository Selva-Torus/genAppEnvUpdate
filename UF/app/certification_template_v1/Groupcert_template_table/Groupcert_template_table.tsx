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
import Tablecert_template_table  from './Tablecert_template_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcert_template_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_template_id",
      "template_code",
      "template_name",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type",
      "validity_months",
      "template_version",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
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
  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_ide73a9, setcert_template_ide73a9}= useContext(TotalContext) as TotalContextProps;
  const {template_codee3093, settemplate_codee3093}= useContext(TotalContext) as TotalContextProps;
  const {template_name9efc0, settemplate_name9efc0}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code868b4, setapplies_tier_code868b4}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_case027eb, setapplies_use_case027eb}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typedf4bf, setapplies_asset_typedf4bf}= useContext(TotalContext) as TotalContextProps;
  const {validity_months2ae89, setvalidity_months2ae89}= useContext(TotalContext) as TotalContextProps;
  const {template_versionfb750, settemplate_versionfb750}= useContext(TotalContext) as TotalContextProps;
  const {is_active62f0c, setis_active62f0c}= useContext(TotalContext) as TotalContextProps;
  const {view_btnf8a06, setview_btnf8a06}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn6f608, setedit_btn6f608}= useContext(TotalContext) as TotalContextProps;
  const {del_btn55486, setdel_btn55486}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificatetemplate_v1, setcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1',
    [user],
    'GroupCertTemplateTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "761369011c04450ab6ee02076f475349");
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
    setcert_template_table75349Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_template_id")){
        setcert_template_ide73a9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_ide73a9?.isDisabled==null)
      {
        setcert_template_ide73a9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_code")){
        settemplate_codee3093((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_codee3093?.isDisabled==null)
      {
        settemplate_codee3093((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_name9efc0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_name9efc0?.isDisabled==null)
      {
        settemplate_name9efc0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_tier_code")){
        setapplies_tier_code868b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_tier_code868b4?.isDisabled==null)
      {
        setapplies_tier_code868b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_use_case")){
        setapplies_use_case027eb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_use_case027eb?.isDisabled==null)
      {
        setapplies_use_case027eb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_asset_type")){
        setapplies_asset_typedf4bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_asset_typedf4bf?.isDisabled==null)
      {
        setapplies_asset_typedf4bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validity_months")){
        setvalidity_months2ae89((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validity_months2ae89?.isDisabled==null)
      {
        setvalidity_months2ae89((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_version")){
        settemplate_versionfb750((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_versionfb750?.isDisabled==null)
      {
        settemplate_versionfb750((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active62f0c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active62f0c?.isDisabled==null)
      {
        setis_active62f0c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnf8a06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btnf8a06?.isDisabled==null)
      {
        setview_btnf8a06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn6f608((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn6f608?.isDisabled==null)
      {
        setedit_btn6f608((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn55486((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn55486?.isDisabled==null)
      {
        setdel_btn55486((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "761369011c04450ab6ee02076f475349");
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
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeStates['certificate_group'] = certificate_group22fde,
        codeStates['setcertificate_group'] = setcertificate_group22fde,
        codeStates['certificate_group22fde'] = certificate_group22fdeProps,
        codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,
        codeStates['cert_template_id'] = cert_template_ide73a9,
        codeStates['setcert_template_id'] = setcert_template_ide73a9,
        codeStates['template_code'] = template_codee3093,
        codeStates['settemplate_code'] = settemplate_codee3093,
        codeStates['template_name'] = template_name9efc0,
        codeStates['settemplate_name'] = settemplate_name9efc0,
        codeStates['applies_tier_code'] = applies_tier_code868b4,
        codeStates['setapplies_tier_code'] = setapplies_tier_code868b4,
        codeStates['applies_use_case'] = applies_use_case027eb,
        codeStates['setapplies_use_case'] = setapplies_use_case027eb,
        codeStates['applies_asset_type'] = applies_asset_typedf4bf,
        codeStates['setapplies_asset_type'] = setapplies_asset_typedf4bf,
        codeStates['validity_months'] = validity_months2ae89,
        codeStates['setvalidity_months'] = setvalidity_months2ae89,
        codeStates['template_version'] = template_versionfb750,
        codeStates['settemplate_version'] = settemplate_versionfb750,
        codeStates['is_active'] = is_active62f0c,
        codeStates['setis_active'] = setis_active62f0c,
        codeStates['view_btn'] = view_btnf8a06,
        codeStates['setview_btn'] = setview_btnf8a06,
        codeStates['edit_btn'] = edit_btn6f608,
        codeStates['setedit_btn'] = setedit_btn6f608,
        codeStates['del_btn'] = del_btn55486,
        codeStates['setdel_btn'] = setdel_btn55486,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const cert_template_table75349Ref = useRef<any>(null);
  const handleClearSearch = () => {
    cert_template_table75349Ref.current?.setSearchParams();
    cert_template_table75349Ref.current?.handleSearch({});
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
        !Array.isArray(cert_template_table75349) &&
        Object.keys(cert_template_table75349)?.length > 0
      ) {
        setcert_template_table75349({})
      }
    } else prevRefreshRef.current = true
  }, [cert_template_table75349Props?.refresh])


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
        gridRow: '51 / 143',
      
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
          setcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"cert_template_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecert_template_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={cert_template_table75349Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcert_template_table
