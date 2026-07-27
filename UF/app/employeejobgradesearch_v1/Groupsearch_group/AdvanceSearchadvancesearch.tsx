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
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb",
        "type": "controlNode",
        "position": {
          "x": 6.629871172303611,
          "y": -68.85772342372931
        },
        "data": {
          "nodeId": "9a8e61614a6b490d4c2bdbb7cad72ccb",
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
            "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 27,
        "positionAbsolute": {
          "x": 6.589734935896047,
          "y": -68.8765857863303
        }
      },
      {
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 1.8866430209645255,
          "y": 23.453762679053092
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
          "children": [
            "ff40997343dd428ae50a99eca449c094.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": 2.0606936515550225,
          "y": 23.246005265259697
        },
        "width": 51,
        "height": 45
      },
      {
        "id": "ff40997343dd428ae50a99eca449c094.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1|total_employees_table",
        "position": {
          "x": 74.28809635493161,
          "y": 49.98146792850596
        },
        "data": {
          "label": "employeeJobGrades.v1|total_employees_table",
          "sequence": "1.1.1.1",
          "parent": "9a8e61614a6b490d4c2bdbb7cad72ccb",
          "children": [],
          "nodeProperty": {},
          "name": "employeeJobGrades.v1|total_employees_table",
          "nodeLabel": "",
          "parentId": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1"
        },
        "positionAbsolute": {
          "x": 74.21229044803042,
          "y": 50.26663744730355
        },
        "width": 74,
        "height": 60
      },
      {
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
        "type": "eventNode",
        "position": {
          "x": -77.84621118329383,
          "y": 2.504029986077866
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "9a8e61614a6b490d4c2bdbb7cad72ccb",
          "children": [
            "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -77.770946153814,
          "y": 2.6096332867415266
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
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb->9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
        "source": "9a8e61614a6b490d4c2bdbb7cad72ccb",
        "type": "straight",
        "target": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
        "animated": true
      },
      {
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1->ff40997343dd428ae50a99eca449c094.1.1.1.1",
        "source": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1",
        "type": "straight",
        "target": "ff40997343dd428ae50a99eca449c094.1.1.1.1"
      },
      {
        "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1->9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1",
        "source": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
        "type": "straight",
        "target": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "9a8e61614a6b490d4c2bdbb7cad72ccb",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "9a8e61614a6b490d4c2bdbb7cad72ccb.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "ff40997343dd428ae50a99eca449c094.1.1.1.1",
                  "type": "screen",
                  "name": "employeeJobGrades.v1|total_employees_table",
                  "label": "employeeJobGrades.v1|total_employees_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1|total_employees_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.grade_code",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.grade_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.min_salary",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.grade_level",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.promotion_eligible",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1|c496957cdcf54d02b06872f0f45f2a70|properties.overtime_eligible"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGradeSearch:AFVK:v1|1540e03048db2db72e07df402e12baca|9a8e61614a6b490d4c2bdbb7cad72ccb"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1:",
  "schemaData": {
    "grade_code": {
      "type": "string"
    },
    "grade_name": {
      "type": "string"
    },
    "min_salary": {
      "type": "integer"
    },
    "grade_level": {
      "type": "integer"
    },
    "promotion_eligible": {
      "type": "boolean"
    },
    "overtime_eligible": {
      "type": "boolean"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'grade_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {search_group2baca, setsearch_group2baca}= useContext(TotalContext) as TotalContextProps;
  const {search_group2bacaProps, setsearch_group2bacaProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch72ccb, setadvancesearch72ccb}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094, settotal_employees_table9c094}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094Props, settotal_employees_table9c094Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['search_group'] = search_group2baca,
        codeStates['setsearch_group'] = setsearch_group2baca,
        codeStates['search_group2baca'] = search_group2bacaProps,
        codeStates['setsearch_group2baca'] = setsearch_group2bacaProps,
        codeStates['advancesearch'] = advancesearch72ccb,
        codeStates['setadvancesearch'] = setadvancesearch72ccb,
        codeStates['total_employees_table'] = total_employees_table9c094,
        codeStates['settotal_employees_table'] = settotal_employees_table9c094,
        codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
        codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settotal_employees_table9c094Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "1540e03048db2db72e07df402e12baca",
        "9a8e61614a6b490d4c2bdbb7cad72ccb"
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
  if(dfd_jobgrade_v1Props?.setSearchFilters && dfd_jobgrade_v1Props?.data)
  {
    if(Array.isArray(dfd_jobgrade_v1Props.data) && dfd_jobgrade_v1Props.data.length > 0){
      setsearch_group2baca((pre:any)=>({...pre,grade_code:dfd_jobgrade_v1Props.data[0]?.grade_code}));
    }
  }
  },[dfd_jobgrade_v1Props?.setSearchFilters])
  if (advancesearch72ccb?.isHidden) {
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
         disabled= {advancesearch72ccb?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
