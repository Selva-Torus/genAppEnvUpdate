'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import JsonView from "react18-json-view";
import 'react18-json-view/src/style.css'
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
import { evaluateDecisionTableBoolean } from '@/app/utils/evaluateDecisionTable';
//////////////
import React, { useEffect, useState,useContext, useRef, useImperativeHandle } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution } from '@/app/utils/codeExecution'
import { uf_fetchActionDetailsDto,uf_fetchRuleDetailsDto,te_refreshDto,api_paginationDto,uf_paginationDataFilterDto } from '@/app/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';

// page import
import PageApprovalScreenDailypage from '@/app/approval_screen_daily_v1/approval_screen_daily_v1page';


let colourIndicatorCols:any= [
  "status"
] ;
let defaultColumns = [
  {
    "id": "cl_id",
    "nodeid": "14f1c8fc11f2460f81d5024266a570c3",
    "name": "Claim ID",
    "meta": {
      "sort": true
    },
    "className": "",
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
    "dfdName": "trs_status"
  },
  {
    "id": "expense_date",
    "nodeid": "b20050ccacca4442ad9168ed6760a4c3",
    "name": "Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_date"
  }
] ;
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let mappperNodeId:any;
let goRuleData:any;
let filterPropsData:any;
const Tabledaily_expense_table = ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData }: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {approval_screen_daily_v1Props, setapproval_screen_daily_v1Props}= useContext(TotalContext) as TotalContextProps; 
  //////////////////
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "cl_id",
      "trs_created_by",
      "claim_category",
      "total_amount",
      "status",
      "expense_date"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
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
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method
  const upId: string | any = getCookie('upId')
  let dfKey: string | any
  let dfdType : string | any
  const toast =useInfoMsg()
  const [columns,setColumns]=useState<any>([])
  const [allCode, setAllCode] = React.useState();
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const routes = useRouter()
  const prevRefreshRef = useRef(false);
  const [loading, setLoading]= useState<boolean>(false)
  const [allData, setAllData] = React.useState([]);
  const [allDataObject, setAllDataObject] = React.useState([]);
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
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps  
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps  
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps  
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

  const GetTableDetails = async () => {
    mapperData = [
  {
    "elementname": "cl_id",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.claim_id",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|14f1c8fc11f2460f81d5024266a570c3"
  },
  {
    "elementname": "trs_created_by",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.trs_created_by",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|ded4b27818d84832a0780dd7f05ae57b"
  },
  {
    "elementname": "claim_category",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.claim_category",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|cf227ef590644cb597cb20c8edc090da"
  },
  {
    "elementname": "total_amount",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.category_total_amount",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|ad8ea165f2164836ba08c079590c033a"
  },
  {
    "elementname": "status",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.trs_status",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|e475a84fbb2546f08af9752d6f449843"
  },
  {
    "elementname": "expense_date",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1|bc094f2d2b914ccfaeed3d2a293a01fe|properties.expense_date",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|0e20ffe3aaf1437e82c5536824491568|b20050ccacca4442ad9168ed6760a4c3"
  }
];
    schemaDataDFO = [
  {
    "nodeId": "90efd4ec8903421aaac09bfb5c3e3512",
    "nodeName": "claim_table_data",
    "nodeType": "dbnode",
    "schema": {
      "title": "Generated schema for Root",
      "type": "object",
      "properties": {
        "claim_id": {
          "type": "number"
        },
        "expense_name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "employee_name": {
          "type": "string"
        },
        "claim_category": {
          "type": "string"
        },
        "category_total_amount": {
          "type": "number"
        },
        "expense_amount": {
          "type": "number"
        },
        "trs_status": {
          "type": "string"
        },
        "trs_created_date": {
          "type": "string"
        },
        "trs_created_by": {
          "type": "string"
        },
        "trs_modified_date": {
          "type": "string"
        },
        "trs_modified_by": {
          "type": "string"
        },
        "receipt_image_viewer": {
          "type": "string"
        },
        "receipt_image": {
          "type": "string"
        },
        "trs_next_status": {
          "type": "string"
        },
        "comments": {
          "type": "string"
        },
        "trs_process_id": {
          "type": "string"
        },
        "trs_access_profile": {
          "type": "string"
        },
        "trs_org_grp_code": {
          "type": "string"
        },
        "trs_org_code": {
          "type": "string"
        },
        "trs_role_grp_code": {
          "type": "string"
        },
        "trs_role_code": {
          "type": "string"
        },
        "trs_ps_grp_code": {
          "type": "string"
        },
        "trs_ps_code": {
          "type": "string"
        },
        "claim_expense_type": {
          "type": "string"
        },
        "expense_date": {
          "type": "string"
        },
        "from_date": {
          "type": "string"
        },
        "to_date": {
          "type": "string"
        },
        "formatted_date": {
          "type": "string"
        }
      },
      "required": [
        "claim_id",
        "expense_name",
        "email",
        "employee_name",
        "claim_category",
        "category_total_amount",
        "expense_amount",
        "trs_status",
        "trs_created_date",
        "trs_created_by",
        "trs_modified_date",
        "trs_modified_by",
        "receipt_image_viewer",
        "receipt_image",
        "trs_next_status",
        "comments",
        "trs_process_id",
        "trs_access_profile",
        "trs_org_grp_code",
        "trs_org_code",
        "trs_role_grp_code",
        "trs_role_code",
        "trs_ps_grp_code",
        "trs_ps_code",
        "claim_expense_type",
        "expense_date",
        "from_date",
        "to_date",
        "formatted_date"
      ]
    }
  },
  {
    "nodeId": "bc094f2d2b914ccfaeed3d2a293a01fe",
    "nodeName": "claim_table_ds",
    "nodeType": "datasetschemanode",
    "schema": {
      "title": "Generated schema for Root",
      "type": "object",
      "properties": {
        "claim_id": {
          "type": "number"
        },
        "expense_name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "employee_name": {
          "type": "string"
        },
        "claim_category": {
          "type": "string"
        },
        "category_total_amount": {
          "type": "number"
        },
        "expense_amount": {
          "type": "number"
        },
        "trs_status": {
          "type": "string"
        },
        "trs_created_date": {
          "type": "string"
        },
        "trs_created_by": {
          "type": "string"
        },
        "trs_modified_date": {
          "type": "string"
        },
        "trs_modified_by": {
          "type": "string"
        },
        "receipt_image_viewer": {
          "type": "string"
        },
        "receipt_image": {
          "type": "string"
        },
        "trs_next_status": {
          "type": "string"
        },
        "comments": {
          "type": "string"
        },
        "trs_process_id": {
          "type": "string"
        },
        "trs_access_profile": {
          "type": "string"
        },
        "trs_org_grp_code": {
          "type": "string"
        },
        "trs_org_code": {
          "type": "string"
        },
        "trs_role_grp_code": {
          "type": "string"
        },
        "trs_role_code": {
          "type": "string"
        },
        "trs_ps_grp_code": {
          "type": "string"
        },
        "trs_ps_code": {
          "type": "string"
        },
        "claim_expense_type": {
          "type": "string"
        },
        "expense_date": {
          "type": "string"
        },
        "from_date": {
          "type": "string"
        },
        "to_date": {
          "type": "string"
        },
        "formatted_date": {
          "type": "string"
        }
      },
      "required": [
        "claim_id",
        "expense_name",
        "email",
        "employee_name",
        "claim_category",
        "category_total_amount",
        "expense_amount",
        "trs_status",
        "trs_created_date",
        "trs_created_by",
        "trs_modified_date",
        "trs_modified_by",
        "receipt_image_viewer",
        "receipt_image",
        "trs_next_status",
        "comments",
        "trs_process_id",
        "trs_access_profile",
        "trs_org_grp_code",
        "trs_org_code",
        "trs_role_grp_code",
        "trs_role_code",
        "trs_ps_grp_code",
        "trs_ps_code",
        "claim_expense_type",
        "expense_date",
        "from_date",
        "to_date",
        "formatted_date"
      ]
    }
  }
];
    mappperNodeId = "bc094f2d2b914ccfaeed3d2a293a01fe";
    goRuleData =  {};
    setGoruleData(goRuleData ||{})
    let schemaData:any = {}
    if(schemaDataDFO  && mappperNodeId){
      schemaDataDFO?.map((ele:any)=>{
        if(ele.nodeId==mappperNodeId){
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
    }
    let altertColumns:any=[];
    let allowesColumns:any=[];
    defaultColumns.map((cols:any)=>{
      let temp:any = cols
      {
        if(securityData[accessProfile].allowedControls.includes(cols.id))
        {
          allowesColumns.push(temp)
        }
      }
    })
    setColumns(allowesColumns); 
    for (let i = 0; i < allowesColumns.length; i++) {
      for (let j = 0; j < mapperData.length; j++) {
        if (allowesColumns[i].id === mapperData[j]?.elementname.toLowerCase()) {
          let nodeId = mapperData[j]?.sourcekey.split("|")[1];
          let path = mapperData[j]?.sourcekey.split("|")[2];
          for (let k = 0; k < schemaDataDFO.length; k++) {
            if (schemaDataDFO[k].nodeId === nodeId) {                    
              altertColumns.push({...allowesColumns[i],type:getValueByPath(schemaDataDFO[k], path) || 'string'})
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
    // for pagination data page ,count and dfkey
    setPaginationData((pre: any) => ({
      ...pre,
      page: 1,
      pageSize: 10
    }))

    setDFkeyAndRule((pre:any)=>({
      ...pre,
        isRulePresent:true,
        dfKey:"CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1:",
        dfdType:""
    }))

    dfKey = "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claim_table_data:AFVK:v1:"
    dfdType =""
    
    // for locking data ttl ,mode and rule
    setNeedLockingAndRule((pre: any) => ({
      ...pre,
      lockMode:"Single",
      ttl :30000
    }))
    
    fetchData(1,10,{},{dfKey,dfdType},true,false)
  }

  const [SearchParams,setSearchParams] = useState<any>({})

    const setLockMode=async(ids:any)=>{
    /// setdaily_expense_table91568Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[]
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
        let keys:any
        keys={}       
        Object.keys(daily_approval_group69531).map((item: any) => {
          keys[item] = null
        }) 
        setdaily_approval_group69531(keys)
        keys={}       
        Object.keys(daily_approval_group69531Props?.presetValues).map((item: any) => {
          keys[item] = null
        }) 
        setdaily_approval_group69531Props((pre:any)=>({...pre.presetValues,...keys}))
        setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}))
        setdaily_approval_group69531({})
        setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:{}})
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      daily_expense_table91568.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.claim_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
        setdaily_approval_group69531(allData[ids])
        setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:{}})
      //////////
      setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))      
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      daily_expense_table91568.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.claim_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:ids}))
    }
      setdaily_approval_group69531(selectedData[0]||{})
      setdaily_approval_group69531Props({...daily_approval_group69531Props,presetValues:selectedData[0]||{}})
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
    let filterProps:any =  [];
    let filterData = await getFilterProps(filterProps,lockedData);
    setapproval_screen_daily_v1Props([...filterData ]);
        setShowProfileAsModalOpen(true)
    setexpense_name084c7((prev: any) => ({ ...prev, isDisabled: false }))

    setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: postIds,
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl
    })

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
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false)
  }
  async function onSelectionChange(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any) {
    if(isRulePresent==undefined)
      isRulePresent=DFkeyAndRule?.isRulePresent||false
    if(searchFilterFlag===true){
      searchParams={}
    }
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {

      let api_pagination: any
      if (isRulePresent==false) {
        if(filterProps){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:1000,
          page:1
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
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        }
        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
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
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
            setPaginationData(prevState => ({
          ...prevState,
          page: page-1,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setdaily_expense_table91568([])
          setAllDataObject([])
          return
        }
      } else {
        if(filterProps){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:1000,
          page:1
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
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        }
        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1:UO', 
            nodeId: '0e20ffe3aaf1437e82c5536824491568',
            elementId: '0e20ffe3aaf1437e82c5536824491568'
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
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
            setPaginationData(prevState => ({
          ...prevState,
          page: page-1,
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
          result[m.elementname] = value;
        });

        result.trs_next_status = emp.trs_next_status;
        result.trs_status = emp.trs_status;
        result.trs_process_id = emp.trs_process_id;
        result.trs_access_profile = emp.trs_access_profile;
        result.trs_org_grp_code = emp.trs_org_grp_code;
        result.trs_org_code = emp.trs_org_code;
        result.trs_role_grp_code = emp.trs_role_grp_code;
        result.trs_role_code = emp.trs_role_code;
        result.trs_ps_grp_code = emp.trs_ps_grp_code;
        result.trs_ps_code = emp.trs_ps_code;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1',
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
      // CopyFromData (Parent table): use presetValues if present, else use pagination-filtered data

        if ( daily_expense_table91568Props?.presetValues&&Object.keys(daily_expense_table91568Props?.presetValues).length > 0) {
          filtertedData = [daily_expense_table91568Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setdaily_expense_table91568(uf_paginationDataFilter.data||[])
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
              }
          })
          filtertedData[i] = JSONType
        }
        setAllDataObject(filtertedData)
        return
      }
      }
    } catch (err: any) {
      toast(err?.response?.data?.errorDetails?.message, 'danger')
    }
  }
