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
        "id": "0fa08182e2504bb3bc2dd55d6481eb42",
        "type": "controlNode",
        "position": {
          "x": -65.21630289452041,
          "y": -37.7305007833554
        },
        "data": {
          "nodeId": "0fa08182e2504bb3bc2dd55d6481eb42",
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
            "0fa08182e2504bb3bc2dd55d6481eb42.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -65.23643640085588,
          "y": -37.768918192233194
        }
      },
      {
        "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -28.860326800698367,
          "y": 51.917711891527
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "0fa08182e2504bb3bc2dd55d6481eb42.1.1",
          "children": [
            "2178aeed8e5be8124bb2f196f35aa941.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": -28.82693648844336,
          "y": 51.902868788021074
        },
        "width": 48,
        "height": 48
      },
      {
        "id": "2178aeed8e5be8124bb2f196f35aa941.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certification:AFVK:v1|certificate_table",
        "position": {
          "x": 65.93688289287886,
          "y": 37.29919328758807
        },
        "data": {
          "label": "certification.v1|certificate_table",
          "sequence": "1.1.1.1",
          "parent": "0fa08182e2504bb3bc2dd55d6481eb42",
          "children": [],
          "nodeProperty": {},
          "name": "certification.v1|certificate_table",
          "nodeLabel": "",
          "parentId": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1"
        },
        "positionAbsolute": {
          "x": 65.97058239044789,
          "y": 37.333382541895936
        },
        "width": 48,
        "height": 65
      },
      {
        "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1",
        "type": "eventNode",
        "position": {
          "x": 29.215252249235753,
          "y": -50.70710912212144
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "0fa08182e2504bb3bc2dd55d6481eb42",
          "children": [
            "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 29.189495749251783,
          "y": -50.67445386310218
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "0fa08182e2504bb3bc2dd55d6481eb42->0fa08182e2504bb3bc2dd55d6481eb42.1.1",
        "source": "0fa08182e2504bb3bc2dd55d6481eb42",
        "type": "straight",
        "target": "0fa08182e2504bb3bc2dd55d6481eb42.1.1",
        "animated": true
      },
      {
        "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1->2178aeed8e5be8124bb2f196f35aa941.1.1.1.1",
        "source": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1",
        "type": "straight",
        "target": "2178aeed8e5be8124bb2f196f35aa941.1.1.1.1"
      },
      {
        "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1->0fa08182e2504bb3bc2dd55d6481eb42.1.1.1",
        "source": "0fa08182e2504bb3bc2dd55d6481eb42.1.1",
        "type": "straight",
        "target": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "0fa08182e2504bb3bc2dd55d6481eb42",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "0fa08182e2504bb3bc2dd55d6481eb42.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "2178aeed8e5be8124bb2f196f35aa941.1.1.1.1",
                  "type": "screen",
                  "name": "certification.v1|certificate_table",
                  "label": "certification.v1|certificate_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certification:AFVK:v1|certificate_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.ai_asset_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.asset_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.asset_type_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.risk_tier_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.business_unit_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.business_owner_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.cert_expiry_date",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.discovery_source_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1|bfc2446700656ab33c91f768e93ca579|properties.lifecycle_status_code"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateAdvanceSearch:AFVK:v1|1b9546e9b7de4afe8e1d18b854147b71|0fa08182e2504bb3bc2dd55d6481eb42"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AssetList:AFVK:v1:",
  "schemaData": {
    "ai_asset_id": {
      "type": "integer"
    },
    "asset_name": {
      "type": "string"
    },
    "asset_type_code": {
      "type": "string"
    },
    "risk_tier_code": {
      "type": "string"
    },
    "business_unit_name": {
      "type": "string"
    },
    "business_owner_name": {
      "type": "string"
    },
    "cert_expiry_date": {
      "type": "string",
      "format": "date-time"
    },
    "discovery_source_code": {
      "type": "string"
    },
    "lifecycle_status_code": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetlist_v1Props, setdfd_assetlist_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'ai_asset_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group47b71, setgroup47b71}= useContext(TotalContext) as TotalContextProps;
  const {group47b71Props, setgroup47b71Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch1eb42, setadvancesearch1eb42}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941, setcertificate_tableaa941}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941Props, setcertificate_tableaa941Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group47b71,
        codeStates['setgroup'] = setgroup47b71,
        codeStates['group47b71'] = group47b71Props,
        codeStates['setgroup47b71'] = setgroup47b71Props,
        codeStates['advancesearch'] = advancesearch1eb42,
        codeStates['setadvancesearch'] = setadvancesearch1eb42,
        codeStates['certificate_table'] = certificate_tableaa941,
        codeStates['setcertificate_table'] = setcertificate_tableaa941,
        codeStates['certificate_tableaa941'] = certificate_tableaa941Props,
        codeStates['setcertificate_tableaa941'] = setcertificate_tableaa941Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setcertificate_tableaa941Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "1b9546e9b7de4afe8e1d18b854147b71",
        "0fa08182e2504bb3bc2dd55d6481eb42"
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
  if(dfd_assetlist_v1Props?.setSearchFilters && dfd_assetlist_v1Props?.data)
  {
    if(Array.isArray(dfd_assetlist_v1Props.data) && dfd_assetlist_v1Props.data.length > 0){
      setgroup47b71((pre:any)=>({...pre,ai_asset_id:dfd_assetlist_v1Props.data[0]?.ai_asset_id}));
    }
  }
  },[dfd_assetlist_v1Props?.setSearchFilters])
  if (advancesearch1eb42?.isHidden) {
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
         disabled= {advancesearch1eb42?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
