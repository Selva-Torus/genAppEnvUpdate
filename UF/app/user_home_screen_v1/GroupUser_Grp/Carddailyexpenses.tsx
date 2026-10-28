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
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Carddailyexpenses = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_card_data_v1Props, setdfd_card_data_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps
  const {rejectedcardefafa, setrejectedcardefafa}= useContext(TotalContext) as TotalContextProps
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps
  const {addd126f, setaddd126f}= useContext(TotalContext) as TotalContextProps
  const {offsite_add1ab15, setoffsite_add1ab15}= useContext(TotalContext) as TotalContextProps
  const {daily_expa1e3b, setdaily_expa1e3b}= useContext(TotalContext) as TotalContextProps
  const {offsite_exp949f2, setoffsite_exp949f2}= useContext(TotalContext) as TotalContextProps
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps
  const {dailyexpenses798bdProps, setdailyexpenses798bdProps} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0dd5e93ebe734a2da4503278cd0d6690",
        "10ee33245621462090666ca8c1d798bd"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['user_grp'] = user_grpd6690,
      codeStates['setuser_grp'] = setuser_grpd6690,
      codeStates['user_grpd6690'] = user_grpd6690Props,
      codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
      codeStates['approvedcard'] = approvedcardc5971,
      codeStates['setapprovedcard'] = setapprovedcardc5971,
      codeStates['rejectedcard'] = rejectedcardefafa,
      codeStates['setrejectedcard'] = setrejectedcardefafa,
      codeStates['pendingcard'] = pendingcardee3c0,
      codeStates['setpendingcard'] = setpendingcardee3c0,
      codeStates['dailyexpenses'] = dailyexpenses798bd,
      codeStates['setdailyexpenses'] = setdailyexpenses798bd,
      codeStates['offsiteexpenses'] = offsiteexpensescd925,
      codeStates['setoffsiteexpenses'] = setoffsiteexpensescd925,
      codeStates['add'] = addd126f,
      codeStates['setadd'] = setaddd126f,
      codeStates['offsite_add'] = offsite_add1ab15,
      codeStates['setoffsite_add'] = setoffsite_add1ab15,
      codeStates['daily_exp'] = daily_expa1e3b,
      codeStates['setdaily_exp'] = setdaily_expa1e3b,
      codeStates['offsite_exp'] = offsite_exp949f2,
      codeStates['setoffsite_exp'] = setoffsite_exp949f2,
      codeStates['daily_expense_table'] = daily_expense_table13758,
      codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
      codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
      codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
      codeStates['offsite_expense_table'] = offsite_expense_table4ffd6,
      codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,
      codeStates['offsite_expense_table4ffd6'] = offsite_expense_table4ffd6Props,
      codeStates['setoffsite_expense_table4ffd6'] = setoffsite_expense_table4ffd6Props,
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_card_data_v1Props && !dfd_card_data_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_card_data_v1Props.dstKey,
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
        setuser_grpd6690((pre: any) => ({
          ...pre,
          dailyexpenses: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.dailyexpenses
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setuser_grpd6690((pre: any) => ({
            ...pre,
            dailyexpenses: dailyexpenses798bdProps?.filteredData?.length > 0
              ? dailyexpenses798bdProps?.filteredData[0]?.dailyexpenses
              : "0"
          }))
        }else if(Array.isArray(dfd_card_data_v1Props) && dfd_card_data_v1Props && !user_grpd6690.dailyexpenses){
          setuser_grpd6690((pre:any)=>({...pre,dailyexpenses:dfd_card_data_v1Props[0]?.dailyexpenses}))
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
  },[dailyexpenses798bd?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_card_data_v1Props)){
      setuser_grpd6690((pre:any)=>({...pre,dailyexpenses:dfd_card_data_v1Props[0]?.dailyexpenses}));
    }
  },[dfd_card_data_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!dailyexpenses798bdProps?.filterProps) return;
    handleMapperDetails(dailyexpenses798bdProps?.filterProps,dailyexpenses798bdProps?.filterFlag);
  },[dailyexpenses798bdProps?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (dailyexpenses798bd?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `16 / 20`,gridRow: `4 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className=""   
      theme="info"
      view="filled"
      icon="MdAccountCircle"
      label={keyset("Daily Expenses")}
      disabled= {dailyexpenses798bd?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {user_grpd6690?.dailyexpenses?user_grpd6690?.dailyexpenses:"0"}
      </Card>
    </div>
  )
}

export default Carddailyexpenses
