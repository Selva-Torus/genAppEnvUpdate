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

const AdvancedSearchadvance_search = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "38e3b5db03904c4a9aae8bf28fe81529",
        "type": "controlNode",
        "position": {
          "x": -73.2631154842905,
          "y": -14.878039799221373
        },
        "data": {
          "nodeId": "38e3b5db03904c4a9aae8bf28fe81529",
          "nodeName": "advance_search",
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
          "label": "advance_search",
          "children": [
            "38e3b5db03904c4a9aae8bf28fe81529.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": -73.26463303727468,
          "y": -14.85018507173718
        }
      },
      {
        "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -8.496521828809335,
          "y": 26.047942989846216
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "38e3b5db03904c4a9aae8bf28fe81529.1.1",
          "children": [
            "a696d81507e88f293fe369b29901fae5.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": -8.45820678722135,
          "y": 26.002324324209745
        },
        "width": 51,
        "height": 45
      },
      {
        "id": "a696d81507e88f293fe369b29901fae5.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|integration_source",
        "position": {
          "x": 64.58702780509162,
          "y": 58.458312457169264
        },
        "data": {
          "label": "integrationSource.v1|integration_source",
          "sequence": "1.1.1.1",
          "parent": "38e3b5db03904c4a9aae8bf28fe81529",
          "children": [],
          "nodeProperty": {},
          "name": "integrationSource.v1|integration_source",
          "nodeLabel": "",
          "parentId": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1"
        },
        "positionAbsolute": {
          "x": 64.56656060896701,
          "y": 58.50071545779993
        },
        "width": 54,
        "height": 66
      },
      {
        "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1",
        "type": "eventNode",
        "position": {
          "x": 23.697143916419183,
          "y": -67.89710860508288
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "38e3b5db03904c4a9aae8bf28fe81529",
          "children": [
            "38e3b5db03904c4a9aae8bf28fe81529.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 23.685137757630564,
          "y": -67.91510955275763
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "38e3b5db03904c4a9aae8bf28fe81529->38e3b5db03904c4a9aae8bf28fe81529.1.1",
        "source": "38e3b5db03904c4a9aae8bf28fe81529",
        "type": "straight",
        "target": "38e3b5db03904c4a9aae8bf28fe81529.1.1",
        "animated": true
      },
      {
        "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1->a696d81507e88f293fe369b29901fae5.1.1.1.1",
        "source": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1",
        "type": "straight",
        "target": "a696d81507e88f293fe369b29901fae5.1.1.1.1"
      },
      {
        "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1->38e3b5db03904c4a9aae8bf28fe81529.1.1.1",
        "source": "38e3b5db03904c4a9aae8bf28fe81529.1.1",
        "type": "straight",
        "target": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "38e3b5db03904c4a9aae8bf28fe81529",
      "type": "advancesearch",
      "name": "advance_search",
      "label": "advance_search",
      "sequence": 1,
      "children": [
        {
          "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "38e3b5db03904c4a9aae8bf28fe81529.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "a696d81507e88f293fe369b29901fae5.1.1.1.1",
                  "type": "screen",
                  "name": "integrationSource.v1|integration_source",
                  "label": "integrationSource.v1|integration_source",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|integration_source",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.integration_source_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.source_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.source_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.source_category_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.connector_type_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.auth_method_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.is_enabled",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1|00451184fbfc4a2b8af19d45b97c9512|properties.last_run_on"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchIntegrationSource:AFVK:v1|7ec5ce18a14f418784afcd19bd673523|38e3b5db03904c4a9aae8bf28fe81529"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1:",
  "schemaData": {
    "integration_source_id": {
      "type": "integer"
    },
    "source_code": {
      "type": "string"
    },
    "source_name": {
      "type": "string"
    },
    "source_category_code": {
      "type": "string"
    },
    "connector_type_code": {
      "type": "string"
    },
    "auth_method_code": {
      "type": "string"
    },
    "is_enabled": {
      "type": "string"
    },
    "last_run_on": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'integration_source_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group73523, setsearch_group73523}= useContext(TotalContext) as TotalContextProps;
  const {search_group73523Props, setsearch_group73523Props}= useContext(TotalContext) as TotalContextProps;
  const {advance_search81529, setadvance_search81529}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5, setintegration_source1fae5}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5Props, setintegration_source1fae5Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group73523,
        codeStates['setsearch_group'] = setsearch_group73523,
        codeStates['search_group73523'] = search_group73523Props,
        codeStates['setsearch_group73523'] = setsearch_group73523Props,
        codeStates['advance_search'] = advance_search81529,
        codeStates['setadvance_search'] = setadvance_search81529,
        codeStates['integration_source'] = integration_source1fae5,
        codeStates['setintegration_source'] = setintegration_source1fae5,
        codeStates['integration_source1fae5'] = integration_source1fae5Props,
        codeStates['setintegration_source1fae5'] = setintegration_source1fae5Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setintegration_source1fae5Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "7ec5ce18a14f418784afcd19bd673523",
        "38e3b5db03904c4a9aae8bf28fe81529"
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
  if(dfd_integrationsource_v1Props?.setSearchFilters && dfd_integrationsource_v1Props?.data)
  {
    if(Array.isArray(dfd_integrationsource_v1Props.data) && dfd_integrationsource_v1Props.data.length > 0){
      setsearch_group73523((pre:any)=>({...pre,integration_source_id:dfd_integrationsource_v1Props.data[0]?.integration_source_id}));
    }
  }
  },[dfd_integrationsource_v1Props?.setSearchFilters])
  if (advance_search81529?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `3 / 113`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advance_search81529?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvance_search
