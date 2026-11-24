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
import { useGlobal } from '@/context/GlobalContext'
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

const TextInputexchange_rate = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allState:any = useContext(TotalContext) as TotalContextProps
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
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9",
        "type": "controlNode",
        "position": {
          "x": -74.47218789829421,
          "y": -46.80477030170154
        },
        "data": {
          "nodeId": "d63f7eb2b2c357905ea76d9eb8771ca9",
          "nodeName": "exchange_rate",
          "nodeType": "textinput",
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
                }
              ],
              "self": [],
              "enabled": true
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
                }
              ],
              "self": [],
              "enabled": true
            }
          ],
          "label": "exchange_rate",
          "children": [
            "d63f7eb2b2c357905ea76d9eb8771ca9.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 27,
        "positionAbsolute": {
          "x": -74.47205987938389,
          "y": -46.8048438918164
        }
      },
      {
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
        "type": "eventNode",
        "position": {
          "x": 19.494137744926864,
          "y": -71.81387552750226
        },
        "data": {
          "label": "onChange",
          "sequence": "1.1",
          "parent": "d63f7eb2b2c357905ea76d9eb8771ca9",
          "children": [
            "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 19.494196542810197,
          "y": -71.81386287906895
        }
      },
      {
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 71.42975446587775,
          "y": 0.02224886700035274
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1",
          "parentId": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
          "children": [
            "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
            "nodeName": "copyFormData",
            "nodeType": "handlerNode",
            "hlr": {
              "params": [
                {
                  "name": "parentTable",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                },
                {
                  "name": "primaryKey",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                },
                {
                  "name": "path",
                  "_type": "text",
                  "value": "data[0].calculated_ret_amount",
                  "enabled": true
                },
                {
                  "name": "setValue",
                  "_type": "array",
                  "items": [
                    {
                      "source": "",
                      "target": ""
                    }
                  ],
                  "value": "",
                  "enabled": true
                }
              ]
            }
          }
        },
        "width": 59,
        "height": 45,
        "positionAbsolute": {
          "x": 71.42947498201738,
          "y": 0.02229167073995902
        }
      },
      {
        "id": "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|calculated_ret_amount",
        "position": {
          "x": 27.80439302402221,
          "y": 85.97012240747425
        },
        "data": {
          "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1.1",
          "parentId": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
          "children": [],
          "nodeProperty": {
            "hlr": {
              "params": [
                {
                  "name": "status",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                },
                {
                  "name": "needClearValue",
                  "_type": "boolean",
                  "value": false,
                  "enabled": true
                }
              ]
            }
          },
          "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
          "nodeLabel": "|"
        },
        "width": 74,
        "height": 77,
        "positionAbsolute": {
          "x": 27.804644166681395,
          "y": 85.97020903333419
        }
      },
      {
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
        "type": "handlerNode",
        "label": "eventEmitter",
        "eventContext": "rise",
        "position": {
          "x": -44.2756512893659,
          "y": 34.51985287724235
        },
        "data": {
          "label": "eventEmitter",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
          "children": [
            "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1"
          ],
          "nodeProperty": {
            "hlr": {
              "params": [
                {
                  "name": "status",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                },
                {
                  "name": "needClearValue",
                  "_type": "boolean",
                  "value": false,
                  "enabled": true
                }
              ]
            }
          }
        },
        "positionAbsolute": {
          "x": -44.27570092822316,
          "y": 34.5199182352453
        },
        "width": 53,
        "height": 45
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9->d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
        "source": "d63f7eb2b2c357905ea76d9eb8771ca9",
        "type": "straight",
        "target": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1->d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
        "source": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
        "type": "straight",
        "target": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
        "animated": true
      },
      {
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1->caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1",
        "source": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
        "type": "straight",
        "target": "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1"
      },
      {
        "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1->d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
        "source": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
        "type": "straight",
        "target": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1"
      }
    ],
    "NDP": {
      "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1": {
        "nodeId": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
        "nodeName": "copyFormData",
        "nodeType": "handlerNode",
        "hlr": {
          "params": [
            {
              "name": "parentTable",
              "_type": "text",
              "value": "",
              "enabled": true
            },
            {
              "name": "primaryKey",
              "_type": "text",
              "value": "",
              "enabled": true
            },
            {
              "name": "path",
              "_type": "text",
              "value": "data[0].calculated_ret_amount",
              "enabled": true
            },
            {
              "name": "setValue",
              "_type": "array",
              "items": [
                {
                  "source": "",
                  "target": ""
                }
              ],
              "value": "",
              "enabled": true
            }
          ]
        }
      },
      "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1": {
        "hlr": {
          "params": [
            {
              "name": "status",
              "_type": "text",
              "value": "",
              "enabled": true
            },
            {
              "name": "needClearValue",
              "_type": "boolean",
              "value": false,
              "enabled": true
            }
          ]
        }
      },
      "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1": {
        "hlr": {
          "params": [
            {
              "name": "status",
              "_type": "text",
              "value": "",
              "enabled": true
            },
            {
              "name": "needClearValue",
              "_type": "boolean",
              "value": false,
              "enabled": true
            }
          ]
        }
      }
    },
    "eventSummary": {
      "id": "d63f7eb2b2c357905ea76d9eb8771ca9",
      "type": "textinput",
      "name": "exchange_rate",
      "label": "exchange_rate",
      "sequence": 1,
      "children": [
        {
          "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
          "type": "eventNode",
          "name": "onChange",
          "label": "onChange",
          "sequence": "1.1",
          "children": [
            {
              "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "eventEmitter",
              "label": "eventEmitter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.1",
                  "children": [
                    {
                      "id": "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                      "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|calculated_ret_amount",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.1.1",
                      "children": []
                    }
                  ],
                  "hlr": {
                    "params": [
                      {
                        "name": "parentTable",
                        "_type": "text",
                        "value": "",
                        "enabled": true
                      },
                      {
                        "name": "primaryKey",
                        "_type": "text",
                        "value": "",
                        "enabled": true
                      },
                      {
                        "name": "path",
                        "_type": "text",
                        "value": "data[0].calculated_ret_amount",
                        "enabled": true
                      },
                      {
                        "name": "setValue",
                        "_type": "array",
                        "items": [
                          {
                            "source": "",
                            "target": ""
                          }
                        ],
                        "value": "",
                        "enabled": true
                      }
                    ]
                  }
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "status",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "needClearValue",
                    "_type": "boolean",
                    "value": false,
                    "enabled": true
                  }
                ]
              },
              "targetKey": [
                "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundRetunExchangeRateBindProcess:AFVK:v1|d9b043ee0848494ba7548aa0306ac7c6"
              ]
            }
          ]
        }
      ]
    }
  },
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'exchange_rate',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {applyspecialratemaingroup6cd35, setapplyspecialratemaingroup6cd35}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup6cd35Props, setapplyspecialratemaingroup6cd35Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_account8ccf1, setdr_account8ccf1}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency6b8f0, setdr_currency6b8f0}= useContext(TotalContext) as TotalContextProps;
  const {debit_exchange_rate710eb, setdebit_exchange_rate710eb}= useContext(TotalContext) as TotalContextProps;
  const {ret_amountb0252, setret_amountb0252}= useContext(TotalContext) as TotalContextProps;
  const {ret_currencye06ce, setret_currencye06ce}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate71ca9, setexchange_rate71ca9}= useContext(TotalContext) as TotalContextProps;
  const {calculated_ret_amountdc5ca, setcalculated_ret_amountdc5ca}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48, setapplyspecialratedynamicactions8ee48}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48Props, setapplyspecialratedynamicactions8ee48Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,outboundManualReturnProcess_v1:{...pre?.outboundManualReturnProcess_v1,exchange_rate:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, exchange_rate: +e.target.value }));
    }
    else{
    setapplyspecialratesubgroupd7745((prev: any) => ({ ...prev, exchange_rate: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['dr_account'] = dr_account8ccf1,
        codeStates['setdr_account'] = setdr_account8ccf1,
        codeStates['dr_currency'] = dr_currency6b8f0,
        codeStates['setdr_currency'] = setdr_currency6b8f0,
        codeStates['debit_exchange_rate'] = debit_exchange_rate710eb,
        codeStates['setdebit_exchange_rate'] = setdebit_exchange_rate710eb,
        codeStates['ret_amount'] = ret_amountb0252,
        codeStates['setret_amount'] = setret_amountb0252,
        codeStates['ret_currency'] = ret_currencye06ce,
        codeStates['setret_currency'] = setret_currencye06ce,
        codeStates['exchange_rate'] = exchange_rate71ca9,
        codeStates['setexchange_rate'] = setexchange_rate71ca9,
        codeStates['calculated_ret_amount'] = calculated_ret_amountdc5ca,
        codeStates['setcalculated_ret_amount'] = setcalculated_ret_amountdc5ca,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

      // eventEmitter        
      let mainData:any=structuredClone({...applyspecialratemaingroup6cd35, ...applyspecialratedynamicactions8ee48, ...applyspecialratesubgroupd7745});
      if(dynamicStateandType.type=="number"){
        mainData={...mainData, exchange_rate: +e.target.value }
      }
      else{
        mainData={...mainData, exchange_rate: e.target.value }
      }
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        data: {},
        lock: {}
      }
      let uf_getPFDetails:any={
        key: ""
      };
      let uf_ifo:any;
      if(!mainData || Object.keys(mainData)?.length == 0 ){
         throw 'Please give proper data';
      }
      let eventProperty :any = {
  "id": "d63f7eb2b2c357905ea76d9eb8771ca9",
  "type": "textinput",
  "name": "exchange_rate",
  "label": "exchange_rate",
  "sequence": 1,
  "children": [
    {
      "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1",
      "type": "eventNode",
      "name": "onChange",
      "label": "onChange",
      "sequence": "1.1",
      "children": [
        {
          "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "d63f7eb2b2c357905ea76d9eb8771ca9.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "caa7a90344fcb98d6f8d0fda126d7745|81fdb292571231c906d1b225492dc5ca.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                  "label": "outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1|applyspecialratesubgroup|calculated_ret_amount",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.1.1",
                  "children": []
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  {
                    "name": "path",
                    "_type": "text",
                    "value": "data[0].calculated_ret_amount",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "status",
                "_type": "text",
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "value": false,
                "enabled": true
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundRetunExchangeRateBindProcess:AFVK:v1|d9b043ee0848494ba7548aa0306ac7c6"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1";
      sourceId+= "|"+"caa7a90344fcb98d6f8d0fda126d7745";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1"+"|"+"caa7a90344fcb98d6f8d0fda126d7745"+"|"+eventProperty.id;
      pathIds.map((ele:any,id:number)=>{
        if(id!=pathIds.length-1)
        {
          sourceIdNewPath=sourceIdNewPath+"|"+ele
        }
      })
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'eventEmitter'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
             key:eventDetailsArray[k].targetKey[0],
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              status: eventDetailsArray[k]?.status,
              sourceId:sourceIdNewPath
            };
          }
        }
      }
    
      if (uf_getPFDetails.key == undefined) {
         toast('Please check PF', 'danger')
         return
      }
        const uf_initiatePfBody:uf_initiatePfDto={
          key:uf_getPFDetails.key,
          sourceId:sourceIdNewPath
        };
        if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd;
          uf_initiatePfBody["method"] = encryptionMethod;
        }
            uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              if(uf_initiatePf?.data?.error == true){
                toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                return
              }
      

      //eventEmitter
      te_eventEmitterBody = {
        ...uf_initiatePf.data.nodeProperty,
        data:mainData||{},
        event : uf_initiatePf.data.eventProperty?.source?.status,
        sourceId : uf_initiatePf.data.eventProperty?.sourceId,
        controlName: "exchange_rate"
      }
        let formData:any={};
        let ifoResponse:any[]=[];
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"caa7a90344fcb98d6f8d0fda126d7745",
            controlId:"d63f7eb2b2c357905ea76d9eb8771ca9"
          };
          if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
          uf_ifo = await AxiosService.post(
          "/UF/ifo",
            uf_ifoBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          if(uf_ifo?.data?.error == true){
            toast(uf_ifo?.data?.errorDetails?.message, 'danger');
            return
          }
            //eventEmitter
            te_eventEmitterBody.data= [{...uf_ifo?.data}];
        
      

    //eventEmitter
    if(mainData?.upId)
    {
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(applyspecialratesubgroupd7745?.upId){
      te_eventEmitterBody['upId']= [applyspecialratesubgroupd7745?.upId];
    }
    if(applyspecialratesubgroupd7745?.upid){
      te_eventEmitterBody['upId']= [applyspecialratesubgroupd7745?.upid];
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store outboundManualReturnProcess.v1|applyspecialratesubgroup|calculated_ret_amount
               copyFormhandlerData["setapplyspecialratesubgroupd7745"]={...copyFormhandlerData["setapplyspecialratesubgroupd7745"],[UOmapperData['81fdb292571231c906d1b225492dc5ca']['source']]:commonSepareteDataFromTheObject("data[0].calculated_ret_amount",te_eventEmitter?.data)}
            if("setapplyspecialratesubgroupd7745" in copyFormhandlerData){
        setapplyspecialratesubgroupd7745((pre:any)=>({...pre,...copyFormhandlerData["setapplyspecialratesubgroupd7745"]}) )
      }

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
        "caa7a90344fcb98d6f8d0fda126d7745",
        "d63f7eb2b2c357905ea76d9eb8771ca9"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1",
      //     componentId: "caa7a90344fcb98d6f8d0fda126d7745",
      //     controlId: "d63f7eb2b2c357905ea76d9eb8771ca9",
      //     isTable: false,
      //     from:"TextInputexchange_rate",
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
        setDynamicStateandType({name:'exchange_rate', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'exchange_rate',type:'text'};
      //   type={
      //     name:'exchange_rate',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.exchange_rate.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.exchange_rate.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.exchange_rate.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'exchange_rate',type:'text'};
      //   type={
      //     name:'exchange_rate',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.exchange_rate.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.exchange_rate.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.exchange_rate.type
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
  const applyspecialratesubgroupd7745Ref = useRef<any>(applyspecialratesubgroupd7745);
  useEffect(() => { applyspecialratesubgroupd7745Ref.current = applyspecialratesubgroupd7745; }, [applyspecialratesubgroupd7745]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "d63f7eb2b2c357905ea76d9eb8771ca9") {
        handleChange({target:{value:applyspecialratesubgroupd7745Ref?.current?.exchange_rate||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "d63f7eb2b2c357905ea76d9eb8771ca9") {
        handleBlur({target:{value:applyspecialratesubgroupd7745Ref?.current?.exchange_rate||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (exchange_rate71ca9?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `81 / 95`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroupd7745?.exchange_rate||""}
         disabled= {exchange_rate71ca9?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Return Exchange Rate"
      errorMessage={error}
        validationState={validate?.outboundManualReturnProcess_v1?.exchange_rate ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputexchange_rate
