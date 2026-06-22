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
        "id": "7b662662a4477a2dbf2ba973db9fab99",
        "type": "controlNode",
        "position": {
          "x": 9.583926492065642,
          "y": -68.86817782298927
        },
        "data": {
          "nodeId": "7b662662a4477a2dbf2ba973db9fab99",
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
            "7b662662a4477a2dbf2ba973db9fab99.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": 9.567065666649375,
          "y": -68.88293685841921
        }
      },
      {
        "id": "7b662662a4477a2dbf2ba973db9fab99.1.1.1",
        "type": "handlerNode",
        "label": "searchFilter",
        "eventContext": "riseListen",
        "position": {
          "x": -0.028597804360977704,
          "y": 23.177870119548707
        },
        "data": {
          "label": "searchFilter",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "7b662662a4477a2dbf2ba973db9fab99.1.1",
          "children": [
            "3de40d278fed40108fe057ba6413e4ac.1.1.1.1"
          ]
        },
        "width": 51,
        "height": 45,
        "positionAbsolute": {
          "x": 0.02783132222023716,
          "y": 23.08429233543153
        }
      },
      {
        "id": "3de40d278fed40108fe057ba6413e4ac.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "table",
        "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|category_table",
        "position": {
          "x": 72.19032641335461,
          "y": 51.40357753480808
        },
        "data": {
          "label": "assetCategory.v1|category_table",
          "sequence": "1.1.1.1",
          "parent": "7b662662a4477a2dbf2ba973db9fab99",
          "children": [],
          "nodeProperty": {},
          "name": "assetCategory.v1|category_table",
          "nodeLabel": "",
          "parentId": "7b662662a4477a2dbf2ba973db9fab99.1.1.1"
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": 72.14764695987037,
          "y": 51.49945364869935
        }
      },
      {
        "id": "7b662662a4477a2dbf2ba973db9fab99.1.1",
        "type": "eventNode",
        "position": {
          "x": -78.95073163110901,
          "y": -0.595202388869405
        },
        "data": {
          "label": "onSubmit",
          "sequence": "1.1",
          "parent": "7b662662a4477a2dbf2ba973db9fab99",
          "children": [
            "7b662662a4477a2dbf2ba973db9fab99.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -78.93691337913828,
          "y": -0.555299029938781
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
        "id": "7b662662a4477a2dbf2ba973db9fab99->7b662662a4477a2dbf2ba973db9fab99.1.1",
        "source": "7b662662a4477a2dbf2ba973db9fab99",
        "type": "straight",
        "target": "7b662662a4477a2dbf2ba973db9fab99.1.1",
        "animated": true
      },
      {
        "id": "7b662662a4477a2dbf2ba973db9fab99.1.1.1->3de40d278fed40108fe057ba6413e4ac.1.1.1.1",
        "source": "7b662662a4477a2dbf2ba973db9fab99.1.1.1",
        "type": "straight",
        "target": "3de40d278fed40108fe057ba6413e4ac.1.1.1.1"
      },
      {
        "id": "7b662662a4477a2dbf2ba973db9fab99.1.1->7b662662a4477a2dbf2ba973db9fab99.1.1.1",
        "source": "7b662662a4477a2dbf2ba973db9fab99.1.1",
        "type": "straight",
        "target": "7b662662a4477a2dbf2ba973db9fab99.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "7b662662a4477a2dbf2ba973db9fab99",
      "type": "advancesearch",
      "name": "advancesearch",
      "label": "advancesearch",
      "sequence": 1,
      "children": [
        {
          "id": "7b662662a4477a2dbf2ba973db9fab99.1.1",
          "type": "eventNode",
          "name": "onSubmit",
          "label": "onSubmit",
          "sequence": "1.1",
          "children": [
            {
              "id": "7b662662a4477a2dbf2ba973db9fab99.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "searchFilter",
              "label": "searchFilter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "3de40d278fed40108fe057ba6413e4ac.1.1.1.1",
                  "type": "screen",
                  "name": "assetCategory.v1|category_table",
                  "label": "assetCategory.v1|category_table",
                  "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|category_table",
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.category_name",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.category_code",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.maintenance_required",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.useful_life_years",
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1|22ba40e3f56441559478608632cef203|properties.depreciation_method"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:categorySearch:AFVK:v1|7e7048961cc614a06ec648d85d3d84d5|7b662662a4477a2dbf2ba973db9fab99"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1:",
  "schemaData": {
    "category_name": {
      "type": "string"
    },
    "category_code": {
      "type": "string"
    },
    "useful_life_years": {
      "type": "string"
    },
    "depreciation_method": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_assetcategory_v1Props, setdfd_assetcategory_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'category_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {asset_search_groupd84d5, setasset_search_groupd84d5}= useContext(TotalContext) as TotalContextProps;
  const {asset_search_groupd84d5Props, setasset_search_groupd84d5Props}= useContext(TotalContext) as TotalContextProps;
  const {advancesearchfab99, setadvancesearchfab99}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['asset_search_group'] = asset_search_groupd84d5,
        codeStates['setasset_search_group'] = setasset_search_groupd84d5,
        codeStates['asset_search_groupd84d5'] = asset_search_groupd84d5Props,
        codeStates['setasset_search_groupd84d5'] = setasset_search_groupd84d5Props,
        codeStates['advancesearch'] = advancesearchfab99,
        codeStates['setadvancesearch'] = setadvancesearchfab99,
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        setcategory_table3e4acProps((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "7e7048961cc614a06ec648d85d3d84d5",
        "7b662662a4477a2dbf2ba973db9fab99"
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
  if(dfd_assetcategory_v1Props?.setSearchFilters && dfd_assetcategory_v1Props?.data)
  {
    if(Array.isArray(dfd_assetcategory_v1Props.data) && dfd_assetcategory_v1Props.data.length > 0){
      setasset_search_groupd84d5((pre:any)=>({...pre,category_name:dfd_assetcategory_v1Props.data[0]?.category_name}));
    }
  }
  },[dfd_assetcategory_v1Props?.setSearchFilters])
  if (advancesearchfab99?.isHidden) {
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
         disabled= {advancesearchfab99?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
