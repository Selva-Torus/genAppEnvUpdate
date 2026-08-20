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
import PageReturnreasonpopupuipage4 from '@/app/returnreasonpopupui_v1/returnreasonpopupui_v1page';
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
 

const Buttonreturn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
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
  const {returnreasonpopupui_v1Props, setreturnreasonpopupui_v1Props}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['returnreasonpopupui_v1'] = returnreasonpopupui_v1Props,
        codeStates['setreturnreasonpopupui_v1'] = setreturnreasonpopupui_v1Props,
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
        "56776d23dd3b372c9ef8b894ff60f9cc"
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
      if("return" in button_groupb9855Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(button_groupb9855Props?.dynamicActionRule?.return,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("return" in inboundscanprocessui_v1?.button_group && inboundscanprocessui_v1?.button_group["return"]?.itsHaveArtifact== true)
      {
        setShowFlag(inboundscanprocessui_v1?.button_group["return"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(inboundscanprocessui_v1?.button_group?.return?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "return0f9cc") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "56776d23dd3b372c9ef8b894ff60f9cc") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "return0f9cc");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!return0f9cc?.trigger) return;
      if(return0f9cc?.trigger){
      setreturn0f9cc((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[return0f9cc?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
    if(return0f9cc?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[return0f9cc?.refresh])
  

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

  const handleClick=async(showModal: boolean = true)=>{
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setbutton_groupb9855((prev: any) => ({ ...prev, return: true }));
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
    // showArtifactAsModal
    let filterProps4:any =  [];
      let filterData4 = await getFilterProps(filterProps4,{...overallgroup1218f,...controlgroupfbb48,...control_tab_group161ff,...rtgs_info5957a,...allcontrolsb8c72,...commoninfod7eda,...basicinfoffb0a,...additionalinfo4baba,...listgroup97a7c,...list_tab_group6782e,...validation_listcc09d,...comment_listb158b,...rtgs_listf12c6,...rtgs_list_grp82cfc,...rtgs_list_tble_groupe1ac5,...group1b1aa,...rtgs_list_tab_grp43579,...validtn_list3a9a1,...cmnt_list18a3b,...button_groupb9855});
    setreturnreasonpopupui_v1Props([...filterData4 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen4(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setbutton_groupb9855((prev: any) => ({ ...prev, return: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setbutton_groupb9855((prev: any) => ({ ...prev, return: false }));
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

  }, [inboundscanprocessui_v1?.button_group?.return,button_groupb9855Props?.dynamicActionRule?.return,control_tab_group161ff])

 if (return0f9cc?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showProfileAsModalOpen4 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageReturnreasonpopupuipage4 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen4 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen4(false); setHiddenModalForTrigger(false); }}
        title="Return Reason"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "returnreasonpopupui"
        className='w-[500px] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageReturnreasonpopupuipage4  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-blue-600 !text-white !py-2 !rounded-md flex items-center gap-2"
          onClick={handleClick}
          view='action'
          disabled= {return0f9cc?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdOutlineSave"
          iconDisplay='Start with Icon'
        >
          {keyset("Return")}
        </Button>}
      </div>
    
  )
}

export default Buttonreturn

