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
        "id": "06fa594fa868e6320eae04be0fa6059f",
        "type": "controlNode",
        "position": {
          "x": 11.2500231706772,
          "y": -65.18715552806991
        },
        "data": {
          "nodeId": "06fa594fa868e6320eae04be0fa6059f",
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
            "06fa594fa868e6320eae04be0fa6059f.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": 11.236242605375113,
          "y": -65.19000805870192
        }
      },
      {
        "id": "06fa594fa868e6320eae04be0fa6059f.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -10.10830191725742,
          "y": 56.26213234347927
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "06fa594fa868e6320eae04be0fa6059f.1.1",
          "children": [
            "6638e195416b4642bda98e40af0852e3.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": -10.08726959942735,
          "y": 56.19021576366181
        }
      },
      {
        "id": "6638e195416b4642bda98e40af0852e3.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1|table",
        "position": {
          "x": 74.87307987276523,
          "y": 21.20989422321881
        },
        "data": {
          "label": "dashboard.v1|table",
          "sequence": "1.1.1.1",
          "parent": "06fa594fa868e6320eae04be0fa6059f",
          "children": [],
          "nodeProperty": {},
          "name": "dashboard.v1|table",
          "nodeLabel": "",
          "parentId": "06fa594fa868e6320eae04be0fa6059f.1.1.1"
        },
        "width": 60,
        "height": 50,
        "positionAbsolute": {
          "x": 74.89973154754263,
          "y": 21.27443396621764
        }
      },
      {
        "id": "06fa594fa868e6320eae04be0fa6059f.1.1",
        "type": "eventNode",
        "position": {
          "x": -73.55813544858049,
          "y": -10.98094734423941
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "06fa594fa868e6320eae04be0fa6059f",
          "children": [
            "06fa594fa868e6320eae04be0fa6059f.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -73.58166966263245,
          "y": -10.955506495995818
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
        "id": "06fa594fa868e6320eae04be0fa6059f->06fa594fa868e6320eae04be0fa6059f.1.1",
        "source": "06fa594fa868e6320eae04be0fa6059f",
        "type": "straight",
        "target": "06fa594fa868e6320eae04be0fa6059f.1.1",
        "animated": true
      },
      {
        "id": "06fa594fa868e6320eae04be0fa6059f.1.1.1->6638e195416b4642bda98e40af0852e3.1.1.1.1",
        "source": "06fa594fa868e6320eae04be0fa6059f.1.1.1",
        "type": "straight",
        "target": "6638e195416b4642bda98e40af0852e3.1.1.1.1"
      },
      {
        "id": "06fa594fa868e6320eae04be0fa6059f.1.1->06fa594fa868e6320eae04be0fa6059f.1.1.1",
        "source": "06fa594fa868e6320eae04be0fa6059f.1.1",
        "type": "straight",
        "target": "06fa594fa868e6320eae04be0fa6059f.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "06fa594fa868e6320eae04be0fa6059f",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "06fa594fa868e6320eae04be0fa6059f.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "06fa594fa868e6320eae04be0fa6059f.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "6638e195416b4642bda98e40af0852e3.1.1.1.1",
                  "type": "screen",
                  "name": "dashboard.v1|table",
                  "label": "dashboard.v1|table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1|table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.case_display_id",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.debtor_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.creditor_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.total_balance",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.court_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.status_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.priority_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.attorney_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1|1639d2c2900c41c7a9c9c3a882cf0bac|properties.trs_created_date"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:amrQueueSearch:AFVK:v1|48494de4ad3c18b8fe7daca69e7defa1|06fa594fa868e6320eae04be0fa6059f"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:amrQueueDashboard:AFVK:v1:",
  "schemaData": {
    "case_display_id": {
      "type": "string"
    },
    "debtor_name": {
      "type": "string"
    },
    "creditor_name": {
      "type": "string"
    },
    "total_balance": {
      "type": "integer"
    },
    "court_name": {
      "type": "string"
    },
    "status_name": {
      "type": "string"
    },
    "priority_name": {
      "type": "string"
    },
    "attorney_name": {
      "type": "string"
    },
    "trs_created_date": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_amrqueuedashboard_v1Props, setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'case_display_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_groupdefa1, setsearch_groupdefa1}= useContext(TotalContext) as TotalContextProps;
  const {search_groupdefa1Props, setsearch_groupdefa1Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch6059f, setadvancesearch6059f}= useContext(TotalContext) as TotalContextProps;
  const {table852e3, settable852e3}= useContext(TotalContext) as TotalContextProps;
  const {table852e3Props, settable852e3Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_groupdefa1,
        codeStates['setsearch_group'] = setsearch_groupdefa1,
        codeStates['search_groupdefa1'] = search_groupdefa1Props,
        codeStates['setsearch_groupdefa1'] = setsearch_groupdefa1Props,
        codeStates['advancesearch'] = advancesearch6059f,
        codeStates['setadvancesearch'] = setadvancesearch6059f,
        codeStates['table'] = table852e3,
        codeStates['settable'] = settable852e3,
        codeStates['table852e3'] = table852e3Props,
        codeStates['settable852e3'] = settable852e3Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settable852e3Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "48494de4ad3c18b8fe7daca69e7defa1",
        "06fa594fa868e6320eae04be0fa6059f"
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
  if(dfd_amrqueuedashboard_v1Props?.setSearchFilters && dfd_amrqueuedashboard_v1Props?.data)
  {
    if(Array.isArray(dfd_amrqueuedashboard_v1Props.data) && dfd_amrqueuedashboard_v1Props.data.length > 0){
      setsearch_groupdefa1((pre:any)=>({...pre,case_display_id:dfd_amrqueuedashboard_v1Props.data[0]?.case_display_id}));
    }
  }
  },[dfd_amrqueuedashboard_v1Props?.setSearchFilters])
  if (advancesearch6059f?.isHidden) {
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
         disabled= {advancesearch6059f?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
