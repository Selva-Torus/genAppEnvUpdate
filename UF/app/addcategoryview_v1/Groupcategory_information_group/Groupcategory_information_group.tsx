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
import Textcategory_information_text  from "./Textcategory_information_text";
import TextInputcategory_code  from "./TextInputcategory_code";
import TextInputcategory_name  from "./TextInputcategory_name";
import TextInputparent_category_name  from "./TextInputparent_category_name";
import TextInputasset_prefix  from "./TextInputasset_prefix";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcategory_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "category_information_text",
      "category_code",
      "category_name",
      "parent_category_name",
      "asset_prefix"
    ],
    "allowedGroups": [
      "canvas",
      "category_group",
      "category_information_group",
      "category_configuration_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "category_information_text",
      "category_code",
      "category_name",
      "parent_category_name",
      "asset_prefix"
    ],
    "allowedGroups": [
      "canvas",
      "category_group",
      "category_information_group",
      "category_configuration_group"
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
  const {category_group70e38, setcategory_group70e38}= useContext(TotalContext) as TotalContextProps;
  const {category_group70e38Props, setcategory_group70e38Props}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040a, setcategory_information_groupa040a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040aProps, setcategory_information_groupa040aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_textf1933, setcategory_information_textf1933}= useContext(TotalContext) as TotalContextProps;
  const {category_codeeb8f1, setcategory_codeeb8f1}= useContext(TotalContext) as TotalContextProps;
  const {category_name2a1ea, setcategory_name2a1ea}= useContext(TotalContext) as TotalContextProps;
  const {parent_category_name9a67f, setparent_category_name9a67f}= useContext(TotalContext) as TotalContextProps;
  const {asset_prefix5007a, setasset_prefix5007a}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09, setcategory_configuration_group06f09}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09Props, setcategory_configuration_group06f09Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcategoryview_v1, setaddcategoryview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addCategoryView:AFVK:v1',
    [user],
    'GroupCategoryInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7f3089aeea63747b5a2d6a8984ca040a");
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
    setcategory_information_groupa040aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("category_information_text")){
        setcategory_information_textf1933({...category_information_textf1933,isDisabled:true});

    }else
    {
      if(category_information_textf1933?.isDisabled==null)
      {
        setcategory_information_textf1933({...category_information_textf1933,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_code")){
        setcategory_codeeb8f1({...category_codeeb8f1,isDisabled:true});

    }else
    {
      if(category_codeeb8f1?.isDisabled==null)
      {
        setcategory_codeeb8f1({...category_codeeb8f1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_name2a1ea({...category_name2a1ea,isDisabled:true});

    }else
    {
      if(category_name2a1ea?.isDisabled==null)
      {
        setcategory_name2a1ea({...category_name2a1ea,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("parent_category_name")){
        setparent_category_name9a67f({...parent_category_name9a67f,isDisabled:true});

    }else
    {
      if(parent_category_name9a67f?.isDisabled==null)
      {
        setparent_category_name9a67f({...parent_category_name9a67f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_prefix")){
        setasset_prefix5007a({...asset_prefix5007a,isDisabled:true});

    }else
    {
      if(asset_prefix5007a?.isDisabled==null)
      {
        setasset_prefix5007a({...asset_prefix5007a,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['category_group'] = category_group70e38,
        codeStates['setcategory_group'] = setcategory_group70e38,
        codeStates['category_group70e38'] = category_group70e38Props,
        codeStates['setcategory_group70e38'] = setcategory_group70e38Props,
        codeStates['category_information_group'] = category_information_groupa040a,
        codeStates['setcategory_information_group'] = setcategory_information_groupa040a,
        codeStates['category_information_groupa040a'] = category_information_groupa040aProps,
        codeStates['setcategory_information_groupa040a'] = setcategory_information_groupa040aProps,
        codeStates['category_information_text'] = category_information_textf1933,
        codeStates['setcategory_information_text'] = setcategory_information_textf1933,
        codeStates['category_code'] = category_codeeb8f1,
        codeStates['setcategory_code'] = setcategory_codeeb8f1,
        codeStates['category_name'] = category_name2a1ea,
        codeStates['setcategory_name'] = setcategory_name2a1ea,
        codeStates['parent_category_name'] = parent_category_name9a67f,
        codeStates['setparent_category_name'] = setparent_category_name9a67f,
        codeStates['asset_prefix'] = asset_prefix5007a,
        codeStates['setasset_prefix'] = setasset_prefix5007a,
        codeStates['category_configuration_group'] = category_configuration_group06f09,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group06f09,
        codeStates['category_configuration_group06f09'] = category_configuration_group06f09Props,
        codeStates['setcategory_configuration_group06f09'] = setcategory_configuration_group06f09Props,

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
        codeStates['category_group'] = category_group70e38,
        codeStates['setcategory_group'] = setcategory_group70e38,
        codeStates['category_group70e38'] = category_group70e38Props,
        codeStates['setcategory_group70e38'] = setcategory_group70e38Props,
        codeStates['category_information_group'] = category_information_groupa040a,
        codeStates['setcategory_information_group'] = setcategory_information_groupa040a,
        codeStates['category_information_groupa040a'] = category_information_groupa040aProps,
        codeStates['setcategory_information_groupa040a'] = setcategory_information_groupa040aProps,
        codeStates['category_information_text'] = category_information_textf1933,
        codeStates['setcategory_information_text'] = setcategory_information_textf1933,
        codeStates['category_code'] = category_codeeb8f1,
        codeStates['setcategory_code'] = setcategory_codeeb8f1,
        codeStates['category_name'] = category_name2a1ea,
        codeStates['setcategory_name'] = setcategory_name2a1ea,
        codeStates['parent_category_name'] = parent_category_name9a67f,
        codeStates['setparent_category_name'] = setparent_category_name9a67f,
        codeStates['asset_prefix'] = asset_prefix5007a,
        codeStates['setasset_prefix'] = setasset_prefix5007a,
        codeStates['category_configuration_group'] = category_configuration_group06f09,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group06f09,
        codeStates['category_configuration_group06f09'] = category_configuration_group06f09Props,
        codeStates['setcategory_configuration_group06f09'] = setcategory_configuration_group06f09Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const category_information_groupa040aRef = useRef<any>(null);
  const handleClearSearch = () => {
    category_information_groupa040aRef.current?.setSearchParams();
    category_information_groupa040aRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(category_information_groupa040a) && Object.keys(category_information_groupa040a)?.length>0)
      {
        setcategory_information_groupa040a({})
      }
    }else 
      prevRefreshRef.current= true
  }, [category_information_groupa040aProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 37',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("category_information_text") ?<Textcategory_information_text   /* f1933 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_code") ?<TextInputcategory_code   /* eb8f1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_name") ?<TextInputcategory_name   /* 2a1ea */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("parent_category_name") ?<TextInputparent_category_name   /* 9a67f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_prefix") ?<TextInputasset_prefix   /* 5007a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcategory_information_group
