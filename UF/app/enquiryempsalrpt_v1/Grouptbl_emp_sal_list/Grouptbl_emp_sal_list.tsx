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
import Tabletbl_emp_sal_list  from './Tabletbl_emp_sal_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_emp_sal_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquiryemployersalaryrpt_v1Props, setdfd_enquiryemployersalaryrpt_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_emp_eid",
      "col_emp_mol_list",
      "col_er_reg_id",
      "col_emp_mol_num",
      "col_sal_mnth",
      "col_chnl_code",
      "btn_view_details"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_emp_eid",
      "col_emp_mol_list",
      "col_er_reg_id",
      "col_emp_mol_num",
      "col_sal_mnth",
      "col_chnl_code",
      "btn_view_details"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_emp_eid",
      "col_emp_mol_list",
      "col_er_reg_id",
      "col_emp_mol_num",
      "col_sal_mnth",
      "col_chnl_code",
      "btn_view_details"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
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
  const {grp_overall_employee_list350f4, setgrp_overall_employee_list350f4}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_employee_list350f4Props, setgrp_overall_employee_list350f4Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67ed, settbl_emp_sal_listf67ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67edProps, settbl_emp_sal_listf67edProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_eidb6da5, setcol_emp_eidb6da5}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mol_list8126c, setcol_emp_mol_list8126c}= useContext(TotalContext) as TotalContextProps;
  const {col_er_reg_idec20e, setcol_er_reg_idec20e}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mol_numa36ef, setcol_emp_mol_numa36ef}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_mnth274bd, setcol_sal_mnth274bd}= useContext(TotalContext) as TotalContextProps;
  const {col_chnl_codefad7d, setcol_chnl_codefad7d}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_details6a93d, setbtn_view_details6a93d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiryempsalrpt_v1, setenquiryempsalrpt_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpSalRPT:AFVK:v1',
    [user],
    'GroupTblEmpSalList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6da1853f3cb6d1f61e4f970dda1f67ed");
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
    settbl_emp_sal_listf67edProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_emp_eid")){
        setcol_emp_eidb6da5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_eidb6da5?.isDisabled==null)
      {
        setcol_emp_eidb6da5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_mol_list")){
        setcol_emp_mol_list8126c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_mol_list8126c?.isDisabled==null)
      {
        setcol_emp_mol_list8126c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_er_reg_id")){
        setcol_er_reg_idec20e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_er_reg_idec20e?.isDisabled==null)
      {
        setcol_er_reg_idec20e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emp_mol_num")){
        setcol_emp_mol_numa36ef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emp_mol_numa36ef?.isDisabled==null)
      {
        setcol_emp_mol_numa36ef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_mnth")){
        setcol_sal_mnth274bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_mnth274bd?.isDisabled==null)
      {
        setcol_sal_mnth274bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_chnl_code")){
        setcol_chnl_codefad7d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_chnl_codefad7d?.isDisabled==null)
      {
        setcol_chnl_codefad7d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_view_details")){
        setbtn_view_details6a93d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_view_details6a93d?.isDisabled==null)
      {
        setbtn_view_details6a93d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6da1853f3cb6d1f61e4f970dda1f67ed");
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
        codeStates['grp_overall_employee_list'] = grp_overall_employee_list350f4,
        codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list350f4,
        codeStates['grp_overall_employee_list350f4'] = grp_overall_employee_list350f4Props,
        codeStates['setgrp_overall_employee_list350f4'] = setgrp_overall_employee_list350f4Props,
        codeStates['tbl_emp_sal_list'] = tbl_emp_sal_listf67ed,
        codeStates['settbl_emp_sal_list'] = settbl_emp_sal_listf67ed,
        codeStates['tbl_emp_sal_listf67ed'] = tbl_emp_sal_listf67edProps,
        codeStates['settbl_emp_sal_listf67ed'] = settbl_emp_sal_listf67edProps,
        codeStates['col_emp_eid'] = col_emp_eidb6da5,
        codeStates['setcol_emp_eid'] = setcol_emp_eidb6da5,
        codeStates['col_emp_mol_list'] = col_emp_mol_list8126c,
        codeStates['setcol_emp_mol_list'] = setcol_emp_mol_list8126c,
        codeStates['col_er_reg_id'] = col_er_reg_idec20e,
        codeStates['setcol_er_reg_id'] = setcol_er_reg_idec20e,
        codeStates['col_emp_mol_num'] = col_emp_mol_numa36ef,
        codeStates['setcol_emp_mol_num'] = setcol_emp_mol_numa36ef,
        codeStates['col_sal_mnth'] = col_sal_mnth274bd,
        codeStates['setcol_sal_mnth'] = setcol_sal_mnth274bd,
        codeStates['col_chnl_code'] = col_chnl_codefad7d,
        codeStates['setcol_chnl_code'] = setcol_chnl_codefad7d,
        codeStates['btn_view_details'] = btn_view_details6a93d,
        codeStates['setbtn_view_details'] = setbtn_view_details6a93d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_emp_sal_listf67edRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_emp_sal_listf67edRef.current?.setSearchParams();
    tbl_emp_sal_listf67edRef.current?.handleSearch({});
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
        !Array.isArray(tbl_emp_sal_listf67ed) &&
        Object.keys(tbl_emp_sal_listf67ed)?.length > 0
      ) {
        settbl_emp_sal_listf67ed({})
        settbl_emp_sal_listf67edProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_emp_sal_listf67edProps?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        <div className='flex flex-row shrink-0'>
          <Button
            view='action'
            pin={"circle-circle"}
            onClick={() => setOpen(true)}
            icon="FaSearch"
            iconDisplay={tbl_emp_sal_listf67edRef?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_emp_sal_listf67edRef?.current?.isHaveSearch&&(
            <Button 
              pin={"circle-circle"}
              onClick={() => handleClearSearch()}
              view='action'
              icon="FaTimes"
              iconDisplay="Icon only"
              className="p-2"
              />
            )}
        </div>
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '12 / 143',
      
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
      className={`flex flex-col overflow-auto rounded-md !text-white ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setenquiryempsalrpt_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_emp_sal_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_emp_sal_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Employee Salary List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_emp_sal_listf67edRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_emp_sal_list
