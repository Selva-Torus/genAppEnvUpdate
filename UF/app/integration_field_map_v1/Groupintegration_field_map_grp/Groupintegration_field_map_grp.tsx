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
import Groupintegration_field_map_table  from "../Groupintegration_field_map_table/Groupintegration_field_map_table";
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
import Textintegration_field_map  from "./Textintegration_field_map";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonnew_integration_field_map  from "./Buttonnew_integration_field_map";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupintegration_field_map_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
      "integration_field_map",
      "ref_btn",
      "search_btn",
      "new_integration_field_map"
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
  const {integration_field_mapce0db, setintegration_field_mapce0db}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnb0790, setref_btnb0790}= useContext(TotalContext) as TotalContextProps;
  const {search_btn2b529, setsearch_btn2b529}= useContext(TotalContext) as TotalContextProps;
  const {new_integration_field_map4e42a, setnew_integration_field_map4e42a}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50, setintegration_field_map_tablebda50}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50Props, setintegration_field_map_tablebda50Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupIntegrationFieldMapGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96ac3d7f0f4d4d3e8a5f1a305ef96a61");
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
    setintegration_field_map_grp96a61Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("integration_field_map")){
        setintegration_field_mapce0db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_field_mapce0db?.isDisabled==null)
      {
        setintegration_field_mapce0db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btnb0790((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btnb0790?.isDisabled==null)
      {
        setref_btnb0790((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn2b529((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn2b529?.isDisabled==null)
      {
        setsearch_btn2b529((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_integration_field_map")){
        setnew_integration_field_map4e42a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_integration_field_map4e42a?.isDisabled==null)
      {
        setnew_integration_field_map4e42a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_field_map_table")){
        setintegration_field_map_tablebda50Props((pre:any)=>({...pre,...integration_field_map_tablebda50,isDisabled:true}));

    }else
    {
      if(integration_field_map_tablebda50?.isDisabled==null)
      {
        setintegration_field_map_tablebda50Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['integration_field_map_grp'] = integration_field_map_grp96a61,
        codeStates['setintegration_field_map_grp'] = setintegration_field_map_grp96a61,
        codeStates['integration_field_map_grp96a61'] = integration_field_map_grp96a61Props,
        codeStates['setintegration_field_map_grp96a61'] = setintegration_field_map_grp96a61Props,
        codeStates['integration_field_map'] = integration_field_mapce0db,
        codeStates['setintegration_field_map'] = setintegration_field_mapce0db,
        codeStates['ref_btn'] = ref_btnb0790,
        codeStates['setref_btn'] = setref_btnb0790,
        codeStates['search_btn'] = search_btn2b529,
        codeStates['setsearch_btn'] = setsearch_btn2b529,
        codeStates['new_integration_field_map'] = new_integration_field_map4e42a,
        codeStates['setnew_integration_field_map'] = setnew_integration_field_map4e42a,
        codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
        codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
        codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
        codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96ac3d7f0f4d4d3e8a5f1a305ef96a61");
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
        codeStates['integration_field_map'] = integration_field_mapce0db,
        codeStates['setintegration_field_map'] = setintegration_field_mapce0db,
        codeStates['ref_btn'] = ref_btnb0790,
        codeStates['setref_btn'] = setref_btnb0790,
        codeStates['search_btn'] = search_btn2b529,
        codeStates['setsearch_btn'] = setsearch_btn2b529,
        codeStates['new_integration_field_map'] = new_integration_field_map4e42a,
        codeStates['setnew_integration_field_map'] = setnew_integration_field_map4e42a,
        codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
        codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
        codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
        codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const integration_field_map_grp96a61Ref = useRef<any>(null);
  const handleClearSearch = () => {
    integration_field_map_grp96a61Ref.current?.setSearchParams();
    integration_field_map_grp96a61Ref.current?.handleSearch({});
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
        !Array.isArray(integration_field_map_grp96a61) &&
        Object.keys(integration_field_map_grp96a61)?.length > 0
      ) {
        setintegration_field_map_grp96a61({})
      }
    } else prevRefreshRef.current = true
  }, [integration_field_map_grp96a61Props?.refresh])


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
        gridRow: '1 / 140',
      
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
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"integration_field_map_grp"}))
        }}
    >
        {allowedComponent.includes("integration_field_map_table")  &&<Groupintegration_field_map_table  
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
          {allowedControls.includes("integration_field_map") ?<Textintegration_field_map   /* ce0db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_integration_field_map" in ButtonGoRuleData)?ButtonGoRuleData["new_integration_field_map"]:true) && 
          allowedControls.includes("new_integration_field_map")  ?            <Buttonnew_integration_field_map tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupintegration_field_map_grp
