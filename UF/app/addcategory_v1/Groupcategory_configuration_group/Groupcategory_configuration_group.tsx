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
import Textcategory_configuration_text  from "./Textcategory_configuration_text";
import Dropdowndepreciation_method  from "./Dropdowndepreciation_method";
import TextInputuseful_life_years  from "./TextInputuseful_life_years";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcategory_configuration_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_parentcategorycombo_v1Props, setdfd_parentcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_depreciationmethodcombo_v1Props, setdfd_depreciationmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "category_configuration_text",
      "depreciation_method",
      "useful_life_years"
    ],
    "allowedGroups": [
      "canvas",
      "category_group",
      "category_information_group",
      "category_configuration_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "category_configuration_text",
      "depreciation_method",
      "useful_life_years"
    ],
    "allowedGroups": [
      "canvas",
      "category_group",
      "category_information_group",
      "category_configuration_group",
      "dynamicactions"
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
  const {category_groupe3ebd, setcategory_groupe3ebd}= useContext(TotalContext) as TotalContextProps;
  const {category_groupe3ebdProps, setcategory_groupe3ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68a, setcategory_information_groupfb68a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68aProps, setcategory_information_groupfb68aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6af, setcategory_configuration_group5d6af}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6afProps, setcategory_configuration_group5d6afProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text00171, setcategory_configuration_text00171}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_methodfa7cb, setdepreciation_methodfa7cb}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years231a3, setuseful_life_years231a3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884, setdynamicactions13884}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884Props, setdynamicactions13884Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcategory_v1, setaddcategory_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addCategory:AFVK:v1',
    [user],
    'GroupCategoryConfigurationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "23848463037e4b339a4fde469965d6af");
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
    setcategory_configuration_group5d6afProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("category_configuration_text")){
        setcategory_configuration_text00171({...category_configuration_text00171,isDisabled:true});

    }else
    {
      if(category_configuration_text00171?.isDisabled==null)
      {
        setcategory_configuration_text00171({...category_configuration_text00171,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_method")){
        setdepreciation_methodfa7cb({...depreciation_methodfa7cb,isDisabled:true});

    }else
    {
      if(depreciation_methodfa7cb?.isDisabled==null)
      {
        setdepreciation_methodfa7cb({...depreciation_methodfa7cb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("useful_life_years")){
        setuseful_life_years231a3({...useful_life_years231a3,isDisabled:true});

    }else
    {
      if(useful_life_years231a3?.isDisabled==null)
      {
        setuseful_life_years231a3({...useful_life_years231a3,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['category_group'] = category_groupe3ebd,
        codeStates['setcategory_group'] = setcategory_groupe3ebd,
        codeStates['category_groupe3ebd'] = category_groupe3ebdProps,
        codeStates['setcategory_groupe3ebd'] = setcategory_groupe3ebdProps,
        codeStates['category_information_group'] = category_information_groupfb68a,
        codeStates['setcategory_information_group'] = setcategory_information_groupfb68a,
        codeStates['category_information_groupfb68a'] = category_information_groupfb68aProps,
        codeStates['setcategory_information_groupfb68a'] = setcategory_information_groupfb68aProps,
        codeStates['category_configuration_group'] = category_configuration_group5d6af,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group5d6af,
        codeStates['category_configuration_group5d6af'] = category_configuration_group5d6afProps,
        codeStates['setcategory_configuration_group5d6af'] = setcategory_configuration_group5d6afProps,
        codeStates['category_configuration_text'] = category_configuration_text00171,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text00171,
        codeStates['depreciation_method'] = depreciation_methodfa7cb,
        codeStates['setdepreciation_method'] = setdepreciation_methodfa7cb,
        codeStates['useful_life_years'] = useful_life_years231a3,
        codeStates['setuseful_life_years'] = setuseful_life_years231a3,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,

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
        codeStates['category_group'] = category_groupe3ebd,
        codeStates['setcategory_group'] = setcategory_groupe3ebd,
        codeStates['category_groupe3ebd'] = category_groupe3ebdProps,
        codeStates['setcategory_groupe3ebd'] = setcategory_groupe3ebdProps,
        codeStates['category_information_group'] = category_information_groupfb68a,
        codeStates['setcategory_information_group'] = setcategory_information_groupfb68a,
        codeStates['category_information_groupfb68a'] = category_information_groupfb68aProps,
        codeStates['setcategory_information_groupfb68a'] = setcategory_information_groupfb68aProps,
        codeStates['category_configuration_group'] = category_configuration_group5d6af,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group5d6af,
        codeStates['category_configuration_group5d6af'] = category_configuration_group5d6afProps,
        codeStates['setcategory_configuration_group5d6af'] = setcategory_configuration_group5d6afProps,
        codeStates['category_configuration_text'] = category_configuration_text00171,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text00171,
        codeStates['depreciation_method'] = depreciation_methodfa7cb,
        codeStates['setdepreciation_method'] = setdepreciation_methodfa7cb,
        codeStates['useful_life_years'] = useful_life_years231a3,
        codeStates['setuseful_life_years'] = setuseful_life_years231a3,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const category_configuration_group5d6afRef = useRef<any>(null);
  const handleClearSearch = () => {
    category_configuration_group5d6afRef.current?.setSearchParams();
    category_configuration_group5d6afRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(category_configuration_group5d6af) && Object.keys(category_configuration_group5d6af)?.length>0)
      {
        setcategory_configuration_group5d6af({})
      }
    }else 
      prevRefreshRef.current= true
  }, [category_configuration_group5d6afProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '38 / 61',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f0f2f7',
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
          {allowedControls.includes("category_configuration_text") ?<Textcategory_configuration_text   /* 00171 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("depreciation_method") ?<Dropdowndepreciation_method   /* fa7cb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("useful_life_years") ?<TextInputuseful_life_years   /* 231a3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcategory_configuration_group
