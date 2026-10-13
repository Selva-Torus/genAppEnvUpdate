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
import { unlocktbl_pos_ex_view_tranRecord as unlocktable8df93Record } from '@/app/postingexceptionviewtransaction_v1/Grouptbl_pos_ex_view_tran/Tabletbl_pos_ex_view_tran';
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
 

const Buttonbtn_alredy_posted = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {grp_overall_tran_list52636, setgrp_overall_tran_list52636}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list52636Props, setgrp_overall_tran_list52636Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_ex_view_tran8df93, settbl_pos_ex_view_tran8df93}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pos_ex_view_tran8df93Props, settbl_pos_ex_view_tran8df93Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_alredy_postedf023e, setbtn_alredy_postedf023e}= useContext(TotalContext) as TotalContextProps;
  const {col_source_name06356, setcol_source_name06356}= useContext(TotalContext) as TotalContextProps;
  const {col_vph_ref_iddff78, setcol_vph_ref_iddff78}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_namee8195, setcol_emp_namee8195}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_ac_no43a43, setcol_cr_ac_no43a43}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt8dd2c, setcol_fixed_amnt8dd2c}= useContext(TotalContext) as TotalContextProps;
  const {btn_retry6dcf1, setbtn_retry6dcf1}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt3cf81, setcol_var_amnt3cf81}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_amnt3dd6f, setcol_tot_amnt3dd6f}= useContext(TotalContext) as TotalContextProps;
  const {col_src_file_name0456e, setcol_src_file_name0456e}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_tran_list'] = grp_overall_tran_list52636,
      codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list52636,
      codeStates['grp_overall_tran_list52636'] = grp_overall_tran_list52636Props,
      codeStates['setgrp_overall_tran_list52636'] = setgrp_overall_tran_list52636Props,
      codeStates['tbl_pos_ex_view_tran'] = tbl_pos_ex_view_tran8df93,
      codeStates['settbl_pos_ex_view_tran'] = settbl_pos_ex_view_tran8df93,
      codeStates['tbl_pos_ex_view_tran8df93'] = tbl_pos_ex_view_tran8df93Props,
      codeStates['settbl_pos_ex_view_tran8df93'] = settbl_pos_ex_view_tran8df93Props,
      codeStates['btn_alredy_posted'] = btn_alredy_postedf023e,
      codeStates['setbtn_alredy_posted'] = setbtn_alredy_postedf023e,
      codeStates['col_source_name'] = col_source_name06356,
      codeStates['setcol_source_name'] = setcol_source_name06356,
      codeStates['col_vph_ref_id'] = col_vph_ref_iddff78,
      codeStates['setcol_vph_ref_id'] = setcol_vph_ref_iddff78,
      codeStates['col_emp_name'] = col_emp_namee8195,
      codeStates['setcol_emp_name'] = setcol_emp_namee8195,
      codeStates['col_cr_ac_no'] = col_cr_ac_no43a43,
      codeStates['setcol_cr_ac_no'] = setcol_cr_ac_no43a43,
      codeStates['col_fixed_amnt'] = col_fixed_amnt8dd2c,
      codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt8dd2c,
      codeStates['btn_retry'] = btn_retry6dcf1,
      codeStates['setbtn_retry'] = setbtn_retry6dcf1,
      codeStates['col_var_amnt'] = col_var_amnt3cf81,
      codeStates['setcol_var_amnt'] = setcol_var_amnt3cf81,
      codeStates['col_tot_amnt'] = col_tot_amnt3dd6f,
      codeStates['setcol_tot_amnt'] = setcol_tot_amnt3dd6f,
      codeStates['col_src_file_name'] = col_src_file_name0456e,
      codeStates['setcol_src_file_name'] = setcol_src_file_name0456e,
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
        "c4fa0588b9682751974b6db6f098df93",
        "463cc0f7681445c9a522f6e35b4f023e"
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
      if (id === "btn_alredy_postedf023e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_alredy_postedf023e?.refresh])


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

  async function handleSave023e_1_1_1(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.postingExceptionViewTransaction_v1 || {}).some(val => {
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
      //let mainData:any=structuredClone(tbl_pos_ex_view_tran8df93);
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
      //eventEmitter
      if(tbl_pos_ex_view_tran8df93?.upId === "" && (!lockedData?.data || Object.keys(lockedData?.data)?.length == 0)){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "463cc0f7681445c9a522f6e35b4f023e",
  "type": "button",
  "name": "btn_alredy_posted",
  "label": "btn_alredy_posted",
  "sequence": 1,
  "children": [
    {
      "id": "463cc0f7681445c9a522f6e35b4f023e.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "463cc0f7681445c9a522f6e35b4f023e.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "463cc0f7681445c9a522f6e35b4f023e.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "infoMsg",
              "label": "infoMsg",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "463cc0f7681445c9a522f6e35b4f023e.1.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "refreshElement",
                  "label": "refreshElement",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "c4fa0588b9682751974b6db6f098df93.1.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "postingExceptionViewTransaction.v1|tbl_pos_ex_view_tran",
                      "label": "postingExceptionViewTransaction.v1|tbl_pos_ex_view_tran",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:postingExceptionViewTransaction:AFVK:v1|tbl_pos_ex_view_tran",
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
                    "value": "File has been saved successfully",
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
          }
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:postingExceptionViewTransaction:AFVK:v1";
      sourceId+= "|"+"c4fa0588b9682751974b6db6f098df93";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:postingExceptionViewTransaction:AFVK:v1"+"|"+"c4fa0588b9682751974b6db6f098df93"+"|"+eventProperty.id;
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
        upId : tbl_pos_ex_view_tran8df93?.upId? [tbl_pos_ex_view_tran8df93?.upId ] : lockedData.processIds,
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "btn_alredy_posted"
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
          typeof tbl_pos_ex_view_tran8df93[item] === 'object' && 
          Array.isArray(tbl_pos_ex_view_tran8df93[item]) && 
          tbl_pos_ex_view_tran8df93[item].length > 0 && 
          typeof tbl_pos_ex_view_tran8df93[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_pos_ex_view_tran8df93[item][0]?.url !== undefined;
          const hasFileProperty = tbl_pos_ex_view_tran8df93[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_pos_ex_view_tran8df93[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(tbl_pos_ex_view_tran8df93).map((item: any) => {
        if (
          typeof tbl_pos_ex_view_tran8df93[item] === 'object' && 
          Array.isArray(tbl_pos_ex_view_tran8df93[item]) && 
          tbl_pos_ex_view_tran8df93[item].length > 0 && 
          typeof tbl_pos_ex_view_tran8df93[item][0] !== "string"
        ) {
          const hasUrlProperty = tbl_pos_ex_view_tran8df93[item][0]?.url !== undefined;
          const hasFileProperty = tbl_pos_ex_view_tran8df93[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(tbl_pos_ex_view_tran8df93[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = tbl_pos_ex_view_tran8df93[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof tbl_pos_ex_view_tran8df93[item]=='object')
        {
          if( tbl_pos_ex_view_tran8df93[item].length>0 &&Object.keys(tbl_pos_ex_view_tran8df93[item][0]).includes('_isSelected_'))
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

      if ("childTables" in tbl_pos_ex_view_tran8df93) {
        te_saveBody.childTables = tbl_pos_ex_view_tran8df93.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || tbl_pos_ex_view_tran8df93 || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"c4fa0588b9682751974b6db6f098df93",
              controlId:"463cc0f7681445c9a522f6e35b4f023e"
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
            formData:{...formData, ...nullFilter(grp_overall_tran_list52636)},
            key:uf_getPFDetails.key,
            groupId:"c4fa0588b9682751974b6db6f098df93",
            controlId:"463cc0f7681445c9a522f6e35b4f023e"
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
    if (tbl_pos_ex_view_tran8df93Props.ssKey !== '' && tbl_pos_ex_view_tran8df93Props.ssKey !== undefined) {
    te_eventEmitterBody["ssKey"] = tbl_pos_ex_view_tran8df93Props.ssKey;          
    }
    if(mainData?.upId){
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(tbl_pos_ex_view_tran8df93?.upId){
      te_eventEmitterBody['upId']= [tbl_pos_ex_view_tran8df93?.upId];
    }
    if(tbl_pos_ex_view_tran8df93?.upid){
      te_eventEmitterBody['upId']= [tbl_pos_ex_view_tran8df93?.upid];
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
    toast('File has been saved successfully', 'success',false,'subheader-3');
    // refreshElement
    //riseListen
    // for group
    if (Array.isArray(tbl_pos_ex_view_tran8df93Props?.selectedIds) && tbl_pos_ex_view_tran8df93Props.selectedIds.length) {
      await Promise.all(
        tbl_pos_ex_view_tran8df93Props.selectedIds.map((id: number) =>
          unlocktable8df93Record(id, token)
        )
      );
    }
    settbl_pos_ex_view_tran8df93Props((pre:any)=>({
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
    await handleSave023e_1_1_1();
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

 if (btn_alredy_postedf023e?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:postingExceptionViewTransaction:AFVK:v1','postingexceptionviewtransaction','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_alredy_postedf023e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdArrowOutward"
          iconDisplay='End with Icon'
        >
          {keyset("Alredy Posted")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_alredy_posted

