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
import Buttonview_log  from './Buttonview_log'
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

let colourIndicatorCols:any= [
  "status"
] ;
let defaultColumns:any = [
  {
    "id": "apiname",
    "nodeid": "746ab2f3b9074ff497518233b4ccccc2",
    "name": "API Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "apiname"
  },
  {
    "id": "version",
    "nodeid": "4379cd45cfd0492eaf486927a9133b3f",
    "name": "Version",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "version"
  },
  {
    "id": "status",
    "nodeid": "30f370c4cc9c4baa81b3db06d2ecd1e6",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "isColourIndicator": true,
    "ColourIndicatorType": "rectangle",
    "colourIndicator": [
      {
        "key": "InActive",
        "colorCode": "#FFBB00",
        "icon": ""
      },
      {
        "key": "Active",
        "colorCode": "#67B99A",
        "icon": ""
      }
    ],
    "dfdName": "status"
  },
  {
    "id": "api_category",
    "nodeid": "19d99b4f4fdb45c0898d283ba020905e",
    "name": "API Category",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "api_category"
  },
  {
    "id": "release_date",
    "nodeid": "b3800dd0e1414943ab579f722be1939f",
    "name": "Release Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "release_date"
  },
  {
    "type": "__ActionDetails__",
    "id": "view_log",
    "name": "View Log",
    "controlType": "Button"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
const Tableapi_repository = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "tob_api_repository"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {apiusagedashboard_v1, setapiusagedashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {apiusagedashboard_v1Props, setapiusagedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "apiname",
      "version",
      "status",
      "api_category",
      "release_date",
      "view_log"
    ],
    "blockedControls": [],
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
  const {vob_dashboard_screen9ce49, setvob_dashboard_screen9ce49}= useContext(TotalContext) as TotalContextProps  
  const {vob_dashboard_screen9ce49Props, setvob_dashboard_screen9ce49Props}= useContext(TotalContext) as TotalContextProps  
  const {api_usage_group868b4, setapi_usage_group868b4}= useContext(TotalContext) as TotalContextProps  
  const {api_usage_group868b4Props, setapi_usage_group868b4Props}= useContext(TotalContext) as TotalContextProps  
  const {req_groupdf5e7, setreq_groupdf5e7}= useContext(TotalContext) as TotalContextProps  
  const {req_groupdf5e7Props, setreq_groupdf5e7Props}= useContext(TotalContext) as TotalContextProps  
  const {active_group31e18, setactive_group31e18}= useContext(TotalContext) as TotalContextProps  
  const {active_group31e18Props, setactive_group31e18Props}= useContext(TotalContext) as TotalContextProps  
  const {total_api_calls_groupd4dee, settotal_api_calls_groupd4dee}= useContext(TotalContext) as TotalContextProps  
  const {total_api_calls_groupd4deeProps, settotal_api_calls_groupd4deeProps}= useContext(TotalContext) as TotalContextProps  
  const {most_groupc5ce0, setmost_groupc5ce0}= useContext(TotalContext) as TotalContextProps  
  const {most_groupc5ce0Props, setmost_groupc5ce0Props}= useContext(TotalContext) as TotalContextProps  
  const {line_chart_groupadc5c, setline_chart_groupadc5c}= useContext(TotalContext) as TotalContextProps  
  const {line_chart_groupadc5cProps, setline_chart_groupadc5cProps}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_frequency_subscreenb8acc, setapi_call_over_frequency_subscreenb8acc}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_frequency_subscreenb8accProps, setapi_call_over_frequency_subscreenb8accProps}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_hour_group2febf, setapi_call_over_hour_group2febf}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_hour_group2febfProps, setapi_call_over_hour_group2febfProps}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_month_groupccb80, setapi_call_over_month_groupccb80}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_month_groupccb80Props, setapi_call_over_month_groupccb80Props}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6}= useContext(TotalContext) as TotalContextProps  
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_week_group987fe, setapi_call_over_week_group987fe}= useContext(TotalContext) as TotalContextProps  
  const {api_call_over_week_group987feProps, setapi_call_over_week_group987feProps}= useContext(TotalContext) as TotalContextProps  
  const {total_used_api_groupcd37d, settotal_used_api_groupcd37d}= useContext(TotalContext) as TotalContextProps  
  const {total_used_api_groupcd37dProps, settotal_used_api_groupcd37dProps}= useContext(TotalContext) as TotalContextProps  
  const {list_of_register_tpp_groupbe9d5, setlist_of_register_tpp_groupbe9d5}= useContext(TotalContext) as TotalContextProps  
  const {list_of_register_tpp_groupbe9d5Props, setlist_of_register_tpp_groupbe9d5Props}= useContext(TotalContext) as TotalContextProps  
  const {connected_application19ab2, setconnected_application19ab2}= useContext(TotalContext) as TotalContextProps  
  const {connected_application19ab2Props, setconnected_application19ab2Props}= useContext(TotalContext) as TotalContextProps  
  const {api_repo_table162e4, setapi_repo_table162e4}= useContext(TotalContext) as TotalContextProps  
  const {api_repo_table162e4Props, setapi_repo_table162e4Props}= useContext(TotalContext) as TotalContextProps  
  const {api_repositoryb1ab8, setapi_repositoryb1ab8}= useContext(TotalContext) as TotalContextProps  
  const {api_repositoryb1ab8Props, setapi_repositoryb1ab8Props}= useContext(TotalContext) as TotalContextProps  
  const {apinamecccc2, setapinamecccc2}= useContext(TotalContext) as TotalContextProps  
  const {version33b3f, setversion33b3f}= useContext(TotalContext) as TotalContextProps  
  const {statuscd1e6, setstatuscd1e6}= useContext(TotalContext) as TotalContextProps  
  const {api_category0905e, setapi_category0905e}= useContext(TotalContext) as TotalContextProps  
  const {release_date1939f, setrelease_date1939f}= useContext(TotalContext) as TotalContextProps  
  const {view_log82d2f, setview_log82d2f}= useContext(TotalContext) as TotalContextProps  
  const {group1233a04c, setgroup1233a04c}= useContext(TotalContext) as TotalContextProps  
  const {group1233a04cProps, setgroup1233a04cProps}= useContext(TotalContext) as TotalContextProps  
  const {group4549ff98, setgroup4549ff98}= useContext(TotalContext) as TotalContextProps  
  const {group4549ff98Props, setgroup4549ff98Props}= useContext(TotalContext) as TotalContextProps  
  const {group657d5, setgroup657d5}= useContext(TotalContext) as TotalContextProps  
  const {group657d5Props, setgroup657d5Props}= useContext(TotalContext) as TotalContextProps  
  const {group6576622ab, setgroup6576622ab}= useContext(TotalContext) as TotalContextProps  
  const {group6576622abProps, setgroup6576622abProps}= useContext(TotalContext) as TotalContextProps  
  const {group796798bff3, setgroup796798bff3}= useContext(TotalContext) as TotalContextProps  
  const {group796798bff3Props, setgroup796798bff3Props}= useContext(TotalContext) as TotalContextProps  
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps  
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps  
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
        "82ecab6738f749949432f786075b1ab8",
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
    
  }
    } 
  }
  const [SearchParams,setSearchParams] = useState<any>({})

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, api_repositoryb1ab8 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, api_repositoryb1ab8 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, api_repositoryb1ab8 } = latestLockStateRef.current
    /// setapi_repositoryb1ab8Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
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
        setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?._id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      api_repositoryb1ab8.filter((item:any,id:number)=>{
        if (ids.at(-1)==item._id){
          selectedData?.push(item)
          postIds.push(item._id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      api_repositoryb1ab8.filter((item:any,id:number)=>{
        if (ids.includes(item._id)){
          selectedData?.push(item)
          postIds.push(item._id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?._id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?._id==ids[ids.length - 1])
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
        codeStates['vob_dashboard_screen'] = vob_dashboard_screen9ce49,
        codeStates['setvob_dashboard_screen'] = setvob_dashboard_screen9ce49,
        codeStates['vob_dashboard_screen9ce49'] = vob_dashboard_screen9ce49Props,
        codeStates['setvob_dashboard_screen9ce49'] = setvob_dashboard_screen9ce49Props,
        codeStates['api_usage_group'] = api_usage_group868b4,
        codeStates['setapi_usage_group'] = setapi_usage_group868b4,
        codeStates['api_usage_group868b4'] = api_usage_group868b4Props,
        codeStates['setapi_usage_group868b4'] = setapi_usage_group868b4Props,
        codeStates['req_group'] = req_groupdf5e7,
        codeStates['setreq_group'] = setreq_groupdf5e7,
        codeStates['req_groupdf5e7'] = req_groupdf5e7Props,
        codeStates['setreq_groupdf5e7'] = setreq_groupdf5e7Props,
        codeStates['active_group'] = active_group31e18,
        codeStates['setactive_group'] = setactive_group31e18,
        codeStates['active_group31e18'] = active_group31e18Props,
        codeStates['setactive_group31e18'] = setactive_group31e18Props,
        codeStates['total_api_calls_group'] = total_api_calls_groupd4dee,
        codeStates['settotal_api_calls_group'] = settotal_api_calls_groupd4dee,
        codeStates['total_api_calls_groupd4dee'] = total_api_calls_groupd4deeProps,
        codeStates['settotal_api_calls_groupd4dee'] = settotal_api_calls_groupd4deeProps,
        codeStates['most_group'] = most_groupc5ce0,
        codeStates['setmost_group'] = setmost_groupc5ce0,
        codeStates['most_groupc5ce0'] = most_groupc5ce0Props,
        codeStates['setmost_groupc5ce0'] = setmost_groupc5ce0Props,
        codeStates['line_chart_group'] = line_chart_groupadc5c,
        codeStates['setline_chart_group'] = setline_chart_groupadc5c,
        codeStates['line_chart_groupadc5c'] = line_chart_groupadc5cProps,
        codeStates['setline_chart_groupadc5c'] = setline_chart_groupadc5cProps,
        codeStates['api_call_over_frequency_subscreen'] = api_call_over_frequency_subscreenb8acc,
        codeStates['setapi_call_over_frequency_subscreen'] = setapi_call_over_frequency_subscreenb8acc,
        codeStates['api_call_over_frequency_subscreenb8acc'] = api_call_over_frequency_subscreenb8accProps,
        codeStates['setapi_call_over_frequency_subscreenb8acc'] = setapi_call_over_frequency_subscreenb8accProps,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026'] = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props,
        codeStates['api_call_over_hour_group'] = api_call_over_hour_group2febf,
        codeStates['setapi_call_over_hour_group'] = setapi_call_over_hour_group2febf,
        codeStates['api_call_over_hour_group2febf'] = api_call_over_hour_group2febfProps,
        codeStates['setapi_call_over_hour_group2febf'] = setapi_call_over_hour_group2febfProps,
        codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
        codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
        codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528'] = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props,
        codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props,
        codeStates['api_call_over_month_group'] = api_call_over_month_groupccb80,
        codeStates['setapi_call_over_month_group'] = setapi_call_over_month_groupccb80,
        codeStates['api_call_over_month_groupccb80'] = api_call_over_month_groupccb80Props,
        codeStates['setapi_call_over_month_groupccb80'] = setapi_call_over_month_groupccb80Props,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6'] = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props,
        codeStates['api_call_over_week_group'] = api_call_over_week_group987fe,
        codeStates['setapi_call_over_week_group'] = setapi_call_over_week_group987fe,
        codeStates['api_call_over_week_group987fe'] = api_call_over_week_group987feProps,
        codeStates['setapi_call_over_week_group987fe'] = setapi_call_over_week_group987feProps,
        codeStates['total_used_api_group'] = total_used_api_groupcd37d,
        codeStates['settotal_used_api_group'] = settotal_used_api_groupcd37d,
        codeStates['total_used_api_groupcd37d'] = total_used_api_groupcd37dProps,
        codeStates['settotal_used_api_groupcd37d'] = settotal_used_api_groupcd37dProps,
        codeStates['list_of_register_tpp_group'] = list_of_register_tpp_groupbe9d5,
        codeStates['setlist_of_register_tpp_group'] = setlist_of_register_tpp_groupbe9d5,
        codeStates['list_of_register_tpp_groupbe9d5'] = list_of_register_tpp_groupbe9d5Props,
        codeStates['setlist_of_register_tpp_groupbe9d5'] = setlist_of_register_tpp_groupbe9d5Props,
        codeStates['connected_application'] = connected_application19ab2,
        codeStates['setconnected_application'] = setconnected_application19ab2,
        codeStates['connected_application19ab2'] = connected_application19ab2Props,
        codeStates['setconnected_application19ab2'] = setconnected_application19ab2Props,
        codeStates['api_repo_table'] = api_repo_table162e4,
        codeStates['setapi_repo_table'] = setapi_repo_table162e4,
        codeStates['api_repo_table162e4'] = api_repo_table162e4Props,
        codeStates['setapi_repo_table162e4'] = setapi_repo_table162e4Props,
        codeStates['api_repository'] = api_repositoryb1ab8,
        codeStates['setapi_repository'] = setapi_repositoryb1ab8,
        codeStates['api_repositoryb1ab8'] = api_repositoryb1ab8Props,
        codeStates['setapi_repositoryb1ab8'] = setapi_repositoryb1ab8Props,
        codeStates['apiname'] = apinamecccc2,
        codeStates['setapiname'] = setapinamecccc2,
        codeStates['version'] = version33b3f,
        codeStates['setversion'] = setversion33b3f,
        codeStates['status'] = statuscd1e6,
        codeStates['setstatus'] = setstatuscd1e6,
        codeStates['api_category'] = api_category0905e,
        codeStates['setapi_category'] = setapi_category0905e,
        codeStates['release_date'] = release_date1939f,
        codeStates['setrelease_date'] = setrelease_date1939f,
        codeStates['view_log'] = view_log82d2f,
        codeStates['setview_log'] = setview_log82d2f,
        codeStates['group123'] = group1233a04c,
        codeStates['setgroup123'] = setgroup1233a04c,
        codeStates['group1233a04c'] = group1233a04cProps,
        codeStates['setgroup1233a04c'] = setgroup1233a04cProps,
        codeStates['group454'] = group4549ff98,
        codeStates['setgroup454'] = setgroup4549ff98,
        codeStates['group4549ff98'] = group4549ff98Props,
        codeStates['setgroup4549ff98'] = setgroup4549ff98Props,
        codeStates['group'] = group657d5,
        codeStates['setgroup'] = setgroup657d5,
        codeStates['group657d5'] = group657d5Props,
        codeStates['setgroup657d5'] = setgroup657d5Props,
        codeStates['group6576'] = group6576622ab,
        codeStates['setgroup6576'] = setgroup6576622ab,
        codeStates['group6576622ab'] = group6576622abProps,
        codeStates['setgroup6576622ab'] = setgroup6576622abProps,
        codeStates['group79679'] = group796798bff3,
        codeStates['setgroup79679'] = setgroup796798bff3,
        codeStates['group796798bff3'] = group796798bff3Props,
        codeStates['setgroup796798bff3'] = setgroup796798bff3Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
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
    setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
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
    if(apiusagedashboard_v1Props.length > 0){
      for(let i=0;i< apiusagedashboard_v1Props.length;i++){
        if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1"){
          // delete apiusagedashboard_v1Props[i].DFDkey;
          let temp=structuredClone(apiusagedashboard_v1Props[i])
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
        if(filterProps||itsFromRefreshHandler){
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
                ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1:UO', 
                nodeId: '82ecab6738f749949432f786075b1ab8',
                elementId: '82ecab6738f749949432f786075b1ab8'
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
          setTableData(api_pagination?.data?.records)
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
          setTableData(api_pagination?.data?.records)
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
          setTableData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
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
          setTableData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setapi_repositoryb1ab8([])
          setAllDataObject([])
          return
        }
      } else {
        if(filterProps){
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
        setTableData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1:UO', 
            nodeId: '82ecab6738f749949432f786075b1ab8',
            elementId: '82ecab6738f749949432f786075b1ab8'
          },
          searchFilter: searchParams
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
        setTableData(api_pagination?.data?.records)
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
        setTableData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setapi_repositoryb1ab8([])
          setAllDataObject([])
          return
        }
      }
      
      if (api_pagination?.data?.records.length > 0) {
        const mappedResult: Record<string, any>[] = api_pagination?.data?.records.map((emp:any) => {
        const result: Record<string, any> = {};

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
        result._id = emp?._id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"_id"
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
      // CopyFromData (Parent table): use presetValues if present, else use pagination-filtered data
        
        if ( api_repositoryb1ab8Props?.presetValues&&Object.keys(api_repositoryb1ab8Props?.presetValues).length > 0) {
          filtertedData = [api_repositoryb1ab8Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setapi_repositoryb1ab8(api_pagination?.data?.records||[])
        }
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
              JSONType={...JSONType,_id:filtertedData[i]?._id}
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
              JSONType={...JSONType,_id:filtertedData[i]?._id}
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
  const RowAction = async({item,index,nodeName}: any) => {
    let filteredData:any={}
    if(allData.length!=0)
    {
      let index =-1
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?._id==item?._id)
        {
          index=i
          row=data
        }
      })
      filteredData=flattenKeepInner(allData[index]||{})
    }

    async function handleSecurity(controller: any = '') {
      if (controller in goruleData&& goruleData[controller]?.nodes?.length>0) {
        let result: any =  evaluateDecisionTableBoolean(goruleData[controller]?.nodes, filteredData,decodedTokenObj)
         if (result === true) {
          return true
        }else{
          return false
        }
      }else if (controller in apiusagedashboard_v1?.api_repository && apiusagedashboard_v1?.api_repository[controller]?.itsHaveArtifact== true)
      {
        if(apiusagedashboard_v1?.api_repository[controller])
        {
          let result :any = await getAftfactLevelRule(apiusagedashboard_v1._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,api_repository:filteredData},{api_repository:apiusagedashboard_v1?.api_repository})
          if(result?.api_repository?.[controller]?.show==true)
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

    if(await handleSecurity("view_log") &&nodeName?.toLowerCase()=="buttonview_log"){
      let tempLockedData:any = 
      {
        processIds:[filteredData?.trs_process_id],
        data:filteredData,
        primaryKeys:[filteredData?._id],
        lockMode: needLockingAndRule,
        ttl: needLockingAndRule?.ttl
      }
      return (
        <React.Fragment>
        <Buttonview_log mainData={filteredData} lockedData={tempLockedData} controlData={controlData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} onSelectLock={setLockMode} rowIndex={index} currentSelectedIds={api_repositoryb1ab8Props?.selectedIds} tableName={tableName}/>
        </React.Fragment>
      )
    }

  };

////////////////////////
const colurIndicator = (keyValue:any=[], comingValue:any,ColourIndicatorType:any) => {
    let customeUI: JSX.Element | null = null;
    for (let i = 0; i < keyValue.length; i++) {
      if (keyValue[i]?.key == comingValue) {
        if(ColourIndicatorType == "rectangle")
        {
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
        }
        else
        {
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
    if (!DFkeyAndRule?.dfKey) return;

    if (api_repositoryb1ab8Props.filterInitalLoad) return;

    const filterControllers = api_repositoryb1ab8Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['api_repositoryb1ab8']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['api_repositoryb1ab8']).filter((k: string) => jsonEntry['api_repositoryb1ab8'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(api_repositoryb1ab8Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setapi_repositoryb1ab8Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(api_repositoryb1ab8Props.filterProps);

  }, [
    api_repositoryb1ab8Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!api_repositoryb1ab8Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(api_repositoryb1ab8Props.filterProps);
  }, [
    api_repositoryb1ab8Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(api_repositoryb1ab8Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(api_repositoryb1ab8Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [api_repositoryb1ab8Props.searchFilter])

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
    if (api_repositoryb1ab8Props?.clearData === true) {
      setapi_repositoryb1ab8([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setapi_repositoryb1ab8Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [api_repositoryb1ab8Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(apiusagedashboard_v1Props.length > 0){
        for(let i=0;i< apiusagedashboard_v1Props.length;i++){
          if(apiusagedashboard_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_API_Repository_DFD:AFVK:v1"){
            let temp=structuredClone(apiusagedashboard_v1Props[i])
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
    setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [api_repositoryb1ab8Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = api_repositoryb1ab8Props?.selectedIds[api_repositoryb1ab8Props?.selectedIds?.length-1]
    if(Array.isArray(api_repositoryb1ab8) && api_repositoryb1ab8.length>0)
    {
      let data = api_repositoryb1ab8.find((data:any)=>(data?._id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "_id",
        value: data["_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (api_repositoryb1ab8Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (api_repositoryb1ab8Props?.selectedIds?.length == 0){
      handleOnRowClick({},api_repositoryb1ab8Props?.selectedIds)
    }
  }, [api_repositoryb1ab8Props?.selectedIds])


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
        if(item?._id==data?._id)
        {
          index=i
          row=item
        }
      })
  
    if(ids.length == 0){
    onButtonSecurityHandle(data)
    return
    }
    setapi_repositoryb1ab8Props((pre:any)=>({...pre, selectedIds:[row?._id]}))  
    onButtonSecurityHandle(data)
    let copyFormhandlerData :any = {}
          //bindtran
    const pkCol = translatedColumns.find((col:any) => col.dfdName === "_id"); // Find the column whose dfdName matches
    const result = allData.find((item:any) => item["_id"] === data[pkCol?.id || "_id"]);
          setapi_process_log_table5904e(result||{})
          setapi_process_log_table5904eProps({...api_process_log_table5904e,presetValues:allData[index]})

  }

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
      if(api_repositoryb1ab8?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&api_repositoryb1ab8?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](api_repositoryb1ab8?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: api_repositoryb1ab8?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&api_repositoryb1ab8?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](api_repositoryb1ab8?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: api_repositoryb1ab8?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(api_repositoryb1ab8?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&api_repositoryb1ab8?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](api_repositoryb1ab8?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: api_repositoryb1ab8?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&api_repositoryb1ab8?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](api_repositoryb1ab8?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: api_repositoryb1ab8?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (api_repositoryb1ab8?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"82ecab6738f749949432f786075b1ab8"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="_id"
              edgePadding={true}
              disable={disable}
              selectedIds={api_repositoryb1ab8Props?.selectedIds}  
              onSelectionChange={setLockMode} 
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

export default Tableapi_repository
