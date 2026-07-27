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
import Buttonview_bt  from './Buttonview_bt'
import Buttonattach_bt  from './Buttonattach_bt'
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
    "id": "leave_req_id",
    "nodeid": "568b8681eaa04e649ec8a28346f6149c",
    "name": "Request ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "leave_req_id"
  },
  {
    "id": "leave_request_number",
    "nodeid": "cbe06b6509dbc1770f081864b8d962d5",
    "name": "Leave Request No.",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "leave_request_number"
  },
  {
    "id": "leave_type",
    "nodeid": "c599c0c1531cc2be3543f042dd5274e3",
    "name": "Leave Type",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "leave_type"
  },
  {
    "id": "start_date",
    "nodeid": "088da31729323fc7558e01ce957502ce",
    "name": "From",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "start_date"
  },
  {
    "id": "end_date",
    "nodeid": "6088cde22d011855ae4c821e43d285f8",
    "name": "To",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "end_date"
  },
  {
    "id": "days_requested",
    "nodeid": "1b20854368ab3aedc963f477971a438c",
    "name": "Days",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "days_requested"
  },
  {
    "id": "trs_event_process_status",
    "nodeid": "6eaa8f6de75b7d38e6f43b809e3dd679",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "trs_event_process_status"
  },
  {
    "type": "__ActionDetails__",
    "id": "view_bt",
    "name": "View",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "attach_bt",
    "name": "Attachments",
    "controlType": "Button"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
// Separate component for row actions to avoid hooks violations
const RowActionComponent = React.memo(({index, allData, setRefetch,lockedData,setLockedData,primaryTableData,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,encryptionFlagCompData,setIsProcessing,security=[],goRuleData={},decodedTokenObj,artifactRuleState,groupData,controlData}: any) => {
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
      }else if (controller in artifactRuleState?.leave_req_table && artifactRuleState?.leave_req_table[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.leave_req_table[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,leave_req_table:filteredData},{leave_req_table:artifactRuleState?.leave_req_table})
          if(result?.leave_req_table?.[controller]?.show==true)
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
      let view_bt:any = await handleSecurity("view_bt") || false
      let attach_bt:any = await handleSecurity("attach_bt") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        view_bt&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonview_bt'))&&(<Buttonview_bt mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
        {
        attach_bt&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonattach_bt'))&&(<Buttonattach_bt mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
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
const Tableleave_req_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {individualleavemanagement_v1, setindividualleavemanagement_v1} = useContext(TotalContext) as TotalContextProps;
  const {individualleavemanagement_v1Props, setindividualleavemanagement_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
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
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps  
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps  
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps  
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps  
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps  
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps  
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps  
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps  
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps  
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps  
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps  
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps  
  const {leave_req_id6149c, setleave_req_id6149c}= useContext(TotalContext) as TotalContextProps  
  const {leave_request_number962d5, setleave_request_number962d5}= useContext(TotalContext) as TotalContextProps  
  const {leave_type274e3, setleave_type274e3}= useContext(TotalContext) as TotalContextProps  
  const {start_date502ce, setstart_date502ce}= useContext(TotalContext) as TotalContextProps  
  const {end_date285f8, setend_date285f8}= useContext(TotalContext) as TotalContextProps  
  const {days_requesteda438c, setdays_requesteda438c}= useContext(TotalContext) as TotalContextProps  
  const {trs_event_process_statusdd679, settrs_event_process_statusdd679}= useContext(TotalContext) as TotalContextProps  
  const {view_btb1a53, setview_btb1a53}= useContext(TotalContext) as TotalContextProps  
  const {attach_btcee90, setattach_btcee90}= useContext(TotalContext) as TotalContextProps  
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
        "6ae8b086b23d14630c1c13c329c1dfa0",
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
    /// setleave_req_table1dfa0Props
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
        setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }


      leave_req_table1dfa0.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.leave_req_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      leave_req_table1dfa0.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.leave_req_id) 
          processIds.push(item?.trs_process_id)
        } 
      })


      setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:ids}))
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
        codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
        codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
        codeStates['total_employees_group'] = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['total_employees_group69415'] = total_employees_group69415Props,
        codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
        codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
        codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
        codeStates['onboarding_group'] = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
        codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
        codeStates['chart_group'] = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
        codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
        codeStates['leave_group'] = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_group1d83d'] = leave_group1d83dProps,
        codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
        codeStates['leave_req_table'] = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
        codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
        codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
        codeStates['leave_req_id'] = leave_req_id6149c,
        codeStates['setleave_req_id'] = setleave_req_id6149c,
        codeStates['leave_request_number'] = leave_request_number962d5,
        codeStates['setleave_request_number'] = setleave_request_number962d5,
        codeStates['leave_type'] = leave_type274e3,
        codeStates['setleave_type'] = setleave_type274e3,
        codeStates['start_date'] = start_date502ce,
        codeStates['setstart_date'] = setstart_date502ce,
        codeStates['end_date'] = end_date285f8,
        codeStates['setend_date'] = setend_date285f8,
        codeStates['days_requested'] = days_requesteda438c,
        codeStates['setdays_requested'] = setdays_requesteda438c,
        codeStates['trs_event_process_status'] = trs_event_process_statusdd679,
        codeStates['settrs_event_process_status'] = settrs_event_process_statusdd679,
        codeStates['view_bt'] = view_btb1a53,
        codeStates['setview_bt'] = setview_btb1a53,
        codeStates['attach_bt'] = attach_btcee90,
        codeStates['setattach_bt'] = setattach_btcee90,
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
    setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(individualleavemanagement_v1Props.length > 0){
      for(let i=0;i< individualleavemanagement_v1Props.length;i++){
        if(individualleavemanagement_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqTable:AFVK:v1"){
          // delete individualleavemanagement_v1Props[i].DFDkey;
          let temp=structuredClone(individualleavemanagement_v1Props[i])
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
      searchParams={...searchParams,["leave_req_id"]:leave_req_table1dfa0Props?.presetValues?.leave_req_id}
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {
      fetchDataAbortRef.current?.abort();
      const abortController = new AbortController();
      fetchDataAbortRef.current = abortController;
      const signal = abortController.signal;
    if(!leave_req_table1dfa0Props?.presetValues || Object.keys(leave_req_table1dfa0Props?.presetValues).length === 0){
      setAllDataObject([])
      return
    }

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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1:UO', 
                nodeId: '6ae8b086b23d14630c1c13c329c1dfa0',
                elementId: '6ae8b086b23d14630c1c13c329c1dfa0'
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
          setleave_req_table1dfa0([])
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
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1:UO', 
            nodeId: '6ae8b086b23d14630c1c13c329c1dfa0',
            elementId: '6ae8b086b23d14630c1c13c329c1dfa0'
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
          setleave_req_table1dfa0([])
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
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"leave_req_id"
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
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setleave_req_table1dfa0(api_pagination?.data?.records||[])
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
  const [isPopoverOpen,setPopoverOpen]=useState(false)
  const popoverButtonElement = useRef(null)
 const RowAction = React.useCallback(({item,index}: any) => {
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
      artifactRuleState={individualleavemanagement_v1}
      groupData = {groupData}
      controlData = {controlData}
    />
  }, [allData, setRefetch, encryptionFlagCompData]);
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
    if(!Array.isArray(leave_req_table1dfa0))
    {
      GetTableDetails()
    }
  }, [leave_req_table1dfa0])

  useEffect(() => {
    GetTableDetails()
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (leave_req_table1dfa0Props.filterInitalLoad) return;

    const filterControllers = leave_req_table1dfa0Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['leave_req_table1dfa0']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['leave_req_table1dfa0']).filter((k: string) => jsonEntry['leave_req_table1dfa0'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(leave_req_table1dfa0Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setleave_req_table1dfa0Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(leave_req_table1dfa0Props.filterProps);

  }, [
    leave_req_table1dfa0Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!leave_req_table1dfa0Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(leave_req_table1dfa0Props.filterProps);
  }, [
    leave_req_table1dfa0Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(leave_req_table1dfa0Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(leave_req_table1dfa0Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [leave_req_table1dfa0Props.searchFilter])

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
    if (leave_req_table1dfa0Props?.clearData === true) {
      setleave_req_table1dfa0([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setleave_req_table1dfa0Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [leave_req_table1dfa0Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    setleave_req_table1dfa0([])
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(individualleavemanagement_v1Props.length > 0){
        for(let i=0;i< individualleavemanagement_v1Props.length;i++){
          if(individualleavemanagement_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:individualLeaveReqTable:AFVK:v1"){
            let temp=structuredClone(individualleavemanagement_v1Props[i])
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
    setleave_req_table1dfa0Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [leave_req_table1dfa0Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = leave_req_table1dfa0Props?.selectedIds[leave_req_table1dfa0Props?.selectedIds?.length-1]
    if(Array.isArray(leave_req_table1dfa0) && leave_req_table1dfa0.length>0)
    {
      let data = leave_req_table1dfa0[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "leave_req_id",
        value: data["leave_req_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (leave_req_table1dfa0Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (leave_req_table1dfa0Props?.selectedIds?.length == 0){
      handleOnRowClick({},leave_req_table1dfa0Props?.selectedIds)
    }
  }, [leave_req_table1dfa0Props?.selectedIds])


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
      if(leave_req_table1dfa0?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&leave_req_table1dfa0?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](leave_req_table1dfa0?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: leave_req_table1dfa0?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&leave_req_table1dfa0?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](leave_req_table1dfa0?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: leave_req_table1dfa0?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(leave_req_table1dfa0?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&leave_req_table1dfa0?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](leave_req_table1dfa0?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: leave_req_table1dfa0?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&leave_req_table1dfa0?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](leave_req_table1dfa0?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: leave_req_table1dfa0?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (leave_req_table1dfa0?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"6ae8b086b23d14630c1c13c329c1dfa0"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className="p-1"
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              tableActions={true}
              tableSorting={true}
              selectedIds={leave_req_table1dfa0Props?.selectedIds}  
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

export default Tableleave_req_table
