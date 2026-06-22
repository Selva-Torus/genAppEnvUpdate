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
import Groupassignment_information_group  from "../Groupassignment_information_group/Groupassignment_information_group";
import Groupassignment_details_group  from "../Groupassignment_details_group/Groupassignment_details_group";
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
import Textassign_id  from "./Textassign_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassign_asset_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "assign_id"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "assign_id"
    ],
    "allowedGroups": [
      "canvas",
      "assign_asset_group",
      "assignment_information_group",
      "assignment_details_group"
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
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assign_idb53db, setassign_idb53db}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assignassetview_v1, setassignassetview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetView:AFVK:v1',
    [user],
    'GroupAssignAssetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7a981ef7401cb7d9f959dcc1b9bb4f2d");
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
    setassign_asset_groupb4f2dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assignment_information_group")){
        setassignment_information_groupc96e9({...assignment_information_groupc96e9,isDisabled:true});

    }else
    {
      if(assignment_information_groupc96e9?.isDisabled==null)
      {
        setassignment_information_groupc96e9({...assignment_information_groupc96e9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignment_details_group")){
        setassignment_details_group136e4({...assignment_details_group136e4,isDisabled:true});

    }else
    {
      if(assignment_details_group136e4?.isDisabled==null)
      {
        setassignment_details_group136e4({...assignment_details_group136e4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign_id")){
        setassign_idb53db({...assign_idb53db,isDisabled:true});

    }else
    {
      if(assign_idb53db?.isDisabled==null)
      {
        setassign_idb53db({...assign_idb53db,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assign_id'] = assign_idb53db,
        codeStates['setassign_id'] = setassign_idb53db,

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
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assign_id'] = assign_idb53db,
        codeStates['setassign_id'] = setassign_idb53db,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assign_asset_groupb4f2dRef = useRef<any>(null);
  const handleClearSearch = () => {
    assign_asset_groupb4f2dRef.current?.setSearchParams();
    assign_asset_groupb4f2dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(assign_asset_groupb4f2d) && Object.keys(assign_asset_groupb4f2d)?.length>0)
      {
        setassign_asset_groupb4f2d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [assign_asset_groupb4f2dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 104',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("assignment_information_group")  &&<Groupassignment_information_group  
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
        {allowedComponent.includes("assignment_details_group")  &&<Groupassignment_details_group  
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
          {allowedControls.includes("assign_id") ?<Textassign_id   /* b53db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassign_asset_group
