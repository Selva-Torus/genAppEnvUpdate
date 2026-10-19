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
        "id": "30028dc62d1f4374bb2b00a22e2b5a26",
        "type": "controlNode",
        "position": {
          "x": -51.11973012793197,
          "y": -72.18290010595042
        },
        "data": {
          "nodeId": "30028dc62d1f4374bb2b00a22e2b5a26",
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
            "30028dc62d1f4374bb2b00a22e2b5a26.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -51.12019244860008,
          "y": -72.18255037715018
        }
      },
      {
        "id": "1061ea261fd04604ac6921956531d933.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1|template_stage",
        "position": {
          "x": 5.014756384429803,
          "y": 68.16256654602252
        },
        "data": {
          "label": "certificationTemplateStage.v1|template_stage",
          "sequence": "1.1.1.1",
          "parent": "30028dc62d1f4374bb2b00a22e2b5a26",
          "children": [],
          "nodeProperty": {},
          "name": "certificationTemplateStage.v1|template_stage",
          "nodeLabel": "",
          "parentId": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": 5.01748552671398,
          "y": 68.16200132788718
        }
      },
      {
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1",
        "type": "eventNode",
        "position": {
          "x": -68.5683564315534,
          "y": 21.785527249698703
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "30028dc62d1f4374bb2b00a22e2b5a26",
          "children": [
            "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -68.56682371798847,
          "y": 21.784198233568368
        }
      },
      {
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": 34.112306665246216,
          "y": -50.95000670623684
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "30028dc62d1f4374bb2b00a22e2b5a26.1.1",
          "children": [
            "1061ea261fd04604ac6921956531d933.1.1.1.1",
            "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1.2"
          ],
          "nodeProperty": {
            "nodeId": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
            "nodeName": "searchFilter",
            "nodeType": "handlerNode",
            "hlr": {}
          }
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 34.10740224574538,
          "y": -50.943087289970336
        }
      },
      {
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1.2",
        "type": "handlerNode",
        "label": "closeHandler",
        "eventContext": "rise",
        "position": {
          "x": 86.74314150208626,
          "y": 25.172357398704843
        },
        "data": {
          "label": "closeHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
          "children": []
        },
        "positionAbsolute": {
          "x": 86.74708582278933,
          "y": 25.166999876894184
        },
        "width": 55,
        "height": 45
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "30028dc62d1f4374bb2b00a22e2b5a26->30028dc62d1f4374bb2b00a22e2b5a26.1.1",
        "source": "30028dc62d1f4374bb2b00a22e2b5a26",
        "type": "straight",
        "target": "30028dc62d1f4374bb2b00a22e2b5a26.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1->1061ea261fd04604ac6921956531d933.1.1.1.1",
        "source": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "type": "straight",
        "target": "1061ea261fd04604ac6921956531d933.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1->30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "source": "30028dc62d1f4374bb2b00a22e2b5a26.1.1",
        "type": "straight",
        "target": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "animated": true
      },
      {
        "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1->30028dc62d1f4374bb2b00a22e2b5a26.1.1.1.2",
        "source": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "type": "straight",
        "target": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1.2"
      }
    ],
    "NDP": {
      "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1": {
        "nodeId": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
        "nodeName": "searchFilter",
        "nodeType": "handlerNode",
        "hlr": {}
      }
    },
    "eventSummary": {
      "id": "30028dc62d1f4374bb2b00a22e2b5a26",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "1061ea261fd04604ac6921956531d933.1.1.1.1",
                  "type": "screen",
                  "name": "certificationTemplateStage.v1|template_stage",
                  "label": "certificationTemplateStage.v1|template_stage",
                  "key": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1|template_stage",
                  "elementType": "group",
                  "groupType": "table",
                  "sequence": "1.1.1.1",
                  "children": []
                },
                {
                  "id": "30028dc62d1f4374bb2b00a22e2b5a26.1.1.1.2",
                  "eventContext": "rise",
                  "value": "",
                  "type": "handlerNode",
                  "name": "closeHandler",
                  "label": "closeHandler",
                  "sequence": "1.1.1.2",
                  "children": []
                }
              ],
              "hlr": {}
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.template_stage_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.stage_sequence",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.stage_type_code",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.stage_name",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.is_mandatory",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.evidence_required",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.min_evidence_count",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.sla_days",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.guidance_text",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.is_active",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.cert_template_id",
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1|88bfa10bae244d46834703dc5570ae04|properties.template_name"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:searchCertificationStage:AFVK:v1|27913e7e4777466aabd94939457ac2c2|30028dc62d1f4374bb2b00a22e2b5a26"
    }
  ],
  "dfdKey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStage:AFVK:v1:",
  "schemaData": {
    "template_stage_id": {
      "type": "integer"
    },
    "stage_sequence": {
      "type": "integer"
    },
    "stage_type_code": {
      "type": "string"
    },
    "stage_name": {
      "type": "string"
    },
    "is_mandatory": {
      "type": "string"
    },
    "evidence_required": {
      "type": "string"
    },
    "min_evidence_count": {
      "type": "integer"
    },
    "sla_days": {
      "type": "integer"
    },
    "guidance_text": {
      "type": "string"
    },
    "is_active": {
      "type": "string"
    },
    "cert_template_id": {
      "type": "integer"
    },
    "template_name": {
      "type": "string"
    }
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'template_stage_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupac2c2, setgroupac2c2}= useContext(TotalContext) as TotalContextProps;
  const {groupac2c2Props, setgroupac2c2Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchb5a26, setadvancesearchb5a26}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933, settemplate_stage1d933}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933Props, settemplate_stage1d933Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupac2c2,
        codeStates['setgroup'] = setgroupac2c2,
        codeStates['groupac2c2'] = groupac2c2Props,
        codeStates['setgroupac2c2'] = setgroupac2c2Props,
        codeStates['advancesearch'] = advancesearchb5a26,
        codeStates['setadvancesearch'] = setadvancesearchb5a26,
        codeStates['template_stage'] = template_stage1d933,
        codeStates['settemplate_stage'] = settemplate_stage1d933,
        codeStates['template_stage1d933'] = template_stage1d933Props,
        codeStates['settemplate_stage1d933'] = settemplate_stage1d933Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settemplate_stage1d933Props((pre:any) => ({...pre, searchFilter:searchParams}))
    // closeHandler   
    eventBus.emit('closeModal', 'searchcertificationstage');

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
        "27913e7e4777466aabd94939457ac2c2",
        "30028dc62d1f4374bb2b00a22e2b5a26"
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
  if(dfd_certificationstage_v1Props?.setSearchFilters && dfd_certificationstage_v1Props?.data)
  {
    if(Array.isArray(dfd_certificationstage_v1Props.data) && dfd_certificationstage_v1Props.data.length > 0){
      setgroupac2c2((pre:any)=>({...pre,template_stage_id:dfd_certificationstage_v1Props.data[0]?.template_stage_id}));
    }
  }
  },[dfd_certificationstage_v1Props?.setSearchFilters])
  if (advancesearchb5a26?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `1 / 154`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearchb5a26?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
