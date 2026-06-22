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
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const AdvancedSearchadvancesearch = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
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
        "id": "8add0a423cad4209841f75d769e9e02b",
        "type": "controlNode",
        "position": {
          "x": -51.29608631668242,
          "y": -75.99755317841723
        },
        "data": {
          "nodeId": "8add0a423cad4209841f75d769e9e02b",
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
            "8add0a423cad4209841f75d769e9e02b.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 29,
        "positionAbsolute": {
          "x": -51.76999248170169,
          "y": -75.9893034808118
        }
      },
      {
        "id": "8add0a423cad4209841f75d769e9e02b.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 9.445502200899965,
          "y": 51.03965533388825
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "8add0a423cad4209841f75d769e9e02b.1.1",
          "children": [
            "2f7c1caa85a04bb5bacd9e41b26f2b38.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 9.544166842037924,
          "y": 50.53853299940258
        }
      },
      {
        "id": "2f7c1caa85a04bb5bacd9e41b26f2b38.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|asset_table",
        "position": {
          "x": 85.86987688216402,
          "y": 22.619403441651436
        },
        "data": {
          "label": "assets.v1|asset_table",
          "sequence": "1.1.1.1",
          "parent": "8add0a423cad4209841f75d769e9e02b",
          "children": [],
          "nodeProperty": {},
          "name": "assets.v1|asset_table",
          "nodeLabel": "",
          "parentId": "8add0a423cad4209841f75d769e9e02b.1.1.1"
        },
        "width": 78,
        "height": 45,
        "positionAbsolute": {
          "x": 85.97301264523749,
          "y": 23.06925282265068
        }
      },
      {
        "id": "8add0a423cad4209841f75d769e9e02b.1.1",
        "type": "eventNode",
        "position": {
          "x": -44.41982497404312,
          "y": -0.5341691648262991
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "8add0a423cad4209841f75d769e9e02b",
          "children": [
            "8add0a423cad4209841f75d769e9e02b.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -44.13654833082776,
          "y": -0.7534577251094063
        },
        "selected": true,
        "dragging": false
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "8add0a423cad4209841f75d769e9e02b->8add0a423cad4209841f75d769e9e02b.1.1",
        "source": "8add0a423cad4209841f75d769e9e02b",
        "type": "straight",
        "target": "8add0a423cad4209841f75d769e9e02b.1.1",
        "animated": true
      },
      {
        "id": "8add0a423cad4209841f75d769e9e02b.1.1.1->2f7c1caa85a04bb5bacd9e41b26f2b38.1.1.1.1",
        "source": "8add0a423cad4209841f75d769e9e02b.1.1.1",
        "type": "straight",
        "target": "2f7c1caa85a04bb5bacd9e41b26f2b38.1.1.1.1"
      },
      {
        "id": "8add0a423cad4209841f75d769e9e02b.1.1->8add0a423cad4209841f75d769e9e02b.1.1.1",
        "source": "8add0a423cad4209841f75d769e9e02b.1.1",
        "type": "straight",
        "target": "8add0a423cad4209841f75d769e9e02b.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "8add0a423cad4209841f75d769e9e02b",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "8add0a423cad4209841f75d769e9e02b.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "8add0a423cad4209841f75d769e9e02b.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "2f7c1caa85a04bb5bacd9e41b26f2b38.1.1.1.1",
                  "type": "screen",
                  "name": "assets.v1|asset_table",
                  "label": "assets.v1|asset_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|asset_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|19752269565d4be2be63be1bd8cf4ff6|properties.category_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|19752269565d4be2be63be1bd8cf4ff6|properties.asset_tag",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|19752269565d4be2be63be1bd8cf4ff6|properties.asset_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1|19752269565d4be2be63be1bd8cf4ff6|properties.description"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetSearch:AFVK:v1|4a04f11db9e9433aa311b85863846c56|8add0a423cad4209841f75d769e9e02b"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1:",
  "schemaData": {
    "category_name": {
      "type": "string"
    },
    "asset_tag": {
      "type": "string"
    },
    "asset_name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'category_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {asset_search_group46c56, setasset_search_group46c56}= useContext(TotalContext) as TotalContextProps;
  const {asset_search_group46c56Props, setasset_search_group46c56Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch9e02b, setadvancesearch9e02b}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38, setasset_tablef2b38}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38Props, setasset_tablef2b38Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['asset_search_group'] = asset_search_group46c56,
        codeStates['setasset_search_group'] = setasset_search_group46c56,
        codeStates['asset_search_group46c56'] = asset_search_group46c56Props,
        codeStates['setasset_search_group46c56'] = setasset_search_group46c56Props,
        codeStates['advancesearch'] = advancesearch9e02b,
        codeStates['setadvancesearch'] = setadvancesearch9e02b,
        codeStates['asset_table'] = asset_tablef2b38,
        codeStates['setasset_table'] = setasset_tablef2b38,
        codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
        codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setasset_tablef2b38Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "4a04f11db9e9433aa311b85863846c56",
        "8add0a423cad4209841f75d769e9e02b"
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
  if(dfd_assets_v1Props?.setSearchFilters && dfd_assets_v1Props?.data)
  {
    if(Array.isArray(dfd_assets_v1Props.data) && dfd_assets_v1Props.data.length > 0){
      setasset_search_group46c56((pre:any)=>({...pre,category_name:dfd_assets_v1Props.data[0]?.category_name}));
    }
  }
  },[dfd_assets_v1Props?.setSearchFilters])
  if (advancesearch9e02b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 96`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearch9e02b?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
