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
import PageHrmdocumentviewerpage4 from '@/app/hrmdocumentviewer_v1/hrmdocumentviewer_v1page';
import Buttonbt_delete  from './Buttonbt_delete'
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
let defaultColumns:any = [
  {
    "id": "attachment_id",
    "nodeid": "a9155f26c1bc4c088050822f1151fac4",
    "name": "Attachment ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "attachment_id"
  },
  {
    "id": "doc_group",
    "nodeid": "8b233e0a951d0c5a88ca68936c0fd397",
    "name": "Document Group",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "doc_group"
  },
  {
    "id": "doc_name",
    "nodeid": "94e6ff827f3e477acacfeb8995493006",
    "name": "Document Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "doc_name"
  },
  {
    "id": "trs_created_date",
    "nodeid": "d6c9028080c8916fedfa5e0b81b04aa7",
    "name": "Created Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "trs_created_date"
  },
  {
    "id": "trs_created_by",
    "nodeid": "80a0861ac9e9e3e24ce5dd76881cd93e",
    "name": "Created By",
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
    "type": "__ActionDetails__",
    "id": "bt_delete",
    "name": "Delete",
    "controlType": "Button"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
const Tablegrade_doc_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {addgradedocument_v1, setaddgradedocument_v1} = useContext(TotalContext) as TotalContextProps;
  const {addgradedocument_v1Props, setaddgradedocument_v1Props} = useContext(TotalContext) as TotalContextProps;
    const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
  const [loading, setLoading]= useState<boolean>(false)
  const [allData, setAllData] = React.useState<any>([]);
  const [allDataObject, setAllDataObject] = React.useState<any>([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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
  const {doc_attached_groupe6469, setdoc_attached_groupe6469}= useContext(TotalContext) as TotalContextProps  
  const {doc_attached_groupe6469Props, setdoc_attached_groupe6469Props}= useContext(TotalContext) as TotalContextProps  
  const {table_group16d33, settable_group16d33}= useContext(TotalContext) as TotalContextProps  
  const {table_group16d33Props, settable_group16d33Props}= useContext(TotalContext) as TotalContextProps  
  const {grade_doc_tablea652a, setgrade_doc_tablea652a}= useContext(TotalContext) as TotalContextProps  
  const {grade_doc_tablea652aProps, setgrade_doc_tablea652aProps}= useContext(TotalContext) as TotalContextProps  
  const {attachment_id1fac4, setattachment_id1fac4}= useContext(TotalContext) as TotalContextProps  
  const {doc_groupfd397, setdoc_groupfd397}= useContext(TotalContext) as TotalContextProps  
  const {doc_name93006, setdoc_name93006}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_date04aa7, settrs_created_date04aa7}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_bycd93e, settrs_created_bycd93e}= useContext(TotalContext) as TotalContextProps  
  const {bt_deleted213e, setbt_deleted213e}= useContext(TotalContext) as TotalContextProps  
  const {document_viewer_groupd4621, setdocument_viewer_groupd4621}= useContext(TotalContext) as TotalContextProps  
  const {document_viewer_groupd4621Props, setdocument_viewer_groupd4621Props}= useContext(TotalContext) as TotalContextProps  
  const {hrmdocumentviewer_v1Props, sethrmdocumentviewer_v1Props}= useContext(TotalContext) as TotalContextProps  
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
        "85e9605f2264cf16e50000c276aa652a",
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
    
    // for locking data ttl ,mode and rule
    setNeedLockingAndRule((pre: any) => ({
      ...pre,
          lockMode:orchestrationData?.data?.action?.lock?.lockMode || "",
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
        { tableName: 'hrm_job_grades', key:"grade_id",value:id},
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

  const unlockRecord = async (id: number) => {
    try {
      await AxiosService.post(
        '/UF/unlock',
        { tableName: 'hrm_job_grades', key:"grade_id",value:id},
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

    const setLockMode=async(ids:any)=>{
    /// setgrade_doc_tablea652aProps
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(grade_doc_tablea652a.map((item: any) => item.grade_id));
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
        let keys:any
        //bindtran
        keys={}       
        Object.keys(document_viewer_groupd4621).map((item: any) => {
          keys[item] = null
        }) 
        setdocument_viewer_groupd4621(keys)
        keys={}       
        Object.keys(document_viewer_groupd4621Props?.presetValues).map((item: any) => {
          keys[item] = null
        }) 
        setdocument_viewer_groupd4621Props((pre:any)=>({...pre.presetValues,...keys}))
        setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:[]}))
                  //bindtran
        setdocument_viewer_groupd4621({})
        setdocument_viewer_groupd4621Props({...document_viewer_groupd4621Props,presetValues:{}})
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        const index = Number(ids[ids.length - 1])
        const row = allData[index]

        if (previousLockedId === row.grade_id) {
          return
        }

        await lockRecord(row.grade_id)

        if (previousLockedId && previousLockedId !== row.grade_id) {
          await unlockRecord(previousLockedId)
        }

      grade_doc_tablea652a.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.grade_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
                  //bindtran
          let bindData2 = filterByKeys(flattenKeepInner(allData[ids?.at(-1)]),document_viewer_groupd4621Props?.controls);
          setdocument_viewer_groupd4621((pre:any)=>({...pre, ...bindData2}))
          setdocument_viewer_groupd4621Props({...document_viewer_groupd4621Props,presetValues:allData[ids?.at(-1)]})
      //////////
        setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
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
            setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds: []}))
        }
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      grade_doc_tablea652a.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.grade_id) 
          processIds.push(item?.trs_process_id)
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

      setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  //bindtran
        setdocument_viewer_groupd4621((pre:any)=>({...pre, ...flattenKeepInner(allData[ids.at(-1)])}))
        setdocument_viewer_groupd4621Props({...document_viewer_groupd4621Props,presetValues:{}})
                  }
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = grade_doc_tablea652a
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.grade_id) ? index.toString() : null
          )
          .filter(Boolean)

        setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        return
      }
    }
                //bindtran
          let bindData2 = filterByKeys(flattenKeepInner(allData[ids?.at(-1)]),document_viewer_groupd4621Props?.controls);
          setdocument_viewer_groupd4621((pre:any)=>({...pre, ...bindData2}))
          setdocument_viewer_groupd4621Props({...document_viewer_groupd4621Props,presetValues:allData[ids?.at(-1)]})
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
    let filterProps4:any =  [];
      let filterData4 = await getFilterProps(filterProps4,{...doc_attached_groupe6469,...table_group16d33,...grade_doc_tablea652a});
    sethrmdocumentviewer_v1Props([...filterData4 ]);
    setShowProfileAsModalOpen4(true);

    setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: postIds,
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl
    })

    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupe6469,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe6469,
        codeStates['doc_attached_groupe6469'] = doc_attached_groupe6469Props,
        codeStates['setdoc_attached_groupe6469'] = setdoc_attached_groupe6469Props,
        codeStates['table_group'] = table_group16d33,
        codeStates['settable_group'] = settable_group16d33,
        codeStates['table_group16d33'] = table_group16d33Props,
        codeStates['settable_group16d33'] = settable_group16d33Props,
        codeStates['grade_doc_table'] = grade_doc_tablea652a,
        codeStates['setgrade_doc_table'] = setgrade_doc_tablea652a,
        codeStates['grade_doc_tablea652a'] = grade_doc_tablea652aProps,
        codeStates['setgrade_doc_tablea652a'] = setgrade_doc_tablea652aProps,
        codeStates['attachment_id'] = attachment_id1fac4,
        codeStates['setattachment_id'] = setattachment_id1fac4,
        codeStates['doc_group'] = doc_groupfd397,
        codeStates['setdoc_group'] = setdoc_groupfd397,
        codeStates['doc_name'] = doc_name93006,
        codeStates['setdoc_name'] = setdoc_name93006,
        codeStates['trs_created_date'] = trs_created_date04aa7,
        codeStates['settrs_created_date'] = settrs_created_date04aa7,
        codeStates['trs_created_by'] = trs_created_bycd93e,
        codeStates['settrs_created_by'] = settrs_created_bycd93e,
        codeStates['bt_delete'] = bt_deleted213e,
        codeStates['setbt_delete'] = setbt_deleted213e,
        codeStates['document_viewer_group'] = document_viewer_groupd4621,
        codeStates['setdocument_viewer_group'] = setdocument_viewer_groupd4621,
        codeStates['document_viewer_groupd4621'] = document_viewer_groupd4621Props,
        codeStates['setdocument_viewer_groupd4621'] = setdocument_viewer_groupd4621Props,
        codeStates['hrmdocumentviewer_v1'] = hrmdocumentviewer_v1Props,
        codeStates['sethrmdocumentviewer_v1'] = sethrmdocumentviewer_v1Props,
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
    setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  async function onSelectionChange(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(addgradedocument_v1Props.length > 0){
      for(let i=0;i< addgradedocument_v1Props.length;i++){
        if(addgradedocument_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:gradeDocTable:AFVK:v1"){
          // delete addgradedocument_v1Props[i].DFDkey;
          let temp=structuredClone(addgradedocument_v1Props[i])
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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addGradeDocument:AFVK:v1:UO', 
                nodeId: '85e9605f2264cf16e50000c276aa652a',
                elementId: '85e9605f2264cf16e50000c276aa652a'
              },
            }
          }else
          {
            api_paginationBody = {
              key: dstKey,
              page: parseInt(page),
              count: parseInt(pageSize),
              searchFilter: searchParams,
              filterData: filterData
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
             filterData: filterData
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
          filterData: filterData
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
          setgrade_doc_tablea652a([])
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
          searchFilter: paginationFilterData
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
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addGradeDocument:AFVK:v1:UO', 
            nodeId: '85e9605f2264cf16e50000c276aa652a',
            elementId: '85e9605f2264cf16e50000c276aa652a'
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
          setgrade_doc_tablea652a([])
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

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addGradeDocument:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"grade_id"
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
        
        if ( grade_doc_tablea652aProps?.presetValues&&Object.keys(grade_doc_tablea652aProps?.presetValues).length > 0) {
          filtertedData = [grade_doc_tablea652aProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setgrade_doc_tablea652a(api_pagination?.data?.records||[])
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
      }else if (controller in addgradedocument_v1?.grade_doc_table && addgradedocument_v1?.grade_doc_table[controller]?.itsHaveArtifact== true)
      {
        if(addgradedocument_v1?.grade_doc_table[controller])
        {
          let result :any = await getAftfactLevelRule(addgradedocument_v1._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,grade_doc_table:filteredData},{grade_doc_table:addgradedocument_v1?.grade_doc_table})
          if(result?.grade_doc_table?.[controller]?.show==true)
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

    if(await handleSecurity("bt_delete") &&nodeName?.toLowerCase()=="buttonbt_delete"){
      let tempLockedData:any = 
      {
        processIds:[filteredData?.trs_process_id],
        data:filteredData,
        primaryKeys:[filteredData?.grade_id],
        lockMode: needLockingAndRule,
        ttl: needLockingAndRule?.ttl
      }
      return (
        <React.Fragment>
        <Buttonbt_delete mainData={filteredData} lockedData={tempLockedData} controlData={controlData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>
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
              className="flex rounded-2xl h-full p-2 justify-center w-[10%] "
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
    const handleBeforeUnload = () => {
      if (lastLockedDataRef.current?.primaryKeys?.length) {
        lastLockedDataRef.current.primaryKeys.forEach((id: number) => {
          AxiosService.post(
            '/UF/unlock',
            { tableName: 'hrm_job_grades', key:"grade_id",value:id},
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
      if (lastLockedDataRef.current?.primaryKeys?.length) {
        lastLockedDataRef.current.primaryKeys.forEach((id: number) => unlockRecord(id));
      }
      setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (grade_doc_tablea652aProps.filterInitalLoad) return;

    const filterControllers = grade_doc_tablea652aProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['grade_doc_tablea652a']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['grade_doc_tablea652a']).filter((k: string) => jsonEntry['grade_doc_tablea652a'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(grade_doc_tablea652aProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setgrade_doc_tablea652aProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(grade_doc_tablea652aProps.filterProps);

  }, [
    grade_doc_tablea652aProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!grade_doc_tablea652aProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(grade_doc_tablea652aProps.filterProps);
  }, [
    grade_doc_tablea652aProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(grade_doc_tablea652aProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(grade_doc_tablea652aProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [grade_doc_tablea652aProps.searchFilter])

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
    if (grade_doc_tablea652aProps?.clearData === true) {
      if (lastLockedDataRef.current?.primaryKeys?.length) {
        lastLockedDataRef.current.primaryKeys.forEach((id: number) => unlockRecord(id));
        lastLockedDataRef.current = null;
      }
      setgrade_doc_tablea652a([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setgrade_doc_tablea652aProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [grade_doc_tablea652aProps?.clearData])
  useEffect(() => {
    if (lockedData?.primaryKeys?.length) {
      lastLockedDataRef.current = lockedData;
    }
  }, [lockedData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (lastLockedDataRef.current?.primaryKeys?.length) {
      lastLockedDataRef.current.primaryKeys.forEach((id: number) => unlockRecord(id));
      lastLockedDataRef.current = null;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(addgradedocument_v1Props.length > 0){
        for(let i=0;i< addgradedocument_v1Props.length;i++){
          if(addgradedocument_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:gradeDocTable:AFVK:v1"){
            let temp=structuredClone(addgradedocument_v1Props[i])
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
    setgrade_doc_tablea652aProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
    setShowProfileAsModalOpen4(false)
  }, [grade_doc_tablea652aProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = grade_doc_tablea652aProps?.selectedIds[grade_doc_tablea652aProps?.selectedIds?.length-1]
    if(Array.isArray(grade_doc_tablea652a) && grade_doc_tablea652a.length>0)
    {
      let data = grade_doc_tablea652a[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "grade_id",
        value: data["grade_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (grade_doc_tablea652aProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (grade_doc_tablea652aProps?.selectedIds?.length == 0){
      handleOnRowClick({},grade_doc_tablea652aProps?.selectedIds)
    }
  }, [grade_doc_tablea652aProps?.selectedIds])


  async function handleConfirmOnSelectionChange(){
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
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
      if(grade_doc_tablea652a?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&grade_doc_tablea652a?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](grade_doc_tablea652a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: grade_doc_tablea652a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&grade_doc_tablea652a?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](grade_doc_tablea652a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: grade_doc_tablea652a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(grade_doc_tablea652a?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&grade_doc_tablea652a?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](grade_doc_tablea652a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: grade_doc_tablea652a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&grade_doc_tablea652a?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](grade_doc_tablea652a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: grade_doc_tablea652a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (grade_doc_tablea652a?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => setShowProfileAsModalOpen4(false)}
        showOverlay = {true}
        position = {"center"}
        modalName='hrmdocumentviewer'
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageHrmdocumentviewerpage4/>
      </Modal>
          <div
            className=' w-full h-full flex flex-row'
            id={"85e9605f2264cf16e50000c276aa652a"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              tableSelection={true}
              selectedIds={grade_doc_tablea652aProps?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode}
              renderRowActions={RowAction}
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

export default Tablegrade_doc_table
