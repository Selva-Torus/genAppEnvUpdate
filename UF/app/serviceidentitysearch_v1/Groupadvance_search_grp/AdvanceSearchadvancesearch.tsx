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
        "id": "9b58626f3c6f6cc95e32f8948281f511",
        "type": "controlNode",
        "position": {
          "x": -57.31203568045785,
          "y": -67.35868530111821
        },
        "data": {
          "nodeId": "9b58626f3c6f6cc95e32f8948281f511",
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
            "9b58626f3c6f6cc95e32f8948281f511.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -57.31259264065795,
          "y": -67.35826151052574
        }
      },
      {
        "id": "6617aca6c56e513e89e6a741927ff4a5.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:serviceIdentityList:AFVK:v1|policy_rule_table",
        "position": {
          "x": 10.89152472496819,
          "y": 67.35454230006643
        },
        "data": {
          "label": "serviceIdentityList.v1|policy_rule_table",
          "sequence": "1.1.1.1",
          "parent": "9b58626f3c6f6cc95e32f8948281f511",
          "children": [],
          "nodeProperty": {},
          "name": "serviceIdentityList.v1|policy_rule_table",
          "nodeLabel": "",
          "parentId": "9b58626f3c6f6cc95e32f8948281f511.1.1.1"
        },
        "width": 48,
        "height": 66,
        "positionAbsolute": {
          "x": 10.892834865576967,
          "y": 67.35381315992967
        }
      },
      {
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1",
        "type": "eventNode",
        "position": {
          "x": -66.35052684953645,
          "y": 27.72651400996077
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "9b58626f3c6f6cc95e32f8948281f511",
          "children": [
            "9b58626f3c6f6cc95e32f8948281f511.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -66.34960905180448,
          "y": 27.72574982995362
        }
      },
      {
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 29.71806427373923,
          "y": -54.11857944514615
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "9b58626f3c6f6cc95e32f8948281f511.1.1",
          "children": [
            "6617aca6c56e513e89e6a741927ff4a5.1.1.1.1",
            "9b58626f3c6f6cc95e32f8948281f511.1.1.1.2"
          ],
          "nodeProperty": {
            "nodeId": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
            "nodeName": "searchFilter",
            "nodeType": "handlerNode",
            "hlr": {}
          }
        },
        "width": 48,
        "height": 49,
        "positionAbsolute": {
          "x": 29.716057405693476,
          "y": -54.11548878475889
        }
      },
      {
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 88.42114013996924,
          "y": 17.700749004784473
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 88.4225315548051,
          "y": 17.698053836784702
        },
        "width": 48,
        "height": 49
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9b58626f3c6f6cc95e32f8948281f511->9b58626f3c6f6cc95e32f8948281f511.1.1",
        "source": "9b58626f3c6f6cc95e32f8948281f511",
        "type": "straight",
        "target": "9b58626f3c6f6cc95e32f8948281f511.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1->6617aca6c56e513e89e6a741927ff4a5.1.1.1.1",
        "source": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "type": "straight",
        "target": "6617aca6c56e513e89e6a741927ff4a5.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1->9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "source": "9b58626f3c6f6cc95e32f8948281f511.1.1",
        "type": "straight",
        "target": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "animated": true
      },
      {
        "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1->9b58626f3c6f6cc95e32f8948281f511.1.1.1.2",
        "source": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "type": "straight",
        "target": "9b58626f3c6f6cc95e32f8948281f511.1.1.1.2"
      }
    ],
    "NDP": {
      "9b58626f3c6f6cc95e32f8948281f511.1.1.1": {
        "nodeId": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
        "nodeName": "searchFilter",
        "nodeType": "handlerNode",
        "hlr": {}
      }
    },
    "layoutMode": null,
    "dagreDirection": "TB",
    "eventSummary": {
      "id": "9b58626f3c6f6cc95e32f8948281f511",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "9b58626f3c6f6cc95e32f8948281f511.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "6617aca6c56e513e89e6a741927ff4a5.1.1.1.1",
                  "type": "screen",
                  "name": "serviceIdentityList.v1|policy_rule_table",
                  "label": "serviceIdentityList.v1|policy_rule_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:serviceIdentityList:AFVK:v1|policy_rule_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                },
                {
                  "id": "9b58626f3c6f6cc95e32f8948281f511.1.1.1.2",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.identity_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.principal_type",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.principal_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.identity_provider",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.last_seen_at",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1|b325a58da2ecafb91800d7c2f555dd61|properties.status"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:serviceIdentitySearch:AFVK:v1|d9867a92e38d8b34b15d11f54348db17|9b58626f3c6f6cc95e32f8948281f511"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:credentialRefList:AFVK:v1:",
  "schemaData": {
    "identity_id": {
      "type": "integer"
    },
    "principal_type": {
      "type": "string"
    },
    "principal_id": {
      "type": "string"
    },
    "identity_provider": {
      "type": "string"
    },
    "last_seen_at": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_credentialreflist_v1Props, setdfd_credentialreflist_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'identity_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grp8db17, setadvance_search_grp8db17}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grp8db17Props, setadvance_search_grp8db17Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch1f511, setadvancesearch1f511}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_tableff4a5, setpolicy_rule_tableff4a5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_tableff4a5Props, setpolicy_rule_tableff4a5Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grp8db17,
        codeStates['setadvance_search_grp'] = setadvance_search_grp8db17,
        codeStates['advance_search_grp8db17'] = advance_search_grp8db17Props,
        codeStates['setadvance_search_grp8db17'] = setadvance_search_grp8db17Props,
        codeStates['advancesearch'] = advancesearch1f511,
        codeStates['setadvancesearch'] = setadvancesearch1f511,
        codeStates['policy_rule_table'] = policy_rule_tableff4a5,
        codeStates['setpolicy_rule_table'] = setpolicy_rule_tableff4a5,
        codeStates['policy_rule_tableff4a5'] = policy_rule_tableff4a5Props,
        codeStates['setpolicy_rule_tableff4a5'] = setpolicy_rule_tableff4a5Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setpolicy_rule_tableff4a5Props((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'serviceidentitysearch');

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
        "d9867a92e38d8b34b15d11f54348db17",
        "9b58626f3c6f6cc95e32f8948281f511"
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
  if(dfd_credentialreflist_v1Props?.setSearchFilters && dfd_credentialreflist_v1Props?.data)
  {
    if(Array.isArray(dfd_credentialreflist_v1Props.data) && dfd_credentialreflist_v1Props.data.length > 0){
      setadvance_search_grp8db17((pre:any)=>({...pre,identity_id:dfd_credentialreflist_v1Props.data[0]?.identity_id}));
    }
  }
  },[dfd_credentialreflist_v1Props?.setSearchFilters])
  if (advancesearch1f511?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `2 / 127`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearch1f511?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
