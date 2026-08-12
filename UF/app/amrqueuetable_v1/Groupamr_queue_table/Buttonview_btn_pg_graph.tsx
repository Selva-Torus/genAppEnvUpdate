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
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {viewamrpggraph_v1Props, setviewamrpggraph_v1Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['case_information_group'] = case_information_group40df6,
      codeStates['setcase_information_group'] = setcase_information_group40df6,
      codeStates['case_information_group40df6'] = case_information_group40df6Props,
      codeStates['setcase_information_group40df6'] = setcase_information_group40df6Props,
      codeStates['header_group'] = header_groupf55cb,
      codeStates['setheader_group'] = setheader_groupf55cb,
      codeStates['header_groupf55cb'] = header_groupf55cbProps,
      codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
      codeStates['doc_table'] = doc_table8af83,
      codeStates['setdoc_table'] = setdoc_table8af83,
      codeStates['doc_table8af83'] = doc_table8af83Props,
      codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
      codeStates['card_group'] = card_group00ce3,
      codeStates['setcard_group'] = setcard_group00ce3,
      codeStates['card_group00ce3'] = card_group00ce3Props,
      codeStates['setcard_group00ce3'] = setcard_group00ce3Props,
      codeStates['principal_group'] = principal_group510ca,
      codeStates['setprincipal_group'] = setprincipal_group510ca,
      codeStates['principal_group510ca'] = principal_group510caProps,
      codeStates['setprincipal_group510ca'] = setprincipal_group510caProps,
      codeStates['intrest_group'] = intrest_group1ba85,
      codeStates['setintrest_group'] = setintrest_group1ba85,
      codeStates['intrest_group1ba85'] = intrest_group1ba85Props,
      codeStates['setintrest_group1ba85'] = setintrest_group1ba85Props,
      codeStates['fees_group'] = fees_groupbee4a,
      codeStates['setfees_group'] = setfees_groupbee4a,
      codeStates['fees_groupbee4a'] = fees_groupbee4aProps,
      codeStates['setfees_groupbee4a'] = setfees_groupbee4aProps,
      codeStates['total_group'] = total_group197f6,
      codeStates['settotal_group'] = settotal_group197f6,
      codeStates['total_group197f6'] = total_group197f6Props,
      codeStates['settotal_group197f6'] = settotal_group197f6Props,
      codeStates['checklist_main_group'] = checklist_main_group2d71b,
      codeStates['setchecklist_main_group'] = setchecklist_main_group2d71b,
      codeStates['checklist_main_group2d71b'] = checklist_main_group2d71bProps,
      codeStates['setchecklist_main_group2d71b'] = setchecklist_main_group2d71bProps,
      codeStates['checklist_table'] = checklist_tablec0934,
      codeStates['setchecklist_table'] = setchecklist_tablec0934,
      codeStates['checklist_tablec0934'] = checklist_tablec0934Props,
      codeStates['setchecklist_tablec0934'] = setchecklist_tablec0934Props,
      codeStates['viewamrpggraph_v1'] = viewamrpggraph_v1Props,
      codeStates['setviewamrpggraph_v1'] = setviewamrpggraph_v1Props,
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
    let bindData2 = filterByKeys(mainData,case_information_group40df6Props?.controls);
    setcase_information_group40df6(bindData2||{})
    setcase_information_group40df6Props({...case_information_group40df6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,fees_groupbee4aProps?.controls);
    setfees_groupbee4a(bindData14||{})
    setfees_groupbee4aProps({...fees_groupbee4aProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,total_group197f6Props?.controls);
    settotal_group197f6(bindData16||{})
    settotal_group197f6Props({...total_group197f6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,checklist_main_group2d71bProps?.controls);
    setchecklist_main_group2d71b(bindData18||{})
    setchecklist_main_group2d71bProps({...checklist_main_group2d71bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,checklist_tablec0934Props?.controls);
    setchecklist_tablec0934(bindData20||{})
    setchecklist_tablec0934Props({...checklist_tablec0934Props,presetValues:{...(mainData||{})}})
    // showArtifact
    let filterProps22: any =  [
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
  }
];
    let filterData22 = await getFilterProps(filterProps22,mainData);
    setviewamrpggraph_v1Props([...filterData22 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRPgGraph:AFVK:v1', 'viewamrpggraph_v1'));
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,doc_table8af83Props?.controls);
    setdoc_table8af83(bindData24||{})
    setdoc_table8af83Props({...doc_table8af83Props,presetValues:{...(mainData||{})}})
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

