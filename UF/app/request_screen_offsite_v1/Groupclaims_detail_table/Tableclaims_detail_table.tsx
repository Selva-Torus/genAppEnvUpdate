
  //CustomTable
'use client'
import React, { useState,useContext,useEffect } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import { Icon } from '@/components/Icon';
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
let defaultColumns = [
  {
    "id": "claim_detail_id",
    "nodeid": "dcc95d3a8d98427ab13a88f412197d69",
    "name": "Claim Detail ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "expense_category",
    "nodeid": "e0761ba5f7d84c25a2261990627182d4",
    "name": "Category",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "expense_description",
    "nodeid": "ff784d30a9484fd5925508e7ac7dee64",
    "name": "Description",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "expense_date",
    "nodeid": "2c67d9260c71475fb3800bc010ce47c7",
    "name": "Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "expense_amount",
    "nodeid": "b8ac460196b44be5b4449ad9744b97f7",
    "name": "Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  }
] ;
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}

function generateUniqueCode() {
  const timestamp = new Date().getTime() // Current timestamp in milliseconds
  const randomValue = Math.random().toString(36).substring(2, 8) // Random alphanumeric string of length 6
  return `${timestamp}-${randomValue}`
}

const Tableclaims_detail_table = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData,encryptionFlagCompData }: any) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const schemaData :any = [
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
]
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
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Manager": {
    "allowedControls": [],
    "blockedControls": [
      "claim_detail_id",
      "expense_category",
      "expense_description",
      "expense_date",
      "expense_amount"
    ],
    "readOnlyControls": []
  }
};
  const keyset:any=i18n.keyset("language");  
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  let getDataPKey:any="";
  let getDataPTable:any="";
  let code:any;
  let codeExec:any;
  const toast:any=useInfoMsg();
  const routes = useRouter();
  let isGetFormdata = false;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false);
  const [columns,setColumns]=useState<any>([]);
  const [sumValues,setSumValues]=useState<any>({});
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
 /////////////
   //another screen
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps
  const {claim_detail_id97d69, setclaim_detail_id97d69}= useContext(TotalContext) as TotalContextProps
  const {expense_category182d4, setexpense_category182d4}= useContext(TotalContext) as TotalContextProps
  const {expense_descriptiondee64, setexpense_descriptiondee64}= useContext(TotalContext) as TotalContextProps
  const {expense_datee47c7, setexpense_datee47c7}= useContext(TotalContext) as TotalContextProps
  const {expense_amountb97f7, setexpense_amountb97f7}= useContext(TotalContext) as TotalContextProps
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCheckboxChange = (row: { claim_detail_id: any }) => {
    const isSelected = selectedRows.some(
      (selectedRow: { claim_detail_id: any }) => selectedRow.claim_detail_id === row.claim_detail_id
    )

    if (isSelected) {
      setSelectedRows((prevSelected: any) =>
        prevSelected.filter(
          (selectedRow: { claim_detail_id: any }) => selectedRow.claim_detail_id !== row.claim_detail_id
        )
      )
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }

  const GetTableDetails = async () => { 
    let altertColumns:any=[]
    let allSchemas:any[]= schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties
    defaultColumns.map((cols:any)=>{
      let temp:any = cols
      {
        if(securityData[accessProfile].allowedControls.includes(cols.id))
        {
          Object.keys(allSchemas).map((schemaItem:any)=>{
          if(cols.id == schemaItem){
            temp['type']= allSchemas[cols.id].example.toLowerCase()=='string'?"text":allSchemas[cols.id].example.toLowerCase() == 'integer'?'number':allSchemas[cols.id].example.toLowerCase()
            altertColumns.push(temp)
          }
        })
        }
      }
    })
    setColumns(altertColumns) 
  }

  useEffect(()=>{
    GetTableDetails()
  },[claims_detail_tablef8143?.refresh])

  const handleSaveAll= async ()=>{
    let upId:any = ""
    let parentData: any = nullFilter(primaryTableData.parentData)
    let childData: any = []
    let codeExec:any;
    
    claims_detail_tablef8143?.map((item:any)=>{
      childData.push(nullFilter(item))
    })
    try{
      let uf_initiatePf:any
      let te_eventEmitterBody:te_eventEmitterDto
      let primaryKey:any
      let uf_getPFDetails:any
      let uf_ifo:any
      let lockedKeysLength:number
      code="";
      if (code !="" ) {
        let codeStates: any = {}
      codeStates['request_offsite_group']  = request_offsite_group429cb,
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
      codeStates['claims_detail_table']  = claims_detail_tablef8143,
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,
        codeExec = codeExecution(code,codeStates)
      }
      let eventProperty = {
  "id": "d0c7d5b3ef0e4f5aba11c602ceff8143",
  "type": "group",
  "name": "claims_detail_table",
  "sequence": 1,
  "children": [
    {
      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1",
      "type": "eventNode",
      "name": "onSaveAll",
      "sequence": "1.1",
      "children": [
        {
          "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1",
          "eventContext": "riseListen",
          "value": "",
          "type": "handlerNode",
          "name": "getFormData",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "4d39522ee30443598090fe9ac0c429cb.1.1.1.1",
              "type": "screen",
              "name": "Request_Screen_Offsite.v1|Request_Offsite_Group",
              "label": "",
              "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Offsite:AFVK:v1|Request_Offsite_Group",
              "elementType": "group",
              "sequence": "1.1.1.1",
              "children": []
            },
            {
              "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "saveHandler",
              "sequence": "1.1.1.2",
              "children": [
                {
                  "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1",
                  "eventContext": "rise",
                  "value": "",
                  "type": "handlerNode",
                  "name": "infoMsg",
                  "sequence": "1.1.1.2.1",
                  "children": [
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.1",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "clearHandler",
                      "sequence": "1.1.1.2.1.1",
                      "children": [
                        {
                          "id": "4d39522ee30443598090fe9ac0c429cb.1.1.1.2.1.1.1",
                          "type": "group",
                          "name": "Request_Screen_Offsite|Request_Offsite_Group",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Offsite:AFVK:v1|Request_Offsite_Group",
                          "elementType": "group",
                          "sequence": "1.1.1.2.1.1.1",
                          "children": []
                        }
                      ],
                      "hlr": {}
                    },
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.2",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "disableElement",
                      "sequence": "1.1.1.2.1.2",
                      "children": [
                        {
                          "id": "4d39522ee30443598090fe9ac0c429cb|0fc6421d9c204116862cf08d69365b18.1.1.1.2.1.2.1",
                          "value": "",
                          "type": "screen",
                          "name": "Request_Screen_Offsite.v1|Request_Offsite_Group|comments",
                          "label": "|",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Offsite:AFVK:v1|Request_Offsite_Group|comments",
                          "elementType": "textarea",
                          "sequence": "1.1.1.2.1.2.1",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.3",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "refreshElement",
                      "sequence": "1.1.1.2.1.3",
                      "children": [
                        {
                          "id": "0918644520a24e0aa0d1781bb754ffd6.1.1.1.2.1.3.1",
                          "value": "",
                          "type": "screen",
                          "name": "Dashboard_For_User.v1|offsite_expense_table",
                          "label": "Offsite Expenses",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|offsite_expense_table",
                          "elementType": "group",
                          "sequence": "1.1.1.2.1.3.1",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.4",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "refreshElement",
                      "sequence": "1.1.1.2.1.4",
                      "children": [
                        {
                          "id": "0dd5e93ebe734a2da4503278cd0d6690|8e549b5cd83443d6b3bcf55b8f1cd925.1.1.1.2.1.4.1",
                          "value": "",
                          "type": "screen",
                          "name": "Dashboard_For_User.v1|User_Grp|offsiteexpenses",
                          "label": "|Offsite Expenses",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|offsiteexpenses",
                          "elementType": "card",
                          "sequence": "1.1.1.2.1.4.1",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.5",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "refreshElement",
                      "sequence": "1.1.1.2.1.5",
                      "children": [
                        {
                          "id": "0dd5e93ebe734a2da4503278cd0d6690|495711d8ddf44734983661c8f9eee3c0.1.1.1.2.1.5.1",
                          "value": "",
                          "type": "screen",
                          "name": "Dashboard_For_User.v1|User_Grp|pendingcard",
                          "label": "|Pending",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|pendingcard",
                          "elementType": "card",
                          "sequence": "1.1.1.2.1.5.1",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "d0c7d5b3ef0e4f5aba11c602ceff8143.1.1.1.2.1.6",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "refreshElement",
                      "sequence": "1.1.1.2.1.6",
                      "children": [
                        {
                          "id": "0dd5e93ebe734a2da4503278cd0d6690|7d5ecb74896b444e93036544256c5971.1.1.1.2.1.6.1",
                          "value": "",
                          "type": "screen",
                          "name": "Dashboard_For_User.v1|User_Grp|approvedcard",
                          "label": "|Approved",
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|approvedcard",
                          "elementType": "card",
                          "sequence": "1.1.1.2.1.6.1",
                          "children": []
                        }
                      ]
                    }
                  ],
                  "hlr": {
                    "params": [
                      {
                        "name": "message",
                        "_type": "string",
                        "selectionList": [],
                        "value": "Data saved successfully",
                        "enabled": true
                      },
                      {
                        "name": "type",
                        "_type": "select",
                        "selectionList": [
                          "none",
                          "info",
                          "success",
                          "warning",
                          "danger",
                          "utility"
                        ],
                        "value": "success",
                        "enabled": true
                      }
                    ]
                  }
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "primaryKey",
                    "_type": "string",
                    "selectionList": [],
                    "value": "claim_detail_id",
                    "enabled": true
                  },
                  {
                    "name": "relationScope",
                    "_type": "select",
                    "selectionList": [
                      "PARENT_ONLY",
                      "PARENT_AND_CHILDREN",
                      "PARENT_AND_ALL_DESCENDANTS"
                    ],
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "needClearValue",
                    "_type": "boolean",
                    "selectionList": [],
                    "value": true,
                    "enabled": true
                  }
                ]
              },
              "targetKey": [
                "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|d34c2e439a9a40bb8d211e76527c02f0"
              ]
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "parentTable",
                "_type": "string",
                "selectionList": [],
                "value": "claims",
                "enabled": true
              },
              {
                "name": "primaryKey",
                "_type": "string",
                "selectionList": [],
                "value": "claim_id",
                "enabled": true
              }
            ]
          }
        }
      ]
    }
  ]
};
      let eventDetails = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId:string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Offsite:AFVK:v1";
      sourceId+= "|"+"d0c7d5b3ef0e4f5aba11c602ceff8143"
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (eventDetailsArray[k].type != 'group' && eventDetailsArray[k].type != 'screen')
        sourceId += '|' + eventDetailsArray[k].id
        if (
          eventDetailsArray[k]?.type === 'handlerNode' &&
          eventDetailsArray[k]?.name === 'saveHandler' && 
          eventDetailsArray[k]?.eventContext ==="rise"
        ) {
          if (
            eventDetailsArray[k]?.targetKey &&
            eventDetailsArray[k]?.targetKey.length > 0 
          ) {
            uf_getPFDetails= {
              key: eventDetailsArray[k].targetKey[0],
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceId
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceId
            };
          }
        } else if (
          eventDetailsArray[k]?.type === 'handlerNode' &&
          eventDetailsArray[k]?.name === 'updateHandler' && 
          eventDetailsArray[k]?.eventContext ==="rise"
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key: eventDetailsArray[k].targetKey[0],
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceId
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceId
            };
          }
        }
      }

      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
        key:uf_getPFDetails.key,
        sourceId:uf_getPFDetails.sourceId
        }
      if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd
          uf_initiatePfBody["method"] = encryptionMethod
      } 
        uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
          { headers: {
          Authorization: `Bearer ${token}`
          }, })
          if(uf_initiatePf?.data?.error == true){
            toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
            return
          }
    
        } else {
        uf_initiatePf= {
          data:{
            nodeProperty:'',
            eventProperty:''
          }
        }
      }

    
    
    
