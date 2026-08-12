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
 

const Buttonview_btn_pg_graph = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const {account_id9a546, setaccount_id9a546}= useContext(TotalContext) as TotalContextProps;
  const {case_id734ed, setcase_id734ed}= useContext(TotalContext) as TotalContextProps;
  const {debtor_nameb1ea9, setdebtor_nameb1ea9}= useContext(TotalContext) as TotalContextProps;
  const {creditor_namee48d1, setcreditor_namee48d1}= useContext(TotalContext) as TotalContextProps;
  const {full_name7a369, setfull_name7a369}= useContext(TotalContext) as TotalContextProps;
  const {total_balance6a331, settotal_balance6a331}= useContext(TotalContext) as TotalContextProps;
  const {court_name5ae4f, setcourt_name5ae4f}= useContext(TotalContext) as TotalContextProps;
  const {priority_name6740a, setpriority_name6740a}= useContext(TotalContext) as TotalContextProps;
  const {status_name86d6c, setstatus_name86d6c}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date92fe2, settrs_created_date92fe2}= useContext(TotalContext) as TotalContextProps;
  const {venue_idb51d8, setvenue_idb51d8}= useContext(TotalContext) as TotalContextProps;
  const {view_btnbd9a5, setview_btnbd9a5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn10d01, setedit_btn10d01}= useContext(TotalContext) as TotalContextProps;
  const {view_btn_pg_graph1baad, setview_btn_pg_graph1baad}= useContext(TotalContext) as TotalContextProps;
  const {bt_approveec5db, setbt_approveec5db}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
  const {viewamrcasepggraph_v1Props, setviewamrcasepggraph_v1Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['account_id'] = account_id9a546,
      codeStates['setaccount_id'] = setaccount_id9a546,
      codeStates['case_id'] = case_id734ed,
      codeStates['setcase_id'] = setcase_id734ed,
      codeStates['debtor_name'] = debtor_nameb1ea9,
      codeStates['setdebtor_name'] = setdebtor_nameb1ea9,
      codeStates['creditor_name'] = creditor_namee48d1,
      codeStates['setcreditor_name'] = setcreditor_namee48d1,
      codeStates['full_name'] = full_name7a369,
      codeStates['setfull_name'] = setfull_name7a369,
      codeStates['total_balance'] = total_balance6a331,
      codeStates['settotal_balance'] = settotal_balance6a331,
      codeStates['court_name'] = court_name5ae4f,
      codeStates['setcourt_name'] = setcourt_name5ae4f,
      codeStates['priority_name'] = priority_name6740a,
      codeStates['setpriority_name'] = setpriority_name6740a,
      codeStates['status_name'] = status_name86d6c,
      codeStates['setstatus_name'] = setstatus_name86d6c,
      codeStates['trs_created_date'] = trs_created_date92fe2,
      codeStates['settrs_created_date'] = settrs_created_date92fe2,
      codeStates['venue_id'] = venue_idb51d8,
      codeStates['setvenue_id'] = setvenue_idb51d8,
      codeStates['view_btn'] = view_btnbd9a5,
      codeStates['setview_btn'] = setview_btnbd9a5,
      codeStates['edit_btn'] = edit_btn10d01,
      codeStates['setedit_btn'] = setedit_btn10d01,
      codeStates['view_btn_pg_graph'] = view_btn_pg_graph1baad,
      codeStates['setview_btn_pg_graph'] = setview_btn_pg_graph1baad,
      codeStates['bt_approve'] = bt_approveec5db,
      codeStates['setbt_approve'] = setbt_approveec5db,
      codeStates['add_case_group'] = add_case_grouped126,
      codeStates['setadd_case_group'] = setadd_case_grouped126,
      codeStates['add_case_grouped126'] = add_case_grouped126Props,
      codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
      codeStates['header_group'] = header_groupbd8a8,
      codeStates['setheader_group'] = setheader_groupbd8a8,
      codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
      codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
      codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
      codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
      codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
      codeStates['doc_table'] = doc_table9c4f7,
      codeStates['setdoc_table'] = setdoc_table9c4f7,
      codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
      codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
      codeStates['case_information_group'] = case_information_group48f3c,
      codeStates['setcase_information_group'] = setcase_information_group48f3c,
      codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
      codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
      codeStates['card_group'] = card_group4c709,
      codeStates['setcard_group'] = setcard_group4c709,
      codeStates['card_group4c709'] = card_group4c709Props,
      codeStates['setcard_group4c709'] = setcard_group4c709Props,
      codeStates['principal_group'] = principal_group42235,
      codeStates['setprincipal_group'] = setprincipal_group42235,
      codeStates['principal_group42235'] = principal_group42235Props,
      codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
      codeStates['intrest_group'] = intrest_group65c3b,
      codeStates['setintrest_group'] = setintrest_group65c3b,
      codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
      codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
      codeStates['fees_group'] = fees_group8c4a6,
      codeStates['setfees_group'] = setfees_group8c4a6,
      codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
      codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
      codeStates['total_group'] = total_groupc52d3,
      codeStates['settotal_group'] = settotal_groupc52d3,
      codeStates['total_groupc52d3'] = total_groupc52d3Props,
      codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
      codeStates['venue_details_group'] = venue_details_group51614,
      codeStates['setvenue_details_group'] = setvenue_details_group51614,
      codeStates['venue_details_group51614'] = venue_details_group51614Props,
      codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
      codeStates['checklist_main_group'] = checklist_main_group2b466,
      codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
      codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
      codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
      codeStates['checklist_table'] = checklist_tablecafb0,
      codeStates['setchecklist_table'] = setchecklist_tablecafb0,
      codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
      codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
      codeStates['special_rules_group'] = special_rules_group7ce9f,
      codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
      codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
      codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
      codeStates['special_rules'] = special_rules7f109,
      codeStates['setspecial_rules'] = setspecial_rules7f109,
      codeStates['special_rules7f109'] = special_rules7f109Props,
      codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
      codeStates['viewamrcasepggraph_v1'] = viewamrcasepggraph_v1Props,
      codeStates['setviewamrcasepggraph_v1'] = setviewamrcasepggraph_v1Props,
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
        "3cdaacd536b24b6aad0cec1cf5d1baad"
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
      if (id === "view_btn_pg_graph1baad") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[view_btn_pg_graph1baad?.refresh])


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
    let bindData2 = filterByKeys(mainData,add_case_grouped126Props?.controls);
    setadd_case_grouped126(bindData2||{})
    setadd_case_grouped126Props({...add_case_grouped126Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,fees_group8c4a6Props?.controls);
    setfees_group8c4a6(bindData18||{})
    setfees_group8c4a6Props({...fees_group8c4a6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,total_groupc52d3Props?.controls);
    settotal_groupc52d3(bindData20||{})
    settotal_groupc52d3Props({...total_groupc52d3Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,venue_details_group51614Props?.controls);
    setvenue_details_group51614(bindData22||{})
    setvenue_details_group51614Props({...venue_details_group51614Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,checklist_main_group2b466Props?.controls);
    setchecklist_main_group2b466(bindData24||{})
    setchecklist_main_group2b466Props({...checklist_main_group2b466Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,checklist_tablecafb0Props?.controls);
    setchecklist_tablecafb0(bindData26||{})
    setchecklist_tablecafb0Props({...checklist_tablecafb0Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,special_rules_group7ce9fProps?.controls);
    setspecial_rules_group7ce9f(bindData28||{})
    setspecial_rules_group7ce9fProps({...special_rules_group7ce9fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData30 = filterByKeys(mainData,special_rules7f109Props?.controls);
    setspecial_rules7f109(bindData30||{})
    setspecial_rules7f109Props({...special_rules7f109Props,presetValues:{...(mainData||{})}})
    // showArtifact
    let filterProps32: any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "0b84a99163eb8dd425338976559dd501",
        "object": {
          "properties.account_id": "f6394d08b20a4718af6800c17a09a546"
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
          "properties.account_id": "f6394d08b20a4718af6800c17a09a546"
        }
      }
    ]
  }
];
    let filterData32 = await getFilterProps(filterProps32,mainData);
    setviewamrcasepggraph_v1Props([...filterData32 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1', 'viewamrcasepggraph_v1'));
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

 if (view_btn_pg_graph1baad?.isHidden) {
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
          disabled= {view_btn_pg_graph1baad?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View Pg + Graph")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn_pg_graph

