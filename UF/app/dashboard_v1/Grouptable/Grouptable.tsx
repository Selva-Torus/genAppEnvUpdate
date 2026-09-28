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
import Tabletable  from './Tabletable';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_dashboardtable_v1Props, setdfd_dashboardtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardmetricsdashboard_v1Props, setdfd_cardmetricsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_piechartdashboard_v1Props, setdfd_piechartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_coln",
      "tier_coln",
      "business_coln",
      "date",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
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
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_colna2f91, setasset_colna2f91}= useContext(TotalContext) as TotalContextProps;
  const {tier_colnf93fe, settier_colnf93fe}= useContext(TotalContext) as TotalContextProps;
  const {business_colnb75ad, setbusiness_colnb75ad}= useContext(TotalContext) as TotalContextProps;
  const {datea4326, setdatea4326}= useContext(TotalContext) as TotalContextProps;
  const {status1b6f6, setstatus1b6f6}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1',
    [user],
    'GroupTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c2b1768d2cf84d388d1ed4b0cc90a722");
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
    settable0a722Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_coln")){
        setasset_colna2f91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_colna2f91?.isDisabled==null)
      {
        setasset_colna2f91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tier_coln")){
        settier_colnf93fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tier_colnf93fe?.isDisabled==null)
      {
        settier_colnf93fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_coln")){
        setbusiness_colnb75ad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_colnb75ad?.isDisabled==null)
      {
        setbusiness_colnb75ad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date")){
        setdatea4326((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(datea4326?.isDisabled==null)
      {
        setdatea4326((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus1b6f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status1b6f6?.isDisabled==null)
      {
        setstatus1b6f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c2b1768d2cf84d388d1ed4b0cc90a722");
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
        codeStates['overall_group'] = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['overall_group0ca82'] = overall_group0ca82Props,
        codeStates['setoverall_group0ca82'] = setoverall_group0ca82Props,
        codeStates['register_ai_group'] = register_ai_group08810,
        codeStates['setregister_ai_group'] = setregister_ai_group08810,
        codeStates['register_ai_group08810'] = register_ai_group08810Props,
        codeStates['setregister_ai_group08810'] = setregister_ai_group08810Props,
        codeStates['tier_critical_group'] = tier_critical_group484c4,
        codeStates['settier_critical_group'] = settier_critical_group484c4,
        codeStates['tier_critical_group484c4'] = tier_critical_group484c4Props,
        codeStates['settier_critical_group484c4'] = settier_critical_group484c4Props,
        codeStates['cert_expired_group'] = cert_expired_groupf48db,
        codeStates['setcert_expired_group'] = setcert_expired_groupf48db,
        codeStates['cert_expired_groupf48db'] = cert_expired_groupf48dbProps,
        codeStates['setcert_expired_groupf48db'] = setcert_expired_groupf48dbProps,
        codeStates['named_owner_group'] = named_owner_group4361e,
        codeStates['setnamed_owner_group'] = setnamed_owner_group4361e,
        codeStates['named_owner_group4361e'] = named_owner_group4361eProps,
        codeStates['setnamed_owner_group4361e'] = setnamed_owner_group4361eProps,
        codeStates['cert_date_group'] = cert_date_group9ac35,
        codeStates['setcert_date_group'] = setcert_date_group9ac35,
        codeStates['cert_date_group9ac35'] = cert_date_group9ac35Props,
        codeStates['setcert_date_group9ac35'] = setcert_date_group9ac35Props,
        codeStates['governer_gap_group'] = governer_gap_group09585,
        codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585,
        codeStates['governer_gap_group09585'] = governer_gap_group09585Props,
        codeStates['setgoverner_gap_group09585'] = setgoverner_gap_group09585Props,
        codeStates['table'] = table0a722,
        codeStates['settable'] = settable0a722,
        codeStates['table0a722'] = table0a722Props,
        codeStates['settable0a722'] = settable0a722Props,
        codeStates['asset_coln'] = asset_colna2f91,
        codeStates['setasset_coln'] = setasset_colna2f91,
        codeStates['tier_coln'] = tier_colnf93fe,
        codeStates['settier_coln'] = settier_colnf93fe,
        codeStates['business_coln'] = business_colnb75ad,
        codeStates['setbusiness_coln'] = setbusiness_colnb75ad,
        codeStates['date'] = datea4326,
        codeStates['setdate'] = setdatea4326,
        codeStates['status'] = status1b6f6,
        codeStates['setstatus'] = setstatus1b6f6,
        codeStates['pirchart_group'] = pirchart_group8d70d,
        codeStates['setpirchart_group'] = setpirchart_group8d70d,
        codeStates['pirchart_group8d70d'] = pirchart_group8d70dProps,
        codeStates['setpirchart_group8d70d'] = setpirchart_group8d70dProps,
        codeStates['assets_by_business_unit_group'] = assets_by_business_unit_group374c2,
        codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2,
        codeStates['assets_by_business_unit_group374c2'] = assets_by_business_unit_group374c2Props,
        codeStates['setassets_by_business_unit_group374c2'] = setassets_by_business_unit_group374c2Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table0a722Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table0a722Ref.current?.setSearchParams();
    table0a722Ref.current?.handleSearch({});
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
        !Array.isArray(table0a722) &&
        Object.keys(table0a722)?.length > 0
      ) {
        settable0a722({})
      }
    } else prevRefreshRef.current = true
  }, [table0a722Props?.refresh])


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
        gridRow: '8 / 126',
      
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
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletable headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={table0a722Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptable
