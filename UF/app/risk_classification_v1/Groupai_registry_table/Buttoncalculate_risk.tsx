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
import PageRuleevaluationpage3 from '@/app/ruleevaluation_v1/ruleevaluation_v1page';
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
 

const Buttoncalculate_risk = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen3, setShowProfileAsModalOpen3] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_asset_registry8ac99, setoverall_ai_asset_registry8ac99}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry8ac99Props, setoverall_ai_asset_registry8ac99Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5043e, setai_registry_group5043e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5043eProps, setai_registry_group5043eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupfc839, setai_registry_text_groupfc839}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupfc839Props, setai_registry_text_groupfc839Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table0e400, setai_registry_table0e400}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table0e400Props, setai_registry_table0e400Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_ided67d, setai_asset_ided67d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code9ccc1, setasset_code9ccc1}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameed2a9, setasset_nameed2a9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code9aa4b, setasset_type_code9aa4b}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codedeff4, setrisk_tier_codedeff4}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name7efed, setbusiness_unit_name7efed}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namee2591, setbusiness_owner_namee2591}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_name08dcb, settechnical_owner_name08dcb}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code8c829, setdiscovery_source_code8c829}= useContext(TotalContext) as TotalContextProps;
  const {calculate_risk04417, setcalculate_risk04417}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_codea5742, setlifecycle_status_codea5742}= useContext(TotalContext) as TotalContextProps;
  const {ruleevaluation_v1Props, setruleevaluation_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry8ac99,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry8ac99,
      codeStates['overall_ai_asset_registry8ac99'] = overall_ai_asset_registry8ac99Props,
      codeStates['setoverall_ai_asset_registry8ac99'] = setoverall_ai_asset_registry8ac99Props,
      codeStates['ai_registry_group'] = ai_registry_group5043e,
      codeStates['setai_registry_group'] = setai_registry_group5043e,
      codeStates['ai_registry_group5043e'] = ai_registry_group5043eProps,
      codeStates['setai_registry_group5043e'] = setai_registry_group5043eProps,
      codeStates['ai_registry_text_group'] = ai_registry_text_groupfc839,
      codeStates['setai_registry_text_group'] = setai_registry_text_groupfc839,
      codeStates['ai_registry_text_groupfc839'] = ai_registry_text_groupfc839Props,
      codeStates['setai_registry_text_groupfc839'] = setai_registry_text_groupfc839Props,
      codeStates['ai_registry_table'] = ai_registry_table0e400,
      codeStates['setai_registry_table'] = setai_registry_table0e400,
      codeStates['ai_registry_table0e400'] = ai_registry_table0e400Props,
      codeStates['setai_registry_table0e400'] = setai_registry_table0e400Props,
      codeStates['ai_asset_id'] = ai_asset_ided67d,
      codeStates['setai_asset_id'] = setai_asset_ided67d,
      codeStates['asset_code'] = asset_code9ccc1,
      codeStates['setasset_code'] = setasset_code9ccc1,
      codeStates['asset_name'] = asset_nameed2a9,
      codeStates['setasset_name'] = setasset_nameed2a9,
      codeStates['asset_type_code'] = asset_type_code9aa4b,
      codeStates['setasset_type_code'] = setasset_type_code9aa4b,
      codeStates['risk_tier_code'] = risk_tier_codedeff4,
      codeStates['setrisk_tier_code'] = setrisk_tier_codedeff4,
      codeStates['business_unit_name'] = business_unit_name7efed,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_name7efed,
      codeStates['business_owner_name'] = business_owner_namee2591,
      codeStates['setbusiness_owner_name'] = setbusiness_owner_namee2591,
      codeStates['technical_owner_name'] = technical_owner_name08dcb,
      codeStates['settechnical_owner_name'] = settechnical_owner_name08dcb,
      codeStates['discovery_source_code'] = discovery_source_code8c829,
      codeStates['setdiscovery_source_code'] = setdiscovery_source_code8c829,
      codeStates['calculate_risk'] = calculate_risk04417,
      codeStates['setcalculate_risk'] = setcalculate_risk04417,
      codeStates['lifecycle_status_code'] = lifecycle_status_codea5742,
      codeStates['setlifecycle_status_code'] = setlifecycle_status_codea5742,
      codeStates['ruleevaluation_v1'] = ruleevaluation_v1Props,
      codeStates['setruleevaluation_v1'] = setruleevaluation_v1Props,
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
        "359ced20e56ba1041a74f13c7b70e400",
        "cbd9a0173fb0487d98fb153ab0d04417"
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
      if (id === "calculate_risk04417") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen3(false)
  },[calculate_risk04417?.refresh])


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

  async function handleSave4417_1_1_1(){
     
    let currentValidate: any = null;
    await new Promise<void>((resolve) => {
      setValidate((prev: any) => {
        currentValidate = prev;
        return prev;
      });
      resolve();
    });

    // Check if any field is invalid using .some() with null safety
     const hasInvalidField = Object.values(validate || currentValidate?.assetList_v1 || {}).some(val => {
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
      //let mainData:any=structuredClone(ai_registry_table0e400);
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
      let tagetKey:string="CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:TAG:AFGK:TAG:AFK:riskRuleEvaluation:AFVK:v1|fc126c106cf41572973bbb1a2ec7cc2b"
      let uf_getPFDetails:any={
        key: "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:TAG:AFGK:TAG:AFK:riskRuleEvaluation:AFVK:v1|fc126c106cf41572973bbb1a2ec7cc2b"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      let eventProperty :any = {
  "id": "cbd9a0173fb0487d98fb153ab0d04417",
  "type": "button",
  "name": "calculate_risk",
  "label": "calculate_risk",
  "sequence": 1,
  "children": [
    {
      "id": "cbd9a0173fb0487d98fb153ab0d04417.1.1",
      "type": "eventNode",
      "name": "onClick",
      "label": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "cbd9a0173fb0487d98fb153ab0d04417.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "saveHandler",
          "label": "saveHandler",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "cbd9a0173fb0487d98fb153ab0d04417.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "showArtifactAsModal",
              "label": "showArtifactAsModal",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "e1a75ad5e8df434cb6a16f6171624d06.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "ruleEvaluation.v1",
                  "label": "ruleEvaluation.v1|Root",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1",
                  "elementType": "",
                  "groupType": "",
                  "sequence": "1.1.1.1.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "width",
                    "_type": "text",
                    "value": "80%",
                    "enabled": true
                  },
                  {
                    "name": "height",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "needLabel",
                    "_type": "conditionalBoolean",
                    "value": false,
                    "enabled": true,
                    "subSelection": {
                      "_true": {
                        "content": {
                          "name": "Title",
                          "_type": "text",
                          "value": "",
                          "enabled": true
                        },
                        "variant": {
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
                      }
                    }
                  },
                  {
                    "name": "position",
                    "_type": "select",
                    "selectionList": [
                      "center",
                      "top",
                      "bottom",
                      "left",
                      "right",
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right"
                    ],
                    "value": "center",
                    "enabled": true
                  },
                  {
                    "name": "showOverlay",
                    "_type": "boolean",
                    "value": true,
                    "enabled": true
                  },
                  {
                    "name": "Filter Conditions",
                    "_type": "array",
                    "_empty": true,
                    "items": [
                      {
                        "name": "DFD Key",
                        "_type": "asyncSelection",
                        "selectionList": [
                          "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1"
                        ],
                        "value": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",
                        "enabled": true,
                        "_payload": {
                          "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1:",
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
                                "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1:",
                                "nodeType": "searchParams",
                                "storageType": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1"
                              },
                              "selectionList": [
                                {
                                  "key": "c7bd520305a445b2ba3e3577f0f158f8",
                                  "label": "dbnode"
                                },
                                {
                                  "key": "f5f3ab7e0e534ce18adce088c62a87c9",
                                  "label": "datasetschemanode"
                                }
                              ],
                              "value": "f5f3ab7e0e534ce18adce088c62a87c9",
                              "enabled": true,
                              "subSelection": {
                                "name": "filter",
                                "_type": "array",
                                "items": [
                                  {
                                    "filterParam": {
                                      "name": "filterParam",
                                      "_type": "objectSelection",
                                      "selectionList": {
                                        "type": "object",
                                        "properties": {
                                          "tier_assessment_id": {
                                            "type": "integer"
                                          },
                                          "ai_asset_id": {
                                            "type": "integer"
                                          },
                                          "asset_name": {
                                            "type": "string"
                                          },
                                          "asset_code": {
                                            "type": "string"
                                          },
                                          "risk_tier_code": {
                                            "type": "string"
                                          },
                                          "assessed_tier_code": {
                                            "type": "string"
                                          },
                                          "matched_rule_id": {
                                            "type": "integer"
                                          },
                                          "assessment_type": {
                                            "type": "string"
                                          },
                                          "previous_tier_code": {
                                            "type": "string"
                                          },
                                          "justification": {
                                            "type": "string"
                                          },
                                          "approved_by_user_id": {
                                            "type": "integer"
                                          },
                                          "evaluation_trace": {
                                            "type": "string"
                                          },
                                          "assessed_by": {
                                            "type": "integer"
                                          },
                                          "assessed_on": {
                                            "type": "string"
                                          },
                                          "business_owner_name": {
                                            "type": "string"
                                          },
                                          "business_unit_name": {
                                            "type": "string"
                                          },
                                          "risk_rule_id": {
                                            "type": "integer"
                                          },
                                          "rule_code": {
                                            "type": "string"
                                          },
                                          "rule_name": {
                                            "type": "string"
                                          },
                                          "description": {
                                            "type": "string"
                                          },
                                          "result_tier_code": {
                                            "type": "string"
                                          },
                                          "priority_order": {
                                            "type": "integer"
                                          },
                                          "match_mode": {
                                            "type": "string"
                                          },
                                          "effective_from": {
                                            "type": "string"
                                          },
                                          "effective_to": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "tier_assessment_id",
                                          "ai_asset_id",
                                          "asset_name",
                                          "asset_code",
                                          "risk_tier_code",
                                          "assessed_tier_code",
                                          "matched_rule_id",
                                          "assessment_type",
                                          "previous_tier_code",
                                          "justification",
                                          "approved_by_user_id",
                                          "evaluation_trace",
                                          "assessed_by",
                                          "assessed_on",
                                          "business_owner_name",
                                          "business_unit_name",
                                          "risk_rule_id",
                                          "rule_code",
                                          "rule_name",
                                          "description",
                                          "result_tier_code",
                                          "priority_order",
                                          "match_mode",
                                          "effective_from",
                                          "effective_to"
                                        ]
                                      },
                                      "value": "properties.ai_asset_id",
                                      "enabled": true
                                    },
                                    "filterValue": {
                                      "name": "filterValue",
                                      "_type": "comboBox",
                                      "selectionList": [
                                        {
                                          "key": "a2aad55ed4076227eae19037702e7ae5",
                                          "label": "ai_registry_text"
                                        },
                                        {
                                          "key": "ac73a3546f32465f7d941fe8282b5d03",
                                          "label": "ai_registry_texts"
                                        },
                                        {
                                          "key": "e7c6af28786ac943e4b5b4c59e710e29",
                                          "label": "refresh_button"
                                        },
                                        {
                                          "key": "beff224ef120a359fccfa1b37f197f35",
                                          "label": "search"
                                        },
                                        {
                                          "key": "848aeea0ca51d47545725630afaed67d",
                                          "label": "ai_asset_id"
                                        },
                                        {
                                          "key": "1cc8dbfe1525367d96f7c44f7b19ccc1",
                                          "label": "asset_code"
                                        },
                                        {
                                          "key": "b680f8a7eb45d97e02a2ef2d393ed2a9",
                                          "label": "asset_name"
                                        },
                                        {
                                          "key": "00d91b7dc5cfef045245dc9b7c49aa4b",
                                          "label": "asset_type_code"
                                        },
                                        {
                                          "key": "5b1d85391994437e24ed5061612deff4",
                                          "label": "risk_tier_code"
                                        },
                                        {
                                          "key": "56822e43fadd7d3242ee19b97d57efed",
                                          "label": "business_unit_name"
                                        },
                                        {
                                          "key": "e297781fa9efe007cc3542015b8e2591",
                                          "label": "business_owner_name"
                                        },
                                        {
                                          "key": "2addc2a8917236b2da92c51052108dcb",
                                          "label": "technical_owner_name"
                                        },
                                        {
                                          "key": "8613f7c3a3d7a083dc301a873ddc1e9c",
                                          "label": "cert_expiry_date"
                                        },
                                        {
                                          "key": "58e40799d0f665a0a1f1c461f888c829",
                                          "label": "discovery_source_code"
                                        },
                                        {
                                          "key": "cbd9a0173fb0487d98fb153ab0d04417",
                                          "label": "calculate_risk"
                                        }
                                      ],
                                      "value": "848aeea0ca51d47545725630afaed67d",
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
            }
          ],
          "hlr": {
            "params": [
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
              },
              {
                "name": "fromSession",
                "_type": "boolean",
                "value": false,
                "enabled": true
              }
            ]
          },
          "targetKey": [
            "CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:TAG:AFGK:TAG:AFK:riskRuleEvaluation:AFVK:v1|fc126c106cf41572973bbb1a2ec7cc2b"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1";
      sourceId+= "|"+"359ced20e56ba1041a74f13c7b70e400";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1"+"|"+"359ced20e56ba1041a74f13c7b70e400"+"|"+eventProperty.id;
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

    let reworkedObject:any = nullFilter(lockedData?.data);
    let reworkKeys:any[]=[];
      if(typeof reworkedObject === 'object' && reworkedObject !== null) {
      Object.keys(reworkedObject).map((item: any) => {
        if (
          typeof ai_registry_table0e400[item] === 'object' && 
          Array.isArray(ai_registry_table0e400[item]) && 
          ai_registry_table0e400[item].length > 0 && 
          typeof ai_registry_table0e400[item][0] !== "string"
        ) {
          const hasUrlProperty = ai_registry_table0e400[item][0]?.url !== undefined;
          const hasFileProperty = ai_registry_table0e400[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(ai_registry_table0e400[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      }); 
    } else if (Array.isArray(reworkedObject)) {
      Object.keys(ai_registry_table0e400).map((item: any) => {
        if (
          typeof ai_registry_table0e400[item] === 'object' && 
          Array.isArray(ai_registry_table0e400[item]) && 
          ai_registry_table0e400[item].length > 0 && 
          typeof ai_registry_table0e400[item][0] !== "string"
        ) {
          const hasUrlProperty = ai_registry_table0e400[item][0]?.url !== undefined;
          const hasFileProperty = ai_registry_table0e400[item][0]?.file !== undefined;
          const hasSelectedFlag = Object.keys(ai_registry_table0e400[item][0]).includes('_isSelected_');
          
          if (hasFileProperty || (hasUrlProperty && !hasSelectedFlag)) {
            reworkKeys.push(item);
          }
        }
      });
    }
      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = ai_registry_table0e400[reworkKeys[i]].map((item:any) => item?.file)
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
        if(typeof ai_registry_table0e400[item]=='object')
        {
          if( ai_registry_table0e400[item].length>0 &&Object.keys(ai_registry_table0e400[item][0]).includes('_isSelected_'))
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

      if ("childTables" in ai_registry_table0e400) {
        te_saveBody.childTables = ai_registry_table0e400.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any[]=[];
        if(Array.isArray(mainData))
        {
          formData=lockedData?.data || ai_registry_table0e400 || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"359ced20e56ba1041a74f13c7b70e400",
              controlId:"cbd9a0173fb0487d98fb153ab0d04417"
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
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:{...formData, ...nullFilter(overall_ai_asset_registry8ac99), ...nullFilter(ai_registry_group5043e), ...nullFilter(ai_registry_text_groupfc839)},
            key:uf_getPFDetails.key,
            groupId:"359ced20e56ba1041a74f13c7b70e400",
            controlId:"cbd9a0173fb0487d98fb153ab0d04417"
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
        //saveHandler
        if(Array.isArray(reworkedObject))
        {
          te_saveBody.data = reworkedObject.map((item: any) => {
            return { ...nullFilter(item), ...eventData }
          })
        }
        else
        {
          te_saveBody.data = {...nullFilter(reworkedObject),...eventData};
        }
        te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status;
        te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId;
        te_saveBody.controlName = "calculate_risk";
        if(mainData?.upId)
        {
          te_saveBody['upId']= mainData.upId;
        }
        if(ai_registry_table0e400?.upId){
          te_saveBody['upId']= ai_registry_table0e400?.upId;
        }
        te_saveBody.key= te_saveBody?.key?.slice(0, te_saveBody?.key?.lastIndexOf(':')) + ':';

        if (ai_registry_table0e400Props.ssKey !== '' && ai_registry_table0e400Props.ssKey !== undefined) {
          te_saveBody["ssKey"] = ai_registry_table0e400Props.ssKey;
          
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

    // showArtifactAsModal
    let filterProps0:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:tierAssessment:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "f5f3ab7e0e534ce18adce088c62a87c9",
        "object": {
          "properties.ai_asset_id": "848aeea0ca51d47545725630afaed67d"
        }
      }
    ]
  }
];
    let filterData0 = await getFilterProps(filterProps0,mainData);
    setruleevaluation_v1Props([...filterData0 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen3(true);
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

    //saveHandler
    await handleSave4417_1_1_1();
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
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

 if (calculate_risk04417?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1','assetlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen3} 
        onClose={() => {
          setShowProfileAsModalOpen3(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "ruleevaluation"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageRuleevaluationpage3  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {calculate_risk04417?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Evaluate Risk")}
        </Button>}
      </div>
    
  )
}

export default Buttoncalculate_risk

