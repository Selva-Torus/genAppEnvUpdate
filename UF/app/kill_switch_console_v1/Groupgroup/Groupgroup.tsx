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
import TextInputaction_no  from "./TextInputaction_no";
import TextInputasset_name  from "./TextInputasset_name";
import TextAreareason  from "./TextAreareason";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_killswitchactionlist_v1Props, setdfd_killswitchactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_revocationreceiptlist_v1Props, setdfd_revocationreceiptlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "action_no",
      "asset_name",
      "reason"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table",
      "ai_asset_dependency_group_1",
      "group",
      "revocation_table"
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
  const {overall_group8bfb3, setoverall_group8bfb3}= useContext(TotalContext) as TotalContextProps;
  const {overall_group8bfb3Props, setoverall_group8bfb3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40, setai_asset_dependency_groupeee40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40Props, setai_asset_dependency_groupeee40Props}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0, setservice_identity_table953a0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0Props, setservice_identity_table953a0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024, setai_asset_dependency_group_1ed024}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024Props, setai_asset_dependency_group_1ed024Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8, setgroupb1db8}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8Props, setgroupb1db8Props}= useContext(TotalContext) as TotalContextProps;
  const {action_no92cf2, setaction_no92cf2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0720a, setasset_name0720a}= useContext(TotalContext) as TotalContextProps;
  const {reasonb2319, setreasonb2319}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {killswitchactionlist_v1, setkillswitchactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:killSwitchActionList:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ad0576f81000455ba51c8e12117b1db8");
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
    setgroupb1db8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("action_no")){
        setaction_no92cf2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_no92cf2?.isDisabled==null)
      {
        setaction_no92cf2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name0720a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name0720a?.isDisabled==null)
      {
        setasset_name0720a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reason")){
        setreasonb2319((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reasonb2319?.isDisabled==null)
      {
        setreasonb2319((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group8bfb3,
        codeStates['setoverall_group'] = setoverall_group8bfb3,
        codeStates['overall_group8bfb3'] = overall_group8bfb3Props,
        codeStates['setoverall_group8bfb3'] = setoverall_group8bfb3Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupeee40,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupeee40,
        codeStates['ai_asset_dependency_groupeee40'] = ai_asset_dependency_groupeee40Props,
        codeStates['setai_asset_dependency_groupeee40'] = setai_asset_dependency_groupeee40Props,
        codeStates['service_identity_table'] = service_identity_table953a0,
        codeStates['setservice_identity_table'] = setservice_identity_table953a0,
        codeStates['service_identity_table953a0'] = service_identity_table953a0Props,
        codeStates['setservice_identity_table953a0'] = setservice_identity_table953a0Props,
        codeStates['ai_asset_dependency_group_1'] = ai_asset_dependency_group_1ed024,
        codeStates['setai_asset_dependency_group_1'] = setai_asset_dependency_group_1ed024,
        codeStates['ai_asset_dependency_group_1ed024'] = ai_asset_dependency_group_1ed024Props,
        codeStates['setai_asset_dependency_group_1ed024'] = setai_asset_dependency_group_1ed024Props,
        codeStates['group'] = groupb1db8,
        codeStates['setgroup'] = setgroupb1db8,
        codeStates['groupb1db8'] = groupb1db8Props,
        codeStates['setgroupb1db8'] = setgroupb1db8Props,
        codeStates['action_no'] = action_no92cf2,
        codeStates['setaction_no'] = setaction_no92cf2,
        codeStates['asset_name'] = asset_name0720a,
        codeStates['setasset_name'] = setasset_name0720a,
        codeStates['reason'] = reasonb2319,
        codeStates['setreason'] = setreasonb2319,
        codeStates['revocation_table'] = revocation_table5b204,
        codeStates['setrevocation_table'] = setrevocation_table5b204,
        codeStates['revocation_table5b204'] = revocation_table5b204Props,
        codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ad0576f81000455ba51c8e12117b1db8");
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
        codeStates['overall_group'] = overall_group8bfb3,
        codeStates['setoverall_group'] = setoverall_group8bfb3,
        codeStates['overall_group8bfb3'] = overall_group8bfb3Props,
        codeStates['setoverall_group8bfb3'] = setoverall_group8bfb3Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupeee40,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupeee40,
        codeStates['ai_asset_dependency_groupeee40'] = ai_asset_dependency_groupeee40Props,
        codeStates['setai_asset_dependency_groupeee40'] = setai_asset_dependency_groupeee40Props,
        codeStates['service_identity_table'] = service_identity_table953a0,
        codeStates['setservice_identity_table'] = setservice_identity_table953a0,
        codeStates['service_identity_table953a0'] = service_identity_table953a0Props,
        codeStates['setservice_identity_table953a0'] = setservice_identity_table953a0Props,
        codeStates['ai_asset_dependency_group_1'] = ai_asset_dependency_group_1ed024,
        codeStates['setai_asset_dependency_group_1'] = setai_asset_dependency_group_1ed024,
        codeStates['ai_asset_dependency_group_1ed024'] = ai_asset_dependency_group_1ed024Props,
        codeStates['setai_asset_dependency_group_1ed024'] = setai_asset_dependency_group_1ed024Props,
        codeStates['group'] = groupb1db8,
        codeStates['setgroup'] = setgroupb1db8,
        codeStates['groupb1db8'] = groupb1db8Props,
        codeStates['setgroupb1db8'] = setgroupb1db8Props,
        codeStates['action_no'] = action_no92cf2,
        codeStates['setaction_no'] = setaction_no92cf2,
        codeStates['asset_name'] = asset_name0720a,
        codeStates['setasset_name'] = setasset_name0720a,
        codeStates['reason'] = reasonb2319,
        codeStates['setreason'] = setreasonb2319,
        codeStates['revocation_table'] = revocation_table5b204,
        codeStates['setrevocation_table'] = setrevocation_table5b204,
        codeStates['revocation_table5b204'] = revocation_table5b204Props,
        codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupb1db8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupb1db8Ref.current?.setSearchParams();
    groupb1db8Ref.current?.handleSearch({});
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
        !Array.isArray(groupb1db8) &&
        Object.keys(groupb1db8)?.length > 0
      ) {
        setgroupb1db8({})
        setgroupb1db8Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [groupb1db8Props?.refresh])


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
        gridRow: '9 / 44',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setkillswitchactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedControls.includes("action_no") ?<TextInputaction_no   /* 92cf2 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 0720a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("reason") ?<TextAreareason   /* b2319 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupgroup
