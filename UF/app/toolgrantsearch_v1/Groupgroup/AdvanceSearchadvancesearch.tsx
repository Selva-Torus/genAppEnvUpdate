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
        "id": "b00dd9b355fc76610cc3efd6fd0de36d",
        "type": "controlNode",
        "position": {
          "x": -70.74156059525976,
          "y": -19.800750767904848
        },
        "data": {
          "nodeId": "b00dd9b355fc76610cc3efd6fd0de36d",
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
            "b00dd9b355fc76610cc3efd6fd0de36d.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -70.76820362867213,
          "y": -19.732904893460425
        }
      },
      {
        "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -17.160827790535592,
          "y": 47.84648532341441
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "b00dd9b355fc76610cc3efd6fd0de36d.1.1",
          "children": [
            "abfbf12d125d476e2fc2167c19bd00d5.1.1.1.1"
          ]
        },
        "width": 48,
        "height": 49,
        "positionAbsolute": {
          "x": -17.08850518763887,
          "y": 47.710282911155986
        }
      },
      {
        "id": "abfbf12d125d476e2fc2167c19bd00d5.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|tool_grant_table",
        "position": {
          "x": 71.92571187531598,
          "y": 33.892996192991184
        },
        "data": {
          "label": "toolGrant.v1|tool_grant_table",
          "sequence": "1.1.1.1",
          "parent": "b00dd9b355fc76610cc3efd6fd0de36d",
          "children": [],
          "nodeProperty": {},
          "name": "toolGrant.v1|tool_grant_table",
          "nodeLabel": "",
          "parentId": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1"
        },
        "width": 48,
        "height": 57,
        "positionAbsolute": {
          "x": 71.94962714375933,
          "y": 34.03639113300261
        }
      },
      {
        "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1",
        "type": "eventNode",
        "position": {
          "x": 20.8570397883227,
          "y": -61.03150321390016
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "b00dd9b355fc76610cc3efd6fd0de36d",
          "children": [
            "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 20.843989901104635,
          "y": -61.07840489372592
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "b00dd9b355fc76610cc3efd6fd0de36d->b00dd9b355fc76610cc3efd6fd0de36d.1.1",
        "source": "b00dd9b355fc76610cc3efd6fd0de36d",
        "type": "straight",
        "target": "b00dd9b355fc76610cc3efd6fd0de36d.1.1",
        "animated": true
      },
      {
        "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1->abfbf12d125d476e2fc2167c19bd00d5.1.1.1.1",
        "source": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1",
        "type": "straight",
        "target": "abfbf12d125d476e2fc2167c19bd00d5.1.1.1.1"
      },
      {
        "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1->b00dd9b355fc76610cc3efd6fd0de36d.1.1.1",
        "source": "b00dd9b355fc76610cc3efd6fd0de36d.1.1",
        "type": "straight",
        "target": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1"
      }
    ],
    "NDP": {},
    "layoutMode": null,
    "dagreDirection": "TB",
    "eventSummary": {
      "id": "b00dd9b355fc76610cc3efd6fd0de36d",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "b00dd9b355fc76610cc3efd6fd0de36d.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "abfbf12d125d476e2fc2167c19bd00d5.1.1.1.1",
                  "type": "screen",
                  "name": "toolGrant.v1|tool_grant_table",
                  "label": "toolGrant.v1|tool_grant_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|tool_grant_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.tool_grant_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.asset_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.tool_operation",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.agent_asset_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.tool_asset_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.access_mode",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.status",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.approved_by_user_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.valid_from",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1|a207da708e574413a60aaba5e006f4dd|properties.valid_to"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrantSearch:AFVK:v1|391557f60520e220a456c637e4c17c99|b00dd9b355fc76610cc3efd6fd0de36d"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1:",
  "schemaData": {
    "tool_grant_id": {
      "type": "integer"
    },
    "asset_name": {
      "type": "string"
    },
    "tool_operation": {
      "type": "string"
    },
    "agent_asset_id": {
      "type": "integer"
    },
    "tool_asset_id": {
      "type": "integer"
    },
    "access_mode": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "approved_by_user_id": {
      "type": "integer"
    },
    "valid_from": {
      "type": "string"
    },
    "valid_to": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'tool_grant_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group17c99, setgroup17c99}= useContext(TotalContext) as TotalContextProps;
  const {group17c99Props, setgroup17c99Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchde36d, setadvancesearchde36d}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5, settool_grant_tabled00d5}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5Props, settool_grant_tabled00d5Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group17c99,
        codeStates['setgroup'] = setgroup17c99,
        codeStates['group17c99'] = group17c99Props,
        codeStates['setgroup17c99'] = setgroup17c99Props,
        codeStates['advancesearch'] = advancesearchde36d,
        codeStates['setadvancesearch'] = setadvancesearchde36d,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settool_grant_tabled00d5Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "391557f60520e220a456c637e4c17c99",
        "b00dd9b355fc76610cc3efd6fd0de36d"
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
  if(dfd_toolgrant_v1Props?.setSearchFilters && dfd_toolgrant_v1Props?.data)
  {
    if(Array.isArray(dfd_toolgrant_v1Props.data) && dfd_toolgrant_v1Props.data.length > 0){
      setgroup17c99((pre:any)=>({...pre,tool_grant_id:dfd_toolgrant_v1Props.data[0]?.tool_grant_id}));
    }
  }
  },[dfd_toolgrant_v1Props?.setSearchFilters])
  if (advancesearchde36d?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 118`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearchde36d?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
