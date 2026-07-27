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
import Buttonview_btn  from './Buttonview_btn'
import Buttonedit_btn  from './Buttonedit_btn'
import Buttondelete_btn  from './Buttondelete_btn'
import Buttonbt_add_doc  from './Buttonbt_add_doc'
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
    "id": "employee_id",
    "nodeid": "c6d6ca42abea4d968ceee4a4e9e4e73e",
    "name": "Employee ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employee_id"
  },
  {
    "id": "employee_code",
    "nodeid": "40276a29314047b2817c87898d947d84",
    "name": "Employee Code",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employee_code"
  },
  {
    "id": "full_name",
    "nodeid": "42aeff55d4a1434b8793a8991f6ff05a",
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
    "id": "employee_number",
    "nodeid": "2cae9a5c5b514110a5ddf467c9bddb89",
    "name": "Employee Number",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "emp_number"
  },
  {
    "id": "work_email",
    "nodeid": "03a7c9ed18c3414793e011625352a2a1",
    "name": "Email",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "work_email"
  },
  {
    "id": "gender",
    "nodeid": "dbadc95bb97449eca32f5d9bc0325d32",
    "name": "Gender",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "gender"
  },
  {
    "id": "employment_type",
    "nodeid": "7911d7fd27a24cf7b2b3514b37ab853c",
    "name": "Employee Type",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employment_type"
  },
  {
    "id": "hire_date",
    "nodeid": "286b68f2ab8f49088e7315006478a106",
    "name": "Hire Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "hire_date"
  },
  {
    "id": "workmode",
    "nodeid": "9954de48658542e8b5b9d8a4d4b568a3",
    "name": "Work Mode",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "work_mode"
  },
  {
    "id": "employee_status",
    "nodeid": "bd5b42f1e8504025966a90510a862c4f",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employee_status"
  },
  {
    "type": "__ActionDetails__",
    "id": "view_btn",
    "name": "View",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "edit_btn",
    "name": "Edit",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "delete_btn",
    "name": "Delete",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "bt_add_doc",
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
      }else if (controller in artifactRuleState?.total_employees_table && artifactRuleState?.total_employees_table[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.total_employees_table[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,total_employees_table:filteredData},{total_employees_table:artifactRuleState?.total_employees_table})
          if(result?.total_employees_table?.[controller]?.show==true)
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
      let view_btn:any = await handleSecurity("view_btn") || false
      let edit_btn:any = await handleSecurity("edit_btn") || false
      let delete_btn:any = await handleSecurity("delete_btn") || false
      let bt_add_doc:any = await handleSecurity("bt_add_doc") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        view_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonview_btn'))&&(<Buttonview_btn mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
        {
        edit_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonedit_btn'))&&(<Buttonedit_btn mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
        {
        delete_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttondelete_btn'))&&(<Buttondelete_btn mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
        {
        bt_add_doc&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbt_add_doc'))&&(<Buttonbt_add_doc mainData={flattenKeepInner(filteredData)} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />)}
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
const Tabletotal_employees_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {employees_v1, setemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const {employees_v1Props, setemployees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
  const {total_employees_group75b01, settotal_employees_group75b01}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_group75b01Props, settotal_employees_group75b01Props}= useContext(TotalContext) as TotalContextProps  
  const {emp_groupdf13c, setemp_groupdf13c}= useContext(TotalContext) as TotalContextProps  
  const {emp_groupdf13cProps, setemp_groupdf13cProps}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps  
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps  
  const {employee_id4e73e, setemployee_id4e73e}= useContext(TotalContext) as TotalContextProps  
  const {employee_code47d84, setemployee_code47d84}= useContext(TotalContext) as TotalContextProps  
  const {full_nameff05a, setfull_nameff05a}= useContext(TotalContext) as TotalContextProps  
  const {employee_numberddb89, setemployee_numberddb89}= useContext(TotalContext) as TotalContextProps  
  const {work_email2a2a1, setwork_email2a2a1}= useContext(TotalContext) as TotalContextProps  
  const {gender25d32, setgender25d32}= useContext(TotalContext) as TotalContextProps  
  const {employment_typeb853c, setemployment_typeb853c}= useContext(TotalContext) as TotalContextProps  
  const {hire_date8a106, sethire_date8a106}= useContext(TotalContext) as TotalContextProps  
  const {workmode568a3, setworkmode568a3}= useContext(TotalContext) as TotalContextProps  
  const {employee_status62c4f, setemployee_status62c4f}= useContext(TotalContext) as TotalContextProps  
  const {view_btnc2391, setview_btnc2391}= useContext(TotalContext) as TotalContextProps  
  const {edit_btnb7ae1, setedit_btnb7ae1}= useContext(TotalContext) as TotalContextProps  
  const {delete_btn20022, setdelete_btn20022}= useContext(TotalContext) as TotalContextProps  
  const {bt_add_doce1237, setbt_add_doce1237}= useContext(TotalContext) as TotalContextProps  
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
        "267e1421a9f4452a8ebcf3c4183e694e",
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
    /// settotal_employees_tablee694eProps
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
        settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }


      total_employees_tablee694e.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      total_employees_tablee694e.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.) 
          processIds.push(item?.trs_process_id)
        } 
      })


      settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:ids}))
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
        codeStates['total_employees_group'] = total_employees_group75b01,
        codeStates['settotal_employees_group'] = settotal_employees_group75b01,
        codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
        codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
        codeStates['emp_group'] = emp_groupdf13c,
        codeStates['setemp_group'] = setemp_groupdf13c,
        codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
        codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
        codeStates['employee_id'] = employee_id4e73e,
        codeStates['setemployee_id'] = setemployee_id4e73e,
        codeStates['employee_code'] = employee_code47d84,
        codeStates['setemployee_code'] = setemployee_code47d84,
        codeStates['full_name'] = full_nameff05a,
        codeStates['setfull_name'] = setfull_nameff05a,
        codeStates['employee_number'] = employee_numberddb89,
        codeStates['setemployee_number'] = setemployee_numberddb89,
        codeStates['work_email'] = work_email2a2a1,
        codeStates['setwork_email'] = setwork_email2a2a1,
        codeStates['gender'] = gender25d32,
        codeStates['setgender'] = setgender25d32,
        codeStates['employment_type'] = employment_typeb853c,
        codeStates['setemployment_type'] = setemployment_typeb853c,
        codeStates['hire_date'] = hire_date8a106,
        codeStates['sethire_date'] = sethire_date8a106,
        codeStates['workmode'] = workmode568a3,
        codeStates['setworkmode'] = setworkmode568a3,
        codeStates['employee_status'] = employee_status62c4f,
        codeStates['setemployee_status'] = setemployee_status62c4f,
        codeStates['view_btn'] = view_btnc2391,
        codeStates['setview_btn'] = setview_btnc2391,
        codeStates['edit_btn'] = edit_btnb7ae1,
        codeStates['setedit_btn'] = setedit_btnb7ae1,
        codeStates['delete_btn'] = delete_btn20022,
        codeStates['setdelete_btn'] = setdelete_btn20022,
        codeStates['bt_add_doc'] = bt_add_doce1237,
        codeStates['setbt_add_doc'] = setbt_add_doce1237,
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
    settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(employees_v1Props.length > 0){
      for(let i=0;i< employees_v1Props.length;i++){
        if(employees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"){
          // delete employees_v1Props[i].DFDkey;
          let temp=structuredClone(employees_v1Props[i])
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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1:UO', 
                nodeId: '267e1421a9f4452a8ebcf3c4183e694e',
                elementId: '267e1421a9f4452a8ebcf3c4183e694e'
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
          settotal_employees_tablee694e([])
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
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1:UO', 
            nodeId: '267e1421a9f4452a8ebcf3c4183e694e',
            elementId: '267e1421a9f4452a8ebcf3c4183e694e'
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
          settotal_employees_tablee694e([])
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
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1',
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
        
        if ( total_employees_tablee694eProps?.presetValues&&Object.keys(total_employees_tablee694eProps?.presetValues).length > 0) {
          filtertedData = [total_employees_tablee694eProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          settotal_employees_tablee694e(api_pagination?.data?.records||[])
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
      artifactRuleState={employees_v1}
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
    GetTableDetails()
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (total_employees_tablee694eProps.filterInitalLoad) return;

    const filterControllers = total_employees_tablee694eProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['total_employees_tablee694e']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['total_employees_tablee694e']).filter((k: string) => jsonEntry['total_employees_tablee694e'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(total_employees_tablee694eProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    settotal_employees_tablee694eProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(total_employees_tablee694eProps.filterProps);

  }, [
    total_employees_tablee694eProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!total_employees_tablee694eProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(total_employees_tablee694eProps.filterProps);
  }, [
    total_employees_tablee694eProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(total_employees_tablee694eProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(total_employees_tablee694eProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [total_employees_tablee694eProps.searchFilter])

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
    if (total_employees_tablee694eProps?.clearData === true) {
      settotal_employees_tablee694e([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      settotal_employees_tablee694eProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [total_employees_tablee694eProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(employees_v1Props.length > 0){
        for(let i=0;i< employees_v1Props.length;i++){
          if(employees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"){
            let temp=structuredClone(employees_v1Props[i])
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
    settotal_employees_tablee694eProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [total_employees_tablee694eProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = total_employees_tablee694eProps?.selectedIds[total_employees_tablee694eProps?.selectedIds?.length-1]
    if(Array.isArray(total_employees_tablee694e) && total_employees_tablee694e.length>0)
    {
      let data = total_employees_tablee694e[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "",
        value: data[""],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (total_employees_tablee694eProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (total_employees_tablee694eProps?.selectedIds?.length == 0){
      handleOnRowClick({},total_employees_tablee694eProps?.selectedIds)
    }
  }, [total_employees_tablee694eProps?.selectedIds])


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
      if(total_employees_tablee694e?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&total_employees_tablee694e?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](total_employees_tablee694e?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: total_employees_tablee694e?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&total_employees_tablee694e?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](total_employees_tablee694e?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: total_employees_tablee694e?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(total_employees_tablee694e?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&total_employees_tablee694e?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](total_employees_tablee694e?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: total_employees_tablee694e?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&total_employees_tablee694e?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](total_employees_tablee694e?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: total_employees_tablee694e?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (total_employees_tablee694e?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"267e1421a9f4452a8ebcf3c4183e694e"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              tableActions={true}
              tableSorting={true}
              selectedIds={total_employees_tablee694eProps?.selectedIds}  
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

export default Tabletotal_employees_table
