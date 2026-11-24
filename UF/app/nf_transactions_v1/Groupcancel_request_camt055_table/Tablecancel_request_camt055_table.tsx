'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import filterData from '@/context/filterdata.json';
import JsonView from "react18-json-view";
// @ts-ignore
import 'react18-json-view/src/style.css';
import axios from "axios";
///////
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import {Pagination} from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import Popup from '@/components/Popup';
import { evaluateDecisionTableBoolean,eventDecisionTable,getAftfactLevelRule } from '@/app/utils/evaluateDecisionTable';
//////////////
import React, { useEffect, useState,useContext, useRef, useImperativeHandle } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import {
  uf_fetchActionDetailsDto,
  uf_fetchRuleDetailsDto,
  te_refreshDto,
  api_paginationDto,
  uf_paginationDataFilterDto,
  te_eventEmitterDto,
  uf_initiatePfDto,
  uf_ifoDto
} from '@/app/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import { flattenKeepInner } from '@/app/utils/commonfunctions';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { Tooltip } from '@/components/Tooltip';
import Buttoncancel_request_camt055_mk_initiate_btn  from './Buttoncancel_request_camt055_mk_initiate_btn'
import Buttoncancel_request_camt055_chk_verify_btn  from './Buttoncancel_request_camt055_chk_verify_btn'
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

