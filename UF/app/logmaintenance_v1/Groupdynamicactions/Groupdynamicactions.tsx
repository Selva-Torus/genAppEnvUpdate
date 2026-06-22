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
import Buttonbutton_cancel  from "./Buttonbutton_cancel";
import Buttonbutton_update  from "./Buttonbutton_update";
import Buttonschedule  from "./Buttonschedule";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "button_cancel",
      "button_update",
      "schedule"
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
      "button_cancel",
      "button_update",
      "schedule"
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
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  const {button_cancel02d05, setbutton_cancel02d05}= useContext(TotalContext) as TotalContextProps;
  const {button_update5cdad, setbutton_update5cdad}= useContext(TotalContext) as TotalContextProps;
  const {schedule133fb, setschedule133fb}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4edd4e4a1df7412b875b53d143d8672d");
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
    setdynamicactions8672dProps((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("button_cancel")){
        setbutton_cancel02d05({...button_cancel02d05,isDisabled:true});

    }else
    {
      if(button_cancel02d05?.isDisabled==null)
      {
        setbutton_cancel02d05({...button_cancel02d05,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_update")){
        setbutton_update5cdad({...button_update5cdad,isDisabled:true});

    }else
    {
      if(button_update5cdad?.isDisabled==null)
      {
        setbutton_update5cdad({...button_update5cdad,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("schedule")){
        setschedule133fb({...schedule133fb,isDisabled:true});

    }else
    {
      if(schedule133fb?.isDisabled==null)
      {
        setschedule133fb({...schedule133fb,isDisabled:false});
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
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
        codeStates['button_cancel'] = button_cancel02d05,
        codeStates['setbutton_cancel'] = setbutton_cancel02d05,
        codeStates['button_update'] = button_update5cdad,
        codeStates['setbutton_update'] = setbutton_update5cdad,
        codeStates['schedule'] = schedule133fb,
        codeStates['setschedule'] = setschedule133fb,

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
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
        codeStates['button_cancel'] = button_cancel02d05,
        codeStates['setbutton_cancel'] = setbutton_cancel02d05,
        codeStates['button_update'] = button_update5cdad,
        codeStates['setbutton_update'] = setbutton_update5cdad,
        codeStates['schedule'] = schedule133fb,
        codeStates['setschedule'] = setschedule133fb,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactions8672dRef = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactions8672dRef.current?.setSearchParams();
    dynamicactions8672dRef.current?.handleSearch({});
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
        setdynamicactions8672dProps((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicactions8672dProps((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {    
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,});
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(dynamicactions8672d) && Object.keys(dynamicactions8672d)?.length>0)
      {
        setdynamicactions8672d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [dynamicactions8672dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
        gridRow: '84 / 94',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
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
       onClick={()=>handleOnClick({}, 0)}
    >
        {        ((ruleData?.length>0 && "button_cancel" in ButtonGoRuleData)?ButtonGoRuleData["button_cancel"]:true) && 
          allowedControls.includes("button_cancel")  ?            <Buttonbutton_cancel tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "button_update" in ButtonGoRuleData)?ButtonGoRuleData["button_update"]:true) && 
          allowedControls.includes("button_update")  ?            <Buttonbutton_update tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "schedule" in ButtonGoRuleData)?ButtonGoRuleData["schedule"]:true) && 
          allowedControls.includes("schedule")  ?            <Buttonschedule tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamicactions
