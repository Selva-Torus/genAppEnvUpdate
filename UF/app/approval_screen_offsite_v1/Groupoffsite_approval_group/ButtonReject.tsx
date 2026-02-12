'use client'

import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { XMLParser } from 'fast-xml-parser'


    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const ButtonReject =  ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
  const token:string = getCookie('token');
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj : any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();

  
  let code : string = "";
  let rule : any = {};
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const savedData=useRef<Record<string, any>>({})
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function = useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData :any = {"lockMode":"","name":"","ttl":""}
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    
 /////////////
   //another screen

  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {from_dated8c1b, setfrom_dated8c1b}= useContext(TotalContext) as TotalContextProps;
  const {to_date0c15a, setto_date0c15a}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3968d, setreceipt_image3968d}= useContext(TotalContext) as TotalContextProps;
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924, setoffsite_expense_table1e924}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table1e924Props, setoffsite_expense_table1e924Props}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['offsite_approval_group']  = offsite_approval_group8d6cc,
      codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
      codeStates['claim_detail_table']  = claim_detail_table1835f,
      codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async () => {
    try{     
      if(rule?.nodes?.length > 0){
        let schemaFlag:any = evaluateDecisionTable(rule?.nodes,{},decodedTokenObj);
        // schemaFlag =schemaFlag.output;
        let order:number = Number(schemaFlag.order);

        // Update grid position based on order number
        if (order && typeof order === 'number') {
          const position:any = getGridPositionFromOrder(order);
          setGridPosition(position);
        } 

        if (schemaFlag.output !== "true") {
          setShowFlag(false);
        }else{
          setShowFlag(true)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "reject74228") {
        handleClick();
      }
    });
  },[reject74228?.refresh,currentToken])

  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id];
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id];
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id);
        id=id+"|"+eventProperty?.children[i].id;
        ans.push(...temp);
      }
    }
    return ans;
  }

  async function handleSave4228_1_1_1(){
    try{
      let mainData:any=structuredClone(offsite_approval_group8d6cc);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        data: {},
        lock: {}
      }
      let primaryKey:string;
      let tagetKey:string="CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
      let uf_getPFDetails:any={
        key: "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      if(!lockedData?.data || Object.keys(lockedData?.data)?.length == 0 ){
         throw 'Please give proper data';
      }
      let eventProperty : any = {
  "id": "7adb497cc19543f99bbfc55627774228",
  "type": "button",
  "name": "Reject",
  "sequence": 1,
  "children": [
    {
      "id": "7adb497cc19543f99bbfc55627774228.1.1",
      "type": "eventNode",
      "name": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "7adb497cc19543f99bbfc55627774228.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "e0abb5b5f6d949fa8b9e38f3f4741477|8cfd41ac08154260a70b7026e91727e3.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|manager_group|pendingcard",
                      "label": "|Pending",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|manager_group|pendingcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.1.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.2",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.2",
                  "children": [
                    {
                      "id": "f999c73172354a838090a0f8eda1e924.1.1.1.1.2.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|offsite_expense_table",
                      "label": "",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|offsite_expense_table",
                      "elementType": "group",
                      "sequence": "1.1.1.1.2.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.3",
                  "children": [
                    {
                      "id": "9506371dc6dd46838910363c4b51835f.1.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Offsite.v1|claim_detail_table",
                      "label": "",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|claim_detail_table",
                      "elementType": "group",
                      "sequence": "1.1.1.1.3.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.4",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.4",
                  "children": [
                    {
                      "id": "279c2b7585c947c9abdc712d6a18d6cc|83eb2934fd88438da3607f98661e0ef7.1.1.1.1.4.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Offsite.v1|offsite_approval_group|comments",
                      "label": "|",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|offsite_approval_group|comments",
                      "elementType": "textarea",
                      "sequence": "1.1.1.1.4.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.5",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.5",
                  "children": [
                    {
                      "id": "e0abb5b5f6d949fa8b9e38f3f4741477|50285d9343f74fa4b1b4c65b3dc0ceee.1.1.1.1.5.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|manager_group|rejectedcard",
                      "label": "|Rejected",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|manager_group|rejectedcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.5.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.6",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "sequence": "1.1.1.1.6",
                  "children": [
                    {
                      "id": "279c2b7585c947c9abdc712d6a18d6cc|83eb2934fd88438da3607f98661e0ef7.1.1.1.1.6.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Offsite.v1|offsite_approval_group|comments",
                      "label": "|",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|offsite_approval_group|comments",
                      "elementType": "textarea",
                      "sequence": "1.1.1.1.6.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.7",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "sequence": "1.1.1.1.7",
                  "children": [
                    {
                      "id": "279c2b7585c947c9abdc712d6a18d6cc|4953fad632eb4cf2a806de7d667098ea.1.1.1.1.7.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Offsite.v1|offsite_approval_group|Approve",
                      "label": "|Approve",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|offsite_approval_group|Approve",
                      "elementType": "button",
                      "sequence": "1.1.1.1.7.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "7adb497cc19543f99bbfc55627774228.1.1.1.1.8",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "sequence": "1.1.1.1.8",
                  "children": [
                    {
                      "id": "279c2b7585c947c9abdc712d6a18d6cc|7adb497cc19543f99bbfc55627774228.1.1.1.1.8.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Offsite.v1|offsite_approval_group|Reject",
                      "label": "|Reject",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1|offsite_approval_group|Reject",
                      "elementType": "button",
                      "sequence": "1.1.1.1.8.1",
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
                    "value": "Data Rejected successfully",
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
                    "value": "warning",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "string",
                "selectionList": [],
                "value": "Rejected",
                "enabled": true
              },
              {
                "name": "primaryKey",
                "_type": "string",
                "selectionList": [],
                "value": "claim_id",
                "enabled": true
              },
              {
                "name": "tableName",
                "_type": "string",
                "selectionList": [],
                "value": "claims",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "selectionList": [],
                "value": true,
                "enabled": true
              },
              {
                "name": "Update Columns",
                "_type": "array",
                "selectionList": [],
                "value": "",
                "enabled": true,
                "items": [
                  {
                    "ColumnName": ""
                  }
                ]
              }
            ]
          },
          "targetKey": [
            "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
          ]
        }
      ]
    }
  ]
};
      let eventDetails: any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId:string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1";
      sourceId+= "|"+"279c2b7585c947c9abdc712d6a18d6cc";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Offsite:AFVK:v1"+"|"+"279c2b7585c947c9abdc712d6a18d6cc"+"|"+eventProperty.id;
      pathIds.map((ele:any,id:number)=>{
        if(id!=pathIds.length-1)
        {
          sourceIdNewPath=sourceIdNewPath+"|"+ele
        }
      })
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'saveHandler'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceIdNewPath
            };
          }
        } else if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'eventEmitter'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              updateColumns: eventDetailsArray[k]?.updateColumns,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              updateColumns: eventDetailsArray[k]?.updateColumns,
              sourceId:sourceIdNewPath
            };
          }
        }
      }
    
      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
          key:uf_getPFDetails.key,
          sourceId:sourceIdNewPath
        };
        if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd;
          uf_initiatePfBody["method"] = encryptionMethod;
        }
            uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              if(uf_initiatePf?.data?.error == true){
                toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                return
              }
      
      } else {
        throw 'Please check PF'
      }
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_status":uf_getPFDetails.status},
        upId : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId
      }

  // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }
    let reworkedObject:any=nullFilter(offsite_approval_group8d6cc);
    let reworkKeys:any[]=[];
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof offsite_approval_group8d6cc[item]=='object' && Array.isArray( offsite_approval_group8d6cc[item]) &&  offsite_approval_group8d6cc[item].length && typeof offsite_approval_group8d6cc[item][0] !="string" ){
          if( offsite_approval_group8d6cc[item].length>0 && !Object.keys(offsite_approval_group8d6cc[item][0]).includes('_isSelected_'))
              reworkKeys.push(item);
        }
      })

      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = offsite_approval_group8d6cc[reworkKeys[i]].map((item:any) => item?.file)
          const formData = new FormData();
          fileBody.forEach((file:File) => {
            formData.append("file", file);
          });
          formData.append('context', reworkKeys[i]);
          formData.append("enableEncryption", fileBody[0]?.enableEncryption);
          if (encryptionFlagCont) {
            formData.append("dpdKey" ,encryptionDpd);
            formData.append("method" ,encryptionMethod);
          } 
          if (fileBody[0]?.DbType == 'mongodb') {
            const res : any = await AxiosService.post( "/UF/upload",formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                filename: reworkedObject[reworkKeys[i]]?.name
                  ? reworkedObject[reworkKeys[i]]?.name.replace(
                      /\.[^/.]+$/,
                      ''
                    )
                  : ''
              }
            }
          )
          reworkedObject[reworkKeys[i]] = res.data.file.fileId
          }else if (fileBody[0]?.DbType == 'dfs') {

            const basePath : string = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
            const bucketFolderame : string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
            const data = new FormData();
            data.append('file', fileBody[0])
            data.append('bucketFolderame', bucketFolderame.toLowerCase())
            data.append('folderPath', basePath)
            data.append('enableEncryption', fileBody[0]?.enableEncryption);

            const res : any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
              data,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  filename: fileBody[0]?.name
                    ? fileBody[0].name.replace(/\.[^/.]+$/, '')
                    : ''
                }
              }
            )
            reworkedObject[reworkKeys[i]] = res.data.imageUrl
          }
        }
      }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof offsite_approval_group8d6cc[item]=='object')
        {
          if( offsite_approval_group8d6cc[item].length>0 &&Object.keys(offsite_approval_group8d6cc[item][0]).includes('_isSelected_'))
          {
            reworkedObject[item]=reworkedObject[item].filter((data:any)=>data?._isSelected_== true)
            for(let i=0;i<reworkedObject[item].length;i++)
            {
              reworkedObject[item][i] = nullFilter(reworkedObject[item][i])
              delete reworkedObject[item][i]._isSelected_
            }

          }
           
        }
      })

      if ("childTables" in offsite_approval_group8d6cc) {
        te_saveBody.childTables = offsite_approval_group8d6cc.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(offsite_approval_group8d6cc))
        {
          formData=lockedData?.data || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"279c2b7585c947c9abdc712d6a18d6cc",
              controlId:"7adb497cc19543f99bbfc55627774228"
            };
            if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
            uf_ifo = await AxiosService.post(
            "/UF/ifo",
              uf_ifoBody,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
            
            if(uf_ifo?.data?.error == true){
              toast(uf_ifo?.data?.errorDetails?.message, 'danger');
              return
            }
            ifoResponse?.push({...uf_ifo?.data,...te_eventEmitterBody?.data});
          }
          te_eventEmitterBody.data= ifoResponse;
        } 
        else{
          formData=reworkedObject
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"279c2b7585c947c9abdc712d6a18d6cc",
            controlId:"7adb497cc19543f99bbfc55627774228"
          };
          if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
          uf_ifo = await AxiosService.post(
          "/UF/ifo",
            uf_ifoBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          if(uf_ifo?.data?.error == true){
            toast(uf_ifo?.data?.errorDetails?.message, 'danger');
            return
          }
            te_eventEmitterBody.data= [{...uf_ifo?.data,...te_eventEmitterBody?.data}];
        }
      }
    te_eventEmitterBody["lock"] = actionLockData;
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    lockedKeysLength = lockedData.primaryKeys.length;
    ///////////////////////
    toast('Data Rejected successfully', 'warning');
    // refreshElement
    // for controller 1
    if(Object.keys(manager_group41477).length>0){
      let temp:any=manager_group41477;
      delete temp["pendingcard"];
      setmanager_group41477(temp);
    }
    setpendingcard727e3((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("pendingcard727e3",1,10,encryptionFlagCompData)
    // refreshElement
    // for group
    setoffsite_expense_table1e924Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    // refreshElement
    // for group
    setclaim_detail_table1835fProps((pre:any)=>({...pre,refresh:!pre?.refresh}));
    // refreshElement
    // for controller 1
    if(Object.keys(offsite_approval_group8d6cc).length>0){
      let temp:any=offsite_approval_group8d6cc;
      delete temp["comments"];
      setoffsite_approval_group8d6cc(temp);
    }
    setcommentse0ef7((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("commentse0ef7",1,10,encryptionFlagCompData)
    // refreshElement
    // for controller 1
    if(Object.keys(manager_group41477).length>0){
      let temp:any=manager_group41477;
      delete temp["rejectedcard"];
      setmanager_group41477(temp);
    }
    setrejectedcard0ceee((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("rejectedcard0ceee",1,10,encryptionFlagCompData)
    setcommentse0ef7((prev: any) => ({ ...prev, isDisabled: true }));
    setapprove098ea((prev: any) => ({ ...prev, isDisabled: true }));
    setreject74228((prev: any) => ({ ...prev, isDisabled: true }));
    }
    catch(err:any)
    {
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');
      return
    }
      if(Array.isArray(offsite_approval_group8d6cc)){
        setRefetch((pre: any) => !pre)    
        // needClearValue
        let keys: any = {};
        offsite_approval_group8d6cc.map((item: any) => {
          keys[item] = '';
        })
        setoffsite_approval_group8d6cc(keys);
        setLockedData({...lockedData,data:{}});
      }else{
        setRefetch((pre: any) => !pre);
        // needClearValue
        let keys: any = {};
        Object.keys(offsite_approval_group8d6cc).map((item: any) => {
          keys[item] = '';
        })
        setoffsite_approval_group8d6cc(keys);
      }
  }
  const handleClick=async()=>{
    if(offsite_approval_group8d6ccProps?.validation==true && offsite_approval_group8d6ccProps?.required==true || offsite_approval_group8d6ccProps?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    let saveCheck : boolean = false;
        Object.keys(validate).map((item)=>{
      if(validate[item] == 'invalid'){
        saveCheck=true;
    }})
    if (saveCheck) {   
      toast('Please verify the data', 'danger');
      return
    }
    try{  
       await handleSave4228_1_1_1();
          await delay(1000);
      await handleCustomCode();
    }catch (err: any) {
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
  }
  async function handleConfirmOnClick(){
    try{
    }catch(err){
      toast(err, 'danger');
    }
  } 


  async function handleConfirmOnCancel(){
     try{
    }catch(err){
      toast(err, 'danger');
    }
  }


 if (reject74228?.isHidden) {
    return <></>
  }
 
  return (
    <div
      style={{gridColumn: `17 / 19`,gridRow: `324 / 334`, gap:``, height: `100%`, overflow: 'auto'}} 
 >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-danger'
          disabled= {reject74228?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Reject")}
        </Button>}
      </div>
    
  )
}

export default ButtonReject


