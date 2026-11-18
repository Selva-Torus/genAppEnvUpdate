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
        "id": "0d19ecd343f34570bac81132fc66abe7",
        "type": "controlNode",
        "position": {
          "x": -57.82389258553977,
          "y": -66.88403848920322
        },
        "data": {
          "nodeId": "0d19ecd343f34570bac81132fc66abe7",
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
            "0d19ecd343f34570bac81132fc66abe7.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -57.82441821299943,
          "y": -66.88292855314619
        }
      },
      {
        "id": "a29ca67334d046458bf34f78510159f6.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|risk_rule_table",
        "position": {
          "x": 11.508392646572672,
          "y": 67.20925792162254
        },
        "data": {
          "label": "riskRule.v1|risk_rule_table",
          "sequence": "1.1.1.1",
          "parent": "0d19ecd343f34570bac81132fc66abe7",
          "children": [],
          "nodeProperty": {},
          "name": "riskRule.v1|risk_rule_table",
          "nodeLabel": "",
          "parentId": "0d19ecd343f34570bac81132fc66abe7.1.1.1"
        },
        "width": 60,
        "height": 50,
        "positionAbsolute": {
          "x": 11.512331417454796,
          "y": 67.20736930486422
        }
      },
      {
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1",
        "type": "eventNode",
        "position": {
          "x": -66.08852186854942,
          "y": 28.179682019021215
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "0d19ecd343f34570bac81132fc66abe7",
          "children": [
            "0d19ecd343f34570bac81132fc66abe7.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -66.08614357288442,
          "y": 28.177561722512312
        }
      },
      {
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 29.152498050275486,
          "y": -54.02843814560789
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "0d19ecd343f34570bac81132fc66abe7.1.1",
          "children": [
            "a29ca67334d046458bf34f78510159f6.1.1.1.1",
            "0d19ecd343f34570bac81132fc66abe7.1.1.1.2"
          ],
          "nodeProperty": {
            "nodeId": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
            "nodeName": "searchFilter",
            "nodeType": "handlerNode",
            "hlr": {}
          }
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 29.147000131018036,
          "y": -54.01803376934467
        }
      },
      {
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 88.70706646131478,
          "y": 16.82974246057734
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 88.71200848660654,
          "y": 16.82216614113512
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
        "id": "0d19ecd343f34570bac81132fc66abe7->0d19ecd343f34570bac81132fc66abe7.1.1",
        "source": "0d19ecd343f34570bac81132fc66abe7",
        "type": "straight",
        "target": "0d19ecd343f34570bac81132fc66abe7.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1->a29ca67334d046458bf34f78510159f6.1.1.1.1",
        "source": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "type": "straight",
        "target": "a29ca67334d046458bf34f78510159f6.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1->0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "source": "0d19ecd343f34570bac81132fc66abe7.1.1",
        "type": "straight",
        "target": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "animated": true
      },
      {
        "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1->0d19ecd343f34570bac81132fc66abe7.1.1.1.2",
        "source": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "type": "straight",
        "target": "0d19ecd343f34570bac81132fc66abe7.1.1.1.2"
      }
    ],
    "NDP": {
      "0d19ecd343f34570bac81132fc66abe7.1.1.1": {
        "nodeId": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
        "nodeName": "searchFilter",
        "nodeType": "handlerNode",
        "hlr": {}
      }
    },
    "eventSummary": {
      "id": "0d19ecd343f34570bac81132fc66abe7",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "0d19ecd343f34570bac81132fc66abe7.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "a29ca67334d046458bf34f78510159f6.1.1.1.1",
                  "type": "screen",
                  "name": "riskRule.v1|risk_rule_table",
                  "label": "riskRule.v1|risk_rule_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|risk_rule_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                },
                {
                  "id": "0d19ecd343f34570bac81132fc66abe7.1.1.1.2",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.risk_rule_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.rule_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.rule_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.description",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.result_tier_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.priority_order",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.match_mode",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.effective_from",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.effective_to",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1|2e55d246da9442969f4ea329288d7219|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRuleSearch:AFVK:v1|8d9158cca503461c91a44d66f92eee21|0d19ecd343f34570bac81132fc66abe7"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1:",
  "schemaData": {
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
    },
    "is_active": {
      "type": "boolean"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_riskrule_v1Props, setdfd_riskrule_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'risk_rule_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grpeee21, setadvance_search_grpeee21}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grpeee21Props, setadvance_search_grpeee21Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch6abe7, setadvancesearch6abe7}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6, setrisk_rule_table159f6}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6Props, setrisk_rule_table159f6Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grpeee21,
        codeStates['setadvance_search_grp'] = setadvance_search_grpeee21,
        codeStates['advance_search_grpeee21'] = advance_search_grpeee21Props,
        codeStates['setadvance_search_grpeee21'] = setadvance_search_grpeee21Props,
        codeStates['advancesearch'] = advancesearch6abe7,
        codeStates['setadvancesearch'] = setadvancesearch6abe7,
        codeStates['risk_rule_table'] = risk_rule_table159f6,
        codeStates['setrisk_rule_table'] = setrisk_rule_table159f6,
        codeStates['risk_rule_table159f6'] = risk_rule_table159f6Props,
        codeStates['setrisk_rule_table159f6'] = setrisk_rule_table159f6Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setrisk_rule_table159f6Props((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'riskrulesearch');

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
        "8d9158cca503461c91a44d66f92eee21",
        "0d19ecd343f34570bac81132fc66abe7"
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
  if(dfd_riskrule_v1Props?.setSearchFilters && dfd_riskrule_v1Props?.data)
  {
    if(Array.isArray(dfd_riskrule_v1Props.data) && dfd_riskrule_v1Props.data.length > 0){
      setadvance_search_grpeee21((pre:any)=>({...pre,risk_rule_id:dfd_riskrule_v1Props.data[0]?.risk_rule_id}));
    }
  }
  },[dfd_riskrule_v1Props?.setSearchFilters])
  if (advancesearch6abe7?.isHidden) {
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
         disabled= {advancesearch6abe7?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