////////////////////////////////
  const RowAction = ({item,index,nodeName}: any) => {
    let filteredData:any={}
    if(allData.length!=0)
    {
      filteredData=allData[index]||{}
    }
    function handleSecurity(controller: any = '') {
      if (controller in goRuleData) {
        let result: any =  evaluateDecisionTableBoolean(goRuleData[controller]?.nodes, filteredData,decodedTokenObj)
         if (result === true) {
          return true
        }else{
          return false
        }
      }
      return true
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
            <div
              className="flex h-full p-2 justify-center"
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >
             {keyValue[i]?.icon ? <Icon data={keyValue[i]?.icon } size={20} fillContainer={false}/>:comingValue}
              </div>
          );
        }
        else
        {
          customeUI = (
             <div
              className="flex rounded-2xl h-full p-2 justify-center w-[10%] "
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >  
            </div>
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
    if (prevRefreshRef.current) {
      UpdatedDataHandle(daily_expense_table91568Props.filterProps)
    }else 
      prevRefreshRef.current= true
  }, [daily_expense_table91568Props.filterProps])

  async function UpdatedDataHandle(filterProps?: any) { 
    setLoading(true)
    let searchParams:any = nullFilter(SearchParams);
    if(filterProps&& filterProps?.length)
    {
      filterProps[0]= {...filterProps[0],...searchParams}
      filterPropsData = filterProps;
    }
    let te_refreshBody: te_refreshDto = {
        key: DFkeyAndRule?.dfKey,
        upId: upId,
        refreshFlag: "Y",
        count:1000,
        page:1
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true,filterProps)
    setLoading(false)
  }
  
  useEffect(() => {
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!='')
    UpdatedDataHandle()
    setLockedData((pre:any)=>({...pre, data:[]}))
    setdaily_expense_table91568Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [daily_expense_table91568Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = daily_expense_table91568Props?.selectedIds[daily_expense_table91568Props?.selectedIds?.length-1]
    if(Array.isArray(daily_expense_table91568) && daily_expense_table91568.length>0)
    {
      let data = daily_expense_table91568[findData]
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
  }, [daily_expense_table91568Props?.selectedIds])


  async function handleConfirmOnSelectionChange(){
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

  if (daily_expense_table91568?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
      <Modal 
      open={showProfileAsModalOpen} 
      onClose={() => setShowProfileAsModalOpen(false)} 
        showOverlay = {false}
        position = {"center"}
        className='w-[800px] h-[] bg-gray-50 rounded-lg shadow-xl overflow-auto'
      >
        <PageApprovalScreenDailypage/>
      </Modal>
          <div className=' w-full flex flex-row h-[70%]'>
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              tableSelection={true}
              tableSettings={true}
              tableSorting={true}
              selectedIds={daily_expense_table91568Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode}
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
            />
            </div>
    </div>
  )
}

export default Tabledaily_expense_table
