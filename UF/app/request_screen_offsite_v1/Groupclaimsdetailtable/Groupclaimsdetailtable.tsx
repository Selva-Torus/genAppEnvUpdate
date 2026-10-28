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
import Tableclaimsdetailtable  from './Tableclaimsdetailtable';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupclaimsdetailtable = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_claims_detail_v1Props, setdfd_claims_detail_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Employee": {
    "allowedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "allowedGroups": [
      "canvas",
      "request_offsite_group",
      "claimsdetailtable"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143, setclaimsdetailtablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claimsdetailtablef8143Props, setclaimsdetailtablef8143Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_id97d69, setclaim_detail_id97d69}= useContext(TotalContext) as TotalContextProps;
  const {expense_category182d4, setexpense_category182d4}= useContext(TotalContext) as TotalContextProps;
  const {expense_descriptiondee64, setexpense_descriptiondee64}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee47c7, setexpense_datee47c7}= useContext(TotalContext) as TotalContextProps;
  const {expense_amountb97f7, setexpense_amountb97f7}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {request_screen_offsite_v1, setrequest_screen_offsite_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Offsite:AFVK:v1',
    [user],
    'GroupClaimsdetailtable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d0c7d5b3ef0e4f5aba11c602ceff8143");
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
    setclaimsdetailtablef8143Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("claim_detail_id")){
        setclaim_detail_id97d69((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(claim_detail_id97d69?.isDisabled==null)
      {
        setclaim_detail_id97d69((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_category")){
        setexpense_category182d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_category182d4?.isDisabled==null)
      {
        setexpense_category182d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_description")){
        setexpense_descriptiondee64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_descriptiondee64?.isDisabled==null)
      {
        setexpense_descriptiondee64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
        setexpense_datee47c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_datee47c7?.isDisabled==null)
      {
        setexpense_datee47c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expense_amount")){
        setexpense_amountb97f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expense_amountb97f7?.isDisabled==null)
      {
        setexpense_amountb97f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d0c7d5b3ef0e4f5aba11c602ceff8143");
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
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
        codeStates['claimsdetailtable'] = claimsdetailtablef8143,
        codeStates['setclaimsdetailtable'] = setclaimsdetailtablef8143,
        codeStates['claimsdetailtablef8143'] = claimsdetailtablef8143Props,
        codeStates['setclaimsdetailtablef8143'] = setclaimsdetailtablef8143Props,
        codeStates['claim_detail_id'] = claim_detail_id97d69,
        codeStates['setclaim_detail_id'] = setclaim_detail_id97d69,
        codeStates['expense_category'] = expense_category182d4,
        codeStates['setexpense_category'] = setexpense_category182d4,
        codeStates['expense_description'] = expense_descriptiondee64,
        codeStates['setexpense_description'] = setexpense_descriptiondee64,
        codeStates['expense_date'] = expense_datee47c7,
        codeStates['setexpense_date'] = setexpense_datee47c7,
        codeStates['expense_amount'] = expense_amountb97f7,
        codeStates['setexpense_amount'] = setexpense_amountb97f7,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const claimsdetailtablef8143Ref = useRef<any>(null);
  const handleClearSearch = () => {
    claimsdetailtablef8143Ref.current?.setSearchParams();
    claimsdetailtablef8143Ref.current?.handleSearch({});
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
        !Array.isArray(claimsdetailtablef8143) &&
        Object.keys(claimsdetailtablef8143)?.length > 0
      ) {
        setclaimsdetailtablef8143({})
        setclaimsdetailtablef8143Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [claimsdetailtablef8143Props?.refresh])


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
        gridRow: '211 / 298',
      
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
          setrequest_screen_offsite_v1((pre:any)=>({...pre,_selectedGroup_:"claimsdetailtable"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableclaimsdetailtable headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={claimsdetailtablef8143Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupclaimsdetailtable
