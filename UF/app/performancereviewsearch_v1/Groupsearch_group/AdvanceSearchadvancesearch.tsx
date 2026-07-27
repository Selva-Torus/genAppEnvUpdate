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
        "id": "76b3f78fc86de621bcca71d12d20d4ee",
        "type": "controlNode",
        "position": {
          "x": 4.548836688594319,
          "y": -74.87479175458063
        },
        "data": {
          "nodeId": "76b3f78fc86de621bcca71d12d20d4ee",
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
            "76b3f78fc86de621bcca71d12d20d4ee.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 27,
        "positionAbsolute": {
          "x": 4.594114614637993,
          "y": -74.87142373931944
        }
      },
      {
        "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 32.34723860118273,
          "y": -2.583006055372571
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "76b3f78fc86de621bcca71d12d20d4ee.1.1",
          "children": [
            "267e1421a9f4452a8ebcf3c4183e694e.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 32.25477409636533,
          "y": -2.553255254574135
        }
      },
      {
        "id": "267e1421a9f4452a8ebcf3c4183e694e.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1|total_employees_table",
        "position": {
          "x": 32.30028337807232,
          "y": 79.1414263733174
        },
        "data": {
          "label": "employees.v1|total_employees_table",
          "sequence": "1.1.1.1",
          "parent": "76b3f78fc86de621bcca71d12d20d4ee",
          "children": [],
          "nodeProperty": {},
          "name": "employees.v1|total_employees_table",
          "nodeLabel": "",
          "parentId": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1"
        },
        "width": 74,
        "height": 52,
        "positionAbsolute": {
          "x": 32.373684414346755,
          "y": 79.13554486367661
        }
      },
      {
        "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1",
        "type": "eventNode",
        "position": {
          "x": -70.44410261716055,
          "y": 4.117547401464825
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "76b3f78fc86de621bcca71d12d20d4ee",
          "children": [
            "76b3f78fc86de621bcca71d12d20d4ee.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -70.46928249817611,
          "y": 4.09551770136823
        },
        "selected": false,
        "dragging": false
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "76b3f78fc86de621bcca71d12d20d4ee->76b3f78fc86de621bcca71d12d20d4ee.1.1",
        "source": "76b3f78fc86de621bcca71d12d20d4ee",
        "type": "straight",
        "target": "76b3f78fc86de621bcca71d12d20d4ee.1.1",
        "animated": true
      },
      {
        "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1->267e1421a9f4452a8ebcf3c4183e694e.1.1.1.1",
        "source": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1",
        "type": "straight",
        "target": "267e1421a9f4452a8ebcf3c4183e694e.1.1.1.1"
      },
      {
        "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1->76b3f78fc86de621bcca71d12d20d4ee.1.1.1",
        "source": "76b3f78fc86de621bcca71d12d20d4ee.1.1",
        "type": "straight",
        "target": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "76b3f78fc86de621bcca71d12d20d4ee",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "76b3f78fc86de621bcca71d12d20d4ee.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "267e1421a9f4452a8ebcf3c4183e694e.1.1.1.1",
                  "type": "screen",
                  "name": "employees.v1|total_employees_table",
                  "label": "employees.v1|total_employees_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1|total_employees_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.review_id",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.review_number",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.full_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.cycle_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.review_type",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.review_status",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1|c36a10740c3daa09b9145172fb2c417d|properties.final_rating"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReviewSearch:AFVK:v1|6d640d1caa1d7cf8dc1e7ba02e63b8d3|76b3f78fc86de621bcca71d12d20d4ee"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:performanceReviews:AFVK:v1:",
  "schemaData": {
    "review_id": {
      "type": "integer"
    },
    "review_number": {
      "type": "string"
    },
    "full_name": {
      "type": "string"
    },
    "cycle_name": {
      "type": "string"
    },
    "review_type": {
      "type": "string"
    },
    "review_status": {
      "type": "string"
    },
    "final_rating": {
      "type": "number"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_performancereviews_v1Props, setdfd_performancereviews_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'review_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group3b8d3, setsearch_group3b8d3}= useContext(TotalContext) as TotalContextProps;
  const {search_group3b8d3Props, setsearch_group3b8d3Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch0d4ee, setadvancesearch0d4ee}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group3b8d3,
        codeStates['setsearch_group'] = setsearch_group3b8d3,
        codeStates['search_group3b8d3'] = search_group3b8d3Props,
        codeStates['setsearch_group3b8d3'] = setsearch_group3b8d3Props,
        codeStates['advancesearch'] = advancesearch0d4ee,
        codeStates['setadvancesearch'] = setadvancesearch0d4ee,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settotal_employees_tablee694eProps((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "6d640d1caa1d7cf8dc1e7ba02e63b8d3",
        "76b3f78fc86de621bcca71d12d20d4ee"
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
  if(dfd_performancereviews_v1Props?.setSearchFilters && dfd_performancereviews_v1Props?.data)
  {
    if(Array.isArray(dfd_performancereviews_v1Props.data) && dfd_performancereviews_v1Props.data.length > 0){
      setsearch_group3b8d3((pre:any)=>({...pre,review_id:dfd_performancereviews_v1Props.data[0]?.review_id}));
    }
  }
  },[dfd_performancereviews_v1Props?.setSearchFilters])
  if (advancesearch0d4ee?.isHidden) {
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
         disabled= {advancesearch0d4ee?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
