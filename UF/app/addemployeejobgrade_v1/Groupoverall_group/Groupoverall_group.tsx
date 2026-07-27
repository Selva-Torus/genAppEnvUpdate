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
import Groupgrade_information_group  from "../Groupgrade_information_group/Groupgrade_information_group";
import Groupcompensation_benfits_group  from "../Groupcompensation_benfits_group/Groupcompensation_benfits_group";
import Grouphr_policies_group  from "../Grouphr_policies_group/Grouphr_policies_group";
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
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
import Textgrade_title  from "./Textgrade_title";
import Textgrade_des  from "./Textgrade_des";
import Textgrade_id  from "./Textgrade_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_appraisalcyclecombo_v1Props, setdfd_appraisalcyclecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "grade_title",
      "grade_des",
      "grade_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group",
      "dynamicactions"
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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_title7a754, setgrade_title7a754}= useContext(TotalContext) as TotalContextProps;
  const {grade_desefd9c, setgrade_desefd9c}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_iddb511, setgrade_iddb511}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addemployeejobgrade_v1, setaddemployeejobgrade_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobGrade:AFVK:v1',
    [user],
    'GroupOverallGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bacef7ba46d72ac20fb9fe10a0bfc238");
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
    setoverall_groupfc238Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grade_title")){
        setgrade_title7a754((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_title7a754?.isDisabled==null)
      {
        setgrade_title7a754((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_des")){
        setgrade_desefd9c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_desefd9c?.isDisabled==null)
      {
        setgrade_desefd9c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_information_group")){
        setgrade_information_groupddd50((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_information_groupddd50?.isDisabled==null)
      {
        setgrade_information_groupddd50((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compensation_benfits_group")){
        setcompensation_benfits_group49b64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(compensation_benfits_group49b64?.isDisabled==null)
      {
        setcompensation_benfits_group49b64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hr_policies_group")){
        sethr_policies_group0f880((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(hr_policies_group0f880?.isDisabled==null)
      {
        sethr_policies_group0f880((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactions7e8c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dynamicactions7e8c7?.isDisabled==null)
      {
        setdynamicactions7e8c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_id")){
        setgrade_iddb511((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_iddb511?.isDisabled==null)
      {
        setgrade_iddb511((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_title'] = grade_title7a754,
        codeStates['setgrade_title'] = setgrade_title7a754,
        codeStates['grade_des'] = grade_desefd9c,
        codeStates['setgrade_des'] = setgrade_desefd9c,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
        codeStates['grade_id'] = grade_iddb511,
        codeStates['setgrade_id'] = setgrade_iddb511,

    codeExecution(code,codeStates);
    } 
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
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_title'] = grade_title7a754,
        codeStates['setgrade_title'] = setgrade_title7a754,
        codeStates['grade_des'] = grade_desefd9c,
        codeStates['setgrade_des'] = setgrade_desefd9c,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
        codeStates['grade_id'] = grade_iddb511,
        codeStates['setgrade_id'] = setgrade_iddb511,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_groupfc238Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_groupfc238Ref.current?.setSearchParams();
    overall_groupfc238Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_groupfc238) && Object.keys(overall_groupfc238)?.length>0)
      {
        setoverall_groupfc238({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_groupfc238Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 121',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8',
        backgroundColor:'#f5f7fb',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddemployeejobgrade_v1((pre:any)=>({...pre,_selectedGroup_:"overall_group"}))
        }}
    >
        {allowedComponent.includes("grade_information_group")  &&<Groupgrade_information_group  
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
        {allowedComponent.includes("compensation_benfits_group")  &&<Groupcompensation_benfits_group  
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
        {allowedComponent.includes("hr_policies_group")  &&<Grouphr_policies_group  
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
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
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
          {allowedControls.includes("grade_title") ?<Textgrade_title   /* 7a754 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_des") ?<Textgrade_des   /* efd9c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_id") ?<Textgrade_id   /* db511 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupoverall_group
