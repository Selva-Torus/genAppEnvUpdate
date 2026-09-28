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
        "id": "c950591403c260e2ef44e8db862776d0",
        "type": "controlNode",
        "position": {
          "x": -54.46246447345808,
          "y": -69.45349464037598
        },
        "data": {
          "nodeId": "c950591403c260e2ef44e8db862776d0",
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
            "c950591403c260e2ef44e8db862776d0.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": -54.47337150498203,
          "y": -69.45041839365213
        }
      },
      {
        "id": "c950591403c260e2ef44e8db862776d0.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 68.90258876976867,
          "y": -15.310883208923755
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "c950591403c260e2ef44e8db862776d0.1.1",
          "children": [
            "4c7299622f9e490b882f70683dbbda50.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 68.90488559333512,
          "y": -15.30482191549017
        }
      },
      {
        "id": "4c7299622f9e490b882f70683dbbda50.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|integration_field_map_table",
        "position": {
          "x": 10.91864251232931,
          "y": 74.9379879507693
        },
        "data": {
          "label": "integrationFieldMap.v1|integration_field_map_table",
          "sequence": "1.1.1.1",
          "parent": "c950591403c260e2ef44e8db862776d0",
          "children": [],
          "nodeProperty": {},
          "name": "integrationFieldMap.v1|integration_field_map_table",
          "nodeLabel": "",
          "parentId": "c950591403c260e2ef44e8db862776d0.1.1.1"
        },
        "width": 54,
        "height": 66,
        "positionAbsolute": {
          "x": 10.915629813510453,
          "y": 74.93893435590803
        }
      },
      {
        "id": "c950591403c260e2ef44e8db862776d0.1.1",
        "type": "eventNode",
        "position": {
          "x": -28.427810208073023,
          "y": 6.0734450703845155
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "c950591403c260e2ef44e8db862776d0",
          "children": [
            "c950591403c260e2ef44e8db862776d0.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -28.41906966843078,
          "y": 6.065053307907169
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "c950591403c260e2ef44e8db862776d0->c950591403c260e2ef44e8db862776d0.1.1",
        "source": "c950591403c260e2ef44e8db862776d0",
        "type": "straight",
        "target": "c950591403c260e2ef44e8db862776d0.1.1",
        "animated": true
      },
      {
        "id": "c950591403c260e2ef44e8db862776d0.1.1.1->4c7299622f9e490b882f70683dbbda50.1.1.1.1",
        "source": "c950591403c260e2ef44e8db862776d0.1.1.1",
        "type": "straight",
        "target": "4c7299622f9e490b882f70683dbbda50.1.1.1.1"
      },
      {
        "id": "c950591403c260e2ef44e8db862776d0.1.1->c950591403c260e2ef44e8db862776d0.1.1.1",
        "source": "c950591403c260e2ef44e8db862776d0.1.1",
        "type": "straight",
        "target": "c950591403c260e2ef44e8db862776d0.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "c950591403c260e2ef44e8db862776d0",
      "type": "advancesearch",
      "name": "advance_search",
      "label": "advance_search",
      "sequence": 1,
      "children": [
        {
          "id": "c950591403c260e2ef44e8db862776d0.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "c950591403c260e2ef44e8db862776d0.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "4c7299622f9e490b882f70683dbbda50.1.1.1.1",
                  "type": "screen",
                  "name": "integrationFieldMap.v1|integration_field_map_table",
                  "label": "integrationFieldMap.v1|integration_field_map_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|integration_field_map_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|351bf95f56af41f091f1c61a38ecfb45|properties.integration_source_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|351bf95f56af41f091f1c61a38ecfb45|properties.source_field_path",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|351bf95f56af41f091f1c61a38ecfb45|properties.target_entity",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|351bf95f56af41f091f1c61a38ecfb45|properties.target_attribute",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1|351bf95f56af41f091f1c61a38ecfb45|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchIntegrationFieldMap:AFVK:v1|b75f977e83f74908b4e85edb59476315|c950591403c260e2ef44e8db862776d0"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1:",
  "schemaData": {
    "integration_source_id": {
      "type": "integer"
    },
    "source_field_path": {
      "type": "string"
    },
    "target_entity": {
      "type": "string"
    },
    "target_attribute": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_integrationfieldmap_v1Props, setdfd_integrationfieldmap_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {search_group76315, setsearch_group76315}= useContext(TotalContext) as TotalContextProps;
  const {search_group76315Props, setsearch_group76315Props}= useContext(TotalContext) as TotalContextProps;
  const {advance_search776d0, setadvance_search776d0}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50, setintegration_field_map_tablebda50}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50Props, setintegration_field_map_tablebda50Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group76315,
        codeStates['setsearch_group'] = setsearch_group76315,
        codeStates['search_group76315'] = search_group76315Props,
        codeStates['setsearch_group76315'] = setsearch_group76315Props,
        codeStates['advance_search'] = advance_search776d0,
        codeStates['setadvance_search'] = setadvance_search776d0,
        codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
        codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
        codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
        codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setintegration_field_map_tablebda50Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "b75f977e83f74908b4e85edb59476315",
        "c950591403c260e2ef44e8db862776d0"
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
  if(dfd_integrationfieldmap_v1Props?.setSearchFilters && dfd_integrationfieldmap_v1Props?.data)
  {
    if(Array.isArray(dfd_integrationfieldmap_v1Props.data) && dfd_integrationfieldmap_v1Props.data.length > 0){
      setsearch_group76315((pre:any)=>({...pre,integration_source_id:dfd_integrationfieldmap_v1Props.data[0]?.integration_source_id}));
    }
  }
  },[dfd_integrationfieldmap_v1Props?.setSearchFilters])
  if (advance_search776d0?.isHidden) {
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
         disabled= {advance_search776d0?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvance_search
