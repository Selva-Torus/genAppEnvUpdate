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
import Buttonrepair_new_payment_mk_save_btn  from "./Buttonrepair_new_payment_mk_save_btn";
import Buttoncancel  from "./Buttoncancel";
import Buttonnew_payment_chk_reject_btn  from "./Buttonnew_payment_chk_reject_btn";
import Buttonnew_payment_chk_approve_btn  from "./Buttonnew_payment_chk_approve_btn";
import Buttonsave  from "./Buttonsave";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmidynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_purposecombo_v1Props, setdfd_purposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crbankcodecombo_v1Props, setdfd_crbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_drbankcodecombo_v1Props, setdfd_drbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_chargetypecombo_v1Props, setdfd_chargetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_paymentmethodcombo_v1Props, setdfd_paymentmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_initiationinstructionprioritycombo_v1Props, setdfd_initiationinstructionprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_categorypurposecombo_v1Props, setdfd_categorypurposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_correspondentbankcombo_v1Props, setdfd_correspondentbankcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_manualinitiationuimappingquery_v1Props, setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_servicelevelcombo_v1Props, setdfd_servicelevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Operational Manager": {
    "allowedControls": [
      "repair_new_payment_mk_save_btn",
      "cancel",
      "new_payment_chk_reject_btn",
      "new_payment_chk_approve_btn"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions"
    ],
    "blockedControls": [
      "save"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "repair_new_payment_mk_save_btn",
      "cancel",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions",
      "general_info_group",
      "dbtr_info_group",
      "cr_info_group",
      "chrg_info_group",
      "add_info_group"
    ],
    "blockedControls": [
      "new_payment_chk_reject_btn",
      "new_payment_chk_approve_btn"
    ],
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
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {repair_new_payment_mk_save_btnbd6df, setrepair_new_payment_mk_save_btnbd6df}= useContext(TotalContext) as TotalContextProps;
  const {cancel242e6, setcancel242e6}= useContext(TotalContext) as TotalContextProps;
  const {new_payment_chk_reject_btnb2949, setnew_payment_chk_reject_btnb2949}= useContext(TotalContext) as TotalContextProps;
  const {new_payment_chk_approve_btncb94c, setnew_payment_chk_approve_btncb94c}= useContext(TotalContext) as TotalContextProps;
  const {save62f33, setsave62f33}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {paymentinfo_v1, setpaymentinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1',
    [user],
    'GroupMidynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fda3b3c0ade141ccaad25f5674c3b39d");
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
    setmidynamicactions3b39dProps((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("repair_new_payment_mk_save_btn")){
        setrepair_new_payment_mk_save_btnbd6df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(repair_new_payment_mk_save_btnbd6df?.isDisabled==null)
      {
        setrepair_new_payment_mk_save_btnbd6df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel")){
        setcancel242e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel242e6?.isDisabled==null)
      {
        setcancel242e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_payment_chk_reject_btn")){
        setnew_payment_chk_reject_btnb2949((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_payment_chk_reject_btnb2949?.isDisabled==null)
      {
        setnew_payment_chk_reject_btnb2949((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_payment_chk_approve_btn")){
        setnew_payment_chk_approve_btncb94c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_payment_chk_approve_btncb94c?.isDisabled==null)
      {
        setnew_payment_chk_approve_btncb94c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("save")){
        setsave62f33((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(save62f33?.isDisabled==null)
      {
        setsave62f33((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['repair_new_payment_mk_save_btn'] = repair_new_payment_mk_save_btnbd6df,
        codeStates['setrepair_new_payment_mk_save_btn'] = setrepair_new_payment_mk_save_btnbd6df,
        codeStates['cancel'] = cancel242e6,
        codeStates['setcancel'] = setcancel242e6,
        codeStates['new_payment_chk_reject_btn'] = new_payment_chk_reject_btnb2949,
        codeStates['setnew_payment_chk_reject_btn'] = setnew_payment_chk_reject_btnb2949,
        codeStates['new_payment_chk_approve_btn'] = new_payment_chk_approve_btncb94c,
        codeStates['setnew_payment_chk_approve_btn'] = setnew_payment_chk_approve_btncb94c,
        codeStates['save'] = save62f33,
        codeStates['setsave'] = setsave62f33,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fda3b3c0ade141ccaad25f5674c3b39d");
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
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['repair_new_payment_mk_save_btn'] = repair_new_payment_mk_save_btnbd6df,
        codeStates['setrepair_new_payment_mk_save_btn'] = setrepair_new_payment_mk_save_btnbd6df,
        codeStates['cancel'] = cancel242e6,
        codeStates['setcancel'] = setcancel242e6,
        codeStates['new_payment_chk_reject_btn'] = new_payment_chk_reject_btnb2949,
        codeStates['setnew_payment_chk_reject_btn'] = setnew_payment_chk_reject_btnb2949,
        codeStates['new_payment_chk_approve_btn'] = new_payment_chk_approve_btncb94c,
        codeStates['setnew_payment_chk_approve_btn'] = setnew_payment_chk_approve_btncb94c,
        codeStates['save'] = save62f33,
        codeStates['setsave'] = setsave62f33,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const midynamicactions3b39dRef = useRef<any>(null);
  const handleClearSearch = () => {
    midynamicactions3b39dRef.current?.setSearchParams();
    midynamicactions3b39dRef.current?.handleSearch({});
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
        setmidynamicactions3b39dProps((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setmidynamicactions3b39dProps((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,});
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(midynamicactions3b39d) &&
        Object.keys(midynamicactions3b39d)?.length > 0
      ) {
        setmidynamicactions3b39d({})
        setmidynamicactions3b39dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [midynamicactions3b39dProps?.refresh])


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
        gridColumn: '5 / 25',
        gridRow: '1 / 13',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
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
          setpaymentinfo_v1((pre:any)=>({...pre,_selectedGroup_:"midynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "repair_new_payment_mk_save_btn" in ButtonGoRuleData)?ButtonGoRuleData["repair_new_payment_mk_save_btn"]:true) && 
          allowedControls.includes("repair_new_payment_mk_save_btn")  ?            <Buttonrepair_new_payment_mk_save_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "cancel" in ButtonGoRuleData)?ButtonGoRuleData["cancel"]:true) && 
          allowedControls.includes("cancel")  ?            <Buttoncancel tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_payment_chk_reject_btn" in ButtonGoRuleData)?ButtonGoRuleData["new_payment_chk_reject_btn"]:true) && 
          allowedControls.includes("new_payment_chk_reject_btn")  ?            <Buttonnew_payment_chk_reject_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_payment_chk_approve_btn" in ButtonGoRuleData)?ButtonGoRuleData["new_payment_chk_approve_btn"]:true) && 
          allowedControls.includes("new_payment_chk_approve_btn")  ?            <Buttonnew_payment_chk_approve_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "save" in ButtonGoRuleData)?ButtonGoRuleData["save"]:true) && 
          allowedControls.includes("save")  ?            <Buttonsave tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupmidynamicactions
