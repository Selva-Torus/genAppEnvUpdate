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
        "id": "786909d46d305c84285c1deea79a3da9",
        "type": "controlNode",
        "position": {
          "x": -52.76873931287984,
          "y": -71.03587039975831
        },
        "data": {
          "nodeId": "786909d46d305c84285c1deea79a3da9",
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
            "786909d46d305c84285c1deea79a3da9.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -52.76395865727564,
          "y": -71.03832211328294
        }
      },
      {
        "id": "676bd9b073bec5cd5dc14ac6f257b41f.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1|rule_condition_table",
        "position": {
          "x": 7.0353211971974945,
          "y": 68.3802320860083
        },
        "data": {
          "label": "ruleCondition.v1|rule_condition_table",
          "sequence": "1.1.1.1",
          "parent": "786909d46d305c84285c1deea79a3da9",
          "children": [],
          "nodeProperty": {},
          "name": "ruleCondition.v1|rule_condition_table",
          "nodeLabel": "",
          "parentId": "786909d46d305c84285c1deea79a3da9.1.1.1"
        },
        "width": 48,
        "height": 65,
        "positionAbsolute": {
          "x": 7.043250395942793,
          "y": 68.38405923626937
        }
      },
      {
        "id": "786909d46d305c84285c1deea79a3da9.1.1",
        "type": "eventNode",
        "position": {
          "x": -68.09471987650959,
          "y": 23.497121204500413
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "786909d46d305c84285c1deea79a3da9",
          "children": [
            "786909d46d305c84285c1deea79a3da9.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -68.09345093626033,
          "y": 23.493419041720298
        }
      },
      {
        "id": "786909d46d305c84285c1deea79a3da9.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 32.03174493165421,
          "y": -50.63468825118452
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "786909d46d305c84285c1deea79a3da9.1.1",
          "children": [
            "676bd9b073bec5cd5dc14ac6f257b41f.1.1.1.1",
            "786909d46d305c84285c1deea79a3da9.1.1.1.2"
          ],
          "nodeProperty": {
            "nodeId": "786909d46d305c84285c1deea79a3da9.1.1.1",
            "nodeName": "searchFilter",
            "nodeType": "handlerNode",
            "hlr": {}
          }
        },
        "width": 48,
        "height": 48,
        "positionAbsolute": {
          "x": 32.015912965766745,
          "y": -50.60558609126408
        }
      },
      {
        "id": "786909d46d305c84285c1deea79a3da9.1.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 88.02993846324775,
          "y": 22.15784362645975
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "786909d46d305c84285c1deea79a3da9.1.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 88.0459710054467,
          "y": 22.1401041544314
        },
        "width": 48,
        "height": 48
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "786909d46d305c84285c1deea79a3da9->786909d46d305c84285c1deea79a3da9.1.1",
        "source": "786909d46d305c84285c1deea79a3da9",
        "type": "straight",
        "target": "786909d46d305c84285c1deea79a3da9.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "786909d46d305c84285c1deea79a3da9.1.1.1->676bd9b073bec5cd5dc14ac6f257b41f.1.1.1.1",
        "source": "786909d46d305c84285c1deea79a3da9.1.1.1",
        "type": "straight",
        "target": "676bd9b073bec5cd5dc14ac6f257b41f.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "786909d46d305c84285c1deea79a3da9.1.1->786909d46d305c84285c1deea79a3da9.1.1.1",
        "source": "786909d46d305c84285c1deea79a3da9.1.1",
        "type": "straight",
        "target": "786909d46d305c84285c1deea79a3da9.1.1.1",
        "animated": true
      },
      {
        "id": "786909d46d305c84285c1deea79a3da9.1.1.1->786909d46d305c84285c1deea79a3da9.1.1.1.2",
        "source": "786909d46d305c84285c1deea79a3da9.1.1.1",
        "type": "straight",
        "target": "786909d46d305c84285c1deea79a3da9.1.1.1.2"
      }
    ],
    "NDP": {
      "786909d46d305c84285c1deea79a3da9.1.1.1": {
        "nodeId": "786909d46d305c84285c1deea79a3da9.1.1.1",
        "nodeName": "searchFilter",
        "nodeType": "handlerNode",
        "hlr": {}
      }
    },
    "eventSummary": {
      "id": "786909d46d305c84285c1deea79a3da9",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "786909d46d305c84285c1deea79a3da9.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "786909d46d305c84285c1deea79a3da9.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "676bd9b073bec5cd5dc14ac6f257b41f.1.1.1.1",
                  "type": "screen",
                  "name": "ruleCondition.v1|rule_condition_table",
                  "label": "ruleCondition.v1|rule_condition_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1|rule_condition_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                },
                {
                  "id": "786909d46d305c84285c1deea79a3da9.1.1.1.2",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.rule_condition_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.attribute_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.operator_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.compare_value",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.sequence_no",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1|78909510abe34a378fca6af87dd37c96|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchRiskRuleCondition:AFVK:v1|da6620c047a59eacc1a326c51ed98421|786909d46d305c84285c1deea79a3da9"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:riskRuleCondition:AFVK:v1:",
  "schemaData": {
    "rule_condition_id": {
      "type": "integer"
    },
    "attribute_name": {
      "type": "string"
    },
    "operator_code": {
      "type": "string"
    },
    "compare_value": {
      "type": "string"
    },
    "sequence_no": {
      "type": "integer"
    },
    "is_active": {
      "type": "boolean"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'rule_condition_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group98421, setgroup98421}= useContext(TotalContext) as TotalContextProps;
  const {group98421Props, setgroup98421Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearcha3da9, setadvancesearcha3da9}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41f, setrule_condition_table7b41f}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41fProps, setrule_condition_table7b41fProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group98421,
        codeStates['setgroup'] = setgroup98421,
        codeStates['group98421'] = group98421Props,
        codeStates['setgroup98421'] = setgroup98421Props,
        codeStates['advancesearch'] = advancesearcha3da9,
        codeStates['setadvancesearch'] = setadvancesearcha3da9,
        codeStates['rule_condition_table'] = rule_condition_table7b41f,
        codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
        codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
        codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setrule_condition_table7b41fProps((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'searchriskrulecondition');

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
        "da6620c047a59eacc1a326c51ed98421",
        "786909d46d305c84285c1deea79a3da9"
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
  if(dfd_riskrulecondition_v1Props?.setSearchFilters && dfd_riskrulecondition_v1Props?.data)
  {
    if(Array.isArray(dfd_riskrulecondition_v1Props.data) && dfd_riskrulecondition_v1Props.data.length > 0){
      setgroup98421((pre:any)=>({...pre,rule_condition_id:dfd_riskrulecondition_v1Props.data[0]?.rule_condition_id}));
    }
  }
  },[dfd_riskrulecondition_v1Props?.setSearchFilters])
  if (advancesearcha3da9?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 154`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearcha3da9?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
