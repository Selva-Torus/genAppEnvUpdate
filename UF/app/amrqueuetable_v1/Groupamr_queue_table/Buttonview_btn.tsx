'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonview_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {amr_queue_group79589, setamr_queue_group79589}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group79589Props, setamr_queue_group79589Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4, setamr_group17ac4}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4Props, setamr_group17ac4Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598, setamr_queue_table09598}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598Props, setamr_queue_table09598Props}= useContext(TotalContext) as TotalContextProps;
  const {case_idea43b, setcase_idea43b}= useContext(TotalContext) as TotalContextProps;
  const {venue_id37c04, setvenue_id37c04}= useContext(TotalContext) as TotalContextProps;
  const {account_id4eec9, setaccount_id4eec9}= useContext(TotalContext) as TotalContextProps;
  const {debtor_nameb1ea9, setdebtor_nameb1ea9}= useContext(TotalContext) as TotalContextProps;
  const {court_name5ae4f, setcourt_name5ae4f}= useContext(TotalContext) as TotalContextProps;
  const {total_balance6a331, settotal_balance6a331}= useContext(TotalContext) as TotalContextProps;
  const {priority_name6740a, setpriority_name6740a}= useContext(TotalContext) as TotalContextProps;
  const {status_name86d6c, setstatus_name86d6c}= useContext(TotalContext) as TotalContextProps;
  const {view_btnbd9a5, setview_btnbd9a5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn10d01, setedit_btn10d01}= useContext(TotalContext) as TotalContextProps;
  const {view_btn_pg_graph1baad, setview_btn_pg_graph1baad}= useContext(TotalContext) as TotalContextProps;
  const {bt_approveec5db, setbt_approveec5db}= useContext(TotalContext) as TotalContextProps;
  const {sla_wait_start_time52ae8, setsla_wait_start_time52ae8}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps;
  const {viewamrcase_v1Props, setviewamrcase_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['amr_queue_group'] = amr_queue_group79589,
      codeStates['setamr_queue_group'] = setamr_queue_group79589,
      codeStates['amr_queue_group79589'] = amr_queue_group79589Props,
      codeStates['setamr_queue_group79589'] = setamr_queue_group79589Props,
      codeStates['amr_group'] = amr_group17ac4,
      codeStates['setamr_group'] = setamr_group17ac4,
      codeStates['amr_group17ac4'] = amr_group17ac4Props,
      codeStates['setamr_group17ac4'] = setamr_group17ac4Props,
      codeStates['amr_queue_table'] = amr_queue_table09598,
      codeStates['setamr_queue_table'] = setamr_queue_table09598,
      codeStates['amr_queue_table09598'] = amr_queue_table09598Props,
      codeStates['setamr_queue_table09598'] = setamr_queue_table09598Props,
      codeStates['case_id'] = case_idea43b,
      codeStates['setcase_id'] = setcase_idea43b,
      codeStates['venue_id'] = venue_id37c04,
      codeStates['setvenue_id'] = setvenue_id37c04,
      codeStates['account_id'] = account_id4eec9,
      codeStates['setaccount_id'] = setaccount_id4eec9,
      codeStates['debtor_name'] = debtor_nameb1ea9,
      codeStates['setdebtor_name'] = setdebtor_nameb1ea9,
      codeStates['court_name'] = court_name5ae4f,
      codeStates['setcourt_name'] = setcourt_name5ae4f,
      codeStates['total_balance'] = total_balance6a331,
      codeStates['settotal_balance'] = settotal_balance6a331,
      codeStates['priority_name'] = priority_name6740a,
      codeStates['setpriority_name'] = setpriority_name6740a,
      codeStates['status_name'] = status_name86d6c,
      codeStates['setstatus_name'] = setstatus_name86d6c,
      codeStates['view_btn'] = view_btnbd9a5,
      codeStates['setview_btn'] = setview_btnbd9a5,
      codeStates['edit_btn'] = edit_btn10d01,
      codeStates['setedit_btn'] = setedit_btn10d01,
      codeStates['view_btn_pg_graph'] = view_btn_pg_graph1baad,
      codeStates['setview_btn_pg_graph'] = setview_btn_pg_graph1baad,
      codeStates['bt_approve'] = bt_approveec5db,
      codeStates['setbt_approve'] = setbt_approveec5db,
      codeStates['sla_wait_start_time'] = sla_wait_start_time52ae8,
      codeStates['setsla_wait_start_time'] = setsla_wait_start_time52ae8,
      codeStates['add_case_group'] = add_case_groupbe1de,
      codeStates['setadd_case_group'] = setadd_case_groupbe1de,
      codeStates['add_case_groupbe1de'] = add_case_groupbe1deProps,
      codeStates['setadd_case_groupbe1de'] = setadd_case_groupbe1deProps,
      codeStates['header_group'] = header_groupc587e,
      codeStates['setheader_group'] = setheader_groupc587e,
      codeStates['header_groupc587e'] = header_groupc587eProps,
      codeStates['setheader_groupc587e'] = setheader_groupc587eProps,
      codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
      codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
      codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
      codeStates['doc_table'] = doc_table8bfa1,
      codeStates['setdoc_table'] = setdoc_table8bfa1,
      codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
      codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
      codeStates['case_information_group'] = case_information_groupe3c1b,
      codeStates['setcase_information_group'] = setcase_information_groupe3c1b,
      codeStates['case_information_groupe3c1b'] = case_information_groupe3c1bProps,
      codeStates['setcase_information_groupe3c1b'] = setcase_information_groupe3c1bProps,
      codeStates['card_group'] = card_group7fa83,
      codeStates['setcard_group'] = setcard_group7fa83,
      codeStates['card_group7fa83'] = card_group7fa83Props,
      codeStates['setcard_group7fa83'] = setcard_group7fa83Props,
      codeStates['principal_group'] = principal_groupde6dd,
      codeStates['setprincipal_group'] = setprincipal_groupde6dd,
      codeStates['principal_groupde6dd'] = principal_groupde6ddProps,
      codeStates['setprincipal_groupde6dd'] = setprincipal_groupde6ddProps,
      codeStates['intrest_group'] = intrest_group44b4d,
      codeStates['setintrest_group'] = setintrest_group44b4d,
      codeStates['intrest_group44b4d'] = intrest_group44b4dProps,
      codeStates['setintrest_group44b4d'] = setintrest_group44b4dProps,
      codeStates['fees_group'] = fees_groupee523,
      codeStates['setfees_group'] = setfees_groupee523,
      codeStates['fees_groupee523'] = fees_groupee523Props,
      codeStates['setfees_groupee523'] = setfees_groupee523Props,
      codeStates['total_group'] = total_groupd3e06,
      codeStates['settotal_group'] = settotal_groupd3e06,
      codeStates['total_groupd3e06'] = total_groupd3e06Props,
      codeStates['settotal_groupd3e06'] = settotal_groupd3e06Props,
      codeStates['venue_details_group'] = venue_details_group1d734,
      codeStates['setvenue_details_group'] = setvenue_details_group1d734,
      codeStates['venue_details_group1d734'] = venue_details_group1d734Props,
      codeStates['setvenue_details_group1d734'] = setvenue_details_group1d734Props,
      codeStates['checklist_main_group'] = checklist_main_group32240,
      codeStates['setchecklist_main_group'] = setchecklist_main_group32240,
      codeStates['checklist_main_group32240'] = checklist_main_group32240Props,
      codeStates['setchecklist_main_group32240'] = setchecklist_main_group32240Props,
      codeStates['checklist_table'] = checklist_tablee7dea,
      codeStates['setchecklist_table'] = setchecklist_tablee7dea,
      codeStates['checklist_tablee7dea'] = checklist_tablee7deaProps,
      codeStates['setchecklist_tablee7dea'] = setchecklist_tablee7deaProps,
      codeStates['special_rules_group'] = special_rules_groupf22ab,
      codeStates['setspecial_rules_group'] = setspecial_rules_groupf22ab,
      codeStates['special_rules_groupf22ab'] = special_rules_groupf22abProps,
      codeStates['setspecial_rules_groupf22ab'] = setspecial_rules_groupf22abProps,
      codeStates['special_rules'] = special_rules96aec,
      codeStates['setspecial_rules'] = setspecial_rules96aec,
      codeStates['special_rules96aec'] = special_rules96aecProps,
      codeStates['setspecial_rules96aec'] = setspecial_rules96aecProps,
      codeStates['viewamrcase_v1'] = viewamrcase_v1Props,
      codeStates['setviewamrcase_v1'] = setviewamrcase_v1Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6908a1f13f2c6c3a9936cc860b009598",
        "328b329d4e36a47844b55c931d5bd9a5"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view_btnbd9a5") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[view_btnbd9a5?.refresh])


  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,add_case_groupbe1deProps?.controls);
    setadd_case_groupbe1de(bindData2||{})
    setadd_case_groupbe1deProps({...add_case_groupbe1deProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,header_groupc587eProps?.controls);
    setheader_groupc587e(bindData4||{})
    setheader_groupc587eProps({...header_groupc587eProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,required_dociument_main_group6f022Props?.controls);
    setrequired_dociument_main_group6f022(bindData6||{})
    setrequired_dociument_main_group6f022Props({...required_dociument_main_group6f022Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,doc_table8bfa1Props?.controls);
    setdoc_table8bfa1(bindData8||{})
    setdoc_table8bfa1Props({...doc_table8bfa1Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,case_information_groupe3c1bProps?.controls);
    setcase_information_groupe3c1b(bindData10||{})
    setcase_information_groupe3c1bProps({...case_information_groupe3c1bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,card_group7fa83Props?.controls);
    setcard_group7fa83(bindData12||{})
    setcard_group7fa83Props({...card_group7fa83Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,principal_groupde6ddProps?.controls);
    setprincipal_groupde6dd(bindData14||{})
    setprincipal_groupde6ddProps({...principal_groupde6ddProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,intrest_group44b4dProps?.controls);
    setintrest_group44b4d(bindData16||{})
    setintrest_group44b4dProps({...intrest_group44b4dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,fees_groupee523Props?.controls);
    setfees_groupee523(bindData18||{})
    setfees_groupee523Props({...fees_groupee523Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,total_groupd3e06Props?.controls);
    settotal_groupd3e06(bindData20||{})
    settotal_groupd3e06Props({...total_groupd3e06Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,venue_details_group1d734Props?.controls);
    setvenue_details_group1d734(bindData22||{})
    setvenue_details_group1d734Props({...venue_details_group1d734Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,checklist_main_group32240Props?.controls);
    setchecklist_main_group32240(bindData24||{})
    setchecklist_main_group32240Props({...checklist_main_group32240Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,checklist_tablee7deaProps?.controls);
    setchecklist_tablee7dea(bindData26||{})
    setchecklist_tablee7deaProps({...checklist_tablee7deaProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,special_rules_groupf22abProps?.controls);
    setspecial_rules_groupf22ab(bindData28||{})
    setspecial_rules_groupf22abProps({...special_rules_groupf22abProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData30 = filterByKeys(mainData,special_rules96aecProps?.controls);
    setspecial_rules96aec(bindData30||{})
    setspecial_rules96aecProps({...special_rules96aecProps,presetValues:{...(mainData||{})}})
    // showArtifact
    let filterProps32: any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "0b84a99163eb8dd425338976559dd501",
        "object": {
          "properties.account_id": "a77bb1cbcfac46c59cf0979384f4eec9"
        }
      }
    ]
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:DocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "63f1fdf16ab179720c3d1503d94e26de",
        "object": {
          "properties.account_id": "a77bb1cbcfac46c59cf0979384f4eec9"
        }
      }
    ]
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:venueSpecialRules:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "eed1b90543e747829ff96af5df90bdcd",
        "object": {
          "properties.venue_id": "401517e8d16b459388dad2a497a37c04"
        }
      }
    ]
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrChecklistStatus:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "401380fb5b984554a4210c053168c928",
        "object": {
          "properties.account_id": "a77bb1cbcfac46c59cf0979384f4eec9"
        }
      }
    ]
  }
];
    let filterData32 = await getFilterProps(filterProps32,mainData);
    setviewamrcase_v1Props([...filterData32 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCase:AFVK:v1', 'viewamrcase_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

 if (view_btnbd9a5?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1','amrqueuetable','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view_btnbd9a5?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View Pg")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn

