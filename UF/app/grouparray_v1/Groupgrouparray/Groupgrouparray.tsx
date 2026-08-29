





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
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Groupgrouparray = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_group_array_dsd_v1Props, setdfd_group_array_dsd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Employee": {
    "allowedControls": [
      "daily_expense",
      "expense_name",
      "email",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "daily_expense",
      "expense_name",
      "email",
      "expense_date",
      "claim_category",
      "category_total_amount",
      "receipt_image",
      "comments"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "grouparray"
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
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps;
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps;
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps;
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["grouparray_0","grouparray_1","grouparray_2","grouparray_3","grouparray_4","grouparray_5",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 6;
;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "05177fac499640d4bf45a199a95494e0");
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
    if(orchestrationData?.data?.readableControls.includes("daily_expense")){
      setdaily_expense3c178({...daily_expense3c178,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("expense_name")){
      setexpense_namec83ee({...expense_namec83ee,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("email")){
      setemail0c3ca({...email0c3ca,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("expense_date")){
      setexpense_datee6e16({...expense_datee6e16,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("claim_category")){
      setclaim_categoryf03f1({...claim_categoryf03f1,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("category_total_amount")){
      setcategory_total_amount49375({...category_total_amount49375,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_image")){
      setreceipt_image4f1bf({...receipt_image4f1bf,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("comments")){
      setcomments7171e({...comments7171e,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['group']  = group84b9c,
      codeStates['setgroup'] = setgroup84b9c,
      codeStates['grouparray']  = grouparray494e0,
      codeStates['setgrouparray'] = setgrouparray494e0,

    codeExecution(code,codeStates);
    } 
  }

  function handleConfirmOnLoad(){
  }

    const handleOnload=()=>{
      // copyFormData for group
      let _groupArrays_3:any=["grouparray",...group84b9c?._groupArrays_||[]]
      _groupArrays_3 = _groupArrays_3.filter((value:any, index:any, self:any) => self.indexOf(value) === index);;
      setgroup84b9c((prev:any) => ({ ...prev, ...grouparray494e0,"_groupArrays_":_groupArrays_3 }));
  }
  const handleOnChange=()=>{

  }
  const grouparray494e0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grouparray494e0Ref.current?.setSearchParams();
    grouparray494e0Ref.current?.handleSearch({});
  };
[
  {
    "id": "05177fac499640d4bf45a199a95494e0",
    "name": "grouparray",
    "type": "group",
    "sequence": 1
  },
  {
    "id": "05177fac499640d4bf45a199a95494e0.1.1",
    "name": "onLoad",
    "type": "eventNode",
    "sequence": "1.1"
  },
  {
    "id": "05177fac499640d4bf45a199a95494e0.1.1.1",
    "name": "copyFormData",
    "type": "handlerNode",
    "eventContext": "riseListen",
    "sequence": "1.1.1",
    "value": ""
  },
  {
    "id": "8a9a1198a9e0460bb61bd440d3784b9c.1.1.1.1",
    "name": "GroupArray.v1|group",
    "type": "screen",
    "sequence": "1.1.1.1",
    "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:GroupArray:AFVK:v1|group",
    "elementType": "group",
    "groupType": "group"
  }
]
    useEffect(() => {
        setgrouparray494e0({grouparray:[grouparray494e0_0,grouparray494e0_1,grouparray494e0_2,grouparray494e0_3,grouparray494e0_4,grouparray494e0_5]})
    },[grouparray494e0_0,grouparray494e0_1,grouparray494e0_2,grouparray494e0_3,grouparray494e0_4,grouparray494e0_5])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(grouparray494e0) && Object.keys(grouparray494e0)?.length>0)
      {
        setgrouparray494e0({})
        setgrouparray494e0_0({})
        setgrouparray494e0_1({})
        setgrouparray494e0_2({})
        setgrouparray494e0_3({})
        setgrouparray494e0_4({})
        setgrouparray494e0_5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [grouparray494e0Props?.refresh,token])

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    handleOnChange()
  }, [grouparray494e0])
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
  ];
let groupLable:string =""

return (
    <div 
        ref={containerRef}
      style={{          
        gridColumn: '2 / 24',
        gridRow: '8 / 195',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        backgroundColor:'#cfd2dd',
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
        <span >
          <Text variant="">
            {groupLable}
          </Text>
        </span>
        <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '16px' }}>
          {groupLable} {formNumber} of {totalPagesStr}
        </span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '', margin: '0' }}>
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
