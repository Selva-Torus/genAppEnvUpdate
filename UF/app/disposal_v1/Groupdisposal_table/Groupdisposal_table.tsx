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
import Tabledisposal_table  from './Tabledisposal_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdisposal_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Engineer": {
    "allowedControls": [
      "disposal_id",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "witness_name",
      "data_wipe_method",
      "disposal_cost",
      "view",
      "bt_edit"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "disposal_id",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "witness_name",
      "data_wipe_method",
      "disposal_cost",
      "view",
      "bt_edit"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "disposal_id",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "witness_name",
      "data_wipe_method",
      "disposal_cost",
      "view",
      "bt_edit"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "disposal_id",
      "asset_name",
      "disposal_method",
      "disposal_date",
      "witness_name",
      "data_wipe_method",
      "disposal_cost",
      "view",
      "bt_edit"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
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
  const {overall_disposal_group04cba, setoverall_disposal_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8c, seticon_text_group23d8c}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8cProps, seticon_text_group23d8cProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5d, setdisposal_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5dProps, setdisposal_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_id46e83, setdisposal_id46e83}= useContext(TotalContext) as TotalContextProps;
  const {asset_namedaa81, setasset_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methodba6cd, setdisposal_methodba6cd}= useContext(TotalContext) as TotalContextProps;
  const {disposal_datee0685, setdisposal_datee0685}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameba0b9, setwitness_nameba0b9}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodc4b88, setdata_wipe_methodc4b88}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost910b8, setdisposal_cost910b8}= useContext(TotalContext) as TotalContextProps;
  const {view6b7cc, setview6b7cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_editb236b, setbt_editb236b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetdisposal_v1, setassetdisposal_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1',
    [user],
    'GroupDisposalTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "356fd7ddf8ed4df7909d896283975a5d");
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
    setdisposal_table75a5dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("disposal_id")){
        setdisposal_id46e83({...disposal_id46e83,isDisabled:true});

    }else
    {
      if(disposal_id46e83?.isDisabled==null)
      {
        setdisposal_id46e83({...disposal_id46e83,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namedaa81({...asset_namedaa81,isDisabled:true});

    }else
    {
      if(asset_namedaa81?.isDisabled==null)
      {
        setasset_namedaa81({...asset_namedaa81,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_method")){
        setdisposal_methodba6cd({...disposal_methodba6cd,isDisabled:true});

    }else
    {
      if(disposal_methodba6cd?.isDisabled==null)
      {
        setdisposal_methodba6cd({...disposal_methodba6cd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_date")){
        setdisposal_datee0685({...disposal_datee0685,isDisabled:true});

    }else
    {
      if(disposal_datee0685?.isDisabled==null)
      {
        setdisposal_datee0685({...disposal_datee0685,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("witness_name")){
        setwitness_nameba0b9({...witness_nameba0b9,isDisabled:true});

    }else
    {
      if(witness_nameba0b9?.isDisabled==null)
      {
        setwitness_nameba0b9({...witness_nameba0b9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_wipe_method")){
        setdata_wipe_methodc4b88({...data_wipe_methodc4b88,isDisabled:true});

    }else
    {
      if(data_wipe_methodc4b88?.isDisabled==null)
      {
        setdata_wipe_methodc4b88({...data_wipe_methodc4b88,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_cost")){
        setdisposal_cost910b8({...disposal_cost910b8,isDisabled:true});

    }else
    {
      if(disposal_cost910b8?.isDisabled==null)
      {
        setdisposal_cost910b8({...disposal_cost910b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
        setview6b7cc({...view6b7cc,isDisabled:true});

    }else
    {
      if(view6b7cc?.isDisabled==null)
      {
        setview6b7cc({...view6b7cc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_edit")){
        setbt_editb236b({...bt_editb236b,isDisabled:true});

    }else
    {
      if(bt_editb236b?.isDisabled==null)
      {
        setbt_editb236b({...bt_editb236b,isDisabled:false});
      }
    }
  //////////////
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
        codeStates['overall_disposal_group'] = overall_disposal_group04cba,
        codeStates['setoverall_disposal_group'] = setoverall_disposal_group04cba,
        codeStates['overall_disposal_group04cba'] = overall_disposal_group04cbaProps,
        codeStates['setoverall_disposal_group04cba'] = setoverall_disposal_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group23d8c,
        codeStates['seticon_text_group'] = seticon_text_group23d8c,
        codeStates['icon_text_group23d8c'] = icon_text_group23d8cProps,
        codeStates['seticon_text_group23d8c'] = seticon_text_group23d8cProps,
        codeStates['disposal_table'] = disposal_table75a5d,
        codeStates['setdisposal_table'] = setdisposal_table75a5d,
        codeStates['disposal_table75a5d'] = disposal_table75a5dProps,
        codeStates['setdisposal_table75a5d'] = setdisposal_table75a5dProps,
        codeStates['disposal_id'] = disposal_id46e83,
        codeStates['setdisposal_id'] = setdisposal_id46e83,
        codeStates['asset_name'] = asset_namedaa81,
        codeStates['setasset_name'] = setasset_namedaa81,
        codeStates['disposal_method'] = disposal_methodba6cd,
        codeStates['setdisposal_method'] = setdisposal_methodba6cd,
        codeStates['disposal_date'] = disposal_datee0685,
        codeStates['setdisposal_date'] = setdisposal_datee0685,
        codeStates['witness_name'] = witness_nameba0b9,
        codeStates['setwitness_name'] = setwitness_nameba0b9,
        codeStates['data_wipe_method'] = data_wipe_methodc4b88,
        codeStates['setdata_wipe_method'] = setdata_wipe_methodc4b88,
        codeStates['disposal_cost'] = disposal_cost910b8,
        codeStates['setdisposal_cost'] = setdisposal_cost910b8,
        codeStates['view'] = view6b7cc,
        codeStates['setview'] = setview6b7cc,
        codeStates['bt_edit'] = bt_editb236b,
        codeStates['setbt_edit'] = setbt_editb236b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const disposal_table75a5dRef = useRef<any>(null);
  const handleClearSearch = () => {
    disposal_table75a5dRef.current?.setSearchParams();
    disposal_table75a5dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(disposal_table75a5d) && Object.keys(disposal_table75a5d)?.length>0)
      {
        setdisposal_table75a5d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [disposal_table75a5dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 118',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabledisposal_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={disposal_table75a5dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupdisposal_table
