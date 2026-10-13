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
import Tabletbl_tran_jrny_list  from './Tabletbl_tran_jrny_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_tran_jrny_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sfjourneyviewtransaction_v1Props, setdfd_sfjourneyviewtransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tranjourney_v1Props, setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_sal_file",
      "col_source_name",
      "col_process_name",
      "col_process",
      "col_created_date",
      "col_step",
      "col_tran_uuid",
      "col_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
    ],
    "blockedControls": [
      "btn_view_data",
      "btn_view_journey"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_sal_file",
      "col_source_name",
      "col_process_name",
      "col_process",
      "col_created_date",
      "col_step",
      "col_tran_uuid",
      "col_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
    ],
    "blockedControls": [
      "btn_view_data",
      "btn_view_journey"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_sal_file",
      "col_source_name",
      "col_process_name",
      "col_process",
      "col_created_date",
      "col_step",
      "col_tran_uuid",
      "col_status"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
    ],
    "blockedControls": [
      "btn_view_data",
      "btn_view_journey"
    ],
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
  const {grp_overall_tran_jrny_list67aa9, setgrp_overall_tran_jrny_list67aa9}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_jrny_list67aa9Props, setgrp_overall_tran_jrny_list67aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62f, settbl_tran_jrny_list6d62f}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62fProps, settbl_tran_jrny_list6d62fProps}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_file1c7b1, setcol_sal_file1c7b1}= useContext(TotalContext) as TotalContextProps;
  const {col_source_name34913, setcol_source_name34913}= useContext(TotalContext) as TotalContextProps;
  const {col_process_name31fa1, setcol_process_name31fa1}= useContext(TotalContext) as TotalContextProps;
  const {col_process3a817, setcol_process3a817}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date35d64, setcol_created_date35d64}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_data0ca2b, setbtn_view_data0ca2b}= useContext(TotalContext) as TotalContextProps;
  const {col_stepee23d, setcol_stepee23d}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_uuidce7f9, setcol_tran_uuidce7f9}= useContext(TotalContext) as TotalContextProps;
  const {col_status4cffe, setcol_status4cffe}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_journeydb055, setbtn_view_journeydb055}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {transactionlistwithjourney_v1, settransactionlistwithjourney_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionListWithJourney:AFVK:v1',
    [user],
    'GroupTblTranJrnyList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8a5e4bc9b06d6e40fb5d2cb34b86d62f");
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
    settbl_tran_jrny_list6d62fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_sal_file")){
        setcol_sal_file1c7b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_file1c7b1?.isDisabled==null)
      {
        setcol_sal_file1c7b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_source_name")){
        setcol_source_name34913((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_source_name34913?.isDisabled==null)
      {
        setcol_source_name34913((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_process_name")){
        setcol_process_name31fa1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_process_name31fa1?.isDisabled==null)
      {
        setcol_process_name31fa1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_process")){
        setcol_process3a817((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_process3a817?.isDisabled==null)
      {
        setcol_process3a817((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_date35d64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_date35d64?.isDisabled==null)
      {
        setcol_created_date35d64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_view_data")){
        setbtn_view_data0ca2b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_view_data0ca2b?.isDisabled==null)
      {
        setbtn_view_data0ca2b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_step")){
        setcol_stepee23d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_stepee23d?.isDisabled==null)
      {
        setcol_stepee23d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tran_uuid")){
        setcol_tran_uuidce7f9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tran_uuidce7f9?.isDisabled==null)
      {
        setcol_tran_uuidce7f9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_status")){
        setcol_status4cffe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_status4cffe?.isDisabled==null)
      {
        setcol_status4cffe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_view_journey")){
        setbtn_view_journeydb055((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_view_journeydb055?.isDisabled==null)
      {
        setbtn_view_journeydb055((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8a5e4bc9b06d6e40fb5d2cb34b86d62f");
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
        codeStates['grp_overall_tran_jrny_list'] = grp_overall_tran_jrny_list67aa9,
        codeStates['setgrp_overall_tran_jrny_list'] = setgrp_overall_tran_jrny_list67aa9,
        codeStates['grp_overall_tran_jrny_list67aa9'] = grp_overall_tran_jrny_list67aa9Props,
        codeStates['setgrp_overall_tran_jrny_list67aa9'] = setgrp_overall_tran_jrny_list67aa9Props,
        codeStates['tbl_tran_jrny_list'] = tbl_tran_jrny_list6d62f,
        codeStates['settbl_tran_jrny_list'] = settbl_tran_jrny_list6d62f,
        codeStates['tbl_tran_jrny_list6d62f'] = tbl_tran_jrny_list6d62fProps,
        codeStates['settbl_tran_jrny_list6d62f'] = settbl_tran_jrny_list6d62fProps,
        codeStates['col_sal_file'] = col_sal_file1c7b1,
        codeStates['setcol_sal_file'] = setcol_sal_file1c7b1,
        codeStates['col_source_name'] = col_source_name34913,
        codeStates['setcol_source_name'] = setcol_source_name34913,
        codeStates['col_process_name'] = col_process_name31fa1,
        codeStates['setcol_process_name'] = setcol_process_name31fa1,
        codeStates['col_process'] = col_process3a817,
        codeStates['setcol_process'] = setcol_process3a817,
        codeStates['col_created_date'] = col_created_date35d64,
        codeStates['setcol_created_date'] = setcol_created_date35d64,
        codeStates['btn_view_data'] = btn_view_data0ca2b,
        codeStates['setbtn_view_data'] = setbtn_view_data0ca2b,
        codeStates['col_step'] = col_stepee23d,
        codeStates['setcol_step'] = setcol_stepee23d,
        codeStates['col_tran_uuid'] = col_tran_uuidce7f9,
        codeStates['setcol_tran_uuid'] = setcol_tran_uuidce7f9,
        codeStates['col_status'] = col_status4cffe,
        codeStates['setcol_status'] = setcol_status4cffe,
        codeStates['btn_view_journey'] = btn_view_journeydb055,
        codeStates['setbtn_view_journey'] = setbtn_view_journeydb055,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_tran_jrny_list6d62fRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_tran_jrny_list6d62fRef.current?.setSearchParams();
    tbl_tran_jrny_list6d62fRef.current?.handleSearch({});
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
        !Array.isArray(tbl_tran_jrny_list6d62f) &&
        Object.keys(tbl_tran_jrny_list6d62f)?.length > 0
      ) {
        settbl_tran_jrny_list6d62f({})
        settbl_tran_jrny_list6d62fProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_tran_jrny_list6d62fProps?.refresh])


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
            iconDisplay={tbl_tran_jrny_list6d62fRef?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_tran_jrny_list6d62fRef?.current?.isHaveSearch&&(
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
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 19',
        gridRow: '4 / 158',
      
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
      className={`flex flex-col overflow-auto rounded-md text-white ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          settransactionlistwithjourney_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_tran_jrny_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_tran_jrny_list headerButtonsRenders={renderBUttons}
          headerPosition='top'
          headerText="Transaction List"
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_tran_jrny_list6d62fRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_tran_jrny_list
