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
import { Scan } from '@/app/utils/scanService';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
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
 

const Buttonsave = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
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

  const {groupdd3f6, setgroupdd3f6}= useContext(TotalContext) as TotalContextProps;
  const {groupdd3f6Props, setgroupdd3f6Props}= useContext(TotalContext) as TotalContextProps;
  const {text574c6, settext574c6}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_dropdown6f51c, setreturn_reason_dropdown6f51c}= useContext(TotalContext) as TotalContextProps;
  const {closea52fd, setclosea52fd}= useContext(TotalContext) as TotalContextProps;
  const {savebe5ab, setsavebe5ab}= useContext(TotalContext) as TotalContextProps;
  const {transactionproduct_v1Props, settransactionproduct_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253, setoperational_pending_table0a253}= useContext(TotalContext) as TotalContextProps;
  const {operational_pending_table0a253Props, setoperational_pending_table0a253Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const groupdd3f6Ref = useRef(groupdd3f6);
  useEffect(() => {
    groupdd3f6Ref.current = groupdd3f6;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [groupdd3f6]);
  
  //group props in ref to access latest props value
  const groupdd3f6PropsRef = useRef(groupdd3f6Props);
  useEffect(() => {
    groupdd3f6PropsRef.current = groupdd3f6Props;
  }, [groupdd3f6Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = groupdd3f6,
        codeStates['setgroup'] = setgroupdd3f6,
        codeStates['groupdd3f6'] = groupdd3f6Props,
        codeStates['setgroupdd3f6'] = setgroupdd3f6Props,
        codeStates['text'] = text574c6,
        codeStates['settext'] = settext574c6,
        codeStates['return_reason_dropdown'] = return_reason_dropdown6f51c,
        codeStates['setreturn_reason_dropdown'] = setreturn_reason_dropdown6f51c,
        codeStates['close'] = closea52fd,
        codeStates['setclose'] = setclosea52fd,
        codeStates['save'] = savebe5ab,
        codeStates['setsave'] = setsavebe5ab,
        codeStates['transactionproduct_v1'] = transactionproduct_v1Props,
        codeStates['settransactionproduct_v1'] = settransactionproduct_v1Props,
        codeStates['operational_pending_table'] = operational_pending_table0a253,
        codeStates['setoperational_pending_table'] = setoperational_pending_table0a253,
        codeStates['operational_pending_table0a253'] = operational_pending_table0a253Props,
        codeStates['setoperational_pending_table0a253'] = setoperational_pending_table0a253Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {returnreasonpopupui_v1, setreturnreasonpopupui_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...groupdd3f6Ref.current};
      let parentRowSpan = 55;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "da18ab071c7c4d43957d8fd1f9ddd3f6",
        "852df16deea848d183d13a86633be5ab"
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
      if (id === "savebe5ab") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "852df16deea848d183d13a86633be5ab") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "savebe5ab");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!savebe5ab?.trigger) return;
      if(savebe5ab?.trigger){
      setsavebe5ab((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[savebe5ab?.trigger])

  useEffect(()=>{
    if(savebe5ab?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[savebe5ab?.refresh])
  

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

  async function handleSavee5ab_1_1_1(){
      

  setValidateRefetch((pre: any) => ({ ...pre, value: !pre.value, init: pre.init + 1 }));
    await delay(1000); 

    const groupdd3f6Props = groupdd3f6PropsRef.current;

    let currentValidate: any = validateRef.current;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
  const hasInvalidField = Object.values(currentValidate?.returnReasonPopUpUi_v1 || {}).some(val => {
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
      let mainData:any=structuredClone(groupdd3f6Ref.current);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        ssKey: [],
        data: {},
        lock: {}
      }
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
        if(groupdd3f6?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
          throw 'Please give proper data';
        }
      let eventProperty :any = {
  "id": "852df16deea848d183d13a86633be5ab",
  "type": "button",
  "name": "save",
  "label": "save",
  "sequence": 1,
  "children": [
    {
      "id": "852df16deea848d183d13a86633be5ab.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "852df16deea848d183d13a86633be5ab.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "852df16deea848d183d13a86633be5ab.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "852df16deea848d183d13a86633be5ab.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "clearHandler",
                  "label": "clearHandler",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "da18ab071c7c4d43957d8fd1f9ddd3f6.1.1.1.1.1.1",
                      "type": "group",
                      "name": "returnReasonPopUpUi|group",
                      "label": "returnReasonPopUpUi|group",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:returnReasonPopUpUi:AFVK:v1|group",
                      "elementType": "group",
                      "groupType": "group",
                      "sequence": "1.1.1.1.1.1",
                      "children": []
                    },
                    {
                      "id": "852df16deea848d183d13a86633be5ab.1.1.1.1.1.2",
                      "eventContext": "rise",
                      "value": "",
                      "type": "handlerNode",
                      "name": "closeHandler",
                      "label": "closeHandler",
                      "sequence": "1.1.1.1.1.2",
                      "children": [
                        {
                          "id": "852df16deea848d183d13a86633be5ab.1.1.1.1.1.2.1",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "showArtifact",
                          "label": "showArtifact",
                          "sequence": "1.1.1.1.1.2.1",
                          "children": [
                            {
                              "id": "0c98c85835d2416698e99608f529c176.1.1.1.1.1.2.1.1",
                              "value": "",
                              "type": "screen",
                              "name": "transactionProduct.v1",
                              "label": "transactionProduct.v1|Root",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1",
                              "elementType": "",
                              "groupType": "",
                              "sequence": "1.1.1.1.1.2.1.1",
                              "children": []
                            }
                          ],
                          "hlr": {
                            "params": [
                              {
                                "name": "Filter Conditions",
                                "_type": "array",
                                "_empty": true,
                                "items": [
                                  {
                                    "name": "DFD Key",
                                    "_type": "asyncSelection",
                                    "selectionList": [],
                                    "value": "",
                                    "enabled": true,
                                    "_payload": {
                                      "key": "",
                                      "nodeType": "searchParams"
                                    },
                                    "subSelection": {
                                      "name": "Select node Name",
                                      "_type": "array",
                                      "items": [
                                        {
                                          "name": "nodeName",
                                          "_type": "apiSelection",
                                          "_payload": {
                                            "key": "",
                                            "nodeType": "searchParams"
                                          },
                                          "selectionList": [],
                                          "value": "",
                                          "enabled": true,
                                          "subSelection": {
                                            "name": "filter",
                                            "_type": "array",
                                            "items": [
                                              {
                                                "filterParam": {
                                                  "name": "filterParam",
                                                  "_type": "objectSelection",
                                                  "selectionList": [],
                                                  "value": {},
                                                  "enabled": true
                                                },
                                                "filterValue": {
                                                  "name": "filterValue",
                                                  "_type": "comboBox",
                                                  "selectionList": [],
                                                  "value": "",
                                                  "enabled": true
                                                }
                                              }
                                            ],
                                            "selectionList": [],
                                            "value": {},
                                            "enabled": true
                                          }
                                        }
                                      ],
                                      "enabled": true
                                    }
                                  }
                                ],
                                "selectionList": [],
                                "value": ""
                              }
                            ]
                          }
                        },
                        {
                          "id": "852df16deea848d183d13a86633be5ab.1.1.1.1.1.2.2",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "refreshElement",
                          "label": "refreshElement",
                          "sequence": "1.1.1.1.1.2.2",
                          "children": [
                            {
                              "id": "ec0fa3b3e01145269d4d5b2823e0a253.1.1.1.1.1.2.2.1",
                              "value": "",
                              "type": "screen",
                              "name": "transactionProduct.v1|operational_pending_table",
                              "label": "transactionProduct.v1|operational_pending_table",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1|operational_pending_table",
                              "elementType": "group",
                              "groupType": "table",
                              "sequence": "1.1.1.1.1.2.2.1",
                              "children": []
                            }
                          ]
                        }
                      ],
                      "hlr": {}
                    }
                  ],
                  "hlr": {}
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "message",
                    "_type": "text",
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
                  },
                  {
                    "name": "autoClose",
                    "_label": "Auto close toast",
                    "_type": "boolean",
                    "value": true,
                    "enabled": true
                  },
                  {
                    "name": "variant",
                    "_type": "select",
                    "selectionList": [
                      "display-4",
                      "display-3",
                      "display-2",
                      "display-1",
                      "header-2",
                      "header-1",
                      "subheader-3",
                      "subheader-2",
                      "subheader-1",
                      "body-3",
                      "body-2",
                      "body-1",
                      "body-short",
                      "caption-2",
                      "caption-1",
                      "code-3",
                      "code-inline-3",
                      "code-2",
                      "code-inline-2",
                      "code-1",
                      "code-inline-1"
                    ],
                    "value": "subheader-3",
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
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              },
              {
                "name": "needToast",
                "_type": "conditionalBoolean",
                "value": false,
                "enabled": true,
                "subSelection": {
                  "_true": {
                    "content": {
                      "name": "Path",
                      "_type": "text",
                      "value": "",
                      "enabled": true
                    },
                    "position": {
                      "name": "Type",
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
                  }
                }
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:RTGS:AFK:changeStatusTranUpdateLogInsert:AFVK:v1|314b970eed014fa1b6484a9822a9c300"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:returnReasonPopUpUi:AFVK:v1";
      sourceId+= "|"+"da18ab071c7c4d43957d8fd1f9ddd3f6";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:returnReasonPopUpUi:AFVK:v1"+"|"+"da18ab071c7c4d43957d8fd1f9ddd3f6"+"|"+eventProperty.id;
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
        upId : groupdd3f6?.upId? [groupdd3f6?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName : "save"
      }
      }else{
      if(Array.isArray(tableData) && hasValidupId){
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : groupdd3f6?.upId? [groupdd3f6?.upId ] : upId,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId
      }}else{
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : groupdd3f6?.upId? [groupdd3f6?.upId ] : groupdd3f6?.trs_process_id? [groupdd3f6?.trs_process_id ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "save"
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
    let reworkedObject:any = nullFilter({ ...groupdd3f6Ref.current });
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
                if (fileBody[0]?.DbType == 'mongodb') {
                const res : any = await AxiosService.post("/UF/upload", formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    }
                  });
                  reworkedObject[arrayKey][j][reworkKeys[i]] = res.data.fileId;
                }else if (fileBody[0]?.DbType == 'dfs') {
                  const basePath : string = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
                  const bucketFolderame : string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
                  formData.append('bucketFolderame', bucketFolderame.toLowerCase());
                  formData.append('folderPath', basePath);
      
                  const res : any = await AxiosService.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                    formData,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                      }
                    }
                  );
                  reworkedObject[arrayKey][j][reworkKeys[i]] = res.data.imageUrl;
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
          if (fileBody[0]?.DbType == 'mongodb') {
            const res: any = await AxiosService.post('/UF/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            reworkedObject[rootReworkKeys[i]] = res.data.fileId;
          } else if (fileBody[0]?.DbType == 'dfs') {
            const basePath: string = process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads';
            const bucketFolderame: string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
            formData.append('bucketFolderame', bucketFolderame.toLowerCase());
            formData.append('folderPath', basePath);
            const res: any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            reworkedObject[rootReworkKeys[i]] = res.data.imageUrl;
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

          if (fileBody[0]?.DbType == 'mongodb') {
                    const res: any = await AxiosService.post(
                      '/UF/upload',
                      formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`
              }
                      }
                    )
                    uploadedResult.push(res.data.fileId)
          } else if (fileBody[0]?.DbType == 'dfs') {
                    const basePath: string =
                      process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads'

                    const bucketFolderame: string =
                      process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile'

                    formData.append(
                      'bucketFolderame',
                      bucketFolderame.toLowerCase()
                    )

                    formData.append('folderPath', basePath)

                    const res: any = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`,
                        }
                      }
                    )

                    uploadedResult.push(res.data.imageUrl)
                  }
                }

                reworkedObject[reworkKeys[i]] = uploadedResult
              }
            } else {
              let fileBody: any = currentValue.map((item: any) => item?.file)
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

              if (fileBody[0]?.DbType == 'mongodb') {
                const res: any = await AxiosService.post(
                  '/UF/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`
                }
              }
                )

                reworkedObject[reworkKeys[i]] = res.data.fileId
              } else if (fileBody[0]?.DbType == 'dfs') {
                const basePath: string = process.env.NEXT_PUBLIC_DFS_PATH || 'dfs-uploads'
                const bucketFolderame: string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile'

                formData.append('bucketFolderame', bucketFolderame.toLowerCase()
                )

                formData.append('folderPath', basePath)

                const res: any = await AxiosService.post(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    }
                  }
                )
                reworkedObject[reworkKeys[i]] = res.data.imageUrl
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
              groupId:"da18ab071c7c4d43957d8fd1f9ddd3f6",
              controlId:"852df16deea848d183d13a86633be5ab"
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
            groupId:"da18ab071c7c4d43957d8fd1f9ddd3f6",
            controlId:"852df16deea848d183d13a86633be5ab"
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
    if (groupdd3f6Props.ssKey !== '' && groupdd3f6Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = groupdd3f6Props.ssKey;          
    }
    te_eventEmitterBody["lock"] = actionLockData;
    if (groupdd3f6Props?.tableName) {
      te_eventEmitterBody["tableName"] = groupdd3f6Props?.tableName;
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
    toast('Data saved successfully', 'success',true);
    // clearHandler riseListen
    // for group
    Object.keys(groupdd3f6).map((keys:any)=>{         
      groupdd3f6[keys]="";
    })
    setgroupdd3f6({...groupdd3f6});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
    // closeHandler   
    eventBus.emit('closeModal', 'returnreasonpopupui');
    // showArtifact
    let filterProps4: any =  [];
      let filterData4 = await getFilterProps(filterProps4,{...groupdd3f6});
    settransactionproduct_v1Props([...filterData4 ]);
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1', 'transactionproduct_v1'));
    // refreshElement
    //riseListen
    // for group
    setoperational_pending_table0a253Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
    }catch(err:any){
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');


      return
    }
  }
  const handleClick=async(showModal: boolean = true)=>{
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setgroupdd3f6((prev: any) => ({ ...prev, save: true }));
        //onClick

    //eventEmitter
    await handleSavee5ab_1_1_1();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroupdd3f6((prev: any) => ({ ...prev, save: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroupdd3f6((prev: any) => ({ ...prev, save: false }));
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

 if (savebe5ab?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `20 / 24`,gridRow: `20 / 29`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-blue-600 !text-white !py-2 !rounded-md flex items-center"
          onClick={handleClick}
          view='action'
          disabled= {savebe5ab?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Save")}
        </Button>}
      </div>
    
  )
}

export default Buttonsave

