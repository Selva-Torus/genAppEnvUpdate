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
 

const Buttonbt_approve = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const {amrcaseapproval_v1Props, setamrcaseapproval_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group77747, setadd_case_group77747}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group77747Props, setadd_case_group77747Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8a, setheader_groupbae8a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8aProps, setheader_groupbae8aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8, setrequired_dociument_main_group999a8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8d, setdoc_table45b8d}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8dProps, setdoc_table45b8dProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3, setcase_information_group35ed3}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3Props, setcase_information_group35ed3Props}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78fa, setcard_groupe78fa}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78faProps, setcard_groupe78faProps}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9f, setprincipal_group9ae9f}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9fProps, setprincipal_group9ae9fProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75, setintrest_group8df75}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75Props, setintrest_group8df75Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23b, setfees_groupac23b}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23bProps, setfees_groupac23bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175, settotal_groupe6175}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175Props, settotal_groupe6175Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904e, setvenue_details_group6904e}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904eProps, setvenue_details_group6904eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ff, setchecklist_main_groupda0ff}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585, setspecial_rules_groupc1585}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585Props, setspecial_rules_groupc1585Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30, setspecial_rules1fc30}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30Props, setspecial_rules1fc30Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25b, setchecklist_table0e25b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25bProps, setchecklist_table0e25bProps}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['amrcaseapproval_v1'] = amrcaseapproval_v1Props,
      codeStates['setamrcaseapproval_v1'] = setamrcaseapproval_v1Props,
      codeStates['add_case_group'] = add_case_group77747,
      codeStates['setadd_case_group'] = setadd_case_group77747,
      codeStates['add_case_group77747'] = add_case_group77747Props,
      codeStates['setadd_case_group77747'] = setadd_case_group77747Props,
      codeStates['header_group'] = header_groupbae8a,
      codeStates['setheader_group'] = setheader_groupbae8a,
      codeStates['header_groupbae8a'] = header_groupbae8aProps,
      codeStates['setheader_groupbae8a'] = setheader_groupbae8aProps,
      codeStates['required_dociument_main_group'] = required_dociument_main_group999a8,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group999a8,
      codeStates['required_dociument_main_group999a8'] = required_dociument_main_group999a8Props,
      codeStates['setrequired_dociument_main_group999a8'] = setrequired_dociument_main_group999a8Props,
      codeStates['doc_table'] = doc_table45b8d,
      codeStates['setdoc_table'] = setdoc_table45b8d,
      codeStates['doc_table45b8d'] = doc_table45b8dProps,
      codeStates['setdoc_table45b8d'] = setdoc_table45b8dProps,
      codeStates['case_information_group'] = case_information_group35ed3,
      codeStates['setcase_information_group'] = setcase_information_group35ed3,
      codeStates['case_information_group35ed3'] = case_information_group35ed3Props,
      codeStates['setcase_information_group35ed3'] = setcase_information_group35ed3Props,
      codeStates['card_group'] = card_groupe78fa,
      codeStates['setcard_group'] = setcard_groupe78fa,
      codeStates['card_groupe78fa'] = card_groupe78faProps,
      codeStates['setcard_groupe78fa'] = setcard_groupe78faProps,
      codeStates['principal_group'] = principal_group9ae9f,
      codeStates['setprincipal_group'] = setprincipal_group9ae9f,
      codeStates['principal_group9ae9f'] = principal_group9ae9fProps,
      codeStates['setprincipal_group9ae9f'] = setprincipal_group9ae9fProps,
      codeStates['intrest_group'] = intrest_group8df75,
      codeStates['setintrest_group'] = setintrest_group8df75,
      codeStates['intrest_group8df75'] = intrest_group8df75Props,
      codeStates['setintrest_group8df75'] = setintrest_group8df75Props,
      codeStates['fees_group'] = fees_groupac23b,
      codeStates['setfees_group'] = setfees_groupac23b,
      codeStates['fees_groupac23b'] = fees_groupac23bProps,
      codeStates['setfees_groupac23b'] = setfees_groupac23bProps,
      codeStates['total_group'] = total_groupe6175,
      codeStates['settotal_group'] = settotal_groupe6175,
      codeStates['total_groupe6175'] = total_groupe6175Props,
      codeStates['settotal_groupe6175'] = settotal_groupe6175Props,
      codeStates['venue_details_group'] = venue_details_group6904e,
      codeStates['setvenue_details_group'] = setvenue_details_group6904e,
      codeStates['venue_details_group6904e'] = venue_details_group6904eProps,
      codeStates['setvenue_details_group6904e'] = setvenue_details_group6904eProps,
      codeStates['checklist_main_group'] = checklist_main_groupda0ff,
      codeStates['setchecklist_main_group'] = setchecklist_main_groupda0ff,
      codeStates['checklist_main_groupda0ff'] = checklist_main_groupda0ffProps,
      codeStates['setchecklist_main_groupda0ff'] = setchecklist_main_groupda0ffProps,
      codeStates['special_rules_group'] = special_rules_groupc1585,
      codeStates['setspecial_rules_group'] = setspecial_rules_groupc1585,
      codeStates['special_rules_groupc1585'] = special_rules_groupc1585Props,
      codeStates['setspecial_rules_groupc1585'] = setspecial_rules_groupc1585Props,
      codeStates['special_rules'] = special_rules1fc30,
      codeStates['setspecial_rules'] = setspecial_rules1fc30,
      codeStates['special_rules1fc30'] = special_rules1fc30Props,
      codeStates['setspecial_rules1fc30'] = setspecial_rules1fc30Props,
      codeStates['checklist_table'] = checklist_table0e25b,
      codeStates['setchecklist_table'] = setchecklist_table0e25b,
      codeStates['checklist_table0e25b'] = checklist_table0e25bProps,
      codeStates['setchecklist_table0e25b'] = setchecklist_table0e25bProps,
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
        "cd31bfd58787481bb458a75faeeec5db"
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
      if (id === "bt_approveec5db") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[bt_approveec5db?.refresh])


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

    // showArtifact
    let filterProps2: any =  [
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
  },
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:venueSpecialRules:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "eed1b90543e747829ff96af5df90bdcd",
        "object": {
          "properties.venue_id": "7c629e12dd084e44b6595c014a2b51d8"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setamrcaseapproval_v1Props([...filterData2 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRCaseApproval:AFVK:v1', 'amrcaseapproval_v1'));
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,add_case_group77747Props?.controls);
    setadd_case_group77747(bindData4||{})
    setadd_case_group77747Props({...add_case_group77747Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,header_groupbae8aProps?.controls);
    setheader_groupbae8a(bindData6||{})
    setheader_groupbae8aProps({...header_groupbae8aProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,required_dociument_main_group999a8Props?.controls);
    setrequired_dociument_main_group999a8(bindData8||{})
    setrequired_dociument_main_group999a8Props({...required_dociument_main_group999a8Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,doc_table45b8dProps?.controls);
    setdoc_table45b8d(bindData10||{})
    setdoc_table45b8dProps({...doc_table45b8dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,case_information_group35ed3Props?.controls);
    setcase_information_group35ed3(bindData12||{})
    setcase_information_group35ed3Props({...case_information_group35ed3Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,card_groupe78faProps?.controls);
    setcard_groupe78fa(bindData14||{})
    setcard_groupe78faProps({...card_groupe78faProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,principal_group9ae9fProps?.controls);
    setprincipal_group9ae9f(bindData16||{})
    setprincipal_group9ae9fProps({...principal_group9ae9fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,intrest_group8df75Props?.controls);
    setintrest_group8df75(bindData18||{})
    setintrest_group8df75Props({...intrest_group8df75Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,fees_groupac23bProps?.controls);
    setfees_groupac23b(bindData20||{})
    setfees_groupac23bProps({...fees_groupac23bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,total_groupe6175Props?.controls);
    settotal_groupe6175(bindData22||{})
    settotal_groupe6175Props({...total_groupe6175Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,venue_details_group6904eProps?.controls);
    setvenue_details_group6904e(bindData24||{})
    setvenue_details_group6904eProps({...venue_details_group6904eProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,checklist_main_groupda0ffProps?.controls);
    setchecklist_main_groupda0ff(bindData26||{})
    setchecklist_main_groupda0ffProps({...checklist_main_groupda0ffProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,special_rules_groupc1585Props?.controls);
    setspecial_rules_groupc1585(bindData28||{})
    setspecial_rules_groupc1585Props({...special_rules_groupc1585Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData30 = filterByKeys(mainData,special_rules1fc30Props?.controls);
    setspecial_rules1fc30(bindData30||{})
    setspecial_rules1fc30Props({...special_rules1fc30Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData32 = filterByKeys(mainData,checklist_table0e25bProps?.controls);
    setchecklist_table0e25b(bindData32||{})
    setchecklist_table0e25bProps({...checklist_table0e25bProps,presetValues:{...(mainData||{})}})
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

 if (bt_approveec5db?.isHidden) {
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
          disabled= {bt_approveec5db?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdDownloadDone"
          iconDisplay='Start with Icon'
        >
          {keyset("Approve")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_approve

