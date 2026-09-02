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
import Cardytd_revenue_card  from "./Cardytd_revenue_card";
import Iconytd_icon  from "./Iconytd_icon";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupytd_revenue_card_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_tob_mzdsh_totalcards_dfd_v1Props, setdfd_tob_mzdsh_totalcards_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_group_barchart_dfd_v1Props, setdfd_tob_mzdsh_group_barchart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_piechart_dfd_v1Props, setdfd_tob_mzdsh_piechart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props, setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_pricingtiertable_dfd_v1Props, setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_mzdsh_invoice_table_dfd_v1Props, setdfd_tob_mzdsh_invoice_table_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Template 1": {
    "allowedControls": [
      "ytd_revenue_card",
      "ytd_icon"
    ],
    "allowedGroups": [
      "canvas",
      "monetization_group",
      "dash_group",
      "monthly_revenue_card_group",
      "ytd_revenue_card_group",
      "invoice_raised_card_group",
      "avg_revenue_tpp_card_group",
      "revenue_trend_group",
      "piechart_group",
      "billing_status_table",
      "overage_charges_group",
      "tier_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
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
  const {monetization_groupf0a3b, setmonetization_groupf0a3b}= useContext(TotalContext) as TotalContextProps;
  const {monetization_groupf0a3bProps, setmonetization_groupf0a3bProps}= useContext(TotalContext) as TotalContextProps;
  const {dash_groupc162b, setdash_groupc162b}= useContext(TotalContext) as TotalContextProps;
  const {dash_groupc162bProps, setdash_groupc162bProps}= useContext(TotalContext) as TotalContextProps;
  const {monthly_revenue_card_group3bf72, setmonthly_revenue_card_group3bf72}= useContext(TotalContext) as TotalContextProps;
  const {monthly_revenue_card_group3bf72Props, setmonthly_revenue_card_group3bf72Props}= useContext(TotalContext) as TotalContextProps;
  const {ytd_revenue_card_groupbb98b, setytd_revenue_card_groupbb98b}= useContext(TotalContext) as TotalContextProps;
  const {ytd_revenue_card_groupbb98bProps, setytd_revenue_card_groupbb98bProps}= useContext(TotalContext) as TotalContextProps;
  const {ytd_revenue_card19ac3, setytd_revenue_card19ac3}= useContext(TotalContext) as TotalContextProps;
  const {ytd_icon346d8, setytd_icon346d8}= useContext(TotalContext) as TotalContextProps;
  const {invoice_raised_card_group23315, setinvoice_raised_card_group23315}= useContext(TotalContext) as TotalContextProps;
  const {invoice_raised_card_group23315Props, setinvoice_raised_card_group23315Props}= useContext(TotalContext) as TotalContextProps;
  const {avg_revenue_tpp_card_group56d8e, setavg_revenue_tpp_card_group56d8e}= useContext(TotalContext) as TotalContextProps;
  const {avg_revenue_tpp_card_group56d8eProps, setavg_revenue_tpp_card_group56d8eProps}= useContext(TotalContext) as TotalContextProps;
  const {revenue_trend_groupa654b, setrevenue_trend_groupa654b}= useContext(TotalContext) as TotalContextProps;
  const {revenue_trend_groupa654bProps, setrevenue_trend_groupa654bProps}= useContext(TotalContext) as TotalContextProps;
  const {piechart_groupce72b, setpiechart_groupce72b}= useContext(TotalContext) as TotalContextProps;
  const {piechart_groupce72bProps, setpiechart_groupce72bProps}= useContext(TotalContext) as TotalContextProps;
  const {billing_status_tableef735, setbilling_status_tableef735}= useContext(TotalContext) as TotalContextProps;
  const {billing_status_tableef735Props, setbilling_status_tableef735Props}= useContext(TotalContext) as TotalContextProps;
  const {overage_charges_group44542, setoverage_charges_group44542}= useContext(TotalContext) as TotalContextProps;
  const {overage_charges_group44542Props, setoverage_charges_group44542Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_table17c1c, settier_table17c1c}= useContext(TotalContext) as TotalContextProps;
  const {tier_table17c1cProps, settier_table17c1cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {monetizationdashboard_v1, setmonetizationdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:monetizationDashboard:AFVK:v1',
    [user],
    'GroupYtdRevenueCardGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "49648de4f185482d9bb13802a3dbb98b");
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
    setytd_revenue_card_groupbb98bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ytd_revenue_card")){
        setytd_revenue_card19ac3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ytd_revenue_card19ac3?.isDisabled==null)
      {
        setytd_revenue_card19ac3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ytd_icon")){
        setytd_icon346d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ytd_icon346d8?.isDisabled==null)
      {
        setytd_icon346d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['monetization_group'] = monetization_groupf0a3b,
        codeStates['setmonetization_group'] = setmonetization_groupf0a3b,
        codeStates['monetization_groupf0a3b'] = monetization_groupf0a3bProps,
        codeStates['setmonetization_groupf0a3b'] = setmonetization_groupf0a3bProps,
        codeStates['dash_group'] = dash_groupc162b,
        codeStates['setdash_group'] = setdash_groupc162b,
        codeStates['dash_groupc162b'] = dash_groupc162bProps,
        codeStates['setdash_groupc162b'] = setdash_groupc162bProps,
        codeStates['monthly_revenue_card_group'] = monthly_revenue_card_group3bf72,
        codeStates['setmonthly_revenue_card_group'] = setmonthly_revenue_card_group3bf72,
        codeStates['monthly_revenue_card_group3bf72'] = monthly_revenue_card_group3bf72Props,
        codeStates['setmonthly_revenue_card_group3bf72'] = setmonthly_revenue_card_group3bf72Props,
        codeStates['ytd_revenue_card_group'] = ytd_revenue_card_groupbb98b,
        codeStates['setytd_revenue_card_group'] = setytd_revenue_card_groupbb98b,
        codeStates['ytd_revenue_card_groupbb98b'] = ytd_revenue_card_groupbb98bProps,
        codeStates['setytd_revenue_card_groupbb98b'] = setytd_revenue_card_groupbb98bProps,
        codeStates['ytd_revenue_card'] = ytd_revenue_card19ac3,
        codeStates['setytd_revenue_card'] = setytd_revenue_card19ac3,
        codeStates['ytd_icon'] = ytd_icon346d8,
        codeStates['setytd_icon'] = setytd_icon346d8,
        codeStates['invoice_raised_card_group'] = invoice_raised_card_group23315,
        codeStates['setinvoice_raised_card_group'] = setinvoice_raised_card_group23315,
        codeStates['invoice_raised_card_group23315'] = invoice_raised_card_group23315Props,
        codeStates['setinvoice_raised_card_group23315'] = setinvoice_raised_card_group23315Props,
        codeStates['avg_revenue_tpp_card_group'] = avg_revenue_tpp_card_group56d8e,
        codeStates['setavg_revenue_tpp_card_group'] = setavg_revenue_tpp_card_group56d8e,
        codeStates['avg_revenue_tpp_card_group56d8e'] = avg_revenue_tpp_card_group56d8eProps,
        codeStates['setavg_revenue_tpp_card_group56d8e'] = setavg_revenue_tpp_card_group56d8eProps,
        codeStates['revenue_trend_group'] = revenue_trend_groupa654b,
        codeStates['setrevenue_trend_group'] = setrevenue_trend_groupa654b,
        codeStates['revenue_trend_groupa654b'] = revenue_trend_groupa654bProps,
        codeStates['setrevenue_trend_groupa654b'] = setrevenue_trend_groupa654bProps,
        codeStates['piechart_group'] = piechart_groupce72b,
        codeStates['setpiechart_group'] = setpiechart_groupce72b,
        codeStates['piechart_groupce72b'] = piechart_groupce72bProps,
        codeStates['setpiechart_groupce72b'] = setpiechart_groupce72bProps,
        codeStates['billing_status_table'] = billing_status_tableef735,
        codeStates['setbilling_status_table'] = setbilling_status_tableef735,
        codeStates['billing_status_tableef735'] = billing_status_tableef735Props,
        codeStates['setbilling_status_tableef735'] = setbilling_status_tableef735Props,
        codeStates['overage_charges_group'] = overage_charges_group44542,
        codeStates['setoverage_charges_group'] = setoverage_charges_group44542,
        codeStates['overage_charges_group44542'] = overage_charges_group44542Props,
        codeStates['setoverage_charges_group44542'] = setoverage_charges_group44542Props,
        codeStates['tier_table'] = tier_table17c1c,
        codeStates['settier_table'] = settier_table17c1c,
        codeStates['tier_table17c1c'] = tier_table17c1cProps,
        codeStates['settier_table17c1c'] = settier_table17c1cProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "49648de4f185482d9bb13802a3dbb98b");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
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
        codeStates['monetization_group'] = monetization_groupf0a3b,
        codeStates['setmonetization_group'] = setmonetization_groupf0a3b,
        codeStates['monetization_groupf0a3b'] = monetization_groupf0a3bProps,
        codeStates['setmonetization_groupf0a3b'] = setmonetization_groupf0a3bProps,
        codeStates['dash_group'] = dash_groupc162b,
        codeStates['setdash_group'] = setdash_groupc162b,
        codeStates['dash_groupc162b'] = dash_groupc162bProps,
        codeStates['setdash_groupc162b'] = setdash_groupc162bProps,
        codeStates['monthly_revenue_card_group'] = monthly_revenue_card_group3bf72,
        codeStates['setmonthly_revenue_card_group'] = setmonthly_revenue_card_group3bf72,
        codeStates['monthly_revenue_card_group3bf72'] = monthly_revenue_card_group3bf72Props,
        codeStates['setmonthly_revenue_card_group3bf72'] = setmonthly_revenue_card_group3bf72Props,
        codeStates['ytd_revenue_card_group'] = ytd_revenue_card_groupbb98b,
        codeStates['setytd_revenue_card_group'] = setytd_revenue_card_groupbb98b,
        codeStates['ytd_revenue_card_groupbb98b'] = ytd_revenue_card_groupbb98bProps,
        codeStates['setytd_revenue_card_groupbb98b'] = setytd_revenue_card_groupbb98bProps,
        codeStates['ytd_revenue_card'] = ytd_revenue_card19ac3,
        codeStates['setytd_revenue_card'] = setytd_revenue_card19ac3,
        codeStates['ytd_icon'] = ytd_icon346d8,
        codeStates['setytd_icon'] = setytd_icon346d8,
        codeStates['invoice_raised_card_group'] = invoice_raised_card_group23315,
        codeStates['setinvoice_raised_card_group'] = setinvoice_raised_card_group23315,
        codeStates['invoice_raised_card_group23315'] = invoice_raised_card_group23315Props,
        codeStates['setinvoice_raised_card_group23315'] = setinvoice_raised_card_group23315Props,
        codeStates['avg_revenue_tpp_card_group'] = avg_revenue_tpp_card_group56d8e,
        codeStates['setavg_revenue_tpp_card_group'] = setavg_revenue_tpp_card_group56d8e,
        codeStates['avg_revenue_tpp_card_group56d8e'] = avg_revenue_tpp_card_group56d8eProps,
        codeStates['setavg_revenue_tpp_card_group56d8e'] = setavg_revenue_tpp_card_group56d8eProps,
        codeStates['revenue_trend_group'] = revenue_trend_groupa654b,
        codeStates['setrevenue_trend_group'] = setrevenue_trend_groupa654b,
        codeStates['revenue_trend_groupa654b'] = revenue_trend_groupa654bProps,
        codeStates['setrevenue_trend_groupa654b'] = setrevenue_trend_groupa654bProps,
        codeStates['piechart_group'] = piechart_groupce72b,
        codeStates['setpiechart_group'] = setpiechart_groupce72b,
        codeStates['piechart_groupce72b'] = piechart_groupce72bProps,
        codeStates['setpiechart_groupce72b'] = setpiechart_groupce72bProps,
        codeStates['billing_status_table'] = billing_status_tableef735,
        codeStates['setbilling_status_table'] = setbilling_status_tableef735,
        codeStates['billing_status_tableef735'] = billing_status_tableef735Props,
        codeStates['setbilling_status_tableef735'] = setbilling_status_tableef735Props,
        codeStates['overage_charges_group'] = overage_charges_group44542,
        codeStates['setoverage_charges_group'] = setoverage_charges_group44542,
        codeStates['overage_charges_group44542'] = overage_charges_group44542Props,
        codeStates['setoverage_charges_group44542'] = setoverage_charges_group44542Props,
        codeStates['tier_table'] = tier_table17c1c,
        codeStates['settier_table'] = settier_table17c1c,
        codeStates['tier_table17c1c'] = tier_table17c1cProps,
        codeStates['settier_table17c1c'] = settier_table17c1cProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ytd_revenue_card_groupbb98bRef = useRef<any>(null);
  const handleClearSearch = () => {
    ytd_revenue_card_groupbb98bRef.current?.setSearchParams();
    ytd_revenue_card_groupbb98bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(ytd_revenue_card_groupbb98b) &&
        Object.keys(ytd_revenue_card_groupbb98b)?.length > 0
      ) {
        setytd_revenue_card_groupbb98b({})
      }
    } else prevRefreshRef.current = true
  }, [ytd_revenue_card_groupbb98bProps?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '7 / 13',
        gridRow: '13 / 33',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('https://tdps3api.toruslowcode.com/torus/9.1/CT009/resources/images/newwwww2.jpg')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !rounded-xl &lt;div class=&#34;col-span-1 row-span-22&#34;&gt;      &lt;!-- Static container (NO transform here) --&gt;   &lt;div class=&#34;h-full w-full&#34;&gt;      &lt;!-- Animated card --&gt;     &lt;div class=&#34;h-full w-full p-0.5 bg-white rounded-xl shadow-md                  transition-transform duration-300 ease-out                  hover:-translate-y-2 hover:shadow-2xl                  active:scale-95                  cursor-pointer&#34;&gt;              &lt;h3 class=&#34;text-lg font-semibold&#34;&gt;Card Title&lt;/h3&gt;       &lt;p class=&#34;text-gray-600&#34;&gt;Content here&lt;/p&gt;      &lt;/div&gt;    &lt;/div&gt; &lt;/div&gt; ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setmonetizationdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"ytd_revenue_card_group"}))
        }}
    >
        {allowedControls.includes("ytd_revenue_card") ?<Cardytd_revenue_card  /* 19ac3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
        {allowedControls.includes("ytd_icon")?<Iconytd_icon /* 346d8 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
    </div>
 )
}

export default Groupytd_revenue_card_group
