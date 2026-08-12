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
import Buttonuploader  from './Buttonuploader'
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
    "id": "doc_type_id",
    "nodeid": "4ad40d41d750407aa03ea7d320aaf61f",
    "name": "Doc Type ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "doc_type_id"
  },
  {
    "id": "doc_type_name",
    "nodeid": "ff4f23381c8a4b5fb2cdb784c3f949dd",
    "name": "Doc Type Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "doc_type_name"
  },
  {
    "type": "__ActionDetails__",
    "id": "uploader",
    "name": "Upload",
    "controlType": "Button"
  },
  {
    "id": "doc_reference_url",
    "nodeid": "75493b6935364e7fb1edf06f8c4d9056",
    "name": "Doc Reference Url",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
const Tabledoc_type_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "document_types"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const [disable,setDisable] = useState(false);
  const {addcase_v1, setaddcase_v1} = useContext(TotalContext) as TotalContextProps;
  const {addcase_v1Props, setaddcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Branch Manager": {
    "allowedControls": [
      "doc_type_id",
      "doc_type_name",
      "uploader"
    ],
    "blockedControls": [
      "doc_reference_url"
    ],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "doc_type_id",
      "doc_type_name",
      "uploader"
    ],
    "blockedControls": [
      "doc_reference_url"
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
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps  
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps  
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps  
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps  
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps  
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps  
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps  
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps  
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps  
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_idaf61f, setdoc_type_idaf61f}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_name949dd, setdoc_type_name949dd}= useContext(TotalContext) as TotalContextProps  
  const {uploaderdff25, setuploaderdff25}= useContext(TotalContext) as TotalContextProps  
  const {doc_reference_urld9056, setdoc_reference_urld9056}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps  
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps  
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
        "2835a4a5d4754169ba15a5e8d16be9fa",
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

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, doc_type_tablebe9fa })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, doc_type_tablebe9fa }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, doc_type_tablebe9fa } = latestLockStateRef.current
    /// setdoc_type_tablebe9faProps
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
        setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }


      doc_type_tablebe9fa.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.doc_type_id){
          selectedData?.push(item)
          postIds.push(item.doc_type_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      doc_type_tablebe9fa.filter((item:any,id:number)=>{
        if (ids.includes(item.doc_type_id)){
          selectedData?.push(item)
          postIds.push(item.doc_type_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.doc_type_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.doc_type_id==ids[ids.length - 1])
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
        codeStates['add_case_group'] = add_case_groupeb161,
        codeStates['setadd_case_group'] = setadd_case_groupeb161,
        codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
        codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
        codeStates['header_group'] = header_group4878f,
        codeStates['setheader_group'] = setheader_group4878f,
        codeStates['header_group4878f'] = header_group4878fProps,
        codeStates['setheader_group4878f'] = setheader_group4878fProps,
        codeStates['dynamicactions'] = dynamicactions094c3,
        codeStates['setdynamicactions'] = setdynamicactions094c3,
        codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
        codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
        codeStates['case_information_group'] = case_information_group28f6f,
        codeStates['setcase_information_group'] = setcase_information_group28f6f,
        codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
        codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
        codeStates['venue_group'] = venue_group6a36d,
        codeStates['setvenue_group'] = setvenue_group6a36d,
        codeStates['venue_group6a36d'] = venue_group6a36dProps,
        codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
        codeStates['georgia_group'] = georgia_group0fa18,
        codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
        codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
        codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
        codeStates['georgias_group'] = georgias_group945fd,
        codeStates['setgeorgias_group'] = setgeorgias_group945fd,
        codeStates['georgias_group945fd'] = georgias_group945fdProps,
        codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
        codeStates['georgias_groups'] = georgias_groups6f85f,
        codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
        codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
        codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
        codeStates['georgiass_groups'] = georgiass_groups86a87,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
        codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
        codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
        codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
        codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
        codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
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
        codeStates['doc_type_id'] = doc_type_idaf61f,
        codeStates['setdoc_type_id'] = setdoc_type_idaf61f,
        codeStates['doc_type_name'] = doc_type_name949dd,
        codeStates['setdoc_type_name'] = setdoc_type_name949dd,
        codeStates['uploader'] = uploaderdff25,
        codeStates['setuploader'] = setuploaderdff25,
        codeStates['doc_reference_url'] = doc_reference_urld9056,
        codeStates['setdoc_reference_url'] = setdoc_reference_urld9056,
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
    setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(addcase_v1Props.length > 0){
      for(let i=0;i< addcase_v1Props.length;i++){
        if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"){
          // delete addcase_v1Props[i].DFDkey;
          let temp=structuredClone(addcase_v1Props[i])
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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1:UO', 
                nodeId: '2835a4a5d4754169ba15a5e8d16be9fa',
                elementId: '2835a4a5d4754169ba15a5e8d16be9fa'
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
          setTableData(api_pagination?.data?.records)
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
          setdoc_type_tablebe9fa([])
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
        setTableData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1:UO', 
            nodeId: '2835a4a5d4754169ba15a5e8d16be9fa',
            elementId: '2835a4a5d4754169ba15a5e8d16be9fa'
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
          setdoc_type_tablebe9fa([])
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
        result.doc_type_id = emp?.doc_type_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"doc_type_id"
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
        
        if ( doc_type_tablebe9faProps?.presetValues&&Object.keys(doc_type_tablebe9faProps?.presetValues).length > 0) {
          filtertedData = [doc_type_tablebe9faProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setdoc_type_tablebe9fa(api_pagination?.data?.records||[])
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
              JSONType={...JSONType,doc_type_id:filtertedData[i]?.doc_type_id}
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
              JSONType={...JSONType,doc_type_id:filtertedData[i]?.doc_type_id}
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
        if(data?.doc_type_id==item?.doc_type_id)
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
      }else if (controller in addcase_v1?.doc_type_table && addcase_v1?.doc_type_table[controller]?.itsHaveArtifact== true)
      {
        if(addcase_v1?.doc_type_table[controller])
        {
          let result :any = await getAftfactLevelRule(addcase_v1._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,doc_type_table:filteredData},{doc_type_table:addcase_v1?.doc_type_table})
          if(result?.doc_type_table?.[controller]?.show==true)
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

    if(await handleSecurity("uploader") &&nodeName?.toLowerCase()=="buttonuploader"){
      let tempLockedData:any = 
      {
        processIds:[filteredData?.trs_process_id],
        data:filteredData,
        primaryKeys:[filteredData?.doc_type_id],
        lockMode: needLockingAndRule,
        ttl: needLockingAndRule?.ttl
      }
      return (
        <React.Fragment>
        <Buttonuploader mainData={filteredData} lockedData={tempLockedData} controlData={controlData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} onSelectLock={setLockMode} rowIndex={index} currentSelectedIds={doc_type_tablebe9faProps?.selectedIds} tableName={tableName}/>
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
    if (!DFkeyAndRule?.dfKey) return;

    if (doc_type_tablebe9faProps.filterInitalLoad) return;

    const filterControllers = doc_type_tablebe9faProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['doc_type_tablebe9fa']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['doc_type_tablebe9fa']).filter((k: string) => jsonEntry['doc_type_tablebe9fa'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(doc_type_tablebe9faProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setdoc_type_tablebe9faProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(doc_type_tablebe9faProps.filterProps);

  }, [
    doc_type_tablebe9faProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!doc_type_tablebe9faProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(doc_type_tablebe9faProps.filterProps);
  }, [
    doc_type_tablebe9faProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(doc_type_tablebe9faProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(doc_type_tablebe9faProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [doc_type_tablebe9faProps.searchFilter])

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
    if (doc_type_tablebe9faProps?.clearData === true) {
      setdoc_type_tablebe9fa([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setdoc_type_tablebe9faProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [doc_type_tablebe9faProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(addcase_v1Props.length > 0){
        for(let i=0;i< addcase_v1Props.length;i++){
          if(addcase_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:docTypeNameCombo:AFVK:v1"){
            let temp=structuredClone(addcase_v1Props[i])
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
    setdoc_type_tablebe9faProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [doc_type_tablebe9faProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = doc_type_tablebe9faProps?.selectedIds[doc_type_tablebe9faProps?.selectedIds?.length-1]
    if(Array.isArray(doc_type_tablebe9fa) && doc_type_tablebe9fa.length>0)
    {
      let data = doc_type_tablebe9fa.find((data:any)=>(data?.doc_type_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "doc_type_id",
        value: data["doc_type_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (doc_type_tablebe9faProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (doc_type_tablebe9faProps?.selectedIds?.length == 0){
      handleOnRowClick({},doc_type_tablebe9faProps?.selectedIds)
    }
  }, [doc_type_tablebe9faProps?.selectedIds])


  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.doc_type_id==data?.doc_type_id)
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
      if(doc_type_tablebe9fa?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&doc_type_tablebe9fa?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](doc_type_tablebe9fa?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: doc_type_tablebe9fa?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&doc_type_tablebe9fa?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](doc_type_tablebe9fa?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: doc_type_tablebe9fa?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(doc_type_tablebe9fa?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&doc_type_tablebe9fa?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](doc_type_tablebe9fa?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: doc_type_tablebe9fa?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&doc_type_tablebe9fa?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](doc_type_tablebe9fa?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: doc_type_tablebe9fa?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (doc_type_tablebe9fa?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"2835a4a5d4754169ba15a5e8d16be9fa"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="doc_type_id"
              edgePadding={true}
              disable={disable}
              selectedIds={doc_type_tablebe9faProps?.selectedIds}  
              onSelectionChange={setLockMode} 
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

export default Tabledoc_type_table
