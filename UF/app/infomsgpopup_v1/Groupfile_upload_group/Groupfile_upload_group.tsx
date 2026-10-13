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
import Iconicon  from "./Iconicon";
import Textsuccess_text  from "./Textsuccess_text";
import Textfile_upload_success  from "./Textfile_upload_success";
import Dividerdivider  from "./Dividerdivider";
import Buttonokk_btn  from "./Buttonokk_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupfile_upload_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {file_upload_groupfa783, setfile_upload_groupfa783}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_groupfa783Props, setfile_upload_groupfa783Props}= useContext(TotalContext) as TotalContextProps;
  const {icon12b96, seticon12b96}= useContext(TotalContext) as TotalContextProps;
  const {success_textd0c07, setsuccess_textd0c07}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_success9ee39, setfile_upload_success9ee39}= useContext(TotalContext) as TotalContextProps;
  const {dividerdb2f5, setdividerdb2f5}= useContext(TotalContext) as TotalContextProps;
  const {okk_btn97301, setokk_btn97301}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {infomsgpopup_v1, setinfomsgpopup_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:infoMsgPopup:AFVK:v1',
    [user],
    'GroupFileUploadGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bd9f507e7fca9e4a7b503974c2efa783");
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
    setfile_upload_groupfa783Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("icon")){
        seticon12b96((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(icon12b96?.isDisabled==null)
      {
        seticon12b96((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("success_text")){
        setsuccess_textd0c07((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(success_textd0c07?.isDisabled==null)
      {
        setsuccess_textd0c07((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("file_upload_success")){
        setfile_upload_success9ee39((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(file_upload_success9ee39?.isDisabled==null)
      {
        setfile_upload_success9ee39((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdividerdb2f5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dividerdb2f5?.isDisabled==null)
      {
        setdividerdb2f5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("okk_btn")){
        setokk_btn97301((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(okk_btn97301?.isDisabled==null)
      {
        setokk_btn97301((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['file_upload_group'] = file_upload_groupfa783,
        codeStates['setfile_upload_group'] = setfile_upload_groupfa783,
        codeStates['file_upload_groupfa783'] = file_upload_groupfa783Props,
        codeStates['setfile_upload_groupfa783'] = setfile_upload_groupfa783Props,
        codeStates['icon'] = icon12b96,
        codeStates['seticon'] = seticon12b96,
        codeStates['success_text'] = success_textd0c07,
        codeStates['setsuccess_text'] = setsuccess_textd0c07,
        codeStates['file_upload_success'] = file_upload_success9ee39,
        codeStates['setfile_upload_success'] = setfile_upload_success9ee39,
        codeStates['divider'] = dividerdb2f5,
        codeStates['setdivider'] = setdividerdb2f5,
        codeStates['okk_btn'] = okk_btn97301,
        codeStates['setokk_btn'] = setokk_btn97301,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bd9f507e7fca9e4a7b503974c2efa783");
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
        codeStates['file_upload_group'] = file_upload_groupfa783,
        codeStates['setfile_upload_group'] = setfile_upload_groupfa783,
        codeStates['file_upload_groupfa783'] = file_upload_groupfa783Props,
        codeStates['setfile_upload_groupfa783'] = setfile_upload_groupfa783Props,
        codeStates['icon'] = icon12b96,
        codeStates['seticon'] = seticon12b96,
        codeStates['success_text'] = success_textd0c07,
        codeStates['setsuccess_text'] = setsuccess_textd0c07,
        codeStates['file_upload_success'] = file_upload_success9ee39,
        codeStates['setfile_upload_success'] = setfile_upload_success9ee39,
        codeStates['divider'] = dividerdb2f5,
        codeStates['setdivider'] = setdividerdb2f5,
        codeStates['okk_btn'] = okk_btn97301,
        codeStates['setokk_btn'] = setokk_btn97301,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const file_upload_groupfa783Ref = useRef<any>(null);
  const handleClearSearch = () => {
    file_upload_groupfa783Ref.current?.setSearchParams();
    file_upload_groupfa783Ref.current?.handleSearch({});
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
        !Array.isArray(file_upload_groupfa783) &&
        Object.keys(file_upload_groupfa783)?.length > 0
      ) {
        setfile_upload_groupfa783({})
        setfile_upload_groupfa783Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [file_upload_groupfa783Props?.refresh])


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
        gridRow: '1 / 71',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setinfomsgpopup_v1((pre:any)=>({...pre,_selectedGroup_:"file_upload_group"}))
        }}
    >
        {allowedControls.includes("icon")?<Iconicon /* 12b96 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("success_text") ?<Textsuccess_text   /* d0c07 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("file_upload_success") ?<Textfile_upload_success   /* 9ee39 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* db2f5 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "okk_btn" in ButtonGoRuleData)?ButtonGoRuleData["okk_btn"]:true) && 
          allowedControls.includes("okk_btn")  ?            <Buttonokk_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupfile_upload_group
