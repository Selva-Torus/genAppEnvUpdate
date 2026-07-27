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
import Tabletotal_employees_table  from './Tabletotal_employees_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_employees_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "grade_id",
      "grade_code",
      "grade_name",
      "grade_level",
      "salary_range",
      "promotion_eligible",
      "overtime_eligible",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "ad_doc"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
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
  const {total_employees_groupf0de6, settotal_employees_groupf0de6}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_groupf0de6Props, settotal_employees_groupf0de6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094, settotal_employees_table9c094}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094Props, settotal_employees_table9c094Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_id09291, setgrade_id09291}= useContext(TotalContext) as TotalContextProps;
  const {grade_code1f507, setgrade_code1f507}= useContext(TotalContext) as TotalContextProps;
  const {grade_named440c, setgrade_named440c}= useContext(TotalContext) as TotalContextProps;
  const {grade_leveld01e1, setgrade_leveld01e1}= useContext(TotalContext) as TotalContextProps;
  const {salary_range7d11a, setsalary_range7d11a}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligiblec98f8, setpromotion_eligiblec98f8}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligibleff5a4, setovertime_eligibleff5a4}= useContext(TotalContext) as TotalContextProps;
  const {view_btn40a48, setview_btn40a48}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn1d2da, setedit_btn1d2da}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn88b28, setdelete_btn88b28}= useContext(TotalContext) as TotalContextProps;
  const {ad_doc396b4, setad_doc396b4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobgrades_v1, setemployeejobgrades_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1',
    [user],
    'GroupTotalEmployeesTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ff40997343dd428ae50a99eca449c094");
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
    settotal_employees_table9c094Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grade_id")){
        setgrade_id09291((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_id09291?.isDisabled==null)
      {
        setgrade_id09291((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_code")){
        setgrade_code1f507((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_code1f507?.isDisabled==null)
      {
        setgrade_code1f507((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_named440c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_named440c?.isDisabled==null)
      {
        setgrade_named440c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_level")){
        setgrade_leveld01e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_leveld01e1?.isDisabled==null)
      {
        setgrade_leveld01e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range")){
        setsalary_range7d11a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range7d11a?.isDisabled==null)
      {
        setsalary_range7d11a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("promotion_eligible")){
        setpromotion_eligiblec98f8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(promotion_eligiblec98f8?.isDisabled==null)
      {
        setpromotion_eligiblec98f8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("overtime_eligible")){
        setovertime_eligibleff5a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(overtime_eligibleff5a4?.isDisabled==null)
      {
        setovertime_eligibleff5a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn40a48((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btn40a48?.isDisabled==null)
      {
        setview_btn40a48((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn1d2da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btn1d2da?.isDisabled==null)
      {
        setedit_btn1d2da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn88b28((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btn88b28?.isDisabled==null)
      {
        setdelete_btn88b28((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ad_doc")){
        setad_doc396b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ad_doc396b4?.isDisabled==null)
      {
        setad_doc396b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['total_employees_group'] = total_employees_groupf0de6,
        codeStates['settotal_employees_group'] = settotal_employees_groupf0de6,
        codeStates['total_employees_groupf0de6'] = total_employees_groupf0de6Props,
        codeStates['settotal_employees_groupf0de6'] = settotal_employees_groupf0de6Props,
        codeStates['total_employees_table'] = total_employees_table9c094,
        codeStates['settotal_employees_table'] = settotal_employees_table9c094,
        codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
        codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,
        codeStates['grade_id'] = grade_id09291,
        codeStates['setgrade_id'] = setgrade_id09291,
        codeStates['grade_code'] = grade_code1f507,
        codeStates['setgrade_code'] = setgrade_code1f507,
        codeStates['grade_name'] = grade_named440c,
        codeStates['setgrade_name'] = setgrade_named440c,
        codeStates['grade_level'] = grade_leveld01e1,
        codeStates['setgrade_level'] = setgrade_leveld01e1,
        codeStates['salary_range'] = salary_range7d11a,
        codeStates['setsalary_range'] = setsalary_range7d11a,
        codeStates['promotion_eligible'] = promotion_eligiblec98f8,
        codeStates['setpromotion_eligible'] = setpromotion_eligiblec98f8,
        codeStates['overtime_eligible'] = overtime_eligibleff5a4,
        codeStates['setovertime_eligible'] = setovertime_eligibleff5a4,
        codeStates['view_btn'] = view_btn40a48,
        codeStates['setview_btn'] = setview_btn40a48,
        codeStates['edit_btn'] = edit_btn1d2da,
        codeStates['setedit_btn'] = setedit_btn1d2da,
        codeStates['delete_btn'] = delete_btn88b28,
        codeStates['setdelete_btn'] = setdelete_btn88b28,
        codeStates['ad_doc'] = ad_doc396b4,
        codeStates['setad_doc'] = setad_doc396b4,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_table9c094Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_table9c094Ref.current?.setSearchParams();
    total_employees_table9c094Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_table9c094) && Object.keys(total_employees_table9c094)?.length>0)
      {
        settotal_employees_table9c094({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_table9c094Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '13 / 147',
      
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
          setemployeejobgrades_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletotal_employees_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={total_employees_table9c094Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptotal_employees_table
