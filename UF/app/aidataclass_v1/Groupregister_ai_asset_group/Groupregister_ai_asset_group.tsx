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
import Groupasset_identity_group  from "../Groupasset_identity_group/Groupasset_identity_group";
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
import Textasset_data_class_id  from "./Textasset_data_class_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupregister_ai_asset_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_data_class_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "asset_identity_group",
      "dynamicactions"
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
  const {overall_ai_asset_registryb99cd, setoverall_ai_asset_registryb99cd}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryb99cdProps, setoverall_ai_asset_registryb99cdProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907, setregister_ai_asset_group01907}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907Props, setregister_ai_asset_group01907Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_idda28f, setasset_data_class_idda28f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aidataclass_v1, setaidataclass_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIDataClass:AFVK:v1',
    [user],
    'GroupRegisterAiAssetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "54b8e380c73897a395ca65dc70401907");
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
    setregister_ai_asset_group01907Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_identity_group")){
        setasset_identity_groupfe421((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_identity_groupfe421?.isDisabled==null)
      {
        setasset_identity_groupfe421((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_data_class_id")){
        setasset_data_class_idda28f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_data_class_idda28f?.isDisabled==null)
      {
        setasset_data_class_idda28f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactions92938((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactions92938?.isDisabled==null)
      {
        setdynamicactions92938((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryb99cd,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryb99cd,
        codeStates['overall_ai_asset_registryb99cd'] = overall_ai_asset_registryb99cdProps,
        codeStates['setoverall_ai_asset_registryb99cd'] = setoverall_ai_asset_registryb99cdProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_group01907,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group01907,
        codeStates['register_ai_asset_group01907'] = register_ai_asset_group01907Props,
        codeStates['setregister_ai_asset_group01907'] = setregister_ai_asset_group01907Props,
        codeStates['asset_identity_group'] = asset_identity_groupfe421,
        codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
        codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
        codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
        codeStates['asset_data_class_id'] = asset_data_class_idda28f,
        codeStates['setasset_data_class_id'] = setasset_data_class_idda28f,
        codeStates['dynamicactions'] = dynamicactions92938,
        codeStates['setdynamicactions'] = setdynamicactions92938,
        codeStates['dynamicactions92938'] = dynamicactions92938Props,
        codeStates['setdynamicactions92938'] = setdynamicactions92938Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "54b8e380c73897a395ca65dc70401907");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryb99cd,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryb99cd,
        codeStates['overall_ai_asset_registryb99cd'] = overall_ai_asset_registryb99cdProps,
        codeStates['setoverall_ai_asset_registryb99cd'] = setoverall_ai_asset_registryb99cdProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_group01907,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group01907,
        codeStates['register_ai_asset_group01907'] = register_ai_asset_group01907Props,
        codeStates['setregister_ai_asset_group01907'] = setregister_ai_asset_group01907Props,
        codeStates['asset_identity_group'] = asset_identity_groupfe421,
        codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
        codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
        codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
        codeStates['asset_data_class_id'] = asset_data_class_idda28f,
        codeStates['setasset_data_class_id'] = setasset_data_class_idda28f,
        codeStates['dynamicactions'] = dynamicactions92938,
        codeStates['setdynamicactions'] = setdynamicactions92938,
        codeStates['dynamicactions92938'] = dynamicactions92938Props,
        codeStates['setdynamicactions92938'] = setdynamicactions92938Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const register_ai_asset_group01907Ref = useRef<any>(null);
  const handleClearSearch = () => {
    register_ai_asset_group01907Ref.current?.setSearchParams();
    register_ai_asset_group01907Ref.current?.handleSearch({});
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
        !Array.isArray(register_ai_asset_group01907) &&
        Object.keys(register_ai_asset_group01907)?.length > 0
      ) {
        setregister_ai_asset_group01907({})
      }
    } else prevRefreshRef.current = true
  }, [register_ai_asset_group01907Props?.refresh])


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
        gridRow: '1 / 62',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '9px',
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
          setaidataclass_v1((pre:any)=>({...pre,_selectedGroup_:"register_ai_asset_group"}))
        }}
    >
        {allowedComponent.includes("asset_identity_group")  &&<Groupasset_identity_group  
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
          {allowedControls.includes("asset_data_class_id") ?<Textasset_data_class_id   /* da28f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupregister_ai_asset_group
