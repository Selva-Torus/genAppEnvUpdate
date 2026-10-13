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
import Groupemplr_list  from "../Groupemplr_list/Groupemplr_list";
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


const Groupreg_emplr_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_updateregemployer_v1Props, setdfd_updateregemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_regemployer_v1Props, setdfd_regemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "overallhead",
      "salary_file_overall_group",
      "tab_group",
      "dynamication",
      "update_reg_employr_tab",
      "upd_reg_group",
      "upd_reg_emplr_list",
      "reg_empr_tab",
      "reg_emplr_group",
      "emplr_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "overallhead",
      "salary_file_overall_group",
      "tab_group",
      "dynamication",
      "update_reg_employr_tab",
      "upd_reg_group",
      "upd_reg_emplr_list",
      "reg_empr_tab",
      "reg_emplr_group",
      "emplr_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "overallhead",
      "salary_file_overall_group",
      "tab_group",
      "dynamication",
      "update_reg_employr_tab",
      "upd_reg_group",
      "upd_reg_emplr_list",
      "reg_empr_tab",
      "reg_emplr_group",
      "emplr_list"
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
  const {salary_file_overall_group144dd, setsalary_file_overall_group144dd}= useContext(TotalContext) as TotalContextProps;
  const {salary_file_overall_group144ddProps, setsalary_file_overall_group144ddProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group12ca0, settab_group12ca0}= useContext(TotalContext) as TotalContextProps;
  const {tab_group12ca0Props, settab_group12ca0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicatione8e04, setdynamicatione8e04}= useContext(TotalContext) as TotalContextProps;
  const {dynamicatione8e04Props, setdynamicatione8e04Props}= useContext(TotalContext) as TotalContextProps;
  const {update_reg_employr_tab78f7d, setupdate_reg_employr_tab78f7d}= useContext(TotalContext) as TotalContextProps;
  const {update_reg_employr_tab78f7dProps, setupdate_reg_employr_tab78f7dProps}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_group25c38, setupd_reg_group25c38}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_group25c38Props, setupd_reg_group25c38Props}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_emplr_listd336e, setupd_reg_emplr_listd336e}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_emplr_listd336eProps, setupd_reg_emplr_listd336eProps}= useContext(TotalContext) as TotalContextProps;
  const {reg_empr_tabb472c, setreg_empr_tabb472c}= useContext(TotalContext) as TotalContextProps;
  const {reg_empr_tabb472cProps, setreg_empr_tabb472cProps}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_group1073d, setreg_emplr_group1073d}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_group1073dProps, setreg_emplr_group1073dProps}= useContext(TotalContext) as TotalContextProps;
  const {emplr_list0e076, setemplr_list0e076}= useContext(TotalContext) as TotalContextProps;
  const {emplr_list0e076Props, setemplr_list0e076Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {registration_v1, setregistration_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1',
    [user],
    'GroupRegEmplrGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6e31426c0754cb356c25e9c59951073d");
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
    setreg_emplr_group1073dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("emplr_list")){
        setemplr_list0e076Props((pre:any)=>({...pre,...emplr_list0e076,isDisabled:true}));

    }else
    {
      if(emplr_list0e076?.isDisabled==null)
      {
        setemplr_list0e076Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['salary_file_overall_group'] = salary_file_overall_group144dd,
        codeStates['setsalary_file_overall_group'] = setsalary_file_overall_group144dd,
        codeStates['salary_file_overall_group144dd'] = salary_file_overall_group144ddProps,
        codeStates['setsalary_file_overall_group144dd'] = setsalary_file_overall_group144ddProps,
        codeStates['tab_group'] = tab_group12ca0,
        codeStates['settab_group'] = settab_group12ca0,
        codeStates['tab_group12ca0'] = tab_group12ca0Props,
        codeStates['settab_group12ca0'] = settab_group12ca0Props,
        codeStates['dynamication'] = dynamicatione8e04,
        codeStates['setdynamication'] = setdynamicatione8e04,
        codeStates['dynamicatione8e04'] = dynamicatione8e04Props,
        codeStates['setdynamicatione8e04'] = setdynamicatione8e04Props,
        codeStates['update_reg_employr_tab'] = update_reg_employr_tab78f7d,
        codeStates['setupdate_reg_employr_tab'] = setupdate_reg_employr_tab78f7d,
        codeStates['update_reg_employr_tab78f7d'] = update_reg_employr_tab78f7dProps,
        codeStates['setupdate_reg_employr_tab78f7d'] = setupdate_reg_employr_tab78f7dProps,
        codeStates['upd_reg_group'] = upd_reg_group25c38,
        codeStates['setupd_reg_group'] = setupd_reg_group25c38,
        codeStates['upd_reg_group25c38'] = upd_reg_group25c38Props,
        codeStates['setupd_reg_group25c38'] = setupd_reg_group25c38Props,
        codeStates['upd_reg_emplr_list'] = upd_reg_emplr_listd336e,
        codeStates['setupd_reg_emplr_list'] = setupd_reg_emplr_listd336e,
        codeStates['upd_reg_emplr_listd336e'] = upd_reg_emplr_listd336eProps,
        codeStates['setupd_reg_emplr_listd336e'] = setupd_reg_emplr_listd336eProps,
        codeStates['reg_empr_tab'] = reg_empr_tabb472c,
        codeStates['setreg_empr_tab'] = setreg_empr_tabb472c,
        codeStates['reg_empr_tabb472c'] = reg_empr_tabb472cProps,
        codeStates['setreg_empr_tabb472c'] = setreg_empr_tabb472cProps,
        codeStates['reg_emplr_group'] = reg_emplr_group1073d,
        codeStates['setreg_emplr_group'] = setreg_emplr_group1073d,
        codeStates['reg_emplr_group1073d'] = reg_emplr_group1073dProps,
        codeStates['setreg_emplr_group1073d'] = setreg_emplr_group1073dProps,
        codeStates['emplr_list'] = emplr_list0e076,
        codeStates['setemplr_list'] = setemplr_list0e076,
        codeStates['emplr_list0e076'] = emplr_list0e076Props,
        codeStates['setemplr_list0e076'] = setemplr_list0e076Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6e31426c0754cb356c25e9c59951073d");
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
        codeStates['salary_file_overall_group'] = salary_file_overall_group144dd,
        codeStates['setsalary_file_overall_group'] = setsalary_file_overall_group144dd,
        codeStates['salary_file_overall_group144dd'] = salary_file_overall_group144ddProps,
        codeStates['setsalary_file_overall_group144dd'] = setsalary_file_overall_group144ddProps,
        codeStates['tab_group'] = tab_group12ca0,
        codeStates['settab_group'] = settab_group12ca0,
        codeStates['tab_group12ca0'] = tab_group12ca0Props,
        codeStates['settab_group12ca0'] = settab_group12ca0Props,
        codeStates['dynamication'] = dynamicatione8e04,
        codeStates['setdynamication'] = setdynamicatione8e04,
        codeStates['dynamicatione8e04'] = dynamicatione8e04Props,
        codeStates['setdynamicatione8e04'] = setdynamicatione8e04Props,
        codeStates['update_reg_employr_tab'] = update_reg_employr_tab78f7d,
        codeStates['setupdate_reg_employr_tab'] = setupdate_reg_employr_tab78f7d,
        codeStates['update_reg_employr_tab78f7d'] = update_reg_employr_tab78f7dProps,
        codeStates['setupdate_reg_employr_tab78f7d'] = setupdate_reg_employr_tab78f7dProps,
        codeStates['upd_reg_group'] = upd_reg_group25c38,
        codeStates['setupd_reg_group'] = setupd_reg_group25c38,
        codeStates['upd_reg_group25c38'] = upd_reg_group25c38Props,
        codeStates['setupd_reg_group25c38'] = setupd_reg_group25c38Props,
        codeStates['upd_reg_emplr_list'] = upd_reg_emplr_listd336e,
        codeStates['setupd_reg_emplr_list'] = setupd_reg_emplr_listd336e,
        codeStates['upd_reg_emplr_listd336e'] = upd_reg_emplr_listd336eProps,
        codeStates['setupd_reg_emplr_listd336e'] = setupd_reg_emplr_listd336eProps,
        codeStates['reg_empr_tab'] = reg_empr_tabb472c,
        codeStates['setreg_empr_tab'] = setreg_empr_tabb472c,
        codeStates['reg_empr_tabb472c'] = reg_empr_tabb472cProps,
        codeStates['setreg_empr_tabb472c'] = setreg_empr_tabb472cProps,
        codeStates['reg_emplr_group'] = reg_emplr_group1073d,
        codeStates['setreg_emplr_group'] = setreg_emplr_group1073d,
        codeStates['reg_emplr_group1073d'] = reg_emplr_group1073dProps,
        codeStates['setreg_emplr_group1073d'] = setreg_emplr_group1073dProps,
        codeStates['emplr_list'] = emplr_list0e076,
        codeStates['setemplr_list'] = setemplr_list0e076,
        codeStates['emplr_list0e076'] = emplr_list0e076Props,
        codeStates['setemplr_list0e076'] = setemplr_list0e076Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const reg_emplr_group1073dRef = useRef<any>(null);
  const handleClearSearch = () => {
    reg_emplr_group1073dRef.current?.setSearchParams();
    reg_emplr_group1073dRef.current?.handleSearch({});
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
        !Array.isArray(reg_emplr_group1073d) &&
        Object.keys(reg_emplr_group1073d)?.length > 0
      ) {
        setreg_emplr_group1073d({})
        setreg_emplr_group1073dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [reg_emplr_group1073dProps?.refresh])


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
        gridRow: '1 / 179',
      
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
          setregistration_v1((pre:any)=>({...pre,_selectedGroup_:"reg_emplr_group"}))
        }}
    >
        {allowedComponent.includes("emplr_list")  &&<Groupemplr_list  
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

export default Groupreg_emplr_group
