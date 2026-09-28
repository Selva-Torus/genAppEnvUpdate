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
import Textsource_mapping  from "./Textsource_mapping";
import Dropdownsource_name  from "./Dropdownsource_name";
import TextInputsource_field_path  from "./TextInputsource_field_path";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupsource_mapping_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_fieldmapcombo_v1Props, setdfd_fieldmapcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "source_mapping",
      "source_name",
      "source_field_path"
    ],
    "allowedGroups": [
      "canvas",
      "add_field_map_grp",
      "source_mapping_grp",
      "target_mapping_grp",
      "transformation_grp",
      "field_rules_grp",
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
  const {add_field_map_grp9e14b, setadd_field_map_grp9e14b}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp9e14bProps, setadd_field_map_grp9e14bProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45, setsource_mapping_grp4af45}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45Props, setsource_mapping_grp4af45Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mappingdbdb2, setsource_mappingdbdb2}= useContext(TotalContext) as TotalContextProps;
  const {source_name4a9d8, setsource_name4a9d8}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path2b239, setsource_field_path2b239}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0e, settransformation_grp78a0e}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0eProps, settransformation_grp78a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55, setfield_rules_grp65d55}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55Props, setfield_rules_grp65d55Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addintegrationfieldmap_v1, setaddintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationFieldMap:AFVK:v1',
    [user],
    'GroupSourceMappingGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bd6ca0e0415a4b3ebf1931107754af45");
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
    setsource_mapping_grp4af45Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("source_mapping")){
        setsource_mappingdbdb2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_mappingdbdb2?.isDisabled==null)
      {
        setsource_mappingdbdb2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_name")){
        setsource_name4a9d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_name4a9d8?.isDisabled==null)
      {
        setsource_name4a9d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_field_path")){
        setsource_field_path2b239((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_field_path2b239?.isDisabled==null)
      {
        setsource_field_path2b239((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_field_map_grp'] = add_field_map_grp9e14b,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp9e14b,
        codeStates['add_field_map_grp9e14b'] = add_field_map_grp9e14bProps,
        codeStates['setadd_field_map_grp9e14b'] = setadd_field_map_grp9e14bProps,
        codeStates['source_mapping_grp'] = source_mapping_grp4af45,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp4af45,
        codeStates['source_mapping_grp4af45'] = source_mapping_grp4af45Props,
        codeStates['setsource_mapping_grp4af45'] = setsource_mapping_grp4af45Props,
        codeStates['source_mapping'] = source_mappingdbdb2,
        codeStates['setsource_mapping'] = setsource_mappingdbdb2,
        codeStates['source_name'] = source_name4a9d8,
        codeStates['setsource_name'] = setsource_name4a9d8,
        codeStates['source_field_path'] = source_field_path2b239,
        codeStates['setsource_field_path'] = setsource_field_path2b239,
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['transformation_grp'] = transformation_grp78a0e,
        codeStates['settransformation_grp'] = settransformation_grp78a0e,
        codeStates['transformation_grp78a0e'] = transformation_grp78a0eProps,
        codeStates['settransformation_grp78a0e'] = settransformation_grp78a0eProps,
        codeStates['field_rules_grp'] = field_rules_grp65d55,
        codeStates['setfield_rules_grp'] = setfield_rules_grp65d55,
        codeStates['field_rules_grp65d55'] = field_rules_grp65d55Props,
        codeStates['setfield_rules_grp65d55'] = setfield_rules_grp65d55Props,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bd6ca0e0415a4b3ebf1931107754af45");
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
        codeStates['add_field_map_grp'] = add_field_map_grp9e14b,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp9e14b,
        codeStates['add_field_map_grp9e14b'] = add_field_map_grp9e14bProps,
        codeStates['setadd_field_map_grp9e14b'] = setadd_field_map_grp9e14bProps,
        codeStates['source_mapping_grp'] = source_mapping_grp4af45,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp4af45,
        codeStates['source_mapping_grp4af45'] = source_mapping_grp4af45Props,
        codeStates['setsource_mapping_grp4af45'] = setsource_mapping_grp4af45Props,
        codeStates['source_mapping'] = source_mappingdbdb2,
        codeStates['setsource_mapping'] = setsource_mappingdbdb2,
        codeStates['source_name'] = source_name4a9d8,
        codeStates['setsource_name'] = setsource_name4a9d8,
        codeStates['source_field_path'] = source_field_path2b239,
        codeStates['setsource_field_path'] = setsource_field_path2b239,
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['transformation_grp'] = transformation_grp78a0e,
        codeStates['settransformation_grp'] = settransformation_grp78a0e,
        codeStates['transformation_grp78a0e'] = transformation_grp78a0eProps,
        codeStates['settransformation_grp78a0e'] = settransformation_grp78a0eProps,
        codeStates['field_rules_grp'] = field_rules_grp65d55,
        codeStates['setfield_rules_grp'] = setfield_rules_grp65d55,
        codeStates['field_rules_grp65d55'] = field_rules_grp65d55Props,
        codeStates['setfield_rules_grp65d55'] = setfield_rules_grp65d55Props,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const source_mapping_grp4af45Ref = useRef<any>(null);
  const handleClearSearch = () => {
    source_mapping_grp4af45Ref.current?.setSearchParams();
    source_mapping_grp4af45Ref.current?.handleSearch({});
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
        !Array.isArray(source_mapping_grp4af45) &&
        Object.keys(source_mapping_grp4af45)?.length > 0
      ) {
        setsource_mapping_grp4af45({})
      }
    } else prevRefreshRef.current = true
  }, [source_mapping_grp4af45Props?.refresh])


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
        gridColumn: '1 / 13',
        gridRow: '3 / 31',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
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
          setaddintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"source_mapping_grp"}))
        }}
    >
          {allowedControls.includes("source_mapping") ?<Textsource_mapping   /* dbdb2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("source_name") ?<Dropdownsource_name   /* 4a9d8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("source_field_path") ?<TextInputsource_field_path   /* 2b239 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupsource_mapping_grp
