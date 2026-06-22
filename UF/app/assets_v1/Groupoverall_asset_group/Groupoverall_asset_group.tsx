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
import Groupicon_text_group  from "../Groupicon_text_group/Groupicon_text_group";
import Groupasset_table  from "../Groupasset_table/Groupasset_table";
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
import Buttonsearch  from "./Buttonsearch";
import Buttonasset  from "./Buttonasset";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_asset_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Network Engineer": {
    "allowedControls": [
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [
      "asset"
    ],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "search",
      "asset"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "search",
      "asset"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Network Admin": {
    "allowedControls": [
      "search",
      "asset"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
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
  const {overall_asset_group7ded2, setoverall_asset_group7ded2}= useContext(TotalContext) as TotalContextProps;
  const {overall_asset_group7ded2Props, setoverall_asset_group7ded2Props}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bd, seticon_text_group476bd}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bdProps, seticon_text_group476bdProps}= useContext(TotalContext) as TotalContextProps;
  const {search15de2, setsearch15de2}= useContext(TotalContext) as TotalContextProps;
  const {asset295b8, setasset295b8}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38, setasset_tablef2b38}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38Props, setasset_tablef2b38Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assets_v1, setassets_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1',
    [user],
    'GroupOverallAssetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "742c0cdcca5c4805822e9c5c1547ded2");
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
    setoverall_asset_group7ded2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("icon_text_group")){
        seticon_text_group476bd({...icon_text_group476bd,isDisabled:true});

    }else
    {
      if(icon_text_group476bd?.isDisabled==null)
      {
        seticon_text_group476bd({...icon_text_group476bd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch15de2({...search15de2,isDisabled:true});

    }else
    {
      if(search15de2?.isDisabled==null)
      {
        setsearch15de2({...search15de2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset")){
        setasset295b8({...asset295b8,isDisabled:true});

    }else
    {
      if(asset295b8?.isDisabled==null)
      {
        setasset295b8({...asset295b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_table")){
        setasset_tablef2b38({...asset_tablef2b38,isDisabled:true});

    }else
    {
      if(asset_tablef2b38?.isDisabled==null)
      {
        setasset_tablef2b38({...asset_tablef2b38,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_asset_group'] = overall_asset_group7ded2,
        codeStates['setoverall_asset_group'] = setoverall_asset_group7ded2,
        codeStates['overall_asset_group7ded2'] = overall_asset_group7ded2Props,
        codeStates['setoverall_asset_group7ded2'] = setoverall_asset_group7ded2Props,
        codeStates['icon_text_group'] = icon_text_group476bd,
        codeStates['seticon_text_group'] = seticon_text_group476bd,
        codeStates['icon_text_group476bd'] = icon_text_group476bdProps,
        codeStates['seticon_text_group476bd'] = seticon_text_group476bdProps,
        codeStates['search'] = search15de2,
        codeStates['setsearch'] = setsearch15de2,
        codeStates['asset'] = asset295b8,
        codeStates['setasset'] = setasset295b8,
        codeStates['asset_table'] = asset_tablef2b38,
        codeStates['setasset_table'] = setasset_tablef2b38,
        codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
        codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,

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
        codeStates['overall_asset_group'] = overall_asset_group7ded2,
        codeStates['setoverall_asset_group'] = setoverall_asset_group7ded2,
        codeStates['overall_asset_group7ded2'] = overall_asset_group7ded2Props,
        codeStates['setoverall_asset_group7ded2'] = setoverall_asset_group7ded2Props,
        codeStates['icon_text_group'] = icon_text_group476bd,
        codeStates['seticon_text_group'] = seticon_text_group476bd,
        codeStates['icon_text_group476bd'] = icon_text_group476bdProps,
        codeStates['seticon_text_group476bd'] = seticon_text_group476bdProps,
        codeStates['search'] = search15de2,
        codeStates['setsearch'] = setsearch15de2,
        codeStates['asset'] = asset295b8,
        codeStates['setasset'] = setasset295b8,
        codeStates['asset_table'] = asset_tablef2b38,
        codeStates['setasset_table'] = setasset_tablef2b38,
        codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
        codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_asset_group7ded2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_asset_group7ded2Ref.current?.setSearchParams();
    overall_asset_group7ded2Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_asset_group7ded2) && Object.keys(overall_asset_group7ded2)?.length>0)
      {
        setoverall_asset_group7ded2({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_asset_group7ded2Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 122',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("icon_text_group")  &&<Groupicon_text_group  
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
        {allowedComponent.includes("asset_table")  &&<Groupasset_table  
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
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "asset" in ButtonGoRuleData)?ButtonGoRuleData["asset"]:true) && 
          allowedControls.includes("asset")  ?            <Buttonasset tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupoverall_asset_group