//getFormData
  parentData = nullFilter(request_offsite_group429cb)
  upId = request_offsite_group429cb?.upId || ""
  parentData = {...parentData,...codeExec}
  getDataPKey='claim_id'
  getDataPTable='claims'
  isGetFormdata = true;

    
    
    // saveHandler
 
  let te_saveBody:te_eventEmitterDto ={
    ...uf_initiatePf.data.nodeProperty}
  let eventData:any = {status:uf_initiatePf.data.eventProperty.sourceStatus,
    created_by:createdBy,
    modified_by:createdBy
  }

   if (uf_getPFDetails.key != undefined) {
    //   const uf_ifoBody:uf_ifoDto={
    //     formData:claims_detail_tableData,
    //     key:uf_getPFDetails.key,
    //     groupId:"d0c7d5b3ef0e4f5aba11c602ceff8143",,
    //     controlId:""d0c7d5b3ef0e4f5aba11c602ceff8143",
    //   }
    //   uf_ifo = await AxiosService.post(
    //    "/UF/ifo",
    //     uf_ifoBody,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   )
    //   if(uf_ifo?.data?.error == true){
    //     toast(uf_ifo?.data?.errorDetails?.message, 'danger')
    //     return
    //   }
    //   te_saveBody.data = {...uf_ifo?.data,...eventData}
    //   te_saveBody.event = uf_initiatePf.data.eventProperty.sourceStatus
    //   te_saveBody.key= te_saveBody.key.slice(0, te_saveBody.key.lastIndexOf(':')) + ':';
    // }
    // else{
    //   te_saveBody.data = {
    //     parentData,
    //     childData
      }
    //te_saveBody.event = uf_initiatePf.data.eventProperty.sourceStatus
    // }
      let filteredData :any=[];
    childData.map((item:any)=>{
      let temp=item;
      delete temp.claim_detail_id;
      filteredData.push(temp)

    })

    te_saveBody.data = filteredData;
      
  te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId;
 // te_saveBody.url = process.env.NEXT_PUBLIC_API_BASE_URL+'/'
  te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status;
  te_saveBody.upId=upId;
  primaryKey = uf_getPFDetails.primaryKey;
  if (encryptionFlagCont) {
      te_saveBody["dpdKey"] = encryptionDpd;
      te_saveBody["method"] = encryptionMethod;
  } 
  const te_save = await AxiosService.post("/te/save",te_saveBody,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    )


if(te_save?.data?.error == true){
  toast(te_save?.data?.errorDetails?.message, 'danger');
  return
}

if (uf_getPFDetails.key != undefined) {
{/* 
let te_updateBody:te_updateDto ={};
te_updateBody.data = [{status:te_save.data.event,'modified_by':createdBy,process_id:te_save.data.upId,...codeExec}]
te_updateBody.upId = te_save.data.upId
te_updateBody.tableName = getDataPTable
te_updateBody.primaryKey = [request_offsite_group429cb?.claim_id]
te_updateBody.url = process.env.NEXT_PUBLIC_API_BASE_URL+'/'
if (encryptionFlagCont) {
  te_updateBody["dpdKey"] = encryptionDpd
  te_updateBody["method"] = encryptionMethod
} 

const te_update:any=await AxiosService.post("/te/update",te_updateBody,{
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

if (te_update && te_update?.status) {
  toast('data updated successfully', 'success')
}

let tempkeys: any = {}
Object.keys(request_offsite_group429cb).map((item: any) => {
  tempkeys[item] = ''
})
setrequest_offsite_group429cb(tempkeys)
setclaims_detail_tablef8143([])

if(te_update?.data?.error == true){
  toast(te_update?.data?.errorDetails?.message, 'danger')
  return
}
*/}
}
let keys: any = {}
Object.keys(request_offsite_group429cb).map((item: any) => {
  keys[item] = ''
})
setrequest_offsite_group429cb(keys)
    
    
    
    
    
    
    
    
    
    
    
    
    
  await eventEmitter()
  // infoMsg
  toast('Data saved successfully', 'success')
  // clearHandler riseListen
  // for group
  Object.keys(request_offsite_group429cb).map((keys:any)=>{         
    request_offsite_group429cb[keys]="";
  })
  setrequest_offsite_group429cb({...request_offsite_group429cb});
  setcomments65b18((prev: any) => ({ ...prev, isDisabled: true }))
        // refreshElement
        // for group
        setoffsite_expense_table4ffd6Props((pre:any)=>({...pre,refresh:!pre?.refresh}))
        // refreshElement
       // for controller
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690
      delete temp["offsiteexpenses"]
      setuser_grpd6690(temp)
    }
    setoffsiteexpensescd925((pre:any)=>({...pre,refresh:!pre?.refresh}))
    handleDfdRefresh("offsiteexpensescd925",1,10,encryptionFlagCompData)
        // refreshElement
       // for controller
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690
      delete temp["pendingcard"]
      setuser_grpd6690(temp)
    }
    setpendingcardee3c0((pre:any)=>({...pre,refresh:!pre?.refresh}))
    handleDfdRefresh("pendingcardee3c0",1,10,encryptionFlagCompData)
        // refreshElement
       // for controller
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690
      delete temp["approvedcard"]
      setuser_grpd6690(temp)
    }
    setapprovedcardc5971((pre:any)=>({...pre,refresh:!pre?.refresh}))
    handleDfdRefresh("approvedcardc5971",1,10,encryptionFlagCompData)

        setRefetch((pre: any) => !pre)    
        setclaims_detail_tablef8143([])

    }catch(err:any){
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');
      return
    }
}

  async function eventEmitter(){
        return
    if (Array.isArray(eventEmitterData) || eventEmitterData.length > 0) {
      // Execute all requests in parallel using forEach
    const requests = eventEmitterData.map(async (element:any) => {
      try {
        if (encryptionFlagCont) {
          element["dpdKey"] = encryptionDpd
          element["method"] = encryptionMethod
        } 
        const te_refresh = await AxiosService.post("/te/eventEmitter", element, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (te_refresh?.data?.error === true) {
          toast(te_refresh?.data?.errorDetails?.message, 'danger');
        }
      } catch (error) {
        console.error("Error in eventEmitter:", error);
      }
    });
    await Promise.all(requests);
    }
  }

  async function handleAllSave(){
      await handleSaveAll()
  }

  async function handleConfirmOnSaveAll(){
  } 

  const handleSelectAll = (event: { target: { checked: any } }) => {
    if (event.target.checked) {
      setSelectedRows(claims_detail_tablef8143) // Select all rows
    } else {
      setSelectedRows([]) // Deselect all rows
    }
  }

  const onRowDataChange = (
    rowIndex: number,
    newData: any,
    type: string,
    colunm?: any
  ) => {
    const updatedData = claims_detail_tablef8143?.map((item: any) => {
      if (item.claim_detail_id === rowIndex) {
        if (type === 'number') {
          if(newData.value.length > 0 && newData.value.startsWith('0')){
            newData.value = newData.value.slice(1);
          } 
          return {
            ...item,
            [newData.name]: +newData.value
          }
        } 
        else if (type == 'date') {
          const selectedDate = new Date(newData)
          const IST_OFFSET = 5.5 * 60 * 60 * 1000
          const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET)
          const isoDate = indiaTime.toISOString()
          return {
            ...item,
            [colunm]: isoDate
          }
        } 
        else {
          return {
            ...item,
            [newData.name]: newData.value
          }
        }
      }
      return item
    })
    setclaims_detail_tablef8143(updatedData)
  }
  
  const onDelete = (Indx: number) => {
    const updatedData = claims_detail_tablef8143.filter((item: any) => {
      if (item.claim_detail_id != Indx) {
        return item
      }
    })
    setclaims_detail_tablef8143(updatedData)
  }

  function addRow() {
    let newRow: any = {}
    columns.forEach((item:any) => {
      if (item.id === 'claim_detail_id') {
        newRow['claim_detail_id'] = generateUniqueCode()
      } else if (item.type === 'number') {
        newRow[item.id] = 0
      } else if (item.type === 'text') {
        newRow[item.id] = '' 
      } else if (item.type === 'date') {
        newRow[item.id] = null
      } else newRow[item.id] = ''
    })
    newRow['claim_id'] = request_offsite_group429cb.claim_id
    setclaims_detail_tablef8143([newRow, ...claims_detail_tablef8143])
  }
  useEffect(()=>{
    if(Array.isArray(claims_detail_tablef8143)&&claims_detail_tablef8143.length >= 0)
      someRecords()
  },[claims_detail_tablef8143])

  function someRecords(){
    let sumableColums:any=[]
    let sumableColumsAndName:any=[]
    columns.map((item:any)=>{
        if(item.type=='number' && 'claim_detail_id' != item.id && item.id && item?.isSumable==true)
        {
          sumableColumsAndName.push({id:item.id,name:item?.name})
          sumableColums.push(item.id)
        } 
    })
    let ans:any={}
    claims_detail_tablef8143?.map((item:any)=>{
        sumableColums.map((cols:any)=>{
            if(ans.hasOwnProperty(cols))
                ans={ ...ans,[cols]:item[cols]+ans[cols]}
            else{
                ans={ ...ans,[cols]:item[cols]}
            }
        })
    })
    sumableColumsAndName.map((item:any)=>{
      if(item?.id==item?.name)
      {
        ans[item?.name] =structuredClone(ans[item.id])
      }else
      {
        ans[item?.name] =structuredClone(ans[item.id])
        delete ans[item.id]
      }
     })
     setSumValues(ans)
  }

  useEffect(() => {
    setclaims_detail_tablef8143([])
  }, [primaryTableData.value])

  if (claims_detail_tablef8143?.isHidden) {
    return <></>
  }

  return (
     <div className="w-full h-full">
            <div className='overflow-x-auto'>
              <div className='flex justify-end p-2'>
                <Button
                  onClick={addRow}
                  className='!w-[50px] !h-[30px]'
                  icon='IoMdAdd'
                  iconDisplay='Icon only'
                  pin= 'circle-circle'
                />
              </div>
              <table className='min-w-full rounded-md border border-gray-200 bg-white'>
                <thead>
                  <tr className='border border-gray-200 text-sm leading-normal text-gray-600'>
                    {/* <th className='px-3 py-2 text-left'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        onChange={handleSelectAll}
                      />
                    </th> */}
                    {columns.map(
                      (column: any) =>
                        column?.id != 'claim_detail_id' && (
                          <th key={column.id} className='px-3 py-1 text-left'>
                            {keyset(column.name)}
                          </th>
                        )
                    )}
                    <th className="px-4 py-3 text-end pr-[5%] ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm font-light text-gray-600'>
                  {claims_detail_tablef8143?.map((row: any) => {
                    const isSelected = selectedRows.some(
                      (selectedRow: { claim_detail_id: any }) => selectedRow.claim_detail_id === row.claim_detail_id
                    )
                    return (
                      <tr
                        key={row.claim_detail_id}
                        className={clsx("border-b border-gray-200",
                          isSelected ? 'bg-orange-200' : 'hover:bg-gray-100'
                        )}
                      >
                        {columns.map(
                          (column: any) =>
                            column?.id != 'claim_detail_id' && column?.id != primaryTableData.primaryKey && (
                              <td key={column.id} className='px-3 py-1 text-left'>
                                {column.type == 'date' ? (
                                  row[column.id] != null ? (
                                    <DatePicker
           
                                      value={row[column.id]}
                                      onUpdate={event => {
                                        onRowDataChange(
                                          row['claim_detail_id'],
                                          event,
                                          column.type,
                                          column.id
                                        )
                                      }}
                                    />
                                  ) : (
                                    <DatePicker
           
                                      readOnly= {claims_detail_tablef8143?.isDisabled ? true : false}
                                      onUpdate={event => {
                                        onRowDataChange(
                                          row['claim_detail_id'],
                                          event,
                                          column.type,
                                          column.id
                                        )
                                      }}
                                    />
                                  )
                                  ) : (
                                  <TextInput
                                    value={row[column.id]}
                                    name={column.id}
                                    type={column.type}
                                    view='clear'
                                    pin='brick-brick'
                                    readOnly= {claims_detail_tablef8143?.isDisabled ? true : false}
                                    onChange={event => {
                                      onRowDataChange(
                                        row['claim_detail_id'],
                                        event.target,
                                        column.type
                                      )
                                    }}
                                  />
                                )} 
                              </td>
                            )
                        )}
                        <td className='text-end w-[10%]'>
                          <Button  
                            className='!w-[30px] !h-[30px]'
                            onClick={() => onDelete(row.claim_detail_id)}
                            icon='MdClose'
                            iconDisplay='Icon only'
                            >
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {claims_detail_tablef8143?.length == 0 && (
                <div className='flex w-full items-center justify-center p-2'>
                  {keyset("no data")}
                </div>
              )}
              {Object.keys(sumValues).map((items:any,id:any)=>{

                return(
        
                  <div key={id} className="mt-6 flex items-center justify-between border-t pt-4">
                    <span className="text-base font-medium text-gray-900">Total {items}</span>
                    <span className="text-base font-semibold text-gray-900">₹ {sumValues[items]||""}</span>
                  </div>
                )
              })}
              <div className='flex justify-end p-2'>
                <Button
                  className='!w-[100px] !h-[30px]'
                  pin='circle-circle'
                  contentAlign='center'
                  onClick={handleAllSave}
                >
                {keyset("Save All")}

                </Button>
              </div>
            </div>
    </div>
  )
}

export default Tableclaims_detail_table;
