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
 

const ButtonSave =  ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
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

  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {expense_date5f45e, setexpense_date5f45e}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryc7c5e, setclaim_categoryc7c5e}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled7244d, setis_comment_enabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_daily_group']  = request_daily_group44e40,
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
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
      if (id === "saved507e") {
        handleClick();
      }
    });
  },[saved507e?.refresh,currentToken])

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

  async function handleSave507e_1_1_1(){
    try{
      let mainData:any=structuredClone(request_daily_group44e40);
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
      let tagetKey:string="CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
      let uf_getPFDetails:any={
        key: "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      let eventProperty : any = {
  "id": "bb92a0e80a324d5c915b35603e4d507e",
  "type": "button",
  "name": "Save",
  "sequence": 1,
  "children": [
    {
      "id": "bb92a0e80a324d5c915b35603e4d507e.1.1",
      "type": "eventNode",
      "name": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "saveHandler",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "483e1dce061b49cebe0c9e46b0844e40|f5e442240e47412d8af3ce6beb9f2394.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Request_Screen_Daily.v1|request_daily_group|comments",
                      "label": "|",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Daily:AFVK:v1|request_daily_group|comments",
                      "elementType": "textarea",
                      "sequence": "1.1.1.1.1.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.2",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.2",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|495711d8ddf44734983661c8f9eee3c0.1.1.1.1.2.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|pendingcard",
                      "label": "|Pending",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|pendingcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.2.1",
                      "children": []
                    }
                  ],
                  "hlr": {}
                },
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.3",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|10ee33245621462090666ca8c1d798bd.1.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|dailyexpenses",
                      "label": "|Daily Expenses",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|dailyexpenses",
                      "elementType": "card",
                      "sequence": "1.1.1.1.3.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.4",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.4",
                  "children": [
                    {
                      "id": "2c198b49b883478ca1a170b5bad13758.1.1.1.1.4.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|daily_expense_table",
                      "label": "Daily Expenses",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|daily_expense_table",
                      "elementType": "group",
                      "sequence": "1.1.1.1.4.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.5",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.5",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|7d5ecb74896b444e93036544256c5971.1.1.1.1.5.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|approvedcard",
                      "label": "|Approved",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1|User_Grp|approvedcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.5.1",
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
                "value": "claim_id",
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
            "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
          ]
        }
      ]
    }
  ]
};
      let eventDetails: any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId:string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Daily:AFVK:v1";
      sourceId+= "|"+"483e1dce061b49cebe0c9e46b0844e40";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Daily:AFVK:v1"+"|"+"483e1dce061b49cebe0c9e46b0844e40"+"|"+eventProperty.id;
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

  // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }
    let reworkedObject:any=nullFilter(request_daily_group44e40);
    let reworkKeys:any[]=[];
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof request_daily_group44e40[item]=='object' && Array.isArray( request_daily_group44e40[item]) &&  request_daily_group44e40[item].length && typeof request_daily_group44e40[item][0] !="string" ){
          if( request_daily_group44e40[item].length>0 && !Object.keys(request_daily_group44e40[item][0]).includes('_isSelected_'))
              reworkKeys.push(item);
        }
      })

      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = request_daily_group44e40[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof request_daily_group44e40[item]=='object')
        {
          if( request_daily_group44e40[item].length>0 &&Object.keys(request_daily_group44e40[item][0]).includes('_isSelected_'))
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

      if ("childTables" in request_daily_group44e40) {
        te_saveBody.childTables = request_daily_group44e40.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(request_daily_group44e40))
        {
          formData=lockedData?.data || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"483e1dce061b49cebe0c9e46b0844e40",
              controlId:"bb92a0e80a324d5c915b35603e4d507e"
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
          }
        } 
        else{
          formData=reworkedObject
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"483e1dce061b49cebe0c9e46b0844e40",
            controlId:"bb92a0e80a324d5c915b35603e4d507e"
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
            formData={...uf_ifo?.data};
            reworkedObject=formData;
        }
      }
        te_saveBody.data = {...nullFilter(reworkedObject),...eventData,...(await handleCustomCode())};
        te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status;
        te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId;
        if(mainData?.upId)
        {
          te_saveBody['upId']= mainData.upId
        }
        te_saveBody.key= te_saveBody?.key?.slice(0, te_saveBody?.key?.lastIndexOf(':')) + ':';
      
      
      primaryKey = uf_getPFDetails.primaryKey;
        if (encryptionFlagCont) {
            te_saveBody["dpdKey"] = encryptionDpd;
            te_saveBody["method"] = encryptionMethod;
          } 
          te_save = await AxiosService.post("/te/save",te_saveBody,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
             },
           }
         )
    if(te_save?.data == ""  || te_save?.data == "data is required"){
      throw "Invalid data"
    }
    ///////////////////////
    toast('Data saved successfully', 'success');
    setcommentsf2394((prev: any) => ({ ...prev, isDisabled: true }));
    // refreshElement
    // for controller 1
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["pendingcard"];
      setuser_grpd6690(temp);
    }
    setpendingcardee3c0((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("pendingcardee3c0",1,10,encryptionFlagCompData)
    // refreshElement
    // for controller 1
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["dailyexpenses"];
      setuser_grpd6690(temp);
    }
    setdailyexpenses798bd((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("dailyexpenses798bd",1,10,encryptionFlagCompData)
    // refreshElement
    // for group
    setdaily_expense_table13758Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    // refreshElement
    // for controller 1
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["approvedcard"];
      setuser_grpd6690(temp);
    }
    setapprovedcardc5971((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("approvedcardc5971",1,10,encryptionFlagCompData)
    }
    catch(err:any)
    {
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');
      return
    }
      if(Array.isArray(request_daily_group44e40)){
        setRefetch((pre: any) => !pre)    
        // needClearValue
        let keys: any = {};
        request_daily_group44e40.map((item: any) => {
          keys[item] = '';
        })
        setrequest_daily_group44e40(keys);
        setLockedData({...lockedData,data:{}});
      }else{
        setRefetch((pre: any) => !pre);
        // needClearValue
        let keys: any = {};
        Object.keys(request_daily_group44e40).map((item: any) => {
          keys[item] = '';
        })
        setrequest_daily_group44e40(keys);
      }
  }
  const handleClick=async()=>{
    if(request_daily_group44e40Props?.validation==true && request_daily_group44e40Props?.required==true || request_daily_group44e40Props?.required==true)
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
      await handleSave507e_1_1_1();
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


 if (saved507e?.isHidden) {
    return <></>
  }
 
  return (
    <div
      style={{gridColumn: `18 / 20`,gridRow: `154 / 162`, gap:``, height: `100%`, overflow: 'auto'}} 
 >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-success'
          disabled= {saved507e?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Save")}
        </Button>}
      </div>
    
  )
}

export default ButtonSave


