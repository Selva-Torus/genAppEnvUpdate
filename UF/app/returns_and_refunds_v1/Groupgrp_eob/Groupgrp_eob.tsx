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
import Groupgrp_return_refund  from "../Groupgrp_return_refund/Groupgrp_return_refund";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_eob = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnfromagentfilelist_v1Props, setdfd_returnfromagentfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestforrefundfilelist_v1Props, setdfd_requestforrefundfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
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
  const {grp_wpsb96c6, setgrp_wpsb96c6}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsb96c6Props, setgrp_wpsb96c6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127, setgrp_eobed127}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127Props, setgrp_eobed127Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03, setgrp_return_refundc4a03}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03Props, setgrp_return_refundc4a03Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7Props, settabgroup_return_refund4e9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327, settab_header_return_frm_agent2d327}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327Props, settab_header_return_frm_agent2d327Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6, setgrp_retun_ref3e6e6}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6Props, setgrp_retun_ref3e6e6Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636, settbl_return_fie_list8f636}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636Props, settbl_return_fie_list8f636Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2, settab_header_req_for_refundeadd2}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2Props, settab_header_req_for_refundeadd2Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362dProps, setgrp_rr_retun_ref5362dProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9aProps, settbl_rr_req_for_refunde2c9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {returnsrefund_v1, setreturnsrefund_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1',
    [user],
    'GroupGrpEob',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "eb430c7faf4b50a263698e4f914ed127");
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
    setgrp_eobed127Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grp_return_refund")){
        setgrp_return_refundc4a03((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grp_return_refundc4a03?.isDisabled==null)
      {
        setgrp_return_refundc4a03((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_wps'] = grp_wpsb96c6,
        codeStates['setgrp_wps'] = setgrp_wpsb96c6,
        codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
        codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
        codeStates['grp_eob'] = grp_eobed127,
        codeStates['setgrp_eob'] = setgrp_eobed127,
        codeStates['grp_eobed127'] = grp_eobed127Props,
        codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
        codeStates['grp_return_refund'] = grp_return_refundc4a03,
        codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
        codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
        codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
        codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
        codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
        codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
        codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
        codeStates['tab_header_return_frm_agent2d327'] = tab_header_return_frm_agent2d327Props,
        codeStates['settab_header_return_frm_agent2d327'] = settab_header_return_frm_agent2d327Props,
        codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
        codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
        codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
        codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
        codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
        codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
        codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
        codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
        codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
        codeStates['tab_header_req_for_refundeadd2'] = tab_header_req_for_refundeadd2Props,
        codeStates['settab_header_req_for_refundeadd2'] = settab_header_req_for_refundeadd2Props,
        codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
        codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
        codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
        codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
        codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
        codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
        codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
        codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "eb430c7faf4b50a263698e4f914ed127");
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
        codeStates['grp_wps'] = grp_wpsb96c6,
        codeStates['setgrp_wps'] = setgrp_wpsb96c6,
        codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
        codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
        codeStates['grp_eob'] = grp_eobed127,
        codeStates['setgrp_eob'] = setgrp_eobed127,
        codeStates['grp_eobed127'] = grp_eobed127Props,
        codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
        codeStates['grp_return_refund'] = grp_return_refundc4a03,
        codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
        codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
        codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
        codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
        codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
        codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
        codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
        codeStates['tab_header_return_frm_agent2d327'] = tab_header_return_frm_agent2d327Props,
        codeStates['settab_header_return_frm_agent2d327'] = settab_header_return_frm_agent2d327Props,
        codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
        codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
        codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
        codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
        codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
        codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
        codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
        codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
        codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
        codeStates['tab_header_req_for_refundeadd2'] = tab_header_req_for_refundeadd2Props,
        codeStates['settab_header_req_for_refundeadd2'] = settab_header_req_for_refundeadd2Props,
        codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
        codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
        codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
        codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
        codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
        codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
        codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
        codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_eobed127Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_eobed127Ref.current?.setSearchParams();
    grp_eobed127Ref.current?.handleSearch({});
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
        !Array.isArray(grp_eobed127) &&
        Object.keys(grp_eobed127)?.length > 0
      ) {
        setgrp_eobed127({})
        setgrp_eobed127Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_eobed127Props?.refresh])


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
        gridRow: '2 / 141',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setreturnsrefund_v1((pre:any)=>({...pre,_selectedGroup_:"grp_eob"}))
        }}
    >
        {allowedComponent.includes("grp_return_refund")  &&<Groupgrp_return_refund  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
    </div>
 )
}

export default Groupgrp_eob
