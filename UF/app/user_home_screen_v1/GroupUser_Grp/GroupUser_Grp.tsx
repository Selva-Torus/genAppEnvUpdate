

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
import Buttonadd  from "./Buttonadd";
import Buttonoffsite_add  from "./Buttonoffsite_add";
import Textdaily_exp  from "./Textdaily_exp";
import Textoffsite_exp  from "./Textoffsite_exp";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupUser_Grp = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,paginationDetails,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "add",
      "offsite_add",
      "daily_exp",
      "offsite_exp"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "add",
      "offsite_add",
      "daily_exp",
      "offsite_exp"
    ],
    "allowedGroups": [
      "canvas",
      "user_grp",
      "daily_expense_table",
      "offsite_expense_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "add",
      "offsite_add"
    ],
    "allowedGroups": [],
    "blockedControls": [
      "approvedcard",
      "rejectedcard",
      "pendingcard",
      "dailyexpenses",
      "offsiteexpenses",
      "daily_exp",
      "offsite_exp"
    ],
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
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcardefafa, setrejectedcardefafa}= useContext(TotalContext) as TotalContextProps;
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps;
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps;
  const {addd126f, setaddd126f}= useContext(TotalContext) as TotalContextProps;
  const {offsite_add1ab15, setoffsite_add1ab15}= useContext(TotalContext) as TotalContextProps;
  const {daily_expa1e3b, setdaily_expa1e3b}= useContext(TotalContext) as TotalContextProps;
  const {offsite_exp949f2, setoffsite_exp949f2}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("approvedcard")){
      setapprovedcardc5971({...approvedcardc5971,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("rejectedcard")){
      setrejectedcardefafa({...rejectedcardefafa,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("pendingcard")){
      setpendingcardee3c0({...pendingcardee3c0,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("dailyexpenses")){
      setdailyexpenses798bd({...dailyexpenses798bd,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsiteexpenses")){
      setoffsiteexpensescd925({...offsiteexpensescd925,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("add")){
      setaddd126f({...addd126f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_add")){
      setoffsite_add1ab15({...offsite_add1ab15,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_exp")){
      setdaily_expa1e3b({...daily_expa1e3b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_exp")){
      setoffsite_exp949f2({...offsite_exp949f2,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("daily_expense_table")){
      setdaily_expense_table13758({...daily_expense_table13758,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("offsite_expense_table")){
      setoffsite_expense_table4ffd6({...offsite_expense_table4ffd6,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['user_grp']  = user_grpd6690,
      codeStates['setuser_grp'] = setuser_grpd6690,
      codeStates['daily_expense_table']  = daily_expense_table13758,
      codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
      codeStates['offsite_expense_table']  = offsite_expense_table4ffd6,
      codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const user_grpd6690Ref = useRef<any>(null);
  const handleClearSearch = () => {
    user_grpd6690Ref.current?.setSearchParams();
    user_grpd6690Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(user_grpd6690) && Object.keys(user_grpd6690)?.length>0)
      {
        setuser_grpd6690({})
      }
    }else 
      prevRefreshRef.current= true
  }, [user_grpd6690Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '2 / 216',
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
        {securityData[accessProfile].allowedControls.includes("approvedcard") ?<Cardapprovedcard  /* c5971 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("rejectedcard") ?<Cardrejectedcard  /* efafa */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("pendingcard") ?<Cardpendingcard  /* ee3c0 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("dailyexpenses") ?<Carddailyexpenses  /* 798bd */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("offsiteexpenses") ?<Cardoffsiteexpenses  /* cd925 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {        (("add" in ButtonGoRuleData)?ButtonGoRuleData["add"]:true) && 
          securityData[accessProfile].allowedControls.includes("add")  ?            <Buttonadd lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("offsite_add" in ButtonGoRuleData)?ButtonGoRuleData["offsite_add"]:true) && 
          securityData[accessProfile].allowedControls.includes("offsite_add")  ?            <Buttonoffsite_add lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
          {securityData[accessProfile].allowedControls.includes("daily_exp") ?<Textdaily_exp   /* a1e3b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("offsite_exp") ?<Textoffsite_exp   /* 949f2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default GroupUser_Grp
