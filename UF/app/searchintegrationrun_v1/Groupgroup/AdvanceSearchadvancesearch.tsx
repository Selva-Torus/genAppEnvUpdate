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
        "id": "491d6b5ceaa044c993f86dabac1cd841",
        "type": "controlNode",
        "position": {
          "x": -30.18497576942515,
          "y": -68.60109342343029
        },
        "data": {
          "nodeId": "491d6b5ceaa044c993f86dabac1cd841",
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
            "491d6b5ceaa044c993f86dabac1cd841.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -30.20092938872517,
          "y": -68.63372793433818
        }
      },
      {
        "id": "491d6b5ceaa044c993f86dabac1cd841.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 52.22193833019401,
          "y": -23.322184370043676
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "491d6b5ceaa044c993f86dabac1cd841.1.1",
          "children": [
            "f7b773f04e894eb1a40dba46ed5089a5.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": 52.17552562543707,
          "y": -23.273489572782303
        },
        "width": 51,
        "height": 45
      },
      {
        "id": "f7b773f04e894eb1a40dba46ed5089a5.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "group",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|group",
        "position": {
          "x": 33.755392355136124,
          "y": 69.31665759888982
        },
        "data": {
          "label": "integrationRun.v1|group",
          "sequence": "1.1.1.1",
          "parent": "491d6b5ceaa044c993f86dabac1cd841",
          "children": [],
          "nodeProperty": {},
          "name": "integrationRun.v1|group",
          "nodeLabel": "",
          "parentId": "491d6b5ceaa044c993f86dabac1cd841.1.1.1"
        },
        "positionAbsolute": {
          "x": 33.82510752006583,
          "y": 69.35848768755417
        },
        "width": 60,
        "height": 50
      },
      {
        "id": "491d6b5ceaa044c993f86dabac1cd841.1.1",
        "type": "eventNode",
        "position": {
          "x": -54.60099583111593,
          "y": 24.865456596972045
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "491d6b5ceaa044c993f86dabac1cd841",
          "children": [
            "491d6b5ceaa044c993f86dabac1cd841.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -54.58460288254944,
          "y": 24.84160727563722
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "491d6b5ceaa044c993f86dabac1cd841->491d6b5ceaa044c993f86dabac1cd841.1.1",
        "source": "491d6b5ceaa044c993f86dabac1cd841",
        "type": "straight",
        "target": "491d6b5ceaa044c993f86dabac1cd841.1.1",
        "animated": true
      },
      {
        "id": "491d6b5ceaa044c993f86dabac1cd841.1.1.1->f7b773f04e894eb1a40dba46ed5089a5.1.1.1.1",
        "source": "491d6b5ceaa044c993f86dabac1cd841.1.1.1",
        "type": "straight",
        "target": "f7b773f04e894eb1a40dba46ed5089a5.1.1.1.1"
      },
      {
        "id": "491d6b5ceaa044c993f86dabac1cd841.1.1->491d6b5ceaa044c993f86dabac1cd841.1.1.1",
        "source": "491d6b5ceaa044c993f86dabac1cd841.1.1",
        "type": "straight",
        "target": "491d6b5ceaa044c993f86dabac1cd841.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "491d6b5ceaa044c993f86dabac1cd841",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "491d6b5ceaa044c993f86dabac1cd841.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "491d6b5ceaa044c993f86dabac1cd841.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "f7b773f04e894eb1a40dba46ed5089a5.1.1.1.1",
                  "type": "screen",
                  "name": "integrationRun.v1|group",
                  "label": "integrationRun.v1|group",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|group",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.integration_run_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.run_trigger_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.run_status_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.started_on",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.ended_on",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.records_read",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1|613ac786742f4fa5bd591e9424ba88f9|properties.records_rejected"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchIntegrationRun:AFVK:v1|adee1349ff8b43e4b746c01caf7dda8a|491d6b5ceaa044c993f86dabac1cd841"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1:",
  "schemaData": {
    "integration_run_id": {
      "type": "integer"
    },
    "run_trigger_code": {
      "type": "string"
    },
    "run_status_code": {
      "type": "string"
    },
    "started_on": {
      "type": "string"
    },
    "ended_on": {
      "type": "string"
    },
    "records_read": {
      "type": "integer"
    },
    "records_rejected": {
      "type": "integer"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'integration_run_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupdda8a, setgroupdda8a}= useContext(TotalContext) as TotalContextProps;
  const {groupdda8aProps, setgroupdda8aProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchcd841, setadvancesearchcd841}= useContext(TotalContext) as TotalContextProps;
  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupdda8a,
        codeStates['setgroup'] = setgroupdda8a,
        codeStates['groupdda8a'] = groupdda8aProps,
        codeStates['setgroupdda8a'] = setgroupdda8aProps,
        codeStates['advancesearch'] = advancesearchcd841,
        codeStates['setadvancesearch'] = setadvancesearchcd841,
        codeStates['group'] = group089a5,
        codeStates['setgroup'] = setgroup089a5,
        codeStates['group089a5'] = group089a5Props,
        codeStates['setgroup089a5'] = setgroup089a5Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setgroup089a5Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "adee1349ff8b43e4b746c01caf7dda8a",
        "491d6b5ceaa044c993f86dabac1cd841"
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
  if(dfd_integrationrun_v1Props?.setSearchFilters && dfd_integrationrun_v1Props?.data)
  {
    if(Array.isArray(dfd_integrationrun_v1Props.data) && dfd_integrationrun_v1Props.data.length > 0){
      setgroupdda8a((pre:any)=>({...pre,integration_run_id:dfd_integrationrun_v1Props.data[0]?.integration_run_id}));
    }
  }
  },[dfd_integrationrun_v1Props?.setSearchFilters])
  if (advancesearchcd841?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `2 / 148`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearchcd841?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
