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
import PageRejectpopupuipage4 from '@/app/rejectpopupui_v1/rejectpopupui_v1page';
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
 

const Buttonsend_to_maker = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overallgroup01c61, setoverallgroup01c61}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup01c61Props, setoverallgroup01c61Props}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupda197, setcontrolgroupda197}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupda197Props, setcontrolgroupda197Props}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_groupbc3e2, setcontrol_tab_groupbc3e2}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_groupbc3e2Props, setcontrol_tab_groupbc3e2Props}= useContext(TotalContext) as TotalContextProps;
  const {button_group74f3e, setbutton_group74f3e}= useContext(TotalContext) as TotalContextProps;
  const {button_group74f3eProps, setbutton_group74f3eProps}= useContext(TotalContext) as TotalContextProps;
  const {scan31ce1, setscan31ce1}= useContext(TotalContext) as TotalContextProps;
  const {folderscanf14e0, setfolderscanf14e0}= useContext(TotalContext) as TotalContextProps;
  const {savef2390, setsavef2390}= useContext(TotalContext) as TotalContextProps;
  const {cancel2bf72, setcancel2bf72}= useContext(TotalContext) as TotalContextProps;
  const {updateed7a9, setupdateed7a9}= useContext(TotalContext) as TotalContextProps;
  const {signature3ad2e, setsignature3ad2e}= useContext(TotalContext) as TotalContextProps;
  const {approve05fe8, setapprove05fe8}= useContext(TotalContext) as TotalContextProps;
  const {send_to_makera4797, setsend_to_makera4797}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_infofd0aa, setrtgs_infofd0aa}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_infofd0aaProps, setrtgs_infofd0aaProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrols71c54, setallcontrols71c54}= useContext(TotalContext) as TotalContextProps;
  const {allcontrols71c54Props, setallcontrols71c54Props}= useContext(TotalContext) as TotalContextProps;
  const {commoninfof4607, setcommoninfof4607}= useContext(TotalContext) as TotalContextProps;
  const {commoninfof4607Props, setcommoninfof4607Props}= useContext(TotalContext) as TotalContextProps;
  const {basicinfo3d198, setbasicinfo3d198}= useContext(TotalContext) as TotalContextProps;
  const {basicinfo3d198Props, setbasicinfo3d198Props}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfod2894, setadditionalinfod2894}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfod2894Props, setadditionalinfod2894Props}= useContext(TotalContext) as TotalContextProps;
  const {listgroupdcdbd, setlistgroupdcdbd}= useContext(TotalContext) as TotalContextProps;
  const {listgroupdcdbdProps, setlistgroupdcdbdProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_groupd6905, setlist_tab_groupd6905}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_groupd6905Props, setlist_tab_groupd6905Props}= useContext(TotalContext) as TotalContextProps;
  const {document_list38c6e, setdocument_list38c6e}= useContext(TotalContext) as TotalContextProps;
  const {document_list38c6eProps, setdocument_list38c6eProps}= useContext(TotalContext) as TotalContextProps;
  const {doclisttable56e97, setdoclisttable56e97}= useContext(TotalContext) as TotalContextProps;
  const {doclisttable56e97Props, setdoclisttable56e97Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_listae827, setvalidation_listae827}= useContext(TotalContext) as TotalContextProps;
  const {validation_listae827Props, setvalidation_listae827Props}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable17ec7, setvaldnlisttable17ec7}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable17ec7Props, setvaldnlisttable17ec7Props}= useContext(TotalContext) as TotalContextProps;
  const {comment_list72944, setcomment_list72944}= useContext(TotalContext) as TotalContextProps;
  const {comment_list72944Props, setcomment_list72944Props}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable02d0e, setcmntlisttable02d0e}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable02d0eProps, setcmntlisttable02d0eProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lista0a19, setrtgs_lista0a19}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lista0a19Props, setrtgs_lista0a19Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grpcf7d8, setrtgs_list_grpcf7d8}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grpcf7d8Props, setrtgs_list_grpcf7d8Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupab24b, setrtgs_list_tble_groupab24b}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupab24bProps, setrtgs_list_tble_groupab24bProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_table2926a, setrtgs_list_table2926a}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_table2926aProps, setrtgs_list_table2926aProps}= useContext(TotalContext) as TotalContextProps;
  const {group05462, setgroup05462}= useContext(TotalContext) as TotalContextProps;
  const {group05462Props, setgroup05462Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp28533, setrtgs_list_tab_grp28533}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp28533Props, setrtgs_list_tab_grp28533Props}= useContext(TotalContext) as TotalContextProps;
  const {documnt_list3a31d, setdocumnt_list3a31d}= useContext(TotalContext) as TotalContextProps;
  const {documnt_list3a31dProps, setdocumnt_list3a31dProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lst_doc_list_table32147, setrtgs_lst_doc_list_table32147}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lst_doc_list_table32147Props, setrtgs_lst_doc_list_table32147Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list10f93, setvalidtn_list10f93}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list10f93Props, setvalidtn_list10f93Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666, setrtgs_list_validtn_table84666}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666Props, setrtgs_list_validtn_table84666Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_liste161c, setcmnt_liste161c}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_liste161cProps, setcmnt_liste161cProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148d, setrtgs_list_cmnts_list2148d}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148dProps, setrtgs_list_cmnts_list2148dProps}= useContext(TotalContext) as TotalContextProps;
  const {rejectpopupui_v1Props, setrejectpopupui_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup05ff6, setoverallgroup05ff6}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup05ff6Props, setoverallgroup05ff6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const button_group74f3eRef = useRef(button_group74f3e);
  useEffect(() => {
    button_group74f3eRef.current = button_group74f3e;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [button_group74f3e]);
  
  //group props in ref to access latest props value
  const button_group74f3ePropsRef = useRef(button_group74f3eProps);
  useEffect(() => {
    button_group74f3ePropsRef.current = button_group74f3eProps;
  }, [button_group74f3eProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overallgroup'] = overallgroup01c61,
        codeStates['setoverallgroup'] = setoverallgroup01c61,
        codeStates['overallgroup01c61'] = overallgroup01c61Props,
        codeStates['setoverallgroup01c61'] = setoverallgroup01c61Props,
        codeStates['controlgroup'] = controlgroupda197,
        codeStates['setcontrolgroup'] = setcontrolgroupda197,
        codeStates['controlgroupda197'] = controlgroupda197Props,
        codeStates['setcontrolgroupda197'] = setcontrolgroupda197Props,
        codeStates['control_tab_group'] = control_tab_groupbc3e2,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_groupbc3e2,
        codeStates['control_tab_groupbc3e2'] = control_tab_groupbc3e2Props,
        codeStates['setcontrol_tab_groupbc3e2'] = setcontrol_tab_groupbc3e2Props,
        codeStates['button_group'] = button_group74f3e,
        codeStates['setbutton_group'] = setbutton_group74f3e,
        codeStates['button_group74f3e'] = button_group74f3eProps,
        codeStates['setbutton_group74f3e'] = setbutton_group74f3eProps,
        codeStates['scan'] = scan31ce1,
        codeStates['setscan'] = setscan31ce1,
        codeStates['folderscan'] = folderscanf14e0,
        codeStates['setfolderscan'] = setfolderscanf14e0,
        codeStates['save'] = savef2390,
        codeStates['setsave'] = setsavef2390,
        codeStates['cancel'] = cancel2bf72,
        codeStates['setcancel'] = setcancel2bf72,
        codeStates['update'] = updateed7a9,
        codeStates['setupdate'] = setupdateed7a9,
        codeStates['signature'] = signature3ad2e,
        codeStates['setsignature'] = setsignature3ad2e,
        codeStates['approve'] = approve05fe8,
        codeStates['setapprove'] = setapprove05fe8,
        codeStates['send_to_maker'] = send_to_makera4797,
        codeStates['setsend_to_maker'] = setsend_to_makera4797,
        codeStates['rtgs_info'] = rtgs_infofd0aa,
        codeStates['setrtgs_info'] = setrtgs_infofd0aa,
        codeStates['rtgs_infofd0aa'] = rtgs_infofd0aaProps,
        codeStates['setrtgs_infofd0aa'] = setrtgs_infofd0aaProps,
        codeStates['allcontrols'] = allcontrols71c54,
        codeStates['setallcontrols'] = setallcontrols71c54,
        codeStates['allcontrols71c54'] = allcontrols71c54Props,
        codeStates['setallcontrols71c54'] = setallcontrols71c54Props,
        codeStates['commoninfo'] = commoninfof4607,
        codeStates['setcommoninfo'] = setcommoninfof4607,
        codeStates['commoninfof4607'] = commoninfof4607Props,
        codeStates['setcommoninfof4607'] = setcommoninfof4607Props,
        codeStates['basicinfo'] = basicinfo3d198,
        codeStates['setbasicinfo'] = setbasicinfo3d198,
        codeStates['basicinfo3d198'] = basicinfo3d198Props,
        codeStates['setbasicinfo3d198'] = setbasicinfo3d198Props,
        codeStates['additionalinfo'] = additionalinfod2894,
        codeStates['setadditionalinfo'] = setadditionalinfod2894,
        codeStates['additionalinfod2894'] = additionalinfod2894Props,
        codeStates['setadditionalinfod2894'] = setadditionalinfod2894Props,
        codeStates['listgroup'] = listgroupdcdbd,
        codeStates['setlistgroup'] = setlistgroupdcdbd,
        codeStates['listgroupdcdbd'] = listgroupdcdbdProps,
        codeStates['setlistgroupdcdbd'] = setlistgroupdcdbdProps,
        codeStates['list_tab_group'] = list_tab_groupd6905,
        codeStates['setlist_tab_group'] = setlist_tab_groupd6905,
        codeStates['list_tab_groupd6905'] = list_tab_groupd6905Props,
        codeStates['setlist_tab_groupd6905'] = setlist_tab_groupd6905Props,
        codeStates['document_list'] = document_list38c6e,
        codeStates['setdocument_list'] = setdocument_list38c6e,
        codeStates['document_list38c6e'] = document_list38c6eProps,
        codeStates['setdocument_list38c6e'] = setdocument_list38c6eProps,
        codeStates['doclisttable'] = doclisttable56e97,
        codeStates['setdoclisttable'] = setdoclisttable56e97,
        codeStates['doclisttable56e97'] = doclisttable56e97Props,
        codeStates['setdoclisttable56e97'] = setdoclisttable56e97Props,
        codeStates['validation_list'] = validation_listae827,
        codeStates['setvalidation_list'] = setvalidation_listae827,
        codeStates['validation_listae827'] = validation_listae827Props,
        codeStates['setvalidation_listae827'] = setvalidation_listae827Props,
        codeStates['valdnlisttable'] = valdnlisttable17ec7,
        codeStates['setvaldnlisttable'] = setvaldnlisttable17ec7,
        codeStates['valdnlisttable17ec7'] = valdnlisttable17ec7Props,
        codeStates['setvaldnlisttable17ec7'] = setvaldnlisttable17ec7Props,
        codeStates['comment_list'] = comment_list72944,
        codeStates['setcomment_list'] = setcomment_list72944,
        codeStates['comment_list72944'] = comment_list72944Props,
        codeStates['setcomment_list72944'] = setcomment_list72944Props,
        codeStates['cmntlisttable'] = cmntlisttable02d0e,
        codeStates['setcmntlisttable'] = setcmntlisttable02d0e,
        codeStates['cmntlisttable02d0e'] = cmntlisttable02d0eProps,
        codeStates['setcmntlisttable02d0e'] = setcmntlisttable02d0eProps,
        codeStates['rtgs_list'] = rtgs_lista0a19,
        codeStates['setrtgs_list'] = setrtgs_lista0a19,
        codeStates['rtgs_lista0a19'] = rtgs_lista0a19Props,
        codeStates['setrtgs_lista0a19'] = setrtgs_lista0a19Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grpcf7d8,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grpcf7d8,
        codeStates['rtgs_list_grpcf7d8'] = rtgs_list_grpcf7d8Props,
        codeStates['setrtgs_list_grpcf7d8'] = setrtgs_list_grpcf7d8Props,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupab24b,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupab24b,
        codeStates['rtgs_list_tble_groupab24b'] = rtgs_list_tble_groupab24bProps,
        codeStates['setrtgs_list_tble_groupab24b'] = setrtgs_list_tble_groupab24bProps,
        codeStates['rtgs_list_table'] = rtgs_list_table2926a,
        codeStates['setrtgs_list_table'] = setrtgs_list_table2926a,
        codeStates['rtgs_list_table2926a'] = rtgs_list_table2926aProps,
        codeStates['setrtgs_list_table2926a'] = setrtgs_list_table2926aProps,
        codeStates['group'] = group05462,
        codeStates['setgroup'] = setgroup05462,
        codeStates['group05462'] = group05462Props,
        codeStates['setgroup05462'] = setgroup05462Props,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp28533,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp28533,
        codeStates['rtgs_list_tab_grp28533'] = rtgs_list_tab_grp28533Props,
        codeStates['setrtgs_list_tab_grp28533'] = setrtgs_list_tab_grp28533Props,
        codeStates['documnt_list'] = documnt_list3a31d,
        codeStates['setdocumnt_list'] = setdocumnt_list3a31d,
        codeStates['documnt_list3a31d'] = documnt_list3a31dProps,
        codeStates['setdocumnt_list3a31d'] = setdocumnt_list3a31dProps,
        codeStates['rtgs_lst_doc_list_table'] = rtgs_lst_doc_list_table32147,
        codeStates['setrtgs_lst_doc_list_table'] = setrtgs_lst_doc_list_table32147,
        codeStates['rtgs_lst_doc_list_table32147'] = rtgs_lst_doc_list_table32147Props,
        codeStates['setrtgs_lst_doc_list_table32147'] = setrtgs_lst_doc_list_table32147Props,
        codeStates['validtn_list'] = validtn_list10f93,
        codeStates['setvalidtn_list'] = setvalidtn_list10f93,
        codeStates['validtn_list10f93'] = validtn_list10f93Props,
        codeStates['setvalidtn_list10f93'] = setvalidtn_list10f93Props,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table84666,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table84666,
        codeStates['rtgs_list_validtn_table84666'] = rtgs_list_validtn_table84666Props,
        codeStates['setrtgs_list_validtn_table84666'] = setrtgs_list_validtn_table84666Props,
        codeStates['cmnt_list'] = cmnt_liste161c,
        codeStates['setcmnt_list'] = setcmnt_liste161c,
        codeStates['cmnt_liste161c'] = cmnt_liste161cProps,
        codeStates['setcmnt_liste161c'] = setcmnt_liste161cProps,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list2148d,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list2148d,
        codeStates['rtgs_list_cmnts_list2148d'] = rtgs_list_cmnts_list2148dProps,
        codeStates['setrtgs_list_cmnts_list2148d'] = setrtgs_list_cmnts_list2148dProps,
        codeStates['rejectpopupui_v1'] = rejectpopupui_v1Props,
        codeStates['setrejectpopupui_v1'] = setrejectpopupui_v1Props,
        codeStates['overallgroup'] = overallgroup05ff6,
        codeStates['setoverallgroup'] = setoverallgroup05ff6,
        codeStates['overallgroup05ff6'] = overallgroup05ff6Props,
        codeStates['setoverallgroup05ff6'] = setoverallgroup05ff6Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {scansaveprocessui_v1, setscansaveprocessui_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...button_group74f3eRef.current};
      let parentRowSpan = 10;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "02d6d6b0e87a4c25b3d432b64cc74f3e",
        "11921d77b053432681d97490bb7a4797"
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
    }else if(button_group74f3eProps?.isHaveRule==true){
      if("send_to_maker" in button_group74f3eProps?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(button_group74f3eProps?.dynamicActionRule?.send_to_maker,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("send_to_maker" in scansaveprocessui_v1?.button_group && scansaveprocessui_v1?.button_group["send_to_maker"]?.itsHaveArtifact== true)
      {
        setShowFlag(scansaveprocessui_v1?.button_group["send_to_maker"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(scansaveprocessui_v1?.button_group?.send_to_maker?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "send_to_makera4797") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "11921d77b053432681d97490bb7a4797") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "send_to_makera4797");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!send_to_makera4797?.trigger) return;
      if(send_to_makera4797?.trigger){
      setsend_to_makera4797((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[send_to_makera4797?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
    if(send_to_makera4797?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[send_to_makera4797?.refresh])
  

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
        setbutton_group74f3e((prev: any) => ({ ...prev, send_to_maker: true }));
        //onClick

    // getFormData
    //riseListen
    // for group
    const mergedGetFormData2 = {...button_group74f3eRef.current, ...control_tab_groupbc3e2};
    setbutton_group74f3e(mergedGetFormData2);
    button_group74f3eRef.current = mergedGetFormData2;

    const mergedGetFormDataProps2 = {...button_group74f3ePropsRef.current, ...control_tab_groupbc3e2Props};
    setbutton_group74f3eProps(mergedGetFormDataProps2);
    button_group74f3ePropsRef.current = mergedGetFormDataProps2;
    // showArtifactAsModal
    let filterProps4:any =  [];
      let filterData4 = await getFilterProps(filterProps4,{...overallgroup01c61,...controlgroupda197,...control_tab_groupbc3e2,...rtgs_infofd0aa,...allcontrols71c54,...commoninfof4607,...basicinfo3d198,...additionalinfod2894,...listgroupdcdbd,...list_tab_groupd6905,...document_list38c6e,...validation_listae827,...comment_list72944,...rtgs_lista0a19,...rtgs_list_grpcf7d8,...rtgs_list_tble_groupab24b,...group05462,...rtgs_list_tab_grp28533,...documnt_list3a31d,...validtn_list10f93,...cmnt_liste161c,...button_group74f3e});
    setrejectpopupui_v1Props([...filterData4 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen4(true);
    //bindTran
    // For group or table
    setoverallgroup05ff6({...overallgroup05ff6,...button_group74f3e||{}})
    setoverallgroup05ff6Props({...overallgroup05ff6Props,presetValues:button_group74f3e||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setbutton_group74f3e((prev: any) => ({ ...prev, send_to_maker: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setbutton_group74f3e((prev: any) => ({ ...prev, send_to_maker: false }));
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
        ...control_tab_groupbc3e2,

      };
      handleMapper(forGetFormDataPointedData);

  }, [scansaveprocessui_v1?.button_group?.send_to_maker,button_group74f3eProps?.dynamicActionRule?.send_to_maker,control_tab_groupbc3e2])

 if (send_to_makera4797?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showProfileAsModalOpen4 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageRejectpopupuipage4 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen4 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen4(false); setHiddenModalForTrigger(false); }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "rejectpopupui"
        className='w-[500px] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageRejectpopupuipage4  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-red-500 !text-white !rounded-md"
          onClick={handleClick}
          view='action'
          disabled= {send_to_makera4797?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdNotInterested"
          iconDisplay='Start with Icon'
        >
          {keyset("Send To Maker")}
        </Button>}
      </div>
    
  )
}

export default Buttonsend_to_maker

