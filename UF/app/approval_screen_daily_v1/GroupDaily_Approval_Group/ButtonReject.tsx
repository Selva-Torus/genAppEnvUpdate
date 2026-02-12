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

  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expenses89868, setdaily_expenses89868}= useContext(TotalContext) as TotalContextProps;
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee8c94, setexpense_datee8c94}= useContext(TotalContext) as TotalContextProps;
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image33fd1, setreceipt_image33fd1}= useContext(TotalContext) as TotalContextProps;
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps;
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps;
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps;
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps;
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568, setdaily_expense_table91568}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table91568Props, setdaily_expense_table91568Props}= useContext(TotalContext) as TotalContextProps;
  const {pendingcard727e3, setpendingcard727e3}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477, setmanager_group41477}= useContext(TotalContext) as TotalContextProps;
  const {manager_group41477Props, setmanager_group41477Props}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcard0ceee, setrejectedcard0ceee}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['daily_approval_group']  = daily_approval_group69531,
      codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
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
      if (id === "reject28a4c") {
        handleClick();
      }
    });
  },[reject28a4c?.refresh,currentToken])

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

  async function handleSave8a4c_1_1_1(){
    try{
      let mainData:any=structuredClone(daily_approval_group69531);
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
  "id": "18fd29f395e74dcb92e9a0d0e5a28a4c",
  "type": "button",
  "name": "Reject",
  "sequence": 1,
  "children": [
    {
      "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1",
      "type": "eventNode",
      "name": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "0e20ffe3aaf1437e82c5536824491568.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|daily_expense_table",
                      "label": "Daily Expenses",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|daily_expense_table",
                      "elementType": "group",
                      "sequence": "1.1.1.1.1.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1.1.2",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.2",
                  "children": [
                    {
                      "id": "e0abb5b5f6d949fa8b9e38f3f4741477|8cfd41ac08154260a70b7026e91727e3.1.1.1.1.2.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|manager_group|pendingcard",
                      "label": "|Pending",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|manager_group|pendingcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.2.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.3",
                  "children": [
                    {
                      "id": "e0abb5b5f6d949fa8b9e38f3f4741477|50285d9343f74fa4b1b4c65b3dc0ceee.1.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_Manager.v1|manager_group|rejectedcard",
                      "label": "|Rejected",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1|manager_group|rejectedcard",
                      "elementType": "card",
                      "sequence": "1.1.1.1.3.1",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "18fd29f395e74dcb92e9a0d0e5a28a4c.1.1.1.1.4",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "sequence": "1.1.1.1.4",
                  "children": [
                    {
                      "id": "91dcb5fe99014c21add21a4d00669531|a0b10e934dc447099f6b85449f5d309a.1.1.1.1.4.1",
                      "value": "",
                      "type": "screen",
                      "name": "Approval_Screen_Daily.v1|Daily_Approval_Group|manager_comments",
                      "label": "|",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Daily:AFVK:v1|Daily_Approval_Group|manager_comments",
                      "elementType": "textarea",
                      "sequence": "1.1.1.1.4.1",
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
                    "value": "Data Rejected Successfully",
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
      let sourceId:string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Daily:AFVK:v1";
      sourceId+= "|"+"91dcb5fe99014c21add21a4d00669531";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Approval_Screen_Daily:AFVK:v1"+"|"+"91dcb5fe99014c21add21a4d00669531"+"|"+eventProperty.id;
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
    let reworkedObject:any=nullFilter(daily_approval_group69531);
    let reworkKeys:any[]=[];
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof daily_approval_group69531[item]=='object' && Array.isArray( daily_approval_group69531[item]) &&  daily_approval_group69531[item].length && typeof daily_approval_group69531[item][0] !="string" ){
          if( daily_approval_group69531[item].length>0 && !Object.keys(daily_approval_group69531[item][0]).includes('_isSelected_'))
              reworkKeys.push(item);
        }
      })

      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = daily_approval_group69531[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof daily_approval_group69531[item]=='object')
        {
          if( daily_approval_group69531[item].length>0 &&Object.keys(daily_approval_group69531[item][0]).includes('_isSelected_'))
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

      if ("childTables" in daily_approval_group69531) {
        te_saveBody.childTables = daily_approval_group69531.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(daily_approval_group69531))
        {
          formData=lockedData?.data || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"91dcb5fe99014c21add21a4d00669531",
              controlId:"18fd29f395e74dcb92e9a0d0e5a28a4c"
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
            groupId:"91dcb5fe99014c21add21a4d00669531",
            controlId:"18fd29f395e74dcb92e9a0d0e5a28a4c"
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
    toast('Data Rejected Successfully', 'warning');
    // refreshElement
    // for group
    setdaily_expense_table91568Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
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
    // for controller 1
    if(Object.keys(manager_group41477).length>0){
      let temp:any=manager_group41477;
      delete temp["rejectedcard"];
      setmanager_group41477(temp);
    }
    setrejectedcard0ceee((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("rejectedcard0ceee",1,10,encryptionFlagCompData)
    setmanager_commentsd309a((prev: any) => ({ ...prev, isDisabled: true }));
    }
    catch(err:any)
    {
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');
      return
    }
      if(Array.isArray(daily_approval_group69531)){
        setRefetch((pre: any) => !pre)    
        // needClearValue
        let keys: any = {};
        daily_approval_group69531.map((item: any) => {
          keys[item] = '';
        })
        setdaily_approval_group69531(keys);
        setLockedData({...lockedData,data:{}});
      }else{
        setRefetch((pre: any) => !pre);
        // needClearValue
        let keys: any = {};
        Object.keys(daily_approval_group69531).map((item: any) => {
          keys[item] = '';
        })
        setdaily_approval_group69531(keys);
      }
  }
  const handleClick=async()=>{
    if(daily_approval_group69531Props?.validation==true && daily_approval_group69531Props?.required==true || daily_approval_group69531Props?.required==true)
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
       await handleSave8a4c_1_1_1();
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


 if (reject28a4c?.isHidden) {
    return <></>
  }
 
  return (
    <div
      style={{gridColumn: `18 / 20`,gridRow: `208 / 218`, gap:``, height: `100%`, overflow: 'auto'}} 
 >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-danger'
          disabled= {reject28a4c?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Reject")}
        </Button>}
      </div>
    
  )
}

export default ButtonReject


