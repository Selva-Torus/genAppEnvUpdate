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
      "ttl": "",
      "name": "",
      "lockMode": ""
    },
    "events": {},
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "stateTransition": {
      "sourceQueue": "",
      "targetQueue": "",
      "sourceStatus": "",
      "targetStatus": ""
    }
  },
  "code": "",
  "rule": {},
  "events": {
    "NDE": [
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997->54a4fc1d85fa49ce8b28979674b6c997.1.1",
        "type": "straight",
        "style": {
          "stroke": "#a9a9a9"
        },
        "source": "54a4fc1d85fa49ce8b28979674b6c997",
        "target": "54a4fc1d85fa49ce8b28979674b6c997.1.1",
        "animated": true
      },
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1->83a889c5cf1a4aa0baa4e6e8d337d435.1.1.1.1",
        "type": "straight",
        "source": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1",
        "target": "83a889c5cf1a4aa0baa4e6e8d337d435.1.1.1.1"
      },
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1->54a4fc1d85fa49ce8b28979674b6c997.1.1.1",
        "type": "straight",
        "source": "54a4fc1d85fa49ce8b28979674b6c997.1.1",
        "target": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1"
      }
    ],
    "NDP": {},
    "NDS": [
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997",
        "data": {
          "label": "advancesearch",
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
              "self": [],
              "enabled": true,
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
              ]
            }
          ],
          "nodeId": "54a4fc1d85fa49ce8b28979674b6c997",
          "children": [
            "54a4fc1d85fa49ce8b28979674b6c997.1.1"
          ],
          "nodeName": "advancesearch",
          "nodeType": "advancesearch",
          "sequence": 1,
          "nodeProperty": {}
        },
        "type": "controlNode",
        "width": 55,
        "height": 29,
        "position": {
          "x": -64.33795814274502,
          "y": -36.02569471750933
        },
        "positionAbsolute": {
          "x": -64.33806920566151,
          "y": -36.02568274639954
        }
      },
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1",
        "data": {
          "label": "searchFilter",
          "value": "",
          "children": [
            "83a889c5cf1a4aa0baa4e6e8d337d435.1.1.1.1"
          ],
          "parentId": "54a4fc1d85fa49ce8b28979674b6c997.1.1",
          "sequence": "1.1.1",
          "eventContext": "riseListen"
        },
        "type": "handlerNode",
        "label": "searchFilter",
        "width": 51,
        "height": 45,
        "dragging": false,
        "position": {
          "x": 184.68832134013653,
          "y": -72.85641753976279
        },
        "selected": false,
        "eventContext": "riseListen",
        "positionAbsolute": {
          "x": 184.68832134013653,
          "y": -72.85641753976279
        }
      },
      {
        "id": "83a889c5cf1a4aa0baa4e6e8d337d435.1.1.1.1",
        "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:advancedsearch:AFVK:v1|table",
        "data": {
          "name": "advancedsearch.v1|table",
          "label": "advancedsearch.v1|table",
          "parent": "54a4fc1d85fa49ce8b28979674b6c997",
          "children": [],
          "parentId": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1",
          "sequence": "1.1.1.1",
          "nodeLabel": "",
          "nodeProperty": {}
        },
        "type": "screen",
        "width": 83,
        "height": 54,
        "dragging": false,
        "position": {
          "x": 327.38450317206997,
          "y": -96.71991211321055
        },
        "selected": true,
        "groupType": "table",
        "elementType": "group",
        "positionAbsolute": {
          "x": 327.38450317206997,
          "y": -96.71991211321055
        }
      },
      {
        "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1",
        "data": {
          "label": "onSubmit",
          "parent": "54a4fc1d85fa49ce8b28979674b6c997",
          "children": [
            "54a4fc1d85fa49ce8b28979674b6c997.1.1.1"
          ],
          "sequence": "1.1",
          "nodeProperty": {}
        },
        "type": "eventNode",
        "width": 100,
        "height": 100,
        "position": {
          "x": 31.361641339299535,
          "y": -52.89646169307417
        },
        "className": "_node_1qffi_1",
        "positionAbsolute": {
          "x": 31.361589195419334,
          "y": -52.89647347079717
        }
      }
    ],
    "eventSummary": {
      "id": "54a4fc1d85fa49ce8b28979674b6c997",
      "name": "advancesearch",
      "type": "advancesearch",
      "label": "advancesearch",
      "children": [
        {
          "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1",
          "name": "onSubmit",
          "type": "eventNode",
          "label": "onSubmit",
          "children": [
            {
              "id": "54a4fc1d85fa49ce8b28979674b6c997.1.1.1",
              "name": "searchFilter",
              "type": "handlerNode",
              "label": "searchFilter",
              "value": "",
              "children": [
                {
                  "id": "83a889c5cf1a4aa0baa4e6e8d337d435.1.1.1.1",
                  "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:advancedsearch:AFVK:v1|table",
                  "name": "advancedsearch.v1|table",
                  "type": "screen",
                  "label": "advancedsearch.v1|table",
                  "children": [],
                  "sequence": "1.1.1.1",
                  "groupType": "table",
                  "elementType": "group"
                }
              ],
              "sequence": "1.1.1",
              "eventContext": "riseListen"
            }
          ],
          "sequence": "1.1"
        }
      ],
      "sequence": 1
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1|fa03cf6c52304be49484a558759f0ab2|items.properties.country",
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1|fa03cf6c52304be49484a558759f0ab2|items.properties.state"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:advancedsearch:AFVK:v1|62fca87896cc475fa1bcb5e25e9f6bcb|54a4fc1d85fa49ce8b28979674b6c997"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1:",
  "schemaData": {
    "country": {
      "type": "string"
    },
    "state": {
      "type": "string"
    }
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'country',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupf6bcb, setgroupf6bcb}= useContext(TotalContext) as TotalContextProps;
  const {groupf6bcbProps, setgroupf6bcbProps}= useContext(TotalContext) as TotalContextProps;
  const {advancesearch6c997, setadvancesearch6c997}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimeb3eda, setdateandtimeb3eda}= useContext(TotalContext) as TotalContextProps;
  const {table7d435, settable7d435}= useContext(TotalContext) as TotalContextProps;
  const {table7d435Props, settable7d435Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  const handleSubmit = async(e: any) => {
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupf6bcb,
        codeStates['setgroup'] = setgroupf6bcb,
        codeStates['groupf6bcb'] = groupf6bcbProps,
        codeStates['setgroupf6bcb'] = setgroupf6bcbProps,
        codeStates['advancesearch'] = advancesearch6c997,
        codeStates['setadvancesearch'] = setadvancesearch6c997,
        codeStates['dateandtime'] = dateandtimeb3eda,
        codeStates['setdateandtime'] = setdateandtimeb3eda,
        codeStates['table'] = table7d435,
        codeStates['settable'] = settable7d435,
        codeStates['table7d435'] = table7d435Props,
        codeStates['settable7d435'] = settable7d435Props,
        codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
      let dstKey= dfdKey 
      dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:"); 
      let searchParams=e
      // searchFilter for riseListen
        settable7d435Props((pre:any) => ({...pre, searchFilter:searchParams}))

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
        "62fca87896cc475fa1bcb5e25e9f6bcb",
        "54a4fc1d85fa49ce8b28979674b6c997"
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
  if(dfd_country_code_dfd_v1Props?.setSearchFilters && dfd_country_code_dfd_v1Props?.data)
  {
    if(Array.isArray(dfd_country_code_dfd_v1Props.data) && dfd_country_code_dfd_v1Props.data.length > 0){
      setgroupf6bcb((pre:any)=>({...pre,country:dfd_country_code_dfd_v1Props.data[0]?.country}));
    }
  }
  },[dfd_country_code_dfd_v1Props?.setSearchFilters])
  if (advancesearch6c997?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `2 / 14`,gridRow: `5 / 107`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
         disabled= {advancesearch6c997?.isDisabled ? true : false}
      />
      </div>
    </div> 
  )
}

export default AdvancedSearchadvancesearch
