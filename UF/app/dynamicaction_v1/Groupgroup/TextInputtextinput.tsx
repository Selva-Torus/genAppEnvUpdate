'use client'




import React, { useState,useContext,useEffect, useRef } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
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

const TextInputtextinput = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "54cf2c103a854de497ada8b41c31f103->54cf2c103a854de497ada8b41c31f103.1.1",
        "type": "straight",
        "style": {
          "stroke": "#a9a9a9"
        },
        "source": "54cf2c103a854de497ada8b41c31f103",
        "target": "54cf2c103a854de497ada8b41c31f103.1.1",
        "animated": true
      },
      {
        "id": "54cf2c103a854de497ada8b41c31f103.1.1.1->6be5feda482c40908776c5d938bed023|0a4c3c8f04cf486db31338fed4616aa0.1.1.1.1",
        "type": "straight",
        "source": "54cf2c103a854de497ada8b41c31f103.1.1.1",
        "target": "6be5feda482c40908776c5d938bed023|0a4c3c8f04cf486db31338fed4616aa0.1.1.1.1"
      },
      {
        "id": "54cf2c103a854de497ada8b41c31f103.1.1->54cf2c103a854de497ada8b41c31f103.1.1.1",
        "type": "straight",
        "source": "54cf2c103a854de497ada8b41c31f103.1.1",
        "target": "54cf2c103a854de497ada8b41c31f103.1.1.1"
      }
    ],
    "NDP": {
      "54cf2c103a854de497ada8b41c31f103.1.1.1": {
        "hlr": {},
        "nodeId": "54cf2c103a854de497ada8b41c31f103.1.1.1",
        "nodeName": "triggerElement",
        "nodeType": "handlerNode"
      }
    },
    "NDS": [
      {
        "id": "54cf2c103a854de497ada8b41c31f103",
        "data": {
          "label": "textinput",
          "events": [
            {
              "name": "onChange",
              "rise": [
                {
                  "key": "getValueFromMemory",
                  "label": "getValueFromMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "hasDataHandler",
                  "label": "hasDataHandler",
                  "listenerType": "type1"
                },
                {
                  "key": "eventEmitter",
                  "label": "eventEmitter",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshScreen",
                  "label": "refreshScreen",
                  "listenerType": "type1"
                },
                {
                  "key": "setValueToMemory",
                  "label": "setValueToMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "confirmMsg",
                  "label": "confirmMsg",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "infoMsg",
                  "label": "infoMsg",
                  "listenerType": "type1"
                }
              ],
              "self": [],
              "enabled": true,
              "riseListen": [
                {
                  "key": "getFormData",
                  "label": "getFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "triggerButtonClick",
                  "label": "triggerButtonClick",
                  "listenerType": "type1"
                },
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "showComponentAsPopup",
                  "label": "showComponentAsPopup",
                  "listenerType": "type2"
                },
                {
                  "key": "selectFirstRecord",
                  "label": "selectFirstRecord",
                  "listenerType": "type1"
                },
                {
                  "key": "resetSelection",
                  "label": "resetSelection",
                  "listenerType": "type1"
                },
                {
                  "key": "hideElement",
                  "label": "hideElement",
                  "listenerType": "type2"
                },
                {
                  "key": "showElement",
                  "label": "showElement",
                  "listenerType": "type2"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "disableElement",
                  "label": "disableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "enableElement",
                  "label": "enableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifactAsModal",
                  "label": "showArtifactAsModal",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifact",
                  "label": "showArtifact",
                  "listenerType": "type2"
                },
                {
                  "key": "triggerElement",
                  "label": "triggerElement",
                  "listenerType": "type2"
                }
              ]
            },
            {
              "name": "onBlur",
              "rise": [
                {
                  "key": "getValueFromMemory",
                  "label": "getValueFromMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "hasDataHandler",
                  "label": "hasDataHandler",
                  "listenerType": "type1"
                },
                {
                  "key": "eventEmitter",
                  "label": "eventEmitter",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshScreen",
                  "label": "refreshScreen",
                  "listenerType": "type1"
                },
                {
                  "key": "setValueToMemory",
                  "label": "setValueToMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "confirmMsg",
                  "label": "confirmMsg",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "infoMsg",
                  "label": "infoMsg",
                  "listenerType": "type1"
                }
              ],
              "self": [],
              "enabled": true,
              "riseListen": [
                {
                  "key": "getFormData",
                  "label": "getFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "triggerButtonClick",
                  "label": "triggerButtonClick",
                  "listenerType": "type1"
                },
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "showComponentAsPopup",
                  "label": "showComponentAsPopup",
                  "listenerType": "type2"
                },
                {
                  "key": "selectFirstRecord",
                  "label": "selectFirstRecord",
                  "listenerType": "type1"
                },
                {
                  "key": "resetSelection",
                  "label": "resetSelection",
                  "listenerType": "type1"
                },
                {
                  "key": "hideElement",
                  "label": "hideElement",
                  "listenerType": "type2"
                },
                {
                  "key": "showElement",
                  "label": "showElement",
                  "listenerType": "type2"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "disableElement",
                  "label": "disableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "enableElement",
                  "label": "enableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifactAsModal",
                  "label": "showArtifactAsModal",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifact",
                  "label": "showArtifact",
                  "listenerType": "type2"
                },
                {
                  "key": "triggerElement",
                  "label": "triggerElement",
                  "listenerType": "type2"
                }
              ]
            }
          ],
          "nodeId": "54cf2c103a854de497ada8b41c31f103",
          "children": [
            "54cf2c103a854de497ada8b41c31f103.1.1"
          ],
          "nodeName": "textinput",
          "nodeType": "textinput",
          "sequence": 1,
          "nodeProperty": {}
        },
        "type": "controlNode",
        "width": 55,
        "height": 24,
        "position": {
          "x": -65.66203387336977,
          "y": 18.17589968098974
        },
        "positionAbsolute": {
          "x": -65.66208467972346,
          "y": 18.175746362238822
        }
      },
      {
        "id": "54cf2c103a854de497ada8b41c31f103.1.1.1",
        "data": {
          "label": "triggerElement",
          "value": "",
          "children": [
            "6be5feda482c40908776c5d938bed023|0a4c3c8f04cf486db31338fed4616aa0.1.1.1.1"
          ],
          "parentId": "54cf2c103a854de497ada8b41c31f103.1.1",
          "sequence": "1.1.1",
          "targetEvent": "onClick",
          "eventContext": "riseListen",
          "nodeProperty": {
            "hlr": {},
            "nodeId": "54cf2c103a854de497ada8b41c31f103.1.1.1",
            "nodeName": "triggerElement",
            "nodeType": "handlerNode"
          }
        },
        "type": "handlerNode",
        "label": "triggerElement",
        "width": 56,
        "height": 49,
        "position": {
          "x": 63.879494727794054,
          "y": -17.887544417699083
        },
        "eventContext": "riseListen",
        "positionAbsolute": {
          "x": 63.879233609485816,
          "y": -17.887461768584
        }
      },
      {
        "id": "6be5feda482c40908776c5d938bed023|0a4c3c8f04cf486db31338fed4616aa0.1.1.1.1",
        "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1|group|dropdown",
        "data": {
          "name": "dynamicAction.v1|group|dropdown",
          "label": "dynamicAction.v1|group|dropdown",
          "events": [
            {
              "name": "onClick",
              "rise": [
                {
                  "key": "getValueFromMemory",
                  "label": "getValueFromMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "eventEmitter",
                  "label": "eventEmitter",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshScreen",
                  "label": "refreshScreen",
                  "listenerType": "type1"
                },
                {
                  "key": "setValueToMemory",
                  "label": "setValueToMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "confirmMsg",
                  "label": "confirmMsg",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type1"
                },
                {
                  "key": "infoMsg",
                  "label": "infoMsg",
                  "listenerType": "type1"
                },
                {
                  "key": "copySourceValue",
                  "label": "copySourceValue",
                  "listenerType": "type1"
                },
                {
                  "key": "hasDataHandler",
                  "label": "hasDataHandler",
                  "listenerType": "type1"
                }
              ],
              "self": [],
              "enabled": true,
              "riseListen": [
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type2"
                },
                {
                  "key": "triggerButtonClick",
                  "label": "triggerButtonClick",
                  "listenerType": "type1"
                },
                {
                  "key": "copyFormData",
                  "label": "copyFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "showComponentAsPopup",
                  "label": "showComponentAsPopup",
                  "listenerType": "type2"
                },
                {
                  "key": "selectFirstRecord",
                  "label": "selectFirstRecord",
                  "listenerType": "type1"
                },
                {
                  "key": "resetSelection",
                  "label": "resetSelection",
                  "listenerType": "type1"
                },
                {
                  "key": "hideElement",
                  "label": "hideElement",
                  "listenerType": "type2"
                },
                {
                  "key": "showElement",
                  "label": "showElement",
                  "listenerType": "type2"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "disableElement",
                  "label": "disableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "enableElement",
                  "label": "enableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifactAsModal",
                  "label": "showArtifactAsModal",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifact",
                  "label": "showArtifact",
                  "listenerType": "type2"
                },
                {
                  "key": "getFormData",
                  "label": "getFormData",
                  "listenerType": "type2"
                },
                {
                  "key": "filterEventemitter",
                  "label": "filterEventemitter",
                  "listenerType": "type2"
                },
                {
                  "key": "getSourceValue",
                  "label": "getSourceValue",
                  "listenerType": "type1"
                }
              ]
            }
          ],
          "parent": "54cf2c103a854de497ada8b41c31f103",
          "children": [],
          "parentId": "54cf2c103a854de497ada8b41c31f103.1.1.1",
          "sequence": "1.1.1.1",
          "nodeLabel": "group|",
          "nodeProperty": {}
        },
        "type": "screen",
        "width": 56,
        "height": 57,
        "position": {
          "x": 20.726137686315983,
          "y": 68.45195868515154
        },
        "groupType": "dropdown",
        "elementType": "dropdown",
        "positionAbsolute": {
          "x": 20.72647013431182,
          "y": 68.45211633475306
        }
      },
      {
        "id": "54cf2c103a854de497ada8b41c31f103.1.1",
        "data": {
          "label": "onChange",
          "parent": "54cf2c103a854de497ada8b41c31f103",
          "children": [
            "54cf2c103a854de497ada8b41c31f103.1.1.1"
          ],
          "sequence": "1.1",
          "nodeProperty": {}
        },
        "type": "eventNode",
        "width": 45,
        "height": 45,
        "position": {
          "x": -18.7099274055979,
          "y": -67.47363587036287
        },
        "className": "_node_1qffi_1",
        "positionAbsolute": {
          "x": -18.70984980528879,
          "y": -67.47369836598062
        }
      }
    ],
    "eventSummary": {
      "id": "54cf2c103a854de497ada8b41c31f103",
      "name": "textinput",
      "type": "textinput",
      "label": "textinput",
      "children": [
        {
          "id": "54cf2c103a854de497ada8b41c31f103.1.1",
          "name": "onChange",
          "type": "eventNode",
          "label": "onChange",
          "children": [
            {
              "id": "54cf2c103a854de497ada8b41c31f103.1.1.1",
              "hlr": {},
              "name": "triggerElement",
              "type": "handlerNode",
              "label": "triggerElement",
              "value": "",
              "children": [
                {
                  "id": "6be5feda482c40908776c5d938bed023|0a4c3c8f04cf486db31338fed4616aa0.1.1.1.1",
                  "key": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1|group|dropdown",
                  "name": "dynamicAction.v1|group|dropdown",
                  "type": "screen",
                  "label": "dynamicAction.v1|group|dropdown",
                  "children": [],
                  "sequence": "1.1.1.1",
                  "groupType": "dropdown",
                  "elementType": "dropdown"
                }
              ],
              "sequence": "1.1.1",
              "targetEvent": "onClick",
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
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1|02317a4900354a61a390a3ba4fff4fcb|responses.200.content.application/json.schema.items.properties.my_id"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1|6be5feda482c40908776c5d938bed023|54cf2c103a854de497ada8b41c31f103"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1:",
  "schemaData": {
    "type": "number",
    "example": "number"
  },
  "dataType": "number"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'my_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps;
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps;
  const {value9087e, setvalue9087e}= useContext(TotalContext) as TotalContextProps;
  const {switch63dd1, setswitch63dd1}= useContext(TotalContext) as TotalContextProps;
  const {textinput123292f1, settextinput123292f1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimef72a6, setdateandtimef72a6}= useContext(TotalContext) as TotalContextProps;
  const {datepickerb9ae2, setdatepickerb9ae2}= useContext(TotalContext) as TotalContextProps;
  const {dropdown16aa0, setdropdown16aa0}= useContext(TotalContext) as TotalContextProps;
  const {textinput1f103, settextinput1f103}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
    function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }
  const handleChange = async(e: any) => {
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,dynamicAction_v1:{...pre?.dynamicAction_v1,my_id:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrouped023((prev: any) => ({ ...prev, my_id: +e.target.value }));
    }
    else{
    setgrouped023((prev: any) => ({ ...prev, my_id: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,
        codeStates['switch'] = switch63dd1,
        codeStates['setswitch'] = setswitch63dd1,
        codeStates['textinput123'] = textinput123292f1,
        codeStates['settextinput123'] = settextinput123292f1,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['dateandtime'] = dateandtimef72a6,
        codeStates['setdateandtime'] = setdateandtimef72a6,
        codeStates['datepicker'] = datepickerb9ae2,
        codeStates['setdatepicker'] = setdatepickerb9ae2,
        codeStates['dropdown'] = dropdown16aa0,
        codeStates['setdropdown'] = setdropdown16aa0,
        codeStates['textinput'] = textinput1f103,
        codeStates['settextinput'] = settextinput1f103,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_header_1'] = tab_header_119fae,
        codeStates['settab_header_1'] = settab_header_119fae,
        codeStates['tab_header_119fae'] = tab_header_119faeProps,
        codeStates['settab_header_119fae'] = settab_header_119faeProps,
        codeStates['gggg'] = gggg721e2,
        codeStates['setgggg'] = setgggg721e2,
        codeStates['gggg721e2'] = gggg721e2Props,
        codeStates['setgggg721e2'] = setgggg721e2Props,
        codeStates['tab_header_2'] = tab_header_2d8952,
        codeStates['settab_header_2'] = settab_header_2d8952,
        codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
        codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
        codeStates['xbxvvcv'] = xbxvvcv42015,
        codeStates['setxbxvvcv'] = setxbxvvcv42015,
        codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
        codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
              //triggerElement3
       eventBus.emit("triggerElement|onClick","0a4c3c8f04cf486db31338fed4616aa0")

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

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

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
  async function handleConfirmOnChange(){
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "6be5feda482c40908776c5d938bed023",
        "54cf2c103a854de497ada8b41c31f103"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1",
      //     componentId: "6be5feda482c40908776c5d938bed023",
      //     controlId: "54cf2c103a854de497ada8b41c31f103",
      //     isTable: false,
      //     from:"TextInputtextinput",
      //     accessProfile:accessProfile
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      // if(orchestrationData?.data?.error == true){
       
      //   return
      // }
      setAllCode(orchestrationData?.data?.code);
      if (orchestrationData?.data?.dataType ==='integer' || orchestrationData?.data?.dataType ==='number') {
        setDynamicStateandType({name:'my_id', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'my_id',type:'text'};
      //   type={
      //     name:'my_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.my_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.my_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.my_id.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'my_id',type:'text'};
      //   type={
      //     name:'my_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.my_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.my_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.my_id.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const grouped023Ref = useRef<any>(grouped023);
  useEffect(() => { grouped023Ref.current = grouped023; }, [grouped023]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "54cf2c103a854de497ada8b41c31f103") {
        handleChange({target:{value:grouped023Ref?.current?.my_id||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "54cf2c103a854de497ada8b41c31f103") {
        handleBlur({target:{value:grouped023Ref?.current?.my_id||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_country_code_dfd_v1Props?.setSearchFilters && dfd_country_code_dfd_v1Props?.data)
  {
    if(Array.isArray(dfd_country_code_dfd_v1Props.data) && dfd_country_code_dfd_v1Props.data.length > 0){
      setgrouped023((pre:any)=>({...pre,my_id:dfd_country_code_dfd_v1Props.data[0]?.my_id}));
    }
  }
  },[dfd_country_code_dfd_v1Props?.setSearchFilters])
  if (textinput1f103?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 11`,gridRow: `61 / 70`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={true}
        type={dynamicStateandType.type}
        value={grouped023?.my_id||""}
         disabled= {textinput1f103?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.dynamicAction_v1?.my_id ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput
