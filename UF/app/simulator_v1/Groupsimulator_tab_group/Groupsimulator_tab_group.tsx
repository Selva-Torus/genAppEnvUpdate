'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Groupop_financial  from "../Groupop_financial/Groupop_financial";
import Groupop_settlement  from "../Groupop_settlement/Groupop_settlement";
import Groupip_financial  from "../Groupip_financial/Groupip_financial";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupsimulator_tab_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
    const decodedTokenObj:any = decodeToken(token);

  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_returnreasondfd_v1Props, setdfd_returnreasondfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const securityData:any={
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "simulator_main_group",
      "simulator_tab_group",
      "op_financial",
      "op_financial_grp",
      "op_settlement",
      "op_settlement_grp",
      "ip_financial",
      "ip_debtor_dtls",
      "ip_creditor_dtls",
      "payment_dtls",
      "addionl_info",
      "button_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "simulator_main_group",
      "simulator_tab_group",
      "op_financial",
      "op_financial_grp",
      "op_settlement",
      "op_settlement_grp",
      "ip_financial",
      "ip_debtor_dtls",
      "ip_creditor_dtls",
      "payment_dtls",
      "addionl_info",
      "button_grp"
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
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "9f7141f15d3b4a2aa6106d64cb7fd732"
      );
  code = orchestrationData?.data?.code;
  setAllCode(orchestrationData?.data?.code||"");
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  for(let i=0;i<tabOptions?.length;i++){
    if(allowedGroups?.find((group)=>(group==tabOptions[i]?.id)))
    {
      setsimulator_tab_groupfd732((pre:any)=>({...pre,simulator_tab_group:tabOptions[i]?.id}));
      break;
    }
  }   
  /////////////
        setop_financial4735b({...op_financial4735b,isDisabled:orchestrationData?.data?.readableControls.includes("op_financial")});
        setop_settlemente399b({...op_settlemente399b,isDisabled:orchestrationData?.data?.readableControls.includes("op_settlement")});
        setip_financial66005({...ip_financial66005,isDisabled:orchestrationData?.data?.readableControls.includes("ip_financial")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "op_financial",
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        setsimulator_tab_groupfd732((pre:any)=>({...pre,simulator_tab_group:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,
      codeExecution(code,codeStates);
    }
    setsimulator_tab_groupfd732((pre:any)=>({...pre,simulator_tab_group:id}));

  }
  const simulator_tab_groupfd732Ref = useRef<any>(null);
  const handleClearSearch = () => {
    simulator_tab_groupfd732Ref.current?.setSearchParams();
    simulator_tab_groupfd732Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(simulator_tab_groupfd732) && Object.keys(simulator_tab_groupfd732)?.length>0)
      {
        setsimulator_tab_groupfd732({})
      }
    }else 
      prevRefreshRef.current= true
  }, [simulator_tab_groupfd732Props?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "op_financial",
      "title": "OP Financial",
      "content": <Groupop_financial
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
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "op_settlement",
      "title": "OP Settlement",
      "content": <Groupop_settlement
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
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "ip_financial",
      "title": "IP Financial",
      "content": <Groupip_financial
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
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
  ]
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 231',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'#ffffff',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md`}
    >
    <Tabs
      headerClassName="p-1"
      items={tabOptions}
      security={allowedComponent}
      direction='horizontal'
      onChange={handleOnChange}
      defaultActiveId={simulator_tab_groupfd732?.simulator_tab_group || "op_financial"}
      activeTab={simulator_tab_groupfd732?.simulator_tab_group || "op_financial"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Groupsimulator_tab_group
