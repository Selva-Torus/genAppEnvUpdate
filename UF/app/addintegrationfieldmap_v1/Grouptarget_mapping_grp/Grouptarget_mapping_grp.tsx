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
import Texttarget_mapping_text  from "./Texttarget_mapping_text";
import TextInputtarget_entity  from "./TextInputtarget_entity";
import TextInputtarget_attribute  from "./TextInputtarget_attribute";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptarget_mapping_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
      "target_mapping_text",
      "target_entity",
      "target_attribute"
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
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_textb260c, settarget_mapping_textb260c}= useContext(TotalContext) as TotalContextProps;
  const {target_entityd367b, settarget_entityd367b}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute6aff3, settarget_attribute6aff3}= useContext(TotalContext) as TotalContextProps;
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
    'GroupTargetMappingGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3f5981c4d4b748dab19872bf5dea2fc8");
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
    settarget_mapping_grpa2fc8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("target_mapping_text")){
        settarget_mapping_textb260c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_mapping_textb260c?.isDisabled==null)
      {
        settarget_mapping_textb260c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_entity")){
        settarget_entityd367b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_entityd367b?.isDisabled==null)
      {
        settarget_entityd367b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_attribute")){
        settarget_attribute6aff3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_attribute6aff3?.isDisabled==null)
      {
        settarget_attribute6aff3((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['target_mapping_text'] = target_mapping_textb260c,
        codeStates['settarget_mapping_text'] = settarget_mapping_textb260c,
        codeStates['target_entity'] = target_entityd367b,
        codeStates['settarget_entity'] = settarget_entityd367b,
        codeStates['target_attribute'] = target_attribute6aff3,
        codeStates['settarget_attribute'] = settarget_attribute6aff3,
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3f5981c4d4b748dab19872bf5dea2fc8");
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
        codeStates['target_mapping_grp'] = target_mapping_grpa2fc8,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grpa2fc8,
        codeStates['target_mapping_grpa2fc8'] = target_mapping_grpa2fc8Props,
        codeStates['settarget_mapping_grpa2fc8'] = settarget_mapping_grpa2fc8Props,
        codeStates['target_mapping_text'] = target_mapping_textb260c,
        codeStates['settarget_mapping_text'] = settarget_mapping_textb260c,
        codeStates['target_entity'] = target_entityd367b,
        codeStates['settarget_entity'] = settarget_entityd367b,
        codeStates['target_attribute'] = target_attribute6aff3,
        codeStates['settarget_attribute'] = settarget_attribute6aff3,
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


  const target_mapping_grpa2fc8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    target_mapping_grpa2fc8Ref.current?.setSearchParams();
    target_mapping_grpa2fc8Ref.current?.handleSearch({});
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
        !Array.isArray(target_mapping_grpa2fc8) &&
        Object.keys(target_mapping_grpa2fc8)?.length > 0
      ) {
        settarget_mapping_grpa2fc8({})
      }
    } else prevRefreshRef.current = true
  }, [target_mapping_grpa2fc8Props?.refresh])


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
        gridColumn: '13 / 25',
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
          setaddintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"target_mapping_grp"}))
        }}
    >
          {allowedControls.includes("target_mapping_text") ?<Texttarget_mapping_text   /* b260c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("target_entity") ?<TextInputtarget_entity   /* d367b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("target_attribute") ?<TextInputtarget_attribute   /* 6aff3 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptarget_mapping_grp
