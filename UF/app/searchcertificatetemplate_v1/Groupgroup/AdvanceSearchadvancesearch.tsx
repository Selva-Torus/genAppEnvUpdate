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
        "id": "256f4d1e9b5640a888825b570b68a2ec",
        "type": "controlNode",
        "position": {
          "x": -70.87898690935411,
          "y": 5.593110646196263
        },
        "data": {
          "nodeId": "256f4d1e9b5640a888825b570b68a2ec",
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
            "256f4d1e9b5640a888825b570b68a2ec.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -70.88009948802757,
          "y": 5.589841609205703
        }
      },
      {
        "id": "256f4d1e9b5640a888825b570b68a2ec.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 15.04366050154693,
          "y": 5.1019284593858965
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "256f4d1e9b5640a888825b570b68a2ec.1.1",
          "children": [
            "4e68ca067e2d4f93937e0aa1e7f12090.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 15.034821960134488,
          "y": 5.111392157363928
        }
      },
      {
        "id": "4e68ca067e2d4f93937e0aa1e7f12090.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "group",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|group",
        "position": {
          "x": 55.70370712160828,
          "y": 70.04921926409673
        },
        "data": {
          "label": "certificateTemplate.v1|group",
          "sequence": "1.1.1.1",
          "parent": "256f4d1e9b5640a888825b570b68a2ec",
          "children": [],
          "nodeProperty": {},
          "name": "certificateTemplate.v1|group",
          "nodeLabel": "",
          "parentId": "256f4d1e9b5640a888825b570b68a2ec.1.1.1"
        },
        "width": 60,
        "height": 50,
        "positionAbsolute": {
          "x": 55.7183309869904,
          "y": 70.04123799269982
        }
      },
      {
        "id": "256f4d1e9b5640a888825b570b68a2ec.1.1",
        "type": "eventNode",
        "position": {
          "x": 5.778390664289565,
          "y": -78.14225546712353
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "256f4d1e9b5640a888825b570b68a2ec",
          "children": [
            "256f4d1e9b5640a888825b570b68a2ec.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 5.779377492778426,
          "y": -78.1372003266051
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "256f4d1e9b5640a888825b570b68a2ec->256f4d1e9b5640a888825b570b68a2ec.1.1",
        "source": "256f4d1e9b5640a888825b570b68a2ec",
        "type": "straight",
        "target": "256f4d1e9b5640a888825b570b68a2ec.1.1",
        "animated": true
      },
      {
        "id": "256f4d1e9b5640a888825b570b68a2ec.1.1.1->4e68ca067e2d4f93937e0aa1e7f12090.1.1.1.1",
        "source": "256f4d1e9b5640a888825b570b68a2ec.1.1.1",
        "type": "straight",
        "target": "4e68ca067e2d4f93937e0aa1e7f12090.1.1.1.1"
      },
      {
        "id": "256f4d1e9b5640a888825b570b68a2ec.1.1->256f4d1e9b5640a888825b570b68a2ec.1.1.1",
        "source": "256f4d1e9b5640a888825b570b68a2ec.1.1",
        "type": "straight",
        "target": "256f4d1e9b5640a888825b570b68a2ec.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "256f4d1e9b5640a888825b570b68a2ec",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "256f4d1e9b5640a888825b570b68a2ec.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "256f4d1e9b5640a888825b570b68a2ec.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "4e68ca067e2d4f93937e0aa1e7f12090.1.1.1.1",
                  "type": "screen",
                  "name": "certificateTemplate.v1|group",
                  "label": "certificateTemplate.v1|group",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|group",
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
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.template_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.template_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.applies_tier_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.applies_use_case",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.applies_asset_type",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.validity_months",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.template_version",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1|2a12c3534d6f4cd38f30c92d0bf4f30a|properties.is_active"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchCertificateTemplate:AFVK:v1|a6955e1ffa7a46149ddb370e87c86a1a|256f4d1e9b5640a888825b570b68a2ec"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1:",
  "schemaData": {
    "template_code": {
      "type": "string"
    },
    "template_name": {
      "type": "string"
    },
    "applies_tier_code": {
      "type": "string"
    },
    "applies_use_case": {
      "type": "string"
    },
    "applies_asset_type": {
      "type": "string"
    },
    "validity_months": {
      "type": "integer"
    },
    "template_version": {
      "type": "integer"
    },
    "is_active": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'template_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group86a1a, setgroup86a1a}= useContext(TotalContext) as TotalContextProps;
  const {group86a1aProps, setgroup86a1aProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch8a2ec, setadvancesearch8a2ec}= useContext(TotalContext) as TotalContextProps;
  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group86a1a,
        codeStates['setgroup'] = setgroup86a1a,
        codeStates['group86a1a'] = group86a1aProps,
        codeStates['setgroup86a1a'] = setgroup86a1aProps,
        codeStates['advancesearch'] = advancesearch8a2ec,
        codeStates['setadvancesearch'] = setadvancesearch8a2ec,
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setgroup12090Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "a6955e1ffa7a46149ddb370e87c86a1a",
        "256f4d1e9b5640a888825b570b68a2ec"
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
  if(dfd_certificatetemplate_v1Props?.setSearchFilters && dfd_certificatetemplate_v1Props?.data)
  {
    if(Array.isArray(dfd_certificatetemplate_v1Props.data) && dfd_certificatetemplate_v1Props.data.length > 0){
      setgroup86a1a((pre:any)=>({...pre,template_code:dfd_certificatetemplate_v1Props.data[0]?.template_code}));
    }
  }
  },[dfd_certificatetemplate_v1Props?.setSearchFilters])
  if (advancesearch8a2ec?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `3 / 156`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearch8a2ec?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
