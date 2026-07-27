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
    "id": "request_number",
    "nodeid": "a10d86303ae34f66a149595e52043cc8",
    "name": "Ref",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "ref"
  },
  {
    "id": "full_name",
    "nodeid": "96b0c0916016437cb4f5175bff575729",
    "name": "Employee Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "full_name"
  },
  {
    "id": "system_name",
    "nodeid": "0ff65f95ebf74cb795b8995186d710c8",
    "name": "System",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "system"
  },
  {
    "id": "request_type",
    "nodeid": "b95def7ffc5441eca08123f116a6c8d5",
    "name": "Request Type",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "request_type"
  },
  {
    "id": "access_role",
    "nodeid": "173affc3995f432684797ab5e66fa4e4",
    "name": "Access Role",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "access_role"
  },
  {
    "id": "request_priority",
    "nodeid": "adfb7483fe2441d2a94198a1333c0eca",
    "name": "Priority",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "priority"
  },
  {
    "id": "risk_level",
    "nodeid": "c7bb25b2ced24a599df3cb89dd50280a",
    "name": "Risk Level",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "risk_level"
  },
  {
    "id": "employee_status",
    "nodeid": "077d471a21c54c5e82732c471bd3065d",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "status"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
const Tableaccess_req_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {hrmdashboard_v1, sethrmdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {hrmdashboard_v1Props, sethrmdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
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
  const {header_groupf778a, setheader_groupf778a}= useContext(TotalContext) as TotalContextProps  
  const {header_groupf778aProps, setheader_groupf778aProps}= useContext(TotalContext) as TotalContextProps  
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps  
  const {hrm_dashboard_group4d6cbProps, sethrm_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_group69aa9, settotal_employees_group69aa9}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_group69aa9Props, settotal_employees_group69aa9Props}= useContext(TotalContext) as TotalContextProps  
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4}= useContext(TotalContext) as TotalContextProps  
  const {pending_access_req_groupb5bd4Props, setpending_access_req_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps  
  const {leave_requests_group4beb5, setleave_requests_group4beb5}= useContext(TotalContext) as TotalContextProps  
  const {leave_requests_group4beb5Props, setleave_requests_group4beb5Props}= useContext(TotalContext) as TotalContextProps  
  const {onboarding_group2580d, setonboarding_group2580d}= useContext(TotalContext) as TotalContextProps  
  const {onboarding_group2580dProps, setonboarding_group2580dProps}= useContext(TotalContext) as TotalContextProps  
  const {table_groupe0a6f, settable_groupe0a6f}= useContext(TotalContext) as TotalContextProps  
  const {table_groupe0a6fProps, settable_groupe0a6fProps}= useContext(TotalContext) as TotalContextProps  
  const {subscreen1c010, setsubscreen1c010}= useContext(TotalContext) as TotalContextProps  
  const {subscreen1c010Props, setsubscreen1c010Props}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps}= useContext(TotalContext) as TotalContextProps  
  const {employee_table_group55008, setemployee_table_group55008}= useContext(TotalContext) as TotalContextProps  
  const {employee_table_group55008Props, setemployee_table_group55008Props}= useContext(TotalContext) as TotalContextProps  
  const {emp_group5e40b, setemp_group5e40b}= useContext(TotalContext) as TotalContextProps  
  const {emp_group5e40bProps, setemp_group5e40bProps}= useContext(TotalContext) as TotalContextProps  
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d}= useContext(TotalContext) as TotalContextProps  
  const {total_employee_tablee4e9dProps, settotal_employee_tablee4e9dProps}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps}= useContext(TotalContext) as TotalContextProps  
  const {access_req_groupb1258, setaccess_req_groupb1258}= useContext(TotalContext) as TotalContextProps  
  const {access_req_groupb1258Props, setaccess_req_groupb1258Props}= useContext(TotalContext) as TotalContextProps  
  const {acc_group3b167, setacc_group3b167}= useContext(TotalContext) as TotalContextProps  
  const {acc_group3b167Props, setacc_group3b167Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req_tablec5aac, setaccess_req_tablec5aac}= useContext(TotalContext) as TotalContextProps  
  const {access_req_tablec5aacProps, setaccess_req_tablec5aacProps}= useContext(TotalContext) as TotalContextProps  
  const {request_number43cc8, setrequest_number43cc8}= useContext(TotalContext) as TotalContextProps  
  const {full_name75729, setfull_name75729}= useContext(TotalContext) as TotalContextProps  
  const {system_name710c8, setsystem_name710c8}= useContext(TotalContext) as TotalContextProps  
  const {request_type6c8d5, setrequest_type6c8d5}= useContext(TotalContext) as TotalContextProps  
  const {access_rolefa4e4, setaccess_rolefa4e4}= useContext(TotalContext) as TotalContextProps  
  const {request_priorityc0eca, setrequest_priorityc0eca}= useContext(TotalContext) as TotalContextProps  
  const {risk_level0280a, setrisk_level0280a}= useContext(TotalContext) as TotalContextProps  
  const {employee_status3065d, setemployee_status3065d}= useContext(TotalContext) as TotalContextProps  
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
        "b39e357350854d94874b9bb65bdc5aac",
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


    const setLockMode=async(ids:any)=>{
    /// setaccess_req_tablec5aacProps
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
        let keys:any
        setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }


      access_req_tablec5aac.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      access_req_tablec5aac.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.) 
          processIds.push(item?.trs_process_id)
        } 
      })


      setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
    }
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
      ttl: needLockingAndRule.ttl
    })

    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupf778a,
        codeStates['setheader_group'] = setheader_groupf778a,
        codeStates['header_groupf778a'] = header_groupf778aProps,
        codeStates['setheader_groupf778a'] = setheader_groupf778aProps,
        codeStates['hrm_dashboard_group'] = hrm_dashboard_group4d6cb,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_group4d6cb,
        codeStates['hrm_dashboard_group4d6cb'] = hrm_dashboard_group4d6cbProps,
        codeStates['sethrm_dashboard_group4d6cb'] = sethrm_dashboard_group4d6cbProps,
        codeStates['total_employees_group'] = total_employees_group69aa9,
        codeStates['settotal_employees_group'] = settotal_employees_group69aa9,
        codeStates['total_employees_group69aa9'] = total_employees_group69aa9Props,
        codeStates['settotal_employees_group69aa9'] = settotal_employees_group69aa9Props,
        codeStates['pending_access_req_group'] = pending_access_req_groupb5bd4,
        codeStates['setpending_access_req_group'] = setpending_access_req_groupb5bd4,
        codeStates['pending_access_req_groupb5bd4'] = pending_access_req_groupb5bd4Props,
        codeStates['setpending_access_req_groupb5bd4'] = setpending_access_req_groupb5bd4Props,
        codeStates['leave_requests_group'] = leave_requests_group4beb5,
        codeStates['setleave_requests_group'] = setleave_requests_group4beb5,
        codeStates['leave_requests_group4beb5'] = leave_requests_group4beb5Props,
        codeStates['setleave_requests_group4beb5'] = setleave_requests_group4beb5Props,
        codeStates['onboarding_group'] = onboarding_group2580d,
        codeStates['setonboarding_group'] = setonboarding_group2580d,
        codeStates['onboarding_group2580d'] = onboarding_group2580dProps,
        codeStates['setonboarding_group2580d'] = setonboarding_group2580dProps,
        codeStates['table_group'] = table_groupe0a6f,
        codeStates['settable_group'] = settable_groupe0a6f,
        codeStates['table_groupe0a6f'] = table_groupe0a6fProps,
        codeStates['settable_groupe0a6f'] = settable_groupe0a6fProps,
        codeStates['subscreen'] = subscreen1c010,
        codeStates['setsubscreen'] = setsubscreen1c010,
        codeStates['subscreen1c010'] = subscreen1c010Props,
        codeStates['setsubscreen1c010'] = setsubscreen1c010Props,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['employee_table_group'] = employee_table_group55008,
        codeStates['setemployee_table_group'] = setemployee_table_group55008,
        codeStates['employee_table_group55008'] = employee_table_group55008Props,
        codeStates['setemployee_table_group55008'] = setemployee_table_group55008Props,
        codeStates['emp_group'] = emp_group5e40b,
        codeStates['setemp_group'] = setemp_group5e40b,
        codeStates['emp_group5e40b'] = emp_group5e40bProps,
        codeStates['setemp_group5e40b'] = setemp_group5e40bProps,
        codeStates['total_employee_table'] = total_employee_tablee4e9d,
        codeStates['settotal_employee_table'] = settotal_employee_tablee4e9d,
        codeStates['total_employee_tablee4e9d'] = total_employee_tablee4e9dProps,
        codeStates['settotal_employee_tablee4e9d'] = settotal_employee_tablee4e9dProps,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['access_req_group'] = access_req_groupb1258,
        codeStates['setaccess_req_group'] = setaccess_req_groupb1258,
        codeStates['access_req_groupb1258'] = access_req_groupb1258Props,
        codeStates['setaccess_req_groupb1258'] = setaccess_req_groupb1258Props,
        codeStates['acc_group'] = acc_group3b167,
        codeStates['setacc_group'] = setacc_group3b167,
        codeStates['acc_group3b167'] = acc_group3b167Props,
        codeStates['setacc_group3b167'] = setacc_group3b167Props,
        codeStates['access_req_table'] = access_req_tablec5aac,
        codeStates['setaccess_req_table'] = setaccess_req_tablec5aac,
        codeStates['access_req_tablec5aac'] = access_req_tablec5aacProps,
        codeStates['setaccess_req_tablec5aac'] = setaccess_req_tablec5aacProps,
        codeStates['request_number'] = request_number43cc8,
        codeStates['setrequest_number'] = setrequest_number43cc8,
        codeStates['full_name'] = full_name75729,
        codeStates['setfull_name'] = setfull_name75729,
        codeStates['system_name'] = system_name710c8,
        codeStates['setsystem_name'] = setsystem_name710c8,
        codeStates['request_type'] = request_type6c8d5,
        codeStates['setrequest_type'] = setrequest_type6c8d5,
        codeStates['access_role'] = access_rolefa4e4,
        codeStates['setaccess_role'] = setaccess_rolefa4e4,
        codeStates['request_priority'] = request_priorityc0eca,
        codeStates['setrequest_priority'] = setrequest_priorityc0eca,
        codeStates['risk_level'] = risk_level0280a,
        codeStates['setrisk_level'] = setrisk_level0280a,
        codeStates['employee_status'] = employee_status3065d,
        codeStates['setemployee_status'] = setemployee_status3065d,
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
    setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(hrmdashboard_v1Props.length > 0){
      for(let i=0;i< hrmdashboard_v1Props.length;i++){
        if(hrmdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"){
          // delete hrmdashboard_v1Props[i].DFDkey;
          let temp=structuredClone(hrmdashboard_v1Props[i])
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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1:UO', 
                nodeId: 'b39e357350854d94874b9bb65bdc5aac',
                elementId: 'b39e357350854d94874b9bb65bdc5aac'
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
          setaccess_req_tablec5aac([])
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
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1:UO', 
            nodeId: 'b39e357350854d94874b9bb65bdc5aac',
            elementId: 'b39e357350854d94874b9bb65bdc5aac'
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
          setaccess_req_tablec5aac([])
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
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":""
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
        
        if ( access_req_tablec5aacProps?.presetValues&&Object.keys(access_req_tablec5aacProps?.presetValues).length > 0) {
          filtertedData = [access_req_tablec5aacProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setaccess_req_tablec5aac(api_pagination?.data?.records||[])
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

    if (access_req_tablec5aacProps.filterInitalLoad) return;

    const filterControllers = access_req_tablec5aacProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['access_req_tablec5aac']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['access_req_tablec5aac']).filter((k: string) => jsonEntry['access_req_tablec5aac'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(access_req_tablec5aacProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setaccess_req_tablec5aacProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(access_req_tablec5aacProps.filterProps);

  }, [
    access_req_tablec5aacProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!access_req_tablec5aacProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(access_req_tablec5aacProps.filterProps);
  }, [
    access_req_tablec5aacProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(access_req_tablec5aacProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(access_req_tablec5aacProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [access_req_tablec5aacProps.searchFilter])

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
    if (access_req_tablec5aacProps?.clearData === true) {
      setaccess_req_tablec5aac([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setaccess_req_tablec5aacProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [access_req_tablec5aacProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(hrmdashboard_v1Props.length > 0){
        for(let i=0;i< hrmdashboard_v1Props.length;i++){
          if(hrmdashboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"){
            let temp=structuredClone(hrmdashboard_v1Props[i])
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
    setaccess_req_tablec5aacProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [access_req_tablec5aacProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = access_req_tablec5aacProps?.selectedIds[access_req_tablec5aacProps?.selectedIds?.length-1]
    if(Array.isArray(access_req_tablec5aac) && access_req_tablec5aac.length>0)
    {
      let data = access_req_tablec5aac[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "",
        value: data[""],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (access_req_tablec5aacProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (access_req_tablec5aacProps?.selectedIds?.length == 0){
      handleOnRowClick({},access_req_tablec5aacProps?.selectedIds)
    }
  }, [access_req_tablec5aacProps?.selectedIds])


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
      if(access_req_tablec5aac?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&access_req_tablec5aac?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](access_req_tablec5aac?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: access_req_tablec5aac?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&access_req_tablec5aac?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](access_req_tablec5aac?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: access_req_tablec5aac?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(access_req_tablec5aac?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&access_req_tablec5aac?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](access_req_tablec5aac?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: access_req_tablec5aac?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&access_req_tablec5aac?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](access_req_tablec5aac?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: access_req_tablec5aac?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (access_req_tablec5aac?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"b39e357350854d94874b9bb65bdc5aac"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              selectedIds={access_req_tablec5aacProps?.selectedIds}  
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

export default Tableaccess_req_table
