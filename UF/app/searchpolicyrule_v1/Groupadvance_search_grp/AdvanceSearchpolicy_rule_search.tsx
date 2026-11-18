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

const AdvancedSearchpolicy_rule_search = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "905c2edab1214cc334866f0ed72e4882",
        "type": "controlNode",
        "position": {
          "x": -1.230439016373438,
          "y": -73.65619539225874
        },
        "data": {
          "nodeId": "905c2edab1214cc334866f0ed72e4882",
          "nodeName": "policy_rule_search",
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
          "label": "policy_rule_search",
          "children": [
            "905c2edab1214cc334866f0ed72e4882.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -1.20796638747141,
          "y": -73.66004177104027
        }
      },
      {
        "id": "905c2edab1214cc334866f0ed72e4882.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 50.5293399237063,
          "y": -4.832940190541776
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "905c2edab1214cc334866f0ed72e4882.1.1",
          "children": [
            "23714957d9dde7f2f2876ef71d47fde5.1.1.1.1"
          ]
        },
        "width": 48,
        "height": 49,
        "positionAbsolute": {
          "x": 50.48094860832226,
          "y": -4.823265045746542
        }
      },
      {
        "id": "23714957d9dde7f2f2876ef71d47fde5.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|policy_rule_table",
        "position": {
          "x": 14.646666855752857,
          "y": 78.02225707403547
        },
        "data": {
          "label": "policyRuleList.v1|policy_rule_table",
          "sequence": "1.1.1.1",
          "parent": "905c2edab1214cc334866f0ed72e4882",
          "children": [],
          "nodeProperty": {},
          "name": "policyRuleList.v1|policy_rule_table",
          "nodeLabel": "",
          "parentId": "905c2edab1214cc334866f0ed72e4882.1.1.1"
        },
        "width": 48,
        "height": 66,
        "positionAbsolute": {
          "x": 14.687873600064396,
          "y": 78.03909261409987
        }
      },
      {
        "id": "905c2edab1214cc334866f0ed72e4882.1.1",
        "type": "eventNode",
        "position": {
          "x": -64.71309265100197,
          "y": 4.776194581376955
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "905c2edab1214cc334866f0ed72e4882",
          "children": [
            "905c2edab1214cc334866f0ed72e4882.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -64.72720078875406,
          "y": 4.768083898291344
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "905c2edab1214cc334866f0ed72e4882->905c2edab1214cc334866f0ed72e4882.1.1",
        "source": "905c2edab1214cc334866f0ed72e4882",
        "type": "straight",
        "target": "905c2edab1214cc334866f0ed72e4882.1.1",
        "animated": true
      },
      {
        "id": "905c2edab1214cc334866f0ed72e4882.1.1.1->23714957d9dde7f2f2876ef71d47fde5.1.1.1.1",
        "source": "905c2edab1214cc334866f0ed72e4882.1.1.1",
        "type": "straight",
        "target": "23714957d9dde7f2f2876ef71d47fde5.1.1.1.1"
      },
      {
        "id": "905c2edab1214cc334866f0ed72e4882.1.1->905c2edab1214cc334866f0ed72e4882.1.1.1",
        "source": "905c2edab1214cc334866f0ed72e4882.1.1",
        "type": "straight",
        "target": "905c2edab1214cc334866f0ed72e4882.1.1.1"
      }
    ],
    "NDP": {},
    "layoutMode": null,
    "dagreDirection": "TB",
    "eventSummary": {
      "id": "905c2edab1214cc334866f0ed72e4882",
      "type": "advancesearch",
      "name": "policy_rule_search",
      "label": "policy_rule_search",
      "sequence": 1,
      "children": [
        {
          "id": "905c2edab1214cc334866f0ed72e4882.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "905c2edab1214cc334866f0ed72e4882.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "23714957d9dde7f2f2876ef71d47fde5.1.1.1.1",
                  "type": "screen",
                  "name": "policyRuleList.v1|policy_rule_table",
                  "label": "policyRuleList.v1|policy_rule_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|policy_rule_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|546af1e29289915dbc170d67aae88cc3|properties.policy_rule_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|546af1e29289915dbc170d67aae88cc3|properties.policy_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|546af1e29289915dbc170d67aae88cc3|properties.policy_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|546af1e29289915dbc170d67aae88cc3|properties.policy_type",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1|546af1e29289915dbc170d67aae88cc3|properties.test_status"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchPolicyRule:AFVK:v1|81995a1a559a4aaa057e4470cc3e3455|905c2edab1214cc334866f0ed72e4882"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1:",
  "schemaData": {
    "policy_rule_id": {
      "type": "integer"
    },
    "policy_code": {
      "type": "string"
    },
    "policy_name": {
      "type": "string"
    },
    "policy_type": {
      "type": "string"
    },
    "test_status": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_policyrulelist_v1Props, setdfd_policyrulelist_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'policy_rule_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grpe3455, setadvance_search_grpe3455}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grpe3455Props, setadvance_search_grpe3455Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_searche4882, setpolicy_rule_searche4882}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5, setpolicy_rule_table7fde5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5Props, setpolicy_rule_table7fde5Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grpe3455,
        codeStates['setadvance_search_grp'] = setadvance_search_grpe3455,
        codeStates['advance_search_grpe3455'] = advance_search_grpe3455Props,
        codeStates['setadvance_search_grpe3455'] = setadvance_search_grpe3455Props,
        codeStates['policy_rule_search'] = policy_rule_searche4882,
        codeStates['setpolicy_rule_search'] = setpolicy_rule_searche4882,
        codeStates['policy_rule_table'] = policy_rule_table7fde5,
        codeStates['setpolicy_rule_table'] = setpolicy_rule_table7fde5,
        codeStates['policy_rule_table7fde5'] = policy_rule_table7fde5Props,
        codeStates['setpolicy_rule_table7fde5'] = setpolicy_rule_table7fde5Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setpolicy_rule_table7fde5Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "81995a1a559a4aaa057e4470cc3e3455",
        "905c2edab1214cc334866f0ed72e4882"
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
  if(dfd_policyrulelist_v1Props?.setSearchFilters && dfd_policyrulelist_v1Props?.data)
  {
    if(Array.isArray(dfd_policyrulelist_v1Props.data) && dfd_policyrulelist_v1Props.data.length > 0){
      setadvance_search_grpe3455((pre:any)=>({...pre,policy_rule_id:dfd_policyrulelist_v1Props.data[0]?.policy_rule_id}));
    }
  }
  },[dfd_policyrulelist_v1Props?.setSearchFilters])
  if (policy_rule_searche4882?.isHidden) {
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
         disabled= {policy_rule_searche4882?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchpolicy_rule_search
