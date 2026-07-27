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
        "id": "f0ba17df1aca609f5ca0ff1c153d7877",
        "type": "controlNode",
        "position": {
          "x": 41.64864244175891,
          "y": -52.10707032970799
        },
        "data": {
          "nodeId": "f0ba17df1aca609f5ca0ff1c153d7877",
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
            "f0ba17df1aca609f5ca0ff1c153d7877.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": 41.63355822089437,
          "y": -52.09777249933584
        }
      },
      {
        "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -40.52836229017249,
          "y": 51.64146323314856
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "f0ba17df1aca609f5ca0ff1c153d7877.1.1",
          "children": [
            "be36788337963d8ca3d8befe9e222a59.1.1.1.1"
          ]
        },
        "width": 52,
        "height": 45,
        "positionAbsolute": {
          "x": -40.498657850022845,
          "y": 51.61276065410797
        }
      },
      {
        "id": "be36788337963d8ca3d8befe9e222a59.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1|total_positions_table",
        "position": {
          "x": 55.7401247045014,
          "y": 45.59900999434434
        },
        "data": {
          "label": "employeeJobPositions.v1|total_positions_table",
          "sequence": "1.1.1.1",
          "parent": "f0ba17df1aca609f5ca0ff1c153d7877",
          "children": [],
          "nodeProperty": {},
          "name": "employeeJobPositions.v1|total_positions_table",
          "nodeLabel": "",
          "parentId": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1"
        },
        "width": 66,
        "height": 59,
        "positionAbsolute": {
          "x": 55.75207480247003,
          "y": 45.64349569945248
        }
      },
      {
        "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1",
        "type": "eventNode",
        "position": {
          "x": -55.64475648922753,
          "y": -43.5827139035768
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "f0ba17df1aca609f5ca0ff1c153d7877",
          "children": [
            "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -55.66432399710623,
          "y": -43.58085467087816
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
        "id": "f0ba17df1aca609f5ca0ff1c153d7877->f0ba17df1aca609f5ca0ff1c153d7877.1.1",
        "source": "f0ba17df1aca609f5ca0ff1c153d7877",
        "type": "straight",
        "target": "f0ba17df1aca609f5ca0ff1c153d7877.1.1",
        "animated": true
      },
      {
        "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1->be36788337963d8ca3d8befe9e222a59.1.1.1.1",
        "source": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1",
        "type": "straight",
        "target": "be36788337963d8ca3d8befe9e222a59.1.1.1.1"
      },
      {
        "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1->f0ba17df1aca609f5ca0ff1c153d7877.1.1.1",
        "source": "f0ba17df1aca609f5ca0ff1c153d7877.1.1",
        "type": "straight",
        "target": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "f0ba17df1aca609f5ca0ff1c153d7877",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "f0ba17df1aca609f5ca0ff1c153d7877.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "be36788337963d8ca3d8befe9e222a59.1.1.1.1",
                  "type": "screen",
                  "name": "employeeJobPositions.v1|total_positions_table",
                  "label": "employeeJobPositions.v1|total_positions_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1|total_positions_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.position_code",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.position_title",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.grade_code_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.employment_type",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.experience_required",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1|ffc1d63fd7a3455d8438315430a6dcce|properties.job_level"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositionsSearch:AFVK:v1|ea09514501015a44d0dcf2aee85d4ba8|f0ba17df1aca609f5ca0ff1c153d7877"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1:",
  "schemaData": {
    "position_code": {
      "type": "string"
    },
    "position_title": {
      "type": "string"
    },
    "grade_code_name": {
      "type": "string"
    },
    "employment_type": {
      "type": "string"
    },
    "experience_required": {
      "type": "integer"
    },
    "job_level": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'position_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_groupd4ba8, setsearch_groupd4ba8}= useContext(TotalContext) as TotalContextProps;
  const {search_groupd4ba8Props, setsearch_groupd4ba8Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchd7877, setadvancesearchd7877}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59, settotal_positions_table22a59}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59Props, settotal_positions_table22a59Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_groupd4ba8,
        codeStates['setsearch_group'] = setsearch_groupd4ba8,
        codeStates['search_groupd4ba8'] = search_groupd4ba8Props,
        codeStates['setsearch_groupd4ba8'] = setsearch_groupd4ba8Props,
        codeStates['advancesearch'] = advancesearchd7877,
        codeStates['setadvancesearch'] = setadvancesearchd7877,
        codeStates['total_positions_table'] = total_positions_table22a59,
        codeStates['settotal_positions_table'] = settotal_positions_table22a59,
        codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
        codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settotal_positions_table22a59Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "ea09514501015a44d0dcf2aee85d4ba8",
        "f0ba17df1aca609f5ca0ff1c153d7877"
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
  if(dfd_jobpositions_v1Props?.setSearchFilters && dfd_jobpositions_v1Props?.data)
  {
    if(Array.isArray(dfd_jobpositions_v1Props.data) && dfd_jobpositions_v1Props.data.length > 0){
      setsearch_groupd4ba8((pre:any)=>({...pre,position_code:dfd_jobpositions_v1Props.data[0]?.position_code}));
    }
  }
  },[dfd_jobpositions_v1Props?.setSearchFilters])
  if (advancesearchd7877?.isHidden) {
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
         disabled= {advancesearchd7877?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
