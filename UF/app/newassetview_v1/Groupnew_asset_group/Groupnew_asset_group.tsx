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
import Groupasset_info_group  from "../Groupasset_info_group/Groupasset_info_group";
import Groupclassification_group  from "../Groupclassification_group/Groupclassification_group";
import Groupadditional_details_group  from "../Groupadditional_details_group/Groupadditional_details_group";
import Grouppyrchase_details_group  from "../Grouppyrchase_details_group/Grouppyrchase_details_group";
import Groupdisposal_details_group  from "../Groupdisposal_details_group/Groupdisposal_details_group";
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
import Textasset_id  from "./Textasset_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupnew_asset_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetdoctable_v1Props, setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "asset_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group"
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
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_idb6b5a, setasset_idb6b5a}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newassetview_v1, setnewassetview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAssetView:AFVK:v1',
    [user],
    'GroupNewAssetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "366fc89ff4def8459372945d2573261e");
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
    setnew_asset_group3261eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_info_group")){
        setasset_info_groupcc113({...asset_info_groupcc113,isDisabled:true});

    }else
    {
      if(asset_info_groupcc113?.isDisabled==null)
      {
        setasset_info_groupcc113({...asset_info_groupcc113,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("classification_group")){
        setclassification_groupd9d65({...classification_groupd9d65,isDisabled:true});

    }else
    {
      if(classification_groupd9d65?.isDisabled==null)
      {
        setclassification_groupd9d65({...classification_groupd9d65,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("additional_details_group")){
        setadditional_details_groupaff35({...additional_details_groupaff35,isDisabled:true});

    }else
    {
      if(additional_details_groupaff35?.isDisabled==null)
      {
        setadditional_details_groupaff35({...additional_details_groupaff35,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pyrchase_details_group")){
        setpyrchase_details_groupc3900({...pyrchase_details_groupc3900,isDisabled:true});

    }else
    {
      if(pyrchase_details_groupc3900?.isDisabled==null)
      {
        setpyrchase_details_groupc3900({...pyrchase_details_groupc3900,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_details_group")){
        setdisposal_details_group67f77({...disposal_details_group67f77,isDisabled:true});

    }else
    {
      if(disposal_details_group67f77?.isDisabled==null)
      {
        setdisposal_details_group67f77({...disposal_details_group67f77,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_id")){
        setasset_idb6b5a({...asset_idb6b5a,isDisabled:true});

    }else
    {
      if(asset_idb6b5a?.isDisabled==null)
      {
        setasset_idb6b5a({...asset_idb6b5a,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
        codeStates['asset_id'] = asset_idb6b5a,
        codeStates['setasset_id'] = setasset_idb6b5a,

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
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
        codeStates['asset_id'] = asset_idb6b5a,
        codeStates['setasset_id'] = setasset_idb6b5a,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const new_asset_group3261eRef = useRef<any>(null);
  const handleClearSearch = () => {
    new_asset_group3261eRef.current?.setSearchParams();
    new_asset_group3261eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(new_asset_group3261e) && Object.keys(new_asset_group3261e)?.length>0)
      {
        setnew_asset_group3261e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [new_asset_group3261eProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 165',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
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
        {allowedComponent.includes("asset_info_group")  &&<Groupasset_info_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("classification_group")  &&<Groupclassification_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("additional_details_group")  &&<Groupadditional_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("pyrchase_details_group")  &&<Grouppyrchase_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("disposal_details_group")  &&<Groupdisposal_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("asset_id") ?<Textasset_id   /* b6b5a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupnew_asset_group
