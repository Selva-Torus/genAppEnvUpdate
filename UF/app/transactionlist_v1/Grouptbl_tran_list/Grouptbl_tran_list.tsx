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
import Tabletbl_tran_list  from './Tabletbl_tran_list';  
import Buttonbtn_back  from "./Buttonbtn_back";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_tran_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_wpsnackfailuretransactionlist_v1Props, setdfd_wpsnackfailuretransactionlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [
      "col_file_name",
      "col_tran_id",
      "col_sal_file_name",
      "col_file_type",
      "col_created_date",
      "btn_view_data",
      "col_vgphe_id",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_file_name",
      "col_tran_id",
      "col_sal_file_name",
      "col_file_type",
      "col_created_date",
      "btn_view_data",
      "col_vgphe_id",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_file_name",
      "col_tran_id",
      "col_sal_file_name",
      "col_file_type",
      "col_created_date",
      "btn_view_data",
      "col_vgphe_id",
      "btn_back"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_list",
      "tbl_tran_list"
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
  const {grp_overall_tran_list52636, setgrp_overall_tran_list52636}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list52636Props, setgrp_overall_tran_list52636Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list8df93, settbl_tran_list8df93}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list8df93Props, settbl_tran_list8df93Props}= useContext(TotalContext) as TotalContextProps;
  const {col_file_name06356, setcol_file_name06356}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_iddff78, setcol_tran_iddff78}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_file_namee8195, setcol_sal_file_namee8195}= useContext(TotalContext) as TotalContextProps;
  const {col_file_type43a43, setcol_file_type43a43}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date8dd2c, setcol_created_date8dd2c}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_data6dcf1, setbtn_view_data6dcf1}= useContext(TotalContext) as TotalContextProps;
  const {col_vgphe_id3cf81, setcol_vgphe_id3cf81}= useContext(TotalContext) as TotalContextProps;
  const {btn_back80553, setbtn_back80553}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {transactionlist_v1, settransactionlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionList:AFVK:v1',
    [user],
    'GroupTblTranList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c4fa0588b9682751974b6db6f098df93");
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
    settbl_tran_list8df93Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_file_name")){
        setcol_file_name06356((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_file_name06356?.isDisabled==null)
      {
        setcol_file_name06356((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tran_id")){
        setcol_tran_iddff78((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tran_iddff78?.isDisabled==null)
      {
        setcol_tran_iddff78((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_file_name")){
        setcol_sal_file_namee8195((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_file_namee8195?.isDisabled==null)
      {
        setcol_sal_file_namee8195((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_file_type")){
        setcol_file_type43a43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_file_type43a43?.isDisabled==null)
      {
        setcol_file_type43a43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_date8dd2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_date8dd2c?.isDisabled==null)
      {
        setcol_created_date8dd2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_view_data")){
        setbtn_view_data6dcf1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_view_data6dcf1?.isDisabled==null)
      {
        setbtn_view_data6dcf1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_vgphe_id")){
        setcol_vgphe_id3cf81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_vgphe_id3cf81?.isDisabled==null)
      {
        setcol_vgphe_id3cf81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_back80553((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_back80553?.isDisabled==null)
      {
        setbtn_back80553((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c4fa0588b9682751974b6db6f098df93");
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_list52636,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list52636,
        codeStates['grp_overall_tran_list52636'] = grp_overall_tran_list52636Props,
        codeStates['setgrp_overall_tran_list52636'] = setgrp_overall_tran_list52636Props,
        codeStates['tbl_tran_list'] = tbl_tran_list8df93,
        codeStates['settbl_tran_list'] = settbl_tran_list8df93,
        codeStates['tbl_tran_list8df93'] = tbl_tran_list8df93Props,
        codeStates['settbl_tran_list8df93'] = settbl_tran_list8df93Props,
        codeStates['col_file_name'] = col_file_name06356,
        codeStates['setcol_file_name'] = setcol_file_name06356,
        codeStates['col_tran_id'] = col_tran_iddff78,
        codeStates['setcol_tran_id'] = setcol_tran_iddff78,
        codeStates['col_sal_file_name'] = col_sal_file_namee8195,
        codeStates['setcol_sal_file_name'] = setcol_sal_file_namee8195,
        codeStates['col_file_type'] = col_file_type43a43,
        codeStates['setcol_file_type'] = setcol_file_type43a43,
        codeStates['col_created_date'] = col_created_date8dd2c,
        codeStates['setcol_created_date'] = setcol_created_date8dd2c,
        codeStates['btn_view_data'] = btn_view_data6dcf1,
        codeStates['setbtn_view_data'] = setbtn_view_data6dcf1,
        codeStates['col_vgphe_id'] = col_vgphe_id3cf81,
        codeStates['setcol_vgphe_id'] = setcol_vgphe_id3cf81,
        codeStates['btn_back'] = btn_back80553,
        codeStates['setbtn_back'] = setbtn_back80553,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_tran_list8df93Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_tran_list8df93Ref.current?.setSearchParams();
    tbl_tran_list8df93Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_tran_list8df93) &&
        Object.keys(tbl_tran_list8df93)?.length > 0
      ) {
        settbl_tran_list8df93({})
        settbl_tran_list8df93Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_tran_list8df93Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        <div className='flex flex-row shrink-0'>
          <Button
            view='action'
            pin={"circle-circle"}
            onClick={() => setOpen(true)}
            icon="FaSearch"
            iconDisplay={tbl_tran_list8df93Ref?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_tran_list8df93Ref?.current?.isHaveSearch&&(
            <Button 
              pin={"circle-circle"}
              onClick={() => handleClearSearch()}
              view='action'
              icon="FaTimes"
              iconDisplay="Icon only"
              className="p-2"
              />
            )}
        </div>
        {        (("btn_back" in ButtonGoRuleData)?ButtonGoRuleData["btn_back"]:true) && 
          allowedControls.includes("btn_back")  ?          <div className="shrink-0"><Buttonbtn_back tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/></div>: <div></div>} 
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '3 / 156',
      
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
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          settransactionlist_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_tran_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_tran_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Transaction List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_tran_list8df93Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_tran_list
