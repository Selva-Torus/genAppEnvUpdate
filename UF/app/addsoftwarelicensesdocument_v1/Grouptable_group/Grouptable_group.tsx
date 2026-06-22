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
import Groupsoftware_licenses_doc_table  from "../Groupsoftware_licenses_doc_table/Groupsoftware_licenses_doc_table";
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
import Textlicense_id_text  from "./Textlicense_id_text";
import Textlicense_id  from "./Textlicense_id";
import Textproduct_name_text  from "./Textproduct_name_text";
import Textproduct_name  from "./Textproduct_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_softwaredoctable_v1Props, setdfd_softwaredoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "license_id_text",
      "license_id",
      "product_name_text",
      "product_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "software_licenses_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "license_id_text",
      "license_id",
      "product_name_text",
      "product_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "software_licenses_doc_table"
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
  const {doc_attached_groupc3d26, setdoc_attached_groupc3d26}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52, settable_group7bc52}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52Props, settable_group7bc52Props}= useContext(TotalContext) as TotalContextProps;
  const {license_id_text641eb, setlicense_id_text641eb}= useContext(TotalContext) as TotalContextProps;
  const {license_idd34c8, setlicense_idd34c8}= useContext(TotalContext) as TotalContextProps;
  const {product_name_textc07aa, setproduct_name_textc07aa}= useContext(TotalContext) as TotalContextProps;
  const {product_name405f8, setproduct_name405f8}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addsoftwarelicensesdocument_v1, setaddsoftwarelicensesdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addSoftwareLicensesDocument:AFVK:v1',
    [user],
    'GroupTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1475e6b9d793cf06b6597be2c287bc52");
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
    settable_group7bc52Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("license_id_text")){
        setlicense_id_text641eb({...license_id_text641eb,isDisabled:true});

    }else
    {
      if(license_id_text641eb?.isDisabled==null)
      {
        setlicense_id_text641eb({...license_id_text641eb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_id")){
        setlicense_idd34c8({...license_idd34c8,isDisabled:true});

    }else
    {
      if(license_idd34c8?.isDisabled==null)
      {
        setlicense_idd34c8({...license_idd34c8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name_text")){
        setproduct_name_textc07aa({...product_name_textc07aa,isDisabled:true});

    }else
    {
      if(product_name_textc07aa?.isDisabled==null)
      {
        setproduct_name_textc07aa({...product_name_textc07aa,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name")){
        setproduct_name405f8({...product_name405f8,isDisabled:true});

    }else
    {
      if(product_name405f8?.isDisabled==null)
      {
        setproduct_name405f8({...product_name405f8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("software_licenses_doc_table")){
        setsoftware_licenses_doc_table265b6({...software_licenses_doc_table265b6,isDisabled:true});

    }else
    {
      if(software_licenses_doc_table265b6?.isDisabled==null)
      {
        setsoftware_licenses_doc_table265b6({...software_licenses_doc_table265b6,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupc3d26,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupc3d26,
        codeStates['doc_attached_groupc3d26'] = doc_attached_groupc3d26Props,
        codeStates['setdoc_attached_groupc3d26'] = setdoc_attached_groupc3d26Props,
        codeStates['table_group'] = table_group7bc52,
        codeStates['settable_group'] = settable_group7bc52,
        codeStates['table_group7bc52'] = table_group7bc52Props,
        codeStates['settable_group7bc52'] = settable_group7bc52Props,
        codeStates['license_id_text'] = license_id_text641eb,
        codeStates['setlicense_id_text'] = setlicense_id_text641eb,
        codeStates['license_id'] = license_idd34c8,
        codeStates['setlicense_id'] = setlicense_idd34c8,
        codeStates['product_name_text'] = product_name_textc07aa,
        codeStates['setproduct_name_text'] = setproduct_name_textc07aa,
        codeStates['product_name'] = product_name405f8,
        codeStates['setproduct_name'] = setproduct_name405f8,
        codeStates['software_licenses_doc_table'] = software_licenses_doc_table265b6,
        codeStates['setsoftware_licenses_doc_table'] = setsoftware_licenses_doc_table265b6,
        codeStates['software_licenses_doc_table265b6'] = software_licenses_doc_table265b6Props,
        codeStates['setsoftware_licenses_doc_table265b6'] = setsoftware_licenses_doc_table265b6Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupc3d26,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupc3d26,
        codeStates['doc_attached_groupc3d26'] = doc_attached_groupc3d26Props,
        codeStates['setdoc_attached_groupc3d26'] = setdoc_attached_groupc3d26Props,
        codeStates['table_group'] = table_group7bc52,
        codeStates['settable_group'] = settable_group7bc52,
        codeStates['table_group7bc52'] = table_group7bc52Props,
        codeStates['settable_group7bc52'] = settable_group7bc52Props,
        codeStates['license_id_text'] = license_id_text641eb,
        codeStates['setlicense_id_text'] = setlicense_id_text641eb,
        codeStates['license_id'] = license_idd34c8,
        codeStates['setlicense_id'] = setlicense_idd34c8,
        codeStates['product_name_text'] = product_name_textc07aa,
        codeStates['setproduct_name_text'] = setproduct_name_textc07aa,
        codeStates['product_name'] = product_name405f8,
        codeStates['setproduct_name'] = setproduct_name405f8,
        codeStates['software_licenses_doc_table'] = software_licenses_doc_table265b6,
        codeStates['setsoftware_licenses_doc_table'] = setsoftware_licenses_doc_table265b6,
        codeStates['software_licenses_doc_table265b6'] = software_licenses_doc_table265b6Props,
        codeStates['setsoftware_licenses_doc_table265b6'] = setsoftware_licenses_doc_table265b6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group7bc52Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_group7bc52Ref.current?.setSearchParams();
    table_group7bc52Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group7bc52) && Object.keys(table_group7bc52)?.length>0)
      {
        settable_group7bc52({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group7bc52Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 74',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("software_licenses_doc_table")  &&<Groupsoftware_licenses_doc_table  
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
          {allowedControls.includes("license_id_text") ?<Textlicense_id_text   /* 641eb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("license_id") ?<Textlicense_id   /* d34c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_name_text") ?<Textproduct_name_text   /* c07aa */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_name") ?<Textproduct_name   /* 405f8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
