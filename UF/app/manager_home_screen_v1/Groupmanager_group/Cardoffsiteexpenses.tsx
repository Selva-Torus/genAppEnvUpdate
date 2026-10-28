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

const Cardoffsiteexpenses = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps
  const {approvedcard75ed7, setapprovedcard75ed7}= useContext(TotalContext) as TotalContextProps
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps
  const {dailyexpensese7cda, setdailyexpensese7cda}= useContext(TotalContext) as TotalContextProps
  const {offsiteexpenses62fe1, setoffsiteexpenses62fe1}= useContext(TotalContext) as TotalContextProps
  const {daily_expa8b25, setdaily_expa8b25}= useContext(TotalContext) as TotalContextProps
  const {offstie_exp400c9, setoffstie_exp400c9}= useContext(TotalContext) as TotalContextProps
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps
  const {offsiteexpenses62fe1Props, setoffsiteexpenses62fe1Props} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "e0abb5b5f6d949fa8b9e38f3f4741477",
        "5dbb6642d14f4f1ba5aab82ebce62fe1"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['manager_group'] = manager_group41477,
      codeStates['setmanager_group'] = setmanager_group41477,
      codeStates['manager_group41477'] = manager_group41477Props,
      codeStates['setmanager_group41477'] = setmanager_group41477Props,
      codeStates['approvedcard'] = approvedcard75ed7,
      codeStates['setapprovedcard'] = setapprovedcard75ed7,
      codeStates['rejectedcard'] = rejectedcard0ceee,
      codeStates['setrejectedcard'] = setrejectedcard0ceee,
      codeStates['pendingcard'] = pendingcard727e3,
      codeStates['setpendingcard'] = setpendingcard727e3,
      codeStates['dailyexpenses'] = dailyexpensese7cda,
      codeStates['setdailyexpenses'] = setdailyexpensese7cda,
      codeStates['offsiteexpenses'] = offsiteexpenses62fe1,
      codeStates['setoffsiteexpenses'] = setoffsiteexpenses62fe1,
      codeStates['daily_exp'] = daily_expa8b25,
      codeStates['setdaily_exp'] = setdaily_expa8b25,
      codeStates['offstie_exp'] = offstie_exp400c9,
      codeStates['setoffstie_exp'] = setoffstie_exp400c9,
      codeStates['daily_expense_table'] = daily_expense_table91568,
      codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
      codeStates['daily_expense_table91568'] = daily_expense_table91568Props,
      codeStates['setdaily_expense_table91568'] = setdaily_expense_table91568Props,
      codeStates['offsite_expense_table'] = offsite_expense_table1e924,
      codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,
      codeStates['offsite_expense_table1e924'] = offsite_expense_table1e924Props,
      codeStates['setoffsite_expense_table1e924'] = setoffsite_expense_table1e924Props,
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
        setmanager_group41477((pre: any) => ({
          ...pre,
          offsiteexpenses: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.offsiteexpenses
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setmanager_group41477((pre: any) => ({
            ...pre,
            offsiteexpenses: offsiteexpenses62fe1Props?.filteredData?.length > 0
              ? offsiteexpenses62fe1Props?.filteredData[0]?.offsiteexpenses
              : "0"
          }))
        }else if(Array.isArray(dfd_card_data_v1Props) && dfd_card_data_v1Props && !manager_group41477.offsiteexpenses){
          setmanager_group41477((pre:any)=>({...pre,offsiteexpenses:dfd_card_data_v1Props[0]?.offsiteexpenses}))
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
  },[offsiteexpenses62fe1?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_card_data_v1Props)){
      setmanager_group41477((pre:any)=>({...pre,offsiteexpenses:dfd_card_data_v1Props[0]?.offsiteexpenses}));
    }
  },[dfd_card_data_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!offsiteexpenses62fe1Props?.filterProps) return;
    handleMapperDetails(offsiteexpenses62fe1Props?.filterProps,offsiteexpenses62fe1Props?.filterFlag);
  },[offsiteexpenses62fe1Props?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (offsiteexpenses62fe1?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `21 / 25`,gridRow: `4 / 32`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className=""   
      theme="info"
      view="filled"
      icon="MdEmojiTransportation"
      label={keyset("Offsite Expenses")}
      disabled= {offsiteexpenses62fe1?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {manager_group41477?.offsiteexpenses?manager_group41477?.offsiteexpenses:"0"}
      </Card>
    </div>
  )
}

export default Cardoffsiteexpenses