let colourIndicatorCols:any= [] ;
let presentColumns:any=[]
let defaultColumns:any = [
  {
    "id": "channel_name_can_req_camt055",
    "nodeid": "2f1c023fd3f7fb333cde25696dff27d8",
    "name": "Channel",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "channel_name"
  },
  {
    "id": "uuid_can_req_camt055",
    "nodeid": "3deee4f1eec782ccb4b721cda868430a",
    "name": "UUID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "uuid"
  },
  {
    "id": "dr_account_can_req_camt055",
    "nodeid": "16159b2031321bebfac654d23b4050c7",
    "name": "Debtor Account",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_account"
  },
  {
    "id": "dr_name_can_req_camt055",
    "nodeid": "d02c65fb1b35781cefc9b25d3d2679dd",
    "name": "Debtor Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_name"
  },
  {
    "id": "cr_account_can_req_camt055",
    "nodeid": "6a718a177f7e05223a5970125f45b65e",
    "name": "Creditor Account",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "right",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_account"
  },
  {
    "id": "cr_name_can_req_camt055",
    "nodeid": "c02a8891b0d518f840ad41520a4bcc5f",
    "name": "Creditor Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_name"
  },
  {
    "id": "cr_currency_can_req_camt055",
    "nodeid": "b6f1226ead4a09af9041185f1f26e4f6",
    "name": "Credit Currency",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "right",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_currency"
  },
  {
    "id": "cr_amount_can_req_camt055",
    "nodeid": "5130823454c995b99ffef9da4650e8b4",
    "name": "Credit Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_amount"
  },
  {
    "type": "__ActionDetails__",
    "id": "cancel_request_camt055_mk_initiate_btn",
    "name": "Initiate",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "cancel_request_camt055_chk_verify_btn",
    "name": "Verify",
    "controlType": "Button"
  },
  {
    "id": "message_code_can_req_camt055",
    "nodeid": "26d2a3b852a548b283b34760d36532c4",
    "name": "Message",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "message_code"
  },
  {
    "id": "tran_date_can_req_camt055",
    "nodeid": "25454d5887ab48a7b9121f7906aea19b",
    "name": "Created Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "tran_date"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
  if(defaultColumns[i]?.type!="__ActionDetails__")
    presentColumns?.push(defaultColumns[i].id.toLowerCase());
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
export const unlockcancel_request_camt055_tableRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'vgph_source_tran_main', key: 'vgphstm_id', value: id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
}
// Separate component for row actions to avoid hooks violations
const RowActionComponent = React.memo(({index, allData, setRefetch,lockedData,setLockedData,primaryTableData,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,encryptionFlagCompData,setIsProcessing,security=[],goRuleData={},decodedTokenObj,artifactRuleState,groupData,controlData,onSelectLock,currentSelectedIds,skipUnlockRef,tableName}: any) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const popoverButtonElement = useRef(null);
  let filteredData: any = {};
  if (allData.length !== 0) {
    filteredData = allData[index] || {};
  }
   async function handleSecurity(controller: any = '') {
      if (controller in goRuleData&& goRuleData[controller]?.nodes?.length>0) {
        let result: any =  evaluateDecisionTableBoolean(goRuleData[controller]?.nodes, filteredData,decodedTokenObj)
        if (result === true) {
          return true
        }else{
          return false
        }
      }else if (controller in artifactRuleState?.cancel_request_camt055_table && artifactRuleState?.cancel_request_camt055_table[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.cancel_request_camt055_table[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,cancel_request_camt055_table:filteredData},{cancel_request_camt055_table:artifactRuleState?.cancel_request_camt055_table})
          if(result?.cancel_request_camt055_table?.[controller]?.show==true)
            return true
          else
            return false
        }
        else{
          return true
        }
      }
      return true
    }
  useEffect(() => {
    async function loadPopupData() {
      let cancel_request_camt055_mk_initiate_btn:any = await handleSecurity("cancel_request_camt055_mk_initiate_btn") || false
      let cancel_request_camt055_chk_verify_btn:any = await handleSecurity("cancel_request_camt055_chk_verify_btn") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        cancel_request_camt055_mk_initiate_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttoncancel_request_camt055_mk_initiate_btn'))&&(<Buttoncancel_request_camt055_mk_initiate_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphstm_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        cancel_request_camt055_chk_verify_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttoncancel_request_camt055_chk_verify_btn'))&&(<Buttoncancel_request_camt055_chk_verify_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphstm_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        </div>
      );
      
      setPopupContent(content);
    }
    
    if (isPopoverOpen) {
      loadPopupData();
    }
  }, [isPopoverOpen, filteredData, security]);
    ////////
  return (
    <div className="flex justify-center">
      <Button ref={popoverButtonElement}  view='flat' pin="round-round" className="text-lg flex h-full !w-5 " onClick={() => setPopoverOpen(true)}><Icon data={"RxDotsVertical"} size={20} fillContainer={false}/></Button>
      <Popup
        anchorRef={popoverButtonElement}
        open={isPopoverOpen}
        onClose={() => setPopoverOpen(false)}
        disablePortal={false}
        placement='right'
        className='w-[11vw]'
      >
       {popupContent}
      </Popup>
    </div>
  );
});
RowActionComponent.displayName = 'RowActionComponent';
const Tablecancel_request_camt055_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "vgph_source_tran_main"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {nftransactionproduct_v1, setnftransactionproduct_v1} = useContext(TotalContext) as TotalContextProps;
  const {nftransactionproduct_v1Props, setnftransactionproduct_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Operational Manager": {
    "allowedControls": [
      "uuid_can_req_camt055",
      "dr_account_can_req_camt055",
      "dr_name_can_req_camt055",
      "cr_account_can_req_camt055",
      "cr_name_can_req_camt055",
      "cr_currency_can_req_camt055",
      "cr_amount_can_req_camt055",
      "cancel_request_camt055_mk_initiate_btn",
      "cancel_request_camt055_chk_verify_btn",
      "message_code_can_req_camt055",
      "tran_date_can_req_camt055"
    ],
    "blockedControls": [
      "channel_name_can_req_camt055"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "uuid_can_req_camt055",
      "dr_account_can_req_camt055",
      "dr_name_can_req_camt055",
      "cr_account_can_req_camt055",
      "cr_name_can_req_camt055",
      "cr_currency_can_req_camt055",
      "cr_amount_can_req_camt055",
      "cancel_request_camt055_mk_initiate_btn",
      "cancel_request_camt055_chk_verify_btn",
      "message_code_can_req_camt055",
      "tran_date_can_req_camt055"
    ],
    "blockedControls": [
      "channel_name_can_req_camt055"
    ],
    "readOnlyControls": []
  }
}
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const upId: string | any = getCookie('upId')
  let dfKey: string | any
  let dfdType : string | any
  const toast =useInfoMsg()
  const [columns,setColumns]=useState<any>([])
  const [allCode, setAllCode] = React.useState("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const routes = useRouter()
  const prevRefreshRef = useRef(false);
  const refreshInitRef = useRef(false);
  const prevFilterPayloadRef = useRef("");
  const prevSearchFilterRef = useRef("");
  const skipNextFilterPropsRef = useRef(false);
  const fetchDataAbortRef = useRef<AbortController | null>(null);
  const lastLockedDataRef = useRef<any>(null);
  const skipUnlockRef = useRef(false)
  const lockedDataRef = useRef(lockedData)
  const myLockedIdsRef = useRef<any[]>([])
  const selectFirstRecordPendingRef = useRef<any>(null)
  const [loading, setLoading]= useState<boolean>(false)
  const [allData, setAllData] = React.useState<any>([]);
  const [allDataObject, setAllDataObject] = React.useState<any>([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
  const [searchFilterFlag, setSearchFilterFlag] = useState(false);
  const keyset:any=i18n.keyset("language") 
  const [needLockingAndRule, setNeedLockingAndRule] = useState<any>({
      lockMode: 'Single',
      ttl: ''
    })
  const [DFkeyAndRule, setDFkeyAndRule] = React.useState({
    isRulePresent:false,
    dfKey:"",
    dfdType:""
  })
 /////////////
   //another screen
  const {tran_main_group9581a, settran_main_group9581a}= useContext(TotalContext) as TotalContextProps  
  const {tran_main_group9581aProps, settran_main_group9581aProps}= useContext(TotalContext) as TotalContextProps  
  const {tran_tab_group2a929, settran_tab_group2a929}= useContext(TotalContext) as TotalContextProps  
  const {tran_tab_group2a929Props, settran_tab_group2a929Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tab9a177, setview_all_tab9a177}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tab9a177Props, setview_all_tab9a177Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a}= useContext(TotalContext) as TotalContextProps  
  const {view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps}= useContext(TotalContext) as TotalContextProps  
  const {cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6}= useContext(TotalContext) as TotalContextProps  
  const {cancel_equest_camt055_tabf8dc6Props, setcancel_equest_camt055_tabf8dc6Props}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps  
  const {channel_name_can_req_camt055f27d8, setchannel_name_can_req_camt055f27d8}= useContext(TotalContext) as TotalContextProps  
  const {uuid_can_req_camt0558430a, setuuid_can_req_camt0558430a}= useContext(TotalContext) as TotalContextProps  
  const {dr_account_can_req_camt055050c7, setdr_account_can_req_camt055050c7}= useContext(TotalContext) as TotalContextProps  
  const {dr_name_can_req_camt055679dd, setdr_name_can_req_camt055679dd}= useContext(TotalContext) as TotalContextProps  
  const {cr_account_can_req_camt0555b65e, setcr_account_can_req_camt0555b65e}= useContext(TotalContext) as TotalContextProps  
  const {cr_name_can_req_camt055bcc5f, setcr_name_can_req_camt055bcc5f}= useContext(TotalContext) as TotalContextProps  
  const {cr_currency_can_req_camt0556e4f6, setcr_currency_can_req_camt0556e4f6}= useContext(TotalContext) as TotalContextProps  
  const {cr_amount_can_req_camt0550e8b4, setcr_amount_can_req_camt0550e8b4}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_mk_initiate_btn2902f, setcancel_request_camt055_mk_initiate_btn2902f}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_chk_verify_btn42585, setcancel_request_camt055_chk_verify_btn42585}= useContext(TotalContext) as TotalContextProps  
  const {message_code_can_req_camt055532c4, setmessage_code_can_req_camt055532c4}= useContext(TotalContext) as TotalContextProps  
  const {tran_date_can_req_camt055ea19b, settran_date_can_req_camt055ea19b}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps  
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738}= useContext(TotalContext) as TotalContextProps  
  const {inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props}= useContext(TotalContext) as TotalContextProps  
  const {investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177}= useContext(TotalContext) as TotalContextProps  
  const {investigation_response_camt111_tabf6177Props, setinvestigation_response_camt111_tabf6177Props}= useContext(TotalContext) as TotalContextProps  
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps  
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps  
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4}= useContext(TotalContext) as TotalContextProps  
  const {inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props}= useContext(TotalContext) as TotalContextProps  
  //////////////
  const [goruleData,setGoruleData]=useState<any>({})
  function getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  // Utility to get nested value
  function getValueByPathForNested(obj: any, path: string): any {
    const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
    return keys.reduce((acc, key) => acc?.[key], obj);
  }

  // Clean the mapper path
  function extractPath(sourcekey: string): string {
    const rawPath = sourcekey.split('|').pop() ?? '';
    // remove items.properties. since your actual data has direct keys
    return rawPath
      .replace(/items\.properties\./g, '')
      .replace(/items\./g, '')
      .replace(/properties\./g, '');
  }

  function getColumnTypeFromSchema(schemaNode: any, columnId: string): string {
    const nodeType = schemaNode?.nodeType;
    const schema = schemaNode?.schema;

    if (!schema || !columnId) return 'string';

    if (nodeType === 'datasetnode' || nodeType === 'datasetschemanode') {
      if (schema?.type === 'object') {
        return schema?.properties?.[columnId]?.type || 'string';
      } else if (schema?.type === 'array') {
        return schema?.items?.properties?.[columnId]?.type || 'string';
      }
    } else if (nodeType === 'apinode') {
      const responseSchema = schema?.responses?.["200"]?.content?.["application/json"]?.schema;
      if (responseSchema?.type === 'object') {
        return responseSchema?.properties?.[columnId]?.type || 'string';
      } else if (responseSchema?.type === 'array') {
        return responseSchema?.items?.properties?.[columnId]?.type || 'string';
      }
    } else if (nodeType === 'dbnode') {
      if (Array.isArray(schema)) {
        const col = schema.find((c: any) => c.name === columnId);
        return col?.type || 'string';
      }
    }

    return 'string';
  }

  function formatNumberWithCommas(value: any): string | any {
    if (value === null || value === undefined || value === '') return value;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num) || !isFinite(num)) return value;
    if (typeof value === 'string' && !/^-?\d+(\.\d+)?$/.test(value.trim())) return value;
    return num.toLocaleString('en-US');
  }

  const GetTableDetails = async () => {
    const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "153e79bf7820e18f32009096e809e976",
      );

    if (orchestrationData?.data) {
      mapperData = orchestrationData?.data?.mapper;
      schemaDataDFO = orchestrationData?.data?.schemaData;
      setAllCode(orchestrationData?.data?.code)
      setGoruleData(orchestrationData?.data?.GoRuleData ||{})
      if (orchestrationData?.data?.action) {
    let schemaData:any = {}
        if(orchestrationData?.data?.schemaData && orchestrationData?.data?.mappperNodeId)
        {
          orchestrationData?.data?.schemaData?.map((ele:any)=>{
            if(ele.nodeId==orchestrationData?.data?.mappperNodeId)
            {
          if (ele?.nodeType == 'datasetnode' || ele?.nodeType == 'datasetschemanode'){
          if (ele?.schema?.type == "object") {
              schemaData = ele?.schema?.properties;
          }else if (ele?.schema?.type == "array") {
              schemaData = ele?.schema?.items?.properties;
          }                            
          }else if (ele?.nodeType == 'apinode') {
          if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "object") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.properties;
          }else if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "array") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.items?.properties;
          }
          }else if (ele?.nodeType == 'dbnode') {
          let temp:any = {}
          if (Array.isArray(ele?.schema)) {
          ele?.schema.map((cols:any)=>{
              temp[cols.name]={type:cols.type}
          })
          }
          schemaData = temp;
          } 
        }
      })
          let altertColumns:any=[]
          let allowesColumns:any=[]
          if(Array.isArray(orchestrationData?.data?.security) )
          {
            let securityData=orchestrationData?.data?.security
            allowesColumns=defaultColumns.filter((item:any)=>{
              if(securityData.includes(item?.id))
                return item
              })
          }
    for (let i = 0; i < allowesColumns.length; i++) {
      for (let j = 0; j < mapperData.length; j++) {
        if (allowesColumns[i].id === mapperData[j]?.elementname.toLowerCase()) {
          let nodeId = mapperData[j]?.sourcekey.split("|")[1];
          let path = mapperData[j]?.sourcekey.split("|")[2];
          for (let k = 0; k < schemaDataDFO.length; k++) {
            if (schemaDataDFO[k].nodeId === nodeId) {
              const columnType = getColumnTypeFromSchema(schemaDataDFO[k], allowesColumns[i].id);
              altertColumns.push({...allowesColumns[i], type: columnType})
            }
          }
        }
      }
      if(allowesColumns[i].type== '__ActionDetails__')
      {
        altertColumns.push(allowesColumns[i])
      }            
    }
          // allowesColumns.map((defaultRenderItem:any)=>{
          //   if(defaultRenderItem.id in schemaData)
          //   {
          //     altertColumns.push({...defaultRenderItem,type:schemaData[defaultRenderItem.id].type || 'string'})
          //   }
          // })
    const translatedColumnsData = altertColumns.map((col:any) => ({
      ...col,
      name: keyset(col?.name), 
      }));
    setTranslatedColumns(translatedColumnsData)
        }
    // for pagination data page ,count and dfkey
    setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
    }))

    setDFkeyAndRule((pre:any)=>({
      ...pre,
            isRulePresent:Object.keys(orchestrationData?.data?.rule).length!=0 && orchestrationData?.data?.rule?.nodes?.length!=0 && orchestrationData?.data?.rule?.edges?.length!=0  ? true:false,
            dfKey:orchestrationData?.data?.dfKey||"",
            dfdType:orchestrationData?.data?.dfdNodeType


    }))

        dfKey = orchestrationData?.data?.dfKey
        dfdType = orchestrationData?.data?.dfdNodeType
    
    // for lock mode and ttl - independent of tableProps.needLocking
    setNeedLockingAndRule((pre: any) => ({
      ...pre,
          lockMode:orchestrationData?.data?.action?.lock?.lockMode || 'Single',
          ttl :orchestrationData?.data?.action?.lock?.ttl || ""
    }))
  }
    } 
  }
  const [SearchParams,setSearchParams] = useState<any>({})

  const lockRecord = async (id: number) => {
    try {
      const res = await AxiosService.post(
        '/UF/lock',
        { tableName: 'vgph_source_tran_main', key:"vgphstm_id",value:id},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return res.data
    } catch (error: any) {
      throw error.response?.data
    }
  }

  const unlockRecord = (id: number) => unlockcancel_request_camt055_tableRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, cancel_request_camt055_table9e976 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, cancel_request_camt055_table9e976 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, cancel_request_camt055_table9e976 } = latestLockStateRef.current
    /// setcancel_request_camt055_table9e976Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(cancel_request_camt055_table9e976.map((item: any) => item.vgphstm_id));
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
      const currentTableLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      if (currentTableLockedId) {
        await unlockRecord(currentTableLockedId)
      }
      setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: [],
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl
    })
        lastLockedDataRef.current = { primaryKeys: [] }
        myLockedIdsRef.current = []
        let keys:any
        setcancel_request_camt055_table9e976Props((pre:any)=>({...pre,selectedData:{}, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.vgphstm_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

        if (previousLockedId === row.vgphstm_id) {
          return
        }

        await lockRecord(row.vgphstm_id)

        if (previousLockedId && previousLockedId !== row.vgphstm_id) {
          await unlockRecord(previousLockedId)
        }

      cancel_request_camt055_table9e976.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.vgphstm_id){
          selectedData?.push(item)
          postIds.push(item.vgphstm_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setcancel_request_camt055_table9e976Props((pre:any)=>({...pre,selectedData:{...row,...selectedData?.at(0)||{}}, selectedIds:[ids[ids.length-1]]}))
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock the selected record.',
          'danger'
        )
        if (previousLockedId) {
          const previousIndex = allData.findIndex(
            (item: any) => item.id === previousLockedId
          )
          if (previousIndex !== -1) {
            setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      let selectedMultiData:any=[]
      cancel_request_camt055_table9e976.filter((item:any,id:number)=>{
        if (ids.includes(item.vgphstm_id)){
          selectedMultiData?.push(item)
          selectedData?.push(item)
          postIds.push(item.vgphstm_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.vgphstm_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })
      const previousLockedIds: number[] = (lockedData.primaryKeys || []).filter(
        (id: number) => currentTableIdSet.has(id)
      )

      const idsToLock = postIds.filter(
        (id: number) => !previousLockedIds.includes(id)
      )

      const idsToUnlock = previousLockedIds.filter(
        (id: number) => !postIds.includes(id)
      )

      try {
        if (idsToLock.length) {
          await Promise.all(idsToLock.map((id: any) => lockRecord(id)))
        }

        if (idsToUnlock.length) {
          await Promise.all(idsToUnlock.map((id: any) => unlockRecord(id)))
        }

      setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:ids}))
   
                  
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = cancel_request_camt055_table9e976
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.vgphstm_id) ? item.vgphstm_id : null
          )
          .filter(Boolean)

        setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        throw err
      }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.vgphstm_id==ids[ids.length - 1])
        {
          index=i
          row=data
        }
      })
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      let itsAlreadyThere: boolean = false
      selectedPaginationData.map((item: any) => {
        if (item.page == paginationData.page) {
          itsAlreadyThere = true
        }
      })
      if (itsAlreadyThere) {
        for (let i = 0; i < checkedData.length; i++) {
          if (checkedData[i].page == paginationData.page) {
            checkedData[i].data = ids
            break
          }
        }
      } else {
        checkedData = [
          ...checkedData,
          {
            page: paginationData.page,
            data: ids
          }
        ]
      }
    } else {
      checkedData.push({
        page: paginationData.page,
        data: ids
      })
    }
    setSelectedPaginationData(checkedData)

    setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: postIds,
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl,
      selectedData:selectedData
    })
    lastLockedDataRef.current = { primaryKeys: postIds }
    myLockedIdsRef.current = postIds

    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['tran_main_group'] = tran_main_group9581a,
        codeStates['settran_main_group'] = settran_main_group9581a,
        codeStates['tran_main_group9581a'] = tran_main_group9581aProps,
        codeStates['settran_main_group9581a'] = settran_main_group9581aProps,
        codeStates['tran_tab_group'] = tran_tab_group2a929,
        codeStates['settran_tab_group'] = settran_tab_group2a929,
        codeStates['tran_tab_group2a929'] = tran_tab_group2a929Props,
        codeStates['settran_tab_group2a929'] = settran_tab_group2a929Props,
        codeStates['view_all_tab'] = view_all_tab9a177,
        codeStates['setview_all_tab'] = setview_all_tab9a177,
        codeStates['view_all_tab9a177'] = view_all_tab9a177Props,
        codeStates['setview_all_tab9a177'] = setview_all_tab9a177Props,
        codeStates['view_all_table'] = view_all_tableccb40,
        codeStates['setview_all_table'] = setview_all_tableccb40,
        codeStates['view_all_tableccb40'] = view_all_tableccb40Props,
        codeStates['setview_all_tableccb40'] = setview_all_tableccb40Props,
        codeStates['view_all_journey_group'] = view_all_journey_groupca47a,
        codeStates['setview_all_journey_group'] = setview_all_journey_groupca47a,
        codeStates['view_all_journey_groupca47a'] = view_all_journey_groupca47aProps,
        codeStates['setview_all_journey_groupca47a'] = setview_all_journey_groupca47aProps,
        codeStates['cancel_equest_camt055_tab'] = cancel_equest_camt055_tabf8dc6,
        codeStates['setcancel_equest_camt055_tab'] = setcancel_equest_camt055_tabf8dc6,
        codeStates['cancel_equest_camt055_tabf8dc6'] = cancel_equest_camt055_tabf8dc6Props,
        codeStates['setcancel_equest_camt055_tabf8dc6'] = setcancel_equest_camt055_tabf8dc6Props,
        codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976,
        codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976,
        codeStates['cancel_request_camt055_table9e976'] = cancel_request_camt055_table9e976Props,
        codeStates['setcancel_request_camt055_table9e976'] = setcancel_request_camt055_table9e976Props,
        codeStates['channel_name_can_req_camt055'] = channel_name_can_req_camt055f27d8,
        codeStates['setchannel_name_can_req_camt055'] = setchannel_name_can_req_camt055f27d8,
        codeStates['uuid_can_req_camt055'] = uuid_can_req_camt0558430a,
        codeStates['setuuid_can_req_camt055'] = setuuid_can_req_camt0558430a,
        codeStates['dr_account_can_req_camt055'] = dr_account_can_req_camt055050c7,
        codeStates['setdr_account_can_req_camt055'] = setdr_account_can_req_camt055050c7,
        codeStates['dr_name_can_req_camt055'] = dr_name_can_req_camt055679dd,
        codeStates['setdr_name_can_req_camt055'] = setdr_name_can_req_camt055679dd,
        codeStates['cr_account_can_req_camt055'] = cr_account_can_req_camt0555b65e,
        codeStates['setcr_account_can_req_camt055'] = setcr_account_can_req_camt0555b65e,
        codeStates['cr_name_can_req_camt055'] = cr_name_can_req_camt055bcc5f,
        codeStates['setcr_name_can_req_camt055'] = setcr_name_can_req_camt055bcc5f,
        codeStates['cr_currency_can_req_camt055'] = cr_currency_can_req_camt0556e4f6,
        codeStates['setcr_currency_can_req_camt055'] = setcr_currency_can_req_camt0556e4f6,
        codeStates['cr_amount_can_req_camt055'] = cr_amount_can_req_camt0550e8b4,
        codeStates['setcr_amount_can_req_camt055'] = setcr_amount_can_req_camt0550e8b4,
        codeStates['cancel_request_camt055_mk_initiate_btn'] = cancel_request_camt055_mk_initiate_btn2902f,
        codeStates['setcancel_request_camt055_mk_initiate_btn'] = setcancel_request_camt055_mk_initiate_btn2902f,
        codeStates['cancel_request_camt055_chk_verify_btn'] = cancel_request_camt055_chk_verify_btn42585,
        codeStates['setcancel_request_camt055_chk_verify_btn'] = setcancel_request_camt055_chk_verify_btn42585,
        codeStates['message_code_can_req_camt055'] = message_code_can_req_camt055532c4,
        codeStates['setmessage_code_can_req_camt055'] = setmessage_code_can_req_camt055532c4,
        codeStates['tran_date_can_req_camt055'] = tran_date_can_req_camt055ea19b,
        codeStates['settran_date_can_req_camt055'] = settran_date_can_req_camt055ea19b,
        codeStates['cancel_request_camt055_journey_group'] = cancel_request_camt055_journey_groupd18a2,
        codeStates['setcancel_request_camt055_journey_group'] = setcancel_request_camt055_journey_groupd18a2,
        codeStates['cancel_request_camt055_journey_groupd18a2'] = cancel_request_camt055_journey_groupd18a2Props,
        codeStates['setcancel_request_camt055_journey_groupd18a2'] = setcancel_request_camt055_journey_groupd18a2Props,
        codeStates['inves_req_camt110_tab'] = inves_req_camt110_tab81869,
        codeStates['setinves_req_camt110_tab'] = setinves_req_camt110_tab81869,
        codeStates['inves_req_camt110_tab81869'] = inves_req_camt110_tab81869Props,
        codeStates['setinves_req_camt110_tab81869'] = setinves_req_camt110_tab81869Props,
        codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e,
        codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e,
        codeStates['inves_req_camt110_tablefa00e'] = inves_req_camt110_tablefa00eProps,
        codeStates['setinves_req_camt110_tablefa00e'] = setinves_req_camt110_tablefa00eProps,
        codeStates['inves_req_camt110_journey_group'] = inves_req_camt110_journey_groupca738,
        codeStates['setinves_req_camt110_journey_group'] = setinves_req_camt110_journey_groupca738,
        codeStates['inves_req_camt110_journey_groupca738'] = inves_req_camt110_journey_groupca738Props,
        codeStates['setinves_req_camt110_journey_groupca738'] = setinves_req_camt110_journey_groupca738Props,
        codeStates['investigation_response_camt111_tab'] = investigation_response_camt111_tabf6177,
        codeStates['setinvestigation_response_camt111_tab'] = setinvestigation_response_camt111_tabf6177,
        codeStates['investigation_response_camt111_tabf6177'] = investigation_response_camt111_tabf6177Props,
        codeStates['setinvestigation_response_camt111_tabf6177'] = setinvestigation_response_camt111_tabf6177Props,
        codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401,
        codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401,
        codeStates['inves_res_camt111_table0f401'] = inves_res_camt111_table0f401Props,
        codeStates['setinves_res_camt111_table0f401'] = setinves_res_camt111_table0f401Props,
        codeStates['inves_res_camt111_journey_group'] = inves_res_camt111_journey_group785d4,
        codeStates['setinves_res_camt111_journey_group'] = setinves_res_camt111_journey_group785d4,
        codeStates['inves_res_camt111_journey_group785d4'] = inves_res_camt111_journey_group785d4Props,
        codeStates['setinves_res_camt111_journey_group785d4'] = setinves_res_camt111_journey_group785d4Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }
  const [selectedPaginationData, setSelectedPaginationData] = useState<any[]>(
      []
    )
  const [settings, setSettings] = useState<any>();
  const handleUpdate = (page:any, pageSize:any) =>{
    let searchParams:any = nullFilter(SearchParams);
    setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  async function onRowClick(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(nftransactionproduct_v1Props.length > 0){
      for(let i=0;i< nftransactionproduct_v1Props.length;i++){
        if(nftransactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1"){
          // delete nftransactionproduct_v1Props[i].DFDkey;
          let temp=structuredClone(nftransactionproduct_v1Props[i])
          delete temp?.DFDkey
          filterData.push(temp)
        }           
      }
    }
      setTableData([]);
    if(isRulePresent==undefined)
      isRulePresent=DFkeyAndRule?.isRulePresent||false
    if(searchFilterFlag===true){
      searchParams={}
    }
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {
      fetchDataAbortRef.current?.abort();
      const abortController = new AbortController();
      fetchDataAbortRef.current = abortController;
      const signal = abortController.signal;

      let api_pagination: any;
      let api_paginationBody: api_paginationDto;
      if (isRulePresent==false||itsFromRefreshHandler) {
        if(filterProps?.length||itsFromRefreshHandler){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:paginationDetails.pageSize,
          page:paginationDetails.page
        }
        if(encryptionFlagCont) {
        te_refreshBody["dpdKey"] = encryptionDpd
        te_refreshBody["method"] = encryptionMethod
        }
        te_refreshBody["filterData"] = filterProps
        console.log('event emitter api hitting', JSON.stringify(te_refreshBody))
        const te_refresh: any = await AxiosService.post(
          '/te/eventEmitter',
          te_refreshBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(itsFromRefreshHandler)
        {
          if(DFkeyAndRule?.isRulePresent==true)
          {
            api_paginationBody = {
              key: dstKey,
              page: parseInt(page),
              count: parseInt(pageSize),
              searchFilter: searchParams,
              filterDetails: {
                ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1:UO', 
                nodeId: '153e79bf7820e18f32009096e809e976',
                elementId: '153e79bf7820e18f32009096e809e976'
              },
              sortingDetails
            }
          }else
          {
            api_paginationBody = {
              key: dstKey,
              page: parseInt(page),
              count: parseInt(pageSize),
              searchFilter: searchParams,
              filterData: filterData,
              sortingDetails
            }   
          }
        if(te_refresh?.data?.dataset === 'Bulk Data Processing'){
          api_paginationBody["filterData"] = filterProps
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        if(api_pagination?.data?.records?.length==0 && page!=0 && page!='0' && parseInt(page)!=1 && page!=undefined)
        {
          await fetchData((+page)-1,pageSize,searchParams,dfKey,isRulePresent,isOnLoad,filterProps,itsFromRefreshHandler)
          return
        }
        else{
          setAllData(api_pagination?.data?.records)
          setPaginationData(prevState => ({
            ...prevState,
            page:+page,
            total: api_pagination.data.totalRecords
          }))
        }
        }else{
          const paginationFilterData = filterProps.reduce((acc: any, item: any) => {
            Object.keys(item).forEach((key) => {
              if (key !== 'nodeId' && item[key] !== undefined) {
                acc[key] = item[key]
              }
            })
            return acc
          }, {})
  
          const { filterData: _, key, ...restBody } = te_refreshBody
          api_paginationBody = {
            ...restBody,
            key: key
              ?.replace(':AFC:', ':AFCP:')
              .replace(':AF:', ':AFP:')
              .replace(':DF-DFD:', ':DF-DST:'),
            searchFilter: paginationFilterData,
             filterData: filterData,
             sortingDetails
          }
          if(encryptionFlagCont) {
            api_paginationBody["dpdKey"] = encryptionDpd
            api_paginationBody["method"] = encryptionMethod
          }
  
          api_pagination = await AxiosService.post(
            '/UF/pagination',
            api_paginationBody,
            {
              signal,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          setAllData(api_pagination?.data?.records)
        }
        }else{
        api_paginationBody = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          searchFilter: searchParams,
          filterData: filterData,
          sortingDetails
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
          total: api_pagination.data.totalRecords
        }))
        if(cancel_request_camt055_table9e976Props?.selectFirstRecord){
          setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:[api_pagination?.data?.records[0]?.vgphstm_id]}))
          selectFirstRecordPendingRef.current = api_pagination?.data?.records[0]?.vgphstm_id
        }
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
          api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setcancel_request_camt055_table9e976([])
          setAllDataObject([])
          return
        }
      } else {
         if(filterProps?.length){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:paginationDetails.pageSize,
          page:paginationDetails.page
        }
        if(encryptionFlagCont) {
        te_refreshBody["dpdKey"] = encryptionDpd
        te_refreshBody["method"] = encryptionMethod
        }
        te_refreshBody["filterData"] = filterProps
        const te_refresh: any = await AxiosService.post(
          '/te/eventEmitter',
          te_refreshBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        const paginationFilterData = filterProps.reduce((acc: any, item: any) => {
          Object.keys(item).forEach((key) => {
            if (key !== 'nodeId' && item[key] !== undefined) {
              acc[key] = item[key]
            }
          })
          return acc
        }, {})

        const { filterData: _, key, ...restBody } = te_refreshBody
        api_paginationBody = {
          ...restBody,
          key: key
            ?.replace(':AFC:', ':AFCP:')
            .replace(':AF:', ':AFP:')
            .replace(':DF-DFD:', ':DF-DST:'),
          searchFilter: paginationFilterData,
          sortingDetails
        }
        if(encryptionFlagCont) {
          api_paginationBody["dpdKey"] = encryptionDpd
          api_paginationBody["method"] = encryptionMethod
        }

        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1:UO', 
            nodeId: '153e79bf7820e18f32009096e809e976',
            elementId: '153e79bf7820e18f32009096e809e976'
          },
          searchFilter: searchParams,
          sortingDetails
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
           page:+page,
          total: api_pagination.data.totalRecords
        }))
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
          api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setcancel_request_camt055_table9e976([])
          setAllDataObject([])
          return
        }
      }
      
      if (api_pagination?.data?.records.length > 0) {
        const mappedResult: Record<string, any>[] = api_pagination?.data?.records.map((emp:any) => {
        const result: Record<string, any> = {};
        if(cancel_request_camt055_table9e976Props?.selectFirstRecord){
          setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:[api_pagination?.data?.records[0]?.vgphstm_id]}))
          selectFirstRecordPendingRef.current = api_pagination?.data?.records[0]?.vgphstm_id
        }

        mapperData.forEach((m:any) => {
          const path = extractPath(m.sourcekey);
          const value = getValueByPathForNested(emp, path);
          result[m.elementname.toLowerCase()] = value;
        });

        result.trs_process_id = emp.trs_process_id;
        result.trs_access_profile = emp.trs_access_profile;
        result.trs_org_grp_code = emp.trs_org_grp_code;
        result.trs_org_code = emp.trs_org_code;
        result.trs_role_grp_code = emp.trs_role_grp_code;
        result.trs_role_code = emp.trs_role_code;
        result.trs_ps_grp_code = emp.trs_ps_grp_code;
        result.trs_ps_code = emp.trs_ps_code;
        result.trs_process_status = emp.trs_process_status;
        result.trs_process_status_desc = emp.trs_process_status_desc;
        result.trs_status_desc = emp.trs_status_desc;
        result.trs_process_code = emp.trs_process_code;
        result.trs_previous_process_code = emp.trs_previous_process_code;
        result.trs_next_process_code = emp.trs_next_process_code;
        result.trs_sub_org_grp_code = emp.trs_sub_org_grp_code;
        result.trs_sub_org_code = emp.trs_sub_org_code;
        result.trs_app_code = emp.trs_app_code;
        result.trs_locked_by = emp.trs_locked_by;
        result.trs_locked_time = emp.trs_locked_time;
        result.vgphstm_id = emp?.vgphstm_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"vgphstm_id"
      // }
      // if(encryptionFlagCont) {
      // uf_paginationDataFilterBody["dpdKey"] = encryptionDpd
      // uf_paginationDataFilterBody["method"] = encryptionMethod
      // }
      // const uf_paginationDataFilter = await AxiosService.post(
      //   '/UF/PaginationDataFilter',
      //   uf_paginationDataFilterBody,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      if (uf_paginationDataFilter.data.length >= 0&&Array.isArray(uf_paginationDataFilter.data)) {
        let filtertedData:any;
        let dataforexport:any=[]
      // CopyFromData (Parent table): use presetValues if present, else use pagination-filtered data
        
        if ( cancel_request_camt055_table9e976Props?.presetValues&&Object.keys(cancel_request_camt055_table9e976Props?.presetValues).length > 0) {
          filtertedData = [cancel_request_camt055_table9e976Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setcancel_request_camt055_table9e976(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        setcancel_request_camt055_table9e976Props((pre:any)=>({...pre,dataforexport:dataforexport||[],selectedData:{}}))
        defaultColumns.map((items:any)=>{
          if(items?.isColourIndicator==true)
          {
            for(let i=0;i<filtertedData.length;i++){
              filtertedData[i]={...filtertedData[i],[items?.id]:colurIndicator(items?.colourIndicator,filtertedData[i][items?.id],items?.ColourIndicatorType)}
            }
          }
        })
        for (let i = 0; i < filtertedData.length; i++) {     
          let JSONType:any=filtertedData[i] || {}
          Object.keys(JSONType).map((key: any) => {
              JSONType={...JSONType,vgphstm_id:filtertedData[i]?.vgphstm_id}
              if(typeof JSONType[key] === 'object' && JSONType[key] !== null && !colourIndicatorCols?.includes(key)) {
                  JSONType[key] =  <JsonView
                    theme="atom"
                    enableClipboard={true}
                    src={JSONType[key]}
                    style={{ fontSize: "0.833vw" }}
                    collapsed={true}
                  />
              } else {
                // Check if column type is number and format with commas
                const columnConfig = translatedColumns.find((col: any) => col.id === key || col.dfdName === key);
                if (columnConfig?.type === 'number' || columnConfig?.type === 'integer' || typeof JSONType[key] === 'number') {
                  JSONType[key] = formatNumberWithCommas(JSONType[key]);
                }
              }
              JSONType={...JSONType,vgphstm_id:filtertedData[i]?.vgphstm_id}
          })
          filtertedData[i] = JSONType
        }
        setAllDataObject(filtertedData)
        return
      }
      }
    } catch (err: any) {
      if (axios.isCancel(err)) return;
      toast(err?.response?.data?.errorDetails?.message, 'danger')
    }
  }
