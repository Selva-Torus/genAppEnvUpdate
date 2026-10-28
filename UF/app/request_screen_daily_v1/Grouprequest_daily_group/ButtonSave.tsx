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
 

const ButtonSave = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {emailaf076, setemailaf076}= useContext(TotalContext) as TotalContextProps;
  const {expense_date92269, setexpense_date92269}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1fb6, setclaim_categoryf1fb6}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {iscommentenabled7244d, setiscommentenabled7244d}= useContext(TotalContext) as TotalContextProps;
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
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const request_daily_group44e40Ref = useRef(request_daily_group44e40);
  useEffect(() => {
    request_daily_group44e40Ref.current = request_daily_group44e40;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [request_daily_group44e40]);
  
  //group props in ref to access latest props value
  const request_daily_group44e40PropsRef = useRef(request_daily_group44e40Props);
  useEffect(() => {
    request_daily_group44e40PropsRef.current = request_daily_group44e40Props;
  }, [request_daily_group44e40Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['request_daily_group'] = request_daily_group44e40,
        codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
        codeStates['request_daily_group44e40'] = request_daily_group44e40Props,
        codeStates['setrequest_daily_group44e40'] = setrequest_daily_group44e40Props,
        codeStates['daily_expense'] = daily_expensefb8cc,
        codeStates['setdaily_expense'] = setdaily_expensefb8cc,
        codeStates['claim_expense_type'] = claim_expense_type22d67,
        codeStates['setclaim_expense_type'] = setclaim_expense_type22d67,
        codeStates['expense_name'] = expense_name5f562,
        codeStates['setexpense_name'] = setexpense_name5f562,
        codeStates['email'] = emailaf076,
        codeStates['setemail'] = setemailaf076,
        codeStates['expense_date'] = expense_date92269,
        codeStates['setexpense_date'] = setexpense_date92269,
        codeStates['claim_category'] = claim_categoryf1fb6,
        codeStates['setclaim_category'] = setclaim_categoryf1fb6,
        codeStates['category_total_amount'] = category_total_amount9782f,
        codeStates['setcategory_total_amount'] = setcategory_total_amount9782f,
        codeStates['attachment'] = attachment04414,
        codeStates['setattachment'] = setattachment04414,
        codeStates['receipt_image'] = receipt_image6afe2,
        codeStates['setreceipt_image'] = setreceipt_image6afe2,
        codeStates['enabletext'] = enabletextb4878,
        codeStates['setenabletext'] = setenabletextb4878,
        codeStates['comments'] = commentsf2394,
        codeStates['setcomments'] = setcommentsf2394,
        codeStates['iscommentenabled'] = iscommentenabled7244d,
        codeStates['setiscommentenabled'] = setiscommentenabled7244d,
        codeStates['clear'] = clear14ae7,
        codeStates['setclear'] = setclear14ae7,
        codeStates['save'] = saved507e,
        codeStates['setsave'] = setsaved507e,
        codeStates['pendingcard'] = pendingcardee3c0,
        codeStates['setpendingcard'] = setpendingcardee3c0,
        codeStates['user_grp'] = user_grpd6690,
        codeStates['setuser_grp'] = setuser_grpd6690,
        codeStates['user_grpd6690'] = user_grpd6690Props,
        codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
        codeStates['dailyexpenses'] = dailyexpenses798bd,
        codeStates['setdailyexpenses'] = setdailyexpenses798bd,
        codeStates['daily_expense_table'] = daily_expense_table13758,
        codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
        codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
        codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
        codeStates['approvedcard'] = approvedcardc5971,
        codeStates['setapprovedcard'] = setapprovedcardc5971,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {request_screen_daily_v1, setrequest_screen_daily_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...request_daily_group44e40Ref.current,...data};
      let parentRowSpan = 201;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "483e1dce061b49cebe0c9e46b0844e40",
        "bb92a0e80a324d5c915b35603e4d507e"
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
      if (id === "saved507e") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "bb92a0e80a324d5c915b35603e4d507e") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "saved507e");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (saved507e?.trigger) 
    {
      handleClick()
      setsaved507e((prev:any) => ({...prev, trigger: false}));
    }
  },[saved507e?.trigger])

  useEffect(()=>{
    if(saved507e?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[saved507e?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, Request_Screen_Daily_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  async function handleSave507e_1_1_1(getSelectedImageData?:any){
    let apiSuccess:boolean = false;
      

  setValidateRefetch((pre: any) => ({ ...pre, value: !pre.value, init: pre.init + 1 }));
    await delay(1000); 

    const request_daily_group44e40Props = request_daily_group44e40PropsRef.current;

    let currentValidate: any = validateRef.current;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
  const hasInvalidField = Object.values(currentValidate?.Request_Screen_Daily_v1 || {}).some(val => {
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
      let mainData:any=structuredClone(request_daily_group44e40Ref.current);
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
      let tagetKey:string="CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
      let uf_getPFDetails:any={
        key: "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      let eventProperty :any = {
  "id": "bb92a0e80a324d5c915b35603e4d507e",
  "type": "button",
  "name": "Save",
  "label": "Save",
  "sequence": 1,
  "children": [
    {
      "id": "bb92a0e80a324d5c915b35603e4d507e.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "saveHandler",
          "label": "saveHandler",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "bb92a0e80a324d5c915b35603e4d507e.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "disableElement",
                  "label": "disableElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "483e1dce061b49cebe0c9e46b0844e40|f5e442240e47412d8af3ce6beb9f2394.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "Request_Screen_Daily.v1|request_daily_group|comments",
                      "label": "Request_Screen_Daily.v1|request_daily_group|comments",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Daily:AFVK:v1|request_daily_group|comments",
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
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.2",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|495711d8ddf44734983661c8f9eee3c0.1.1.1.1.2.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|pendingcard",
                      "label": "Dashboard_For_User.v1|User_Grp|pendingcard",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1|User_Grp|pendingcard",
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
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.3",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|10ee33245621462090666ca8c1d798bd.1.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|dailyexpenses",
                      "label": "Dashboard_For_User.v1|User_Grp|dailyexpenses",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1|User_Grp|dailyexpenses",
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
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.4",
                  "children": [
                    {
                      "id": "2c198b49b883478ca1a170b5bad13758.1.1.1.1.4.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|daily_expense_table",
                      "label": "Dashboard_For_User.v1|daily_expense_table",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1|daily_expense_table",
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
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.5",
                  "children": [
                    {
                      "id": "0dd5e93ebe734a2da4503278cd0d6690|7d5ecb74896b444e93036544256c5971.1.1.1.1.5.1",
                      "value": "",
                      "type": "screen",
                      "name": "Dashboard_For_User.v1|User_Grp|approvedcard",
                      "label": "Dashboard_For_User.v1|User_Grp|approvedcard",
                      "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Dashboard_For_User:AFVK:v1|User_Grp|approvedcard",
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
                "value": "",
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
            "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:RF:AFK:Process_Fabric_For_Reimfast:AFVK:v1|b781f7340cc74a608278cc04b5c5d184"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Daily:AFVK:v1";
      sourceId+= "|"+"483e1dce061b49cebe0c9e46b0844e40";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Request_Screen_Daily:AFVK:v1"+"|"+"483e1dce061b49cebe0c9e46b0844e40"+"|"+eventProperty.id;
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

  // saveHandler
    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_event_process_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }
      let reworkedObject:any = nullFilter({ ...request_daily_group44e40Ref.current });
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
          if(uf_ifo?.data){
            Object.keys(uf_ifo.data).forEach(key => {
              if(uf_ifo.data[key] === '') {
                delete uf_ifo.data[key];
              }
            });
          }
            formData={...uf_ifo?.data};
            reworkedObject=formData;
        }
      }
        //saveHandler
        if(Array.isArray(reworkedObject))
        {
          te_saveBody.data = reworkedObject.map((item: any) => {
            return { ...nullFilter(item), ...eventData }
          })
          te_saveBody["enableBulk"] = true;
        }
        else
        {
          te_saveBody.data = {...nullFilter(reworkedObject),...eventData};
        }
        te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status;
        te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId;
        te_saveBody.controlName = "Save";
        if(mainData?.upId)
        {
          te_saveBody['upId']= mainData.upId;
        }
        if(mainData?.upid)
        {
          te_saveBody['upId']= mainData.upid;
        }
        if(request_daily_group44e40?.upId){
          te_saveBody['upId']= request_daily_group44e40?.upId;
        }
        if(request_daily_group44e40?.upid){
          te_saveBody['upId']= request_daily_group44e40?.upid;
        }
        te_saveBody.key= te_saveBody?.key?.slice(0, te_saveBody?.key?.lastIndexOf(':')) + ':';

        if (request_daily_group44e40Props.ssKey !== '' && request_daily_group44e40Props.ssKey !== undefined) {
          te_saveBody["ssKey"] = request_daily_group44e40Props.ssKey;
          
        }
      
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
    ///////////////////////

    //infoMsg
    toast('Data saved successfully', 'success',true,'');
    //disableElement
    setcommentsf2394((prev: any) => ({ ...prev, isDisabled: true }));
    // refreshElement
    // for controller 1
    //riseListen
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["pendingcard"];
      setuser_grpd6690(temp);
    }
    setpendingcardee3c0((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("pendingcardee3c0",1,10,encryptionFlagCompData)
    // refreshElement
    // for controller 1
    //riseListen
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["dailyexpenses"];
      setuser_grpd6690(temp);
    }
    setdailyexpenses798bd((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("dailyexpenses798bd",1,10,encryptionFlagCompData)
    // refreshElement
    //riseListen
    // for group
    setdaily_expense_table13758Props((pre:any)=>({
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
    // refreshElement
    // for controller 1
    //riseListen
    if(Object.keys(user_grpd6690).length>0){
      let temp:any=user_grpd6690;
      delete temp["approvedcard"];
      setuser_grpd6690(temp);
    }
    setapprovedcardc5971((pre:any)=>({...pre,refresh:!pre?.refresh}));
    handleDfdRefresh("approvedcardc5971",1,10,encryptionFlagCompData)
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
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setrequest_daily_group44e40((prev: any) => ({ ...prev, save: true }));
        //onClick

    //saveHandler
    await handleSave507e_1_1_1(getSelectedImageData);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setrequest_daily_group44e40((prev: any) => ({ ...prev, save: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setrequest_daily_group44e40((prev: any) => ({ ...prev, save: false }));
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

  if (saved507e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `18 / 20`,gridRow: `179 / 187`, gap:``, height: `100%`, overflow: 'auto'}} 
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

