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
import Tableintegration_field_map_table  from './Tableintegration_field_map_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupintegration_field_map_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationfieldmap_v1Props, setdfd_integrationfieldmap_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "field_map_id",
      "source_field_path",
      "target_entity",
      "target_attribute",
      "transform_rule",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "integration_field_map_grp",
      "integration_field_map_table"
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
  const {integration_field_map_grp96a61, setintegration_field_map_grp96a61}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_grp96a61Props, setintegration_field_map_grp96a61Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50, setintegration_field_map_tablebda50}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50Props, setintegration_field_map_tablebda50Props}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id6f47d, setfield_map_id6f47d}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path634e8, setsource_field_path634e8}= useContext(TotalContext) as TotalContextProps;
  const {target_entity002be, settarget_entity002be}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute8c6c9, settarget_attribute8c6c9}= useContext(TotalContext) as TotalContextProps;
  const {transform_rule318b0, settransform_rule318b0}= useContext(TotalContext) as TotalContextProps;
  const {is_active297f0, setis_active297f0}= useContext(TotalContext) as TotalContextProps;
  const {view_btnef5f3, setview_btnef5f3}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd38b9, setedit_btnd38b9}= useContext(TotalContext) as TotalContextProps;
  const {del_btn7b833, setdel_btn7b833}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {integrationfieldmap_v1, setintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1',
    [user],
    'GroupIntegrationFieldMapTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4c7299622f9e490b882f70683dbbda50");
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
    setintegration_field_map_tablebda50Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("field_map_id")){
        setfield_map_id6f47d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(field_map_id6f47d?.isDisabled==null)
      {
        setfield_map_id6f47d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_field_path")){
        setsource_field_path634e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_field_path634e8?.isDisabled==null)
      {
        setsource_field_path634e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_entity")){
        settarget_entity002be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_entity002be?.isDisabled==null)
      {
        settarget_entity002be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_attribute")){
        settarget_attribute8c6c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_attribute8c6c9?.isDisabled==null)
      {
        settarget_attribute8c6c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("transform_rule")){
        settransform_rule318b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(transform_rule318b0?.isDisabled==null)
      {
        settransform_rule318b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active297f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active297f0?.isDisabled==null)
      {
        setis_active297f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnef5f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btnef5f3?.isDisabled==null)
      {
        setview_btnef5f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnd38b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btnd38b9?.isDisabled==null)
      {
        setedit_btnd38b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn7b833((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn7b833?.isDisabled==null)
      {
        setdel_btn7b833((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4c7299622f9e490b882f70683dbbda50");
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
        codeStates['integration_field_map_grp'] = integration_field_map_grp96a61,
        codeStates['setintegration_field_map_grp'] = setintegration_field_map_grp96a61,
        codeStates['integration_field_map_grp96a61'] = integration_field_map_grp96a61Props,
        codeStates['setintegration_field_map_grp96a61'] = setintegration_field_map_grp96a61Props,
        codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
        codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
        codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
        codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,
        codeStates['field_map_id'] = field_map_id6f47d,
        codeStates['setfield_map_id'] = setfield_map_id6f47d,
        codeStates['source_field_path'] = source_field_path634e8,
        codeStates['setsource_field_path'] = setsource_field_path634e8,
        codeStates['target_entity'] = target_entity002be,
        codeStates['settarget_entity'] = settarget_entity002be,
        codeStates['target_attribute'] = target_attribute8c6c9,
        codeStates['settarget_attribute'] = settarget_attribute8c6c9,
        codeStates['transform_rule'] = transform_rule318b0,
        codeStates['settransform_rule'] = settransform_rule318b0,
        codeStates['is_active'] = is_active297f0,
        codeStates['setis_active'] = setis_active297f0,
        codeStates['view_btn'] = view_btnef5f3,
        codeStates['setview_btn'] = setview_btnef5f3,
        codeStates['edit_btn'] = edit_btnd38b9,
        codeStates['setedit_btn'] = setedit_btnd38b9,
        codeStates['del_btn'] = del_btn7b833,
        codeStates['setdel_btn'] = setdel_btn7b833,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const integration_field_map_tablebda50Ref = useRef<any>(null);
  const handleClearSearch = () => {
    integration_field_map_tablebda50Ref.current?.setSearchParams();
    integration_field_map_tablebda50Ref.current?.handleSearch({});
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
        !Array.isArray(integration_field_map_tablebda50) &&
        Object.keys(integration_field_map_tablebda50)?.length > 0
      ) {
        setintegration_field_map_tablebda50({})
      }
    } else prevRefreshRef.current = true
  }, [integration_field_map_tablebda50Props?.refresh])


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
        gridColumn: '1 / 25',
        gridRow: '9 / 136',
      
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
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"integration_field_map_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableintegration_field_map_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={integration_field_map_tablebda50Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupintegration_field_map_table
