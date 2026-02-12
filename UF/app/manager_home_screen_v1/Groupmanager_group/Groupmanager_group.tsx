

'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import Groupdaily_expense_table  from "../Groupdaily_expense_table/Groupdaily_expense_table";
import Groupoffsite_expense_table  from "../Groupoffsite_expense_table/Groupoffsite_expense_table";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Cardapprovedcard  from "./Cardapprovedcard";
import Cardrejectedcard  from "./Cardrejectedcard";
import Cardpendingcard  from "./Cardpendingcard";
import Carddailyexpenses  from "./Carddailyexpenses";
import Cardoffsiteexpenses  from "./Cardoffsiteexpenses";
import Textdaily_exp  from "./Textdaily_exp";
import Textoffstie_exp  from "./Textoffstie_exp";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmanager_group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_claim_table_data_v1Props, setdfd_claim_table_data_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Template 1": {
    "allowedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offstie_exp"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offstie_exp"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offstie_exp"
    ],
    "allowedGroups": [
      "canvas",
      "manager_group",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcard75ed7, setapprovedcard75ed7}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps;
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpensese7cda, setdailyexpensese7cda}= useContext(TotalContext) as TotalContextProps;
  const {offsiteexpenses62fe1, setoffsiteexpenses62fe1}= useContext(TotalContext) as TotalContextProps;
  const {daily_expa8b25, setdaily_expa8b25}= useContext(TotalContext) as TotalContextProps;
  const {offstie_exp400c9, setoffstie_exp400c9}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approvedcard")){
      setapprovedcard75ed7({...approvedcard75ed7,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("rejectedcard")){
      setrejectedcard0ceee({...rejectedcard0ceee,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("pendingcard")){
      setpendingcard727e3({...pendingcard727e3,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("dailyexpenses")){
      setdailyexpensese7cda({...dailyexpensese7cda,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsiteexpenses")){
      setoffsiteexpenses62fe1({...offsiteexpenses62fe1,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_exp")){
      setdaily_expa8b25({...daily_expa8b25,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offstie_exp")){
      setoffstie_exp400c9({...offstie_exp400c9,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_expense_table")){
      setdaily_expense_table91568({...daily_expense_table91568,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_expense_table")){
      setoffsite_expense_table1e924({...offsite_expense_table1e924,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['manager_group']  = manager_group41477,
      codeStates['setmanager_group'] = setmanager_group41477,
      codeStates['daily_expense_table']  = daily_expense_table91568,
      codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
      codeStates['offsite_expense_table']  = offsite_expense_table1e924,
      codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const manager_group41477Ref = useRef<any>(null);
  const handleClearSearch = () => {
    manager_group41477Ref.current?.setSearchParams();
    manager_group41477Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(manager_group41477) && Object.keys(manager_group41477)?.length>0)
      {
        setmanager_group41477({})
      }
    }else 
      prevRefreshRef.current= true
  }, [manager_group41477Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 223',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundImage:"url('')",
        backgroundColor:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md ${isDark ? 'text-white' : 'text-black'}`}
    >
        {securityData[accessProfile]?.allowedGroups?.includes("daily_expense_table")  &&<Groupdaily_expense_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
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
        />}
        {securityData[accessProfile]?.allowedGroups?.includes("offsite_expense_table")  &&<Groupoffsite_expense_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
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
        />}
        {securityData[accessProfile].allowedControls.includes("approvedcard") ?<Cardapprovedcard  /* 75ed7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("rejectedcard") ?<Cardrejectedcard  /* 0ceee */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("pendingcard") ?<Cardpendingcard  /* 727e3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("dailyexpenses") ?<Carddailyexpenses  /* e7cda */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("offsiteexpenses") ?<Cardoffsiteexpenses  /* 62fe1 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("daily_exp") ?<Textdaily_exp   /* a8b25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("offstie_exp") ?<Textoffstie_exp   /* 400c9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default Groupmanager_group
