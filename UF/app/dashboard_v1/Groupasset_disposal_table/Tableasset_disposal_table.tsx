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
    "id": "asset_name",
    "nodeid": "a29226b1141b42dabf13220fec9251dd",
    "name": "Asset",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "asset"
  },
  {
    "id": "disposal_method",
    "nodeid": "ccbc3592444f4a0f87be4a4e9cc84ead",
    "name": "Method",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "method"
  },
  {
    "id": "reason",
    "nodeid": "7df2536654f744b1a55834923d9441ae",
    "name": "Reason",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "reason"
  },
  {
    "id": "current_value",
    "nodeid": "eb20065fcd5f4e2aa7ea0275a10047d6",
    "name": "Book Value",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "book_value"
  },
  {
    "id": "data_wiped",
    "nodeid": "f4892cf0c51948e18e39d755b839be82",
    "name": "Data Wiped",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "data_wiped"
  },
  {
    "id": "status",
    "nodeid": "f53984b4b9da4dd593364f5493700e2a",
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
const Tableasset_disposal_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {assetdasboard_v1, setassetdasboard_v1} = useContext(TotalContext) as TotalContextProps;
  const {assetdasboard_v1Props, setassetdasboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Maker": {
    "allowedControls": [
      "asset_name",
      "disposal_method",
      "reason",
      "current_value",
      "data_wiped",
      "status"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "asset_name",
      "disposal_method",
      "reason",
      "current_value",
      "data_wiped",
      "status"
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
  const {asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps  
  const {asset_dashboard_group4d6cbProps, setasset_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps  
  const {total_asset_group69aa9, settotal_asset_group69aa9}= useContext(TotalContext) as TotalContextProps  
  const {total_asset_group69aa9Props, settotal_asset_group69aa9Props}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_due_group704ca, setmaintenance_due_group704ca}= useContext(TotalContext) as TotalContextProps  
  const {maintenance_due_group704caProps, setmaintenance_due_group704caProps}= useContext(TotalContext) as TotalContextProps  
  const {warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4}= useContext(TotalContext) as TotalContextProps  
  const {warranty_expiring_groupb5bd4Props, setwarranty_expiring_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps  
  const {software_licenses_group4beb5, setsoftware_licenses_group4beb5}= useContext(TotalContext) as TotalContextProps  
  const {software_licenses_group4beb5Props, setsoftware_licenses_group4beb5Props}= useContext(TotalContext) as TotalContextProps  
  const {pending_disposal_group2580d, setpending_disposal_group2580d}= useContext(TotalContext) as TotalContextProps  
  const {pending_disposal_group2580dProps, setpending_disposal_group2580dProps}= useContext(TotalContext) as TotalContextProps  
  const {table_group94010, settable_group94010}= useContext(TotalContext) as TotalContextProps  
  const {table_group94010Props, settable_group94010Props}= useContext(TotalContext) as TotalContextProps  
  const {subscreen99589, setsubscreen99589}= useContext(TotalContext) as TotalContextProps  
  const {subscreen99589Props, setsubscreen99589Props}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_table_group6fffa, setasset_table_group6fffa}= useContext(TotalContext) as TotalContextProps  
  const {asset_table_group6fffaProps, setasset_table_group6fffaProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_table6082a, setasset_table6082a}= useContext(TotalContext) as TotalContextProps  
  const {asset_table6082aProps, setasset_table6082aProps}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b}= useContext(TotalContext) as TotalContextProps  
  const {asset_maintenance_table_groupe042bProps, setasset_maintenance_table_groupe042bProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1}= useContext(TotalContext) as TotalContextProps  
  const {asset_maintenance_table6cdf1Props, setasset_maintenance_table6cdf1Props}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553}= useContext(TotalContext) as TotalContextProps  
  const {asset_software_licenses_table_groupcb553Props, setasset_software_licenses_table_groupcb553Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_software_licenses_table13758, setasset_software_licenses_table13758}= useContext(TotalContext) as TotalContextProps  
  const {asset_software_licenses_table13758Props, setasset_software_licenses_table13758Props}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_disposal_table_group329e9, setasset_disposal_table_group329e9}= useContext(TotalContext) as TotalContextProps  
  const {asset_disposal_table_group329e9Props, setasset_disposal_table_group329e9Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_disposal_table440cd, setasset_disposal_table440cd}= useContext(TotalContext) as TotalContextProps  
  const {asset_disposal_table440cdProps, setasset_disposal_table440cdProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_name251dd, setasset_name251dd}= useContext(TotalContext) as TotalContextProps  
  const {disposal_method84ead, setdisposal_method84ead}= useContext(TotalContext) as TotalContextProps  
  const {reason441ae, setreason441ae}= useContext(TotalContext) as TotalContextProps  
  const {current_value047d6, setcurrent_value047d6}= useContext(TotalContext) as TotalContextProps  
  const {data_wiped9be82, setdata_wiped9be82}= useContext(TotalContext) as TotalContextProps  
  const {status00e2a, setstatus00e2a}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7}= useContext(TotalContext) as TotalContextProps  
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props}= useContext(TotalContext) as TotalContextProps  
  const {warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1}= useContext(TotalContext) as TotalContextProps  
  const {warrenty_expiring_table_group116d1Props, setwarrenty_expiring_table_group116d1Props}= useContext(TotalContext) as TotalContextProps  
  const {warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168}= useContext(TotalContext) as TotalContextProps  
  const {warrenty_expiring_tablee3168Props, setwarrenty_expiring_tablee3168Props}= useContext(TotalContext) as TotalContextProps  
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
        "8f7a89b6389644efbec4f443f3f440cd",
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
    
        fetchData(orchestrationData?.data?.action?.pagination?.page,orchestrationData?.data?.action?.pagination?.count,{},{dfKey,dfdType},Object.keys(orchestrationData?.data?.rule).length!=0 && orchestrationData?.data?.rule?.nodes?.length!=0 && orchestrationData?.data?.rule?.edges?.length!=0  ? true:false)
  }
    } 
  }
  const [SearchParams,setSearchParams] = useState<any>({})

    const setLockMode=async(ids:any)=>{
      ///////////////////////////

    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['asset_dashboard_group'] = asset_dashboard_group4d6cb,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4d6cb,
        codeStates['asset_dashboard_group4d6cb'] = asset_dashboard_group4d6cbProps,
        codeStates['setasset_dashboard_group4d6cb'] = setasset_dashboard_group4d6cbProps,
        codeStates['total_asset_group'] = total_asset_group69aa9,
        codeStates['settotal_asset_group'] = settotal_asset_group69aa9,
        codeStates['total_asset_group69aa9'] = total_asset_group69aa9Props,
        codeStates['settotal_asset_group69aa9'] = settotal_asset_group69aa9Props,
        codeStates['maintenance_due_group'] = maintenance_due_group704ca,
        codeStates['setmaintenance_due_group'] = setmaintenance_due_group704ca,
        codeStates['maintenance_due_group704ca'] = maintenance_due_group704caProps,
        codeStates['setmaintenance_due_group704ca'] = setmaintenance_due_group704caProps,
        codeStates['warranty_expiring_group'] = warranty_expiring_groupb5bd4,
        codeStates['setwarranty_expiring_group'] = setwarranty_expiring_groupb5bd4,
        codeStates['warranty_expiring_groupb5bd4'] = warranty_expiring_groupb5bd4Props,
        codeStates['setwarranty_expiring_groupb5bd4'] = setwarranty_expiring_groupb5bd4Props,
        codeStates['software_licenses_group'] = software_licenses_group4beb5,
        codeStates['setsoftware_licenses_group'] = setsoftware_licenses_group4beb5,
        codeStates['software_licenses_group4beb5'] = software_licenses_group4beb5Props,
        codeStates['setsoftware_licenses_group4beb5'] = setsoftware_licenses_group4beb5Props,
        codeStates['pending_disposal_group'] = pending_disposal_group2580d,
        codeStates['setpending_disposal_group'] = setpending_disposal_group2580d,
        codeStates['pending_disposal_group2580d'] = pending_disposal_group2580dProps,
        codeStates['setpending_disposal_group2580d'] = setpending_disposal_group2580dProps,
        codeStates['table_group'] = table_group94010,
        codeStates['settable_group'] = settable_group94010,
        codeStates['table_group94010'] = table_group94010Props,
        codeStates['settable_group94010'] = settable_group94010Props,
        codeStates['subscreen'] = subscreen99589,
        codeStates['setsubscreen'] = setsubscreen99589,
        codeStates['subscreen99589'] = subscreen99589Props,
        codeStates['setsubscreen99589'] = setsubscreen99589Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['asset_table_group'] = asset_table_group6fffa,
        codeStates['setasset_table_group'] = setasset_table_group6fffa,
        codeStates['asset_table_group6fffa'] = asset_table_group6fffaProps,
        codeStates['setasset_table_group6fffa'] = setasset_table_group6fffaProps,
        codeStates['asset_table'] = asset_table6082a,
        codeStates['setasset_table'] = setasset_table6082a,
        codeStates['asset_table6082a'] = asset_table6082aProps,
        codeStates['setasset_table6082a'] = setasset_table6082aProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['asset_maintenance_table_group'] = asset_maintenance_table_groupe042b,
        codeStates['setasset_maintenance_table_group'] = setasset_maintenance_table_groupe042b,
        codeStates['asset_maintenance_table_groupe042b'] = asset_maintenance_table_groupe042bProps,
        codeStates['setasset_maintenance_table_groupe042b'] = setasset_maintenance_table_groupe042bProps,
        codeStates['asset_maintenance_table'] = asset_maintenance_table6cdf1,
        codeStates['setasset_maintenance_table'] = setasset_maintenance_table6cdf1,
        codeStates['asset_maintenance_table6cdf1'] = asset_maintenance_table6cdf1Props,
        codeStates['setasset_maintenance_table6cdf1'] = setasset_maintenance_table6cdf1Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['asset_software_licenses_table_group'] = asset_software_licenses_table_groupcb553,
        codeStates['setasset_software_licenses_table_group'] = setasset_software_licenses_table_groupcb553,
        codeStates['asset_software_licenses_table_groupcb553'] = asset_software_licenses_table_groupcb553Props,
        codeStates['setasset_software_licenses_table_groupcb553'] = setasset_software_licenses_table_groupcb553Props,
        codeStates['asset_software_licenses_table'] = asset_software_licenses_table13758,
        codeStates['setasset_software_licenses_table'] = setasset_software_licenses_table13758,
        codeStates['asset_software_licenses_table13758'] = asset_software_licenses_table13758Props,
        codeStates['setasset_software_licenses_table13758'] = setasset_software_licenses_table13758Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['asset_disposal_table_group'] = asset_disposal_table_group329e9,
        codeStates['setasset_disposal_table_group'] = setasset_disposal_table_group329e9,
        codeStates['asset_disposal_table_group329e9'] = asset_disposal_table_group329e9Props,
        codeStates['setasset_disposal_table_group329e9'] = setasset_disposal_table_group329e9Props,
        codeStates['asset_disposal_table'] = asset_disposal_table440cd,
        codeStates['setasset_disposal_table'] = setasset_disposal_table440cd,
        codeStates['asset_disposal_table440cd'] = asset_disposal_table440cdProps,
        codeStates['setasset_disposal_table440cd'] = setasset_disposal_table440cdProps,
        codeStates['asset_name'] = asset_name251dd,
        codeStates['setasset_name'] = setasset_name251dd,
        codeStates['disposal_method'] = disposal_method84ead,
        codeStates['setdisposal_method'] = setdisposal_method84ead,
        codeStates['reason'] = reason441ae,
        codeStates['setreason'] = setreason441ae,
        codeStates['current_value'] = current_value047d6,
        codeStates['setcurrent_value'] = setcurrent_value047d6,
        codeStates['data_wiped'] = data_wiped9be82,
        codeStates['setdata_wiped'] = setdata_wiped9be82,
        codeStates['status'] = status00e2a,
        codeStates['setstatus'] = setstatus00e2a,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['warrenty_expiring_table_group'] = warrenty_expiring_table_group116d1,
        codeStates['setwarrenty_expiring_table_group'] = setwarrenty_expiring_table_group116d1,
        codeStates['warrenty_expiring_table_group116d1'] = warrenty_expiring_table_group116d1Props,
        codeStates['setwarrenty_expiring_table_group116d1'] = setwarrenty_expiring_table_group116d1Props,
        codeStates['warrenty_expiring_table'] = warrenty_expiring_tablee3168,
        codeStates['setwarrenty_expiring_table'] = setwarrenty_expiring_tablee3168,
        codeStates['warrenty_expiring_tablee3168'] = warrenty_expiring_tablee3168Props,
        codeStates['setwarrenty_expiring_tablee3168'] = setwarrenty_expiring_tablee3168Props,
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
    setasset_disposal_table440cdProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setasset_disposal_table440cdProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false){
    let filterData :any[] =[];
    if(assetdasboard_v1Props.length > 0){
      for(let i=0;i< assetdasboard_v1Props.length;i++){
        if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1"){
          // delete assetdasboard_v1Props[i].DFDkey;
          let temp=structuredClone(assetdasboard_v1Props[i])
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
                ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1:UO', 
                nodeId: '8f7a89b6389644efbec4f443f3f440cd',
                elementId: '8f7a89b6389644efbec4f443f3f440cd'
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
          setasset_disposal_table440cd([])
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
            ufKey:'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1:UO', 
            nodeId: '8f7a89b6389644efbec4f443f3f440cd',
            elementId: '8f7a89b6389644efbec4f443f3f440cd'
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
          setasset_disposal_table440cd([])
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
      //   key: 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"disposal_id"
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
        
        if ( asset_disposal_table440cdProps?.presetValues&&Object.keys(asset_disposal_table440cdProps?.presetValues).length > 0) {
          filtertedData = [asset_disposal_table440cdProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setasset_disposal_table440cd(api_pagination?.data?.records||[])
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

    if (asset_disposal_table440cdProps.filterInitalLoad) return;

    const filterControllers = asset_disposal_table440cdProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['asset_disposal_table440cd']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['asset_disposal_table440cd']).filter((k: string) => jsonEntry['asset_disposal_table440cd'][k] === false)
      : [];
    const allReady = requiredKeys.length > 0 &&
                    requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setasset_disposal_table440cdProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(asset_disposal_table440cdProps.filterProps);

  }, [
    asset_disposal_table440cdProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!asset_disposal_table440cdProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(asset_disposal_table440cdProps.filterProps);
  }, [
    asset_disposal_table440cdProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(asset_disposal_table440cdProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(asset_disposal_table440cdProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [asset_disposal_table440cdProps.searchFilter])

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
    if (asset_disposal_table440cdProps?.clearData === true) {
      setasset_disposal_table440cd([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setasset_disposal_table440cdProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [asset_disposal_table440cdProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(assetdasboard_v1Props.length > 0){
        for(let i=0;i< assetdasboard_v1Props.length;i++){
          if(assetdasboard_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1"){
            let temp=structuredClone(assetdasboard_v1Props[i])
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
    setasset_disposal_table440cdProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [asset_disposal_table440cdProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = asset_disposal_table440cdProps?.selectedIds[asset_disposal_table440cdProps?.selectedIds?.length-1]
    if(Array.isArray(asset_disposal_table440cd) && asset_disposal_table440cd.length>0)
    {
      let data = asset_disposal_table440cd[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "disposal_id",
        value: data["disposal_id"],
        parentData: data
      })
    }
  }

  useEffect(() => {
    if (asset_disposal_table440cdProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (asset_disposal_table440cdProps?.selectedIds?.length == 0){
      handleOnRowClick({},asset_disposal_table440cdProps?.selectedIds)
    }
  }, [asset_disposal_table440cdProps?.selectedIds])


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
      if(asset_disposal_table440cd?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&asset_disposal_table440cd?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](asset_disposal_table440cd?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: asset_disposal_table440cd?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&asset_disposal_table440cd?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](asset_disposal_table440cd?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: asset_disposal_table440cd?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(asset_disposal_table440cd?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&asset_disposal_table440cd?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](asset_disposal_table440cd?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: asset_disposal_table440cd?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&asset_disposal_table440cd?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](asset_disposal_table440cd?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: asset_disposal_table440cd?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }
  if (asset_disposal_table440cd?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"8f7a89b6389644efbec4f443f3f440cd"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              selectedIds={asset_disposal_table440cdProps?.selectedIds}  
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

export default Tableasset_disposal_table
