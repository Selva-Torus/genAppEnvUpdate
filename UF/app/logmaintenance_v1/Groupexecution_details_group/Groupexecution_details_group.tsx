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
import Textexecution_details_text  from "./Textexecution_details_text";
import TextInputperformed_by  from "./TextInputperformed_by";
import Dropdownvendor_name  from "./Dropdownvendor_name";
import TextInputvendor_reference  from "./TextInputvendor_reference";
import TextInputdowntime_hours  from "./TextInputdowntime_hours";
import TextInputcost  from "./TextInputcost";
import TextAreadescription  from "./TextAreadescription";
import Checkboxmaintenance_checklist  from "./Checkboxmaintenance_checklist";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupexecution_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_maintenancetypecombo_v1Props, setdfd_maintenancetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "execution_details_text",
      "performed_by",
      "vendor_name",
      "vendor_reference",
      "downtime_hours",
      "cost",
      "description",
      "maintenance_checklist"
    ],
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "execution_details_text",
      "performed_by",
      "vendor_name",
      "vendor_reference",
      "downtime_hours",
      "cost",
      "description",
      "maintenance_checklist"
    ],
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
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
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_text71309, setexecution_details_text71309}= useContext(TotalContext) as TotalContextProps;
  const {performed_bycb4dc, setperformed_bycb4dc}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name17b17, setvendor_name17b17}= useContext(TotalContext) as TotalContextProps;
  const {vendor_referencefa982, setvendor_referencefa982}= useContext(TotalContext) as TotalContextProps;
  const {downtime_hours721c7, setdowntime_hours721c7}= useContext(TotalContext) as TotalContextProps;
  const {cost35190, setcost35190}= useContext(TotalContext) as TotalContextProps;
  const {descriptioneaa55, setdescriptioneaa55}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_checklist024ed, setmaintenance_checklist024ed}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {logmaintenance_v1, setlogmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1',
    [user],
    'GroupExecutionDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6f620f2c13924269ac67da12e7f591cd");
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
    setexecution_details_group591cdProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("execution_details_text")){
        setexecution_details_text71309({...execution_details_text71309,isDisabled:true});

    }else
    {
      if(execution_details_text71309?.isDisabled==null)
      {
        setexecution_details_text71309({...execution_details_text71309,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("performed_by")){
        setperformed_bycb4dc({...performed_bycb4dc,isDisabled:true});

    }else
    {
      if(performed_bycb4dc?.isDisabled==null)
      {
        setperformed_bycb4dc({...performed_bycb4dc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_name17b17({...vendor_name17b17,isDisabled:true});

    }else
    {
      if(vendor_name17b17?.isDisabled==null)
      {
        setvendor_name17b17({...vendor_name17b17,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_reference")){
        setvendor_referencefa982({...vendor_referencefa982,isDisabled:true});

    }else
    {
      if(vendor_referencefa982?.isDisabled==null)
      {
        setvendor_referencefa982({...vendor_referencefa982,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("downtime_hours")){
        setdowntime_hours721c7({...downtime_hours721c7,isDisabled:true});

    }else
    {
      if(downtime_hours721c7?.isDisabled==null)
      {
        setdowntime_hours721c7({...downtime_hours721c7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cost")){
        setcost35190({...cost35190,isDisabled:true});

    }else
    {
      if(cost35190?.isDisabled==null)
      {
        setcost35190({...cost35190,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptioneaa55({...descriptioneaa55,isDisabled:true});

    }else
    {
      if(descriptioneaa55?.isDisabled==null)
      {
        setdescriptioneaa55({...descriptioneaa55,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maintenance_checklist")){
        setmaintenance_checklist024ed({...maintenance_checklist024ed,isDisabled:true});

    }else
    {
      if(maintenance_checklist024ed?.isDisabled==null)
      {
        setmaintenance_checklist024ed({...maintenance_checklist024ed,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['execution_details_text'] = execution_details_text71309,
        codeStates['setexecution_details_text'] = setexecution_details_text71309,
        codeStates['performed_by'] = performed_bycb4dc,
        codeStates['setperformed_by'] = setperformed_bycb4dc,
        codeStates['vendor_name'] = vendor_name17b17,
        codeStates['setvendor_name'] = setvendor_name17b17,
        codeStates['vendor_reference'] = vendor_referencefa982,
        codeStates['setvendor_reference'] = setvendor_referencefa982,
        codeStates['downtime_hours'] = downtime_hours721c7,
        codeStates['setdowntime_hours'] = setdowntime_hours721c7,
        codeStates['cost'] = cost35190,
        codeStates['setcost'] = setcost35190,
        codeStates['description'] = descriptioneaa55,
        codeStates['setdescription'] = setdescriptioneaa55,
        codeStates['maintenance_checklist'] = maintenance_checklist024ed,
        codeStates['setmaintenance_checklist'] = setmaintenance_checklist024ed,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,

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
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['execution_details_text'] = execution_details_text71309,
        codeStates['setexecution_details_text'] = setexecution_details_text71309,
        codeStates['performed_by'] = performed_bycb4dc,
        codeStates['setperformed_by'] = setperformed_bycb4dc,
        codeStates['vendor_name'] = vendor_name17b17,
        codeStates['setvendor_name'] = setvendor_name17b17,
        codeStates['vendor_reference'] = vendor_referencefa982,
        codeStates['setvendor_reference'] = setvendor_referencefa982,
        codeStates['downtime_hours'] = downtime_hours721c7,
        codeStates['setdowntime_hours'] = setdowntime_hours721c7,
        codeStates['cost'] = cost35190,
        codeStates['setcost'] = setcost35190,
        codeStates['description'] = descriptioneaa55,
        codeStates['setdescription'] = setdescriptioneaa55,
        codeStates['maintenance_checklist'] = maintenance_checklist024ed,
        codeStates['setmaintenance_checklist'] = setmaintenance_checklist024ed,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const execution_details_group591cdRef = useRef<any>(null);
  const handleClearSearch = () => {
    execution_details_group591cdRef.current?.setSearchParams();
    execution_details_group591cdRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(execution_details_group591cd) && Object.keys(execution_details_group591cd)?.length>0)
      {
        setexecution_details_group591cd({})
      }
    }else 
      prevRefreshRef.current= true
  }, [execution_details_group591cdProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '39 / 83',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("execution_details_text") ?<Textexecution_details_text   /* 71309 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("performed_by") ?<TextInputperformed_by   /* cb4dc */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vendor_name") ?<Dropdownvendor_name   /* 17b17 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("vendor_reference") ?<TextInputvendor_reference   /* fa982 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("downtime_hours") ?<TextInputdowntime_hours   /* 721c7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cost") ?<TextInputcost   /* 35190 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextAreadescription   /* eaa55 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("maintenance_checklist") ?<Checkboxmaintenance_checklist   /* 024ed */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupexecution_details_group
