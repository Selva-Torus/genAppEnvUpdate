'use client'






import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
import { getPublicEnv } from "@/app/components/public-env";
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
 

const ButtonApprove = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const { token } = useGlobal();
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const allState:any= useContext(TotalContext) as TotalContextProps;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {grpdeda0, setgrpdeda0}= useContext(TotalContext) as TotalContextProps;
  const {grpdeda0Props, setgrpdeda0Props}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5, settable98ff5}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5Props, settable98ff5Props}= useContext(TotalContext) as TotalContextProps;
  const {claim_id56078, setclaim_id56078}= useContext(TotalContext) as TotalContextProps;
  const {rejecte566a, setrejecte566a}= useContext(TotalContext) as TotalContextProps;
  const {approve5709e, setapprove5709e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by8053b, settrs_created_by8053b}= useContext(TotalContext) as TotalContextProps;
  const {expense_name94440, setexpense_name94440}= useContext(TotalContext) as TotalContextProps;
  const {claim_category9ec61, setclaim_category9ec61}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount689b8, setcategory_total_amount689b8}= useContext(TotalContext) as TotalContextProps;
  const {formatted_date1030f, setformatted_date1030f}= useContext(TotalContext) as TotalContextProps;
  const {trs_status759b6, settrs_status759b6}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const table98ff5Ref = useRef(table98ff5);
  useEffect(() => {
    table98ff5Ref.current = table98ff5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [table98ff5]);
  
  //group props in ref to access latest props value
  const table98ff5PropsRef = useRef(table98ff5Props);
  useEffect(() => {
    table98ff5PropsRef.current = table98ff5Props;
  }, [table98ff5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['grp'] = grpdeda0,
        codeStates['setgrp'] = setgrpdeda0,
        codeStates['grpdeda0'] = grpdeda0Props,
        codeStates['setgrpdeda0'] = setgrpdeda0Props,
        codeStates['table'] = table98ff5,
        codeStates['settable'] = settable98ff5,
        codeStates['table98ff5'] = table98ff5Props,
        codeStates['settable98ff5'] = settable98ff5Props,
        codeStates['claim_id'] = claim_id56078,
        codeStates['setclaim_id'] = setclaim_id56078,
        codeStates['reject'] = rejecte566a,
        codeStates['setreject'] = setrejecte566a,
        codeStates['approve'] = approve5709e,
        codeStates['setapprove'] = setapprove5709e,
        codeStates['trs_created_by'] = trs_created_by8053b,
        codeStates['settrs_created_by'] = settrs_created_by8053b,
        codeStates['expense_name'] = expense_name94440,
        codeStates['setexpense_name'] = setexpense_name94440,
        codeStates['claim_category'] = claim_category9ec61,
        codeStates['setclaim_category'] = setclaim_category9ec61,
        codeStates['category_total_amount'] = category_total_amount689b8,
        codeStates['setcategory_total_amount'] = setcategory_total_amount689b8,
        codeStates['formatted_date'] = formatted_date1030f,
        codeStates['setformatted_date'] = setformatted_date1030f,
        codeStates['trs_status'] = trs_status759b6,
        codeStates['settrs_status'] = settrs_status759b6,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {offsite_expense_manager_table_v1, setoffsite_expense_manager_table_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...table98ff5Ref.current,...data};
      let parentRowSpan = 133;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "68aacd73430449af9dd1ef8b5a998ff5",
        "4c673f44f9da4729a67b9b3e7c95709e"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))

    /////////
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "approve5709e") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "4c673f44f9da4729a67b9b3e7c95709e") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "approve5709e");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (approve5709e?.trigger) 
    {
      handleClick()
      setapprove5709e((prev:any) => ({...prev, trigger: false}));
    }
  },[approve5709e?.trigger])

  useEffect(()=>{
    if(approve5709e?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[approve5709e?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, Offsite_Expense_Manager_Table_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  async function handleSave709e_1_1_1(getSelectedImageData?:any){
    let apiSuccess:boolean = false;
      

  setValidateRefetch((pre: any) => ({ ...pre, value: !pre.value, init: pre.init + 1 }));
    await delay(1000); 

    const table98ff5Props = table98ff5PropsRef.current;

    let currentValidate: any = validateRef.current;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
  const hasInvalidField = Object.values(currentValidate?.Offsite_Expense_Manager_Table_v1 || {}).some(val => {
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).includes('invalid');
      }
      return val === 'invalid';
    });

    if (hasInvalidField) {
      toast('Please verify the data', 'danger');
      return;
    }
    try{
      let copyFormhandlerData :any = {};
      let mainData:any=structuredClone(table98ff5Ref.current);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        ssKey: [],
        data: {},
        lock: {},
        tableName: ''
      }
      let tagetKey:string="CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
      let uf_getPFDetails:any={
        key: "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
        if(table98ff5Props?.selectedIds?.length === 0  && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
          throw 'Please give proper data';
        }
      let eventProperty :any = {
  "id": "4c673f44f9da4729a67b9b3e7c95709e",
  "type": "button",
  "name": "Approve",
  "label": "Approve",
  "sequence": 1,
  "children": [
    {
      "id": "4c673f44f9da4729a67b9b3e7c95709e.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "4c673f44f9da4729a67b9b3e7c95709e.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "4c673f44f9da4729a67b9b3e7c95709e.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "4c673f44f9da4729a67b9b3e7c95709e.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "68aacd73430449af9dd1ef8b5a998ff5.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Offsite_Expense_Manager_Table.v1|table",
                      "label": "Offsite_Expense_Manager_Table.v1|table",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_Manager_Table:AFVK:v1|table",
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
                    "value": "Data Approved",
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
            "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|f383279c59a6477f811c306b293051ef"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_Manager_Table:AFVK:v1";
      sourceId+= "|"+"68aacd73430449af9dd1ef8b5a998ff5";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_Manager_Table:AFVK:v1"+"|"+"68aacd73430449af9dd1ef8b5a998ff5"+"|"+eventProperty.id;
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
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
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
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              status: eventDetailsArray[k]?.status,
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
      //eventEmitter
      let upId:any
      let hasValidupId:any
      if(Array.isArray(tableData)){
       upId=tableData?.map((item:any)=>item.trs_process_id)
       hasValidupId = upId.some((item:any) => item !== undefined && item !== null);
      }
      if(lockedData?.data && Object.keys(lockedData?.data)?.length > 0){
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : table98ff5?.upId? [table98ff5?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName : "Approve"
      }
      }else{
      if(Array.isArray(tableData) && hasValidupId){
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : table98ff5?.upId? [table98ff5?.upId ] : upId,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId
      }}else{
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : table98ff5?.upId? [table98ff5?.upId ] : table98ff5?.trs_process_id? [table98ff5?.trs_process_id ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "Approve"
      }
      }
      }

  // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_event_process_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }

    let reworkedObject:any = nullFilter(lockedData?.data);
    if(!(typeof reworkedObject=='object'&&Array.isArray(reworkedObject)))
    {
      reworkedObject= nullFilter({ ...reworkedObject, ...getSelectedImageData?.data||{} });
      let forFilter_uuidKeys: any = Object.keys(reworkedObject)
      forFilter_uuidKeys?.map((key: any) => {
        if (
          typeof reworkedObject[key] == 'object' &&
          Array.isArray(reworkedObject[key]) &&
          reworkedObject[key]?.length
        ) {
          if (
            typeof reworkedObject[key]?.at(0) =='object' &&
            '_uuid' in reworkedObject[key]?.at(0) &&
            'urlData' in reworkedObject[key]?.at(0)
          ) {
            for (let i = 0; i < reworkedObject[key].length; i++) {
              reworkedObject[key][i] = reworkedObject[key][i]?.urlData
            }
          }
        }
      })
    }
    let reworkKeys:any[]=[];
    let rootReworkKeys:any[]=[];
      if(typeof reworkedObject === 'object' && reworkedObject !== null) {
        if("_groupArrays_" in reworkedObject )
        {
          reworkedObject["_groupArrays_"].forEach((arrayKey: string) => {
            reworkedObject[arrayKey]?.map((item: any) => {     
              Object.keys(item).map((objKey:any)=>{
                if (
                  typeof item[objKey] === 'object' && 
                  Array.isArray(item[objKey]) && 
                  item[objKey].length > 0 && 
                  typeof item[objKey][0] !== "string"
                ) {
                  const hasUrlProperty = item[objKey][0]?.url !== undefined;
                  const hasFileProperty = item[objKey][0]?.file !== undefined;
                  const hasSelectedFlag = Object.keys(item[objKey][0]).includes('_isSelected_');
                  
                  if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                    if(!reworkKeys.includes(objKey)){
                      reworkKeys.push(objKey);
                    }
                  }
                }

              })
            });
          }); 
                  // also detect file fields at root level (outside group arrays)
          const groupArrayKeySet = new Set(["_groupArrays_", ...reworkedObject["_groupArrays_"]]);
          Object.keys(reworkedObject).forEach((key: string) => {
            if (groupArrayKeySet.has(key)) return;
            const val = reworkedObject[key];
            if (
              typeof val === 'object' &&
              Array.isArray(val) &&
              val.length > 0 &&
              typeof val[0] !== 'string'
            ) {
              const hasUrlProperty = val[0]?.url !== undefined;
              const hasFileProperty = val[0]?.file !== undefined;
              const hasSelectedFlag = Object.keys(val[0]).includes('_isSelected_');
              if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                rootReworkKeys.push(key);
              }
            }
          });
        }else
        {
          Object.keys(reworkedObject).map((item: any) => {
            if (
              typeof reworkedObject[item] === 'object' && 
              Array.isArray(reworkedObject[item]) && 
              reworkedObject[item].length > 0 && 
              typeof reworkedObject[item][0] !== "string"
            ) {
              const hasUrlProperty = reworkedObject[item][0]?.url !== undefined;
              const hasFileProperty = reworkedObject[item][0]?.file !== undefined;
              const hasSelectedFlag = Object.keys(reworkedObject[item][0]).includes('_isSelected_');
              
              if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
                reworkKeys.push(item);
              }
            }
          }); 
        }
      } else if (Array.isArray(reworkedObject)) {
        Object.keys(reworkedObject).map((item: any) => {
          if (
            typeof reworkedObject[item] === 'object' && 
            Array.isArray(reworkedObject[item]) && 
            reworkedObject[item].length > 0 && 
            typeof reworkedObject[item][0] !== "string"
          ) {
            const hasUrlProperty = reworkedObject[item][0]?.url !== undefined;
            const hasFileProperty = reworkedObject[item][0]?.file !== undefined;
            const hasSelectedFlag = Object.keys(reworkedObject[item][0]).includes('_isSelected_');
            
            if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
              reworkKeys.push(item);
            }
          }
        });
      }
    if("_groupArrays_" in reworkedObject )
    {
      if(reworkKeys.length){
        for(let i=0;i<reworkKeys.length;i++){
          for(const arrayKey of reworkedObject["_groupArrays_"]){
            for(let j=0;j<reworkedObject[arrayKey].length;j++)
            {
              let tempObj:any = reworkedObject[arrayKey][j]
              if(reworkKeys[i] in tempObj && Object.keys(tempObj).length>0 && tempObj[reworkKeys[i]].length>0)
              {
                let fileBody:any = tempObj[reworkKeys[i]].map((item:any) => item?.file)
                const uploadedKey = getUploadedKey(fileBody)
                if (uploadedKey !== undefined) {
                  reworkedObject[arrayKey][j][reworkKeys[i]] = uploadedKey
                  continue
                }
                const formData = new FormData();
                fileBody.forEach((file:File) => {
                  formData.append("file", file);
                });
                formData.append('context', reworkKeys[i]);
                formData.append("enableEncryption", fileBody[0]?.enableEncryption);
                formData.append("returnType", fileBody[0]?.returnType || 'string');
                if (encryptionFlagCont) {
                  formData.append("dpdKey" ,encryptionDpd);
                  formData.append("method" ,encryptionMethod);
                }
                if (fileBody[0]?.DbType == 'dfs') {
                  const basePath : string = getPublicEnv('NEXT_PUBLIC_DFS_PATH') || "dfs-uploads";
                  const bucketFolderame : string = getPublicEnv('NEXT_PUBLIC_DFS_BUCKETNAME') || 'uploadfile';
                  formData.append('bucketFolderame', bucketFolderame.toLowerCase());
                  formData.append('folderPath', basePath);
      
                  const res : any = await AxiosService.post(
                    `${getPublicEnv('NEXT_PUBLIC_API_BASE_URL')}/UF/uploadimg`,
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                      }
                    }
                  );
                  reworkedObject[arrayKey][j][reworkKeys[i]] = res.data.imageUrl;
                  markUploaded(fileBody, res.data.imageUrl);
                }
              }
            }
          }
        }
      }
      // upload root-level file fields (outside group arrays)
      if (rootReworkKeys.length) {
        for (let i = 0; i < rootReworkKeys.length; i++) {
          const currentValue: any = reworkedObject[rootReworkKeys[i]];
          let fileBody: any = currentValue.map((item: any) => item?.file);
          const uploadedKey = getUploadedKey(fileBody);
          if (uploadedKey !== undefined) {
            reworkedObject[rootReworkKeys[i]] = uploadedKey;
            continue;
          }
          const formData = new FormData();
          fileBody.forEach((file: File) => {
            formData.append('file', file);
          });
          formData.append('context', rootReworkKeys[i]);
          formData.append('enableEncryption', fileBody[0]?.enableEncryption);
          formData.append('returnType', fileBody[0]?.returnType || 'string');
          if (encryptionFlagCont) {
            formData.append('dpdKey', encryptionDpd);
            formData.append('method', encryptionMethod);
          }
          if (fileBody[0]?.DbType == 'dfs') {
            const basePath: string = getPublicEnv('NEXT_PUBLIC_DFS_PATH') || 'dfs-uploads';
            const bucketFolderame: string = getPublicEnv('NEXT_PUBLIC_DFS_BUCKETNAME') || 'uploadfile';
            formData.append('bucketFolderame', bucketFolderame.toLowerCase());
            formData.append('folderPath', basePath);
            const res: any = await AxiosService.post(
              `${getPublicEnv('NEXT_PUBLIC_API_BASE_URL')}/UF/uploadimg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            reworkedObject[rootReworkKeys[i]] = res.data.imageUrl;
            markUploaded(fileBody, res.data.imageUrl);
          }
        }
      }

    }else {
        if (reworkKeys.length) {
          for (let i = 0; i < reworkKeys.length; i++) {
            const currentValue: any = reworkedObject[reworkKeys[i]]
            // prepare data for document upolad panel component
            const isFlatDocStructure =
              Array.isArray(currentValue) &&
              currentValue.length > 0 &&
              currentValue[0]?.docId !== undefined

            if (isFlatDocStructure) {
              const groupedFiles = currentValue.reduce(
                (acc: any, item: any) => {
                  if (!acc[item.docId]) {
                    acc[item.docId] = []
                  }

                  acc[item.docId].push(item.file)

                  return acc
                },
                {}
              )

              const uploadedResult: any[] = []
              for (const docId in groupedFiles) {
                let fileBody: any = groupedFiles[docId]

                for (const file of fileBody) {
                  const uploadedKey = getUploadedKey([file])
                  if (uploadedKey !== undefined) {
                    uploadedResult.push(uploadedKey)
                    continue
                  }
                  const formData = new FormData()
                  
                  formData.append('file', file)
                  formData.append('context', docId)
                  formData.append('doc_group', docId)
                  formData.append(
                    'enableEncryption',
                    fileBody[0]?.enableEncryption
                  )
                  formData.append(
                    'returnType',
                    fileBody[0]?.returnType || 'string'
                  )

          if (encryptionFlagCont) {
                    formData.append('dpdKey', encryptionDpd)
                    formData.append('method', encryptionMethod)
          }

          if (fileBody[0]?.DbType == 'dfs') {
                    const basePath: string =
                      getPublicEnv('NEXT_PUBLIC_DFS_PATH') || 'dfs-uploads'

                    const bucketFolderame: string =
                      getPublicEnv('NEXT_PUBLIC_DFS_BUCKETNAME') || 'uploadfile'

                    formData.append(
                      'bucketFolderame',
                      bucketFolderame.toLowerCase()
                    )

                    formData.append('folderPath', basePath)

                    const res: any = await AxiosService.post(
              `${getPublicEnv('NEXT_PUBLIC_API_BASE_URL')}/UF/uploadimg`,
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`,
                        }
                      }
                    )

                    uploadedResult.push(res.data.imageUrl)
                    markUploaded([file], res.data.imageUrl)
                  }
                }

                reworkedObject[reworkKeys[i]] = uploadedResult
              }
            } else {
              let fileBody: any = currentValue.map((item: any) => item?.file)
              const uploadedKey = getUploadedKey(fileBody)
              if (uploadedKey !== undefined) {
                reworkedObject[reworkKeys[i]] = uploadedKey
                continue
              }
              const formData = new FormData()
              fileBody.forEach((file: File) => {
                formData.append('file', file)
              })

              formData.append('context', reworkKeys[i])
              formData.append('enableEncryption', fileBody[0]?.enableEncryption)
              formData.append('returnType', fileBody[0]?.returnType || 'string')

              if (encryptionFlagCont) {
                formData.append('dpdKey', encryptionDpd)
                formData.append('method', encryptionMethod)
              }

              if (fileBody[0]?.DbType == 'dfs') {
                const basePath: string = getPublicEnv('NEXT_PUBLIC_DFS_PATH') || 'dfs-uploads'
                const bucketFolderame: string = getPublicEnv('NEXT_PUBLIC_DFS_BUCKETNAME') || 'uploadfile'

                formData.append('bucketFolderame', bucketFolderame.toLowerCase()
                )

                formData.append('folderPath', basePath)

                const res: any = await AxiosService.post(
                  `${getPublicEnv('NEXT_PUBLIC_API_BASE_URL')}/UF/uploadimg`,
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    }
                  }
                )
                reworkedObject[reworkKeys[i]] = res.data.imageUrl
                markUploaded(fileBody, res.data.imageUrl)
              }
          }
        }
      }
    }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof reworkedObject[item]=='object')
        {
          if( reworkedObject[item].length>0 &&Object.keys(reworkedObject[item][0]).includes('_isSelected_'))
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

      if ("childTables" in reworkedObject) {
        te_saveBody.childTables = reworkedObject.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(reworkedObject))
        {
          let ifoData:any[]=[]; 
          if(lockedData?.data && Object.keys(lockedData?.data)?.length > 0){
          formData=lockedData?.data || reworkedObject || {};
          }else{
            if(tableData && tableData?.length > 0){
              formData=tableData?.data || reworkedObject || {};
            }else{
              formData=[];
              delete te_eventEmitterBody?.upId;
            }
          }
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"68aacd73430449af9dd1ef8b5a998ff5",
              controlId:"4c673f44f9da4729a67b9b3e7c95709e"
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
            if(uf_ifo?.data){
              Object.keys(uf_ifo.data).forEach(key => {
                if(uf_ifo.data[key] === '') {
                  delete uf_ifo.data[key];
                }
              });
              const responseData = {...uf_ifo?.data}; 
              ifoData.push(responseData);
              reworkedObject = ifoData;
            }
            //eventEmitter
            ifoResponse?.push({...uf_ifo?.data,...te_eventEmitterBody?.data});
          }
          //eventEmitter
          te_eventEmitterBody.data= ifoResponse;
        } 
        else{
          formData=reworkedObject
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"68aacd73430449af9dd1ef8b5a998ff5",
            controlId:"4c673f44f9da4729a67b9b3e7c95709e"
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
          if(uf_ifo?.data){
            Object.keys(uf_ifo.data).forEach(key => {
              if(uf_ifo.data[key] === '') {
                delete uf_ifo.data[key];
              }
            });
          }
            //eventEmitter
            te_eventEmitterBody.data= [{...uf_ifo?.data,...te_eventEmitterBody?.data}];
        }
      }
    //eventEmitter
    if (table98ff5Props.ssKey !== '' && table98ff5Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = table98ff5Props.ssKey;          
    }
    te_eventEmitterBody["lock"] = actionLockData;
    if (table98ff5Props?.tableName) {
      te_eventEmitterBody["tableName"] = table98ff5Props?.tableName;
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    }
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    if(te_eventEmitter?.data?.error == true){
      toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
      throw te_eventEmitter?.data?.errorDetails?.message
    }
    lockedKeysLength = lockedData?.primaryKeys?.length;
    ///////////////////////

    //infoMsg
    toast('Data Approved', 'success',true,'');
    // refreshElement
    //riseListen
    // for group
    settable98ff5Props((pre:any)=>({
      ...pre,
      refresh:!pre?.refresh,
      selectedIds:[]
    }));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
      apiSuccess=true
    }catch(err:any){
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');


      return
    }
    finally{
      if(apiSuccess)
      {

        getSelectedImageData?.clearEvents?.forEach((clearEvent: Function) => {
          clearEvent()})
      }
    }
      if(Array.isArray(table98ff5)){
        setRefetch((pre: any) => !pre)    
        // needClearValue
        let keys: any = {};
        table98ff5.map((item: any) => {
          keys[item] = '';
        })
        settable98ff5(keys);
        setLockedData({...lockedData,data:{}});
      }else{
        setRefetch((pre: any) => !pre);
        // needClearValue
        let keys: any = {};
        Object.keys(table98ff5).map((item: any) => {
          keys[item] = '';
        })
        settable98ff5(keys);
      }
  }
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        //onClick

    //eventEmitter
    await handleSave709e_1_1_1(getSelectedImageData);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

  if (approve5709e?.isHidden) {
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
          disabled= {approve5709e?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Approve")}
        </Button>}
      </div>
    
  )
}

export default ButtonApprove

