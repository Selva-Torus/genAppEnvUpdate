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
        "id": "059c885daa611a689dd5a84d407fc4a9",
        "type": "controlNode",
        "position": {
          "x": -44.112918655370585,
          "y": -68.94214516162194
        },
        "data": {
          "nodeId": "059c885daa611a689dd5a84d407fc4a9",
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
            "059c885daa611a689dd5a84d407fc4a9.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -44.22981592492589,
          "y": -69.01225055185692
        }
      },
      {
        "id": "059c885daa611a689dd5a84d407fc4a9.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 42.624998282575405,
          "y": -22.572039758797366
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "059c885daa611a689dd5a84d407fc4a9.1.1",
          "children": [
            "9f2748f034c4094d3e1dce2fe6f4bc40.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 42.54988466017203,
          "y": -22.40001698755893
        }
      },
      {
        "id": "9f2748f034c4094d3e1dce2fe6f4bc40.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersion:AFVK:v1|ai_asset_version_table",
        "position": {
          "x": 52.97053349342771,
          "y": 66.54165612992664
        },
        "data": {
          "label": "AiAssetVersion.v1|ai_asset_version_table",
          "sequence": "1.1.1.1",
          "parent": "059c885daa611a689dd5a84d407fc4a9",
          "children": [],
          "nodeProperty": {},
          "name": "AiAssetVersion.v1|ai_asset_version_table",
          "nodeLabel": "",
          "parentId": "059c885daa611a689dd5a84d407fc4a9.1.1.1"
        },
        "width": 60,
        "height": 59,
        "positionAbsolute": {
          "x": 53.13889508898504,
          "y": 66.58231826502582
        }
      },
      {
        "id": "059c885daa611a689dd5a84d407fc4a9.1.1",
        "type": "eventNode",
        "position": {
          "x": -51.4552386061674,
          "y": 26.57750920988887
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "059c885daa611a689dd5a84d407fc4a9",
          "children": [
            "059c885daa611a689dd5a84d407fc4a9.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -51.43548365088731,
          "y": 26.4397292589537
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "059c885daa611a689dd5a84d407fc4a9->059c885daa611a689dd5a84d407fc4a9.1.1",
        "source": "059c885daa611a689dd5a84d407fc4a9",
        "type": "straight",
        "target": "059c885daa611a689dd5a84d407fc4a9.1.1",
        "animated": true
      },
      {
        "id": "059c885daa611a689dd5a84d407fc4a9.1.1.1->9f2748f034c4094d3e1dce2fe6f4bc40.1.1.1.1",
        "source": "059c885daa611a689dd5a84d407fc4a9.1.1.1",
        "type": "straight",
        "target": "9f2748f034c4094d3e1dce2fe6f4bc40.1.1.1.1"
      },
      {
        "id": "059c885daa611a689dd5a84d407fc4a9.1.1->059c885daa611a689dd5a84d407fc4a9.1.1.1",
        "source": "059c885daa611a689dd5a84d407fc4a9.1.1",
        "type": "straight",
        "target": "059c885daa611a689dd5a84d407fc4a9.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "059c885daa611a689dd5a84d407fc4a9",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "059c885daa611a689dd5a84d407fc4a9.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "059c885daa611a689dd5a84d407fc4a9.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "9f2748f034c4094d3e1dce2fe6f4bc40.1.1.1.1",
                  "type": "screen",
                  "name": "AiAssetVersion.v1|ai_asset_version_table",
                  "label": "AiAssetVersion.v1|ai_asset_version_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersion:AFVK:v1|ai_asset_version_table",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1|4bf21c7702b73364ead291aa51fa77fc|properties.asset_version_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1|4bf21c7702b73364ead291aa51fa77fc|properties.change_type_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1|4bf21c7702b73364ead291aa51fa77fc|properties.version_no"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersionSearch:AFVK:v1|396bfbe56d9a5987fc4ea4e57d97a00f|059c885daa611a689dd5a84d407fc4a9"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAssetVersion:AFVK:v1:",
  "schemaData": {
    "asset_version_id": {
      "type": "integer"
    },
    "change_type_code": {
      "type": "string"
    },
    "version_no": {
      "type": "integer"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_aiassetversion_v1Props, setdfd_aiassetversion_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'asset_version_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {advance_search_grp7a00f, setadvance_search_grp7a00f}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grp7a00fProps, setadvance_search_grp7a00fProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchfc4a9, setadvancesearchfc4a9}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40, setai_asset_version_table4bc40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40Props, setai_asset_version_table4bc40Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grp7a00f,
        codeStates['setadvance_search_grp'] = setadvance_search_grp7a00f,
        codeStates['advance_search_grp7a00f'] = advance_search_grp7a00fProps,
        codeStates['setadvance_search_grp7a00f'] = setadvance_search_grp7a00fProps,
        codeStates['advancesearch'] = advancesearchfc4a9,
        codeStates['setadvancesearch'] = setadvancesearchfc4a9,
        codeStates['ai_asset_version_table'] = ai_asset_version_table4bc40,
        codeStates['setai_asset_version_table'] = setai_asset_version_table4bc40,
        codeStates['ai_asset_version_table4bc40'] = ai_asset_version_table4bc40Props,
        codeStates['setai_asset_version_table4bc40'] = setai_asset_version_table4bc40Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setai_asset_version_table4bc40Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "396bfbe56d9a5987fc4ea4e57d97a00f",
        "059c885daa611a689dd5a84d407fc4a9"
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
  if(dfd_aiassetversion_v1Props?.setSearchFilters && dfd_aiassetversion_v1Props?.data)
  {
    if(Array.isArray(dfd_aiassetversion_v1Props.data) && dfd_aiassetversion_v1Props.data.length > 0){
      setadvance_search_grp7a00f((pre:any)=>({...pre,asset_version_id:dfd_aiassetversion_v1Props.data[0]?.asset_version_id}));
    }
  }
  },[dfd_aiassetversion_v1Props?.setSearchFilters])
  if (advancesearchfc4a9?.isHidden) {
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
         disabled= {advancesearchfc4a9?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
