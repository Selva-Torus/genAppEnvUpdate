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
import PageApprovalScreenDailypage2 from '@/app/approval_screen_daily_v1/approval_screen_daily_v1page';
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
let presentColumns:any=[]
let defaultColumns:any = [
  {
    "id": "cl_id",
    "nodeid": "14f1c8fc11f2460f81d5024266a570c3",
    "name": "Claim ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "claim_id"
  },
  {
    "id": "trs_created_by",
    "nodeid": "ded4b27818d84832a0780dd7f05ae57b",
    "name": "Employee",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "trs_created_by"
  },
  {
    "id": "claim_category",
    "nodeid": "cf227ef590644cb597cb20c8edc090da",
    "name": "Category",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "claim_category"
  },
  {
    "id": "total_amount",
    "nodeid": "ad8ea165f2164836ba08c079590c033a",
    "name": "Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "category_total_amount"
  },
  {
    "id": "status",
    "nodeid": "e475a84fbb2546f08af9752d6f449843",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "isColourIndicator": true,
    "ColourIndicatorType": "rounded",
    "colourIndicator": [
      {
        "key": "Rejected",
        "colorCode": "#E4080A",
        "icon": ""
      },
      {
        "key": "Approved",
        "colorCode": "#7DDA58",
        "icon": ""
      },
      {
        "key": "WaitingForApproval",
        "colorCode": "#FFDE59",
        "icon": ""
      },
      {
        "key": "ProcessCompleted",
        "colorCode": "#7DDA58",
        "icon": ""
      }
    ],
    "dfdName": "trs_event_process_status"
  },
  {
    "id": "expense_date",
    "nodeid": "b20050ccacca4442ad9168ed6760a4c3",
    "name": "Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_date"
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
export const unlockdaily_expense_tableRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'claims', key: 'claim_id', value: id },
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
const Tabledaily_expense_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "claims"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {dashboard_for_manager_v1, setdashboard_for_manager_v1} = useContext(TotalContext) as TotalContextProps;
  const {dashboard_for_manager_v1Props, setdashboard_for_manager_v1Props} = useContext(TotalContext) as TotalContextProps;
    const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Employee": {
    "allowedControls": [],
    "blockedControls": [
      "cl_id",
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "blockedControls": [
      "cl_id"
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
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps  
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps  
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps  
  const {cl_id570c3, setcl_id570c3}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_byae57b, settrs_created_byae57b}= useContext(TotalContext) as TotalContextProps  
  const {claim_category090da, setclaim_category090da}= useContext(TotalContext) as TotalContextProps  
  const {total_amountc033a, settotal_amountc033a}= useContext(TotalContext) as TotalContextProps  
  const {status49843, setstatus49843}= useContext(TotalContext) as TotalContextProps  
  const {expense_date0a4c3, setexpense_date0a4c3}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps  
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps  
  const {approval_screen_daily_v1Props, setapproval_screen_daily_v1Props}= useContext(TotalContext) as TotalContextProps  
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps  
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps  
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps  
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps  
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
        "0e20ffe3aaf1437e82c5536824491568",
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
        { tableName: 'claims', key:"claim_id",value:id},
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

  const unlockRecord = (id: number) => unlockdaily_expense_tableRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, daily_expense_table91568 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, daily_expense_table91568 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, daily_expense_table91568 } = latestLockStateRef.current
    /// setdaily_expense_table91568Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(daily_expense_table91568.map((item: any) => item.claim_id));
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
        //bindtran
        keys={}       
        Object.keys(daily_approval_group69531).map((item: any) => {
          keys[item] = null
        }) 
        setdaily_approval_group69531(keys)
        setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}))
                  //bindtran
        setdaily_approval_group69531({})
        setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:{}})
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.claim_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

        if (previousLockedId === row.claim_id) {
          return
        }

        await lockRecord(row.claim_id)

        if (previousLockedId && previousLockedId !== row.claim_id) {
          await unlockRecord(previousLockedId)
        }

      daily_expense_table91568.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.claim_id){
          selectedData?.push(item)
          postIds.push(item.claim_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
                  //bindtran
          setdaily_approval_group69531((pre:any)=>({...pre, ...flattenKeepInner(allData[index])}))
          setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:allData[index]})
      //////////
        setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
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
            setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      let selectedMultiData:any=[]
      daily_expense_table91568.filter((item:any,id:number)=>{
        if (ids.includes(item.claim_id)){
          selectedMultiData?.push(item)
          selectedData?.push(item)
          postIds.push(item.claim_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.claim_id==ids[ids.length - 1])
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

      setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:ids}))
   
                  //bindtran
                if(ids?.length>0)
                {
                  setdaily_approval_group69531((pre:any)=>({...pre, ...flattenKeepInner(allData[index])}))
                  setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:selectedMultiData})
                }else
                {
                  setdaily_approval_group69531({})
                  setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:[]})
                
                }
                  
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = daily_expense_table91568
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.claim_id) ? item.claim_id : null
          )
          .filter(Boolean)

        setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        throw err
      }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.claim_id==ids[ids.length - 1])
        {
          index=i
          row=data
        }
      })
                //bindtran
          setdaily_approval_group69531((pre:any)=>({...pre, ...flattenKeepInner(allData[index])}))
          setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:allData[index]})
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
    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...manager_group41477,...offsite_expense_table1e924,...daily_expense_table91568});
    setapproval_screen_daily_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
            //enableElement
    setexpense_name084c7((prev: any) => ({ ...prev, isDisabled: false }))
            //disableElement
    setmanager_commentsd309a((prev: any) => ({ ...prev, isDisabled: true }))

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
        codeStates['manager_group'] = manager_group41477,
        codeStates['setmanager_group'] = setmanager_group41477,
        codeStates['manager_group41477'] = manager_group41477Props,
        codeStates['setmanager_group41477'] = setmanager_group41477Props,
        codeStates['daily_expense_table'] = daily_expense_table91568,
        codeStates['setdaily_expense_table'] = setdaily_expense_table91568,
        codeStates['daily_expense_table91568'] = daily_expense_table91568Props,
        codeStates['setdaily_expense_table91568'] = setdaily_expense_table91568Props,
        codeStates['cl_id'] = cl_id570c3,
        codeStates['setcl_id'] = setcl_id570c3,
        codeStates['trs_created_by'] = trs_created_byae57b,
        codeStates['settrs_created_by'] = settrs_created_byae57b,
        codeStates['claim_category'] = claim_category090da,
        codeStates['setclaim_category'] = setclaim_category090da,
        codeStates['total_amount'] = total_amountc033a,
        codeStates['settotal_amount'] = settotal_amountc033a,
        codeStates['status'] = status49843,
        codeStates['setstatus'] = setstatus49843,
        codeStates['expense_date'] = expense_date0a4c3,
        codeStates['setexpense_date'] = setexpense_date0a4c3,
        codeStates['offsite_expense_table'] = offsite_expense_table1e924,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table1e924,
        codeStates['offsite_expense_table1e924'] = offsite_expense_table1e924Props,
        codeStates['setoffsite_expense_table1e924'] = setoffsite_expense_table1e924Props,
        codeStates['approval_screen_daily_v1'] = approval_screen_daily_v1Props,
        codeStates['setapproval_screen_daily_v1'] = setapproval_screen_daily_v1Props,
        codeStates['daily_approval_group'] = daily_approval_group69531,
        codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
        codeStates['daily_approval_group69531'] = daily_approval_group69531Props,
        codeStates['setdaily_approval_group69531'] = setdaily_approval_group69531Props,
        codeStates['expense_name'] = expense_name084c7,
        codeStates['setexpense_name'] = setexpense_name084c7,
        codeStates['offsite_approval_group'] = offsite_approval_group8d6cc,
        codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
        codeStates['offsite_approval_group8d6cc'] = offsite_approval_group8d6ccProps,
        codeStates['setoffsite_approval_group8d6cc'] = setoffsite_approval_group8d6ccProps,
        codeStates['manager_comments'] = manager_commentsd309a,
        codeStates['setmanager_comments'] = setmanager_commentsd309a,
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
    setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  async function onSelectionChange(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(dashboard_for_manager_v1Props.length > 0){
      for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
        if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claim_table_data:AFVK:v1"){
          // delete dashboard_for_manager_v1Props[i].DFDkey;
          let temp=structuredClone(dashboard_for_manager_v1Props[i])
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
                ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1:UO', 
                nodeId: '0e20ffe3aaf1437e82c5536824491568',
                elementId: '0e20ffe3aaf1437e82c5536824491568'
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
          setdaily_expense_table91568([])
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
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1:UO', 
            nodeId: '0e20ffe3aaf1437e82c5536824491568',
            elementId: '0e20ffe3aaf1437e82c5536824491568'
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
          setdaily_expense_table91568([])
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
        result.claim_id = emp?.claim_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_Manager:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"claim_id"
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
        
        if ( daily_expense_table91568Props?.presetValues&&Object.keys(daily_expense_table91568Props?.presetValues).length > 0) {
          filtertedData = [daily_expense_table91568Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setdaily_expense_table91568(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        setdaily_expense_table91568Props((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
              JSONType={...JSONType,claim_id:filtertedData[i]?.claim_id}
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
              JSONType={...JSONType,claim_id:filtertedData[i]?.claim_id}
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
        if(data?.claim_id==item?.claim_id)
        {
          index=i
          row=data
        }
      })
      filteredData=flattenKeepInner(allData[index]||{})
    }


  };

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
            { tableName: 'claims', key:"claim_id",value:id},
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
      setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (daily_expense_table91568Props.filterInitalLoad) return;

    const filterControllers = daily_expense_table91568Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['daily_expense_table91568']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['daily_expense_table91568']).filter((k: string) => jsonEntry['daily_expense_table91568'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(daily_expense_table91568Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setdaily_expense_table91568Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(daily_expense_table91568Props.filterProps);

  }, [
    daily_expense_table91568Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!daily_expense_table91568Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(daily_expense_table91568Props.filterProps);
  }, [
    daily_expense_table91568Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(daily_expense_table91568Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(daily_expense_table91568Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [daily_expense_table91568Props.searchFilter])

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
    if (daily_expense_table91568Props?.clearData === true) {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      setdaily_expense_table91568([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setdaily_expense_table91568Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [daily_expense_table91568Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (daily_expense_table91568Props?.skipUnlockOnRefresh) {
      setdaily_expense_table91568Props((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
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
      if(dashboard_for_manager_v1Props.length > 0){
        for(let i=0;i< dashboard_for_manager_v1Props.length;i++){
          if(dashboard_for_manager_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:RF:AFK:claim_table_data:AFVK:v1"){
            let temp=structuredClone(dashboard_for_manager_v1Props[i])
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
    setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
    setShowProfileAsModalOpen2(false)
  }, [daily_expense_table91568Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = daily_expense_table91568Props?.selectedIds[daily_expense_table91568Props?.selectedIds?.length-1]
    if(Array.isArray(daily_expense_table91568) && daily_expense_table91568.length>0)
    {
      let data = daily_expense_table91568.find((data:any)=>(data?.claim_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "claim_id",
        value: data["claim_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (daily_expense_table91568Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (daily_expense_table91568Props?.selectedIds?.length == 0){
      handleOnRowClick({},daily_expense_table91568Props?.selectedIds)
    }
  }, [daily_expense_table91568Props?.selectedIds])


  async function handleConfirmOnSelectionChange(){
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.claim_id==data?.claim_id)
        {
          index=i
          row=item
        }
      })
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
      if(daily_expense_table91568?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&daily_expense_table91568?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](daily_expense_table91568?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: daily_expense_table91568?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&daily_expense_table91568?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](daily_expense_table91568?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: daily_expense_table91568?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(daily_expense_table91568?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&daily_expense_table91568?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](daily_expense_table91568?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: daily_expense_table91568?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&daily_expense_table91568?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](daily_expense_table91568?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: daily_expense_table91568?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  const handleSort=async(sortingColumn:string,sortDirection:"asc"|"desc")=>{
    setLoading(true)
    defaultColumns.map((cols:any)=>{
      if(cols.id==sortingColumn)
      {
        sortingColumn = cols.dfdName
      }
    })
    let searchParams:any = nullFilter(SearchParams);
    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true,[],false,{[sortingColumn]:sortDirection});
    setLoading(false)
    console.log(sortingColumn,sortDirection);
  }
  ////
  if (daily_expense_table91568?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({});
          setValidateRefetch({ value: false, init: 0 });
        }}
        showOverlay = {false}
        position = {"center"}
        ready={assetDataReady}
        modalName='approvalscreendaily'
        className='w-[800px] h-[] bg-gray-50 overflow-auto'
      >
        <PageApprovalScreenDailypage2 onReady={handleAssetPageReady}/>
      </Modal>
          <div
            className=' w-full h-full flex flex-row'
            id={"0e20ffe3aaf1437e82c5536824491568"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="claim_id"
              edgePadding={true}
              tableSelection={true}
              tableSettings={true}
              tableSorting={true}
              onSort={handleSort}
              disable={disable}
              selectedIds={daily_expense_table91568Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode || 'Single'}
              wordWrap={true}
              loading={loading}
              onRowClick={onButtonSecurityHandle}
              isRowclick={false}
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

export default Tabledaily_expense_table
