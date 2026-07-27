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
        "id": "bfd86b443655b8219e17b501421f6a59",
        "type": "controlNode",
        "position": {
          "x": -61.41034466305416,
          "y": -43.296779899287856
        },
        "data": {
          "nodeId": "bfd86b443655b8219e17b501421f6a59",
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
            "bfd86b443655b8219e17b501421f6a59.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -61.41037834589381,
          "y": -43.29709807628871
        }
      },
      {
        "id": "bfd86b443655b8219e17b501421f6a59.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -34.29302169542143,
          "y": 50.79311136137623
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "bfd86b443655b8219e17b501421f6a59.1.1",
          "children": [
            "33564afe78fbb2cdfc338e23720379da.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": -34.29291866275532,
          "y": 50.79313666235754
        }
      },
      {
        "id": "33564afe78fbb2cdfc338e23720379da.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|total_employees_table",
        "position": {
          "x": 62.18581010272388,
          "y": 40.607640341882615
        },
        "data": {
          "label": "backgroundCheck.v1|total_employees_table",
          "sequence": "1.1.1.1",
          "parent": "bfd86b443655b8219e17b501421f6a59",
          "children": [],
          "nodeProperty": {},
          "name": "backgroundCheck.v1|total_employees_table",
          "nodeLabel": "",
          "parentId": "bfd86b443655b8219e17b501421f6a59.1.1.1"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": 62.18596114554345,
          "y": 40.607692789167125
        }
      },
      {
        "id": "bfd86b443655b8219e17b501421f6a59.1.1",
        "type": "eventNode",
        "position": {
          "x": 33.403429740841,
          "y": -47.839530378834034
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "bfd86b443655b8219e17b501421f6a59",
          "children": [
            "bfd86b443655b8219e17b501421f6a59.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 33.403249665018365,
          "y": -47.839255245381715
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "bfd86b443655b8219e17b501421f6a59->bfd86b443655b8219e17b501421f6a59.1.1",
        "source": "bfd86b443655b8219e17b501421f6a59",
        "type": "straight",
        "target": "bfd86b443655b8219e17b501421f6a59.1.1",
        "animated": true
      },
      {
        "id": "bfd86b443655b8219e17b501421f6a59.1.1.1->33564afe78fbb2cdfc338e23720379da.1.1.1.1",
        "source": "bfd86b443655b8219e17b501421f6a59.1.1.1",
        "type": "straight",
        "target": "33564afe78fbb2cdfc338e23720379da.1.1.1.1"
      },
      {
        "id": "bfd86b443655b8219e17b501421f6a59.1.1->bfd86b443655b8219e17b501421f6a59.1.1.1",
        "source": "bfd86b443655b8219e17b501421f6a59.1.1",
        "type": "straight",
        "target": "bfd86b443655b8219e17b501421f6a59.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "bfd86b443655b8219e17b501421f6a59",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "bfd86b443655b8219e17b501421f6a59.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "bfd86b443655b8219e17b501421f6a59.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "33564afe78fbb2cdfc338e23720379da.1.1.1.1",
                  "type": "screen",
                  "name": "backgroundCheck.v1|total_employees_table",
                  "label": "backgroundCheck.v1|total_employees_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|total_employees_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.check_id",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.employee_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.check_type",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.initiated_date",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.completed_date",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.result",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1|af6570d7e7e84152af8380e55b1d020d|properties.verification_status"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheckSearch:AFVK:v1|d4b79319a42b08c08eb621e0e6f78652|bfd86b443655b8219e17b501421f6a59"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1:",
  "schemaData": {
    "check_id": {
      "type": "integer"
    },
    "employee_name": {
      "type": "string"
    },
    "check_type": {
      "type": "string"
    },
    "initiated_date": {
      "type": "string"
    },
    "completed_date": {
      "type": "string"
    },
    "result": {
      "type": "string"
    },
    "verification_status": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_backgroundcheck_v1Props, setdfd_backgroundcheck_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'check_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group78652, setsearch_group78652}= useContext(TotalContext) as TotalContextProps;
  const {search_group78652Props, setsearch_group78652Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchf6a59, setadvancesearchf6a59}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group78652,
        codeStates['setsearch_group'] = setsearch_group78652,
        codeStates['search_group78652'] = search_group78652Props,
        codeStates['setsearch_group78652'] = setsearch_group78652Props,
        codeStates['advancesearch'] = advancesearchf6a59,
        codeStates['setadvancesearch'] = setadvancesearchf6a59,
        codeStates['total_employees_table'] = total_employees_table379da,
        codeStates['settotal_employees_table'] = settotal_employees_table379da,
        codeStates['total_employees_table379da'] = total_employees_table379daProps,
        codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settotal_employees_table379daProps((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "d4b79319a42b08c08eb621e0e6f78652",
        "bfd86b443655b8219e17b501421f6a59"
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
  if(dfd_backgroundcheck_v1Props?.setSearchFilters && dfd_backgroundcheck_v1Props?.data)
  {
    if(Array.isArray(dfd_backgroundcheck_v1Props.data) && dfd_backgroundcheck_v1Props.data.length > 0){
      setsearch_group78652((pre:any)=>({...pre,check_id:dfd_backgroundcheck_v1Props.data[0]?.check_id}));
    }
  }
  },[dfd_backgroundcheck_v1Props?.setSearchFilters])
  if (advancesearchf6a59?.isHidden) {
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
         disabled= {advancesearchf6a59?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
