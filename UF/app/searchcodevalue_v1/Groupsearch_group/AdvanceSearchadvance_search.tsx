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
        "id": "29d6c169675c422b9a456262e66c0f0a",
        "type": "controlNode",
        "position": {
          "x": -39.918955712372245,
          "y": -78.0265155576119
        },
        "data": {
          "nodeId": "29d6c169675c422b9a456262e66c0f0a",
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
            "29d6c169675c422b9a456262e66c0f0a.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -39.950421539462866,
          "y": -78.00151168968246
        }
      },
      {
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 45.67024022357287,
          "y": -45.63436087899069
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "29d6c169675c422b9a456262e66c0f0a.1.1",
          "children": [
            "c1f53e1b22158e787919d4f1987c9811.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": 45.67066436888484,
          "y": -45.64637902072534
        },
        "width": 48,
        "height": 48
      },
      {
        "id": "c1f53e1b22158e787919d4f1987c9811.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|code_sets_table",
        "position": {
          "x": -10.775750516743775,
          "y": 61.30698482512656
        },
        "data": {
          "label": "codeValue.v1|code_sets_table",
          "sequence": "1.1.1.1",
          "parent": "29d6c169675c422b9a456262e66c0f0a",
          "children": [],
          "nodeProperty": {},
          "name": "codeValue.v1|code_sets_table",
          "nodeLabel": "",
          "parentId": "29d6c169675c422b9a456262e66c0f0a.1.1.1"
        },
        "positionAbsolute": {
          "x": -10.751349424578446,
          "y": 61.20750672365275
        },
        "width": 48,
        "height": 57
      },
      {
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1",
        "type": "eventNode",
        "position": {
          "x": -72.93648220064705,
          "y": 12.861457287404203
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "29d6c169675c422b9a456262e66c0f0a",
          "children": [
            "29d6c169675c422b9a456262e66c0f0a.1.1.1",
            "29d6c169675c422b9a456262e66c0f0a.1.1.2"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -72.95125339688701,
          "y": 12.90562248059098
        }
      },
      {
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 62.62815518320818,
          "y": 45.65925475281542
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.2",
          "parentId": "29d6c169675c422b9a456262e66c0f0a.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 62.629497044187374,
          "y": 45.72847443294468
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
        "id": "29d6c169675c422b9a456262e66c0f0a->29d6c169675c422b9a456262e66c0f0a.1.1",
        "source": "29d6c169675c422b9a456262e66c0f0a",
        "type": "straight",
        "target": "29d6c169675c422b9a456262e66c0f0a.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1.1->c1f53e1b22158e787919d4f1987c9811.1.1.1.1",
        "source": "29d6c169675c422b9a456262e66c0f0a.1.1.1",
        "type": "straight",
        "target": "c1f53e1b22158e787919d4f1987c9811.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1->29d6c169675c422b9a456262e66c0f0a.1.1.1",
        "source": "29d6c169675c422b9a456262e66c0f0a.1.1",
        "type": "straight",
        "target": "29d6c169675c422b9a456262e66c0f0a.1.1.1",
        "animated": true
      },
      {
        "id": "29d6c169675c422b9a456262e66c0f0a.1.1->29d6c169675c422b9a456262e66c0f0a.1.1.2",
        "source": "29d6c169675c422b9a456262e66c0f0a.1.1",
        "type": "straight",
        "target": "29d6c169675c422b9a456262e66c0f0a.1.1.2"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "29d6c169675c422b9a456262e66c0f0a",
      "type": "advancesearch",
      "name": "advance_search",
      "label": "advance_search",
      "sequence": 1,
      "children": [
        {
          "id": "29d6c169675c422b9a456262e66c0f0a.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "29d6c169675c422b9a456262e66c0f0a.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "c1f53e1b22158e787919d4f1987c9811.1.1.1.1",
                  "type": "screen",
                  "name": "codeValue.v1|code_sets_table",
                  "label": "codeValue.v1|code_sets_table",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|code_sets_table",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                }
              ]
            },
            {
              "id": "29d6c169675c422b9a456262e66c0f0a.1.1.2",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "closeHandler",
              "label": "closeHandler",
              "sequence": "1.1.2",
              "children": []
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|f6810d28d52e404eb9c592e80282d635|properties.code_value_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|f6810d28d52e404eb9c592e80282d635|properties.code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|f6810d28d52e404eb9c592e80282d635|properties.display_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|f6810d28d52e404eb9c592e80282d635|properties.is_active",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1|f6810d28d52e404eb9c592e80282d635|properties.description"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchCodeValue:AFVK:v1|0cf06db7e05c488d89414e80dbb59abf|29d6c169675c422b9a456262e66c0f0a"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1:"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'code_value_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group59abf, setsearch_group59abf}= useContext(TotalContext) as TotalContextProps;
  const {search_group59abfProps, setsearch_group59abfProps}= useContext(TotalContext) as TotalContextProps;
  const {advance_searchc0f0a, setadvance_searchc0f0a}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811, setcode_sets_tablec9811}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811Props, setcode_sets_tablec9811Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group59abf,
        codeStates['setsearch_group'] = setsearch_group59abf,
        codeStates['search_group59abf'] = search_group59abfProps,
        codeStates['setsearch_group59abf'] = setsearch_group59abfProps,
        codeStates['advance_search'] = advance_searchc0f0a,
        codeStates['setadvance_search'] = setadvance_searchc0f0a,
        codeStates['code_sets_table'] = code_sets_tablec9811,
        codeStates['setcode_sets_table'] = setcode_sets_tablec9811,
        codeStates['code_sets_tablec9811'] = code_sets_tablec9811Props,
        codeStates['setcode_sets_tablec9811'] = setcode_sets_tablec9811Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setcode_sets_tablec9811Props((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'searchcodevalue');

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
        "0cf06db7e05c488d89414e80dbb59abf",
        "29d6c169675c422b9a456262e66c0f0a"
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
  if(dfd_codevalue_v1Props?.setSearchFilters && dfd_codevalue_v1Props?.data)
  {
    if(Array.isArray(dfd_codevalue_v1Props.data) && dfd_codevalue_v1Props.data.length > 0){
      setsearch_group59abf((pre:any)=>({...pre,code_value_id:dfd_codevalue_v1Props.data[0]?.code_value_id}));
    }
  }
  },[dfd_codevalue_v1Props?.setSearchFilters])
  if (advance_searchc0f0a?.isHidden) {
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
         disabled= {advance_searchc0f0a?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvance_search
