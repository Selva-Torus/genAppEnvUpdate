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

const Cardmatch_status_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_discoveryqueuecards_v1Props, setdfd_discoveryqueuecards_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overall_discovery_queue_groupad3a5, setoverall_discovery_queue_groupad3a5}= useContext(TotalContext) as TotalContextProps
  const {overall_discovery_queue_groupad3a5Props, setoverall_discovery_queue_groupad3a5Props}= useContext(TotalContext) as TotalContextProps
  const {discovery_queue_text_group9da41, setdiscovery_queue_text_group9da41}= useContext(TotalContext) as TotalContextProps
  const {discovery_queue_text_group9da41Props, setdiscovery_queue_text_group9da41Props}= useContext(TotalContext) as TotalContextProps
  const {awaiting_review_groupb294c, setawaiting_review_groupb294c}= useContext(TotalContext) as TotalContextProps
  const {awaiting_review_groupb294cProps, setawaiting_review_groupb294cProps}= useContext(TotalContext) as TotalContextProps
  const {possible_duplicate_groupbf3b4, setpossible_duplicate_groupbf3b4}= useContext(TotalContext) as TotalContextProps
  const {possible_duplicate_groupbf3b4Props, setpossible_duplicate_groupbf3b4Props}= useContext(TotalContext) as TotalContextProps
  const {match_status_code834fe, setmatch_status_code834fe}= useContext(TotalContext) as TotalContextProps
  const {rejecte_on_ingest_group81267, setrejecte_on_ingest_group81267}= useContext(TotalContext) as TotalContextProps
  const {rejecte_on_ingest_group81267Props, setrejecte_on_ingest_group81267Props}= useContext(TotalContext) as TotalContextProps
  const {pending_review_groupe9d8e, setpending_review_groupe9d8e}= useContext(TotalContext) as TotalContextProps
  const {pending_review_groupe9d8eProps, setpending_review_groupe9d8eProps}= useContext(TotalContext) as TotalContextProps
  const {pending_review_table3db7d, setpending_review_table3db7d}= useContext(TotalContext) as TotalContextProps
  const {pending_review_table3db7dProps, setpending_review_table3db7dProps}= useContext(TotalContext) as TotalContextProps
  const {match_status_code834feProps, setmatch_status_code834feProps} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4a02114f04904d789fbec32f9cfbf3b4",
        "4069a1fc59dc4035b53e881b750834fe"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['overall_discovery_queue_group'] = overall_discovery_queue_groupad3a5,
      codeStates['setoverall_discovery_queue_group'] = setoverall_discovery_queue_groupad3a5,
      codeStates['overall_discovery_queue_groupad3a5'] = overall_discovery_queue_groupad3a5Props,
      codeStates['setoverall_discovery_queue_groupad3a5'] = setoverall_discovery_queue_groupad3a5Props,
      codeStates['discovery_queue_text_group'] = discovery_queue_text_group9da41,
      codeStates['setdiscovery_queue_text_group'] = setdiscovery_queue_text_group9da41,
      codeStates['discovery_queue_text_group9da41'] = discovery_queue_text_group9da41Props,
      codeStates['setdiscovery_queue_text_group9da41'] = setdiscovery_queue_text_group9da41Props,
      codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
      codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
      codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
      codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
      codeStates['possible_duplicate_group'] = possible_duplicate_groupbf3b4,
      codeStates['setpossible_duplicate_group'] = setpossible_duplicate_groupbf3b4,
      codeStates['possible_duplicate_groupbf3b4'] = possible_duplicate_groupbf3b4Props,
      codeStates['setpossible_duplicate_groupbf3b4'] = setpossible_duplicate_groupbf3b4Props,
      codeStates['match_status_code'] = match_status_code834fe,
      codeStates['setmatch_status_code'] = setmatch_status_code834fe,
      codeStates['rejecte_on_ingest_group'] = rejecte_on_ingest_group81267,
      codeStates['setrejecte_on_ingest_group'] = setrejecte_on_ingest_group81267,
      codeStates['rejecte_on_ingest_group81267'] = rejecte_on_ingest_group81267Props,
      codeStates['setrejecte_on_ingest_group81267'] = setrejecte_on_ingest_group81267Props,
      codeStates['pending_review_group'] = pending_review_groupe9d8e,
      codeStates['setpending_review_group'] = setpending_review_groupe9d8e,
      codeStates['pending_review_groupe9d8e'] = pending_review_groupe9d8eProps,
      codeStates['setpending_review_groupe9d8e'] = setpending_review_groupe9d8eProps,
      codeStates['pending_review_table'] = pending_review_table3db7d,
      codeStates['setpending_review_table'] = setpending_review_table3db7d,
      codeStates['pending_review_table3db7d'] = pending_review_table3db7dProps,
      codeStates['setpending_review_table3db7d'] = setpending_review_table3db7dProps,
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_discoveryqueuecards_v1Props && !dfd_discoveryqueuecards_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_discoveryqueuecards_v1Props.dstKey,
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
        setpossible_duplicate_groupbf3b4((pre: any) => ({
          ...pre,
          match_status_code: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.match_status_code
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setpossible_duplicate_groupbf3b4((pre: any) => ({
            ...pre,
            match_status_code: match_status_code834feProps?.filteredData?.length > 0
              ? match_status_code834feProps?.filteredData[0]?.match_status_code
              : "0"
          }))
        }else if(Array.isArray(dfd_discoveryqueuecards_v1Props) && dfd_discoveryqueuecards_v1Props && !possible_duplicate_groupbf3b4.match_status_code){
          setpossible_duplicate_groupbf3b4((pre:any)=>({...pre,match_status_code:dfd_discoveryqueuecards_v1Props[0]?.match_status_code}))
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
  },[match_status_code834fe?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_discoveryqueuecards_v1Props)){
      setpossible_duplicate_groupbf3b4((pre:any)=>({...pre,match_status_code:dfd_discoveryqueuecards_v1Props[0]?.match_status_code}));
    }
  },[dfd_discoveryqueuecards_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!match_status_code834feProps?.filterProps) return;
    handleMapperDetails(match_status_code834feProps?.filterProps,match_status_code834feProps?.filterFlag);
  },[match_status_code834feProps?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (match_status_code834fe?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `1 / 25`,gridRow: `1 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className=""   
      theme="normal"
      view="filled"
      label={keyset("Possible duplicate")}
      disabled= {match_status_code834fe?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {possible_duplicate_groupbf3b4?.match_status_code?possible_duplicate_groupbf3b4?.match_status_code:"0"}
      </Card>
    </div>
  )
}

export default Cardmatch_status_code
