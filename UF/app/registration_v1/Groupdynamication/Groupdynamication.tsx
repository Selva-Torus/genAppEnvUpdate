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
import Buttonbtn_toggle  from "./Buttonbtn_toggle";
import Buttonbtn_reg_moh  from "./Buttonbtn_reg_moh";
import Buttonreg_emplr_search  from "./Buttonreg_emplr_search";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamication = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [
      "btn_toggle",
      "btn_reg_moh",
      "reg_emplr_search",
      "search_btn"
    ],
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
    "allowedControls": [
      "btn_toggle",
      "btn_reg_moh",
      "reg_emplr_search",
      "search_btn"
    ],
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
    "allowedControls": [
      "btn_toggle",
      "btn_reg_moh",
      "reg_emplr_search",
      "search_btn"
    ],
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
  const {btn_toggle12af0, setbtn_toggle12af0}= useContext(TotalContext) as TotalContextProps;
  const {btn_reg_mohd6fce, setbtn_reg_mohd6fce}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_search8289f, setreg_emplr_search8289f}= useContext(TotalContext) as TotalContextProps;
  const {search_btn1b8b6, setsearch_btn1b8b6}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDynamication',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3bd690a64e6c22c17bef34246ce8e04");
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
    setdynamicatione8e04Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
...tab_group12ca0,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("btn_toggle")){
        setbtn_toggle12af0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_toggle12af0?.isDisabled==null)
      {
        setbtn_toggle12af0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_reg_moh")){
        setbtn_reg_mohd6fce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_reg_mohd6fce?.isDisabled==null)
      {
        setbtn_reg_mohd6fce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reg_emplr_search")){
        setreg_emplr_search8289f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reg_emplr_search8289f?.isDisabled==null)
      {
        setreg_emplr_search8289f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn1b8b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn1b8b6?.isDisabled==null)
      {
        setsearch_btn1b8b6((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['btn_toggle'] = btn_toggle12af0,
        codeStates['setbtn_toggle'] = setbtn_toggle12af0,
        codeStates['btn_reg_moh'] = btn_reg_mohd6fce,
        codeStates['setbtn_reg_moh'] = setbtn_reg_mohd6fce,
        codeStates['reg_emplr_search'] = reg_emplr_search8289f,
        codeStates['setreg_emplr_search'] = setreg_emplr_search8289f,
        codeStates['search_btn'] = search_btn1b8b6,
        codeStates['setsearch_btn'] = setsearch_btn1b8b6,
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3bd690a64e6c22c17bef34246ce8e04");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,...tab_group12ca0});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }

  function handleConfirmOnLoad(){
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
        codeStates['btn_toggle'] = btn_toggle12af0,
        codeStates['setbtn_toggle'] = setbtn_toggle12af0,
        codeStates['btn_reg_moh'] = btn_reg_mohd6fce,
        codeStates['setbtn_reg_moh'] = setbtn_reg_mohd6fce,
        codeStates['reg_emplr_search'] = reg_emplr_search8289f,
        codeStates['setreg_emplr_search'] = setreg_emplr_search8289f,
        codeStates['search_btn'] = search_btn1b8b6,
        codeStates['setsearch_btn'] = setsearch_btn1b8b6,
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


  const dynamicatione8e04Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicatione8e04Ref.current?.setSearchParams();
    dynamicatione8e04Ref.current?.handleSearch({});
  };

      async function actionRuleHandle(ruleData:any,data:any){
    if(ruleData?.length > 0){
      let result = await evaluateDecisionForDynamicActions(ruleData,data)
      let buttonOrder:any={}
      if(Array.isArray(result)&&result?.length)
      {
        result?.map((item: any) => {
          if ('order' in item) {
            buttonOrder = { ...buttonOrder, [item?.show]: item?.order }
          } else {
            buttonOrder = {
              ...buttonOrder,
              [item?.show]: { start: item?.start, end: item?.end || 4 }
            }
          }
        })
      }
      if(Object.keys(buttonOrder)?.length)
      {
        setButtonGoRuleData(buttonOrder)
        setdynamicatione8e04Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicatione8e04Props((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,...tab_group12ca0,});
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(dynamicatione8e04) &&
        Object.keys(dynamicatione8e04)?.length > 0
      ) {
        setdynamicatione8e04({})
        setdynamicatione8e04Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dynamicatione8e04Props?.refresh,
    tab_group12ca0?.tab_group,
])


  useEffect(() => {
    subscreenCheck()
  }, [tab_group12ca0?.tab_group,])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '11 / 25',
        gridRow: '2 / 12',
      
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
          setregistration_v1((pre:any)=>({...pre,_selectedGroup_:"dynamication"}))
        }}
    >
        {        ((ruleData?.length>0 && "btn_toggle" in ButtonGoRuleData)?ButtonGoRuleData["btn_toggle"]:true) && 
          allowedControls.includes("btn_toggle")  ?            <Buttonbtn_toggle tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "btn_reg_moh" in ButtonGoRuleData)?ButtonGoRuleData["btn_reg_moh"]:true) && 
          allowedControls.includes("btn_reg_moh")  ?            <Buttonbtn_reg_moh tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "reg_emplr_search" in ButtonGoRuleData)?ButtonGoRuleData["reg_emplr_search"]:true) && 
          allowedControls.includes("reg_emplr_search")  ?            <Buttonreg_emplr_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamication
