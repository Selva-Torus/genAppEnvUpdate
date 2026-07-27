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
import Groupposition_information_group  from "../Groupposition_information_group/Groupposition_information_group";
import Groupcompensation_benfits_group  from "../Groupcompensation_benfits_group/Groupcompensation_benfits_group";
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
import DocumentUploadPaneldocumentuploadpanel  from "./DocumentUploadPaneldocumentuploadpanel";
import Textposition_id  from "./Textposition_id";
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
  const {dfd_employmenttypecombo_v1Props, setdfd_employmenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vacancystatuscombo_v1Props, setdfd_vacancystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradenamecombo_v1Props, setdfd_gradenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "position_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
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
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel5ec2d, setdocumentuploadpanel5ec2d}= useContext(TotalContext) as TotalContextProps;
  const {position_id479a8, setposition_id479a8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewemployeejobposition_v1, setviewemployeejobposition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "84c58b9954324ef9028d45eee392c693");
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
    setoverall_group2c693Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("position_information_group")){
        setposition_information_group67802((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_information_group67802?.isDisabled==null)
      {
        setposition_information_group67802((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compensation_benfits_group")){
        setcompensation_benfits_group0d8fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(compensation_benfits_group0d8fe?.isDisabled==null)
      {
        setcompensation_benfits_group0d8fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("documentuploadpanel")){
        setdocumentuploadpanel5ec2d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(documentuploadpanel5ec2d?.isDisabled==null)
      {
        setdocumentuploadpanel5ec2d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_id")){
        setposition_id479a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_id479a8?.isDisabled==null)
      {
        setposition_id479a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['documentuploadpanel'] = documentuploadpanel5ec2d,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel5ec2d,
        codeStates['position_id'] = position_id479a8,
        codeStates['setposition_id'] = setposition_id479a8,

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
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['documentuploadpanel'] = documentuploadpanel5ec2d,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel5ec2d,
        codeStates['position_id'] = position_id479a8,
        codeStates['setposition_id'] = setposition_id479a8,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_group2c693Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_group2c693Ref.current?.setSearchParams();
    overall_group2c693Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_group2c693) && Object.keys(overall_group2c693)?.length>0)
      {
        setoverall_group2c693({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_group2c693Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 159',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8',
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
          setviewemployeejobposition_v1((pre:any)=>({...pre,_selectedGroup_:"overall_group"}))
        }}
    >
        {allowedComponent.includes("position_information_group")  &&<Groupposition_information_group  
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
        {allowedControls.includes("documentuploadpanel") ?<DocumentUploadPaneldocumentuploadpanel   /* 5ec2d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_id") ?<Textposition_id   /* 479a8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupoverall_group
