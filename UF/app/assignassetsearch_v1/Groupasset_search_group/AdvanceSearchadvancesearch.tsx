'use client'




import React, { useState,useContext,useEffect } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { AdvancedSearch } from '@/components/AdvancedSearch';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const AdvancedSearchadvancesearch = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const actionDetails : any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {
    "NDS": [
      {
        "id": "ee8e93775d680fa0a2d002dc6ef9256e",
        "type": "controlNode",
        "position": {
          "x": 0.20752496077185112,
          "y": -74.65349973130888
        },
        "data": {
          "nodeId": "ee8e93775d680fa0a2d002dc6ef9256e",
          "nodeName": "advancesearch",
          "nodeType": "advancesearch",
          "events": [
            {
              "name": "onSubmit",
              "rise": [
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type1"
                },
                {
                  "key": "searchFilter",
                  "label": "searchFilter",
                  "listenerType": "type1"
                }
              ],
              "riseListen": [
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "searchFilter",
                  "label": "searchFilter",
                  "listenerType": "type2"
                }
              ],
              "self": [],
              "enabled": true
            }
          ],
          "label": "advancesearch",
          "children": [
            "ee8e93775d680fa0a2d002dc6ef9256e.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": 0.2443098947234806,
          "y": -74.65458771907389
        }
      },
      {
        "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 37.88731052688787,
          "y": -4.727244334095331
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "ee8e93775d680fa0a2d002dc6ef9256e.1.1",
          "children": [
            "356fd7ddf8ed4df7909d896283975a5d.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": 37.81366336255801,
          "y": -4.701944245934337
        },
        "width": 51,
        "height": 45
      },
      {
        "id": "356fd7ddf8ed4df7909d896283975a5d.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|assignments_table",
        "position": {
          "x": 29.99382679668827,
          "y": 78.82094849701267
        },
        "data": {
          "label": "assetAssignments.v1|assignments_table",
          "sequence": "1.1.1.1",
          "parent": "ee8e93775d680fa0a2d002dc6ef9256e",
          "children": [],
          "nodeProperty": {},
          "name": "assetAssignments.v1|assignments_table",
          "nodeLabel": "",
          "parentId": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1"
        },
        "positionAbsolute": {
          "x": 30.056855181287595,
          "y": 78.82390325478595
        },
        "width": 54,
        "height": 66
      },
      {
        "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1",
        "type": "eventNode",
        "position": {
          "x": -68.49268291248646,
          "y": 6.7714819341707635
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "ee8e93775d680fa0a2d002dc6ef9256e",
          "children": [
            "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -68.51321076684371,
          "y": 6.7563660145989335
        },
        "selected": false,
        "dragging": false
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "ee8e93775d680fa0a2d002dc6ef9256e->ee8e93775d680fa0a2d002dc6ef9256e.1.1",
        "source": "ee8e93775d680fa0a2d002dc6ef9256e",
        "type": "straight",
        "target": "ee8e93775d680fa0a2d002dc6ef9256e.1.1",
        "animated": true
      },
      {
        "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1->356fd7ddf8ed4df7909d896283975a5d.1.1.1.1",
        "source": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1",
        "type": "straight",
        "target": "356fd7ddf8ed4df7909d896283975a5d.1.1.1.1"
      },
      {
        "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1->ee8e93775d680fa0a2d002dc6ef9256e.1.1.1",
        "source": "ee8e93775d680fa0a2d002dc6ef9256e.1.1",
        "type": "straight",
        "target": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "ee8e93775d680fa0a2d002dc6ef9256e",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "ee8e93775d680fa0a2d002dc6ef9256e.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "356fd7ddf8ed4df7909d896283975a5d.1.1.1.1",
                  "type": "screen",
                  "name": "assetAssignments.v1|assignments_table",
                  "label": "assetAssignments.v1|assignments_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|assignments_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assigned_to",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.asset_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assigned_by",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assigned_date",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.expected_return_date",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.condition_at_assign",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1|b50b5e3a7b314f70bda35687ca3e035e|properties.assignment_status"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetSearch:AFVK:v1|dfee2b5fd26b613feaa59c7429c75d0d|ee8e93775d680fa0a2d002dc6ef9256e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1:",
  "schemaData": {
    "assigned_to": {
      "type": "string"
    },
    "asset_name": {
      "type": "string"
    },
    "assigned_by": {
      "type": "string"
    },
    "assigned_date": {
      "type": "string"
    },
    "expected_return_date": {
      "type": "string"
    },
    "condition_at_assign": {
      "type": "string"
    },
    "assignment_status": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  const [dfdKey,setDfdKey]=useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [searchFields,setSearchFields]=useState<any>([]);
  const [searchFilters,setSearchFilters]=useState<any>([]);
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'assigned_to',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {asset_search_group75d0d, setasset_search_group75d0d}= useContext(TotalContext) as TotalContextProps;
  const {asset_search_group75d0dProps, setasset_search_group75d0dProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch9256e, setadvancesearch9256e}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5d, setassignments_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5dProps, setassignments_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['asset_search_group'] = asset_search_group75d0d,
        codeStates['setasset_search_group'] = setasset_search_group75d0d,
        codeStates['asset_search_group75d0d'] = asset_search_group75d0dProps,
        codeStates['setasset_search_group75d0d'] = setasset_search_group75d0dProps,
        codeStates['advancesearch'] = advancesearch9256e,
        codeStates['setadvancesearch'] = setadvancesearch9256e,
        codeStates['assignments_table'] = assignments_table75a5d,
        codeStates['setassignments_table'] = setassignments_table75a5d,
        codeStates['assignments_table75a5d'] = assignments_table75a5dProps,
        codeStates['setassignments_table75a5d'] = setassignments_table75a5dProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setassignments_table75a5dProps((pre:any) => ({...pre, searchFilter:searchParams}))

    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }

  async function handleConfirmOnSubmit(){
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "dfee2b5fd26b613feaa59c7429c75d0d",
        "ee8e93775d680fa0a2d002dc6ef9256e"
      );
      setAllCode(orchestrationData?.data?.code);
      setDfdKey(orchestrationData?.data?.dfdKey);
      setPageSize(orchestrationData.data?.action.pagination?.page);
      setCount(orchestrationData.data?.action.pagination?.count);

      const sourceKeys: string[] = orchestrationData?.data?.mapper?.[0]?.sourceKey ?? [];
      const schemaProperties: Record<string, any> =
        orchestrationData?.data?.schemaData?.[0]?.schema
          ?.responses?.['200']?.content?.['application/json']
          ?.schema?.items?.properties ?? {};

      const fields = sourceKeys.map((key: string) => {
        const parts = key.split('|');
        const propPath = parts[parts.length - 1];
        const fieldName = propPath.split('.').pop() ?? propPath;
        const prop = schemaProperties[fieldName] ?? {};
        const dataType: 'string' | 'number' | 'date' =
          prop.format === 'date-time' ? 'date' :
          prop.type === 'number' || prop.type === 'integer' ? 'number' : 'string';
        return { controllerName: fieldName, dataType, label: fieldName };
      });
      
      setSearchFields(fields);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
      handleMapperValue();
  },[validateRefetch.value])

  useEffect(() => {
  if(dfd_assetassignments_v1Props?.setSearchFilters && dfd_assetassignments_v1Props?.data)
  {
    if(Array.isArray(dfd_assetassignments_v1Props.data) && dfd_assetassignments_v1Props.data.length > 0){
      setasset_search_group75d0d((pre:any)=>({...pre,assigned_to:dfd_assetassignments_v1Props.data[0]?.assigned_to}));
    }
  }
  },[dfd_assetassignments_v1Props?.setSearchFilters])
  if (advancesearch9256e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 96`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <AdvancedSearch
        data={searchFields}
        value={searchFilters}
        onChange={(filters) => {
            return setSearchFilters(filters);
        }}
        onSubmit={(filters) => {
          console.log("🚀 ~ AdvancedSearch ~ submit:", JSON.stringify(filters));
          setSearchFilters(filters);
          handleSubmit(filters);
        }}
        className=""
        label={keyset("")}
         disabled= {advancesearch9256e?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
