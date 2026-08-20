'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
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
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
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
 

const Buttonhold = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
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
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overallgroup1218f, setoverallgroup1218f}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup1218fProps, setoverallgroup1218fProps}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48, setcontrolgroupfbb48}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48Props, setcontrolgroupfbb48Props}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ff, setcontrol_tab_group161ff}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ffProps, setcontrol_tab_group161ffProps}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855, setbutton_groupb9855}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855Props, setbutton_groupb9855Props}= useContext(TotalContext) as TotalContextProps;
  const {hold12b6e, sethold12b6e}= useContext(TotalContext) as TotalContextProps;
  const {force_pass93cf0, setforce_pass93cf0}= useContext(TotalContext) as TotalContextProps;
  const {ip_approve2a0bf, setip_approve2a0bf}= useContext(TotalContext) as TotalContextProps;
  const {return0f9cc, setreturn0f9cc}= useContext(TotalContext) as TotalContextProps;
  const {cancel568c6, setcancel568c6}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957a, setrtgs_info5957a}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957aProps, setrtgs_info5957aProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72, setallcontrolsb8c72}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72Props, setallcontrolsb8c72Props}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7eda, setcommoninfod7eda}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7edaProps, setcommoninfod7edaProps}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0a, setbasicinfoffb0a}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0aProps, setbasicinfoffb0aProps}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4baba, setadditionalinfo4baba}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4babaProps, setadditionalinfo4babaProps}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7c, setlistgroup97a7c}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7cProps, setlistgroup97a7cProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782e, setlist_tab_group6782e}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782eProps, setlist_tab_group6782eProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09d, setvalidation_listcc09d}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09dProps, setvalidation_listcc09dProps}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84, setvaldnlisttable4db84}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84Props, setvaldnlisttable4db84Props}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158b, setcomment_listb158b}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158bProps, setcomment_listb158bProps}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834, setcmntlisttable96834}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834Props, setcmntlisttable96834Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6, setrtgs_listf12c6}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6Props, setrtgs_listf12c6Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfc, setrtgs_list_grp82cfc}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfcProps, setrtgs_list_grp82cfcProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5, setrtgs_list_tble_groupe1ac5}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5Props, setrtgs_list_tble_groupe1ac5Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7, setrtgs_list_tablead2c7}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7Props, setrtgs_list_tablead2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aa, setgroup1b1aa}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aaProps, setgroup1b1aaProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579, setrtgs_list_tab_grp43579}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579Props, setrtgs_list_tab_grp43579Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1, setvalidtn_list3a9a1}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1Props, setvalidtn_list3a9a1Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755, setrtgs_list_validtn_table10755}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755Props, setrtgs_list_validtn_table10755Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3b, setcmnt_list18a3b}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3bProps, setcmnt_list18a3bProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130, setrtgs_list_cmnts_list85130}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130Props, setrtgs_list_cmnts_list85130Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253, setoperational_pending_table0a253}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253Props, setoperational_pending_table0a253Props}= useContext(TotalContext) as TotalContextProps;
  const {transactionproduct_v1Props, settransactionproduct_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const button_groupb9855Ref = useRef(button_groupb9855);
  useEffect(() => {
    button_groupb9855Ref.current = button_groupb9855;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [button_groupb9855]);
  
  //group props in ref to access latest props value
  const button_groupb9855PropsRef = useRef(button_groupb9855Props);
  useEffect(() => {
    button_groupb9855PropsRef.current = button_groupb9855Props;
  }, [button_groupb9855Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overallgroup'] = overallgroup1218f,
        codeStates['setoverallgroup'] = setoverallgroup1218f,
        codeStates['overallgroup1218f'] = overallgroup1218fProps,
        codeStates['setoverallgroup1218f'] = setoverallgroup1218fProps,
        codeStates['controlgroup'] = controlgroupfbb48,
        codeStates['setcontrolgroup'] = setcontrolgroupfbb48,
        codeStates['controlgroupfbb48'] = controlgroupfbb48Props,
        codeStates['setcontrolgroupfbb48'] = setcontrolgroupfbb48Props,
        codeStates['control_tab_group'] = control_tab_group161ff,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_group161ff,
        codeStates['control_tab_group161ff'] = control_tab_group161ffProps,
        codeStates['setcontrol_tab_group161ff'] = setcontrol_tab_group161ffProps,
        codeStates['button_group'] = button_groupb9855,
        codeStates['setbutton_group'] = setbutton_groupb9855,
        codeStates['button_groupb9855'] = button_groupb9855Props,
        codeStates['setbutton_groupb9855'] = setbutton_groupb9855Props,
        codeStates['hold'] = hold12b6e,
        codeStates['sethold'] = sethold12b6e,
        codeStates['force_pass'] = force_pass93cf0,
        codeStates['setforce_pass'] = setforce_pass93cf0,
        codeStates['ip_approve'] = ip_approve2a0bf,
        codeStates['setip_approve'] = setip_approve2a0bf,
        codeStates['return'] = return0f9cc,
        codeStates['setreturn'] = setreturn0f9cc,
        codeStates['cancel'] = cancel568c6,
        codeStates['setcancel'] = setcancel568c6,
        codeStates['rtgs_info'] = rtgs_info5957a,
        codeStates['setrtgs_info'] = setrtgs_info5957a,
        codeStates['rtgs_info5957a'] = rtgs_info5957aProps,
        codeStates['setrtgs_info5957a'] = setrtgs_info5957aProps,
        codeStates['allcontrols'] = allcontrolsb8c72,
        codeStates['setallcontrols'] = setallcontrolsb8c72,
        codeStates['allcontrolsb8c72'] = allcontrolsb8c72Props,
        codeStates['setallcontrolsb8c72'] = setallcontrolsb8c72Props,
        codeStates['commoninfo'] = commoninfod7eda,
        codeStates['setcommoninfo'] = setcommoninfod7eda,
        codeStates['commoninfod7eda'] = commoninfod7edaProps,
        codeStates['setcommoninfod7eda'] = setcommoninfod7edaProps,
        codeStates['basicinfo'] = basicinfoffb0a,
        codeStates['setbasicinfo'] = setbasicinfoffb0a,
        codeStates['basicinfoffb0a'] = basicinfoffb0aProps,
        codeStates['setbasicinfoffb0a'] = setbasicinfoffb0aProps,
        codeStates['additionalinfo'] = additionalinfo4baba,
        codeStates['setadditionalinfo'] = setadditionalinfo4baba,
        codeStates['additionalinfo4baba'] = additionalinfo4babaProps,
        codeStates['setadditionalinfo4baba'] = setadditionalinfo4babaProps,
        codeStates['listgroup'] = listgroup97a7c,
        codeStates['setlistgroup'] = setlistgroup97a7c,
        codeStates['listgroup97a7c'] = listgroup97a7cProps,
        codeStates['setlistgroup97a7c'] = setlistgroup97a7cProps,
        codeStates['list_tab_group'] = list_tab_group6782e,
        codeStates['setlist_tab_group'] = setlist_tab_group6782e,
        codeStates['list_tab_group6782e'] = list_tab_group6782eProps,
        codeStates['setlist_tab_group6782e'] = setlist_tab_group6782eProps,
        codeStates['validation_list'] = validation_listcc09d,
        codeStates['setvalidation_list'] = setvalidation_listcc09d,
        codeStates['validation_listcc09d'] = validation_listcc09dProps,
        codeStates['setvalidation_listcc09d'] = setvalidation_listcc09dProps,
        codeStates['valdnlisttable'] = valdnlisttable4db84,
        codeStates['setvaldnlisttable'] = setvaldnlisttable4db84,
        codeStates['valdnlisttable4db84'] = valdnlisttable4db84Props,
        codeStates['setvaldnlisttable4db84'] = setvaldnlisttable4db84Props,
        codeStates['comment_list'] = comment_listb158b,
        codeStates['setcomment_list'] = setcomment_listb158b,
        codeStates['comment_listb158b'] = comment_listb158bProps,
        codeStates['setcomment_listb158b'] = setcomment_listb158bProps,
        codeStates['cmntlisttable'] = cmntlisttable96834,
        codeStates['setcmntlisttable'] = setcmntlisttable96834,
        codeStates['cmntlisttable96834'] = cmntlisttable96834Props,
        codeStates['setcmntlisttable96834'] = setcmntlisttable96834Props,
        codeStates['rtgs_list'] = rtgs_listf12c6,
        codeStates['setrtgs_list'] = setrtgs_listf12c6,
        codeStates['rtgs_listf12c6'] = rtgs_listf12c6Props,
        codeStates['setrtgs_listf12c6'] = setrtgs_listf12c6Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grp82cfc,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grp82cfc,
        codeStates['rtgs_list_grp82cfc'] = rtgs_list_grp82cfcProps,
        codeStates['setrtgs_list_grp82cfc'] = setrtgs_list_grp82cfcProps,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupe1ac5,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupe1ac5,
        codeStates['rtgs_list_tble_groupe1ac5'] = rtgs_list_tble_groupe1ac5Props,
        codeStates['setrtgs_list_tble_groupe1ac5'] = setrtgs_list_tble_groupe1ac5Props,
        codeStates['rtgs_list_table'] = rtgs_list_tablead2c7,
        codeStates['setrtgs_list_table'] = setrtgs_list_tablead2c7,
        codeStates['rtgs_list_tablead2c7'] = rtgs_list_tablead2c7Props,
        codeStates['setrtgs_list_tablead2c7'] = setrtgs_list_tablead2c7Props,
        codeStates['group'] = group1b1aa,
        codeStates['setgroup'] = setgroup1b1aa,
        codeStates['group1b1aa'] = group1b1aaProps,
        codeStates['setgroup1b1aa'] = setgroup1b1aaProps,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp43579,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp43579,
        codeStates['rtgs_list_tab_grp43579'] = rtgs_list_tab_grp43579Props,
        codeStates['setrtgs_list_tab_grp43579'] = setrtgs_list_tab_grp43579Props,
        codeStates['validtn_list'] = validtn_list3a9a1,
        codeStates['setvalidtn_list'] = setvalidtn_list3a9a1,
        codeStates['validtn_list3a9a1'] = validtn_list3a9a1Props,
        codeStates['setvalidtn_list3a9a1'] = setvalidtn_list3a9a1Props,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table10755,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table10755,
        codeStates['rtgs_list_validtn_table10755'] = rtgs_list_validtn_table10755Props,
        codeStates['setrtgs_list_validtn_table10755'] = setrtgs_list_validtn_table10755Props,
        codeStates['cmnt_list'] = cmnt_list18a3b,
        codeStates['setcmnt_list'] = setcmnt_list18a3b,
        codeStates['cmnt_list18a3b'] = cmnt_list18a3bProps,
        codeStates['setcmnt_list18a3b'] = setcmnt_list18a3bProps,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list85130,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list85130,
        codeStates['rtgs_list_cmnts_list85130'] = rtgs_list_cmnts_list85130Props,
        codeStates['setrtgs_list_cmnts_list85130'] = setrtgs_list_cmnts_list85130Props,
        codeStates['operational_pending_table'] = operational_pending_table0a253,
        codeStates['setoperational_pending_table'] = setoperational_pending_table0a253,
        codeStates['operational_pending_table0a253'] = operational_pending_table0a253Props,
        codeStates['setoperational_pending_table0a253'] = setoperational_pending_table0a253Props,
        codeStates['transactionproduct_v1'] = transactionproduct_v1Props,
        codeStates['settransactionproduct_v1'] = settransactionproduct_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {inboundscanprocessui_v1, setinboundscanprocessui_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...button_groupb9855Ref.current};
      let parentRowSpan = 10;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "14e844df4cccf4759585851079bb9855",
        "58e523e35f3f4a4b810d4b3c48a12b6e"
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

    /////////
    if(orchestrationData?.data?.rule?.nodes?.length > 0){
      setRulseData(orchestrationData?.data?.rule.nodes)
      let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,session:decodedTokenObj,...data,...memoryVariables});
      // schemaFlag =schemaFlag.output;
      let order:number = Number(schemaFlag.order);

      // Update grid position based on order number
      
      if (order && typeof order === 'number') {
        const position : any = getGridPositionFromOrder(order,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      } else if( "start" in schemaFlag && "end" in schemaFlag)
      {
        const position : any = getGridPositionFromOrder(schemaFlag,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      }
      else{
        setStyleSate({ pointerEvents: 'auto'})
      } 

      if (schemaFlag.output !== "true") {
        setShowFlag(false);
      }else{
        setShowFlag(true)
      }
    }else if(button_groupb9855Props?.isHaveRule==true){
      if("hold" in button_groupb9855Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(button_groupb9855Props?.dynamicActionRule?.hold,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("hold" in inboundscanprocessui_v1?.button_group && inboundscanprocessui_v1?.button_group["hold"]?.itsHaveArtifact== true)
      {
        setShowFlag(inboundscanprocessui_v1?.button_group["hold"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(inboundscanprocessui_v1?.button_group?.hold?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }else{
        setShowFlag(false)
      }
    }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "hold12b6e") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "58e523e35f3f4a4b810d4b3c48a12b6e") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "hold12b6e");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!hold12b6e?.trigger) return;
      if(hold12b6e?.trigger){
      sethold12b6e((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[hold12b6e?.trigger])

  useEffect(()=>{
    if(hold12b6e?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[hold12b6e?.refresh])
  

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

  async function handleSave2b6e_1_1_2(){
      

  setValidateRefetch((pre: any) => ({ ...pre, value: !pre.value, init: pre.init + 1 }));
    await delay(1000); 

    const button_groupb9855Props = button_groupb9855PropsRef.current;

    let currentValidate: any = validateRef.current;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
  const hasInvalidField = Object.values(currentValidate?.inboundScanProcessUi_v1 || {}).some(val => {
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).includes('invalid');
      }
      return val === 'invalid';
    });

    if (hasInvalidField) {
      toast('Please verify the data', 'danger');
      return;
    }
    try{
      let copyFormhandlerData :any = {};
      let mainData:any=structuredClone(button_groupb9855Ref.current);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        ssKey: [],
        data: {},
        lock: {}
      }
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
        if(button_groupb9855?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
          throw 'Please give proper data';
        }
      let eventProperty :any = {
  "id": "58e523e35f3f4a4b810d4b3c48a12b6e",
  "type": "button",
  "name": "hold",
  "label": "hold",
  "sequence": 1,
  "children": [
    {
      "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.1",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "getFormData",
          "label": "getFormData",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "bb1cfd7a40ba1444e8038fc2adf161ff.1.1.1.1",
              "type": "screen",
              "name": "inboundScanProcessUi.v1|control_tab_group",
              "label": "inboundScanProcessUi.v1|control_tab_group",
              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|control_tab_group",
              "elementType": "tab_group",
              "sequence": "1.1.1.1",
              "children": []
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "parentTable",
                "_type": "string",
                "selectionList": [],
                "value": "",
                "enabled": true
              },
              {
                "name": "primaryKey",
                "_type": "string",
                "selectionList": [],
                "value": "",
                "enabled": true
              }
            ]
          }
        },
        {
          "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.2",
          "children": [
            {
              "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.2.1",
              "children": [
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.1",
                  "children": [
                    {
                      "id": "229399c32b1d4a11f4f06811a49d7eda.1.1.2.1.1.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|commonInfo",
                      "label": "inboundScanProcessUi|commonInfo",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|commonInfo",
                      "elementType": "group",
                      "groupType": "group",
                      "sequence": "1.1.2.1.1.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.2",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.2",
                  "children": [
                    {
                      "id": "abf150d5ae6f90069b1723bc4bdffb0a.1.1.2.1.2.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|basicInfo",
                      "label": "inboundScanProcessUi|basicInfo",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|basicInfo",
                      "elementType": "group",
                      "groupType": "group",
                      "sequence": "1.1.2.1.2.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.3",
                  "children": [
                    {
                      "id": "7e9ab6f094ce4f1565494f005e44baba.1.1.2.1.3.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|additionalInfo",
                      "label": "inboundScanProcessUi|additionalInfo",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|additionalInfo",
                      "elementType": "group",
                      "groupType": "group",
                      "sequence": "1.1.2.1.3.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.4",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.4",
                  "children": [
                    {
                      "id": "350585c031252e28732f2f119b74db84.1.1.2.1.4.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|valdnListTable",
                      "label": "inboundScanProcessUi|valdnListTable",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|valdnListTable",
                      "elementType": "table",
                      "groupType": "table",
                      "sequence": "1.1.2.1.4.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.5",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.5",
                  "children": [
                    {
                      "id": "ac53fbfc1a67cb0563533d6ce2596834.1.1.2.1.5.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|cmntListTable",
                      "label": "inboundScanProcessUi|cmntListTable",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|cmntListTable",
                      "elementType": "table",
                      "groupType": "table",
                      "sequence": "1.1.2.1.5.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.6",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.6",
                  "children": [
                    {
                      "id": "2dd50c83e10eedb8e9f91cb7b56ad2c7.1.1.2.1.6.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|rtgs_list_table",
                      "label": "inboundScanProcessUi|rtgs_list_table",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|rtgs_list_table",
                      "elementType": "table",
                      "groupType": "table",
                      "sequence": "1.1.2.1.6.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.7",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.7",
                  "children": [
                    {
                      "id": "d5e9a4b8e350e8aad037498875a10755.1.1.2.1.7.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|rtgs_list_validtn_table",
                      "label": "inboundScanProcessUi|rtgs_list_validtn_table",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|rtgs_list_validtn_table",
                      "elementType": "table",
                      "groupType": "table",
                      "sequence": "1.1.2.1.7.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.8",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.2.1.8",
                  "children": [
                    {
                      "id": "aa8324302c4cf6d0af7179b8c0a85130.1.1.2.1.8.1",
                      "type": "group",
                      "name": "inboundScanProcessUi|rtgs_list_cmnts_list",
                      "label": "inboundScanProcessUi|rtgs_list_cmnts_list",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|rtgs_list_cmnts_list",
                      "elementType": "table",
                      "groupType": "table",
                      "sequence": "1.1.2.1.8.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.9",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "label": "refreshElement",
                  "sequence": "1.1.2.1.9",
                  "children": [
                    {
                      "id": "ec0fa3b3e01145269d4d5b2823e0a253.1.1.2.1.9.1",
                      "value": "",
                      "type": "screen",
                      "name": "transactionProduct.v1|operational_pending_table",
                      "label": "transactionProduct.v1|operational_pending_table",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1|operational_pending_table",
                      "elementType": "group",
                      "groupType": "table",
                      "sequence": "1.1.2.1.9.1",
                      "children": []
                    },
                    {
                      "id": "58e523e35f3f4a4b810d4b3c48a12b6e.1.1.2.1.9.2",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "showArtifact",
                      "label": "showArtifact",
                      "sequence": "1.1.2.1.9.2",
                      "children": [
                        {
                          "id": "e7d7cdfdb6f641dd9678c721dd84bbbd.1.1.2.1.9.2.1",
                          "value": "",
                          "type": "screen",
                          "name": "transactionProduct.v1",
                          "label": "transactionProduct.v1|Root",
                          "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1",
                          "elementType": "",
                          "groupType": "",
                          "sequence": "1.1.2.1.9.2.1",
                          "children": []
                        }
                      ],
                      "hlr": {
                        "params": [
                          {
                            "name": "Filter Conditions",
                            "_type": "array",
                            "_empty": true,
                            "items": [
                              {
                                "name": "DFD Key",
                                "_type": "asyncSelection",
                                "selectionList": [],
                                "value": "",
                                "enabled": true,
                                "_payload": {
                                  "key": "",
                                  "nodeType": "searchParams"
                                },
                                "subSelection": {
                                  "name": "Select node Name",
                                  "_type": "array",
                                  "items": [
                                    {
                                      "name": "nodeName",
                                      "_type": "apiSelection",
                                      "_payload": {
                                        "key": "",
                                        "nodeType": "searchParams"
                                      },
                                      "selectionList": [],
                                      "value": "",
                                      "enabled": true,
                                      "subSelection": {
                                        "name": "filter",
                                        "_type": "array",
                                        "items": [
                                          {
                                            "filterParam": {
                                              "name": "filterParam",
                                              "_type": "objectSelection",
                                              "selectionList": [],
                                              "value": {},
                                              "enabled": true
                                            },
                                            "filterValue": {
                                              "name": "filterValue",
                                              "_type": "comboBox",
                                              "selectionList": [],
                                              "value": "",
                                              "enabled": true
                                            }
                                          }
                                        ],
                                        "selectionList": [],
                                        "value": {},
                                        "enabled": true
                                      }
                                    }
                                  ],
                                  "enabled": true
                                }
                              }
                            ],
                            "selectionList": [],
                            "value": ""
                          }
                        ]
                      }
                    }
                  ],
                  "hlr": {}
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "message",
                    "_type": "text",
                    "value": "Data hold successfully",
                    "enabled": true
                  },
                  {
                    "name": "type",
                    "_type": "select",
                    "selectionList": [
                      "none",
                      "info",
                      "success",
                      "warning",
                      "danger",
                      "utility"
                    ],
                    "value": "success",
                    "enabled": true
                  },
                  {
                    "name": "autoClose",
                    "_label": "Auto close toast",
                    "_type": "boolean",
                    "value": true,
                    "enabled": true
                  },
                  {
                    "name": "variant",
                    "_type": "select",
                    "selectionList": [
                      "display-4",
                      "display-3",
                      "display-2",
                      "display-1",
                      "header-2",
                      "header-1",
                      "subheader-3",
                      "subheader-2",
                      "subheader-1",
                      "body-3",
                      "body-2",
                      "body-1",
                      "body-short",
                      "caption-2",
                      "caption-1",
                      "code-3",
                      "code-inline-3",
                      "code-2",
                      "code-inline-2",
                      "code-1",
                      "code-inline-1"
                    ],
                    "value": "subheader-3",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              },
              {
                "name": "needToast",
                "_type": "conditionalBoolean",
                "value": false,
                "enabled": true,
                "subSelection": {
                  "_true": {
                    "content": {
                      "name": "Path",
                      "_type": "text",
                      "value": "",
                      "enabled": true
                    },
                    "position": {
                      "name": "Type",
                      "_type": "select",
                      "selectionList": [
                        "none",
                        "info",
                        "success",
                        "warning",
                        "danger",
                        "utility"
                      ],
                      "value": "success",
                      "enabled": true
                    }
                  }
                }
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1";
      sourceId+= "|"+"14e844df4cccf4759585851079bb9855";
      let pathIds = SourceIdFilter(eventProperty,"1.1.2");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1"+"|"+"14e844df4cccf4759585851079bb9855"+"|"+eventProperty.id;
      pathIds.map((ele:any,id:number)=>{
        if(id!=pathIds.length-1)
        {
          sourceIdNewPath=sourceIdNewPath+"|"+ele
        }
      })
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'saveHandler'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              sourceId:sourceIdNewPath
            };
          }
        } else if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'eventEmitter'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          }
        }
      }
    
      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
          key:uf_getPFDetails.key,
          sourceId:sourceIdNewPath
        };
        if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd;
          uf_initiatePfBody["method"] = encryptionMethod;
        }
            uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              if(uf_initiatePf?.data?.error == true){
                toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                return
              }
      
      } else {
        throw 'Please check PF'
      }
      //eventEmitter
      let upId:any
      let hasValidupId:any
      if(Array.isArray(tableData)){
       upId=tableData?.map((item:any)=>item.trs_process_id)
       hasValidupId = upId.some((item:any) => item !== undefined && item !== null);
      }
      if(lockedData?.data && Object.keys(lockedData?.data)?.length > 0){
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : button_groupb9855?.upId? [button_groupb9855?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName : "hold"
      }
      }else{
      if(Array.isArray(tableData) && hasValidupId){
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : button_groupb9855?.upId? [button_groupb9855?.upId ] : upId,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId
      }}else{
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : button_groupb9855?.upId? [button_groupb9855?.upId ] : button_groupb9855?.trs_process_id? [button_groupb9855?.trs_process_id ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "hold"
      }
      }
      }

  // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_event_process_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }
    let reworkedObject:any = nullFilter({ ...button_groupb9855Ref.current, ...nullFilter(overallgroup1218f), ...nullFilter(controlgroupfbb48), ...nullFilter(control_tab_group161ff), ...nullFilter(rtgs_info5957a), ...nullFilter(allcontrolsb8c72), ...nullFilter(commoninfod7eda), ...nullFilter(basicinfoffb0a), ...nullFilter(additionalinfo4baba), ...nullFilter(listgroup97a7c), ...nullFilter(list_tab_group6782e), ...nullFilter(validation_listcc09d), ...nullFilter(comment_listb158b), ...nullFilter(rtgs_listf12c6), ...nullFilter(rtgs_list_grp82cfc), ...nullFilter(rtgs_list_tble_groupe1ac5), ...nullFilter(group1b1aa), ...nullFilter(rtgs_list_tab_grp43579), ...nullFilter(validtn_list3a9a1), ...nullFilter(cmnt_list18a3b) });
    let reworkKeys:any[]=[];
    let rootReworkKeys:any[]=[];
      if(typeof reworkedObject === 'object' && reworkedObject !== null) {
        if("_groupArrays_" in reworkedObject )
        {
          reworkedObject["_groupArrays_"].forEach((arrayKey: string) => {
            reworkedObject[arrayKey]?.map((item: any) => {     
              Object.keys(item).map((objKey:any)=>{
                if (
                  typeof item[objKey] === 'object' && 
                  Array.isArray(item[objKey]) && 
                  item[objKey].length > 0 && 
                  typeof item[objKey][0] !== "string"
                ) {
                  const hasUrlProperty = item[objKey][0]?.url !== undefined;
                  const hasFileProperty = item[objKey][0]?.file !== undefined;
                  const hasSelectedFlag = Object.keys(item[objKey][0]).includes('_isSelected_');
                  
                  if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                    if(!reworkKeys.includes(objKey)){
                      reworkKeys.push(objKey);
                    }
                  }
                }

              })
            });
          }); 
                  // also detect file fields at root level (outside group arrays)
          const groupArrayKeySet = new Set(["_groupArrays_", ...reworkedObject["_groupArrays_"]]);
          Object.keys(reworkedObject).forEach((key: string) => {
            if (groupArrayKeySet.has(key)) return;
            const val = reworkedObject[key];
            if (
              typeof val === 'object' &&
              Array.isArray(val) &&
              val.length > 0 &&
              typeof val[0] !== 'string'
            ) {
              const hasUrlProperty = val[0]?.url !== undefined;
              const hasFileProperty = val[0]?.file !== undefined;
              const hasSelectedFlag = Object.keys(val[0]).includes('_isSelected_');
              if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                rootReworkKeys.push(key);
              }
            }
          });
        }else
        {
          Object.keys(reworkedObject).map((item: any) => {
            if (
              typeof reworkedObject[item] === 'object' && 
              Array.isArray(reworkedObject[item]) && 
              reworkedObject[item].length > 0 && 
              typeof reworkedObject[item][0] !== "string"
            ) {
              const hasUrlProperty = reworkedObject[item][0]?.url !== undefined;
              const hasFileProperty = reworkedObject[item][0]?.file !== undefined;
              const hasSelectedFlag = Object.keys(reworkedObject[item][0]).includes('_isSelected_');
              
              if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                reworkKeys.push(item);
              }
            }
          }); 
        }
      } else if (Array.isArray(reworkedObject)) {
        Object.keys(reworkedObject).map((item: any) => {
          if (
            typeof reworkedObject[item] === 'object' && 
            Array.isArray(reworkedObject[item]) && 
            reworkedObject[item].length > 0 && 
            typeof reworkedObject[item][0] !== "string"
          ) {
            const hasUrlProperty = reworkedObject[item][0]?.url !== undefined;
            const hasFileProperty = reworkedObject[item][0]?.file !== undefined;
            const hasSelectedFlag = Object.keys(reworkedObject[item][0]).includes('_isSelected_');
            
            if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
              reworkKeys.push(item);
            }
          }
        });
      }
    if("_groupArrays_" in reworkedObject )
    {
      if(reworkKeys.length){
        for(let i=0;i<reworkKeys.length;i++){
          for(const arrayKey of reworkedObject["_groupArrays_"]){
            for(let j=0;j<reworkedObject[arrayKey].length;j++)
            {
              let tempObj:any = reworkedObject[arrayKey][j]
              if(reworkKeys[i] in tempObj && Object.keys(tempObj).length>0 && tempObj[reworkKeys[i]].length>0)
              {
                let fileBody:any = tempObj[reworkKeys[i]].map((item:any) => item?.file)
                const formData = new FormData();
                fileBody.forEach((file:File) => {
                  formData.append("file", file);
                });
                formData.append('context', reworkKeys[i]);
                formData.append("enableEncryption", fileBody[0]?.enableEncryption);
                formData.append("returnType", fileBody[0]?.returnType || 'string');
                if (encryptionFlagCont) {
                  formData.append("dpdKey" ,encryptionDpd);
                  formData.append("method" ,encryptionMethod);
                }
                if (fileBody[0]?.DbType == 'mongodb') {
                const res : any = await AxiosService.post("/UF/upload", formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    }
                  });
                  reworkedObject[arrayKey][j][reworkKeys[i]] = res.data.fileId;
                }else if (fileBody[0]?.DbType == 'dfs') {
                  const basePath : string = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
                  const bucketFolderame : string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
                  formData.append('bucketFolderame', bucketFolderame.toLowerCase());
                  formData.append('folderPath', basePath);
      
                  const res : any = await AxiosService.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                      }
                    }
                  );
                  reworkedObject[arrayKey][j][reworkKeys[i]] = res.data.imageUrl;
                }
              }
            }
          }
        }
      }
      // upload root-level file fields (outside group arrays)
      if (rootReworkKeys.length) {
        for (let i = 0; i < rootReworkKeys.length; i++) {
          const currentValue: any = reworkedObject[rootReworkKeys[i]];
          let fileBody: any = currentValue.map((item: any) => item?.file);
          const formData = new FormData();
          fileBody.forEach((file: File) => {
            formData.append('file', file);
          });
          formData.append('context', rootReworkKeys[i]);
          formData.append('enableEncryption', fileBody[0]?.enableEncryption);
          formData.append('returnType', fileBody[0]?.returnType || 'string');
          if (encryptionFlagCont) {
            formData.append('dpdKey', encryptionDpd);
            formData.append('method', encryptionMethod);
          }
          if (fileBody[0]?.DbType == 'mongodb') {
            const res: any = await AxiosService.post('/UF/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            reworkedObject[rootReworkKeys[i]] = res.data.fileId;
          } else if (fileBody[0]?.DbType == 'dfs') {
            const basePath: string = process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads';
            const bucketFolderame: string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
            formData.append('bucketFolderame', bucketFolderame.toLowerCase());
            formData.append('folderPath', basePath);
            const res: any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            reworkedObject[rootReworkKeys[i]] = res.data.imageUrl;
          }
        }
      }

    }else {
        if (reworkKeys.length) {
          for (let i = 0; i < reworkKeys.length; i++) {
            const currentValue: any = reworkedObject[reworkKeys[i]]
            // prepare data for document upolad panel component
            const isFlatDocStructure =
              Array.isArray(currentValue) &&
              currentValue.length > 0 &&
              currentValue[0]?.docId !== undefined

            if (isFlatDocStructure) {
              const groupedFiles = currentValue.reduce(
                (acc: any, item: any) => {
                  if (!acc[item.docId]) {
                    acc[item.docId] = []
                  }

                  acc[item.docId].push(item.file)

                  return acc
                },
                {}
              )

              const uploadedResult: any[] = []
              for (const docId in groupedFiles) {
                let fileBody: any = groupedFiles[docId]

                for (const file of fileBody) {
                  const formData = new FormData()
                  
                  formData.append('file', file)
                  formData.append('context', docId)
                  formData.append('doc_group', docId)
                  formData.append(
                    'enableEncryption',
                    fileBody[0]?.enableEncryption
                  )
                  formData.append(
                    'returnType',
                    fileBody[0]?.returnType || 'string'
                  )

          if (encryptionFlagCont) {
                    formData.append('dpdKey', encryptionDpd)
                    formData.append('method', encryptionMethod)
          }

          if (fileBody[0]?.DbType == 'mongodb') {
                    const res: any = await AxiosService.post(
                      '/UF/upload',
                      formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`
              }
                      }
                    )
                    uploadedResult.push(res.data.fileId)
          } else if (fileBody[0]?.DbType == 'dfs') {
                    const basePath: string =
                      process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads'

                    const bucketFolderame: string =
                      process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile'

                    formData.append(
                      'bucketFolderame',
                      bucketFolderame.toLowerCase()
                    )

                    formData.append('folderPath', basePath)

                    const res: any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`,
                        }
                      }
                    )

                    uploadedResult.push(res.data.imageUrl)
                  }
                }

                reworkedObject[reworkKeys[i]] = uploadedResult
              }
            } else {
              let fileBody: any = currentValue.map((item: any) => item?.file)
              const formData = new FormData()
              fileBody.forEach((file: File) => {
                formData.append('file', file)
              })

              formData.append('context', reworkKeys[i])
              formData.append('enableEncryption', fileBody[0]?.enableEncryption)
              formData.append('returnType', fileBody[0]?.returnType || 'string')

              if (encryptionFlagCont) {
                formData.append('dpdKey', encryptionDpd)
                formData.append('method', encryptionMethod)
              }

              if (fileBody[0]?.DbType == 'mongodb') {
                const res: any = await AxiosService.post(
                  '/UF/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`
                }
              }
                )

                reworkedObject[reworkKeys[i]] = res.data.fileId
              } else if (fileBody[0]?.DbType == 'dfs') {
                const basePath: string = process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads'
                const bucketFolderame: string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile'

                formData.append('bucketFolderame', bucketFolderame.toLowerCase()
                )

                formData.append('folderPath', basePath)

                const res: any = await AxiosService.post(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    }
                  }
                )
                reworkedObject[reworkKeys[i]] = res.data.imageUrl
              }
          }
        }
      }
    }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof reworkedObject[item]=='object')
        {
          if( reworkedObject[item].length>0 &&Object.keys(reworkedObject[item][0]).includes('_isSelected_'))
          {
            reworkedObject[item]=reworkedObject[item].filter((data:any)=>data?._isSelected_== true)
            for(let i=0;i<reworkedObject[item].length;i++)
            {
              reworkedObject[item][i] = nullFilter(reworkedObject[item][i])
              delete reworkedObject[item][i]._isSelected_
            }

          }
           
        }
      })

      if ("childTables" in reworkedObject) {
        te_saveBody.childTables = reworkedObject.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(reworkedObject))
        {
          if(lockedData?.data && Object.keys(lockedData?.data)?.length > 0){
          formData=lockedData?.data || reworkedObject || {};
          }else{
            if(tableData && tableData?.length > 0){
              formData=tableData?.data || reworkedObject || {};
            }else{
              formData=[];
              delete te_eventEmitterBody?.upId;
            }
          }
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"14e844df4cccf4759585851079bb9855",
              controlId:"58e523e35f3f4a4b810d4b3c48a12b6e"
            };
            if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
            uf_ifo = await AxiosService.post(
            "/UF/ifo",
              uf_ifoBody,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
            
            if(uf_ifo?.data?.error == true){
              toast(uf_ifo?.data?.errorDetails?.message, 'danger');
              return
            }
            if(uf_ifo?.data){
              Object.keys(uf_ifo.data).forEach(key => {
                if(uf_ifo.data[key] === '') {
                  delete uf_ifo.data[key];
                }
              });
            }
            //eventEmitter
            ifoResponse?.push({...uf_ifo?.data,...te_eventEmitterBody?.data});
          }
          //eventEmitter
          te_eventEmitterBody.data= ifoResponse;
        } 
        else{
          formData=reworkedObject
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"14e844df4cccf4759585851079bb9855",
            controlId:"58e523e35f3f4a4b810d4b3c48a12b6e"
          };
          if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
          uf_ifo = await AxiosService.post(
          "/UF/ifo",
            uf_ifoBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          if(uf_ifo?.data?.error == true){
            toast(uf_ifo?.data?.errorDetails?.message, 'danger');
            return
          }
          if(uf_ifo?.data){
            Object.keys(uf_ifo.data).forEach(key => {
              if(uf_ifo.data[key] === '') {
                delete uf_ifo.data[key];
              }
            });
          }
            //eventEmitter
            te_eventEmitterBody.data= [{...uf_ifo?.data,...te_eventEmitterBody?.data}];
        }
      }
    //eventEmitter
    if (button_groupb9855Props.ssKey !== '' && button_groupb9855Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = button_groupb9855Props.ssKey;          
    }
    te_eventEmitterBody["lock"] = actionLockData;
    if (button_groupb9855Props?.tableName) {
      te_eventEmitterBody["tableName"] = button_groupb9855Props?.tableName;
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    }
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    if(te_eventEmitter?.data?.error == true){
      toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
      throw te_eventEmitter?.data?.errorDetails?.message
    }
    lockedKeysLength = lockedData?.primaryKeys?.length;
    ///////////////////////

    //infoMsg
    toast('Data hold successfully', 'success',true);
    // clearHandler riseListen
    // for group
    Object.keys(commoninfod7eda).map((keys:any)=>{         
      commoninfod7eda[keys]="";
    })
    setcommoninfod7eda({...commoninfod7eda});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
    // clearHandler riseListen
    // for group
    Object.keys(basicinfoffb0a).map((keys:any)=>{         
      basicinfoffb0a[keys]="";
    })
    setbasicinfoffb0a({...basicinfoffb0a});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
    // clearHandler riseListen
    // for group
    Object.keys(additionalinfo4baba).map((keys:any)=>{         
      additionalinfo4baba[keys]="";
    })
    setadditionalinfo4baba({...additionalinfo4baba});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
    // clearHandler riseListen
    // for controller
    // clearHandler riseListen
        // clearHandler riseListen
    // for controller
    // clearHandler riseListen
        // clearHandler riseListen
    // for controller
    // clearHandler riseListen
        // clearHandler riseListen
    // for controller
    // clearHandler riseListen
        // clearHandler riseListen
    // for controller
    // clearHandler riseListen
        // refreshElement
    //riseListen
    // for group
    setoperational_pending_table0a253Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
    // showArtifact
    let filterProps19: any =  [];
      let filterData19 = await getFilterProps(filterProps19,{...overallgroup1218f,...controlgroupfbb48,...control_tab_group161ff,...rtgs_info5957a,...allcontrolsb8c72,...commoninfod7eda,...basicinfoffb0a,...additionalinfo4baba,...listgroup97a7c,...list_tab_group6782e,...validation_listcc09d,...comment_listb158b,...rtgs_listf12c6,...rtgs_list_grp82cfc,...rtgs_list_tble_groupe1ac5,...group1b1aa,...rtgs_list_tab_grp43579,...validtn_list3a9a1,...cmnt_list18a3b,...button_groupb9855});
    settransactionproduct_v1Props([...filterData19 ]);
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1', 'transactionproduct_v1'));
    }catch(err:any){
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');


      return
    }
  }
  const handleClick=async(showModal: boolean = true)=>{
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setbutton_groupb9855((prev: any) => ({ ...prev, hold: true }));
        //onClick

    // getFormData
    //riseListen
    // for group
    const mergedGetFormData2 = {...button_groupb9855Ref.current, ...control_tab_group161ff};
    setbutton_groupb9855(mergedGetFormData2);
    button_groupb9855Ref.current = mergedGetFormData2;

    const mergedGetFormDataProps2 = {...button_groupb9855PropsRef.current, ...control_tab_group161ffProps};
    setbutton_groupb9855Props(mergedGetFormDataProps2);
    button_groupb9855PropsRef.current = mergedGetFormDataProps2;
    //eventEmitter
    await handleSave2b6e_1_1_2();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setbutton_groupb9855((prev: any) => ({ ...prev, hold: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setbutton_groupb9855((prev: any) => ({ ...prev, hold: false }));
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

    useEffect(() => {
    let forGetFormDataPointedData = {
        //for group element
        ...control_tab_group161ff,

      };
      handleMapper(forGetFormDataPointedData);

  }, [inboundscanprocessui_v1?.button_group?.hold,button_groupb9855Props?.dynamicActionRule?.hold,control_tab_group161ff])

 if (hold12b6e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-rose-500 !text-white !py-2 !rounded-md flex items-center gap-2"
          onClick={handleClick}
          view='action'
          disabled= {hold12b6e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdOutlineDataThresholding"
          iconDisplay='Start with Icon'
        >
          {keyset("Hold")}
        </Button>}
      </div>
    
  )
}

export default Buttonhold

