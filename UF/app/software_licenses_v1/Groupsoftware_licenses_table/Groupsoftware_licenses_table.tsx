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
import Tablesoftware_licenses_table  from './Tablesoftware_licenses_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupsoftware_licenses_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "license_id",
      "product_name",
      "license_type",
      "seats_total",
      "seats_used",
      "expiry_date",
      "cost",
      "view",
      "edit_btn",
      "button_delete",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_softwarelicenses_group",
      "icon_text_group",
      "software_licenses_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "license_id",
      "product_name",
      "license_type",
      "seats_total",
      "seats_used",
      "expiry_date",
      "cost",
      "view",
      "edit_btn",
      "button_delete",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_softwarelicenses_group",
      "icon_text_group",
      "software_licenses_table"
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
  const {overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7, seticon_text_group44cf7}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7Props, seticon_text_group44cf7Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5d, setsoftware_licenses_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {license_id87b4a, setlicense_id87b4a}= useContext(TotalContext) as TotalContextProps;
  const {product_namedaa81, setproduct_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {license_typeba0b9, setlicense_typeba0b9}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalc4b88, setseats_totalc4b88}= useContext(TotalContext) as TotalContextProps;
  const {seats_used910b8, setseats_used910b8}= useContext(TotalContext) as TotalContextProps;
  const {expiry_date7fb4b, setexpiry_date7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {cost0d30b, setcost0d30b}= useContext(TotalContext) as TotalContextProps;
  const {view113d0, setview113d0}= useContext(TotalContext) as TotalContextProps;
  const {edit_btne7446, setedit_btne7446}= useContext(TotalContext) as TotalContextProps;
  const {button_delete6b394, setbutton_delete6b394}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doce2f55, setbt_add_doce2f55}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetsoftwarelicenses_v1, setassetsoftwarelicenses_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetSoftwareLicenses:AFVK:v1',
    [user],
    'GroupSoftwareLicensesTable',
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
    setsoftware_licenses_table75a5dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("license_id")){
        setlicense_id87b4a({...license_id87b4a,isDisabled:true});

    }else
    {
      if(license_id87b4a?.isDisabled==null)
      {
        setlicense_id87b4a({...license_id87b4a,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name")){
        setproduct_namedaa81({...product_namedaa81,isDisabled:true});

    }else
    {
      if(product_namedaa81?.isDisabled==null)
      {
        setproduct_namedaa81({...product_namedaa81,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_type")){
        setlicense_typeba0b9({...license_typeba0b9,isDisabled:true});

    }else
    {
      if(license_typeba0b9?.isDisabled==null)
      {
        setlicense_typeba0b9({...license_typeba0b9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_total")){
        setseats_totalc4b88({...seats_totalc4b88,isDisabled:true});

    }else
    {
      if(seats_totalc4b88?.isDisabled==null)
      {
        setseats_totalc4b88({...seats_totalc4b88,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_used")){
        setseats_used910b8({...seats_used910b8,isDisabled:true});

    }else
    {
      if(seats_used910b8?.isDisabled==null)
      {
        setseats_used910b8({...seats_used910b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expiry_date")){
        setexpiry_date7fb4b({...expiry_date7fb4b,isDisabled:true});

    }else
    {
      if(expiry_date7fb4b?.isDisabled==null)
      {
        setexpiry_date7fb4b({...expiry_date7fb4b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cost")){
        setcost0d30b({...cost0d30b,isDisabled:true});

    }else
    {
      if(cost0d30b?.isDisabled==null)
      {
        setcost0d30b({...cost0d30b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
        setview113d0({...view113d0,isDisabled:true});

    }else
    {
      if(view113d0?.isDisabled==null)
      {
        setview113d0({...view113d0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btne7446({...edit_btne7446,isDisabled:true});

    }else
    {
      if(edit_btne7446?.isDisabled==null)
      {
        setedit_btne7446({...edit_btne7446,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_delete")){
        setbutton_delete6b394({...button_delete6b394,isDisabled:true});

    }else
    {
      if(button_delete6b394?.isDisabled==null)
      {
        setbutton_delete6b394({...button_delete6b394,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_doce2f55({...bt_add_doce2f55,isDisabled:true});

    }else
    {
      if(bt_add_doce2f55?.isDisabled==null)
      {
        setbt_add_doce2f55({...bt_add_doce2f55,isDisabled:false});
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
        codeStates['overall_softwarelicenses_group'] = overall_softwarelicenses_group04cba,
        codeStates['setoverall_softwarelicenses_group'] = setoverall_softwarelicenses_group04cba,
        codeStates['overall_softwarelicenses_group04cba'] = overall_softwarelicenses_group04cbaProps,
        codeStates['setoverall_softwarelicenses_group04cba'] = setoverall_softwarelicenses_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group44cf7,
        codeStates['seticon_text_group'] = seticon_text_group44cf7,
        codeStates['icon_text_group44cf7'] = icon_text_group44cf7Props,
        codeStates['seticon_text_group44cf7'] = seticon_text_group44cf7Props,
        codeStates['software_licenses_table'] = software_licenses_table75a5d,
        codeStates['setsoftware_licenses_table'] = setsoftware_licenses_table75a5d,
        codeStates['software_licenses_table75a5d'] = software_licenses_table75a5dProps,
        codeStates['setsoftware_licenses_table75a5d'] = setsoftware_licenses_table75a5dProps,
        codeStates['license_id'] = license_id87b4a,
        codeStates['setlicense_id'] = setlicense_id87b4a,
        codeStates['product_name'] = product_namedaa81,
        codeStates['setproduct_name'] = setproduct_namedaa81,
        codeStates['license_type'] = license_typeba0b9,
        codeStates['setlicense_type'] = setlicense_typeba0b9,
        codeStates['seats_total'] = seats_totalc4b88,
        codeStates['setseats_total'] = setseats_totalc4b88,
        codeStates['seats_used'] = seats_used910b8,
        codeStates['setseats_used'] = setseats_used910b8,
        codeStates['expiry_date'] = expiry_date7fb4b,
        codeStates['setexpiry_date'] = setexpiry_date7fb4b,
        codeStates['cost'] = cost0d30b,
        codeStates['setcost'] = setcost0d30b,
        codeStates['view'] = view113d0,
        codeStates['setview'] = setview113d0,
        codeStates['edit_btn'] = edit_btne7446,
        codeStates['setedit_btn'] = setedit_btne7446,
        codeStates['button_delete'] = button_delete6b394,
        codeStates['setbutton_delete'] = setbutton_delete6b394,
        codeStates['bt_add_doc'] = bt_add_doce2f55,
        codeStates['setbt_add_doc'] = setbt_add_doce2f55,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const software_licenses_table75a5dRef = useRef<any>(null);
  const handleClearSearch = () => {
    software_licenses_table75a5dRef.current?.setSearchParams();
    software_licenses_table75a5dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(software_licenses_table75a5d) && Object.keys(software_licenses_table75a5d)?.length>0)
      {
        setsoftware_licenses_table75a5d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [software_licenses_table75a5dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 117',
      
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
       {<Tablesoftware_licenses_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={software_licenses_table75a5dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupsoftware_licenses_table
