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
  const securityData:any={};
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
  const {add_field_map_grp74a39, setadd_field_map_grp74a39}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp74a39Props, setadd_field_map_grp74a39Props}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571, setsource_mapping_grp99571}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp99571Props, setsource_mapping_grp99571Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3, settarget_mapping_grp841a3}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grp841a3Props, settarget_mapping_grp841a3Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_text48064, settarget_mapping_text48064}= useContext(TotalContext) as TotalContextProps;
  const {target_entity5199b, settarget_entity5199b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributebbe60, settarget_attributebbe60}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9a, settransformation_grp75a9a}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp75a9aProps, settransformation_grp75a9aProps}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2f, setfield_rules_grp2cb2f}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp2cb2fProps, setfield_rules_grp2cb2fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewintegrationfieldmap_v1, setviewintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationFieldMap:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6921e26df034e1baf00d02ea803841a3");
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
    settarget_mapping_grp841a3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("target_mapping_text")){
        settarget_mapping_text48064((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_mapping_text48064?.isDisabled==null)
      {
        settarget_mapping_text48064((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_entity")){
        settarget_entity5199b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_entity5199b?.isDisabled==null)
      {
        settarget_entity5199b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_attribute")){
        settarget_attributebbe60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_attributebbe60?.isDisabled==null)
      {
        settarget_attributebbe60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_field_map_grp'] = add_field_map_grp74a39,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp74a39,
        codeStates['add_field_map_grp74a39'] = add_field_map_grp74a39Props,
        codeStates['setadd_field_map_grp74a39'] = setadd_field_map_grp74a39Props,
        codeStates['source_mapping_grp'] = source_mapping_grp99571,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp99571,
        codeStates['source_mapping_grp99571'] = source_mapping_grp99571Props,
        codeStates['setsource_mapping_grp99571'] = setsource_mapping_grp99571Props,
        codeStates['target_mapping_grp'] = target_mapping_grp841a3,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grp841a3,
        codeStates['target_mapping_grp841a3'] = target_mapping_grp841a3Props,
        codeStates['settarget_mapping_grp841a3'] = settarget_mapping_grp841a3Props,
        codeStates['target_mapping_text'] = target_mapping_text48064,
        codeStates['settarget_mapping_text'] = settarget_mapping_text48064,
        codeStates['target_entity'] = target_entity5199b,
        codeStates['settarget_entity'] = settarget_entity5199b,
        codeStates['target_attribute'] = target_attributebbe60,
        codeStates['settarget_attribute'] = settarget_attributebbe60,
        codeStates['transformation_grp'] = transformation_grp75a9a,
        codeStates['settransformation_grp'] = settransformation_grp75a9a,
        codeStates['transformation_grp75a9a'] = transformation_grp75a9aProps,
        codeStates['settransformation_grp75a9a'] = settransformation_grp75a9aProps,
        codeStates['field_rules_grp'] = field_rules_grp2cb2f,
        codeStates['setfield_rules_grp'] = setfield_rules_grp2cb2f,
        codeStates['field_rules_grp2cb2f'] = field_rules_grp2cb2fProps,
        codeStates['setfield_rules_grp2cb2f'] = setfield_rules_grp2cb2fProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6921e26df034e1baf00d02ea803841a3");
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
        codeStates['add_field_map_grp'] = add_field_map_grp74a39,
        codeStates['setadd_field_map_grp'] = setadd_field_map_grp74a39,
        codeStates['add_field_map_grp74a39'] = add_field_map_grp74a39Props,
        codeStates['setadd_field_map_grp74a39'] = setadd_field_map_grp74a39Props,
        codeStates['source_mapping_grp'] = source_mapping_grp99571,
        codeStates['setsource_mapping_grp'] = setsource_mapping_grp99571,
        codeStates['source_mapping_grp99571'] = source_mapping_grp99571Props,
        codeStates['setsource_mapping_grp99571'] = setsource_mapping_grp99571Props,
        codeStates['target_mapping_grp'] = target_mapping_grp841a3,
        codeStates['settarget_mapping_grp'] = settarget_mapping_grp841a3,
        codeStates['target_mapping_grp841a3'] = target_mapping_grp841a3Props,
        codeStates['settarget_mapping_grp841a3'] = settarget_mapping_grp841a3Props,
        codeStates['target_mapping_text'] = target_mapping_text48064,
        codeStates['settarget_mapping_text'] = settarget_mapping_text48064,
        codeStates['target_entity'] = target_entity5199b,
        codeStates['settarget_entity'] = settarget_entity5199b,
        codeStates['target_attribute'] = target_attributebbe60,
        codeStates['settarget_attribute'] = settarget_attributebbe60,
        codeStates['transformation_grp'] = transformation_grp75a9a,
        codeStates['settransformation_grp'] = settransformation_grp75a9a,
        codeStates['transformation_grp75a9a'] = transformation_grp75a9aProps,
        codeStates['settransformation_grp75a9a'] = settransformation_grp75a9aProps,
        codeStates['field_rules_grp'] = field_rules_grp2cb2f,
        codeStates['setfield_rules_grp'] = setfield_rules_grp2cb2f,
        codeStates['field_rules_grp2cb2f'] = field_rules_grp2cb2fProps,
        codeStates['setfield_rules_grp2cb2f'] = setfield_rules_grp2cb2fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const target_mapping_grp841a3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    target_mapping_grp841a3Ref.current?.setSearchParams();
    target_mapping_grp841a3Ref.current?.handleSearch({});
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
        !Array.isArray(target_mapping_grp841a3) &&
        Object.keys(target_mapping_grp841a3)?.length > 0
      ) {
        settarget_mapping_grp841a3({})
      }
    } else prevRefreshRef.current = true
  }, [target_mapping_grp841a3Props?.refresh])


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
          setviewintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"target_mapping_grp"}))
        }}
    >
          {allowedControls.includes("target_mapping_text") ?<Texttarget_mapping_text   /* 48064 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("target_entity") ?<TextInputtarget_entity   /* 5199b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("target_attribute") ?<TextInputtarget_attribute   /* bbe60 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptarget_mapping_grp
