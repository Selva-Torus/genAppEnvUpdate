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
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const AdvancedSearchadvancesearch = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
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
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd",
        "type": "controlNode",
        "position": {
          "x": -78.59679325613294,
          "y": 20.260870227950267
        },
        "data": {
          "nodeId": "9359c2b1a28dddd4e42fcaa4c0084ddd",
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
                },
                {
                  "key": "closeHandler",
                  "label": "closeHandler",
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
            "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -78.5474237748636,
          "y": 20.13502365368296
        }
      },
      {
        "id": "7528885c1dc33cbc4802210eda139b50.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|agent_action_table",
        "position": {
          "x": -0.0997626372829074,
          "y": 63.91415879761803
        },
        "data": {
          "label": "AIAgentAction.v1|agent_action_table",
          "sequence": "1.1.1.1",
          "parent": "9359c2b1a28dddd4e42fcaa4c0084ddd",
          "children": [],
          "nodeProperty": {},
          "name": "AIAgentAction.v1|agent_action_table",
          "nodeLabel": "",
          "parentId": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1"
        },
        "width": 60,
        "height": 59,
        "positionAbsolute": {
          "x": -0.08212315209112765,
          "y": 64.06396052047096
        }
      },
      {
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
        "type": "eventNode",
        "position": {
          "x": -44.90495784123597,
          "y": -72.53200800119208
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "9359c2b1a28dddd4e42fcaa4c0084ddd",
          "children": [
            "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -44.83493502513295,
          "y": -72.66407757897747
        }
      },
      {
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 44.30373636809298,
          "y": -50.48454211237324
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
          "children": [
            "7528885c1dc33cbc4802210eda139b50.1.1.1.1",
            "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1.2"
          ],
          "nodeProperty": {
            "nodeId": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
            "nodeName": "searchFilter",
            "nodeType": "handlerNode",
            "hlr": {}
          }
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 44.14256365117041,
          "y": -50.23353221243608
        }
      },
      {
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 84.10368702715988,
          "y": 32.974143718958274
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 84.27858112131253,
          "y": 32.88217488664355
        },
        "width": 55,
        "height": 45
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd->9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
        "source": "9359c2b1a28dddd4e42fcaa4c0084ddd",
        "type": "straight",
        "target": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1->7528885c1dc33cbc4802210eda139b50.1.1.1.1",
        "source": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "type": "straight",
        "target": "7528885c1dc33cbc4802210eda139b50.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1->9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "source": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
        "type": "straight",
        "target": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "animated": true
      },
      {
        "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1->9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1.2",
        "source": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "type": "straight",
        "target": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1.2"
      }
    ],
    "NDP": {
      "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1": {
        "nodeId": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
        "nodeName": "searchFilter",
        "nodeType": "handlerNode",
        "hlr": {}
      }
    },
    "eventSummary": {
      "id": "9359c2b1a28dddd4e42fcaa4c0084ddd",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "7528885c1dc33cbc4802210eda139b50.1.1.1.1",
                  "type": "screen",
                  "name": "AIAgentAction.v1|agent_action_table",
                  "label": "AIAgentAction.v1|agent_action_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|agent_action_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                },
                {
                  "id": "9359c2b1a28dddd4e42fcaa4c0084ddd.1.1.1.2",
                  "eventContext": "rise",
                  "value": "",
                  "type": "handlerNode",
                  "name": "closeHandler",
                  "label": "closeHandler",
                  "sequence": "1.1.1.2",
                  "children": []
                }
              ],
              "hlr": {}
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.agent_action_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.tool_or_api",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.target_system",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.is_permitted",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.is_high_risk",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.approval_required",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1|43a8a1640a5b9a87b609aa2db1906abc|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentActionSearch:AFVK:v1|754d56b82841dbaf5164cb0a4aefe96f|9359c2b1a28dddd4e42fcaa4c0084ddd"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1:",
  "schemaData": {
    "agent_action_id": {
      "type": "integer"
    },
    "tool_or_api": {
      "type": "string"
    },
    "target_system": {
      "type": "string"
    },
    "is_permitted": {
      "type": "boolean"
    },
    "is_high_risk": {
      "type": "boolean"
    },
    "approval_required": {
      "type": "boolean"
    },
    "is_active": {
      "type": "boolean"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_aiagentaction_v1Props, setdfd_aiagentaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'agent_action_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grpfe96f, setadvance_search_grpfe96f}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grpfe96fProps, setadvance_search_grpfe96fProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch84ddd, setadvancesearch84ddd}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50, setagent_action_table39b50}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50Props, setagent_action_table39b50Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grpfe96f,
        codeStates['setadvance_search_grp'] = setadvance_search_grpfe96f,
        codeStates['advance_search_grpfe96f'] = advance_search_grpfe96fProps,
        codeStates['setadvance_search_grpfe96f'] = setadvance_search_grpfe96fProps,
        codeStates['advancesearch'] = advancesearch84ddd,
        codeStates['setadvancesearch'] = setadvancesearch84ddd,
        codeStates['agent_action_table'] = agent_action_table39b50,
        codeStates['setagent_action_table'] = setagent_action_table39b50,
        codeStates['agent_action_table39b50'] = agent_action_table39b50Props,
        codeStates['setagent_action_table39b50'] = setagent_action_table39b50Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setagent_action_table39b50Props((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'aiagentactionsearch');

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
        "754d56b82841dbaf5164cb0a4aefe96f",
        "9359c2b1a28dddd4e42fcaa4c0084ddd"
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
  if(dfd_aiagentaction_v1Props?.setSearchFilters && dfd_aiagentaction_v1Props?.data)
  {
    if(Array.isArray(dfd_aiagentaction_v1Props.data) && dfd_aiagentaction_v1Props.data.length > 0){
      setadvance_search_grpfe96f((pre:any)=>({...pre,agent_action_id:dfd_aiagentaction_v1Props.data[0]?.agent_action_id}));
    }
  }
  },[dfd_aiagentaction_v1Props?.setSearchFilters])
  if (advancesearch84ddd?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 129`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearch84ddd?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
