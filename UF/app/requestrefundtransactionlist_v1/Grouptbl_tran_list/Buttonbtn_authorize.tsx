'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { unlocktbl_tran_listRecord as unlocktable0634aRecord } from '@/app/returntransactionlist_v1/Grouptbl_tran_list/Tabletbl_tran_list';
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
 

const Buttonbtn_authorize = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {grp_overall_tran_listc200a, setgrp_overall_tran_listc200a}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_listc200aProps, setgrp_overall_tran_listc200aProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634a, settbl_tran_list0634a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list0634aProps, settbl_tran_list0634aProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mol35ce2, setcol_emp_mol35ce2}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name53515, setcol_emp_name53515}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_acc_no519d3, setcol_cr_acc_no519d3}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt0743c, setcol_fixed_amnt0743c}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt25d0d, setcol_var_amnt25d0d}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_tran_amnt1acc3, setcol_tot_tran_amnt1acc3}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date5679d, setcol_created_date5679d}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_namebaf46, setcol_sf_file_namebaf46}= useContext(TotalContext) as TotalContextProps;
  const {col_rsn_codeaa610, setcol_rsn_codeaa610}= useContext(TotalContext) as TotalContextProps;
  const {btn_initiate6f8a7, setbtn_initiate6f8a7}= useContext(TotalContext) as TotalContextProps;
  const {col_uuid8350f, setcol_uuid8350f}= useContext(TotalContext) as TotalContextProps;
  const {btn_authorize7ae96, setbtn_authorize7ae96}= useContext(TotalContext) as TotalContextProps;
  const {btn_back41a76, setbtn_back41a76}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_tran_list'] = grp_overall_tran_listc200a,
      codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_listc200a,
      codeStates['grp_overall_tran_listc200a'] = grp_overall_tran_listc200aProps,
      codeStates['setgrp_overall_tran_listc200a'] = setgrp_overall_tran_listc200aProps,
      codeStates['tbl_tran_list'] = tbl_tran_list0634a,
      codeStates['settbl_tran_list'] = settbl_tran_list0634a,
      codeStates['tbl_tran_list0634a'] = tbl_tran_list0634aProps,
      codeStates['settbl_tran_list0634a'] = settbl_tran_list0634aProps,
      codeStates['col_emp_mol'] = col_emp_mol35ce2,
      codeStates['setcol_emp_mol'] = setcol_emp_mol35ce2,
      codeStates['col_emp_name'] = col_emp_name53515,
      codeStates['setcol_emp_name'] = setcol_emp_name53515,
      codeStates['col_cr_acc_no'] = col_cr_acc_no519d3,
      codeStates['setcol_cr_acc_no'] = setcol_cr_acc_no519d3,
      codeStates['col_fixed_amnt'] = col_fixed_amnt0743c,
      codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt0743c,
      codeStates['col_var_amnt'] = col_var_amnt25d0d,
      codeStates['setcol_var_amnt'] = setcol_var_amnt25d0d,
      codeStates['col_tot_tran_amnt'] = col_tot_tran_amnt1acc3,
      codeStates['setcol_tot_tran_amnt'] = setcol_tot_tran_amnt1acc3,
      codeStates['col_created_date'] = col_created_date5679d,
      codeStates['setcol_created_date'] = setcol_created_date5679d,
      codeStates['col_sf_file_name'] = col_sf_file_namebaf46,
      codeStates['setcol_sf_file_name'] = setcol_sf_file_namebaf46,
      codeStates['col_rsn_code'] = col_rsn_codeaa610,
      codeStates['setcol_rsn_code'] = setcol_rsn_codeaa610,
      codeStates['btn_initiate'] = btn_initiate6f8a7,
      codeStates['setbtn_initiate'] = setbtn_initiate6f8a7,
      codeStates['col_uuid'] = col_uuid8350f,
      codeStates['setcol_uuid'] = setcol_uuid8350f,
      codeStates['btn_authorize'] = btn_authorize7ae96,
      codeStates['setbtn_authorize'] = setbtn_authorize7ae96,
      codeStates['btn_back'] = btn_back41a76,
      codeStates['setbtn_back'] = setbtn_back41a76,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9b513c81279903e0563b418223c0634a",
        "883181a682acbf4a037a99fb00a7ae96"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "btn_authorize7ae96") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_authorize7ae96?.refresh])


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

  async function handleSaveae96_1_1_1(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.requestRefundTransactionList_v1 || {}).some(val => {
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
      //let mainData:any=structuredClone(tbl_tran_list0634a);
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
      let tagetKey:string="CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsReturnAuthorizeProcess:AFVK:v1|912557c4450ea9c8781ae45a69009640"
      let uf_getPFDetails:any={
        key: "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsReturnAuthorizeProcess:AFVK:v1|912557c4450ea9c8781ae45a69009640"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      //eventEmitter
      if(tbl_tran_list0634a?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "883181a682acbf4a037a99fb00a7ae96",
  "type": "button",
  "name": "btn_authorize",
  "label": "btn_authorize",
  "sequence": 1,
  "children": [
    {
      "id": "883181a682acbf4a037a99fb00a7ae96.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "883181a682acbf4a037a99fb00a7ae96.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "883181a682acbf4a037a99fb00a7ae96.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "883181a682acbf4a037a99fb00a7ae96.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "9b513c81279903e0563b418223c0634a.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "returnTransactionList.v1|tbl_tran_list",
                      "label": "returnTransactionList.v1|tbl_tran_list",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnTransactionList:AFVK:v1|tbl_tran_list",
                      "elementType": "group",
                      "groupType": "table",
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
                    "_type": "text",
                    "value": "Transaction has been authorized successfully",
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
                    "value": "",
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
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:WPS:AFK:wpsReturnAuthorizeProcess:AFVK:v1|912557c4450ea9c8781ae45a69009640"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:requestRefundTransactionList:AFVK:v1";
      sourceId+= "|"+"9b513c81279903e0563b418223c0634a";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:requestRefundTransactionList:AFVK:v1"+"|"+"9b513c81279903e0563b418223c0634a"+"|"+eventProperty.id;
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
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:{"trs_event_process_status":uf_getPFDetails.status},
        upId : tbl_tran_list0634a?.upId? [tbl_tran_list0634a?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "btn_authorize"
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
    let reworkKeys:any[]=[];
      if(typeof reworkedObject === 'object' && reworkedObject !== null) {
      Object.keys(reworkedObject).map((item: any) => {
        if (
          typeof tbl_tran_list0634a[item] === 'object' && 
          Array.isArray(tbl_tran_list0634a[item]) && 
          tbl_tran_list0634a[item].length > 0 && 
          typeof tbl_tran_list0634a[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_tran_list0634a[item][0]?.url !== undefined;
          const hasFileProperty = tbl_tran_list0634a[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_tran_list0634a[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(tbl_tran_list0634a).map((item: any) => {
        if (
          typeof tbl_tran_list0634a[item] === 'object' && 
          Array.isArray(tbl_tran_list0634a[item]) && 
          tbl_tran_list0634a[item].length > 0 && 
          typeof tbl_tran_list0634a[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_tran_list0634a[item][0]?.url !== undefined;
          const hasFileProperty = tbl_tran_list0634a[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_tran_list0634a[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = tbl_tran_list0634a[reworkKeys[i]].map((item:any) => item?.file)
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
            reworkedObject[reworkKeys[i]] = res.data.fileId;
          } else if (fileBody[0]?.DbType == 'dfs') {
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
            reworkedObject[reworkKeys[i]] = res.data.imageUrl;
          }
        }
      }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof tbl_tran_list0634a[item]=='object')
        {
          if( tbl_tran_list0634a[item].length>0 &&Object.keys(tbl_tran_list0634a[item][0]).includes('_isSelected_'))
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

      if ("childTables" in tbl_tran_list0634a) {
        te_saveBody.childTables = tbl_tran_list0634a.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || tbl_tran_list0634a || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"9b513c81279903e0563b418223c0634a",
              controlId:"883181a682acbf4a037a99fb00a7ae96"
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
            //eventEmitter
            ifoResponse?.push({...uf_ifo?.data,...te_eventEmitterBody?.data});
          }
          //eventEmitter
          te_eventEmitterBody.data= ifoResponse;
        } 
        else{
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:{...formData, ...nullFilter(grp_overall_tran_listc200a)},
            key:uf_getPFDetails.key,
            groupId:"9b513c81279903e0563b418223c0634a",
            controlId:"883181a682acbf4a037a99fb00a7ae96"
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
            //eventEmitter
            te_eventEmitterBody.data= [{...uf_ifo?.data,...te_eventEmitterBody?.data}];
        }
      }
    //eventEmitter
    if (tbl_tran_list0634aProps.ssKey !== '' && tbl_tran_list0634aProps.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = tbl_tran_list0634aProps.ssKey;          
    }
    if(mainData?.upId){
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(tbl_tran_list0634a?.upId){
      te_eventEmitterBody['upId']= [tbl_tran_list0634a?.upId];
    }
    if(tbl_tran_list0634a?.upid){
      te_eventEmitterBody['upId']= [tbl_tran_list0634a?.upid];
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

    //infoMsg
    toast('Transaction has been authorized successfully', 'success',true,'');
    // refreshElement
    //riseListen
    // for group
    if (Array.isArray(tbl_tran_list0634aProps?.selectedIds) && tbl_tran_list0634aProps.selectedIds.length) {
      await Promise.all(
        tbl_tran_list0634aProps.selectedIds.map((id: number) =>
          unlocktable0634aRecord(id, token)
        )
      );
    }
    settbl_tran_list0634aProps((pre:any)=>({
      ...pre,
      refresh:!pre?.refresh,
      skipUnlockOnRefresh:true,
      selectedIds:[]
    }));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    }catch(err:any){
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');


      return
    }
  }
  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //eventEmitter
    await handleSaveae96_1_1_1();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
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

 if (btn_authorize7ae96?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:requestRefundTransactionList:AFVK:v1','requestrefundtransactionlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_authorize7ae96?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Authorize")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_authorize

