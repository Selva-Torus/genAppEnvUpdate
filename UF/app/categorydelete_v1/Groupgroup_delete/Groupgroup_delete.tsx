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
import Textdelete_heading_text  from "./Textdelete_heading_text";
import Textcategory_code_text  from "./Textcategory_code_text";
import Textcategory_code  from "./Textcategory_code";
import Textcategory_name_text  from "./Textcategory_name_text";
import Textcategory_name  from "./Textcategory_name";
import Textdepreciation_method_text  from "./Textdepreciation_method_text";
import Textdepreciation_method  from "./Textdepreciation_method";
import Textuseful_life_years_text  from "./Textuseful_life_years_text";
import Textuseful_life_years  from "./Textuseful_life_years";
import Textmaintenance_required_text  from "./Textmaintenance_required_text";
import Textmaintenance_required  from "./Textmaintenance_required";
import Textconfo_text  from "./Textconfo_text";
import Textacat_id  from "./Textacat_id";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_text",
      "category_code_text",
      "category_code",
      "category_name_text",
      "category_name",
      "depreciation_method_text",
      "depreciation_method",
      "useful_life_years_text",
      "useful_life_years",
      "maintenance_required_text",
      "maintenance_required",
      "confo_text",
      "acat_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "delete_heading_text",
      "category_code_text",
      "category_code",
      "category_name_text",
      "category_name",
      "depreciation_method_text",
      "depreciation_method",
      "useful_life_years_text",
      "useful_life_years",
      "maintenance_required_text",
      "maintenance_required",
      "confo_text",
      "acat_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
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
  const {group_delete3c2cd, setgroup_delete3c2cd}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c2cdProps, setgroup_delete3c2cdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb1f29, setdelete_heading_textb1f29}= useContext(TotalContext) as TotalContextProps;
  const {category_code_text0975e, setcategory_code_text0975e}= useContext(TotalContext) as TotalContextProps;
  const {category_codef16a8, setcategory_codef16a8}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text7648e, setcategory_name_text7648e}= useContext(TotalContext) as TotalContextProps;
  const {category_namecbc0b, setcategory_namecbc0b}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method_text82fb3, setdepreciation_method_text82fb3}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method0e872, setdepreciation_method0e872}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years_text30347, setuseful_life_years_text30347}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_yearsa64db, setuseful_life_yearsa64db}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required_textf1aaf, setmaintenance_required_textf1aaf}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required336be, setmaintenance_required336be}= useContext(TotalContext) as TotalContextProps;
  const {confo_texte7cc3, setconfo_texte7cc3}= useContext(TotalContext) as TotalContextProps;
  const {acat_id9127b, setacat_id9127b}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc0568, setcancel_buttonc0568}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc8577, setok_buttonc8577}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {categorydelete_v1, setcategorydelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:categoryDelete:AFVK:v1',
    [user],
    'GroupGroupDelete',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0f6f1c2688e8f3e9b08f7d717613c2cd");
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
    setgroup_delete3c2cdProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textb1f29({...delete_heading_textb1f29,isDisabled:true});

    }else
    {
      if(delete_heading_textb1f29?.isDisabled==null)
      {
        setdelete_heading_textb1f29({...delete_heading_textb1f29,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_code_text")){
        setcategory_code_text0975e({...category_code_text0975e,isDisabled:true});

    }else
    {
      if(category_code_text0975e?.isDisabled==null)
      {
        setcategory_code_text0975e({...category_code_text0975e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_code")){
        setcategory_codef16a8({...category_codef16a8,isDisabled:true});

    }else
    {
      if(category_codef16a8?.isDisabled==null)
      {
        setcategory_codef16a8({...category_codef16a8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name_text")){
        setcategory_name_text7648e({...category_name_text7648e,isDisabled:true});

    }else
    {
      if(category_name_text7648e?.isDisabled==null)
      {
        setcategory_name_text7648e({...category_name_text7648e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_namecbc0b({...category_namecbc0b,isDisabled:true});

    }else
    {
      if(category_namecbc0b?.isDisabled==null)
      {
        setcategory_namecbc0b({...category_namecbc0b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_method_text")){
        setdepreciation_method_text82fb3({...depreciation_method_text82fb3,isDisabled:true});

    }else
    {
      if(depreciation_method_text82fb3?.isDisabled==null)
      {
        setdepreciation_method_text82fb3({...depreciation_method_text82fb3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("depreciation_method")){
        setdepreciation_method0e872({...depreciation_method0e872,isDisabled:true});

    }else
    {
      if(depreciation_method0e872?.isDisabled==null)
      {
        setdepreciation_method0e872({...depreciation_method0e872,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("useful_life_years_text")){
        setuseful_life_years_text30347({...useful_life_years_text30347,isDisabled:true});

    }else
    {
      if(useful_life_years_text30347?.isDisabled==null)
      {
        setuseful_life_years_text30347({...useful_life_years_text30347,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("useful_life_years")){
        setuseful_life_yearsa64db({...useful_life_yearsa64db,isDisabled:true});

    }else
    {
      if(useful_life_yearsa64db?.isDisabled==null)
      {
        setuseful_life_yearsa64db({...useful_life_yearsa64db,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maintenance_required_text")){
        setmaintenance_required_textf1aaf({...maintenance_required_textf1aaf,isDisabled:true});

    }else
    {
      if(maintenance_required_textf1aaf?.isDisabled==null)
      {
        setmaintenance_required_textf1aaf({...maintenance_required_textf1aaf,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maintenance_required")){
        setmaintenance_required336be({...maintenance_required336be,isDisabled:true});

    }else
    {
      if(maintenance_required336be?.isDisabled==null)
      {
        setmaintenance_required336be({...maintenance_required336be,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_texte7cc3({...confo_texte7cc3,isDisabled:true});

    }else
    {
      if(confo_texte7cc3?.isDisabled==null)
      {
        setconfo_texte7cc3({...confo_texte7cc3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("acat_id")){
        setacat_id9127b({...acat_id9127b,isDisabled:true});

    }else
    {
      if(acat_id9127b?.isDisabled==null)
      {
        setacat_id9127b({...acat_id9127b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonc0568({...cancel_buttonc0568,isDisabled:true});

    }else
    {
      if(cancel_buttonc0568?.isDisabled==null)
      {
        setcancel_buttonc0568({...cancel_buttonc0568,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonc8577({...ok_buttonc8577,isDisabled:true});

    }else
    {
      if(ok_buttonc8577?.isDisabled==null)
      {
        setok_buttonc8577({...ok_buttonc8577,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete3c2cd,
        codeStates['setgroup_delete'] = setgroup_delete3c2cd,
        codeStates['group_delete3c2cd'] = group_delete3c2cdProps,
        codeStates['setgroup_delete3c2cd'] = setgroup_delete3c2cdProps,
        codeStates['delete_heading_text'] = delete_heading_textb1f29,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb1f29,
        codeStates['category_code_text'] = category_code_text0975e,
        codeStates['setcategory_code_text'] = setcategory_code_text0975e,
        codeStates['category_code'] = category_codef16a8,
        codeStates['setcategory_code'] = setcategory_codef16a8,
        codeStates['category_name_text'] = category_name_text7648e,
        codeStates['setcategory_name_text'] = setcategory_name_text7648e,
        codeStates['category_name'] = category_namecbc0b,
        codeStates['setcategory_name'] = setcategory_namecbc0b,
        codeStates['depreciation_method_text'] = depreciation_method_text82fb3,
        codeStates['setdepreciation_method_text'] = setdepreciation_method_text82fb3,
        codeStates['depreciation_method'] = depreciation_method0e872,
        codeStates['setdepreciation_method'] = setdepreciation_method0e872,
        codeStates['useful_life_years_text'] = useful_life_years_text30347,
        codeStates['setuseful_life_years_text'] = setuseful_life_years_text30347,
        codeStates['useful_life_years'] = useful_life_yearsa64db,
        codeStates['setuseful_life_years'] = setuseful_life_yearsa64db,
        codeStates['maintenance_required_text'] = maintenance_required_textf1aaf,
        codeStates['setmaintenance_required_text'] = setmaintenance_required_textf1aaf,
        codeStates['maintenance_required'] = maintenance_required336be,
        codeStates['setmaintenance_required'] = setmaintenance_required336be,
        codeStates['confo_text'] = confo_texte7cc3,
        codeStates['setconfo_text'] = setconfo_texte7cc3,
        codeStates['acat_id'] = acat_id9127b,
        codeStates['setacat_id'] = setacat_id9127b,
        codeStates['cancel_button'] = cancel_buttonc0568,
        codeStates['setcancel_button'] = setcancel_buttonc0568,
        codeStates['ok_button'] = ok_buttonc8577,
        codeStates['setok_button'] = setok_buttonc8577,

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
        codeStates['group_delete'] = group_delete3c2cd,
        codeStates['setgroup_delete'] = setgroup_delete3c2cd,
        codeStates['group_delete3c2cd'] = group_delete3c2cdProps,
        codeStates['setgroup_delete3c2cd'] = setgroup_delete3c2cdProps,
        codeStates['delete_heading_text'] = delete_heading_textb1f29,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb1f29,
        codeStates['category_code_text'] = category_code_text0975e,
        codeStates['setcategory_code_text'] = setcategory_code_text0975e,
        codeStates['category_code'] = category_codef16a8,
        codeStates['setcategory_code'] = setcategory_codef16a8,
        codeStates['category_name_text'] = category_name_text7648e,
        codeStates['setcategory_name_text'] = setcategory_name_text7648e,
        codeStates['category_name'] = category_namecbc0b,
        codeStates['setcategory_name'] = setcategory_namecbc0b,
        codeStates['depreciation_method_text'] = depreciation_method_text82fb3,
        codeStates['setdepreciation_method_text'] = setdepreciation_method_text82fb3,
        codeStates['depreciation_method'] = depreciation_method0e872,
        codeStates['setdepreciation_method'] = setdepreciation_method0e872,
        codeStates['useful_life_years_text'] = useful_life_years_text30347,
        codeStates['setuseful_life_years_text'] = setuseful_life_years_text30347,
        codeStates['useful_life_years'] = useful_life_yearsa64db,
        codeStates['setuseful_life_years'] = setuseful_life_yearsa64db,
        codeStates['maintenance_required_text'] = maintenance_required_textf1aaf,
        codeStates['setmaintenance_required_text'] = setmaintenance_required_textf1aaf,
        codeStates['maintenance_required'] = maintenance_required336be,
        codeStates['setmaintenance_required'] = setmaintenance_required336be,
        codeStates['confo_text'] = confo_texte7cc3,
        codeStates['setconfo_text'] = setconfo_texte7cc3,
        codeStates['acat_id'] = acat_id9127b,
        codeStates['setacat_id'] = setacat_id9127b,
        codeStates['cancel_button'] = cancel_buttonc0568,
        codeStates['setcancel_button'] = setcancel_buttonc0568,
        codeStates['ok_button'] = ok_buttonc8577,
        codeStates['setok_button'] = setok_buttonc8577,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete3c2cdRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete3c2cdRef.current?.setSearchParams();
    group_delete3c2cdRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete3c2cd) && Object.keys(group_delete3c2cd)?.length>0)
      {
        setgroup_delete3c2cd({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete3c2cdProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 53',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* b1f29 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_code_text") ?<Textcategory_code_text   /* 0975e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_code") ?<Textcategory_code   /* f16a8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_name_text") ?<Textcategory_name_text   /* 7648e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_name") ?<Textcategory_name   /* cbc0b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("depreciation_method_text") ?<Textdepreciation_method_text   /* 82fb3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("depreciation_method") ?<Textdepreciation_method   /* 0e872 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("useful_life_years_text") ?<Textuseful_life_years_text   /* 30347 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("useful_life_years") ?<Textuseful_life_years   /* a64db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maintenance_required_text") ?<Textmaintenance_required_text   /* f1aaf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maintenance_required") ?<Textmaintenance_required   /* 336be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* e7cc3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("acat_id") ?<Textacat_id   /* 9127b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
