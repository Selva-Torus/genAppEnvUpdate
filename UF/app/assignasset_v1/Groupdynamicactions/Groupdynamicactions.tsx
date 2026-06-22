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
import Buttonassign  from "./Buttonassign";
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
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assignmentstatuscombo_v1Props, setdfd_assignmentstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_conditionatreturncombo_v1Props, setdfd_conditionatreturncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_approvalstatuscombo_v1Props, setdfd_approvalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "assign"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "button_cancel",
      "button_update",
      "assign"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group",
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
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  const {button_cancel83d84, setbutton_cancel83d84}= useContext(TotalContext) as TotalContextProps;
  const {button_updatedc4e0, setbutton_updatedc4e0}= useContext(TotalContext) as TotalContextProps;
  const {assign090a4, setassign090a4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assignasset_v1, setassignasset_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAsset:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fc36e97cb2554510a1b8d282b5a956ba");
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
    setdynamicactions956baProps((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("button_cancel")){
        setbutton_cancel83d84({...button_cancel83d84,isDisabled:true});

    }else
    {
      if(button_cancel83d84?.isDisabled==null)
      {
        setbutton_cancel83d84({...button_cancel83d84,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_update")){
        setbutton_updatedc4e0({...button_updatedc4e0,isDisabled:true});

    }else
    {
      if(button_updatedc4e0?.isDisabled==null)
      {
        setbutton_updatedc4e0({...button_updatedc4e0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign")){
        setassign090a4({...assign090a4,isDisabled:true});

    }else
    {
      if(assign090a4?.isDisabled==null)
      {
        setassign090a4({...assign090a4,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
        codeStates['button_cancel'] = button_cancel83d84,
        codeStates['setbutton_cancel'] = setbutton_cancel83d84,
        codeStates['button_update'] = button_updatedc4e0,
        codeStates['setbutton_update'] = setbutton_updatedc4e0,
        codeStates['assign'] = assign090a4,
        codeStates['setassign'] = setassign090a4,

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
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
        codeStates['button_cancel'] = button_cancel83d84,
        codeStates['setbutton_cancel'] = setbutton_cancel83d84,
        codeStates['button_update'] = button_updatedc4e0,
        codeStates['setbutton_update'] = setbutton_updatedc4e0,
        codeStates['assign'] = assign090a4,
        codeStates['setassign'] = setassign090a4,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactions956baRef = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactions956baRef.current?.setSearchParams();
    dynamicactions956baRef.current?.handleSearch({});
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
        setdynamicactions956baProps((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicactions956baProps((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {    
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,});
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(dynamicactions956ba) && Object.keys(dynamicactions956ba)?.length>0)
      {
        setdynamicactions956ba({})
      }
    }else 
      prevRefreshRef.current= true
  }, [dynamicactions956baProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '11 / 25',
        gridRow: '109 / 117',
      
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
        {        ((ruleData?.length>0 && "assign" in ButtonGoRuleData)?ButtonGoRuleData["assign"]:true) && 
          allowedControls.includes("assign")  ?            <Buttonassign tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamicactions
