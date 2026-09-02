'use client'


import React, { useState, useContext, useEffect, useRef } from 'react'; 
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import i18n from '@/app/components/i18n';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Cardmonthly_revenue_card = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_tob_mzdsh_totalcards_dfd_v1Props, setdfd_tob_mzdsh_totalcards_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const selected=useRef({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast : Function=useInfoMsg();
  const routes : AppRouterInstance  = useRouter();
  const prevRefreshRef = useRef<any>(false);
  //showComponentAsPopup || showArtifactAsModal
  /////////////
   //another screen
  const {monetization_groupf0a3b, setmonetization_groupf0a3b}= useContext(TotalContext) as TotalContextProps
  const {monetization_groupf0a3bProps, setmonetization_groupf0a3bProps}= useContext(TotalContext) as TotalContextProps
  const {dash_groupc162b, setdash_groupc162b}= useContext(TotalContext) as TotalContextProps
  const {dash_groupc162bProps, setdash_groupc162bProps}= useContext(TotalContext) as TotalContextProps
  const {monthly_revenue_card_group3bf72, setmonthly_revenue_card_group3bf72}= useContext(TotalContext) as TotalContextProps
  const {monthly_revenue_card_group3bf72Props, setmonthly_revenue_card_group3bf72Props}= useContext(TotalContext) as TotalContextProps
  const {monthly_revenue_card0ab73, setmonthly_revenue_card0ab73}= useContext(TotalContext) as TotalContextProps
  const {monthly_icone201a, setmonthly_icone201a}= useContext(TotalContext) as TotalContextProps
  const {ytd_revenue_card_groupbb98b, setytd_revenue_card_groupbb98b}= useContext(TotalContext) as TotalContextProps
  const {ytd_revenue_card_groupbb98bProps, setytd_revenue_card_groupbb98bProps}= useContext(TotalContext) as TotalContextProps
  const {invoice_raised_card_group23315, setinvoice_raised_card_group23315}= useContext(TotalContext) as TotalContextProps
  const {invoice_raised_card_group23315Props, setinvoice_raised_card_group23315Props}= useContext(TotalContext) as TotalContextProps
  const {avg_revenue_tpp_card_group56d8e, setavg_revenue_tpp_card_group56d8e}= useContext(TotalContext) as TotalContextProps
  const {avg_revenue_tpp_card_group56d8eProps, setavg_revenue_tpp_card_group56d8eProps}= useContext(TotalContext) as TotalContextProps
  const {revenue_trend_groupa654b, setrevenue_trend_groupa654b}= useContext(TotalContext) as TotalContextProps
  const {revenue_trend_groupa654bProps, setrevenue_trend_groupa654bProps}= useContext(TotalContext) as TotalContextProps
  const {piechart_groupce72b, setpiechart_groupce72b}= useContext(TotalContext) as TotalContextProps
  const {piechart_groupce72bProps, setpiechart_groupce72bProps}= useContext(TotalContext) as TotalContextProps
  const {billing_status_tableef735, setbilling_status_tableef735}= useContext(TotalContext) as TotalContextProps
  const {billing_status_tableef735Props, setbilling_status_tableef735Props}= useContext(TotalContext) as TotalContextProps
  const {overage_charges_group44542, setoverage_charges_group44542}= useContext(TotalContext) as TotalContextProps
  const {overage_charges_group44542Props, setoverage_charges_group44542Props}= useContext(TotalContext) as TotalContextProps
  const {tier_table17c1c, settier_table17c1c}= useContext(TotalContext) as TotalContextProps
  const {tier_table17c1cProps, settier_table17c1cProps}= useContext(TotalContext) as TotalContextProps
  const {monthly_revenue_card0ab73Props, setmonthly_revenue_card0ab73Props} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "386a0be2ea694e1db14213aad673bf72",
        "3a8378cdd691497d9df07fed9860ab73"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
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
      codeStates['monthly_revenue_card'] = monthly_revenue_card0ab73,
      codeStates['setmonthly_revenue_card'] = setmonthly_revenue_card0ab73,
      codeStates['monthly_icon'] = monthly_icone201a,
      codeStates['setmonthly_icon'] = setmonthly_icone201a,
      codeStates['ytd_revenue_card_group'] = ytd_revenue_card_groupbb98b,
      codeStates['setytd_revenue_card_group'] = setytd_revenue_card_groupbb98b,
      codeStates['ytd_revenue_card_groupbb98b'] = ytd_revenue_card_groupbb98bProps,
      codeStates['setytd_revenue_card_groupbb98b'] = setytd_revenue_card_groupbb98bProps,
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
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_tob_mzdsh_totalcards_dfd_v1Props && !dfd_tob_mzdsh_totalcards_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_tob_mzdsh_totalcards_dfd_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setmonthly_revenue_card_group3bf72((pre: any) => ({
          ...pre,
          monthly_revenue: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.monthly_revenue
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setmonthly_revenue_card_group3bf72((pre: any) => ({
            ...pre,
            monthly_revenue: monthly_revenue_card0ab73Props?.filteredData?.length > 0
              ? monthly_revenue_card0ab73Props?.filteredData[0]?.monthly_revenue
              : "0"
          }))
        }else if(Array.isArray(dfd_tob_mzdsh_totalcards_dfd_v1Props) && dfd_tob_mzdsh_totalcards_dfd_v1Props && !monthly_revenue_card_group3bf72.monthly_revenue){
          setmonthly_revenue_card_group3bf72((pre:any)=>({...pre,monthly_revenue:dfd_tob_mzdsh_totalcards_dfd_v1Props[0]?.monthly_revenue}))
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick=async(value:Record<string, any>):Promise<void>=>{
    try{
    setIsProcessing(true);
    selected.current = value;
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }


  useEffect(() => {
    if (prevRefreshRef.current) {
      handleMapperDetails()
    }else 
    prevRefreshRef.current= true
  },[monthly_revenue_card0ab73?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_tob_mzdsh_totalcards_dfd_v1Props)){
      setmonthly_revenue_card_group3bf72((pre:any)=>({...pre,monthly_revenue:dfd_tob_mzdsh_totalcards_dfd_v1Props[0]?.monthly_revenue}));
    }
  },[dfd_tob_mzdsh_totalcards_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!monthly_revenue_card0ab73Props?.filterProps) return;
    handleMapperDetails(monthly_revenue_card0ab73Props?.filterProps,monthly_revenue_card0ab73Props?.filterFlag);
  },[monthly_revenue_card0ab73Props?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (monthly_revenue_card0ab73?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `5 / 25`,gridRow: `1 / 18`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className="p-1 !text-xl !text-white font-bold"   
      theme="normal"
      view="clear"
      label={keyset("Monthly Revenue")}
      prefixValue="د.إ"
      disabled= {monthly_revenue_card0ab73?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {monthly_revenue_card_group3bf72?.monthly_revenue?monthly_revenue_card_group3bf72?.monthly_revenue:"0"}
      </Card>
    </div>
  )
}

export default Cardmonthly_revenue_card
