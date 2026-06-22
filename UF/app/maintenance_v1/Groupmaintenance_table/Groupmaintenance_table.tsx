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
import Tablemaintenance_table  from './Tablemaintenance_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmaintenance_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ref",
      "asset_name",
      "maint_type",
      "description",
      "vendor_name",
      "scheduled_date",
      "cost",
      "status",
      "view",
      "bt_edit",
      "bt_delete",
      "maint_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_maintenance_group",
      "icon_group",
      "maintenance_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "ref",
      "asset_name",
      "maint_type",
      "description",
      "vendor_name",
      "scheduled_date",
      "cost",
      "status",
      "view",
      "bt_edit",
      "bt_delete",
      "maint_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_maintenance_group",
      "icon_group",
      "maintenance_table"
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
  const {overall_maintenance_group04cba, setoverall_maintenance_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3, seticon_groupedce3}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3Props, seticon_groupedce3Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5d, setmaintenance_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5dProps, setmaintenance_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {refdaa81, setrefdaa81}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameba6cd, setasset_nameba6cd}= useContext(TotalContext) as TotalContextProps;
  const {maint_typeba0b9, setmaint_typeba0b9}= useContext(TotalContext) as TotalContextProps;
  const {descriptionc4b88, setdescriptionc4b88}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name910b8, setvendor_name910b8}= useContext(TotalContext) as TotalContextProps;
  const {scheduled_datee0685, setscheduled_datee0685}= useContext(TotalContext) as TotalContextProps;
  const {cost7fb4b, setcost7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {status0d30b, setstatus0d30b}= useContext(TotalContext) as TotalContextProps;
  const {view113d0, setview113d0}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit93fc7, setbt_edit93fc7}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete70a91, setbt_delete70a91}= useContext(TotalContext) as TotalContextProps;
  const {maint_idd22c1, setmaint_idd22c1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetmaintenance_v1, setassetmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1',
    [user],
    'GroupMaintenanceTable',
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
    setmaintenance_table75a5dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ref")){
        setrefdaa81({...refdaa81,isDisabled:true});

    }else
    {
      if(refdaa81?.isDisabled==null)
      {
        setrefdaa81({...refdaa81,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_nameba6cd({...asset_nameba6cd,isDisabled:true});

    }else
    {
      if(asset_nameba6cd?.isDisabled==null)
      {
        setasset_nameba6cd({...asset_nameba6cd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_type")){
        setmaint_typeba0b9({...maint_typeba0b9,isDisabled:true});

    }else
    {
      if(maint_typeba0b9?.isDisabled==null)
      {
        setmaint_typeba0b9({...maint_typeba0b9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptionc4b88({...descriptionc4b88,isDisabled:true});

    }else
    {
      if(descriptionc4b88?.isDisabled==null)
      {
        setdescriptionc4b88({...descriptionc4b88,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vendor_name")){
        setvendor_name910b8({...vendor_name910b8,isDisabled:true});

    }else
    {
      if(vendor_name910b8?.isDisabled==null)
      {
        setvendor_name910b8({...vendor_name910b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("scheduled_date")){
        setscheduled_datee0685({...scheduled_datee0685,isDisabled:true});

    }else
    {
      if(scheduled_datee0685?.isDisabled==null)
      {
        setscheduled_datee0685({...scheduled_datee0685,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cost")){
        setcost7fb4b({...cost7fb4b,isDisabled:true});

    }else
    {
      if(cost7fb4b?.isDisabled==null)
      {
        setcost7fb4b({...cost7fb4b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus0d30b({...status0d30b,isDisabled:true});

    }else
    {
      if(status0d30b?.isDisabled==null)
      {
        setstatus0d30b({...status0d30b,isDisabled:false});
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
    if(orchestrationData?.data?.readableControls.includes("bt_edit")){
        setbt_edit93fc7({...bt_edit93fc7,isDisabled:true});

    }else
    {
      if(bt_edit93fc7?.isDisabled==null)
      {
        setbt_edit93fc7({...bt_edit93fc7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete70a91({...bt_delete70a91,isDisabled:true});

    }else
    {
      if(bt_delete70a91?.isDisabled==null)
      {
        setbt_delete70a91({...bt_delete70a91,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_id")){
        setmaint_idd22c1({...maint_idd22c1,isDisabled:true});

    }else
    {
      if(maint_idd22c1?.isDisabled==null)
      {
        setmaint_idd22c1({...maint_idd22c1,isDisabled:false});
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
        codeStates['overall_maintenance_group'] = overall_maintenance_group04cba,
        codeStates['setoverall_maintenance_group'] = setoverall_maintenance_group04cba,
        codeStates['overall_maintenance_group04cba'] = overall_maintenance_group04cbaProps,
        codeStates['setoverall_maintenance_group04cba'] = setoverall_maintenance_group04cbaProps,
        codeStates['icon_group'] = icon_groupedce3,
        codeStates['seticon_group'] = seticon_groupedce3,
        codeStates['icon_groupedce3'] = icon_groupedce3Props,
        codeStates['seticon_groupedce3'] = seticon_groupedce3Props,
        codeStates['maintenance_table'] = maintenance_table75a5d,
        codeStates['setmaintenance_table'] = setmaintenance_table75a5d,
        codeStates['maintenance_table75a5d'] = maintenance_table75a5dProps,
        codeStates['setmaintenance_table75a5d'] = setmaintenance_table75a5dProps,
        codeStates['ref'] = refdaa81,
        codeStates['setref'] = setrefdaa81,
        codeStates['asset_name'] = asset_nameba6cd,
        codeStates['setasset_name'] = setasset_nameba6cd,
        codeStates['maint_type'] = maint_typeba0b9,
        codeStates['setmaint_type'] = setmaint_typeba0b9,
        codeStates['description'] = descriptionc4b88,
        codeStates['setdescription'] = setdescriptionc4b88,
        codeStates['vendor_name'] = vendor_name910b8,
        codeStates['setvendor_name'] = setvendor_name910b8,
        codeStates['scheduled_date'] = scheduled_datee0685,
        codeStates['setscheduled_date'] = setscheduled_datee0685,
        codeStates['cost'] = cost7fb4b,
        codeStates['setcost'] = setcost7fb4b,
        codeStates['status'] = status0d30b,
        codeStates['setstatus'] = setstatus0d30b,
        codeStates['view'] = view113d0,
        codeStates['setview'] = setview113d0,
        codeStates['bt_edit'] = bt_edit93fc7,
        codeStates['setbt_edit'] = setbt_edit93fc7,
        codeStates['bt_delete'] = bt_delete70a91,
        codeStates['setbt_delete'] = setbt_delete70a91,
        codeStates['maint_id'] = maint_idd22c1,
        codeStates['setmaint_id'] = setmaint_idd22c1,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const maintenance_table75a5dRef = useRef<any>(null);
  const handleClearSearch = () => {
    maintenance_table75a5dRef.current?.setSearchParams();
    maintenance_table75a5dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(maintenance_table75a5d) && Object.keys(maintenance_table75a5d)?.length>0)
      {
        setmaintenance_table75a5d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [maintenance_table75a5dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 118',
      
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
       {<Tablemaintenance_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={maintenance_table75a5dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupmaintenance_table
