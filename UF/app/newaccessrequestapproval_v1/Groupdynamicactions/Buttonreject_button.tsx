'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
 

const Buttonreject_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
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
    
 /////////////
   //another screen

  const {new_access_group89009, setnew_access_group89009}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group89009Props, setnew_access_group89009Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698, setaccess_req__groupf6698}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698Props, setaccess_req__groupf6698Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fc, setbusiness_just__group5c7fc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fcProps, setbusiness_just__group5c7fcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09d, setvalid_groupec09d}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09dProps, setvalid_groupec09dProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185e, setapp_inf_group4185e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185eProps, setapp_inf_group4185eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509, setapprove_group6b509}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509Props, setapprove_group6b509Props}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52, setprovision_groupf5a52}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52Props, setprovision_groupf5a52Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1, setprov_group33ef1}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1Props, setprov_group33ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6ae, setrevocation_group9c6ae}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6aeProps, setrevocation_group9c6aeProps}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cb, setrev_group4b1cb}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cbProps, setrev_group4b1cbProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9, setaudit_group270d9}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9Props, setaudit_group270d9Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364, setdynamicactions51364}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364Props, setdynamicactions51364Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel6a7f9, setcancel6a7f9}= useContext(TotalContext) as TotalContextProps;
  const {approve_button2a6ba, setapprove_button2a6ba}= useContext(TotalContext) as TotalContextProps;
  const {reject_buttone810c, setreject_buttone810c}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6, setaccess_req_table3ced6}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6Props, setaccess_req_table3ced6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions51364Ref = useRef(dynamicactions51364);
  useEffect(() => {
    dynamicactions51364Ref.current = dynamicactions51364;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions51364]);
  
  //group props in ref to access latest props value
  const dynamicactions51364PropsRef = useRef(dynamicactions51364Props);
  useEffect(() => {
    dynamicactions51364PropsRef.current = dynamicactions51364Props;
  }, [dynamicactions51364Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['new_access_group'] = new_access_group89009,
        codeStates['setnew_access_group'] = setnew_access_group89009,
        codeStates['new_access_group89009'] = new_access_group89009Props,
        codeStates['setnew_access_group89009'] = setnew_access_group89009Props,
        codeStates['access_req__group'] = access_req__groupf6698,
        codeStates['setaccess_req__group'] = setaccess_req__groupf6698,
        codeStates['access_req__groupf6698'] = access_req__groupf6698Props,
        codeStates['setaccess_req__groupf6698'] = setaccess_req__groupf6698Props,
        codeStates['business_just__group'] = business_just__group5c7fc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group5c7fc,
        codeStates['business_just__group5c7fc'] = business_just__group5c7fcProps,
        codeStates['setbusiness_just__group5c7fc'] = setbusiness_just__group5c7fcProps,
        codeStates['valid_group'] = valid_groupec09d,
        codeStates['setvalid_group'] = setvalid_groupec09d,
        codeStates['valid_groupec09d'] = valid_groupec09dProps,
        codeStates['setvalid_groupec09d'] = setvalid_groupec09dProps,
        codeStates['app_inf_group'] = app_inf_group4185e,
        codeStates['setapp_inf_group'] = setapp_inf_group4185e,
        codeStates['app_inf_group4185e'] = app_inf_group4185eProps,
        codeStates['setapp_inf_group4185e'] = setapp_inf_group4185eProps,
        codeStates['approve_group'] = approve_group6b509,
        codeStates['setapprove_group'] = setapprove_group6b509,
        codeStates['approve_group6b509'] = approve_group6b509Props,
        codeStates['setapprove_group6b509'] = setapprove_group6b509Props,
        codeStates['provision_group'] = provision_groupf5a52,
        codeStates['setprovision_group'] = setprovision_groupf5a52,
        codeStates['provision_groupf5a52'] = provision_groupf5a52Props,
        codeStates['setprovision_groupf5a52'] = setprovision_groupf5a52Props,
        codeStates['prov_group'] = prov_group33ef1,
        codeStates['setprov_group'] = setprov_group33ef1,
        codeStates['prov_group33ef1'] = prov_group33ef1Props,
        codeStates['setprov_group33ef1'] = setprov_group33ef1Props,
        codeStates['revocation_group'] = revocation_group9c6ae,
        codeStates['setrevocation_group'] = setrevocation_group9c6ae,
        codeStates['revocation_group9c6ae'] = revocation_group9c6aeProps,
        codeStates['setrevocation_group9c6ae'] = setrevocation_group9c6aeProps,
        codeStates['rev_group'] = rev_group4b1cb,
        codeStates['setrev_group'] = setrev_group4b1cb,
        codeStates['rev_group4b1cb'] = rev_group4b1cbProps,
        codeStates['setrev_group4b1cb'] = setrev_group4b1cbProps,
        codeStates['audit_group'] = audit_group270d9,
        codeStates['setaudit_group'] = setaudit_group270d9,
        codeStates['audit_group270d9'] = audit_group270d9Props,
        codeStates['setaudit_group270d9'] = setaudit_group270d9Props,
        codeStates['dynamicactions'] = dynamicactions51364,
        codeStates['setdynamicactions'] = setdynamicactions51364,
        codeStates['dynamicactions51364'] = dynamicactions51364Props,
        codeStates['setdynamicactions51364'] = setdynamicactions51364Props,
        codeStates['cancel'] = cancel6a7f9,
        codeStates['setcancel'] = setcancel6a7f9,
        codeStates['approve_button'] = approve_button2a6ba,
        codeStates['setapprove_button'] = setapprove_button2a6ba,
        codeStates['reject_button'] = reject_buttone810c,
        codeStates['setreject_button'] = setreject_buttone810c,
        codeStates['access_req_table'] = access_req_table3ced6,
        codeStates['setaccess_req_table'] = setaccess_req_table3ced6,
        codeStates['access_req_table3ced6'] = access_req_table3ced6Props,
        codeStates['setaccess_req_table3ced6'] = setaccess_req_table3ced6Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {newaccessrequestapproval_v1, setnewaccessrequestapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...dynamicactions51364Ref.current};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "987efbf92f26f9cdd3f8f9c04f851364",
        "60f198ff686165ee09cda87682de810c"
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
    if(orchestrationData?.data?.rule?.nodes?.length > 0){
      setRulseData(orchestrationData?.data?.rule.nodes)
      let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,session:decodedTokenObj,...data,...memoryVariables});
      // schemaFlag =schemaFlag.output;
      let order:number = Number(schemaFlag.order);

      // Update grid position based on order number
      
      if (order && typeof order === 'number') {
        const position : any = getGridPositionFromOrder(order,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      } else if( "start" in schemaFlag && "end" in schemaFlag)
      {
        const position : any = getGridPositionFromOrder(schemaFlag,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      }
      else{
        setStyleSate({ pointerEvents: 'auto'})
      } 

      if (schemaFlag.output !== "true") {
        setShowFlag(false);
      }else{
        setShowFlag(true)
      }
    }else if(dynamicactions51364Props?.isHaveRule==true){
      if("reject_button" in dynamicactions51364Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions51364Props?.dynamicActionRule?.reject_button,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("reject_button" in newaccessrequestapproval_v1?.dynamicactions && newaccessrequestapproval_v1?.dynamicactions["reject_button"]?.itsHaveArtifact== true)
      {
        setShowFlag(newaccessrequestapproval_v1?.dynamicactions["reject_button"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(newaccessrequestapproval_v1?.dynamicactions?.reject_button?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }else{
        setShowFlag(false)
      }
    }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "reject_buttone810c") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "60f198ff686165ee09cda87682de810c") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "reject_buttone810c");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!reject_buttone810c?.trigger) return;
      if(reject_buttone810c?.trigger){
      setreject_buttone810c((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[reject_buttone810c?.trigger])

  useEffect(()=>{
    if(reject_buttone810c?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[reject_buttone810c?.refresh])
  

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

  async function handleSave810c_1_1_1(){
      

  setValidateRefetch((pre: any) => ({ ...pre, value: !pre.value, init: pre.init + 1 }));
    await delay(1000); 

    const dynamicactions51364Props = dynamicactions51364PropsRef.current;

    let currentValidate: any = validateRef.current;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
  const hasInvalidField = Object.values(currentValidate?.newAccessRequestApproval_v1 || {}).some(val => {
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
      let mainData:any=structuredClone(dynamicactions51364Ref.current);
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
      let tagetKey:string=""
      let uf_getPFDetails:any={
        key: ""
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
        if(dynamicactions51364?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
          throw 'Please give proper data';
        }
      let eventProperty :any = {
  "id": "60f198ff686165ee09cda87682de810c",
  "type": "button",
  "name": "reject_button",
  "label": "reject_button",
  "sequence": 1,
  "children": [
    {
      "id": "60f198ff686165ee09cda87682de810c.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "60f198ff686165ee09cda87682de810c.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "60f198ff686165ee09cda87682de810c.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "refreshElement",
              "label": "refreshElement",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "6b7c6238e3f84271b65c7f36e733ced6.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "accessRequest.v1|access_req_table",
                  "label": "accessRequest.v1|access_req_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1|access_req_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1.1",
                  "children": []
                }
              ]
            },
            {
              "id": "60f198ff686165ee09cda87682de810c.1.1.1.2",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.2",
              "children": [
                {
                  "id": "60f198ff686165ee09cda87682de810c.1.1.1.2.1",
                  "eventContext": "rise",
                  "value": "",
                  "type": "handlerNode",
                  "name": "closeHandler",
                  "label": "closeHandler",
                  "sequence": "1.1.1.2.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "message",
                    "_type": "text",
                    "value": "Request Rejected",
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
                    "value": false,
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
                "value": "Rejected",
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
          }
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequestApproval:AFVK:v1";
      sourceId+= "|"+"987efbf92f26f9cdd3f8f9c04f851364";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequestApproval:AFVK:v1"+"|"+"987efbf92f26f9cdd3f8f9c04f851364"+"|"+eventProperty.id;
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
        upId : dynamicactions51364?.upId? [dynamicactions51364?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName : "reject_button"
      }
      }else{
      if(Array.isArray(tableData) && hasValidupId){
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : dynamicactions51364?.upId? [dynamicactions51364?.upId ] : upId,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId
      }}else{
        te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : dynamicactions51364?.upId? [dynamicactions51364?.upId ] : dynamicactions51364?.trs_process_id? [dynamicactions51364?.trs_process_id ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "reject_button"
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
    let reworkedObject:any = nullFilter({ ...dynamicactions51364Ref.current, ...nullFilter(new_access_group89009), ...nullFilter(access_req__groupf6698), ...nullFilter(business_just__group5c7fc), ...nullFilter(valid_groupec09d), ...nullFilter(app_inf_group4185e), ...nullFilter(approve_group6b509), ...nullFilter(provision_groupf5a52), ...nullFilter(prov_group33ef1), ...nullFilter(revocation_group9c6ae), ...nullFilter(rev_group4b1cb), ...nullFilter(audit_group270d9) });
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
              { headers: { 'Content-Type': 'multipart/form-data' } }
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
                          'Content-Type': 'multipart/form-data'
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
                      'Content-Type': 'multipart/form-data'
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
              groupId:"987efbf92f26f9cdd3f8f9c04f851364",
              controlId:"60f198ff686165ee09cda87682de810c"
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
            groupId:"987efbf92f26f9cdd3f8f9c04f851364",
            controlId:"60f198ff686165ee09cda87682de810c"
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
    if (dynamicactions51364Props.ssKey !== '' && dynamicactions51364Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = dynamicactions51364Props.ssKey;          
    }
    te_eventEmitterBody["lock"] = actionLockData;
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

    // refreshElement
    //riseListen
    // for group
    setaccess_req_table3ced6Props((pre:any)=>({...pre,refresh:!pre?.refresh}));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
    //infoMsg
    toast('Request Rejected', 'success',false);
    // closeHandler   
    eventBus.emit('closeModal', 'newaccessrequestapproval');
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
        setdynamicactions51364((prev: any) => ({ ...prev, reject_button: true }));
        //onClick

    //eventEmitter
    await handleSave810c_1_1_1();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions51364((prev: any) => ({ ...prev, reject_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setdynamicactions51364((prev: any) => ({ ...prev, reject_button: false }));
    }
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

    useEffect(() => {
    let forGetFormDataPointedData = {
      };
      handleMapper(forGetFormDataPointedData);

  }, [newaccessrequestapproval_v1?.dynamicactions?.reject_button,dynamicactions51364Props?.dynamicActionRule?.reject_button,])

 if (reject_buttone810c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#EF4444] hover:!bg-[#DC2626] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {reject_buttone810c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Rejected")}
        </Button>}
      </div>
    
  )
}

export default Buttonreject_button

