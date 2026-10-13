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
    "id": "col_mol_numr",
    "nodeid": "3a985ae280471ebfa6459349d59d6584",
    "name": "MOL Number",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employer_mol_number"
  },
  {
    "id": "col_mohre_sts",
    "nodeid": "f24ab03b94a03b233dd488fa804e37dc",
    "name": "Mohre Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": true,
    "colourIndicator": [],
    "dfdName": "additional_info"
  },
  {
    "id": "col_reg_num",
    "nodeid": "bfa873200bb80bf110ba5ce181551c35",
    "name": "Registration Number",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": true,
    "colourIndicator": [],
    "dfdName": "employer_reg_id"
  },
  {
    "id": "col_emirates_id",
    "nodeid": "68e43b9827bf67f232a1c0cb010ce519",
    "name": "Emirates ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "right",
    "hide": false,
    "isSearch": true,
    "colourIndicator": [],
    "dfdName": "employer_eid"
  },
  {
    "id": "col_created_date",
    "nodeid": "f179acc2a14b519c109fd94824a1adb1",
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
export const unlocktbl_emplr_listRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'vgph_source_tran_main', key: 'uuid', value: id },
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
const Tabletbl_emplr_list = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
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
  const {enquirygetregemployer_v1, setenquirygetregemployer_v1} = useContext(TotalContext) as TotalContextProps;
  const {enquirygetregemployer_v1Props, setenquirygetregemployer_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "IT Team": {
    "allowedControls": [
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "blockedControls": [
      "col_created_date"
    ],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "blockedControls": [
      "col_created_date"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_mol_numr",
      "col_mohre_sts",
      "col_reg_num",
      "col_emirates_id"
    ],
    "blockedControls": [
      "col_created_date"
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
  const {grp_overall_tran_listfb644, setgrp_overall_tran_listfb644}= useContext(TotalContext) as TotalContextProps  
  const {grp_overall_tran_listfb644Props, setgrp_overall_tran_listfb644Props}= useContext(TotalContext) as TotalContextProps  
  const {tbl_emplr_list3557a, settbl_emplr_list3557a}= useContext(TotalContext) as TotalContextProps  
  const {tbl_emplr_list3557aProps, settbl_emplr_list3557aProps}= useContext(TotalContext) as TotalContextProps  
  const {col_mol_numrd6584, setcol_mol_numrd6584}= useContext(TotalContext) as TotalContextProps  
  const {col_mohre_stse37dc, setcol_mohre_stse37dc}= useContext(TotalContext) as TotalContextProps  
  const {col_reg_num51c35, setcol_reg_num51c35}= useContext(TotalContext) as TotalContextProps  
  const {col_emirates_idce519, setcol_emirates_idce519}= useContext(TotalContext) as TotalContextProps  
  const {col_created_date1adb1, setcol_created_date1adb1}= useContext(TotalContext) as TotalContextProps  
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
        "32800ddb8733e23248abdf6cc9c3557a",
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
        { tableName: 'vgph_source_tran_main', key:"uuid",value:id},
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

  const unlockRecord = (id: number) => unlocktbl_emplr_listRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, tbl_emplr_list3557a })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, tbl_emplr_list3557a }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, tbl_emplr_list3557a } = latestLockStateRef.current
    /// settbl_emplr_list3557aProps
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(tbl_emplr_list3557a.map((item: any) => item.uuid));
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
        settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.uuid==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

        if (previousLockedId === row.uuid) {
          return
        }

        await lockRecord(row.uuid)

        if (previousLockedId && previousLockedId !== row.uuid) {
          await unlockRecord(previousLockedId)
        }

      tbl_emplr_list3557a.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.uuid){
          selectedData?.push(item)
          postIds.push(item.uuid)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
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
            settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      tbl_emplr_list3557a.filter((item:any,id:number)=>{
        if (ids.includes(item.uuid)){
          selectedData?.push(item)
          postIds.push(item.uuid) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.uuid==ids[ids.length - 1])
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

      settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = tbl_emplr_list3557a
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.uuid) ? item.uuid : null
          )
          .filter(Boolean)

        settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        throw err
      }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.uuid==ids[ids.length - 1])
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
        codeStates['grp_overall_tran_list'] = grp_overall_tran_listfb644,
        codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_listfb644,
        codeStates['grp_overall_tran_listfb644'] = grp_overall_tran_listfb644Props,
        codeStates['setgrp_overall_tran_listfb644'] = setgrp_overall_tran_listfb644Props,
        codeStates['tbl_emplr_list'] = tbl_emplr_list3557a,
        codeStates['settbl_emplr_list'] = settbl_emplr_list3557a,
        codeStates['tbl_emplr_list3557a'] = tbl_emplr_list3557aProps,
        codeStates['settbl_emplr_list3557a'] = settbl_emplr_list3557aProps,
        codeStates['col_mol_numr'] = col_mol_numrd6584,
        codeStates['setcol_mol_numr'] = setcol_mol_numrd6584,
        codeStates['col_mohre_sts'] = col_mohre_stse37dc,
        codeStates['setcol_mohre_sts'] = setcol_mohre_stse37dc,
        codeStates['col_reg_num'] = col_reg_num51c35,
        codeStates['setcol_reg_num'] = setcol_reg_num51c35,
        codeStates['col_emirates_id'] = col_emirates_idce519,
        codeStates['setcol_emirates_id'] = setcol_emirates_idce519,
        codeStates['col_created_date'] = col_created_date1adb1,
        codeStates['setcol_created_date'] = setcol_created_date1adb1,
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
    settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(enquirygetregemployer_v1Props.length > 0){
      for(let i=0;i< enquirygetregemployer_v1Props.length;i++){
        if(enquirygetregemployer_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1"){
          // delete enquirygetregemployer_v1Props[i].DFDkey;
          let temp=structuredClone(enquirygetregemployer_v1Props[i])
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
                ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployer:AFVK:v1:UO', 
                nodeId: '32800ddb8733e23248abdf6cc9c3557a',
                elementId: '32800ddb8733e23248abdf6cc9c3557a'
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
          settbl_emplr_list3557a([])
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
        setTableData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployer:AFVK:v1:UO', 
            nodeId: '32800ddb8733e23248abdf6cc9c3557a',
            elementId: '32800ddb8733e23248abdf6cc9c3557a'
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
          settbl_emplr_list3557a([])
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
        result.uuid = emp?.uuid;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployer:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"uuid"
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
        
        if ( tbl_emplr_list3557aProps?.presetValues&&Object.keys(tbl_emplr_list3557aProps?.presetValues).length > 0) {
          filtertedData = [tbl_emplr_list3557aProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          settbl_emplr_list3557a(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        settbl_emplr_list3557aProps((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
              JSONType={...JSONType,uuid:filtertedData[i]?.uuid}
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
              JSONType={...JSONType,uuid:filtertedData[i]?.uuid}
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
        if(data?.uuid==item?.uuid)
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
            { tableName: 'vgph_source_tran_main', key:"uuid",value:id},
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
      settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (tbl_emplr_list3557aProps.filterInitalLoad) return;

    const filterControllers = tbl_emplr_list3557aProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['tbl_emplr_list3557a']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['tbl_emplr_list3557a']).filter((k: string) => jsonEntry['tbl_emplr_list3557a'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(tbl_emplr_list3557aProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    settbl_emplr_list3557aProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(tbl_emplr_list3557aProps.filterProps);

  }, [
    tbl_emplr_list3557aProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!tbl_emplr_list3557aProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(tbl_emplr_list3557aProps.filterProps);
  }, [
    tbl_emplr_list3557aProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(tbl_emplr_list3557aProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(tbl_emplr_list3557aProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [tbl_emplr_list3557aProps.searchFilter])

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
    if (tbl_emplr_list3557aProps?.clearData === true) {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      settbl_emplr_list3557a([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      settbl_emplr_list3557aProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [tbl_emplr_list3557aProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (tbl_emplr_list3557aProps?.skipUnlockOnRefresh) {
      settbl_emplr_list3557aProps((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
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
      if(enquirygetregemployer_v1Props.length > 0){
        for(let i=0;i< enquirygetregemployer_v1Props.length;i++){
          if(enquirygetregemployer_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryGetRegEmployerEmployerList:AFVK:v1"){
            let temp=structuredClone(enquirygetregemployer_v1Props[i])
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
    settbl_emplr_list3557aProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [tbl_emplr_list3557aProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = tbl_emplr_list3557aProps?.selectedIds[tbl_emplr_list3557aProps?.selectedIds?.length-1]
    if(Array.isArray(tbl_emplr_list3557a) && tbl_emplr_list3557a.length>0)
    {
      let data = tbl_emplr_list3557a.find((data:any)=>(data?.uuid==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "uuid",
        value: data["uuid"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (tbl_emplr_list3557aProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (tbl_emplr_list3557aProps?.selectedIds?.length == 0){
      handleOnRowClick({},tbl_emplr_list3557aProps?.selectedIds)
    }
  }, [tbl_emplr_list3557aProps?.selectedIds])


  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.uuid==data?.uuid)
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
      if(tbl_emplr_list3557a?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tbl_emplr_list3557a?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tbl_emplr_list3557a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_emplr_list3557a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tbl_emplr_list3557a?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tbl_emplr_list3557a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_emplr_list3557a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(tbl_emplr_list3557a?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tbl_emplr_list3557a?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tbl_emplr_list3557a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_emplr_list3557a?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tbl_emplr_list3557a?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tbl_emplr_list3557a?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_emplr_list3557a?.at(newIndex) ,currectPage:paginationData?.page});
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
  if (tbl_emplr_list3557a?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"32800ddb8733e23248abdf6cc9c3557a"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="uuid"
              edgePadding={true}
              tableSorting={true}
              onSort={handleSort}
              disable={disable}
              selectedIds={tbl_emplr_list3557aProps?.selectedIds}  
              onSelectionChange={setLockMode} 
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

export default Tabletbl_emplr_list
