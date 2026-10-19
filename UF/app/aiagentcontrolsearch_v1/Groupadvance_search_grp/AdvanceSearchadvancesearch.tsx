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
        "id": "96336b3e16cec4351942855dcc7ebceb",
        "type": "controlNode",
        "position": {
          "x": -61.09269815386389,
          "y": -41.398237983628064
        },
        "data": {
          "nodeId": "96336b3e16cec4351942855dcc7ebceb",
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
            "96336b3e16cec4351942855dcc7ebceb.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": -61.09272640752577,
          "y": -41.398340165288126
        }
      },
      {
        "id": "96336b3e16cec4351942855dcc7ebceb.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -34.22883055833262,
          "y": 49.636530291398934
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "96336b3e16cec4351942855dcc7ebceb.1.1",
          "children": [
            "c073f1886ebd444da9d52548eddc54a3.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": -34.2287248305048,
          "y": 49.63644697387995
        }
      },
      {
        "id": "c073f1886ebd444da9d52548eddc54a3.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistry:AFVK:v1|ai_registry_table",
        "position": {
          "x": 61.41301847960025,
          "y": 41.75950320876296
        },
        "data": {
          "label": "AIRegistry.v1|ai_registry_table",
          "sequence": "1.1.1.1",
          "parent": "96336b3e16cec4351942855dcc7ebceb",
          "children": [],
          "nodeProperty": {},
          "name": "AIRegistry.v1|ai_registry_table",
          "nodeLabel": "",
          "parentId": "96336b3e16cec4351942855dcc7ebceb.1.1.1"
        },
        "width": 54,
        "height": 58,
        "positionAbsolute": {
          "x": 61.41308602736618,
          "y": 41.759648882358185
        }
      },
      {
        "id": "96336b3e16cec4351942855dcc7ebceb.1.1",
        "type": "eventNode",
        "position": {
          "x": 34.58759074572703,
          "y": -49.41216282247584
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "96336b3e16cec4351942855dcc7ebceb",
          "children": [
            "96336b3e16cec4351942855dcc7ebceb.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 34.587528897837544,
          "y": -49.41205018924719
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "96336b3e16cec4351942855dcc7ebceb->96336b3e16cec4351942855dcc7ebceb.1.1",
        "source": "96336b3e16cec4351942855dcc7ebceb",
        "type": "straight",
        "target": "96336b3e16cec4351942855dcc7ebceb.1.1",
        "animated": true
      },
      {
        "id": "96336b3e16cec4351942855dcc7ebceb.1.1.1->c073f1886ebd444da9d52548eddc54a3.1.1.1.1",
        "source": "96336b3e16cec4351942855dcc7ebceb.1.1.1",
        "type": "straight",
        "target": "c073f1886ebd444da9d52548eddc54a3.1.1.1.1"
      },
      {
        "id": "96336b3e16cec4351942855dcc7ebceb.1.1->96336b3e16cec4351942855dcc7ebceb.1.1.1",
        "source": "96336b3e16cec4351942855dcc7ebceb.1.1",
        "type": "straight",
        "target": "96336b3e16cec4351942855dcc7ebceb.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "96336b3e16cec4351942855dcc7ebceb",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "96336b3e16cec4351942855dcc7ebceb.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "96336b3e16cec4351942855dcc7ebceb.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "c073f1886ebd444da9d52548eddc54a3.1.1.1.1",
                  "type": "screen",
                  "name": "AIRegistry.v1|ai_registry_table",
                  "label": "AIRegistry.v1|ai_registry_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistry:AFVK:v1|ai_registry_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.agent_control_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.ai_asset_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.asset_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.agent_identity_ref",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.identity_provider",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.authority_level_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.requires_human_approval",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.approval_threshold_amt",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.approval_threshold_ccy",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.kill_switch_state_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1|bf86732b75cee6055ed5446113c4cc7d|properties.kill_switch_updated_on"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentControlSearch:AFVK:v1|a34c1c577dc516e3f33c492deedde7f8|96336b3e16cec4351942855dcc7ebceb"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1:",
  "schemaData": {
    "agent_control_id": {
      "type": "integer"
    },
    "ai_asset_id": {
      "type": "integer"
    },
    "asset_name": {
      "type": "string"
    },
    "agent_identity_ref": {
      "type": "string"
    },
    "identity_provider": {
      "type": "string"
    },
    "authority_level_code": {
      "type": "string"
    },
    "requires_human_approval": {
      "type": "boolean"
    },
    "approval_threshold_amt": {
      "type": "integer"
    },
    "approval_threshold_ccy": {
      "type": "string"
    },
    "kill_switch_state_code": {
      "type": "string"
    },
    "kill_switch_updated_on": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'agent_control_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grpde7f8, setadvance_search_grpde7f8}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grpde7f8Props, setadvance_search_grpde7f8Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchebceb, setadvancesearchebceb}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3, setai_registry_tablec54a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props, setai_registry_tablec54a3Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grpde7f8,
        codeStates['setadvance_search_grp'] = setadvance_search_grpde7f8,
        codeStates['advance_search_grpde7f8'] = advance_search_grpde7f8Props,
        codeStates['setadvance_search_grpde7f8'] = setadvance_search_grpde7f8Props,
        codeStates['advancesearch'] = advancesearchebceb,
        codeStates['setadvancesearch'] = setadvancesearchebceb,
        codeStates['ai_registry_table'] = ai_registry_tablec54a3,
        codeStates['setai_registry_table'] = setai_registry_tablec54a3,
        codeStates['ai_registry_tablec54a3'] = ai_registry_tablec54a3Props,
        codeStates['setai_registry_tablec54a3'] = setai_registry_tablec54a3Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setai_registry_tablec54a3Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "a34c1c577dc516e3f33c492deedde7f8",
        "96336b3e16cec4351942855dcc7ebceb"
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
  if(dfd_aiagentcontrol_v1Props?.setSearchFilters && dfd_aiagentcontrol_v1Props?.data)
  {
    if(Array.isArray(dfd_aiagentcontrol_v1Props.data) && dfd_aiagentcontrol_v1Props.data.length > 0){
      setadvance_search_grpde7f8((pre:any)=>({...pre,agent_control_id:dfd_aiagentcontrol_v1Props.data[0]?.agent_control_id}));
    }
  }
  },[dfd_aiagentcontrol_v1Props?.setSearchFilters])
  if (advancesearchebceb?.isHidden) {
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
         disabled= {advancesearchebceb?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
