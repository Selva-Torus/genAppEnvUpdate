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
import Textaccount_holder_name  from "./Textaccount_holder_name";
import Iconicon  from "./Iconicon";
import Textaccount_number  from "./Textaccount_number";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupbenc_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_beneficiarylistquery_v1Props, setdfd_beneficiarylistquery_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Operational Manager": {
    "allowedControls": [
      "account_holder_name",
      "icon",
      "account_number"
    ],
    "allowedGroups": [
      "canvas",
      "beneficiary_list_group",
      "ben_list_group",
      "benc_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "account_holder_name",
      "icon",
      "account_number"
    ],
    "allowedGroups": [
      "canvas",
      "beneficiary_list_group",
      "ben_list_group",
      "benc_group"
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
  const {beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4}= useContext(TotalContext) as TotalContextProps;
  const {beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {account_holder_namedb849, setaccount_holder_namedb849}= useContext(TotalContext) as TotalContextProps;
  const {iconcd6e8, seticoncd6e8}= useContext(TotalContext) as TotalContextProps;
  const {account_numberf1543, setaccount_numberf1543}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {beneficiarylistpopup_v1, setbeneficiarylistpopup_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:beneficiaryListPopUp:AFVK:v1',
    [user],
    'GroupBencGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "42a5e563cb584bf1ab0645fa134a95a7");
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
    setbenc_groupa95a7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("account_holder_name")){
        setaccount_holder_namedb849((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(account_holder_namedb849?.isDisabled==null)
      {
        setaccount_holder_namedb849((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("icon")){
        seticoncd6e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(iconcd6e8?.isDisabled==null)
      {
        seticoncd6e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("account_number")){
        setaccount_numberf1543((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(account_numberf1543?.isDisabled==null)
      {
        setaccount_numberf1543((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['beneficiary_list_group'] = beneficiary_list_group9d9c4,
        codeStates['setbeneficiary_list_group'] = setbeneficiary_list_group9d9c4,
        codeStates['beneficiary_list_group9d9c4'] = beneficiary_list_group9d9c4Props,
        codeStates['setbeneficiary_list_group9d9c4'] = setbeneficiary_list_group9d9c4Props,
        codeStates['ben_list_group'] = ben_list_groupb24ac,
        codeStates['setben_list_group'] = setben_list_groupb24ac,
        codeStates['ben_list_groupb24ac'] = ben_list_groupb24acProps,
        codeStates['setben_list_groupb24ac'] = setben_list_groupb24acProps,
        codeStates['benc_group'] = benc_groupa95a7,
        codeStates['setbenc_group'] = setbenc_groupa95a7,
        codeStates['benc_groupa95a7'] = benc_groupa95a7Props,
        codeStates['setbenc_groupa95a7'] = setbenc_groupa95a7Props,
        codeStates['account_holder_name'] = account_holder_namedb849,
        codeStates['setaccount_holder_name'] = setaccount_holder_namedb849,
        codeStates['icon'] = iconcd6e8,
        codeStates['seticon'] = seticoncd6e8,
        codeStates['account_number'] = account_numberf1543,
        codeStates['setaccount_number'] = setaccount_numberf1543,

    codeExecution(code,codeStates);
    } 
    if(dfd_beneficiarylistquery_v1Props?.hasLogicCenter==false  && dfd_beneficiarylistquery_v1Props?.dstKey!="")
    {
      const api_paginationBody: api_paginationDto = {
        key: dfd_beneficiarylistquery_v1Props?.dstKey,
        count:10,
        page: 1
      }
      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        api_paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (api_paginationData?.data?.error == true) {
        toast(api_paginationData?.data?.errorDetails?.message, 'danger')
        return
      }
      setdfd_beneficiarylistquery_v1Props(api_paginationData?.data?.records || []);
    }
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "42a5e563cb584bf1ab0645fa134a95a7");
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

  function handleConfirmOnClick(){
  }

    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
      setSelectedIdx(selectedIndex);
      // copyFormData for group
      setbeneficiary_list_group9d9c4((prev:any) => ({ ...prev, ...selectedItem }));
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['beneficiary_list_group'] = beneficiary_list_group9d9c4,
        codeStates['setbeneficiary_list_group'] = setbeneficiary_list_group9d9c4,
        codeStates['beneficiary_list_group9d9c4'] = beneficiary_list_group9d9c4Props,
        codeStates['setbeneficiary_list_group9d9c4'] = setbeneficiary_list_group9d9c4Props,
        codeStates['ben_list_group'] = ben_list_groupb24ac,
        codeStates['setben_list_group'] = setben_list_groupb24ac,
        codeStates['ben_list_groupb24ac'] = ben_list_groupb24acProps,
        codeStates['setben_list_groupb24ac'] = setben_list_groupb24acProps,
        codeStates['benc_group'] = benc_groupa95a7,
        codeStates['setbenc_group'] = setbenc_groupa95a7,
        codeStates['benc_groupa95a7'] = benc_groupa95a7Props,
        codeStates['setbenc_groupa95a7'] = setbenc_groupa95a7Props,
        codeStates['account_holder_name'] = account_holder_namedb849,
        codeStates['setaccount_holder_name'] = setaccount_holder_namedb849,
        codeStates['icon'] = iconcd6e8,
        codeStates['seticon'] = seticoncd6e8,
        codeStates['account_number'] = account_numberf1543,
        codeStates['setaccount_number'] = setaccount_numberf1543,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const benc_groupa95a7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    benc_groupa95a7Ref.current?.setSearchParams();
    benc_groupa95a7Ref.current?.handleSearch({});
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
        !Array.isArray(benc_groupa95a7) &&
        Object.keys(benc_groupa95a7)?.length > 0
      ) {
        setbenc_groupa95a7({})
        setbenc_groupa95a7Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [benc_groupa95a7Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])

  useEffect(() => {      
    handleOnload()
    handleOnChange()
  }, [benc_groupa95a7])

  const renderBUttons=()=>{
    return (
      <></>
    )
  }
return (
<>
  {Array.isArray(dfd_beneficiarylistquery_v1Props) && dfd_beneficiarylistquery_v1Props.map((item: any, idx: number) => {
  return (
    <div key={idx}
      style={{          
        gridRow: 'span 23', 
        gridColumn: 'span 8',  
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col rounded-md !overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-[var(--hover-color)] !&lt;div class=&#34;group outline outline-2 outline-gray-300 hover:outline-blue-500 p-4 rounded-md&#34;&gt;   Content &lt;/div&gt;  rounded-2xl ${isDark ? 'text-white' : 'text-black'} ${selectedIdx === idx ? 'shadow-lg scale-[1.02] bg-[var(--hover-color)] outline outline-2 outline-blue-500' : ''}`}
      onClick={(e:any)=>{
        e.stopPropagation();
        handleOnClick(item, idx);
          setbeneficiarylistpopup_v1((pre:any)=>({...pre,_selectedGroup_:"benc_group"+idx}))
      }}
    >
          {allowedControls.includes("account_holder_name") ?<Textaccount_holder_name   /* db849 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("icon")?<Iconicon /* cd6e8 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("account_number") ?<Textaccount_number   /* f1543 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
  )
  })}
  </>
 )
}

export default Groupbenc_group