////////////////////////////////
  const [isPopoverOpen,setPopoverOpen]=useState(false)
  const popoverButtonElement = useRef(null)
 const RowAction = React.useCallback(({item,index}: any) => {

    allDataObject?.map((data:any,i:any)=>{
      if(data?.vgphstm_id==item?.vgphstm_id)
      {
        index=i
      }
    })
    return <RowActionComponent
      index={index}
      allData={allData}
      setRefetch={setRefetch}
      lockedData={{data:allData[index]}} 
      setLockedData={setLockedData} 
      primaryTableData={primaryTableData} 
      setPrimaryTableData={setPrimaryTableData} 
      checkToAdd={checkToAdd} 
      setCheckToAdd={setCheckToAdd} 
      refetch={refetch} 
      encryptionFlagCompData={encryptionFlagCompData} 
      setIsProcessing={setIsProcessing}      
      security={translatedColumns}
      goRuleData={goruleData}
      decodedTokenObj={{...decodedTokenObj,session:decodedTokenObj}}
      artifactRuleState={nftransactionproduct_v1}
      groupData = {groupData}
      controlData = {controlData}
      onSelectLock={setLockMode}
      currentSelectedIds={cancel_request_camt055_table9e976Props?.selectedIds}
      skipUnlockRef={skipUnlockRef}
      tableName={tableName}
    />
  }, [allData, setRefetch, encryptionFlagCompData, cancel_request_camt055_table9e976Props?.selectedIds]);
