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
        "id": "85436b9ff9b64887a56c1ece4cf3371e",
        "type": "controlNode",
        "position": {
          "x": -14.384793130748484,
          "y": -71.78834487695491
        },
        "data": {
          "nodeId": "85436b9ff9b64887a56c1ece4cf3371e",
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
            "85436b9ff9b64887a56c1ece4cf3371e.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -14.374018176080538,
          "y": -71.79187372143754
        }
      },
      {
        "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 53.093123440253834,
          "y": -13.701204531793596
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "85436b9ff9b64887a56c1ece4cf3371e.1.1",
          "children": [
            "d0969b76e95949ed8ee1e6d4a68e769a.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 53.06848343266895,
          "y": -13.692495999512705
        }
      },
      {
        "id": "d0969b76e95949ed8ee1e6d4a68e769a.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "group",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1|code_group",
        "position": {
          "x": 22.98169336071835,
          "y": 73.85542119096797
        },
        "data": {
          "label": "codeTypes.v1|code_group",
          "sequence": "1.1.1.1",
          "parent": "85436b9ff9b64887a56c1ece4cf3371e",
          "children": [],
          "nodeProperty": {},
          "name": "codeTypes.v1|code_group",
          "nodeLabel": "",
          "parentId": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1"
        },
        "width": 60,
        "height": 50,
        "positionAbsolute": {
          "x": 23.00577373102025,
          "y": 73.86386847220626
        }
      },
      {
        "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1",
        "type": "eventNode",
        "position": {
          "x": -61.57511345995323,
          "y": 15.142125465878475
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "85436b9ff9b64887a56c1ece4cf3371e",
          "children": [
            "85436b9ff9b64887a56c1ece4cf3371e.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -61.58270083964147,
          "y": 15.139735399730911
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "85436b9ff9b64887a56c1ece4cf3371e->85436b9ff9b64887a56c1ece4cf3371e.1.1",
        "source": "85436b9ff9b64887a56c1ece4cf3371e",
        "type": "straight",
        "target": "85436b9ff9b64887a56c1ece4cf3371e.1.1",
        "animated": true
      },
      {
        "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1->d0969b76e95949ed8ee1e6d4a68e769a.1.1.1.1",
        "source": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1",
        "type": "straight",
        "target": "d0969b76e95949ed8ee1e6d4a68e769a.1.1.1.1"
      },
      {
        "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1->85436b9ff9b64887a56c1ece4cf3371e.1.1.1",
        "source": "85436b9ff9b64887a56c1ece4cf3371e.1.1",
        "type": "straight",
        "target": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "85436b9ff9b64887a56c1ece4cf3371e",
      "type": "advancesearch",
      "name": "advance_search",
      "label": "advance_search",
      "sequence": 1,
      "children": [
        {
          "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "85436b9ff9b64887a56c1ece4cf3371e.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "d0969b76e95949ed8ee1e6d4a68e769a.1.1.1.1",
                  "type": "screen",
                  "name": "codeTypes.v1|code_group",
                  "label": "codeTypes.v1|code_group",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1|code_group",
                  "elementType": "group",
                  "groupType": "group",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.code_type_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.code_type",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.description",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.is_system",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1|987516858afb4e3eb3808a589b7dc335|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchCodetypes:AFVK:v1|972d6b1260a84cbcaf41760eeee2c803|85436b9ff9b64887a56c1ece4cf3371e"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeType:AFVK:v1:",
  "schemaData": {
    "code_type_id": {
      "type": "integer"
    },
    "code_type": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "is_system": {
      "type": "string"
    },
    "is_active": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'code_type_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group2c803, setsearch_group2c803}= useContext(TotalContext) as TotalContextProps;
  const {search_group2c803Props, setsearch_group2c803Props}= useContext(TotalContext) as TotalContextProps;
  const {advance_search3371e, setadvance_search3371e}= useContext(TotalContext) as TotalContextProps;
  const {code_groupe769a, setcode_groupe769a}= useContext(TotalContext) as TotalContextProps;
  const {code_groupe769aProps, setcode_groupe769aProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group2c803,
        codeStates['setsearch_group'] = setsearch_group2c803,
        codeStates['search_group2c803'] = search_group2c803Props,
        codeStates['setsearch_group2c803'] = setsearch_group2c803Props,
        codeStates['advance_search'] = advance_search3371e,
        codeStates['setadvance_search'] = setadvance_search3371e,
        codeStates['code_group'] = code_groupe769a,
        codeStates['setcode_group'] = setcode_groupe769a,
        codeStates['code_groupe769a'] = code_groupe769aProps,
        codeStates['setcode_groupe769a'] = setcode_groupe769aProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setcode_groupe769aProps((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "972d6b1260a84cbcaf41760eeee2c803",
        "85436b9ff9b64887a56c1ece4cf3371e"
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
  if(dfd_codetype_v1Props?.setSearchFilters && dfd_codetype_v1Props?.data)
  {
    if(Array.isArray(dfd_codetype_v1Props.data) && dfd_codetype_v1Props.data.length > 0){
      setsearch_group2c803((pre:any)=>({...pre,code_type_id:dfd_codetype_v1Props.data[0]?.code_type_id}));
    }
  }
  },[dfd_codetype_v1Props?.setSearchFilters])
  if (advance_search3371e?.isHidden) {
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
         disabled= {advance_search3371e?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvance_search
