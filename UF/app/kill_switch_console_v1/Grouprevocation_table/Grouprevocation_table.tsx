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
import Tablerevocation_table  from './Tablerevocation_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprevocation_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
      "receipt_id",
      "enforcement_point",
      "command",
      "sla_seconds",
      "edit_btn",
      "delete_btn",
      "containment_status"
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
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  const {receipt_idce0a4, setreceipt_idce0a4}= useContext(TotalContext) as TotalContextProps;
  const {enforcement_point97c86, setenforcement_point97c86}= useContext(TotalContext) as TotalContextProps;
  const {commanda8813, setcommanda8813}= useContext(TotalContext) as TotalContextProps;
  const {sla_seconds965d7, setsla_seconds965d7}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn1d9fd, setedit_btn1d9fd}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn4348b, setdelete_btn4348b}= useContext(TotalContext) as TotalContextProps;
  const {containment_status04b39, setcontainment_status04b39}= useContext(TotalContext) as TotalContextProps;
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
    'GroupRevocationTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7a2cd6a7349744e8aa10c62d4325b204");
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
    setrevocation_table5b204Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("receipt_id")){
        setreceipt_idce0a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_idce0a4?.isDisabled==null)
      {
        setreceipt_idce0a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("enforcement_point")){
        setenforcement_point97c86((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(enforcement_point97c86?.isDisabled==null)
      {
        setenforcement_point97c86((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("command")){
        setcommanda8813((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(commanda8813?.isDisabled==null)
      {
        setcommanda8813((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_seconds")){
        setsla_seconds965d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sla_seconds965d7?.isDisabled==null)
      {
        setsla_seconds965d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn1d9fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn1d9fd?.isDisabled==null)
      {
        setedit_btn1d9fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn4348b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn4348b?.isDisabled==null)
      {
        setdelete_btn4348b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("containment_status")){
        setcontainment_status04b39((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(containment_status04b39?.isDisabled==null)
      {
        setcontainment_status04b39((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7a2cd6a7349744e8aa10c62d4325b204");
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
        codeStates['revocation_table'] = revocation_table5b204,
        codeStates['setrevocation_table'] = setrevocation_table5b204,
        codeStates['revocation_table5b204'] = revocation_table5b204Props,
        codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,
        codeStates['receipt_id'] = receipt_idce0a4,
        codeStates['setreceipt_id'] = setreceipt_idce0a4,
        codeStates['enforcement_point'] = enforcement_point97c86,
        codeStates['setenforcement_point'] = setenforcement_point97c86,
        codeStates['command'] = commanda8813,
        codeStates['setcommand'] = setcommanda8813,
        codeStates['sla_seconds'] = sla_seconds965d7,
        codeStates['setsla_seconds'] = setsla_seconds965d7,
        codeStates['edit_btn'] = edit_btn1d9fd,
        codeStates['setedit_btn'] = setedit_btn1d9fd,
        codeStates['delete_btn'] = delete_btn4348b,
        codeStates['setdelete_btn'] = setdelete_btn4348b,
        codeStates['containment_status'] = containment_status04b39,
        codeStates['setcontainment_status'] = setcontainment_status04b39,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const revocation_table5b204Ref = useRef<any>(null);
  const handleClearSearch = () => {
    revocation_table5b204Ref.current?.setSearchParams();
    revocation_table5b204Ref.current?.handleSearch({});
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
        !Array.isArray(revocation_table5b204) &&
        Object.keys(revocation_table5b204)?.length > 0
      ) {
        setrevocation_table5b204({})
        setrevocation_table5b204Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [revocation_table5b204Props?.refresh])


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
        gridRow: '46 / 130',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'#ffffff',
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
          setkillswitchactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"revocation_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablerevocation_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={revocation_table5b204Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouprevocation_table