////////////////////////
const colurIndicator = (keyValue:any=[], comingValue:any,ColourIndicatorType:any) => {
    let customeUI: JSX.Element | null = null;
    for (let i = 0; i < keyValue.length; i++) {
      if (keyValue[i]?.key == comingValue) {
        if(ColourIndicatorType == "rectangle"){
          customeUI = (
            <Tooltip title={keyValue[i]?.key} placement="top-start">
            <div
              className="flex h-full p-2 justify-center "
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >
             {keyValue[i]?.icon ? <Icon data={keyValue[i]?.icon } size={20} fillContainer={false}/>:comingValue}
            </div>
            </Tooltip>
          );
        }else if(ColourIndicatorType == "badge"){
          const badgeColor = keyValue[i]?.colorCode || '#000'
          customeUI = (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap w-fit"
              style={{ backgroundColor: `${badgeColor}1f`, color: badgeColor }}
            >
              {keyValue[i]?.icon ? <Icon data={keyValue[i]?.icon } size={20} fillContainer={false}/>:comingValue}
            </span>
          );
        }else{
          customeUI = (
            <Tooltip title={keyValue[i]?.key} placement="top-start">
             <div
              className="flex rounded-full aspect-square h-5 w-5 justify-center items-center shrink-0"
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >  
            </div>
            </Tooltip>
          );
        }
        break;
      }
    }
    if(!customeUI)
    {
      return comingValue
    }
    return customeUI;
  };

  useEffect(() => {
    GetTableDetails()
  }, [])
  useEffect(() => {
    const mountedHrefRef = window.location.href
    const handleBeforeUnload = () => {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => {
          AxiosService.post(
            '/UF/unlock',
            { tableName: 'vgph_source_tran_main', key:"vgphstm_id",value:id},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ).catch(() => {});
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Skip unlock only for table row button navigation
      if (skipUnlockRef.current) {
        skipUnlockRef.current = false
        return
      }
      // Skip unlock for same-page navigation (tab switches, etc.)
      if (window.location.href === mountedHrefRef) {
        return
      }
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
      }
      setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (cancel_request_camt055_table9e976Props.filterInitalLoad) return;

    const filterControllers = cancel_request_camt055_table9e976Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['cancel_request_camt055_table9e976']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['cancel_request_camt055_table9e976']).filter((k: string) => jsonEntry['cancel_request_camt055_table9e976'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(cancel_request_camt055_table9e976Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setcancel_request_camt055_table9e976Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(cancel_request_camt055_table9e976Props.filterProps);

  }, [
    cancel_request_camt055_table9e976Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!cancel_request_camt055_table9e976Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(cancel_request_camt055_table9e976Props.filterProps);
  }, [
    cancel_request_camt055_table9e976Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(cancel_request_camt055_table9e976Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(cancel_request_camt055_table9e976Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [cancel_request_camt055_table9e976Props.searchFilter])

  async function UpdatedDataHandle(filterProps?: any) { 
    setLoading(true)
    let searchParams:any = nullFilter(SearchParams);
    let effectiveFilterProps;
    if (filterProps?.length) {
      effectiveFilterProps = [
        { ...filterProps[0], ...searchParams }
      ];
      filterPropsData = effectiveFilterProps;
    } else {
        effectiveFilterProps = filterPropsData;
    }
    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true,effectiveFilterProps,effectiveFilterProps?true:false);
    setLoading(false)
  }
  
  // Handle clearData flag - clears table without re-fetching
  useEffect(() => {
    if (cancel_request_camt055_table9e976Props?.clearData === true) {
      if (cancel_request_camt055_table9e976Props?.skipUnlockOnRefresh) {
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      } else if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      setcancel_request_camt055_table9e976([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setcancel_request_camt055_table9e976Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [cancel_request_camt055_table9e976Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (cancel_request_camt055_table9e976Props?.skipUnlockOnRefresh) {
      setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
      // Caller already unlocked these ids itself (e.g. a back/cancel button) -
      // drop them so a later refresh/unmount doesn't try to unlock them again.
      myLockedIdsRef.current = [];
      lastLockedDataRef.current = null;
    } else if (myLockedIdsRef.current.length) {
      myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
      myLockedIdsRef.current = [];
      lastLockedDataRef.current = null;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(nftransactionproduct_v1Props.length > 0){
        for(let i=0;i< nftransactionproduct_v1Props.length;i++){
          if(nftransactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1"){
            let temp=structuredClone(nftransactionproduct_v1Props[i])
            delete temp?.DFDkey
            filterData.push(temp)
          }   
        }
      }
      const emitBody:Record<string,any> = {
        key: DFkeyAndRule?.dfKey,
        refreshFlag: "Y",
        count: paginationDetails.pageSize,
        page: paginationDetails.page || 1
      };
      if(filterData.length>0){
        emitBody['filterData'] = filterData;
      }
      if (encryptionFlagCont) {
        emitBody["dpdKey"] = encryptionDpd;
        emitBody["method"] = encryptionMethod;
      }
      await AxiosService.post("/te/eventEmitter", emitBody, {
        headers: { Authorization: `Bearer ${token}` }
      });
    UpdatedDataHandle()
      })();
    }
    setLockedData((pre:any)=>({...pre, data:[]}))
    setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [cancel_request_camt055_table9e976Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = cancel_request_camt055_table9e976Props?.selectedIds[cancel_request_camt055_table9e976Props?.selectedIds?.length-1]
    if(Array.isArray(cancel_request_camt055_table9e976) && cancel_request_camt055_table9e976.length>0)
    {
      let data = cancel_request_camt055_table9e976.find((data:any)=>(data?.vgphstm_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "vgphstm_id",
        value: data["vgphstm_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (cancel_request_camt055_table9e976Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (cancel_request_camt055_table9e976Props?.selectedIds?.length == 0){
      handleOnRowClick({},cancel_request_camt055_table9e976Props?.selectedIds)
    }
  }, [cancel_request_camt055_table9e976Props?.selectedIds])


      async function handleConfirmOnRowClick(){
      }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.vgphstm_id==data?.vgphstm_id)
        {
          index=i
          row=item
        }
      })
  
    if(ids.length == 0){
    onButtonSecurityHandle(data)
    return
    }
    setcancel_request_camt055_table9e976Props((pre:any)=>({...pre, selectedData:{...data,...row}, selectedIds:[row?.vgphstm_id]}))  
    onButtonSecurityHandle(data)
    let copyFormhandlerData :any = {}
          //bindtran
    const pkCol2 = translatedColumns.find((col:any) => col.dfdName === "vgphstm_id"); // Find the column whose dfdName matches
    const result2 = allData.find((item:any) => item["vgphstm_id"] === data[pkCol2?.id || "vgphstm_id"]);
          setcancel_request_camt055_journey_groupd18a2(result2||{})
          setcancel_request_camt055_journey_groupd18a2Props((pre:any)=>({...pre,presetValues:allData[index]}))

  }

  // selectFirstRecord auto-selects the first row, but the bindtran mappings live in
  // handleOnRowClick - run it for that row once the fetched data is in state.
  useEffect(() => {
    const pendingUuid = selectFirstRecordPendingRef.current
    if (pendingUuid == null) return
    if (!allData?.length || !allDataObject?.length || !translatedColumns?.length) return
    const row = allDataObject.find((item: any) => item?.vgphstm_id == pendingUuid)
    if (!row) return
    selectFirstRecordPendingRef.current = null
    handleOnRowClick(row, [pendingUuid])
  }, [allData, allDataObject, translatedColumns])

  function onButtonSecurityHandle(data: any) {
    let nodes = Object.keys(goruleData) || []
    let temp: any = {}
    nodes.map((button: any) => {
      if (
        evaluateDecisionTableBoolean(
          goruleData[button]?.nodes,
          data,
          decodedTokenObj
        )
      ) {
        temp={...temp,[button]:true}
      }else{
        temp={...temp,[button]:false}
      }
    })
    setButtonGoRuleData(temp)
  }

  const bindPreviousAndNext=(currectIndex:any,forEvent:any,setData:string,parentTrigger:any="",currectPage:any)=>{ 
    if(currectPage!=paginationData?.page)
    {
    if(forEvent&&setData)
    {
      currectIndex=-1
      if(cancel_request_camt055_table9e976?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&cancel_request_camt055_table9e976?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](cancel_request_camt055_table9e976?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: cancel_request_camt055_table9e976?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&cancel_request_camt055_table9e976?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](cancel_request_camt055_table9e976?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: cancel_request_camt055_table9e976?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(cancel_request_camt055_table9e976?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&cancel_request_camt055_table9e976?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](cancel_request_camt055_table9e976?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: cancel_request_camt055_table9e976?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&cancel_request_camt055_table9e976?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](cancel_request_camt055_table9e976?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: cancel_request_camt055_table9e976?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (cancel_request_camt055_table9e976?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"153e79bf7820e18f32009096e809e976"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="vgphstm_id"
              edgePadding={true}
              tableActions={true}
              tableSelection={true}
              disable={disable}
              selectedIds={cancel_request_camt055_table9e976Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode || 'Single'}
              renderRowActions={RowAction}
              wordWrap={true}
              loading={loading}
              onRowClick={handleOnRowClick}
              isRowclick={true}
              showPagination={paginationData?.page != null && paginationData?.pageSize != null && paginationData?.total != null && Array.isArray(allDataObject) && allDataObject.length>0}
              pagination={{
                page : paginationData.page,
                pageSize : paginationData.pageSize,
                pageSizeOptions : [5, 10, 20, 50, 100],
                total:paginationData.total,
                onUpdate:(e:any)=>handleUpdate(e.page,e.pageSize)
              }}
              headerButtonsRenders={headerButtonsRenders()}
              headerText={headerText}
              headerPosition={headerPosition}
            />
            </div>
    </div>
  )
}

export default Tablecancel_request_camt055_table
