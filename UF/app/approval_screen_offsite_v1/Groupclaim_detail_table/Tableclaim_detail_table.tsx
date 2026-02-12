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


let colourIndicatorCols:any= [] ;
let defaultColumns = [
  {
    "id": "expense_category",
    "nodeid": "a03a600b72ad4f9b89b59a3c7f571ccd",
    "name": "Category",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_category"
  },
  {
    "id": "expense_description",
    "nodeid": "d6018c73688e4466a7642a3baf984301",
    "name": "Description",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_description"
  },
  {
    "id": "expense_date",
    "nodeid": "bf2e97a8938f4d42bee4a5e0daf2649c",
    "name": "Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_date"
  },
  {
    "id": "expense_amount",
    "nodeid": "fe219ca2a7b34805b2b71798a9b6b94f",
    "name": "Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "expense_amount"
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
const Tableclaim_detail_table = ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData }: any)=>{
  const token: string | any = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ]
  },
  "Employee": {
    "allowedControls": [],
    "blockedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "blockedControls": [],
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
  const [DFkeyAndRule, setDFkeyAndRule] = React.useState({
    isRulePresent:false,
    dfKey:"",
    dfdType:""
  })
 /////////////
   //another screen
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps  
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps  
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps  
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps  
  const {claim_detail_idcd216, setclaim_detail_idcd216}= useContext(TotalContext) as TotalContextProps  
  const {expense_category71ccd, setexpense_category71ccd}= useContext(TotalContext) as TotalContextProps  
  const {expense_description84301, setexpense_description84301}= useContext(TotalContext) as TotalContextProps  
  const {expense_date2649c, setexpense_date2649c}= useContext(TotalContext) as TotalContextProps  
  const {expense_amount6b94f, setexpense_amount6b94f}= useContext(TotalContext) as TotalContextProps  
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
    "elementname": "claim_detail_id",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1|c135d52beead4bd78db52f5d04e769c9|items.properties.claim_detail_id",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|9506371dc6dd46838910363c4b51835f|01ca5d9f80d449339e476df5acdcd216"
  },
  {
    "elementname": "expense_category",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1|c135d52beead4bd78db52f5d04e769c9|items.properties.expense_category",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|9506371dc6dd46838910363c4b51835f|a03a600b72ad4f9b89b59a3c7f571ccd"
  },
  {
    "elementname": "expense_description",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1|c135d52beead4bd78db52f5d04e769c9|items.properties.expense_description",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|9506371dc6dd46838910363c4b51835f|d6018c73688e4466a7642a3baf984301"
  },
  {
    "elementname": "expense_date",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1|c135d52beead4bd78db52f5d04e769c9|items.properties.expense_date",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|9506371dc6dd46838910363c4b51835f|bf2e97a8938f4d42bee4a5e0daf2649c"
  },
  {
    "elementname": "expense_amount",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1|c135d52beead4bd78db52f5d04e769c9|items.properties.expense_amount",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|9506371dc6dd46838910363c4b51835f|fe219ca2a7b34805b2b71798a9b6b94f"
  }
];
    schemaDataDFO = [
  {
    "nodeId": "0aa1e64606d941eba6aa4d3de3db20ee",
    "nodeName": "claims_detail",
    "nodeType": "apinode",
    "schema": {
      "description": "Read all the records from the claims_detail table",
      "operationId": "claims_detailController_findAll",
      "parameters": [
        {
          "name": "trs_created_date",
          "required": true,
          "in": "query",
          "schema": {
            "format": "date-time",
            "type": "string"
          }
        },
        {
          "name": "trs_created_by",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_modified_date",
          "required": true,
          "in": "query",
          "schema": {
            "format": "date-time",
            "type": "string"
          }
        },
        {
          "name": "trs_modified_by",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_next_status",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_status",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_process_id",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_access_profile",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_org_grp_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_org_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_role_grp_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_role_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_ps_grp_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_ps_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_sub_org_grp_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "trs_sub_org_code",
          "required": true,
          "in": "query",
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "claim_detail_id": {
                      "type": "number",
                      "example": "number"
                    },
                    "expense_category": {
                      "type": "string",
                      "example": "string"
                    },
                    "expense_description": {
                      "type": "string",
                      "example": "string"
                    },
                    "expense_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "date"
                    },
                    "expense_amount": {
                      "type": "number",
                      "example": "number"
                    },
                    "name": {
                      "type": "string",
                      "example": "string"
                    },
                    "attachment": {
                      "type": "string",
                      "example": "string"
                    },
                    "claim_category": {
                      "type": "string",
                      "example": "string"
                    },
                    "claim_id": {
                      "type": "number"
                    },
                    "trs_created_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_created_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_modified_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_modified_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_next_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_process_id": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_access_profile": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_sub_org_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_sub_org_grp_code": {
                      "type": "string",
                      "example": "string"
                    }
                  },
                  "required": [
                    "claim_detail_id",
                    "expense_category",
                    "expense_description",
                    "expense_date",
                    "expense_amount",
                    "name",
                    "attachment",
                    "claim_category",
                    "claim_id",
                    "trs_created_date",
                    "trs_created_by",
                    "trs_modified_date",
                    "trs_modified_by",
                    "trs_status",
                    "trs_next_status",
                    "trs_process_id",
                    "trs_access_profile",
                    "trs_org_grp_code",
                    "trs_org_code",
                    "trs_role_grp_code",
                    "trs_role_code",
                    "trs_ps_grp_code",
                    "trs_ps_code",
                    "trs_sub_org_code",
                    "trs_sub_org_grp_code"
                  ]
                }
              }
            }
          }
        }
      },
      "security": [
        {
          "JWT-auth": []
        }
      ],
      "summary": "Read all the records",
      "tags": [
        "ERD API"
      ]
    }
  },
  {
    "nodeId": "c135d52beead4bd78db52f5d04e769c9",
    "nodeName": "claims_detail_ds",
    "nodeType": "datasetschemanode",
    "schema": {
      "title": "Generated schema for Root",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "claim_detail_id": {
            "type": "string"
          },
          "expense_category": {
            "type": "string"
          },
          "expense_description": {
            "type": "string"
          },
          "expense_date": {
            "type": "string"
          },
          "expense_amount": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "attachment": {
            "type": "string"
          },
          "claim_category": {
            "type": "string"
          },
          "claim_id": {
            "type": "number"
          },
          "trs_creator_email": {
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
          "trs_status": {
            "type": "string"
          },
          "trs_next_status": {
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
          "trs_sub_org_code": {
            "type": "string"
          },
          "trs_sub_org_grp_code": {
            "type": "string"
          }
        },
        "required": [
          "claim_detail_id",
          "expense_category",
          "expense_description",
          "expense_date",
          "expense_amount",
          "name",
          "attachment",
          "claim_category",
          "claim_id",
          "trs_creator_email",
          "trs_created_date",
          "trs_created_by",
          "trs_modified_date",
          "trs_modified_by",
          "trs_status",
          "trs_next_status",
          "trs_process_id",
          "trs_access_profile",
          "trs_org_grp_code",
          "trs_org_code",
          "trs_role_grp_code",
          "trs_role_code",
          "trs_ps_grp_code",
          "trs_ps_code",
          "trs_sub_org_code",
          "trs_sub_org_grp_code"
        ]
      }
    }
  }
];
    mappperNodeId = "c135d52beead4bd78db52f5d04e769c9";
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
        isRulePresent:false,
        dfKey:"CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1:",
        dfdType:""
    }))

    dfKey = "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims_detail:AFVK:v1:"
    dfdType =""
    
    fetchData(1,10,{},{dfKey,dfdType},false,false)
  }

  const [SearchParams,setSearchParams] = useState<any>({})

    const setLockMode=async(ids:any)=>{
      ///////////////////////////

  }
  const [selectedPaginationData, setSelectedPaginationData] = useState<any[]>(
      []
    )
  const [settings, setSettings] = useState<any>();
  const handleUpdate = (page:any, pageSize:any) =>{
    let searchParams:any = nullFilter(SearchParams);
    setclaim_detail_table1835fProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setclaim_detail_table1835fProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any) {
    if(isRulePresent==undefined)
      isRulePresent=DFkeyAndRule?.isRulePresent||false
    if(searchFilterFlag===true){
      searchParams={}
    }
      searchParams={...searchParams,["claim_id"]:claim_detail_table1835fProps?.presetValues?.claim_id}
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {
    if(!claim_detail_table1835fProps?.presetValues || Object.keys(claim_detail_table1835fProps?.presetValues).length === 0){
      setAllDataObject([])
      return
    }

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
          setclaim_detail_table1835f([])
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
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1:UO', 
            nodeId: '9506371dc6dd46838910363c4b51835f',
            elementId: '9506371dc6dd46838910363c4b51835f'
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
          setclaim_detail_table1835f([])
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
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"claim_detail_id"
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

          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setclaim_detail_table1835f(uf_paginationDataFilter.data||[])
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
    if(!Array.isArray(claim_detail_table1835f))
    {
      GetTableDetails()
    }
  }, [claim_detail_table1835f])

  useEffect(() => {
    GetTableDetails()
  }, [])
  useEffect(() => {
    if (prevRefreshRef.current) {
      UpdatedDataHandle(claim_detail_table1835fProps.filterProps)
    }else 
      prevRefreshRef.current= true
  }, [claim_detail_table1835fProps.filterProps])

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
    setclaim_detail_table1835f([])
    setclaim_detail_table1835fProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [claim_detail_table1835fProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = claim_detail_table1835fProps?.selectedIds[claim_detail_table1835fProps?.selectedIds?.length-1]
    if(Array.isArray(claim_detail_table1835f) && claim_detail_table1835f.length>0)
    {
      let data = claim_detail_table1835f[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "claim_detail_id",
        value: data["claim_detail_id"],
        parentData: data
      })
    }
  }

  useEffect(() => {
    if (claim_detail_table1835fProps?.selectedIds?.length != 0) handlePrimaryTable()
  }, [claim_detail_table1835fProps?.selectedIds])



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

  if (claim_detail_table1835f?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div className=' w-full flex flex-row h-[70%]'>
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              selectedIds={claim_detail_table1835fProps?.selectedIds}  
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
            />
            </div>
    </div>
  )
}

export default Tableclaim_detail_table
