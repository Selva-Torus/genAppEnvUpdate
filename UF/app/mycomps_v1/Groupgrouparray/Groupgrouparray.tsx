





'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
    
import Groupgrouparray_0  from "../Groupgrouparray_0/Groupgrouparray_0";
    
import Groupgrouparray_1  from "../Groupgrouparray_1/Groupgrouparray_1";
    
import Groupgrouparray_2  from "../Groupgrouparray_2/Groupgrouparray_2";
    
import Groupgrouparray_3  from "../Groupgrouparray_3/Groupgrouparray_3";
    
import Groupgrouparray_4  from "../Groupgrouparray_4/Groupgrouparray_4";
    
import Groupgrouparray_5  from "../Groupgrouparray_5/Groupgrouparray_5";
    
import Groupgrouparray_6  from "../Groupgrouparray_6/Groupgrouparray_6";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Groupgrouparray = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [ruleData,setRuleData]= useState<any>([]);
  //const [dynamicActionButtonOrder,setDynamicActionButtonOrder]= useState<any>({});
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "emplyoee": {
    "allowedControls": [
      "textinput123123"
    ],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "textinput123123"
    ],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "textinput123123"
    ],
    "allowedGroups": [
      "dddd",
      "group",
      "grouparray",
      "tab_group",
      "tab_header_2",
      "groupb",
      "table",
      "tab_header_3",
      "groupa"
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
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput123123539f0, settextinput123123539f0}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3, settab_group4b1a3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3Props, settab_group4b1a3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515d, settab_header_22515d}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515dProps, settab_header_22515dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565e, setgroupb5565e}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565eProps, setgroupb5565eProps}= useContext(TotalContext) as TotalContextProps;
  const {table050eb, settable050eb}= useContext(TotalContext) as TotalContextProps;
  const {table050ebProps, settable050ebProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9, settab_header_370ce9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9Props, settab_header_370ce9Props}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825e, setgroupa1825e}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825eProps, setgroupa1825eProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_0, setgrouparray81c1a_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_0Props, setgrouparray81c1a_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_1, setgrouparray81c1a_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_1Props, setgrouparray81c1a_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_2, setgrouparray81c1a_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_2Props, setgrouparray81c1a_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_3, setgrouparray81c1a_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_3Props, setgrouparray81c1a_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_4, setgrouparray81c1a_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_4Props, setgrouparray81c1a_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_5, setgrouparray81c1a_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_5Props, setgrouparray81c1a_5Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_6, setgrouparray81c1a_6}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_6Props, setgrouparray81c1a_6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["grouparray_0","grouparray_1","grouparray_2","grouparray_3","grouparray_4","grouparray_5","grouparray_6",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 7;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "9d57008657294ab0a880c38b2c181c1a");
  code = orchestrationData?.data?.code;
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("textinput123123")){
      settextinput123123539f0({...textinput123123539f0,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['group']  = group5635d,
      codeStates['setgroup'] = setgroup5635d,
      codeStates['grouparray']  = grouparray81c1a,
      codeStates['setgrouparray'] = setgrouparray81c1a,
      codeStates['groupb']  = groupb5565e,
      codeStates['setgroupb'] = setgroupb5565e,
      codeStates['table']  = table050eb,
      codeStates['settable'] = settable050eb,
      codeStates['groupa']  = groupa1825e,
      codeStates['setgroupa'] = setgroupa1825e,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const grouparray81c1aRef = useRef<any>(null);
  const handleClearSearch = () => {
    grouparray81c1aRef.current?.setSearchParams();
    grouparray81c1aRef.current?.handleSearch({});
  };
""
    useEffect(() => {
        setgrouparray81c1a({grouparray:[grouparray81c1a_0,grouparray81c1a_1,grouparray81c1a_2,grouparray81c1a_3,grouparray81c1a_4,grouparray81c1a_5,grouparray81c1a_6]})
    },[grouparray81c1a_0,grouparray81c1a_1,grouparray81c1a_2,grouparray81c1a_3,grouparray81c1a_4,grouparray81c1a_5,grouparray81c1a_6])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(grouparray81c1a) && Object.keys(grouparray81c1a)?.length>0)
      {
        setgrouparray81c1a({})
      }
    }else 
      prevRefreshRef.current= true
  }, [grouparray81c1aProps?.refresh,token])

  const formNumber = String(currentPage + 1).padStart(2, '0');
  const totalPagesStr = String(totalPages).padStart(2, '0');
  const commonProps = {
    lockedData,
    setLockedData,
    primaryTableData,
    setPrimaryTableData,
    checkToAdd,
    setCheckToAdd,
    refetch,
    setRefetch,
    encryptionFlagPageData,
    paginationDetails,
    setIsProcessing,
    groupData, 
    controlData
  };

  const pages = [
    <Groupgrouparray_0  key={0} {...commonProps} />,
    <Groupgrouparray_1  key={1} {...commonProps} />,
    <Groupgrouparray_2  key={2} {...commonProps} />,
    <Groupgrouparray_3  key={3} {...commonProps} />,
    <Groupgrouparray_4  key={4} {...commonProps} />,
    <Groupgrouparray_5  key={5} {...commonProps} />,
    <Groupgrouparray_6  key={6} {...commonProps} />,
  ];
let groupLable:string ="ddd"

return (
    <div 
        ref={containerRef}
      style={{          
        gridColumn: '9 / 24',
        gridRow: '4 / 59',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
    >
      <div className='flex justify-between pt-2 pb-2 p-1 ml-4'>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>
         {groupLable}
        </span>
        <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '16px' }}>
          {groupLable} {formNumber} of {totalPagesStr}
        </span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#ffffff', margin: '0' }}>
        {pages[currentPage]}
      </div>

      <div className='flex justify-between pt-2 pb-2 p-1'>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: currentPage === 0 ? '#9ca3af' : '#3b5bdb',
            backgroundColor: currentPage === 0 ? '#f1f3f5' : '#dde3f8',
            border: 'none',
            borderRadius: '8px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            marginLeft: '16px',
            marginBottom: '8px',
          }}
        >
          ← Previous
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: currentPage === totalPages - 1 ? '#93c5fd' : '#1d4ed8',
            border: 'none',
            borderRadius: '6px',
            cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
            marginRight: '16px',
            marginBottom: '8px',
          }}
        >
          Next →
        </button>
      </div>
    </div>
 )
}

export default Groupgrouparray
