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
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const {addcase_v1Props, setaddcase_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps;
  const {submit0112f, setsubmit0112f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {update294f0, setupdate294f0}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['addcase_v1'] = addcase_v1Props,
      codeStates['setaddcase_v1'] = setaddcase_v1Props,
      codeStates['add_case_group'] = add_case_groupeb161,
      codeStates['setadd_case_group'] = setadd_case_groupeb161,
      codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
      codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
      codeStates['header_group'] = header_group4878f,
      codeStates['setheader_group'] = setheader_group4878f,
      codeStates['header_group4878f'] = header_group4878fProps,
      codeStates['setheader_group4878f'] = setheader_group4878fProps,
      codeStates['case_information_group'] = case_information_group28f6f,
      codeStates['setcase_information_group'] = setcase_information_group28f6f,
      codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
      codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
      codeStates['venue_group'] = venue_group6a36d,
      codeStates['setvenue_group'] = setvenue_group6a36d,
      codeStates['venue_group6a36d'] = venue_group6a36dProps,
      codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
      codeStates['debtor_information_group'] = debtor_information_group78a70,
      codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
      codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
      codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
      codeStates['financial_details_group'] = financial_details_group52f47,
      codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
      codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
      codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
      codeStates['venue_details_group'] = venue_details_group17ac6,
      codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
      codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
      codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
      codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
      codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
      codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
      codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
      codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
      codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
      codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
      codeStates['doc_type_table'] = doc_type_tablebe9fa,
      codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
      codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
      codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
      codeStates['checklist_main_group'] = checklist_main_group0df6b,
      codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
      codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
      codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
      codeStates['checklist_group'] = checklist_group32b3d,
      codeStates['setchecklist_group'] = setchecklist_group32b3d,
      codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
      codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
      codeStates['checklist_table'] = checklist_table198e1,
      codeStates['setchecklist_table'] = setchecklist_table198e1,
      codeStates['checklist_table198e1'] = checklist_table198e1Props,
      codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,
      codeStates['submit'] = submit0112f,
      codeStates['setsubmit'] = setsubmit0112f,
      codeStates['dynamicactions'] = dynamicactions094c3,
      codeStates['setdynamicactions'] = setdynamicactions094c3,
      codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
      codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
      codeStates['update'] = update294f0,
      codeStates['setupdate'] = setupdate294f0,
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
        "cffe3e8335b89b9552242c57a5710d01"
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
      if (id === "edit_btn10d01") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[edit_btn10d01?.refresh])


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
    let filterProps2: any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setaddcase_v1Props([...filterData2 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1', 'addcase_v1'));
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,add_case_groupeb161Props?.controls);
    setadd_case_groupeb161(bindData4||{})
    setadd_case_groupeb161Props({...add_case_groupeb161Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,header_group4878fProps?.controls);
    setheader_group4878f(bindData6||{})
    setheader_group4878fProps({...header_group4878fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,case_information_group28f6fProps?.controls);
    setcase_information_group28f6f(bindData8||{})
    setcase_information_group28f6fProps({...case_information_group28f6fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,venue_group6a36dProps?.controls);
    setvenue_group6a36d(bindData10||{})
    setvenue_group6a36dProps({...venue_group6a36dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,debtor_information_group78a70Props?.controls);
    setdebtor_information_group78a70(bindData12||{})
    setdebtor_information_group78a70Props({...debtor_information_group78a70Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,financial_details_group52f47Props?.controls);
    setfinancial_details_group52f47(bindData14||{})
    setfinancial_details_group52f47Props({...financial_details_group52f47Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,venue_details_group17ac6Props?.controls);
    setvenue_details_group17ac6(bindData16||{})
    setvenue_details_group17ac6Props({...venue_details_group17ac6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,required_dociument_main_group04e92Props?.controls);
    setrequired_dociument_main_group04e92(bindData18||{})
    setrequired_dociument_main_group04e92Props({...required_dociument_main_group04e92Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,required_dociument_header_groupe39c8Props?.controls);
    setrequired_dociument_header_groupe39c8(bindData20||{})
    setrequired_dociument_header_groupe39c8Props({...required_dociument_header_groupe39c8Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,doc_type_tablebe9faProps?.controls);
    setdoc_type_tablebe9fa(bindData22||{})
    setdoc_type_tablebe9faProps({...doc_type_tablebe9faProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,checklist_main_group0df6bProps?.controls);
    setchecklist_main_group0df6b(bindData24||{})
    setchecklist_main_group0df6bProps({...checklist_main_group0df6bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,checklist_group32b3dProps?.controls);
    setchecklist_group32b3d(bindData26||{})
    setchecklist_group32b3dProps({...checklist_group32b3dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,checklist_table198e1Props?.controls);
    setchecklist_table198e1(bindData28||{})
    setchecklist_table198e1Props({...checklist_table198e1Props,presetValues:{...(mainData||{})}})
    //disableElement
    setsubmit0112f((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate294f0((prev: any) => ({ ...prev, isDisabled: false }));
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

 if (edit_btn10d01?.isHidden) {
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
          disabled= {edit_btn10d01?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdModeEdit"
          iconDisplay='Start with Icon'
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

