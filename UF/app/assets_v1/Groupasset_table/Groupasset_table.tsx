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
import Tableasset_table  from './Tableasset_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_id",
      "asset_tag",
      "asset_name",
      "category",
      "serial_no",
      "status",
      "assigned_to",
      "location",
      "warranty_expiry",
      "view",
      "bt_delete",
      "bt_edit",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "asset_tag",
      "asset_name",
      "category",
      "serial_no",
      "status",
      "assigned_to",
      "location",
      "warranty_expiry",
      "view",
      "bt_delete",
      "bt_edit",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [
      "asset_id"
    ],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "asset_id",
      "asset_tag",
      "asset_name",
      "category",
      "serial_no",
      "status",
      "assigned_to",
      "location",
      "warranty_expiry",
      "view",
      "bt_delete",
      "bt_edit",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Network Admin": {
    "allowedControls": [
      "asset_id",
      "asset_tag",
      "asset_name",
      "category",
      "serial_no",
      "status",
      "assigned_to",
      "location",
      "warranty_expiry",
      "view",
      "bt_delete",
      "bt_edit",
      "bt_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "overall_asset_group",
      "icon_text_group",
      "asset_table"
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
  const {overall_asset_group7ded2, setoverall_asset_group7ded2}= useContext(TotalContext) as TotalContextProps;
  const {overall_asset_group7ded2Props, setoverall_asset_group7ded2Props}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bd, seticon_text_group476bd}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bdProps, seticon_text_group476bdProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38, setasset_tablef2b38}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38Props, setasset_tablef2b38Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id0e8f6, setasset_id0e8f6}= useContext(TotalContext) as TotalContextProps;
  const {asset_tagd67f5, setasset_tagd67f5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64bee, setasset_name64bee}= useContext(TotalContext) as TotalContextProps;
  const {category3fb9d, setcategory3fb9d}= useContext(TotalContext) as TotalContextProps;
  const {serial_no107f3, setserial_no107f3}= useContext(TotalContext) as TotalContextProps;
  const {status26d3e, setstatus26d3e}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toea420, setassigned_toea420}= useContext(TotalContext) as TotalContextProps;
  const {location96640, setlocation96640}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiryd732d, setwarranty_expiryd732d}= useContext(TotalContext) as TotalContextProps;
  const {viewadef5, setviewadef5}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete26265, setbt_delete26265}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit17748, setbt_edit17748}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docb191a, setbt_add_docb191a}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assets_v1, setassets_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1',
    [user],
    'GroupAssetTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2f7c1caa85a04bb5bacd9e41b26f2b38");
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
    setasset_tablef2b38Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_id")){
        setasset_id0e8f6({...asset_id0e8f6,isDisabled:true});

    }else
    {
      if(asset_id0e8f6?.isDisabled==null)
      {
        setasset_id0e8f6({...asset_id0e8f6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_tag")){
        setasset_tagd67f5({...asset_tagd67f5,isDisabled:true});

    }else
    {
      if(asset_tagd67f5?.isDisabled==null)
      {
        setasset_tagd67f5({...asset_tagd67f5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name64bee({...asset_name64bee,isDisabled:true});

    }else
    {
      if(asset_name64bee?.isDisabled==null)
      {
        setasset_name64bee({...asset_name64bee,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category")){
        setcategory3fb9d({...category3fb9d,isDisabled:true});

    }else
    {
      if(category3fb9d?.isDisabled==null)
      {
        setcategory3fb9d({...category3fb9d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("serial_no")){
        setserial_no107f3({...serial_no107f3,isDisabled:true});

    }else
    {
      if(serial_no107f3?.isDisabled==null)
      {
        setserial_no107f3({...serial_no107f3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus26d3e({...status26d3e,isDisabled:true});

    }else
    {
      if(status26d3e?.isDisabled==null)
      {
        setstatus26d3e({...status26d3e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_toea420({...assigned_toea420,isDisabled:true});

    }else
    {
      if(assigned_toea420?.isDisabled==null)
      {
        setassigned_toea420({...assigned_toea420,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("location")){
        setlocation96640({...location96640,isDisabled:true});

    }else
    {
      if(location96640?.isDisabled==null)
      {
        setlocation96640({...location96640,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("warranty_expiry")){
        setwarranty_expiryd732d({...warranty_expiryd732d,isDisabled:true});

    }else
    {
      if(warranty_expiryd732d?.isDisabled==null)
      {
        setwarranty_expiryd732d({...warranty_expiryd732d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
        setviewadef5({...viewadef5,isDisabled:true});

    }else
    {
      if(viewadef5?.isDisabled==null)
      {
        setviewadef5({...viewadef5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete26265({...bt_delete26265,isDisabled:true});

    }else
    {
      if(bt_delete26265?.isDisabled==null)
      {
        setbt_delete26265({...bt_delete26265,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_edit")){
        setbt_edit17748({...bt_edit17748,isDisabled:true});

    }else
    {
      if(bt_edit17748?.isDisabled==null)
      {
        setbt_edit17748({...bt_edit17748,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_docb191a({...bt_add_docb191a,isDisabled:true});

    }else
    {
      if(bt_add_docb191a?.isDisabled==null)
      {
        setbt_add_docb191a({...bt_add_docb191a,isDisabled:false});
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
        codeStates['overall_asset_group'] = overall_asset_group7ded2,
        codeStates['setoverall_asset_group'] = setoverall_asset_group7ded2,
        codeStates['overall_asset_group7ded2'] = overall_asset_group7ded2Props,
        codeStates['setoverall_asset_group7ded2'] = setoverall_asset_group7ded2Props,
        codeStates['icon_text_group'] = icon_text_group476bd,
        codeStates['seticon_text_group'] = seticon_text_group476bd,
        codeStates['icon_text_group476bd'] = icon_text_group476bdProps,
        codeStates['seticon_text_group476bd'] = seticon_text_group476bdProps,
        codeStates['asset_table'] = asset_tablef2b38,
        codeStates['setasset_table'] = setasset_tablef2b38,
        codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
        codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,
        codeStates['asset_id'] = asset_id0e8f6,
        codeStates['setasset_id'] = setasset_id0e8f6,
        codeStates['asset_tag'] = asset_tagd67f5,
        codeStates['setasset_tag'] = setasset_tagd67f5,
        codeStates['asset_name'] = asset_name64bee,
        codeStates['setasset_name'] = setasset_name64bee,
        codeStates['category'] = category3fb9d,
        codeStates['setcategory'] = setcategory3fb9d,
        codeStates['serial_no'] = serial_no107f3,
        codeStates['setserial_no'] = setserial_no107f3,
        codeStates['status'] = status26d3e,
        codeStates['setstatus'] = setstatus26d3e,
        codeStates['assigned_to'] = assigned_toea420,
        codeStates['setassigned_to'] = setassigned_toea420,
        codeStates['location'] = location96640,
        codeStates['setlocation'] = setlocation96640,
        codeStates['warranty_expiry'] = warranty_expiryd732d,
        codeStates['setwarranty_expiry'] = setwarranty_expiryd732d,
        codeStates['view'] = viewadef5,
        codeStates['setview'] = setviewadef5,
        codeStates['bt_delete'] = bt_delete26265,
        codeStates['setbt_delete'] = setbt_delete26265,
        codeStates['bt_edit'] = bt_edit17748,
        codeStates['setbt_edit'] = setbt_edit17748,
        codeStates['bt_add_doc'] = bt_add_docb191a,
        codeStates['setbt_add_doc'] = setbt_add_docb191a,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_tablef2b38Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_tablef2b38Ref.current?.setSearchParams();
    asset_tablef2b38Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(asset_tablef2b38) && Object.keys(asset_tablef2b38)?.length>0)
      {
        setasset_tablef2b38({})
      }
    }else 
      prevRefreshRef.current= true
  }, [asset_tablef2b38Props?.refresh,token])


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
       {<Tableasset_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={asset_tablef2b38Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupasset_table
