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
import Groupaccess_req__group  from "../Groupaccess_req__group/Groupaccess_req__group";
import Groupvalid_group  from "../Groupvalid_group/Groupvalid_group";
import Groupbusiness_just__group  from "../Groupbusiness_just__group/Groupbusiness_just__group";
import Groupaddt__group  from "../Groupaddt__group/Groupaddt__group";
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
import Textcycle_id  from "./Textcycle_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupnew_access_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addperformancecyclemodify_v1Props, setdfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cycletypecombo_v1Props, setdfd_cycletypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewfrequencycombo_v1Props, setdfd_reviewfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "cycle_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
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
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id6db0f, setcycle_id6db0f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newperformancecycle_v1, setnewperformancecycle_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceCycle:AFVK:v1',
    [user],
    'GroupNewAccessGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2c07e1aa8d9be2ddeb132496d85e9bce");
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
    setnew_access_groupe9bceProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("access_req__group")){
        setaccess_req__groupbdb89((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req__groupbdb89?.isDisabled==null)
      {
        setaccess_req__groupbdb89((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_group")){
        setvalid_group071c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(valid_group071c1?.isDisabled==null)
      {
        setvalid_group071c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_just__group")){
        setbusiness_just__group04cc1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(business_just__group04cc1?.isDisabled==null)
      {
        setbusiness_just__group04cc1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("addt__group")){
        setaddt__group284f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(addt__group284f6?.isDisabled==null)
      {
        setaddt__group284f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_id")){
        setcycle_id6db0f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_id6db0f?.isDisabled==null)
      {
        setcycle_id6db0f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactionsd94d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dynamicactionsd94d3?.isDisabled==null)
      {
        setdynamicactionsd94d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['cycle_id'] = cycle_id6db0f,
        codeStates['setcycle_id'] = setcycle_id6db0f,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,

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
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['cycle_id'] = cycle_id6db0f,
        codeStates['setcycle_id'] = setcycle_id6db0f,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const new_access_groupe9bceRef = useRef<any>(null);
  const handleClearSearch = () => {
    new_access_groupe9bceRef.current?.setSearchParams();
    new_access_groupe9bceRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(new_access_groupe9bce) && Object.keys(new_access_groupe9bce)?.length>0)
      {
        setnew_access_groupe9bce({})
      }
    }else 
      prevRefreshRef.current= true
  }, [new_access_groupe9bceProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 81',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
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
          setnewperformancecycle_v1((pre:any)=>({...pre,_selectedGroup_:"new_access_group"}))
        }}
    >
        {allowedComponent.includes("access_req__group")  &&<Groupaccess_req__group  
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
        {allowedComponent.includes("valid_group")  &&<Groupvalid_group  
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
        {allowedComponent.includes("business_just__group")  &&<Groupbusiness_just__group  
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
        {allowedComponent.includes("addt__group")  &&<Groupaddt__group  
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
          {allowedControls.includes("cycle_id") ?<Textcycle_id   /* 6db0f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupnew_access_group
