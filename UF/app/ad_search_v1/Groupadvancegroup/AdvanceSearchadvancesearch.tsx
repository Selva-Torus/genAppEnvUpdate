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
        "id": "ebf660ac15404ba387e5a0c7735f4a44",
        "type": "controlNode",
        "position": {
          "x": -22.97099382461875,
          "y": -84.14029056567654
        },
        "data": {
          "nodeId": "ebf660ac15404ba387e5a0c7735f4a44",
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
            "ebf660ac15404ba387e5a0c7735f4a44.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -22.970428822099407,
          "y": -84.13236236984389
        }
      },
      {
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1.1",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 43.84232457367933,
          "y": -34.21188017614923
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 43.84165492903834,
          "y": -34.201629181727775
        },
        "width": 55,
        "height": 45,
        "selected": false,
        "dragging": false
      },
      {
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -23.11257680759513,
          "y": 75.28130774737774
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.2",
          "parentId": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
          "children": [
            "0076e480888e46f2a4a89dadcac03366.1.1.2.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": -23.106852467823423,
          "y": 75.25786094561691
        }
      },
      {
        "id": "0076e480888e46f2a4a89dadcac03366.1.1.2.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:ad_search_table:AFVK:v1|advancesearchtable",
        "position": {
          "x": 72.24860313637578,
          "y": 49.50047257432884
        },
        "data": {
          "label": "ad_search_table.v1|advancesearchtable",
          "sequence": "1.1.2.1",
          "parent": "ebf660ac15404ba387e5a0c7735f4a44",
          "children": [],
          "nodeProperty": {},
          "name": "ad_search_table.v1|advancesearchtable",
          "nodeLabel": "",
          "parentId": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2"
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": 72.25356631786892,
          "y": 49.52709266199263
        }
      },
      {
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
        "type": "eventNode",
        "position": {
          "x": -76.82949096111903,
          "y": -2.5860419166711215
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "ebf660ac15404ba387e5a0c7735f4a44",
          "children": [
            "ebf660ac15404ba387e5a0c7735f4a44.1.1.1",
            "ebf660ac15404ba387e5a0c7735f4a44.1.1.2"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -76.83666871939882,
          "y": -2.5871129833635655
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "ebf660ac15404ba387e5a0c7735f4a44->ebf660ac15404ba387e5a0c7735f4a44.1.1",
        "source": "ebf660ac15404ba387e5a0c7735f4a44",
        "type": "straight",
        "target": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1->ebf660ac15404ba387e5a0c7735f4a44.1.1.1",
        "source": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
        "type": "straight",
        "target": "ebf660ac15404ba387e5a0c7735f4a44.1.1.1",
        "animated": true
      },
      {
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2->0076e480888e46f2a4a89dadcac03366.1.1.2.1",
        "source": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2",
        "type": "straight",
        "target": "0076e480888e46f2a4a89dadcac03366.1.1.2.1"
      },
      {
        "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1->ebf660ac15404ba387e5a0c7735f4a44.1.1.2",
        "source": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
        "type": "straight",
        "target": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "ebf660ac15404ba387e5a0c7735f4a44",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "closeHandler",
              "label": "closeHandler",
              "sequence": "1.1.1",
              "children": []
            },
            {
              "id": "ebf660ac15404ba387e5a0c7735f4a44.1.1.2",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.2",
              "children": [
                {
                  "id": "0076e480888e46f2a4a89dadcac03366.1.1.2.1",
                  "type": "screen",
                  "name": "ad_search_table.v1|advancesearchtable",
                  "label": "ad_search_table.v1|advancesearchtable",
                  "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:ad_search_table:AFVK:v1|advancesearchtable",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.2.1",
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
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1|f46bdd6636f04d06acd608adb3ca2db3|items.properties.country",
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1|f46bdd6636f04d06acd608adb3ca2db3|items.properties.state",
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1|f46bdd6636f04d06acd608adb3ca2db3|items.properties.city"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:ad_search:AFVK:v1|3251c71e9b52454380522b6a5a5a9081|ebf660ac15404ba387e5a0c7735f4a44"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:advance_search:AFVK:v1:",
  "schemaData": {
    "country": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "city": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_advance_search_v1Props, setdfd_advance_search_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'country',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advancegroupa9081, setadvancegroupa9081}= useContext(TotalContext) as TotalContextProps;
  const {advancegroupa9081Props, setadvancegroupa9081Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchf4a44, setadvancesearchf4a44}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchtable03366, setadvancesearchtable03366}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchtable03366Props, setadvancesearchtable03366Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advancegroup'] = advancegroupa9081,
        codeStates['setadvancegroup'] = setadvancegroupa9081,
        codeStates['advancegroupa9081'] = advancegroupa9081Props,
        codeStates['setadvancegroupa9081'] = setadvancegroupa9081Props,
        codeStates['advancesearch'] = advancesearchf4a44,
        codeStates['setadvancesearch'] = setadvancesearchf4a44,
        codeStates['advancesearchtable'] = advancesearchtable03366,
        codeStates['setadvancesearchtable'] = setadvancesearchtable03366,
        codeStates['advancesearchtable03366'] = advancesearchtable03366Props,
        codeStates['setadvancesearchtable03366'] = setadvancesearchtable03366Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
    // closeHandler   
    eventBus.emit('closeModal', 'ad_search');
      // searchFilter for riseListen
        setadvancesearchtable03366Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "3251c71e9b52454380522b6a5a5a9081",
        "ebf660ac15404ba387e5a0c7735f4a44"
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
  if(dfd_advance_search_v1Props?.setSearchFilters && dfd_advance_search_v1Props?.data)
  {
    if(Array.isArray(dfd_advance_search_v1Props.data) && dfd_advance_search_v1Props.data.length > 0){
      setadvancegroupa9081((pre:any)=>({...pre,country:dfd_advance_search_v1Props.data[0]?.country}));
    }
  }
  },[dfd_advance_search_v1Props?.setSearchFilters])
  if (advancesearchf4a44?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `8 / 18`,gridRow: `11 / 117`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearchf4a44?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
