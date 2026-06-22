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
import Textbasic_infot_asset_text  from "./Textbasic_infot_asset_text";
import Dropdowncategory_name  from "./Dropdowncategory_name";
import Dropdownasset_type  from "./Dropdownasset_type";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputasset_tag  from "./TextInputasset_tag";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputserial_number  from "./TextInputserial_number";
import TextInputmodel_number  from "./TextInputmodel_number";
import TextInputmanufacturer  from "./TextInputmanufacturer";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assettypecombo_v1Props, setdfd_assettypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycombo_v1Props, setdfd_assetcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetclassificationcombo_v1Props, setdfd_assetclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdataclassificationcombo_v1Props, setdfd_assetdataclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ownershiptypecombo_v1Props, setdfd_ownershiptypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_disposalmethodcombo_v1Props, setdfd_disposalmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_lifecyclestagecombo_v1Props, setdfd_lifecyclestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Network Admin": {
    "allowedControls": [
      "basic_infot_asset_text",
      "category_name",
      "asset_type",
      "asset_name",
      "asset_tag",
      "asset_code",
      "serial_number",
      "model_number",
      "manufacturer"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
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
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_infot_asset_text4d8c8, setbasic_infot_asset_text4d8c8}= useContext(TotalContext) as TotalContextProps;
  const {category_name3613b, setcategory_name3613b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type91879, setasset_type91879}= useContext(TotalContext) as TotalContextProps;
  const {asset_namea35ee, setasset_namea35ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_tagcb5cb, setasset_tagcb5cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeaa68d, setasset_codeaa68d}= useContext(TotalContext) as TotalContextProps;
  const {serial_numbera45cf, setserial_numbera45cf}= useContext(TotalContext) as TotalContextProps;
  const {model_number32271, setmodel_number32271}= useContext(TotalContext) as TotalContextProps;
  const {manufacturerb8d3f, setmanufacturerb8d3f}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newasset_v1, setnewasset_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1',
    [user],
    'GroupAssetInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "660280a194cb44e488d6a1381cedeeeb");
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
    setasset_info_groupdeeebProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("basic_infot_asset_text")){
        setbasic_infot_asset_text4d8c8({...basic_infot_asset_text4d8c8,isDisabled:true});

    }else
    {
      if(basic_infot_asset_text4d8c8?.isDisabled==null)
      {
        setbasic_infot_asset_text4d8c8({...basic_infot_asset_text4d8c8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_name3613b({...category_name3613b,isDisabled:true});

    }else
    {
      if(category_name3613b?.isDisabled==null)
      {
        setcategory_name3613b({...category_name3613b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type")){
        setasset_type91879({...asset_type91879,isDisabled:true});

    }else
    {
      if(asset_type91879?.isDisabled==null)
      {
        setasset_type91879({...asset_type91879,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namea35ee({...asset_namea35ee,isDisabled:true});

    }else
    {
      if(asset_namea35ee?.isDisabled==null)
      {
        setasset_namea35ee({...asset_namea35ee,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_tag")){
        setasset_tagcb5cb({...asset_tagcb5cb,isDisabled:true});

    }else
    {
      if(asset_tagcb5cb?.isDisabled==null)
      {
        setasset_tagcb5cb({...asset_tagcb5cb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_codeaa68d({...asset_codeaa68d,isDisabled:true});

    }else
    {
      if(asset_codeaa68d?.isDisabled==null)
      {
        setasset_codeaa68d({...asset_codeaa68d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("serial_number")){
        setserial_numbera45cf({...serial_numbera45cf,isDisabled:true});

    }else
    {
      if(serial_numbera45cf?.isDisabled==null)
      {
        setserial_numbera45cf({...serial_numbera45cf,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_number")){
        setmodel_number32271({...model_number32271,isDisabled:true});

    }else
    {
      if(model_number32271?.isDisabled==null)
      {
        setmodel_number32271({...model_number32271,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("manufacturer")){
        setmanufacturerb8d3f({...manufacturerb8d3f,isDisabled:true});

    }else
    {
      if(manufacturerb8d3f?.isDisabled==null)
      {
        setmanufacturerb8d3f({...manufacturerb8d3f,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['basic_infot_asset_text'] = basic_infot_asset_text4d8c8,
        codeStates['setbasic_infot_asset_text'] = setbasic_infot_asset_text4d8c8,
        codeStates['category_name'] = category_name3613b,
        codeStates['setcategory_name'] = setcategory_name3613b,
        codeStates['asset_type'] = asset_type91879,
        codeStates['setasset_type'] = setasset_type91879,
        codeStates['asset_name'] = asset_namea35ee,
        codeStates['setasset_name'] = setasset_namea35ee,
        codeStates['asset_tag'] = asset_tagcb5cb,
        codeStates['setasset_tag'] = setasset_tagcb5cb,
        codeStates['asset_code'] = asset_codeaa68d,
        codeStates['setasset_code'] = setasset_codeaa68d,
        codeStates['serial_number'] = serial_numbera45cf,
        codeStates['setserial_number'] = setserial_numbera45cf,
        codeStates['model_number'] = model_number32271,
        codeStates['setmodel_number'] = setmodel_number32271,
        codeStates['manufacturer'] = manufacturerb8d3f,
        codeStates['setmanufacturer'] = setmanufacturerb8d3f,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,

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
        codeStates['new_asset_group'] = new_asset_groupdb5a7,
        codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
        codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
        codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
        codeStates['asset_info_group'] = asset_info_groupdeeeb,
        codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
        codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
        codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
        codeStates['basic_infot_asset_text'] = basic_infot_asset_text4d8c8,
        codeStates['setbasic_infot_asset_text'] = setbasic_infot_asset_text4d8c8,
        codeStates['category_name'] = category_name3613b,
        codeStates['setcategory_name'] = setcategory_name3613b,
        codeStates['asset_type'] = asset_type91879,
        codeStates['setasset_type'] = setasset_type91879,
        codeStates['asset_name'] = asset_namea35ee,
        codeStates['setasset_name'] = setasset_namea35ee,
        codeStates['asset_tag'] = asset_tagcb5cb,
        codeStates['setasset_tag'] = setasset_tagcb5cb,
        codeStates['asset_code'] = asset_codeaa68d,
        codeStates['setasset_code'] = setasset_codeaa68d,
        codeStates['serial_number'] = serial_numbera45cf,
        codeStates['setserial_number'] = setserial_numbera45cf,
        codeStates['model_number'] = model_number32271,
        codeStates['setmodel_number'] = setmodel_number32271,
        codeStates['manufacturer'] = manufacturerb8d3f,
        codeStates['setmanufacturer'] = setmanufacturerb8d3f,
        codeStates['classification_group'] = classification_group3c6b3,
        codeStates['setclassification_group'] = setclassification_group3c6b3,
        codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
        codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
        codeStates['additional_details_group'] = additional_details_group8c616,
        codeStates['setadditional_details_group'] = setadditional_details_group8c616,
        codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
        codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
        codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
        codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
        codeStates['disposal_details_group'] = disposal_details_groupaffa1,
        codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
        codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
        codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
        codeStates['dynamicactions'] = dynamicactions1077f,
        codeStates['setdynamicactions'] = setdynamicactions1077f,
        codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
        codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_info_groupdeeebRef = useRef<any>(null);
  const handleClearSearch = () => {
    asset_info_groupdeeebRef.current?.setSearchParams();
    asset_info_groupdeeebRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(asset_info_groupdeeeb) && Object.keys(asset_info_groupdeeeb)?.length>0)
      {
        setasset_info_groupdeeeb({})
      }
    }else 
      prevRefreshRef.current= true
  }, [asset_info_groupdeeebProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 49',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("basic_infot_asset_text") ?<Textbasic_infot_asset_text   /* 4d8c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_name") ?<Dropdowncategory_name   /* 3613b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("asset_type") ?<Dropdownasset_type   /* 91879 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* a35ee */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_tag") ?<TextInputasset_tag   /* cb5cb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* aa68d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("serial_number") ?<TextInputserial_number   /* a45cf */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("model_number") ?<TextInputmodel_number   /* 32271 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("manufacturer") ?<TextInputmanufacturer   /* b8d3f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupasset_info_group
