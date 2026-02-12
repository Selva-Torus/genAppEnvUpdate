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
 

const ButtonApprove =  ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
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

  const {grp63e95, setgrp63e95}= useContext(TotalContext) as TotalContextProps;
  const {grp63e95Props, setgrp63e95Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342, setdaily_expense_manager_tablee3342}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_manager_tablee3342Props, setdaily_expense_manager_tablee3342Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id7ec53, setclaim_id7ec53}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1f8f9, settrs_created_by1f8f9}= useContext(TotalContext) as TotalContextProps;
  const {expense_name78eca, setexpense_name78eca}= useContext(TotalContext) as TotalContextProps;
  const {claim_category8466d, setclaim_category8466d}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount22435, setcategory_total_amount22435}= useContext(TotalContext) as TotalContextProps;
  const {expense_date20458, setexpense_date20458}= useContext(TotalContext) as TotalContextProps;
  const {trs_status9f4b4, settrs_status9f4b4}= useContext(TotalContext) as TotalContextProps;
  const {reject4d3f0, setreject4d3f0}= useContext(TotalContext) as TotalContextProps;
  const {approve819e1, setapprove819e1}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['grp']  = grp63e95,
      codeStates['setgrp'] = setgrp63e95,
      codeStates['daily_expense_manager_table']  = daily_expense_manager_tablee3342,
      codeStates['setdaily_expense_manager_table'] = setdaily_expense_manager_tablee3342,
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
      if (id === "approve819e1") {
        handleClick();
      }
    });
  },[approve819e1?.refresh,currentToken])

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

  async function handleSave19e1_1_1_1(){
    try{
      let mainData:any=structuredClone(daily_expense_manager_tablee3342);
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
  "id": "271c5940bad04144b9d17e8dfc0819e1",
  "type": "button",
  "name": "Approve",
  "sequence": 1,
  "children": [
    {
      "id": "271c5940bad04144b9d17e8dfc0819e1.1.1",
      "type": "eventNode",
      "name": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "271c5940bad04144b9d17e8dfc0819e1.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "271c5940bad04144b9d17e8dfc0819e1.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "271c5940bad04144b9d17e8dfc0819e1.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "874fd4e0d832428da3947bcbc05e3342.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Daily_Expense_Manager_Table.v1|daily_expense_manager_table",
                      "label": "Daily Expenses",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_Manager_Table:AFVK:v1|daily_expense_manager_table",
                      "elementType": "group",
                      "sequence": "1.1.1.1.1.1",
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
                    "value": "Data Approved successfully",
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
                "name": "status",
                "_type": "string",
                "selectionList": [],
                "value": "Approved",
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
      let sourceId:string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_Manager_Table:AFVK:v1";
      sourceId+= "|"+"874fd4e0d832428da3947bcbc05e3342";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_Manager_Table:AFVK:v1"+"|"+"874fd4e0d832428da3947bcbc05e3342"+"|"+eventProperty.id;
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
    let reworkedObject:any=nullFilter(daily_expense_manager_tablee3342);
    let reworkKeys:any[]=[];
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof daily_expense_manager_tablee3342[item]=='object' && Array.isArray( daily_expense_manager_tablee3342[item]) &&  daily_expense_manager_tablee3342[item].length && typeof daily_expense_manager_tablee3342[item][0] !="string" ){
          if( daily_expense_manager_tablee3342[item].length>0 && !Object.keys(daily_expense_manager_tablee3342[item][0]).includes('_isSelected_'))
              reworkKeys.push(item);
        }
      })

      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = daily_expense_manager_tablee3342[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof daily_expense_manager_tablee3342[item]=='object')
        {
          if( daily_expense_manager_tablee3342[item].length>0 &&Object.keys(daily_expense_manager_tablee3342[item][0]).includes('_isSelected_'))
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

      if ("childTables" in daily_expense_manager_tablee3342) {
        te_saveBody.childTables = daily_expense_manager_tablee3342.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(daily_expense_manager_tablee3342))
        {
          formData=lockedData?.data || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"874fd4e0d832428da3947bcbc05e3342",
              controlId:"271c5940bad04144b9d17e8dfc0819e1"
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
            groupId:"874fd4e0d832428da3947bcbc05e3342",
            controlId:"271c5940bad04144b9d17e8dfc0819e1"
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
    toast('Data Approved successfully', 'success');
    // refreshElement
    // for group
    setdaily_expense_manager_tablee3342Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    }
    catch(err:any)
    {
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');
      return
    }
      if(Array.isArray(daily_expense_manager_tablee3342)){
        setRefetch((pre: any) => !pre)    
        // needClearValue
        let keys: any = {};
        daily_expense_manager_tablee3342.map((item: any) => {
          keys[item] = '';
        })
        setdaily_expense_manager_tablee3342(keys);
        setLockedData({...lockedData,data:{}});
      }else{
        setRefetch((pre: any) => !pre);
        // needClearValue
        let keys: any = {};
        Object.keys(daily_expense_manager_tablee3342).map((item: any) => {
          keys[item] = '';
        })
        setdaily_expense_manager_tablee3342(keys);
      }
  }
  const handleClick=async()=>{
    if(daily_expense_manager_tablee3342Props?.validation==true && daily_expense_manager_tablee3342Props?.required==true || daily_expense_manager_tablee3342Props?.required==true)
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
       await handleSave19e1_1_1_1();
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


 if (approve819e1?.isHidden) {
    return <></>
  }
 
  return (
    <div
      style={{gridColumn: ` / `,gridRow: ` / `, gap:``, height: `100%`, overflow: 'auto'}} 
 >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-success'
          disabled= {approve819e1?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Approve")}
        </Button>}
      </div>
    
  )
}

export default ButtonApprove


